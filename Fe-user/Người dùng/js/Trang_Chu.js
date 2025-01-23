// ---------------------------------------------Phần Slider (Chạy ảnh)--------------------------------------
function myfunction(){
    const images = document.querySelectorAll('.Image');
    const nextButton = document.getElementById('nextImg');
    const backButton = document.getElementById('backImg');
    const dots = document.querySelectorAll('#dots li');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.transform = `translateX(${(i - index) * 100}%)`;
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    backButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });
    nextButton.addEventListener('click', nextImage);

    // Sự kiện cho các dot
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentIndex = i;
            showImage(currentIndex);
        });
    });

    setInterval(nextImage, 5000);
    showImage(currentIndex);
};

// ---------------------------------------------Phần slide (Chạy sản phẩm)--------------------------------------

function myfunction2() {
    const nextButtons = document.querySelectorAll('#next');
    const backButtons = document.querySelectorAll('#back');
    const productSlides = document.querySelectorAll('.product-slide');
    const productSlides2 = document.querySelectorAll('.product-slide2');

    // Hàm xử lý băng chuyền
    function handleSlide(slideElements, itemsPerPage, buttonIndex) {
        slideElements.forEach((slide, index) => {
            let currentIndex = 0;

            function updateSlidePosition() {
                const slideWidth = slide.children[0].offsetWidth;
                slide.style.transform = `translateX(-${currentIndex * (slideWidth + 9.5)}px)`;
            }

            nextButtons[buttonIndex].addEventListener('click', () => {
                currentIndex++;
                if (currentIndex > slide.children.length - itemsPerPage) {
                    currentIndex = 0;
                }
                updateSlidePosition();
            });

            backButtons[buttonIndex].addEventListener('click', () => {
                currentIndex--;
                if (currentIndex < 0) {
                    currentIndex = slide.children.length - itemsPerPage;
                }
                updateSlidePosition();
            });

            setInterval(() => {
                nextButtons[buttonIndex].click();
            }, 3000);

            updateSlidePosition();
        });
    }

    handleSlide(productSlides, 5, 1); 
    handleSlide(productSlides2, 4, 0); 
};

myfunction();
myfunction2();

