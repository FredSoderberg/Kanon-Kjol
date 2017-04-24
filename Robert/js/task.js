function Task(startDate, endDate, resID, taskID) {
  this.id = id;
  this.startDate = startDate;
  this.endDate = endDate;
  this.resources = [resID];
  this.taskID = taskID;
}

Task.prototype.render = function() {
  var html = "<div id='task_" + this.taskID + "' " + "class='task_bar' " + "style='" + "width : " + (config.dateCellWidth * 2 - 6) + "px;" + "height : " + (config.rowHeight - 6) + "px '>" + this.startDate.getDate() + "</div>";
  return html;
};
