import Signup from "../signup/Signup.component";
import "./landing-page.styles.scss";

export default function LandingPage() {
    return (
        <div className="Landing-page">
            <div className="landing-page-left">
                <Signup />
            </div>
            <div className="landing-page-right">
                <div className="text">
                    <p className="text-title">Welcome To 1 Key For All Passwords</p>
                    <p className="text-content">An app for creating and recovering passwords without saving the passwords in any database.</p>
                </div>
                <figure className="image-wrapper"></figure>
            </div>
            
        </div>
    )
}
