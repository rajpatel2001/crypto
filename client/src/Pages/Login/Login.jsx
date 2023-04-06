import axios from 'axios';
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './login.scss';
import 'react-toastify/dist/ReactToastify.css';
import { loginImage, loginUser } from '../../Config/api';
import { userContext } from '../../App';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Login = () => {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const { setUser } = useContext(userContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(loginUser, userData, { withCredentials: true });
            if (data.success === true) {
                // console.log(data);
                setUser(data);
                toast.success(data.message, {
                    position: "top-center"
                });
                setTimeout(() => {
                    navigate('/');
                    // window.location.reload();
                }, 3000);
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
        <div className="loginPage">
            <Navbar />
            <div className="mainContainer">
                <div className="loginleft">
                    <img src={loginImage} alt="" />
                </div>
                <div className="loginright">
                    <h1 className="title">
                        Login
                    </h1>
                    <form action="">
                        <div className="formItem">
                            <label htmlFor="emailid">
                                Email
                            </label>
                            <br />
                            <input id="emailid" type="email" placeholder="Enter Your Email" onChange={(e) => {
                                setUserData({ ...userData, email: e.target.value });
                            }} />
                        </div>
                        <div className="formItem">
                            <label htmlFor="password">
                                Password
                            </label>
                            <br />
                            <input id="password" type="password" placeholder="Enter Your Password" onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }} />
                        </div>
                        <NavLink to="/forgot">
                            Forgot Password?
                        </NavLink>

                        <button onClick={(e) => handleLogin(e)}>
                            Login
                        </button>
                    </form>
                    <NavLink to="/signup">
                        Don't have an Account? <span>Sign up!</span>
                    </NavLink>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default Login