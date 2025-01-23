document.getElementById('profile-img').addEventListener('click', function() {
    document.getElementById('HinhAnh').click();
});

document.getElementById('HinhAnh').addEventListener('change', function(event) {
    if (event.target.files.length > 0) {
        // Xử lý file ảnh đã chọn
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-img').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});




// ========================  Mở menu   ===================== //
const menuItems = document.querySelectorAll('.menu-content');
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        
        if (isActive) {
            this.classList.remove('active');
        } else {
            menuItems.forEach(i => i.classList.remove('active')); 
            this.classList.add('active'); 
        }
    });
});


// =====================   Hiển thị thông tin sản phẩm   ================= //
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".button");
    const tabs = document.querySelectorAll(".tab-content"); 
    const homeDiv = document.querySelector("#Home"); 

    if (homeDiv) {
        homeDiv.style.display = "block"; 
    }

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const tabId = button.getAttribute("data-tab"); 

            tabs.forEach(tab => {
                tab.classList.remove("active");
                tab.style.display = "none"; 
            });

            const activeTab = document.getElementById(tabId); 
            if (activeTab) {
                activeTab.classList.add("active");
                activeTab.style.display = "block"; 
            }
        });
    });
});





