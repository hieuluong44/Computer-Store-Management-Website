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
    const homeDiv = document.querySelector("#NhapHang"); 

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


//  ======================= Biều đồ chart ======================= //
const ctx = document.querySelector('.activity-chart');
const ctx2 = document.querySelector('.prog-chart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
            label: 'Time',
            data: [8, 6, 7, 6, 10, 8, 4],
            backgroundColor: '#1e293b',
            borderWidth: 3,
            borderRadius: 6,
            hoverBackgroundColor: '#60a5fa'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                border: {
                    display: true
                },
                grid: {
                    display: true,
                    color: '#1e293b'
                }
            },
            y: {
                ticks: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad',
        }
    }
});

new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Class GPA',
            data: [6, 10, 8, 14, 6, 7, 4],
            borderColor: '#0891b2',
            tension: 0.4
        },
        {
            label: 'Aver GPA',
            data: [8, 6, 7, 6, 11, 8, 10],
            borderColor: '#ca8a04',
            tension: 0.4
        }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                grid: {
                    display: false,
                }
            },
            y: {
                ticks: {
                    display: false
                },
                border: {
                    display: false,
                    dash: [5, 5]
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad',
        }
    }
});





