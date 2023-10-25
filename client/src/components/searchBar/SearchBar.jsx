import React, {useState} from 'react';
import style from './search.module.css';
import { searchName } from '../../redux/actions';
import {useDispatch} from 'react-redux';


const SearchBar = () => {
   
  const imageSearch= "https://cdn-icons-png.flaticon.com/128/10470/10470773.png"

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  // Update the search state with the input value
  const handleChange=(event)=>{
    setSearch(event.target.value)
   }

   // Trigger the search when the Enter key is pressed
   const auxFunction = (event) =>{
    if(event.key==="Enter"){
      handleSubmit()
    }
  }

  const handleSubmit=()=>{
    dispatch(searchName(search)) // Dispatch an action to search for items with the specified name
    setSearch("") // Clear the search input field after searching
  }

  return (
    <div className={style.inputCont}>
      <div className={style.inputCont2}>

      <input
      className={style.inputSearch}
      type="text"
      name="search"
      placeholder="search by name..."
      onChange={handleChange}
      onKeyDown={(event)=>auxFunction(event)}
      />
      <button onClick={handleSubmit} className={style.btnSearch}><img src={imageSearch} className={style.imageLupa} alt="search"/></button>
      </div>
    </div>
  )
}

export default SearchBar