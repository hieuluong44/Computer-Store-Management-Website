/*hàm cập nhật số lượng sản phẩm lên thanh menu*/
function updateCartCount() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var totalQuantity = 0;
    cart.forEach(function(product) {
        totalQuantity += product.quantity;
    });
    var cartCountSpan = document.querySelector('#item-cart span');
    cartCountSpan.textContent = totalQuantity; // Cập nhật số lượng sản phẩm
}
function updateTymQuantity() {
    var cart = JSON.parse(localStorage.getItem('favorites')) || [];
    var totalQuantity = cart.reduce(function(acc, product) {
        return acc + product.quantity;
    }, 0);

    var cartQuantitySpan = document.querySelector('#item-tym span');
    if (cartQuantitySpan) {
        cartQuantitySpan.textContent = totalQuantity;
    }
}
// Gọi hàm updateQuantity khi trang được tải
document.addEventListener("DOMContentLoaded", updateTymQuantity);
document.addEventListener("DOMContentLoaded", updateCartCount);
