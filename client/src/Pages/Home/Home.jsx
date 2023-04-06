import './home.scss';
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import Subscribe from '../../Components/Subscribe/Subscribe';
import TopCoin from '../../Components/TopCoin/TopCoin';
import Topnews from '../../Components/Topnews/Topnews';
import Footer from '../../Components/Footer/Footer';
import { useContext, useEffect } from 'react';
import { currencyContext } from '../../App';

const Home = () => {
    const { setCurrency } = useContext(currencyContext);

    useEffect(() => {
        setCurrency("inr");
    }, []);

    return (
        <div className="home">
            <Navbar />
            <Header />
            <TopCoin />
            <Topnews />
            <Subscribe />
            <Footer />
        </div>
    )
}

export default Home;