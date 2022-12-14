import React from 'react'
import styles from './ModalWarnings.module.scss'

const ModalWarnings = ({messageTitle , messageDesc}) => {
  return (
    <div className={styles.warningBox}>
      <div className={styles.warningImageContainer}>
        <img className={styles.warningImage} src={require('./warningImage.png')} alt='image Loading...' />
      </div>
      <div className={styles.warningMessage}>
        <p className={styles.title}>{messageTitle}</p>
        <p className = {styles.desc}>{messageDesc}</p>
      </div>
    </div>
  )
}

export default ModalWarnings
