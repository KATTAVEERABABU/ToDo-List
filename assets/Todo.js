let addButton = document.getElementById("add-btn");
let inputElement = document.getElementById("input-holder");
let contentContainer=document.getElementById("content");
let inputContainer=document.getElementById("text-holder");
let count=0;
DisplayItems();
addButton.addEventListener("click", function () {
  if(inputElement.value.length>=1){
  let localStorageItem = JSON.parse(localStorage.getItem("todoItems"));
  count++;
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1; // 0-11 (add 1 because months are zero-indexed)
  var year = today.getFullYear();
  day = day.toString().padStart(2, "0");
  month = month.toString().padStart(2, "0");
  var currentDate = month + "-" + day + "-" + year;

  var hours = today.getHours(); // 0-23
  var minutes = today.getMinutes(); // 0-59
  var seconds = today.getSeconds(); // 0-59
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");
  var systemTime = hours + ":" + minutes + ":" + seconds;

  // console.log("Current Date:", currentDate);
  // console.log("System Time:", systemTime);
  var item= {
    id:count,
    todo: inputElement.value,
    date:currentDate,
    time:systemTime
  };
  if (localStorageItem == null) {
    let todoItems = [];
    todoItems.push(item);
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
    DisplayItems();
  } else {
    let localStorageItem = JSON.parse(localStorage.getItem("todoItems"));
    localStorageItem.push(item);
    localStorage.setItem("todoItems", JSON.stringify(localStorageItem));
    DisplayItems();
  }
}
});
function DisplayItems(){
    let localStorageItem = JSON.parse(localStorage.getItem("todoItems"));
    
    if(localStorageItem != null){
        contentContainer.removeAttribute("style");
        inputContainer.removeAttribute("style");
        contentContainer.innerHTML="";
    localStorageItem.map((item,i)=>{

        contentContainer.innerHTML +=`<div class="checklist-item" id="item${i}">
            <span>${i+1}.</span>
            <p> ${item.todo}</p>
            <p>${item.date}  ${item.time}</p>
            <button class="delete-btn" id="del-btn" onclick="deleteItem('${i}')"><i class="fa-solid fa-trash "></i></button>
</div>`
    })
    if(localStorageItem.length==0){
        contentContainer.setAttribute("style","display: none;")
        inputContainer.setAttribute("style","margin-top:30vh;")
    }
}
}

function deleteItem(id){
    console.log(id);
    let localStorageItem = JSON.parse(localStorage.getItem("todoItems"));

    localStorageItem.splice(id,1);
    localStorage.setItem("todoItems",JSON.stringify(localStorageItem));
    console.log(localStorageItem)
    DisplayItems();
}


