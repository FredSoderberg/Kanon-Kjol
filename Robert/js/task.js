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

$(document).on('resizestop', function(event, ui) {
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

$(document).on('resizestart', function(event, ui) {
  var id = Number(event.target.id.replace("task_", ""));
  //console.log("Task ID:", id)
  var task = cal.project.get_task_by_id(id);

  task.startSize.height = $("#" + event.target.id).height();
  task.startSize.width = $("#" + event.target.id).width();
})

$(document).on('dragstop', function(event, ui) {
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
  handleOverlaps("task_"+id, null,$("#"+"task_"+id).overlaps(".task_bar"));
})

$(document).on('dragstart', function(event, ui) {
  //$('#key').html("");
  var id = Number(event.target.id.replace("task_", ""));
  var task = cal.project.get_task_by_id(id);

  task.startPos = $("#" + event.target.id).position();

  //console.log("startPos:", task.startPos)

})

function get_task_position(event) {
  var task = cal.project.get_task_by_element(event.target);
  return $("#" + event.target.id).position();
}

function get_row_index(task) {
  return $("#" + task.resources[0]).index();
}

function handleOverlaps(task_id,parent_overlap,tasks,overlapRecur){
/*if (tasks.length===0) {
return;
};*/
//console.log(tasks);
  tasks = $.grep(tasks,function(a) {
    if (a.id !== task_id && a.id !== parent_overlap) {
      //console.log(a);
      return a;
    }
});
if (tasks.length===0) {
return;
};
  /*for (var i = 0; i < tasks.length; i++) {
    var filteredTasks = tasks[i]
  }*/

  console.log("task moved:",task_id," moving: ",tasks[0].id," Parent: ",parent_overlap);

  var movedTaskLeft = $("#"+task_id).position().left;
//  var movedTaskright = $("#"+task_id).position().right;
  currTaskID = tasks[0].id;


  var diff = $("#"+currTaskID).position().left - movedTaskLeft;
  var diffDays = Math.round(diff/config.dateHeaderWidth);

//      console.log("diffDays for",diffDays);
  $("#"+currTaskID).animate({
    left: "+=" + (config.dateHeaderWidth * diffDays)
  },50, function () {

    console.log("start overlarp again",currTaskID,":",task_id);

    if (tasks.length>1) {
    tasks.shift();
    }
    handleOverlaps(task_id,
      parent_overlap,
      tasks,
      handleOverlaps(currTaskID,
      task_id,
      $("#"+currTaskID).overlaps(".task_bar"))
    );

console.log(overlapRecur);
      overlapRecur();
}
    
  );



}
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
