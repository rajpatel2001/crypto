import { Link, useNavigate } from 'react-router-dom';
import './topcoin.scss';
import axios from "axios";
import { TrendingCoins } from '../../Config/api';
import { useContext, useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { currencyContext, userContext } from '../../App';
import { Favorite, FavoriteBorderOutlined } from '@material-ui/icons';

const TopCoin = () => {
    const navigate = useNavigate();
    const [topCoins, setTopCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { currency } = useContext(currencyContext);
    const { favCoins } = useContext(userContext);

    const fetchTopCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setIsLoading(true);
        setTopCoins(data);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    useEffect(() => {
        fetchTopCoins();
    }, [currency]);

    const findCoin = (coinname) => {
        navigate("/coin/" + coinname);
    }

    return (
        <div className="topcoin" id="topCoins">
            <h1 className="title">
                Market Trend
            </h1>
            <div className="coinContainer">
                {
                    isLoading ?
                        <Loader />
                        :

                        <table>
                            <thead>
                                <tr className="fieldNames">
                                    <th>Rank</th>
                                    <th>Symbol</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>24h Change</th>
                                    <th>Market Cap</th>
                                    <th>Favourite</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    topCoins.map((coin) =>
                                    (
                                        <tr key={coin.id} onClick={() => findCoin(coin.id)}>
                                            <td>
                                                #{coin.market_cap_rank}
                                            </td>
                                            <td>
                                                <img src={coin.image} alt="" />
                                            </td>
                                            <td className="signname">
                                                <p className="coinsign">
                                                    {coin.symbol.toUpperCase()}
                                                </p>
                                                <p className="coinname">
                                                    {coin.id}
                                                </p>
                                            </td>
                                            <td>
                                                {
                                                    (currency === "inr")
                                                        ?
                                                        "₹"
                                                        :
                                                        "$"
                                                } {coin.current_price.toFixed(4)}
                                            </td>
                                            <td style={{ color: `${coin.price_change_percentage_24h >= 0 ? "#16C784" : "#EA3943"}`, fontWeight: "700" }}>
                                                {coin.price_change_percentage_24h >= 0 ? `+${coin.price_change_percentage_24h?.toFixed(2)}%` : `${coin.price_change_percentage_24h?.toFixed(2)}%`}
                                            </td>
                                            <td>
                                                {
                                                    (currency === "inr")
                                                        ?
                                                        "₹"
                                                        :
                                                        "$"} {coin.market_cap}
                                            </td>
                                            <td>
                                                {
                                                    favCoins.includes(coin.id)
                                                        ?
                                                        <Favorite className="fav icon" />
                                                        :
                                                        <FavoriteBorderOutlined className="icon" />
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }
            </div>
            <Link className="button" to="/markets">
                View Markets
            </Link>
        </div>
    )
}

export default TopCoin