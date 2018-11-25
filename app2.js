const fs = require('fs');

const dictionaryPath = './WebstersEnglishDictionary/dictionary_compact.json';
let dictionaryString = '';

const run = () => {
    let dictionary = JSON.parse(dictionaryString);
    let usedWords = [];
    let lastWord = '';

    process.stdin
        .setEncoding('utf-8')
        .on('data', (data) => {
            let word = data.trim();

            if (word === 'close') {
                process.exit(0);
            }

            if (lastWord && word.charAt(0) !== lastWord.charAt(lastWord.length - 1)) {
                process.stdout.write('wrong word. \r\n Try again: ');
            }
            else {

                if (dictionary.hasOwnProperty(word)) {
                    if (usedWords.some((w) => w === word)) {
                        process.stdout.write('word is already used \r\n Try again: ');
                    }
                    else {
                        let lastLetter = word.charAt(word.length - 1);

                        for (w in dictionary) {
                            if (
                                w.charAt(0) === lastLetter &&
                                !usedWords.some((uw) => uw === w)
                            ) {
                                answer = w;
                                break;
                            }
                        }

                        usedWords.push(word);
                        usedWords.push(answer);
                        lastWord = answer;

                        process.stdout.write(
                            `\x1b[31m${word}:\x1b[0m ${dictionary[word]}
                            \r\n\x1b[31m${answer}:\x1b[0m ${dictionary[answer]}
                            \r\n\x1b[32mYour turn:\x1b[0m `
                        );

                        // process.stdout.write(
                        //     word + ': ' + dictionary[word] + '\r\n\n' +
                        //     answer + ': ' + dictionary[answer] +
                        //     ' \r\n\n Your turn: '
                        // );
                    }
                }
                else {
                    process.stdout.write('wrong word. \r\n Try again: ');
                }
            }

        });
}

fs
    .createReadStream(dictionaryPath)
    .setEncoding('utf-8')
    .on('end', () => {
        console.log("end");
    })
    .on('error', (err) => {
        console.error("err", err);
    })
    .on('close', () => {
        run();
    })
    .on('data', (chunk) => {
        dictionaryString += chunk;
    });



// Reset = "\x1b[0m"
// Bright = "\x1b[1m"
// Dim = "\x1b[2m"
// Underscore = "\x1b[4m"
// Blink = "\x1b[5m"
// Reverse = "\x1b[7m"
// Hidden = "\x1b[8m"

// FgBlack = "\x1b[30m"
// FgRed = "\x1b[31m"
// FgGreen = "\x1b[32m"
// FgYellow = "\x1b[33m"
// FgBlue = "\x1b[34m"
// FgMagenta = "\x1b[35m"
// FgCyan = "\x1b[36m"
// FgWhite = "\x1b[37m"

// BgBlack = "\x1b[40m"
// BgRed = "\x1b[41m"
// BgGreen = "\x1b[42m"
// BgYellow = "\x1b[43m"
// BgBlue = "\x1b[44m"
// BgMagenta = "\x1b[45m"
// BgCyan = "\x1b[46m"
// BgWhite = "\x1b[47m"

