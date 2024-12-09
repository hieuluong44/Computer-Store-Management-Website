app.controller('HoaDonNhapController', function ($scope, $http) {
    $scope.listHoaDonNhap = [];
    $scope.showFormHDN = false;
    $scope.filteredHoaDonNhap = [];
    $scope.currentPageHoaDonNhap = 1;
    $scope.pageSizeHoaDonNhap = 10;

    // Hàm tạo thông báo
    function showToast(type, message) {
        const toastDetails = {
            success: { icon: "fa-check-circle", message: message },
            error: { icon: "fa-times-circle", message: message },
            info: { icon: "fa-info-circle", message: message },
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

    // Load dữ liệu Hóa Đơn Nhập
    $scope.loadHoaDonNhap = function () {
        $http({
            method: 'GET',
            url: "http://localhost:5159/api/DonNhapControllers/Get-All",
        }).then(function (response) {
            $scope.listHoaDonNhap = response.data;
            $scope.filteredHoaDonNhap = $scope.listHoaDonNhap;
            console.log("Hóa đơn nhập data loaded:", $scope.listHoaDonNhap);  // Kiểm tra lại biến $scope.listHoaDonNhap
            $scope.totalPagesDonNhap = Math.ceil($scope.listHoaDonNhap.length / $scope.pageSizeDonNhap); // Tổng số trang
        }).catch(function (error) {
            console.error("Error loading Hóa đơn nhập:", error);
        });
    };
    

    // Hàm tìm kiếm chung (ID Hóa Đơn Nhập, Nhà cung cấp, Trạng thái)
    $scope.updateFilteredHoaDonNhap = function () {
        const keyword = $scope.searchHoaDonNhap ? $scope.searchHoaDonNhap.toLowerCase() : '';
        $scope.filteredHoaDonNhap = $scope.listHoaDonNhap.filter(item =>
            (!keyword) ||
            (item.idHoaDonNhap && item.idHoaDonNhap.toLowerCase().includes(keyword)) ||
            (item.tenNhaCungCap && item.tenNhaCungCap.toLowerCase().includes(keyword)) ||
            (item.trangThai && item.trangThai.toLowerCase().includes(keyword))
        );
        $scope.currentPageHoaDonNhap = 1;  // Reset trang khi tìm kiếm lại
    };

    // Hàm tìm kiếm theo Ngày nhập
    $scope.updateFilteredHoaDonNhapByDate = function () {
        const dateSearch = $scope.searchNgayNhap ? new Date($scope.searchNgayNhap) : null;
        if (dateSearch) {
            $scope.filteredHoaDonNhap = $scope.listHoaDonNhap.filter(item => {
                const ngayNhap = new Date(item.ngayNhap);
                return ngayNhap.toDateString() === dateSearch.toDateString();  // So sánh ngày nhập
            });
        } else {
            $scope.filteredHoaDonNhap = $scope.listHoaDonNhap;
        }
        $scope.currentPageHoaDonNhap = 1;  // Reset trang khi tìm kiếm lại theo ngày
    };

    

    // Phân trang
    $scope.getPaginatedHoaDonNhap = function () {
        const start = ($scope.currentPageHoaDonNhap - 1) * $scope.pageSizeHoaDonNhap;
        return $scope.filteredHoaDonNhap.slice(start, start + $scope.pageSizeHoaDonNhap);
    };
    

    // Chuyển đổi trang
    $scope.changePageHoaDonNhap = function (page) {
        if (page >= 1 && page <= Math.ceil($scope.filteredHoaDonNhap.length / $scope.pageSizeHoaDonNhap)) {
            $scope.currentPageHoaDonNhap = page;
        }
    };

    // Thêm mới Hóa đơn nhập
    $scope.addHoaDonNhap = function () {
        const newHoaDonNhap = {
            idHoaDonNhap: IDAuto.generateID('HDN'),  // Tạo ID tự động
            idNhaCungCap: $scope.hoaDonNhap.idNhaCungCap,
            ngayNhap: $scope.hoaDonNhap.ngayNhap,
            ghiChu: $scope.hoaDonNhap.ghiChu,
            tongTien: $scope.hoaDonNhap.tongTien,
            trangThai: "Chưa duyệt",  // Trạng thái mặc định
        };

        $http.post("http://localhost:5159/api/HoaDonNhapControllers/Add", newHoaDonNhap)
            .then(function (response) {
                showToast("success", "Thêm hóa đơn nhập thành công");
                $scope.loadHoaDonNhap();  // Load lại dữ liệu
                $scope.showFormHDN = false;  // Ẩn form
            }).catch(function (error) {
                showToast("error", "Thêm hóa đơn nhập thất bại");
                console.error("Error adding HoaDonNhap:", error);
            });
    };

    // Sửa Hóa đơn nhập
    $scope.updateHoaDonNhap = function () {
        const updatedHoaDonNhap = angular.copy($scope.hoaDonNhap);
        $http.put(`http://localhost:5159/api/HoaDonNhapControllers/Update/${updatedHoaDonNhap.idHoaDonNhap}`, updatedHoaDonNhap)
            .then(function (response) {
                showToast("success", "Cập nhật hóa đơn nhập thành công");
                $scope.loadHoaDonNhap();  // Load lại dữ liệu
                $scope.showFormHDN = false;  // Ẩn form
            }).catch(function (error) {
                showToast("error", "Cập nhật hóa đơn nhập thất bại");
                console.error("Error updating HoaDonNhap:", error);
            });
    };

    // Xóa Hóa đơn nhập
    $scope.deleteHoaDonNhap = function () {
        const selectedHoaDon = $scope.listHoaDonNhap.find(item => item.selected);
        if (selectedHoaDon) {
            const confirmDelete = confirm("Bạn có chắc chắn muốn xóa hóa đơn này?");
            if (confirmDelete) {
                $http({
                    method: 'DELETE',
                    url: `http://localhost:5159/api/HoaDonNhapControllers/Delete/${selectedHoaDon.idHoaDonNhap}`,
                }).then(function (response) {
                    showToast("success", "Xóa hóa đơn nhập thành công");
                    $scope.loadHoaDonNhap();  // Load lại dữ liệu
                }).catch(function (error) {
                    showToast("error", "Xóa hóa đơn nhập thất bại");
                    console.error("Error deleting HoaDonNhap:", error);
                });
            }
        } else {
            showToast("info", "Vui lòng chọn hóa đơn nhập để xóa");
        }
    };

    // Load dữ liệu khi khởi tạo controller
    $scope.loadHoaDonNhap();
});
