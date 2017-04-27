function moveSidebar(){
  var mySidebar = $("#mySidebar").detach();
  $("li.ui-tabs-tab").each(function (index, element){
      if($(element).hasClass("ui-state-active")) {
        //console.log(element);
        var corrChild = $(element).children(".ui-tabs-anchor")
        var href = $(corrChild).attr("href");
        console.log(corrChild);
        console.log(href);
        $(href).prepend(mySidebar);

        //var href = $().attr('href');
        //console.log("href:",href);
      }
  });
};
