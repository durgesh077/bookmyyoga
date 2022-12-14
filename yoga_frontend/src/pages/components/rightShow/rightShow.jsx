import React, { useEffect } from 'react'
import EnrollmentPage from './components/Enrollment/Enrollment';
import EnrollmentDetails from './components/EnrollmentDetails/EnrollmentDetails';
import styles from './rightShow.module.scss'
function RightShow({setModal,subscription , payment,setEnrollrollState, ...props}) {
  return (
    <div className={styles.RightShow}>
        {
            subscription ?
            <EnrollmentDetails subscription={subscription} batch={props.batch} payment={payment} {...props}/>
            : <EnrollmentPage setModal={setModal} {...props} subscription={subscription} payment={payment} setEnrollrollState={setEnrollrollState}/>
        }
    </div>
  )
}

export default RightShow;
