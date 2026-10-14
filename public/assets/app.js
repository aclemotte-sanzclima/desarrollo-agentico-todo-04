// Recalcula el contador de tareas pendientes a partir de la lista visible.
function updatePendingCount() {
  var counter = document.querySelector("[data-pending-count]");
  if (!counter) {
    return;
  }
  var pending = document.querySelectorAll(".task-list .task:not(.task-completed)").length;
  if (pending === 0) {
    counter.textContent = "No hay tareas pendientes";
  } else if (pending === 1) {
    counter.textContent = "1 tarea pendiente";
  } else {
    counter.textContent = pending + " tareas pendientes";
  }
}

// Pide confirmación antes de enviar formularios marcados con data-confirm.
document.addEventListener("submit", function (event) {
  var form = event.target;
  if (form.dataset.confirm && !window.confirm(form.dataset.confirm)) {
    event.preventDefault();
  }

  if (!form.matches("[data-task-toggle]")) {
    return;
  }

  event.preventDefault();

  var task = form.closest(".task");
  var completed = task.classList.toggle("task-completed");
  var button = form.querySelector("button");
  var status = task.querySelector(".task-status");

  var label = completed ? "Reabrir" : "Completar";
  button.querySelector(".toggle-label").textContent = label;
  button.setAttribute("aria-pressed", String(completed));
  button.setAttribute("aria-label", label + " tarea: " + task.querySelector(".task-title").textContent);
  button.setAttribute("title", label + " tarea");

  if (completed && !status) {
    status = document.createElement("span");
    status.className = "task-status";
    status.textContent = "Completada";
    task.insertBefore(status, task.querySelector(".task-actions"));
  } else if (!completed && status) {
    status.remove();
  }

  updatePendingCount();

  fetch(form.action);
});
