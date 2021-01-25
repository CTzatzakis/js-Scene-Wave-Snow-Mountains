(function(){
	"use strict";
	
	var cnvs,ctx;
	var nodes = 8;
	var waves = [];
	var waveHeight = 400;
	var colours = ["#F27807","#7A3C09","#E49956"]
	
	function init() {
		cnvs = document.getElementById("canvas");
		ctx = cnvs.getContext("2d");
		resizeCanvas(cnvs);
		
		for (var i = 0; i < 5; i++) {
			var temp = new wave(colours[i],1,nodes);
		}

		setInterval(update,16);
		
	}

	function randomColour() {
		var h = Math.round(Math.random()*360);
		return "hsl("+h+",100%,50%)";
	}

	function update(array) {
		ctx.clearRect(0, 0, cnvs.width, cnvs.height);
    var fill = window.getComputedStyle(document.querySelector(".header"),null).getPropertyValue("background-color");
		ctx.fillStyle = fill;
		ctx.globalCompositeOperation = "source-over";
		ctx.fillRect(0,0,cnvs.width,cnvs.height);
		ctx.globalCompositeOperation = "screen";
		for (var i = 0; i < waves.length; i++) {
			for (var j = 0; j < waves[i].nodes.length; j++) {
				bounce(waves[i].nodes[j]);
			}
			drawWave(waves[i]);
		}
		ctx.globalCompositeOperation = "hue";
		ctx.fillStyle = fill;
		ctx.fillRect(0,0,cnvs.width,cnvs.height);
	}

	function wave(colour,lambda,nodes) {
		// main body...
		this.colour = colour;
		this.lambda = lambda;
		this.nodes = [];
		for (var i = 0; i <= nodes+2; i++) {
			var temp = [(i-1)*cnvs.width/nodes,0,Math.random()*200,.3];
			this.nodes.push(temp);
			console.log(temp);
		}
		console.log(this.nodes);
		waves.push(this);
	}

	function bounce(node) {
		node[1] = waveHeight/2*Math.sin(node[2]/20)+cnvs.height/2;
		node[2] = node[2] + node[3];
		
	}
	
	function drawWave (obj) {
		var diff = function(a,b) {
			return (b - a)/2 + a;
		}
		ctx.fillStyle = obj.colour;
		ctx.beginPath();
		ctx.moveTo(0,cnvs.height);
		ctx.lineTo(obj.nodes[0][0],obj.nodes[0][1]);
		for (var i = 0; i < obj.nodes.length; i++) {
			if (obj.nodes[i+1]) {
				ctx.quadraticCurveTo(
					obj.nodes[i][0],obj.nodes[i][1],
					diff(obj.nodes[i][0],obj.nodes[i+1][0]),diff(obj.nodes[i][1],obj.nodes[i+1][1])
				);
			}else{
				ctx.lineTo(obj.nodes[i][0],obj.nodes[i][1]);
				ctx.lineTo(cnvs.width,cnvs.height);
			}
			
		}
		ctx.closePath();
		ctx.fill();
	}

	function resizeCanvas(canvas,width,height) {
		if (width && height) {
			canvas.width = width;
			canvas.height = height;
		} else {
			if (window.innerHeight > 1920) {
				canvas.width = window.innerWidth;
			}
			else {
				canvas.width = 1920;
			}
			
			canvas.height = waveHeight;
		}
		
	}
	
	document.addEventListener("DOMContentLoaded",init,false);
})();