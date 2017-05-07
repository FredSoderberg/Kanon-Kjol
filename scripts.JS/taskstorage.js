
$(function (){
// external js: packery.pkgd.js, jquery-ui-draggable.js

// initialize Packery
var $grid = $('.grid').packery({
  itemSelector: '.grid-item, .task_bar',
  // columnWidth helps with drop positioning
  columnWidth: config.dateHeaderWidth,
  gutter: 1
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
        $grid.addClass('slide-down', 1000, 'easeOutBounce');
        $grid.removeClass('slide-up');
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
    $("#task_name").val(),
    new Date($("#task_startDate").val()),
    new Date($("#task_endDate").val()));

  var $newTask = $(newTask.render_task_storage());

  //console.log($grid);
  //$grid.append($newTask).packery('appended', $newTask);

  $grid.addItems( $newTask).packery('addItems', $newTask);
  $grid.packery('fit', $newTask, (config.dateHeaderWidth * newTask.calculate_days()), 0)

  $newTask.draggable();
  $grid.packery( 'bindUIDraggableEvents', $newTask );



  });




//$grid.on('drag')

$(".task_view_rows").droppable({
  accept: '.grid-item',
  drop: function(event, ui){
    console.log("dropped at row")
    var $clone = ui.draggable.clone();
    //console.log(ui.draggable.attr("id"));
    $(this).parent().children().eq(2).append($clone);
    $clone.removeClass('grid-item');
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

  }

})



})
