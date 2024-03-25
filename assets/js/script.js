// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    //creates the card using jquery and gives it a unique id
    const taskCard = $("<div>").addClass("task-card").attr("id", "task" + task.id);
    //sets color of the body and text
    const cardBody = $("<div>").addClass("card-body bg-primary text-white");

    const title = $("<h5>").addClass("card-title").text(task.title);
    cardBody.append(title);

    const description = $("<p>").addClass("card-text").text(task.description);
    cardBody.append(description);

    const dueDate = $("<p>").addClass("card-text").text(task.dueDate);
    cardBody.append(dueDate);

    const deleteButton = $("<button>").addClass("btn btn-danger delete-task").text("Delete");
    deleteButton.data("task-id", task.id);
    deleteButton.click(handleDeleteTask);
    cardBody.append(deleteButton);

    taskCard.append(cardBody);
    taskCard.css("z-index", 1000)

    return taskCard;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    //Emptys out the list to prevent duplicates of each task everytime the function is ran
    $("#todo-cards").empty();
    //For each task, it adds the card to the div and makes them draggable
    taskList.forEach(function(task) {
        const taskCard = createTaskCard(task);
        $("#todo-cards").append(taskCard);
        $(".task-card").draggable()

    })

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const title = $("#taskTitle").val();
    const description = $("#taskDescription").val();
    const dueDate = $("#taskDueDate").val();

    const taskId = generateTaskId();
    //Creates an object with the input values from the modal.
    const newTask = {
        id: taskId,
        title: title,
        description: description,
        dueDate: dueDate
    };
    //Adds the new task to the list of tasks defined above.
    taskList.push(newTask);
    //Adds the task and the associated ID for the next task to the local storage
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", JSON.stringify(nextId));

    renderTaskList();


}

// Todo: create a function to handle deleting a task
// This function picks which task from the task list needs to be deleted and removed from local storage, then renders the page after
function handleDeleteTask(event){
    const taskId = $(event.target).data("task-id");
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();

}

// Todo: create a function to handle dropping a task into a new status lane
// The items dropped without needing this function. Im not sure what i was supposed to do with this function
function handleDrop(event, ui) {
    
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
//When the button is clicked, this shows the modal to enter the data
    $(".btn-success").click(function() {
        $('#formModal').modal('show');
    });
//When the submit button on the modal is clicked, this prevents default, adds the task to the local storage, and hides the modal
    $("#submitTaskBtn").click(function(event) {
        event.preventDefault();
        handleAddTask(event);
        $('#formModal').modal('hide');
    });
    
    renderTaskList();

});
