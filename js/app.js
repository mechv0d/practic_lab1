const alphabetUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const alphabetLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const rot13_range = 13;

const isLetter = (str) => alphabetUpper.includes(str) || alphabetLower.includes(str);

function encrypt_ROT13(text) {
    let newText = '';

    for (let i = 0; i < text.length; i++) {
        let letter = text[i];

        if (!isLetter(letter)) {
            newText += letter;
            continue;
        }
        let targetArray = alphabetLower.includes(letter) ? alphabetLower : alphabetUpper;

        if (targetArray.includes(letter)) {
            let newIndex = targetArray.indexOf(letter) + rot13_range;
            if (newIndex >= targetArray.length) newIndex -= targetArray.length;
            newText += targetArray[newIndex];
        }
    }

    return newText;
}