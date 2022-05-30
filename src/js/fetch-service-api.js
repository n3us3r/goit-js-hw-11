import axios from 'axios';
export { fetchImages };

const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '27630302-0f83fd398f7301d2562fe101e';


// function fetchImages(inputQuery, page, perPage) {
// 	return fetch(`${BASE_URL}?key=${API_KEY}&q=${inputQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`).then(response => {
// 			return response.json()
// 	})
// }

async function fetchImages(inputQuery, page, perPage) {
		const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${inputQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
		return response;
}

