import { CloseRounded, SearchOutlined } from '@material-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNews } from '../../Config/api';
import Loader from '../Loader/Loader';
import './newsList.scss';

const NewsList = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const findNews = (id) => {
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
        isLoading
            ?
            <Loader />
            :
            (
                <div className="newslist">
                    <div className="topContainer">
                        <h1 className="title">
                            Latest News
                        </h1>
                        <div className="searchbar">
                            <SearchOutlined className="icon" />
                            <input type="text" name="search" value={search} placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                            {
                                search && < CloseRounded className="icon close" onClick={() => setSearch("")} />
                            }
                        </div>
                    </div>

                    <div className="newsListContainer">
                        {
                            search
                                ?
                                news?.map((newsItem, index) => (
                                    newsItem.title.toLowerCase().includes(search.toLowerCase(), 0) &&
                                    <div className="news" key={index} onClick={() => findNews(index)}>
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
                                    </div>
                                ))
                                :

                                news?.map((newsItem, index) => (
                                    <div className="news" key={index} onClick={() => findNews(index)}>
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
                                    </div>
                                ))
                        }


                    </div>
                </div>
            )
    )
}

export default NewsList