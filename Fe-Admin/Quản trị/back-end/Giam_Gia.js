app.controller('GiamGiaController', function($scope, $http) {
    $scope.listGiamGia = [];
    $scope.filteredGiamGia = [];
    $scope.currentPageGiamGia = 1;
    $scope.pageSizeGiamGia = 10;

    // Khi người dùng chọn file ảnh
    $scope.fileChanged = function(input) {
        const file = input.files[0];
        if (file) {
            // Đảm bảo chỉ xử lý các file ảnh
            if (file.type.indexOf('image') === 0) {
                $scope.giamGia.hinhAnhFile = file;
                $scope.$apply(); // Cập nhật view
            } else {
                alert('Vui lòng chọn file ảnh');
            }
        }
    };

    // Hàm thêm giảm giá
    $scope.AddGiamGia = function() {
        const formData = new FormData();
        formData.append('TyLeGiam', $scope.giamGia.TyLeGiam);
        formData.append('NoiDung', $scope.giamGia.noiDung);
        formData.append('NgayBatDau', $scope.giamGia.ngayBatDau);
        formData.append('NgayKetThuc', $scope.giamGia.ngayKetThuc);
        formData.append('TrangThaiGiamGia', $scope.giamGia.trangThai);
        
        if ($scope.giamGia.hinhAnhFile) {
            formData.append('HinhAnh', $scope.giamGia.hinhAnhFile);
        }

        // Gửi yêu cầu POST để thêm giảm giá mới
        $http.post("http://localhost:5159/api/GiamGiaControllers/Add", formData, {
            headers: { 'Content-Type': undefined }
        }).then(function(response) {
            showToast('success', 'Voucher đã được thêm thành công!');
            $scope.loadGiamGia(); // Tải lại danh sách
            $scope.showFormGG = false; // Đóng form
        }).catch(function(error) {
            showToast('error', 'Đã có lỗi xảy ra!');
            console.error(error);
        });
    };

    // Hàm sửa giảm giá
    $scope.UpdateGiamGia = function() {
        const formData = new FormData();
        formData.append('IDGiamGia', $scope.giamGia.IDGiamGia);
        formData.append('TyLeGiam', $scope.giamGia.TyLeGiam);
        formData.append('NoiDung', $scope.giamGia.noiDung);
        formData.append('NgayBatDau', $scope.giamGia.ngayBatDau);
        formData.append('NgayKetThuc', $scope.giamGia.ngayKetThuc);
        formData.append('TrangThaiGiamGia', $scope.giamGia.trangThai);

        if ($scope.giamGia.hinhAnhFile) {
            formData.append('HinhAnh', $scope.giamGia.hinhAnhFile);
        }

        // Gửi yêu cầu PUT để cập nhật giảm giá
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

    // Cập nhật danh sách giảm giá
    $scope.loadGiamGia = function() {
        $http({
            method: 'GET',
            url: "http://localhost:5159/api/GiamGiaControllers/Get-All",
        }).then(function(response) {
            $scope.listGiamGia = response.data;
            console.log("Giam Gia data loaded:", response.data);
        }).catch(function(error) {
            console.error("Error loading Giam Gia:", error);
        });
    };

    $scope.loadGiamGia();
});
