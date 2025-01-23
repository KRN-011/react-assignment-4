import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { TbBrandAppgallery } from "react-icons/tb";
import { TiStarFullOutline } from "react-icons/ti";
import { IoMdPricetag } from "react-icons/io";
import { BiSolidDollarCircle } from "react-icons/bi";

interface Product {
  id: number;
  title: string;
  category: string;
  brand: string;
  rating: number;
  price: number;
  discountPercentage: number;
  thumbnail: string;
}
const Products = () => {

  const navigate = useNavigate()

  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const limit = 8;
  const skip = parseInt(params.get("skip") || "0");
  const API = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;
  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(API);
      const data = await response.json();
      setProducts(data.products);
      setTotalProducts(data.total);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setIsLoading(false)
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [skip]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setParams({ skip: (selected * limit).toString(), limit: limit.toString() });
  };

  // click on product to open details
  const handleProductDetail = (id: number) => {
    navigate(`/product/${id}`)
  }

  return (
    <>
      {
        isLoading ? <div className="flex justify-center items-center text-2xl font-semibold h-[20vh]">Loading...</div> :
          <div className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div onClick={() => handleProductDetail(product.id)}
                  className="cursor-pointer border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow flex flex-col justify-between"
                  key={product.id}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-contain rounded-md mb-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-700 bg-zinc-300 w-fit px-2 rounded-2xl my-2">
                      {product.category}
                    </p>
                    <p className="text-sm text-gray-700 flex items-center gap-2 font-bold">
                      <TbBrandAppgallery size={"1.5em"} /> {product.brand}
                    </p>
                    <p className="text-sm text-gray-700 flex items-center gap-2 font-bold">
                      <TiStarFullOutline color="#facc15" size={"1.5em"} /> {product.rating}
                    </p>
                    <p className="text-sm text-gray-700 flex items-center gap-2 font-bold">
                      <BiSolidDollarCircle color="#16a34a" size={"1.5em"} />{product.price} /-
                    </p>
                    <p className="text-sm text-gray-700 flex items-center gap-2 font-bold">
                      <IoMdPricetag color="#0ea5e9" size={"1.5em"} />{product.discountPercentage}% off
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <ReactPaginate
                breakLabel="..."
                nextLabel="next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={Math.ceil(totalProducts / limit)}
                previousLabel="previous"
                containerClassName="flex items-center space-x-2"
                pageClassName="px-4 py-2 border rounded-md text-gray-700 hover:bg-blue-100"
                activeClassName="bg-blue-500 text-white"
                previousClassName="px-4 py-2 border rounded-md text-gray-700 hover:bg-blue-100"
                nextClassName="px-4 py-2 border rounded-md text-gray-700 hover:bg-blue-100"
                disabledClassName="text-gray-400 cursor-not-allowed"
                breakClassName="px-4 py-2 text-gray-700"
                forcePage={Math.ceil(skip / limit)}
              />
            </div>
          </div>
      }
    </>
  );
};
export default Products;