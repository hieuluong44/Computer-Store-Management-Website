app.controller('MatHangController', function ($scope, $http) {
    $scope.listDanhMuc = [];
    $scope.matHang = {};
    $scope.showFormMH = false;
    $scope.imageSrc = "";
    $scope.listThongSo = [];
    $scope.ListAnhMatHang = []; 
    $scope.FilteredMatHang = [];
    $scope.listMatHang = [];
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

    $scope.currentTab = 'ThongTinMatHang';

    $scope.switchTab = function(tab) {
        $scope.currentTab = tab;
        if (tab === 'ThongSoKyThuat') {
            $scope.loadThongSoKyThuat();
        } else if (tab === 'AnhMatHang') {
            $scope.loadAnhMatHang();
        }
    };

    $scope.reset = function () {
        $scope.showFormMH = false;
    }


    $scope.selectMatHang = function(item) {

        localStorage.setItem("selectedMatHangID", item.idMatHang);
        localStorage.setItem("selectedMatHangName", item.tenMatHang);
    
        $scope.selectedMatHangName = item.tenMatHang;
    
        $scope.matHang = angular.copy(item);
        $scope.showFormMH = true;
    

        if ($scope.currentTab === 'ThongSoKyThuat') {
            $scope.loadThongSoKyThuat();
        } else if ($scope.currentTab === 'AnhMatHang') {
            $scope.loadAnhMatHang();
        }
    };



    //------------------- MẶT HÀNG --------------------------------//
     // Hàm tải danh sách mặt hàng từ API
     $scope.loadMatHang = function() {
        $http.get("http://localhost:5159/api/MatHangControllers/Get-All")
        .then((response) => {
            $scope.listMatHang = response.data || [];
            $scope.totalPages = Math.ceil($scope.listMatHang.length / $scope.pageSize);
        })
        .catch((error) => console.error("Lỗi:", error));    
    };
    $scope.loadMatHang();  // Gọi hàm tải mặt hàng

    
    $scope.paginatedMatHang = function () {
        const start = ($scope.currentPage - 1) * $scope.pageSize;
        return $scope.listMatHang.slice(start, start + $scope.pageSize);
    };

    $scope.changePage = function (page) {
        if (page >= 1 && page <= $scope.totalPages) $scope.currentPage = page;
    };
    
    // Lọc mặt hàng theo từ khóa tìm kiếm
    $scope.filterMatHang = function () {
        const keyword = ($scope.searchMatHang || "").toLowerCase();
        const trangThai = $scope.selectedTrangThai || "";
    
        $scope.FilteredMatHang = $scope.listMatHang.filter(item => {
            const matchesKeyword = !keyword || 
                (item.idMatHang && item.idMatHang.toLowerCase().includes(keyword)) ||
                (item.tenMatHang && item.tenMatHang.toLowerCase().includes(keyword)) ||
                (item.tenDanhMuc && item.tenDanhMuc.toLowerCase().includes(keyword)) ||
                (item.donGia && item.donGia.toString().includes(keyword));
            
            const matchesTrangThai = !trangThai || item.trangThai === trangThai;
    
            return matchesKeyword && matchesTrangThai;
        });
    
        $scope.currentPageMatHang = 1; 
    };

    const id = IDAuto.generateID("MH");
        
    // THÊM MẶT HÀNG
    $scope.addMatHang = function () {

        
        const matHangData = {
            idMatHang : id,
            tenMatHang: $scope.matHang.tenMatHang,
            idDanhMuc: $scope.matHang.idDanhMuc,
            donGia: $scope.matHang.donGia,
            baoHanh : $scope.matHang.baoHanh,
            trangThai: $scope.matHang.trangThai
        };

        
        $http.post("http://localhost:5159/api/MatHangControllers/Create", matHangData)
            .then(response => {
                showToast("success","Mặt hàng đã được thêm thành công!");
                $scope.matHang = {};  
                $scope.loadMatHang(); 
            })
            .catch(error => {
                console.error("Lỗi khi thêm mặt hàng:", error);
                showToast("error","Lỗi khi thêm mặt hàng.");
            });
    };

    
    $scope.refresh = function () {
        $scope.matHang = {}; 
    };
       

   

    //------------------- THÔNG SỐ KĨ THUẬT --------------------------------//
    $scope.loadThongSoKyThuat = function() {
        if ($scope.matHang.idMatHang) {
            $http.get(`http://localhost:5159/api/ThongSoKyThuatControllers/Get-All/${$scope.matHang.idMatHang}`)
                .then(response => {
                    if (response.data && response.data.length > 0) {
                        $scope.listThongSo = response.data;
                    } else {
                        $scope.listThongSo = [];
                    }
                })
                .catch(error => console.error("Lỗi khi lấy thông số kỹ thuật:", error));
        }
    };



    //------------------- ẢNH MẶT HÀNG --------------------------------//
    $scope.loadAnhMatHang = function() {
        if ($scope.matHang.idMatHang) {
            $http.get(`http://localhost:5159/api/AnhMatHangControllers/Get-All/${$scope.matHang.idMatHang}`)
                .then(response => {
                    if (response.data && response.data.length > 0) {
                        $scope.ListAnhMatHang = response.data;
                    } else {
                        $scope.ListAnhMatHang = [];
                    }
                })
                .catch(error => console.error("Lỗi khi lấy ảnh mặt hàng:", error));
        }
    };
    $scope.setImage = function ($file) {
        if ($scope.matHang.idMatHang) {
            var formData = new FormData();
            formData.append('file', $file);
            $http.post("http://localhost:5159/api/MatHangControllers/UploadImage/" + $scope.matHang.idMatHang, formData, {
                headers: { 'Content-Type': undefined }
            })
            .then(response => {
                alert("Ảnh mặt hàng đã được tải lên.");
                $scope.imageSrc = URL.createObjectURL($file);
            })
            .catch(error => console.error("Lỗi khi tải ảnh mặt hàng:", error));
        } else {
            $scope.imageSrc = URL.createObjectURL($file);
        }
    };
    $scope.triggerFileInput = function(event) {
        var inputFile = angular.element(event.target).siblings('input[type="file"]');
        inputFile[0].click();
    };
    $scope.handleFileChange = function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $scope.$apply(function() {
                    var itemIndex = 0; 
                    $scope.ListAnhMatHang[itemIndex].duongDan = e.target.result; 
                });
            };
            reader.readAsDataURL(file);
        }
    };



    //------------------- DANH MỤC --------------------------------//
    $scope.loadDanhMuc = function () {
        $http.get("http://localhost:5159/api/MatHangControllers/Get-All")
            .then(response => {
                $scope.listDanhMuc = response.data;
            })
            .catch(error => console.error("Lỗi khi tải mặt hàng:", error));
    };


    $scope.refresh = function () {
        $scope.matHang = {};
        $scope.listThongSo = [];
        $scope.showFormMH = false;
    };


});
