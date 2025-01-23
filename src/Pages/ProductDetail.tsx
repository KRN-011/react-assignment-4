import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaHandPointRight } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProductImageModal from '../Components/ProductImageModal';
import { IoIosCloseCircle } from "react-icons/io";

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
        return <p className="text-center text-gray-600">Loading...</p>;
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
            <div className="container mx-auto p-6 mt-10">
                {/* Product Hero Section */}
                <div className="flex flex-col lg:flex-row items-start">
                    <div className="lg:w-1/2 w-full mb-6 lg:mb-0 flex justify-center items-center">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-3/4 sm:w-1/2 h-auto rounded-lg border border-zinc-100 hover:border-zinc-300 duration-100"
                        />
                    </div>
                    <div className="lg:w-1/2 w-full">
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                            {product.title}
                        </h1>
                        <p className="text-xs text-gray-700 bg-zinc-300 w-fit px-2 rounded-2xl mt-2">
                            {product.category}
                        </p>
                        <p className="mt-4">{product.description}</p>
                        <div className="mt-6">
                            <span className="text-lg md:text-xl font-semibold text-green-600">
                                ${product.price}
                            </span>
                            <span className="ml-4 text-sm line-through text-gray-500">
                                $
                                {(
                                    product.price *
                                    (100 / (100 - product.discountPercentage))
                                ).toFixed(2)}
                            </span>
                            <span className="ml-2 text-sm bg-red-600 text-white w-fit px-2 rounded-2xl">
                                {product.discountPercentage}% OFF
                            </span>
                        </div>
                        <p className="mt-4 text-gray-600 flex gap-3 items-center">
                            <FaHandPointRight size="1.3em" />
                            Brand: {product.brand}
                        </p>
                        <p className="mt-2 text-gray-600 flex gap-3 items-center">
                            <FaHandPointRight size="1.3em" />
                            SKU: {product.sku}
                        </p>
                        <p className="mt-2 text-gray-600 flex gap-3 items-center">
                            <FaHandPointRight size="1.3em" />
                            Availability: {product.availabilityStatus}
                        </p>
                        {/* Rating */}
                        <div className="mt-4 flex items-center">
                            <span className="text-yellow-400">
                                {"★".repeat(Math.floor(product.rating))}
                                {"☆".repeat(5 - Math.floor(product.rating))}
                            </span>
                            <span className="ml-2 text-gray-500">
                                ({product.rating?.toFixed(1)})
                            </span>
                        </div>
                    </div>
                </div>

                {/* Product Images */}
                <div className="mt-10">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
                        Product Images
                    </h2>
                    {!isImageLoaded && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
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
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4"
                    >
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`product-image-${index}`}
                                onClick={(e) => imageModalOpenOnClick(e)}
                                className={`w-full h-full object-contain rounded-lg border border-zinc-100 hover:shadow-md transform duration-200 p-2 hover:cursor-pointer ${isImageLoaded ? "block" : "hidden"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Product Details Section */}
                <div>
                    <h2 className="mt-10 text-xl md:text-2xl font-semibold text-gray-900">
                        Product Details
                    </h2>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                                Dimensions
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Width: {product.dimensions?.width} cm
                            </p>
                            <p className="mt-1 text-gray-600">
                                Height: {product.dimensions?.height} cm
                            </p>
                            <p className="mt-1 text-gray-600">
                                Depth: {product.dimensions?.depth} cm
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                                Shipping & Warranty
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Shipping Info: {product.shippingInformation}
                            </p>
                            <p className="mt-1 text-gray-600">
                                Warranty: {product.warrantyInformation}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                                Return Policy
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Return Policy: {product.returnPolicy}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-10 w-full sm:w-3/4 lg:w-2/3">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                        Customer Reviews
                    </h2>
                    <div className="mt-4 space-y-6">
                        {product.reviews?.map((review, index) => (
                            <div
                                key={index}
                                className="p-4 border border-gray-300 rounded-lg"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">{review.reviewerName}</span>
                                    <span className="text-yellow-400">
                                        {"★".repeat(Math.floor(review.rating))}
                                        {"☆".repeat(5 - Math.floor(review.rating))}
                                    </span>
                                </div>
                                <p className="mt-2 text-gray-600">{review.comment}</p>
                                <p className="mt-2 text-sm text-gray-500">
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
                    <IoIosCloseCircle onClick={imageModelCloseOnClick} color='#fff' size={"3em"} className='cursor-pointer' />
                </div>
            }
        </>
    )
}

export default ProductDetail