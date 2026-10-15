const params = new URLSearchParams(window.location.search);
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
