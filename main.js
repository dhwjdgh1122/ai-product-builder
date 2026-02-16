document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Selections ---
    const generateBtn = document.getElementById('generate-btn');
    const lottoNumbersContainer = document.querySelector('.lotto-numbers');
    const numberSpans = lottoNumbersContainer.querySelectorAll('.number');
    const historyList = document.getElementById('history-list');
    const themeToggle = document.getElementById('checkbox');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // --- Lotto Generation Logic ---
    const generateNumbers = () => {
        numberSpans.forEach(span => {
            span.style.animation = 'none';
            span.textContent = '';
        });
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
        void lottoNumbersContainer.offsetHeight; 
        sortedNumbers.forEach((number, index) => {
            const span = numberSpans[index];
            span.style.animation = '';
            span.textContent = number;
            span.style.animation = `fadeIn 0.5s forwards ${index * 0.1 + 0.1}s`;
        });
        updateHistory(sortedNumbers);
    };

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

    // --- Contact Form Logic (Formspree) ---
    async function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        
        formStatus.textContent = '전송 중...';
        formStatus.className = '';

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = "메시지가 성공적으로 전송되었습니다!";
                formStatus.className = 'success';
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.textContent = "메시지 전송에 실패했습니다.";
                    }
                    formStatus.className = 'error';
                })
            }
        } catch (error) {
            formStatus.textContent = "메시지 전송 중 오류가 발생했습니다.";
            formStatus.className = 'error';
        }
    }

    contactForm.addEventListener("submit", handleFormSubmit);

    // --- Initializations ---
    generateBtn.addEventListener('click', generateNumbers);
    generateNumbers(); // Generate initial numbers on load
});
