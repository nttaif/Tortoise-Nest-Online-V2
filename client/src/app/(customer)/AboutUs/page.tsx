import BannerAboutUs from "@/components/aboutus/banner.component";
import ImageAboutUs from "@/components/aboutus/Image.component";
import ProfileCard from "@/components/aboutus/profilecard.component";
import Pattern from "@/components/aboutus/pattern.component";

const profiles = [
  { name: "Edward Norton", role: "Artist", image: "/images/LongNguyen.jpg" },
  { name: "Jane Seymour", role: "Designer", image: "/images/taihocbai.jpg" },
  { name: "Mike Hardson", role: "Developer", image: "/images/taihocbai.jpg" },
  { name: "Christine Eve", role: "Photographer", image: "/images/taihocbai.jpg" }
];

const AboutUsPage = () => {
  return (
    <div>
      <BannerAboutUs/>
      {/* About Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <ImageAboutUs/>

          {/* Content */}
          <div>
            <h3 className="text-green-500 font-semibold">GET TO KNOW US</h3>
            <h2 className="text-3xl font-bold mt-2">
              Grow your skills, learn with us from anywhere
            </h2>
            <p className="text-gray-600 mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
              eiusmod tempor incididunt labore dolore magna aliqua enim.
            </p>

            {/* Features */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-red-500 text-xl">✔</span>
                <span>Expert trainers</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-500 text-xl">✔</span>
                <span>Online learning</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500 text-xl">✔</span>
                <span>Lifetime access</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500 text-xl">✔</span>
                <span>Great results</span>
              </div>
            </div>

            {/* Button */}
            <button className="mt-6 px-6 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition">
              Discover More
            </button>
          </div>
        </div>
      </section>
      
      {/*Pattern Courses*/}
      <Pattern/>

      {/*Profile*/}
      <section className="relative overflow-hidden py-32">
        <div className="flex-col flex px-4 w-full mx-auto justify-center items-center p-6">
          <div className="text-center mb-6">
            <span className="text-base font-bold leading-tight text-[#00c7c4] inline-block">QUALIFIED TEACHERS</span>
            <h2 className="text-5xl text-black font-bold leading-tight mt-2 text-center">
              Meet the teacher who {""}
              <br className="hidden sm:block"/>
              teaches you online
            </h2>
          </div>  
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profiles.map((profile, index) => (
              <ProfileCard key={index} {...profile} />
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default AboutUsPage;
