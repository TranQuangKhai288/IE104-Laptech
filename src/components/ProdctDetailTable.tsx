import React from "react";
import { Product } from "../interfaces/Product";

interface customProps {
  data: Product;
}
const ProductDetailTable: React.FC<customProps> = ({ data }) => {
  return (
    <table>
      <tbody>
        {/* {data.specList[3].detail?.detailSpec?.map((item, itemIndex) => (
          <>
            <tr key={itemIndex}>
              <th
                colSpan={2}
                scope="colgroup"
                className="text-left bg-gray-200 p-2 pl-4"
              >
                {item.title}
              </th>
            </tr>
            {item.specs.map((part, partIndex) => (
              <tr key={partIndex}>
                <td className="p-2 pl-4 w-1/3">{part.title}</td>
                <td className="p-2 pl-4">{part.description}</td>
              </tr>
            ))}
          </>
        ))} */}
      </tbody>
    </table>
  );
};

export default ProductDetailTable;
