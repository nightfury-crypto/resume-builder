import "./LoginComp.css";
import GoogleIcon from '@mui/icons-material/Google';

const LoginComp = ({ signIn, fbsignin }) => {


    return (
        <div className="notloggedin">
            {/* <a href="https://storyset.com/online">Online illustrations by Storyset</a> */}
            <img src="/images/Login.gif" alt="loginpng" />
            <span>
                {/* Google sign in */}
                
                <button onClick={signIn}><GoogleIcon /><span>Sign in with Google</span></button>
                {/* Google sign in */}
                {/* <button onClick={fbsignin}><GoogleIcon /><span>Sign in with Facebook</span></button> */}
            </span>
        </div>
    )
}

export default LoginComp;
