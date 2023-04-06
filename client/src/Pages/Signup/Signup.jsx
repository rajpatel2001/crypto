import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './signup.scss';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser, signupImage } from '../../Config/api';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Signup = () => {
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(registerUser, user);
            if (data.success === true) {
                navigate('/login');
            } else {
                toast.error(data.message, {
                    position: "top-center"
                })
            }
        } catch (e) {
            toast.error("Something went wrong", {
                position: "top-center"
            })
            console.log(e);
        }

    }

    return (
        <div className="signupPage">
            <Navbar />
            <div className="mainContainer">
                <div className="signupleft">
                    <img src={signupImage} alt="" />
                </div>
                <div className="signupright">

                    <h1 className="title">
                        Sign Up
                    </h1>
                    <form action="">
                        <div className="formItem">
                            <label htmlFor="emailid">
                                Email
                            </label>
                            <br />
                            <input id="emailid" type="email" placeholder="Enter Your Email" onChange={(e) => {
                                const uname = e.target.value.split("@")[0];
                                setUser({ ...user, email: e.target.value, username: uname });
                            }} />
                        </div>
                        <div className="formItem">
                            <label htmlFor="password">
                                Password
                            </label>
                            <br />
                            <input id="password" type="password" placeholder="Enter Your Password" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                        </div>
                        <span>
                            Atleast 8 Character with Uppercase, Lowercase Letters, Numbers and Special Characters.
                        </span>
                        <div className="formItem">
                            <label htmlFor="cpassword">
                                Confirm Password
                            </label>
                            <br />
                            <input id="cpassword" type="password" placeholder="Confirm Password" onChange={(e) => { setUser({ ...user, cpassword: e.target.value }) }} />
                        </div>

                        <button onClick={(e) => handleSignup(e)}>
                            Sign Up
                        </button>
                    </form>
                    <NavLink to="/login">
                        Already have an Account? <span>Log In!</span>
                    </NavLink>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default Signup