window.onload = function () {
    displayCart();
    updateCartSummary();
  };
  
  function displayCart() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var tableBody = document.querySelector(".table");
  
    // Xoá tất cả dòng hiện có trừ hàng tiêu đề
    while (tableBody.children.length > 1) {
      tableBody.removeChild(tableBody.lastChild);
    }
  
    cart.forEach(function (product, index) {
      var newRow = document.createElement("li");
      newRow.innerHTML = `
              <div class = "item-left">
                  <div class="item-img">
                    <img src="${product.img}">
                  </div>
                  <div class="delete-btn">
                      <i class="bi bi-trash"></i>
                      Xoá
                  </div>
              </div>
              <div class = "item-right">
                  <div class = "item-name">
                    <a href = "San_Pham.html"><b>${product.name}</b></a>
                    <p id="IDmh" >Mã mặt hàng : ${product.idMatHang}</p>
                    <p>Bảo hàng : ${product.warranty}</p>
                  </div>
                  <div class = "item-prices">
                    <p>${product.newprice} đ</p>
                    <div class = "sum">
                      <p style= "font-size : 18px">Tổng : </p> 
                      <p class="total">${(parseFloat(product.newprice.replace(/\D/g, "")) * product.quantity).toLocaleString("vi-VN") } đ</p>
                    </div>
                    <div class = "item-quantity">
                      <button class="decrease">-</button> 
                      <span class="quantity">${product.quantity}</span>
                      <button class="increase">+</button>
                    </div>
                  </div>

              </div>
          `;
      tableBody.appendChild(newRow);
      updateProductEvents(newRow, product, index);
      updateCartQuantity(); 
    });
  
    updateCartSummary(); 
  }
  
  function updateProductEvents(row, product, index) {
    row.querySelector(".increase").addEventListener("click", function () {
      product.quantity++;
      updateQuantityAndTotal(row, product);
      updateCartArray(index, product);
      updateCartQuantity();
      updateCartSummary(); 
    });
  
    row.querySelector(".decrease").addEventListener("click", function () {
      if (product.quantity > 1) {
        product.quantity--;
        updateQuantityAndTotal(row, product);
        updateCartArray(index, product);
        updateCartQuantity();
        updateCartSummary(); 
      }
    });
  
    row.querySelector(".delete-btn").addEventListener("click", function () {
      deleteItem(index);
      updateCartQuantity(); 
      updateCartSummary(); 
      location.reload();
    });
  }
  
  function updateCartSummary() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var vorcher = document.getElementById("deal");

    var totalQuantity = 0;
    var totalPrice = 0;

    // Tính tổng số lượng và tổng tiền
    cart.forEach(function (product) {
        totalQuantity += product.quantity;
        totalPrice += parseFloat(product.newprice.replace(/\D/g, "")) * product.quantity;
    });

    // Lấy giá trị voucher
    var discount = parseFloat(vorcher.textContent.replace(/\D/g, "")) || 0;

    // Tính tổng sau khi giảm giá
    var totalPriceAfterDiscount = totalPrice - discount;

    // Cập nhật giao diện số lượng và tổng tiền
    document.querySelector(".shoping__checkout li:first-child span").textContent = totalQuantity; // Cập nhật số lượng
    document.querySelector(".shoping__checkout li:nth-child(2) span").textContent = "- " + discount.toLocaleString("vi-VN") + " đ"; // Cập nhật giảm giá
    document.querySelector(".shoping__checkout li:last-child span:last-child").textContent = totalPriceAfterDiscount.toLocaleString("vi-VN") + " đ"; // Cập nhật tổng thanh toán sau khi giảm giá
}

  
  function updateQuantityAndTotal(row, product) {
    var quantitySpan = row.querySelector(".quantity");
    var totalCell = row.querySelector(".total");
    product.total =
      parseFloat(product.newprice.replace(/\D/g, "")) * product.quantity;
    quantitySpan.textContent = product.quantity;
    var boldTotal = document.createElement("b");
    boldTotal.textContent = product.total.toLocaleString("vi-VN") + " đ"; 
  
    totalCell.innerHTML = "";
    totalCell.appendChild(boldTotal);
  }
  
  function deleteItem(index) {
    var cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1); 
    localStorage.setItem("cart", JSON.stringify(cart)); 
    updateCartQuantity();
    displayCart(); 
  }
  
  function updateCartArray(index, product) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index] = product; 
    localStorage.setItem("cart", JSON.stringify(cart)); 
  }
  

  function updateCartQuantity() {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  var totalQuantity = cart.reduce(function (acc, product) {
    return acc + product.quantity;
  }, 0);

  var cartQuantitySpan = document.querySelector(".cart-badge span");
  if (cartQuantitySpan) {
    cartQuantitySpan.textContent = totalQuantity;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartQuantity();  
});

// function updateTymQuantity() {
//   var cart = JSON.parse(localStorage.getItem("favorites")) || [];
//   var totalQuantity = cart.reduce(function (acc, product) {
//     return acc + product.quantity;
//   }, 0);

//   var cartQuantitySpan = document.querySelector(".heart-badge span");
//   if (cartQuantitySpan) {
//     cartQuantitySpan.textContent = totalQuantity;
//   }
// }
// 
