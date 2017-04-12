document.write('<script src="w3.js"><\/script>');
//document.write('<script src="modernizr-2.7.2.js"><\/script>');


function openLeftMenu() {
  document.getElementById("main").style.marginLeft = "25%";
  document.getElementById("leftMenu").style.width = "25%";
  document.getElementById("leftMenu").style.display = "block";
  document.getElementById("menuIcon").setAttribute( "onClick", "closeLeftMenu();" );
  document.getElementById("menuIcon").src="img/logo/logo_white.svg";
  w3.toggleClass('#menuIcon','w3-dark-grey','w3-grey')
}


function closeLeftMenu() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("leftMenu").style.display = "none";
  document.getElementById("menuIcon").setAttribute( "onClick", "openLeftMenu();" );
  document.getElementById("menuIcon").src="img/logo/logo_icon.svg";
  document.getElementById("menuIcon").style.backgroundColor ="lightgrey";
    w3.toggleClass('#menuIcon','w3-dark-grey','w3-grey')
}
