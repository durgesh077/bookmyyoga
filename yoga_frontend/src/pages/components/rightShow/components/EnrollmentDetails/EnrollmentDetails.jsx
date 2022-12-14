import React, { useState } from 'react'
import styles from './EnrollmentDetails.module.scss'
import Modal from '../../../../../components/Modal';
import PayNow from '../../../PayNow/PayNow';
import ChangeBatch from '../../../ChangeBatch/ChangeBatch';

const options = {
  payNow: 'Pay Now',
  changeBatch: 'Change Batch'
}
function EnrollmentDetails(props) {
  const [modalType, setModalType] = useState(false)
  function getMonth(){
    return new Date().toLocaleString('default' , {month:'long'}) ;
  }

  function renderModal(){
    if(!modalType)
      return null
    
    if(modalType===options.payNow){
      return <PayNow {...props} setModal={setModalType}/>
    }
    
    if(modalType === options.changeBatch){
      return <ChangeBatch {...props} setModal={setModalType}/>
    }
  }
  return (
    <React.Fragment>
    <div className={styles.EnrollmentDetails}>
      <div className={styles.Text}>
      Subscription
      </div>
      <div className={styles.Row}>
      Month : {getMonth()}
      </div>
      <div className={styles.Row}>
      Batch : {props.batch}
      </div>

      <div className={styles.ButtonsWrapper}>
        {!props.payment&&
          <button className = {`${styles.PayNow} ${styles.button}`} onClick={()=>setModalType(options.payNow)}>
            Pay Now
          </button>
        }

        <button className={`${styles.ChangeBatch} ${styles.button}`}
         onClick={()=>setModalType(options.changeBatch)}
         >
          Change batch
        </button>

      </div>

    </div>
    <Modal modal={modalType} setModal = {setModalType} title={modalType}>
      {renderModal()}
     </Modal>
    </React.Fragment>
  )
}

export default EnrollmentDetails
