import "./news.scss";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import NewsList from "../../Components/NewsList/NewsList";
import Subscribe from "../../Components/Subscribe/Subscribe";

const News = () => {
    return (
        <div className="news">
            <Navbar />
            <NewsList />
            <Subscribe />
            <Footer />
        </div>
    )
}

export default News