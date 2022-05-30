//init
var width = [];
var height = [];
var draw = [];
var slide = [];
var theFx = [];
var count = 0;
var fxLine = [];
var drawCapt = [];
var tXt = [];
var line = [];
var polyLine = [];
var rectChoise = [];
var points = [];
var thePlot = [];
var lineFx = [];

//Boundaries
var Xbound = [];
var Ybound = [];
var Xlength = [];
var Ylength = [];

function updateXbound(selector, bound){
	Xbound[selector] = bound;
	Xlength[selector] = Xbound[selector][1]-Xbound[selector][0];
}

//Init Function
function init_draw(selector, fX, Xb, Yb, capt = ""){
	width[selector] = document.querySelector(selector).clientWidth;
	height[selector] = document.querySelector(selector).clientHeight;
	draw[selector] = SVG().addTo(selector).size(width[selector],height[selector]);
	slide[selector] = 0;
	Xbound[selector] = Xb;
	Ybound[selector]= Yb;
	Xlength[selector] = Xbound[selector][1]-Xbound[selector][0];
	Ylength[selector] = Ybound[selector][1]-Ybound[selector][0];
	theFx[selector]=fX;
	tXt[selector] = [];
	points[selector] = [];
	lineFx[selector]=[];
	if(capt!="") drawCapt[selector] = document.querySelector(capt);
}

//Function
function fx(selector,x){
	return math.evaluate(theFx[selector],{x:x});
}

function retFx(inFx,x){
	return math.evaluate(inFx,{x:x});
}

function setFx(selector,fn){
	theFx[selector] = fn;
}

//draw X-coordinate line
function drawXLine(selector, ite,  withNumber = true, withLine = true){
	let textX = [];
	let textMarker = [];
	let x1 = (Xbound[selector][0]<0)?Math.abs(Xbound[selector][0]):(-Math.abs(Xbound[selector][0]));
	let modder = 1;
	for(let i = Xbound[selector][0]; i <= Xbound[selector][1]; i= Number(Decimal.add(i,ite).valueOf())){
		if(withLine) textMarker.push(draw[selector].line(width[selector]*((i+x1)/Xlength[selector]), height[selector]*(Math.abs(Ybound[selector][1])/Ylength[selector])-5, width[selector]*((i+x1)/Xlength[selector]), height[selector]*(Math.abs(Ybound[selector][1])/Ylength[selector])+5).stroke({color:"#aaa", width: 2}));
		if(withNumber) textX.push(draw[selector].text(i).move(width[selector]*((i+x1)/Xlength[selector]), height[selector]*(Math.abs(Ybound[selector][1])/Ylength[selector]) + 5 - (modder*30)).font({fill: "#000", family: "Quicksand"}).translate(-3,0));
		modder = (modder+1)%2;
	}

	lineX = draw[selector].line(0, height[selector]*(Math.abs(Ybound[selector][1])/Ylength[selector]), width[selector], height[selector]*(Math.abs(Ybound[selector][1])/Ylength[selector])).stroke({color:"#000",width:2});
}

//draw Y-coordinate line
function drawYLine(selector, ite, withNumber = true, withLine = true){
	if(Xbound[0]>0) return;
	let textY = [];
	let textMarker = [];
	for(let i = Math.ceil(Ybound[selector][0]); i <= Ybound[selector][1]; i= Number(Decimal.add(i,ite).valueOf())){
		if(i==0)continue;
		if(withLine) textMarker.push(draw[selector].line(width[selector]*(Math.abs(Xbound[selector][0])/Xlength[selector])-5, height[selector]*((Math.abs(Ybound[selector][1])-i)/Ylength[selector]), width[selector]*(Math.abs(Xbound[selector][0])/Xlength[selector])+5, height[selector]*((Math.abs(Ybound[selector][1])-i)/Ylength[selector])).stroke({color:"#aaa", width: 2}));
		if(withNumber) textY.push(draw[selector].text(i).move(width[selector]*(Math.abs(Xbound[selector][0])/Xlength[selector]) + 5, height[selector]*((Math.abs(Ybound[selector][1])-i)/Ylength[selector])).font({fill: "#000", family: "Quicksand"}));


	}

	lineY = draw[selector].line(width[selector]*(Math.abs(Xbound[selector][0])/Xlength[selector]), 0, width[selector]*(Math.abs(Xbound[selector][0])/Xlength[selector]), height[selector]).stroke({color:"#000",width:2});
}

