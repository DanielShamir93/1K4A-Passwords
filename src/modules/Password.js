import hash from "object-hash";

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

        this.password += PassStartsWith;
        this.setPasswordByFormula(passwordLength);
        this.password += PassEndsWidth;
    }

    generateFromPattern = (pattern) => {
        const matchesArray = pattern.match(/.*?\\d{\d+}|.*?\u{\d+}|.*?\\l{\d+}|.*?\\s{\d+}|.+$/g);
        matchesArray.forEach((match) => {
            let modifier = "";
            let modifierAmount = 0;
            if ((modifier = /\\d{\d+}$/.exec(match)) !== null) {
                // match a number modifier
                this.password += /.*(?=\\d)/.exec(match).join('');
                modifierAmount = modifier[0].replace(/[^\d]/g, '');
                this.keyboard = ['0','1','2','3','4','5','6','7','8','9'];
                this.setPasswordByFormula(modifierAmount);
            } else if ((modifier = /\u{\d+}$/.exec(match)) !== null) {
                // match a uppercase modifier
                this.password += /.+(?=\\u)/.exec(match).join('');
                modifierAmount = modifier[0].replace(/[^\d]/g, '');
                this.keyboard = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                this.setPasswordByFormula(modifierAmount);
            } else if ((modifier = /\\l{\d+}$/.exec(match)) !== null) {
                // match a lowercase modifier
                this.password += /.+(?=\\l)/.exec(match).join('');
                modifierAmount = modifier[0].replace(/[^\d]/g, '');
                this.keyboard = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
                this.setPasswordByFormula(modifierAmount);
            } else if ((modifier = /\\s{\d+}$/.exec(match)) !== null) {
                // match symbols modifier
                this.password += /.+(?=\\s)/.exec(match).join('');
                modifierAmount = modifier[0].replace(/[^\d]/g, '');
                this.keyboard = ['!','\\','#','$','%','&',"'",'(',')','*','+',',','-','.','/',':',';','<','=','>','?','@','[',']','^','_',"`",'{','|','}','~','"'];
                this.setPasswordByFormula(modifierAmount);
            } 
        });
        console.log(this.password)

    }

    setPasswordByFormula = (passLength) => {
        const hashedCombineKeys = hash({privateKey: this.privateKey, publicKey: this.publicKey});
        const hashedCombinedKeysSum = Array.from(hashedCombineKeys).reduce((prevVal, currVal) => {
            return prevVal + currVal.charCodeAt(0)}, 0);

        for (let i = 0; i < Math.min(hashedCombineKeys.length, passLength); i++) {
            let keyBoardIndex = (i + hashedCombineKeys[i].charCodeAt(0) + hashedCombinedKeysSum) % this.keyboard.length;
            this.password += this.keyboard[keyBoardIndex];
        };
    }
    
    getPassword = () => {
        return this.password;
    }
}

