app.controller('GiamGiaController', function($scope, $http) {
    $scope.listGiamGia = [];
    $scope.showFormGG = false;
    $scope.giamGia = {};
    $scope.currentPageGiamGia = 1; // Trang hiện tại
    $scope.pageSizeGiamGia = 10; 
    $scope.filteredGiamGia = []; 

    const showToast = (type, message) => {
        const toastDetails = {
            success: { icon: "fa-check-circle", message },
            error: { icon: "fa-times-circle", message },
            info: { icon: "fa-info-circle", message },
        };
        const { icon, message: msg } = toastDetails[type];
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="column">
                <i class="fa ${icon}"></i>
                <span>${msg}</span>
            </div>
            <i class="bi bi-x-circle" onclick="this.parentElement.remove()"></i>`;
        document.body.appendChild(toast);
    };

    // Khi người dùng chọn file ảnh
    $scope.fileChanged = function(input) {
        const file = input.files[0];
        if (file) {
            if (file.type.indexOf('image') === 0) {
                $scope.giamGia.hinhAnhFile = file;
                $scope.$apply(); // Cập nhật view
            } else {
                alert('Vui lòng chọn file ảnh hợp lệ');
            }
        }
    };

    // Chọn giảm giá
    $scope.selectGiamGia = function(item) {
        localStorage.setItem("selectGiamGia", item.idGiamGia);
        $scope.giamGia = angular.copy(item);
        $scope.showFormGG = true;
    };

    // Tải danh sách giảm giá
    $scope.loadGiamGia = function() {
        $http({
            method: 'GET',
            url: "http://localhost:5159/api/GiamGiaControllers/Get-All",
        }).then(function(response) {
            $scope.listGiamGia = response.data;
            $scope.updatePage(); // Cập nhật dữ liệu phân trang
        }).catch(function(error) {
            console.error("Lỗi khi tải danh sách giảm giá:", error);
        });
    };

    // Hàm xử lý phân trang
    $scope.updatePage = function() {
        const start = ($scope.currentPageGiamGia - 1) * $scope.pageSizeGiamGia;
        const end = start + $scope.pageSizeGiamGia;
        $scope.filteredGiamGia = $scope.listGiamGia.slice(start, end);
    };

    // Chuyển trang
    $scope.changePageGiamGia = function(page) {
        if (page >= 1 && page <= Math.ceil($scope.listGiamGia.length / $scope.pageSizeGiamGia)) {
            $scope.currentPageGiamGia = page;
            $scope.updatePage();
        }
    };

    // Cập nhật số lượng kết quả trên mỗi trang
    $scope.updatePageSizeGiamGia = function() {
        $scope.currentPageGiamGia = 1; // Reset về trang đầu khi thay đổi số lượng
        $scope.updatePage();
    };

    // Hàm sửa giảm giá
    $scope.UpdateGiamGia = function() {
        const formData = new FormData();
        formData.append('IDGiamGia', $scope.giamGia.idGiamGia);
        formData.append('TyLeGiam', $scope.giamGia.tyLeGiam);
        formData.append('NoiDung', $scope.giamGia.noiDung);
        formData.append('NgayBatDau', $scope.giamGia.ngayBatDau);
        formData.append('NgayKetThuc', $scope.giamGia.ngayKetThuc);
        formData.append('TrangThaiGiamGia', $scope.giamGia.trangThai);

        if ($scope.giamGia.hinhAnhFile) {
            formData.append('HinhAnh', $scope.giamGia.hinhAnhFile);
        }

        $http.put("http://localhost:5159/api/GiamGiaControllers/Update", formData, {
            headers: { 'Content-Type': undefined }
        }).then(function(response) {
            showToast('success', 'Voucher đã được cập nhật thành công!');
            $scope.loadGiamGia(); // Tải lại danh sách
            $scope.showFormGG = false; // Đóng form
        }).catch(function(error) {
            showToast('error', 'Đã có lỗi xảy ra!');
            console.error(error);
        });
    };

    // Khởi tạo và tải danh sách giảm giá
    $scope.loadGiamGia();
});
