const ImageAboutUs = () => {
    return (
      <div>
        {/* Images */}
        <div className="relative flex flex-col md:flex-row items-center justify-center p-16">
            {/* Background World Map */}
            <div className="absolute inset-0 bg-[url('/images/dotted-map.png')] bg-contain bg-no-repeat w-[100%] h-[100%]"></div>
            {/* Image Container */}
            <div className="relative">
              {/* Second Image (Lớp dưới, lớn hơn) */}
              <div className="relative right-36 w-[100%] h[100%] rounded-xl overflow-hidden z-10">
                <img
                  src="/images/AboutUs2.png"
                  alt="Online Class"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* First Image (Lớp trên, nhỏ hơn) */}
              <div className="absolute top-0 right-0 w-60 h-72 rounded-xl overflow-hidden shadow-md z-10">
                <img
                  src="/images/AboutUs1.png"
                  alt="Teacher"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Paper Plane SVG */}
            <div className="absolute -left-12 -bottom-3">
              <img src="/images/PaperPlan.png" alt="Paper Plane" className="w-[100%] h-[100%]" />
            </div>

            <div className="absolute right-40 bottom-32">
              <img src="/images/dotted-line.png" alt="DottedLine" className="w-[100%] h-[100%] " />
            </div>

            {/* Experience Badge */}
            <div className="flex absolute z-10 bottom-8 right-40 w-80 h-28 bg-[url('/images/exp.png')] bg-cover p-6 text-[22px] leading-[1.2] font-bold text-white shadow-lg shadow-black/25 animate-bounce">
              <span className="text-7xl font-bold">16</span> 
              <h2 className="text-white mt-2 ml-4">Years of Experience</h2>
            </div>
          </div>
      </div>
    );
  };
  
  export default ImageAboutUs;
  