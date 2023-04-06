import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getNews } from "../../Config/api";
import Loader from '../Loader/Loader';
import "./topnews.scss";

const Topnews = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const viewNews = (id) => {
        navigate("/news/" + id);
    }

    const fetchNews = async () => {
        setIsLoading(true);
        const { data } = await axios.get(getNews());
        // console.log(data);
        setNews(data?.results);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div id="topNews" className="topNewsContainer">
            <h1 className="title" id="topnews">
                News Of The Day
            </h1>
            <div className="newsContainer">
                {
                    isLoading
                        ?
                        <Loader />
                        :
                        (
                            news.map((newsItem, index) => (
                                (index < 4) &&
                                <div key={index} className="news">
                                    <img src={newsItem.image_url || "https://images.unsplash.com/photo-1631897642056-97a7abff6818?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170"} alt="" />
                                    <div className="detail">
                                        <p className="title">
                                            {newsItem.title?.toString().slice(0, 50) + "..."}
                                        </p>
                                        <p className="desc">
                                            {
                                                newsItem.content
                                                    ?
                                                    newsItem.content?.toString().slice(0, 50) + "..."
                                                    :
                                                    "Content not Available"
                                            }
                                        </p>
                                        <p className="time">
                                            {newsItem.pubDate}
                                        </p>
                                    </div>
                                    <button className="readmore" onClick={() => viewNews(index)}>
                                        Read More
                                    </button>
                                </div>
                            ))
                        )
                }
            </div>
            <Link className="button" to="/news">
                View More
            </Link>
        </div >
    )
}

export default Topnews