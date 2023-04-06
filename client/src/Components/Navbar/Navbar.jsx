import "./navbar.scss";
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import { currencyContext, userContext } from "../../App";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { inrImage, logoutUser, usdImage } from "../../Config/api";

const Navbar = () => {
    const { currency, setCurrency } = useContext(currencyContext);
    const { user, setUser } = useContext(userContext);
    const [activeMenu, setActiveMenu] = useState(false);
    const navigate = useNavigate();


    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(logoutUser, { withCredentials: true });
            if (res.data.success === true) {
                setUser(null);
                navigate("/login");
                window.location.reload();
            }
        } catch (e) {
            toast.error("Something went wrong", {
                position: "top-center"
            })
            // console.log(e);
        }
    }

    return (
        <>
            <div className='navbar'>
                <div className="left">
                    <div className="logo">
                        <Link to="/">
                            Crypto<span>Wall</span>
                        </Link>
                    </div>
                    <ul>
                        <li>
                            <Link to="/markets">
                                Markets
                            </Link>
                        </li>
                        <li>
                            <Link to="/news">
                                News
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="right">
                    <div className="r1">
                        {
                            (user !== null)
                                ?
                                (
                                    <ul>
                                        <li>
                                            <Link to="/favourites">
                                                Favourites
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/profile">
                                                <img src={user?.avatar} alt="" />
                                            </Link>
                                        </li>
                                        <li className="logout" onClick={handleLogout}>
                                            Logout
                                        </li>
                                    </ul>
                                )
                                :
                                (<ul>
                                    <li className="login">
                                        <Link to="/login">
                                            Log in
                                        </Link>
                                    </li>
                                    <li className="signup">
                                        <Link to="/signup">
                                            Sign up
                                        </Link>
                                    </li>
                                </ul>
                                )
                        }
                    </div>
                    <div className="r2">
                        <div className="selectBox">
                            <img src={currency === "inr" ? inrImage : usdImage} alt="" />
                            <select name="currency" id="" onChange={(e) => setCurrency(e.target.value)}>
                                <option value="inr" id="inr" defaultValue={currency === "inr"}>
                                    INR
                                </option>
                                <option value="usd" id="usd" defaultValue={currency === "usd"}>
                                    USD
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className={activeMenu ? "active hamburger" : "hamburger"} onClick={() =>
                        setActiveMenu(!activeMenu)
                    }>
                        <div className="line1 line"></div>
                        <div className="line2 line"></div>
                        <div className="line3 line"></div>
                    </div>
                </div>
            </div>
            <div className={activeMenu ? "active menu" : "menu"}>
                <ul>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/markets">
                            Markets
                        </Link>
                    </li>
                    <li>
                        <Link to="/news">
                            News
                        </Link>
                    </li>
                    {
                        (user !== null)
                            ?
                            (<>
                                <li>
                                    <Link to="/favourites">
                                        Favourites
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/profile">
                                        Profile
                                    </Link>
                                </li>
                                <li className="logout" onClick={handleLogout}>
                                    Logout
                                </li>
                            </>
                            )
                            :
                            (
                                <>
                                    <li className="login">
                                        <Link to="/login">
                                            Log in
                                        </Link>
                                    </li>
                                    <li className="signup">
                                        <Link to="/signup">
                                            Sign up
                                        </Link>
                                    </li>
                                </>
                            )
                    }
                </ul>
            </div>
            <ToastContainer />

        </>
    )
}

export default Navbar