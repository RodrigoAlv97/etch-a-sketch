const grid = document.querySelector("#grid");
const toolContainer = document.querySelector("#toolContainer");
const btnTool = toolContainer.getElementsByClassName("tool");
const pencil = document.querySelector(".pencil");
const eraser = document.querySelector(".eraser");
const rainbow = document.querySelector(".rainbow");
const clear = document.querySelector(".clear");
const colorPicker = document.querySelector("#colorPicker");
const scaleRange = document.querySelector("#scaleRange");

let scale = 16;
let color = "#000";
let activeTool = "pencil";

function frame(scale) {
    grid.style.gridTemplateColumns = `repeat(${scale}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${scale}, 1fr)`;

    for (let i = 0; i < scale * scale; i++) {
        const gridItem = document.createElement("div");
        gridItem.addEventListener("mouseover", draw);
        grid.appendChild(gridItem);
        gridItem.classList.add("divs");
    }
}

colorPicker.onchange = (e) => pickColor(e.target.value);

function pickColor(newColor) {
    color = newColor;
}

function draw(e) {
    switch (activeTool) {
        case "pencil":
            e.target.style.backgroundColor = color;
            break;

        case "eraser":
            e.target.style.backgroundColor = "#fff";
            break;

        case "rainbow":
            const randomRed = Math.floor(Math.random() * 256);
            const randomGreen = Math.floor(Math.random() * 256);
            const randomBlue = Math.floor(Math.random() * 256);
            e.target.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
            break;
    }
}

clear.addEventListener("click", () => {
    setScale(scale);
});

pencil.addEventListener("click", () => {
    activeTool = "pencil";
});

eraser.addEventListener("click", () => {
    activeTool = "eraser";
});

rainbow.addEventListener("click", () => {
    activeTool = "rainbow";
});

for (let i = 0; i < btnTool.length; i++) {
    btnTool[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }
        this.className += " active";
    });
}

scaleRange.onchange = (e) => pickScale(e.target.value);

function pickScale(newScale) {
    scale = newScale;
    setScale(scale);
}

function setScale(scale) {
    grid.innerHTML = "";
    frame(scale);
}

window.onload = () => {
    setScale(scale);
};
