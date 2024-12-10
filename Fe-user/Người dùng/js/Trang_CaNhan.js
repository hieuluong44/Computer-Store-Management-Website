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
    const passwordInput = document.getElementById('passwordInput');
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