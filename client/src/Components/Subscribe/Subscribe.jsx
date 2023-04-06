import { subscribeImage } from '../../Config/api';
import './subscribe.scss';

const Subscribe = () => {
    return (
        <div className="subscribe">
            <div className="left">
                <h1 className="title">
                    Subscribe to Get Crypto News Everyday
                </h1>
                <form action="">
                    <input type="email" placeholder="Your email address" />
                    <button>Subscribe</button>
                </form>
            </div>
            <div className="right">
                <div className="imgContainer">
                    <img src={subscribeImage} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Subscribe;