$(document).ready(function() {

    $("#newUserButton").click(function(event) {  checkPwd();  });
    $("#employee").change(function(event) {  RollDownFunction();  });


});


function checkPwd() {
  if (document.getElementById("pwd").value == document.getElementById("confpwd").value) {
    window.location.href="index.html";
  }
  else {
//alert("Passwords doesn't match");
$( "#pwd" ).addClass( "one" );
$( "#confpwd" ).addClass( "one" );
  }
}

function RollDownFunction() {
    var x = document.getElementById("hiden")
    if (x.style.display == "none") {
        x.style.display = "inline-block";
        w3.toggleClass("#square","div3","div2")
    } else {
        x.style.display = "none";
        w3.toggleClass("#square","div2","div3")
    }
}
