const params = new URLSearchParams(window.location.search);
const searchInput = document.querySelector("#searchInput");
const moviesGrid = document.querySelector(".movie-grid");
const movieId = params.get("id");
const detailsContainer = document.getElementById("detailsContainer");
if (!movieId) {
  detailsContainer.innerHTML = '<p class="loading">فیلمی انتخاب نشده است</p>';
} else {
  fetch(`https://moviesapi.ir/api/v1/movies/${movieId}`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error("خطا در دریافت اطلاعات");
    })
    .then((movie) => {
      renderMovieDetails(movie);
    })
    .catch((error) => {
      detailsContainer.innerHTML = `<p class="loading">${error.message}</p>`;
    });
}
function renderMovieDetails(movie) {
  var genresHTML = movie.genres
    .map(function (genre) {
      return `<button class="details-genre-btn"> ${genre} </button>`;
    })
    .join("");
  var imagesHTML = movie.images
    .map(function (img) {
      return `<img src="${img}"class="backdrop-img">`;
    })
    .join("");
  function createCastCards(movie) {
    if (!movie.actors) return "";
    return movie.actors
      .split(",")
      .map(function (actor) {
        var name = actor.trim();
        return `<div class="cast-card">
            <img src="./img/download.jfif" alt="${name}" class="cast-photo">
            <h3 class="cast-name">${name}</h3>
            </div>`;
      })
      .join("");
  }
  detailsContainer.innerHTML = `
  <div class="details-header">
  <div class="details-header-left">
    <h1 class="details-title">${movie.title}</h1>
    <p class="details-meta">
      <span class="details-year">${movie.year}</span>
      <span class="details-rated">${movie.rated}</span>
      <span class="details-runtime">${movie.runtime}</span>
    </p>
  </div>
  <div class="details-header-right">
    <button class="details-rating-btn">
      <img src="./img/Vector (5).png" alt="rating star" class="details-star">
      <span class="details-rating">${movie.imdb_rating}</span>
      <span class="details-max">/10</span>
      <span class="details-votes">${movie.imdb_votes}</span>
    </button>
  </div>
 </div>
  <div class="details-body">
  <img src="${movie.poster || "./img/download.jfif"}"
            alt="${movie.title}" 
            class="movie-poster"
            onerror="this.src='./img/download.jfif'">
  <div class="details-info">
    <div class="details-block">
      <span class="details-label">Genres</span>
      <div class="details-genres">
      ${genresHTML}
      </div>
    </div>
    <div class="details-block">
      <span class="details-label">Plot</span>
      <p class="details-text">${movie.plot}</p>
    </div>
    <div class="details-block">
      <span class="details-label">Director</span>
      <p class="details-text">${movie.director}</p>
    </div>
    <div class="details-block">
      <span class="details-label">Writers</span>
      <p class="details-text">${movie.writer}</p>
    </div>
    <div class="details-block">
      <span class="details-label">Stars</span>
      <p class="details-text">${movie.actors}</p>
    </div>
    <div class="details-backdrops">
      ${imagesHTML}
    </div>
  </div>
</div>
  <div class="cast-section">
  <h2 class="cast-title">Cast</h2>
  <div class="cast-grid">
    ${createCastCards(movie)}
  </div>
</div>`;
}
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
            class="movie-poster1"
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
const genreSelect = document.getElementById("genreSelect");
genreSelect.addEventListener("change", function () {
  const selectedGenreId = genreSelect.value;
  if (selectedGenreId !== "") {
    window.location.href = `genre.html?id=${selectedGenreId}`;
  }
});
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    alert("اینتر زده شد کلمه سرچ شده: " + searchInput.value);
    const query = searchInput.value.trim();
    if (query !== "") {
      window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
  }
});
