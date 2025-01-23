app.controller('KhoController', function ($scope, $http) {
    $scope.listKho = [];
    $scope.currentPage = 1;
    $scope.pageSize = 10; // Số lượng sản phẩm mỗi trang

    // Hàm tải danh sách Kho hàng
    $scope.loadKho = function () {
        $http.get("http://localhost:5159/api/KhoControllers/Get-All")
            .then((response) => {
                $scope.listKho = response.data || [];
                $scope.totalPages = Math.ceil($scope.listKho.length / $scope.pageSize);
            })
            .catch((error) => console.error("Lỗi:", error));
    };

    // Hàm phân trang
    $scope.paginatedKho = function () {
        const start = ($scope.currentPage - 1) * $scope.pageSize;
        return $scope.listKho.slice(start, start + $scope.pageSize);
    };

    // Hàm thay đổi trang
    $scope.changePage = function (page) {
        if (page >= 1 && page <= $scope.totalPages) {
            $scope.currentPage = page;
        }
    };

    // Hàm thêm Kho hàng
    $scope.AddKhoHang = function () {
        const kho = {
            idMatHang: `MH${Math.random().toString(36).substring(7)}`,
            tenMatHang: $scope.kho.tenMatHang,
            soLuong: $scope.kho.soLuong,
            trangThai: $scope.kho.trangThai,
        };

        $http.post("http://localhost:5159/api/KhoControllers/Create", kho)
            .then(() => {
                showToast("success", "Thêm kho hàng thành công!");
                $scope.loadKho();  // Tải lại dữ liệu sau khi thêm mới
                $scope.reset();
            })
            .catch(() => showToast("error", "Thêm kho hàng thất bại!"));
    };

    // Hàm sửa Kho hàng
    $scope.UpdateKhoHang = function () {
        const kho = $scope.kho;
        $http.put(`http://localhost:5159/api/KhoControllers/Update/${kho.idMatHang}`, kho)
            .then(() => {
                showToast("success", "Cập nhật kho hàng thành công!");
                $scope.loadKho();
                $scope.reset();
            })
            .catch(() => showToast("error", "Cập nhật kho hàng thất bại!"));
    };

    // Hàm reset form
    $scope.reset = function () {
        $scope.kho = {};
        $scope.showFormKho = false;
    };

    // Khởi động dữ liệu
    $scope.loadKho();
});
