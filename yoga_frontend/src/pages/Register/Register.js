import React, {useState , useRef, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MessageContext } from '../../components/MessageStack/MessageStack';
import { useRegister } from '../../customHooks';
import styles from  './register.module.scss'
const Register = () => {
  const {addSuccess, addError} = useContext(MessageContext)
  const navigate = useNavigate()
  const [username , setUsername] = useState("") ;
  const [password , setPassword] = useState("") ;
  const [dateOfBirth , setDob] = useState("") ;
  const [firstName , setFirstName] = useState("") ;
  const [lastName , setLastName] = useState("") ;
  const {register, isLoading } = useRegister()

  function handleRegister(){
    const body = {
      username,
      password,
      dateOfBirth,
      firstName,
      lastName
    }

    register(body,{
      onError: (data)=>{addError(data?.response??"Unable to register");},
      onSuccess: (data)=> {
        if((data?.response && data?.response?.status === 200 )|| !data?.response){
          addSuccess(data?.data??"Registration successfull!");
          navigate('/');
        } else {
          addError(data?.response?.message??"Unable to register");
      }
    }})
  }
  return (
    <section className={styles["login-form"]}>
      <form className={styles.form} onSubmit={(e)=>{
        e.preventDefault()
        e.stopPropagation()
        handleRegister()
      }}>
        <div className={styles["form-title"]}>
          <h1>BookMyYoga</h1>
        </div>
        <h3>Register</h3>
        <div className={styles["form-row"]}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className={styles["form-input"]}
            onChange={(e)=>{setUsername(e.target.value)}}
            value = {username}
          />
        </div>
        <div className={styles["form-row"]}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className={styles["form-input"]}
            onChange={(e)=>{setFirstName(e.target.value)}}
            value = {firstName}
          />
        </div>
        <div className={styles["form-row"]}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className={styles["form-input"]}
            onChange = {(e)=> setLastName(e.target.value)}
            value = {lastName}
          />
        </div>

        <div className={styles["form-row"]}>
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            className={styles["form-input"]}
            onChange = {(e)=> setDob(e.target.value)}
            value = {dateOfBirth}
          />
        </div>

        <div className={styles["form-row"]}>
          <label htmlFor="password">password</label>
          <input
            type="password"
            className={styles["form-input"]}
            onChange = {(e)=> setPassword(e.target.value)}
            value = {password}
          />
        </div>

        <div className={styles["form-row"]}>
          <button className={styles.btn + " " + styles["form-btn"] + " " + styles["register-btn"]} 
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
        <p className={styles["form-para"]}>
          Already have account?
          <Link className={styles["register-link"]} to = '/login'>Login</Link>
        </p>
      </form>
    </section>
  )
}

export default Register
