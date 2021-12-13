import { useState } from "react";
import styles from './searchresults.module.css';
import { Table } from '../../components';
import { useAppData } from '../../context/appContext';
import { Navigate } from 'react-router-dom';
import { githubSearch } from '../../api/apiservice';


export default (props) => {
  const { searchQuery, setSearchQuery, searchResults, setSearchResults, totalResults, setTotalResults, starFilter, setStarFilter } = useAppData();
  // [name, url, owner, language, forks, stars, last_updated ]
  const githubColumns = ['Name', 'Link', 'Owner', 'Language', 'Forks', 'Stars', 'Last Updated', '']

  const searchSubmit = (event) => {
    event.preventDefault();

    githubSearch(searchQuery, starFilter, (results) => {
      setSearchResults(results.items);
      setTotalResults(results.total_count)
    });
  }

  const starFilterHandler = (e) => {
    let isChecked = e.target.checked;

    setStarFilter(isChecked);
  }

  const displayResultsTotal = () => {
    if (totalResults) {
      return (
        <div className={styles.resultsText}>
          <p>{`${totalResults} repositories found`}</p>
        </div>
      )
    }
  }

  if (searchResults) {
    return (
        <>
            <div className={styles.searchContainer}>
              <form className={styles.searchForm} onSubmit={searchSubmit}>
                <div className={styles.formInputContainer}>
                  <input type="text" name="Search" value={searchQuery} className={styles.searchInput} onChange={(e) => {setSearchQuery(e.target.value)}}/>
                  <div className={styles.checkbox}>
                    <input type="checkbox" id="stars" name="stars" onChange={(e) => starFilterHandler(e)} />
                    <label for="stars">Order by Stars</label>
                  </div>
                </div>
                <input type="submit" value="Submit" className={styles.searchSubmit} />
              </form>
            </div>
            {displayResultsTotal()}
            <Table
              columns={githubColumns}
              tableData={searchResults}
              containerClass={styles.searchField}
            />
        </>
    )
  } else {
    return (
      <Navigate to="/" />
    )
  }
}