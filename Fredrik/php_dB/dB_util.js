$(document).ready(function() {

  $("#submit_my").click(function(event) {
        if ($("input:first").val() === "correct") {
            $("#response").text("Validated...").show();
            return;
        }

        $("#response").text("Not valid!").show().fadeOut(1000);

    });

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
