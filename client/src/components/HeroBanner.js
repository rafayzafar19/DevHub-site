import heroHeadphones from '../assets/hero-headphones.png.jpg';

const HeroBanner = () => {
    return (
      <div className="bg-[#E1F3F3] px-6 py-16 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        {/* Left Side Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Latest Trending <br /> Electronic Items
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Discover the most loved gadgets of the year.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Shop Now
          </button>
        </div>
  
        {/* Right Side Image */}
        <div className="md:w-1/2">
          <img
            src={heroHeadphones}
            alt="Hero"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    );
  };
  
  export default HeroBanner;
  