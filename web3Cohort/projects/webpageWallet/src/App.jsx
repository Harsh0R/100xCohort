import { useState } from 'react';
import './App.css'
import Navbar from './Components/Navbar/Navbar'

function App() {

  const [secretPhrase, setSecretPhrase] = useState("");

  const handleGenerateWallet = () => {
    if (!secretPhrase) {
      // Generate a random wallet (for demo purposes, use ethers.js or similar)
      console.log("Generating new wallet...");
    } else {
      // Use the provided secret phrase to generate wallet
      console.log("Using secret phrase to generate wallet...");
    }
  };

  return (
    <div className='container'>
      <Navbar />
      <div className="app-container">
        
        <div>Webpage wallet.</div>
      <main className="main-content">
        <input
          type="text"
          placeholder="Enter your secret phrase (or leave blank to generate)"
          value={secretPhrase}
          onChange={(e) => setSecretPhrase(e.target.value)}
          className="input-box"
        />
        <button onClick={handleGenerateWallet} className="generate-button">
          Generate Wallet
        </button>
      </main>
    </div>
    </div>
  )
}

export default App
