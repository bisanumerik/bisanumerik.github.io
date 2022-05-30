var slides = [];
var c1 = [];
var c2 = [];
var click = false;

slides["#draw1"] = [];
slides["#draw1"][0] = function(){
	drawXLine("#draw1",1,1);
	drawYLine("#draw1",1,1);
	drawPoint("#draw1","1",0,2.5);
	drawPoint("#draw1","2",1,0.5);
	drawPoint("#draw1","3",2,0.5);
	drawPoint("#draw1","4",2.5,1.5);
	drawPoint("#draw1","5",3,1.5);
	drawPoint("#draw1","6",3.5,1.125);
	drawPoint("#draw1","7",4,0);
	drawPolyLine("#draw1","AS",[[0,2.5],[1,0.5],[2,0.5],[2.5,1.5],[3,1.5],[3.5,1.125],[4,0]]);
}

slides["#draw2"] = [];
slides["#draw2"][0] = function(){
	drawXLine("#draw2",1,1);
	drawYLine("#draw2",1,1);
	drawPoint("#draw2","1",0,2.5);
	drawPoint("#draw2","2",1,0.5);
	drawPoint("#draw2","3",2,0.5);
	drawPoint("#draw2","4",2.5,1.5);
	drawPoint("#draw2","5",3,1.5);
	drawPoint("#draw2","6",3.5,1.125);
	drawPoint("#draw2","7",4,0);
	drawFunction("#draw2");
}

slides["#draw3"] = [];
slides["#draw3"][0] = function(){
	drawXLine("#draw3",1,1);
	drawYLine("#draw3",1,1);
	drawPoint("#draw3","1",0,2.5);
	drawPoint("#draw3","2",1,0.5);
	drawPoint("#draw3","3",2,0.5);
	drawPoint("#draw3","4",2.5,1.5);
	drawPoint("#draw3","5",3,1.5);
	drawPoint("#draw3","6",3.5,1.125);
	drawPoint("#draw3","7",4,0);
	drawFunction2("#draw3", "A", "(x^2) - (3*x) + 2.5", 0,2);
	drawFunction2("#draw3", "B", "(-2*(x^2)) + (11*x) - 13.5", 2,3);
	drawFunction2("#draw3", "B", "(-1.5*(x^2)) + (9*x) - 12", 3,4);
}
//

function initBody(){
	init_draw("#draw1","x^2",[-1,5],[-1,4]);
	init_draw("#draw2","2.5 +(20.4155*x)+((x^2)*(-53.8966))+(46.8393*(x^3))+((x^4)*(-18.6002))+(3.49524*(x^5))+((x^6)*(-0.253175))",[-1,5],[-1,4]);
	init_draw("#draw3","x^2",[-1,5],[-1,4]);
	initDrawLine("#draw1");
	slides["#draw1"][0]();
	slides["#draw2"][0]();
	slides["#draw3"][0]();

}

function showHidden(x){
	x.style.display = "none";
	document.querySelector("#hid"+x.id.slice(-1)).style.display = "block";
	if(x.id.slice(-1) == "3") initBody();
}
