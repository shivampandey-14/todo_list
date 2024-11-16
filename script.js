document.addEventListener('DOMContentLoaded', () =>
{
    const todoInput=document.getElementById("todo-input")
    const addTaskButton=document.getElementById("add-task-btn")
    const todoList = document.getElementById("todo-list")

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [] //parse the data from the local storage or 
    // if no data is present then make empty[].

    tasks.forEach((task) => {
        renderTask(task)
    });
        
        //Fetching the input value from the input.
    addTaskButton.addEventListener('click', () =>
    {
        const taskTest = todoInput.value.trim() //todoInput.value Purpose: Retrieves or sets the value of an HTML form control
        // (e.g., <input>, <textarea>, etc.).
        //Use Case: When working with form elements where the user can input data (like text fields or password fields).
        // todoInput.textContent
        // Purpose: Retrieves or sets the textual content inside an element (e.g., <div>, <span>, <p>, etc.).
        // Use Case: Used for elements that display text, not for form controls.

        if (taskTest == "")
            return //return if input is empty.
        const newTask = { //creating a new task with unique id and content
            id: Date.now(),
            text: taskTest,
            completed: false
        }
        tasks.push(newTask) //push the new task in the tasks array.
        saveTasks()
        renderTask(newTask)
        todoInput.value = ""//clear the input in the todoInput as it will take next input.
        console.log(tasks)
    })

    //savng task in local storage.
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks))
        //setItems to add the items in the local storage .
        //the data is stored in key value pair both of them are string JASON.stringify used to convert the input into string
        //preseving its structure and parse it when we need the data.
        //call this function from wherever input was taken .
        
    }

    //reading from local storage.
    function renderTask(task) {
        const li = document.createElement('li')
        li.setAttribute('data-id', task.id)
        if (li.completed)
            li.classList.add('completed')
        li.innerHTML = `<span>${task.text}</span>, 
            <button>Delete</button>`
        todoList.appendChild(li)
        li.addEventListener(('click'), (e) => {
            if (e.target.tagName == 'BUTTON')
                return;
            task.completed = !task.completed
            li.classList.toggle('completed')
            saveTasks()
        })
        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation()
            tasks = tasks.filter((t) => t.id !== task.id)
            li.remove()
            saveTasks()
            
        })
    }



})

