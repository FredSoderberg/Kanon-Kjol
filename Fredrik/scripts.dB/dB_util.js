

function insertTask(id,name) {

if (id==null && name==null) {

}
else if (id==null && name !=null) {
  $.getJSON('scripts.dB/dB_util_JSON.php', {function:"insertTask",newName:name} )

      .done(function(tasks) {
        alert("successful");
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
