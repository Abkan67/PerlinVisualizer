const randonNoiseCanvas = document.getElementById("randomNoise");
const c1 = randonNoiseCanvas.getContext("2d");
const octaveDisplayCanvas = document.getElementById("octaveDisplay");
const c2 = octaveDisplayCanvas.getContext("2d");
const amplitudeDisplayCanvas = document.getElementById("amplitudeDisplay");
const c3 = amplitudeDisplayCanvas.getContext("2d");
const finalDisplayCanvas = document.getElementById("finalDisplay");
const c4 = finalDisplayCanvas.getContext("2d");
const octaveToDisplayForm = document.getElementById("octaveToDisplayForm");
const octaveToDisplayFormNumber = document.getElementById("octaveFormNumber");
const octavesToDisplayForm = document.getElementById("octavesForm");
const octavesToDisplayFormNumber = document.getElementById("octavesFormNumber");
const pointsToDisplayForm = document.getElementById("pointsForm");
const pointsToDisplayFormNumber = document.getElementById("pointsFormNumber");
const persistenceToDisplayForm = document.getElementById("persistenceForm");
const persistenceToDisplayFormNumber = document.getElementById("persistenceFormNumber");


var lacunarity = 0.5;
var numOctaves = 5;
var persistence = 0.5;
var numPoints = 16;

function setup() {
  setupRandomPoints();
  setupOctaveDisplay();
  setupAmplitudeDisplay();
  setupFinalDisplay();
  animate();
}
function animate() {
  c1.clearRect(0,0,300,300);
  c2.clearRect(0,0,300,300);
  c3.clearRect(0,0,300,300);
  c4.clearRect(0,0,300,300);
  animateRandomNoise();
  drawOctaveDisplay();
  drawAmplitudeDisplay();
  drawFinalDisplay();
  requestAnimationFrame(animate);
}

var randomPoints = [];
function setupRandomPoints() {
  randomPoints = [];
  for(var i =0; i<numPoints; i++){
    randomPoints.push(i);
    shuffle(randomPoints);
  }
}
function animateRandomNoise(){
  c1.fillStyle = "#000";
  for(var i = 0; i<numPoints; i++){
    if(i!=0){
      c1.beginPath();
      c1.moveTo((i-1)*300/numPoints, 300 - randomPoints[i-1]*300/numPoints);
      c1.lineTo((i)*300/numPoints, 300 - randomPoints[i]*300/numPoints);
      c1.stroke();
    }
    c1.beginPath();
    c1.arc((i)*300/numPoints, 300- randomPoints[i]*300/numPoints, 5, 0, Math.PI*2);
    c1.fill();
  }
}

var octaveLevelToDisplay = 0;
var octaveFillColors = ["#FF0", "#0FF", "#F0F", "#F00", "#00F", "#0F0"];
function setupOctaveDisplay() {
}
function drawAnOctave(octaveLevel){
  var interval = Math.pow(lacunarity,octaveLevel)*numPoints; 
  //TODO: check to make sure interval makes sense
  c2.fillStyle = octaveFillColors[octaveLevel];
  for(var i = 0; i<numPoints; i+=interval){
    if(i!=0){
      c2.beginPath();
      c2.moveTo((i-interval)*300/numPoints, 300-randomPoints[i-interval]*300/numPoints); //prevous dot
      c2.lineTo((i)*300/numPoints, 300-randomPoints[i]*300/numPoints); //current dot
      c2.stroke();
    }
    c2.beginPath();
    c2.arc((i)*300/numPoints, 300-randomPoints[i]*300/numPoints, 2*Math.sqrt(interval), 0, Math.PI*2);
    c2.fill();
  }
  var i = numPoints-interval;
  c2.beginPath();
  c2.moveTo( (i)*300/numPoints, 300 -randomPoints[i]*300/numPoints );
  c2.lineTo(300, 300 - randomPoints[0]*300/numPoints);
  c2.stroke();
}
function drawOctaveDisplay() {
  if(octaveLevelToDisplay>=numOctaves){
    for(var i=0; i<numOctaves; i++){drawAnOctave(i);}
  } else {
    drawAnOctave(octaveLevelToDisplay);
  }
}
function incrementOctaveToDisplay() {
  octaveLevelToDisplay++;
  if(octaveLevelToDisplay==numOctaves+1){octaveLevelToDisplay = 0;}
  octaveToDisplayFormNumber.innerHTML = octaveLevelToDisplay;
  if(octaveLevelToDisplay==numOctaves){octaveToDisplayFormNumber.innerHTML = "all";}
}
function decrementOctaveToDisplay() {
  octaveToDisplayFormNumber.innerHTML=--octaveLevelToDisplay;
  if(octaveLevelToDisplay<0){octaveLevelToDisplay=numOctaves; octaveToDisplayFormNumber.innerHTML = "all";}
}
function incrementpersistenceForm(){
  persistence+=0.05;
  persistenceToDisplayFormNumber.innerHTML = persistence;
}
function decrementpersistenceForm(){
  persistence-=0.05;
  persistenceToDisplayFormNumber.innerHTML = persistence;
}
function incrementoctavesForm(){
  octavesToDisplayFormNumber.innerHTML = ++numOctaves;
}
function decrementoctavesForm(){
  octavesToDisplayFormNumber.innerHTML = --numOctaves;
}
function incrementpointsForm(){
  numPoints*=2;
  pointsToDisplayFormNumber.innerHTML = numPoints;
}
function decrementpointsForm(){
  numPoints = Math.floor(numPoints/2);
  pointsToDisplayFormNumber.innerHTML = numPoints;
}


