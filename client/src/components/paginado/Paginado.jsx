import React, { useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { paginado } from '../../redux/actions';
import style from './paginado.module.css'

const Paginado = () => {
    const dispatch = useDispatch();

    const nextPage =()=>{
        dispatch(paginado("next"))
      }
  
      const prevPage=()=>{
          dispatch(paginado("prev"))
      }

      const imgNext = "https://cdn-icons-png.flaticon.com/128/8515/8515429.png"
      const imgPrev = "https://cdn-icons-png.flaticon.com/128/8336/8336043.png"
  return (
    <div className={style.paginadoCont}>
    <button onClick={prevPage} className={style.btnPrev}><img src={imgPrev} alt="prev" className={style.prev}/></button>  
  
    <button onClick={nextPage} className={style.btnNext} ><img src={imgNext} alt="next" className={style.next}/></button>
    </div>
  )
};


export default Paginado



