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

  this.nextResourceID = 1;
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

Project.prototype.create_task = function(date, resID) {
this.tasks.push(new Task(this.taskID++, date, resID));
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
