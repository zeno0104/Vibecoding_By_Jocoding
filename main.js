const generateBtn = document.getElementById('generate');
const numberElements = document.querySelectorAll('.number');
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

// Theme Toggle Logic
const toggleTheme = () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
};

// Initialize Theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeBtn.textContent = 'Light Mode';
}

themeBtn.addEventListener('click', toggleTheme);

// Lotto Logic
const generateNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
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
