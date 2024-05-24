"use client"
import { useState } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

export default function StakingModule() {
    const [gmQuantity, setGMQuantity] = useState(1)

    const incQty = async () => {
        setGMQuantity(gmQuantity + 1)
    }

    const decQty = () => {
        if (gmQuantity > 1)
            setGMQuantity(gmQuantity - 1)
    }

    return (
        <section className="stake">
            <h1>GM Stake Station </h1>

            <div className="gm-stake-container">
                <div className="gm-box">
                    <h3>In Wallet GMs</h3>
                    <div className="recessed-field">
                        <h3>5</h3>
                    </div>
                </div>
                <div className="gm-box">
                    <h3>Staked GMs</h3>
                    <div className="recessed-field">
                    <h3>17</h3>
                    </div>
                </div>
            </div>

            <div className="mint-options">
                <button onClick={decQty} id="decreaseQuantity" className="quantity-adjust">-</button>
                <input type="number" id="nftQuantity" className="nft-quantity-input" value={gmQuantity} onChange={() => setGMQuantity} min="1" />
                <button onClick={incQty} id="increaseQuantity" className="quantity-adjust">+</button>
            </div>

            <div className="button-container">
                <button id="stakeButton" className="action-button">Stake</button>
                <button id="unstakeButton" className="action-button">Unstake</button>
            </div>
            
            <hr />

            <h2>Total Staking Rewards</h2>
            <p>1 OTG / Hour / GM</p>
            <div className="recessed-field">
            <h3>5,6789 OTG</h3>
            </div>
            <button id="redeemButton" className="action-button">Redeem</button>
        </section>
    )
}
