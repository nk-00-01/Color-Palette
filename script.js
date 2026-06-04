const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click",generatePalette);

// the copy is of 2 types
// --> 1) If we click the symbol of the copy button
// --> 2) If we click on the box of a particular color
paletteContainer.addEventListener("click",function(e){
    if(e.target.classList.contains("copy-btn")){
        // the reason for the previos element sibling is it contains the 'hexadecimal' code 
        const hexValue = e.target.previousElementSibling.textContent;
        // to paste that value to the clipboard
        navigator.clipboard.writeText(hexValue)
        .then(() =>showCopySucess(e.target))
        .catch((err)=>console.log(err))
    }
    // if user directly click on the box
    else if(e.target.classList.contains("color")){
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;
         navigator.clipboard.writeText(hexValue)
        .then(() =>showCopySucess(e.target.nextElementSibling.querySelector(".copy-btn")))
        .catch((err)=>console.log(err))

    }
});

function showCopySucess(element){
    element.classList.remove("far", "fa-copy");
    element.classList.add("fas","fa-check");
    element.style.color = "#48bb78";
    setTimeout(()=>{
        element.classList.remove("fas","fa-check");
        element.classList.add("fas","fa-check");
        element.style.color = "";
    },1500);
}

function generatePalette(){
    // array for the colors 
    const colors = []
    for(let i=0;i<5;i++){
        colors.push(generateRandomColor());
    }
    updatePaletteDisplay(colors);
}

// to get colors hexadecimal code of them 
function generateRandomColor(){
    const letters = "0123456789ABCDEF";
    let color = "#";
    for(let i=0;i<6;i++){
        color+=letters[Math.floor(Math.random() * 16)]
    }
    return color;
}
 
function updatePaletteDisplay(colors)
{
    const colorBoxes = document.querySelectorAll(".color-box");
    colorBoxes.forEach((box,index)=>{
        const color = colors[index];
       const colorDiv = box.querySelector(".color");
    const hexValue = box.querySelector(".hex-value");
    colorDiv.style.backgroundColor = color;
    hexValue.textContent = color;
    });
   
}