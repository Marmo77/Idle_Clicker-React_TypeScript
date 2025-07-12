import React from 'react'
import { useState } from 'react'
interface Themas {
    primary: string;
    secondary: string;
    dark: string;
    light: string;
    text: string;
    textDark: string;
  }
interface CoinClickProps {
  clicks: number,
  coins: number,
  clickPower: number,
  autoclickPower: number,
  theme: Themas,
  addCoins: () => void;
}

const CoinClick = ({clicks, coins, clickPower, autoclickPower, theme, addCoins}: CoinClickProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      
      {/* Coins Display */}
      <div className="flex flex-col gap-1 justify-center items-center mb-8">
        <h1 className="text-6xl font-extrabold text-emerald-500 drop-shadow-lg">{coins}</h1>
        <p className="text-md text-gray-500 uppercase tracking-widest">Coins</p>
      </div>

      {/* Click Button */}
      <button
        onClick={addCoins}
        className="relative group mb-12"
        aria-label="Click to add coins"
      >
        <div className="absolute -inset-2 bg-emerald-400 rounded-full blur opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
        <div className={`relative px-14 py-8 rounded-full ${theme.secondary} text-white text-4xl font-extrabold shadow-lg transition-transform duration-300 transform group-hover:scale-110 active:scale-95 select-none cursor-pointer`}>
          🌱
        </div>
      </button>

      {/* Stats Grid */}
      <div className="w-full grid grid-cols-2 gap-6 text-left">
        <div className="bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-[101%]">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Click Power</p>
          <p className="text-2xl font-bold text-emerald-500">{clickPower}</p>
        </div>
        <div className="bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-[101%]">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Passive Income</p>
          <p className="text-2xl font-bold text-indigo-500">{autoclickPower}/s</p>
        </div>
        <div className="col-span-2 bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-[101%]">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Total Clicks</p>
          <p className="text-2xl font-bold text-gray-200">{clicks}</p>
        </div>
      </div>
    </div>
  )
}


export default CoinClick;