
render_cover = function(){
  var html = "";
  html = "<div id='cover' class= 'calendar_cover'></div>";
  $("body").append(html);

}
render_inputbox = function(){
  var html = "<div id='infoBox' class='col_container'>";
  html    += "<div id='infobox_text' class='infobox_text'></div>"

  html    += "</div>";
  $("body").prepend(html);
}

add_event_to_coverInputbox = function(){
  $(".calendar_cover").click(function(){
    $(this).remove();
    $("#infoBox").remove();
  });
}
