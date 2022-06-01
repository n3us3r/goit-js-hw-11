import './sass/main.scss';
import { fetchImages } from './js/fetch-service-api';
import { renderMarkup } from './js/renderMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
	inputForm: document.querySelector('#search-form'),
	galleryItem: document.querySelector('.gallery'),
	inputBtn: document.querySelector('button[submit]'),
	loadMoreBtn: document.querySelector('.btn-load-more'),
	goTop: document.querySelector('.btn-to-top'),
}

refs.inputForm.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.goTop.addEventListener('click', onGoUp);
window.addEventListener('scroll', onScroll);


let inputQuery = "";
let page = 1;
const perPage = 40;
let simpleLightbox;


onScroll();

function onSubmit(e) {
	e.preventDefault();
	
	refs.loadMoreBtn.classList.add("is-hidden");
	clearDom();
	page = 1;
	inputQuery = e.target.elements.searchQuery.value.trim();

	fetchImages(inputQuery, page, perPage)
	// .then(data => {
	.then(({data}) => {
		if (data.totalHits === 0) {
			
			imagesNotFoundAlert();

		} else {
			
			foundImagesAmount(data.totalHits);
			renderMarkup(data.hits)

			if (data.totalHits > perPage) {
				refs.loadMoreBtn.classList.remove("is-hidden");

				simpleLightbox = new SimpleLightbox('.gallery a').refresh();
				
				}
		} 
	}).catch(console.log).finally(() => {
		refs.inputForm.reset();
	})
}

function onLoadMore() {

	page += 1;
	fetchImages(inputQuery, page, perPage)
	// .then(data => {
	.then(({data}) => {

		const totalPages = Math.ceil(data.totalHits / perPage);
		if (page === totalPages) {
			refs.loadMoreBtn.classList.add('is-hidden');
			
			endOfSearch();
		}
		renderMarkup(data.hits);
		simpleLightbox = new SimpleLightbox('.gallery a').refresh();


	}).catch(console.log);
}



function onScroll() {
	const windowHeight = document.documentElement.clientHeight;
	const coords = window.scrollY;

	if (coords < windowHeight) {
		refs.goTop.classList.add('is-hidden');
	} else if (coords > windowHeight) {
		refs.goTop.classList.remove('is-hidden');
	}
	console.log(windowHeight);
	console.log(coords);
}

function onGoUp() {
 if (window.scrollY > 0) {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
})

}
}

function clearDom() {
	refs.galleryItem.innerHTML = "";
	refs.goTop.classList.add('is-hidden');
}

function imagesNotFoundAlert() {
	Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}

function foundImagesAmount(totalHits) {
	Notify.success(`Hooray! We found ${totalHits} images.`);
}

function endOfSearch() {
	Notify.warning("We're sorry, but you've reached the end of search results.")
}