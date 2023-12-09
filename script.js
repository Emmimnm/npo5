document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("task-list");
    const newTaskInput = document.getElementById("new-task");

    newTaskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            const taskText = newTaskInput.value.trim();

            if (taskText !== "") {
                addTask(taskText);
                newTaskInput.value = "";
            }
        }
    });

    function addTask(taskText) {
        const taskElement = document.createElement("div");
        taskElement.className = "task";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                taskElement.classList.add("completed");
            } else {
                taskElement.classList.remove("completed");
            }
        });

        const taskContent = document.createElement("span");
        taskContent.className = "task-content";
        taskContent.textContent = taskText;
        taskContent.addEventListener("dblclick", function () {
            editTask(taskContent);
        });

        const deleteButton = document.createElement("span");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "❌";
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(taskElement);
        });

        taskElement.appendChild(checkbox);
        taskElement.appendChild(taskContent);
        taskElement.appendChild(deleteButton);
        taskList.appendChild(taskElement);
    }

    function editTask(taskContent) {
        const editText = taskContent.textContent;
        const editInput = document.createElement("input");
        editInput.className = "edit-input";
        editInput.value = editText;

        editInput.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                const newTaskText = editInput.value.trim();
                if (newTaskText !== "") {
                    taskContent.textContent = newTaskText;
                }
                taskContent.style.display = "inline";
                taskContent.removeEventListener("dblclick", editTask);
                taskContent.removeChild(editInput);
            }
        });

        taskContent.style.display = "none";
        taskContent.parentNode.appendChild(editInput);
        editInput.focus();
    }
});
