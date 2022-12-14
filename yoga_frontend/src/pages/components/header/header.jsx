import axios from 'axios'
import React, { useContext } from 'react'
import { useMutation } from 'react-query'
import {Link, useNavigate} from 'react-router-dom'
import { MessageContext } from '../../../components/MessageStack/MessageStack'
import  styles from './header.module.scss'
function Header({username}) {
  const {addError , addSuccess} = useContext(MessageContext)
  const navigate = useNavigate()

  const {mutate: logout } = useMutation(()=>{
    return axios.get("/api/logout").then(res=>res.data)
  })

  function handleLogout(){
    logout(null,{
      onError: addError("unable to logout"),
      onSuccess: ()=>{addSuccess("Logout successfull!");navigate('/login')}
    })
  }
  return (
    <nav className={styles.header}>
        <ul>
            <li><Link style={{color:'white'}}>About us</Link></li>
            <li><Link style={{color:'white'}}>Contacts</Link></li>
            <li className={styles.logout} onClick={handleLogout}>Logout ({username})</li>
        </ul>
    </nav>
  )
}

export default Header
