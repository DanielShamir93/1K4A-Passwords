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
        // const { docs } = await getDocs(accountsCollectionRef);
        // setAccounts(docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        console.log(err.message);
      }
    };
    getAccounts();
  }, []);

  const renderAccounts = () => {
    return accounts.map((account) => {
      return (
        <div className="account" key={account.id}>
          <h2>Name: {account.accountName}</h2>
          <h3>Subname: {account.accountSubname}</h3>
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
              style={{color: "#9e2c2c"}}
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
        <CreateAccount />
      )}
    </div>
  );
};

export default withRouter(Home);
