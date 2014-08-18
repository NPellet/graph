define([ 'require' ], function( require ) {
	
	return function() {

		this.caching = {};
		this.folderMap = {};

		this.load = function( type, file, callback ) {

			var self = this;

			if( ! this.caching[ type ] ) {
				this.caching[ type ] = {};
			}

			if( Array.isArray( file ) ) {

				file.map( function( file ) {

					self.load( type, file, callback );

				} );
				return;
			}
			

			if( this.folderMap[ type ] ) {

				file = this.folderMap[ type ] + file;
			}

			if( this.caching[ type ][ file ] ) {

			//	console.log( "Found element " + file + " of type " + type + " in cache" );

				return ( callback( this.caching[ type ][ file ], file ) || this.caching[ type ][ file ] );
				

			} else if( typeof build !== "undefined" && build[ file ]) {

				return ( callback( this.caching[ type ][ file ] = build[ file ], file ) || this.caching[ type ][ file ] );

			} else if( typeof require !== "undefined" ) {
				//console.log( "Trying to load file " + file + " of type " + type, this.folderMap );
				require( [ file ], function( instance ) {

					callback( self.caching[ type ][ file ] = instance, file );
				} );
			} else {
				console.warn("Could not load file " + file + " of type " + type );
			}
		}

		this.configure = function( map ) {
			this.folderMap = map || {};
		}

		//return loader;

	};
	
} );