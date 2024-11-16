import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Socials = () => {
  return (
    <div className="fixed bottom-5 right-5 flex flex-col space-y-2">
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <FaFacebook />
      </a>
      <a
        href="https://www.twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-400 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-blue-500 transition"
      >
        <FaTwitter />
      </a>
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-pink-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-pink-600 transition"
      >
        <FaInstagram />
      </a>
    </div>
  );
};

export default Socials;
