let ui = document.getElementById("ui");

let url = "https://api.themoviedb.org/3/movie/popular?api_key=501ef046591ec346f6b758e796eebdca";

fetch(url)
  .then(res => res.json())
  .then(data => {
    let movies = data.results;

    ui.innerHTML = movies.map(movie => {
      return `
        <div class="card">
          <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" />
          <h3>${movie.title}</h3>
        </div>
      `;
    }).join("");
  })
  .catch(err => console.error(err));