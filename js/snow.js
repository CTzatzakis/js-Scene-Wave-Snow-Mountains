/*
*
*
*
*
*
*
*
*
* Start of Configuration
*/
// Amount of Snowflakes
var snowMax = 185;
// Snowflake Colours
var snowColor = ["#DDD", "#EEE"];
// Snow Entity //• 	&bull; 	&#8226; 	&#x2022; 	bullet = black small circle
var snowEntity = "&#x2022;";
// Falling Velocity
var snowSpeed = 0.5;
// Minimum Flake Size
var snowMinSize = 8;
// Maximum Flake Size
var snowMaxSize = 24;
// Refresh Rate (in milliseconds)
var snowRefresh = 50;
// Additional Styles
var snowStyles = "	cursor: default; \
-webkit-user-select: none; \
-moz-user-select: none; \
-ms-user-select: none; \
-o-user-select: none; \
user-select: none;";

/*
* End of Configuration
*/
//Variables
var snow = []; //Snowflake table
var position = []; //
var Coordinates = [];
var Lrand = [];
var marginBottom;
var marginRight;
var counterforSnowDrop = 0;
var counterForMountainsSnow = 0;
var numOfMountains = 6;

function randomise(range) {
	rand = Math.floor(range * Math.random());
	return rand;
};

function loadSnow() {
	var snowSize = snowMaxSize - snowMinSize;
	marginBottom = document.getElementById("snow-js").scrollHeight - 5;
	marginRight = document.getElementById("snow-js").clientWidth - 5;

	for (i = 0; i <= snowMax; i++) {
		Coordinates[i] = 0;
		Lrand[i] = Math.random() * 15;
		position[i] = 0.03 + Math.random() / 10;
		snow[i] = document.getElementById("flake" + i);
		snow[i].style.fontFamily = "inherit";
		snow[i].size = randomise(snowSize) + snowMinSize;
		snow[i].style.fontSize = snow[i].size + "px";
		snow[i].style.color = snowColor[randomise(snowColor.length)];
		snow[i].style.zIndex = 1000;
		snow[i].sink = snowSpeed * snow[i].size / 5;
		snow[i].posX = randomise(marginRight - snow[i].size);
		snow[i].posY = randomise(2 * marginBottom - marginBottom - 2 * snow[i].size);
		snow[i].style.left = document.getElementById("snow-js").getBoundingClientRect().left + snow[i].posX + "px";
		snow[i].style.top = document.getElementById("snow-js").getBoundingClientRect().top + snow[i].posY + "px";
	}

	moveSnow();
};

function resize() {
	marginBottom = document.getElementById("snow-js").scrollHeight - 5;
	marginRight = document.getElementById("snow-js").clientWidth - 15;
	document.getElementById("snow-js").addEventListener("load", loadSnow());
};

function moveSnow() {

	for (i = 0; i <= snowMax; i++) {
		Coordinates[i] += position[i];
		snow[i].posY += snow[i].sink;
		if (snow[i].posX < document.getElementById("snow-js").getBoundingClientRect().left)
		{
			snow[i].posX = document.getElementById("snow-js").getBoundingClientRect().left/2;
		}
		snow[i].style.left = document.getElementById("snow-js").getBoundingClientRect().left + snow[i].posX + Lrand[i] * Math.sin(Coordinates[i]) + "px";
		snow[i].style.top = document.getElementById("snow-js").getBoundingClientRect().top + snow[i].posY + "px";

		if (snow[i].posY >= marginBottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginRight + 5 * Lrand[i])) {
			snow[i].posX = randomise(marginRight - snow[i].size);
			snow[i].posY = 0;
		}
		//=====================================  Snow Effect on mountain elements of scene  ===================================== 
		if(snow[i].posY >= document.getElementById("snow-js").getBoundingClientRect().bottom-100){
			counterforSnowDrop++
			if(counterforSnowDrop%50==0)
			{
				counterForMountainsSnow++;
				if(counterForMountainsSnow < snowMax/3)
				{
					document.getElementById("mountain-1").style.background="linear-gradient(to bottom, white "+(((counterForMountainsSnow)/(snowMax))*100)+"%, #088A85 "+((((counterForMountainsSnow)/(snowMax))*100)+10)+"% "+((((snowMax-counterForMountainsSnow)/(snowMax))*100)-10)+"%)";
					document.getElementById("mountain-2").style.background="linear-gradient(to bottom, white "+(((counterForMountainsSnow)/(snowMax))*100)+"%, #0B0B61 "+((((counterForMountainsSnow)/(snowMax))*100)+10)+"% "+((((snowMax-counterForMountainsSnow)/(snowMax))*100)-10)+"%)";
					document.getElementById("mountain-3").style.background="linear-gradient(to bottom, white "+(((counterForMountainsSnow)/(snowMax))*100)+"%, #086A87 "+((((counterForMountainsSnow)/(snowMax))*100)+10)+"% "+((((snowMax-counterForMountainsSnow)/(snowMax))*100)-10)+"%)";
					document.getElementById("mountain-4").style.background="linear-gradient(to bottom, white "+(((counterForMountainsSnow)/(snowMax))*100)+"%, #848484 "+((((counterForMountainsSnow)/(snowMax))*100)+10)+"% "+((((snowMax-counterForMountainsSnow)/(snowMax))*100)-10)+"%)";
					document.getElementById("mountain-5").style.background="linear-gradient(to bottom, white "+(((counterForMountainsSnow)/(snowMax))*100)+"%, #08298A "+((((counterForMountainsSnow)/(snowMax))*100)+10)+"% "+((((snowMax-counterForMountainsSnow)/(snowMax))*100)-10)+"%)";
					document.getElementById("mountain-6").style.background="linear-gradient(to bottom, white "+(((counterForMountainsSnow)/(snowMax))*100)+"%, #0B4C5F "+((((counterForMountainsSnow)/(snowMax))*100)+10)+"% "+((((snowMax-counterForMountainsSnow)/(snowMax))*100)-10)+"%)";
				}
			}
		}
	}

	setTimeout("moveSnow()", snowRefresh);
};

for (i = 0; i <= snowMax; i++) {
	document.write("<span id='flake" + i + "' style='" + snowStyles + "position:absolute;top:-" + snowMaxSize + "'>" + snowEntity + "</span>");
};

document.getElementById("snow-js").addEventListener("resize", resize());
document.getElementById("snow-js").addEventListener("load", loadSnow());