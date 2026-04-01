let ui = document.getElementById("ui");
let searchInput = document.getElementById("search");
let sortSelect = document.getElementById("sort");

let url = "https://api.themoviedb.org/3/movie/popular?api_key=501ef046591ec346f6b758e796eebdca";

let allMovies = []; 

// 🎯 Fetch Data
fetch(url)
  .then(res => res.json())
  .then(data => {
    allMovies = data.results.map(movie => ({
      ...movie,
      favorite: false
    }));
    renderMovies(allMovies);
  })
  .catch(err => console.error(err));


// 🧠 Render Function (CORE)
function renderMovies(data) {
  ui.innerHTML = data.map(movie => {
    return `
      <div class="card">
        <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" />
        <h3>${movie.title}</h3>
        <button onclick="toggleFavorite(${movie.id})">
          ${movie.favorite ? "❤️" : "🤍"}
        </button>
      </div>
    `;
  }).join("");
}

searchInput.addEventListener("input", () => {
  let query = searchInput.value.toLowerCase();

  let filtered = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(query)
  );

  renderMovies(filtered);
});



sortSelect.addEventListener("change", () => {
  let sorted = [...allMovies].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  renderMovies(sorted);
});



function toggleFavorite(id) {
  allMovies = allMovies.map(movie =>
    movie.id === id
      ? { ...movie, favorite: !movie.favorite }
      : movie
  );

  renderMovies(allMovies);
}