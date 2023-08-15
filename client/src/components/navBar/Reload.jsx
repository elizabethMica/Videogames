import { getAllVGames, removeAllFilter } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import style from './navBar.module.css';

const Reload =()=>{

    const dispatch= useDispatch(); 

    const imgReload ="https://cdn-icons-png.flaticon.com/128/748/748090.png";

    const reload =(event)=>{
        event.preventDefault();
        dispatch(getAllVGames())
        dispatch(removeAllFilter())
    }

    return(
        <>
        <button onClick={(event)=>reload(event)} className={style.btnReload} title="reload"><img src={imgReload} alt="reload" className={style.imgReload}/></button>
        </>
    )
  }

export default Reload