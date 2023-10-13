let check = document.querySelector(".check");
let create = document.querySelector(".create");
let pp = document.getElementsByTagName("p");
let container2 = document.getElementsByClassName("container2")[0];
let container3 = document.getElementsByClassName("container3")[0];
let container4 = document.getElementsByClassName("container4")[0];
drag = document.getElementsByClassName("drag")[0];
let body = document.querySelector("body");
let img1 = document.querySelector(".img1");
let all = document.querySelector(".all");
let active = document.querySelector(".active");
let complete = document.querySelector(".complete");
let left = document.querySelector(".items");
let clear = document.querySelector(".clear");
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
        container2.style.backgroundColor = "hsl(236, 33%, 92%)";
        container3.style.backgroundColor = "hsl(236, 33%, 92%)";
        container4.style.backgroundColor = "hsl(236, 33%, 92%)";
        check.style.border = "2px solid black";
        create.style.color = "black";
        body.classList.add("light");
        container3.color="hsl(235, 19%, 35%)"

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
        body.classList.remove("light");
        
    }

}


//storging into local storage

let createinput = document.querySelector(".create");
createinput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        const value = createinput.value;
        if (value !== "") {
            let unid = Math.floor(Math.random()*1000);
            // let localstorageData =
            // localStorage.getItem("all") &&
            // Object.keys(JSON.parse(localStorage.getItem("all")));
            // const exitdata =
            //     localstorageData.length > 0
            //         ? JSON.parse(localStorage.getItem("all"))
            //         : [];
            let exitdata = JSON.parse(localStorage.getItem("all")) || [];
            exitdata.push({"id":unid,"task":value,"iscomplete":false});
            localStorage.setItem("all", JSON.stringify(exitdata));
            createinput.value = "";
  
            //storaging data into container3
            
            let newdiv = document.createElement("div");
            newdiv.classList.add("data")

            let paraadd = document.createElement("p");
            paraadd.classList.add("para")
            paraadd.textContent = value;
            paraadd.style.color = "hsl(233, 14%, 35%)";

            let img1add = document.createElement("img");
            img1add.classList.add("img1")
            img1add.style.border = "2px solid hsl(233, 11%, 84%)";
            img1add.src = "images/icon-check.svg";
            img1add.addEventListener("click", function () {
                img1add.classList.toggle("image");
                paraadd.classList.toggle("strike");
                
            });
            
                
            let img2add = document.createElement("img");
            img2add.classList.add("img2")
            img2add.src = "images/icon-cross.svg";
            img2add.addEventListener("click", function () {
            exitdata.splice(exitdata.findIndex(item => item.task === value), 1);
            localStorage.setItem("all", JSON.stringify(exitdata));
            newdiv.remove();
               
            });


            newdiv.appendChild(img1add);
            newdiv.appendChild(paraadd);
            newdiv.appendChild(img2add);
            container3.appendChild(newdiv);
            getlens(exitdata)
            
        }
    }
});


//render data from local storage

const loaddata = JSON.parse(localStorage.getItem("all")) || []

renderoncontainer(loaddata);




function renderoncontainer(data) {
    
    const container3 = document.querySelector(".container3");
    container3.innerHTML = "";

    data.forEach(element => {
        let newdiv = document.createElement("div");
        newdiv.classList.add("data");
        newdiv.draggable = true;

        let img1ren = document.createElement("img");
        img1ren.classList.add("img1");
        img1ren.style.border = "2px solid hsl(233, 11%, 84%)";

        let pararen = document.createElement("p");
        pararen.classList.add("para")
        pararen.textContent = element.task;
        
        var newnum = true
        img1ren.src = "images/icon-check.svg";
        img1ren.addEventListener("click", function () {
            img1ren.classList.toggle("image");
            pararen.classList.toggle("strike");
            element.iscomplete = !element.iscomplete;
            localStorage.setItem("all", JSON.stringify(data));
            
        });
        if (element.iscomplete) {
            img1ren.classList.toggle("image");
            pararen.classList.toggle("strike");
        }
        
        let img2ren = document.createElement("img");
        img2ren.classList.add("img2")
        img2ren.src = "images/icon-cross.svg";
        img2ren.addEventListener("click", function (event) {
           
            let x = element.id;
            let y = data.filter(element => element.id != x);
            localStorage.setItem("all", JSON.stringify(y));
            renderoncontainer(y);
        });
        

        newdiv.appendChild(img1ren);
        newdiv.appendChild(pararen);
        newdiv.appendChild(img2ren);
        
        container3.appendChild(newdiv);
        
        getlens(data);

    });
}

active.addEventListener("click", function () {
    let alltask = JSON.parse(localStorage.getItem("all")) || []
    const activetask = alltask.filter(task => !task.iscomplete);
    renderoncontainer(activetask);
    
});
complete.addEventListener("click", function () {
    let allcomplete = JSON.parse(localStorage.getItem("all")) || []
    const completed = allcomplete.filter(complete => complete.iscomplete);
    renderoncontainer(completed);
  
});
all.addEventListener("click", function () {
    let allones = JSON.parse(localStorage.getItem("all")) || []
    renderoncontainer(allones);
    
});
clear.addEventListener("click", function () {
    localStorage.clear();
    container3.innerHTML = "";  
    left.textContent = "0";
})

function getlens(data) {
    var count=0
    data.forEach(element => count += 1);
    left.textContent = count;
}

