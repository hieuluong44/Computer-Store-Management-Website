app.controller('HoaDonBanController', function ($scope, $http) {
    $scope.listHoaDonBan = [];
    $scope.showFormHDB = false;

    $scope.filteredHoaDonBan = [];
    $scope.currentPageHoaDonBan = 1;
    $scope.pageSizeHoaDonBan = 10;

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

    $scope.loadHoaDonBan = function () {
        $http({
            method: 'GET',
            url: "http://localhost:5159/api/DonBanControllers/Get-All",
        }).then(function (response) {
            $scope.listHoaDonBan = response.data; // Lưu dữ liệu hóa đơn bán
            $scope.filteredHoaDonBan = $scope.listHoaDonBan; // Dữ liệu chưa lọc
            console.log("Hóa đơn bán data loaded:", $scope.listHoaDonBan);
            $scope.totalPagesHoaDonBan = Math.ceil($scope.listHoaDonBan.length / $scope.pageSizeHoaDonBan); // Tổng số trang
        }).catch(function (error) {
            console.error("Error loading Hóa đơn bán:", error);
        });
    };

        // Hàm phân trang, trả về các hóa đơn bán cho trang hiện tại
    $scope.getPaginatedHoaDonBan = function () {
        const start = ($scope.currentPageHoaDonBan - 1) * $scope.pageSizeHoaDonBan;
        const end = start + $scope.pageSizeHoaDonBan;
        return $scope.filteredHoaDonBan.slice(start, end);
    };

    // Cập nhật số lượng bản ghi trên mỗi trang
    $scope.updatePageSizeHoaDonBan = function () {
        $scope.currentPageHoaDonBan = 1; // Reset về trang 1 khi thay đổi số lượng bản ghi trên trang
        $scope.loadHoaDonBan(); // Tải lại dữ liệu
    };

    // Chuyển trang
    $scope.changePageHoaDonBan = function (pageNumber) {
        if (pageNumber >= 1 && pageNumber <= $scope.totalPagesHoaDonBan) {
            $scope.currentPageHoaDonBan = pageNumber;
        }
    };

    $scope.updateFilteredHoaDonBan = function () {
        $scope.filteredHoaDonBan = $scope.listHoaDonBan.filter(function(item) {
            let matches = true;
    
            // Tìm kiếm chung (ID Đơn Bán, Người Dùng, Mặt Hàng)
            if ($scope.search.general) {
                const searchTerm = $scope.search.general.toLowerCase();
                if (item.idDonBan.toLowerCase().indexOf(searchTerm) === -1 &&
                    item.tenNguoiDung.toLowerCase().indexOf(searchTerm) === -1 &&
                    !item.chiTietDonBan.some(chiTiet => chiTiet.tenMatHang.toLowerCase().includes(searchTerm))) {
                    matches = false;
                }
            }
    
            // Tìm kiếm theo khoảng ngày bán
            if ($scope.search.ngayBanStart && new Date(item.ngayBan) < new Date($scope.search.ngayBanStart)) {
                matches = false;
            }
            if ($scope.search.ngayBanEnd && new Date(item.ngayBan) > new Date($scope.search.ngayBanEnd)) {
                matches = false;
            }
    
            return matches;
        });
    
        // Cập nhật tổng số trang sau khi lọc
        $scope.totalPagesHoaDonBan = Math.ceil($scope.filteredHoaDonBan.length / $scope.pageSizeHoaDonBan); 
        $scope.currentPageHoaDonBan = 1; // Reset về trang đầu tiên sau khi lọc
    };
    
    

    // Chọn hóa đơn bán để chỉnh sửa
    $scope.editSelectedHoaDonBan = function () {
        const selectedHoaDon = $scope.listHoaDonBan.find(item => item.selected);
        if (selectedHoaDon) {
            $scope.hoaDonBan = angular.copy(selectedHoaDon);
            $scope.showFormHDB = true;
        } else {
            alert("Vui lòng chọn hóa đơn bán để sửa!");
        }
    };

    // Xóa hóa đơn
    $scope.deleteHoaDonBan = function () {
        const selectedIDs = $scope.listHoaDonBan.filter(item => item.selected).map(item => item.idDonBan);
        if (selectedIDs.length > 0) {
            if (confirm("Bạn có chắc chắn muốn xóa các hóa đơn này không?")) {
                $http.post("http://localhost:5159/api/HoaDonBanControllers/Delete", selectedIDs).then(function () {
                    alert("Xóa thành công!");
                    $scope.loadHoaDonBan();
                }).catch(function (error) {
                    console.error("Error deleting hóa đơn bán:", error);
                });
            }
        } else {
            alert("Vui lòng chọn ít nhất một hóa đơn để xóa!");
        }
    };

    // Tải dữ liệu ban đầu
    $scope.loadHoaDonBan();
});
