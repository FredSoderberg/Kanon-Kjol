$(document).ready(function() {

    $("#newUserButton").click(function(event) {  checkPwd();  });
    $("#employee").change(function(event) {  RollDownFunction();  });
    $("#rememberMe").change(function(event) {  cookieFunction();  });


});


function checkPwd() {

var password = document.getElementById("pwd").value;
var email = document.getElementById("name1").value;
var confirmPassword = document.getElementById("confpwd").value;

  if ((document.getElementById("pwd").value == document.getElementById("confpwd").value) &&
      (document.getElementById("name1").value !== (" " || null)) && (document.getElementById("confpwd").value !== (" " || null))) {
        if (typeof password == 'undefined' || !password || password.length === 0 || password === "" || !/[^\s]/.test(password) || /^\s*$/.test(password) || password.replace(/\s/g,"") === ""){
          alert("Fill in your password");
          $( "#pwd" ).addClass( "one" );
        }
        else if (typeof email == 'undefined' || !email || email.length === 0 || email === "" || !/[^\s]/.test(email) || /^\s*$/.test(email) || email.replace(/\s/g,"") === "") {
          alert("Fill in your email address");
          $( "#name1" ).addClass( "one" );
        }
        else if (typeof confirmPassword == 'undefined' || !confirmPassword || confirmPassword.length === 0 || confirmPassword === "" || !/[^\s]/.test(confirmPassword) || /^\s*$/.test(confirmPassword) || confirmPassword.replace(/\s/g,"") === "") {
          alert("Fill in your confirmed password");
          $( "#confpwd" ).addClass( "one" );
        }
        else {
          if ($('#' + "administrator").is(":checked")) {
            window.location.href="index.html";
          }
          else if ($('#' + "employee").is(":checked")){
            alert("NÖÖÖÖÖFF");
            //TODO Fixa vad som händer
          }
          else{
            alert("What position do you have?");
          }

  }
  }
  else {
alert("Task failed successfully");
$( "#pwd" ).addClass( "one" );
$( "#confpwd" ).addClass( "one" );
  }
}

function RollDownFunction() {
    var x = document.getElementById("hidden")
    if (x.style.display == "none") {
        x.style.display = "inline-block";
        w3.toggleClass("#square","div3","div2")
    } else {
        x.style.display = "none";
        w3.toggleClass("#square","div2","div3")
    }
}
function cookieFunction() {
  
}
