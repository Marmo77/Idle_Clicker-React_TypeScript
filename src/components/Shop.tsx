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
    <div className="fixed right-0 top-0 h-full w-96 flex flex-row">
      {/* Shop sidebar container */}
      <div className="flex-1 shadow-lg bg-gray-800/95 backdrop-blur-lg border-l border-gray-700 overflow-y-auto p-6">
        <h1 className='text-2xl font-bold mb-6 text-center text-white'>🛒 Upgrade Shop</h1>
        <div></div>
        {/* Click Upgrades Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-emerald-400 flex items-center">
            <span className="mr-2">🐭</span> Click Upgrades
          </h2>
          <div className="space-y-3">
            {upgrades.map((upgrade) => (
              <div key={upgrade.id} className="bg-gray-700/80 hover:bg-gray-700 transition-all rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white">{upgrade.name}</h3>
                    <p className="text-sm text-gray-300">+{upgrade.power} power</p>
                    <p className="text-xs text-gray-400">Owned: {upgrade.countUpgrades}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-white">
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
        </div>

        {/* Passive Income Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-indigo-400 flex items-center">
            <span className="mr-2">♻️</span> Passive Workers
          </h2>
          <div className="space-y-3">
            {workers.map((worker) => (
              <div key={worker.id} className="bg-indigo-900/30 hover:bg-indigo-900/50 transition-all rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white">{worker.name}</h3>
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
        </div>
      </div>
    </div>
  );
};

export default Shop;