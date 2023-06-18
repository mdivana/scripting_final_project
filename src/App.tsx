import React from 'react'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Nav from './components/Nav/Nav'
// import "bootstrap/dist/css/bootstrap.css";
import './styles.css'

export default function App() {

    return (
        <div>
             <Header />
            <Nav />
             <Main />
        </div>
    )
}
