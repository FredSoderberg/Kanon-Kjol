function removeTask(task) {
//console.log("data1: " + task);
    taskSend = JSON.stringify(task);
//    console.log("data2: " + taskSend);

    $.post('scripts.dB/dB_util.php', {
            function: "removeTask",
            taskToRemove: taskSend
        })

        .done(function(data) {
      //      console.log("datan:" + data);
            listAllTasks();
        })

        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
          console.log("Request Failed: " + err);
        });
}

function insertTask(task) {
//    console.log("data1: " + task);
    taskSend = JSON.stringify(task);
//    console.log("data2: " + taskSend);

    $.post('scripts.dB/dB_util.php', {
            function: "insertTask",
            newTask: taskSend
        })

        .done(function(data) {
      //      console.log("datan:" + data);
            listAllTasks();
        })

        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
          console.log("Request Failed: " + err);
        });
}






function listAllTasks() {
    $.getJSON('scripts.dB/dB_util_JSON.php', {
            function: "getAllTasks"
        })

        .done(function(tasks) {
            $("#tasks_list").empty();
            //  console.log(tasks);
            $.each(tasks, function(key, val) {
                $("#tasks_list").append("<li>ID: " + val.id + " - Name: " + val.name + "</li>");
            })

        })

        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
}









//------------------TEST FUNCTION-------------------------------------
/*
function getAllTasks () {
  $.getJSON('scripts.dB/dB_util.php', {function:"getAllTasks"} )
      .done(function(tasks) {
        console.log(tasks);

      })
      .fail(function(jqxhr, textStatus, error) {
          var err = textStatus + ", " + error;
          console.log("Request Failed: " + err);
      });
}
*/
