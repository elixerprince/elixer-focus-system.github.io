document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const addHabitButton = section.querySelector('.add');
        const listItems = section.querySelector('.list-items');
        const placeholderItem = section.querySelector('.placeholder-item');

        /* FUNCTION TO ADD A NEW HABIT */
        function addHabit(habitText, count) {
            const habitItem = document.createElement('li');
            habitItem.innerHTML = `
                <span class="habit">${habitText}</span>
                <button class="counter" id="minus">minus</button>
                <span class="count">${count}</span>
                <button class="counter" id="plus">plus</button>
                <span class="remove-habit">remove habit</span>
            `;

            listItems.appendChild(habitItem);
            placeholderItem.style.display = 'none';

            const plusButton = habitItem.querySelector('#plus');
            const minusButton = habitItem.querySelector('#minus');
            const countElement = habitItem.querySelector('.count');

            plusButton.addEventListener('click', function() {
                let count = parseInt(countElement.textContent);
                count++;
                countElement.textContent = count;
                saveHabits();
            });

            minusButton.addEventListener('click', function() {
                let count = parseInt(countElement.textContent);
                if (count > 0) {
                    count--;
                    countElement.textContent = count;
                    saveHabits();
                }
            });
        }

        /* FUNCTION TO HANDLE INPUT BOX FOR ADDING HABITS */
        function handleHabitInput(event) {
            if (event.key === 'Enter') {
                const habitText = event.target.value.trim();
                if (habitText !== '') {
                    addHabit(habitText, 0); // Initialize count to 0 when adding a new habit
                    event.target.value = ''; // Clear the input box after adding habit
                    inputBox.remove(); // Remove the input box after adding habit
                    saveHabits();
                }
            }
        }

        // Event listener for adding habits using input box
        const inputBox = document.createElement('input');
        inputBox.type = 'text';
        inputBox.placeholder = 'Add Habit...';
        inputBox.classList.add('habit-input');
        inputBox.addEventListener('keypress', handleHabitInput);

        addHabitButton.addEventListener('click', function() {
            listItems.appendChild(inputBox);
            inputBox.focus();
        });

        // Event delegation for remove habit link
        section.addEventListener('click', function(event) {
            if (event.target.classList.contains('remove-habit')) {
                const habitItem = event.target.parentElement;
                listItems.removeChild(habitItem);
                if (listItems.children.length === 0) {
                    placeholderItem.style.display = 'block'; // Display placeholder text if no habits left
                }

                saveHabits();
            }
        });

        // Load saved habits on page load
        loadSavedHabits();

        /* FUNCTION TO SAVE HABITS */
        function saveHabits() {
            const habitData = [];
            listItems.querySelectorAll('li').forEach(habitItem => {
                const habitText = habitItem.querySelector('.habit').textContent;
                const count = parseInt(habitItem.querySelector('.count').textContent);
                habitData.push({ text: habitText, count: count });
            });
            localStorage.setItem(section.id, JSON.stringify(habitData));
        }

        function loadSavedHabits() {
            const savedData = localStorage.getItem(section.id);
            if (savedData) {
                const habits = JSON.parse(savedData);
                habits.forEach(habit => {
                    addHabit(habit.text, habit.count);
                });
            }
        }
    });
});