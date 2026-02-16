document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const generateBtn = document.getElementById('generate-btn');
    const lottoNumbersContainer = document.querySelector('.lotto-numbers');
    const numberSpans = lottoNumbersContainer.querySelectorAll('.number');
    const historyList = document.getElementById('history-list');

    // Function to generate and display numbers
    const generateNumbers = () => {
        // Reset animation
        numberSpans.forEach(span => {
            span.style.animation = 'none';
            span.textContent = ''; // Clear previous numbers
        });

        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        // Trigger reflow to restart animation
        // offsetHeight is a trick to do this
        void lottoNumbersContainer.offsetHeight; 

        sortedNumbers.forEach((number, index) => {
            const span = numberSpans[index];
            span.style.animation = ''; // Reset animation property
            span.textContent = number;
            // Add animation back
            span.style.animation = `fadeIn 0.5s forwards ${index * 0.1 + 0.1}s`;
        });

        updateHistory(sortedNumbers);
    };

    // Function to update the history list
    const updateHistory = (numbers) => {
        const newHistoryItem = document.createElement('li');
        newHistoryItem.textContent = numbers.join(', ');
        historyList.prepend(newHistoryItem);
    };

    // Event listener for the button click
    generateBtn.addEventListener('click', generateNumbers);

    // Generate initial numbers on load
    generateNumbers();
});
