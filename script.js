function openFullPages() {
  //document.querySelectorAll('.allElems')--  this will select all the elements with same classes
  let allElems = document.querySelectorAll(".elems");
  let fullElemsPage = document.querySelectorAll(".fullElems");
  let fullElemsPageBackBtn = document.querySelectorAll(".fullElems .back");

  //Full Activity Page Open logic
  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemsPage[elem.id].style.display = "block";
    });
  });

  //Full Activity Page Back Button logic
  fullElemsPageBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemsPage[back.id].style.display = "none";
    });
  });
}
openFullPages();

function todoList(params) {
  //This will clear all previous data
  // localStorage.clear()

  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task list is empty");
  }

  // jo bhi new task banega wo is function through screen pr render ho kr allTasks window pr show hoga
  function renderTask() {

    var allTask = document.querySelector(".allTasks");

    var sum = "";

    currentTask.forEach(function (elem, idx) {

      sum = sum +  `<div class="task">
        <h5>${elem.task} <span class=${elem.imp}>Imp</span> </h5>
        <button id=${idx}>Mark as completed</button>
        </div>`;
    });

    allTask.innerHTML = sum;

    // isme jb data jayega or localStorage pr save hoga to localStorage pr hum object ki form me data rakh nahi sakte hai
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });

    });

  }
  renderTask();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  form.addEventListener("submit", function (e) {
    // is method(preventDefault()) ki wajah se submit karne pr relode nahi hoga jo pehle ho raha tha

    e.preventDefault();

    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });

    renderTask();

    taskInput.value = ''
    taskDetailsInput.value  = ''
    taskCheckbox.checked = false

  });
}

todoList();

//DAILY PLANNER LOLGIC

function dailyPlanner () {
  var dayPlanner = document.querySelector('.day-planner')

var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

//Ek Array banata hai 18 values ka jo ek ghante k hisab se chalenge 6 baje se
//index ka use karke jo automatically values generate karega start - end 

//TO UNDERSTAND Array.from()
//Question-Jab mere paas koi array nahi hai, sirf number hai ki mujhe kitne items chahiye, tab array kaise banu?
//Answer-Main JS ko sirf bata deta hoon ki mujhe kitne items chahiye,
// baaki kaam JS khud kar leta hai.

// Jab sirf quantity (kitni items chahiye) pata ho
// aur actual values baad me generate karni ho,
// tab Array.from() ka use karte hain

var hours = Array.from({ length: 18 }, (_, idx)=>`${6+idx}:00 - ${7+idx}:00`)


var wholeDaySum = ''

hours.forEach(function(elem, idx) {
  
  var savedData = dayPlanData[idx] || ''
  
  wholeDaySum = wholeDaySum + ` <div class="day-planner-time">
  <p>${elem}</p>
  <input id=${idx} type="text" placeholder="..." value = ${savedData}>
  </div>`
})


dayPlanner.innerHTML = wholeDaySum

var dayPlannerInput = document.querySelectorAll('.day-planner input')

dayPlannerInput.forEach(function (elem){

  elem.addEventListener('input', function () {
    dayPlanData[elem.id] = elem.value

    localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
  })
})
}
dailyPlanner()

function motivationSection(){
  
var motivationQuote = document.querySelector('.motivation-2 h1')
var motivationAuthor = document.querySelector('.motivation-3 h2')

async function fetchQuote() {
  try {
    let response = await fetch("https://api.quotable.io/random");
    if (!response.ok) {
      throw new Error("API not responding properly");
    }
    var data = await response.json();
  } catch (error) {
    motivationQuote.innerHTML ="Quote not available. Try again later"
    motivationAuthor.innerHTML = "---"
  }
    
  motivationQuote.innerHTML = data.content
  motivationAuthor.innerHTML = data.author
}


fetchQuote()
}
motivationSection()

