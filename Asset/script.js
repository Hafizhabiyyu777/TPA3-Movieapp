const apiKey = "dd4f8114aca8a793cd50bbf25e0cbc59";
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;
console.log(url);
const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;



const IMG_URL = "https://image.tmdb.org/t/p/w500";

const search = document.getElementById("search");
const utama = document.getElementById("main");
const tagsEl = document.getElementById("tags");
const home = document.getElementById("home");

async function main(data) {

  data.forEach(function (movie) {
    let { title, poster_path, vote_average, overview,release_date } = movie;
    release_date = new Date(release_date).toDateString().split(" ").slice(1);

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
                   <img src="${
                     poster_path ? IMG_URL + poster_path : "SKILL MOVIE.png"
                   }" alt="${title}">
                  <div class="movie-info">
                      <h3>${title}</h3>
                     
                      <span class="${getColor(
                        vote_average
                      )}">${vote_average}</span>
                  </div>

                  <div class="movie-info3">
                  <h4>${release_date[0]} ${release_date[1]}, ${
                    release_date[2]}</h4>
                  </div>
                  
                 
                  <div class="overview">
                      <h3>${title}</h3>
                      ${overview}
                      <br/> 
                      <h4>RELEASE DATE :${release_date[0]} ${release_date[1]}, ${
                        release_date[2]}</h4>
                  </div>
                 
              `;
    utama.appendChild(movieEl);
  });
}

function getMovies(url, dari) {
  console.log(`Dipanggil dari ${dari}`);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      if (data.results.length !== 0) {
        main(data.results); // Ambil data movie

      } else {
        main.innerHTML = `<div class="no-results">
        <h1>The <span class="searchItem">${search.value}</span> You have Searched</h1>
        <h2>No Results Found</h2>
        </div>`;
      }
    });
}

getMovies(url, "INI UTAMA");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  hapuselement()

  if (searchTerm) {
    getMovies(searchURL + searchTerm, "DARI SEARCH");
  } else {
    getMovies(url);
  }
});


function hapuselement() {
  const elements = document.getElementsByClassName("movie");
  while (elements.length > 0) elements[0].remove();
}

// main();

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}


home.addEventListener("click", function() {
  hapuselement()
  getMovies(url,"dari Home")
});
