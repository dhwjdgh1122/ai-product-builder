const generateBtn = document.getElementById('generate-btn');
const numberSpans = document.querySelectorAll('.number');
const historyList = document.getElementById('history-list');

const generateLottoNumbers = () => {
    const lottoNumbers = [];
    while (lottoNumbers.length < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        if (!lottoNumbers.includes(randomNumber)) {
            lottoNumbers.push(randomNumber);
        }
    }
    lottoNumbers.sort((a, b) => a - b);

    numberSpans.forEach((span, index) => {
        span.textContent = lottoNumbers[index];
    });

    const newHistoryItem = document.createElement('li');
    newHistoryItem.textContent = lottoNumbers.join(', ');
    historyList.appendChild(newHistoryItem);
};

generateBtn.addEventListener('click', generateLottoNumbers);