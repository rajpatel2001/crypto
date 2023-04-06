export const CoinList = (currency) =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoinDetails = (id) =>
    `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

export const getNews = () =>
    `https://newsdata.io/api/1/news?apikey=pub_74813f04abf5bbe80211829de1bc32f48e98&q=cryptocurrency`;

export const getNews2 = () =>
    `https://newsapi.org/v2/everything?q=crypto&from=2022-04-18&sortBy=publishedAt&apiKey=415cdb6ced96460d896649287d62bae4`;


export const logoImage = `https://firebasestorage.googleapis.com/v0/b/cryptowall-b8bcd.appspot.com/o/Site%2Flogo.png?alt=media&token=73e101bd-1271-4eb8-a142-96bd582e34b1`;

export const marketImage = `https://firebasestorage.googleapis.com/v0/b/cryptowall-b8bcd.appspot.com/o/Site%2Fill3.png?alt=media&token=1d4baab5-5c53-4c04-b2a6-67463338b011`;

export const homeImage = `https://firebasestorage.googleapis.com/v0/b/cryptowall-b8bcd.appspot.com/o/Site%2Fillustration.png?alt=media&token=50d71869-f780-4929-b0bf-23c126d26d88`;

export const inrImage = `https://firebasestorage.googleapis.com/v0/b/cryptowall-b8bcd.appspot.com/o/Site%2Finr.jpg?alt=media&token=2a00495f-2d59-414d-939d-06b3bcd00252`;

export const usdImage = `https://firebasestorage.googleapis.com/v0/b/cryptowall-b8bcd.appspot.com/o/Site%2Fusa.jpg?alt=media&token=09f915a2-3603-4f74-8848-e895ae0a88fa`;

export const loginImage = `https://firebasestorage.googleapis.com/v0/b/cryptowall-b8bcd.appspot.com/o/Site%2Flogin.png?alt=media&token=a794357f-8d81-4acf-a067-e0bb2976ce01`;

export const signupImage = `https://firebasestorage.googleapis.com/v0/b/cryptowall-b8bcd.appspot.com/o/Site%2Fsignup.png?alt=media&token=72ad4aed-3674-441e-99a0-dfce04f1fb1c`;

export const subscribeImage = `https://firebasestorage.googleapis.com/v0/b/cryptowall-b8bcd.appspot.com/o/Site%2Fsubscribe.png?alt=media&token=db5e7d87-8d15-4e5e-ab99-65d29b1bd14a`;

export const registerUser = `http://localhost:5000/api/auth/register`;

export const loginUser = `http://localhost:5000/api/auth/login`;

export const forgotUser = `http://localhost:5000/api/auth/forgot`;

export const resetTokenVerify = `http://localhost:5000/api/auth/reset_token_verify`;

export const resetPasswordApi = `http://localhost:5000/api/auth/reset_password`;

export const logoutUser = `http://localhost:5000/api/auth/logout`;

export const findUser = `http://localhost:5000/api/auth/find`;

export const updateUser = `http://localhost:5000/api/user/update`;

export const findCoinList = `http://localhost:5000/api/coin/find`;

export const addCoinList = `http://localhost:5000/api/coin/add`;

export const avatarUrl = `https://firebasestorage.googleapis.com/v0/b/luxuryhub-3b0f6.appspot.com/o/Site%20Images%2Fprofile.png?alt=media&token=6f94d26d-315c-478b-9892-67fda99d2cd6`;


// "@testing-library/jest-dom": "^5.16.2",
// "@testing-library/react": "^12.1.4",
// "@testing-library/user-event": "^13.5.0",
// "web-vitals": "^2.1.4"
// "proxy": "/api/",
