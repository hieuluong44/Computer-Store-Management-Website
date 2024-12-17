document.addEventListener("DOMContentLoaded", function () {
  var thumbnails = document.querySelectorAll(".small-image");
  var mainImage = document.getElementById("large-image");

  thumbnails.forEach(function (thumbnail) {
    thumbnail.addEventListener("click", function () {

      mainImage.classList.add("hidden");

      setTimeout(function () {
        mainImage.src = thumbnail.src;
        mainImage.alt = thumbnail.alt;

        mainImage.classList.remove("hidden");
      }, 500); 
    });
  });
});


const listImages = document.querySelector("#list-images");
const smallImages = document.querySelectorAll(".small-image");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");

let currentIndex = 0;
const imageWidth = 110; 
const maxVisibleImages = 3; 
const totalImages = smallImages.length;

function updateCarousel() {
  const offset = -currentIndex * imageWidth;
  listImages.style.transform = `translateX(${offset}px)`;
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < totalImages - maxVisibleImages) {
    currentIndex++;
    updateCarousel();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

let autoPlay = setInterval(() => {
  if (currentIndex < totalImages - maxVisibleImages) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
}, 3000);


listImages.addEventListener("mouseover", () => {
  clearInterval(autoPlay);
});

listImages.addEventListener("mouseout", () => {
  autoPlay = setInterval(() => {
    if (currentIndex < totalImages - maxVisibleImages) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  }, 3000);
});

smallImages.forEach((img) => {
  img.addEventListener("click", (e) => {
    const largeImage = document.querySelector("#large-image");
    largeImage.src = e.target.src;
  });
});

const buttons = document.querySelectorAll(".tab-content .foot .btn");
const notifications = document.querySelector(".notifications");


/*============================ Đánh giá ==============================*/

document.addEventListener("DOMContentLoaded", function () {
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const reviewModal = document.getElementById("reviewModal");
  const submitReviewBtn = document.getElementById("submitReviewBtn");
  const reviewList = document.querySelector(".comments");

  // Load đánh giá từ localStorage
  function loadReviews() {
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviewList.innerHTML = ""; // Xóa các đánh giá cũ trên giao diện
    storedReviews.forEach((review) => {
      const newComment = document.createElement("div");
      newComment.classList.add("comment");
      newComment.innerHTML = `
        <div class="comment-author">
          <span class="author">${review.author || "Người dùng"}</span>
          <span class="date">${review.date}</span>
        </div>
        <div class="comment-text">
          <div class="stars">
            ${"★".repeat(review.rating).padEnd(5, "☆")}
          </div>
          <p class="text">${review.text}</p>
        </div>
      `;
      reviewList.appendChild(newComment);
    });
  }

  // Lưu đánh giá vào localStorage
  function saveReview(review) {
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    storedReviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(storedReviews));
  }

  openModalBtn.addEventListener("click", function () {
    console.log("Mở modal");  // Kiểm tra sự kiện click
    reviewModal.classList.add('show');

  });
  

  // Đóng modal
  closeModalBtn.addEventListener("click", function () {
    reviewModal.style.display = "none";
  });

  // Gửi đánh giá
  submitReviewBtn.addEventListener("click", function () {
    const reviewText = document.getElementById("reviewText").value.trim();
    const selectedRating = document.querySelector(".star-rating .star.selected");
    const ratingValue = selectedRating ? selectedRating.getAttribute("data-value") : null;

    if (!reviewText || !ratingValue) {
      alert("Vui lòng điền đầy đủ thông tin đánh giá!");
      return;
    }

    // Tạo đánh giá mới
    const newReview = {
      author: "Người dùng", // Hoặc bạn có thể lấy tên người dùng từ input nếu có
      date: new Date().toLocaleDateString(),
      rating: ratingValue,
      text: reviewText,
    };

    // Lưu vào localStorage
    saveReview(newReview);

    // Hiển thị đánh giá mới
    loadReviews();

    // Reset modal và đóng
    document.getElementById("reviewText").value = "";
    document.querySelectorAll(".star-rating .star").forEach((star) => star.classList.remove("selected"));
    reviewModal.style.display = "none";
  });

  // Xử lý chọn sao
  document.querySelectorAll(".star-rating .star").forEach((star) => {
    star.addEventListener("click", function () {
      document.querySelectorAll(".star-rating .star").forEach((s) => s.classList.remove("selected"));
      this.classList.add("selected");
    });
  });

  // Load đánh giá khi trang được mở
  loadReviews();
});

