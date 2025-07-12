document.addEventListener('DOMContentLoaded', function() {
    
    // --- Data for interactive elements ---
    const detailContents = {
        detail1: "<strong>👑 왕실과 관제 격하:</strong> 원나라는 고려 국왕의 이름 앞에 '충(忠)' 자를 붙이도록 강요했습니다. 이는 '원나라에 충성하는 왕'이라는 의미를 담고 있습니다. 또한, '2성 6부'와 같던 고려의 중앙 정치 기구를 '1부 4사' 체제로 격하시켜 고려의 자주성을 훼손했습니다.",
        detail2: "<strong>🕵️ 다루가치 파견:</strong> 다루가치는 몽골 제국이 정복지에 파견하던 감독관입니다. 고려에서는 내정 간섭의 상징적인 존재로, 국정 전반에 막강한 영향력을 행사하며 고려 왕권을 위협했습니다.",
        detail3: "<strong>💸 공물과 공녀 요구:</strong> 원나라는 매, 인삼, 옷감 등 막대한 양의 물품을 정기적으로 요구했습니다. 특히, 결혼하지 않은 여성을 강제로 보내야 했던 '공녀' 제도는 고려 사회에 큰 상처와 고통을 남겼습니다.",
        detail4: "<strong>🗺️ 영토 상실:</strong> 원나라는 함경도 지역에 쌍성총관부, 평안도 지역에 동녕부, 제주도에 탐라총관부를 설치하여 100년 가까이 직접 지배했습니다. 이는 고려의 영토 주권을 심각하게 침해한 것이었습니다."
    };

    // --- Card click interaction ---
    const cards = document.querySelectorAll('.card');
    const detailDisplay = document.getElementById('detail-display');

    if (cards.length > 0 && detailDisplay) {
        cards.forEach(card => {
            const detailKey = card.getAttribute('data-detail');
            if(detailKey) {
                card.addEventListener('click', () => {
                    detailDisplay.innerHTML = `<p class="text-lg">${detailContents[detailKey]}</p>`;
                    detailDisplay.classList.remove('hidden');
                });
            }
        });
    }

    // --- Chart.js: Land Ownership Chart ---
    const landCtx = document.getElementById('landChart');
    if (landCtx) {
        new Chart(landCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['권문세족', '일반 백성', '국가'],
                datasets: [{
                    label: '전체 토지 중 소유 비율 (%)',
                    data: [70, 15, 15],
                    backgroundColor: ['#B4846C', '#E5B299', '#F8F0E5'],
                    borderColor: '#7D5A50',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                scales: {
                    x: { max: 100, ticks: { callback: value => value + '%' } },
                }
            }
        });
    }

    // --- Chart.js: Reform Result Chart ---
    const reformCtx = document.getElementById('reformChart');
    if (reformCtx) {
        new Chart(reformCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['자주성 회복 (성공)', '개혁의 좌절 (한계)'],
                datasets: [{
                    data: [45, 55],
                    backgroundColor: ['#7D5A50', '#E5B299'],
                    borderColor: '#FDFBF6',
                    borderWidth: 3,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ` ${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                onClick: (e, elements) => {
                    const reformDetail = document.getElementById('reform-detail');
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        reformDetail.classList.remove('hidden');
                        if (index === 0) { // 성공
                            reformDetail.innerHTML = "<p><strong>성공 요인:</strong> 원나라의 쇠퇴라는 국제 정세 변화와 공민왕의 강력한 의지가 결합되어 영토 회복, 왕권 강화 등 일부 성과를 거두었습니다.</p>";
                        } else { // 한계
                            reformDetail.innerHTML = "<p><strong>실패 요인:</strong> 권문세족의 극심한 반발, 잦은 홍건적과 왜구의 침입, 그리고 결국 개혁의 동반자였던 신돈마저 제거되면서 개혁은 동력을 잃고 중단되었습니다.</p>";
                        }
                    }
                }
            }
        });
    }
    
    // --- Navigation scroll handling ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNav = document.getElementById('mobile-nav');

    function changeNav() {
        let index = sections.length;
        while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
        
        navLinks.forEach((link) => link.classList.remove('active'));
        if (navLinks[index]) {
            navLinks[index].classList.add('active');
            if(mobileNav) mobileNav.selectedIndex = index;
        }
    }

    window.addEventListener('scroll', changeNav);
    changeNav(); // Initial check

    if(mobileNav) {
        mobileNav.addEventListener('change', (e) => {
            const targetId = e.target.value;
            const targetElement = document.querySelector(targetId);
            if(targetElement) targetElement.scrollIntoView();
        });
    }

    // Smooth scroll for anchor links (if not handled by CSS)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if(targetElement) targetElement.scrollIntoView();
        });
    });

});