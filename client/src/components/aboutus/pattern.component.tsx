import { TvMinimalPlay, UserPen, MonitorPlay, UserRound } from "lucide-react";

const features = [
    { icon: <TvMinimalPlay color="white" size={70} /> , title: "Online Certifications" },
    { icon: <UserPen color="white" size={70} />, title: "Top Instructors" },
    { icon: <MonitorPlay color="white" size={70} />, title: "Unlimited Online Courses" },
    { icon: <UserRound color="white" size={70} />, title: "Experienced Members" },
  ];

const Pattern = () => {
    return (
        <div className="relative bg-[#7054e6] text-white py-10">
        {/* Hình nền */}
        <img
          src="/images/BannerAboutUs2.png"
          alt="Cover2"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Nội dung */}
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group flex items-center space-x-4 px-6 py-4 ${index !== 0 ? "border-l border-white/50" : ""}`}
            >
              {/* Icon có hiệu ứng lật ngang khi hover */}
              <div className="transition-transform duration-300 group-hover:scale-x-[-1]">
                {feature.icon}
              </div>
              {/* Nội dung */}
              <p className="text-lg font-semibold">{feature.title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Pattern;
  