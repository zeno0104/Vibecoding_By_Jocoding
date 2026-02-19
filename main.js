
const generateBtn = document.getElementById('generate');
const numberElements = document.querySelectorAll('.number');

const generateNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers);
};

const getColor = (number) => {
    if (number <= 10) return '#f44336'; // Red
    if (number <= 20) return '#ff9800'; // Orange
    if (number <= 30) return '#ffeb3b'; // Yellow
    if (number <= 40) return '#4caf50'; // Green
    return '#2196f3'; // Blue
}

const updateNumbers = () => {
    const numbers = generateNumbers();
    numberElements.forEach((element, index) => {
        const number = numbers[index];
        element.textContent = number;
        element.style.backgroundColor = getColor(number);
        element.style.color = 'white';
        element.classList.add('animate');
        setTimeout(() => {
            element.classList.remove('animate');
        }, 500);
    });
};

generateBtn.addEventListener('click', updateNumbers);

// Initial generation
updateNumbers();
