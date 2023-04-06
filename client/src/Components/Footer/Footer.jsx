import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
    return (
        <div className="footer">
            <div className="hr1"></div>
            <div className="footerContent">
                <div className="left">
                    <h1 className="logo">
                        Crypto<span>Wall</span>
                    </h1>
                    <p className="desc">
                        True Choice for Your Investement Plan
                    </p>
                    <div className="social">
                        <div className="socialIcon">
                            <Facebook className="icon" />
                        </div>
                        <div className="socialIcon">
                            <Instagram className="icon" />
                        </div>
                        <div className="socialIcon">
                            <Twitter className="icon" />
                        </div>
                        <div className="socialIcon">
                            <Pinterest className="icon" />
                        </div>
                    </div>
                </div>
                <div className="center">
                    <h3 className="title">
                        Useful Links
                    </h3>
                    <ul className="list">
                        <li>
                            <Link className="navlink" to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link className="navlink" to="/markets">
                                Markets
                            </Link>
                        </li>
                        <li>
                            <Link className="navlink" to="/news">
                                News
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="right">
                    <h3 className="title">
                        Contact
                    </h3>
                    <div className="contactItem">
                        <Room className="icon" />
                        622 Dixie Path, South Tobinchester 98336
                    </div>
                    <div className="contactItem">
                        <Phone className="icon" />
                        +1 234 567 8901
                    </div>
                    <div className="contactItem">
                        <MailOutline className="icon" />
                        contact@cryptowall.com
                    </div>
                </div>
            </div>
            <div className="hr2"></div>
            <div className="copyright">
                Copyright © 2021 CryptoWall. All rights reserved
            </div>
        </div>
    )
}

export default Footer