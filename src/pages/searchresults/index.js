import { useState } from "react";
import styles from './searchresults.module.css';
import { Table } from '../../components';
import { useAppData } from '../../context/appContext';
import { Navigate } from 'react-router-dom';
import { githubSearch } from '../../api/apiservice';


export default (props) => {
  const { searchQuery, setSearchQuery, searchResults, setSearchResults, totalResults, setTotalResults, starFilter, setStarFilter } = useAppData();
  const githubColumns = ['Name', 'Link', 'Owner', 'Language', 'Forks', 'Stars', 'Last Updated', '']
  let disableSubmit = searchQuery === '';
  const [filterLanguage, setFilterLanguage] = useState('');
  const [filteredResults, setFilteredResults] = useState(null);

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

  const filterChange = () => {
    const $language = document.querySelector('#language');
    let setLanguage = $language.value
    setFilterLanguage(setLanguage)

    const result = searchResults.filter((repo) => {
      return repo.language?.toLowerCase() === setLanguage.toLowerCase()
    })
    setFilteredResults(result);
  }

  if (searchResults) {
    let displayedResults = filterLanguage !== '' ? filteredResults : searchResults;
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
                <input type="submit" value="Submit" className={styles.searchSubmit}  disabled={disableSubmit}/>
              </form>
              <div className={styles.filterLanguage} onChange={filterChange}>
                <select name="language" id="language">
                  <option value="">Select Language</option>
                  <option value="Javascript">Javascript</option>
                  <option value="Typescript">Typescript</option>
                  <option value="C#">C#</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="Go">Go</option>
                  <option value="Shell">Shell</option>
                  <option value="Typescript">Typescript</option>
                  <option value="C#">C#</option>
                  <option value="Ruby">Ruby</option>
                  <option value="PHP">PHP</option>
                  <option value="C++">C++</option>
                </select>
              </div>
            </div>
            {displayResultsTotal()}
            <Table
              columns={githubColumns}
              tableData={displayedResults}
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