import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getNews } from '../../Config/api';
import Loader from '../Loader/Loader';
import './singlenews.scss';

const SingleNews = () => {
    const [currNews, setCurrNews] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const newsId = location.pathname.split("/")[2];
    const findNewsDetails = async () => {
        setIsLoading(true);
        const { data } = await axios.get(getNews());
        setCurrNews(data?.results[newsId]);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    // console.log(currNews);
    // console.log(currNews2);

    useEffect(() => {
        findNewsDetails();
    }, []);


    return (
        isLoading
            ?
            <Loader />
            :
            (
                <div className="singlenews">
                    <h1 className="title">
                        {currNews.title}
                    </h1>
                    <p className="time">
                        <span>
                            Country :
                        </span> {currNews.country?.toString().toUpperCase()}
                    </p>
                    <p className="time">
                        <span>
                            Language :
                        </span> {currNews.language?.toUpperCase()}
                    </p>
                    <p className="time">
                        <span>
                            Publish Time :
                        </span> {currNews.pubDate}
                    </p>
                    <img className="newsImg" src={currNews.image_url || "https://images.unsplash.com/photo-1631897642056-97a7abff6818?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170"} alt="News Image" />
                    <div className="content">
                        <p className="subTitle">
                            Description :
                        </p>
                        {currNews.description || "No Description Available"}
                    </div>
                    <br />
                    <div className="content">
                        <p className="subTitle">
                            Content :
                        </p>
                        {currNews.content || "No Content Available"}
                    </div>
                    <div className="content">
                        <p className="subTitle">
                            Full News Url :
                        </p>
                        <a target="_blank" href={currNews?.link}>
                            {currNews?.link || "Currently Not Available"}
                        </a>
                    </div>
                </div>
            )
    )
}

export default SingleNews