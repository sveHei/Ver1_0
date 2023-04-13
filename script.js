let beats = 4; // number of beats shown on the canvas
let unit = 300;
let offset = 1/10; //shifts each impulse to the right by an amount of the beat (unit)
let radius = (unit/100)+0.5;
let activePulses = [];

const canvas = document.querySelector("#myCanvas");
const context= canvas.getContext("2d");

function drawPulse(numerator, denominator) {
    let pulse = [];
    let j = 0;

    while(j < beats) {
        pulse.push(j);
        j = j + (numerator/denominator);
    }

    for(k = 0; k < pulse.length; k++){
        //a filled circle on Canvas:
        switch (denominator){
            case 1:
                context.fillStyle = "black";
                break;
            case 2:                                 //is it possible to combine cases 2,4,8?
                context.fillStyle = "blue";
                break;
            case 4:
                context.fillStyle = "blue";
                break; 
            case 8:
                context.fillStyle = "blue";
                break;               
            case 3:                                 //is it possible to combine cases 3,6,9?
                context.fillStyle = "orange";
                break;
            case 6:
                context.fillStyle = "orange";
                break;  
            case 9:
                context.fillStyle = "orange";
                break;   
            case 5:
                context.fillStyle = "red";
                break;
            case 7:
                context.fillStyle = "green";
                break;    
        }        
        context.beginPath();
        context.arc( ((pulse[k] + offset) * unit), (canvas.height - (numerator/denominator * unit)), radius, 0, 2*Math.PI, true);  // arc(x, y, radius, startAngle, endAngle, counterclockwise)
        context.fill();
    };
}    

function activatePulse(numerator,denominator){
   
    drawPulse(numerator, denominator);

    //add pulse to array "activePulses"
    if (!(activePulses.includes(`${numerator}${denominator}`))) {
        activePulses.push(`${numerator}${denominator}`);
    }
    console.log(activePulses); // take out later.
};

function deactivatePulse(numerator, denominator){
    
     //remove pulse from array "activePulses"
     let removePulse = activePulses.indexOf(`${numerator}${denominator}`);
     activePulses.splice(removePulse,1);
     console.log(activePulses); // take out later.

    redrawCanvas();
   
};

//activate or deactive clicked pulse
function pulseClicked(numerator, denominator){
    let state = document.getElementById(`${numerator}/${denominator}`).checked;

    if (state) {
        activatePulse(numerator, denominator);
    } else {
        deactivatePulse(numerator, denominator);
    };
};

//redraws the canvas
function redrawCanvas() {
    beats = document.querySelector("#input_beats").value
    context.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < activePulses.length; i++){
        let recentPulse = activePulses[i];
        let numera = parseInt(recentPulse[0]);
        let denom = parseInt(recentPulse[1]);
        drawPulse(numera, denom);
    }
};

//clears the canvas, all checkboxes and the array "activePulses"
function clearAll() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const checkboxes = document.querySelectorAll('input[name="pulse"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
    activePulses = [];
}

//draws the pulse "1" at page loading
document.addEventListener('DOMContentLoaded',() => {
    activatePulse(1,1)
});

//zoom in and out
let zoomSlider = document.getElementById("zoomSlider");
zoomSlider.oninput = function() {
    let zoomRatio = this.value;
    unit = 6 * zoomRatio;
    redrawCanvas();
}