import React, { useState, createContext, useContext } from 'react';

const AppContext = createContext(null);

const AppProvider = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [selectedRepository, setRepository] = useState(null);
    const [starFilter, setStarFilter] = useState(false);
    const [totalResults, setTotalResults] = useState(null);

    return (
        <AppContext.Provider
            value={{
                searchQuery,
                setSearchQuery,
                searchResults,
                setSearchResults,
                selectedRepository,
                setRepository,
                starFilter,
                setStarFilter,
                totalResults,
                setTotalResults,
            }}
            {...props}
        />
    )
};

const useAppData = () => useContext(AppContext);

export default AppContext;
export {AppProvider, useAppData};