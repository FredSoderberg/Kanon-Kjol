
function openLeftMenu() {
  document.getElementById("map").style.marginLeft = "25%";
    document.getElementById("leftMenu").style.width = "25%";
    document.getElementById("leftMenu").style.display = "block";
  document.getElementById("menuIcon").setAttribute( "onClick", "closeLeftMenu();" );
  document.getElementById("menuIcon").src="img/logo/logo_white.svg";
  w3.toggleClass('#menuIcon','w3-dark-grey','w3-grey')
}


function closeLeftMenu() {
  document.getElementById("map").style.marginLeft = "0%";
  document.getElementById("leftMenu").style.display = "none";
  document.getElementById("menuIcon").setAttribute( "onClick", "openLeftMenu();" );
  document.getElementById("menuIcon").src="img/logo/logo_icon.svg";
  document.getElementById("menuIcon").style.backgroundColor ="lightgrey";
    w3.toggleClass('#menuIcon','w3-dark-grey','w3-grey')
}
