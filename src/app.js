import './styles/styles.scss';
import 'normalize.css/normalize.css';

console.log("hello");

// API documentation https://developers.themoviedb.org/3/search/search-movies

const url = 'https://api.themoviedb.org/3/search/movie?api_key='
const api_key = 'dae147a76e031387fb1cf6e529519d20';

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

// adding data to the HTML
function creatingContent(data){
    
    const movie_name = data.map((data) => { 

        const { name, image, date, overview, rating } = data;

        return (
            name && image && 
            `<div class="movie__item">

                <div class="movie__poster">
                    <img class="movie__poster--image" src="${imgUrl + image}">
                </div>

                <div class="movie__poster--description">
                    <p class="movie__poster--info">
                        <span class="movie__poster--year">${parseInt(date)}</span>
                        <span class="movie__poster--rating">
                            <svg class="movie__poster--start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.86 45.75"><defs><style>.cls-1{fill:#ffc73e;}</style></defs><title>start</title><g id="Layer_2" data-name="Layer 2"><g id="Icons"><path class="cls-1" d="M38.1,45.75a1.12,1.12,0,0,1-.47-.11L23.93,38.4l-13.7,7.24a1,1,0,0,1-1.06-.08,1,1,0,0,1-.4-1l2.62-15.32L.3,18.4a1,1,0,0,1-.25-1,1,1,0,0,1,.81-.69l15.32-2.24L23,.52a1,1,0,0,1,1.8,0l6.85,13.93L47,16.69a1,1,0,0,1,.81.69,1,1,0,0,1-.25,1L36.47,29.26l2.62,15.32a1,1,0,0,1-.4,1A1,1,0,0,1,38.1,45.75Z"/></g></g></svg>
                            ${rating}
                        </span>
                    </p>
                    <h1 class="movie__poster--title">${name}</h1>
                    <p class="movie__poster--overview">${overview.substring(0, 250)}...<p>
                </div>
               
            </div>` 
        ) 

    }).join('');

    movie_items.innerHTML = movie_name;

}

// getting the data that I need from the obj
function filterData(data){

    const result = data.map(data => ({ 
            name: data.title, 
            image: data.poster_path, 
            date: data.release_date,
            overview: data.overview,
            rating: data.vote_average
        }) 
    );

    creatingContent(result);
}


// EVENT LISTENER 

input.addEventListener('change', getMovieName );
input.addEventListener('keyup', getMovieName );

function getMovieName(){
   
    const movie_name = encodeURI(input.value); // econde URl the name of the movie
    const searchBy = '&query=' // structure to search by movie name
    const request = url + api_key + searchBy + movie_name; 
    const dofetch =  input.value !== '' && input.value !== undefined;

    // do the fetch if the input value is not empty and not undefined
    if( dofetch ) {

        // promise all return an array with the responses messages
        // is a sequense when one load then load other
         // Request excecution
        Promise.all([
            fetchData(request)
            // add other request here
        ])
        .then(data => {

            // when data returns
            const results = data[0].results;
            
            filterData(results)
            
        })

    }else{

        // empty the search div
        movie_items.innerHTML = '';

    }

}