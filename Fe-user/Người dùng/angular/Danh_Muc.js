app.controller('DanhMucController', function($scope, $http) {
    $scope.danhMucCha = []; 
    $scope.danhMucCon = {}; 
    $scope.danhMucChau = {}; 

    // Lấy danh mục cha từ API
    $http.get("http://localhost:5156/api/DanhMucControllers/Get_DanhMuc")
        .then(function(response) {
            $scope.danhMucCha = response.data; 
            console.log("Danh mục cha:", $scope.danhMucCha);
        }, function(error) {
            console.log("Lỗi khi lấy danh mục cha", error);
        });

    // Toggle mở danh mục con và cháu khi hover
    $scope.toggleDanhMucConVaChau = function(danhMucCha) {
        console.log("Hover vào danh mục cha:", danhMucCha);
    
        if (!danhMucCha.isExpanded) {
            $scope.getDanhMucCon(danhMucCha.idDanhMuc, function() {
                // Sau khi lấy danh mục con, tự động lấy danh mục cháu
                $scope.loadDanhMucChau(danhMucCha.idDanhMuc);
            });
        }
    
        // Đảo ngược trạng thái hiển thị
        danhMucCha.isExpanded = !danhMucCha.isExpanded;
    };

    // Hàm này dùng để lưu vào localStorage ID của danh mục bất kỳ (cha, con, cháu)
    $scope.saveDanhMucToLocal = function(idDanhMuc) {
        console.log("Lưu ID danh mục vào localStorage:", idDanhMuc);
        localStorage.setItem('idDanhMuc', idDanhMuc); // Lưu vào localStorage
    };

    // Lấy danh mục con từ API
    $scope.getDanhMucCon = function(idDanhMucCha, callback) {
        $http.get(`http://localhost:5156/api/DanhMucControllers/Get_DanhMucCon/${idDanhMucCha}`)
            .then(function(response) {
                console.log("Danh mục con từ API:", response.data);
                if (response.data && response.data.length > 0) {
                    $scope.danhMucCon[idDanhMucCha] = response.data;
    
                    if (callback) callback();
                } else {
                    console.log("Không có danh mục con cho danh mục cha ID:", idDanhMucCha);
                }
            }, function(error) {
                console.log("Lỗi khi lấy danh mục con", error);
            });
    };
    
    // Load danh mục cháu từ API
    $scope.loadDanhMucChau = function(idDanhMucCha) {
        const danhMucConList = $scope.danhMucCon[idDanhMucCha];
        if (!danhMucConList) return;
    
        danhMucConList.forEach(function(danhMucCon) {
            $http.get(`http://localhost:5156/api/DanhMucControllers/Get_DanhMucChau/${danhMucCon.idDanhMucCon}`)
                .then(function(response) {
                    console.log(`Danh mục cháu cho ${danhMucCon.idDanhMucCon}:`, response.data);
                    if (response.data) {
                        $scope.danhMucChau[danhMucCon.idDanhMucCon] = response.data;
                    }
                }, function(error) {
                    console.log("Lỗi khi lấy danh mục cháu", error);
                });
        });
    };
});
