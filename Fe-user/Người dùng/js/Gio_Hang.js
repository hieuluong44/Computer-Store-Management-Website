document.addEventListener("DOMContentLoaded", function () {
    const userID = localStorage.getItem("userID") || "guest";
    updateCartQuantity(userID);
    displayCart();
    updateCartSummary(userID);
});
  
  // Hiển thị giỏ hàng
function displayCart() {
    const allCarts = JSON.parse(localStorage.getItem("cart")) || {};
    const userID = localStorage.getItem("userID") || "guest";
    const cart = allCarts[userID] || [];
  
    const tableBody = document.querySelector(".table");
    if (!tableBody) return;
  
    // Xoá các dòng hiện tại
    tableBody.innerHTML = '';
  
    cart.forEach((product, index) => {
      const totalPrice = (parseFloat(product.newprice) * product.quantity).toLocaleString("vi-VN");
  
      var newRow = document.createElement("li");
      newRow.innerHTML = `
        <div class="check">
          <input type="checkbox" id="check${index}" onchange="updateCheckoutTotal()">
        </div>
        <div class="item-left">
          <div class="item-img">
            <img src="${ './Item/' + product.img}">
          </div>
          <div class="delete-btn" onclick="deleteItem(${index})">
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
              <button class="decrease" onclick="changeQuantity(${index}, -1)">-</button>
              <span class="quantity">${product.quantity}</span>
              <button class="increase" onclick="changeQuantity(${index}, 1)">+</button>
            </div>
          </div>
        </div>`
      ;
  
      
      const checkbox = newRow.querySelector(`#check${index}`);
      if (checkbox) {
        const isChecked = checkbox.checked;
        checkbox.checked = isChecked; 
      }
  
      tableBody.appendChild(newRow);
    });
  
    updateCartQuantity(userID);
    updateCheckoutTotal(); 
}
  
// Cập nhật trạng thái checkbox và lưu ID sản phẩm
function updateSelectedProductIds() {
    const allCarts = JSON.parse(localStorage.getItem("cart")) || {};
    const userID = localStorage.getItem("userID") || "guest";
    const cart = allCarts[userID] || [];
    let selectedProductIds = [];

    cart.forEach((product, index) => {
        const checkbox = document.getElementById(`check${index}`);
        if (checkbox && checkbox.checked) {
            selectedProductIds.push(product.idMatHang);
        }
    });

    // Lưu lại ID sản phẩm đã chọn vào localStorage
    localStorage.setItem("selectedProductIds", JSON.stringify(selectedProductIds));
    updateCheckoutTotal(); 
}

// Gọi hàm này khi checkbox thay đổi trạng thái
document.addEventListener("change", function(e) {
    if (e.target.type === "checkbox") {
        updateSelectedProductIds();
    }
});
  
  
  
// Cập nhật tổng thanh toán khi thay đổi trạng thái checkbox
function updateCheckoutTotal() {
    const allCarts = JSON.parse(localStorage.getItem("cart")) || {};
    const userID = localStorage.getItem("userID") || "guest";
    const cart = allCarts[userID] || [];
    let totalPrice = 0;
  
  
    // Lặp qua các sản phẩm và cộng giá của sản phẩm đã được chọn vào tổng thanh toán
    cart.forEach((product, index) => {
        const checkbox = document.getElementById(`check${index}`);
        if (checkbox && checkbox.checked) {
        totalPrice += parseFloat(product.newprice) * product.quantity;
      }
    });
  
  
    // Cập nhật tổng thanh toán
    const totalPayment = document.querySelector(".shoping__checkout .total-payment");
    if (totalPayment) {
        totalPayment.textContent = `${totalPrice.toLocaleString("vi-VN")} đ`;
    }
  
  
    // Cập nhật lại tổng số lượng được chọn
    const selectedItemsCount = cart.filter((product, index) => document.getElementById(`check${index}`).checked).length;
    const itemCount = document.querySelector(".shoping__checkout li:first-child span");
    if (itemCount) {
      itemCount.textContent = selectedItemsCount;
    }
}
  
  
  
