function Task(startDate, endDate, resID, taskID, name, days) {
  this.id = taskID;

  if (name === undefined){
    this.name = "Task: " + taskID;
  }else{
    this.name = name;
  }

  this.startDate = startDate;
  this.endDate = endDate;
  this.lengthInDays = days;

  this.parentProject = cal.project.id;
  this.resources = resID;
  this.color = "#AFA";
  this.type = "Task";

  this.startPos = "";
  this.startSize = {
    height: 0,
    width: 0
  };
  //this.startSize.height = 0;
  //this.startSize.width = 0;
}

Task.prototype.render = function() {
  var timeDiff = Math.abs(this.endDate.getTime() - this.startDate.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  //console.log("Task_render: ", this)
  //console.log("Index: ", $("#"+this.resources[0]).index())
  //var amountOfDays =
  var html = "<div id='task_" + this.id +"'"+
                  "res='" + this.resources[0] +
                  "'class='task_bar task_bar_obs' "+
                  "style='background-color:"+this.color+";";

  html += "border: 1px solid "+ tinycolor(this.color).darken(20).desaturate(60)+";";

  html += "width : " + (config.dateHeaderWidth * (diffDays + 1) - 6)+"px;"+
  "height : " + (config.rowHeight * (Math.max(this.resources.length,1)) - 6)+"px;"+
                           "left: " + (config.dateHeaderWidth * this.calculate_days() + 3)+"px;"+
                           "top: " + (config.rowHeight * ($("#"+this.resources[0]).index()) + 3)+"px'>";

  html += "</div>";

  cal.divTaskViewBars.innerHTML += html;
  updateInnerHtml(this);
};

Task.prototype.render_toStorage = function () {
    var $toAdd = $(this.render_task_storage());
    $("#task_storage").append($toAdd).packery('appended', $toAdd);
    $toAdd.draggable({
      start: function (event,ui) {
        console.log("start!");
        $("#task_storage").css("width","-=18px");
        $("#task_storage").removeClass("overflowAuto");
        $("#task_storage").addClass("overflowHidden");
      },
      stop: function (event,ui) {

        $("#task_storage").addClass("overflowAuto");
        $("#task_storage").removeClass("overflowHidden");
        $("#task_storage").css("width","+=18px");
      }
    });
    $("#task_storage").packery( 'bindUIDraggableEvents', $toAdd );
    updateInnerHtml(this);
};

Task.prototype.render_task_storage = function() {
  //var timeDiff = Math.abs(this.endDate.getTime() - this.startDate.getTime());
  //var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  //console.log("Task_render: ", this)
  //console.log("Index: ", $("#"+this.resources[0]).index())
  //var amountOfDays =
  var html = "<div id='task_" + this.id +"'"+
                  "res='" + this.resources[0] +
                  "'class='task_bar grid-item' "+
                  "style='background-color:"+this.color+"; "+
                        "width : " + (config.dateHeaderWidth * this.lengthInDays - 6)+"px;"+
                        "height : " + (config.rowHeight * (Math.max(this.resources.length,1)) - 6)+"px'>";

  html += "</div>";


  updateInnerHtml(this);
  return html;
};

function updateInnerHtml(task){
  var html = task.name;/*+"</br>"+
          "Date:"+dateString(task.startDate)+"-"+dateString(task.endDate)+"</br>"+
          "Resources:"+task.resources;*/
  $("#task_"+task.id).html(html);
}
function updateInnerHtml2(task){
  var html = "Name:"+task.name+"</br>";
  //+
    //      "Date:"+dateString(task.startDate)+"-"+dateString(task.endDate)+"</br>"+
      //    "Resources:"+task.resources;
  $("#task_"+task.id).html(html);
}


function dateString(date){
  var dateString = date.getMonthName()+"/"+date.getDate();

  return dateString;
}

Task.prototype.calculate_days = function(){
  var projTime = new Date(cal.project.startDate.getTime());
  var taskTime = new Date(this.startDate.getTime());
  taskTime.clearTime();
  projTime.clearTime();

  var ms = taskTime.getTime() - projTime.getTime();
  //console.log(ms)
  var days = ms/(1000*60*60*24);
  //console.log(days)
  return days;
}




$(function (){
$(".task_view_bars").on('resizestop', function(event, ui) {
  var id = Number(event.target.id.replace("task_", ""));
  var task = cal.project.get_task_by_id(id);

  var endHeight = $("#" + event.target.id).height();
  var endWidth = $("#" + event.target.id).width();

  var shiftResources = Math.round((endHeight - task.startSize.height) / config.rowHeight);
  var shiftTime = Math.round((endWidth - task.startSize.width) / config.dateHeaderWidth);

  //console.log("Shifttime:", shiftTime)
  task.endDate.setDate(task.endDate.getDate() + shiftTime);

  handleY("task_"+id, null,$("#"+"task_"+id).overlaps(".task_bar"));

  set_resources(task, shiftResources, 0);
  updateInnerHtml(task);

  // console.log("update:resizestop");
  dB_updateObject(task);
})


$(".task_view_bars").on('resizestart', function(event, ui) {
  console.log("resizestart");
  var id = Number(event.target.id.replace("task_", ""));
  //console.log("Task ID:", id)
  var task = cal.project.get_task_by_id(id);
// console.log(task);
// console.log(id);
  task.startSize.height = $("#" + event.target.id).height();
  task.startSize.width = $("#" + event.target.id).width();
})

$(".task_view_bars").on('dragstop', function(event, ui) {
  //$('#key').html("");

  var id = Number(event.target.id.replace("task_", ""));
  var task = cal.project.get_task_by_id(id);



  var taskHeight = $("#" + event.target.id).height();
  var taskWidth = $("#" + event.target.id).width();

  var shiftResources = Math.round(taskHeight / config.rowHeight);
  var shiftTime = Math.round(taskWidth / config.dateHeaderWidth);

  var endPos = $("#" + event.target.id).position();
  var diffTop =  Math.round((endPos.top - task.startPos.top)/config.rowHeight);
  var diffLeft =  Math.round((endPos.left - task.startPos.left)/config.dateHeaderWidth);



  task.startDate.setDate(task.startDate.getDate() + diffLeft);

  task.endDate.setDate(task.endDate.getDate() + diffLeft);


  handleY("task_"+id, null,$("#"+"task_"+id).overlaps(".task_bar"));

  //console.log("Task:", task, "Res:", shiftResources, diffTop)
  set_resources(task, 0, diffTop);
  updateInnerHtml(task);

  dB_updateObject(task);
})

$(".task_view_bars").on('dragstart', function(event, ui) {
  //$('#key').html("");
  var id = Number(event.target.id.replace("task_", ""));
  var task = cal.project.get_task_by_id(id);
  task.startPos = $("#" + event.target.id).position();
  //console.log("startPos:", task.startPos)
  })
});

function set_resources(task, shiftResources, shiftTop){
  var startRow = get_row_index(task) //+ shiftTop;
// console.log("startRow",startRow);
  // console.log("column diff", shiftTime);
  // console.log("row shift", shiftResources);
  var length = (task.resources.length + shiftResources);
  task.resources = [];
  for (var i = 0; i < length; i++) {
    // console.log(cal.divResourceViewData.children[startRow + i]);
    if (cal.divResourceViewData.children[startRow + i] === undefined) {
      if (length == 1) {
        $("#task_storage").append($("#task_"+task.id)).packery( 'appended', $("#task_"+task.id) );
        // $("#task_"+task.id).draggable();
        // $("#task_storage").packery( 'bindUIDraggableEvents', $("#task_"+task.id) );
        // task.resources = 0;
        // console.log("do something! halp!!");
      } else {
        task.endDate.add("d",1);
        $("#task_"+task.id).animate({width:"+="+config.dateHeaderWidth+"px"},50).promise().done(function ()
        {
          $("#task_"+task.id).animate({height:"-="+config.rowHeight+"px"},50).promise().done(function () {
            handleY("task_"+task.id, null,$("#"+"task_"+task.id).overlaps(".task_bar"));
            return false;
          })
        }
      )}
    }
    else {
      task.resources[i] = Number(cal.divResourceViewData.children[startRow + i].id);
      // console.log(task);
      updateInnerHtml(task);
    }
    //console.log("startwor:", (i))
    // console.log(i,":", startRow + i);

    // console.log(task.id,":",task.resources[i]);

  }
}

function set_dates(task){

}

function get_task_position(event) {
  var task = cal.project.get_task_by_element(event.target);
  return $("#" + event.target.id).position();
}

function get_row_index(task) {
  var val = $("#task_"+task.id).css("top");
   val = val.substring(0,val.length - 2);
  var div30 = parseInt(val)/config.rowHeight;
  var floored = Math.floor(div30);
  return floored;//$("#" + task.resources[0]).index();
}

function otherTasks(thisTaskID, parentTaskID, overlappingTasks){
  return $.grep(overlappingTasks,function(a) {
              if (a.id !== thisTaskID && a.id !== parentTaskID) {
                //console.log(a);
                return a;
              }
            });
}


function handleY(thisTaskID, parentTaskID, overlappingTasks){
  //console.log("HandleY:", thisTaskID, parentTaskID, overlappingTasks);
  overlappingTasks = otherTasks(thisTaskID, parentTaskID, overlappingTasks);

  /*
  var endPos = $("#" + thisTaskID).position();

  var changePos = task.startPos;
  endPos.left  -= changePos.left;
  endPos.top   -= changePos.top;

  endPos.left /= config.dateHeaderWidth;
  endPos.top /= config.rowHeight;

  //console.log("Row diff", changePos.top);
  //console.log("Column shift", changePos.left);

  var startRow = get_row_index(task);
  var indexNewRes = startRow + changePos.top;
*/

  //
  // if (overlappingTasks.length <= 0 && $(".task_bar").overlaps(".task_bar").length <= 0) {
  //   return;
  // }
  // else if ($(".task_bar").overlaps(".task_bar").length > 0) {
  //   console.log($(".task_bar").overlaps(".task_bar"));
  // }
  if (overlappingTasks.length <= 0) {
    return;
  }



  if(handleX(overlappingTasks[0].id, thisTaskID)){

  overlappingTasks.shift();
  handleY(thisTaskID, parentTaskID, overlappingTasks);
  }
}

function handleX(thisTaskID, parentTaskID) {

  var currTaskID = thisTaskID;
  var currTaskObject = cal.project.get_task_by_id(Number(currTaskID.replace("task_", "")));
  var parentTaskObejct = cal.project.get_task_by_id(Number(parentTaskID.replace("task_", "")));
  var movedTaskLeft = $("#"+parentTaskID).position().left;
  var width = $("#"+parentTaskID).width();
  var pos = $("#"+currTaskID).position().left;
  var posw = $("#"+currTaskID).width();

//  var movedTaskright = $("#"+task_id).position().right;
  pos = Math.round(pos)
  var diff;
  if (pos >= movedTaskLeft){
    diff = (movedTaskLeft + width) - pos;
  } else if(pos < movedTaskLeft){
    diff = movedTaskLeft - (pos + posw)
  }

  var diffDays = Math.round(diff/config.dateHeaderWidth);
  var newTaskStartDate = new Date(currTaskObject.startDate).add("d",diffDays);
  var timeTravel = (cal.project.startDate > newTaskStartDate);
  if(timeTravel) console.log("Inan början");
    //console.log("HandleX:", thisTaskID, parentTaskID, pos, movedTaskLeft, width);
  //console.log("Diff:", diff," diffdays: ", diffDays, "Left:", (config.dateHeaderWidth * diffDays));

  //dB_updateObject(cal.project.get_task_by_id(currTaskID)); insert when dates work
  if (timeTravel) {
    var daysToMoveCurr = cal.project.startDate.distanceInDays(newTaskStartDate);
    var daysToMoveParr = newTaskStartDate.distanceInDays(cal.project.startDate);
    diffDays -= daysToMoveCurr;
    $("#"+parentTaskID).animate({
      left: $("#"+parentTaskID).position().left + (config.dateHeaderWidth * daysToMoveParr)},
      50).promise().done(function ()
      {
        parentTaskObejct.startDate.add("d",daysToMoveParr);
        parentTaskObejct.endDate.add("d",daysToMoveParr);
        updateInnerHtml(parentTaskObejct);
        dB_updateObject(parentTaskObejct)
    })
}

    $("#"+currTaskID).animate({
      left: pos + (config.dateHeaderWidth * diffDays)},
      50).promise().done(function ()
      {
        console.log("diffDays to save:",diffDays);
        currTaskObject.startDate.add("d",diffDays);
        currTaskObject.endDate.add("d",diffDays);
        updateInnerHtml(currTaskObject);
        dB_updateObject(currTaskObject)

        var overlappingTasks = $("#"+currTaskID).overlaps(".task_bar");
        overlappingTasks = otherTasks(thisTaskID, parentTaskID, overlappingTasks);

        if(overlappingTasks.length <= 0){
          return true;
        }
        handleY(thisTaskID, parentTaskID, overlappingTasks);


      })
      // console.log(currTaskID,"-return");
      return true;

}

function removeDragRez(id) {
  if (id === undefined) return;

   console.log("destroys:","#"+id);
    $("#"+id).draggable('destroy');
    $("#"+id).resizable('destroy');
    $("#"+id).removeClass("task_bar_resize");
  }

function addDragRez(id) {
    if (id === undefined) return;
    // console.log("creates:","#"+id);

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
      // console.log(this);

      mouseEngaged = 0;
      $('body').unbind('mousemove', moveHandler);
      $('#sliderBlock').remove();
      removeDragRez();
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
var debug = false; //visa träffytan!
var createTouchBlock = function() {
      $('<div id="sliderBlock"/>').css({position:'absolute',zIndex:1000000,width:50, height: 50, background:(debug?'#090':'transparent')}).appendTo('body');
}
var moveHandler = function(e) {
    $('#sliderBlock').css({left:e.pageX-20, top:e.pageY-20});
};
