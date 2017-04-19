function removeTask(task) {
  //console.log("data1: " + task);
  //  taskSend = JSON.stringify(task);
  //    console.log("data2: " + taskSend);

  $.post('scripts.dB/dB_util.php', {
    function: "removeTask",
    taskToRemove: taskSend
  }).done(function(data) {
    //      console.log("datan:" + data);
    listAllTasks();
  }).fail(function(jqxhr, textStatus, error) {
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
  }).done(function(data) {
    //      console.log("datan:" + data);
    listAllTasks();
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}

function listAllTasks() {
  $.getJSON('scripts.dB/dB_util_JSON.php', {function: "getAllTasks"}).done(function(tasks) {
    $("#tasks_list").empty();
    //  console.log(tasks);
    $.each(tasks, function(key, val) {
      $("#tasks_list").append("<li>ID: " + val.id + " - Name: " + val.name + "</li>");
    })

  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}

function storeSignUp(user, pass) {
  $.post('scripts.dB/dB_util.php', {
    function: "saveNewUser",
    username: user,
    password: pass
  }).done(function(data) {
    //      console.log("datan:" + data);
    setCookie("username", user, 7)
    setCookie("sessionID", data, 7)
    //console.log(data);
    window.location.href = "planning.html";
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}

function checkCookieValid(user, sessionID) {
  $.get('scripts.dB/dB_util.php', {
    function: "checkCookieValid",
    username: user,
    sessID: sessionID
  }).done(function(data) {
    console.log("datan:" + data);

    if (data === "true") {
      window.location.href = "planning.html";
    } else {
      window.location.href = "signin.html";
    }
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}
