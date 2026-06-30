const taskInput = document.querySelector("#task-input");
const addTaskBtn = document.querySelector("#add-task");
const taskList = document.querySelector("#task-list");

// Add Task
addTaskBtn.addEventListener("click", () => {

    let taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task!");
        return;
    }

    // Create List Item
    let li = document.createElement("li");

    li.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
    );

    // Task Text
    let span = document.createElement("span");
    span.innerText = taskText;

    // Delete Button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add(
        "btn",
        "btn-danger",
        "btn-sm"
    );

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";

});

// Delete Task & Complete Task
taskList.addEventListener("click",(evt)=>{
    if(evt.target.tagName === "BUTTON"){
        evt.target.parentElement.remove();
        saveTasks();


    }
    else if(evt.target.tagName === "SPAN"){
        evt.target.classList.toggle("text-decoration-line-through");
        evt.target.classList.toggle("text-muted");
        saveTasks();
    }

});

const noteInput=document.querySelector("#note-input");
const saveNoteBtn=document.querySelector("#save-note");
const notesContainer=document.querySelector("#notes-container");

saveNoteBtn.addEventListener("click",()=>{
    let noteText=noteInput.value.trim();
    if(noteText==""){
        alert("Write a note first!");
        return;
    }
    let note=document.createElement("div")
    note.classList.add("alert","alert-warning","mt-3");
    note.innerText=noteText;
    notesContainer.appendChild(note)
    noteInput.value="";

});
const eventName = document.querySelector("#event-name");
const eventDate = document.querySelector("#event-date");
const addEventBtn = document.querySelector("#add-event");
const eventList = document.querySelector("#event-list");

addEventBtn.addEventListener("click",()=>{
    if(
        eventName.value==="" ||
        eventDate.value===""){
            alert("Fill all fields");
            return;
    }

    let li=document.createElement("li");

    li.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
    );

    li.innerHTML=`
        <span>
        📅 ${eventName.value}
        <br>
        <small>${eventDate.value}</small>
        </span>

        <button class="btn btn-danger btn-sm">
            Delete
        </button>
    `;

    eventList.appendChild(li);

    eventName.value="";
    eventDate.value="";

});
eventList.addEventListener("click",(evt)=>{

    if(evt.target.tagName==="BUTTON"){

        evt.target.parentElement.remove();

    }
});
const placementDate=document.querySelector("#placement-date");
const startCountdownBtn=document.querySelector("#start-countdown");
const countdown=document.querySelector("#countdown");

startCountdownBtn.addEventListener("click",()=>{
    if(placementDate.value==""){
        alert("Select a placement date");
        return;
    }
    let today=new Date();
    let target=new Date(placementDate.value);
    let difference=target-today;
    let days=Math.ceil(difference/(1000*60*60*24));
    if(days<0){
        countdown.innerText="Placement date has passed!";
    }
    else{
        countdown.innerText=`${days} Days Left 🚀`;
    }

});

const themeBtn=document.querySelector("#theme-btn");
let savedTheme=localStorage.getItem("theme")
if(savedTheme=="dark"){
    document.body.classList.add("dark-mode");
    themeBtn.innerText="☀️";
}

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");

        themeBtn.innerText="☀️";

    }

    else{

        localStorage.setItem("theme","light");

        themeBtn.innerText="🌙";

    }

});
const quote = document.querySelector("#quote");
const quoteBtn = document.querySelector("#quote-btn");
async function getQuote(){
    quote.innerText="Loading...";
    let response=await fetch(
        "https://dummyjson.com/quotes/random"
    );
    let data=await response.json();
    quote.innerText=`"${data.quote}"`;
}



quoteBtn.addEventListener("click",()=>{

    getQuote();

});

function saveTasks(){
    localStorage.setItem("tasks".taskList.innerHTML);
}

function showTasks(){
    let savedTasks=localStorage.getItem("tasks");
    if(savedTasks){
        taskList.innerHTML=savedTasks;
    }
}

showTasks();