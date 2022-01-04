import { RiFileCopyFill } from "react-icons/ri";
import { useRef, useState } from "react";
import "./account.styles.scss";
import Password from "../../modules/Password";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { accountChangedRenderAction, editAccountAction } from "../../store/actions/actions";

export default function Account({ account, setIsLoading, toggleCreateAccountComponent }) {
  const dispatch = useDispatch();
  const toggleRef = useRef();
  const [privateKey, setPrivateKey] = useState("");
  const [output, setOutput] = useState("");
  const [isMoreDisplayed, setIsMoreDisplayed] = useState(false);

  const toggleDisplay = () => {
    if (!isMoreDisplayed) {
      toggleRef.current.style.display = "flex";
      setIsMoreDisplayed(true);
    } else {
      toggleRef.current.style.display = "none";
      setPrivateKey("");
      setOutput("");
      setIsMoreDisplayed(false);
    }
  };

  const getPassword = () => {
    if (privateKey.length > 0) {
      const password = new Password(privateKey, account.publicKey);
      password.setKeyboard({
        avoidChars: account.passAvoidChars,
        isIncludeDigits: account.isPassHasDigit,
        isIncludeUpperCase: account.isPassHasUppercase,
        isIncludeLowerCase: account.isPassHasLowercase,
        isIncludeSymbols: account.isPassHasSymbol,
        mustIncludeChars: account.passMustContain,
      });
      if (account.passPattern.length > 0) {
        password.generateFromPattern(account.passPattern);
        setOutput(password.getPassword);
      } else {
        password.generate(
          account.passLength,
          account.passStartsWith,
          account.passEndsWith
        );
        setOutput(password.getPassword);
      }
    } else {
      setOutput("Missing Private Key");
    }
  };

  const deleteAccount = async () => {
    try {
      setIsLoading(true);
      await deleteDoc(doc(db, "accounts", account.id));
      dispatch(accountChangedRenderAction());
    } catch(err) {
      console.log(err.message);
    }
  }

  const editAccount = () => {
    dispatch(editAccountAction(account));
    toggleCreateAccountComponent(true);
  }

  const copyPassword = () => {
    console.log('copy')
  }

  return (
    <div className="account">
      <div className="account-names" onClick={toggleDisplay}>
        <p className="account-name">{account.accountName}</p>
        <p className="account-subname">{account.accountSubname}</p>
      </div>
      <div ref={toggleRef} className="account-more">
        <div className="account-more-bar">
          <button className="delete-account-button" onClick={deleteAccount}>Delete</button>
          <button className="edit-account-button" onClick={editAccount}>Edit</button>
        </div>
        <input
          className="private-key-input"
          type="password"
          placeholder="Private Key"
          onChange={(e) => {
            setPrivateKey(e.target.value);
          }}
          value={privateKey}
        />
        <button className="get-password-button" onClick={getPassword}>
          Get Password
        </button>
        <div className="output">
          <input
            className="output-input"
            type="text"
            placeholder="Output"
            value={output}
            readOnly
          />
          <RiFileCopyFill className="copy-button" onClick={copyPassword}/>
        </div>
      </div>
    </div>
  );
}
