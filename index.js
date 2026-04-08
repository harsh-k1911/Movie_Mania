let ui = document.getElementById("ui");
let searchInput = document.getElementById("search");
let sortSelect = document.getElementById("sort");
let filterSelect = document.getElementById("filter");
let themeToggle = document.getElementById("themeToggle");

let url = "https://api.themoviedb.org/3/movie/popular?api_key=501ef046591ec346f6b758e796eebdca";

let allMovies = [];
let currentData = [];

// 🎯 Fetch Data
fetch(url)
  .then(res => res.json())
  .then(data => {
    allMovies = data.results.map(movie => ({
      ...movie,
      favorite: false
    }));
    currentData = [...allMovies];
    renderMovies(currentData);
  })
  .catch(err => console.error(err));


// 🧠 CORE: Apply Search + Filter + Sort Together
function updateUI() {
  let query = searchInput.value.toLowerCase();
  let filterValue = filterSelect.value;
  let sortValue = sortSelect.value;

  let updated = allMovies

    // 🔍 SEARCH
    .filter(movie =>
      movie.title.toLowerCase().includes(query)
    )

    // 🎯 FILTER
    .filter(movie => {
      if (filterValue === "highRating") return movie.vote_average >= 7;
      if (filterValue === "favorites") return movie.favorite;
      return true;
    })

    // 🔃 SORT
    .sort((a, b) => {
      if (sortValue === "az") return a.title.localeCompare(b.title);
      if (sortValue === "za") return b.title.localeCompare(a.title);
      if (sortValue === "rating") return b.vote_average - a.vote_average;
      return 0;
    });

  currentData = updated;
  renderMovies(currentData);
}


// 🎬 Render Function
function renderMovies(data) {
  if (!data.length) {
    ui.innerHTML = "<p>No movies found</p>";
    return;
  }

  ui.innerHTML = data.map(movie => {
    let image = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "https://via.placeholder.com/300x450?text=No+Image";

    return `
      <div class="card">
        <img src="${image}" />
        <h3>${movie.title}</h3>
        <p>⭐ ${movie.vote_average}</p>

        <button onclick="toggleFavorite(${movie.id})">
          ${movie.favorite ? "❤️" : "🤍"}
        </button>
      </div>
    `;
  }).join("");
}


// ❤️ Toggle Favorite
function toggleFavorite(id) {
  allMovies = allMovies.map(movie =>
    movie.id === id
      ? { ...movie, favorite: !movie.favorite }
      : movie
  );

  updateUI(); // IMPORTANT
}


// 🎯 Event Listeners
searchInput.addEventListener("input", updateUI);
sortSelect.addEventListener("change", updateUI);
filterSelect.addEventListener("change", updateUI);


// 🌙 Dark Mode Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
