task_func = function(){
  $(".task_view_rows").on('dblclick', '.task_row_cell', function(){
    var resID = Number($(this).parent().attr("id").replace('row_', ''));
    //console.log("this", $(this).index(), resID);
    cal.create_task($(this), resID);
  });
}

$(document).ready(function(){
  $(".add_cell").click(function(){
    cal._create_resource();
  });
  /*
  var isDragging = false;

  $(".resource_view_data").on({
    mousedown: function(){
      isDragging = true;
    },
    mousemove: function(){
      if (isDragging)
        $("#row_"+$(this).parent().attr("id")).remove();
    },
    mouseup: function(){
      var wasDragging = isDragging;
      isDragging = false;
      if (!wasDragging) {
          $("#throbble").toggle();
      }
    }
  }, '.resource_cell');
*/
//console.log("Eventlistener: Ready")
  $(".task_view_rows").on('dblclick', '.task_row_cell', function(){
    var resID = Number($(this).parent().attr("id").replace('row_', ''));
    //console.log("Create task", $(this).index(), resID);
    cal.create_task($(this), resID);
  });


  /* $(".resource_view_data").on('dblclick', '.resource_cell', function(){
    create_cover();
  });
*/

  $(document).on("sortchange",function(ui, e){
    //console.log("Dragging");
    var id = e.item.attr('id');
  });

  $(".resource_view_data").on('click', '.remove_cell', function(){
    var resID = $(this).parent().attr("id");
    $("[res="+resID+"]").remove();
    var tasks = cal.project.get_task_by_resource(resID);
    for (var t in tasks){
      $("#task_"+tasks[t].taskID).remove();
    }
    $("#row_" + resID).remove();
    $(this).parent().remove();
  });


  $('.task_view').on('scroll', function () {
    //console.log($(this).scrollTop())
    $('.resource_view').scrollTop($(this).scrollTop());
  });

  $('.task_view_bars').mouseleave( function (event) {
    if(mouseEngaged == 0) {
    if (!$(event.target).hasClass("ui-resizable-handle") && $(event.target).hasClass("task_bar_resize")) {
      removeDragRez(event.target.id);
      // console.log("lämngar1:",event.target.id);
    } else {
    //  console.log("lämngar2:",$(event.target).parent()[0].id);
      removeDragRez($(event.target).parent()[0].id);
    }
  }
  });

  $('.task_view_bars').mouseenter(function (event) {

    if (!$(event.target).hasClass("ui-resizable-handle")) {
      // console.log("över:",event.target.id );
      if($(event.target).hasClass("task_bar_resize")) {
        removeDragRez(event.target.id);
      }
      addDragRez(event.target.id);
    }
  });

  $('.task_view_bars').on('drag', '.task_bar',function () {
    //console.log($(this).scrollTop())
    //alert("mouseover");
    //$(this).draggable("disable");
    //$(this).draggable({ grid: [ config.dateHeaderWidth , config.rowHeight ] }).resizable({ grid: [ config.dateHeaderWidth , config.rowHeight ] });
  });

  $(document).on("collision", function(event, ui){
    $("#key").html("COLIISION");
  })


  $(document).keypress(function(e){
    var key = String.fromCharCode(e.which);
    $('#key').html(key);
  });
  /*
  $(document).on('drag', function(e){
    $('#key').html("dragging time");
  });
  $(document).on('drag', function(e){
    //alert(e.item.innerHTML);
  });
*/
  //sortupdate
  //sortchange
  $('#sortable').sortable({
  change: function(ui, event){
      var id = event.item.attr('id');
      console.log("Id Drag: ",id);
  }
  });
  $( "#sortable" ).disableSelection();
  $( ".task_view_rows").sortable();
  $( ".task_view_rows").disableSelection();

  var taskDialog = $("#taskDialog");
  taskDialog.dialog({
    autoOpen: false,
    height: 400,
    width: 350,
    modal: true,
    buttons: {
      "Delete": function() {
        deleteDialogType = "Task"
        deleteDialogID = taskDialogID;
        deleteDialog.dialog( "open" );
      },
      "Save Changes": function() {
        change_taskinfo();
      },
      "Cancel": function() {
        taskDialog.dialog( "close" );
      }
    },
    create:function () {
      $(this).closest(".ui-dialog")
      .find(".ui-button:nth-child(1)")
      .addClass("deleteButton");
    },
    open: function() {
      $("#taskDialog").keypress(function (e) {
        if(e.which == 13) {
          change_taskinfo();
        }
      })
    }
  });

  var taskDialogID = 0;


  //$( ".task_view_bars").on("draggable")

//-----------------Change info about resources--------------------------------

var resourceDialog = $("#resourceDialog");
resourceDialog.dialog({
  closeOnEscape: true,
  autoOpen: false,
  height: 400,
  width: 350,
  modal: true,
  buttons: {
    "Delete": function() {
      deleteDialogType = "Resource"
      deleteDialogID = resourceDialogID;
      deleteDialog.dialog( "open" );
    },
    "Save Changes": function() {
      change_resourceinfo();
    },
    "Cancel": function() {
      resourceDialog.dialog( "close" );
    }
  },
   create:function () {
        $(this).closest(".ui-dialog")
            .find(".ui-button:nth-child(1)")
            .addClass("deleteButton");
    },
  open: function() {
    $("#resourceDialog").keypress(function (e) {
        if(e.which == 13) {
          change_resourceinfo();
        }
    })
  }
});

var resourceDialogID = 0;

//-----------------Delte Stuyff--------------------------------

var deleteDialog = $("#deleteDialog");
deleteDialog.dialog({
  closeOnEscape: true,
  autoOpen: false,
  height: 400,
  width: 350,
  modal: true,
  buttons: {
    "Yes": function() {
      deleteTarget( deleteDialogID , deleteDialogType );
      deleteDialog.dialog( "close" );
      resourceDialog.dialog( "close" );
      taskDialog.dialog( "close" );
    },
    "No": function() {
      deleteDialog.dialog( "close" );
    }
  },
  open: function() {
    $("#deleteDialog").keypress(function (e) {
        if(e.which == 13) {
          deleteTarget( resourceDialogID, deleteDialogType);
          deleteDialog.dialog( "close" );
        }
    })
  }
});
var deleteDialogType = "";
var deleteDialogID = 0;

//--------------Change info about project-------------------------
var projectDialog = $("#projectDialog");
projectDialog.dialog({
  closeOnEscape: true,
  autoOpen: false,
  height: 400,
  width: 350,
  modal: true,
  buttons: {
    "Delete": function() {
      deleteDialog.dialog( "open" );
    },
    "Save Changes": function() {
    //  change_projectinfo();
    },
    "Cancel": function() {
      projectDialog.dialog( "close" );
    }
  },
   create:function () {
        $(this).closest(".ui-dialog")
            .find(".ui-button:nth-child(1)")
            .addClass("deleteButton");
    },
  open: function() {
    $("#projectDialog").keypress(function (e) {
        if(e.which == 13) {
      //    change_projectinfo();
        }
    })
  }
});

var projectDialogID = 0;

$("#proj").on("click", function() {
  projectDialog.dialog("open");
});



// function change_resourceinfo(){
//   var resource = cal.project.get_resource_by_id(resourceDialogID);
//   resource.name = $("#resource_dialog_name").val();
//   //updateInnerHtml(resource);
//   $("#"+resourceDialogID).children().eq(1).html(resource.name)
//     resourceDialog.dialog( "close" );
//   dB_updateObject(resource);
// }

function change_resourceinfo(){
  var resource = cal.project.get_resource_by_id(resourceDialogID);
  resource.name = $("#resource_dialog_name").val();
  resource.groupType = $("#resource_dialog_type").val();
  //updateInnerHtml(resource);
  $("#"+resource.id).children().eq(1).html(resource.name)
  $("#"+resource.id).children().eq(0).html(resource.groupType)

  resourceDialog.dialog( "close" );
  dB_updateObject(resource);
}

function change_taskinfo(){
  var task = cal.project.get_task_by_id(taskDialogID);
  task.name = $("#task_dialog_name").val();
  updateInnerHtml(task);

  taskDialog.dialog( "close" );
  dB_updateObject(task);
};



// function change_projectinfo (){
//   var project = cal.project.get_task_by_id(taskDialogID);
//   project.name = $("#project_dialog_name").val();
//   updateInnerHtml(project);
//
//   projectDialog.dialog( "close" );
//   dB_updateObject(project);
// }


$(document).on("dblclick", ".resource_row", function(event, ui){
  //console.log("Vem vet");
  resourceDialogID = Number($(event.target).parent().attr("id"));
  // console.log("resorceID", cal.project.get_resource_by_id(resourceDialogID));
  $("#resource_dialog_name").val(cal.project.get_resource_by_id(resourceDialogID).name);
  $("#resource_dialog_type").val(cal.project.get_resource_by_id(resourceDialogID).groupType);
  resourceDialog.dialog("open")
})

$(document).on("dblclick", ".task_bar", function(event, ui){
  //console.log("Vem vet");
  taskDialogID = Number(event.target.id.replace("task_", ""));
  // console.log(taskDialogID);
  $("#task_dialog_name").val(cal.project.get_task_by_id(taskDialogID).name);
    $("#task_startDate").val(cal.project.get_task_by_id(taskDialogID).startDate);
      $("#task_endDate").val(cal.project.get_task_by_id(taskDialogID).endDate);
  taskDialog.dialog("open");
})

/* $(".resource_view_data").on('dblclick', '.resource_cell', function(){
  create_cover();
});
*/

$( function() {
  $( "#project_startDate, #project_endDate, #task_startDate, #task_endDate, #taskStorage_startDate, #taskStorage_endDate" ).datepicker({
    showWeek: true,
    firstDay: 1
  });
} );


});
