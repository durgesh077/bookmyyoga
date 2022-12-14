import axios from 'axios'
import React, {useContext, useEffect, useRef, useState} from 'react'
import { useMutation } from 'react-query'
import { MessageContext } from '../../../components/MessageStack/MessageStack'
import styles from './ChangeBatch.module.scss'


const ChangeBatch = (props) => {
    const {addError , addSuccess} = useContext(MessageContext)
    const [checked ,setChecked] = useState(false)
    const [batch, setBatch] = useState(props.subscription?.batch)
    const {mutate} = useMutation((body)=>{
        return axios.put(`/api/changeBatch/${props.subscription._id}`, body, {withCredentials:true})
    })

   useEffect(() => {
     setBatch(props.subscription?.batch)
   
   }, [props.subscription?.batch])
   
    function handleChangeBatch(){
        const body = {
            batch
        }

        mutate(body, {
            onError: ()=>{ addError('Failed to Change Branch')},
            onSuccess: (data)=>{props.setModal(false); props.setBatch(batch); addSuccess(data.data??'Changed Batch Successfully') ;} 
        })
    }
  return (
    <div className={styles.ModelEnrollBox}>
            
        <div className={styles.ModelEnrollImageBox}>
            <img className={styles.ModelEnrollImage} src={require('./changeBatch.png')} alt="img"/>
        </div>
        
        <div className={styles.ModelEnrollMonth}>
            <span className={styles.ModelEnrollMonthName}>Month : </span>
            <span className={styles.ModelEnrollMonthValue}>{new Date().toLocaleString('default' , {month:'long'})}</span>
        </div>
        
        <div className={styles.ModelEnrollChooseBatchBox}>
            <span className={styles.ModelEnrollChooseBatch} >Batch &nbsp;: </span>
            <select name="batch" id="batch"
                onChange={(e)=>setBatch(e.target.value)}
                value = {batch}
            >
                {['6AM-7AM' , '7AM-8AM' , '8AM-9AM', '5PM-6PM'].map((time,ind)=>
                    <option value={time} key={ind}>{time}</option>)
                    }
            </select>
        </div>
        
        <div className={styles.ModelEnrollCheckBox}>
            <input 
                type="checkbox" 
                id="ModelEnrollCheckBoxId" 
                name="checkBox" 
                checked={checked} 
                onChange={()=>setChecked(!checked)}
            />
            <label for="ModelEnrollCheckBoxId"> I Agree.</label>
        </div>

        <div className={styles.ModelEnrollButtonBox}>
            <button 
                type='button' 
                className={styles.ModelEnrollButton}
                onClick={handleChangeBatch}
                disabled={!checked} style={{background: (!checked)&&'gray'}}
            >
            Change Batch
            </button>
        </div>


    </div>
  )
}

export default ChangeBatch
