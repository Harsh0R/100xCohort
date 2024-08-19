import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WalletContext } from '../../Context/WalletProvider';
import './Home.modules.css';

const Home = () => {
    const navigate = useNavigate();
    const { generateNewSeed, seedPhrase } = useContext(WalletContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    console.log("seed in Home ==> " , seedPhrase);
    

    const handleSeedPage = async (generateNew) => {
        if (generateNew) {
            const newSeedPhrase = await generateNewSeed();
            navigate('/seed', { state: { seedPhrase: newSeedPhrase } });
        } else {
            navigate('/seed');
        }
    };

    const handleCopy = () => {
        // const phrase = seedPhrase.join(" ");
        navigator.clipboard.writeText(seedPhrase);
        alert("Seed phrase copied to clipboard!");
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="secret-phrase-container">
            {seedPhrase ? (
                <>
                    <div className="dropdown-wrapper">
                        <button className="dropdown-header" onClick={toggleDropdown}>
                            <p className="dropdown-title">Current Secret Phrase</p>
                            <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>&#x25BC;</span>
                        </button>
                        {isDropdownOpen && (
                            <>
                                <div className="dropdown-content">
                                    {seedPhrase.split(' ').map((word, index) => (
                                        <div key={index} className="dropdown-item">
                                            {index + 1}. {word}
                                        </div>
                                    ))}
                                </div>
                                <button onClick={handleCopy} className="copy-button">Copy Seed Phrase</button>
                            </>
                        )}
                    </div>
                    <button onClick={() => handleSeedPage(false)} className="copy-button">
                        Enter Your Secret Phrase
                    </button>
                </>
            ) : (
                <div className="button-container">
                    <button onClick={() => handleSeedPage(false)} className="show-inputs-button">
                        Enter Your Secret Phrase
                    </button>
                    <button onClick={() => handleSeedPage(true)} className="show-inputs-button">
                        Generate New Secret Phrase
                    </button>
                </div>
            )}



        </div>
    );
};

export default Home;
