jQuery(document).ready(function($){

$("#save").click(function(){save_options()});


function save_options() {
  var font = $("#fonts option:selected").val();
  var fontsize = $("#fontsize").val();
  localStorage["readerFont"] = font;
  localStorage["readerFontSize"] = fontsize;
  // Update status to let user know options were saved.
  $("#status").html('Options Saved');
  setTimeout(function() {
    $("#status").html('');
  }, 750);
}

restore_options();
// Restores select box state to saved value from localStorage.
function restore_options() {
  var fontSize=localStorage["readerFontSize"];
  if(fontSize){
  	$("#fontsize").val(fontSize);
  }

  var font = localStorage["readerFont"];
  if (!font) {
    return;
  }
  var select = $("#fonts");
  for (var i = 0; i < select.children().length; i++) {
    var child = select.children()[i];
    if ($(child).val() == font) {
      $(child).attr('selected', "true");
      break;
    }
  }

}
});

