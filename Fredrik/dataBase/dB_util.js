


$( "#submit" ).click(function() {
  alert( "Handler for .submit() called." );
  event.preventDefault();
});



function storeTask(form) {
$("#response").append(form.task_name);
return false;
};

function showTasks() {
return false;
}

function checkIfTableExists() {
  $.ajax({
    url: "dB_util.php",
    success: alert("Yeeeesss");
}
