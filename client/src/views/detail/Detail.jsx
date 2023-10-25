import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { getDetail, deleteVgame, getAllVGames, clearDetail } from '../../redux/actions';
import style from './detail.module.css';

const Detail = () => {
  const dispatch = useDispatch();
  const {id} = useParams(); // Get the "id" parameter from the URL
  const videoGame = useSelector((state)=>state.detail); // Get the videogame details from Redux
  const navigate = useNavigate()

  useEffect(()=>{
    dispatch(getDetail(id))// Fetch video game details
    return ()=>dispatch(clearDetail())// Clear the detail when unmounting
  },[]);


  // Remove HTML tags from a string
  const removeHTMLtags =(string) => {
    const regex = /<[^>]*>/g;
    return string.replace(regex, '');
  }

  //Handle function to delete the selected videogame with the id
 const deleteHandler=(event)=>{
  event.preventDefault();
  dispatch(deleteVgame(id))//Dispatch the action with the id as a parameter
  alert("Videogame deleted")
  setTimeout(()=>{
    dispatch(getAllVGames())// Fetch all videogames
    navigate("/home")// Navigate back to the home page
  }, 1000);
 }

 //Handle function to navigate to the update route
 const editHandler=(event)=>{
  navigate("/update/" + id)
 }


 const goBack=(event)=>{
   event.preventDefault();
   navigate("/home")
   return ()=>dispatch(clearDetail()) // Clear the detail
 }

  return (
    <div >
      {videoGame?.image ? (
      <div className={style.cont} >
        <div className={style.divsCont}>

          <div className={style.nameCont}>
            <h1 className={style.name}>{videoGame?.name}</h1>

          </div>

          <div className={style.descCont}>
            <p className={style.description}>{videoGame?.createdInDb? videoGame?.description : removeHTMLtags(videoGame?.description)}</p>
          </div>
        
        <div className={style.contRRPG}>

          <div className={style.relRatCont}>
            <h4 className={style.released}>Released: <br/> {videoGame?.released}</h4>
            <h4 className={style.rating}>Rating: <br/> {videoGame?.rating}</h4>
          </div>
       
          <div className={style.platGenCont}>
            <h4 className={style.platforms}>Platforms: <br/> {videoGame?.platforms?.join(", ")}</h4>
            <h4 className={style.genres}>Genres:<br/> {videoGame?.genres?.map((x)=>x.name).join(", ")}</h4>
          </div>


        </div>
      
        <div className={style.imgCont}>
          <img className={style.image} src={videoGame?.image} alt={`image of ${videoGame.name}`} />
        </div>

          <div className={style.buttons}>
            <div>
              <button className={style.backBtn} onClick={(e)=>goBack(e)}><img className={style.imgBtn} src="https://cdn-icons-png.flaticon.com/128/9678/9678540.png" alt="back"/></button>
            </div>
          {videoGame?.createdInDb ? (
          <div>
            <button className={style.editBtn} onClick={(e)=>editHandler(e)}><img className={style.imgBtn} src="https://cdn-icons-png.flaticon.com/128/650/650143.png" alt="edit"/></button> 
          <button className={style.delBtn} onClick={(e)=>deleteHandler(e)}><img className={style.imgBtn} src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png" alt="delete"/></button></div>) : null }
          </div>
        </div>

      </div>
      ) : 
      <div className={style.divLoading}>
        <p className={style.loading}>Loading...</p>
      </div>
     }
    </div>
  )
}

export default Detail