//Draw Function
function drawFunction(selector, withAnim = false, dur = 300){
	let x1 = (Xbound[selector][0]<0)?Math.abs(Xbound[selector][0]):(-Math.abs(Xbound[selector][0]));
	let fxPath = [];
	for(let i = Xbound[selector][0]; i <= Xbound[selector][1]; i += (Xlength[selector]/width[selector])){
		if((-fx(selector,i)*(height[selector]/Ylength[selector]))+(height[selector]*(Math.abs(Ybound[selector][1])/Ylength[selector]))<-20 || (-fx(selector,i)*(height[selector]/Ylength[selector]))+(height[selector]*(Math.abs(Ybound[selector][1])/Ylength[selector]))>height[selector]+20) continue;
		fxPath.push([(i*(width[selector]/Xlength[selector]))+(width[selector]*(x1/Xlength[selector])),-fx(selector,i)*(height[selector]/Ylength[selector])+(height[selector]*(Math.abs(Ybound[selector][1])/Ylength[selector]))]);
	}

	if(!withAnim){
		fxLine[selector] = draw[selector].polyline(fxPath).fill("none").stroke({color: "#f06", width:3, linecap:"round", linejoin:"round"});
	}else{
		fxLine[selector] = draw[selector].polyline(fxPath).fill("none").stroke({color: "#f06", width:3, linecap:"round", linejoin:"round"}).css("stroke-dasharray",700);
		fxLine[selector].css("stroke-dashoffset",700);
		fxLine[selector].animate(dur).css("stroke-dashoffset",0);
	}
}

//Draw Function
function drawFunction2(selector,name,ffx, left, right, withAnim = false, dur = 300){
	let x1 = (Xbound[selector][0]<0)?Math.abs(Xbound[selector][0]):(-Math.abs(Xbound[selector][0]));
	let fxPath = [];
	for(let i = left; i <= right; i += (Xlength[selector]/width[selector])){
		if((-retFx(ffx,i)*(height[selector]/Ylength[selector]))+(height[selector]*(Math.abs(Ybound[selector][1])/Ylength[selector]))<-20 || (-retFx(ffx,i)*(height[selector]/Ylength[selector]))+(height[selector]*(Math.abs(Ybound[selector][1])/Ylength[selector]))>height[selector]+20) continue;
		fxPath.push([(i*(width[selector]/Xlength[selector]))+(width[selector]*(x1/Xlength[selector])),-retFx(ffx,i)*(height[selector]/Ylength[selector])+(height[selector]*(Math.abs(Ybound[selector][1])/Ylength[selector]))]);
	}
	if(!withAnim){
		lineFx[selector][name] = draw[selector].polyline(fxPath).fill("none").stroke({color: "#f06", width:3, linecap:"round", linejoin:"round"});
	}else{
		lineFx[selector][name] = draw[selector].polyline(fxPath).fill("none").stroke({color: "#f06", width:3, linecap:"round", linejoin:"round"}).css("stroke-dasharray",700);
		lineFx[selector][name].css("stroke-dashoffset",700);
		lineFx[selector][name].animate(dur).css("stroke-dashoffset",0);
	}
}

//Draw Rect Choises
function drawChoises(selector, x1,x2, opacity = 0.5,func = false, rchoise =0){
	let xx = (Xbound[selector][0]<0)?Math.abs(Xbound[selector][0]):(-Math.abs(Xbound[selector][0]));
	let x = width[selector]*((x1+xx)/Xlength[selector]);
	let le = width[selector]*(((x2-x1)/2)/Xlength[selector]);
	rectChoise[selector] = [];
	for(let i=0; i<2; i++){
		rectChoise[selector][i] = draw[selector].rect(le,10).attr({fill:"#f06", opacity:opacity}).move(x+(i*le),0);
		rectChoise[selector][i].animate(500).size(le,height[selector]);
		rectChoise[selector][i].on(["mouseover","mousedown"],function(){
			this.animate(100).attr({opacity:0.2});
		});
		rectChoise[selector][i].on(["mouseout","mouseup"],function(){
			this.animate(100).attr({opacity:opacity});
		});
		if(!func)continue;
		if(i==rchoise){
			rectChoise[selector][i].on("click", function(){
				nextSlide(selector);
			});
		}else{
			rectChoise[selector][i].on(["click","touch"], function(){
				drawWrongChoise(selector);
			});
		}
	}
}

