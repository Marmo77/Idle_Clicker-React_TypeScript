import { useState, useEffect } from 'react';
import CoinClick from './components/CoinClick';
import Shop from './components/Shop';
import Reset from './components/Reset';
import CodeReedem from './components/CodeReedem';
import { ToasterProvider } from './components/ToasterProvider';
import toast from 'react-hot-toast';
import Achievements from './components/Achievements';

const defaultUpgrades = [
  { id: 'mini', name: 'Mini Soldier', basePrice: 10, power: 1, countUpgrades: 0},
  { id: 'super', name: 'Super Clicker', basePrice: 50, power: 5, countUpgrades: 0},
  { id: 'mega', name: 'Mega Bot', basePrice: 200, power: 20, countUpgrades: 0},
  { id: 'duper', name: 'Super Duper Cop', basePrice: 500, power: 50, countUpgrades: 0}
];

const Codes = [
  {
    id: 0,
    code: "Marek",
    value: 70000,
    category: "coins",
  },
  {
    id: 1,
    code: "Bomba",
    value: 1,
    category: "prank",
  },
    {
    id: 2,
    code: "Wieśmak",
    value: 10000,
    category: "clicks",
  },
  {
    id: 3,
    code: "Kobrakaj",
    value: 150000,
    category: "coins",
  },
    {
    id: 4,
    code: "Wino",
    value: 200,
    category: "power",
  },
  {
    id: 5,
    code: "Ferdek",
    value: 5000,
    category: "autocoins",
  }
]

const passiveUpgrades = [
  // autocoins == X coins/sec.
  {id: 'miner', name: "Robert", basePrice: 4000, autocoins: 1, },
  {id: 'worker', name: "Marek", basePrice: 7000, autocoins: 6, },
  {id: 'engineer', name: "Paździoch", basePrice: 10000, autocoins: 10, },
]


const theme = {
  primary: 'bg-indigo-600',
  secondary: 'bg-emerald-500',
  dark: 'bg-gray-800',
  light: 'bg-gray-100',
  text: 'text-gray-100',
  textDark: 'text-gray-800'
};


// ###########################
// WHAT WE NEED TO DO?
// -- save everything to localstore
// -- add posibilites to buy items
// -- create scripts so we can buy items in shop
// test everything out



