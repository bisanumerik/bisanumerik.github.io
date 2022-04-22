var slides = [];


slides["#drawing"] = [];
slides["#drawing"][0] = function(){
	drawCapt["#drawing"].innerHTML = "berikut adalah grafik fungsi \\(e^x - 5\\)";
	renderMathInElement(drawCapt["#drawing"]);
	updateXbound("#drawing",[-1,6]);
	drawXLine("#drawing",1,0);
	drawYLine("#drawing",1,0);
	drawFunction("#drawing",true,1000);
}
slides["#drawing"][1]= function(){
	drawText("#drawing","a",-0.15,0);
	drawText("#drawing","b",5.05,0);
	drawChoises("#drawing", 0, 5, 0.3);
	drawCapt["#drawing"].innerHTML = "Kemudian diambil selang sepanjang \\([a,b]\\)";
	renderMathInElement(drawCapt["#drawing"]);
}
slides["#drawing"][2]= function(){
	drawText("#drawing","c",2.5,0);
	drawCapt["#drawing"].innerHTML = "Ambil \\(c\\) di tengah \\([a,b]\\)";
	renderMathInElement(drawCapt["#drawing"]);
}
slides["#drawing"][3]= function(){
	drawCapt["#drawing"].innerHTML = "Lalu komputer akan menentukan bagian mana yang terdapat akar persamaannya";
	draw["#drawing"].clear();
	drawXLine("#drawing",1,0);
	drawYLine("#drawing",1,0);
	drawFunction("#drawing");
	drawText("#drawing","a",-0.15,0);
	drawText("#drawing","b",2.55,0);
	drawText("#drawing","c",1.25,0);
	drawChoises("#drawing", 0, 2.5, 0.3);
}
slides["#drawing"][4]= function(){
	draw["#drawing"].clear();
	drawXLine("#drawing",1,0);
	drawYLine("#drawing",1,0);
	drawFunction("#drawing");
	drawText("#drawing","a",1.1,0);
	drawText("#drawing","b",2.55,0);
	drawText("#drawing","c",1.825,0);
	drawChoises("#drawing", 1.25, 2.5, 0.3);
}
slides["#drawing"][5]= function(){
	drawCapt["#drawing"].innerHTML = "Dan seterusnya sehingga mendapatkan nilai yang sesuai";
	draw["#drawing"].clear();
	drawXLine("#drawing",1,0);
	drawYLine("#drawing",1,0);
	drawFunction("#drawing");
	drawText("#drawing","a",1.1,0);
	drawText("#drawing","b",1.875,0);
	drawText("#drawing","c",1.5375,0);
	drawChoises("#drawing", 1.25, 1.825, 0.3);
}
slides["#drawing"][6]= function(){
	draw["#drawing"].clear();
	updateXbound("#drawing",[0,5]);
	drawXLine("#drawing",1,0);
	drawYLine("#drawing",1,0);
	drawFunction("#drawing");
	drawChoises("#drawing", 0, 4, 0.3);
	let loc = [0,1,1,1,0];
	for(let i = 1; i<4; i++){
		rectChoise["#drawing"][0].animate(10,300).size(rectChoise["#drawing"][0].width()/(2**i),0).translate(rectChoise["#drawing"][0].width()/2*loc[i-1],0);
		rectChoise["#drawing"][1].animate(10,300).size(rectChoise["#drawing"][0].width()/(2**i),0).translate((rectChoise["#drawing"][1].width()/2)*((loc[i-1])?0.5:-1),0);
		console.log(loc[i-1]);
		//rectChoise["#drawing"][0].translate(rectChoise["#drawing"][0].width()*loc[i-1],0);
		//rectChoise["#drawing"][1].translate(-rectChoise["#drawing"][1].width()*((loc[i-1]+1)%2),0);
		rectChoise["#drawing"][0].animate(300,310).size(rectChoise["#drawing"][0].width()/(2**i),height["#drawing"]);
		rectChoise["#drawing"][1].animate(300,310).size(rectChoise["#drawing"][1].width()/(2**i),height["#drawing"]);

	}

}

//

function initBody(){
	init_draw("#drawing","e^x - 5",[-1,6],[-5,5], "#drawing-caption");
	slides["#drawing"][0]();
}
