function Project(name, lengthDays, adminEmail) {
  this.id = "-1";   //Master keeps track on what projects exists
  this.name = name;
  this.adminEmail = adminEmail;
  this.lengthDays = lengthDays;
  this.startDate = new Date();
  this.stopDate = new Date();
  this.categories = "";
  this.nextResourceID = -1;
  this.taskID = 1;
  this.type = "Project"; //obejct must "end" with type

  //below is DB associative tables - these objects save themselves in DB and when a prject is built from db theese are populated.
  this.classes    = [];   // Unfilled resources
  this.resources  = [];  // position sparas i realtions tabelen projekt-resource
  this.tasks      = [];   // Tasks for this project

  this.stopDate.setDate(this.stopDate.getDate()+lengthDays)



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
  //console.log("Projekt_createTask:", this)
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
    //console.log(this.tasks[task].taskID)
    if (this.tasks[task].taskID === taskID) {
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
    if (this.resources[resource].id == resourceID) {
      return this.resources[resource];
    }
  }
};

Project.prototype.get_resource_by_element = function (element) {
  var id = Number(element[0].id);
    return this.get_resource_by_id(id);
};

Project.prototype.set_resource_row = function (element,value) {
  var resourceID = Number(element.id);
  for (var resource in this.resources) {
    if (this.resources[resource].id === resourceID) {
      //console.log("nytt varde: ", value);
      this.resources[resource].row = value;
    }
  }
};
Project.prototype.update_resource_id = function (target,value) {
  this.get_resource_by_id(target).id = value;
};
