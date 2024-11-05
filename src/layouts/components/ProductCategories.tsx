import productCategoriesData from "../../data/product-categories.json";

const ProductCategories = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productCategoriesData.map((item) => (
          <a
            key={item.id}
            href={item.url}
            className="p-6 container flex flex-col items-center md:flex-row rounded-lg shadow-md bg-white transition ease-in-out hover:-translate-y-1 hover:bg-blue-100"
          >
            <div className="md:w-1/5">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="md:w-4/5 md:px-8">
              <p className="font-bold text-xl">{item.title}</p>
              <p className="text-sm">{item.quantity} sản phẩm</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
