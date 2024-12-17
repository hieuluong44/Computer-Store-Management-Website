app.controller("GiamGiacontroller", function($scope, $http) {
    $scope.ListGiamGia = [];
    $scope.showVoucherList = false;  // Để điều khiển việc hiển thị danh sách mã giảm giá

    // Hàm tải danh sách mã giảm giá
    $scope.loadGiamGia = function () {
        $http.get("http://localhost:5156/api/GiamGiaControllers/ApDung_GiamGia")
        .then(function(response){
            $scope.ListGiamGia = response.data;
        });
    };

    // Toggle hiển thị danh sách mã giảm giá khi click vào thẻ
    $scope.toggleVoucherList = function() {
        $scope.showVoucherList = !$scope.showVoucherList;
    };

    // Hàm áp dụng mã giảm giá vào giỏ hàng
    $scope.applyVoucher = function(voucher) {
        const allCarts = JSON.parse(localStorage.getItem("cart")) || {};
        const userID = localStorage.getItem("userID") || "guest"; 
        const cart = allCarts[userID] || [];

        // Kiểm tra nếu mã giảm giá hợp lệ (còn trong thời gian áp dụng)
        const today = new Date();
        const startDate = new Date(voucher.NgayBatDau);
        const endDate = new Date(voucher.NgayKetThuc);

        if (today >= startDate && today <= endDate && voucher.TrangThaiGiamGia === "Đang diễn ra") {
            let totalPrice = 0;
            cart.forEach(function(product) {
                // Tính tổng tiền giỏ hàng
                totalPrice += parseFloat(product.newprice.replace(/\D/g, "")) * product.quantity;
            });

            // Tính toán số tiền sau khi áp dụng mã giảm giá
            const discountAmount = (totalPrice * voucher.TyLeGiam) / 100;
            const totalAfterDiscount = totalPrice - discountAmount;

            // Lưu kết quả sau khi giảm giá vào giỏ hàng (cập nhật hoặc lưu mới)
            localStorage.setItem("discount", discountAmount);
            localStorage.setItem("totalAfterDiscount", totalAfterDiscount);

            alert("Mã giảm giá đã được áp dụng! Tổng sau khi giảm giá: " + totalAfterDiscount.toLocaleString("vi-VN") + " đ");

            // Cập nhật giao diện giỏ hàng nếu cần
            updateCartSummary(userID);
        } else {
            alert("Mã giảm giá không hợp lệ hoặc đã hết hạn.");
        }
    };

    // Hàm tải dữ liệu mã giảm giá ngay khi controller được khởi tạo
    $scope.loadGiamGia();
});
