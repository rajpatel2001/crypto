import './profile.scss';
import Footer from '../../Components/Footer/Footer';
import Navbar from "../../Components/Navbar/Navbar";
import Subscribe from '../../Components/Subscribe/Subscribe';
import { useContext, useRef, useState } from 'react';
import { userContext } from '../../App';
import { EditOutlined } from '@material-ui/icons';
import { updateUser } from '../../Config/api';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../Firebase';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Profile = () => {
    const { user, setUser } = useContext(userContext);
    const [File, setFile] = useState(null);
    const [avatarUrl, setavatarUrl] = useState(user?.avatar);
    const [loadingImg, setLoadingImg] = useState(false);
    const passwordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const rePasswordRef = useRef(null);

    const updateImg = (e) => {
        const file = e.target.files[0];
        const fileName = new Date().getTime() + file.name;
        setFile(fileName);
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setLoadingImg(true);
                // console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                }
            },
            (error) => {
                toast.error("Image Uploading Failed", {
                    position: "top-center"
                })
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setavatarUrl(downloadURL);
                    setUser({ ...user, avatar: downloadURL });
                    downloadURL &&
                        setTimeout(() => {
                            setLoadingImg(false);
                        }, 3000);
                });
            }
        );
    }

    const updateUserDetails = async (msg) => {
        try {
            const updateUserData = await axios.put(updateUser, user, { withCredentials: true });
            if (updateUserData.data.success === true) {
                setUser(updateUserData.data);
                toast.success(msg, {
                    position: "top-center"
                });
            } else {
                toast.error(updateUserData.data.message, {
                    position: "top-center"
                })
            }
        } catch (e) {
            toast.error("User Updation Failed", {
                position: "top-center"
            })
            console.log(e);
        }
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        updateUserDetails("User Details has been Updated Successfully");
        passwordRef.current.value = null;
        newPasswordRef.current.value = null;
        rePasswordRef.current.value = null;
    }

    const handleUploadImg = async (e) => {
        e.preventDefault();
        setFile("");
        updateUserDetails("Profile Photo has Updated Successfully");
    }

    return (
        <div className="profile">
            <Navbar />
            <div className="profileContainer">
                <h1 className="title">
                    Profile
                </h1>
                <div className="container">
                    <div className="left">
                        <div className="profileUpdate">
                            {
                                loadingImg
                                &&
                                <div className="lds-ripple"><div></div><div></div></div>
                            }
                            <img src={avatarUrl} alt="" />
                            <input style={{ display: "none" }} type="file" id="uploadImg" onChange={updateImg} />
                            <label htmlFor="uploadImg">
                                <EditOutlined className="uploadIcon" />
                            </label>
                        </div>
                        {
                            <span className="error" style={{ color: "gold" }}>
                                {File}
                            </span>
                        }
                        <button className="updateBtn" onClick={(e) => handleUploadImg(e)}>
                            Upload Image
                        </button>
                    </div>
                    <div className="right">
                        <p className="updateTitle">
                            Update Details
                        </p>
                        <form>
                            <div className="userUpdateItem">
                                <label htmlFor="username">
                                    Username
                                </label>
                                <input autoComplete="off" id="username" name="username" type="text" value={user?.username || ""} onChange={(e) => { setUser({ ...user, username: e.target.value }) }} />
                            </div>
                            <div className="userUpdateItem">
                                <label htmlFor="email">
                                    Email
                                </label>
                                <input autoComplete="off" id="email" type="email" value={user?.email || ""} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                            </div>
                            <div className="userUpdateItem">
                                <label htmlFor="currPassword">
                                    Current Password
                                </label>
                                <input ref={passwordRef} placeholder="Enter Current Password" autoComplete="off" id="currPassword" type="password" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                            </div>
                            <div className="userUpdateItem">
                                <label htmlFor="newPassword">
                                    New Password
                                </label>
                                <input ref={newPasswordRef} placeholder="Enter New Passwored" autoComplete="off" id="newPassword" type="password" onChange={(e) => { setUser({ ...user, newPassword: e.target.value }) }} />
                            </div>
                            <div className="userUpdateItem">
                                <label htmlFor="rePassword">
                                    Retype New Password
                                </label>
                                <input ref={rePasswordRef} placeholder="Re-Enter Password" autoComplete="off" id="rePassword" type="password" onChange={(e) => { setUser({ ...user, rePassword: e.target.value }) }} />
                            </div>
                            <button className="updateBtn" onClick={(e) => handleUpdateUser(e)}>
                                Update Details
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Subscribe />
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default Profile