// Cập nhật số lượng mặt hàng
function changeQuantity(index, change) {
    const allCarts = JSON.parse(localStorage.getItem("cart")) || {};
    const userID = localStorage.getItem("userID") || "guest";
    const cart = allCarts[userID] || [];
    const product = cart[index];
  
    const checkbox = document.getElementById(`check${index}`);
    const isChecked = checkbox && checkbox.checked;
  
    product.quantity += change;
  
    if (product.quantity < 1) {
      product.quantity = 1;
    }
  
    updateCartArray(index, product, userID);
  
    displayCart();
  
    if (checkbox) {
      checkbox.checked = isChecked;  
    }
  
  
    updateCartSummary(userID);
}
  
  
  
// Cập nhật giỏ hàng trong localStorage
function updateCartArray(index, product, userID) {
    const allCarts = JSON.parse(localStorage.getItem("cart")) || {};
    const cart = allCarts[userID] || [];
  
    cart[index] = product;
  
    allCarts[userID] = cart;
    localStorage.setItem("cart", JSON.stringify(allCarts));
}
  
  
   
  // Xóa sản phẩm khỏi giỏ hàng
function deleteItem(index) {
    const allCarts = JSON.parse(localStorage.getItem("cart")) || {};
    const userID = localStorage.getItem("userID") || "guest";
    const cart = allCarts[userID] || [];
  
    cart.splice(index, 1);
    allCarts[userID] = cart;
    localStorage.setItem("cart", JSON.stringify(allCarts));
  
    displayCart();
    updateCartSummary(userID);
}
  
  
  
  
  // Cập nhật tổng số lượng khi thay đổi sản phẩm trong giỏ hàng
function updateCartQuantity(userID) {
    const allCarts = JSON.parse(localStorage.getItem("cart")) || {};
    const cart = allCarts[userID] || [];
    const totalQuantity = cart.reduce((acc, product) => acc + product.quantity, 0);
  
    const cartQuantitySpan = document.querySelector(".cart-badge span");
    if (cartQuantitySpan) {
      cartQuantitySpan.textContent = totalQuantity;
    }
}
  

  
  // Cập nhật số lượng mặt hàng và tính lại tổng tiền mà không thay đổi trạng thái checkbox
  function updateQuantityAndTotal(row, product) {
    const quantitySpan = row.querySelector(".quantity");
    const totalCell = row.querySelector(".total");
    const checkbox = row.querySelector("input[type=checkbox]");
  
    const priceString = String(product.newprice);  
    product.total = parseFloat(priceString.replace(/\D/g, "")) * product.quantity;
  
    quantitySpan.textContent = product.quantity;
    totalCell.innerHTML = `<b>${product.total.toLocaleString("vi-VN")} đ</b>`;
  
    const userID = localStorage.getItem("userID") || "guest";
    updateCartArray(row, product, userID);
  
    updateCartSummary(userID);
  
    updateCheckoutTotal();
}
  

  
// Hàm cập nhật tổng số lượng sản phẩm và tổng tiền trong giỏ hàng
function updateCartSummary(userID) {
    const allCarts = JSON.parse(localStorage.getItem("cart")) || {};
    const cart = allCarts[userID] || [];
  
    let totalItems = 0;  
    let totalPrice = 0;  
  
  
    // Lặp qua các sản phẩm trong giỏ hàng và chỉ tính những sản phẩm có checkbox được chọn
    cart.forEach((product, index) => {
      const checkbox = document.getElementById(`check${index}`);
      if (checkbox && checkbox.checked) {
        totalItems += product.quantity;
        totalPrice += parseFloat(product.newprice) * product.quantity;
      }
    });
  
  
    // Cập nhật thông tin hiển thị tổng số sản phẩm và tổng tiền
    const itemCount = document.querySelector(".shoping__checkout li:first-child span");
    if (itemCount) {
      itemCount.textContent = totalItems;
    }
  
    const totalPayment = document.querySelector(".shoping__checkout .total-payment");
    if (totalPayment) {
        totalPayment.textContent = `${totalPrice.toLocaleString("vi-VN")} đ`;
    }
}
  
  
function logout() {
    localStorage.removeItem("userID");
    alert("Đã đăng xuất thành công!");
    window.location.href = "Trang_Chu.html";
}