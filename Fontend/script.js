const input = document.getElementById("task");
const addBtn = document.getElementById("add-btn");
const editBtn = document.getElementById("edit-btn");
let id = "";

// code to get all the tasks from the backend
const getTasks = () => {
  allTasks = fetch("http://localhost:5000/api/tasks/")
    .then((response) => response.json())
    .then((data) => renderTasks(data))
    .catch((error) => console.log(error));
};

// code to add task
const addTask = async (input) => {
  let info = input.value;
  try {
    const response = await fetch(`http://localhost:5000/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({ task: info }),
    });

    if (!response.ok) {
      throw new Error("Task not added");
    }

    getTasks();
  } catch (error) {
    console.log(error.message);
  }
  input.value = "";
};

// code to edit task
const editTask = async (id, input) => {
  let info = input.value;
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({ task: info }),
    });

    if (!response.ok) {
      throw new Error("Task not updated");
    }

    getTasks();
  } catch (error) {
    console.log(error.message);
  }
  input.value = "";
  editBtn.classList.add("hide-btn");
  addBtn.classList.remove("hide-btn");
};

// code to delete task
const deleteTask = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Task not deleted");
    }

    getTasks();
  } catch (error) {
    console.log(error.message);
  }
};

// code to change the status of the task
const changeStatus = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error("status not changed");
    }
    getTasks();
  } catch (error) {
    console.log(error.message);
  }
};

// code to rendet the tasks on the ui
const renderTasks = (data) => {
  const wrapper = document.querySelector(".wrapper");
  wrapper.innerHTML = ""; // Clear the wrapper

  if (!data.length) {
    wrapper.innerHTML = "<p>No Tasks Found</p>";
  } else {
    data.forEach((task) => {
      const div = document.createElement("div");
      const label = document.createElement("label");
      const checkbox = document.createElement("input");

      div.classList.add("taskContainer");
      label.classList.add("task");
      label.setAttribute("for", task._id);
      checkbox.type = "checkbox";
      checkbox.id = task._id;
      checkbox.checked = task.taskStatus;

      div.innerHTML = `<div class="task-controls">
            <div class="edit icon">
              <span> &#x270E; </span>
            </div>

            <div class="delete icon">
              <span>&#x1F5D1; </span>
            </div>
          </div>`;

      label.innerHTML = ` <div class="check-mark-container">
              <div class="check-mark">
                <div class="check"></div>
              </div>
            </div>
            <div class="task-text">
              <span>${task.task}</span>
            </div>`;

      label.prepend(checkbox);
      div.prepend(label);
      wrapper.appendChild(div);

      // Select the delete button for the current task
      const delbtn = div.querySelector(".delete");
      const editbtn = div.querySelector(".edit");

      // Add event listener to the checkbox
      checkbox.addEventListener("change", () => {
        changeStatus(task._id);
      });

      // Add event listener to the delete button
      delbtn.addEventListener("click", () => {
        deleteTask(task._id); // Call a function to delete the task
      });

      // Add event listerner to edit button
      editbtn.addEventListener("click", () => {
        id = task._id;
        input.value = task.task;
        editBtn.classList.remove("hide-btn");
        addBtn.classList.add("hide-btn");
      });
    });
  }
};

// stating point
const start = () => {
  addBtn.addEventListener("click", () => addTask(input));
  editBtn.addEventListener("click", () => {
    editTask(id, input);
  });
  getTasks();
};

start();
