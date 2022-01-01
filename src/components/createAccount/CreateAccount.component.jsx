import "./create-account.styles.scss";
import { useState } from "react";
import { addDoc } from "firebase/firestore";
import hash from "object-hash";

import Password from "../../modules/Password";

export default function CreateAccount({ collectionRef }) {
  const [name, setName] = useState("");
  const [privateKey, setPrivateKey] = useState("");


  const createAccount = async () => {
    try {
    //   console.log(privateKey);
    //   const publicKey = Math.random();
    //   const hashedPrivateKey = hash(privateKey);
    //   const hashedPublicKey = hash(publicKey);
    //   const password = hash({ hashedPrivateKey, hashedPublicKey });

        const password = new Password(privateKey, 'wow');
        password.setKeyboard({avoidChars: '', isIncludeDigits: true, isIncludeUpperCase: true, isIncludeLowerCase: true, isIncludeSymbols: true, mustIncludeChars: ''})
        password.generate({PassLength: 10, PassStartsWith: '', PassEndsWidth: ''})
        // console.log(password.get())

    //   console.log(password)
      // await addDoc(collectionRef, {name, publicKey: privateKey});
    } catch (err) {
      console.log(err.massage);
    }
  };

  return (
    <div className="CreateAccount">
      <form className="create-account-form">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <input
          type="text"
          placeholder="Private Key"
          onChange={(e) => {
            setPrivateKey(e.target.value);
          }}
          value={privateKey}
        />
        <button type="button" onClick={createAccount}>
          Submit
        </button>
      </form>
    </div>
  );
}
