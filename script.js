let check = document.querySelector(".check");
let create = document.querySelector(".create");
let pp = document.getElementsByTagName("p");
let container2 = document.getElementsByClassName("container2")[0];
let container3 = document.getElementsByClassName("container3")[0];
let container4 = document.getElementsByClassName("container4")[0];
drag = document.getElementsByClassName("drag")[0];
let body = document.querySelector("body");
let img1 = document.querySelector(".img1");

//toggleing check
check.addEventListener("click", function () {
    check.classList.toggle("box");
})
//toggle to sun to moon
var number = 1;
function toggle() {
    var sun = document.getElementsByClassName("sun")[0];
    if (number == 1) {
        sun.src = "images/icon-moon.svg";
        number = 2;
        for (var i = 0; i < pp.length; i++){
            pp[i].style.color = "hsl(233, 14%, 35%)";
        }
        container2.style.backgroundColor = "white";
        container3.style.backgroundColor = "white";
        container4.style.backgroundColor = "white";
        check.style.border = "2px solid black";
        clickedimg.style.border = "2px solid black";
        create.style.color = "black";
        body.style.backgroundColor = "white";
        body.style.backgroundImage = "url(images/bg-desktop-light.jpg)";


    } else {
        sun.src = "images/icon-sun.svg";
        number = 1;
        for (var i = 0; i < pp.length; i++){
            pp[i].style.color = "white";
        }
        container2.style.backgroundColor = " hsl(237, 14%, 26%)";
        container3.style.backgroundColor = " hsl(237, 14%, 26%)";
        container4.style.backgroundColor = " hsl(237, 14%, 26%)";
        check.style.border = "2px solid white"; 
        body.style.backgroundImage = "url(images/bg-desktop-dark.jpg)";
        body.style.backgroundColor = "";
    }

}

//storging into local storage

let createinput = document.querySelector(".create");
createinput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        const value = createinput.value;
        if (value !== "") {
            let unid = Math.floor(Math.random()*1000);
            const exitdata = JSON.parse(localStorage.getItem("all")) || [];
            exitdata.push({"id":unid,"task":value,"iscomplete":false});
            localStorage.setItem("all", JSON.stringify(exitdata));
            createinput.value = "";
  
            //storaging data into container3
            
            let newdiv = document.createElement("div");
            newdiv.classList.add("data")

            let paraadd = document.createElement("p");
            paraadd.classList.add("para")
            paraadd.textContent = value;

            let img1add = document.createElement("img");
            img1add.classList.add("img1")
            img1add.src = "images/icon-check.svg";
            img1add.addEventListener("click", function () {
                img1add.classList.toggle("image");
                paraadd.classList.toggle("strike");
                
            });
            
                
            let img2add = document.createElement("img");
            img2add.classList.add("img2")
            img2add.src = "images/icon-cross.svg";

            newdiv.appendChild(img1add);
            newdiv.appendChild(paraadd);
            newdiv.appendChild(img2add);

            container3.appendChild(newdiv);
        }
    }
});


window.addEventListener("load", function () {
    const loaddata = JSON.parse(this.localStorage.getItem("all")) || []
    renderoncontainer(loaddata);
});

function renderoncontainer(data) {
    const container3 = document.querySelector(".container3");
    container3.innerHTML = "";

    data.forEach(element => {
        let newdiv = document.createElement("div");
        newdiv.classList.add("data");

        let img1ren = document.createElement("img");
        img1ren.classList.add("img1");

        let pararen = document.createElement("p");
        pararen.classList.add("para")
        pararen.textContent = element.task;

        var newnum=true
        img1ren.src = "images/icon-check.svg";
        img1ren.addEventListener("click", function () {
            img1ren.classList.toggle("image"); 
            pararen.classList.toggle("strike");
            element.iscomplete = !element.iscomplete;
            localStorage.setItem("all", JSON.stringify(data));
            
        });
        
        
        let img2ren = document.createElement("img");
        img2ren.classList.add("img2")
        img2ren.src = "images/icon-cross.svg";

        

        newdiv.appendChild(img1ren);
        newdiv.appendChild(pararen);
        newdiv.appendChild(img2ren);
        
        container3.appendChild(newdiv);
    });
}
