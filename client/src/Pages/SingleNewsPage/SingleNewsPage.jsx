import './singlenewspage.scss';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import SingleNews from '../../Components/SingleNews/SingleNews';
import Subscribe from '../../Components/Subscribe/Subscribe';

const SingleNewsPage = () => {
    return (
        <div className="singlenewspage">
            <Navbar />
            <SingleNews />
            <Subscribe />
            <Footer />
        </div>
    )
}

export default SingleNewsPage;