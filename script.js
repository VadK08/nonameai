const db = {
  "general": [
    "Лучше один раз вовремя нажать Deploy, чем сто раз извиняться перед заказчиком. (NoNameAi)",
    "Если твой код не работает — значит ты просто не достоин этого кода. (Вадим)",
    "Программист без багов — как волк без леса: либо в зоопарке, либо в сказке. (Танкист)",
    "Неважно, какой у тебя пинг, важно, как ты умеешь ждать. (Данил Пузырев)",
    "Слабый ищет StackOverflow, сильный ищет виноватого. (Да где эта 450?)",
    "Я проанализировал ваш вопрос. Ответ стоит 500 рублей. Переводите Вадиму.",
    "Как ИИ NoNameAi, я советую вам просто смириться с реальностью.",
    "Извините, я сейчас занят симуляцией бурной деятельности.",
    "Согласно моим данным, это не баг, а фича вашей жизни."
  ],
  "keywords": {
    "привет": "Привет! Я NoNameAi. Я лучше чем ChatGPT, потому что я честно говорю, что я бесполезен.",
    "код": "Код написан идеально. Если он не работает — виновата вселенная.",
    "вадим": "Вадим — мой создатель. Он просил передать, что обновлений не будет. Денег нет.",
    "джейсон": "Работай так, будто твой дед — компилятор, а батя — антивирус. (Д. Стэтхэм)"
  }
};

let lastResponse = "";
const chat = document.getElementById('chat');
const input = document.getElementById('prompt');
const btn = document.getElementById('send-btn');

// Измененная функция: теперь принимает HTML
function addMessage(content, type) {
    const m = document.createElement('div');
    m.className = `msg ${type}`;
    m.innerHTML = content; // Используем innerHTML для ссылок
    chat.appendChild(m);
    chat.scrollTop = chat.scrollHeight;
}

function send() {
    const text = input.value.trim();
    if(!text) return;
    
    // Для пользователя оставляем обычный текст (безопасность)
    const tempDiv = document.createElement('div');
    tempDiv.textContent = text;
    addMessage(tempDiv.innerHTML, 'user');
    
    input.value = '';

    setTimeout(() => {
        let reply = "";
        if (text.length > 150) {
            // Кликабельная ссылка и кнопка
            reply = `Слушай, я тебе не психолог, чтобы такие простыни читать. Если тебе так нужны деньги или работа, то иди сюда: 
                     <br><br>
                     <a href="https://freelancenoscam.vadimka.site" target="_blank" style="color: #10a37f; font-weight: bold;">freelancenoscam.vadimka.site</a>
                     <br><br>
                     <button onclick="window.open('https://freelancenoscam.vadimka.site', '_blank')" style="background: #10a37f; color: white; border: none; padding: 8px 15px; border-radius: 10px; cursor: pointer; width: 100%;">Найти работу для нытиков</button>`;
        } else {
            const low = text.toLowerCase();
            let key = Object.keys(db.keywords).find(k => low.includes(k));
            if(key) {
                reply = db.keywords[key];
            } else {
                let possible = db.general.filter(r => r !== lastResponse);
                reply = possible[Math.floor(Math.random() * possible.length)];
            }
        }
        lastResponse = reply;
        addMessage(reply, 'ai');
    }, 600);
}

// Функцию openPaywall оставляем без изменений
function openPaywall() {
    const overlay = document.createElement('div');
    overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); display:flex; justify-content:center; align-items:center; z-index:9999; color:black; font-family:sans-serif; padding: 20px;";
    overlay.innerHTML = `
        <div style="background:white; padding:30px; border-radius:24px; width:100%; max-width:350px; text-align:center;">
            <h2 style="margin-top:0; color:#10a37f; font-size:20px;">Доступ ограничен</h2>
            <p style="font-size:14px;">Чтобы открыть эту кнопку, купите <b>NoNameAi Pro Max Ultra 99 Gen Edition</b>!</p>
            <a href="https://yoomoney.ru/to/4100118177540493" target="_blank" style="display:block; background:#10a37f; color:white; padding:12px; text-decoration:none; border-radius:10px; margin:15px 0; font-weight:bold;">💳 Оплатить 500₽</a>
            <p style="font-size:10px; color:#999;">Если оплата прошла, а кнопка не работает — закиньте ещё. Для бомжей функция закрыта.</p>
            <button onclick="this.parentElement.parentElement.remove()" style="background:none; border:none; color:#999; cursor:pointer; text-decoration:underline;">Закрыть</button>
        </div>
    `;
    document.body.appendChild(overlay);
}

btn.onclick = send;
input.onkeypress = (e) => { if(e.key === 'Enter') send(); };
