document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  addReview();
  document.getElementsByClassName('description')[0].childNodes[3].addEventListener('click', (e) => {
    const value = document.getElementsByClassName('description')[0].childNodes[1].value
    editDescription(value)
    e.preventDefault();
  })
})

function fetchData() {
  fetch('http://localhost:3000/beers/1').then(object => object.json()).then(object =>  UpdateContent(object))
}


function UpdateContent(object) {
  const beerDetails = document.getElementsByClassName('beer-details')[0];
  const beerName = beerDetails.firstElementChild;
  beerName.innerHTML = object.name;
  const image = beerDetails.childNodes[3];
  image.src = object.image_url;
  beerDetails.lastElementChild.innerHTML = "";
  object.reviews.map(review => {
    const liElement = document.createElement('li');
    liElement.innerHTML = review
    beerDetails.lastElementChild.appendChild(liElement);
  })
  const description = document.getElementsByClassName('description')[0].firstElementChild;
  description.innerHTML = object.description;
}

function addReview() {
  const reviewForm = document.getElementsByClassName('review-form')[0];
  reviewForm.addEventListener('submit', (e) => {
    const reviewContent = reviewForm.childNodes[1].value;
    postReview(reviewContent);
    reviewForm.childNodes[1].value = '';
    e.preventDefault();
  })
}

function postReview(review) {
  const liElement = document.createElement('li');
  liElement.innerHTML = review;
  document.getElementsByClassName('beer-details')[0].lastElementChild.appendChild(liElement);
}

function editDescription(value) {
  const config = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({description: value})
  }
  return fetch('http://localhost:3000/beers/1', config)
  .then(function(response) {
    return response.text();
  }).catch(function(error) {
    alert("Failed to save score");
    return error.message;
  });
}
