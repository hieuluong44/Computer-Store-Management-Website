app.controller('MatHangController', function ($scope, $http) {
    $scope.listMatHang = [];
    $scope.listDanhMuc = [];
    $scope.listThongSo = [];
    $scope.showFormMH = false;

    $scope.filteredMatHang = []; 
    $scope.currentPageMatHang = 1; 
    $scope.pageSizeMatHang = 10; 

    const IDAuto = { chars1: ['!', '@', '#', '$'], chars2: ['%', '&', '*'], generateID: function (prefix) { 
        const randomNumber = Math.floor(Math.random() * (999 - 100 + 1)) + 100; 
        const randomChar1 = this.chars1[Math.floor(Math.random() * this.chars1.length)]; 
        const randomChar2 = this.chars2[Math.floor(Math.random() * this.chars2.length)]; 
        return `${prefix}${randomChar1}${randomChar1}${randomNumber}${randomChar2}${randomNumber}`; 
    }}; 

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


    $scope.loadMatHang = function () {
        $http({
            method: 'GET',
            url: "http://localhost:5159/api/MatHangControllers/Get-All",
        }).then(function (response) {
            $scope.listMatHang = response.data; // Lưu dữ liệu sản phẩm
            $scope.totalPagesMatHang = Math.ceil($scope.listMatHang.length / $scope.pageSizeMatHang); // Tổng số trang
            console.log("Dữ liệu mặt hàng:", response.data);
        }).catch(function (error) {
            console.error("Error loading Mặt hàng:", error);
        });
    };

       // Phân trang mặt hàng
       $scope.getPaginatedMatHang = function () {
        const startIndex = ($scope.currentPageMatHang - 1) * $scope.pageSizeMatHang;
        return $scope.listMatHang.slice(startIndex, startIndex + $scope.pageSizeMatHang);
    };

    // Chuyển đổi trang
    $scope.changePageMatHang = function (page) {
        if (page >= 1 && page <= Math.ceil($scope.listMatHang.length / $scope.pageSizeMatHang)) {
            $scope.currentPageMatHang = page;
        }
    };

    $scope.loadMatHang(); 


    
    $scope.refresh = function () {
        $scope.listMatHang.forEach(function(user){ 
                user.selected = false; 
            }); 
        $scope.matHang = {};
        $scope.listThongSo = {};
    };
    

    $scope.reset = function() { 
        $scope.listMatHang.forEach(function(user){ 
            user.selected = false; 
        }); 
            $scope.matHang = {}; 
            $scope.showFormMH = false;       
    };

    $scope.updateFilteredMatHang = function (item) {
        if (!$scope.searchNhaCungCap) {
            return true; 
        }
        const keyword = $scope.searchMatHang ? $scope.searchMatHang.toLowerCase() : "";
        $scope.filteredMatHang = $scope.listMatHang.filter(item =>
            (!keyword) ||
            (item.idMatHang && item.idMatHang.toLowerCase().includes(keyword)) ||
            (item.tenDanhMuc && item.tenDanhMuc.toLowerCase().includes(keyword)) ||
            (item.tenMatHang && item.tenMatHang.toLowerCase().includes(keyword)) ||
            (item.trangThai && item.trangThai.toString().includes(keyword))
        );
        $scope.currentPageMatHang = 1; 
    };

    $scope.editSelectedmatHang = function () {
        // Tìm mặt hàng được chọn
        const selectedmatHang = $scope.listMatHang.find(item => item.selected);
        if (selectedmatHang) {
            // Gán thông tin của mặt hàng vào $scope.matHang để hiển thị trên form
            $scope.matHang = {
                idMatHang: selectedmatHang.idMatHang,
                hinhAnh1: `Item/${selectedmatHang.idMatHang}/Anh1.jpg`, // Đường dẫn ảnh
                donGia: selectedmatHang.donGia,
                tenDanhMuc: selectedmatHang.tenDanhMuc,
                tenMatHang: selectedmatHang.tenMatHang,
                baoHanh: selectedmatHang.baoHanh,
                trangThai: selectedmatHang.trangThai,
            };
    
            // Hiển thị form chỉnh sửa
            $scope.showFormMH = true;
    
            // Cập nhật ảnh hiển thị
            const imgElement = document.getElementById("profile-img");
            if (imgElement) {
                imgElement.src = $scope.matHang.hinhAnh1;
            }
    
            // Load thông số kỹ thuật nếu cần
            $scope.loadThongSo = function () {
                $http({
                    method: 'GET',
                    url: `http://localhost:5159/api/ThongSoKyThuatControllers/Get-All/${selectedmatHang.idMatHang}`,
                }).then(function (response) {
                    $scope.listThongSo = response.data; // Gán dữ liệu thông số kỹ thuật
                }).catch(function (error) {
                    console.error("Lỗi khi lấy thông số kỹ thuật:", error);
                });
            };
            $scope.loadThongSo();
        } else {
            showToast("info", "Vui lòng chọn một mặt hàng để sửa!!");
        }
    };
});
