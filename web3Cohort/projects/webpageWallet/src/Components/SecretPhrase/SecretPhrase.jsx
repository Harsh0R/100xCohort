import React, { useState, useEffect, useRef, useContext } from 'react';
import './SecretPhrase.modules.css';
import { WalletContext } from '../../Context/WalletProvider';
import { useNavigate } from 'react-router-dom';

const SecretPhrase = ({ seeds }) => {
    const [seedPhrase, setSeedPhrase] = useState(Array(12).fill("")); // Initialize with 12 empty strings
    const [showInputs, setShowInputs] = useState(false); // State to control input visibility
    const dropdownRef = useRef(null);
    const { getEthAddress  , setSeedPhrases} = useContext(WalletContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (seeds) {
            setSeedPhrase(seeds.split(' '));
        }
    }, [seeds]);

    const handleNext = () => {
        const combined = seedPhrase.join(' ');
        localStorage.setItem("seedWords", combined);
        console.log("Seed Phrases ===>>> " , combined);
        
        setSeedPhrases(combined)
        navigate('/');
    };

    const handleInputChange = (index, value) => {
        const newSeedPhrase = [...seedPhrase];
        newSeedPhrase[index] = value.trim();

        // Combine all inputs to detect if words exceed the total count
        const combined = newSeedPhrase.join(' ');
        const words = combined.split(' ');

        // Update the state with the new words
        if (words.length <= 12) {
            setSeedPhrase([...words, ...Array(12 - words.length).fill("")]);
        } else {
            // If more than 12 words, truncate to 12 words
            setSeedPhrase(words.slice(0, 12));
        }

        // Move focus to the next input
        if (index < 11 && words[index].length > 0) {
            document.getElementById(`input-${index + 1}`).focus();
        }
        console.log("Seed ==> " , seedPhrase);
        
    };

    const handleCreateAccount = async () => {
        getEthAddress(seedPhrase.join(' '));
    };

    const handleCopy = () => {
        const phrase = seedPhrase.join(" ");
        navigator.clipboard.writeText(phrase);
        alert("Seed phrase copied to clipboard!");
    };

    useEffect(() => {
        if (dropdownRef.current) {
            dropdownRef.current.style.height = showInputs ? `${dropdownRef.current.scrollHeight}px` : '0px';
            dropdownRef.current.style.opacity = showInputs ? '1' : '0';
        }
    }, [showInputs]);

    return (
        <div className="secret-phrase-container">
            {seeds ? (
                <div>
                    <h1>Your Seed Phrase</h1>
                    <div>
                        <p>Please save this seed phrase securely:</p>
                        <div className="seed-phrase-grid">
                            {seeds.split(' ').map((word, index) => (
                                <span key={index} className="seed-word">{word}</span>
                            ))}
                        </div>
                        <button onClick={handleCopy} className="copy-button">Copy Seed Phrase</button>
                    </div>
                    <button onClick={handleNext} className="copy-button">Next</button>
                </div>
            ) : (
                <div>
                    <p>No seed phrase provided. Please enter your existing seed phrase.</p>
                    <button onClick={() => setShowInputs(!showInputs)} className="show-inputs-button">
                        Enter Your Secret Phrase
                    </button>
                    <div ref={dropdownRef} className={`dropdown-container ${showInputs ? 'open' : ''}`}>
                        <div className="phrase-grid">
                            {seedPhrase.map((word, index) => (
                                <input
                                    id={`input-${index}`}
                                    key={index}
                                    className="word-box"
                                    type="text"
                                    value={word}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    placeholder={`Word ${index + 1}`}
                                />
                            ))}
                        </div>
                        <div>
                            <button onClick={handleCopy} className="copy-button">Copy Seed Phrase</button>
                        </div>
                        <button onClick={handleNext} className="copy-button">Next</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SecretPhrase;
