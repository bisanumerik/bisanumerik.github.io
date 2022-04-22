//Init
var width = document.getElementById("drawing").clientWidth;
var height = document.getElementById("drawing").clientHeight;
var draw = SVG().addTo('#drawing').size(width,height);
var slide = 0;
var theFx = "e^x - 5";

//SVG Children
var textX = [];
var textY = [];
var textMarker = [];
var lineX;
var lineY;
var fxPath = [];
var fxLine = [];
var rectChoise = [];
var wrong;
var wrongText;
var separator;


//Boundaries
var Xbound = [-5,5];
var Ybound = [-5,5];
var Xlength = Xbound[1]-Xbound[0];
var Ylength = Ybound[1]-Ybound[0];

//Function
function fx(x){
	return math.evaluate(theFx,{x:x});
}

//draw X-coordinate line
function drawXLine(ite){
	textX = [];
	textMarker = [];
	let x1 = (Xbound[0]<0)?Math.abs(Xbound[0]):(-Math.abs(Xbound[0]));
	let modder = 1;
	for(let i = Xbound[0]; i <= Xbound[1]; i= Number(Decimal.add(i,ite).valueOf())){
		textMarker.push(draw.line(width*((i+x1)/Xlength), height*(Math.abs(Ybound[0])/Ylength)-5, width*((i+x1)/Xlength), height*(Math.abs(Ybound[0])/Ylength)+5).stroke({color:"#aaa", width: 2}));
		textX.push(draw.text(i).move(width*((i+x1)/Xlength), height*(Math.abs(Ybound[0])/Ylength) + 5 - (modder*30)).font({fill: "#000", family: "Quicksand"}).translate(-3,0));
		modder = (modder+1)%2;
	}

	lineX = draw.line(0, height*(Math.abs(Ybound[0])/Ylength), width, height*(Math.abs(Ybound[0])/Ylength)).stroke({color:"#000",width:2});
}

//draw Y-coordinate line
function drawYLine(withLine = true, withNumber = true){
	if(Xbound[0]>0) return;
	textY = [];
	textMarker = [];
	for(let i = Math.ceil(Ybound[0]); i <= Ybound[1]; i++){
		if(i==0)continue;
		if(withLine) textMarker.push(draw.line(width*(Math.abs(Xbound[0])/Xlength)-5, height*((i+Math.abs(Ybound[0]))/Ylength), width*(Math.abs(Xbound[0])/Xlength)+5, height*((i+Math.abs(Ybound[0]))/Ylength)).stroke({color:"#aaa", width: 2}));
		if(withNumber) textY.push(draw.text(i).move(width*(Math.abs(Xbound[0])/Xlength) + 5, height*((i+Math.abs(Ybound[0]))/Ylength)).font({fill: "#000", family: "Quicksand"}));

		lineY = draw.line(width*(Math.abs(Xbound[0])/Xlength), 0, width*(Math.abs(Xbound[0])/Xlength), height).stroke({color:"#000",width:2});
	}
}

//Draw Function
function drawFunction(selector, withAnim = false){
	let x1 = (Xbound[0]<0)?Math.abs(Xbound[0]):(-Math.abs(Xbound[0]));
	fxPath = [];
	for(let i = Xbound[0]; i <= Xbound[1]; i += (Xlength/width)){
		if((-fx(i)*(height/Ylength))+(height*(Math.abs(Ybound[0])/Ylength))<0 || (-fx(i)*(height/Ylength))+(height*(Math.abs(Ybound[0])/Ylength))>height) continue;
		fxPath.push([(i*(width/Xlength))+(width*(x1/Xlength)),-fx(i)*(height/Ylength)+(height/2)]);
	}
	fxLine = draw.polyline(fxPath).fill("none").stroke({color: "#f06", width:3, linecap:"round", linejoin:"round"}).css("stroke-dasharray",600);
	fxLine.css("stroke-dashoffset",600);
	fxLine.animate(300).css("stroke-dashoffset",0);
	//
	//fxLine.dmove(width*(x1/Xlength),height*(Math.abs(Ybound[0])/Ylength));
	//fxLine.translate(width*(x1/Xlength),height*(Math.abs(Ybound[0])/Ylength));
}

//Draw Rect Choises
function drawChoises(x1,x2, rchoise){
	let xx = (Xbound[0]<0)?Math.abs(Xbound[0]):(-Math.abs(Xbound[0]));
	let x = width*((x1+xx)/Xlength);
	let le = width*(((x2-x1)/2)/Xlength);
	rectChoise = [];
	for(let i=0; i<2; i++){
		rectChoise[i] = draw.rect(le,height).attr({fill:"#f06", opacity:0.5}).move(x+(i*le),0);
		rectChoise[i].on(["mouseover","mousedown"],function(){
			this.animate(100).attr({opacity:0.2});
		});
		rectChoise[i].on(["mouseout","mouseup"],function(){
			this.animate(100).attr({opacity:0.5});
		});
		if(i==rchoise){
			rectChoise[i].on("click", function(){
				nextSlide();
			});
		}else{
			rectChoise[i].on(["click","touch"], function(){
				drawWrongChoise();
			});
		}
	}

}

//Draw Wrong Choises
function drawWrongChoise(){
	separator = draw.rect(width,height).attr({fill: "#fff", opacity: 0});
	wrong = draw.rect(width*0.5,height*0.5).attr({fill: "red", opacity: 0.7}).center(width/2,height/2).radius(10);
	wrong.animate(120).attr({width: width*0.9, height: height*0.8}).center(width/2,height/2);
	wrong.animate(80).attr({width: width*0.85, height: height*0.75}).center(width/2,height/2);
	wrong.animate(80).attr({width: width*0.9, height: height*0.8}).center(width/2,height/2);
	wrongText = draw.text("Salah!").center(width/2,height/2).font({fill:"#fff", size: 20, family: "Quicksand", alignment: "center", weight: "bold"});
	wrong.on(["click","touch"], function(){
		wrongText.clear();
		this.animate(50).attr({width:0, height:0}).center(width/2,height/2);
		separator.attr({width:0, height:0});
	});
}

//Slide Controller
function nextSlide(){
	if(slide==slides.length-1) return;
	slides[++slide]();
}
function prevSlide(){
	if(slide==0) return;
	slides[--slide]();
}
function reSlide(){
	slides[0]();
	slide = 0;
}
