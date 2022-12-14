import React from 'react'
import styles from './Enrollment.module.scss'
function Enrollment({setModal,setEnrollrollState,...props}) {
  function handleEnrollNow(){
    const oneYear = 365*24*60*60*1000 ;
    const age  =  (new Date() - new Date(props.dateOfBirth))/oneYear ;
    if(age < 18){
      setEnrollrollState("underAge") ;
    }
    else if(age > 65){
      setEnrollrollState("overAge") ;
    }
    else if(props.prevPaymentDue){
      setEnrollrollState("duePayment") ;
    }
    else{
      setEnrollrollState("enroll") ;
    }

    setModal(true) ;
  }
  return (
    <div className={styles.Enrollment}>
        <span className={styles.text}>Please Subscribe to get enrolled. </span>
        <button onClick={handleEnrollNow} className={styles.button}>
            Subscribe
        </button>
    </div>
  )
}

export default Enrollment
