import { useNavigate } from "react-router-dom";
import mostSearchedTagsData from "../data/most-searched-tags.json";

const MostSearchedTags = () => {
  const navigate = useNavigate();
  const handleSearch = (tag: string) => {
    navigate(`/search?key-word=${tag}`);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {mostSearchedTagsData.map((tag, index) => (
        <div
          key={index}
          // href={tag.url}
          className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm transition ease-in-out hover:-translate-y-1 hover:shadow-md cursor-pointer"
          onClick={() => handleSearch(tag.title)}
        >
          {tag.title}
        </div>
      ))}
    </div>
  );
};

export default MostSearchedTags;
