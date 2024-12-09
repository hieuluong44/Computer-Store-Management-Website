app.controller('DanhMucController', function($scope, $http) {
    $scope.danhMucCha = []; // Chứa danh mục cha
    $scope.danhMucCon = {}; // Chứa danh mục con theo ID danh mục cha
    $scope.danhMucChau = {}; // Chứa danh mục cháu theo ID danh mục con

    // Lấy danh mục cha từ API
    $http.get("http://localhost:5156/api/DanhMucControllers/Get_DanhMuc")
        .then(function(response) {
            $scope.danhMucCha = response.data; // Dữ liệu danh mục cha
            console.log("Danh mục cha:", $scope.danhMucCha);
        }, function(error) {
            console.log("Lỗi khi lấy danh mục cha", error);
        });

        $scope.toggleDanhMucConVaChau = function(danhMucCha) {
            console.log("Hover vào danh mục cha:", danhMucCha);
        
            if (!danhMucCha.isExpanded) {
                // Gọi API lấy danh mục con
                $scope.getDanhMucCon(danhMucCha.idDanhMuc, function() {
                    // Sau khi lấy danh mục con, tự động lấy danh mục cháu
                    $scope.loadDanhMucChau(danhMucCha.idDanhMuc);
                });
            }
        
            // Đảo ngược trạng thái hiển thị
            danhMucCha.isExpanded = !danhMucCha.isExpanded;
        };

    $scope.getDanhMucCon = function(idDanhMucCha, callback) {
        $http.get(`http://localhost:5156/api/DanhMucControllers/Get_DanhMucCon/${idDanhMucCha}`)
            .then(function(response) {
                console.log("Danh mục con từ API:", response.data);
                if (response.data && response.data.length > 0) {
                    // Lưu danh mục con
                    $scope.danhMucCon[idDanhMucCha] = response.data;
    
                    // Gọi callback để xử lý danh mục cháu
                    if (callback) callback();
                } else {
                    console.log("Không có danh mục con cho danh mục cha ID:", idDanhMucCha);
                }
            }, function(error) {
                console.log("Lỗi khi lấy danh mục con", error);
            });
    };
    
    
    

    $scope.loadDanhMucChau = function(idDanhMucCha) {
        // Kiểm tra xem danh mục con có tồn tại không
        const danhMucConList = $scope.danhMucCon[idDanhMucCha];
        if (!danhMucConList) return;
    
        // Lặp qua từng danh mục con để lấy danh mục cháu
        danhMucConList.forEach(function(danhMucCon) {
            $http.get(`http://localhost:5156/api/DanhMucControllers/Get_DanhMucChau/${danhMucCon.idDanhMucCon}`)
                .then(function(response) {
                    console.log(`Danh mục cháu cho ${danhMucCon.idDanhMucCon}:`, response.data);
                    if (response.data) {
                        // Lưu danh mục cháu
                        $scope.danhMucChau[danhMucCon.idDanhMucCon] = response.data;
                    }
                }, function(error) {
                    console.log("Lỗi khi lấy danh mục cháu", error);
                });
        });
    };
    
});
