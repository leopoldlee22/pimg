/* Tool package contained all support tools to support front end javascript library
 *
 * Leopold+Li<leopoldlee22@163.com>
 * Jul.16th, 2019
 * Last update: 2019-07-16
 */

 /* leopoldlee22.tool
  * leopoldlee22.tool.pimg support process image on html5 canvas
  */
(function(){

    var leopoldlee22 = leopoldlee22 || {};
    leopoldlee22.tool = leopoldlee22.tool || {};

    // process image
    leopoldlee22.tool.pimg = {

        // dom object refer to html DOM CANVAS object
        canvas : null,

        dispose : function () {

            if ( this.canvas ) this.canvas.remove();
            this.canvas = null;
        },

        // remove white color of margin and return PNG image
        // to be enhanced with seed filling algorithm instead of replacing all white points
        remove_white_margin : function ( img, auto_resize ) {

            var img = img || undefined;
            if ( undefined == img ) return;
            var auto_resize = auto_resize || false;

            var width = img.naturalWidth,
                height = img.naturalHeight;
            if ( 0 == width || 0 == height ) return;

            this.canvas.width = width;
            this.canvas.height = height;

            var ctx = this.canvas.getContext('2d');
            ctx.drawImage( img, 0, 0 );

            var imgdata = ctx.getImageData( 0, 0, this.canvas.width, this.canvas.height );
            var data = imgdata.data; // help to quickly visit data

            // start to replace
            var r, g, b;
            var j, x, y;
            var xmin = width,  xmax = -1, xd,
                ymin = height, ymax = -1, yd;

            for ( var i = 0; i < data.length; i += 4) {
                r = data[ i ];
                g = data[ i + 1 ];
                b = data[ i + 2 ];

                if ( 256 > r && r > 245 &&
                     256 > g && g > 245 &&
                     256 > b && b > 245 ) {
                    data[ i + 3 ] = 0;
                }
                // record points with color
                else {
                    j = Math.floor( i / 4 );
                    x = Math.floor( j % width );
                    y = Math.floor( j / width );

                    xmin = x < xmin ? x : xmin;
                    xmax = x > xmax ? x : xmax;
                    ymin = y < ymin ? y : ymin;
                    ymax = y > ymax ? y : ymax;
                }
            }

            ctx.putImageData( imgdata, 0, 0 );

            if ( auto_resize ) {
                xd = xmax - xmin + 1;
                yd = ymax - ymin + 1;
                imgdata = ctx.getImageData( xmin, ymin, xd, yd )

                this.canvas.width = xd;
                this.canvas.height = yd;
                ctx.clearRect( 0, 0, xd, yd );
                ctx.putImageData( imgdata, 0, 0 );
            }

            return this.canvas.toDataURL( 'image/png' );
        },

        //
        flip_vertical : function ( img ) {

            var img = img || undefined;
            if ( undefined == img ) return;

            var width = img.naturalWidth,
                height = img.naturalHeight;
            if ( 0 == width || 0 == height ) return;

            this.canvas.width = width;
            this.canvas.height = height;


            var ctx = this.canvas.getContext('2d');

            // flip vertically
            ctx.save();
            ctx.scale( 1, -1 );
            ctx.drawImage( img, 0, -height );
            ctx.restore();

            return this.canvas.toDataURL( 'image/png' );
        },

        flip_horizontal : function ( img ) {

            var img = img || undefined;
            if ( undefined == img ) return;

            var width = img.naturalWidth,
                height = img.naturalHeight;
            if ( 0 == width || 0 == height ) return;

            this.canvas.width = width;
            this.canvas.height = height;


            var ctx = this.canvas.getContext('2d');

            // flip horizontally
            ctx.save();
            ctx.scale( -1, 1 );
            ctx.drawImage( img, -width, 0 );
            ctx.restore();

            return this.canvas.toDataURL( 'image/png' );
        },

        rotate_clockwise : function ( img ) {

            var img = img || undefined;
            if ( undefined == img ) return;

            var width = img.naturalWidth,
                height = img.naturalHeight;
            if ( 0 == width || 0 == height ) return;


            // swith width and height
            this.canvas.width = height;
            this.canvas.height = width;


            var ctx = this.canvas.getContext('2d');

            // rotation +90d
            ctx.rotate( Math.PI / 2.0 );
            ctx.translate( 0, -height );
            ctx.drawImage( img, 0, 0 );

            return this.canvas.toDataURL( 'image/png' );

        },

        rotate_anticlockwise : function ( img ) {

            var img = img || undefined;
            if ( undefined == img ) return;

            var width = img.naturalWidth,
                height = img.naturalHeight;
            if ( 0 == width || 0 == height ) return;

            // swith width and height
            this.canvas.width = height;
            this.canvas.height = width;


            var ctx = this.canvas.getContext('2d');

            // rotation -90d
            ctx.rotate( -Math.PI / 2.0 );
            ctx.translate( -width, 0 );
            ctx.drawImage( img, 0, 0 );

            return this.canvas.toDataURL( 'image/png' );
        },


        init : function() {
            if ( null != this.canvas )
                this.dispose();
            this.canvas = document.createElement( 'canvas' );
        }
    };


    window.leopoldlee22 = leopoldlee22;

})();