import IconedButton from "../iconedButton/IconedButton.component";
import "./navbar.styles.scss";
import { FiInfo, FiLogIn } from "react-icons/fi";
import { AiOutlineQuestionCircle, AiOutlineHome } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { isAuthAction } from "../../store/actions/actions";

export default function Navbar() {

    const dispatch = useDispatch();
    const statesObject = useSelector((state) => {
        return {isAuth: state.isAuth};
    })

    const logout = async () => {
        try {
            await signOut(auth);
            dispatch(isAuthAction(false));
        } catch(err) {
            console.log(err.message);
        }
    }

    return (
        <div className="Navbar">
            <div className="leftside">
                <figure className="logo">logo</figure>
                <Link to="/home">
                    <IconedButton
                        myStyle={{fontSize: "2vmin"}}
                        reactIconComponent={<AiOutlineHome className="react-icon" style={{fontSize: "3vmin"}} />} 
                    />
                </Link>
            </div>
            <div className="rightside">
                <IconedButton
                    myStyle={{fontSize: "2vmin"}}
                    term="Tutorial"
                    reactIconComponent={<AiOutlineQuestionCircle className="react-icon" />} 
                />
                <IconedButton 
                    myStyle={{fontSize: "2vmin"}}
                    term="About" 
                    reactIconComponent={<FiInfo className="react-icon" />} 
                />
                <Link to={statesObject.isAuth ? "/home" : "login"} >
                    <IconedButton
                        myStyle={{fontSize: "2vmin"}}
                        onClick={logout}
                        term={statesObject.isAuth ? "Logout" : "Login"} 
                        reactIconComponent={<FiLogIn className="react-icon" />} 
                    />
                </Link>
            </div>
            
        </div>
    )
}
