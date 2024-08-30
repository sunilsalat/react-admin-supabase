import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
    const isLoggedIn = true;

    if (!isLoggedIn) {
        return <div>Not logged In</div>;
    } else {
        return children;
    }
};

export default AuthWrapper;
