define( [ 'jquery', './graph.util', './dependencies/eventEmitter/EventEmitter' ], function( $, util, EventEmitter ) {

  /** 
   * Default graph parameters
   * @name GraphOptionsDefault
   * @object
   * @private
   * @static
   * @prop {String} title - Title of the graph
   * @prop {Number} paddingTop - The top padding
   * @prop {Number} paddingLeft - The left padding
   * @prop {Number} paddingRight - The right padding
   * @prop {Number} paddingBottom - The bottom padding
   * @prop {(Number|Boolean)} padding - A common padding value for top, bottom, left and right
   * @prop {Number} fontSize - The basic text size of the graphs
   * @prop {Number} paddingLeft - The basic font family. Should be installed on the computer of the user
   * @prop {Object.<String,Object>} plugins - A list of plugins to import with their options
   * @prop {Object.<String,Object>} pluginAction - The default key combination to access those actions
   * @prop {Object} wheel - Define the mouse wheel action
   * @prop {Object} dblclick - Define the double click action
   * @prop {Boolean} uniqueShapeSelection - true to allow only one shape to be selected at the time
   */
  var GraphOptionsDefault = {

    title: '',

    paddingTop: 30,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,

    close: {
      left: true,
      right: true,
      top: true,
      bottom: true
    },

    fontSize: 12,
    fontFamily: 'Myriad Pro, Helvetica, Arial',

    plugins: {},
    pluginAction: {},
    wheel: {},
    dblclick: {},

    uniqueShapeSelection: true
  };

  /** 
   * Main class of jsGraph that creates a new graph.
   * @class Graph
   * @param {HTMLElement} wrapper - The DOM Wrapper element
   * @param {Graph#options} [ options ] - The options of the graph
   * @param {Object} [ axis ] - The list of axes
   * @param {Array} axis.left - The list of left axes
   * @param {Array} axis.bottom - The list of bottom axes
   * @param {Array} axis.top - The list of top axes
   * @param {Array} axis.right - The list of right axes
   * @augments EventEmitter
   * @example var graph = new Graph("someDomID");
   * @example var graph = new Graph("someOtherDomID", { title: 'Graph title', uniqueShapeSelection: true } );
   */
  var Graph = function( wrapper, options, axis ) {

    var self = this;

    /**
      The unique ID of the graph
      @name Graph#uniqueid
      @type String
    */
    this._creation = util.guid();

    if ( typeof wrapper == "string" ) {
      wrapper = document.getElementById( wrapper );
    }

    if ( !wrapper ) {
      throw "The wrapper DOM element was not found.";
    }

    if ( wrapper instanceof $ ) {
      wrapper = wrapper.get( 0 );
    }

    if ( !wrapper.appendChild ) {
      throw "The wrapper appears to be an invalid HTMLElement";
    }

    wrapper.style[ '-webkit-user-select' ] = 'none';
    wrapper.style[ '-moz-user-select' ] = 'none';
    wrapper.style[ '-o-user-select' ] = 'none';
    wrapper.style[ '-ms-user-select' ] = 'none';
    wrapper.style[ 'user-select' ] = 'none';

    /** 
     * @object
     * @memberof Graph
     * @name Graph#options
     * @default {@link GraphOptionsDefault}
     */
    this.options = $.extend( {}, GraphOptionsDefault, options );

    this.prevented = false;

    this.axis = {
      left: [],
      top: [],
      bottom: [],
      right: []
    };

    this.shapes = [];
    this.shapesLocked = false;
    this.plugins = {};

    this.selectedShapes = [];

    this.ns = 'http://www.w3.org/2000/svg';
    this.nsxlink = "http://www.w3.org/1999/xlink";
    this.series = [];
    this._dom = wrapper;
    this._axesHaveChanged = true;

    if ( this.options.hasOwnProperty( 'padding' ) && util.isNumeric( this.options.padding ) ) {
      this.options.paddingTop = this.options.paddingBottom = this.options.paddingLeft = this.options.paddingRight = this.options.padding;
    }

    // DOM
    var w, h;
    if ( wrapper.style.width && wrapper.style.width.indexOf( "%" ) == -1 ) {
      w = parseInt( wrapper.style.width.replace( 'px', '' ) );
    } else {
      w = $( wrapper ).width();
    }

    if ( wrapper.style.height && wrapper.style.height.indexOf( "%" ) == -1 ) {
      h = parseInt( wrapper.style.height.replace( 'px', '' ) );
    } else {
      h = $( wrapper ).height();
    }

    this._doDom();

    this.setSize( w, h );
    this._resize();
    _registerEvents( this );

    this.trackingLines = {
      id: 0,
      current: false,
      dasharray: [ false, "5, 5", "5, 1", "1, 5" ],
      currentDasharray: [],
      vertical: [],
      horizontal: []
    };

    this.shapeHandlers = {
      mouseDown: [],
      mouseUp: [],
      mouseMove: [],
      mouseOver: [],
      mouseOut: [],
      beforeMouseMove: [],
      onChange: [],
      onCreated: [],
      onResizing: [],
      onMoving: [],
      onAfterResized: [],
      onAfterMoved: [],
      onSelected: [],
      onUnselected: [],
      onRemoved: []
    };

    this.pluginsReady = $.Deferred();
    this.seriesReady = $.Deferred();

    this.currentAction = false;

    // Load all axes
    if ( axis ) {
      for ( var i in axis ) {
        for ( var j = 0, l = axis[ i ].length; j < l; j++ ) {

          switch ( i ) {

            case 'top':
              this.getTopAxis( j, axis[ i ][ j ] );
              break;
            case 'bottom':
              this.getBottomAxis( j, axis[ i ][ j ] );
              break;
            case 'left':
              this.getLeftAxis( j, axis[ i ][ j ] );
              break;
            case 'right':
              this.getRightAxis( j, axis[ i ][ j ] );
              break;
          }
        }
      }
    }

    this._pluginsInit();

  }

  Graph.prototype = new EventEmitter();

  Graph.prototype = $.extend( Graph.prototype, {

    /** 
     * Returns the graph SVG wrapper element
     * @memberof Graph.prototype
     * @public
     * @return {SVGElement} The DOM element wrapping the graph
     */
    getDom: function() {
      return this.dom;
    },

    /** 
     * Returns the graph wrapper element passed during the graph creation
     * @memberof Graph.prototype
     * @public
     * @return {HTMLElement} The DOM element wrapping the graph
     */
    getWrapper: function() {
      return this._dom;
    },

    /**
     * Sets an option of the graph
     * @memberof Graph.prototype
     * @param {String} name - Option name
     * @param value - New option value
     * @returns {Graph} - Graph instance
     */
    setOption: function( name, val ) {
      this.options[ name ] = val;
      return this;
    },

    /**
     *  Sets the title of the graph
     * @memberof Graph.prototype
     */
    setTitle: function( title ) {
      this.options.title = title;
      this.domTitle.textContent = title;
    },

    /**
     *  Shows the title of the graph
     * @memberof Graph.prototype
     */
    displayTitle: function() {
      this.domTitle.setAttribute( 'display', 'inline' );
    },

    /**
     *  Hides the title of the graph
     * @memberof Graph.prototype
     */
    hideTitle: function() {
      this.domTitle.setAttribute( 'display', 'none' );
    },

    /**
     * Calls a repaint of the container. Used internally when zooming on the graph, or when <code>.autoscaleAxes()</code> is called (see {@link Graph#autoscaleAxes}).<br />
     * To be called after axes min/max are expected to have changed (e.g. after an <code>axis.zoom( from, to )</code>) has been called
     * @memberof Graph.prototype
     * @param {Boolean} onlyIfAxesHaveChanged - Triggers a redraw only if min/max values of the axes have changed.
     * @return {Boolean} if the redraw has been successful
     */
    redraw: function( onlyIfAxesHaveChanged ) {

      if ( !this.width || !this.height ) {
        return;
      }

      if ( !this.sizeSet ) {

        this._resize();
        return true;

      } else {

        if ( !onlyIfAxesHaveChanged || haveAxesChanged( this ) ) {
          refreshDrawingZone( this );
          return true;
        }
      }

      return false;
    },

    /**
     * Draw the graph and the series. This method will only redraw what is necessary. You may trust its use when you have set new data to series, changed serie styles or called for a zoom on an axis.
     * @memberof Graph.prototype
     */
    draw: function() {

      this.drawSeries( this.redraw( true ) );
    },

    /**
     * Sets the total width of the graph
     * @param {Number} width - The new width of the graph
     * @param {Boolean} skipResize - <code>true</code> to defer graph repaint. Use {@link Graph#resize} to force repain later on. (Useful if many graph sizing operations are done successively)
     * @see Graph#setHeight
     * @see Graph#resize
     * @memberof Graph.prototype
     */
    setWidth: function( width, skipResize ) {
      this.width = width;
      if ( !skipResize ) {
        this._resize();
      }
    },

    /**
     * Sets the total height of the graph
     * @param {Number} height - The new height of the graph
     * @param {Boolean} skipResize - <code>true</code> to defer graph repaint. Use {@link Graph#resize} to force repain later on. (Useful if many graph sizing operations are done successively)
     * @see Graph#setWidth
     * @see Graph#resize
     * @memberof Graph.prototype
     */
    setHeight: function( height, skipResize ) {
      this.height = height;
      if ( !skipResize ) {
        this._resize();
      }
    },

    /**
     * Sets the new dimension of the graph and repaints it. If width and height are omitted, a simple refresh is done.
     * @param {Number} [ width ] - The new width of the graph
     * @param {Number} [ height ] - The new height of the graph
     * @see Graph#setWidth
     * @see Graph#setHeight
     * @memberof Graph.prototype
     */
    resize: function( w, h ) {
      if ( w && h ) {
        this.setSize( w, h );
      }

      this._resize();
    },

    /**
     * Sets the new dimension of the graph without repainting it. Use {@link Graph#resize} to perform the actual resizing of the graph.
     * @param {Number} [ width ] - The new width of the graph
     * @param {Number} [ height ] - The new height of the graph
     * @see Graph#setWidth
     * @see Graph#setHeight
     * @see Graph#resize
     * @memberof Graph.prototype
     */
    setSize: function( w, h ) {
      this.setWidth( w, true );
      this.setHeight( h, true );
      this.getDrawingHeight();
      this.getDrawingWidth();
    },

    /**
     * Returns the width of the graph (set by setSize, setWidth or resize methods)
     * @return {Number} Width of the graph
     * @memberof Graph.prototype
     */
    getWidth: function() {
      return this.width;
    },

    /**
     * Returns the height of the graph (set by setSize, setHeight or resize methods)
     * @return {Number} Height of the graph
     * @memberof Graph.prototype
     */
    getHeight: function() {
      return this.height;
    },

    /**
     * Returns the top padding of the graph (space between the top of the svg container and the topmost axis)
     * @return {Number} paddingTop
     * @memberof Graph.prototype
     */
    getPaddingTop: function() {
      return this.options.paddingTop;
    },

    /**
     * Returns the left padding of the graph (space between the left of the svg container and the leftmost axis)
     * @return {Number} paddingTop
     * @memberof Graph.prototype
     */
    getPaddingLeft: function() {
      return this.options.paddingLeft;
    },

    /**
     * Returns the bottom padding of the graph (space between the bottom of the svg container and the bottommost axis)
     * @return {Number} paddingTop
     * @memberof Graph.prototype
     */
    getPaddingBottom: function() {
      return this.options.paddingBottom;
    },

    /**
     * Returns the right padding of the graph (space between the right of the svg container and the rightmost axis)
     * @return {Number} paddingRight
     * @memberof Graph.prototype
     */
    getPaddingRight: function() {
      return this.options.paddingRight;
    },

    /**
     * Returns the height of the drawable zone, including the space used by the axes
     * @param {Boolean} useCache - Use cached value. Useful if one is sure the graph hasn't changed dimension. Automatically called after a Graph.resize();
     * @returns {Number} Height of the graph
     * @memberof Graph.prototype
     */
    getDrawingHeight: function( useCache ) {
      if ( useCache && this.innerHeight ) {
        return this.innerHeight;
      }
      return ( this.innerHeight = ( this.height - this.options.paddingTop - this.options.paddingBottom ) );
    },

    /**
     * Returns the width of the drawable zone, including the space used by the axes
     * @param {Boolean} useCache - Use cached value. Useful if one is sure the graph hasn't changed dimension. Automatically called after a Graph.resize();
     * @returns {Number} Width of the graph
     * @memberof Graph.prototype
     */
    getDrawingWidth: function( useCache ) {
      if ( useCache && this.innerWidth ) {
        return this.innerWidth;
      }
      return ( this.innerWidth = ( this.width - this.options.paddingLeft - this.options.paddingRight ) );
    },

    /**
     * Caches the wrapper offset in the page.<br />
     * The position of the wrapper is used when processing most of mouse events and it is fetched via the jQuery function .offset().
     * If performance becomes a critical issue in your application, <code>cacheOffset()</code> should be used to store the offset position. It should be ensured that the graph doesn't move in the page. If one can know when the graph has moved, <code>cacheOffset()</code> should be called again to update the offset position.
     * @memberof Graph.prototype
     * @see Graph#uncacheOffset
     */
    cacheOffset: function() {
      this.offsetCached = $( this._dom ).offset();
    },

    /**
     * Un-caches the wrapper offset value
     * @memberof Graph.prototype
     * @see Graph#cacheOffset
     */
    uncacheOffset: function() {
      this.offsetCached = false;
    },

    /**
     * Returns the x axis at a certain index. If any top axis exists and no bottom axis exists, returns or creates a top axis. Otherwise, creates or returns a bottom axis
     * @memberof Graph.prototype
     * @param {Number} [ index=0 ] - The index of the axis
     * @param {Object} [ options={} ] - The options to pass to the axis constructor
     */
    getXAxis: function( index, options ) {
      if ( this.axis.top.length > 0 && this.axis.bottom.length == 0 ) {
        return this.getTopAxis( index, options );
      }

      return this.getBottomAxis( index, options );
    },

    /**
     * Returns the y axis at a certain index. If any right axis exists and no left axis exists, returns or creates a right axis. Otherwise, creates or returns a left axis
     * @memberof Graph.prototype
     * @param {Number} [ index=0 ] - The index of the axis
     * @param {Object} [ options={} ] - The options to pass to the axis constructor
     */
    getYAxis: function( index, options ) {

      if ( this.axis.right.length > 0 && this.axis.left.length == 0 ) {
        return this.getRightAxis( index, options );
      }

      return this.getLeftAxis( index, options );
    },

    /**
     * Returns the top axis at a certain index. Creates it if non-existant
     * @memberof Graph.prototype
     * @param {Number} [ index=0 ] - The index of the axis
     * @param {Object} [ options={} ] - The options to pass to the axis constructor
     */
    getTopAxis: function( index, options ) {
      return _getAxis( this, index, options, 'top' );
    },

    /**
     * Returns the bottom axis at a certain index. Creates it if non-existant
     * @memberof Graph.prototype
     * @param {Number} [ index=0 ] - The index of the axis
     * @param {Object} [ options={} ] - The options to pass to the axis constructor
     */
    getBottomAxis: function( index, options ) {
      return _getAxis( this, index, options, 'bottom' );
    },

    /**
     * Returns the left axis at a certain index. Creates it if non-existant
     * @memberof Graph.prototype
     * @param {Number} [ index=0 ] - The index of the axis
     * @param {Object} [ options={} ] - The options to pass to the axis constructor
     */
    getLeftAxis: function( index, options ) {
      return _getAxis( this, index, options, 'left' );
    },

    /**
     * Returns the right axis at a certain index. Creates it if non-existant
     * @memberof Graph.prototype
     * @param {Number} [ index=0 ] - The index of the axis
     * @param {Object} [ options={} ] - The options to pass to the axis constructor
     */
    getRightAxis: function( index, options ) {
      return _getAxis( this, index, options, 'right' );
    },

    /**
     * Sets a bottom axis
     * @param {Axis} axis - The axis instance to set
     * @param {Number} [ index=0 ] - The index of the axis
     * @memberof Graph.prototype
     */
    setXAxis: function( axis, index ) {
      this.setBottomAxis( axis, index );
    },

    /**
     * Sets a left axis
     * @param {Axis} axis - The axis instance to set
     * @param {Number} [ index=0 ] - The index of the axis
     * @memberof Graph.prototype
     */
    setYAxis: function( axis, index ) {
      this.setLeftAxis( axis, index );
    },

    /**
     * Sets a left axis
     * @param {Axis} axis - The axis instance to set
     * @param {Number} [ index=0 ] - The index of the axis
     * @memberof Graph.prototype
     */
    setLeftAxis: function( axis, index ) {
      index = index || 0;
      this.axis.left[ index ] = axis;
    },

    /**
     * Sets a right axis
     * @param {Axis} axis - The axis instance to set
     * @param {Number} [ index=0 ] - The index of the axis
     * @memberof Graph.prototype
     */
    setRightAxis: function( axis, index ) {
      index = index || 0;
      this.axis.right[ index ] = axis;
    },

    /**
     * Sets a top axis
     * @param {Axis} axis - The axis instance to set
     * @param {Number} [ index=0 ] - The index of the axis
     * @memberof Graph.prototype
     */
    setTopAxis: function( axis, index ) {
      index = index || 0;
      this.axis.top[ index ] = axis;
    },

    /**
     * Sets a bottom axis
     * @param {Axis} axis - The axis instance to set
     * @param {Number} [ number=0 ] - The index of the axis
     * @memberof Graph.prototype
     */
    setBottomAxis: function( axis, num ) {
      num = num || 0;
      this.axis.bottom[ num ] = axis;
    },

    /**
     * Autoscales the x and y axes of the graph<br />
     * Repains the canvas
     * @memberof Graph.prototype
     */
    autoscaleAxes: function() {
      this._applyToAxes( "setMinMaxToFitSeries", null, true, false );
      this._applyToAxes( "scaleToFitAxis", [ this.getYAxis() ], false, true )
    },

    _applyToAxis: {
      'string': function( type, func, params ) {
        //    params.splice(1, 0, type);

        for ( var i = 0; i < this.axis[ type ].length; i++ ) {
          this.axis[ type ][ i ][ func ].apply( this.axis[ type ][ i ], params );
        }
      },

      'function': function( type, func, params ) {
        for ( var i = 0; i < this.axis[ type ].length; i++ ) {
          func.call( this, this.axis[ type ][ i ], type, params );
        }
      }
    },

    /**
     * Calculates the minimal or maximal value of the axis. Currently, alias of getBoudaryAxisFromSeries
     * @memberof Graph.prototype
     */
    getBoundaryAxis: function( axis, minmax ) {

      var valSeries = this.getBoundaryAxisFromSeries( axis, minmax );
      //  var valShapes = this.getBoundaryAxisFromShapes( axis, xy, minmax );
      return valSeries;
      //return Math[ minmax ]( valSeries, valShapes );

    },

    /**
     * Calculates the minimal or maximal value of the axis, based on the series that belong to it. The value is computed so that all series just fit in the value.
     * @memberof Graph.prototype
     * @param {Axis} axis - The axis for which the value should be computed
     * @param {minmax} minmax - The minimum or maximum to look for. "min" for the minimum, anything else for the maximum
     * @returns {Number} The minimimum or maximum of the axis based on its series
     */
    getBoundaryAxisFromSeries: function( axis, minmax ) {
      var min = minmax == 'min',
        val,
        func = axis.isX() ? [ 'getMinX', 'getMaxX' ] : [ 'getMinY', 'getMaxY' ],
        func2use = func[ min ? 0 : 1 ],
        currentSerie,
        serie,
        series,
        serieValue,
        i,
        l;

      val = min ? Number.MAX_VALUE : Number.MIN_VALUE;
      series = this.getSeriesFromAxis( axis, true );

      for ( i = 0, l = series.length; i < l; i++ ) {

        serie = series[ i ];

        if ( !serie.isShown() ) {
          continue;
        }

        serieValue = serie[ func2use ]();

        val = Math[ minmax ]( val, serieValue );

      }

      return val;
    },

    /**
     *  Returns all the series associated to an axis
     *  @memberof Graph.prototype
     *  @param {Axis} axis - The axis to which the series belong
     *  @returns {Serie[]} An array containing the list of series that belong to the axis
     */
    getSeriesFromAxis: function( axis ) {
      var series = [],
        i = this.series.length - 1;
      for ( ; i >= 0; i-- ) {
        if ( this.series[ i ].getXAxis() == axis || this.series[ i ].getYAxis() == axis ) {
          series.push( this.series[ i ] );
        }
      }

      return series;
    },

    /**
     * Determines the maximum and minimum of each axes, based on {@link Graph#getBoundaryAxis}. It is usually called internally, but if the data of series has changed, called this function to make sure that minimum / maximum of the axes are properly updated.
     * @memberof Graph.prototype
     * @see Graph#getBoundaryAxis
     */
    updateDataMinMaxAxes: function() {

      var axisvars = [ 'bottom', 'top', 'left', 'right' ],
        axis,
        j,
        l,
        i,
        xy;

      for ( j = 0, l = axisvars.length; j < l; j++ ) {

        for ( i = this.axis[ axisvars[ j ] ].length - 1; i >= 0; i-- ) {

          axis = this.axis[ axisvars[ j ] ][ i ];
          xy = j < 2 ? 'x' : 'y';

          if ( axis.disabled ) {
            continue;
          }

          //console.log( axisvars[ j ], this.getBoundaryAxisFromSeries( this.axis[ axisvars[ j ] ][ i ], xy, 'min'), this.getBoundaryAxisFromSeries( this.axis[ axisvars[ j ] ][ i ], xy, 'max') );
          axis.setMinValueData( this.getBoundaryAxis( this.axis[ axisvars[ j ] ][ i ], 'min' ) );
          axis.setMaxValueData( this.getBoundaryAxis( this.axis[ axisvars[ j ] ][ i ], 'max' ) );

        }
      }

    },

    /** 
     * Function that is called from {@link Graph#_applyToAxes}
     * @function
     * @name AxisCallbackFunction
     * @param {Axis} axis - The axis of the function
     * @param {String} type - The type of the axis (left,right,top,bottom)
     * @param params - The params passed in the _applyToAxis function.
     * @see Graph#_applyToAxes
     */

    /**
     * Applies a function to axes. The function will be executed once for every axis.
     * If func is a string, the internal function belonging to <strong>the axis</strong> will be called, with the params array flattened out (in this case, params must be an array).
     * If func is a function, the function will be called with the axis, its type and params as parameters. See {@link AxisCallbackFunction} for more details.
     * @param {(AxisCallbackFunction|String)} func - The function or function name to execute
     * @param params - Extra parameters to pass to the function
     * @param {Boolean} topbottom=false - True to apply to function to top and bottom axes
     * @param {Boolean} leftright=false - True to apply to function to left and right axes
     * @memberof Graph.prototype
     */
    _applyToAxes: function( func, params, tb, lr ) {

      var ax = [],
        i = 0,
        l;

      if ( tb || tb == undefined ) {
        ax.push( 'top' );
        ax.push( 'bottom' );
      }
      if ( lr || lr == undefined ) {
        ax.push( 'left' );
        ax.push( 'right' );
      }

      for ( l = ax.length; i < l; i++ ) {
        this._applyToAxis[ typeof func ].call( this, ax[ i ], func, params );
      }
    },

    /**
     * Axes can be dependant of one another (for instance for unit conversions)
     * Finds and returns all the axes that are linked to a specific axis. Mostly used internally.
     * @memberof Graph.prototype
     * @param {Axis} axis - The axis that links one or multiple other dependant axes
     * @returns {Axis[]} The list of axes linked to the axis passed as parameter
     */
    findAxesLinkedTo: function( axis ) {

      var axes = [];
      this._applyToAxes( function( a ) {

        if ( a.linkedToAxis && a.linkedToAxis.axis == axis ) {
          axes.push( a );
        }
      }, {}, axis instanceof this.getConstructor( "graph.axis.x" ), axis instanceof this.getConstructor( "graph.axis.y" ) );

      return axes;
    },

    _axisHasChanged: function( axis ) {
      this._axesHaveChanged = true;
    },

    /**
     * Creates a new serie<br />
     * If the a serie with the same name exists, returns this serie with update options <br />
     * The type of the serie is used to fetch the corresponding registered constructor registered with the name "graph.serie.<type>", e.g "line" will fetch the "graph.serie.line" prototype (built-in)<br />
     * Built-in series types are "line", "contour", "zone" and "scatter".
     * @param {String} name - The name of the serie (unique)
     * @param {Object} options - The serie options
     * @param {Type} type - The type of the serie.
     * @returns {Serie} The newly created serie
     * @memberof Graph.prototype
     */
    newSerie: function( name, options, type ) {

      var self = this;

      if ( typeof type == "function" ) {
        type = "line";
        callback = type;
      }

      if ( !type ) {
        type = "line";
      }

      var serie;
      if ( serie = this.getSerie( name ) ) {
        return serie;
      }

      serie = makeSerie( this, name, options, type );
      self.series.push( serie );

      if ( self.legend ) {
        self.legend.update();
      }

      self.emit( "newSerie", serie );
      return serie;
    },

    /** 
     * Looks for an existing serie by name or by index and returns it.
     * The index of the serie follows the creation sequence (0 for the first one, 1 for the second one, ...)
     * @param {(String|Number)} name - The name or the index of the serie
     * @returns {Serie}
     * @memberof Graph.prototype
     */
    getSerie: function( name ) {

      if ( typeof name == 'number' ) {
        return this.series[ name ] ||  false;
      }
      var i = 0,
        l = this.series.length;

      for ( ; i < l; i++ ) {

        if ( this.series[ i ].getName() == name ) {

          return this.series[ i ];

        }
      }

      return false
    },

    /**
     * Returns all the series
     * @returns {Serie[]} An array of all the series
     * @memberof Graph.prototype
     */
    getSeries: function() {
      return this.series;
    },

    /**
     * Draws a specific serie
     * @param {Serie} serie - The serie to redraw
     * @param {Boolean} force - Forces redraw even if no data has changed
     * @memberof Graph.prototype
     */
    drawSerie: function( serie, force ) {

      if ( !serie.draw ) {
        throw "Serie has no method draw";
      }

      serie.draw( force );
    },

    /**
     * Redraws all visible series
     * @memberof Graph.prototype
     * @param {Boolean} force - Forces redraw even if no data has changed
     */
    drawSeries: function( force ) {

      if ( !this.width || !this.height ) {
        return;
      }

      var i = this.series.length - 1;
      for ( ; i >= 0; i-- ) {
        if ( this.series[ i ].isShown() ) {
          this.drawSerie( this.series[  i ], force );
        }
      }
    },

    /**
     * @memberof Graph.prototype
     * @alias Graph#removeSeries
     */
    resetSeries: function() {
      this.removeSeries()
    },

    /**
     * @memberof Graph.prototype
     * @alias Graph#removeSeries
     */

    killSeries: function() {
      this.resetSeries();
    },

    /**
     * Removes all series from the graph
     * @memberof Graph.prototype
     */
    removeSeries: function() {
      while ( this.series[ 0 ] ) {
        this.series[ 0 ].kill( true );
      }
      this.series = [];
    },

    /**
     * Selects a serie. Only one serie per graph can be selected.
     * @param {Serie} serie - The serie to select
     * @param {String} selectName="selected" - The name of the selection
     * @memberof Graph.prototype
     */
    selectSerie: function( serie, selectName ) {

      if ( this.selectedSerie == serie ) {
        return;
      }

      if ( this.selectedSerie ) {
        this.selectedSerie.unselect();
      }

      this.selectedSerie = serie;
      this.triggerEvent( 'onSelectSerie', serie );
      serie.select( "selected" );
    },

    /**
     * Returns the selected serie
     * @returns {(Serie|undefined)} The selected serie
     */
    getSelectedSerie: function() {
      return this.selectedSerie;
    },

    /**
     * Unselects a serie
     * @param {Serie} serie - The serie to unselect
     * @memberof Graph.prototype
     */
    unselectSerie: function( serie ) {
      serie.unselect();
      this.selectedSerie = false;
      this.triggerEvent( 'onUnselectSerie', serie );
    },

    /**
     * Returns all the shapes associated to a serie. Shapes can (but don't have to) be associated to a serie. Position of the shape can then be relative to the same axes as the serie.
     * @param {Serie} serie - The serie containing the shapes
     * @returns {Shape[]} An array containing a list of shapes associated to the serie
     * @memberof Graph.prototype
     */
    getShapesOfSerie: function( serie ) {

      var shapes = [];
      var i = this.shapes.length - 1;

      for ( ; i >= 0; i-- ) {

        if ( this.shapes[ i ].getSerie() == serie ) {
          shapes.push( this.shapes[ i ] );
        }
      }

      return shapes;
    },

    makeToolbar: function( toolbarData ) {

      var constructor = this.getConstructor( "graph.toolbar" );
      if ( constructor ) {
        return this.toolbar = new constructor( this, toolbarData );
      } else {
        return util.throwError( "No constructor exists for toolbar" );
      }
    },

    /**
     * Creates a new shape. jsGraph will look for the registered constructor "graph.shape.<shapeType>".
     * @param {String} shapeType - The type of the shape
     * @param {Object} [shapeData] - The options passed to the shape creator
     * @param {Boolean} [mute=false] - <code>true</code> to create the shape quietly
     * @returns {Shape} The created shape
     * @memberof Graph.prototype
     * @see Graph#getConstructor
     */
    newShape: function( shapeType, shapeData, mute ) {

      var self = this,
        response;

      if ( !mute ) {

        this.emit( 'beforeNewShape', shapeData );

        if ( this.prevent( false ) ) {
          return false;
        }
      }

      // Backward compatibility
      if ( typeof shapeType == "object" ) {
        mute = shapeData;
        shapeData = shapeType;
        shapeType = shapeData.type;
      }

      shapeData._id = util.guid();

      var constructor;
      if ( typeof shapeType == "function" ) {
        constructor = shapeType;
      } else {
        constructor = this.getConstructor( "graph.shape." + shapeType );
      }

      if ( !constructor ) {
        return util.throwError( "No constructor for this shape" );
      }

      var shape = new constructor( this, shapeData );

      if ( !shape ) {
        return util.throwError( "Failed to construct shape." );
      }

      shape.type = shapeType;
      shape.graph = this;
      shape._data = shapeData;

      shape.init( this );

      /* Setting shape properties */
      if ( shapeData.fillColor ) {
        shape.prop( 'fillColor', shapeData.fillColor );
      }

      if ( shapeData.strokeColor ) {
        shape.prop( 'strokeColor', shapeData.strokeColor );
      }

      if ( shapeData.strokeWidth ) {
        shape.prop( 'strokeWidth', shapeData.strokeWidth || ( shapeData.strokeColor ? 1 : 0 ) );
      }

      if ( shapeData.layer ) {
        shape.setLayer( shapeData.layer );
      }

      if ( shapeData.label ) {

        if ( !( shapeData.label instanceof Array ) ) {
          shapeData.label = [ shapeData.label ];
        }

        for ( var i = 0, l = shapeData.label.length; i < l; i++ ) {

          shape.prop( 'labelPosition', shapeData.label[ i ].position, i );
          shape.prop( 'labelColor', shapeData.label[ i ].color || 'black', i );
          shape.prop( 'labelSize', shapeData.label[ i ].size, i );
          shape.prop( 'labelAngle', shapeData.label[ i ].angle || 0, i );
          shape.prop( 'labelBaseline', shapeData.label[ i ].baseline || 'no-change', i );
          shape.prop( 'labelAnchor', shapeData.label[ i ].anchor ||  'start', i );
        }

        shape.setLabelNumber( l );
      }

      this.shapes.push( shape );

      if ( !mute ) {
        this.emit( 'newShape', shape, shapeData );
      }

      return shape;
    },

    /**
     *  Redraws all shapes. To be called if their definitions have changed
     *  @memberof Graph.prototype
     */
    redrawShapes: function() {

      //this.graphingZone.removeChild(this.shapeZone);
      for ( var i = 0, l = this.shapes.length; i < l; i++ ) {
        this.shapes[ i ].redraw();
      }
      //this.graphingZone.insertBefore(this.shapeZone, this.axisGroup);
    },

    /**
     *  Removes all shapes from the graph
     *  @memberof Graph.prototype
     */
    removeShapes: function() {
      for ( var i = 0, l = this.shapes.length; i < l; i++ ) {
        if ( this.shapes[ i ] && this.shapes[ i ].kill ) {
          this.shapes[ i ].kill( true );
        }
      }
      this.shapes = [];
    },

    /**
     * Selects a shape
     * @param {Shape} shape - The shape to select
     * @param {Boolean} mute - Select the shape quietly
     * @memberof Graph.prototype
     */
    selectShape: function( shape, mute ) {

      // Already selected. Returns false
      if ( this.selectedShapes.indexOf( shape ) > -1 ) {
        return false;
      }

      if ( !shape.isSelectable() ) {
        return false;
      }

      if ( !mute ) {
        this.emit( "beforeShapeSelect", shape );
      }

      if ( this.cancelSelectShape ) {
        this.cancelSelectShape = false;
        return;
      }

      this.cancelSelectShape = false;

      if ( this.selectedShapes.length > 0 && this.options.uniqueShapeSelection )  { // Only one selected shape at the time

        //console.log('Unselect shape');
        while ( this.selectedShapes[ 0 ] ) {

          this.unselectShape( this.selectedShapes[ 0 ], mute )
        }
      }

      shape._select( mute );
      this.selectedShapes.push( shape );

      if ( !mute ) {
        this.emit( "shapeSelect", shape );
      }
    },

    /**
     * Unselects a shape
     * @param {Shape} shape - The shape to unselect
     * @param {Boolean} mute - Unselect the shape quietly
     * @memberof Graph.prototype
     */
    unselectShape: function( shape, mute ) {

      if ( this.selectedShapes.indexOf( shape ) == -1 ) {
        return;
      }

      if ( !mute ) {
        this.emit( "beforeShapeSelect", shape );
      }

      if ( this.cancelUnselectShape ) {
        this.cancelUnselectShape = false;
        return;
      }

      shape._unselect();

      this.selectedShapes.splice( this.selectedShapes.indexOf( shape ), 1 );

      if ( !mute ) {
        this.emit( "shapeUnselect", shape );
      }

    },

    /**
     * Unselects all shapes
     * @memberof Graph.prototype
     */
    unselectShapes: function() {

      while ( this.selectedShapes[ 0 ] ) {
        this.unselectShape( this.selectedShapes[  0 ] );
      }

    },

    _removeShape: function( shape ) {
      this.shapes.splice( this.shapes.indexOf( shape ), 1 );
    },

    appendShapeToDom: function( shape ) {
      this.getLayer( shape.getLayer(), 'shape' ).appendChild( shape.group );
    },

    removeShapeFromDom: function( shape ) {
      this.getLayer( shape.getLayer(), 'shape' ).removeChild( shape.group );
    },

    appendSerieToDom: function( serie ) {
      this.getLayer( serie.getLayer(), 'serie' ).appendChild( serie.groupMain );
    },

    removeSerieFromDom: function( serie ) {
      this.getLayer( serie.getLayer(), 'serie' ).removeChild( serie.groupMain );
    },

    getLayer: function( layer, mode ) {

      if ( !this.layers[ layer ] ) {

        this.layers[ layer ] = [];

        this.layers[ layer ][ 0 ] = document.createElementNS( this.ns, 'g' );
        this.layers[ layer ][ 1 ] = document.createElementNS( this.ns, 'g' );
        this.layers[ layer ][ 2 ] = document.createElementNS( this.ns, 'g' );

        this.layers[ layer ][ 0 ].appendChild( this.layers[ layer ][ 1 ] );
        this.layers[ layer ][ 0 ].appendChild( this.layers[ layer ][ 2 ] );

        var i = 1,
          prevLayer;

        while ( !( prevLayer = this.layers[ layer - i ] ) && layer - i >= 0 ) {
          i++;
        }

        if ( !prevLayer ) {

          this.plotGroup.insertBefore( this.layers[ layer ][ 0 ], this.plotGroup.firstChild );

        } else if ( prevLayer.nextSibling ) {

          this.plotGroup.insertBefore( this.layers[ layer ][ 0 ], prevLayer.nextSibling );

        } else {

          this.plotGroup.appendChild( this.layers[ layer ][ 0 ] );

        }
      }

      return this.layers[ layer ][ mode == 'shape' ? 2 : 1 ];

    },

    focus: function()  {
      this._dom.focus();
    },

    elementMoving: function( movingElement ) {
      this.bypassHandleMouse = movingElement;
    },

    _makeClosingLines: function() {

      this.closingLines = {};
      var els = [ 'top', 'bottom', 'left', 'right' ],
        i = 0,
        l = 4,
        line;
      for ( ; i < l; i++ ) {
        var line = document.createElementNS( this.ns, 'line' );
        line.setAttribute( 'stroke', 'black' );
        line.setAttribute( 'shape-rendering', 'crispEdges' );
        line.setAttribute( 'stroke-linecap', 'square' );
        line.setAttribute( 'display', 'none' );
        this.closingLines[ els[ i ] ] = line;
        this.graphingZone.appendChild( line );
      }
    },

    isPluginAllowed: function( e, plugin ) {

      if ( this.forcedPlugin == plugin ) {
        return true;
      }

      var act = this.options.pluginAction[ plugin ] || plugin;

      if ( act.shift === undefined ) {
        act.shift = false;
      }

      if ( act.ctrl === undefined ) {
        act.ctrl = false;
      }

      if ( act.meta === undefined ) {
        act.meta = false;
      }

      if ( act.alt === undefined ) {
        act.alt = false;
      }

      return ( e.shiftKey == act.shift && e.ctrlKey == act.ctrl && e.metaKey == act.meta && e.altKey == act.alt );
    },

    forcePlugin: function( plugin ) {
      this.forcedPlugin = plugin;
    },

    unforcePlugin: function() {
      this.forcedPlugin = false;
    },

    _pluginsExecute: function( funcName, args ) {

      //			Array.prototype.splice.apply(args, [0, 0, this]);

      for ( var i in this.plugins ) {

        if ( this.plugins[ i ] && this.plugins[ i ][ funcName ] ) {

          this.plugins[ i ][ funcName ].apply( this.plugins[ i ], args );

        }
      }
    },

    _pluginExecute: function( which, func, args ) {

      //Array.prototype.splice.apply( args, [ 0, 0, this ] );
      if ( !which ) {
        return;
      }

      if ( this.plugins[ which ] && this.plugins[ which ][ func ] ) {

        this.plugins[ which ][ func ].apply( this.plugins[ which ], args );
      }
    },

    _pluginsInit: function() {

      var constructor, pluginName, pluginOptions;

      for ( var i in this.options.plugins ) {

        pluginName = i;
        pluginOptions = this.options.plugins[ i ];

        constructor = this.getConstructor( "graph.plugin." + pluginName );
        if ( constructor ) {
          this.plugins[ pluginName ] = new constructor();
          this.plugins[ pluginName ].init( this, pluginOptions );
        } else {
          util.throwError( "Plugin \"" + pluginName + "\" has not been registered" );
        }
      }
    },

    /**
     * Returns an initialized plugin
     * @memberof Graph.prototype
     * @param {String} pluginName
     * @returns {Plugin} The plugin which name is <pluginName>
     */
    getPlugin: function( pluginName ) {
      var plugin = this.plugins[ pluginName ];

      if ( !plugin ) {
        return util.throwError( "Plugin \"" + pluginName + "\" has not been loaded or properly registered" );
      }

      return plugin;
    },

    triggerEvent: function() {
      var func = arguments[ 0 ],
        args = Array.prototype.splice.apply( arguments, [ 0, 1 ] );

      if ( typeof this.options[ func ] == "function" ) {
        return this.options[ func ].apply( this, arguments );
      }

      return;
    },

    /**
     * Creates a legend. Only one legend is allowed per graph
     * @param {Object} options - The legend options
     * @memberof Graph.prototype
     */
    makeLegend: function( options ) {

      if ( this.legend ) {
        return this.legend;
      }

      var constructor = this.getConstructor( "graph.legend" );
      if ( constructor ) {
        this.legend = new constructor( this, options );
      } else {
        return util.throwError( "Graph legend is not available as it has not been registered" );
      }

      this.graphingZone.appendChild( this.legend.getDom() );
      this.legend.update();

      return this.legend;
    },

    /**
     * Redraw the legend
     * @memberof Graph.prototype
     */
    updateLegend: function() {

      if ( !this.legend ) {
        return;
      }

      this.legend.update();
    },

    /**
     * Kills the graph
     * @memberof Graph.prototype
     **/
    kill: function() {
      this._dom.removeChild( this.dom );
    },

    _removeSerie: function( serie ) {
      this.series.splice( this.series.indexOf( serie ), 1 );
    },

    getPosition: function( value, relTo, xAxis, yAxis, onSerie ) {

      var parsed,
        pos = {
          x: false,
          y: false
        };

      if ( !xAxis ) {
        xAxis = this.getXAxis();
      }

      if ( !yAxis ) {
        yAxis = this.getYAxis();
      }

      if ( !value ) {
        return;
      }

      for ( var i in pos ) {

        var axis = i == 'x' ? xAxis : yAxis;

        if ( value[ i ] === undefined && ( ( value[ 'd' + i ] !== undefined && relTo === undefined ) || relTo === undefined ) ) {

          if ( i == 'x' ) {

            if ( value[ 'd' + i ] === undefined ) {
              continue;
            }

            pos[ i ] = relTo ? relTo[ i ] : axis.getPos( 0 );

          } else if ( value.x && onSerie ) {

            var val;

            if ( _parsePx( value.x ) !== false ) {
              console.warn( "You have defined x in px and not y. Makes no sense. Returning 0 for y" );
              pos[ i ] = 0;
            } else {

              var closest = onSerie.searchClosestValue( value.x );

              if ( !closest ) {
                console.warn( "Could not find y position for x = " + ( value.x ) + " on serie \"" + onSerie.getName() + "\". Returning 0 for y." );
                pos[ i ] = 0;
              } else {
                pos[ i ] = onSerie.getY( closest.yMin );
              }
            }
          }

        } else if ( value[ i ] !== undefined ) {

          pos[ i ] = this.getPx( value[ i ], axis );
        }

        if ( value[ 'd' + i ] !== undefined ) {

          var def = ( value[ i ] !== undefined || relTo == undefined || relTo[ i ] == undefined ) ? pos[ i ] : ( this._getPositionPx( relTo[ i ], true, axis ) || 0 );

          if ( i == 'y' && relTo && relTo.x !== undefined && relTo.y == undefined ) {

            if ( !onSerie ) {
              throw "Error. No serie exists. Cannot find y value";
              return;
            }

            var closest = onSerie.searchClosestValue( relTo.x );
            if ( closest ) {
              def = onSerie.getY( closest.yMin );
            }

            //console.log( relTo.x, closest, onSerie.getY( closest.yMin ), def );
          }

          if ( ( parsed = _parsePx( value[ 'd' + i ] ) ) !== false ) { // dx in px => val + 10px

            pos[ i ] = def + parsed; // return integer (will be interpreted as px)

          } else if ( parsed = this._parsePercent( value[ 'd' + i ] ) ) {

            pos[ i ] = def + this._getPositionPx( parsed, true, axis ); // returns xx%

          } else if ( axis ) {

            pos[ i ] = def + axis.getRelPx( value[ 'd' + i ] ); // px + unittopx

          }
        }
      }

      return pos;
    },

    _getPositionPx: function( value, x, axis ) {

      var parsed;

      if ( ( parsed = _parsePx( value ) ) !== false ) {
        return parsed; // return integer (will be interpreted as px)
      }

      if ( ( parsed = this._parsePercent( value ) ) !== false ) {

        return parsed / 100 * ( x ? this.graph.getDrawingWidth() : this.graph.getDrawingHeight() );

      } else if ( axis ) {

        return axis.getPos( value );
      }
    },

    _parsePercent: function( percent ) {
      if ( percent && percent.indexOf && percent.indexOf( '%' ) > -1 ) {
        return percent;
      }
      return false;
    },

    getDeltaPx: function( value, axis ) {
      var v;
      if ( ( v = _parsePx( value ) ) !== false ) {
        return ( v ) + "px";
      } else {

        return ( axis.getRelPx( value ) ) + "px";
      }
    },

    deltaPosition: function( ref, delta, axis ) {

      var refPx, deltaPx;

      if ( ( refPx = _parsePx( ref ) ) !== false ) {

        if ( ( deltaPx = _parsePx( delta ) ) !== false ) {
          return ( refPx + deltaPx ) + "px";
        } else {
          return ( refPx + axis.getRelPx( delta ) ) + "px";
        }
      } else {

        ref = this.getValPosition( ref, axis );

        if ( ( deltaPx = _parsePx( delta ) ) !== false ) {
          return ( ref + axis.getRelVal( deltaPx ) );
        } else {
          return ( ref + delta );
        }
      }
    },

    getValPosition: function( rel, axis ) {

      if ( rel == 'max' ) {
        return axis.getMaxValue();
      }

      if ( rel == 'min' ) {
        return axis.getMinValue();
      }

      return rel;
    },

    getPx: function( value, axis, rel ) {

      var parsed;

      if ( ( parsed = _parsePx( value ) ) !== false ) {

        return parsed; // return integer (will be interpreted as px)

      } else if ( parsed = this._parsePercent( value ) ) {

        return parsed; // returns xx%

      } else if ( axis ) {

        if ( value == "min" ) {

          return axis.getMinPx();

        } else if ( value == "max" ) {

          return axis.getMaxPx();

        } else if ( rel ) {

          return axis.getRelPx( value );
        } else {

          return axis.getPos( value );
        }
      }
    },

    getPxRel: function( value, axis ) {

      return this.getPx( value, axis, true );
    },

    contextListen: function( target, menuElements, callback ) {

      var self = this;

      if ( this.options.onContextMenuListen ) {
        return this.options.onContextMenuListen( target, menuElements, callback );
      }
    },

    lockShapes: function() {
      this.shapesLocked = true;
    },

    unlockShapes: function() {
      //		console.log('unlock');
      this.shapesLocked = false;
    },

    prevent: function( arg ) {
      var curr = this.prevented;
      if ( arg != -1 ) {
        this.prevented = ( arg == undefined ) || arg;
      }
      return curr;
    },

    _getXY: function( e ) {

      var x = e.clientX,
        y = e.clientY;

      var pos = this.offsetCached || $( this._dom ).offset();

      x -= pos.left - window.scrollX;
      y -= pos.top - window.scrollY;

      return {
        x: x,
        y: y
      };
    },

    _resize: function() {

      if ( !this.width || !this.height ) {
        return;
      }

      this.getDrawingWidth();
      this.getDrawingHeight();

      this.sizeSet = true;
      this.dom.setAttribute( 'width', this.width );
      this.dom.setAttribute( 'height', this.height );
      this.domTitle.setAttribute( 'x', this.width / 2 );

      refreshDrawingZone( this );

      if ( this.legend ) {
        this.legend.update();
      }
    },

    _doDom: function() {

      // Create SVG element, set the NS
      this.dom = document.createElementNS( this.ns, 'svg' );
      this.dom.setAttributeNS( "http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink" );
      //this.dom.setAttributeNS(this.ns, 'xmlns:xlink', this.nsxml);  
      util.setAttributeTo( this.dom, {
        'xmlns': this.ns,
        'font-family': this.options.fontFamily,
        'font-size': this.options.fontSize
      } );

      this._dom.appendChild( this.dom );

      this._dom.setAttribute( 'tabindex', 1 );

      this._dom.style.outline = "none";

      this.defs = document.createElementNS( this.ns, 'defs' );
      this.dom.appendChild( this.defs );

      this.rectEvent = document.createElementNS( this.ns, 'rect' );
      util.setAttributeTo( this.rectEvent, {
        'pointer-events': 'fill',
        'fill': 'transparent'
      } );
      this.dom.appendChild( this.rectEvent );

      // Handling graph title
      this.domTitle = document.createElementNS( this.ns, 'text' );
      this.setTitle( this.options.title );
      util.setAttributeTo( this.domTitle, {
        'text-anchor': 'middle',
        'y': 20
      } );
      this.dom.appendChild( this.domTitle );
      //

      this.graphingZone = document.createElementNS( this.ns, 'g' );
      util.setAttributeTo( this.graphingZone, {
        'transform': 'translate(' + this.options.paddingLeft + ', ' + this.options.paddingTop + ')'
      } );
      this.dom.appendChild( this.graphingZone );

      /*  this.shapeZoneRect = document.createElementNS(this.ns, 'rect');
      //this.shapeZoneRect.setAttribute('pointer-events', 'fill');
      this.shapeZoneRect.setAttribute('fill', 'transparent');
      this.shapeZone.appendChild(this.shapeZoneRect);
    */
      this.axisGroup = document.createElementNS( this.ns, 'g' );
      this.graphingZone.appendChild( this.axisGroup );

      this.plotGroup = document.createElementNS( this.ns, 'g' );
      this.graphingZone.appendChild( this.plotGroup );

      // 5 September 2014. I encountered a case here shapeZone must be above plotGroup
      /*this.shapeZone = document.createElementNS( this.ns, 'g' );
      this.graphingZone.appendChild( this.shapeZone );
*/

      this.layers = [];

      this._makeClosingLines();

      this.clip = document.createElementNS( this.ns, 'clipPath' );
      this.clip.setAttribute( 'id', '_clipplot' + this._creation )
      this.defs.appendChild( this.clip );

      this.clipRect = document.createElementNS( this.ns, 'rect' );
      this.clip.appendChild( this.clipRect );
      this.clip.setAttribute( 'clipPathUnits', 'userSpaceOnUse' );

      this.markerArrow = document.createElementNS( this.ns, 'marker' );
      this.markerArrow.setAttribute( 'viewBox', '0 0 10 10' );
      this.markerArrow.setAttribute( 'id', 'arrow' + this._creation );
      this.markerArrow.setAttribute( 'refX', '6' );
      this.markerArrow.setAttribute( 'refY', '5' );
      this.markerArrow.setAttribute( 'markerUnits', 'strokeWidth' );
      this.markerArrow.setAttribute( 'markerWidth', '8' );
      this.markerArrow.setAttribute( 'markerHeight', '6' );
      this.markerArrow.setAttribute( 'orient', 'auto' );
      //this.markerArrow.setAttribute('fill', 'context-stroke');
      //this.markerArrow.setAttribute('stroke', 'context-stroke');

      var pathArrow = document.createElementNS( this.ns, 'path' );
      pathArrow.setAttribute( 'd', 'M 0 0 L 10 5 L 0 10 z' );
      pathArrow.setAttribute( 'fill', 'context-stroke' );
      this.markerArrow.appendChild( pathArrow );

      this.defs.appendChild( this.markerArrow );

      this.vertLineArrow = document.createElementNS( this.ns, 'marker' );
      this.vertLineArrow.setAttribute( 'viewBox', '0 0 10 10' );
      this.vertLineArrow.setAttribute( 'id', 'verticalline' + this._creation );
      this.vertLineArrow.setAttribute( 'refX', '0' );
      this.vertLineArrow.setAttribute( 'refY', '5' );
      this.vertLineArrow.setAttribute( 'markerUnits', 'strokeWidth' );
      this.vertLineArrow.setAttribute( 'markerWidth', '20' );
      this.vertLineArrow.setAttribute( 'markerHeight', '10' );
      this.vertLineArrow.setAttribute( 'orient', 'auto' );
      //this.vertLineArrow.setAttribute('fill', 'context-stroke');
      //this.vertLineArrow.setAttribute('stroke', 'context-stroke');
      this.vertLineArrow.setAttribute( 'stroke-width', '1px' );

      var pathVertLine = document.createElementNS( this.ns, 'path' );
      pathVertLine.setAttribute( 'd', 'M 0 -10 L 0 10' );
      pathVertLine.setAttribute( 'stroke', 'black' );

      this.vertLineArrow.appendChild( pathVertLine );

      this.defs.appendChild( this.vertLineArrow );

      this.plotGroup.setAttribute( 'clip-path', 'url(#_clipplot' + this._creation + ')' );

      this.bypassHandleMouse = false;
    }

  } );

  function makeSerie( graph, name, options, type ) {

    var constructor = graph.getConstructor( "graph.serie." + type );
    if ( constructor ) {
      var serie = new constructor();
      serie.init( graph, name, options );
      graph.appendSerieToDom( serie );
    } else {
      return util.throwError( "No constructor exists for serie type \"" + type + "\"" );
    }

    return serie;
  };

  function _parsePx( px ) {
    if ( px && px.indexOf && px.indexOf( 'px' ) > -1 ) {
      return parseInt( px.replace( 'px', '' ) );
    }
    return false;
  };

  function refreshDrawingZone( graph ) {

    var i, j, l, xy, min, max, axis;
    var shift = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };

    graph._painted = true;

    // Apply to top and bottom
    graph._applyToAxes( function( axis, position ) {

      if ( axis.disabled ||  axis.floating ) {
        return;
      }

      axis.setShift( shift[ position ] + axis.getAxisPosition(), axis.getAxisPosition() );
      shift[ position ] += axis.getAxisPosition(); // Allow for the extra width/height of position shift

    }, false, true, false );

    // Applied to left and right
    graph._applyToAxes( function( axis, position ) {

      if ( axis.disabled ) {
        return;
      }

      axis.setMinPx( shift.top );
      axis.setMaxPx( graph.getDrawingHeight( true ) - shift.bottom );

      if ( axis.floating ) {
        return;
      }

      // First we need to draw it in order to determine the width to allocate
      // graph is done to accomodate 0 and 100000 without overlapping any element in the DOM (label, ...)

      var drawn = axis.draw() || 0,
        axisDim = axis.getAxisPosition();

      // Get axis position gives the extra shift that is common

      shift[ position ] += drawn + axisDim;
      axis.setShift( shift[ position ], drawn + axisDim );

    }, false, false, true );

    // Apply to top and bottom
    graph._applyToAxes( function( axis, position ) {

      if ( axis.disabled ) {
        return;
      }

      axis.setMinPx( shift.left );
      axis.setMaxPx( graph.getDrawingWidth( true ) - shift.right );

      if ( axis.floating ) {
        return;
      }

      axis.draw();

    }, false, true, false );

    graph._applyToAxes( function( axis ) {

      if ( !axis.floating ) {
        return;
      }

      var floatingAxis = axis.getFloatingAxis();
      var floatingValue = axis.getFloatingValue();
      var floatingPx = floatingAxis.getPx( floatingValue );

      axis.setShift( floatingPx );
      axis.draw();

    }, false, true, true );

    _closeLine( graph, 'right', graph.getDrawingWidth( true ), graph.getDrawingWidth( true ), shift.top, graph.getDrawingHeight( true ) - shift.bottom );
    _closeLine( graph, 'left', 0, 0, shift.top, graph.getDrawingHeight( true ) - shift.bottom );
    _closeLine( graph, 'top', shift.left, graph.getDrawingWidth( true ) - shift.right, 0, 0 );
    _closeLine( graph, 'bottom', shift.left, graph.getDrawingWidth( true ) - shift.right, graph.getDrawingHeight( true ) - shift.bottom, graph.getDrawingHeight( true ) - shift.bottom );

    graph.clipRect.setAttribute( 'y', shift.top );
    graph.clipRect.setAttribute( 'x', shift.left );
    graph.clipRect.setAttribute( 'width', graph.getDrawingWidth() - shift.left - shift.right );
    graph.clipRect.setAttribute( 'height', graph.getDrawingHeight() - shift.top - shift.bottom );

    graph.rectEvent.setAttribute( 'x', shift.top );
    graph.rectEvent.setAttribute( 'y', shift.left );
    graph.rectEvent.setAttribute( 'width', graph.getDrawingWidth() - shift.left - shift.right );
    graph.rectEvent.setAttribute( 'height', graph.getDrawingHeight() - shift.top - shift.bottom );

    /*
		graph.shapeZoneRect.setAttribute('x', shift[1]);
		graph.shapeZoneRect.setAttribute('y', shift[2]);
		graph.shapeZoneRect.setAttribute('width', graph.getDrawingWidth() - shift[2] - shift[3]);
		graph.shapeZoneRect.setAttribute('height', graph.getDrawingHeight() - shift[1] - shift[0]);
*/
    graph.shift = shift;
    graph.redrawShapes(); // Not sure this should be automatic here. The user should be clever.
  }

  function _registerEvents( graph ) {
    var self = graph;

    graph._dom.addEventListener( 'keydown', function( e ) {

      // Not sure this has to be prevented
      //e.preventDefault();
      //e.stopPropagation();

      if ( e.keyCode == 8 && self.selectedShape ) {
        self.selectedShape.kill();
      }

    } );

    graph.dom.addEventListener( 'mousemove', function( e ) {
      //e.preventDefault();
      var coords = self._getXY( e );
      _handleMouseMove( self, coords.x, coords.y, e );
    } );

    graph.dom.addEventListener( 'mouseleave', function( e ) {

      _handleMouseLeave( self );
    } );

    graph.dom.addEventListener( 'mousedown', function( e ) {

      self.focus();

      //   e.preventDefault();
      if ( e.which == 3 || e.ctrlKey ) {
        return;
      }

      var coords = self._getXY( e );
      _handleMouseDown( self, coords.x, coords.y, e );

    } );

    graph.dom.addEventListener( 'mouseup', function( e ) {

      //   e.preventDefault();
      var coords = self._getXY( e );
      _handleMouseUp( self, coords.x, coords.y, e );

    } );

    graph.dom.addEventListener( 'dblclick', function( e ) {
      //      e.preventDefault();

      //      if ( self.clickTimeout ) {
      //       window.clearTimeout( self.clickTimeout );
      //    }

      var coords = self._getXY( e );
      //    self.cancelClick = true;

      _handleDblClick( self, coords.x, coords.y, e );
    } );

    // Norman 26 june 2015: Do we really need the click timeout ?

    graph.dom.addEventListener( 'click', function( e ) {

      // Cancel right click or Command+Click
      if ( e.which == 3 || e.ctrlKey ) {
        return;
      }

      //   e.preventDefault();
      var coords = self._getXY( e );
      //    if ( self.clickTimeout ) {
      //     window.clearTimeout( self.clickTimeout );
      //  }

      // Only execute the action after 100ms
      // self.clickTimeout = window.setTimeout( function() {

      //  if ( self.cancelClick ) {
      //   self.cancelClick = false;
      //   return;
      // }

      if ( !self.prevent( false ) ) {
        _handleClick( self, coords.x, coords.y, e );
      }

      //}, 200 );
    } );

    graph.dom.addEventListener( 'mousewheel', function( e ) {
      e.preventDefault();
      e.stopPropagation();
      var deltaY = e.wheelDeltaY || e.wheelDelta || -e.deltaY;
      _handleMouseWheel( self, deltaY, e );

      return false;
    } );

    graph.rectEvent.addEventListener( 'wheel', function( e ) {
      e.stopPropagation();
      e.preventDefault();
      var deltaY = e.wheelDeltaY || e.wheelDelta || -e.deltaY;
      _handleMouseWheel( self, deltaY, e );

      return false;
    } );
  }

  function _handleMouseDown( graph, x, y, e ) {

    var self = graph,
      keyComb = graph.options.pluginAction,
      i;

    if ( graph.forcedPlugin ) {

      graph.activePlugin = graph.forcedPlugin;
      graph._pluginExecute( graph.activePlugin, 'onMouseDown', [ graph, x, y, e ] );
      return;
    }

    for ( i in keyComb ) {

      if ( graph.isPluginAllowed( e, keyComb[ i ] ) ) {

        graph.activePlugin = i; // Lease the mouse action to the current action
        graph._pluginExecute( i, 'onMouseDown', [ graph, x, y, e ] );
        return;
      }
    }

  }

  function _handleMouseMove( graph, x, y, e ) {

    if ( graph.bypassHandleMouse ) {
      graph.bypassHandleMouse.handleMouseMove( e );
      return;
    }

    if ( graph.activePlugin && graph._pluginExecute( graph.activePlugin, 'onMouseMove', [ graph, x, y, e ] ) ) {
      return;
    };

    //			return;

    graph._applyToAxes( 'handleMouseMove', [ x - graph.options.paddingLeft, e ], true, false );
    graph._applyToAxes( 'handleMouseMove', [ y - graph.options.paddingTop, e ], false, true );

    if ( !graph.activePlugin ) {
      var results = {};

      if ( graph.options.onMouseMoveData ) {

        for ( var i = 0; i < graph.series.length; i++ ) {

          results[ graph.series[ i ].getName() ] = graph.series[ i ].handleMouseMove( false, true );
        }

        graph.options.onMouseMoveData.call( graph, e, results );
      }
      return;
    }
  }

  function _handleDblClick( graph, x, y, e ) {
    //	var _x = x - graph.options.paddingLeft;
    //	var _y = y - graph.options.paddingTop;
    var pref = graph.options.dblclick;

    if ( !pref ||  !pref.type ) {
      return;
    }

    switch ( pref.type ) {

      case 'plugin':

        var plugin;

        if ( ( plugin = graph.plugins[ pref.plugin ] ) ) {

          plugin.onDblClick( graph, x, y, pref.options, e );
        }

        break;
    }
  }

  function _handleMouseUp( graph, x, y, e ) {

    if ( graph.bypassHandleMouse ) {
      graph.bypassHandleMouse.handleMouseUp( e );
      graph.activePlugin = false;
      return;
    }

    graph._pluginExecute( graph.activePlugin, 'onMouseUp', [ graph, x, y, e ] );
    graph.activePlugin = false;

  }

  function _handleClick( graph, x, y, e ) {

    graph.emit( 'click', e );

    // Not on a shape

    if ( !e.target.jsGraphIsShape && !graph.prevent( false ) ) {
      graph.unselectShapes();
    }
  }

  function _getAxis( graph, num, options, pos ) {

    var options = options || {};
    var inst;

    var _availableAxes = {

      def: {
        x: graph.getConstructor( "graph.axis.x" ),
        y: graph.getConstructor( "graph.axis.y" )
      },

      broken: {
        x: graph.getConstructor( "graph.axis.x.broken" ),
        y: graph.getConstructor( "graph.axis.y.broken" )
      },

      time: {
        x: graph.getConstructor( "graph.axis.x.time" )
      }
    };

    switch ( options.type ) {

      case 'time':
        var axisInstance = _availableAxes.time;
        break;

      case 'broken':
        var axisInstance = _availableAxes.broken;
        break;

      default:
        var axisInstance = _availableAxes.def;
        break;
    }

    switch ( pos ) {

      case 'top':
      case 'bottom':
        inst = axisInstance.x;
        break;

      case 'left':
      case 'right':
        inst = axisInstance.y;
        break;
    }

    num = num || 0;

    if ( typeof num == "object" ) {
      options = num;
      num = 0;
    }

    return graph.axis[ pos ][ num ] = graph.axis[ pos ][ num ] || new inst( graph, pos, options );
  }

  function _closeLine( graph, mode, x1, x2, y1, y2 ) {

    if ( graph.options.close === false ) {
      return;
    }

    var l = 0;

    graph.axis[ mode ].map( function( g ) {

      if ( g.isDisplayed() && !g.floating ) {
        l++;
      }
    } );

    if ( ( graph.options.close === true || graph.options.close[ mode ] ) && l == 0 ) {

      graph.closingLines[ mode ].setAttribute( 'display', 'block' );
      graph.closingLines[ mode ].setAttribute( 'x1', x1 );
      graph.closingLines[ mode ].setAttribute( 'x2', x2 );
      graph.closingLines[ mode ].setAttribute( 'y1', y1 );
      graph.closingLines[ mode ].setAttribute( 'y2', y2 );

    } else {

      graph.closingLines[ mode ].setAttribute( 'display', 'none' );

    }
  }

  function _handleMouseWheel( graph, delta, e ) {

    e.preventDefault();
    e.stopPropagation();

    if ( !graph.options.wheel.type ) {
      return;
    }

    switch ( graph.options.wheel.type ) {

      case 'plugin':

        var plugin;

        if ( plugin = graph.plugins[ graph.options.wheel.plugin ] ) {

          plugin.onMouseWheel( delta, e, graph.options.wheel.options );
        }

        break;

      case 'toSeries':

        for ( var i = 0, l = graph.series.length; i < l; i++ ) {
          graph.series[ i ].onMouseWheel( delta, e );
        }

        break;

    }

    // Redraw not obvious at all !!
    /*
    graph.redraw();
    graph.drawSeries( true );

    */
  }

  function _handleMouseLeave( graph ) {

    if ( graph.options.handleMouseLeave ) {
      graph.options.handleMouseLeave.call( this );

    }

  }

  function haveAxesChanged( graph ) {
    var temp = graph._axesHaveChanged;
    graph._axesHaveChanged = false;
    return temp;
  }

  /**
   * Returns a registered constructor
   * @memberof Graph.prototype
   * @param {String} constructorName - The constructor name to look for
   * @returns {Function} The registered constructor
   * @throws Error
   * @see Graph.registerConstructor
   * @name Graph#getConstructor
   */
  Graph.prototype.getConstructor = function( constructorName ) {
    var constructor = Graph.prototype._constructors[ constructorName ];
    if ( !constructor ) {
      return util.throwError( "Constructor \"" + constructorName + "\" doesn't exist" );
    }
    return constructor;
  };

  Graph.prototype._constructors = {},

  /**
   * Registers a constructor to jsGraph. Constructors are used on a later basis by jsGraph to create series, shapes or plugins
   * @name Graph.registerConstructor
   * @param {String} name - The name of the constructor
   * @see Graph#newSerie
   */
  Graph.registerConstructor = function( name, constructor ) {

    if ( Graph.prototype._constructors[ name ] ) {
      return util.throwError( "Constructor " + constructor + " already exists." );
    }

    Graph.prototype._constructors[ name ] = constructor;
  };

  return Graph;
} );