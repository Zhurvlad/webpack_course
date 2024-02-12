import React, {useState} from 'react';
import styles from './App.module.scss'
import {Link, Outlet} from 'react-router-dom';
import {About} from '../pages/about/About';
import assetPng from '../assets/notFound.jpg'
import Svg from '../assets/1.svg'

//TODO: Разобраться с Алиасами


function TODO() {
    TODO2()
}

function TODO2() {
    throw new Error()
}

export const App = () => {

    const [count, setCount] = useState(0)

    const increment = () => {
        TODO()
    }


    /*if(__PLATFORM__ === 'desktop') {
        return <div>DESKTOP</div>
    }

    if(__PLATFORM__ === 'mobile'){
        return <div>MOBILE</div>
    }*/


    return (
        <div>
            <h1>PLATFORM={__PLATFORM__}</h1>
            <div>
               {/* <img src={assetPng} alt="png"/>*/}
                {/*{AssetPng}*/}
            </div>
            <div>
                <Svg/>
            </div>
            <Link to={'/about'}>About</Link>
            <Link to={'/shop'}>Shop</Link>
            <button className={styles.button} onClick={increment}>123123</button>
            <Outlet/>
            <About/>
        </div>
    );
};

