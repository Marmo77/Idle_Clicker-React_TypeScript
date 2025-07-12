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
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center p-8 rounded-2xl bg-gray-700/50 backdrop-blur-sm w-full max-w-md">
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-emerald-400 mb-2">{coins}</h1>
          <p className="text-sm text-gray-400">coins</p>
        </div>
        
        <button
          onClick={addCoins}
          className="relative group"
        >
          <div className={`absolute -inset-1 bg-emerald-400/30 rounded-full blur opacity-75 group-hover:opacity-100 transition-all duration-200`}></div>
          <div className={`relative px-10 py-6 rounded-full ${theme.secondary} text-white text-2xl font-bold transition-all duration-300 transform group-hover:scale-105 active:scale-100`}>
            🌱
          </div>
        </button>

        <div className="mt-10 grid grid-cols-2 gap-4 text-left">
          <div className="bg-gray-700/50 p-4 rounded-xl">
            <p className="text-sm text-gray-400">Click Power</p>
            <p className="text-xl font-bold text-emerald-400">{clickPower}</p>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-xl">
            <p className="text-sm text-gray-400">Passive Income</p>
            <p className="text-xl font-bold text-indigo-400">{autoclickPower}/s</p>
          </div>
          <div className="col-span-2 bg-gray-700/50 p-4 rounded-xl">
            <p className="text-sm text-gray-400">Total Clicks</p>
            <p className="text-xl font-bold">{clicks}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinClick;