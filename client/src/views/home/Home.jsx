import React from 'react';
import { useEffect } from 'react'; // Import the useEffect hook
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector from Redux
import Card from '../../components/card/Card'; // Import the Card component
import { getAllVGames, notReload} from '../../redux/actions';  // Import Redux actions
import style from "./home.module.css"; // Import CSS styles


const Home = () => {
    const dispatch = useDispatch(); // Initialize the useDispatch hook

    //Get data from the Redux state
    const videoGames = useSelector((state)=> state.paginado);
    const coincidences = useSelector((state)=> state.coincidences);
    const not_reload = useSelector((state)=> state.not_reload)

    useEffect(()=>{
      // Use the useEffect hook for initial data fetching
      if(!not_reload){
        dispatch(getAllVGames()) // Dispatch the action to get all video games
        dispatch(notReload(true)) // Dispatch the action to indicate not to reload
      }
    },[]) // The empty dependency array ensures this effect runs only once

  return (
    <>
    <div className={style.homeContenedor}>
      {/* Conditional rendering based on the videoGames and coincidences state */}
      {
       videoGames.length ? (videoGames.map((vg)=>{
        return(
          <div >
          <Card 
          key={vg.id}
          id={vg.id}
          name={vg.name}
          image={vg.image}
          platforms={vg.platforms}
          released={vg.released}
          rating={vg.rating}
          description={vg.description}
          genres={vg.genres? vg.genres.map(x => x.name + (" ")): "undefined"}
          />
          </div>
        )
        })) : (coincidences===false
                ?(<div className={style.divLoading}><p className={style.loading}>No coincidences</p></div>)
                :(<div className={style.divLoading}><p className={style.loading}>Loading...</p></div>))
      
      }
    </div>
    </>
  )
}

export default Home