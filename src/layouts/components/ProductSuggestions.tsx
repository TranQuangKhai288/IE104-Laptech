import CheckLightBg from "../../components/CheckLightBg";
import suggestionsData from "../../data/product-suggestions.json";

const ProductSuggestions = () => {
  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {suggestionsData.map((suggestion) => (
            <a
              key={suggestion.id}
              href={suggestion.url}
              className="p-4 rounded-lg bg-white shadow-md transition ease-in-out hover:-translate-y-2 hover:shadow-xl hover:border-blue-500 border-2 border-white block"
            >
              <img src={suggestion.image} alt="" />
              <div className="font-bold mb-2">{suggestion.title}</div>
              <div className="flex flex-row space-x-2">
                <div>Từ</div>
                <div className="font-bold text-red-500">
                  {suggestion.starting_price}
                </div>
                {suggestion.sale_percentage === 0 ? (
                  ""
                ) : (
                  <div className="text-sm rounded bg-[#FFEAEA] px-1 text-red-500">
                    -{suggestion.sale_percentage}%
                  </div>
                )}
              </div>
              <div className="flex flex-row space-x-2">
                <div>Màu</div>
                {suggestion.colors.map((color, index) => (
                  <div key={index} className="flex items-center justify-end">
                    <CheckLightBg bgColor={color.hex} />
                  </div>
                ))}
              </div>
              <hr className="my-4 border-b-1 border-gray-300 border-b-0 mb-4" />
              <div className="text-sm text-gray-500">
                {suggestion.specs.map((part, index) => (
                  <div key={index} className="text-sm px-2">
                    {part.title}: {part.description}
                    <br />
                  </div>
                ))}
              </div>
              {Object.keys(suggestion.gift_value).length === 0 ? (
                ""
              ) : (
                <div>
                  <hr className="my-4 border-b-1 border-gray-300 border-b-0 mb-4" />
                  <div className="underline">
                    Qùa tặng {suggestion.gift_value}
                  </div>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center mt-12">
        <button className="bg-white font-bold text-xl text-blue-500 py-4 px-24 rounded-lg shadow transition ease-in-out hover:bg-blue-50">
          Xem thêm
        </button>
      </div>
    </div>
  );
};

export default ProductSuggestions;
