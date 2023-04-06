import FavList from '../../Components/FavList/FavList';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import Subscribe from '../../Components/Subscribe/Subscribe';
import './favourites.scss';

const Favourites = () => {
    return (
        <div className="favourites">
            <Navbar />
            <FavList />
            <Subscribe />
            <Footer />
        </div>
    )
}

export default Favourites;