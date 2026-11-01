const searchInput = document.querySelector("#searchInput");
const moviesGrid = document.querySelector(".movies-grid");
const searchTitle = document.getElementById("searchTitle");
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("query");
if (query) {
  searchInput.value = query;
  searchTitle.innerHTML = `Results for: <span class="search-title">${query}</span>`;
  moviesGrid.innerHTML = '<p class="loading">Loading...</p>';
  fetch(`https://moviesapi.ir/api/v1/movies?q=${encodeURIComponent(query)}`)
    .then((res) => {
      if (!res.ok) throw new Error("Network error");
      return res.json();
    })
    .then((data) => {
      moviesGrid.innerHTML = "";
      if (!data.data || data.data.length === 0) {
        moviesGrid.innerHTML = '<p class="no-result">No results found.</p>';
        return;
      }
      data.data.forEach((movie) => {
        const movieCard = document.createElement("article");
        movieCard.className = "moviecard";
        movieCard.onclick = () => {
          location.href = `details.html?id=${movie.id}`;
        };
        movieCard.innerHTML = `
          <img src="${movie.poster || "./img/download.jfif"}" alt="${movie.title}" class="movieposter" onerror="this.src='./img/download.jfif'">
          <div class="movieinfo">
            <h3 class="movietitle">${movie.title}</h3>
            <p class="moviegenre">${movie.genres || ""}</p>
            <div class="moviefooter">
              <span class="movierating"><img src="./img/Vector (5).png" alt="star"> ${movie.imdb_rating || "N/A"}</span>
              <span class="moviebtn">View Info</span>
            </div>
          </div>`;
        moviesGrid.appendChild(movieCard);
      });
    })
    .catch((error) => {
      moviesGrid.innerHTML = `<p class="error-message">Error: ${error.message}</p>`;
    });
}
const genreSelect = document.getElementById("genreSelect");
genreSelect.addEventListener("change", function () {
  const selectedGenreId = genreSelect.value;
  if (selectedGenreId !== "") {
    window.location.href = `genre.html?id=${selectedGenreId}`;
  }
});
