import React from 'react';

// style
import style from './header.module.css';


const Header = () => {
    return (
        <header className={style.headerContainer}>
            <div className={style.image}>
                <div className={style.headerText}>
                    <h1>Todo List</h1>
                    <h2>welcom to your website.</h2>
                    <span>Here you can write your tasks and we remind you for do your task.</span>
                    <span>Trust Us :)</span>
                </div>
            </div>
        </header>
    );
};

export default Header;