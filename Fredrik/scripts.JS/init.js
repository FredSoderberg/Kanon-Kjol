$(document).ready(function() {

$("#create_task").click(function() {
var name = $("#task_name").val();
  insertTask(null,name);
listAllTasks();
});

$("#listAllTasks").click(function() {
    listAllTasks();

function openLeftMenu() {
  document.getElementById("main").style.marginLeft = "25%";
  document.getElementById("leftMenu").style.width = "25%";
  document.getElementById("leftMenu").style.display = "block";
  document.getElementById("menuIcon").setAttribute( "onClick", "closeLeftMenu();" );
  document.getElementById("menuIcon").src="img/logo/logo_white.svg";
  w3.toggleClass('#menuIcon','w3-dark-grey','w3-grey')
}


function closeLeftMenu() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("leftMenu").style.display = "none";
  document.getElementById("menuIcon").setAttribute( "onClick", "openLeftMenu();" );
  document.getElementById("menuIcon").src="img/logo/logo_icon.svg";
  document.getElementById("menuIcon").style.backgroundColor ="lightgrey";
    w3.toggleClass('#menuIcon','w3-dark-grey','w3-grey')
}


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
