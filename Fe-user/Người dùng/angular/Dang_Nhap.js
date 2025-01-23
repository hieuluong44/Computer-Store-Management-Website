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
        HinhAnh : '',
        TenNguoiDung: '',
        GioiTinh : '',
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
    
        var Email =  $scope.loginData.email.trim();
        var MatKhau =  $scope.loginData.matKhau.trim();
        $http.post(`http://localhost:5156/api/TaiKhoanControllers/Dang_Nhap?Email=${Email}&MatKhau=${MatKhau}`)
            .then(function(response) {
                console.log(response.data);
                    // Lưu thông tin vào localStorage
                    localStorage.setItem("userID", response.data.id);
                    localStorage.setItem("name", response.data.name);
                    localStorage.setItem("image", response.data.anh);
                    window.location.href = "Trang_Chu.html"; 
            }).catch(function(error) {
                console.error("Lỗi khi đăng nhập: ",error);
                alert("Lỗi đăng nhập!");
            });
    };

    const IDAuto = { 
        chars1: ['h', 'a', 'x', 'e'], 
        chars2: ['d', 'g', 't'], 
        generateID: function (prefix) { 
            const maxLength = 10; 
            const randomNumberLength = maxLength - prefix.length - 2; 
            const randomNumber = Math.floor(
                Math.random() * Math.pow(10, randomNumberLength)
            )
                .toString()
                .padStart(randomNumberLength, '0'); 
            const randomChar1 = this.chars1[Math.floor(Math.random() * this.chars1.length)]; 
            const randomChar2 = this.chars2[Math.floor(Math.random() * this.chars2.length)]; 
            return `${prefix}${randomChar1}${randomNumber}${randomChar2}`; 
        }
    };    
    
    const IDNguoiDung = IDAuto.generateID("ND");
    $scope.register = function() {
        // Tạo dữ liệu đăng ký
        var data = {
            idNguoiDung: IDNguoiDung,
            hinhAnh: '',
            tenNguoiDung: $scope.registerData.tenNguoiDung,
            gioiTinh: $scope.registerData.gioiTinh,
            soDienThoai: $scope.registerData.soDienThoai,
            email: $scope.registerData.email,
            matKhau: $scope.registerData.matKhau
        };

        $http.post("http://localhost:5156/api/TaiKhoanControllers/register_account", data)
            .then(function(response) {
                var email = $scope.registerData.email;
                var matKhau = $scope.registerData.matKhau;

                $http.post(`http://localhost:5156/api/TaiKhoanControllers/Dang_Nhap?Email=${email}&MatKhau=${matKhau}`)
                    .then(function(response) {
                        console.log("Đăng nhập thành công:", response.data);

                        localStorage.setItem("userID", response.data.id);
                        localStorage.setItem("name", response.data.name);
                        localStorage.setItem("image", response.data.anh);

                        window.location.href = "Trang_Chu.html";
                    })
                    .catch(function(error) {
                        console.error("Lỗi khi đăng nhập: ", error);
                        alert("Lỗi đăng nhập!");
                    });
            })
            .catch(function(error) {
                console.error("Lỗi khi đăng ký: ", error);
                alert("Lỗi đăng ký!");
            });
    };

});
