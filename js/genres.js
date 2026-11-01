const genresList = document.querySelector("#genresList");
const moviesList = document.querySelector("#moviesList");
const genresCount = document.querySelector("#genresCount");
const searchInput = document.querySelector("#searchInput");
const moviesGrid = document.querySelector(".movie-grid");
const API_KEY = "c37c018a91a14ef1913b75ecba281679";
const IMG = "https://image.tmdb.org/t/p/w500";
const genreSelect = document.getElementById("genreSelect");
if (genreSelect) {
  genreSelect.addEventListener("change", function () {
    const selectedGenreId = genreSelect.value;
    if (selectedGenreId !== "") {
      window.location.href = `genre.html?id=${selectedGenreId}`;
    }
  });
}
const urlParams = new URLSearchParams(window.location.search);
const genreId = urlParams.get("id");
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm.length === 0) {
    moviesGrid.innerHTML = "";
    return;
  }
  fetch(
    `https://moviesapi.ir/api/v1/movies?q=${encodeURIComponent(searchTerm)}`,
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((error) => {
        throw new Error(error.message);
      });
    })
    .then((data) => {
      const movies = data.data;
      moviesGrid.innerHTML = "";
      if (!movies || movies.length === 0) {
        moviesGrid.innerHTML = '<p class="no-result">نتیجه‌ای یافت نشد</p>';
        return;
      }
      movies.forEach((movie) => {
        const card = document.createElement("article");
        card.className = "movie-card";
        card.onclick = () => {
          location.href = `details.html?id=${movie.id}`;
        };
        card.innerHTML = `<img src="${movie.poster || "./img/download.jfif"}"
            alt="${movie.title}" 
            class="movie-poster"
            onerror="this.src='./img/download.jfif'">
          <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-footer">
              <span class="movie-btn">View Info</span>
            </div>
          </div>`;
        moviesGrid.appendChild(card);
      });
    })
    .catch((error) => {
      moviesGrid.innerHTML = `<p class="error-message">${error.message}</p>`;
    });
});
genresList.addEventListener("click", (e) => {
  const genreItem = e.target;
  if (e.target.tagName !== "LI") return;
  const genreId = e.target.dataset.id;
  loadGenre(genreId);
});
function loadGenre(genreId) {
  fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
      API_KEY +
      "&with_genres=" +
      genreId,
  )
    .then((res) => res.json())
    .then((data) => {
      moviesList.innerHTML = "";
      genresCount.textContent = data.results.length + " titles";
      data.results.forEach((movie) => {
        const div = document.createElement("div");
        div.className = "movie-item";
        div.onclick = () => {
          location.href = `details.html?id=${movie.id}`;
        };
        const poster = movie.poster_path
          ? IMG + movie.poster_path
          : "./img/download.jfif";
        const year = movie.release_date ? movie.release_date.split("-")[0] : "";
        div.innerHTML = `<img 
    src="${poster}" 
    alt="${movie.title}" 
    class="movie-item-poster"
    onerror="this.src='./img/placeholder.svg'"
    >
  <div class="movie-item-info">
    <div class="movie-item-header">
      <h3 class="movie-item-title">${movie.title}</h3>
      <span class="movie-item-rating">
        <img src="./img/Vector (5).png" alt="star"> ${movie.vote_average} (${movie.vote_count})
      </span>
    </div>
    <p class="movie-item-meta">
      ${year} • PG-13 • 2h 46m
    </p>
    <div class="movie-item-genres">
      <span class="movie-item-genre">Action</span>
      <span class="movie-item-genre adventure">Adventure</span>
      <span class="movie-item-genre">Drama</span>
    </div>
    <p class="movie-item-plot">
      ${movie.overview || ""}
    </p>
    <p class="movie-item-detail">
      <strong>Director:</strong> Sian Heder
    </p>
    <p class="movie-item-detail">
      <strong>Stars:</strong> Emilia Jones, Marlee Matlin, Troy Kotsur
    </p>
    <p class="movie-item-detail">
      <strong>Votes:</strong> ${movie.vote_count}
    </p>
  </div>`;
        moviesList.appendChild(div);
      });
    });
}
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    alert("اینتر زده شد کلمه سرچ شده: " + searchInput.value);
    const query = searchInput.value.trim();
    if (query !== "") {
      window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
  }
});
loadGenre(genreId);
