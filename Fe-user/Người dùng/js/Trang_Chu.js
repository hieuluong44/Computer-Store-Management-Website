// ---------------------------------------------Phần Slider (Chạy ảnh)--------------------------------------
(function () {
    const images = document.querySelectorAll('.Image');
    const nextButton = document.getElementById('nextImg');
    const backButton = document.getElementById('backImg');
    const dots = document.querySelectorAll('#dots li');
    let currentIndex = 0;
    console.log(images); // Kiểm tra xem images có phần tử nào không

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

    // Sự kiện cho các nút điều khiển
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

    // Chạy slider tự động
    setInterval(nextImage, 5000);
    showImage(currentIndex);
})();

// ---------------------------------------------Phần slide (Chạy sản phẩm)--------------------------------------

(function () {
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
                slide.style.transform = `translateX(-${currentIndex * (slideWidth + 10)}px)`;
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
            }, 5000);

            updateSlidePosition();
        });
    }

    handleSlide(productSlides, 5, 1); 
    handleSlide(productSlides2, 4, 0); 
})();



// ---------------------------------------------Phần tuyết rơi--------------------------------------

const snowContainer = document.querySelector('.snow-container');

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄';

    // Kích thước và vị trí ngẫu nhiên
    const size = Math.random() * 20 + 10; // Kích thước từ 10px đến 30px
    const positionX = Math.random() * window.innerWidth;

    snowflake.style.left = `${positionX}px`;
    snowflake.style.fontSize = `${size}px`;
    snowflake.style.animationDuration = `${Math.random() * 2 + 10}s`; 

    snowContainer.appendChild(snowflake);

    // Xóa bông tuyết sau khi hoàn thành
    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

// Tạo bông tuyết liên tục
setInterval(createSnowflake, 100);
