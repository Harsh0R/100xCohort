import React, { createContext, useEffect, useState } from 'react';
import { HDNode } from '@ethersproject/hdnode';
import { wordlists } from '@ethersproject/wordlists';
import {
    publicToAddress,
    privateToAddress,
    toChecksumAddress,
} from "ethereumjs-util";
import { ethers } from "ethers"
import * as bip39 from 'bip39';
// import crypto from "crypto";
// import { randomBytes } from 'crypto';
// import { Buffer } from 'buffer';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {

    const [seedPhrase, setSeedPhrases] = useState()
    const [ETHaddresses, setETHaddresses] = useState([])
    const [SOLaddresses, setSOLaddresses] = useState([])


    const generateNewSeed = async () => {

        console.log("called.......");

        const entropy = crypto.getRandomValues(new Uint8Array(16)); // 16 bytes = 128 bits
        const entropyHex = Array.from(entropy).map(byte => byte.toString(16).padStart(2, '0')).join('');
        const mnemonic = bip39.entropyToMnemonic(entropyHex);
        localStorage.setItem("seedWords", mnemonic);
        return mnemonic;

    }

    const getEthAddress = async (mnemonicArray) => {
        try {
            console.log("Mnemo => ", mnemonicArray);

            const mnemonic = mnemonicArray.join(' ');
            setSeedPhrases(mnemonic)

            const node = HDNode.fromMnemonic(mnemonic, null, wordlists.en);

            for (let i = 0; i < 4; i++) { 
                const path = `m/44'/60'/0'/0/${i}`;
                const wallet = node.derivePath(path);
                const privateKey = wallet.privateKey.toString("hex");
                const publicKey = wallet.publicKey.toString("hex");
                const address = ethers.utils.computeAddress(publicKey);
                console.log("Address HEX:", address);
            }
        } catch (error) {
            console.error("Error in getEthAddress:", error);
        }
    };

    useEffect(() => {

        const seedWords = localStorage.getItem("seedWords");
        setSeedPhrases(seedWords)
        console.log("Words ==> " , seedWords);
        

    }, [])


    return (
        <WalletContext.Provider value={{ getEthAddress, generateNewSeed, setSeedPhrases, SOLaddresses, ETHaddresses, seedPhrase }}>
            {children}
        </WalletContext.Provider>
    );
};
