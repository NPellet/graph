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


define(['require', 'graphs/graph.serie'], function( require, GraphSerie ) {

	var GraphSerieAxis = function() {};

	GraphSerie.prototype,

	$.extend( true, GraphSerieAxis.prototype, GraphSerie.prototype, {

		initExtended1: function() {
			if(this.initExtended2)
				this.initExtended2();
		},

		setAxis: function(axis) {
			this.axis = axis;
		},


		kill: function(noRedraw) {
			this.getAxis().groupSeries.removeChild(this.groupMain);
			this.getAxis().series.splice(this.getAxis().series.indexOf(this), 1);
			if(!noRedraw)
				this.graph.redraw();
		},

		getAxis: function() {
			return this.axis;
		},

		getXAxis: function() {
			return this.axis;
		},

		getYAxis: function() {
			return this.axis;
		}
	});

	return GraphSerieAxis;
});