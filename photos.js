//access key=Q30A2v5R4Nzn_nEld6bV1Mh72oY_rlOeXa1RNXBERDI


const accesskey = 'Q30A2v5R4Nzn_nEld6bV1Mh72oY_rlOeXa1RNXBERDI';
let currentpage=1;
const perPage = 5;
let loading = false;
let hasMorePhotos = true;

async function photoload() {
    if (loading || !hasMorePhotos) return;

    loading = true;
    try {
        console.log(`Fetching photos for page: ${currentpage}`);
        const response = await fetch(`https://api.unsplash.com/photos/?page=${currentpage}&per_page=${perPage}&client_id=${accesskey}`);
        const data = await response.json();

        if (data.length === 0) {
            console.log("No more photos to fetch.");
            hasMorePhotos = false;
            return;
        }

        displayoutput(data);
        currentpage++;
    } catch (error) {
        console.error("Error fetching photos", error);
    } finally {
        loading = false;
    }
}

function displayoutput(data) {
    const gallery = document.getElementById("gallery");
    data.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.urls.small;
        gallery.appendChild(img);
    });
}

function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        photoload();
    }
}

window.addEventListener('scroll', handleScroll);

window.onload = photoload;