$(document).ready(function() {

  $("#submit_my").click(function(event) {
        if ($("input:first").val() === "correct") {
            $("#response").text("Validated...").show();
            return;
        }

        $("#response").text("Not valid!").show().fadeOut(1000);

    });

});
