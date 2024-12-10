app.controller("MatHangBanChayController", function($scope, $http){
    $http.get("http://localhost:5156/api/MatHangControllers/List_MH")
    .then(function(response){
        $scope.list_MH = response.data;

        $scope.list_MH.forEach(function(item) {
            // Kiểm tra nếu giaBan có giá trị hợp lệ
            if (item.giaBan) {
                item.giaBanFormatted = parseFloat(item.giaBan).toLocaleString("vi-VN");
            }
        });
    }, function(error){
        console.log(error);
    });
});
