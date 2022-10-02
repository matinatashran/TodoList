import React from 'react';

// style
import "./App.css";

// components
import Header from './components/Header';
import Main from './components/Main';


const App = () => {

    return (
        <div className='appContainer'>
            <Header/>
            <Main />
        </div>
    );
};

export default App;
