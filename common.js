jQuery(document).ready(function($){
	$("div#p-views ul").prepend("<li id='readerButton'><span><a>View in Reader</a></span></li>"); 
	$("#readerButton").click(function(){
		var text=$("#mw-content-text").clone();
                var heading=$("#firstHeading").clone();
                text.find("table,div,span.editsection,sup.reference").remove();
                text.find("a").addClass('readerLink');
                text.attr('id','readerContent');
                heading.attr('id','readerHeading').removeClass('firstHeading');
                text.prepend(heading);
                var close=$("<div id='closeButton'>&times;</div>").click(function(){
			$("#readerWrapper,#opacity,#closeButton").remove();
		});;
		var wrapper=$("<div id='readerWrapper'> </div>").append(text);
		$("body").append($("<div id='opacity'> </div>"));
		$("body").append(close);		
		$("body").append(wrapper);
		
		
		chrome.extension.sendRequest({method: "getLocalStorage", key: "readerFont"}, function(response) {
 			 var fontOption = response.data;
 			 //console.log(fontOption);
 			 switch(fontOption){
				case 'sans':
					$("#readerContent").css('font-family','Arial, Helvetica, sans-serif');
					break;
				case 'serif':
					$("#readerContent").css('font-family','Georgia, Garamond, serif');
					break;
				default:
					$("#readerContent").css('font-family','Georgia, Garamond, serif');
			}
		});
		
		
		chrome.extension.sendRequest({method: "getLocalStorage", key: "readerFontSize"}, function(response) {
 			 var fontSize = response.data;
 			 console.log(fontSize);
 			 if(fontSize){
 			 	$("#readerContent").css('font-size',fontSize+'em');
 			 } 			 
		});
		
		
		//$("#closeButton")
		$(window).keyup(function(e){
			if(e.which==27){
				$("#readerWrapper,#opacity").remove();
			}
		});
	});
});

