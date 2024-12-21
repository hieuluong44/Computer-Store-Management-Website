app.controller('ThongKeController', function($scope) {
    app.controller('ThongKeController', ['$scope', function($scope) {
        $scope.activeTab = 'matHang'; // Tab mặc định
        $scope.startDate = '';
        $scope.endDate = '';
    
        // Dữ liệu ví dụ
        $scope.matHangData = [
            {name: 'Mặt hàng 1', sold: 100, revenue: 100000},
            {name: 'Mặt hàng 2', sold: 80, revenue: 80000},
            {name: 'Mặt hàng 3', sold: 120, revenue: 120000}
        ];
    
        $scope.doanhThuData = [
            {date: '2024-12-01', amount: 500000},
            {date: '2024-12-02', amount: 600000}
        ];
    
        $scope.hangTonData = [
            {name: 'Mặt hàng 1', stock: 50, value: 50000},
            {name: 'Mặt hàng 2', stock: 30, value: 30000}
        ];
    
        // Chọn tab hiện tại
        $scope.setActiveTab = function(tab) {
            $scope.activeTab = tab;
        };
    
        // Lọc báo cáo theo ngày
        $scope.filterReport = function() {
            // Áp dụng lọc theo startDate và endDate
            console.log('Lọc từ ngày:', $scope.startDate, 'đến ngày:', $scope.endDate);
            // Gọi API để lấy dữ liệu đã lọc nếu cần
        };
    
        // In báo cáo
        $scope.printReport = function(tab) {
            console.log('In báo cáo cho tab:', tab);
            // Implement logic for printing the report
        };
    }]);
    
});
