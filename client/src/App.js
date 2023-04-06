import { createContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Forgot from './Pages/Forgot/Forgot';
import Markets from './Pages/Markets/Markets';
import News from './Pages/News/News';
import Signup from './Pages/Signup/Signup';
import SingleCoinPage from './Pages/SingleCoinPage/SingleCoinPage';
import SingleNewsPage from './Pages/SingleNewsPage/SingleNewsPage';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import { findCoinList } from './Config/api';
import axios from 'axios';
import Favourites from './Pages/Favourites/Favourites';
import Profile from './Pages/Profile/Profile';
import Reset from './Pages/Reset/Reset';


export const currencyContext = createContext();
export const userContext = createContext();


function App() {
  const [currency, setCurrency] = useState("inr");
  const [user, setUser] = useState(null);
  const [favCoins, setFavCoins] = useState([]);
  // console.log(user)

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(findCoinList, { withCredentials: true });
      if (res.data.success === true) {
        (res.data.coinList) && setFavCoins(res.data.coinList);
        setUser(res.data.rootUser);
      } else {
        setUser(null);
      }
    }
    getUser();
  }, []);

  return (
    <currencyContext.Provider value={{ currency, setCurrency }} >
      <userContext.Provider value={{ user, setUser, favCoins, setFavCoins }}>
        <ScrollToTop>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route exact path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
            <Route exact path="/forgot" element={user ? <Navigate to="/" /> : <Forgot />} />
            <Route exact path="/reset_password" element={user ? <Navigate to="/" /> : <Reset />} />
            <Route exact path="/markets" element={<Markets />} />
            <Route exact path="/favourites" element={user ? <Favourites /> : <Navigate to="/login" />} />
            <Route exact path="/news" element={<News />} />
            <Route exact path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route exact path="/news/:id" element={<SingleNewsPage />} />
            <Route exact path="/coin/:id" element={<SingleCoinPage />} />
          </Routes>
        </ScrollToTop>
      </userContext.Provider>
    </currencyContext.Provider>
  );
}

export default App;