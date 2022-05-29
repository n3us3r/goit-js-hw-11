import './sass/main.scss';
import fetchService from './js/fetch-service-api'
const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
	inputForm: document.querySelector('#search-form'),
	inputBtn: document.querySelector('button'),
	galleryItem: document.querySelector('.gallery'),
	loadMoreBtn: document.querySelector('.load-more')
}

let inputQuery = "";

refs.inputForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
	e.preventDefault();
	
	inputQuery = e.target.elements.searchQuery.value;

	fetchService(inputQuery).then(hits => renderMarkup(hits)).catch(console.log);
}



	function renderMarkup(images) {
	const test = images.map(({webformatURL, tags, likes, views, comments, downloads}) => {
			return `<div class="photo-card">
			<img src="${webformatURL}" alt="${tags}" width=400 loading="lazy" />
			<div class="info">
			  <p class="info-item">
				 <b>Likes: ${likes}</b>
			  </p>
			  <p class="info-item">
				 <b>Views: ${views}</b>
			  </p>
			  <p class="info-item">
				 <b>Comments: ${comments}</b>
			  </p>
			  <p class="info-item">
				 <b>Downloads: ${downloads}</b>
			  </p>
			</div>
		 </div>`
		}
	)
	refs.galleryItem.innerHTML = test;
}


			

		// ).join("");
		// refs.galleryItem.innerHTML = renderMarkup;

// }

// function clearDom() {

// }
// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.