


function insertTask(id,task) {
//console.log("data2: "+task);
if (id==null && name==null) {

}
else if (id==null && task !=null) {
  $.post('scripts.dB/dB_util.php', {function:"insertTask",newTask:task} )

      .done(function(data) {
  //      console.log("datan:"+data);
        listAllTasks();
       })

      .fail(function(jqxhr, textStatus, error) {
          var err = textStatus + ", " + error;
          console.log("Request Failed: " + err);
      });
}

}





function listAllTasks() {
  $.getJSON('scripts.dB/dB_util_JSON.php', {function:"getAllTasks"} )

      .done(function(tasks) {
      $("#tasks_list").empty();
          console.log(tasks);
        $.each(tasks,function (key,val) {
          $("#tasks_list").append("<li>ID: "+val.id+" - Name: "+val.name+"</li>");
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
