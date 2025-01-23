app.controller('trang_canhan', function($http, $scope) {
    var isLoggedIn = localStorage.getItem('userID');
    $scope.HoSo = {};
    $scope.loadTrangcanhan = function() {
        if (isLoggedIn) {
            console.log(isLoggedIn);
            $http.get(`http://localhost:5156/api/TaiKhoanControllers/Get_TaiKhoan/${isLoggedIn}`)
                .then(function(response) {
                    $scope.HoSo = response.data; 
                    console.log(response.data);
                    console.log("Thông tin người dùng:", $scope.HoSo);
                }, function(error) {
                    console.error("Lỗi tải thông tin cá nhân:", error);
                    alert("Không thể tải thông tin cá nhân. Vui lòng thử lại.");
                }).finally(function() {
                    $scope.isLoading = false;
                });
        } else {
            alert("UserID không hợp lệ. Vui lòng đăng nhập lại.");
            $window.location.href = "Dang_Nhap.html"; 
        }
    };

    $scope.showAddAddressForm = false; // Biến kiểm tra trạng thái của form
    $scope.newAddress = {}; // Biến lưu thông tin địa chỉ mới
    $scope.addresses = []; // Danh sách địa chỉ

    $scope.loadAddresses = function() {
        const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
        $scope.addresses = addresses;  // Cập nhật lại mảng địa chỉ từ localStorage
    };
    
    

    // Hiển thị form thêm địa chỉ
    $scope.toggleAddAddressForm = function() {
        $scope.showAddAddressForm = !$scope.showAddAddressForm;
    };

    // Ẩn form thêm địa chỉ
    $scope.hideAddAddressForm = function() {
        $scope.showAddAddressForm = false;
    };

    // Lưu địa chỉ vào localStorage
    $scope.saveAddress = function() {
        if ($scope.newAddress.name && $scope.newAddress.address && $scope.newAddress.country) {
            // Tạo một địa chỉ mới với id duy nhất
            const newAddress = angular.copy($scope.newAddress);
            newAddress.id = Date.now();  // Tạo id duy nhất bằng timestamp
    
            // Loại bỏ $$hashKey để tránh trùng lặp do AngularJS tạo ra
            delete newAddress.$$hashKey;
    
            // Kiểm tra nếu địa chỉ đã tồn tại trong danh sách địa chỉ
            const isAddressExist = $scope.addresses.some(address => 
                address.name === newAddress.name &&
                address.address === newAddress.address &&
                address.phone === newAddress.phone
            );
    
            if (!isAddressExist) {
                // Thêm địa chỉ vào mảng và lưu vào localStorage
                $scope.addresses.push(newAddress);
                localStorage.setItem('addresses', JSON.stringify($scope.addresses));
    
                // Cập nhật lại danh sách địa chỉ từ localStorage
                $scope.loadAddresses();
            }
    
            // Reset form
            $scope.newAddress = {};
            $scope.showAddAddressForm = false;
        }
    };
    
    
    // Xóa địa chỉ khỏi danh sách và localStorage
    $scope.deleteAddress = function(address) {
        // Tìm chỉ số của địa chỉ trong mảng
        const index = $scope.addresses.indexOf(address);
        if (index !== -1) {
            // Xóa địa chỉ khỏi mảng
            $scope.addresses.splice(index, 1);
    
            // Cập nhật lại vào localStorage
            localStorage.setItem('addresses', JSON.stringify($scope.addresses));
        }
    };
    
    

    // Load danh sách địa chỉ khi trang được tải
    $scope.loadAddresses();

    $scope.loadTrangcanhan();
});

// app.controller('Don_Hang', function($scope, $http) {
//     $scope.currentStatus = 'Chờ xác nhận';
//     $scope.orderCounts = {
//         'Chờ xác nhận': 0,
//         'Chờ lấy hàng': 0,
//         'Đang vận chuyển': 0,
//         'Trả hàng': 0,
//         'Đã giao': 0,
//         'Yêu cầu huỷ hàng' : 0,
//         'Đã huỷ': 0
//     };

//     $scope.switchStatus = function (status) {
//         $scope.currentStatus = status;
//         $scope.loadDonHang();
//     };

//     $scope.showFormChiTietDonDat = false;

//     $scope.loadDonHang = function () {
//         $http.get(`http://localhost:5159/api/DonBanControllers/DonBan_TrangThai/${$scope.currentStatus}`)
//             .then(function (response) {
//                 $scope.listDonHang = response.data;
//                 $scope.orderCounts[$scope.currentStatus] = response.data.length;
//             }).catch(function (error) {
//                 console.error('Lỗi khi tải đơn hàng:', error);
//             });
//     };

//     // Chỉ cho phép chọn một hóa đơn
//     $scope.selectOnlyOne = function (index) {
//         $scope.listDonHang.forEach((item, i) => {
//             if (i !== index) {
//                 item.selected = false; 
//             }
//         });
//     };

//     // Hiển thị chi tiết đơn đặt hàng
//     $scope.editSelectedDonDatHang = function () {
//         const selectedDonDatHang = $scope.listDonHang.find(item => item.selected);

//         if (!selectedDonDatHang) {
//             alert("Vui lòng chọn một hóa đơn để xem chi tiết!");
//             return;
//         }

//         const datHang = selectedDonDatHang.idDonBan;
//         $http.get(`http://localhost:5159/api/ChiTietDonBanControllers/Get-All/${datHang}`)
//         .then(response => {
//             if (response.data && response.data.length > 0) {
//                 $scope.listChiTietDonHang = response.data;
//                 $scope.showFormChiTietDonDat = true;
    
//                 // Duyệt qua từng phần tử và định dạng giá bán
//                 $scope.listChiTietDonHang.forEach(item => {
//                     if (item.giaBan) {
//                         item.giaBanFormatted = parseFloat(item.giaBan).toLocaleString("vi-VN");
//                     }
//                 });
//             } else {
//                 alert("Không có mặt hàng nào trong đơn hàng này!");
//             }
//         }).catch(error => {
//             console.error("Lỗi khi tải chi tiết đơn hàng:", error);
//         });
    
//     };
    
//     $scope.updateStatus = function (item) {
//         const data = {
//             IdDonBan: item.idDonBan,
//             TrangThai: item.trangThai
//         };
    
//         $http.put('http://localhost:5159/api/DonBanControllers/Update_TrangThai', data)
//             .then(function (response) {
//                 alert(response.data.message); 
//                 item.trangThai = response.data.newTrangThai || item.trangThai; 
//                 $scope.loadDonHang(); 
//             })
//             .catch(function (error) {
//                 console.error('Cập nhật trạng thái thất bại:', error);
//                 alert('Cập nhật trạng thái thất bại: ' + (error.data?.message || 'Lỗi không xác định'));
//             });
//     };
    
    
//     $scope.loadDonHang();
// });
