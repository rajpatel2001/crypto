import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './reset.scss';
import 'react-toastify/dist/ReactToastify.css';
import { loginImage, resetPasswordApi, resetTokenVerify } from '../../Config/api';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Reset = () => {
    const [resetPassword, setResetPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [userId, setUserId] = useState("");
    const [tokenVerified, setTokenVerified] = useState(false);
    const [tokenErrorMsg, setTokenErrorMsg] = useState("Wait For a Moment ... ");

    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("reset_password_token");

        const checkToken = async (token) => {
            try {
                const res = await axios.post(resetTokenVerify, { token });

                if (res?.data.success === true) {
                    setTokenVerified(true);
                    setUserId(res.data.userId);
                } else {
                    setTokenVerified(false);
                    setTokenErrorMsg(res.data.message);
                }
            } catch (e) {
                setTokenVerified(false);
                setTokenErrorMsg("Something Went Wrong");
            }
        }
        checkToken(token);
    }, []);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.put(resetPasswordApi, { resetPassword, retypePassword, userId });
            if (data.success === true) {
                toast.success(data.message, {
                    position: "top-center"
                });
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } else {
                toast.error(data.message, {
                    position: "top-center"
                })
            }
        } catch (e) {
            toast.error("Password Reset Failed", {
                position: "top-center"
            })
            console.log(e);
        }
    }

    return (
        <div className="resetPage">
            <Navbar />
            {
                tokenVerified ?
                    (
                        <div className="mainContainer">
                            <div className="loginleft">
                                <img src={loginImage} alt="" />
                            </div>
                            <div className="loginright">
                                <h1 className="title">
                                    Reset Password
                                </h1>
                                <p>
                                    Enter Your New Password
                                </p>
                                <form action="">
                                    <div className="formItem">
                                        <label htmlFor="resetPassword">
                                            Password
                                        </label>
                                        <br />
                                        <input id="resetPassword" type="password" placeholder="New Password" onChange={(e) => setResetPassword(e.target.value)} />
                                    </div>
                                    <div className="formItem">
                                        <label htmlFor="retypePassword">
                                            ReType Password
                                        </label>
                                        <br />
                                        <input id="retypePassword" type="password" placeholder="ReType New Password" onChange={(e) => setRetypePassword(e.target.value)} />
                                    </div>
                                    <button onClick={(e) => handleResetPassword(e)}>
                                        Change Password
                                    </button>
                                </form>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="mainContainer" style={{ justifyContent: "center", height: "300px", color: "white" }}>
                            <h1 className="tokenError">
                                {tokenErrorMsg}
                            </h1>
                        </div>
                    )
            }
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default Reset