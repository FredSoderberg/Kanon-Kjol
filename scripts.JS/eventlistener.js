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


function removeDragRez(id) {
  console.log("destroys:","#"+id);
    $("#"+id).draggable('destroy');
    $("#"+id).resizable('destroy');
    $("#"+id).removeClass("task_bar_resize");
  }

function addDragRez(id) {
    console.log("creates:","#"+id);

  $("#"+id).addClass("task_bar_resize");

  $("#"+id).resizable({
    grid: [ config.dateHeaderWidth , config.rowHeight ],
    containment: ".task_view_rows",
    start: function (e) {
      // console.log("e",e);
      mouseEngaged = 1;
      createTouchBlock()
      moveHandler(e);
      $('body').mousemove(moveHandler);
    },
    stop: function(){
      mouseEngaged = 0;
      $('body').unbind('mousemove', moveHandler);
      $('#sliderBlock').remove();

    }

   });

  $("#"+id).draggable({
    grid: [ config.dateHeaderWidth , config.rowHeight ],
    containment: ".task_view_rows",
    stack: ".task_bar",
    start: function (e) {

      createTouchBlock()
      moveHandler(e);
      $('body').mousemove(moveHandler);
    },
    stop: function(){
        $('body').unbind('mousemove', moveHandler);
        $('#sliderBlock').remove();
    }
    })
}

var mouseEngaged = 0;
var debug = true;
var createTouchBlock = function() {
      $('<div id="sliderBlock"/>').css({position:'absolute',zIndex:1000000,width:50, height: 50, background:(debug?'#090':'transparent')}).appendTo('body');
}
var moveHandler = function(e) {
    $('#sliderBlock').css({left:e.pageX-20, top:e.pageY-20});
};






  $('.task_view_bars').mouseleave( function (event) {
    if(mouseEngaged == 0) {
    if (!$(event.target).hasClass("ui-resizable-handle")) {
      if ($(event.target).hasClass("task_bar_resize")) {
        removeDragRez(event.target.id);
        console.log("lämngar1:",event.target.id);
      }
    } else {

     console.log("lämngar2:",$(event.target).parent()[0].id);
      removeDragRez($(event.target).parent()[0].id);
    }
  }
  });





  $('.task_view_bars').mouseenter(function (event) {

    if (!$(event.target).hasClass("ui-resizable-handle")) {
      console.log("över:",event.target.id );
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
      "Save Changes": function() {
        change_taskinfo();
      },
      "Cancel": function() {
        taskDialog.dialog( "close" );
      }
    },
    close: function() {
      //form[ 0 ].reset();
      //allFields.removeClass( "ui-state-error" );
    }
  });
  var taskDialogID = 0;
  function change_taskinfo(){
    var task = cal.project.get_task_by_id(taskDialogID);
    task.taskName = $("#task_dialog_name").val();
    updateInnerHtml(task);
    taskDialog.dialog( "close" );
  }

  $(document).on("dblclick", ".task_bar", function(event, ui){
    //console.log("Vem vet");
    taskDialogID = Number(event.target.id.replace("task_", ""));
    $("#task_dialog_name").val(cal.project.get_task_by_id(taskDialogID).taskName);
    taskDialog.dialog("open");
  })
  //$( ".task_view_bars").on("draggable")

//-----------------Change info about resources--------------------------------

$(function() {
    $("#usermsg").keypress(function (e) {
        if(e.which == 13) {
            //submit form via ajax, this is not JS but server side scripting so not showing here
            $("#chatbox").append($(this).val() + "<br/>");
            $(this).val("");
            e.preventDefault();
        }
    });
});


var resourceDialog = $("#resourceDialog");
resourceDialog.dialog({
  closeOnEscape: true,
  autoOpen: false,
  height: 400,
  width: 350,
  modal: true,
  buttons: {
    "Save Changes": function() {
      change_resourceinfo();

    },
    "Cancel": function() {
      resourceDialog.dialog( "close" );
    }
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

function change_resourceinfo(){
  var resource = cal.project.get_resource_by_id(resourceDialogID);
  resource.name = $("#resource_dialog_name").val();
  //updateInnerHtml(resource);
  $("#"+resourceDialogID).children().eq(1).html(resource.name)
    resourceDialog.dialog( "close" );
  dB_updateObject(resource);
}

$(document).on("dblclick", ".resource_row", function(event, ui){
  //console.log("Vem vet");
  resourceDialogID = Number($(event.target).parent().attr("id"));
  console.log("resorceID", cal.project.get_resource_by_id(resourceDialogID));
  $("#resource_dialog_name").val(cal.project.get_resource_by_id(resourceDialogID).name);
  resourceDialog.dialog("open")
})

/* $(".resource_view_data").on('dblclick', '.resource_cell', function(){
  create_cover();
});
*/

});
