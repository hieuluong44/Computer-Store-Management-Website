var app = angular.module('User',[]);

app.controller('UserCtrl', function ($scope) {
    // Kiểm tra trạng thái đăng nhập
    $scope.isLoggedIn = localStorage.getItem('userID') ? true : false;
    $scope.TenNguoiDung = $scope.isLoggedIn ? localStorage.getItem('name') : "Khách";

    $scope.logout = function () {
        var confirmLogout = window.confirm("Bạn có chắc muốn đăng xuất?");
    
        if (confirmLogout) {
            localStorage.removeItem('userID');
            localStorage.removeItem('name');
            $scope.isLoggedIn = false;
            alert('Đăng xuất thành công!');
            window.location.href = "Trang_Chu.html"; 
        } else {
            console.log("Người dùng đã hủy đăng xuất.");
        }
    };
});
