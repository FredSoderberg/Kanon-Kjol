
$(function (){
// external js: packery.pkgd.js, jquery-ui-draggable.js

// initialize Packery
var $grid = $('.grid').packery({
  itemSelector: '.grid-item, .task_bar',
  // columnWidth helps with drop positioning
  columnWidth: config.dateHeaderWidth,
  gutter: 1,
  resize: false

});

// make all items draggable
var $items = $grid.find('.grid-item, .task_bar').draggable({
  helper: "clone",
  drag: function(event, ui){
    //console.log(event)
    //$grid.packery('remove', this).packery('shiftLayout');
  },
  stop: function(event, ui){

  }
});
// bind drag events to Packery
$grid.packery( 'bindUIDraggableEvents', $items );

/*
$("#storage_toggle").click(function(){
    $("#task_storage").slideToggle("slow");
});
*/
var $st = $('#storage_toggle');
$st.click(function() {
  //console.log($st)
  //console.log($grid)
      if($grid.hasClass('slide-up')) {
        $grid.removeClass('slide-up');
        $grid.addClass('slide-down', 1000, 'easeOutBounce');

      } else {
        $grid.removeClass('slide-down');
        $grid.addClass('slide-up', 1000, 'easeOutBounce');

      }
  });
var $at = $('#add_to_storage');
$at.click(function() {
    //console.log("clicked");
  //console.log($st)
  //console.log($grid)
  var newTask = cal.create_task_for_storage(
    $("#task_name").val(),Number($("#taskStorage_lengthInDays").val()));
    newTask.render_toStorage();
    /*
    new Date($("#taskStorage_startDate").val()),
    new Date($("#taskStorage_endDate").val()));
*/
  //console.log($("#taskStorage_startDate").val())
  //console.log($("#taskStorage_endDate").val())
  // var $newTask = $(newTask.render_task_storage());
  //
  //
  // // console.log(newTask.lengthInDays);
  // $grid.append($newTask).packery('appended', $newTask);
  //
  // //$grid.packery('addItems', $newTask);
  // //$grid.packery('fit', $newTask, (config.dateHeaderWidth * newTask.calculate_days()), 0)
  //
  // $newTask.draggable({
  //   // connectWith: ".task_view_rows",
  //
  //   // appendTo:"body",
  //   // helper:"clone",
  //   start: function (event,ui) {
  //     console.log("start!");
  //     $("#task_storage").removeClass("overflowAuto");
  //     $("#task_storage").addClass("overflowHidden");
  //   },
  //   stop: function (event,ui) {
  //     $("#task_storage").addClass("overflowAuto");
  //     $("#task_storage").removeClass("overflowHidden");
  //   }
  // });
  // $grid.packery( 'bindUIDraggableEvents', $newTask );
  //
  // //dB_storeObject(newTask);
  // //dB_updateObject(cal.project);
  //
  // updateInnerHtml(newTask);

  $("#task_name").val("");

  });




//$grid.on('drag')

$(".task_view_rows").droppable({
  accept: '.grid-item',
  drop: function(event, ui){
    //console.log("dropped at row",  ui)
    var $clone = ui.draggable.clone();
    //console.log(ui.draggable.attr("id"));
    //console.log("elemnt at pos", document.elementFromPoint(ui.offset.left, ui.offset.top));
    var $targetCell = $(document.elementFromPoint(ui.offset.left, ui.offset.top));


    //console.log("clone pos",$targetCell.position(), $clone)
    $(this).parent().children().eq(2).append($clone);

    $clone.css({top: ($targetCell.position().top + 3 )+"px", left: ($targetCell.position().left + 3)+ "px", position:'absolute'});
    $clone.removeClass('grid-item');

  // console.log("CELL INDEX: ", $targetCell.index());

    var cloneID   = Number($clone.attr("id").replace("task_", ""))
    var cloneTask = cal.project.get_task_by_id(cloneID);

    cloneTask.startDate = new Date(cal.project.startDate);
    cloneTask.startDate.setDate(cloneTask.startDate.getDate() + $targetCell.index())
    cloneTask.endDate   = new Date(cloneTask.startDate);
    cloneTask.endDate.setDate(cloneTask.endDate.getDate() + (cloneTask.lengthInDays - 1))

    cloneTask.resources = [];
    cloneTask.resources[0] = Number($targetCell.parent().attr("id").replace("row_", ""))

    // console.log("Days:",cloneTask.lengthInDays)
    // console.log("Clone: ", cloneTask);
    updateInnerHtml(cloneTask);

    dB_updateObject(cloneTask);
    /*
    $clone.removeClass();
    $clone.addClass("task_bar");
    /*
    $clone.width(196);
    $clone.height(26);
    $clone.draggable({
                containment: '.task_view_rows',
                grid: [40,30]
            });
            */
    //ui.helper.remove();
    //ui.draggable.remove();


    $(".packery-drop-placeholder").remove();
    $grid.packery('remove', $(".packery-drop-placeholder")).packery('shiftLayout');
    $grid.packery('remove', ui.draggable).packery('shiftLayout');
    handleY($clone.attr("id"), null,$clone.overlaps(".task_bar"));
  }
});

// $(document).on('keydown', function(event){
//   if (event.keyCode == 32){
//     event.preventDefault();
//   }
// })

$("#task_name, #taskStorage_lengthInDays").keyup(function(event){
    if(event.keyCode == 13){
        $("#add_to_storage").click();
        $("#task_name").focus();

    }
});
$(document).keyup(function(event){
  //console.log(event)
    if(event.keyCode == 32 && event.target.id != "task_name" && event.target.id != "taskStorage_lengthInDays"  && !$(".ui-dialog").is(":visible")){
      //$("#add_to_storage").blur();
      $("#storage_toggle").click();
    }
});


})
