app.controller('KhoController', function ($scope, $http) {
    $scope.listKho = [];
    $scope.listMatHang = [];
    $scope.filteredKho = [];
    $scope.searchKho = '';
    $scope.newKho = {};
    $scope.showFormKho = false;

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
    $scope.addKho = function (newKho) {
        $http.post("http://localhost:5159/api/KhoControllers/Create", newKho)
            .then(function () {
                alert("Thêm mới thành công!");
                $scope.loadKho();
                $scope.newKho = {};
                $scope.showFormKho = false;
            })
            .catch(function (error) {
                console.error("Error adding Kho:", error);
            });
    };

    // Khởi chạy dữ liệu
    $scope.loadKho();
    $scope.loadMatHang();
});
