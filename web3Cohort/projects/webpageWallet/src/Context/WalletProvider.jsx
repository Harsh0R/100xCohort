import React, { createContext } from 'react'

export const WalletContext = createContext()

const WalletProvider = ({ children }) => {

    


    return (
        <WalletContext.Provider>{children}</WalletContext.Provider>
    )
}

export default WalletProvider