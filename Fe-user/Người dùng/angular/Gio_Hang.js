app.controller("DatHangController", function($scope, $http) {

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

    // Giả sử bạn đã có thông tin giỏ hàng và giảm giá
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const userID = localStorage.getItem("userID") || "guest";
    const cartItems = cart[userID] || [];

    // Lưu mặt hàng đã chọn
    $scope.selectedItems = [];

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

    $scope.updateCartDetails = function() {
        let totalQuantity = 0;
        let totalAmount = 0;
        $scope.selectedItems.forEach(item => {
            totalQuantity += item.quantity;
            totalAmount += item.quantity * parseFloat(item.newprice);
        });
    
        // Cập nhật thông tin vào orderInfo
        $scope.orderInfo.soluongHang = totalQuantity;
        $scope.orderInfo.tongThanhToan = totalAmount - $scope.orderInfo.giamGia;
    
        // Loại bỏ dấu phân cách nghìn (nếu có) và đảm bảo là một số
        $scope.orderInfo.tongThanhToan = parseFloat($scope.orderInfo.tongThanhToan.toString().replace(/,/g, ''));
    };
    

    // Hàm áp dụng mã giảm giá
    $scope.applyVoucher = function(voucher) {
        $scope.orderInfo.giamGia = (voucher.tyLeGiam / 100) * $scope.orderInfo.tongThanhToan;
        $scope.updateCartDetails();
    };

    // Hàm tạo ID tự động cho Đơn hàng và Chi tiết đơn hàng
    const IDAuto = { 
        chars1: ['h', 'a', 'x', 'e'], 
        chars2: ['d', 'g', 't'], 
        generateID: function (prefix) { 
            const randomNumber = Math.floor(Math.random() * (99999999 - 100000000 + 1)) + 100; 
            const randomChar1 = this.chars1[Math.floor(Math.random() * this.chars1.length)]; 
            const randomChar2 = this.chars2[Math.floor(Math.random() * this.chars2.length)]; 
            return `${prefix}${randomChar1}${randomChar1}${randomNumber}${randomChar2}${randomNumber}`; 
        }
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
    
        const orderID = IDAuto.generateID("DB");
        const orderDetails = $scope.selectedItems.map(item => ({
            IDChiTietDonBan: IDAuto.generateID("CTDB"),
            IDDonBan: orderID,
            IDMatHang: item.idMatHang,
            SoLuong: item.soLuong,
            GiaBan: item.giaBan,
        }));
    
        const orderData = {
            idDonBan: orderID,
            idNguoiDung: userID === "guest" ? null : userID, 
            hoTenNguoiNhan: $scope.orderInfo.hoTenNguoiNhan,
            soDienThoaiNguoiNhan: $scope.orderInfo.soDienThoaiNguoiNhan,
            diaChiNguoiNhan: $scope.orderInfo.diaChiNguoiNhan,
            ngayBan: new Date($scope.orderInfo.ngayBan).toISOString(),
            trangThai: 'Chờ xác nhận',
            ghiChu: $scope.orderInfo.ghiChu,
            tongTien: $scope.orderInfo.tongThanhToan,
            listChiTietBan: orderDetails
        };
        
    
        // Gửi yêu cầu tạo đơn hàng
        $http({
            method: 'POST',
            url: 'http://localhost:5156/api/DonDatHangControllers/Create',
            headers: { 'Content-Type': 'application/json' },
            data: orderData
        }).then(function(response) {
            if (response.status === 200) {
                showToast("success", "Đơn hàng đã được tạo thành công!");
                localStorage.removeItem("cart");
                $scope.selectedItems = [];
                $scope.updateSelectedItemsFromStorage();
            } else {
                showToast("error", "Không thể tạo đơn hàng. Vui lòng thử lại!");
            }
        }).catch(function(error) {
            console.error("Lỗi khi tạo đơn hàng:", error);
            showToast("error", "Không thể tạo đơn đặt hàng. Vui lòng thử lại!");
        });
    };
    

    // Cập nhật thông tin giỏ hàng ngay khi bắt đầu
    $scope.updateSelectedItemsFromStorage();
});
