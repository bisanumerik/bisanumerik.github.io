var slides = [];
var c1 = [];
var c2 = [];
var click = false;

slides["#drawing"] = [];
slides["#drawing"][0] = function(){
	updateXbound("#drawing",[-4,4]);
	drawXLine("#drawing",1,0);
	drawYLine("#drawing",1,0);
	//drawFunction("#drawing",true,1000);
	drawPoint("#drawing","A",1,3);
	drawPoint("#drawing","B",-1,-1);
	drawText("#drawing","A",1,3);
	drawText("#drawing","B",-1,-1);
}

//

function initBody(){
	init_draw("#drawing","2x+1",[-4,4],[-5,5], "#drawing-caption");
	slides["#drawing"][0]();
	initDrawLine("#drawing");

}

function showHidden(x){
	x.style.display = "none";
	document.querySelector("#hid"+x.id.slice(-1)).style.display = "block";
}

["mousedown","touchstart"].forEach(function(evt){
	document.querySelector("#map-catcher").addEventListener(evt,function (e) {
		e.preventDefault();
		if('ontouchstart' in window){
			let bcr = e.target.getBoundingClientRect();
			e.offsetX = e.targetTouches[0].clientX - bcr.x;
			e.offsetY = e.targetTouches[0].clientY - bcr.y;
		}
		if(click){
			click = false;
			deleteLine("#drawing","gambar");
		}
		c1 = [e.offsetX , e.offsetY];
		drawLine("#drawing","gambar",c1,c1);
		click = true;
	});
});

["mousemove","touchmove"].forEach(function(evt){
	document.querySelector("#map-catcher").addEventListener(evt,function (e) {
		if('ontouchstart' in window){
			let bcr = e.target.getBoundingClientRect();
			e.offsetX = e.targetTouches[0].clientX - bcr.x;
			e.offsetY = e.targetTouches[0].clientY - bcr.y;
		}
		if(click){
			c2 = [e.offsetX,e.offsetY];
			updateLine("#drawing","gambar",c1,c2);
		}
	});
});

["mouseup","touchend"].forEach(function(evt){
	document.querySelector("#map-catcher").addEventListener(evt,function(){
		click = false;
		if(colLineCirc(line["#drawing"]["gambar"],points["#drawing"]["A"])&&
			colLineCirc(line["#drawing"]["gambar"],points["#drawing"]["B"])
		){
			drawFunction("#drawing",true,1000);
		}
		deleteLine("#drawing","gambar");
	});
});
