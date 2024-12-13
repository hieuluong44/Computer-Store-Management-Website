app.controller('Dang_NhapControllers', function($scope, $http) {
    // Biến để điều khiển form hiển thị
    $scope.isLoginForm = true;
    $scope.isRegisterForm = false;

    // Thông tin đăng nhập
    $scope.loginData = {
        Email: '',
        MatKhau: ''
    };

    // Thông tin đăng ký
    $scope.registerData = {
        TenNguoiDung: '',
        SoDienThoai: '',
        Email: '',
        MatKhau: ''
    };

    // Hiển thị form Đăng nhập
    $scope.showLogin = function() {
        $scope.isLoginForm = true;
        $scope.isRegisterForm = false;
    };

    // Hiển thị form Đăng ký
    $scope.showRegister = function() {
        $scope.isLoginForm = false;
        $scope.isRegisterForm = true;
    };

    // Hàm đăng nhập
    $scope.login = function(event) {
        event.preventDefault(); // Ngừng việc submit form và tải lại trang
    
        var data = {
            Email: $scope.loginData.Email,
            MatKhau: $scope.loginData.MatKhau
        };
       
        $http.post("http://localhost:5156/api/DangNhapControllers/Dang_Nhap", data)
            .then(function(response) {
                if (response.data.Result === 1) {
                    // Lưu thông tin vào localStorage
                    localStorage.setItem("userID", response.data.IDNguoiDung);
                    alert("Đăng nhập thành công!");
                    window.location.href = "Trang_Chu.html"; // Chuyển hướng sang trang chủ
                } else {
                    alert("Thông tin đăng nhập không chính xác!");
                }
            }, function(error) {
                alert("Lỗi đăng nhập!");
            });
    };
    

    // Hàm đăng ký
    $scope.register = function() {
        var data = {
            TenNguoiDung: $scope.registerData.TenNguoiDung,
            SoDienThoai: $scope.registerData.SoDienThoai,
            Email: $scope.registerData.Email,
            MatKhau: $scope.registerData.MatKhau
        };

        $http.post("http://localhost:5156/api/Account/Register", data)
            .then(function(response) {
                if (response.data.Status === "Success") {
                    alert("Tạo tài khoản thành công!");
                    $scope.showLogin(); // Chuyển sang form đăng nhập
                } else {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại!");
                }
            }, function(error) {
                alert("Lỗi đăng ký!");
            });
    };
});
