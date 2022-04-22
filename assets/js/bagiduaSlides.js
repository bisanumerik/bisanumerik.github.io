var slides = [];
slides[0] = function(){
	Xbound = [-5,5];
	Xlength = Xbound[1]-Xbound[0];
	Ybound = [-5,5];
	Ylength = Ybound[1]-Ybound[0];
	draw.clear();
	drawXLine(1);
	drawYLine(0,0);
	drawFunction();
}
slides[1] = function(){
	draw.clear();
	drawXLine(1);
	drawYLine();
	drawFunction();
	drawChoises(-4,4,1);
}
slides[2] = function(){
	Xbound = [-1,5];
	Xlength = Xbound[1]-Xbound[0];
	Ybound = [-3,3];
	Ylength = Ybound[1]-Ybound[0];
	draw.clear();
	drawXLine(1);
	drawYLine();
	drawFunction();
	drawChoises(0,4,0);
}
slides[3] = function(){
	Xbound = [-0.5,2.5];
	Xlength = Xbound[1]-Xbound[0];
	Ybound = [-2,2];
	Ylength = Ybound[1]-Ybound[0];
	draw.clear();
	drawXLine(0.25);
	drawYLine();
	drawFunction();
	drawChoises(0,2,1);
}
slides[4] = function(){
	Xbound = [0.8,2.2];
	Xlength = Xbound[1]-Xbound[0];
	Ybound = [-1,1];
	Ylength = Ybound[1]-Ybound[0];
	draw.clear();
	drawXLine(0.1);
	drawYLine();
	drawFunction();
	drawChoises(1,2,1);
}
slides[5] = function(){
	Xbound = [1.4,2.1];
	Xlength = Xbound[1]-Xbound[0];
	Ybound = [-0.8,0.8];
	Ylength = Ybound[1]-Ybound[0];
	draw.clear();
	drawXLine(0.1);
	drawYLine();
	drawFunction();
	drawChoises(1.5,2,0);
}
slides[6] = function(){
	Xbound = [1.45,1.8];
	Xlength = Xbound[1]-Xbound[0];
	Ybound = [-0.5,0.5];
	Ylength = Ybound[1]-Ybound[0];
	draw.clear();
	drawXLine(0.025);
	drawYLine();
	drawFunction();
	drawChoises(1.5,1.75,0);
}
slides[7] = function(){
	Xbound = [1.475,1.65];
	Xlength = Xbound[1]-Xbound[0];
	Ybound = [-0.2,0.2];
	Ylength = Ybound[1]-Ybound[0];
	draw.clear();
	drawXLine(0.0125);
	drawYLine();
	drawFunction();
	drawChoises(1.5,1.625,1);
}


//-------------------------------Test Draw 2-----------------------------
var draw2 = SVG().addTo('#draw2').size(width,height);
var yyy = draw2.polyline("10 10 20 20").fill("none").stroke({color: "#f06", width:3, linecap:"round", linejoin:"round"});
//var points2 = "20 20 30 30";
yyy.animate(200).attr("points","20 20 30 30 30 40");
