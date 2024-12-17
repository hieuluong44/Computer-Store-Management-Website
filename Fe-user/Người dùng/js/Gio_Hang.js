window.onload = function () {
  displayCart();
  updateCartSummary();
};

function displayCart() {
  const allCarts = JSON.parse(localStorage.getItem("cart")) || {};
  const userID = localStorage.getItem("userID") || "guest"; 
  const cart = allCarts[userID] || [];

  var tableBody = document.querySelector(".table");

  // Xoá tất cả dòng hiện có trừ hàng tiêu đề
  while (tableBody.children.length > 1) {
    tableBody.removeChild(tableBody.lastChild);
  }

  console.log("Dữ liệu giỏ hàng: ", cart);

  cart.forEach(function (product, index) {
    var newRow = document.createElement("li");
    
    // Đảm bảo newprice là chuỗi trước khi sử dụng replace
    const priceString = product.newprice.toString();  
    const totalPrice = (parseFloat(priceString.replace(/\D/g, "")) * product.quantity).toLocaleString("vi-VN");

    newRow.innerHTML = `
        <div class = "check"> 
          <input type="checkbox" id="check${index}" onchange="updateCheckboxes(${index})">
        </div>
      <div class="item-left">
        
        <div class="item-img">
          <img src="${product.img}">
        </div>
        <div class="delete-btn">
          <i class="bi bi-trash"></i> Xoá
        </div>
      </div>
      <div class="item-right">
        <div class="item-name">
          <a href="San_Pham.html"><b>${product.name}</b></a>
          <p id="IDmh">Mã mặt hàng : ${product.idMatHang}</p>
          <p>Bảo hành : ${product.warranty}</p>
        </div>
        <div class="item-prices">
          <p>${product.newprice} đ</p>
          <div class="sum">
            <p style="font-size: 18px">Tổng: </p>
            <p class="total">${totalPrice} đ</p>
          </div>
          <div class="item-quantity">
            <button class="decrease">-</button>
            <span class="quantity">${product.quantity}</span>
            <button class="increase">+</button>
          </div>
        </div>
      </div>
    `;
    tableBody.appendChild(newRow);
    updateProductEvents(newRow, product, index, userID);
  });

  updateCartSummary(userID);
}




// Cập nhật số lượng mặt hàng
function updateProductEvents(row, product, index, userID) {
  row.querySelector(".increase").addEventListener("click", function () {
    product.quantity++;
    updateQuantityAndTotal(row, product);
    updateCartArray(index, product, userID);
    updateCartSummary(userID);
  });

  row.querySelector(".decrease").addEventListener("click", function () {
    if (product.quantity > 1) {
      product.quantity--;
      updateQuantityAndTotal(row, product);
      updateCartArray(index, product, userID);
      updateCartSummary(userID);
    }
  });

  row.querySelector(".delete-btn").addEventListener("click", function () {
    deleteItem(index, userID);
  });
}

// Cập nhật tổng số lượng và tổng tiền
function updateCartSummary(userID) {
  const allCarts = JSON.parse(localStorage.getItem("cart")) || {};
  const cart = allCarts[userID] || [];
  const vorcher = document.getElementById("deal");

  let totalQuantity = 0;
  let totalPrice = 0;

  // Tính tổng số lượng và tổng tiền
  cart.forEach(function (product) {
    totalQuantity += product.quantity;
    totalPrice += parseFloat(product.newprice.replace(/\D/g, "")) * product.quantity;
  });

  // Lấy giá trị voucher
  let discount = 0;
  if (vorcher) {
    discount = parseFloat(vorcher.textContent.replace(/\D/g, "")) || 0;
  }

  // Tính tổng tiền sau khi giảm giá
  const totalPriceAfterDiscount = Math.max(totalPrice - discount, 0);

  // Cập nhật giao diện
  const checkoutList = document.querySelector(".shoping__checkout");
  if (checkoutList) {
    checkoutList.querySelector("li:first-child span").textContent = totalQuantity; // Số lượng
    checkoutList.querySelector("li:nth-child(2) span").textContent = `- ${discount.toLocaleString("vi-VN")} đ`; // Giảm giá
    checkoutList.querySelector("li:last-child span:last-child").textContent = `${totalPriceAfterDiscount.toLocaleString("vi-VN")} đ`; // Tổng tiền
  }
}

function updateQuantityAndTotal(row, product) {
  const quantitySpan = row.querySelector(".quantity");
  const totalCell = row.querySelector(".total");

  // Chuyển product.newprice thành chuỗi nếu nó là số
  const priceString = product.newprice.toString(); // Đảm bảo là chuỗi
  product.total = parseFloat(priceString.replace(/\D/g, "")) * product.quantity;

  // Cập nhật số lượng và tổng tiền
  quantitySpan.textContent = product.quantity;
  totalCell.innerHTML = `<b>${product.total.toLocaleString("vi-VN")} đ</b>`;

  // Cập nhật lại giỏ hàng trong localStorage
  const userID = localStorage.getItem("userID") || "guest";
  updateCartArray(row, product, userID);

  // Cập nhật lại tổng số lượng và tổng tiền
  updateCartSummary(userID);
}


function deleteItem(index, userID) {
  const allCarts = JSON.parse(localStorage.getItem("cart")) || {};
  const cart = allCarts[userID] || [];
  console.log("Trước khi xóa: ", cart);
  cart.splice(index, 1); // Xoá sản phẩm
  allCarts[userID] = cart;
  localStorage.setItem("cart", JSON.stringify(allCarts));
  displayCart(); // Cập nhật lại giao diện
}

// Cập nhật lại giỏ hàng trong localStorage
function updateCartArray(row, product, userID) {
  const allCarts = JSON.parse(localStorage.getItem("cart")) || {};
  const cart = allCarts[userID] || [];

  // Kiểm tra nếu sản phẩm đã có trong giỏ hàng
  const existingProductIndex = cart.findIndex(p => p.idMatHang === product.idMatHang);

  if (existingProductIndex !== -1) {
    // Cập nhật lại số lượng của sản phẩm
    cart[existingProductIndex].quantity = product.quantity;
  } else {
    // Nếu không có, thêm sản phẩm vào giỏ hàng
    cart.push(product);
  }

  // Lưu lại giỏ hàng vào localStorage
  allCarts[userID] = cart;
  localStorage.setItem("cart", JSON.stringify(allCarts));
  console.log("Giỏ hàng sau khi cập nhật: ", allCarts[userID]);
}


function updateCartQuantity(userID) {
  const allCarts = JSON.parse(localStorage.getItem("cart")) || {};
  const cart = allCarts[userID] || [];
  const totalQuantity = cart.reduce((acc, product) => acc + product.quantity, 0);

  const cartQuantitySpan = document.querySelector(".cart-badge span");
  if (cartQuantitySpan) {
    cartQuantitySpan.textContent = totalQuantity;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartQuantity(localStorage.getItem("userID") || "guest");
  displayCart(); // Gọi hiển thị giỏ hàng khi DOM đã sẵn sàng
  updateCartSummary();
});

function logout() {
  localStorage.removeItem("userID");
  localStorage.removeItem("name");
  localStorage.removeItem("image");
  alert("Đã đăng xuất thành công!");
  window.location.href = "Trang_Chu.html";
}


