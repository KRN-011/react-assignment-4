import React from 'react'
import styles from '../styles/loader.module.scss'

const Loader: React.FC = () => {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.loaderContainer}>
          <div className={styles.loaderCircle}></div>
          <p className={styles.text}>Please wait...</p>
        </div>
      </div>
    </>
  )
}

export default Loader