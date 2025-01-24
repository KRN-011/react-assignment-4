import React from 'react'
import styles from '../styles/productImageModal.module.scss'

interface PropTypes {
    src: string
}

const ProductImageModal: React.FC<PropTypes> = ({ src }) => {
    return (
        <>
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <img src={src} alt="" className={styles.modalImage} />
                </div>
            </div>
        </>
    )
}

export default ProductImageModal