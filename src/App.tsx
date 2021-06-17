import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SimpleForm} from './RegistrationForm/SimpleForm';
import {AdvancedForm} from "./RegistrationForm/AdvancedForm";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <SimpleForm/>
                    <AdvancedForm/>
                </div>
            </header>
        </div>
    );
}

export default App;
