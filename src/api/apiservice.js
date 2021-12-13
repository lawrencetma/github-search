export const githubSearch = (query, sortByStars, callback) => {
    const queryString = 'q=' + encodeURIComponent(query);
    const sort = sortByStars ? '&sort=stars' : '';

    fetch(`https://api.github.com/search/repositories?${queryString}${sort}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        callback(result);
    })
    .catch(error => {
        console.error('Error:', error);
        callback(error);
    });
}