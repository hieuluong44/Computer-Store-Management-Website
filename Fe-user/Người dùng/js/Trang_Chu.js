// ---------------------------------------------Phần Slider (Chạy ảnh)--------------------------------------
(function () {
    const images = document.querySelectorAll('.Image');
    const nextButton = document.getElementById('next');
    const backButton = document.getElementById('back');
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

// ---------------------------------------------Phần Countdown (Chạy time Deal)--------------------------------------




  
  