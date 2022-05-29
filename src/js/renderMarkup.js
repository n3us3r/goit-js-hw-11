export default renderMarkup;

const galleryItem = document.querySelector('.gallery');

function renderMarkup(images) {
	const imageCard = images.map(({webformatURL, tags, likes, views, comments, downloads}) => {
			return `
			<div class="photo-card">
			<img src="${webformatURL}" alt="${tags}" width=400 loading="lazy" />
			<div class="info">
			  <p class="info-item"><b>Likes: ${likes}</b></p>
			  <p class="info-item"><b>Views: ${views}</b></p>
			  <p class="info-item"><b>Comments: ${comments}</b></p>
			  <p class="info-item"><b>Downloads: ${downloads}</b></p>
			</div>
		 </div>
		 `;
		}
	).join('');

	galleryItem.insertAdjacentHTML('beforeend', imageCard);
}