app.controller('KhoController', function ($scope, $http) {
    $scope.listKho = [];
    $scope.listMatHang = [];
    $scope.filteredKho = [];
    $scope.searchKho = '';
    $scope.newKho = {};

    
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

    // Load dữ liệu kho
    $scope.loadKho = function () {
        $http.get("http://localhost:5159/api/KhoControllers/Get-All")
            .then(function (response) {
                $scope.listKho = response.data;
                $scope.filteredKho = angular.copy($scope.listKho);
            })
            .catch(function (error) {
                console.error("Error loading Kho:", error);
            });
    };

    // Load danh sách mặt hàng
    $scope.loadMatHang = function () {
        $http.get("http://localhost:5159/api/MatHangControllers/Get-All")
            .then(function (response) {
                $scope.listMatHang = response.data;
            })
            .catch(function (error) {
                console.error("Error loading Mat Hang:", error);
            });
    };

    // Lọc danh sách kho
    $scope.filterKho = function () {
        const keyword = $scope.searchKho.toLowerCase();
        $scope.filteredKho = $scope.listKho.filter(item =>
            item.tenMatHang.toLowerCase().includes(keyword) ||
            item.idKho.toLowerCase().includes(keyword)
        );
    };

    // Cập nhật ID mặt hàng khi chọn tên mặt hàng
    $scope.updateSelectedMatHang = function () {
        const selectedMatHang = $scope.listMatHang.find(mh => mh.idMatHang === $scope.newKho.idMatHang);
        if (selectedMatHang) {
            $scope.newKho.idMatHang = selectedMatHang.idMatHang;
        }
    };

    // Thêm mới kho
    $scope.addKho = function () {
        const kho = { 
            idKho: IDAuto.generateID("KH"),
            idMatHang: $scope.kho.idMatHang, 
            soLuong: $scope.kho.soLuong, 
            ngayCapNhat: $scope.kho.ngayCapNhat, 
        }; 
            l$http({
                method: 'POST',
                url: 'http://localhost:5159/api/KhoControllers/Create',
                headers: { 'Content-Type': 'application/json' },
                data: kho
            }).then(function (response) {
                showToast("success", "Mặt hàng đã được thêm vào Kho thành công!"); // Gọi hàm hiển thị thông báo
                $scope.loadKho(); 
                $scope.kho = {}; 
                $scope.showFormKho = false;
            }).catch(function (error) {
                showToast("error", "Không thể thêm thông tin mặt hàng vào kho. Vui lòng thử lại!");
            });
    };

    // Khởi chạy dữ liệu
    $scope.loadKho();
    $scope.loadMatHang();
    $scope.kho = {}; // Đối tượng lưu thông tin form

    $scope.refreshKho = function() {
        $scope.kho = {};
    };

    $scope.AddKho = function() {
        // Thêm logic thêm mới
        console.log("Thêm Kho:", $scope.kho);
        $scope.showFormKho = false;
    };

    $scope.UpdateKho = function() {
        // Logic cập nhật
        console.log("Cập nhật Kho:", $scope.kho);
        $scope.showFormKho = false;
    };

    $scope.resetKho = function() {
        $scope.showFormKho = false;
        $scope.kho = {};
    };

    $scope.editSelectedKho = function() {
        // Lấy dữ liệu dòng được chọn
        var selected = $scope.filteredKho.find(item => item.selected);
        if (selected) {
            $scope.kho = angular.copy(selected);
            $scope.showFormKho = true;
        }
    };

});
