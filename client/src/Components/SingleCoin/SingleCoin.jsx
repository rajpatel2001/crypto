import { Favorite, InfoOutlined } from '@material-ui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addCoinList, SingleCoinDetails } from '../../Config/api';
import Chart from '../../Components/Chart/Chart';
import Loader from '../Loader/Loader';
import InnerHTML from 'dangerously-set-html-content';
import './singlecoin.scss';
import { currencyContext, userContext } from '../../App';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const SingleCoin = () => {
    const [timeper, setTimePer] = useState("24h");
    const [currCoin, setCurrCoin] = useState([]);
    const [desc, setDesc] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isFav, setIsFav] = useState(false);
    const { currency } = useContext(currencyContext);
    let { user, favCoins, setFavCoins } = useContext(userContext);
    const location = useLocation();
    const navigate = useNavigate();

    const coinId = location.pathname.split("/")[2];

    const findCoinDetails = async () => {
        setIsLoading(true);
        const { data } = await axios.get(SingleCoinDetails(coinId, currency));
        setCurrCoin(data);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    const addToFav = async (id) => {
        if (!user) {
            navigate("/login");
            return;
        }
        if (favCoins.includes(id)) {
            toast.warn("Coin Already in Your List", {
                position: "top-center"
            });
        } else {
            favCoins.push(id);
            try {
                const { data } = await axios.post(addCoinList, { coinList: favCoins }, { withCredentials: true });
                setIsFav(true);
                toast.success(data.message, {
                    position: "top-center"
                });
            } catch (e) {
                toast.error("Coin Adding Failed", {
                    position: "top-center"
                });
            }
        }
    }

    const remFav = async (id) => {
        if (favCoins.includes(id)) {
            setFavCoins(favCoins.filter(item => item !== id));

            console.log(favCoins);
            try {
                const { data } = await axios.post(addCoinList, { coinList: favCoins.filter(item => item !== id) }, { withCredentials: true });
                toast.success("Coin removed from List", {
                    position: "top-center"
                });
                setIsFav(false);
            } catch (e) {
                toast.error("Coin Removing Failed", {
                    position: "top-center"
                });
            }
        } else {
            toast.error("Coin already removed", {
                position: "top-center"
            });
        }
    }

    useEffect(() => {
        findCoinDetails();
    }, [currency]);

    useEffect(() => {
        setDesc(currCoin?.description?.cs);
    }, [currCoin]);

    useEffect(() => {
        if (favCoins.includes(coinId)) {
            setIsFav(true);
        } else {
            setIsFav(false);
        }
    }, [favCoins]);

    // console.log(favCoins);

    return (
        <>
            {
                isLoading
                    ?
                    <Loader />
                    :
                    <div className="singlecoin" >
                        <div className="coinHeader">
                            <div className="left">
                                <img src={currCoin.image?.large} alt="" />
                                <div className="nameContainer">
                                    <p className="title">
                                        {coinId}
                                    </p>
                                    <p className="shortForm">
                                        {currCoin.symbol?.toUpperCase()}
                                    </p>
                                </div>
                            </div>
                            <div className="right">
                                {
                                    isFav
                                        ?
                                        <button onClick={() => remFav(coinId)} className="removeBtn">
                                            Remove From Fav
                                        </button>
                                        :
                                        <button onClick={() => addToFav(coinId)}>
                                            Add To Fav
                                        </button>
                                }
                            </div>
                        </div>
                        <div className="priceDetails">
                            <div className="left">
                                <h1 className="price">
                                    {
                                        (currency === "inr")
                                            ?
                                            "₹"
                                            :
                                            "$"} {(currency === "inr") ? `${currCoin.market_data?.current_price.inr}` : `${currCoin.market_data?.current_price.usd}`}
                                </h1>
                                <span style={{ color: currCoin.market_data?.price_change_percentage_24h?.toFixed(4) >= 0 ? "green" : "red" }} className="updown">
                                    {
                                        currCoin.market_data?.price_change_percentage_24h?.toFixed(4) >= 0
                                            ?
                                            `+${currCoin.market_data?.price_change_percentage_24h?.toFixed(4)}%`
                                            :
                                            `${currCoin.market_data?.price_change_percentage_24h?.toFixed(4)}%`
                                    }
                                </span>
                            </div>
                            <div className="right">
                                <form action="">
                                    {/* <input checked={(timeper === "1h") && true} type="radio" name="timePeriod" value="1h" id="1h" onChange={(e) => setTimePer(e.target.value)} />
                                    <label htmlFor="1h">1H</label> */}
                                    <input checked={(timeper === "24h") && true} type="radio" name="timePeriod" value="24h" id="24h" onChange={(e) => setTimePer(e.target.value)} />
                                    <label htmlFor="24h">24H</label>
                                    <input checked={(timeper === "1w") && true} type="radio" name="timePeriod" value="1w" id="1w" onChange={(e) => setTimePer(e.target.value)} />
                                    <label htmlFor="1w">1W</label>
                                    <input checked={(timeper === "1m") && true} type="radio" name="timePeriod" value="1m" id="1m" onChange={(e) => setTimePer(e.target.value)} />
                                    <label htmlFor="1m">1M</label>
                                    <input checked={(timeper === "1y") && true} type="radio" name="timePeriod" value="1y" id="1y" onChange={(e) => setTimePer(e.target.value)} />
                                    <label htmlFor="1y">1Y</label>
                                </form>
                            </div>
                        </div>
                        <h2 className="chartTitle">
                            Coin Analytics
                        </h2>
                        <Chart days={timeper} coin={currCoin} currency={currency} />
                        <div className="coinDetails">
                            <div className="left">
                                <h1 className="title">
                                    Statics
                                </h1>
                                <p className="rank">
                                    Rank : <span>{currCoin.market_data?.market_cap_rank}</span>
                                </p>
                                <div className="marketDetails">
                                    <div className="first">
                                        <p>
                                            Current Price <InfoOutlined className="icon" />
                                        </p>
                                        <span>
                                            {
                                                (currency === "inr")
                                                    ?
                                                    "₹"
                                                    :
                                                    "$"} {(currency === "inr") ? `${currCoin.market_data?.current_price.inr}` : `${currCoin.market_data?.current_price.usd}`}
                                        </span>
                                    </div>
                                    <div className="second">
                                        <p>
                                            Market Cap <InfoOutlined className="icon" />
                                        </p>
                                        <span>
                                            {
                                                (currency === "inr")
                                                    ?
                                                    "₹"
                                                    :
                                                    "$"} {(currency === "inr") ? `${currCoin.market_data?.market_cap.inr}` : `${currCoin.market_data?.market_cap.usd}`}
                                        </span>
                                    </div>
                                </div>
                                <br />
                                <div className="marketDetails">
                                    <div className="first">
                                        <p>
                                            24H HIGH <InfoOutlined className="icon" />
                                        </p>
                                        <span>
                                            {
                                                (currency === "inr")
                                                    ?
                                                    "₹"
                                                    :
                                                    "$"} {(currency === "inr") ? `${currCoin.market_data?.high_24h.inr}` : `${currCoin.market_data?.high_24h.usd}`}
                                        </span>
                                    </div>
                                    <div className="second">
                                        <p>
                                            24H LOW <InfoOutlined className="icon" />
                                        </p>
                                        <span>
                                            {
                                                (currency === "inr")
                                                    ?
                                                    "₹"
                                                    :
                                                    "$"} {(currency === "inr") ? `${currCoin.market_data?.low_24h.inr}` : `${currCoin.market_data?.low_24h.usd}`}
                                        </span>
                                    </div>
                                </div>
                                <br />
                                <div className="marketDetails">
                                    <div className="first" style={{ width: "100%" }}>
                                        <p>
                                            Price Change in 24H ({currency})<InfoOutlined className="icon" />
                                        </p>
                                        <span style={{ color: `${currCoin.market_data?.price_change_24h_in_currency.inr}` < 0 ? "red" : "green" }}>
                                            {
                                                (currency === "inr")
                                                    ?
                                                    "₹"
                                                    :
                                                    "$"} {(currency === "inr") ? `${currCoin.market_data?.price_change_24h_in_currency.inr}` : `${currCoin.market_data?.price_change_24h_in_currency.usd}`
                                            }
                                        </span>
                                    </div>
                                </div>
                                <br />
                                <div className="marketDetails">
                                    <div className="first" style={{ width: "100%" }}>
                                        <p>
                                            Price Change in 24H (%) <InfoOutlined className="icon" />
                                        </p>
                                        <span style={{ color: `${currCoin.market_data?.price_change_24h_in_currency.inr}` < 0 ? "red" : "green" }}>
                                            {
                                                (currency === "inr") ? `${currCoin.market_data?.price_change_percentage_24h}%` : `${currCoin.market_data?.price_change_percentage_24h}%`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                                <h1 className="title">
                                    About Coin
                                </h1>
                                <h4 className="subtitle">
                                    What is {coinId}
                                </h4>
                                <div className="para">
                                    {
                                        desc &&
                                        <InnerHTML html={desc} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }
            <ToastContainer />
        </>
    )
}

export default SingleCoin