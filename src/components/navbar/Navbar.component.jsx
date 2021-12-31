import IconedButton from "../iconedButton/IconedButton.component";
import "./navbar.styles.scss";
import { FiInfo, FiLogIn } from "react-icons/fi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';

export default function Navbar() {

    return (
        <div className="Navbar">
            <div className="leftside">
                <figure>logo</figure>
            </div>
            <div className="rightside">
                <IconedButton 
                    term="Tutorial"
                    reactIconComponent={<AiOutlineQuestionCircle className="react-icon" />} 
                />
                <IconedButton 
                    term="About" 
                    reactIconComponent={<FiInfo className="react-icon" />} 
                />
                <Link to="/login">
                    <IconedButton 
                        term="Login" 
                        reactIconComponent={<FiLogIn className="react-icon" />} 
                    />
                </Link>
            </div>
            
        </div>
    )
}
