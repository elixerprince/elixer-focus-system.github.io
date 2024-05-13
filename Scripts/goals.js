document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const addGoalButton = section.querySelector('.add');
        const listItems = section.querySelector('.list-items');
        const placeholderItem = section.querySelector('.placeholder-item');

        /* FUNCTION TO ADD A NEW GOAL */
        function addGoal(goalText) {
            const goalItem = document.createElement('li');
            goalItem.innerHTML = `
                <span class="goal">${goalText}</span>
                <span class="remove-goal">remove goal</span>
            `;

            listItems.appendChild(goalItem);
            placeholderItem.style.display = 'none';
            saveGoals(); // Save goals after adding
        }

        /* FUNCTION TO HANDLE INPUT BOX FOR ADDING GOALS */
        function handleGoalInput(event) {
            if (event.key === 'Enter') {
                const goalText = event.target.value.trim();
                if (goalText !== '') {
                    addGoal(goalText);
                    event.target.value = ''; // Clear the input box after adding goal
                    inputBox.remove(); // Remove the input box after adding goal
                }
            }
        }

        // Event listener for adding goals using input box
        const inputBox = document.createElement('input');
        inputBox.type = 'text';
        inputBox.placeholder = 'Add Goal...';
        inputBox.classList.add('goal-input');
        inputBox.addEventListener('keypress', handleGoalInput);

        addGoalButton.addEventListener('click', function() {
            listItems.appendChild(inputBox);
            inputBox.focus();
        });

        // Event delegation for remove goal link
        section.addEventListener('click', function(event) {
            if (event.target.classList.contains('remove-goal')) {
                const goalItem = event.target.parentElement;
                listItems.removeChild(goalItem);
                if (listItems.children.length === 0) {
                    placeholderItem.style.display = 'block'; // Display placeholder text if no goals left
                }
                saveGoals(); // Save goals after removing
            }
        });

        // Load saved goals on page load
        loadSavedGoals();

        /* FUNCTION TO SAVE GOALS */
        function saveGoals() {
            const goalsData = [];
            listItems.querySelectorAll('li').forEach(goalItem => {
                const goalText = goalItem.querySelector('.goal').textContent;
                goalsData.push({ text: goalText });
            });
            localStorage.setItem(section.id + '_goals', JSON.stringify(goalsData)); // Using section id + '_goals' as the key for goals
        }

        function loadSavedGoals() {
            const savedData = localStorage.getItem(section.id + '_goals');
            if (savedData) {
                const goals = JSON.parse(savedData);
                goals.forEach(goal => {
                    addGoal(goal.text);
                });
            }
        }
    });
});