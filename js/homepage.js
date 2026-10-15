const searchInput = document.querySelector("#searchInput");
const moviesGrid = document.querySelector(".movie-grid");
const movieGrid = document.querySelector(".movies-grid");
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
fetch("https://moviesapi.ir/api/v1/movies?page=1")
  .then((res) => res.json())
  .then((data) => {
    movieGrid.innerHTML = "";
    data.data.forEach((movie) => {
      const box = document.createElement("article");
      box.className = "moviecard";
      box.onclick = () => {
        location.href = `details.html?id=${movie.id}`;
      };
      box.innerHTML = `
      <article class="moviecard">
      <img src="${movie.poster}" alt="${movie.title}" class="movieposter">
      <div class="movieinfo">
      <h3 class="movietitle">${movie.title}</h3>
      <p class="moviegenre">${movie.genres}</p>
      <div class="moviefooter">
      <span class="movierating"><img src="./img/Vector (5).png" alt="star" > ${movie.imdb_rating}</span>
      <span class="moviebtn">View Info</span>
      </div>
      </div>
      </article>`;
      movieGrid.appendChild(box);
    });
  });
