import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WalletContext } from '../../Context/WalletProvider';
import './Home.modules.css';
import Addresses from '../../Components/Addresses/Addresses';

const Home = () => {
    const navigate = useNavigate();
    const { generateNewSeed, seedPhrase, clearSeedPhrase } = useContext(WalletContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [seeds, setSeeds] = useState([]);
    console.log("seed in Home ==> ", seedPhrase);

    useEffect(() => {

        if (seedPhrase) {
            const seedArr = seedPhrase.split(' ');
            setSeeds(seedArr);
        }

    }, [seedPhrase])


    const handleClear = () => {
        clearSeedPhrase();
        setSeeds([]);
    };

    const handleSeedPage = async (generateNew) => {
        if (generateNew) {
            const newSeedPhrase = await generateNewSeed();
            navigate('/seed', { state: { seedPhrase: newSeedPhrase } });
        } else {
            navigate('/seed');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(seedPhrase);
        alert("Seed phrase copied to clipboard!");
    };


    return (
        <div className="secret-phrase-container">
            {seeds && seeds.length > 0 ? (
                <div className="dropdown-wrapper">
                    <div
                        className="dropdown-header"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <p className="dropdown-title">Current Seed Phrase</p>
                        <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>
                            &#9662;
                        </span>
                    </div>
                    <div className={`dropdown-content ${isDropdownOpen ? 'open' : ''}`}>
                        {seeds.map((word, index) => (
                            <div
                                key={index}
                                className="dropdown-item"
                                style={{ '--delay': `${index * 0.1}s` }}
                            >
                                {index + 1}. {word}
                            </div>
                        ))}
                    </div>
                    <button onClick={handleCopy} className="copy-button">
                        Copy Seed Phrase
                    </button>
                    <button onClick={handleClear} className="clear-button">
                        Clear Seed Phrase
                    </button>
                </div>
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
            {
                seeds && (
                    <div className='addressContainer'>

                        <Addresses />

                    </div>
                )
            }



        </div>
    );
};

export default Home;
