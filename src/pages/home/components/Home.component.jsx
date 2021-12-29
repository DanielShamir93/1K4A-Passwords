import { withRouter } from "react-router-dom";
import LogoutButton from "./../../../components/LogoutButton.component";

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <LogoutButton />
        </div>
    )
}

export default withRouter(Home);