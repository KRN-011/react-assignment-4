import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaHandPointRight } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProductImageModal from '../Components/ProductImageModal';
import { IoIosCloseCircle } from "react-icons/io";
import Loader from '../utils/Loader';
import styles from '../styles/productDetail.module.scss'

interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: Meta;
    images: string[];
    thumbnail: string;
}

interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

interface Review {
    rating: number;
    comment: string;
    date: string; // ISO 8601 format
    reviewerName: string;
    reviewerEmail: string;
}

interface Meta {
    createdAt: string; // ISO 8601 format
    updatedAt: string; // ISO 8601 format
    barcode: string;
    qrCode: string; // URL to the QR code image
}

const ProductDetail: React.FC = () => {

    const [product, setProduct] = useState<Product>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isImageLoaded, setImageLoaded] = useState<boolean>(false)
    const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false)
    const [imageSrcUrl, setImageSrcUrl] = useState<string>("")

    const { id } = useParams();

    // image loader
    const imageLoader = () => {
        setImageLoaded(true)
    }

    // fetch product details by ID
    const fetchProductDetail = async (productId: string) => {
        setIsLoading(true);

        try {
            const response = await axios.get<Product>(`https://dummyjson.com/products/${productId}`)
            setProduct(response.data)
        } catch (error) {
            console.error("Error fetching product details: ", error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            fetchProductDetail(id)
        }
    }, [id])

    if (isLoading) {
        return <Loader/>;
    }

    if (!product) {
        return <p className="text-center text-gray-600">No product found.</p>;
    }

    // open image modal
    const imageModalOpenOnClick = (event: React.MouseEvent<HTMLImageElement>) => {
        const target = event.target as HTMLImageElement;
        setImageSrcUrl(`${target.src}`)
        setIsImageModalOpen(true)
    }

    // close image modal
    const imageModelCloseOnClick = () => {
        setIsImageModalOpen(false)
    }

    return (
        <>
            <div className={styles.container}>
                {/* Product Hero Section */}
                <div className={styles.productHero}>
                    <div className={styles.imageWrapper}>
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                        />
                    </div>
                    <div className={styles.details}>
                        <h1>
                            {product.title}
                        </h1>
                        <p className={styles.category}>
                            {product.category}
                        </p>
                        <p className={styles.description}>{product.description}</p>
                        <div className={styles.pricing}>
                            <span className={styles.currentPrice}>
                                ${product.price}
                            </span>
                            <span className={styles.originalPrice}>
                                $
                                {(
                                    product.price *
                                    (100 / (100 - product.discountPercentage))
                                ).toFixed(2)}
                            </span>
                            <span className={styles.discountBadge}>
                                {product.discountPercentage}% OFF
                            </span>
                        </div>
                        <p className={styles.infoRow}>
                            <FaHandPointRight size="1.3em" />
                            Brand: {product.brand}
                        </p>
                        <p className={styles.infoRow}>
                            <FaHandPointRight size="1.3em" />
                            SKU: {product.sku}
                        </p>
                        <p className={styles.infoRow}>
                            <FaHandPointRight size="1.3em" />
                            Availability: {product.availabilityStatus}
                        </p>
                        {/* Rating */}
                        <div className={styles.rating}>
                            <span className={styles.stars}>
                                {"★".repeat(Math.floor(product.rating))}
                                {"☆".repeat(5 - Math.floor(product.rating))}
                            </span>
                            <span className={styles.ratingValue}>
                                ({product.rating?.toFixed(1)})
                            </span>
                        </div>
                    </div>
                </div>

                {/* Product Images */}
                <div className={styles.productImages}>
                    <h2>
                        Product Images
                    </h2>
                    {!isImageLoaded && (
                        <div className={styles.imageGrid}>
                            {product.images.map((_, index) => (
                                <div
                                    key={index}
                                    className="h-40 w-40 sm:h-64 sm:w-64 rounded-lg"
                                >
                                    <Skeleton style={{ height: "100%" }} />
                                </div>
                            ))}
                        </div>
                    )}
                    <div
                        onLoad={imageLoader}
                        className={styles.imageGrid}
                    >
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`product-image-${index}`}
                                onClick={(e) => imageModalOpenOnClick(e)}
                                className={`${isImageLoaded ? "block" : "hidden"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Product Details Section */}
                <div className={styles.productDetails}>
                    <h2>
                        Product Details
                    </h2>
                    <div className={styles.detailsGrid}>
                        <div className={styles.detailCard}>
                            <h3>
                                Dimensions
                            </h3>
                            <p>
                                Width: {product.dimensions?.width} cm
                            </p>
                            <p>
                                Height: {product.dimensions?.height} cm
                            </p>
                            <p>
                                Depth: {product.dimensions?.depth} cm
                            </p>
                        </div>
                        <div className={styles.detailCard}>
                            <h3>
                                Shipping & Warranty
                            </h3>
                            <p>
                                Shipping Info: {product.shippingInformation}
                            </p>
                            <p>
                                Warranty: {product.warrantyInformation}
                            </p>
                        </div>
                        <div className={styles.detailCard}>
                            <h3>
                                Return Policy
                            </h3>
                            <p>
                                Return Policy: {product.returnPolicy}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className={styles.reviews}>
                    <h2>
                        Customer Reviews
                    </h2>
                    <div>
                        {product.reviews?.map((review, index) => (
                            <div
                                key={index}
                                className={styles.reviewCard}
                            >
                                <div className={styles.reviewHeader}>
                                    <span className={styles.reviewerName}>{review.reviewerName}</span>
                                    <span className={styles.stars}>
                                        {"★".repeat(Math.floor(review.rating))}
                                        {"☆".repeat(5 - Math.floor(review.rating))}
                                    </span>
                                </div>
                                <p className={styles.comment}>{review.comment}</p>
                                <p className={styles.reviewDate}>
                                    Reviewed on: {new Date(review.date).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {
                isImageModalOpen && <ProductImageModal src={imageSrcUrl} />
            }

            {
                isImageModalOpen &&
                <div className='fixed top-0 right-0 m-7'>
                    <IoIosCloseCircle onClick={imageModelCloseOnClick} color='#fff' size={"3em"} className='cursor-pointer duration-150 ease-[cubic-bezier(.21,1.17,.74,1.11)] hover:scale-110' />
                </div>
            }
        </>
    )
}

export default ProductDetail