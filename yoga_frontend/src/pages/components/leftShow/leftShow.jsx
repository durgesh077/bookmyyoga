import React, { useEffect, useState } from 'react'
import styles from './leftShow.module.scss'
const text = `“Yoga is a light, which once lit will never dim. The better your practice, the brighter your flame.“ `;
const wait=(time)=>{
  return new Promise((resolve)=>{
    setTimeout(resolve,time*1000);
  })
}
function LeftShow(props) {
  const [txtLn, setTxtLn] = useState(0)
  useEffect(()=>{
    (async()=>{
      for(const ch in text){
        setTxtLn(ch)
        await wait(0.07)
      }
      setTxtLn(prev=>prev+1);
    })()
  },[])
  return (
    <div className={styles.leftShow}>
       <span className={styles.Hi}>Hi,</span> &nbsp;
       <span className={styles.firstname}>{props.firstName}</span>
       <blockquote cite='#' >
       {text.substring(0,txtLn)+ (txtLn===text.length?"":"|")}
       </blockquote>
    </div>
  )
}

export default LeftShow
