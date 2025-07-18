import { useState, useEffect } from 'react';
import CoinClick from './components/CoinClick';
import Shop from './components/Shop';
import Reset from './components/Reset';
import CodeReedem from './components/CodeReedem';
import { ToasterProvider } from './components/ToasterProvider';
import toast from 'react-hot-toast';
import Achievements from './components/Achievements';
import ToggleButton from './components/ToggleButton';
import Advertisements from './components/Advertisements';

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

  // SHOP ACHIEVEMNTS SLIDER
  const [isShop, setIsShop] = useState<boolean>(false)



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

                  {/* <div> */}
              {/* <Shop 
                workers={workers} 
                upgrades={upgrades} 
                coins={coins} 
                buyUpgrade={buyUpgrade} 
                buyWorker={buyWorker} 
              /> */}
              {/* </div> */}
              {/* <Achievements/> */}
          {/*</div>
          {/* <Reset/>
          <CodeReedem codes={Codes} ReedemCode={ReedemCode}/>
          <ToasterProvider/> */}
return (
  <>
    <div className={`min-h-screen ${theme.dark} ${theme.text} p-6 flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-screen-2xl items-start">
        
        {/* Left column: Advertisements & CodesReedems */}
        <div className="flex flex-col justify-start relative text-gray-300 px-0 h-[760px] w-[320px] md:w-[400px] lg:w-[420px] rounded-3xl shadow-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-700 to-blue-700 py-4 px-8 flex items-center gap-2 shadow-md">
            <span className="text-2xl font-bold tracking-wide text-white">🎁 Advertisements</span>
            <span className="ml-auto text-xs bg-blue-900 px-2 py-1 rounded-full text-blue-200">Soon</span>
          </div>
          {/* Placeholder for advertisements */}
          <Advertisements alttext="No advertisements yet" />
          {/* Divider */}
          <div className="flex items-center px-8 py-2">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="mx-4 text-gray-400 font-semibold text-sm tracking-wider">Redeem Codes</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>
          {/* CodeReedem */}
          <div className="flex flex-col items-center px-6 pb-2">
            <CodeReedem codes={Codes} ReedemCode={ReedemCode} />
          </div>
          {/* RESET BUTTON */}
          <div className="flex justify-center px-6 py-3">
            <Reset/>
          </div>
        </div>

        {/* Middle column: CoinClick */}
        <div className="flex justify-center h-fit w-full max-w-md rounded-3xl shadow-2xl p-8 items-start bg-gray-800">
          <CoinClick 
            clicks={clicks} 
            theme={theme}
            coins={coins} 
            clickPower={clickPower} 
            addCoins={addCoins} 
            autoclickPower={workerPower} 
          />
        </div>

        {/* Right column: Shop + Buttons */}
        <div className="flex flex-col items-center w-full min-w-[320px] md:min-w-[400px] lg:min-w-[480px]">
          
          {/* Buttons container - fixed height so it doesn't push Shop down */}
          <div className="mb-4 flex fixed -mt-18 gap-4 justify-center w-full max-w-[480px]">
           <ToggleButton isShop={isShop} setIsShop={setIsShop} />
          </div>

          {/* Shop container */}
          <div className="h-[760px] min-w-[320px] md:min-w-[400px] lg:min-w-[480px]">
            {isShop ? (
              <Shop 
                workers={workers} 
                upgrades={upgrades} 
                coins={coins} 
                buyUpgrade={buyUpgrade} 
                buyWorker={buyWorker} 
              />
            ) : (
              <Achievements />
            )}
          </div>

        </div>
            <ToasterProvider/>
      </div>
    </div>
  </>
);

}


export default App;