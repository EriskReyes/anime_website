import Layout from "./Layout.jsx";

import Home from "./Home";

import Forum from "./Forum";

import Anime from "./Anime";

import Games from "./Games";

import Trending from "./Trending";

import Database from "./Database";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {

    Home: Home,

    Forum: Forum,

    Anime: Anime,

    Games: Games,

    Trending: Trending,

    Database: Database,

}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/Forum" element={<Forum />} />
                
                <Route path="/Anime" element={<Anime />} />
                
                <Route path="/Games" element={<Games />} />
                
                <Route path="/Trending" element={<Trending />} />

                <Route path="/Database" element={<Database />} />

            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}