var app = angular.module('User',[]);

app.controller('UserCtrl', function ($scope) {
    // Kiểm tra trạng thái đăng nhập
    $scope.isLoggedIn = localStorage.getItem('userID') ? true : false;

    $scope.TenNguoiDung = $scope.isLoggedIn ? localStorage.getItem('name') : "Khách";

    // Hàm đăng xuất
    $scope.logout = function () {
        localStorage.removeItem('userID');
        localStorage.removeItem('name');
        $scope.isLoggedIn = false; 
        alert('Đăng xuất thành công!');
        window.location.reload(); 
    };
    
});
