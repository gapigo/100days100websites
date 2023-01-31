const sliders = document.querySelector('.carouselbox');
var scrollPerClick;
var ImagePadding = 20;

showMovieData();

var scrollAmout = 0;

function sliderScrollLeft() {
  sliders.scrollTo({
    top: 0,
    left: (scrollAmout -= scrollPerClick),
    behavior: 'smooth',
  });

  if (scrollAmout < 0) {
    scrollAmout = 0;
  }
}

function sliderScrollRight() {
  if (scrollAmout <= sliders.scrollWidth - sliders.clientWidth) {
    sliders.scrollTo({
      top: 0,
      left: (scrollAmout += scrollPerClick),
      behavior: 'smooth',
    });
  }
}

async function showMovieData() {
  const api_key = '94799980523f1a8327831cc2e15c3da1';
  // /discover/movie?sort_by=popularity.desc

  var result = await axios.get(
    'https://api.themoviedb.org/3/discover/movie?api_key=' +
      api_key +
      '&sort_by=popularity.desc'
  );

  console.log(result);
  result = result.data.results;

  result.map(function (cur, index) {
    sliders.insertAdjacentHTML(
      'beforeend',
      `<img class="img-${index} slider-img" src="https://image.tmdb.org/t/p/w185/${cur.poster_path}" />`
    );
  });
  //   scrollPerClick = document.querySelector('.img-1').clientWidth + ImagePadding;
  scrollPerClick = sliders.clientWidth;
}
