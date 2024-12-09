app.controller('NhaCungCapController', function ($scope, $http) {
    // Khai báo các biến liên quan đến dữ liệu và phân trang
    $scope.listNhaCungCap = [];
    $scope.filteredNhaCungCap = [];
    $scope.currentPageNhaCungCap = 1;
    $scope.pageSizeNhaCungCap = 10;
    
    const IDAuto = { 
        chars1: ['h', 'a', 'x', 'e'], 
        chars2: ['d', 'g', 't'], 
        generateID: function (prefix) { 
            const randomNumber = Math.floor(Math.random() * (99999999 - 100000000 + 1)) + 100; 
            const randomChar1 = this.chars1[Math.floor(Math.random() * this.chars1.length)]; 
            const randomChar2 = this.chars2[Math.floor(Math.random() * this.chars2.length)]; 
            return `${prefix}${randomChar1}${randomChar1}${randomNumber}${randomChar2}${randomNumber}`; 
        }
    }; 

    const buttons = document.querySelectorAll(".tab-content .foot .btn");
    const notifications = document.querySelector(".notifications");

    // Hàm hiển thị thông báo
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

    // Lọc nhà cung cấp theo từ khóa tìm kiếm
    $scope.filterNhaCungCap = function () {
        const keyword = ($scope.searchNhaCungCap || "").toLowerCase();
        $scope.filteredNhaCungCap = $scope.listNhaCungCap.filter(user => {
            return (user.idNhaCungCap && user.idNhaCungCap.toLowerCase().includes(keyword)) ||
                   (user.tenNhaCungCap && user.tenNhaCungCap.toLowerCase().includes(keyword)) ||
                   (user.email && user.email.toLowerCase().includes(keyword)) ||
                   (user.soDienThoai && user.soDienThoai.toString().includes(keyword));
        });
        $scope.currentPageNhaCungCap = 1; // Đặt lại trang đầu tiên sau khi tìm kiếm
    };

    // Tải dữ liệu nhà cung cấp từ API
    $scope.loadNhaCungCap = function () {
        $http({
            method: 'GET',
            url: "http://localhost:5159/api/NhaCungCapControllers/Get-All",
        }).then(function (response) {
            $scope.listNhaCungCap = response.data;
            $scope.filteredNhaCungCap = $scope.listNhaCungCap; // Lưu trữ danh sách chưa lọc
            $scope.totalPagesNhaCungCap = Math.ceil($scope.listNhaCungCap.length / $scope.pageSizeNhaCungCap); // Tổng số trang
            console.log("Nha Cung Cap data loaded:", response.data);
        }).catch(function (error) {
            console.error("Error loading Nha Cung Cap:", error);
        });
    };

    // Phân trang dữ liệu nhà cung cấp
    $scope.getPaginatedNhaCungCap = function () {
        const start = ($scope.currentPageNhaCungCap - 1) * $scope.pageSizeNhaCungCap;
        return $scope.filteredNhaCungCap.slice(start, start + $scope.pageSizeNhaCungCap);
    };

    // Chuyển trang
    $scope.changePageNhaCungCap = function (page) {
        const totalPages = Math.ceil($scope.filteredNhaCungCap.length / $scope.pageSizeNhaCungCap);
        if (page >= 1 && page <= totalPages) {
            $scope.currentPageNhaCungCap = page;
        }
    };

    // Cập nhật kích thước trang
    $scope.updatePageSizeNhaCungCap = function () {
        $scope.currentPageNhaCungCap = 1;
    };

    // Tải dữ liệu khi mở trang
    $scope.loadNhaCungCap();

    // Làm mới trạng thái chọn
    $scope.refresh = function () {
        $scope.listNhaCungCap.forEach(function(user){ 
            user.selected = false; 
        });
        $scope.nhaCungCap = {};
    };

    // Đặt lại form
    $scope.reset = function() { 
        $scope.listNhaCungCap.forEach(function(user){ 
            user.selected = false; 
        });
        $scope.nhaCungCap = {}; 
        $scope.showFormNCC = false;       
    };

    // Thêm nhà cung cấp
    $scope.AddNhaCungCap = function () { 
        let email = $scope.nhaCungCap.email || ""; 
        if (!email.endsWith("@gmail.com")) { 
            email += "@gmail.com"; 
        } 
        const nhaCungCap = { 
            idNhaCungCap: IDAuto.generateID("NCC"),
            tenNhaCungCap: $scope.nhaCungCap.tenNhaCungCap, 
            email: email, 
            soDienThoai: parseInt($scope.nhaCungCap.soDienThoai), 
            diaChi: $scope.nhaCungCap.diaChi 
        }; 
        $http({
            method: 'POST',
            url: 'http://localhost:5159/api/NhaCungCapControllers/Create',
            headers: { 'Content-Type': 'application/json' },
            data: nhaCungCap
        }).then(function (response) {
            showToast("success", "Nhà cung cấp đã được thêm thành công!"); // Gọi hàm hiển thị thông báo
            $scope.loadNhaCungCap(); 
            $scope.nhaCungCap = {}; 
            $scope.showFormNCC = false;
        }).catch(function (error) {
            showToast("error", "Không thể thêm nhà cung cấp. Vui lòng thử lại!");
        });
    };

    // Chỉnh sửa nhà cung cấp đã chọn
    $scope.editSelectedNhaCungCap = function () { 
        const selectedNhaCungCap = $scope.listNhaCungCap.find(user => user.selected); 
        if (selectedNhaCungCap) { 
            let email = selectedNhaCungCap.email.split('@')[0]; 
            $scope.nhaCungCap = { 
                idNhaCungCap: selectedNhaCungCap.idNhaCungCap, 
                tenNhaCungCap: selectedNhaCungCap.tenNhaCungCap, 
                email: email, // Chỉ hiển thị phần trước @
                soDienThoai: selectedNhaCungCap.soDienThoai.toString(), 
                diaChi: selectedNhaCungCap.diaChi 
            }; 
            $scope.showFormNCC = true; 
        } else { 
            showToast("info", "Vui lòng chọn một nhà cung cấp để sửa!!");
        } 
    };
    
    // Cập nhật nhà cung cấp
    $scope.UpdateNhaCungCap = function () { 
        const idNhaCungCap = $scope.nhaCungCap.idNhaCungCap; 
        let email = $scope.nhaCungCap.email || ""; 
        if (!email.endsWith("@gmail.com")) { 
            email += "@gmail.com"; 
        }
        const nhaCungCap = { 
            idNhaCungCap: idNhaCungCap, 
            tenNhaCungCap: $scope.nhaCungCap.tenNhaCungCap, 
            email: email, 
            soDienThoai: parseInt($scope.nhaCungCap.soDienThoai), 
            diaChi: $scope.nhaCungCap.diaChi 
        }; 
        $http({
            method: 'PUT', 
            url: `http://localhost:5159/api/NhaCungCapControllers/Update/${idNhaCungCap}`,
            headers: { 'Content-Type': 'application/json' },
            data: nhaCungCap
        }).then(function (response) {
            showToast("success", "Thông tin nhà cung cấp đã được sửa thành công!"); 
            $scope.nhaCungCap = {}; 
            $scope.showFormNCC = false; 
            $scope.loadNhaCungCap();
        }).catch(function (error) {
            showToast("error", "Thông tin nhà cung cấp đã được sửa không thành công!"); 
        });
    };
    
    // Xóa nhà cung cấp đã chọn
    $scope.deleteSelectedNhaCungCap = function () {
        const selectedNhaCungCap = $scope.listNhaCungCap.find(user => user.selected);
       
        if (selectedNhaCungCap) {
            const confirmDelete = confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này?");
            if (confirmDelete) {
                $http({
                    method: 'DELETE',
                    url: `http://localhost:5159/api/NhaCungCapControllers/Delete/${selectedNhaCungCap.idNhaCungCap}`,
                    headers: { 'Content-Type': 'application/json' }
                }).then(function (response) {
                    debugger;
                    showToast("success", "Nhà cung cấp đã được xóa thành công!");
                    $scope.loadNhaCungCap();
                    $scope.refresh();
                }).catch(function (error) {
                    showToast("error", "Xóa không thành công!");
                });
            }
        } else {
            showToast("info", "Vui lòng chọn một nhà cung cấp để xóa!");
        }
    };
});
