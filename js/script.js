const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let isInitialLoad = true;
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

// Unsplash API
let initialCount = 5;
const apiKey = config.API_KEY;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

// Update apiUrl with new count
function updateApiUrlwithNewCount(newCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${newCount}`;
}

//  Check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to set attributes on DOM elements
function setsAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Create elements for links & photos 
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

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

        // Event Listener - check when each is finished loading
        img.addEventListener('load', imageLoaded);
        
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

        displayPhotos();

        if(isInitialLoad) {
            updateApiUrlwithNewCount(30);
            isInitialLoad = false;
        }
    } catch(error) {
        // Catch error here
    }
}

// Check to see if scrolling near bottom of page and load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();