import "./create-account.styles.scss";
import { useState, usEffect } from "react";
import hash from "object-hash";
import ToggleButtonsMultiple from "../toggleButtonsMultiple/ToggleButtonsMultiple.component";
import Password from "../../modules/Password";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
const accountsCollectionRef = collection(db, "accounts");

export default function CreateAccount() {
  const [output, setOutput] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountSubname, setAccountSubname] = useState("");
  const [passLength, setPassLength] = useState(12);
  const [passStartsWith, setPassStartsWith] = useState("");
  const [passEndsWith, setPassEndsWith] = useState("");
  const [passMustInclude, setPassMustInclude] = useState("");
  const [avoidCharsInPass, setAvoidCharsInPass] = useState("");
  const [passPattern, setPassPattern] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [isChecked, setIsChecked] = useState({
    isDigitsChecked: true,
    isUppercaseChecked: true,
    isLowercaseChecked: true,
    isSymbolsChecked: true,
  });

  const createAccount = async () => {
    try {
      // const publicKey = hash(Math.random());
      // const password = new Password(privateKey, publicKey);
      // password.setKeyboard({avoidChars: avoidCharsInPass, isIncludeDigits: isDigitsChecked, isIncludeUpperCase: isUppercaseChecked, isIncludeLowerCase: isLowercaseChecked, isIncludeSymbols: isSymbolsChecked, mustIncludeChars: passMustInclude})
      // password.generate({PassLength: PasswordLength, PassStartsWith: passStartsWith, PassEndsWidth: passEndsWith})
      // console.log(password.get())
      //   await addDoc(accountsCollectionRef, {name, publicKey: privateKey});
    } catch (err) {
      console.log(err.massage);
    }
  };

  const outputPassword = () => {
    if (accountName.length > 0) {
      if (privateKey.length > 0) {
        if (isChecked.isDigitsChecked || isChecked.isUppercaseChecked || isChecked.isLowercaseChecked || isChecked.isSymbolsChecked) {
          if (parseInt(passLength) > 0 && parseInt(passLength) < 41) {
            const publicKey = hash(Math.random());
            const password = new Password(privateKey, publicKey);

            if (passPattern.length > 0) {
              password.setKeyboard({ avoidChars: avoidCharsInPass, isIncludeDigits: isChecked.isDigitsChecked, isIncludeUpperCase: isChecked.isUppercaseChecked, isIncludeLowerCase: isChecked.isLowercaseChecked, isIncludeSymbols: isChecked.isSymbolsChecked, mustIncludeChars: passMustInclude });
              password.generateFromPattern(passPattern);
              setOutput(password.getPassword);
            } else {
              password.setKeyboard({ avoidChars: avoidCharsInPass, isIncludeDigits: isChecked.isDigitsChecked, isIncludeUpperCase: isChecked.isUppercaseChecked, isIncludeLowerCase: isChecked.isLowercaseChecked, isIncludeSymbols: isChecked.isSymbolsChecked, mustIncludeChars: passMustInclude });
              password.generate(passLength, passStartsWith, passEndsWith);
              setOutput(password.getPassword);
            }
          } else {
            setOutput("Password Length: Between 1 To 40");
          }
        } else {
          setOutput("Missing Keyboard");
        }
      } else {
        setOutput("Missing: Private Key");
      }
    } else {
      setOutput("Missing: Account Name");
    }
  }

  const setCheckbox = (checkboxElement, statePropertyName) => {
    const cloneIsChecked = { ...isChecked };
    cloneIsChecked[statePropertyName] = checkboxElement.checked;
    setIsChecked(cloneIsChecked);
  };

  return (
    <div className="CreateAccount">
      <form className="create-account-form">
        <div className="create-account-details">
          <fieldset className="account-details">
            <legend>Account Settings:</legend>
            <div>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  setAccountName(e.target.value);
                }}
                value={accountName}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Subname"
                onChange={(e) => {
                  setAccountSubname(e.target.value);
                }}
                value={accountSubname}
              />
            </div>
          </fieldset>
          <fieldset className="password-details">
            <legend>Password Settings:</legend>
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
                  setPassLength(e.target.value);
                }}
                value={passLength}
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
            <button className="generate-button" type="button" onClick={outputPassword}>Generate</button>
          </fieldset>
        </div>
        <div>
          <input
            className="output"
            type="text"
            placeholder="Output"
            value={output}
            readOnly
          />
        </div>
        <button className="submit-button" type="button" onClick={createAccount}>Submit</button>
      </form>
    </div>
  );
}
