import {
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Logo */}
          <div className="flex flex-col gap-4 justify-center items-center">
            <img
              src="https://www.reshot.com/preview-assets/icons/KME7TXCDG4/food-addiction-KME7TXCDG4.svg"
              alt="logo"
              className="h-10 w-10"
            />
            <span className="font-bold text-2xl text-red-500 ml-2">
              <span className="text-gray-900">ZOM</span>ETO
            </span>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 flex-1">
            {/* About */}
            <div>
              <h3 className="text-black font-bold uppercase text-sm mb-4">
                About Zomato
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Who We Are</li>
                <li>Blog</li>
                <li>Work With Us</li>
                <li>Investor Relations</li>
                <li>Report Fraud</li>
                <li>Press Kit</li>
                <li>Contact Us</li>
              </ul>
            </div>

            {/* Zomaverse */}
            <div>
              <h3 className="text-black font-bold uppercase text-sm mb-4">
                Zomaverse
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Zomato</li>
                <li>Blinkit</li>
                <li>District</li>
                <li>Feeding India</li>
                <li>Hyperpure</li>
                <li>Zomato Live</li>
                <li>Zomaland</li>
                <li>Weather Union</li>
              </ul>
            </div>

            {/* For Restaurants */}
            <div>
              <h3 className="text-black font-bold uppercase text-sm mb-4">
                For Restaurants
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Partner With Us</li>
                <li>Apps For You</li>
              </ul>
            </div>

            {/* Learn More */}
            <div>
              <h3 className="text-black font-bold uppercase text-sm mb-4">
                Learn More
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Privacy</li>
                <li>Security</li>
                <li>Terms</li>
              </ul>
            </div>

            {/* Social */}
            <div className="flex flex-col  items-center">
              <h3 className="text-black font-bold uppercase text-sm mb-4">
                Social Links
              </h3>
              <div className="flex gap-3 mb-4">
                <FaLinkedin className="text-black cursor-pointer" />
                <FaInstagram className="text-black cursor-pointer" />
                <FaXTwitter className="text-black cursor-pointer" />
                <FaYoutube className="text-black cursor-pointer" />
                <FaFacebook className="text-black cursor-pointer" />
              </div>
              <div className="flex flex-col  gap-3">
                <img
                  src="https://b.zmtcdn.com/data/webuikit/9f0c85a5e33adb783fa0aef667075f9e1556003622.png"
                  alt="App Store"
                  className="h-10 object-contain cursor-pointer"
                />
                <img
                  src="https://b.zmtcdn.com/data/webuikit/23e930757c3df49840c482a8638bf5c31556001144.png"
                  alt="Google Play"
                  className="h-10 object-contain cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-10 pt-6">
          <p className="text-xs text-gray-500">
            By continuing past this page, you agree to our Terms of Service,
            Cookie Policy, Privacy Policy and Content Policies. All trademarks
            are properties of their respective owners. 2008-
            {new Date().getFullYear()} © Zomato™ Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
