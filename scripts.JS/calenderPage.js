function moveSidebar(){
  var mySidebar = $("#mySidebar").detach();
  $("li.ui-tabs-tab").each(function (index, element){
      if($(element).hasClass("ui-state-active")) {
        //console.log(element);
        var corrChild = $(element).children(".ui-tabs-anchor")
        var href = $(corrChild).attr("href");
        // console.log(corrChild);
        // console.log(href);
        $(href).prepend(mySidebar);

        //var href = $().attr('href');
        //console.log("href:",href);
      }
  });
};

function hideSideBar () {
  $("#mySidebar").toggleClass("hidden", 750).promise().done(function(){
    var mySidebar = $("#mySidebar").detach();
    $("#noMansLand").prepend(mySidebar);
  });
}

function showSideBar () {
  var mySidebar = $("#mySidebar").detach();
  $("#calendarArea").prepend(mySidebar);
  $("#mySidebar").toggleClass("hidden",750);
}

function hideResourceBar () {
  $("#resourceSidebar").toggleClass("hidden", 750).promise().done(function(){
    var resourceSidebar = $("#resourceSidebar").detach();
    $("#noMansLand").prepend(resourceSidebar);
  })
}

function showResourceBar () {
  var resourceSidebar = $("#resourceSidebar").detach();
  $("#mySidebar").prepend(resourceSidebar);
  $("#resourceSidebar").toggleClass("hidden", 750);
}

function updateResourceRows (target,flag) {
  $("#"+target).children().each(function(index,item) {
  //  console.log(item.id,":",flag+index);
    cal.project.set_resource_row(item , flag + index);
    dB_updateObject(cal.project.get_resource_by_id(item.id));
  })
}
