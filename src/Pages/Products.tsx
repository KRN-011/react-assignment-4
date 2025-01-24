import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { TbBrandAppgallery } from "react-icons/tb";
import { TiStarFullOutline } from "react-icons/ti";
import { IoMdPricetag } from "react-icons/io";
import { BiSolidDollarCircle } from "react-icons/bi";
import Loader from "../utils/Loader";

import styles from '../styles/products.module.scss'

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
        isLoading ? <Loader /> :
          <div className={styles.productListingContainer}>
            <div className={styles.gridContainer}>
              {products.map((product) => (
                <div
                  onClick={() => handleProductDetail(product.id)}
                  className={styles.productCard}
                  key={product.id}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                  />
                  <div className={styles.productInfo}>
                    <h3>{product.title}</h3>
                    <p className={styles.category}>{product.category}</p>
                    <p className={`${styles.detailRow} ${styles.brandIcon}`}>
                      <TbBrandAppgallery size={"1.5em"} /> {product.brand}
                    </p>
                    <p className={`${styles.detailRow} ${styles.rating}`}>
                      <TiStarFullOutline size={"1.5em"} /> {product.rating}
                    </p>
                    <p className={`${styles.detailRow} ${styles.price}`}>
                      <BiSolidDollarCircle size={"1.5em"} /> {product.price} /-
                    </p>
                    <p className={`${styles.detailRow} ${styles.discount}`}>
                      <IoMdPricetag size={"1.5em"} /> {product.discountPercentage}% off
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.pagination}>
              <ReactPaginate
                breakLabel="..."
                nextLabel="next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={Math.ceil(totalProducts / limit)}
                previousLabel="previous"
                containerClassName={styles.pagination}
                pageClassName={styles.paginationItem}
                activeClassName={`${styles.paginationItem} ${styles.active}`}
                previousClassName={styles.paginationItem}
                nextClassName={styles.paginationItem}
                disabledClassName={styles.disabled}
                breakClassName={styles.paginationBreak}
                forcePage={Math.ceil(skip / limit)}
              />
            </div>
          </div>

      }
    </>
  );
};
export default Products;