import "./header.scss";
import React from 'react'
import { homeImage } from "../../Config/api";

const Header = () => {
    return (
        <div className="header">
            <div className="left">
                <h1 className="title">
                    {/* Check Today's Crypto Currency Prices By Market Cap */}
                    {/* Start Trading Crypto Currency Easily */}
                    Check Today's Crypto Currency News By NewsData.IO
                </h1>
                <p className="desc">
                    True Choice For Your Investment Plan. Check Price, Set Price Alerts and Get Notified.
                </p>
                {/* <p className="desc">
                    The Global Crypto Market cap is <span>$2.05T</span>, a <span>2.35%</span> descrease over the last day.
                </p> */}
                <a href="#topNews">
                    <button>
                        Check Now
                    </button>
                </a>
            </div>
            <div className="right">
                <div className="imgContainer">
                    <img src={homeImage} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Header;