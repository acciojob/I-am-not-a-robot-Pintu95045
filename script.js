//your code here
document.addEventListener("DOMContentLoaded", function() {
    const imageContainer = document.getElementById("image-container");
    const resetButton = document.getElementById("reset");
    const verifyButton = document.getElementById("verify");
    const para = document.getElementById("para");
    const message = document.getElementById("h");
    
    const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
    let images = [];
    let selectedImages = [];
    
    function initialize() {
        images = generateImages();
        renderImages(images);
        resetState();
    }

    function generateImages() {
        const randomIndex = Math.floor(Math.random() * imageClasses.length);
        const selectedClass = imageClasses[randomIndex];
        const allImages = [...imageClasses, selectedClass];
        return shuffleArray(allImages);
    }

    function renderImages(imageArray) {
        imageContainer.innerHTML = '';
        imageArray.forEach((imageClass, index) => {
            const img = document.createElement('img');
            img.classList.add(imageClass);
            img.dataset.index = index;
            img.addEventListener('click', handleImageClick);
            imageContainer.appendChild(img);
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function handleImageClick(event) {
        const clickedImg = event.target;
        const clickedIndex = clickedImg.dataset.index;

        if (!selectedImages.includes(clickedIndex)) {
            selectedImages.push(clickedIndex);
            clickedImg.classList.add('selected');

            if (selectedImages.length === 1) {
                resetButton.style.display = 'block';
            }

            if (selectedImages.length === 2) {
                verifyButton.style.display = 'block';
            }
        }
    }

    resetButton.addEventListener('click', resetState);

    verifyButton.addEventListener('click', function() {
        const [firstIndex, secondIndex] = selectedImages;
        const firstImg = document.querySelector(`[data-index="${firstIndex}"]`);
        const secondImg = document.querySelector(`[data-index="${secondIndex}"]`);

        if (firstImg.className === secondImg.className) {
            para.textContent = 'You are a human. Congratulations!';
        } else {
            para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
        }

        verifyButton.style.display = 'none';
    });

    function resetState() {
        selectedImages = [];
        resetButton.style.display = 'none';
        verifyButton.style.display = 'none';
        para.textContent = '';
        const images = document.querySelectorAll('#image-container img');
        images.forEach(img => img.classList.remove('selected'));
    }

    initialize();
});
