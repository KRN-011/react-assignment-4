import React from 'react'

interface PropTypes {
    src: string
}

const ProductImageModal: React.FC<PropTypes> = ({ src }) => {
    return (
        <>
            <div className='fixed top-0 flex justify-center items-center w-[100vw] h-[100vh] backdrop-blur-sm backdrop-brightness-75'>
                <div className='w-[30vw] bg-white border border-zinc-200 rounded-2xl'>
                    <img src={src} alt="" className=''/>
                </div>
            </div>
        </>
    )
}

export default ProductImageModal