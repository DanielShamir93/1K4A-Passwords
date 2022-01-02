import { RiFileCopyFill } from "react-icons/ri";
import { useRef, useState } from "react";
import "./account.styles.scss";
import Password from "../../modules/Password";

export default function Account({ account }) {
  const toggleRef = useRef();
  const [privateKey, setPrivateKey] = useState("");
  const [output, setOutput] = useState("");

  const toggleDisplay = () => {
    if (toggleRef.current.style.display === "none") {
      toggleRef.current.style.display = "flex";
      toggleRef.current.style.display = "flex";
    } else {
      toggleRef.current.style.display = "none";
      setPrivateKey("");
      setOutput("");
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

  return (
    <div className="account">
      <div className="account-names" onClick={toggleDisplay}>
        <p className="account-name">{account.accountName}</p>
        <p className="account-subname">{account.accountSubname}</p>
      </div>
      <div ref={toggleRef} className="account-more">
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
          <RiFileCopyFill className="copy-button" />
        </div>
      </div>
    </div>
  );
}
