app.controller('NguoiDungController', function($scope, $http) {
    $scope.listNguoiDung = [];
    $scope.showFormND = false;
    $scope.filteredNguoiDung = [];
    $scope.currentPageNguoiDung = 1;
    $scope.pageSizeNguoiDung = 10;
    
    const IDAuto = { chars1: ['!', '@', '#', '$'], chars2: ['%', '&', '*'], generateID: function (prefix) { 
        const randomNumber = Math.floor(Math.random() * (999 - 100 + 1)) + 100; 
        const randomChar1 = this.chars1[Math.floor(Math.random() * this.chars1.length)]; 
        const randomChar2 = this.chars2[Math.floor(Math.random() * this.chars2.length)]; 
        return `${prefix}${randomChar1}${randomChar1}${randomNumber}${randomChar2}${randomNumber}`; 
    }}; 

    const showToast = (type, message) => {
        const toastDetails = {
            success: { icon: "fa-check-circle", message },
            error: { icon: "fa-times-circle", message },
            info: { icon: "fa-info-circle", message },
        };
        const { icon, message: msg } = toastDetails[type];
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="column">
                <i class="fa ${icon}"></i>
                <span>${msg}</span>
            </div>
            <i class="bi bi-x-circle" onclick="this.parentElement.remove()"></i>`;
        document.body.appendChild(toast);
    };

    // Lọc người dùng theo từ khóa tìm kiếm
    $scope.filterNguoiDung = function (user) {
        if (!$scope.searchNguoiDung) {
            return true; // Không có từ khóa tìm kiếm, tất cả người dùng được hiển thị
        }
        const keyword = $scope.searchNguoiDung.toLowerCase();
        return (user.idNguoiDung && user.idNguoiDung.toLowerCase().includes(keyword)) ||
               (user.tenNguoiDung && user.tenNguoiDung.toLowerCase().includes(keyword)) ||
               (user.email && user.email.toLowerCase().includes(keyword)) ||
               (user.soDienThoai && user.soDienThoai.toString().includes(keyword));
    };

    // Tải danh sách người dùng từ API
    $scope.loadNguoiDung = function() {
        $http({
            method: 'GET',
            url: "http://localhost:5159/api/NguoiDungControllers/Get-All",
        }).then(function(response) {
            if (response.data && Array.isArray(response.data)) {
                $scope.listNguoiDung = response.data;
                $scope.filteredNguoiDung = angular.copy(response.data); // Sao chép dữ liệu để lọc
                $scope.totalPagesNguoiDung = Math.ceil($scope.filteredNguoiDung.length / $scope.pageSizeNguoiDung);
                $scope.currentPageNguoiDung = 1; // Đặt lại trang hiện tại về 1 khi tải lại dữ liệu
            } else {
                console.error("Dữ liệu trả về không hợp lệ:", response.data);
            }
        }).catch(function(error) {
            console.error("Error loading Nguoi Dung:", error);
        });
    };

    // Lấy danh sách người dùng đã được phân trang và lọc
    $scope.getPaginatedNguoiDung = function () {
        const filteredData = $scope.filteredNguoiDung.filter($scope.filterNguoiDung);
        const startIndex = ($scope.currentPageNguoiDung - 1) * $scope.pageSizeNguoiDung;
        $scope.totalPagesNguoiDung = Math.ceil(filteredData.length / $scope.pageSizeNguoiDung);
        return filteredData.slice(startIndex, startIndex + $scope.pageSizeNguoiDung);
    };

    // Lấy danh sách các số trang
    $scope.getPageNumbers = function () {
        const pageNumbers = [];
        for (let i = 1; i <= $scope.totalPagesNguoiDung; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    // Chuyển trang
    $scope.changePageNguoiDung = function (page) {
        if (page >= 1 && page <= $scope.totalPagesNguoiDung) {
            $scope.currentPageNguoiDung = page;
        }
    };

    // Tải dữ liệu người dùng khi controller được khởi tạo
    $scope.loadNguoiDung();
    

    $scope.selectNguoiDung = function(user) {
        localStorage.setItem('selectidNguoiDung', user.idNguoiDung); 
        localStorage.setItem('selecttenNguoiDung', user.tenNguoiDung);

        $scope.selecttenNguoiDung = user.tenNguoiDung;
        $scope.NguoiDung = angular.copy(user);
        $scope.showFormND = true;

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
        
        $scope.deleteSelectedNguoiDung = function (user) {
            const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa người dùng ${user.tenNguoiDung}?`);
            if (confirmDelete) {
                $http({
                    method: 'DELETE',
                    url: `http://localhost:5159/api/NguoiDungControllers/Delete/${user.idNguoiDung}`,
                    headers: { 'Content-Type': 'application/json' }
                }).then(function (response) {
                    showToast("success", "Người dùng đã được xóa thành công!");
                    $scope.loadNguoiDung(); // Tải lại danh sách người dùng sau khi xóa
                }).catch(function (error) {
                    showToast("error", "Xóa không thành công!");
                    console.error("Delete Error:", error);
                });
            }
        };
        
});
