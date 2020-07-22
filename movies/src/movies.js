import './styles/movies.scss';

window.addEventListener('load', () => {
    document.getElementById('searchField').addEventListener('keypress', searchMovie)
})
function searchMovie() {

    let keyword = document.getElementById('searchField').value;
    const APIKEY = 'c1331ced0972e705bf9584e0c8199a6d';
    let url = 'https://api.themoviedb.org/3/search/movie?api_key=' + APIKEY + '&language=en-US&query=' + keyword + '&page=1&include_adult=false';

    fetch(url)
        .then((result) => {
            return result.json();
        })
        .then(function (data) {
            data.results.forEach((data) => {
                console.log(data);
                createCard(data);
            })
        })
        .catch(function (err) {
            console.log(err);
        });
}

function createCard(data){
    
    let newDiv = document.createElement("div");
    newDiv.classList.add("card");
    newDiv.setAttribute("id","card")
 

    let row = document.createElement("div")
    row.classList.add("row");

    let pic = document.createElement("div");
    pic.classList.add("col-sm-3")
    pic.innerHTML = "<img class='px-3 py-3' src='https://image.tmdb.org/t/p/w185" + data.poster_path + "' alt='Opps, something is wrong'>";

    let txt = document.createElement("div");
    txt.classList.add("col-sm-6");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let titleMovie = document.createElement("h4");
    titleMovie.classList.add("card-title", "font-weight-bold"),
        titleMovie.innerText = data.title + " (" + data.release_date + ")";

    let ratingMovie = document.createElement("p");
    ratingMovie.classList.add("card-text"),
        ratingMovie.innerHTML = '<p class="font-weight-bold">ratingMovie: </p>' + data.vote_average;

    let plot = document.createElement("p");
    plot.classList.add("card-text"),
        plot.innerHTML = '<p class="font-weight-bold">Plot: </p>' + data.overview;

    let director = document.createElement("p");
    director.classList.add("card-text"),
        director.innerHTML = '<p class="font-weight-bold">Director:</p>';

    let stars = document.createElement("p");
    stars.classList.add("card-text"),
    stars.innerHTML = '<span class="font-weight-bold">Stars:</span>' + data.popularity;

    let btnFav = document.createElement("button");
    btnFav.classList.add("btn", "btn-lg", "btn-secondary", "m-2")
    btnFav.innerText = "Add to favorites";

    let iconFav = document.createElement("span");
    iconFav.classList.add("glyphicon","glyphicon-heart");
    iconFav.setAttribute("aria-hidden","true")
    iconFav.setAttribute("style","float:left;")
    btnFav.appendChild(iconFav);


    let btnTrailer = document.createElement("button");
    btnTrailer.classList.add("btn", "btn-lg", "btn-secondary","m-2"),
    btnTrailer.innerText = "Watch Trailer"

    let iconTrailer = document.createElement("span");
    iconTrailer.classList.add("glyphicon","glyphicon-play");
    iconTrailer.setAttribute("aria-hidden","true")
    iconTrailer.setAttribute("style","float:left;")
    btnTrailer.appendChild(iconTrailer);
    


    cardBody.appendChild(titleMovie),
        cardBody.appendChild(ratingMovie),
        cardBody.appendChild(plot),
        cardBody.appendChild(director),
        cardBody.appendChild(stars),
        cardBody.appendChild(btnFav),
        cardBody.appendChild(btnTrailer),
        txt.appendChild(cardBody);

    let lastDiv = document.createElement("div");
    lastDiv.classList.add("col-md-3");

    let btnReview = document.createElement("button");
    btnReview.classList.add("btn", "btn-lg", "btn-secondary", "m-2"),
    btnReview.innerText = "Add review"
    

    let iconReview = document.createElement("span");
    iconReview.classList.add("glyphicon","glyphicon-pencil");
    iconReview.setAttribute("aria-hidden","true")
    iconReview.setAttribute("style","float:left;")
    btnReview.appendChild(iconReview);



    lastDiv.appendChild(btnReview),
        row.appendChild(pic),
        row.appendChild(txt),
        row.appendChild(lastDiv),
        newDiv.appendChild(row),
        document.getElementById("moviesOutput").appendChild(newDiv)
}






