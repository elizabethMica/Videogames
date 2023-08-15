import React from 'react';
import {NavLink} from "react-router-dom";
import style from './landing.module.css'

const LandingPage = () => {
  return (
   <>
      <div className={style.cont}>
        <div className={style.welcomeCont}>
          <p className={style.welcome}>welcome to</p>
         </div>
       
        <h1 className={style.name} >Videogames</h1>
      
        <div className={style.botonCont}>
          <NavLink to="/home"><button className={style.boton}>log in</button></NavLink>
        </div>
      </div>
   </>
  
  )
}

export default LandingPage;