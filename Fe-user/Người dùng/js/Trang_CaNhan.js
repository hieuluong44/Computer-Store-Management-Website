// =====================   Hiển thị thông tin sản phẩm   ================= //
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".button");
    const tabs = document.querySelectorAll(".tab-content"); 
    const homeDiv = document.querySelector("#profile-container"); 

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


function togglePassword() {
    const passwordInput = document.getElementById('password');
    const showEye = document.getElementById('showEye');
    const hideEye = document.getElementById('hideEye');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showEye.style.display = 'none';
        hideEye.style.display = 'inline';
    } else {
        passwordInput.type = 'password';
        showEye.style.display = 'inline';
        hideEye.style.display = 'none';
    }
}



const fileInput = document.getElementById('fileInput');
        const avatarPreview = document.getElementById('avatarPreview');
        const avatarImage = document.getElementById('avatarImage');

        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];

            if (file) {
                if (file.size > 1024 * 1024) {
                    alert("Dung lượng file vượt quá 1 MB!");
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(e) {
                    avatarImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

