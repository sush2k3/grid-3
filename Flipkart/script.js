const generateButton = document.getElementById('generateButton');
const inputDescription = document.getElementById('inputDescription');
const outfitDisplay = document.getElementById('outfitDisplay');

generateButton.addEventListener('click', generateOutfit);

async function generateOutfit() {
    const description = inputDescription.value;
    const outfitImage = await generateOutfitImage(description);

    // Display the outfit image in the outfitDisplay div
    outfitDisplay.innerHTML = `<img src="${outfitImage}" alt="Generated Outfit">`;
}

async function generateOutfitImage(description) {
    const unsplashApiKey = '1-WUX5sXxiIhPso6pn44qFCh8o2TeU6gX4JVJ9QCz5Q';
    const searchQuery = encodeURIComponent(description);
    const apiUrl = `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=1&client_id=${unsplashApiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            return data.results[0].urls.regular;
        } else {
            return 'default_outfit_image_url.jpg'; // Provide a default image URL
        }
    } catch (error) {
        console.error('Error fetching image:', error);
        return 'error_image_url.jpg'; // Provide an error image URL
    }
}