function setupAmplitudeDisplay(){}
function drawAmplitudeDisplay(){
  if(octaveLevelToDisplay >= numOctaves){
    for(var i = 0; i<numOctaves; i++){drawAnOctaveWithAmplitude(i);}
  } else {
    drawAnOctaveWithAmplitude(octaveLevelToDisplay);
  }
}
function drawAnOctaveWithAmplitude(octaveLevel) {
  var interval = Math.pow(lacunarity,octaveLevel)*numPoints;
  var coeff = Math.pow(persistence, octaveLevel); 
  //TODO: check to make sure interval makes sense
  c3.fillStyle = octaveFillColors[octaveLevel];
  for(var i = 0; i<numPoints; i+=interval){
    if(i!=0){
      c3.beginPath();
      c3.moveTo((i-interval)*300/numPoints, 300- coeff * (randomPoints[i-interval]*300/numPoints));
      c3.lineTo((i)*300/numPoints, 300- coeff*(randomPoints[i]*300/numPoints)); //current dot
      c3.stroke();
    }
    c3.beginPath();
    c3.arc((i)*300/numPoints, 300- coeff * (randomPoints[i]*300/numPoints), 2*Math.sqrt(interval), 0, Math.PI*2);
    c3.fill();
  }
  var i = numPoints-interval;
  c3.beginPath();
  c3.moveTo( (i)*300/numPoints, 300-coeff*(randomPoints[i]*300/numPoints ));
  c3.lineTo(300, 300-coeff*(randomPoints[0]*300/numPoints));
  c3.stroke();
}

function setupFinalDisplay(){}
function drawFinalDisplay(){
  c4.fillStyle = "#0000FF"
  for(var x = 0; x<=numPoints; x+=0.1){
    c4.beginPath();
    c4.arc(    x*300/numPoints,  300-noise(x)*300/numPoints   , 1, 0, Math.PI*2);
    c4.fill();
  }

}
function noise(xValue){
  var yValue = 0;
  var yMax = 0;
  for(var o=0; o<numOctaves; o++){
    yValue += lookupValueWithAmplitude(o, xValue);
    yMax +=Math.pow(persistence, o);
  }
  return yValue /yMax;
}
function lookupValueWithAmplitude(octaveLevel, xValue/*from 0 to 16 for the x-values, make divides when called*/){
  var interval = Math.pow(lacunarity,octaveLevel)*numPoints;
  var coeff = Math.pow(persistence, octaveLevel);
  var integralMin = (Math.floor(xValue/interval)*interval);
  var integralMax = (Math.ceil(xValue/interval)*interval);
  if(integralMax==integralMin){
    return coeff * randomPoints[integralMin%numPoints];
  } else {
    var yValue = getYValueOnLinearScale(xValue, integralMin, randomPoints[integralMin%16], integralMax, randomPoints[integralMax%16]);
    return coeff * yValue;
  }
  
}
function getPointOnRandomScale(xValue){
  var x = xValue%=numPoints;
  if(x%1==0){return randomPoints[x];} else {
    return getYValueOnLinearScale(x, Math.floor(x), randomPoints[Math.floor(x)], Math.ceil(x), randomPoints[Math.ceil(x)]);
  }
}
function getYValueOnLinearScale(x, minX,minY,maxX,maxY){
  var slope = (maxY-minY)/(maxX-minX);
  var yInt = -slope*minX+minY;
  return slope*x+yInt;
}
setup();


function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}