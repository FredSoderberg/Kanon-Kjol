function dB_storeSignUp(email, pass) {
  $.post('scripts.dB/dB_util.php', {
      function: "checkUserExist",
      username: email
    }).done(function(data) {
      if (Number(data) > 0) {
        warningUserExists();
      }
      else {
        dB_saveNewUser(email,pass);
      }
    }).fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Request Failed: " + err);
    });
}

function dB_saveNewUser(email, pass) {
  var project = new Project("defualt project",30,email);
  stringObject = JSON.stringify(project);
  //console.log("object: " + stringObject);
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



function dB_loadProjects(user) {
  console.log("userID:",user);
  $.getJSON('scripts.dB/dB_util_JSON.php', {
    function: "loadProjects",
    username: user,
  }).done(function(data) {
      // console.log("projectID:",data);
      data =  data[0];
      var startDate = new Date(Date.parse(data.startDate));
      var stopDate = new Date(Date.parse(data.stopDate));
      var lengthDays = startDate.distanceInDays(stopDate);
      // console.log(lengthDays);
      cal.project = new Project (data.name, lengthDays, data.adminEmail)
      cal.project.id             = Number(data.id);
      // cal.project.name           = data.name;
      // cal.project.adminEmail     = data.adminEmail;
      cal.project.lengthDays     = lengthDays;
      cal.project.startDate      = startDate
      cal.project.stopDate       = stopDate
      cal.project.categories     = data.categories;
      cal.project.nextResourceID = data.nextResourceID;
      cal.project.nextTaskID     = data.nextTaskID;


      // $("#proj").attr("id","proj_"+data.id)
      $("#proj").html(data.name);

      cal._create_date_headers();
      dB_loadResources(data.id);

  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}

function dB_loadResources(projIDToGet) {

  $.getJSON('scripts.dB/dB_util_JSON.php', {
    function: "loadResources",
    project: projIDToGet
  }).done(function(data) {
  //  console.log("ladda resurs:",data);
    // console.log("project:ID:TOGET:",projIDToGet);
    // console.log("resurser",data);
        $.each( data, function( key, value ) {
        var toAdd = new Resource (
        Number(value['id']),
        value['name'],
        value['groupType']);
        toAdd.row = value['rowNumber'];
        toAdd.color = value['color'];
        toAdd.projectID = projIDToGet;
  //      console.log(projIDToGet,"- resurs:",toAdd);
        cal.project.resources.push(toAdd);
      })
      cal.project.render_all_resources();
      dB_loadTasks(projIDToGet);

  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}

function dB_loadTasks(projIDToGet) {
  $.getJSON('scripts.dB/dB_util_JSON.php', {
    function: "loadTasks",
    project: projIDToGet
  }).done(function(data) {
  //  console.log("tasks",data);
      $.each( data, function( key, value ) {
        var resourceList = JSON.parse(value.resources);
        var startDatetoAdd = new Date(Date.parse(value.startDate));
        var endDatetoAdd = new Date(Date.parse(value.endDate));
        var toAdd = new Task(startDatetoAdd,endDatetoAdd,resourceList,Number(value.id),value.name,Number(value.lengthInDays));
        toAdd.color = value.color;
        cal.project.tasks.push(toAdd)
        toAdd.render();
      })
      $('#loading').hide();
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
  //  console.log("cokkieDDdatan:" + data);
    if (data === "true" && init === false) {
      window.location.replace("calendar.html");
    } else if (data === "true" && init === true) {

      cal.userID = user;
      dB_loadProjects(user);

      // TODO: START LOADING TASKS AND RESOURCES!

    }
     else {
      window.location.replace("signin.html");
    }
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
    window.location.replace("signin.html");
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
    if(data === "wrong") {
      wrongPwd();
    }
    else {
      //  console.log("datan:" + data);
      if ($("#rememberMe").is(":checked")) {
        setCookie("rememberMe", "true", 7);
      }
      setCookie("username", email, 7);
      setCookie("sessionID", data, 7);
      window.location.replace("calendar.html");
    }
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}

function dB_storeObject(object) {
  stringObject = JSON.stringify(object);
  // console.log("object: ",object);
  // console.log("stringObject: ",stringObject);

  $.post('scripts.dB/dB_util.php', {
    function: "storeObject",
    objectToSend: stringObject
  }).done(function(data) {

    switch (object.type) {
      case "Resource":
        $("#row_"+object.id).attr("id","row_"+data);
        $("#"+object.id).attr("id",data);
        cal.project.get_resource_by_id(object.id).id = Number(data);
      break;

      case "Task":
        $("#task_"+object.id).attr("id","task_"+data);
        $("#task_"+object.id).attr("id","task_"+data);
        cal.project.get_task_by_id(object.id).id = Number(data);
      break;

  default:
}


  //  console.log("new ID: " + data);
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}

function dB_deleteObject(object) {
  stringObject = JSON.stringify(object);
  // console.log("object: " + stringObject);

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
  // console.log("object: " + stringObject);

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

function dB_updateObjectAndReload(object) {
  $('#loading').show();
  stringObject = JSON.stringify(object);
  // console.log("object: " + stringObject);

  $.post('scripts.dB/dB_util.php', {
    function: "updateObject",
    objectToSend: stringObject
  }).done(function(data) {
    window.location.replace("calendar.html");
    console.log("updated data: " + data);
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
}


















// ----------------------- DEPRECATED ------------------------------------------
// function dB_builObjectTable(object) {
//   stringObject = JSON.stringify(object);
//   // console.log("object: " + stringObject);
//
//   $.post('scripts.dB/dB_util.php', {
//     function: "builObjectTable",
//     objectToSend: stringObject
//   }).done(function(data) {
//     console.log("created table data: " + data);
//   }).fail(function(jqxhr, textStatus, error) {
//     var err = textStatus + ", " + error;
//     console.log("Request Failed: " + err);
//   });
// }
//
// function dB_buildAllTables(objects) {
//   $.each(objects, function(index, value) {
//     if (value.type === "user") {
//       dB_buildUserTable();
//     } else {
//       dB_builObjectTable(value);
//     }
//
//   });
// }
//
// function dB_buildUserTable() {
//   $.post('scripts.dB/dB_util.php', {function: "builUserTable"}).done(function(data) {
//     console.log("created table data: " + data);
//   }).fail(function(jqxhr, textStatus, error) {
//     var err = textStatus + ", " + error;
//     console.log("Request Failed: " + err);
//   });
// }
//
// function dB_dropObjectTable(object) {
//   stringObject = JSON.stringify(object);
//   console.log("object: " + stringObject);
//
//   $.post('scripts.dB/dB_util.php', {
//     function: "dropObjectTable",
//     objectToSend: stringObject
//   }).done(function(data) {
//     console.log("droped table data: " + data);
//   }).fail(function(jqxhr, textStatus, error) {
//     var err = textStatus + ", " + error;
//     console.log("Request Failed: " + err);
//   });
// }
//
// function dB_createDatabase(objects) {
//   $.post('scripts.dB/dB_util.php', {function: "createDatabase"}).done(function(data) {
//     console.log("created Nock-Off database: " + data);
//     $.each(objects, function(index, value) {
//       if (value.type === "user") {
//         dB_buildUserTable();
//       } else {
//         dB_builObjectTable(value);
//       }
//
//     });
//
//   }).fail(function(jqxhr, textStatus, error) {
//     var err = textStatus + ", " + error;
//     console.log("Request Failed: " + err);
//   });
// }
//
// function dB_dropAllTables(objects) {
//   $.each(objects, function(index, value) {
//     dB_dropObjectTable(value);
//   });
// }
//
// function dB_dropDB() {
//   $.post('scripts.dB/dB_util.php', {function: "dropDB"}).done(function(data) {
//     console.log("dropped Nock-Off database: " + data);
//   }).fail(function(jqxhr, textStatus, error) {
//     var err = textStatus + ", " + error;
//     console.log("Request Failed: " + err);
//   });
// }

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
