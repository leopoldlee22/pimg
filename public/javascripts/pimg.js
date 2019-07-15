

var img_dom_id = 'imginst';
var img_src_list = ['/images/0386580_PE559161_S5.webp',
                    '/images/0467229_PE610803_S5.webp']
var current_img_src_index = 0;


var load_img = function ( domid, imgsrc ) {
    var imgsrc = imgsrc || '';
    if ( '' == imgsrc ) return;

    var img = document.getElementById( domid )
    if ( null == img ) return;

    img.src = imgsrc;
}

var switch_img = function () {
    current_img_src_index++;
    if ( current_img_src_index >= img_src_list.length )
        current_img_src_index = 0;

    load_img( img_dom_id, img_src_list[ current_img_src_index ]);
}

var rmwm_img = function () {
    var img = document.getElementById( img_dom_id )
    if ( null == img ) return;

	var base64str = leopoldlee22.tool.pimg.remove_white_margin( img )
	if ( base64str )
    	load_img( img_dom_id, base64str );
	
}

var vflip_img = function () {
    var img = document.getElementById( img_dom_id )
    if ( null == img ) return;

	var base64str = leopoldlee22.tool.pimg.flip_vertical( img )
	if ( base64str )
    	load_img( img_dom_id, base64str );
}

var hflip_img = function () {
    var img = document.getElementById( img_dom_id )
    if ( null == img ) return;

	var base64str = leopoldlee22.tool.pimg.flip_horizontal( img )
	if ( base64str )
    	load_img( img_dom_id, base64str );
}

var rotate_img_cw = function () {
    var img = document.getElementById( img_dom_id )
    if ( null == img ) return;

	var base64str = leopoldlee22.tool.pimg.rotate_clockwise( img )
	if ( base64str )
    	load_img( img_dom_id, base64str );
}

var rotate_img_acw = function () {
    var img = document.getElementById( img_dom_id )
    if ( null == img ) return;

	var base64str = leopoldlee22.tool.pimg.rotate_anticlockwise( img )
	if ( base64str )
    	load_img( img_dom_id, base64str );
}


var page_init = function() {

    load_img( img_dom_id, img_src_list[ current_img_src_index ]);

    leopoldlee22.tool.pimg.init()

}


page_init();