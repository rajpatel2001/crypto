import { SearchOutlined, CloseRounded, FavoriteBorderOutlined, Favorite } from "@material-ui/icons";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currencyContext, userContext } from "../../App";
import { CoinList } from "../../Config/api";
import Loader from "../Loader/Loader";
import "./coinlist.scss";

const Coinlist = () => {
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const { currency } = useContext(currencyContext);
    const { favCoins } = useContext(userContext);
    const navigate = useNavigate();

    const findCoin = (coinname) => {
        navigate("/coin/" + coinname);
    }

    const fetchCoins = async () => {
        setIsLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    return (
        <div id="coinList" className="coinlist">
            <div className="topContainer">
                <h1 className="title">
                    Markets
                </h1>
                <div className="searchbar">
                    <SearchOutlined className="icon" />
                    <input type="text" name="search" value={search} placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                    {
                        search && < CloseRounded className="icon close" onClick={() => setSearch("")} />
                    }
                </div>
            </div>
            <div className="bottomContainer">
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
                                    search
                                        ?
                                        coins.map((coin) =>
                                        (
                                            coin.id.includes(search, 0) &&
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
                                                            "$"} {coin.current_price.toFixed(4)}
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
                                        :
                                        coins.map((coin) =>
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
                                                            "$"} {coin.current_price.toFixed(4)}
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
        </div>
    )
}

export default Coinlist;