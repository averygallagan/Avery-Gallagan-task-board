// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $("<div>").addClass("task-card").attr("id", "task-" + task.id);

    const cardBody = $("<div>").addClass("card-body");

    const title = $("<h5>").addClass("card-title").text(task.title);
    cardBody.append(title);

    const description = $("<p>").addClass("card-text").text(task.description);
    cardBody.append(description);

    const dueDate = $("<p>").addClass("card-text").text(task.dueDate);
    cardBody.append(dueDate);

    const deleteButton = $("<button>").addClass("btn btn-danger delete-task").text("Delete");
    deleteButton.data("task-id", task.id);
    cardBody.append(deleteButton);

    taskCard.append(cardBody);
    taskCard.css("z-index", 1000)

    return taskCard;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $("#todo-cards").empty();

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

    const newTask = {
        id: taskId,
        title: title,
        description: description,
        dueDate: dueDate
    };
    taskList.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", JSON.stringify(nextId));

    renderTaskList();


}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    $(".btn-success").click(function() {
        $('#formModal').modal('show');
    });

    $("#submitTaskBtn").click(function(event) {
        event.preventDefault();
        handleAddTask(event);
        $('#formModal').modal('hide');
    });
    
    renderTaskList();

});
