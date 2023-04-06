import { useContext, useEffect } from "react";
import { currencyContext } from "../../App";
import Coinlist from "../../Components/Coinlist/Coinlist";
import Footer from "../../Components/Footer/Footer";
import Header2 from "../../Components/Header2/Header2";
import Navbar from "../../Components/Navbar/Navbar";
import Subscribe from "../../Components/Subscribe/Subscribe";
import "./markets.scss";

const Markets = () => {
    const { setCurrency } = useContext(currencyContext);

    useEffect(() => {
        setCurrency("inr");
    }, []);

    return (
        <div className="markets">
            <Navbar />
            <Header2 />
            <Coinlist />
            <Subscribe />
            <Footer />
        </div>
    )
}

export default Markets