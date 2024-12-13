app.controller('MatHangController', function ($scope, $http) {
    $scope.listMatHang = [];
    $scope.currentPageMatHang = 1;
    $scope.pageSizeMatHang = 10;
    $scope.matHang = {};
    $scope.showFormMH = false;
    $scope.imageSrc = "";
    $scope.listThongSo = [];
    $scope.ListAnhMatHang = []; 

    // Load danh sách mặt hàng
    $scope.loadMatHang = function () {
        $http.get("http://localhost:5159/api/MatHangControllers/Get-All")
            .then(response => {
                $scope.listMatHang = response.data;
            })
            .catch(error => console.error("Lỗi khi tải mặt hàng:", error));
    };

    // Phân trang mặt hàng
    $scope.getPaginatedMatHang = function () {
        const startIndex = ($scope.currentPageMatHang - 1) * $scope.pageSizeMatHang;
        return $scope.listMatHang.slice(startIndex, startIndex + $scope.pageSizeMatHang);
    };

    // Thay đổi trang
    $scope.changePageMatHang = function (page) {
        if (page >= 1 && page <= Math.ceil($scope.listMatHang.length / $scope.pageSizeMatHang)) {
            $scope.currentPageMatHang = page;
        }
    };

    $scope.reset = function () {
        $scope.listMatHang.forEach(function(item) { 
            item.selected = false; 
        });
        $scope.showFormMH = false;
        $scope.listThongSo = {};
        $scope.matHang = {};
        $scope.imageSrc = "";
        selectedMatHang = "";
    };

    $scope.triggerFileInput = function(event) {
        // Tìm input file và kích hoạt click
        var inputFile = angular.element(event.target).siblings('input[type="file"]');
        inputFile[0].click();
    };
    
    $scope.handleFileChange = function(event) {
        var file = event.target.files[0];
        if (file) {
            // Giả sử bạn muốn hiển thị ảnh mới được chọn cho item hiện tại
            var reader = new FileReader();
            reader.onload = function(e) {
                // Cập nhật đường dẫn ảnh cho item trong ListAnhMatHang
                $scope.$apply(function() {
                    // Giả sử bạn đã có chỉ mục của item, ví dụ là `itemIndex`
                    var itemIndex = 0; // Cập nhật đúng giá trị của chỉ mục item cần thay đổi
                    $scope.ListAnhMatHang[itemIndex].duongDan = e.target.result; // Đặt đường dẫn ảnh mới
                });
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Khi chọn mặt hàng để chỉnh sửa
    $scope.editSelectedMatHang = function () {
        const selectedMatHang = $scope.listMatHang.find(item => item.selected);
        if (selectedMatHang) {
            // Lấy id mặt hàng đã chọn
            const matHangId = selectedMatHang.idMatHang;

            // Lấy ảnh mặt hàng từ API
            $http.get(`http://localhost:5159/api/AnhMatHangControllers/Get-All/${matHangId}`)
                .then(response => {
                    if (response.data && response.data.length > 0) {
                        $scope.ListAnhMatHang = response.data;
                    }
                })
                .catch(error => console.error("Lỗi khi lấy ảnh mặt hàng:", error));

            // Lấy thông số kỹ thuật từ API
            $http.get(`http://localhost:5159/api/ThongSoKyThuatControllers/Get-All/${matHangId}`)
                .then(response => {
                    if (response.data && response.data.length > 0) {
                        $scope.listThongSo = response.data;  
                    }
                })
                .catch(error => console.error("Lỗi khi lấy thông số kỹ thuật:", error));

            $scope.showFormMH = true;  // Hiển thị form sửa
        } else {
            alert("Vui lòng chọn một mặt hàng để sửa!");
        }
    };

    // Thêm mặt hàng mới
    $scope.addMatHang = function () {
        if (!$scope.matHang.idMatHang) {
            
            
            if (!$scope.matHang.tenMatHang) {
                alert("Vui lòng nhập tên mặt hàng.");
                return;
            }

           
            $scope.matHang.idMatHang = "temp" + new Date().getTime();  
            $scope.listMatHang.push($scope.matHang);  

            
            $scope.listThongSo.forEach(thongSo => {
                thongSo.idThongSo = "temp" + new Date().getTime();  
            });

            
            $scope.matHang = {};
            $scope.listThongSo = [];
            alert("Mặt hàng đã được thêm vào danh sách.");
        } else {
            
            $http.post("http://localhost:5159/api/MatHangControllers/createMatHang_ChiTiet", {
                matHang: $scope.matHang,
                thongSo: $scope.listThongSo
            })
            .then(response => {
                alert("Cập nhật mặt hàng thành công.");
                $scope.loadMatHang();  // Tải lại danh sách mặt hàng
                $scope.matHang = {};  // Xóa thông tin mặt hàng
                $scope.listThongSo = [];  // Xóa thông số kỹ thuật
                $scope.showFormMH = false;  // Ẩn form
            })
            .catch(error => {
                console.error("Lỗi khi cập nhật mặt hàng:", error);
            });
        }
    };

    // Thêm thông số kỹ thuật
    $scope.AddThongSo = function () {
        if ($scope.matHang.idMatHang) {
            // Nếu có id mặt hàng, gửi thông số lên server
            $http.post("http://localhost:5159/api/MatHangControllers/AddThongSo", {
                matHangId: $scope.matHang.idMatHang,
                thongSo: $scope.listThongSo
            })
            .then(response => {
                alert("Thông số kỹ thuật đã được thêm.");
                $scope.listThongSo = [];  // Xóa danh sách thông số sau khi thêm
            })
            .catch(error => console.error("Lỗi khi thêm thông số kỹ thuật:", error));
        } else {
            // Nếu chưa có id mặt hàng, lưu thông số vào local
            $scope.listThongSo.push({
                idThongSo: "temp" + new Date().getTime(),
                tenThongSo: $scope.thongSo.tenThongSo,
                giaTri: $scope.thongSo.giaTri
            });
            alert("Thông số đã được thêm vào danh sách.");
            $scope.thongSo = {};  // Reset thông số
        }
    };

    // Thêm ảnh mặt hàng
    $scope.setImage = function ($file) {
        if ($scope.matHang.idMatHang) {
            // Nếu đã có id mặt hàng, upload ảnh lên server
            var formData = new FormData();
            formData.append('file', $file);
            $http.post("http://localhost:5159/api/MatHangControllers/UploadImage/" + $scope.matHang.idMatHang, formData, {
                headers: { 'Content-Type': undefined }
            })
            .then(response => {
                alert("Ảnh mặt hàng đã được tải lên.");
                $scope.imageSrc = URL.createObjectURL($file);
            })
            .catch(error => console.error("Lỗi khi tải ảnh mặt hàng:", error));
        } else {
            // Nếu chưa có id mặt hàng, lưu ảnh vào local
            $scope.imageSrc = URL.createObjectURL($file);
        }
    };

    // Làm mới dữ liệu
    $scope.refresh = function () {
        $scope.matHang = {};
        $scope.listThongSo = [];
        $scope.showFormMH = false;
    };

    $scope.loadMatHang();  // Gọi hàm tải mặt hàng ban đầu
});
