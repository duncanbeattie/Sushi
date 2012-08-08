$(document).ready(function(){	
	if($('#sushi')[0]){ sushi($('#sushi'), 'sushi.xml'); $('#sushi .fallback').remove() }
});




/*
 * Sushi Gallery
 *
 */
function sushi(obj, path){
	$.Sushi = obj;
	$.Sushi.list = []
	
	/* parse xml into objects */
	$.ajax({type: "GET",url: path,dataType: "xml",success: function(xml) {
		$(xml).find('folder').each(function(i){
			var G = new Object();
			G.name = $(this).attr('name');
			G.imgs = []
			$(this).find('image').each(function(i, el){
				var alt = $(el).attr('altText'), url = $(el).attr('url'), str = '<img src="'+url+'" alt="'+alt+'" />';
				G.imgs.push(str)
			});
			$.Sushi.list.push(G)
		});
		$.Sushi.listview()
	}});
	
	/* listview */
	$.Sushi.listview = function(){
		for(i=0;i<$.Sushi.list.length;i++){
			var gal = $.Sushi.list[i]
			var str = '<h3>'+gal.name+'</h3>'
			str+= '<div class="imgHolder">'+gal.imgs[0]+'</div>'
			$.Sushi.append('<div class="gal_title" rel="'+i+'">'+str+'</div>')
		}
		$('.gal_title').click(function() { $.Sushi.galView($(this).attr('rel')) });
	}
	
	/* galview */
	$.Sushi.galView = function(n){
		$('.gal_title').slideToggle('normal', function() {
			$('.gal_grid').remove()
			var gal = $.Sushi.list[n]
			var str1 ='<div class="gal_grid"><div class="bar"><h3>'+gal.name+'</h3><span class="close">close</span></div><div class="bigpic">'+gal.imgs[0]+'</div><div class="gal_thms">'			
			for(ix=0;ix<gal.imgs.length;ix++){str1+= '<div class="imgHolder" rel="'+n+':'+ix+'">'+gal.imgs[ix]+'</div>'}
			$.Sushi.append(str1+'</div></div>')
			
			$('.gal_thms .imgHolder').click(function() { $.Sushi.swapimg($(this).attr('rel')) });
			$('.gal_grid .close').click(function() { $.Sushi.close_galview() });
		});
	}
	
	/* swapimg */
	$.Sushi.swapimg = function(n){
		var sp = n.split(':')
		$('.bigpic').fadeOut('normal', function() {
			$('.bigpic img').remove()
			$('.bigpic').append($.Sushi.list[sp[0]].imgs[sp[1]])
			$('.bigpic').fadeIn('normal')
		});
		
	}
	
	/* close_galview */
	$.Sushi.close_galview = function(){
		$('.gal_grid').fadeOut()
		$('.gal_title').slideToggle('normal', function() {
			$('.gal_grid').remove()
		});
	}
}

