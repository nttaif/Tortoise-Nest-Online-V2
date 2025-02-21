import PictureMainAuthComponents from "@/components/auth/login/picture.main.auth.components";

export default function LayoutAuth({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen relative">
      {/* Bubble Background */}
      <div className="absolute w-full h-screen -z-10 bg-gradient-to-r from-[#0575E6] to-[#00F260] overflow-hidden">
        <ul className="relative w-full h-full">
          {[...Array(10)].map((_, index) => (
            <li
              key={index}
              className={`absolute bottom-[-150px] rounded-full bg-white/20 animate-bubble`}
              style={{
                width: `${[80, 20, 20, 60, 20, 110, 150, 25, 15, 150][index]}px`,
                height: `${[80, 20, 20, 60, 20, 110, 150, 25, 15, 150][index]}px`,
                left: `${[25, 10, 70, 40, 65, 75, 35, 50, 20, 85][index]}%`,
                animationDelay: `${[0, 2, 4, 0, 0, 3, 7, 15, 2, 0][index]}s`,
                animationDuration: `${[25, 12, 25, 18, 25, 25, 25, 45, 35, 11][index]}s`,
              }}
            />
          ))}
        </ul>
      </div>

      {/* Layout Content */}
      <div className="w-[45%]">{children}</div>
      <div className="w-[55%]">
        <PictureMainAuthComponents />
      </div>
    </div>
  );
}