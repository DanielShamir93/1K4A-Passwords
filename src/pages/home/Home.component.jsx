import { withRouter } from "react-router-dom";
import { FcPlus } from "react-icons/fc";
import { HiMinusCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import CreateAccount from "../../components/createAccount/CreateAccount.component";
import "./home.styles.scss";
import { db } from "../../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const accountsCollectionRef = collection(db, "accounts");
  const [accounts, setAccounts] = useState([]);
  const [isCreateAccount, setIsCreateAccount] = useState(false);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const data = await getDocs(accountsCollectionRef);
        setAccounts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        console.log(err.message);
      }
    };
    getAccounts();
  }, [accountsCollectionRef]);

  const renderAccounts = () => {
    return accounts.map((account) => {
      return (
        <div className="account" key={account.id}>
          <h1>Name: {account.name}</h1>
          <h2>publicKey: {account.publicKey}</h2>
        </div>
      );
    });
  };

  return (
    <div className="Home">
      <div className="home-layout">
        <div className="toolbar">
          {isCreateAccount ? (
            <HiMinusCircle
              className="create-account-icon"
              onClick={() => {
                setIsCreateAccount(!isCreateAccount);
              }}
            />
          ) : (
            <FcPlus
              className="create-account-icon"
              onClick={() => {
                setIsCreateAccount(!isCreateAccount);
              }}
            />
          )}
        </div>
        <div className="accounts-gallery">{renderAccounts()}</div>
      </div>
      {isCreateAccount && (
        <CreateAccount collectionRef={accountsCollectionRef} />
      )}
    </div>
  );
};

export default withRouter(Home);
