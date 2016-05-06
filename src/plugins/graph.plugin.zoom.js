define( [ 'jquery', '../graph.util', './graph.plugin', ], function( $, util, Plugin ) {

  /**
   * @class PluginZoom
   * @implements Plugin
   */
  var PluginZoom = function() {};

  PluginZoom.prototype = new Plugin();

  /**
   * Init method
   * @private
   * @memberof PluginZoom
   */
  PluginZoom.prototype.init = function( graph, options ) {

    this._zoomingGroup = document.createElementNS( graph.ns, 'g' );
    this._zoomingSquare = document.createElementNS( graph.ns, 'rect' );
    this._zoomingSquare.setAttribute( 'display', 'none' );

    util.setAttributeTo( this._zoomingSquare, {
      'display': 'none',
      'fill': 'rgba(171,12,12,0.2)',
      'stroke': 'rgba(171,12,12,1)',
      'shape-rendering': 'crispEdges',
      'x': 0,
      'y': 0,
      'height': 0,
      'width': 0
    } );

    this.graph = graph;
    graph.groupEvent.appendChild( this._zoomingGroup );
    this._zoomingGroup.appendChild( this._zoomingSquare );
  };

  PluginZoom.prototype.defaults = {
    "axes": "all"
  }

  /**
   * @private
   * @memberof PluginZoom
   */
  PluginZoom.prototype.onMouseDown = function( graph, x, y, e, mute ) {

    var zoomMode = this.options.zoomMode;

    if ( !zoomMode ) {
      return;
    }

    this._zoomingMode = zoomMode;

    if ( x === undefined ) {
      this._backedUpZoomMode = this._zoomingMode;
      this._zoomingMode = 'y';
      x = 0;
    }

    if ( y === undefined ) {
      this._backedUpZoomMode = this._zoomingMode;
      this._zoomingMode = 'x';
      y = 0;
    }

    this._zoomingXStart = x;
    this._zoomingYStart = y;
    this.x1 = x - graph.getPaddingLeft();
    this.y1 = y - graph.getPaddingTop();

    this._zoomingSquare.setAttribute( 'width', 0 );
    this._zoomingSquare.setAttribute( 'height', 0 );
    this._zoomingSquare.setAttribute( 'display', 'block' );

    switch ( this._zoomingMode ) {

      case 'x':
        this._zoomingSquare.setAttribute( 'y', graph.options.paddingTop );
        this._zoomingSquare.setAttribute( 'height', graph.getDrawingHeight() - graph.shift.bottom );
        break;

      case 'y':
        this._zoomingSquare.setAttribute( 'x', graph.options.paddingLeft /* + this.shift[1]*/ );
        this._zoomingSquare.setAttribute( 'width', graph.getDrawingWidth() /* - this.shift[1] - this.shift[2]*/ );
        break;

      case 'forceY2':

        this.y2 = graph.getYAxis().getPx( this.options.forcedY ) + graph.options.paddingTop;

        break;

    }

    if ( this.options.onZoomStart && !mute ) {
      this.options.onZoomStart( graph, x, y, e, mute );
    }
  };

  /**
   * @private
   * @memberof PluginZoom
   */
  PluginZoom.prototype.onMouseMove = function( graph, x, y, e, mute ) {

    //	this._zoomingSquare.setAttribute('display', 'none');

    //	this._zoomingSquare.setAttribute('transform', 'translate(' + Math.random() + ', ' + Math.random() + ') scale(10, 10)');

    switch ( this._zoomingMode ) {

      case 'xy':
        this._zoomingSquare.setAttribute( 'x', Math.min( this._zoomingXStart, x ) );
        this._zoomingSquare.setAttribute( 'y', Math.min( this._zoomingYStart, y ) );
        this._zoomingSquare.setAttribute( 'width', Math.abs( this._zoomingXStart - x ) );
        this._zoomingSquare.setAttribute( 'height', Math.abs( this._zoomingYStart - y ) );

        break;

      case 'forceY2':
        this._zoomingSquare.setAttribute( 'y', Math.min( this._zoomingYStart, this.y2 ) );
        this._zoomingSquare.setAttribute( 'height', Math.abs( this._zoomingYStart - this.y2 ) );
        this._zoomingSquare.setAttribute( 'x', Math.min( this._zoomingXStart, x ) );
        this._zoomingSquare.setAttribute( 'width', Math.abs( this._zoomingXStart - x ) );

        break;

      case 'x':
        this._zoomingSquare.setAttribute( 'x', Math.min( this._zoomingXStart, x ) );
        this._zoomingSquare.setAttribute( 'width', Math.abs( this._zoomingXStart - x ) );

        break;

      case 'y':
        this._zoomingSquare.setAttribute( 'y', Math.min( this._zoomingYStart, y ) );
        this._zoomingSquare.setAttribute( 'height', Math.abs( this._zoomingYStart - y ) );
        break;

    }

    if ( this.options.onZoomMove && !mute ) {

      this.options.onZoomMove( graph, x, y, e, mute );
    }
    //		this._zoomingSquare.setAttribute('display', 'block');

  };

  /**
   * @private
   * @memberof PluginZoom
   */
  PluginZoom.prototype.onMouseUp = function( graph, x, y, e, mute ) {

    var self = this;
    this.removeZone();
    var _x = x - graph.options.paddingLeft;
    var _y = y - graph.options.paddingTop;

    if ( ( x - this._zoomingXStart == 0 && this._zoomingMode != 'y' ) || ( y - this._zoomingYStart == 0 && this._zoomingMode != 'x' ) ) {
      return;
    }

    graph.cancelClick = true;

    if ( this.options.transition ) {

      var modeX = false,
        modeY = false;

      if ( this._zoomingMode == 'x' ||  this._zoomingMode == 'xy' || this._zoomingMode == 'forceY2' ) {

        this.fullX = false;
        this.toAxes( function( axis ) {

          axis._pluginZoomMin = axis.getCurrentMin();
          axis._pluginZoomMax = axis.getCurrentMax();

          axis._pluginZoomMinFinal = Math.min( axis.getVal( _x ), axis.getVal( self.x1 ) );
          axis._pluginZoomMaxFinal = Math.max( axis.getVal( _x ), axis.getVal( self.x1 ) );
        }, false, true, false );

        modeX = true;

      }

      if ( this._zoomingMode == 'y' ||  this._zoomingMode == 'xy' ) {

        this.fullY = false;
        this.toAxes( function( axis ) {

          axis._pluginZoomMin = axis.getCurrentMin();
          axis._pluginZoomMax = axis.getCurrentMax();

          axis._pluginZoomMinFinal = Math.min( axis.getVal( _y ), axis.getVal( self.y1 ) );
          axis._pluginZoomMaxFinal = Math.max( axis.getVal( _y ), axis.getVal( self.y1 ) );

        }, false, false, true );

        modeY = true;
      }

      if ( this._zoomingMode == 'forceY2' ) {

        this.fullY = false;
        this.toAxes( function( axis ) {

          axis._pluginZoomMin = axis.getCurrentMin();
          axis._pluginZoomMax = axis.getCurrentMax();

          axis._pluginZoomMinFinal = Math.min( axis.getVal( self.y2 ), axis.getVal( self.y1 ) );
          axis._pluginZoomMaxFinal = Math.max( axis.getVal( self.y2 ), axis.getVal( self.y1 ) );

        }, false, false, true );

        modeY = true;
      }

      this.transition( modeX, modeY, "zoomEnd" );

    } else {

      switch ( this._zoomingMode ) {
        case 'x':
          this.fullX = false;
          this.toAxes( '_doZoom', [ _x, this.x1 ], true, false );
          break;
        case 'y':
          this.fullY = false;
          this.toAxes( '_doZoom', [ _y, this.y1 ], false, true );
          break;
        case 'xy':
          this.fullX = false;
          this.fullY = false;
          this.toAxes( '_doZoom', [ _x, this.x1 ], true, false );
          this.toAxes( '_doZoom', [ _y, this.y1 ], false, true );
          break;

        case 'forceY2':

          this.fullX = false;
          this.fullY = false;

          this.toAxes( '_doZoom', [ _x, this.x1 ], true, false );
          this.toAxes( '_doZoom', [ this.y1, this.y2 ], false, true );

          break;
      }

      graph.prevent( true );
      graph.draw();

      if ( this._backedUpZoomMode ) {
        this._zoomingMode = this._backedUpZoomMode;
      }

      this.emit( "zoomed" );

    }

  };

  /**
   * @private
   * @memberof PluginZoom
   */
  PluginZoom.prototype.removeZone = function() {
    this._zoomingSquare.setAttribute( 'display', 'none' );
  };

  /**
   * @private
   * @memberof PluginZoom
   */
  PluginZoom.prototype.onMouseWheel = function( delta, e, options ) {

    if ( !options ) {
      options = {};
    }

    if ( !options.baseline ) {
      options.baseline = 0;
    }

    /*var serie;
    if ( ( serie = this.graph.getSelectedSerie() ) ) {

      if ( serie.getYAxis().handleMouseWheel( delta, e ) ) {
        return;
      }
    }*/

    var doX = ( options.direction == 'x' );
    var doY = !( options.direction !== 'y' );

    this.toAxes( 'handleMouseWheel', [ delta, e, options.baseline ], doX, doY );

    this.graph.drawSeries();

  };

  /**
   * @private
   * @memberof PluginZoom
   */
  PluginZoom.prototype.onDblClick = function( graph, x, y, pref, e, mute ) {

    this.emit( "beforeDblClick", {
      graph: graph,
      x: x,
      y: y,
      pref: pref,
      e: e,
      mute: mute
    } );

    if ( graph.prevent( false ) ) {
      return;
    }

    if ( this.options.transition ) {

      var modeX = false,
        modeY = false;

      if ( pref.mode == 'xtotal' ||  pref.mode == 'total' ) {

        this.toAxes( function( axis ) {
          axis._pluginZoomMin = axis.getCurrentMin();
          axis._pluginZoomMax = axis.getCurrentMax();

          axis._pluginZoomMinFinal = axis.getMinValue();
          axis._pluginZoomMaxFinal = axis.getMaxValue();

        }, false, true, false );

        modeX = true;

      }

      if ( pref.mode == 'ytotal' ||  pref.mode == 'total' ) {

        this.toAxes( function( axis ) {

          axis._pluginZoomMin = axis.getCurrentMin();
          axis._pluginZoomMax = axis.getCurrentMax();

          axis._pluginZoomMinFinal = axis.getMinValue();
          axis._pluginZoomMaxFinal = axis.getMaxValue();

        }, false, false, true );

        modeY = true;

      }

      if ( pref.mode == 'gradualX' ||  pref.mode == 'gradual' ) {

        this.toAxes( function( axis ) {

          axis._pluginZoomMin = axis.getCurrentMin();
          axis._pluginZoomMax = axis.getCurrentMax();

          axis._pluginZoomMinFinal = axis.getCurrentMin() - ( axis.getCurrentMax() - axis.getCurrentMin() );
          axis._pluginZoomMaxFinal = axis.getCurrentMax() + ( axis.getCurrentMax() - axis.getCurrentMin() );

        }, false, true, false );

        modeX = true;

      }

      if ( pref.mode == 'gradualY' ||  pref.mode == 'gradual' ) {

        this.toAxes( function( axis ) {

          axis._pluginZoomMin = axis.getCurrentMin();
          axis._pluginZoomMax = axis.getCurrentMax();

          axis._pluginZoomMinFinal = axis.getCurrentMin() - ( axis.getCurrentMax() - axis.getCurrentMin() );
          axis._pluginZoomMaxFinal = axis.getCurrentMax() + ( axis.getCurrentMax() - axis.getCurrentMin() );

        }, false, true, false );

        modeY = true;

      }

      this.transition( modeX, modeY, "dblClick" );
    }

    var xAxis = this.graph.getXAxis(),
      yAxis = this.graph.getYAxis();

    if ( pref.mode == 'xtotal' ) {

      this.toAxes( "setMinMaxToFitSeries", null, true, false );
      this.fullX = true;
      this.fullY = false;

    } else if ( pref.mode == 'ytotal' ) {

      this.toAxes( "setMinMaxToFitSeries", null, false, true );
      this.fullX = false;
      this.fullY = true;

    } else if ( pref.mode == 'total' ) {

      this.graph.autoscaleAxes();
      this.fullX = true;
      this.fullY = true;
      // Nothing to do here
      /*        this.graph._applyToAxes( function( axis ) {

          axis.emit( 'zoom', axis.currentAxisMin, axis.currentAxisMax, axis );

        }, null, true, true );
*/
    } else {

      x -= this.graph.options.paddingLeft;
      y -= this.graph.options.paddingTop;

      var
        xMin = xAxis.getCurrentMin(),
        xMax = xAxis.getCurrentMax(),
        xActual = xAxis.getVal( x ),
        diffX = xMax - xMin,

        yMin = yAxis.getCurrentMin(),
        yMax = yAxis.getCurrentMax(),
        yActual = yAxis.getVal( y ),
        diffY = yMax - yMin;

      if ( pref.mode == 'gradualXY' || pref.mode == 'gradualX' ) {

        var ratio = ( xActual - xMin ) / ( xMax - xMin );
        xMin = Math.max( xAxis.getMinValue(), xMin - diffX * ratio );
        xMax = Math.min( xAxis.getMaxValue(), xMax + diffX * ( 1 - ratio ) );
        xAxis.setCurrentMin( xMin );
        xAxis.setCurrentMax( xMax );

        if ( xAxis.options.onZoom ) {
          xAxis.options.onZoom( xMin, xMax );
        }

        xAxis.cacheCurrentMin();
        xAxis.cacheCurrentMax();
        xAxis.cacheInterval();

      }

      if ( pref.mode == 'gradualXY' || pref.mode == 'gradualY' ) {

        var ratio = ( yActual - yMin ) / ( yMax - yMin );
        yMin = Math.max( yAxis.getMinValue(), yMin - diffY * ratio );
        yMax = Math.min( yAxis.getMaxValue(), yMax + diffY * ( 1 - ratio ) );
        yAxis.setCurrentMin( yMin );
        yAxis.setCurrentMax( yMax );

        if ( yAxis.options.onZoom ) {
          yAxis.options.onZoom( yMin, yMax );
        }

        yAxis.cacheCurrentMin();
        yAxis.cacheCurrentMax();
        yAxis.cacheInterval();

      }

    }

    this.graph.draw();
    /*
        this.emit( "dblClick", {
          graph: graph,
          x: x,
          y: y,
          pref: pref,
          e: e,
          mute: mute
        } );

        if ( this.options.onDblClick && !mute ) {
          this.options.onDblClick( graph, x, y, e, mute );
        }*/

  };

  PluginZoom.prototype.transition = function( modeX, modeY, eventName ) {

    var self = this;

    if ( !self.gradualUnzoomStart ) {
      self.gradualUnzoomStart = Date.now();
    }

    window.requestAnimationFrame( function() {

      var dt = Date.now() - self.gradualUnzoomStart;
      var progress = Math.sin( dt / 500 * Math.PI / 2 );

      this.toAxes( function( axis ) {

        axis.setCurrentMin( axis._pluginZoomMin + ( axis._pluginZoomMinFinal - axis._pluginZoomMin ) * progress );
        axis.setCurrentMax( axis._pluginZoomMax + ( axis._pluginZoomMaxFinal - axis._pluginZoomMax ) * progress );

        axis.cacheCurrentMin();
        axis.cacheCurrentMax();
        axis.cacheInterval();

      }, false, modeX, modeY );

      self.graph.draw();

      if ( dt < 500 ) {

        self.transition( modeX, modeY, eventName );
        self.emit( "zooming" );

      } else {

        self.emit( "zoomed" );

        if ( eventName ) {
          self.emit( eventName )
        }
        self.gradualUnzoomStart = 0;

      }

    } );
  }

  PluginZoom.prototype.isFullX = function() {
    return this.fullX;
  }

  PluginZoom.prototype.isFullY = function() {
    return this.fullY;
  }

  PluginZoom.prototype.toAxes = function( func, params, tb, lr ) {
    switch ( this.options.axes ) {

      case 'all':
        this.graph._applyToAxes.apply( this.graph, arguments );
        break;

      case 'serieSelected':

        var serie = this.graph.getSelectedSerie();
        if ( serie ) {

          if ( tb ) {

            if ( typeof func == "string" ) {
              serie.getXAxis()[ func ].apply( serie.getXAxis(), params )
            } else {
              func.apply( serie.getXAxis(), params );
            }
          }

          if ( lr ) {

            if ( typeof func == "string" ) {
              serie.getYAxis()[ func ].apply( serie.getYAxis(), params )
            } else {
              func.apply( serie.getYAxis(), params );
            }

          }
        }

        break;
    }
  }

  return PluginZoom;
} );
