
import { achievementsList } from "../store/achievements";

interface AchievementsProps{
  achievements: typeof achievementsList;
}
const Achievements: React.FC<AchievementsProps> = ({achievements}) => {
  // Hardcoded example achievements

  return (
    <div className="flex flex-col bg-gray-800 rounded-3xl shadow-2xl p-6 max-h-[760px] min-w-[320px] md:min-w-[400px] lg:min-w-[480px] overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-white select-none">🏆 Achievements</h1>
      <div className="flex flex-col gap-4">
        {achievements.map(({ id, title, description, achieved }) => (
          achievements.sort((a, b) => a.id - b.id),
          <div
            key={id}
            className={`p-4 rounded-xl transition-all ${
              achieved ? "bg-emerald-600 text-white shadow-lg" : "bg-gray-700/80 text-gray-300"
            }${id === 99 ? " bg-orange-400 text-center" : ""}`}
          >
            <h3 className={`${id === 99 ? "text-lg font-bold text-indigo-100" : "text-lg font-semibold"}`}>{title}</h3>
            <p className={`${id === 99 ? "text-[16px] text-amber-100" : "text-sm"}`}>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
