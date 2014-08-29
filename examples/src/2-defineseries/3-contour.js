define( function() {

	return [ function( domGraph ) {



		function hslToRgb(h, s, l){
		    var r, g, b;

		    if(s == 0){
		        r = g = b = l; // achromatic
		    }else{
		        function hue2rgb(p, q, t){
		            if(t < 0) t += 1;
		            if(t > 1) t -= 1;
		            if(t < 1/6) return p + (q - p) * 6 * t;
		            if(t < 1/2) return q;
		            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
		            return p;
		        }

		        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		        var p = 2 * l - q;
		        r = hue2rgb(p, q, h + 1/3);
		        g = hue2rgb(p, q, h);
		        b = hue2rgb(p, q, h - 1/3);
		    }

		    return "rgb(" + [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)].join(", ") + ")";
		}


		var graphinstance = new Graph( domGraph, { series: [ 'contour' ] }, function( graphinstance ) {

			var serie = graphinstance.newSerie("serieTest", {}, "contour")
				.setLabel( "My serie" )
				.autoAxis()
				.setData( contour );
				

			var colors = [];
			for( var i = 0, l = contour.length ; i < l ; i ++ ) {
				colors.push( hslToRgb(0 + i / l, 1, 0.5) );
			}

			serie.setColors( colors );

			graphinstance.getXAxis().forceMin( -5 );
			graphinstance.getXAxis().forceMax( 5 );

			graphinstance.getYAxis().forceMin( -5 );
			graphinstance.getYAxis().forceMax( 5 );

			graphinstance.redraw( );
			graphinstance.drawSeries();	

		} );
		
	}, "Contour plot", [ 


	"You can use the serie type <code>contour</code> to display contour lines. The serie data must be object having the properties <code>zValue</code> and <code>lines</code>, which is an linear array containing a multiple of 4 elements (xfrom, yfrom, xto, yto)",
	'An example of a contour lines generator can be downloaded <a href="https://github.com/cheminfo/jcampconverter">here</a>.'

	] ];

});


