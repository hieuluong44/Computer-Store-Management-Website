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
        let cart = allCarts[userID] || [];
      
        const existingProductIndex = cart.findIndex(p => p.idMatHang === product.idMatHang);
      

        // Nếu sản phẩm đã có
        if (existingProductIndex !== -1) {
          cart[existingProductIndex].quantity++;
        } 


        // Nếu sản phẩm chưa có
        else {
          product.quantity = 1;  
          cart.push(product);
        }
      
        allCarts[userID] = cart;
        localStorage.setItem("cart", JSON.stringify(allCarts));
      
        displayCart();
        updateCartQuantity(userID);
    }
      
      
    
    // Gọi hàm sau khi thêm vào giỏ hàng
    $scope.buyNow = function () {
        const product = {
            img: $scope.product.duongDan,
            name: $scope.product.tenMatHang,
            idMatHang: $scope.product.idMatHang,
            warranty: $scope.product.baoHanh,
            newprice: $scope.product.donGia,
            quantity: 1,
        };
        addToCart(product);
        updateCartQuantity();
        showToast('success', 'Sản phẩm đã được thêm vào giỏ hàng!');
    };
    
});
