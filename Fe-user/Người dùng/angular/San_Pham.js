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
});

app.controller('SearchController', function($scope, $http) {
    $scope.searchTerm = '';
    $scope.searchResults = [];
    
    $scope.setProductID = function(productID) {
        localStorage.setItem('selectedProductID', productID);    
    };

    $scope.searchProduct = function() {
        $http.get(`http://localhost:5156/api/MatHangControllers/Search_Ten/${$scope.searchTerm}`)
            .then(function(response) {
                $scope.searchResults = response.data; 
            })
            .catch(function(error) {
                console.error("Lỗi khi tìm kiếm sản phẩm:", error);
                $scope.searchResults = []; 
            });
    };
});






