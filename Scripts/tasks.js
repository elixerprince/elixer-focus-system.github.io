document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
      const addTaskButton = section.querySelector('.add');
      const listItems = section.querySelector('.list-items');
      const placeholderItem = section.querySelector('.placeholder-item');
      const sectionId = section.id; // Get the unique identifier of the section

      function addTask(taskText, checked) {
          const listItem = document.createElement('div');
          listItem.classList.add('list-item');
          listItem.innerHTML = `
              <li>
                  <input type="checkbox" class="task-checkbox" ${checked ? 'checked' : ''}>
                  <span>
                      <span class="task">${taskText}</span>
                      <span class="remove-task">remove task</span>
                  </span>
              </li>
          `;

          listItems.appendChild(listItem);
          placeholderItem.style.display = 'none';
          saveTasks(); // Save tasks after adding
      }

      function saveTasks() {
          // Get all task texts and checked states
          const tasksData = [];
          listItems.querySelectorAll('.list-item').forEach(taskItem => {
              const taskText = taskItem.querySelector('.task').textContent;
              const checked = taskItem.querySelector('.task-checkbox').checked;
              tasksData.push({ text: taskText, checked: checked });
          });
          // Save tasks data to localStorage with sectionId as key
          localStorage.setItem(sectionId, JSON.stringify(tasksData));
      }

      function loadTasks() {
          // Retrieve tasks data from localStorage based on sectionId
          const tasksData = JSON.parse(localStorage.getItem(sectionId));
          if (tasksData) {
              // Add tasks based on stored data
              tasksData.forEach(taskData => {
                  addTask(taskData.text, taskData.checked);
              });
          }
      }

      // Load tasks when the page is loaded
      loadTasks();

      function handleTaskInput(event) {
          if (event.key === 'Enter') {
              const taskText = event.target.value.trim();
              if (taskText !== '') {
                  addTask(taskText, false);
                  event.target.value = '';
                  event.target.parentElement.removeChild(event.target);
              }
          }
      }

      const inputBox = document.createElement('input');
      inputBox.type = 'text';
      inputBox.placeholder = 'Add Task...';
      inputBox.classList.add('task-input');
      inputBox.addEventListener('keypress', handleTaskInput);

      addTaskButton.addEventListener('click', function() {
          listItems.appendChild(inputBox);
          inputBox.focus();
      });

      section.addEventListener('click', function(event) {
          if (event.target.classList.contains('remove-task')) {
              const listItem = event.target.closest('.list-item');
              listItems.removeChild(listItem);
              if (listItems.children.length === 0) {
                  placeholderItem.style.display = 'block';
              }
              saveTasks(); // Save tasks after removing
          }
      });

      section.addEventListener('change', function(event) {
          if (event.target.type === 'checkbox' && event.target.classList.contains('task-checkbox')) {
              const taskItem = event.target.parentElement;
              if (sectionId === 'Completed') {
                  if (!event.target.checked) {
                      listItems.removeChild(taskItem); // Remove the task from DOM
                      saveTasks(); // Save tasks after removing
                  }
              } else {
                  if (event.target.checked) {
                      const completedSection = document.getElementById('Completed').querySelector('.list-items');
                      completedSection.appendChild(taskItem);
                  } else {
                      listItems.appendChild(taskItem); // Move the task back to the original section
                  }
                  saveTasks(); // Save tasks after checkbox change
              }
          }
      });
  });

  // Hide completed tasks container
  const hideCompletedTasksDiv = document.getElementById('hide');
  hideCompletedTasksDiv.addEventListener('click', function() {
      const completedTasksContainer = document.getElementById('Completed');
      if (completedTasksContainer.style.display === 'none') {
          completedTasksContainer.style.display = 'block';
      } else {
          completedTasksContainer.style.display = 'none';
      }
  });
});