//Draw Wrong Choises
function drawWrongChoise(selector){
	separator = draw[selector].rect(width[selector],height[selector]).attr({fill: "#fff", opacity: 0});
	let wrong = draw[selector].rect(width[selector]*0.5,height[selector]*0.5).attr({fill: "red", opacity: 0.7}).center(width[selector]/2,height[selector]/2).radius(10);
	wrong.animate(120).attr({width: width[selector]*0.9, height: height[selector]*0.8}).center(width[selector]/2,height[selector]/2);
	wrong.animate(80).attr({width: width[selector]*0.85, height: height[selector]*0.75}).center(width[selector]/2,height[selector]/2);
	wrong.animate(80).attr({width: width[selector]*0.9, height: height[selector]*0.8}).center(width[selector]/2,height[selector]/2);
	let wrongText = draw[selector].text("Salah!").center(width[selector]/2,height[selector]/2).font({fill:"#fff", size: 20, family: "Quicksand", alignment: "center", weight: "bold"});
	wrong.on(["click","touch"], function(){
		wrongText.clear();
		this.animate(50).attr({width:0, height:0}).center(width[selector]/2,height[selector]/2);
		separator.attr({width:0, height:0});
	});
}

//Draw Text
function drawText(selector, txt, x, y){
	let x1 = (Xbound[selector][0]<0)?Math.abs(Xbound[selector][0]):(-Math.abs(Xbound[selector][0]));
	tXt[selector].push(draw[selector].text(txt).move(width[selector]*((x+x1)/Xlength[selector]), height[selector]*(Math.abs(Ybound[selector][1]-y)/Ylength[selector]) + 5).font({fill: "#000", family: "Quicksand"}).translate(-3,0));
}

//Init DrawLine

function initDrawLine(selector){
	line[selector] = [];
	polyLine[selector] = [];
}

//Draw Line
function drawLine(selector, name, c1, c2){
	let x1 = (Xbound[selector][0]<0)?Math.abs(Xbound[selector][0]):(-Math.abs(Xbound[selector][0]));
	//line[selector].push(draw[selector].text(txt).move(width[selector]*((x+x1)/Xlength[selector]), height[selector]*(Math.abs(Ybound[selector][0])/Ylength[selector]) + 5).font({fill: "#000", family: "Quicksand"}).translate(-3,0));
	//line[selector].push(draw[selector].line(c1,c2));
	line[selector][name] = draw[selector].line([c1,c2]).fill("none").stroke({color: "#f06", width:3, linecap:"round",linejoin:"round"});
}

function updateLine(selector, name, c1, c2){
	line[selector][name].plot([c1,c2]);
}

function deleteLine(selector, name){
	line[selector][name].remove();
}

function drawPoint(selector,name, x, y){
	let x1 = (Xbound[selector][0]<0)?Math.abs(Xbound[selector][0]):(-Math.abs(Xbound[selector][0]));
	points[selector][name] = draw[selector].circle(10).center(width[selector]*((x+x1)/Xlength[selector]), height[selector]*(Math.abs(Ybound[selector][1]-y)/Ylength[selector])).fill("#04f");
	//.stroke({color: "#04f", width:10, linecap:"round",linejoin:"round"});
}

function drawPolyLine(selector, name, plot = []){
	let x1 = (Xbound[selector][0]<0)?Math.abs(Xbound[selector][0]):(-Math.abs(Xbound[selector][0]));
	let linePath = [];
	for(let i = 0; i < plot.length; i++){
		linePath.push([(plot[i][0]*(width[selector]/Xlength[selector]))+(width[selector]*(x1/Xlength[selector])),-plot[i][1]*(height[selector]/Ylength[selector])+(height[selector]*(Math.abs(Ybound[selector][1])/Ylength[selector]))]);
	}
	polyLine[selector][name] = draw[selector].polyline(linePath).fill("none").stroke({color: "#f06", width:3, linecap:"round",linejoin:"round"});
}

function intersectRect(r1, r2) {
    //CHECK IF THE TWO BOUNDING BOXES OVERLAP
  return (r1.x() < r2.x() + r2.width() &&
        r1.x() + r1.width() > r2.x() &&
        r1.y() < r2.y() + r2.height() &&
        r1.height() + r1.y() > r2.y());
}


function colLineCirc(line, circ){
	let m = (line.array()[1][1]-line.array()[0][1])/(line.array()[1][0]-line.array()[0][0]);
	let d = (-line.array()[0][0]*m)+line.array()[0][1];
	let cx = circ.cx();
	let cy = circ.cy();
	let r = circ.radius();
	a = (m*m)+1;
	b = 2*((m*(d-cy))-cx);
	c = ((d-cy)*(d-cy))+(cx*cx)-(r*r);
	if (!(line.x() < circ.x() + circ.width() &&
        line.x() + line.width() > circ.x() &&
        line.y() < circ.y() + circ.height() &&
        line.height() + line.y() > circ.y())) return false;
	if((b*b)-(4*a*c)<0) return false;
	return true;
}


//Slide Controller
function reSlide(selector){
	draw[selector].clear();
	slides[selector][slide[selector]=0]();
}
function nextSlide(selector){
	if(slide[selector]==slides[selector].length-1)return;
	slides[selector][++slide[selector]]();
}
