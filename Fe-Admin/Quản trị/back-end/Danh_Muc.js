app.controller("DanhMuccontroller", function ($scope, $http) {
    // Initialize both lists
    $scope.Get_ALL_DanhMuc1 = [];
    $scope.Get_ALL_DanhMuc2 = [];
    $scope.Get_ALL_DanhMuc3 = [];    

    const IDAuto = {
        chars1: ['!', '@', '#', '$'],
        chars2: ['%', '&', '*'],
        generateID: function (prefix) {
            const randomNumber = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
            const randomChar1 = this.chars1[Math.floor(Math.random() * this.chars1.length)];
            const randomChar2 = this.chars2[Math.floor(Math.random() * this.chars2.length)];
            return `${prefix}${randomChar1}${randomNumber}${randomChar2}`;
        }
    };
    
    // Load danh mục từ API
    $scope.LoadDanhMuc = function () {
        $http({
            method: 'GET',
            url: "http://localhost:5159/api/DanhMucControllers/Get-All",
        }).then(function (response) {
            $scope.Get_ALL_DanhMuc1 = response.data;
            console.log("Danh Muc data loaded:", response.data);
        }).catch(function(error) {
            console.error("Error loading Danh Muc:", error);
        });

        $http({
            method: 'GET',
            url: "http://localhost:5159/api/DanhMucControllers/Get_ALL_DanhMuc2/DM00000001",
        }).then(function (response) {
            $scope.Get_ALL_DanhMuc2 = response.data;
            console.log("Chi Tiet Danh Muc data loaded:", response.data);
        }).catch(function(error) {
            console.error("Error loading Danh Muc:", error);
        });

        $http({
            method: 'GET',
            url: "http://localhost:5159/api/DanhMucControllers/Get_ALL_DanhMuc2/DM00000011",
        }).then(function (response) {
            $scope.Get_ALL_DanhMuc2 = response.data;
            console.log("Chi Tiet Danh Muc data loaded:", response.data);
        }).catch(function(error) {
            console.error("Error loading Danh Muc:", error);
        });
    };

    // Cập nhật danh mục con
    $scope.updateDanhMucCon = function (selectedId) {
        $scope.idDanhMuc = $scope.listChiTietDanhMuc.find(item => item.idDanhMucCon == selectedId);
    }

    $scope.LoadDanhMuc();

    // Hàm làm mới
    $scope.refresh = function () {
        $scope.listDanhMuc.forEach(function(user){ 
            user.selected = false; 
        }); 
        $scope.listChiTietDanhMuc.forEach(function(user){ 
            user.selected = false; 
        });     
        $scope.DanhMucCha = {};
        $scope.DanhMucCon = {};
    };

    $scope.reset = function() { 
        $scope.listDanhMuc.forEach(function(user){ 
            user.selected = false; 
        }); 
            $scope.DanhMucCha = {}; 
            $scope.showFormDMCha = false;       
    };
    // Thêm danh mục cha
    $scope.AddDanhMuc = function () {
        const DanhMucCha = { 
            idDanhMuc: IDAuto.generateID("DM"),
            tenDanhMuc: $scope.newDanhMuc.tenDanhMuc,
        };

        $http({
            method: 'POST',
            url: 'http://localhost:5159/api/DanhMucControllers/Create',
            headers: { 'Content-Type': 'application/json' },
            data: DanhMucCha
        }).then(function (response) {
            console.log("Server response:", response);

            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Thêm danh mục cha thành công!',
                confirmButtonText: 'Xác nhận'
            });

            $scope.newDanhMuc = {};
            $scope.LoadDanhMuc(); // Load lại danh sách danh mục
        }).catch(function (error) {
            console.error("Error:", error);

            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: 'Thêm danh mục cha thất bại!',
                confirmButtonText: 'Thử lại'
            });
        });
    };

    // Cập nhật danh mục cha
    $scope.UpdateDanhMuc = function () {
        const updatedDanhMuc = {
            idDanhMuc: $scope.newDanhMuc.idDanhMuc, // ID cần cập nhật
            tenDanhMuc: $scope.newDanhMuc.tenDanhMuc
        };

        $http({
            method: 'PUT',
            url: `http://localhost:5159/api/DanhMucControllers/Update/${$scope.newDanhMuc.idDanhMuc}`,
            headers: { 'Content-Type': 'application/json' },
            data: updatedDanhMuc
        }).then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật thành công!',
                text: 'Danh mục cha đã được cập nhật.',
                confirmButtonText: 'Xác nhận'
            });

            $scope.LoadDanhMuc();
            $scope.newDanhMuc = {}; // Reset dữ liệu
        }).catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: 'Cập nhật danh mục cha thất bại!',
                confirmButtonText: 'Thử lại'
            });
            console.error("Error:", error);
        });
    };

    $scope.DeleteDanhMuc = function (item) {
        if (confirm(`Bạn có chắc chắn muốn xóa danh mục ${item.tenDanhMuc}?`)) {
            $http({
                method: 'DELETE',
                url: `http://localhost:5159/api/DanhMucControllers/Delete/${item.idDanhMuc}`,
            }).then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Xóa thành công!',
                    text: `Danh mục ${item.tenDanhMuc} đã được xóa.`,
                    confirmButtonText: 'Xác nhận'
                });

                $scope.LoadDanhMuc(); // Reload danh sách
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!',
                    text: 'Xóa danh mục thất bại!',
                    confirmButtonText: 'Thử lại'
                });
                console.error("Error:", error);
            });
        }
    };
});
