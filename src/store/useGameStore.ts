// import { create } from "zustand";
import { useState } from "react";

// WSZYSTKIE WARTOŚCI GRY, TO CO TRZEBA WIEDZIEĆ O AKTUALNYM STATUSIE GRY
// interface GameState {
//     coins: number, // MONETY
//     clickPower: number, // ILE za 1 klikniecie
//     autoClickPower: number, //ILE automatycznie przyznawać
//     workers: number, //Liczba pracowników
//     addCoins: (amount: number) => void, //dodawanie monet
//     upgradeClick: () => void, // ulepszenia
//     upgradeAuto: () => void,
//     hireWorker: () => void, // dodawanie pracowników 
//     tick: () => void, //tick
// }

interface GameState {
    coins: number,
    clickPower: number,
    addCoins: () => void;
}
// export const useGameStore = create<GameState>((set, get) => ({
//     coins: 0,
//     clickPower: 1,

//     addCoins: () => {
//         const {coins, clickPower} = get();
//         set({ coins: coins + clickPower})
//     }

// }))


const Clicker