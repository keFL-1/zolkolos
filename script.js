// Функции для версии для слабовидящих
let fontSize = 0;
let speechEnabled = false;
let speechSynthesis = window.speechSynthesis;

function toggleAccessibilityPanel() {
    const panel = document.querySelector('.accessibility-panel');
    panel.classList.toggle('active');
}

function changeFontSize(action) {
    const body = document.body;
    body.classList.remove('font-large', 'font-xlarge');
    
    if (action === 'increase') {
        fontSize = Math.min(fontSize + 1, 2);
    } else {
        fontSize = Math.max(fontSize - 1, 0);
    }
    
    if (fontSize === 1) body.classList.add('font-large');
    if (fontSize === 2) body.classList.add('font-xlarge');
    
    localStorage.setItem('fontSize', fontSize);
}

function changeTheme(theme) {
    const body = document.body;
    body.className = body.className.replace(/theme-\w+/g, '');
    
    if (theme !== 'white') {
        body.classList.add('theme-' + theme);
    }
    
    localStorage.setItem('theme', theme);
}

function toggleImages(mode) {
    const body = document.body;
    body.classList.remove('images-hidden', 'images-bw');
    
    if (mode === 'hide') {
        body.classList.add('images-hidden');
    } else if (mode === 'bw') {
        body.classList.add('images-bw');
    }
    
    localStorage.setItem('imageMode', mode);
}

function toggleSpeech(mode) {
    speechEnabled = mode === 'on';
    localStorage.setItem('speechEnabled', speechEnabled);
    
    if (speechEnabled) {
        enableSpeechReader();
    } else {
        disableSpeechReader();
    }
}

function enableSpeechReader() {
    document.addEventListener('mouseup', speakSelectedText);
}

function disableSpeechReader() {
    document.removeEventListener('mouseup', speakSelectedText);
    speechSynthesis.cancel();
}

function speakSelectedText() {
    const text = window.getSelection().toString().trim();
    if (text && speechEnabled) {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ru-RU';
        speechSynthesis.speak(utterance);
    }
}

function resetSettings() {
    document.body.className = '';
    fontSize = 0;
    speechEnabled = false;
    localStorage.clear();
    speechSynthesis.cancel();
    disableSpeechReader();
}

function toggleAccessibility() {
    // Дополнительные настройки доступности
    alert('Дополнительные настройки доступности');
}

// Загрузка сохраненных настроек
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const savedFontSize = localStorage.getItem('fontSize');
    const savedImageMode = localStorage.getItem('imageMode');
    const savedSpeech = localStorage.getItem('speechEnabled');
    
    if (savedTheme) changeTheme(savedTheme);
    if (savedFontSize) {
        fontSize = parseInt(savedFontSize);
        changeFontSize('increase');
        fontSize = parseInt(savedFontSize);
    }
    if (savedImageMode) toggleImages(savedImageMode);
    if (savedSpeech === 'true') toggleSpeech('on');
});

// Открытие чата Chatra
function openChat() {
    if (window.Chatra) {
        window.Chatra('openChat', true);
    }
}
