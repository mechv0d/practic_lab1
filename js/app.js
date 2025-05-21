const alphabetUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const alphabetLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const rot13_range = 13;

const isLetter = (str) => alphabetUpper.includes(str) || alphabetLower.includes(str);

function encrypt_ROT13(text) {
    let l_proceed = 0;
    let l_skipped = 0;
    let l_ops = [];
    let newText = '';

    for (let i = 0; i < text.length; i++) {
        let letter = text[i];

        if (!isLetter(letter)) {
            newText += letter;
            l_skipped++;
        } else {
            let targetArray = alphabetLower.includes(letter) ? alphabetLower : alphabetUpper;

            if (targetArray.includes(letter)) {
                let newIndex = 0
                for (let i = 0; i < targetArray.length; i++) {
                    if (targetArray[i] === letter) {
                        newIndex = i + rot13_range;
                        break;
                    }
                }

                if (newIndex >= targetArray.length) newIndex -= targetArray.length;
                let newLetter = targetArray[newIndex];
                newText += newLetter;

                l_proceed++;
                l_ops.push([letter, newLetter])
            }
        }

    }

    return {
        textEncrypted: newText,
        opAll: l_proceed + l_skipped,
        opProceed: l_proceed,
        opSkip: l_skipped,
        opList: l_ops
    };
}

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
        let data = encrypt_ROT13(textArea.value);
        outputEncrypted(data)

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