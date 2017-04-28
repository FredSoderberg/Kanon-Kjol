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
  $(".task_view_rows").on('dblclick', '.task_row_cell', function(){
    var resID = Number($(this).parent().attr("id").replace('row_', ''));
    //console.log("this", $(this).index(), resID);
    cal.create_task($(this), resID);
  });


  $(".resource_view_data").on('dblclick', '.resource_cell', function(){
    create_cover();
  });


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

  $('.task_view_bars').on('mouseout', '.ui-resizable-handle',function () {
    //console.log($(this).scrollTop())
    //alert("mouseover");
    //$(this).draggable("disable");
    //$(this).parent().resizable('destroy');

  });
  $('.task_view_bars').on('mouseover', '.task_bar',function () {
    //console.log($(this).scrollTop())
    //alert("mouseover");
    //$(this).draggable("disable");
    $(this).draggable({
      stop: function(event, ui) {
        $(this).draggable('destroy');
      },
      grid: [ config.dateHeaderWidth , config.rowHeight ],
      containment: ".task_view_rows",
      stack: ".task_bar",
      //obstacle: ".task_bar_obs",
      //preventCollision: true,
      /*
      drag: function( event, ui ) {

      // Sizeof task height made from amount of resources
      // stop position at bottom with Math.min

      //console.log(ui.helper)
      var rows = cal.divResourceViewData.children.length;
      ui.position.left = Math.max( 2, ui.position.left );
      ui.position.top = Math.max( 3,

         Math.min((ui.position.top+(cal.project.get_task_by_element(ui.helper).resources.length*config.rowHeight)), (config.rowHeight*(rows-1)+3)));


      //console.log("max :", (config.rowHeight*(rows-1)+3))
      //console.log("min :", rows);*/

      revert: function( event, ui ){

        return false;
        }
      }).resizable({ grid: [ config.dateHeaderWidth , config.rowHeight ],
        start: function(event, ui){
          $(this).addClass("task_bar_resize");
        },
        stop: function(event, ui) {
          $(this).removeClass("task_bar_resize");
          $(this).resizable('destroy');
        },
        containment: ".task_view_rows",
        disabled: false
        /*
        resize: function(event,ui){
        var rows = cal.divResourceViewData.children.length;
        console.log("ui size:", ui.size.height)
        ui.position.left = Math.max( 2, ui.position.left );
        ui.size.height = Math.max( 24,

           Math.min((ui.size.height - ui.position.top + 3), (config.rowHeight*(rows)-6)));
           */
       });

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
      "Create an account": function() {
        taskDialog.dialog( "close" );
      },
      Cancel: function() {
        taskDialog.dialog( "close" );
      }
    },
    close: function() {
      //form[ 0 ].reset();
      //allFields.removeClass( "ui-state-error" );
    }
  });

  $(document).on("dblclick", ".task_bar", function(event, ui){
    console.log("Vem vet");
    taskDialog.dialog("open");
  })
  //$( ".task_view_bars").on("draggable")

});
