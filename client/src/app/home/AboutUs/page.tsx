import BannerAboutUs from "@/components/aboutus/banner.component";
import ImageAboutUs from "@/components/aboutus/Image.component";
import ProfileCard from "@/components/aboutus/profilecard.component";
import Pattern from "@/components/aboutus/pattern.component";
import EducationalLayout from "@/components/home/DiscoverMore.components";
import HeaderAuth from "@/components/home/HeaderHome.components";
import { Footer } from "@/components/admin/student/footer";
import FooterAuth from "@/components/home/Footer.component";
import { CourseCard } from "@/components/home/course-card";
import CourseCategoriesComponents from "@/components/home/course-categories.components";
import { PopularCourses } from "@/components/home/popular-courses";

const profiles = [
  { name: "Edward Norton", role: "Artist", image: "/images/LongNguyen.jpg" },
  { name: "Jane Seymour", role: "Designer", image: "/images/taihocbai.jpg" },
  { name: "Mike Hardson", role: "Developer", image: "/images/taihocbai.jpg" },
  { name: "Christine Eve", role: "Photographer", image: "/images/taihocbai.jpg" }
];

const AboutUsPage = () => {
  return (
    <div>
      <HeaderAuth/>
      <BannerAboutUs/>
      {/* About Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <ImageAboutUs/>
          {/* Content */}
          <div>
            <EducationalLayout/>
          </div>
        </div>
      </section>
      
      {/*CourseCard*/}
      <div>
        <PopularCourses/>
      </div>

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
      <FooterAuth/>
    </div>
  );
};

export default AboutUsPage;
