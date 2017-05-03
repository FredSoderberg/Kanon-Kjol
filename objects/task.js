function Task(startDate, endDate, resID, taskID) {

  this.startDate = startDate;
  this.endDate = endDate;
  this.resources = [resID];
  this.taskID = taskID;
  this.startPos;
  this.taskName = "Task: " + taskID;

  this.startSize = {
    height: 0,
    width: 0
  };
  //this.startSize.height = 0;
  //this.startSize.width = 0;
}


Task.prototype.render = function() {
  //console.log("Task_render: ", this)
  //console.log("Index: ", $("#"+this.resources[0]).index())
  var amountOfDays =
  var html = "<div id='task_" + this.taskID +"'"+
                  "res='" + this.resources[0] +
                  "'class='task_bar task_bar_obs' "+
                  "style='width : " + (config.dateHeaderWidth * (this.endDate.getDate() - this.startDate.getDate() + 1) - 6)+"px;"+
                        "height : " + (config.rowHeight * (Math.max(this.resources.length,1)) - 6)+"px;"+
                           "left: " + (config.dateHeaderWidth * (this.startDate.getDate() - 1)+ 3)+"px;"+
                           "top: " + (config.rowHeight * ($("#"+this.resources[0]).index()) + 3)+"px'>";

  html += "</div>";

  cal.divTaskViewBars.innerHTML += html;
  updateInnerHtml(this);
};

function updateInnerHtml(task){
  var html = "Name:"+task.taskName+"</br>"+
          "Date:"+dateString(task.startDate)+"-"+dateString(task.endDate)+"</br>"+
          "Resources:"+task.resources;
  $("#task_"+task.taskID).html(html);
}
function dateString(date){
  var dateString = date.getMonthName()+"/"+date.getDate();

  return dateString;
}

Task.prototype.calculate_days = function(){
  var projTime = new Date(cal.project.startDate);
  var taskTime = new Date(task.startDate);
  taskTime.clearTime();
  projTime.clearTime();

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

  set_resources(task, shiftResources, 0);
  updateInnerHtml(task);
})


$(".task_view_bars").on('resizestart', function(event, ui) {
  var id = Number(event.target.id.replace("task_", ""));
  //console.log("Task ID:", id)
  var task = cal.project.get_task_by_id(id);

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
  var startRow = get_row_index(task) + shiftTop;

  //console.log("column diff", shiftTime);
  //console.log("row shift", shiftResources);
  var length = (task.resources.length + shiftResources);
  task.resources = [];
  for (var i = 0; i < length; i++) {
    //console.log("startwor:", (i))
    task.resources[i] = cal.divResourceViewData.children[startRow + i].id;
  }
}

function set_dates(task){

}

function get_task_position(event) {
  var task = cal.project.get_task_by_element(event.target);
  return $("#" + event.target.id).position();
}

function get_row_index(task) {
  return $("#" + task.resources[0]).index();
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

  /* TODO: FIXa ändring av datum och resurser
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


  if (overlappingTasks.length <= 0) return;



  if(handleX(overlappingTasks[0].id, thisTaskID)){

  overlappingTasks.shift();
  handleY(thisTaskID, parentTaskID, overlappingTasks);
  }
}

function handleX(thisTaskID, parentTaskID){

  var currTaskID = thisTaskID;
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
  //console.log("HandleX:", thisTaskID, parentTaskID, pos, movedTaskLeft, width);
  //console.log("Diff:", diff," diffdays: ", diffDays, "Left:", (config.dateHeaderWidth * diffDays));


  $("#"+currTaskID).animate({
    left: pos + (config.dateHeaderWidth * diffDays)},
    50, function (){



      var overlappingTasks = $("#"+currTaskID).overlaps(".task_bar");
      overlappingTasks = otherTasks(thisTaskID, parentTaskID, overlappingTasks);
      if(overlappingTasks.length <= 0){
        return true;
      }
      handleY(thisTaskID, parentTaskID, overlappingTasks);
    })
    return true
}
