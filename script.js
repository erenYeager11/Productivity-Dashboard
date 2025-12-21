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
