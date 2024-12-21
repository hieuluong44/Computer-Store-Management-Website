app.controller("MatHangController", function($scope, $http){
    $scope.setProductID = function(productID) {
        localStorage.setItem('selectedProductID', productID);    
    };

    $http.get("http://localhost:5156/api/MatHangControllers/List_MH")
    .then(function(response){
        $scope.list_MH = response.data;
    }, function(error){
        console.log(error);
    });



    $scope.danhMucMatHangList = []; 

    // Gọi API để lấy dữ liệu
    $http.get("http://localhost:5156/api/MatHangControllers/Get_MH")
        .then(function(response) {
            $scope.danhMucMatHangList = response.data;
            // var data = response.data;

            // // Nhóm dữ liệu theo TenDanhMucCha
            // var groupedData = {};
            // data.forEach(function(item) {
            //     if (!groupedData[item.TenDanhMucCha]) {
            //         groupedData[item.TenDanhMucCha] = [];
            //     }
            //     groupedData[item.TenDanhMucCha].push(item);
            // });

            // // Chuyển dữ liệu nhóm thành mảng
            // $scope.danhMucMatHangList = Object.keys(groupedData).map(function(key) {
            //     return {
            //         DanhMuc: key,
            //         MatHangs: groupedData[key]
            //     };
            // });
        }, function(error) {
            console.error('Error fetching data', error);
        });

        

});






