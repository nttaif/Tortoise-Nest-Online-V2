const BannerAboutUs = () => {
  return (
    <div>
        {/* Banner Section */}
      <div className="relative h-[300px] flex items-center text-white">
        <img
          src="/images/BannerAboutUs.png"
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative max-w-screen-xl w-full px-6 md:px-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white">About Us</h1>
          <ul className="flex space-x-2 text-lg mt-2">
            <li><a href="/" className="text-[#00c7c4] hover:underline">Home</a></li>
            <li>›</li>
            <li className="text-[#00c7c4]">About Us</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BannerAboutUs;
