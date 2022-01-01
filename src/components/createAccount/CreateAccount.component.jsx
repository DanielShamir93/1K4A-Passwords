import "./create-account.styles.scss";
import { useState } from "react";
import { addDoc } from "firebase/firestore";
import hash from "object-hash";

import Password from "../../modules/Password";

export default function CreateAccount({ collectionRef }) {
  const [name, setName] = useState("");
  const [isDigitsChecked, setIsDigitsChecked] = useState(true);
  const [isUppercaseChecked, setIsUppercaseChecked] = useState(true);
  const [isLowercaseChecked, setIsLowercaseChecked] = useState(true);
  const [isSymbolsChecked, setIsSymbolsChecked] = useState(true);
  const [PasswordLength, setPasswordLength] = useState(12);
  const [passStartsWith, setPassStartsWith] = useState("");
  const [passEndsWith, setPassEndsWith] = useState("");
  const [passMustInclude, setPassMustInclude] = useState("");
  const [avoidCharsInPass, setAvoidCharsInPass] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const createAccount = async () => {
    try {
        const publicKey = hash(Math.random());
        const password = new Password(privateKey, publicKey);
        password.setKeyboard({avoidChars: avoidCharsInPass, isIncludeDigits: isDigitsChecked, isIncludeUpperCase: isUppercaseChecked, isIncludeLowerCase: isLowercaseChecked, isIncludeSymbols: isSymbolsChecked, mustIncludeChars: passMustInclude})
        password.generate({PassLength: PasswordLength, PassStartsWith: passStartsWith, PassEndsWidth: passEndsWith})
        console.log(password.get())

    //   await addDoc(collectionRef, {name, publicKey: privateKey});
    } catch (err) {
      console.log(err.massage);
    }
  };

  return (
    <div className="CreateAccount">
      <form className="create-account-form">
        <div>
            <input type="text" placeholder="Name" onChange={(e) => {setName(e.target.value);}} value={name} />
        </div>
        <div>
            <input type="checkbox" id="digits" checked={isDigitsChecked} onChange={(e) => {setIsDigitsChecked(e.target.checked);}}/>
            <label htmlFor="digits">Digits</label>
            <input type="checkbox" id="uppercase" checked={isUppercaseChecked} onChange={(e) => {setIsUppercaseChecked(e.target.checked);}}/>
            <label htmlFor="uppercase">Uppercase</label>
            <input type="checkbox" id="lowercase" checked={isLowercaseChecked} onChange={(e) => {setIsLowercaseChecked(e.target.checked);}}/>
            <label htmlFor="lowercase">Lowercase</label>
            <input type="checkbox" id="symbols" checked={isSymbolsChecked} onChange={(e) => {setIsSymbolsChecked(e.target.checked);}}/>
            <label htmlFor="symbols">Symbols</label>
        </div>
        <div>
            <input type="number" placeholder="Password Length" min="1" max="40" onChange={(e) => {setPasswordLength(e.target.value);}} value={PasswordLength}/>
        </div>
        <div>
            <input type="text" placeholder="Password Starts With" onChange={(e) => {setPassStartsWith(e.target.value);}} value={passStartsWith}/>
        </div>
        <div>
            <input type="text" placeholder="Password Ends With" onChange={(e) => {setPassEndsWith(e.target.value);}} value={passEndsWith}/>
        </div>
        <div>
            <input type="text" placeholder="Password Must Contain" onChange={(e) => {setPassMustInclude(e.target.value);}} value={passMustInclude}/>
        </div>
        <div>
            <input type="text" placeholder="Avoid Characters" onChange={(e) => {setAvoidCharsInPass(e.target.value);}} value={avoidCharsInPass}/>
        </div>
        <div>
            <input type="text" placeholder="Private Key" onChange={(e) => { setPrivateKey(e.target.value); }} value={privateKey} />
        </div>
        <button type="button" onClick={createAccount}>
          Submit
        </button>
      </form>
    </div>
  );
}
