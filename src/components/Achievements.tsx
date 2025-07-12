const Achievements: React.FC = () => {
  // Hardcoded example achievements
  const achievements = [
    { id: 1, title: "First Click", description: "Make your first click", achieved: true },
    { id: 2, title: "100 Coins", description: "Collect 100 coins", achieved: false },
    { id: 3, title: "Auto Worker", description: "Hire your first worker", achieved: false },
    { id: 4, title: "Power Clicker", description: "Reach click power of 50", achieved: false },
  ];

  return (
    <div className="flex flex-col bg-gray-800 rounded-3xl shadow-2xl p-6 max-h-[760px] min-w-[320px] md:min-w-[400px] lg:min-w-[480px] overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-white select-none">🏆 Achievements</h1>
      <div className="flex flex-col gap-4">
        {achievements.map(({ id, title, description, achieved }) => (
          <div
            key={id}
            className={`p-4 rounded-xl transition-all ${
              achieved ? "bg-emerald-600 text-white shadow-lg" : "bg-gray-700/80 text-gray-300"
            }`}
          >
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
