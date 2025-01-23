app.controller("DatHangController", function($scope, $http) {

    const IDAuto = { 
        chars1: ['h', 'a', 'x', 'e'], 
        chars2: ['d', 'g', 't'], 
        generateID: function (prefix) { 
            const maxLength = 10; 
            const randomNumberLength = maxLength - prefix.length - 2; 
            const randomNumber = Math.floor(
                Math.random() * Math.pow(10, randomNumberLength)
            )
                .toString()
                .padStart(randomNumberLength, '0'); 
            const randomChar1 = this.chars1[Math.floor(Math.random() * this.chars1.length)]; 
            const randomChar2 = this.chars2[Math.floor(Math.random() * this.chars2.length)]; 
            return `${prefix}${randomChar1}${randomNumber}${randomChar2}`; 
        }
    };    
    
    // Hàm hiển thị thông báo
    const buttons = document.querySelectorAll(".tab-content .foot .btn");
    const notifications = document.querySelector(".notifications");
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

    $scope.PayMentShowCLose = function() {
        $scope.PayMentShow = false;
        if ($scope.cartItems && Array.isArray($scope.cartItems)) {
            $scope.cartItems.forEach(function(item) {
                item.selected = false;
            });
        }
        $scope.selectedItems = [];  // Reset selectedItems
    };
    

    // Khởi tạo đối tượng lưu thông tin đơn hàng
    $scope.orderInfo = {
        hoTenNguoiNhan: '',
        soDienThoaiNguoiNhan: '',
        diaChiNguoiNhan: '',
        ghiChu: '',
        soluongHang: 0,
        giamGia: 0,
        tongThanhToan: 0,
        ngayBan: new Date()  
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const userID = localStorage.getItem("userID") || "guest";
    const cartItems = cart[userID] || [];

    function updateCartDisplay() {    
        const cartEmpty = document.getElementById("cart-empty");
        const cartHead = document.getElementById("cart-head");
        const checkout = document.getElementById("shoping__checkout");
        const cartItemsList = document.getElementById("cart-items-list");
    
        if (cartItems.length === 0) {
            cartEmpty.style.display = "block";
            cartHead.style.display = "none";
            checkout.style.display = "none";
        } else {
            cartEmpty.style.display = "none";
            cartHead.style.display = "block";
            checkout.style.display = "block";
            
            cartItemsList.innerHTML = ""; 
            cartItems.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `${item.name} - ${item.newprice.toLocaleString()} VNĐ`;
                cartItemsList.appendChild(li);
            });
        }
    }
    
    // Gọi hàm cập nhật khi tải trang
    updateCartDisplay();
    
   
    $scope.selectedItems = [];

    $scope.updateCartDetails = function() {
        let totalQuantity = 0;
        let totalAmount = 0;
        $scope.selectedItems.forEach(item => {
            totalQuantity += item.quantity;
            totalAmount += item.quantity * parseFloat(item.newprice);
        });
    
        $scope.orderInfo.soluongHang = totalQuantity;
        $scope.orderInfo.tongThanhToan = totalAmount - $scope.orderInfo.giamGia;
    
        $scope.orderInfo.tongThanhToan = parseFloat($scope.orderInfo.tongThanhToan.toString().replace(/,/g, ''));
    };


    // Cập nhật các mặt hàng đã chọn
    $scope.updateSelectedItems = function() {
        $scope.selectedItems = cartItems.filter(item => item.selected); 
        $scope.updateCartDetails(); 
    };


    // Lấy ID mặt hàng đã chọn từ localStorage
    $scope.updateSelectedItemsFromStorage = function() {
        const selectedProductIds = JSON.parse(localStorage.getItem("selectedProductIds")) || [];
        $scope.selectedItems = cartItems.filter(item => selectedProductIds.includes(item.idMatHang));
        $scope.updateCartDetails();
    };

   
    
    $scope.applyVoucher = function(voucher) {
        $scope.orderInfo.giamGia = (voucher.tyLeGiam / 100) * $scope.orderInfo.tongThanhToan;
        $scope.updateCartDetails();
    };


    $scope.placeOrder = function() {
        if (!$scope.orderInfo.hoTenNguoiNhan || !$scope.orderInfo.soDienThoaiNguoiNhan || !$scope.orderInfo.diaChiNguoiNhan) {
            showToast("info", "Vui lòng điền đầy đủ thông tin khách hàng!");
            return;
        }
    
        $scope.updateCartDetails();
    
        if ($scope.orderInfo.tongThanhToan <= 0 || isNaN($scope.orderInfo.tongThanhToan)) {
            showToast("error", "Tổng tiền không hợp lệ!");
            return;
        }
    
        // Tạo ID cho đơn hàng
        const orderID = IDAuto.generateID("DB");
    
        // Tạo ID cho danh sách chi tiết đơn hàng
        const orderDetails = $scope.selectedItems.map(item => ({
            idChiTietDonBan: IDAuto.generateID("CTDB"),
            idDonBan: orderID,
            idMatHang: item.idMatHang,
            soLuong: item.quantity,
            giaBan: item.newprice,
        }));
    
        const orderData = {
            idDonBan: orderID,
            idNguoiDung: userID === "guest" ? null : userID, 
            hoTenNguoiNhan: $scope.orderInfo.hoTenNguoiNhan,
            soDienThoaiNguoiNhan: $scope.orderInfo.soDienThoaiNguoiNhan,
            diaChiNguoiNhan: $scope.orderInfo.diaChiNguoiNhan,
            ngayBan: new Date($scope.orderInfo.ngayBan).toISOString(),
            ghiChu: $scope.orderInfo.ghiChu,
            tongTien: $scope.orderInfo.tongThanhToan,
            listChiTietBan: orderDetails
        };
    
        // Gửi yêu cầu tạo đơn hàng
        $http({
            method: 'POST',
            url: "http://localhost:5156/api/DonDatHangControllers/Create",
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(orderData),
        }).then(function(response) {
            console.log("Đơn hàng đã được tạo thành công:", response);
            showToast("success", "Đơn hàng đã được tạo thành công!");
            $scope.remove("cart");
            location.reload();
        }).catch(function(error) {
            console.error("Lỗi khi tạo đơn hàng:", error);
            showToast("error", "Không thể tạo đơn đặt hàng. Vui lòng thử lại!");
        });
        
    };
    
    // Cập nhật thông tin giỏ hàng ngay khi bắt đầu
    $scope.updateSelectedItemsFromStorage();
});
