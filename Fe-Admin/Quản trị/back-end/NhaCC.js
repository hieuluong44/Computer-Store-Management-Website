app.controller('NhaCungCapController', function ($scope, $http) {
    $scope.listNhaCungCap = [];
    $scope.currentPage = 1;
    $scope.pageSize = 10;       

    const IDAuto = { 
        chars1: ['h', 'a', 'x', 'e'], 
        chars2: ['d', 'g', 't'], 
        generateID: function (prefix) { 
            const maxLength = 10; 
            const randomNumberLength = maxLength - prefix.length - 2; 
            const randomNumber = Math.floor(
                Math.random() * Math.pow(10, randomNumberLength)
            )
                .toString()
                .padStart(randomNumberLength, '0'); 
            const randomChar1 = this.chars1[Math.floor(Math.random() * this.chars1.length)]; 
            const randomChar2 = this.chars2[Math.floor(Math.random() * this.chars2.length)]; 
            return `${prefix}${randomChar1}${randomNumber}${randomChar2}`; 
        }
    };    

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


    // Hàm tải danh sách nhà cung cấp từ API
    $scope.loadNhaCungCap = function() {
        $http.get("http://localhost:5159/api/NhaCungCapControllers/Get-All")
        .then((response) => {
            $scope.listNhaCungCap = response.data || [];
            $scope.totalPages = Math.ceil($scope.listNhaCungCap.length / $scope.pageSize);
        })
        .catch((error) => console.error("Lỗi:", error));    
    };

    $scope.paginatedData = function () {
        const start = ($scope.currentPage - 1) * $scope.pageSize;
        return $scope.listNhaCungCap.slice(start, start + $scope.pageSize);
    };

    $scope.changePage = function (page) {
        if (page >= 1 && page <= $scope.totalPages) $scope.currentPage = page;
    };

    $scope.reset = () => {
        $scope.nhaCungCap = {};
        $scope.showFormNCC = false;
    };

    const idNhaCungCap = IDAuto.generateID("NCC");

    $scope.AddNhaCungCap = () => {
        const nhaCungCap = {
            idNhaCungCap: idNhaCungCap,
            tenNhaCungCap: $scope.nhaCungCap.tenNhaCungCap,
            email: `${$scope.nhaCungCap.email}@gmail.com`,
            soDienThoai: $scope.nhaCungCap.soDienThoai,
            diaChi: $scope.nhaCungCap.diaChi,
        };
    $http.post("http://localhost:5159/api/NhaCungCapControllers/Create", nhaCungCap)
    .then((response) => {
        console.log("API Success Response:", response.data);
        showToast("success", "Thêm nhà cung cấp thành công!");
        $scope.loadNhaCungCap($scope.currentPageNhaCungCap);
        $scope.reset();
    })
    .catch((error) => {
        console.error("API Error Response:", error);
        showToast("error", "Thêm nhà cung cấp thất bại!");
    });

    };

    $scope.editSelectedNhaCungCap = () => {
        const selected = $scope.listNhaCungCap.find(user => user.selected);
        if (selected) {
            $scope.nhaCungCap = { ...selected };
            $scope.showFormNCC = true;
        } else {
            showToast("info", "Vui lòng chọn nhà cung cấp để sửa!");
        }
    };

    $scope.UpdateNhaCungCap = () => {
        $http.put(`http://localhost:5159/api/NhaCungCapControllers/Update/${$scope.nhaCungCap.idNhaCungCap}`, $scope.nhaCungCap)
            .then(() => {
                showToast("success", "Cập nhật nhà cung cấp thành công!");
                $scope.loadNhaCungCap($scope.currentPageNhaCungCap);  // Tải lại dữ liệu sau khi cập nhật
                $scope.reset();
            })
            .catch(() => showToast("error", "Cập nhật nhà cung cấp thất bại!"));
    };

    $scope.deleteSelectedNhaCungCap = () => {
        const selected = $scope.listNhaCungCap.find(user => user.selected);
        if (selected && confirm("Bạn có chắc chắn muốn xóa?")) {
            $http.delete(`http://localhost:5159/api/NhaCungCapControllers/Delete/${selected.idNhaCungCap}`)
                .then(() => {
                    showToast("success", "Xóa nhà cung cấp thành công!");
                    $scope.loadNhaCungCap($scope.currentPageNhaCungCap);  // Tải lại dữ liệu sau khi xóa
                })
                .catch(() => showToast("error", "Xóa nhà cung cấp thất bại!"));
        } else {
            showToast("info", "Vui lòng chọn nhà cung cấp để xóa!");
        }
    };

    // Khởi tạo tải dữ liệu ban đầu
    $scope.loadNhaCungCap($scope.currentPageNhaCungCap);
});
