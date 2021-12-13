export const githubSearch = (query, sortByStars, callback) => {
    const queryString = 'q=' + encodeURIComponent(query);
    const sort = sortByStars ? '&sort=stars' : '';

    fetch(`https://api.github.com/search/repositories?${queryString}${sort}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(result => {
        callback(result);
    })
    .catch(error => {
        callback(error);
    });
}