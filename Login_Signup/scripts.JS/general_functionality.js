function openLeftMenu() {
  document.getElementById("main").style.marginLeft = "25%";
  document.getElementById("leftMenu").style.width = "25%";
  document.getElementById("leftMenu").style.display = "block";
  document.getElementById("menuIcon").setAttribute("onClick", "closeLeftMenu();");
  document.getElementById("menuIcon").src = "img/logo/logo_white.svg";
  w3.toggleClass('#menuIcon', 'w3-dark-grey', 'w3-grey')
}


function closeLeftMenu() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("leftMenu").style.display = "none";
  document.getElementById("menuIcon").setAttribute("onClick", "openLeftMenu();");
  document.getElementById("menuIcon").src = "img/logo/logo_icon.svg";
  document.getElementById("menuIcon").style.backgroundColor = "lightgrey";
  w3.toggleClass('#menuIcon', 'w3-dark-grey', 'w3-grey')
}


function checkSignUp() {

  var password = document.getElementById("pwd").value;
  var email = document.getElementById("name1").value;
  var confirmPassword = document.getElementById("confpwd").value;

  if ((document.getElementById("pwd").value == document.getElementById("confpwd").value) &&
    (document.getElementById("name1").value !== (" " || null)) && (document.getElementById("confpwd").value !== (" " || null))) {
    if (typeof password == 'undefined' || !password || password.length === 0 || password === "" || !/[^\s]/.test(password) || /^\s*$/.test(password) || password.replace(/\s/g, "") === "") {
      alert("Fill in your password");
      $("#pwd").addClass("one");
    } else if (typeof email == 'undefined' || !email || email.length === 0 || email === "" || !/[^\s]/.test(email) || /^\s*$/.test(email) || email.replace(/\s/g, "") === "") {
      alert("Fill in your email address");
      $("#name1").addClass("one");
    } else if (typeof confirmPassword == 'undefined' || !confirmPassword || confirmPassword.length === 0 || confirmPassword === "" || !/[^\s]/.test(confirmPassword) || /^\s*$/.test(confirmPassword) || confirmPassword.replace(/\s/g, "") === "") {
      alert("Fill in your confirmed password");
      $("#confpwd").addClass("one");
    } else {
      if ($('#' + "administrator").is(":checked")) {

        return true;

      } else if ($('#' + "employee").is(":checked")) {

        alert("NÖÖÖÖÖFF");
        //TODO Fixa vad som händer - som employeee

      } else {
        alert("What position do you have?");
      }

    }
  } else {
    alert("Task failed successfully");
    $("#pwd").addClass("one");
    $("#confpwd").addClass("one");
  }
}

function RollDownFunction() {
  var x = document.getElementById("hidden")
  if (x.style.display == "none") {
    x.style.display = "inline-block";
    w3.toggleClass("#square", "div4", "div3")
  } else {
    x.style.display = "none";
    w3.toggleClass("#square", "div3", "div4")
  }
}
/* function cookieFunction() {
  var mail = document.getElementById("mail1").value;
  $.cookie('e-mail', 'mail', { expires: 1 });
var knas = $.cookie('e-mail');
  document.getElementById("output").innerHTML = knas;
}

function cookietoken() {

} */

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkLoginCookie() {
  var user = getCookie("username");
  var sessionID = getCookie("sessionID");
  if (user != "") {
    checkCookieValid(user, sessionID);
  }
  else {
    window.location.href = "signin.html";
  }
}

function deleteCookies() {
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function rememberSignIn() {
  if ($("#rememberMe").is(":checked")) {
    var user = document.getElementById("mail1").value;
    if (user != "" && user != null) {
      var pw = document.getElementById("pass").value;
      if (pw != "" && pw != null) {
        setCookie("username", user, 2);
        window.location.href = "planning.html";
      } else {
        alert("Please fill in your password");
        $("#pass").addClass("one");
      }
    } else {
      alert("Please fill in your email address");
      $("#mail1").addClass("one");
    }
  } else {
    window.location.href = "planning.html";
  }
}
