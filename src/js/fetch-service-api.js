const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '27630302-0f83fd398f7301d2562fe101e';

export default function fetchImages(inputQuery) {
	return fetch(`${BASE_URL}?key=${API_KEY}&q=${inputQuery}&image_type=photo&orientation=horizontal&safesearch=false&page=1&per_page=40`).then(response => {
			return response.json()
	}).then(data => {
		if (data.totalHits === 0) {
			Notify.warning("Your query is incorrect");
		} else {
			return data.hits
		} 
	});
}

