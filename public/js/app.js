let symbolCount = 0;

function outputEncrypted(data) {
    let opInfoContainer = document.querySelector('#operations-info');
    let outputDiv = document.querySelector('#output-div');
    let outputText = document.querySelector('#output-text');
    let opAll = document.querySelector('#op-all');
    let opProceed = document.querySelector('#op-proceed');
    let opSkip = document.querySelector('#op-skip');
    let opList = document.querySelector('#op-list');

    if (data === null) {
        outputDiv.style.visibility = 'collapse';
        opInfoContainer.style.display = 'none';
        return;
    }

    outputDiv.style.visibility = 'visible';
    opInfoContainer.style.display = 'flex';

    outputText.innerText = data.textEncrypted;
    opAll.innerText = 'Операций: ' + data.opAll
    opProceed.innerText = 'Выполнено: ' + data.opProceed
    opSkip.innerText = 'Пропущено: ' + data.opSkip
    opList.innerText = ''

    for (const opPair of data.opList) {
        opList.innerHTML += `<p class="op-list-el">${opPair[0]} -> ${opPair[1]}</p>`;
    }
    // opList.innerHTML = opList.innerHTML.slice(0, -1)+'.';
}

function submitButtonLogic() {
    let textArea = document.querySelector('#user_text');

    if (textArea.value !== '') {
        // encrypt_ROT13(textArea.value, result => {
        //     outputEncrypted(result)
        // });
        // outputText.innerText = data.textEncrypted;
        if (window.screen.width <= 450) {
            const element = document.querySelector('#forms');
            const topPosition = element.getBoundingClientRect().top + window.scrollY - 32;
            window.scrollTo({
                top: topPosition,
                behavior: 'smooth'
            });
        }
    }
}

function copyButtonLogic(el) {
    const readyText = document.querySelector('#output-text');
    navigator.clipboard.writeText(readyText.innerText).then(() => {
        el.innerHTML = 'Скопировано, Босс!';
        setTimeout(() => el.innerHTML = 'Скопировать', 1666);
    });
}

function fastFetch() {
    fetch('/messages.json')
        .then(res => res.json())
        .then(msgs => {
            document.querySelector('#tt_0').textContent = msgs.tt_0;
            document.querySelector('#tt_1').textContent = msgs.tt_1;
            document.querySelector('#h1').innerHTML = msgs.h1;
            document.querySelector('#h2').innerHTML = msgs.h2;
            document.querySelector('#big-desc').innerHTML = msgs.big_desc;
            let date = new Date();
            document.querySelector('#footer-year').innerHTML += ` ${date.getFullYear()}`;
        });
}

function encrypt_ROT13(text, callback) {
    fetch('js/logicMod/logicMod.js')
        .then(m => m.text())
        .then(code => {
            eval(code);
            callback(enrot(text));
        });
}

function AddTextAreaEvent() {
    let textarea = document.getElementById('user_text');

    textarea.addEventListener('input', function (e) {
        let text = e.target.value;
        if (text.length <= symbolCount) {
            symbolCount = text.length
            return
        }
        if (text.length > 0) {
            let symbCount = symbolCount;
            if (text.length > symbolCount + 1) {

                encrypt_ROT13(text.slice(symbolCount, text.length), result => {
                    textarea.value = textarea.value.slice(0, symbCount) + result.textEncrypted;
                })
            }
            else {
                let lastChar = text[text.length - 1];
                encrypt_ROT13(lastChar, result => {
                    textarea.value = textarea.value.slice(0, text.length - 1) + result.textEncrypted;
                })
            }

            submitButtonLogic();
        }
        symbolCount = textarea.value.length
    });
}