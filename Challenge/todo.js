const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".toDoList");
const finToDoList = document.querySelector(".js-finishedToDoList");
let toDos = [];
let finToDos = [];
const TODOS_LS = "toDos";
const FINTODOS_LS = "finToDos";
let idNum = 1;

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    localStorage.setItem(FINTODOS_LS, JSON.stringify(finToDos));
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const loadedFinToDos = localStorage.getItem(FINTODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        })
    }
    if(loadedFinToDos !== null) {
        const parsedFinToDos = JSON.parse(loadedFinToDos);
        parsedFinToDos.forEach(function(toDo) {
            paintFinToDo(toDo.text);
        })
    }
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const ul = li.parentNode;
    if(ul.className === "toDoList") {
        toDoList.removeChild(li);
        const cleanToDos = toDos.filter(function(toDo) {
            return toDo.id !== parseInt(li.id);
        })
        toDos = cleanToDos;
    } else {
        finToDoList.removeChild(li);
        const cleanToDos = finToDos.filter(function(toDo) {
            return toDo.id !== parseInt(li.id);
        })
        finToDos = cleanToDos;
    }
    saveToDos();
}

function paintFinToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const moveBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNum;
    idNum += 1
    delBtn.innerText = "✖";
    delBtn.addEventListener("click", deleteToDo);
    moveBtn.innerText = "☑"
    moveBtn.addEventListener("click", moveToDo);
    delBtn.className = "delBtn"
    moveBtn.className = "moveBtn"
    span.innerText = `${text} `;
    li.appendChild(span);
    li.appendChild(moveBtn);
    li.appendChild(delBtn);
    li.id = newId;
    finToDoList.appendChild(li);
    li.classList.add("delLine")
    const toDoObj = {
        text: text,
        id: newId
    };
    finToDos.push(toDoObj);
    saveToDos();
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const moveBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNum;
    idNum += 1
    delBtn.innerText = "✖";
    delBtn.addEventListener("click", deleteToDo);
    moveBtn.innerText = "☐"
    moveBtn.addEventListener("click", moveToDo);
    delBtn.className = "delBtn"
    moveBtn.className = "moveBtn"
    span.innerText = `${text} `;
    li.appendChild(span);
    li.appendChild(moveBtn);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();  
}

function moveToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const ul = li.parentNode;
    if(ul.className === "toDoList") {
        btn.innerText = "☑";
        li.classList.add("delLine")
        toDoList.removeChild(li);
        finToDoList.appendChild(li);
        const newFinToDos = toDos.filter(function(toDo) {
            return toDo.id === parseInt(li.id);
        })
        finToDos.push(...newFinToDos);
        const cleanToDos = toDos.filter(function(toDo) {
            return toDo.id !== parseInt(li.id);
        })
        toDos = cleanToDos;
    } else {
        btn.innerText = "☐"
        li.classList.remove("delLine")
        finToDoList.removeChild(li);
        toDoList.appendChild(li);
        const newToDos = finToDos.filter(function(toDo) {
            return toDo.id === parseInt(li.id);
        })
        toDos.push(...newToDos);
        const cleanFinToDos = finToDos.filter(function(toDo) {
            return toDo.id !== parseInt(li.id);
        })
        finToDos = cleanFinToDos;
    }
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();