app.controller('DonDatHangController', function ($scope, $http) {
    $scope.currentStatus = 'Chờ xác nhận';
    $scope.orderCounts = {
        'Chờ xác nhận': 0,
        'Chờ lấy hàng': 0,
        'Đang vận chuyển': 0,
        'Trả hàng': 0,
        'Đã giao': 0,
        'Yêu cầu huỷ hàng' : 0,
        'Đã huỷ': 0
    };

    // Hàm chuyển trạng thái
    $scope.switchStatus = function (status) {
        $scope.currentStatus = status;
        $scope.loadDonHang();
    };

    $scope.showFormChiTietDonDat = false;

    // Hàm tải danh sách đơn hàng
    $scope.loadDonHang = function () {
        $http.get(`http://localhost:5159/api/DonBanControllers/DonBan_TrangThai/${$scope.currentStatus}`)
            .then(function (response) {
                $scope.listDonHang = response.data;
                $scope.orderCounts[$scope.currentStatus] = response.data.length;
            }).catch(function (error) {
                console.error('Lỗi khi tải đơn hàng:', error);
            });
    };

    // Chỉ cho phép chọn một hóa đơn
    $scope.selectOnlyOne = function (index) {
        $scope.listDonHang.forEach((item, i) => {
            if (i !== index) {
                item.selected = false; 
            }
        });
    };

    // Hiển thị chi tiết đơn đặt hàng
    $scope.editSelectedDonDatHang = function () {
        const selectedDonDatHang = $scope.listDonHang.find(item => item.selected);

        if (!selectedDonDatHang) {
            alert("Vui lòng chọn một hóa đơn để xem chi tiết!");
            return;
        }

        const datHang = selectedDonDatHang.idDonBan;
        $http.get(`http://localhost:5159/api/ChiTietDonBanControllers/Get-All/${datHang}`)
        .then(response => {
            if (response.data && response.data.length > 0) {
                $scope.listChiTietDonHang = response.data;
                $scope.showFormChiTietDonDat = true;
    
                // Duyệt qua từng phần tử và định dạng giá bán
                $scope.listChiTietDonHang.forEach(item => {
                    if (item.giaBan) {
                        item.giaBanFormatted = parseFloat(item.giaBan).toLocaleString("vi-VN");
                    }
                });
            } else {
                alert("Không có mặt hàng nào trong đơn hàng này!");
            }
        }).catch(error => {
            console.error("Lỗi khi tải chi tiết đơn hàng:", error);
        });
    
    };
    
    $scope.updateStatus = function (item) {
        const data = {
            IdDonBan: item.idDonBan,
            TrangThai: item.trangThai
        };
    
        $http.put('http://localhost:5159/api/DonBanControllers/Update_TrangThai', data)
            .then(function (response) {
                alert(response.data.message); 
                item.trangThai = response.data.newTrangThai || item.trangThai; 
                $scope.loadDonHang(); 
            })
            .catch(function (error) {
                console.error('Cập nhật trạng thái thất bại:', error);
                alert('Cập nhật trạng thái thất bại: ' + (error.data?.message || 'Lỗi không xác định'));
            });
    };
    
    
    $scope.loadDonHang();
});
