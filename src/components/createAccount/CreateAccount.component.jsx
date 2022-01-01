import "./create-account.styles.scss";
import { useState, usEffect } from "react";
import { addDoc } from "firebase/firestore";
import hash from "object-hash";
import ToggleButtonsMultiple from "../toggleButtonsMultiple/ToggleButtonsMultiple.component";
import Password from "../../modules/Password";

export default function CreateAccount({ collectionRef }) {
  const [name, setName] = useState("");
  const [isChecked, setIsChecked] = useState({
    isDigitsChecked: true,
    isUppercaseChecked: true,
    isLowercaseChecked: true,
    isSymbolsChecked: true,
  });
  const [PasswordLength, setPasswordLength] = useState(12);
  const [passStartsWith, setPassStartsWith] = useState("");
  const [passEndsWith, setPassEndsWith] = useState("");
  const [passMustInclude, setPassMustInclude] = useState("");
  const [avoidCharsInPass, setAvoidCharsInPass] = useState("");
  const [passPattern, setPassPattern] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const createAccount = async () => {
    try {

      if (passPattern.length > 0) {
        const publicKey = hash(Math.random());
        const password = new Password(privateKey, publicKey);
        password.setKeyboard({avoidChars: avoidCharsInPass, isIncludeDigits: isChecked.isDigitsChecked, isIncludeUpperCase: isChecked.isUppercaseChecked, isIncludeLowerCase: isChecked.isLowercaseChecked, isIncludeSymbols: isChecked.isSymbolsChecked, mustIncludeChars: passMustInclude})
        password.generateFromPattern(passPattern);

      }

      // const publicKey = hash(Math.random());
      // const password = new Password(privateKey, publicKey);
      // password.setKeyboard({avoidChars: avoidCharsInPass, isIncludeDigits: isDigitsChecked, isIncludeUpperCase: isUppercaseChecked, isIncludeLowerCase: isLowercaseChecked, isIncludeSymbols: isSymbolsChecked, mustIncludeChars: passMustInclude})
      // password.generate({PassLength: PasswordLength, PassStartsWith: passStartsWith, PassEndsWidth: passEndsWith})
      // console.log(password.get())
      //   await addDoc(collectionRef, {name, publicKey: privateKey});
    } catch (err) {
      console.log(err.massage);
    }
  };

  const setCheckbox = (checkboxElement, statePropertyName) => {
    const cloneIsChecked = { ...isChecked };
    cloneIsChecked[statePropertyName] = checkboxElement.checked;
    setIsChecked(cloneIsChecked);
  };

  return (
    <div className="CreateAccount">
      <form className="create-account-form">
        <div>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </div>
        <div>
          <ToggleButtonsMultiple
            setCheckbox={setCheckbox}
            isChecked={isChecked}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Password Length"
            min="1"
            max="40"
            onChange={(e) => {
              setPasswordLength(e.target.value);
            }}
            value={PasswordLength}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Starts With"
            onChange={(e) => {
              setPassStartsWith(e.target.value);
            }}
            value={passStartsWith}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Ends With"
            onChange={(e) => {
              setPassEndsWith(e.target.value);
            }}
            value={passEndsWith}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Must Contain"
            onChange={(e) => {
              setPassMustInclude(e.target.value);
            }}
            value={passMustInclude}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Avoid Characters"
            onChange={(e) => {
              setAvoidCharsInPass(e.target.value);
            }}
            value={avoidCharsInPass}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Pattern"
            onChange={(e) => {
              setPassPattern(e.target.value);
            }}
            value={passPattern}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Private Key"
            onChange={(e) => {
              setPrivateKey(e.target.value);
            }}
            value={privateKey}
          />
        </div>
        <button type="button">Generate</button>
        <div>
          <input
            type="text"
            placeholder="Output"
            readOnly
            style={{textAlign: 'center'}}
          />
        </div>
        <button className="submit-button" type="button" onClick={createAccount}>
          Submit
        </button>
      </form>
    </div>
  );
}
