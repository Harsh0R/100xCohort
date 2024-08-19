import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import backButton from '../../assets/imgs/backButton.png'; // Ensure this path is correct
import SecretPhrase from '../../Components/SecretPhrase/SecretPhrase';
import "./SeedPage.modules.css";

const SeedPage = () => {
    const nav = useNavigate();
    const location = useLocation();

    const handleBackButton = () => {
        nav('/');
    }

    const seedPhrase = location.state?.seedPhrase || '';

    return (
        <div className='containerseed'>
            <div className="header-container">
                <img
                    className='imgclass'
                    onClick={handleBackButton}
                    src={backButton}
                    alt="Back"
                />
                {/* <h1>WEBPAGE WALLET</h1> */}
            </div>
            <div>
                {seedPhrase ? (<SecretPhrase seeds={seedPhrase} />) : (<SecretPhrase />)}
            </div>
        </div>
    );
}

export default SeedPage;
