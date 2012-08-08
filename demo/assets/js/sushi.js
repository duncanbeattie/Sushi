$(document).ready(function(){
	log('loaded')
	
	if($('#sushi')[0]){ sushi($('#sushi'), 'sushi.xml'); $('#sushi .fallback').remove() }
});




/*
 * Sushi Gallery
 *
 */
function sushi(obj, path){
	log('sushi')
	$.Sushi = obj;
	$.Sushi.list = []
	
	/* parse xml into objects */
	log(path)
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
		log('listview')
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
		$('.gal_title').slideToggle('fast', function() {
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
		log('n: '+n+' :: n[0]: '+n[0])
		$('.bigpic img').remove()
		$('.bigpic').append($.Sushi.list[sp[0]].imgs[sp[1]])
	}
	
	/* close_galview */
	$.Sushi.close_galview = function(){
		$('.gal_grid').fadeOut()
		$('.gal_title').slideToggle('slow', function() {
			$('.gal_grid').remove()
		});
	}
}


// Plugins

// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
log.history = log.history || [];   // store logs to an array for reference
log.history.push(arguments);
arguments.callee = arguments.callee.caller; 
if(this.console) console.log( Array.prototype.slice.call(arguments) );
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info, log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});
