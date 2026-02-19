const URL = "https://teachablemachine.withgoogle.com/models/Vjt4JyG7b/";

let model, labelContainer, maxPredictions;

// Theme Toggle
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

const toggleTheme = () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
};

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeBtn.textContent = 'Light Mode';
}
themeBtn.addEventListener('click', toggleTheme);

// Initialize Classifier
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        const barWrap = document.createElement("div");
        barWrap.className = "prediction-bar";
        barWrap.innerHTML = `<div class="bar-fill" id="bar-${i}"></div><span class="bar-label" id="label-${i}"></span>`;
        labelContainer.appendChild(barWrap);
    }
}

// Image Upload and Prediction
const imageUpload = document.getElementById('image-upload');
const previewImage = document.getElementById('preview-image');
const uploadText = document.getElementById('upload-text');
const resultContainer = document.getElementById('result-container');
const predictionText = document.getElementById('prediction-text');

imageUpload.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
        previewImage.src = event.target.result;
        previewImage.style.display = 'block';
        uploadText.style.display = 'none';
        resultContainer.style.display = 'block';
        
        predictionText.textContent = "Analyzing...";
        await predict();
    };
    reader.readAsDataURL(file);
});

async function predict() {
    const prediction = await model.predict(previewImage);
    
    // Sort to find the top result
    const sortedPrediction = [...prediction].sort((a, b) => b.probability - a.probability);
    predictionText.textContent = `Result: ${sortedPrediction[0].className}`;

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className + ": " + (prediction[i].probability * 100).toFixed(0) + "%";
        document.getElementById(`label-${i}`).textContent = classPrediction;
        document.getElementById(`bar-${i}`).style.width = (prediction[i].probability * 100) + "%";
    }
}

// Lotto Logic
const generateBtn = document.getElementById('generate');
const numberElements = document.querySelectorAll('.number');

const getColor = (number) => {
    if (number <= 10) return '#f44336';
    if (number <= 20) return '#ff9800';
    if (number <= 30) return '#ffeb3b';
    if (number <= 40) return '#4caf50';
    return '#2196f3';
};

const updateNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) numbers.add(Math.floor(Math.random() * 45) + 1);
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    numberElements.forEach((element, index) => {
        const num = sortedNumbers[index];
        element.textContent = num;
        element.style.backgroundColor = getColor(num);
        element.classList.add('animate');
        setTimeout(() => element.classList.remove('animate'), 500);
    });
};

generateBtn.addEventListener('click', updateNumbers);

// Start everything
init();
updateNumbers();
