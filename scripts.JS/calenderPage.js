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

function initiateNewResource(dropped,target,flag) {
  var droppedID = $(dropped).attr("id");
  dropped.removeClass("draggableClone");
  var resourceObject  = cal._get_new_default_resource();
  dropped.attr("id",cal._get_next_resourceID());
  cal.project.resources.push(resourceObject);
  updateResourceRows(droppedID, target ,flag);
  dB_storeObject(resourceObject);
}

function updateResourceRows (droppedID,target,flag) {
  if(target === "sortable") {
  //  console.log("droppedID",droppedID);
    cal._create_empty_task_row(droppedID);
  }
  else {
    $("#row_"+droppedID).remove();
  }

  $("#"+target).children().each(function(index,item) {
    cal.project.set_resource_row(item , flag + index);
  })
}
