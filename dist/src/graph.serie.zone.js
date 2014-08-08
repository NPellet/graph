/* !
* Graphing JavaScript Library v0.2.0
* https://github.com/NPellet/graph
* 
* Copyright (c) 2014 Norman Pellet
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
* 
* Date: 08-08-2014
*/

define( [ require, './graph._serie'], function( require, SerieStatic ) {

	"use strict";

	var GraphSerieScatter = function() { }
	$.extend( GraphSerieScatter.prototype, SerieStatic.prototype, {

		defaults: {
			label: "",

			fillColor: 'rgba( 0, 0, 0, 0.1 )',
			lineColor: 'rgba( 0, 0, 0, 1 )',
			lineWidth: '1px',
		},


		init: function( graph, name, options ) {

			var self = this;

			this.graph = graph;
			this.name = name;

			this.id = Math.random() + Date.now();

			this.shown = true;
			this.options = $.extend(true, {}, GraphSerieScatter.prototype.defaults, options);
			this.data = [];

			this._isMinOrMax = { x: { min: false, max: false}, y: { min: false, max: false} };

			this.groupZones = document.createElementNS(this.graph.ns, 'g');
			this.groupMain = document.createElementNS(this.graph.ns, 'g');

			this.lineZone = document.createElementNS( this.graph.ns, 'path' );
			this.lineZone.setAttribute('stroke', 'black');
			this.lineZone.setAttribute('stroke-width', '1px');

			this.additionalData = {};

			this.minX = Number.MAX_VALUE;
			this.minY = Number.MAX_VALUE;
			this.maxX = Number.MIN_VALUE;
			this.maxY = Number.MIN_VALUE;
			
			this.groupMain.appendChild(this.groupZones);

			this.groupZones.appendChild( this.lineZone );

			this.currentAction = false;

			if(this.initExtended1) {
				this.initExtended1();
			}

		},


		/**
		 *	Possible data types
		 *	[100, 0.145, 101, 0.152, 102, 0.153]
		 *	[[100, 0.145, 101, 0.152], [104, 0.175, 106, 0.188]]
		 *	[[100, 0.145], [101, 0.152], [102, 0.153], [...]]
		 *	[{ x: 100, dx: 1, y: [0.145, 0.152, 0.153]}]
		 *
		 *	Converts every data type to a 1D array
		 */
		setData: function(data, arg, type) {

			var z = 0,
				x,
				dx, 
				arg = arg || "2D", 
				type = type || 'float', 
				arr, 
				total = 0,
				continuous;

			if( ! data instanceof Array ) {
				return;
			}

			var length;

			
			if( data instanceof Array && ! ( data[ 0 ] instanceof Array ) ) {// [100, 103, 102, 2143, ...]
				arg = "1D";
				length = data.length * 1.5;

				if( ! ( data[ 1 ] instanceof Array ) ) {
					arg = "1D_flat";
					length = data.length * 1;
				}  

			} else {

				if( data instanceof Array && ! ( data[ 0 ][ 1 ] instanceof Array ) ) {// [100, 103, 102, 2143, ...]
					arg = "2D_flat";
					length = data.length * 3;
				} else {
					arg = "2D";
					length = data.length * 3;
				}
			}

			arr = this._addData( type, length );
			
			z = 0;


			for(var j = 0, l = data.length; j < l; j++) {

				if( arg == "2D" || arg == "2D_flat" ) {

					arr[z] = (data[j][0]);
					this._checkX(arr[z]);
					z++;

					if( arg == "2D" ) {

						arr[ z ] = ( data[ j ][ 1 ][ 0 ] );
						this._checkY(arr[z]);
						z++;
						total++;
					
						arr[ z ] = ( data[ j ][ 1 ][ 1 ] );
						this._checkY(arr[z]);
						z++;
						total++;

					} else {

						arr[ z ] = ( data[ j ][ 1 ] );
						this._checkY(arr[z]);
						z++;
						total++;
					
						arr[ z ] = ( data[ j ][ 2 ] );
						this._checkY(arr[z]);
						z++;
						total++;
					}
					
				} else if( arg == "1D_flat" ) { // 1D Array

					if( j % 3 == 0 ) {
						arr[ z ] = data[ j ];
						this._checkX( arr[ z ] );
						z++;
						total++;

						continue;
					}

					arr[ z ] = data[ j ];
					this._checkY( arr[ z ] );
					z ++;
					total ++;

				} else {

					if( j % 2 == 0 ) {
						arr[ z ] = data[ j ];
						this._checkX( arr[ z ] );
						z++;
						total++;
						continue;
					}

					arr[ z ] = data[ j ][ 0 ];
					this_checkY( arr[ z ] );
					z ++;
					total ++;

					arr[ z ] = data[ j ][ 1 ];
					this_checkY( arr[ z ] );
					z ++;
					total ++;
				}
			}



			this.graph.updateAxes();

			this.data = arr;

			return this;
		},

		_addData: function(type, howmany) {

			switch(type) {
				case 'int':
					var size = howmany * 4; // 4 byte per number (32 bits)
				break;
				case 'float':
					var size = howmany * 8; // 4 byte per number (64 bits)
				break;
			}

			var arr = new ArrayBuffer(size);

			switch(type) {
				case 'int':
					return new Int32Array(arr);
				break;

				default:
				case 'float':
					return new Float64Array(arr);
				break;
			}
		},

		empty: function() {

			while( this.group.firstChild ) {
				this.group.removeChild( this.group.firstChild );
			}
		},

		select: function() {
			this.selected = true;

		},

		unselect: function() {
			this.selected = false;
		},

		setDataStyle: function( std, extra ) {
			this.stdStylePerso = std;
			this.extraStyle = extra;

			return this;
		},

		draw: function() { // Serie redrawing

			var x, 
				y, 
				xpx, 
				ypx1, 
				ypx2, 
				j = 0, 
				k, 
				m,
				currentLine, 
				max,
				self = this;

			this._drawn = true;			

			
			this.groupMain.removeChild( this.groupZones );


			var totalLength = this.data.length / 2;
			
			j = 0, k = 0, m = this.data.length;

			var error;
			var pathError = "";

			var pathTop = "";
			var pathBottom = "";

			var lineTop = [];
			var lineBottom = [];

			for( ; j < m ; j += 3 ) {

				xpx = this.getX( this.data[ j ] );
				ypx1 = this.getY( this.data[ j + 1 ] );
				ypx2 = this.getY( this.data[ j + 2 ] );

				if( ypx2 > ypx1 ) {
					lineTop.push( [ xpx, ypx1 ] );
					lineBottom.push( [ xpx, ypx2 ] );
				} else {
					lineTop.push( [ xpx, ypx2 ] );
					lineBottom.push( [ xpx, ypx1 ] );
				}
			}

			lineBottom.reverse();

			this.lineZone.setAttribute('d', "M " + lineTop[ 0 ] + " L " + lineTop.join(" L ") + " L " + lineBottom.join(" L ") + " z" );
			this.applyLineStyle( this.lineZone );
			this.groupMain.appendChild( this.groupZones );
		},



		applyLineStyle: function( line ) {

			line.setAttribute('stroke', this.getLineColor());
			line.setAttribute('stroke-width', this.getLineWidth() );
			line.setAttribute('fill', this.getFillColor( ) );
		},


		setLineWidth: function(width) {
			this.options.lineWidth = width;
			return this;
		},

		getLineWidth: function() {
			return this.options.lineWidth;
		},


		/* LINE COLOR */

		setLineColor: function(color) {
			this.options.lineColor = color;
			return this;
		},

		getLineColor: function() {
			return this.options.lineColor;
		},

		/* */



		/* LINE COLOR */

		setFillColor: function(color) {
			this.options.fillColor = color;
			return this;
		},

		getFillColor: function() {
			return this.options.fillColor;
		},

		/* */




	} );

	return GraphSerieScatter;
});