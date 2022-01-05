import "./create-account.styles.scss";
import "./create-account.styles.mobile.scss";
import { FcUnlock, FcLock, FcKey } from "react-icons/fc";
import { useState, useEffect } from "react";
import hash from "object-hash";
import ToggleButtonsMultiple from "../toggleButtonsMultiple/ToggleButtonsMultiple.component";
import Password from "../../modules/Password";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { accountChangedRenderAction, editAccountAction } from "../../store/actions/actions";

export default function CreateAccount({ toggleCreateAccountComponent, setIsLoading }) {
  const dispatch = useDispatch();
  const [output, setOutput] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountSubname, setAccountSubname] = useState("");
  const [passLength, setPassLength] = useState(12);
  const [passStartsWith, setPassStartsWith] = useState("");
  const [passEndsWith, setPassEndsWith] = useState("");
  const [passMustContain, setPassMustContain] = useState("");
  const [passAvoidChars, setPassAvoidChars] = useState("");
  const [passPattern, setPassPattern] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [isValidAccount, setIsValidAccount] = useState(false);
  const [isChecked, setIsChecked] = useState({
    isDigitsChecked: true,
    isUppercaseChecked: true,
    isLowercaseChecked: true,
    isSymbolsChecked: true,
  });
  const statesObject = useSelector((state) => {
    return {
      editAccount: state.editAccount,
      loggedInUser: state.loggedInUser
    }
  });

  useEffect(() => {
    if (Object.keys(statesObject.editAccount).length > 0) {
      // In edit account mode
      setAccountName(statesObject.editAccount.accountName);
      setAccountSubname(statesObject.editAccount.accountSubname);
      setPassLength(statesObject.editAccount.passLength);
      setPassStartsWith(statesObject.editAccount.passStartsWith);
      setPassEndsWith(statesObject.editAccount.passEndsWith);
      setPassMustContain(statesObject.editAccount.passMustContain);
      setPassAvoidChars(statesObject.editAccount.passAvoidChars);
      setPassPattern(statesObject.editAccount.passPattern);
      setPublicKey(statesObject.editAccount.publicKey);
      setIsChecked({
        isDigitsChecked: statesObject.editAccount.isPassHasDigit,
        isUppercaseChecked: statesObject.editAccount.isPassHasUppercase,
        isLowercaseChecked: statesObject.editAccount.isPassHasLowercase,
        isSymbolsChecked: statesObject.editAccount.isPassHasSymbol
      })
    }
    console.log("useEffect from createAccount");

    return (() => {
      dispatch(editAccountAction({}));
    })

  }, [statesObject.editAccount, dispatch]);

  const createAccount = async () => {
    try {
      if (isValidAccount) {
        setIsLoading(true);
        const currAccount = {
          accountName,
          accountSubname,
          passAvoidChars,
          passEndsWith,
          passLength,
          passMustContain,
          passPattern,
          passStartsWith,
          publicKey,
          isPassHasDigit: isChecked.isDigitsChecked,
          isPassHasUppercase: isChecked.isUppercaseChecked,
          isPassHasLowercase: isChecked.isLowercaseChecked,
          isPassHasSymbol: isChecked.isSymbolsChecked,
        };

        if (Object.keys(statesObject.editAccount).length > 0) {
          // In edit account mode
          await setDoc(doc(db, "users", statesObject.loggedInUser.uid, "accounts", statesObject.editAccount.id), currAccount);
        } else {
          await addDoc(collection(db, "users", statesObject.loggedInUser.uid, "accounts"), currAccount);
        }
        dispatch(accountChangedRenderAction());
        resetCreateAccountForm();
        toggleCreateAccountComponent(false);
      } else {
        setOutput("Must Generate Password")
      }
    } catch (err) {
      console.log(err.massage);
    }
  };

  const resetCreateAccountForm = () => {
    setOutput("");
    setAccountName("");
    setAccountSubname("");
    setPassLength(12);
    setPassStartsWith("");
    setPassEndsWith("");
    setPassMustContain("");
    setPassAvoidChars("");
    setPassPattern("");
    setPrivateKey("");
    setPublicKey("");
    setIsValidAccount(false);
    setIsChecked({
      isDigitsChecked: true,
      isUppercaseChecked: true,
      isLowercaseChecked: true,
      isSymbolsChecked: true,
    });
  };

  const outputPassword = () => {
    if (accountName.length > 0) {
      if (privateKey.length > 0) {
        if (
          isChecked.isDigitsChecked ||
          isChecked.isUppercaseChecked ||
          isChecked.isLowercaseChecked ||
          isChecked.isSymbolsChecked
        ) {
          if (parseInt(passLength) > 0 && parseInt(passLength) < 41) {
            setIsValidAccount(true);
            const hashedPublicKey = hash(Math.random());
            setPublicKey(hashedPublicKey);
            const password = new Password(privateKey, hashedPublicKey);
            password.setKeyboard({
              avoidChars: passAvoidChars,
              isIncludeDigits: isChecked.isDigitsChecked,
              isIncludeUpperCase: isChecked.isUppercaseChecked,
              isIncludeLowerCase: isChecked.isLowercaseChecked,
              isIncludeSymbols: isChecked.isSymbolsChecked,
              mustIncludeChars: passMustContain,
            });

            if (passPattern.length > 0) {
              password.generateFromPattern(passPattern);
              setOutput(password.getPassword);
            } else {
              password.generate(passLength, passStartsWith, passEndsWith);
              setOutput(password.getPassword);
            }
          } else {
            setOutput("Length: Between 1 To 40");
            setIsValidAccount(false);
          }
        } else {
          setOutput("Missing Characters In Keyboard");
          setIsValidAccount(false);
        }
      } else {
        setOutput("Missing: Private Key");
        setIsValidAccount(false);
      }
    } else {
      setOutput("Missing: Account Name");
      setIsValidAccount(false);
    }
  };

  const setCheckbox = (checkboxElement, statePropertyName) => {
    const cloneIsChecked = { ...isChecked };
    cloneIsChecked[statePropertyName] = checkboxElement.checked;
    setIsChecked(cloneIsChecked);
  };

  const setLength = (lengthInputElement) => {
    if (isNaturalNumber(lengthInputElement.value)) {
      setPassLength(lengthInputElement.value);
    } else {
      lengthInputElement.value = parseInt(lengthInputElement.value) || '';
        setPassLength(lengthInputElement.value);
    }
  } 

  const isNaturalNumber = (string) => {
    return /^\d+$(?![^\d])/.test(string);
  }

  return (
    <div className="CreateAccount">
      <div className="create-account-background">
        <form className="create-account-form">
          <div className="create-account-details">
            <fieldset className="account-details">
              <legend>Account Settings</legend>
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
              <legend>Password Settings</legend>
              <div>
                <ToggleButtonsMultiple
                  setCheckbox={setCheckbox}
                  isChecked={isChecked}
                />
              </div>
              <div className="password-length-container">
                <label htmlFor="password-length">Number OF Characters</label>
                <input
                  id="password-length"
                  type="text"
                  onChange={(e) => {
                    setLength(e.target);
                    setOutput("");
                  }}
                  value={passLength}
                />
              </div>
              <div className="password-edges">
                <div>
                  <input
                    type="text"
                    placeholder="Starts With"
                    onChange={(e) => {
                      setPassStartsWith(e.target.value);
                      setOutput("");
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
                      setOutput("");
                    }}
                    value={passEndsWith}
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  disabled
                  placeholder="Must Contain"
                  onChange={(e) => {
                    setPassMustContain(e.target.value);
                    setOutput("");
                  }}
                  value={passMustContain}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Avoid Characters"
                  onChange={(e) => {
                    setPassAvoidChars(e.target.value);
                    setOutput("");
                  }}
                  value={passAvoidChars}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Pattern"
                  onChange={(e) => {
                    setPassPattern(e.target.value);
                    setOutput("");
                  }}
                  value={passPattern}
                />
              </div>
              <div className="private-key">
                <input
                  type="text"
                  placeholder="Private Key"
                  onChange={(e) => {
                    setPrivateKey(e.target.value);
                    setOutput("");
                  }}
                  value={privateKey}
                />
                <FcKey className="private-key-icon"/>
              </div>
              <button
                className="generate-button"
                type="button"
                onClick={outputPassword}
              >
                Generate
              </button>
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
          <div className="submit-container">
            <button
              className="submit-button"
              type="button"
              onClick={createAccount}
              disabled={!isValidAccount || output.length === 0}
            >
              Submit
            </button>
            {isValidAccount && output.length > 0 ? <FcUnlock className="lock-icon"/> : <FcLock className="lock-icon"/>}
          </div>
        </form>
      </div>
    </div>
  );
}
