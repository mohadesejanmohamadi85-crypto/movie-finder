

const searchInput = document.querySelector("#searchInput");
const moviesGrid = document.querySelector(".movie-grid");
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm.length === 0) {
    moviesGrid.innerHTML = "";
    return;
  }
  fetch(`https://moviesapi.ir/api/v1/movies?q=${encodeURIComponent(searchTerm)}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((qw) => {
        throw new Error(qw.message);
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
        card.innerHTML = 
        `<img src="${movie.poster || './img/download.jfif'}"
            alt="${movie.title}" 
            class="movie-poster"
            onerror="this.src='./img/placeholder.svg'"
          >
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
      console.log(error.message);
    });
});



