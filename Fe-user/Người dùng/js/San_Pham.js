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

// Hàm hiển thị thông báo
    function showToast(type, message) {
      const toastDetails = {
          success: {
              icon: "fa-check-circle",
              message: message,
          },
          error: {
              icon: "fa-times-circle",
              message: message,
          },
          info: {
              icon: "fa-info-circle",
              message: message,
          },
      };
      const { icon, message: msg } = toastDetails[type];
      const toast = document.createElement("li");
      toast.className = `toast ${type}`;
      toast.innerHTML = `
          <div class="column">
              <i class="fa ${icon}"></i>
              <span>${msg}</span>
          </div>
          <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
      notifications.appendChild(toast);
      setTimeout(() => toast.remove(), 5000);
  }

/*====== Giỏ hàng ======*/
var productInfo = {
  img: document.querySelector("#large-image").src,
  name: document.querySelector("#title h1").textContent,
  idMatHang : document.querySelector(".ID-item span").textContent,
  warranty : document.querySelector("#Bao_hanh span").textContent,
  newprice: document.getElementById("new-prices").textContent,
  oldprice: document.getElementById("old-prices").textContent,
  quantity: 1,
};


document.getElementById("buy-now").addEventListener("click", function (event) {
  event.preventDefault(); // Ngăn hành động mặc định

  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  var existingProduct = cart.find(item => item.name === productInfo.name);

  if (existingProduct) {
    existingProduct.quantity += 1; 
    showToast("success", `Đã tăng số lượng sản phẩm "${productInfo.name}" trong giỏ hàng.`);
  } else {
    cart.push(productInfo);
    showToast("success", `Đã thêm sản phẩm "${productInfo.name}" vào giỏ hàng.`);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartQuantity();

  setTimeout(() => {
    window.location.href = "Gio_Hang.html";
  }, 1000);
});




/*Thêm sản phẩm vào yêu thích*/
document.getElementById("tim-now").addEventListener("click", function (event) {
  var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
  // Kiểm tra sản phẩm đã tồn tại
  var existingProduct = favorites.find(item => item.name === productInfo.name);
  if (existingProduct) {
    showToast("warning",`Sản phẩm "${productInfo.name}" đã tồn tại trong danh sách yêu thích.`);
  } else {
    favorites.push(productInfo);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    showToast("success",`Đã thêm sản phẩm "${productInfo.name}" vào danh sách yêu thích.`);
    updateTymQuantity(); // Cập nhật số lượng yêu thích
  }
  setTimeout(() => {
    window.location.href = "Yeu_Thich.html";
  }, 1000);
});


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

  // Hiển thị modal
  openModalBtn.addEventListener("click", function () {
    reviewModal.style.display = "flex";
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

