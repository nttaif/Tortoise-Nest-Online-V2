import { Button } from "@/components/ui/button"
import ClientSideAnimations from "./client-side-animations"
import AnimatedImages from "./animated-images"

export default function SlideShow() {
  return (
    <div className="relative w-full h-[800px] bg-[#F7F5F2] overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: 'url("/assets/1-BJJr4RJS.jpg")',
        }}
      />
      <div className="container mx-auto h-full max-w-[1440px] relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full items-center">
          {/* Content Column */}
          <div className="lg:col-span-7 md:col-span-10 px-4 md:px-6">
            <div className="space-y-6">
              <ClientSideAnimations>
                <span className="inline-block text-[#161439] font-semibold mb-4">START TO NEW JOURNEY</span>

                <h1 className="text-4xl md:text-6xl font-bold text-[#1B1B1B] leading-tight">
                  Best <span className="font-serif italic text-[#FF6B00]">online</span> <br />
                  courses from <br />
                  eduLerns
                </h1>

                <p className="text-gray-600 text-lg md:text-xl">
                  World-class training and development programs <br />
                  developed by top teachers
                </p>

                <div>
                  <Button className="bg-[#161439] hover:bg-[#0d6efd] text-white px-8 py-6 rounded-full text-lg">
                    Explore More
                  </Button>
                </div>
              </ClientSideAnimations>
            </div>
          </div>

          {/* Image Column */}
          <div className="hidden lg:block lg:col-span-5 relative h-full">
            <AnimatedImages />
          </div>
        </div>
      </div>
    </div>
  )
}

