import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import SearchItem from '../../components/banner/banner'
import "./home.css"
import Footer from '../../components/footer/Footer';
const Home = () => {
    return (
        <div>
            <Navbar />
            <SearchItem />
            <Footer />
        </div>
    );
};

export default Home;