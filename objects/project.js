function Project(id, lengthDays) {
  this.id = id;   //Master keeps track on what projects exists

  this.startDate = new Date();
  this.stopDate = new Date();
  this.lengthDays = lengthDays;
  //this.stopDate.setDate(this.stopDate.getDate()+lengthDays)


  this.classes    = [];   // Unfilled resources
  this.resources  = [];

  this.tasks      = [];   // Tasks for this project
  this.categories;

  this.nextResourceID = -1;
  this.taskID = 1;
}


Project.prototype.init_test = function() {
  this.resources = [
    {name:"Fredrik", type:"Tjuren", id:1},
    {type:"Bäst", name:"Robert", id:2},
    {type:"Häst", name:"Erika", id:3},
    {type:"Test", name:"Fluffy", id:4}
  ];

  this.nextResourceID = 5;

}

Project.prototype.create_task = function(startDate, endDate, resID) {
  var task = new Task(startDate, endDate, resID, this.taskID);
  this.tasks.push(task);
  this.taskID++;
  return task;
}

Project.prototype.get_task_by_resource = function(resID){
  var touchingTasks = [];
  for(var i = 0; i < this.tasks.length; i++ ){
    if (this.tasks[i].resources[0] == resID){
      touchingTasks.push(this.tasks[i]);
    }
  }
  return touchingTasks;
}

Project.prototype.get_task_by_id = function (taskID) {

  for (var task in this.tasks) {
    if (this.tasks[task].id === taskID) {
      return this.tasks[task];
    }
  }
}

  Project.prototype.get_task_by_element = function (element) {
    //console.log("ELEMENT: ", element)
    var id = Number(element[0].id.replace("task_", ""));
      return this.get_task_by_id(id);
    }

Project.prototype.get_resource_by_id = function (resourceID) {
  for (var resource in this.resources) {
    if (this.resources[resource].id === resourceID) {
      return this.resources[resource];
    }
  }
};

Project.prototype.get_resource_by_element = function (element) {
  var id = Number(element[0].id);
    return this.get_resource_by_id(id);
};
