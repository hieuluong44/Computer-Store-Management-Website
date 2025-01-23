app.controller('ThongKeController', function($scope, $http) {
    // Khởi tạo biến
    $scope.activeTab = 'matHang';
    $scope.ListMatHang = [];
    $scope.ListDoanhThu = [];
    $scope.ListHangTon = [];
    $scope.startDate = null;
    $scope.endDate = null;

    $scope.loadmathang = function(){
        $http({
            url: "http://localhost:5159/api/ThongKe_BaoCaoControllers/Top10MatHangBanChay",
            method: 'GET'
        }).then (function (response){
            $scope.listMatHang = response.data
        });
    };
    
});
  