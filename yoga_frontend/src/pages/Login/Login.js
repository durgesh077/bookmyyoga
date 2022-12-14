import React, {useState,useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { MessageContext } from '../../components/MessageStack/MessageStack'
import {useLogin} from '../../customHooks/'
import styles from './login.module.scss'



const Login = () => {
    const {addSuccess, addError}=useContext(MessageContext)
    const [username , setUsername] = useState("") ;
    const [password , setPassword] = useState("") ;
    const navigate = useNavigate()
    const {login, isError, isLoading , isSuccess} = useLogin()
    const handleSubmit = ()=>{
        const body = {
          username,
          password
        }

        login(body,{
          onError: data=>{addError(data?.response?.data??"Login Failed!")},
          onSuccess: (data)=>{addSuccess(data?.data??"Login Successfull");navigate('/')}
        })
    }

  return (
    <section className={styles["login-form"]}>
      <form className={styles["form"]} onSubmit={(e)=>{
        e.preventDefault();
        e.stopPropagation();
        handleSubmit() ; 
      }}>
        <div className={styles["form-title"]}>
          <h1>BookMyYoga</h1>
        </div>
        <h3>Login</h3>
        <div className={styles["form-row"]}>
          <label htmlFor="username">Username</label>
          <input type="text" className={styles["form-input"]}
            onChange={(e)=> setUsername(e.target.value)}
            value  = {username} 
          />
        </div>
        <div className={styles["form-row"]}>
          <label htmlFor="password">Password</label>
          <input type="password" className={styles["form-input"]}
            onChange = {(e)=> setPassword(e.target.value)}
            value  = {password} 
          />
        </div>
        <button className={styles.btn+ " "+ styles['form-btn']} disabled={isLoading}>Submit</button>
        <p className={styles["form-para"]}>
          Not a member yet?
          <Link className={styles["register-link"]} to = '/register'>Register</Link>
        </p>

      </form>
    </section>
  )
}

export default Login
