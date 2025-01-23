app.controller('HoaDonNhapController', function ($scope, $http) {
    $scope.listHoaDonNhap = []; // Dữ liệu gốc
    $scope.filteredHoaDonNhap = []; // Dữ liệu đã lọc
    $scope.currentPageHoaDonNhap = 1; // Trang hiện tại
    $scope.pageSizeHoaDonNhap = 10; // Số mục trên mỗi trang

    // Load dữ liệu từ API
    $scope.loadHoaDonNhap = function () {
        $http.get("http://localhost:5159/api/DonNhapControllers/Get-All")
            .then(function (response) {
                $scope.listHoaDonNhap = response.data || []; // Đảm bảo danh sách không null
                $scope.filteredHoaDonNhap = [...$scope.listHoaDonNhap];
            })
            .catch(function (error) {
                console.error("Lỗi khi tải hóa đơn nhập:", error);
            });
    };

    // Phân trang dữ liệu
    $scope.getPaginatedHoaDonNhap = function () {
        const start = ($scope.currentPageHoaDonNhap - 1) * $scope.pageSizeHoaDonNhap;
        const end = start + $scope.pageSizeHoaDonNhap;
        return $scope.filteredHoaDonNhap.slice(start, end);
    };

    // Chuyển trang
    $scope.changePageHoaDonNhap = function (page) {
        const totalPages = Math.ceil($scope.filteredHoaDonNhap.length / $scope.pageSizeHoaDonNhap);
        if (page > 0 && page <= totalPages) {
            $scope.currentPageHoaDonNhap = page;
        }
    };

    // Tìm kiếm dữ liệu
    $scope.updateFilteredHoaDonNhap = function () {
        const keyword = ($scope.searchHoaDonNhap || "").toLowerCase();
        $scope.filteredHoaDonNhap = $scope.listHoaDonNhap.filter(item =>
            (!keyword) ||
            (item.idHoaDonNhap && item.idHoaDonNhap.toLowerCase().includes(keyword)) ||
            (item.tenNhaCungCap && item.tenNhaCungCap.toLowerCase().includes(keyword))
        );
        $scope.currentPageHoaDonNhap = 1;
    };

    // Khởi tạo
    $scope.loadHoaDonNhap();
});
