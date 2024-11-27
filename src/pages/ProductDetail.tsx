import React, { useState, useEffect } from "react";

import ProductArticle from "../components/ProductArticle";
import ProductOverview from "../components/ProductOverview";
import ProductSuggestions from "../components/ProductSuggestions";
import SampleProductData from "../data/product-detail.json";
import Socials from "../components/Socials";
import { useParams } from "react-router-dom";
import * as ProductService from "../apis/ProductService";
import { Product } from "../interfaces/Product";
const ProductDetailPage: React.FC = () => {
  //Scroll to top

  const [product, setProduct] = useState<Product>({
    _id: "",
    name: "",
    description: "",
    category: "",
    subCategory: "",
    brand: "",
    url: "",
    price: 0,
    starting_price: "",
    sale_percentage: 0,
    stock: 0,
    images: [],

    colors: [{ title: "", hex: "" }],
    specifications: [{ type: "", title: "", description: "" }],
    gift_value: "",
    reviews: [],
    averageRating: 0,
  });
  //get id from url
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const getDetailsProduct = async () => {
    if (id) {
      const resDetailProduct = await ProductService.getProductDetails(id);
      if (resDetailProduct.status === "OK") {
        console.log(resDetailProduct.data);
        setProduct(resDetailProduct.data);
      } else {
        console.error(resDetailProduct.message);
      }
    } else {
      console.error("Product ID is undefined");
    }
  };

  useEffect(() => {
    getDetailsProduct();
  }, [id]);

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex">
        <div className="w-3/5">
          <ProductArticle data={product} />
        </div>
        <div className="w-2/5 ml-5">
          <ProductOverview data={product} />
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
