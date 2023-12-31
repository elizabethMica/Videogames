import { getAllVGames, paginado, removeAllFilter } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import style from './navBar.module.css';

const Reload =()=>{

    const dispatch= useDispatch(); 

    const imgReload ="https://cdn-icons-png.flaticon.com/128/748/748090.png";

    // Function to reload data and remove filters
    const reload =(event)=>{
        event.preventDefault();
        dispatch(getAllVGames()) // Fetch all videogames
        dispatch(removeAllFilter())// Remove all filters
        dispatch(paginado(1))// Go to the first page
    }

    return(
        <>
        <button onClick={(event)=>reload(event)} className={style.btnReload} title="reload"><img src={imgReload} alt="reload" className={style.imgReload}/></button>
        </>
    )
  }

export default Reload