$(document).ready(function() {

  $("#tabs").click(function(event) {  tabbarna();  });
}


$( function tabbarna() {
  $( "#tabs" ).tabs();
   collapsible: true
} );
