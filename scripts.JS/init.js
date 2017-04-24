$(function() {

  $("#newUserButton").click(function(event) {
    if (checkSignUp()) {
      var user = $("#name1").val();
      var pass = $("#pwd").val();
      dB_storeSignUp(user, pass);
    };
  });

  $("#employee").change(function(event) {
    RollDownFunction();
  });

  $("#signIn").click(function(event) {
   if (signInValid()) {
     dB_verifyUser();
 }
  });

  $("#signOut").click(function(event) {
    deleteCookies();
    window.location.href = "index.html";
  });


  //--------------------------------------------
  $("#remove_task").click(function() {
    var taskToSend = new task();
    taskToSend.id = $("#rem_task_id").val();
    //console.log("task"+taskToSend);
    removeTask(taskToSend);
    $("#rem_task_id").val("");
  });


  $("#create_task").click(function() {
    var taskToSend = new task();
    taskToSend.name = $("#task_name").val();
    //console.log("task:"+taskToSend);
    insertTask(taskToSend);
    $("#task_name").val("");
  });


  $("#listAllTasks").click(function() {
    listAllTasks();
  });

});
