import mostSearchedTagsData from "../../data/most-searched-tags.json";

const MostSearchedTags = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {mostSearchedTagsData.map((tag, index) => (
        <a
          key={index}
          href={tag.url}
          className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm transition ease-in-out hover:-translate-y-1 hover:shadow-md"
        >
          {tag.title}
        </a>
      ))}
    </div>
  );
};

export default MostSearchedTags;
