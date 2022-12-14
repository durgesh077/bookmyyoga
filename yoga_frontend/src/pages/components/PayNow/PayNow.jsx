import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import { MessageContext } from '../../../components/MessageStack/MessageStack'
import styles from './PayNow.module.scss'
const PayNow = (props) => {
    const {addError , addSuccess} = useContext(MessageContext)
    const [checked ,setChecked] = useState(false)
    const {mutate} = useMutation((body)=>{
        return axios.post('/api/pay', body, {withCredentials:true})
    })
    
    function completePayment(){
        const body = {
            _id : props.subscription._id
        }

        mutate(body, {
            onError: addError("payment failed"),
            onSuccess: ()=>{props.setModal(false); props.setPayment(true);addSuccess("Payment Successfull!") ;props.refetchData()} 
        })
    }
  return (
    <div className={styles.ModelEnrollBox}>
            
        <div className={styles.ModelEnrollImageBox}>
            <img className={styles.ModelEnrollImage} src={require('./payNow.png')} alt="img" />
        </div>
        
        <div className={styles.ModelEnrollMonth}>
            <span className={styles.ModelEnrollMonthName}>Month : </span>
            <span className={styles.ModelEnrollMonthValue}>{new Date().toLocaleString('default' , {month:'long'})}</span>
        </div>
        
        <div className={styles.ModelEnrollChooseBatchBox}>
            <span className={styles.ModelEnrollChooseBatch}>Amount: </span>
            <span className={styles.ModelEnrollMonthValue}>500</span>
        </div>
        
        <div className={styles.ModelEnrollCheckBox}>
            <input type="checkbox" 
                id="ModelEnrollCheckBoxId" 
                name="checkBox" 
                checked={checked} 
                onChange={()=>setChecked(!checked)}
                />
            <label for="ModelEnrollCheckBoxId"> I Agree.</label>
        </div>

        <div className={styles.ModelEnrollButtonBox}>
            <button type='button' className={styles.ModelEnrollButton} onClick={()=>{
                completePayment()
            }} disabled={!checked} style={{background: (!checked)&&'gray'}}>Pay</button>
        </div>
    
    
    </div>
  )
}

export default PayNow
