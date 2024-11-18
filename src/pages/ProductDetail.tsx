import React from "react";

import ProductArticle from "../components/ProductArticle";
import ProductOverview from "../components/ProductOverview";
import ProductSuggestions from "../components/ProductSuggestions";
import SampleProductData from "../data/product-detail.json";
import Socials from "../components/Socials";

const ProductDetailPage: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex">
        <div className="w-3/5">
          <ProductArticle data={SampleProductData} />
        </div>
        <div className="w-2/5 ml-5">
          <ProductOverview data={SampleProductData} />
        </div>
      </div>
      <section>
        <ProductSuggestions />
      </section>
      <Socials />
    </div>
  );
};

export default ProductDetailPage;
