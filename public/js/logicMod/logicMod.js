const alphabetUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const alphabetLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const rot13_range = 13;

const isLetter = (str) => alphabetUpper.includes(str) || alphabetLower.includes(str);

function enrot(text) {
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
                for (let j = 0; j < targetArray.length; j++) {
                    if (targetArray[j] === letter) {
                        newIndex = j + rot13_range;
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