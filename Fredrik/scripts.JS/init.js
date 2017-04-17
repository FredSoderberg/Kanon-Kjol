$(document).ready(function() {

$("#create_task").click(function() {
var name = $("#task_name").val();
  insertTask(null,name);
listAllTasks();
});

$("#listAllTasks").click(function() {
    listAllTasks();
});












//-----------------------------DEMO!!!!!!!!!!---------------------------------------------
var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
$.getJSON( flickerAPI, {
  tags: "uppsala domkyrka",
  tagmode: "any",
  format: "json"
})
  .done(function( data ) {
    $.each( data.items, function( i, item ) {
      $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
      if ( i === 10 ) {
        return false;
      }
    });
  });


});
