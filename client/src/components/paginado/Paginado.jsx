import React, { useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { paginado } from '../../redux/actions';
import style from './paginado.module.css'

// const Paginado = () => {
//     const dispatch = useDispatch();

//     const nextPage =()=>{
//         dispatch(paginado("next"))
//       }
  
//       const prevPage=()=>{
//           dispatch(paginado("prev"))
//       }

//       const imgNext = "https://cdn-icons-png.flaticon.com/128/8515/8515429.png"
//       const imgPrev = "https://cdn-icons-png.flaticon.com/128/8336/8336043.png"
//   return (
//     <div className={style.paginadoCont}>
//     <button onClick={prevPage} className={style.btnPrev}><img src={imgPrev} alt="prev" className={style.prev}/></button>  
  
//     <button onClick={nextPage} className={style.btnNext} ><img src={imgNext} alt="next" className={style.next}/></button>
//     </div>
//   )
// };


const Paginado=()=>{
  const dispatch= useDispatch();
  const pages = useSelector((state)=> state.pages)
  const currentPage = useSelector((state)=> state.currentPage)

  const handleValue =(value)=>{
    dispatch(paginado(value))
  }


  return(
    <div>

      <button onClick={()=> handleValue("prev")}>prev</button>
      {
          pages.map((n)=>{
            return (
              <button style={{color: currentPage === n? "red" : "black"}}onClick={()=> handleValue(n)}>{n}</button>
            )
          })
      }
      <button onClick={()=> handleValue("next")}>next</button>

    </div>
  )


}

export default Paginado



