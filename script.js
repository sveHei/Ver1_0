let beats = 4; // number of beats shown on the canvas
let unit = 300;
let offset = 1/10; //shifts each impulse to the right by an amount of the beat (unit)
let activePulses = [];
let activeGrids = [];

const checkboxes = document.querySelectorAll('input[type="checkbox"]'); //select all checkboxes
const table = document.getElementById("table"); //select the table
const tablinks = document.getElementsByClassName("tablinks"); //select all tabs

//set up canvas
const canvas = document.querySelector("#myCanvas");
const context= canvas.getContext("2d");

function activatePulseTable() {
    table.classList.remove("grid");
    table.classList.add("pulse");

    //uncheck all checkboxes
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }

    // check all checkboxes that are activePulses
    for (let i = 0; i < activePulses.length; i++) {
        document.getElementById(activePulses[i]).checked = true;
    }
};

function activateGridTable() {
    table.classList.remove("pulse");
    table.classList.add("grid");

    //uncheck all checkboxes
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }

    // check all checkboxes that are activeGrids
    for (let i = 0; i < activeGrids.length; i++) {
        document.getElementById(activeGrids[i]).checked = true;
    }
};

function activateTab(tab) {
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    tab.classList.add("active");
}

//add event listeners to all tabs
for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].addEventListener('click', function() {
        activateTab(this);
        if (this.id == "pulseTab") {
            activatePulseTable();
        } else {
            activateGridTable();
        }
    });
}

//add event listeners to all checkboxes
for(let i = 0; i < checkboxes.length; i++){
    checkboxes[i].addEventListener('click', function(event) {
        if (table.classList.contains("pulse")) {
            pulseClicked(this.id[0], this.id[2]);
        } else {
            gridClicked(this.id[0], this.id[2]); //how can I change this code so that both numerator and denominator can have more than one digit?
        }
    });
}

function activateGrid(numerator, denominator) {    
    //add grid to array "activeGrids"
    if (!(activeGrids.includes(`${numerator}/${denominator}`))) {
        activeGrids.push(`${numerator}/${denominator}`);
    }
    redrawCanvas();
    console.log("Active grids: " + activeGrids); // take out later.
}

function deactivateGrid(numerator, denominator){
    //remove grid from array "activeGrids"
    let removeGrid = activeGrids.indexOf(`${numerator}/${denominator}`);
    activeGrids.splice(removeGrid,1);
    redrawCanvas();

    console.log("Active pulses: " + activePulses); // take out later.
};

function drawGrid(numerator, denominator) {
    let grid = [];
    let j = 0;

    while(j < beats) {
        grid.push(j);
        j = j + (numerator/denominator);
    }

    for(k = 0; k < grid.length; k++){
        switch (denominator){
            case 1:
                context.strokeStyle = "black";
                break;
            case 2:                                 //is it possible to combine cases 2,4,8?
                context.strokeStyle = "blue";
                break;
            case 4:
                context.strokeStyle = "blue";
                break; 
            case 8:
                context.strokeStyle = "blue";
                break;               
            case 3:                                 //is it possible to combine cases 3,6,9?
                context.strokeStyle = "orange";
                break;
            case 6:
                context.strokeStyle = "green";
                break;  
            case 9:
                context.strokeStyle = "orange";
                break;   
            case 5:
                context.strokeStyle = "red";
                break;
            case 7:
                context.strokeStyle = "purple";
                break;    
        }
        context.beginPath();
        if (denominator == 1){
            context.lineWidth = 2;
        } else {
            context.lineWidth = 1;
        }      
        context.moveTo(((grid[k] + offset) * unit), (canvas.height - (numerator/denominator * unit)));
        context.lineTo(((grid[k] + offset) * unit), canvas.height);
        context.stroke(); 
    }
}

//activate or deactive clicked grid
function gridClicked(numerator, denominator){
    let state = document.getElementById(`${numerator}/${denominator}`).checked;

    if (state) {
        activateGrid(numerator, denominator);
    } else {
        deactivateGrid(numerator, denominator);
    };
};

function drawPulse(numerator, denominator) {
    let radius;
    if (numerator == 1 & denominator == 1){
        radius = (unit/100)+3;
    } else {
        radius = (unit/100)+1.5;
    }
    
    let pulse = [];
    let j = 0;

    let pointsAmount = (denominator / numerator) * beats;

    while(j < pointsAmount) {
        pulse.push((numerator/denominator) * j);
        j++;
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
                context.fillStyle = "green";
                break;  
            case 9:
                context.fillStyle = "orange";
                break;   
            case 5:
                context.fillStyle = "red";
                break;
            case 7:
                context.fillStyle = "purple";
                break;    
        }        
        context.beginPath();
        context.arc( ((pulse[k] + offset) * unit), (canvas.height - (numerator/denominator * unit)), radius, 0, 2*Math.PI, true);  // arc(x, y, radius, startAngle, endAngle, counterclockwise)
        context.fill();
    };
}    

function activatePulse(numerator,denominator){
    //add pulse to array "activePulses"
    if (!(activePulses.includes(`${numerator}/${denominator}`))) {
        activePulses.push(`${numerator}/${denominator}`);
    }
    redrawCanvas();

    console.log("Active pulses: " + activePulses); // take out later.
};

function deactivatePulse(numerator, denominator){
     //remove pulse from array "activePulses"
     let removePulse = activePulses.indexOf(`${numerator}/${denominator}`);
     activePulses.splice(removePulse,1);
     redrawCanvas();

     console.log("Active pulses: " + activePulses); // take out later.
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

function redrawCanvas() {
    beats = document.querySelector("#input_beats").value
    context.clearRect(0, 0, canvas.width, canvas.height);

    //draw pulses
    for(let i = 0; i < activePulses.length; i++){
       const recentPulse = activePulses[i];
       const numeratorDenominator = recentPulse.split("/");
        let num1 = parseInt(numeratorDenominator[0]);   //numerator of pulse
        let num2 = parseInt(numeratorDenominator[1]);   //denominator of pulse
        drawPulse(num1, num2);     
    }

    //draw grids
    for(let i = 0; i < activeGrids.length; i++){
        const recentGrid = activeGrids[i];
        const numeratorDenominator = recentGrid.split("/");
        let num1 = parseInt(numeratorDenominator[0]);   //numerator of grid
        let num2 = parseInt(numeratorDenominator[1]);   //denominator of grid
            drawGrid(num1, num2);
    }
};

//clear the canvas, all checkboxes and the arrays "activePulses" and "activeGrids"
const clearAllButton = document.getElementById("clearAllButton");
clearAllButton.addEventListener('click', clearAll);

function clearAll() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
    activePulses = [];
    activeGrids = [];
}

//draw the pulse "1" and the grid "1" at page loading
document.addEventListener('DOMContentLoaded',() => {
    activatePulse(1,1)
    activateGrid(1,1);
});

//zoom in and out
let zoomSlider = document.getElementById("zoomSlider");
zoomSlider.addEventListener('input', function() {
    let zoomRatio = this.value;
    unit = 6 * zoomRatio;
    redrawCanvas();
})

//redraw Canvas whenever the number of beats is changed
const inputBeats = document.getElementById("input_beats");
inputBeats.addEventListener('input', redrawCanvas);