var slides = [];
var c1 = [];
var c2 = [];
var click = false;

slides["#draw1"] = [];
slides["#draw1"][0] = function(){
	drawXLine("#draw1",2.5,1);
	drawYLine("#draw1",5,1);
	drawPoint("#draw1","1",5,40);
	drawPoint("#draw1","2",10,30);
	drawPoint("#draw1","3",15,25);
	drawPoint("#draw1","4",20,40);
	drawPoint("#draw1","5",25,18);
	drawPolyLine("#draw1","AS",[[5,40],[10,30],[15,25],[20,40],[25,18]]);
}

slides["#draw2"] = [];
slides["#draw2"][0] = function(){
	drawXLine("#draw2",2.5,1);
	drawYLine("#draw2",5,1);
	drawPoint("#draw2","1",5,40);
	drawPoint("#draw2","2",10,30);
	drawPoint("#draw2","3",15,25);
	drawPoint("#draw2","4",20,40);
	drawPoint("#draw2","5",25,18);
	drawFunction("#draw2");
}
//

function initBody(){
	init_draw("#draw1","x^2",[0,30],[0,45]);
	init_draw("#draw2","((-3/625)*(x^4))+((13/50)*(x^3))-((47/10)*(x^2))+(32*x)-32",[0,30],[0,45]);
	initDrawLine("#draw1");
	slides["#draw1"][0]();
	slides["#draw2"][0]();

}

function showHidden(x){
	x.style.display = "none";
	document.querySelector("#hid"+x.id.slice(-1)).style.display = "block";
	if(x.id.slice(-1) == "3") initBody();
}
