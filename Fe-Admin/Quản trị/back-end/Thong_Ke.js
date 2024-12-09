app.controller('ThongKeController', function($scope) {
    // Tab đang được kích hoạt
    $scope.activeTab = 'matHang'; // Mặc định là thống kê mặt hàng

    // Thay đổi tab
    $scope.setActiveTab = function(tabName) {
        $scope.activeTab = tabName;
    };

    // Hàm in báo cáo
    $scope.printReport = function(tabName) {
        switch(tabName) {
            case 'matHang':
                alert('In báo cáo thống kê mặt hàng.');
                break;
            case 'doanhThu':
                alert('In báo cáo thống kê doanh thu.');
                break;
            case 'hangTon':
                alert('In báo cáo hàng tồn kho.');
                break;
            default:
                alert('Không tìm thấy báo cáo.');
        }
    };
});
