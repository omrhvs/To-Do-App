document.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    // Recuperar tareas desde localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Si hay algo guardado lo lee, si no hay nada inicia con un arreglo vacío.

    // Mostrar tareas en pantalla
    function renderTasks() {
        taskList.innerHTML = ""; // limpiar lista antes de redibujar

        // Recrea los <li>
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = "task-item";
            if(task.completed) li.classList.add("completed");

            const text = document.createElement("span");
            text.textContent = task.text;

            // Botón para completar
            const completeBtn = document.createElement("button");
            completeBtn.textContent = task.completed ? "↩️" : "✔️";
            completeBtn.title = task.completed ? "Desmarcar" : "Marcar Completada";
            completeBtn.addEventListener("click", () => toggleTask(index));


            // Botón para eliminar
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.addEventListener("click", () => deleteTask(index));

            const btnContainer = document.createElement("div");
            btnContainer.className = "task-buttons";
            btnContainer.appendChild(completeBtn);
            btnContainer.appendChild(deleteBtn);

            li.appendChild(text);
            li.appendChild(completeBtn);
            li.appendChild(deleteBtn);

            li.appendChild(text);
            li.appendChild(btnContainer);
            taskList.appendChild(li);
        });
    }
    // Guardar en localStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks)); // actualiza el arreglo 'tasks'
    }

    // Agregar una tarea
    function addTask() {
        const text = taskInput.value.trim();
        if (text === "") return alert("Escribe una tarea");

        tasks.push({ text, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = "";
    }

    // Eliminar una tarea
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    // Marcar como completada
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    // Eventos
    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addTask();
    });

    // Motrar al iniciar
    renderTasks();
});