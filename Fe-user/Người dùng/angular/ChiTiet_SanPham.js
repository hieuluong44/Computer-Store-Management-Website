app.controller("ChiTietMatHang", function ($scope, $http) {
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

    $scope.listThongSo = [];
    const selectedProductID = localStorage.getItem("selectedProductID");

    if (selectedProductID) {
        $http.get(`http://localhost:5156/api/ChiTietMatHangControllers/GetChiTiet_MatHangs/${selectedProductID}`)
            .then(function (response) {
                $scope.product = response.data;
                if ($scope.product.donGia) {
                    $scope.product.giaBanFormatted = parseFloat($scope.product.donGia).toLocaleString("vi-VN");
                }
            }, console.error);
    } else {
        console.error("Không tìm thấy sản phẩm");
    }

    $scope.loadthongso = function () {
        $http.get(`http://localhost:5156/api/ChiTietMatHangControllers/Get_ThongSo/${selectedProductID}`)
            .then(function (response) {
                $scope.listThongSo = response.data;
            });
    };
    $scope.loadthongso();

    function addToCart(product) {
        const allCarts = JSON.parse(localStorage.getItem("cart")) || {};
        const userID = localStorage.getItem("userID") || "guest"; 
        const cart = allCarts[userID] || [];
      
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const existingProductIndex = cart.findIndex(p => p.idMatHang === product.idMatHang);
      
        if (existingProductIndex !== -1) {
          // Nếu sản phẩm đã có, tăng số lượng
          cart[existingProductIndex].quantity += product.quantity;
        } else {
          // Nếu chưa có, thêm mới sản phẩm vào giỏ hàng
          cart.push(product);
        }
      
        // Lưu lại giỏ hàng vào localStorage
        allCarts[userID] = cart;
        localStorage.setItem("cart", JSON.stringify(allCarts));
      
        console.log("Giỏ hàng sau khi thêm sản phẩm: ", cart);
        displayCart();  // Cập nhật lại giỏ hàng
      }
      

    function updateCartQuantity(userID) {
        const allCarts = JSON.parse(localStorage.getItem("cart")) || {};
        const cart = allCarts[userID] || [];
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartQuantityElement = document.getElementById("cart-quantity");
        if (cartQuantityElement) {
            cartQuantityElement.textContent = totalQuantity;
        }
    }

    document.getElementById("buy-now").addEventListener("click", function (event) {
        event.preventDefault();
        const product = {
            img: $scope.product.duongDan,
            name: $scope.product.tenMatHang,
            idMatHang: $scope.product.idMatHang,
            warranty: $scope.product.baoHanh,
            newprice: $scope.product.donGia,
            quantity: 1,
        };
        addToCart(product);
    });
});
