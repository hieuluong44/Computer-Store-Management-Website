app.controller('DanhGiaController', function($scope, $http) {
    $scope.listDanhGia = [];

    $scope.filteredDanhGia = []; 
    $scope.currentPageDanhGia = 1; 
    $scope.pageSizeDanhGia = 10; 
     
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
        
    $scope.filterDanhGia = function (item) {
        if (!$scope.searchDanhGia) {
            return true;
        }        
        const keyword = $scope.searchDanhGia.toLowerCase();
        const SoSaoString = (item.soSao !== undefined && item.soSao !== null) ? item.soSao.toString().toLowerCase() : "";
        return  (item.tenDanhGia && item.tenDanhGia.toString().includes(keyword)) ||
            (item.tenNguoiDung && item.tenNguoiDung.toLowerCase().includes(keyword)) ||
            (item.noiDung && item.noiDung.toLowerCase().includes(keyword)) ||
            SoSaoString.includes(keyword) ;
    };

    $scope.loadDanhGia = function() {
        $http({
            method: 'GET',
            url: "http://localhost:5159/api/DanhGiaControllers/Get-All",
        }).then(function (response) {
            $scope.listDanhGia = response.data;
            $scope.totalPagesDanhGia = Math.ceil($scope.listDanhGia.length / $scope.pageSizeDanhGia); // Tổng số trang
            console.log("Dữ liệu đánh giá:", response.data);
        }).catch(function (error) {
            console.error("Lỗi đánh giá:", error);
        });  
    };

    // Phân trang đánh giá
    $scope.getPaginatedDanhGia = function () {
        const startIndex = ($scope.currentPageDanhGia - 1) * $scope.pageSizeDanhGia;
        return $scope.listDanhGia.slice(startIndex, startIndex + $scope.pageSizeDanhGia);
    };

    // Chuyển đổi trang
    $scope.changePageDanhGia = function (page) {
        if (page >= 1 && page <= Math.ceil($scope.listDanhGia.length / $scope.pageSizeDanhGia)) {
            $scope.currentPageDanhGia = page;
        }
    };
    
    $scope.loadDanhGia();


    $scope.editSelectedDanhGia = function () { 
        
        const selectedDanhGia = $scope.listDanhGia.find(item => item.selected); 
        if (selectedDanhGia) { 
            $scope.DanhGia = { 
                idDanhGia: selectedDanhGia.idDanhGia, 
                tenDanhGia: selectedDanhGia.tenDanhGia, 
                tenNguoiDung: selectedDanhGia.tenNguoiDung, 
                soSao: selectedDanhGia.soSao.toString(), 
                noiDung: selectedDanhGia.noiDung 
            }; 
        } 
        else { 
            showToast("info","Vui lòng chọn một đánh giá để xoá!"); 
        } 
    };

    $scope.deleteSelectedDanhGia = function () {
        const selectedDanhGia = $scope.listDanhGia.find(item => item.selected);
    
        if (selectedDanhGia) {
            // Xác nhận xóa
            const confirmDelete = confirm("Bạn có chắc chắn muốn xóa đánh giá này?");
            if (confirmDelete) { 
                $http({
                    method: 'DELETE',
                    url: `http://localhost:5159/api/DanhGiaControllers/Delete/${selectedDanhGia.idDanhGia}`,
                    headers: { 'Content-Type': 'application/json' }
                }).then(function (response) {
                    showToast("success", "Đánh giá đã được xóa thành công!"); 
                    $scope.loadDanhGia();                
                }).catch(function (error) {
                    showToast("error", "Xoá không thành công!!");
                    console.error("Delete Error:", error);
                });
            }
        } else {
            showToast("info", "Vui lòng chọn một nhà cung cấp để xóa!"); 
        }
    };    
});
