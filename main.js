document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const generateBtn = document.getElementById('generate-btn');
    const lottoNumbersContainer = document.querySelector('.lotto-numbers');
    const numberSpans = lottoNumbersContainer.querySelectorAll('.number');
    const historyList = document.getElementById('history-list');
    const themeToggle = document.getElementById('checkbox');

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
        void lottoNumbersContainer.offsetHeight; 

        sortedNumbers.forEach((number, index) => {
            const span = numberSpans[index];
            span.style.animation = '';
            span.textContent = number;
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

    // --- Theme Switch Logic ---
    const setAppTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.checked = theme === 'dark';
    };

    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        setAppTheme(newTheme);
    });

    const currentTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    setAppTheme(currentTheme);
    // --- End of Theme Switch Logic ---

    // Event listener for the button click
    generateBtn.addEventListener('click', generateNumbers);

    // Generate initial numbers on load
    generateNumbers();
});
