import hash from "object-hash";

// const keyboard = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "!", "\"", "#", "$", "%", "&", "'", "\(", "\)", "*", "+", ",", "-", ",", ".", "/", ":", ";", "<", "=", ">", "?", "@", "\[", "\\", "\]", "^", "_", "`", "\{", "|", "\}", "~"];

export default class Password {

    constructor(privateKey, publicKey) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
        this.password = "";
        this.keyboard = [];
    }

    setKeyboard = ({ avoidChars, isIncludeDigits, isIncludeUpperCase, isIncludeLowerCase, isIncludeSymbols, mustIncludeChars }) => {
        const symbols = "!\\#$%&'()*+,-./:;<=>?@[]^_`{|}~";

        for (let i = 33; i < 127; i++) {
            let char = String.fromCharCode(i);

            if (/[0-9]/.test(char) && !avoidChars.includes(char) && isIncludeDigits) {
                this.keyboard.push(char);
            } else if (/[A-Z]/.test(char) && !avoidChars.includes(char) && isIncludeUpperCase) {
                this.keyboard.push(char);
            } else if (/[a-z]/.test(char) && !avoidChars.includes(char) && isIncludeLowerCase) {
                this.keyboard.push(char);
            } else if (symbols.includes(char) && !avoidChars.includes(char) && isIncludeSymbols) {
                this.keyboard.push(char);
            }
        }

        Array.from(mustIncludeChars).forEach((char) => {
            if (!this.keyboard.includes(char)) {
                this.keyboard.push(char);
            }
        })
    }

    generate = ({ PassLength, PassStartsWith, PassEndsWidth }) => {
        const passwordLength = PassLength - (PassStartsWith.length + PassEndsWidth.length);
        const hashedCombineKeys = hash({privateKey: this.privateKey, publicKey: this.publicKey});

        const hashedCombinedKeysSum = Array.from(hashedCombineKeys).reduce((prevVal, currVal) => {
            return prevVal + currVal.charCodeAt(0)}, 0);

        this.password += PassStartsWith;
        for (let i = 0; i < Math.min(hashedCombineKeys.length, passwordLength); i++) {
            let keyBoardIndex = (i + hashedCombineKeys[i].charCodeAt(0) + hashedCombinedKeysSum) % this.keyboard.length;
            this.password += this.keyboard[keyBoardIndex];
        }
        this.password += PassEndsWidth;
    }
    
    get = () => {
        return this.password;
    }
}

