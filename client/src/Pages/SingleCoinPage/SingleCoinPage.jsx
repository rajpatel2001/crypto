import { useContext, useEffect } from 'react';
import { currencyContext } from '../../App';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import SingleCoin from '../../Components/SingleCoin/SingleCoin';
import Subscribe from '../../Components/Subscribe/Subscribe';
import './singlecoinpage.scss';

const SingleCoinPage = () => {
    const { setCurrency } = useContext(currencyContext);

    useEffect(() => {
        setCurrency("inr");
    }, []);

    return (
        <div className="singlecoinpage">
            <Navbar />
            <SingleCoin />
            <Subscribe />
            <Footer />
        </div>
    )
}

export default SingleCoinPage;