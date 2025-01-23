app.controller('DanhGiaController', function($scope, $http) {
    $scope.listDanhGia = [];
    $scope.currentPageDanhGia = 1;
    $scope.pageSizeDanhGia = 10;

    const showToast = (type, message) => {
        const icons = { success: "fa-check-circle", error: "fa-times-circle", info: "fa-info-circle" };
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.innerHTML = `<div class="column"><i class="fa ${icons[type]}"></i><span>${message}</span></div><i class="bi bi-x-circle" onclick="this.parentElement.remove()"></i>`;
        document.body.appendChild(toast);
    };

    // Hàm tải danh sách đánh giá từ API
    $scope.loadDanhGia = function() {
        $http.get("http://localhost:5159/api/DanhGiaControllers/Get-All").then(response => {
            $scope.listDanhGia = response.data || [];
            $scope.totalPagesDanhGia = Math.ceil($scope.listDanhGia.length / $scope.pageSizeDanhGia);  // Cập nhật tổng số trang
        }).catch(error => console.error("Lỗi:", error));
    };

    // Hàm lọc danh giá theo từ khóa tìm kiếm
    $scope.filterDanhGia = function(item) {
        if (!$scope.searchDanhGia) return true;
        const keyword = $scope.searchDanhGia.toLowerCase();
        return [item.tenDanhGia, item.tenNguoiDung, item.noiDung, item.soSao].some(val => val && val.toString().toLowerCase().includes(keyword));
    };

    // Hàm phân trang
    $scope.getPaginatedDanhGia = function () {
        const start = ($scope.currentPageDanhGia - 1) * $scope.pageSizeDanhGia;
        return $scope.listDanhGia.slice(start, start + $scope.pageSizeDanhGia).filter($scope.filterDanhGia);
    };

    // Hàm thay đổi trang
    $scope.changePageDanhGia = function (page) {
        if (page >= 1 && page <= $scope.totalPagesDanhGia) $scope.currentPageDanhGia = page;
    };

    // Hàm xóa đánh giá đã chọn
    $scope.deleteSelectedDanhGia = function () {
        const selected = $scope.listDanhGia.find(item => item.selected);
        if (selected && confirm("Bạn có chắc chắn muốn xóa đánh giá này?")) {
            $http.delete(`http://localhost:5159/api/DanhGiaControllers/Delete/${selected.idDanhGia}`).then(() => {
                showToast("success", "Đánh giá đã được xóa thành công!");
                $scope.loadDanhGia();  // Tải lại dữ liệu sau khi xóa
            }).catch(() => showToast("error", "Xoá không thành công!"));
        } else {
            showToast("info", "Vui lòng chọn một đánh giá để xóa!");
        }
    };

    // Khởi tạo tải dữ liệu ban đầu
    $scope.loadDanhGia();
});
