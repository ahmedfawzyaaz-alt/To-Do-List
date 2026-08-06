let arr = [];

const savedTasks = JSON.parse(localStorage.getItem("tasks"));
if (savedTasks) {
  arr.push(...savedTasks);
}

const deleteAll = document.querySelector(".btn-deletAll");

let submitUser = document
  .querySelector(".submit-user")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    let inputUser = document.querySelector(".input-user");

    let userObject = {
      name: inputUser.value,
      complete: false,
    };

    arr.push(userObject);
    const task = localStorage.setItem("tasks", JSON.stringify(arr));
    console.log(arr);
    inputUser.value = "";
    renderShow();
  });

const userRender = document.querySelector(".user-render");
console.log(userRender);

function renderShow() {
  userRender.innerHTML = "";
  arr.forEach((ele, idx) => {
    userRender.innerHTML += `
    <div class="col-span-12 md:col-span-6 lg:col-span-4">
        <div
          class="flex justify-between border px-6 py-3 rounded"
        >
          <input type="checkbox" onclick="taskDone(${idx})" ${ele.complete ? "checked" : ""}/>
            <p class=" break-words ${ele.complete ? "line-through" : ""}" id="task${idx} ">${ele.name}</p>
          <div class="flex gap-2">
            <button>
              <i class="fa-solid fa-pen-to-square" onclick="editElement(${idx})"></i>
            </button>
            <button>
              <i class="fa-solid fa-trash-can" onclick="deletElement(${idx})"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  if (arr.length === 0) {
    deleteAll.style.display = "none";
  } else {
    deleteAll.style.display = "block";
  }
}

renderShow();

function deletElement(idx) {
  arr.splice(idx, 1);
  localStorage.setItem("tasks", JSON.stringify(arr));
  renderShow();
}

function editElement(idx) {
  const editing = prompt("Edit Your Task", arr[idx].name);

  if (editing !== null && editing.trim() !== "") {
    arr[idx].name = editing;

    localStorage.setItem("tasks", JSON.stringify(arr));
  }
  renderShow();
}

function taskDone(idx) {
  arr[idx].complete = !arr[idx].complete;
  localStorage.setItem("tasks", JSON.stringify(arr));
  renderShow();
}

deleteAll.onclick = (event) => {
  event.preventDefault();
  arr.length = 0;
  localStorage.setItem("tasks", JSON.stringify(arr));
  renderShow();
};
