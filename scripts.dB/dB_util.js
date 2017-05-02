function dB_storeSignUp(email, pass) {
var project = new Project("defualt project",30,email);
stringObject = JSON.stringify(project);
console.log("object: " + stringObject);
  $.post('scripts.dB/dB_util.php', {
    function: "saveNewUser",
    username: email,
    password: pass,
    defaulProject:stringObject
  }).done(function(data) {
    //      console.log("datan:" + data);
    setCookie("username", email, 7);
    setCookie("sessionID", data, 7);
    //console.log(data);
    window.location.replace("calendar.html");
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}

function dB_SessionIDValid(user, sessionID,init) {
  $.post('scripts.dB/dB_util.php', {
    function: "checkCookieValid",
    username: user,
    sessID: sessionID
  }).done(function(data) {
    console.log("cokkieDDdatan:" + data);
    if (data === "true" && init === false) {
      window.location.replace("calendar.html");
    } else if (data === "true" && init === true) {

      cal.userID = user;
      // TODO: START LOADING TASKS AND RESOURCES!

    }
     else {
      window.location.replace("signin.html");
    }
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}

function dB_verifyUser() {
  var email = $("#mail1").val();
  var pass = $("#pass").val();
  $.post('scripts.dB/dB_util.php', {
    function: "verifyUser",
    username: email,
    password: pass
  }).done(function(data) {
    console.log("datan:" + data);
    if ($("#rememberMe").is(":checked")) {
      setCookie("rememberMe", "true", 7);
    }
    setCookie("username", email, 7);
    setCookie("sessionID", data, 7);
    window.location.replace("calendar.html");

  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}

function dB_storeObject(object) {
  stringObject = JSON.stringify(object);
  console.log("object: " + stringObject);

  $.post('scripts.dB/dB_util.php', {
    function: "storeObject",
    objectToSend: stringObject
  }).done(function(data) {
    console.log("saved data: " + data);
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}

function dB_deleteObject(object) {
  stringObject = JSON.stringify(object);
  console.log("object: " + stringObject);

  $.post('scripts.dB/dB_util.php', {
    function: "deleteObject",
    objectToSend: stringObject
  }).done(function(data) {
    console.log("removed data: " + data);
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}

function dB_updateObject(object) {
  stringObject = JSON.stringify(object);
  console.log("object: " + stringObject);

  $.post('scripts.dB/dB_util.php', {
    function: "updateObject",
    objectToSend: stringObject
  }).done(function(data) {
    console.log("updated data: " + data);
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}




















// ----------------------- DEPRECATED ------------------------------------------
function dB_builObjectTable(object) {
  stringObject = JSON.stringify(object);
  console.log("object: " + stringObject);

  $.post('scripts.dB/dB_util.php', {
    function: "builObjectTable",
    objectToSend: stringObject
  }).done(function(data) {
    console.log("created table data: " + data);
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}

function dB_buildAllTables(objects) {
  $.each(objects, function(index, value) {
    if (value.type === "user") {
      dB_buildUserTable();
    } else {
      dB_builObjectTable(value);
    }

  });
}

function dB_buildUserTable() {
  $.post('scripts.dB/dB_util.php', {function: "builUserTable"}).done(function(data) {
    console.log("created table data: " + data);
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}

function dB_dropObjectTable(object) {
  stringObject = JSON.stringify(object);
  console.log("object: " + stringObject);

  $.post('scripts.dB/dB_util.php', {
    function: "dropObjectTable",
    objectToSend: stringObject
  }).done(function(data) {
    console.log("droped table data: " + data);
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}

function dB_createDatabase(objects) {
  $.post('scripts.dB/dB_util.php', {function: "createDatabase"}).done(function(data) {
    console.log("created Nock-Off database: " + data);
    $.each(objects, function(index, value) {
      if (value.type === "user") {
        dB_buildUserTable();
      } else {
        dB_builObjectTable(value);
      }

    });

  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}

function dB_dropAllTables(objects) {
  $.each(objects, function(index, value) {
    dB_dropObjectTable(value);
  });
}

function dB_dropDB() {
  $.post('scripts.dB/dB_util.php', {function: "dropDB"}).done(function(data) {
    console.log("dropped Nock-Off database: " + data);
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}

//------------------------------------------------------
// function removeTask(task) {
//   //console.log("data1: " + task);
//   //  taskSend = JSON.stringify(task);
//   //    console.log("data2: " + taskSend);
//
//   $.post('scripts.dB/dB_util.php', {
//     function: "removeTask",
//     taskToRemove: taskSend
//   }).done(function(data) {
//     //      console.log("datan:" + data);
//     listAllTasks();
//   }).fail(function(jqxhr, textStatus, error) {
//     var err = textStatus + ", " + error;
//     console.log("Request Failed: " + err);
//   });
// }
//
// function insertTask(task) {
//   //    console.log("data1: " + task);
//   taskSend = JSON.stringify(task);
//   //    console.log("data2: " + taskSend);
//
//   $.post('scripts.dB/dB_util.php', {
//     function: "insertTask",
//     newTask: taskSend
//   }).done(function(data) {
//     //      console.log("datan:" + data);
//     listAllTasks();
//   }).fail(function(jqxhr, textStatus, error) {
//     var err = textStatus + ", " + error;
//     console.log("Request Failed: " + err);
//   });
// }
//
// function listAllTasks() {
//   $.getJSON('scripts.dB/dB_util_JSON.php', {
//     function: "getAllTasks"
//   }).done(function(tasks) {
//     $("#tasks_list").empty();
//     //  console.log(tasks);
//     $.each(tasks, function(key, val) {
//       $("#tasks_list").append("<li>ID: " + val.id + " - Name: " + val.name + "</li>");
//     })
//
//   }).fail(function(jqxhr, textStatus, error) {
//     var err = textStatus + ", " + error;
//     console.log("Request Failed: " + err);
//   });
//}
