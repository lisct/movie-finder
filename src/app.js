// API documentation https://developers.themoviedb.org/3/search/search-movies

const url = 'https://api.themoviedb.org/3/search/movie?api_key='
const api_key = 'dae147a76e031387fb1cf6e529519d20';
const searchBy = '&query=' // structure to search by movie name
const movie_name = encodeURI('a quiet place'); // econde URl the name of the movie
const request = url + api_key + searchBy + movie_name; 

const imgUrl = ' http://image.tmdb.org/t/p/w300/'; 
const input = document.querySelector('.movie__search--input');
const movie_items = document.querySelector('.movie__items');

// Requesting data 
function fetchData(url) {
    
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log('Looks like there was a problem', error))
    
}
    
// check status
function checkStatus(response){
    
    if(response.ok){
        
        return Promise.resolve(response);
        
    }else{
        
        return Promise.reject(new Error(response.statusText));
    
    }
    
}
    
// promise all return an array with the responses messages
// is a sequense when one load then load other
// Request excecution

Promise.all([
    fetchData(request)
    // add other request here
])
.then(data => {

    const results = data[0].results;
    
    filterData(results)
    
})

// getting the data that I need from the obj
function filterData(data){

    const result = data.map(data => ({ 
            name: data.title, 
            image: data.poster_path, 
            date: data.release_date 
        }) 
    );

    creatingContent(result);
}

// adding data to the HTML
function creatingContent(data){

    const movie_name = data.map((data) => { 
        return (
            data.name && data.image && 
            `<div class="movie__item">
                <h1 class="movie__title">${data.name} 
                    <span class="movie__year">${parseInt(data.date)}</span>
                </h1>
                <img class="movie__image" src="${imgUrl + data.image}">
            </div>` 
        ) 

    }).join('');

    movie_items.innerHTML = movie_name;

}