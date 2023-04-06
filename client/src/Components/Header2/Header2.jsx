import "./header2.scss";
import React from 'react'
import { marketImage } from "../../Config/api";

const Header2 = () => {
    return (
        <div className="header2">
            <div className="left">
                <h1 className="title">
                    Check Today's Crypto Currency Prices By Market Cap
                    {/* Start Trading Crypto Currency Easily */}
                </h1>
                {/* <p className="desc">
                    True Choice For Your Investment Plan. Check Price, Set Price Alerts and Get Notified.
                </p> */}
                <p className="desc">
                    The Global Crypto Market cap is <span>$2.05T</span>, a <span>2.35%</span> descrease over the last day.
                </p>
                <a href="#coinList">
                    <button>
                        Check Now
                    </button>
                </a>
            </div>
            <div className="right">
                <div className="imgContainer">
                    <img src={marketImage} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Header2;