const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=753a8caf952c6b31912ae2ff7d747b54&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=753a8caf952c6b31912ae2ff7d747b54&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, original_language, release_date, overview} = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = ` 
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class= 'otherinfo'>
            <span> Language: ${original_language} </span>
            <span> Release date: ${release_date} </span>
            </div>
            <div class="overview">
            <h3>Overview</h3>
            ${overview}
            </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchMovie = search.value

    if(searchMovie && search !== '') {
        getMovies(SEARCH_API + searchMovie)
        search.value = ''
    } else {
        window.location.reload()
    }

})