import React, { useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { getAllVGames, paginado } from '../../redux/actions';
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


// const Paginado=()=>{
//   const dispatch = useDispatch();
//   const currentPage = useSelector((state)=> state.currentPage);
//   const totalPages = useSelector((state)=> Math.ceil(state.videoGames.length / state.items_per_page));

//   const nextPage =()=>{
//    dispatch(paginado("next"))
//   }

//   const prevPage =()=>{
//     dispatch(paginado("prev"))
//    }
 
//    const imgNext = "https://cdn-icons-png.flaticon.com/128/8515/8515429.png";
//   const imgPrev = "https://cdn-icons-png.flaticon.com/128/8336/8336043.png";

//   return (
//     <div className={style.paginadoCont}>
//       <button onClick={prevPage} className={style.btnPrev}>
//         <img src={imgPrev} alt="prev" className={style.prev} />
//       </button>

//       <span className={style.pageNumbers}>
//         Page {currentPage} of {totalPages}
//       </span>

//       <button onClick={nextPage} className={style.btnNext}>
//         <img src={imgNext} alt="next" className={style.next} />
//       </button>
//     </div>
//   );
// };



// const Paginado = () => {

//   const dispatch = useDispatch()
//   const paginadoR = useSelector((state) => state.paginado)
//   const allVideogames = useSelector((state) => state.videoGames)
//   const itemsPerPage = useSelector((state) => state.items_per_page)
  
  
//   const handleNumber =(number)=>{
//     dispatch(paginado(number))
//   }

//   useEffect(()=>{
//     dispatch(paginado())
//   }, [paginadoR.currentPage])
 
 
//   return (
//     <div>
//         {paginadoR.pageNumbers?.map(number => {
//             return (
//                 <div key={number}> {/* Agregar una clave única para cada elemento */}
//                     <button onClick={() => handleNumber(number)}>{number}</button>
//                 </div>
//             )
//         })}
//     </div>
// );
// };