function App() {
  const [coins, setCoins] = useState<number>(Number(localStorage.getItem("coins")) || 0);
  const [clickPower, setClickPower] = useState<number>(Number(localStorage.getItem("clickPower")) || 1);
  const [workerPower, setWorkerpower] = useState<number>(Number(localStorage.getItem("autoclickPower")) || 0)
  const [clicks, setClicks] = useState<number>(Number(localStorage.getItem("clicks")) || 0);
  // Initialize upgrades with base prices
  const [upgrades, setUpgrades] = useState(() => {
    return defaultUpgrades.map(item => ({
      ...item,
      currentPrice: Number(localStorage.getItem(`upgrade_${item.id}_price`) || item.basePrice),
      countUpgrades: Number(localStorage.getItem(`upgrade_${item.id}_count`) || 0)
    }))
  })
  // 

  const [workers, setWorkers] = useState(() => { 
    return passiveUpgrades.map((item) => ({
    ...item,
    currentPrice: Number(localStorage.getItem(`worker_${item.id}_price`) || item.basePrice),
    }))
  })


  // ZAPISYWANIE DO LOCAL STORAGE

  // MONET i KLIKNIĘĆ
  useEffect(() => {
    localStorage.setItem("coins", String(coins));
    localStorage.setItem("clickPower", String(clickPower));
    localStorage.setItem("clicks", String(clicks));

    upgrades.forEach(upgrade => {
      localStorage.setItem(`upgrade_${upgrade.id}_price`, String(upgrade.currentPrice));
      localStorage.setItem(`upgrade_${upgrade.id}_count`, String(upgrade.countUpgrades));
    });
  }, [coins, clickPower, clicks, upgrades]);
  // ZAPISYWANIE PRACOWNIKÓW
  useEffect(() => {
    workers.forEach(worker => {
      localStorage.setItem(`upgrade_${worker.id}_price`, String(worker.currentPrice))
    })
  }, [workers])
  // ZAPISYWANIE AUTOMATYCZNEJ SILY
  useEffect(() => {
    localStorage.setItem('autoclickPower', String(workerPower))
    workers.forEach((worker => {
      localStorage.setItem(`worker_${worker.id}_price`, String(worker.currentPrice))
    }))
  }, [workerPower])


  // AUTOCOINY PER SECOUND  X/1sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins((prev) => prev + workerPower);
    }, 1000);
    return () => clearInterval(interval);
  }, [workerPower]);

  // KUPOWANIE ULEPSZEŃ
  const buyUpgrade = (id: string) => {
    // const upgrade = defaultUpgrades.at(0);
    // if (upgrade) {
    //   setClickPower((prev) => prev + upgrade.power);
    // }
    const upgrade = upgrades.find(item => item.id === id);
    if(!upgrade || coins < upgrade.currentPrice) return;

    upgrade.countUpgrades +=1;

    setCoins(prev => prev - upgrade.currentPrice);
    setClickPower(prev => prev + upgrade.power);
    setUpgrades(prevUpgrades => 
      prevUpgrades.map(u => 
        u.id === id 
          ? { ...u, currentPrice: Math.floor(u.currentPrice * 1.15 ),
            countUpgrades: upgrade.countUpgrades
           }
          : u
      )
    );
  }

  // KUPOWANIE AUTOMATYCZNYCH ULEPSZEŃ
  const buyWorker = (id:string) => {
    const workerUpg = workers.find(worker => worker.id === id);
    if(!workerUpg || coins < workerUpg.currentPrice) return;


    //setCoins odnosi sie do ilosci monet -> bierze poprzednie(prev) i odejmuje je od obecnej ceny
    setCoins(prev=> prev - workerUpg.currentPrice) 
    //Bierze siłe automatycznego "autoclickPower"
    setWorkerpower((prev) => prev + workerUpg.autocoins)

    setWorkers(prevUpgrades => 
      prevUpgrades.map(u => 
        u.id === id 
          ? { ...u, currentPrice: Math.floor(u.currentPrice * 1.15),
           }
          : u
      )
    )
  }



  // DODAWANIE MONET I KLIKNIĘĆ NA KAŻDMY KLIKNIĘCIU
  const addCoins = () => {
    setCoins((prev) => prev + clickPower);
    setClicks((prev) => prev + 1);
  };


  // const ReedemCode = (id:number) => {
  //   console.log(Codes.at(id))
  // }
  const ReedemCode = (code:string) => {
    console.log(code)
    if (code){
      const foundCode = Codes.find(item => item.code.toLowerCase() === code.toLowerCase())
      if (foundCode) {
        switch(foundCode.category){
          case "coins":
            setCoins((prev) => prev + foundCode.value);
            toast.success(`Przypisaliśmy ci ${foundCode.value} monet do konta!`,
              {
                icon: '🪙',
                position: 'bottom-center',
                style: {
                  background: '#1f2937',
                  color: '#fff',
                  border: '1px solid #374151',             
                },
                removeDelay: 2000,
                duration: 4000,

              }
            )
            break;
          case "clicks":
            setClicks((prev) => prev+ foundCode.value)
            toast.success(`Przypisaliśmy ci ${foundCode.value} kliknięć do konta!`,
              {
                icon: '🖱️',
                position: 'bottom-center',
                style: {
                  background: '#1f2937',
                  color: '#fff',
                  border: '1px solid #374151',             
                },
                removeDelay: 2000,
                duration: 4000,

              }
            )
            break;
          case "autocoins":
            setWorkerpower((prev) => prev+ foundCode.value)
            toast.success(`${foundCode.value} Pracowników został zatrudnionych!`, {
              icon: '👷',
              style: {
                background: '#3b82f6',
                color: 'white'
              },
              removeDelay: 2000,
                duration: 4000,
            })
            break;
          case "power":
            setClickPower((prev) => prev+ foundCode.value)
              toast.success(`Przypisano ci ${foundCode.value} Siły kliknięcia`, {
              icon: '⚡',
              style: {
                background: '#3bbba6',
                color: '#fff',
                border: '1px solid #374151',             
              },
              removeDelay: 2000,
              duration: 4000,
            })
            break;                        
          case "prank":
              toast.error(`Kod ${foundCode.code} jest żartem!`, {
                icon: '😜',
                style: {
                  background: '#f87171',
                  color: '#fff',
                  border: '1px solid #374151',             
                }
              })
            break;            
          
          // You can add more cases here for other categories if needed
          default:
            toast.error(`NIEZNANY KOD`, {
                icon: '❓',
                style: {
                  background: '#f87171',
                  color: '#fff',
                  border: '1px solid #374151',             
                }
              })
            // Optionally handle unknown categories
            break;
        }
      }
      else{
        toast.error(`Nie znaleziono kodu ${code}`, {
            icon: '❔',
                style: {
                  background: '#f2355e',
                  color: '#fff',
                  border: '1px solid #374151',             
                },
                duration: 1500,
              })
      }
    }
  }

  return (
    <>
      <div className={`min-h-screen ${theme.dark} ${theme.text} p-4`}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CoinClick 
                clicks={clicks} 
                theme={theme}
                coins={coins} 
                clickPower={clickPower} 
                addCoins={addCoins} 
                autoclickPower={workerPower} 
              />
            </div>
            <div className="flex flex-col bg-amber-200">
              <div>
              <Shop 
                workers={workers} 
                upgrades={upgrades} 
                coins={coins} 
                buyUpgrade={buyUpgrade} 
                buyWorker={buyWorker} 
              />
              </div>
              <div>
              <Achievements/>
              </div>
            </div>
          </div>
          <Reset/>
          <CodeReedem codes={Codes} ReedemCode={ReedemCode}/>
          <ToasterProvider/>
        </div>
    </>
  );
}

export default App;