"use client"
import { useState, useEffect } from "react"

export default function QuantityPriceModule() {
    // State allows the component to "know" the variable
    // https://react.dev/learn/state-a-components-memory
    const [gmQuantity, setGMQuantity ] = useState(1)
    const [gmTotal, setGMTotal] = useState(0)
    const [ethPriceInUSD, setEthPriceInUSD] = useState(0)

    // you don't have to store everything with useState
    const gmPrice = 0.000420
    const apiURL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD';


    async function fetchEthPrice() {
        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            setEthPriceInUSD(data.ethereum.usd);
        } catch (error) {
            console.error('Failed to fetch ETH price:', error);
        }
    }

    const incQty = async () => {
        setGMQuantity(gmQuantity+1)
    }

    const decQty = () => {
        if(gmQuantity > 1)
        setGMQuantity(gmQuantity-1)
    }

    useEffect(() => {
        fetchEthPrice()
    },[])
    // ^ an empty useEffect array only runs once on load
    // otherwise useEffect also runs whenever the component changes
    useEffect(() => {
        const totalPriceEth = gmQuantity * gmPrice;
        setGMTotal((totalPriceEth * ethPriceInUSD));
    }, [ethPriceInUSD, gmQuantity, gmPrice])
    // ^ when you add dependencies, it runs when those are changed

    return (
        <div className="quantity-price-module">
            <h2>GM Machine</h2>
                <button id="mintGmButton">GM</button>
                <div className="mint-options">
                    <button onClick={decQty} id="decreaseQuantity" className="quantity-adjust">-</button>
                    <input type="number" id="nftQuantity" className="nft-quantity-input" value={gmQuantity} onChange={() => setGMQuantity} min="1" />
                    <button onClick={incQty} id="increaseQuantity" className="quantity-adjust">+</button>
                </div>

                <div className="recessed-field">
                <h3>Total Price: <span id="totalPriceEth">{gmPrice} ETH</span></h3>
                </div>
               
                <div className="recessed-field">
                <h3>USD: <span id="totalPriceUsd">${gmTotal.toFixed(2)} USD</span></h3>
                </div>
                <hr></hr>
                <div className="recessed-field">
                <h3>balance of connected wallet</h3>
                </div>

        </div>
    )
}