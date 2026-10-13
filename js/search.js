const searchInput = document.querySelector("#searchInput");
const moviesGrid = document.querySelector(".movies-grid");
searchInput.addEventListener("input", () => {
  const term = searchInput.value.trim();
  if (term.length === 0) {
    moviesGrid.innerHTML = "";
    return;
  }
  fetch("https://moviesapi.ir/api/v1/movies?q=" + term)
    .then((res) => res.json())
    .then((data) => {
      moviesGrid.innerHTML = "";
      data.data.forEach((movie) => {
        const movieCard = document.createElement("article");
        movieCard.className = "moviecard";
        movieCard.onclick = () => {
          location.href = `details.html?id=${movie.id}`;
        };
        movieCard.innerHTML = `<article class="moviecard">
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
        moviesGrid.appendChild(movieCard);
      });
    });
});
