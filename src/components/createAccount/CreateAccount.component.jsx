import "./create-account.styles.scss";
import { useState } from "react";
import { addDoc } from "firebase/firestore";

export default function CreateAccount( { collectionRef } ) {

    const [name, setName] = useState("");
    const [publicKey, setPublicKey] = useState("");

    const createAccount = async () => {
        try {
            await addDoc(collectionRef, {name, publicKey});
        } catch(err) {
            console.log(err.massage);
        }
    }

    return (
        <div className="CreateAccount">
            <form className="create-account-form">
                <input 
                    type="text" 
                    placeholder="Name"
                    onChange={(e) => {setName(e.target.value)}}
                    value={name}
                />
                <input 
                    type="text" 
                    placeholder="Private Key"
                    onChange={(e) => {setPublicKey(e.target.value)}}
                    value={publicKey}
                />
                <button type="button" onClick={createAccount}>Submit</button>
            </form>
        </div>
    )
}
