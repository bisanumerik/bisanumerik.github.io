function initBody(){}

function showHidden(x){
	x.style.display = "none";
	document.querySelector("#hid"+x.id.slice(-1)).style.display = "block";
	if(x.id.slice(-1) == "3") initBody();
}
