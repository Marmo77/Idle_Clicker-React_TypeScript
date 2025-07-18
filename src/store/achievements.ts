
export interface Achievement {
    id: number;
    title: string;
    description: string;
    achieved?: false | boolean;
}


export const achievementsList: Achievement[] = [
    { id: 1, title: "First Click", description: "Make your first click" },
    { id: 2, title: "100 Coins", description: "Collect 100 coins"},
    { id: 3, title: "Auto Worker", description: "Hire your first worker"},
    { id: 4, title: "Power Clicker", description: "Reach click power of 50"},
    { id: 5, title:"Passive Income Bussiness!", description:"Getting 50 coins/s passivly"},
    { id: 6, title:"Bussiness Shark", description:"150 click POWERR!"},
    { id: 7, title:"Mini Own Army!", description:"Buy 40 Mini Soldiers"},
    { id: 8, title:"Stiff finger", description:"Click button 1000 times."},
    { id: 9, title:"Hustler", description:"Have 50 000 coins"},
    {id: 99, title: "More Acheivements", description: "More achievements coming soon!", achieved: true},
  ];

export function loadAchievementStatus(): boolean[] {
    const stored = localStorage.getItem("achievements");
    return stored ? JSON.parse(stored) : Array(achievementsList.length).fill(false);
}
export function saveAchievementStatus(status: boolean[]) {
  localStorage.setItem("achievements", JSON.stringify(status));
}