
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getGenres, filterBank, removeFilter, filterApply} from '../../redux/actions';
import style from './filters.module.css';

const Filters = () => {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const filterObjs = useSelector((state)=> state.arr_of_filterObjs);

    const [genre, setGenre] = useState("")

    useEffect(() => {
        dispatch(getGenres()); //Fetch genres
    }, []);

    const handleFilter =(value)=>{
       // Handle various types of filters, such as "api," "created," "inc," "dec," "inc_aZ," "dec_zA"
      if(value==="api"){
        dispatch(filterBank({type:"games", value:"Existing"}))
      }else if(value === "created"){
        dispatch(filterBank({type:"games", value:"Created"}))
      }else if(value === "inc"){
        dispatch(filterBank({type:"sort", value:"Increase Rating"}))
      }else if(value === "dec"){
        dispatch(filterBank({type:"sort", value:"Decrease Rating"}))
      }else if(value === "inc_aZ"){
        dispatch(filterBank({type:"sort", value:"A-Z"}))
      }else if(value === "dec_zA"){
        dispatch(filterBank({type:"sort", value:"Z-A"}))
      }
    };

    //Handle type genres for filters
    const handleGenres = (event) => {
      dispatch(filterBank({type:"genres", value: event.target.value}));
      setGenre("")
    };

     // Remove a filter
    const handleDeletedFilter =(value)=>{
     dispatch(removeFilter(value))
    };

    // Apply the selected filters
    const handleFilterApply = ()=>{
      dispatch(filterApply())
      
    };

    //URLs for icons
   const api = "https://cdn-icons-png.flaticon.com/128/4652/4652094.png"
   const created = "https://cdn-icons-png.flaticon.com/128/3659/3659699.png"
   const ascRating = "https://cdn-icons-png.flaticon.com/128/3976/3976230.png"
   const desRating = "https://cdn-icons-png.flaticon.com/128/3976/3976231.png"
   const aZ = "https://cdn-icons-png.flaticon.com/128/3513/3513025.png"
   const zA = "https://cdn-icons-png.flaticon.com/128/3513/3513030.png"

    return (
        <>
        {/* Filters for games */}
            <div className={style.filtrosCont}>
              <div className={style.nameLabel}>
                <label className={style.nombres}>games</label>
              </div>
              <div className={style.buttonDiv}>
                <button className={style.btnFilters} onClick={()=>handleFilter("api")} title="api"><img className={style.imgs} src={api} alt="api"/></button>
                <button className={style.btnFilters} onClick={()=>handleFilter("created")} title="created"><img className={style.imgs} src={created} alt="created"/></button>
              </div>
            </div>

        {/* Filters for rating */}
            <div className={style.filtrosCont}>
              <div className={style.nameLabel}>
                <label className={style.nombres}>rating</label>
              </div>
              <div className={style.buttonDiv}>
                <button className={style.btnFilters} onClick={()=>handleFilter("inc")} title="increase"><img className={style.imgs} src={ascRating} alt="increase"/></button>
                <button className={style.btnFilters} onClick={()=>handleFilter("dec")} title="decrease" ><img className={style.imgs} src={desRating} alt="decrease"/></button>
                </div>
            </div>

        {/* Filters for name */}
            <div className={style.filtrosCont}>
              <div className={style.nameLabel}>
                <label className={style.nombres}>name</label>
              </div>
              <div className={style.buttonDiv}>
                <button className={style.btnFilters} onClick={()=>handleFilter("inc_aZ")} title="a-z"><img className={style.imgs} src={aZ} alt="increase"/></button>
                <button className={style.btnFilters} onClick={()=>handleFilter("dec_zA")} title="z-a"><img className={style.imgs} src={zA} alt="decrease"/></button>
              </div>
            </div>

        {/* Filters for genres */}
            <div className={style.filtrosCont}>
              <div className={style.nameLabel}>
                <label className={style.nombres}>genres</label>
              </div>
                <select
                    value={genre}
                    className={style.selectFilter1}
                    onChange={(event) => handleGenres(event)}
                >
                    <option value="">genres</option>
                    {genres?.map((g) => {
                        return <option value={g?.name}>{g?.name}</option>;
                    })}
                </select>
            </div>

        {/* Apply filters button */}
            <div className={style.title_btn}>
             <div className={style.nameLabel}>
              <label>filters</label>
             </div>
             <div className={style.buttonDiv}>
              <button className={style.applyBtn} onClick={handleFilterApply}>apply</button>
                </div>
             </div>

        {/* Render selected filters for display */}
             <div className={style.renderFilters}>
              {filterObjs.map((x)=>{
                return <>
                <button className={style.btnDelete} onClick={() => handleDeletedFilter(x.value)}>{x.value}</button> 
                </>        
              })}
             </div>
        </>
    );
};

export default Filters;
