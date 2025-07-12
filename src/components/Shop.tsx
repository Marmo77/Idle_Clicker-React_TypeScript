import React from 'react';

interface Upgrade {
  id: string;
  name: string;
  power: number;
  countUpgrades: number;
  currentPrice: number;
}

interface Workers {
  id: string;
  name: string;
  autocoins: number;
  currentPrice: number;
}

interface Props {
  upgrades: Upgrade[];
  coins: number;
  workers: Workers[]; 
  buyUpgrade: (id: string) => void;
  buyWorker: (id: string) => void;
}

const Shop: React.FC<Props> = ({ workers, upgrades, coins, buyUpgrade, buyWorker }) => {
  return (
    <div className="flex flex-col bg-gray-800 rounded-3xl shadow-2xl p-6 h-[600px] min-w-[320px] md:min-w-[400px] lg:min-w-[480px]">
      <h1 className="text-3xl font-bold mb-6 text-center text-white select-none">🛒 Upgrade Shop</h1>

      {/* Container for the two sections side-by-side */}
      <div className="flex flex-grow gap-6 overflow-y-auto">
        
        {/* Click Upgrades Section */}
        <section className="flex flex-col flex-1 min-w-0">
          <h2 className="text-lg font-semibold mb-4 text-emerald-400 flex items-center select-none">
            <span className="mr-2">🐭</span> Click Upgrades
          </h2>
          <div className="flex flex-col gap-4 overflow-y-auto">
            {upgrades.map((upgrade) => (
              <div
                key={upgrade.id}
                className="bg-gray-700/80 hover:bg-gray-700 transition-all rounded-xl p-4 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div className=''>
                    <h3 className="font-bold text-wrap text-white truncate">{upgrade.name}</h3>
                    <p className="text-sm text-gray-300">+{upgrade.power} power</p>
                    <p className="text-xs text-gray-400">Owned: {upgrade.countUpgrades}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-nowrap font-bold text-white">
                      {upgrade.currentPrice} <span className="text-yellow-400">💰</span>
                    </p>
                    <button
                      onClick={() => buyUpgrade(upgrade.id)}
                      disabled={coins < upgrade.currentPrice}
                      className={`mt-2 px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        coins < upgrade.currentPrice
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Passive Income Section */}
        <section className="flex flex-col flex-1 min-w-0">
          <h2 className="text-lg font-semibold mb-4 text-indigo-400 flex items-center select-none">
            <span className="mr-2">♻️</span> Passive Workers
          </h2>
          <div className="flex flex-col gap-4 overflow-y-auto">
            {workers.map((worker) => (
              <div
                key={worker.id}
                className="bg-indigo-900/30 hover:bg-indigo-900/50 transition-all rounded-xl p-4 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div className='self-start'>
                    <h3 className="font-bold text-white truncate">{worker.name}</h3>
                    <p className="text-sm text-gray-300">+{worker.autocoins}/s</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-white">
                      {worker.currentPrice} <span className="text-yellow-400">💰</span>
                    </p>
                    <button
                      onClick={() => buyWorker(worker.id)}
                      disabled={coins < worker.currentPrice}
                      className={`mt-2 px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        coins < worker.currentPrice
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      }`}
                    >
                      Hire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}


export default Shop;