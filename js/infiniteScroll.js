// Intersection Obeserver API

// note - The Intersection Observer API provides a way to asynchronously observe changes
//        in the intersection of a target element with an ancestor element or with a top-level document's viewport.

const scrollContainer = document.querySelector(".scroll-container");
document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "066b4f7d81b68ba4b98cf8614e3b58c1";
  // const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
  const baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`;

  let currentPage = 1;
  let currentIndex;

  // const query = searchInput.value
  // https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query="

  const loadMovies = async () => {
    const response = await fetch(`${baseUrl}&page=${currentPage}`);
    const data = await response.json();

    const movies = data.results;
    movies.forEach(movie => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");
      movieElement.innerHTML = `
        <div class="d-flex flex-column">
         <img class="lazy-image" loading="lazy" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
          <p class="text-white ff-roboto">${movie.title}</p>
        </div>
      `;
      scrollContainer.appendChild(movieElement);
    });

    currentPage++;
  };

  const options = {
    root: scrollContainer,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        imageObserver.unobserve(lazyImage);
      }
    });
  }, options);

  scrollContainer.addEventListener("scroll", () => {
    loadMovies();
  });

  loadMovies(); // Initial loading of movies
});

// loadMovies()
