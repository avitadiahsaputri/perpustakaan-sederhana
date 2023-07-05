const body = document.querySelector("body"),
 sidebar = body.querySelector(".sidebar"),
 toggle = body.querySelector(".toggle"),
 searchBtn = body.querySelector(".search-box"),
 modeSwitch = body.querySelector(".toggle-switch"),
 modeText = body.querySelector(".mode-text");

 toggle.addEventListener("click", () =>{
    sidebar.classList.toggle("close");
 });

 modeSwitch.addEventListener("click", () =>{
    body.classList.toggle("drak");
    
    if(body.classList.contains("drak")){
      modeText.innerText ="Light Mode"
    }
    else{
      modeText.innerText ="Drak Mode"
    }
 });
