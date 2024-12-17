app.controller("MatHangBanChayController", function($scope, $http){
    $scope.setProductID = function(productID) {
        localStorage.setItem('selectedProductID', productID);    
    };

    $http.get("http://localhost:5156/api/MatHangControllers/List_MH")
    .then(function(response){
        $scope.list_MH = response.data;
       
        $scope.list_MH.forEach(function(item) {
            if (item.giaBan) {
                item.giaBanFormatted = parseFloat(item.giaBan).toLocaleString("vi-VN");
            }
        });
    }, function(error){
        console.log(error);
    });
});






