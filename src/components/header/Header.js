import "./Header.css";

const Header = () => {
    return (
        <div className="header">
            <div className="left">
                <img src="https://cdn-icons-png.flaticon.com/512/2986/2986347.png"
                    alt="resume-logo" className="logo" />
                <h5>
                    <span>RESUME</span>
                    <span>BUILDER</span>
                </h5>
            </div>

            <div className="right">
                <ul>
                    <li >HOME</li>
                    <li>ABOUT</li>
                    <li>CREATE RESUME</li>
                    <li>CONTACT US</li>
                    <li className="selected">LOGIN</li>
                </ul>
            </div>
        </div>
    )
}

export default Header;
