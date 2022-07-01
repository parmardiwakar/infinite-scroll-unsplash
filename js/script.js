const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = config.API_KEY;

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function to set attributes on DOM elements
function setsAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Create elements for links & photos 
function displayPhotos() {
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        setsAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // Create <img> for photo
        const img = document.createElement('img');
        let description = "Unsplash-image";
        if(photo.description != null) {
            description = photo.description;
        }
        setsAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: description
        });
        
        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch(error) {
        // Catch error here
    }
}

// On Load
getPhotos();