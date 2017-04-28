function Task(startDate, endDate, resID, taskID) {

  this.startDate = startDate;
  this.endDate = endDate;
  this.resources = [resID];
  this.taskID = taskID;
  this.startPos;

  this.startSize = {
    height: 0,
    width: 0
  };
  //this.startSize.height = 0;
  //this.startSize.width = 0;
}

Task.prototype.render = function() {
  var html = "<div id='task_" + this.taskID + "' " + "res='" + this.resources[0] + "'class='task_bar task_bar_obs' " + "style='" + "width : " + (config.dateHeaderWidth * 2 - 6) + "px;" + "height : " + (config.rowHeight - 6) + "px '>";
  html += this.taskID +"</div>";
  return html;
};

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
  console.log("HandleY:", thisTaskID, parentTaskID, overlappingTasks);
  overlappingTasks = otherTasks(thisTaskID, parentTaskID, overlappingTasks);
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
  console.log("HandleX:", thisTaskID, parentTaskID, pos, movedTaskLeft, width);
  console.log("Diff:", diff," diffdays: ", diffDays, "Left:", (config.dateHeaderWidth * diffDays));


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

$(document).ready(function() {

  $(".task_view_bars").on('resizestop', function(event, ui) {
    var id = Number(event.target.id.replace("task_", ""));
    var task = cal.project.get_task_by_id(id);

    var endHeight = $("#" + event.target.id).height();
    var endWidth = $("#" + event.target.id).width();

    var shiftResources = (endHeight - task.startSize.height) / config.rowHeight;
    var shiftTime = (endWidth - task.startSize.width) / config.dateHeaderWidth;

    task.endDate.setDate(task.endDate.getDate() + shiftTime);

    var startRow = get_row_index(task);

    //console.log("column diff", shiftTime);
    //console.log("row shift", shiftResources);
    var length = (task.resources.length + shiftResources);
    task.resources = [];
    for (var i = 0; i < length; i++) {
      //console.log("startwor:", (i))
      task.resources[i] = cal.divResourceViewData.children[startRow + i].id;
    }

  })



  $(".task_view_bars").on('resizestart', function(event, ui) {
  //  console.log("resizestart");
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

    var endPos = $("#" + event.target.id).position();

    var changePos = task.startPos;
    changePos.left -= endPos.left;
    changePos.top -= endPos.top;

    changePos.left /= config.dateHeaderWidth * (-1);
    changePos.top /= config.rowHeight * (-1);

    //console.log("Row diff", changePos.top);
    //console.log("Column shift", changePos.left);

    var startRow = get_row_index(task);
    var indexNewRes = startRow + changePos.top;

    console.log("handleOverlaps!!");
    handleY("task_"+id, null,$("#"+"task_"+id).overlaps(".task_bar"));
  })

  $(".task_view_bars").on('dragstart', function(event, ui) {
    console.log("dragstart");
    //$('#key').html("");
    var id = Number(event.target.id.replace("task_", ""));
    var task = cal.project.get_task_by_id(id);

    task.startPos = $("#" + event.target.id).position();

    //console.log("startPos:", task.startPos)

  })


})

/*  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id != task_id) {
      //handleOverlaps();
    }
  }
*
};
/*

  var task1;
  var task2;
  if ($(tasks[0]).position().left > $(tasks[1]).position().left) {
    task1 = tasks[0];
    task2 = tasks[1];
  } else {
    task1 = tasks[0];
    task2 = tasks[1];
  }

  if (tasks.length > 1) {
    var diff = ($(task2).position().left - $(task1).position().left) / config.dateHeaderWidth;
    console.log("diff", diff);
  }
  if ($(task2).position().left < $(task1).position().left) {
    $(task1).animate({
      left: "+=" + (config.dateHeaderWidth * diff)
    })
  } else {
    $(task2).animate({
      left: "+=" + (config.dateHeaderWidth * diff)
    })
  }

  for (var i = 0; i < task.resources.length; i++) {
    task.resources[i] = cal.divResourceViewData.children[indexNewRes + i].id;
    //console.log("newRes: ", cal.divResourceViewData.children[indexNewRes+i]);
  }
  $("#" + event.target.id).attr("res", cal.divResourceViewData.children[indexNewRes].id);

  //console.log("Tasks: ", tasks);

  //var tasks = cal.project.get_task_by_resource(task)
});*/
