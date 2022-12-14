import axios from 'axios'
import React, { useContext, useState } from 'react'
import { isError, useMutation } from 'react-query'
import styles from './ModelEnroll.module.scss'
import { MessageContext } from '../../../components/MessageStack/MessageStack'
const ModelEnroll = ({setModal,refetchData,setSubscription,batch ,setBatch,...props}) => {
    const {addError, addSuccess} = useContext(MessageContext)
    const {mutate } = useMutation((body)=>{
       return axios.post("/api/subscribe", body, {withCredentials: true})
    })
    function handleSubmit(){
        const body = {
            batch
        }
        mutate(body,{
            onError: ()=>addError("Unable to to enroll"),
            onSuccess: ()=>{setModal(false);setBatch(batch);refetchData();addSuccess("Subscribed successfully");}
        })

    }

  return (
    <div className={styles.ModelEnrollBox}>
        
        <div className={styles.ModelEnrollImageBox}>
            <img className={styles.ModelEnrollImage} src={require('./EnrollImage.jpg')} alt="img"/>
        </div>
        
        <div className={styles.ModelEnrollMonth}>
            <span className={styles.ModelEnrollMonthName}>Month : </span>
            <span className={styles.ModelEnrollMonthValue}>{new Date().toLocaleString('default' , {month:'long'})}</span>
        </div>
        
        <div className={styles.ModelEnrollChooseBatchBox}>
            <span className={styles.ModelEnrollChooseBatch}>Batch &nbsp;: </span>
            <select name="batch" id="batch" onChange= {e=>setBatch(e.target.value)} value = {batch}>
            {['6AM-7AM' , '7AM-8AM' , '8AM-9AM', '5PM-6PM'].map((time,ind)=>
                    <option value={time} key={ind}>{time}</option>)
                    }
            </select>
        </div>
        
        <div className={styles.ModelEnrollCheckBox}>
            <input type="checkbox" id="ModelEnrollCheckBoxId" name="checkBox" value="" />
            <label for="ModelEnrollCheckBoxId"> I agree with the Terms & Conditions.</label>
        </div>

        <div className={styles.ModelEnrollButtonBox}>
            <button type='button' className={styles.ModelEnrollButton}
            onClick={handleSubmit}
            >Enroll</button>
        </div>


    </div>
  )
}

export default ModelEnroll
