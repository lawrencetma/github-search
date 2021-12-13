import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './home.module.css';
import { useAppData } from '../../context/appContext';
import { githubSearch } from '../../api/apiservice';

export default (props) => {
    const { searchQuery, setSearchQuery, setStarFilter, starFilter, setSearchResults, setTotalResults } = useAppData();
    const navigate = useNavigate();

    const starFilterHandler = (e) => {
      let isChecked = e.target.checked;
  
      setStarFilter(isChecked);
    }
    
    const searchSubmit = (event) => {
      event.preventDefault();
      
      githubSearch(searchQuery, starFilter, (results) => {
        setSearchResults(results.items);
        setTotalResults(results.total_count);
        navigate('/searchresults');
      });
    }

    return (
        <div className={styles.homeContainer}>
            <h1>Github Search</h1>
            <div className={styles.searchContainer}></div>
              <form className={styles.searchForm} onSubmit={searchSubmit}>
                <div className={styles.formInputContainer}>
                  <input type="text" name="Search" className={styles.searchInput} onChange={(e) => {setSearchQuery(e.target.value)}}/>
                  <div className={styles.checkbox}>
                    <input type="checkbox" id="stars" name="stars" onChange={(e) => starFilterHandler(e)} />
                    <label for="stars">Order by Stars</label>
                  </div>
                </div>
                <input type="submit" value="Submit" className={styles.searchSubmit} />
              </form>
            <div className={styles.searchContainer}></div>
        </div>
    )
}