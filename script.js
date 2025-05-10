const movieTitles = [ 
  'Spider-man', 'IP man', 'Go Ahead', 'Gen Z', 'Bleach', 'Blue Box','Blue Beetle', 'The long Ballad', 'Jujutstu Kaisen', 'Solo levelling', 'Spy X Family', 'Hunter X Hunter', 'Demonslayer', 'How to train a Dragon','Squid Game', 'All of us are Dead', 'Kungfu panda', 'Bluey', 'Wednesday','Super cube', 'Iron man','Ballerina', 'A Female Student Arrives at the Imperial College', 'Who Rules the World','I Hear You', 'Beauty Inside', 'Tokyo Revengers',
  'Business Proposal', 'True Beauty', 'My Name', 'Alchemy of Souls', 'Noragami', 'Fruits Basket', 'Mashle: Magic and Muscles', 'Love Alarm', 'Nevertheless', 'Kaguya-sama: Love is War', 'The Promised Neverland', 'Oshi no Ko', 'Angel Beats!', 'Steins;Gate', 'Hidden love', 'Flower of Evil', 'Itaewon Class', 'Extracurricular'
];

const moviesGrid = document.getElementById("MoviesGrid");
const searchInput = document.getElementById("searchInput");
const searchButton = document.querySelector("button");
const searchResult = document.getElementById("SearchResult");

const apiKey = "c915027";


movieTitles.forEach(title => {
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`)
  .then(res => res.json())
  .then(data => {
    if (data.Response === "True") {
      const img = document.createElement("img");
      img.src = data.Poster;
      img.alt = data.Title;
      img.style.maxWidth = "150px";
      img.style.margin = "5px";
      moviesGrid.appendChild(img);
    }
  });
});


searchButton.onclick = function () {
  const movieName = searchInput.value.trim();

  if (movieName === '') {
    searchResult.innerHTML = '<p>Please enter a movie name.</p>';
    return;
  }

  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieName)}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        searchResult.innerHTML = `
          <h2>${data.Title} (${data.Year})</h2>
          <img src="${data.Poster}" alt="${data.Title}" style="max-width: 200px; border-radius: 10px;">
          <p><strong>Genre:</strong> ${data.Genre}</p>
          <p><strong>Actors:</strong> ${data.Actors}</p>
          <p><strong>Plot:</strong> ${data.Plot}</p>
        `;
      } else {
        searchResult.innerHTML = `<p>Movie not found. Try another title.</p>`;
      }
    })
    .catch(error => {
      searchResult.innerHTML = `<p>Error fetching movie data.</p>`;
      console.error('Error:', error);
    });
};
