app.controller('NguoiDungController', function($scope, $http) {
    $scope.listNguoiDung = [];

    $scope.filteredNguoiDung = []; 
    $scope.currentPageNguoiDung = 1; 
    $scope.pageSizeNguoiDung = 10; 
    
    const IDAuto = { chars1: ['!', '@', '#', '$'], chars2: ['%', '&', '*'], generateID: function (prefix) { 
        const randomNumber = Math.floor(Math.random() * (999 - 100 + 1)) + 100; 
        const randomChar1 = this.chars1[Math.floor(Math.random() * this.chars1.length)]; 
        const randomChar2 = this.chars2[Math.floor(Math.random() * this.chars2.length)]; 
        return `${prefix}${randomChar1}${randomChar1}${randomNumber}${randomChar2}${randomNumber}`; 
    }}; 

    const buttons = document.querySelectorAll(".tab-content .foot .btn");
    const notifications = document.querySelector(".notifications");

    function showToast(type, message) {
        const toastDetails = {
            success: {
                icon: "fa-check-circle",
                message: message,
            },
            error: {
                icon: "fa-times-circle",
                message: message,
            },
            info: {
                icon: "fa-info-circle",
                message: message,
            },
        };
        const { icon, message: msg } = toastDetails[type];
        const toast = document.createElement("li");
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="column">
                <i class="fa ${icon}"></i>
                <span>${msg}</span>
            </div>
            <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
            notifications.appendChild(toast);
        setTimeout(() => toast.remove(), 5000);
    }

    $scope.filterNguoiDung = function (user) {
        if (!$scope.searchNguoiDung) {
            return true; 
        }
        const keyword = $scope.searchNguoiDung.toLowerCase();
        return (user.idNguoiDung && user.idNguoiDung.toLowerCase().includes(keyword)) ||
               (user.tenNguoiDung && user.tenNguoiDung.toLowerCase().includes(keyword)) ||
               (user.email && user.email.toLowerCase().includes(keyword)) ||
               (user.soDienThoai && user.soDienThoai.toString().includes(keyword));
    };

    $scope.loadNguoiDung = function() {
        $http({
            method: 'GET',
            url: "http://localhost:5159/api/NguoiDungControllers/Get-All",
        }).then(function (response) {
            $scope.listNguoiDung = response.data;
            $scope.totalPagesNguoiDung = Math.ceil($scope.listNguoiDung.length / $scope.pageSizeNguoiDung);
            console.log("Dữ liệu người dùng:", response.data);
        }).catch(function (error) {
            console.error("Error loading Nguoi Dung:", error);
        });  
    };
           
    // Phân trang mặt hàng
        $scope.getPaginatedNguoiDung = function () {
        const startIndex = ($scope.currentPageNguoiDung - 1) * $scope.pageSizeNguoiDung;
        return $scope.listNguoiDung.slice(startIndex, startIndex + $scope.pageSizeNguoiDung);
    };

    // Chuyển đổi trang
    $scope.changePageNguoiDung = function (page) {
        if (page >= 1 && page <= Math.ceil($scope.listNguoiDung.length / $scope.pageSizeNguoiDung)) {
            $scope.currentPageNguoiDung = page;
        }
    };

    $scope.loadNguoiDung(); 

    $scope.refresh = function () {
        $scope.listNguoiDung.forEach(function(user){ 
                user.selected = false; 
            }); 
        $scope.NguoiDung = {};
    };

    $scope.reset = function() { 
            $scope.listNguoiDung.forEach(function(user){ 
                user.selected = false; 
            }); 
                $scope.NguoiDung = {}; 
                $scope.showFormND = false;
        };
        $scope.AddNguoiDung = function () { 
            let email = $scope.NguoiDung.email || ""; 
            if (!email.endsWith("@gmail.com")) { 
                email += "@gmail.com"; 
            } 
            const NguoiDung = { 
                idNguoiDung: IDAuto.generateID("ND"),
                tenNguoiDung: $scope.NguoiDung.tenNguoiDung, 
                email: email, 
                soDienThoai: parseInt($scope.NguoiDung.soDienThoai), 
                diaChi: $scope.NguoiDung.diaChi 
            }; 
            $http({
                method: 'POST',
                url: 'http://localhost:5159/api/NguoiDungControllers/Create',
                headers: { 'Content-Type': 'application/json' },
                data: NguoiDung
            }).then(function (response) {
                showToast("success", "người dùng đã được thêm thành công!"); // Gọi hàm hiển thị thông báo
                $scope.loadNguoiDung(); 
                $scope.NguoiDung = {}; 
                $scope.showFormND = false;
            }).catch(function (error) {
                showToast("error", "Không thể thêm người dùng. Vui lòng thử lại!");
            });
        };    
        $scope.editSelectedNguoiDung = function () {
            // Tìm hàng được chọn
            const selectedNguoiDung = $scope.listNguoiDung.find(user => user.selected);
            if (selectedNguoiDung) {
                let email = selectedNguoiDung.email.split('@')[0]; 
                $scope.NguoiDung = {
                    idNguoiDung: selectedNguoiDung.idNguoiDung,
                    tenNguoiDung: selectedNguoiDung.tenNguoiDung,
                    soDienThoai: selectedNguoiDung.soDienThoai.toString(),
                    email: email,
                    diaChi: selectedNguoiDung.diaChi,
                    matKhau: selectedNguoiDung.matKhau,
                    vaiTro: selectedNguoiDung.vaiTro,
                    hinhAnh: selectedNguoiDung.hinhAnh // Thêm dòng này để gán hình ảnh
                };
                // Hiển thị form chỉnh sửa
                $scope.showFormND = true;
            } else {
                showToast("info", "Vui lòng chọn một người dùng để sửa!!");
            }
        };
        
    
        $scope.UpdateNguoiDung = function () { 
            const idNguoiDung = $scope.NguoiDung.idNguoiDung; 
            console.log(idNguoiDung); 
            let email = $scope.NguoiDung.email || ""; 
            if (!email.endsWith("@gmail.com")) { 
                email += "@gmail.com"; 
            } 
            
            const NguoiDung = { 
                idNguoiDung: idNguoiDung, 
                tenNguoiDung: $scope.NguoiDung.tenNguoiDung, 
                email: email, 
                soDienThoai: parseInt($scope.NguoiDung.soDienThoai), 
                diaChi: $scope.NguoiDung.diaChi 
            }; 
            
            $http({
                method: 'PUT', 
                url: `http://localhost:5159/api/NguoiDungControllers/Update/${idNguoiDung}`, // Sử dụng idNguoiDung trong URL
                headers: { 'Content-Type': 'application/json' },
                data: NguoiDung
            }).then(function (response) {
                showToast("success", "Thông tin người dùng đã được sửa thành công!"); // Sử dụng hàm showModal
                $scope.NguoiDung = {}; 
                $scope.showFormND = false; 
                $scope.loadNguoiDung();
            }).catch(function (error) {
                showToast("error", "Thông tin người dùng đã được sửa không thành công!"); // Sử dụng hàm showModal
            });
        };
        
        $scope.deleteSelectedNguoiDung = function () {
            const selectedNguoiDung = $scope.listNguoiDung.find(user => user.selected);
        
            if (selectedNguoiDung) {
                const confirmDelete = confirm("Bạn có chắc chắn muốn xóa người dùng này?");
                if (confirmDelete) {
                    $http({
                        method: 'DELETE',
                        url: `http://localhost:5159/api/NguoiDungControllers/Delete/${selectedNguoiDung.idNguoiDung}`,
                        headers: { 'Content-Type': 'application/json' }
                    }).then(function (response) {
                        showToast("success", "người dùng đã được xóa thành công!");
                        $scope.reset();
                        $scope.loadNguoiDung();
                    }).catch(function (error) {
                        showToast("error", "Xoá không thành công!!");
                        console.error("Delete Error:", error);
                    });
                }
            } else {
                showToast("info", "Vui lòng chọn một người dùng để xoá!!");
            }
        };   
});
