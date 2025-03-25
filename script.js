document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdown.addEventListener('click', function(event) {
        event.preventDefault();
        dropdownMenu.classList.toggle('show'); // 'show' 클래스를 토글하여 보이거나 숨김
    });

    // 다른 곳을 클릭하면 드롭다운을 닫기 위해 이벤트 리스너 추가
    document.addEventListener('click', function(event) {
        if (!dropdown.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});

// eventbanner 슬라이더
let currentIndexEvent = 0;

const eventSlides = document.querySelector('.slides');
const totalEventSlides = document.querySelectorAll('.slides a').length;

document.querySelector('.next').addEventListener('click', () => {
    if (currentIndexEvent < totalEventSlides - 2) { // 마지막 슬라이드에서 2번째 마지막 슬라이드까지만 이동
        currentIndexEvent++;
        updateEventSlidePosition();
    }
});

document.querySelector('.prev').addEventListener('click', () => {
    if (currentIndexEvent > 0) {
        currentIndexEvent--;
        updateEventSlidePosition();
    }
});

function updateEventSlidePosition() {
    const eventSlideWidth = document.querySelector('.eventbanner').clientWidth / 2; // 한 슬라이드의 너비
    eventSlides.style.transform = `translateX(-${currentIndexEvent * (eventSlideWidth + 10)}px)`; // 슬라이드 간 간격을 포함한 이동 계산
}

// 자동 슬라이드 기능 (eventbanner)
setInterval(() => {
    if (currentIndexEvent < totalEventSlides - 2) {
        currentIndexEvent++;
    } else {
        currentIndexEvent = 0;
    }
    updateEventSlidePosition();
}, 3000); // 3초마다 슬라이드

// 버튼 누르면 색이 바뀌는 기능
document.querySelectorAll('.swiper-wrapper button').forEach(button => {
    button.addEventListener('click', function() {
        // 이미 활성화된 버튼이 있을 경우, 이를 원상복귀
        const activeButton = document.querySelector('.swiper-wrapper button.active');
        if (activeButton && activeButton !== this) {
            activeButton.classList.remove('active');
        }
        // 클릭한 버튼의 상태를 토글
        this.classList.toggle('active');
    });
});

// tourSlider 슬라이더
const slider1 = document.getElementById('slider1');
const slider2 = document.getElementById('slider2');
const packageBtn = document.getElementById('packageBtn');
const soldOutBtn = document.getElementById('soldOutBtn');

// '품절임박' 버튼 클릭 시 첫 번째 슬라이더를 표시
soldOutBtn.addEventListener('click', () => {
    slider1.style.display = 'block'; // 첫 번째 슬라이더 표시
    slider2.style.display = 'none';  // 두 번째 슬라이더 숨기기
});

// '패키지' 버튼 클릭 시 두 번째 슬라이더를 표시
packageBtn.addEventListener('click', () => {
    slider1.style.display = 'none';  // 첫 번째 슬라이더 숨기기
    slider2.style.display = 'block'; // 두 번째 슬라이더 표시
});

// 각 슬라이더에 대한 슬라이드 이동 코드
function initSlider(wrapperClass, prevButtonClass, nextButtonClass) {
    const tsliderWrapper = document.querySelector(wrapperClass);
    const tslides = tsliderWrapper.querySelectorAll('.tslide');
    const tprevButton = document.querySelector(prevButtonClass);
    const tnextButton = document.querySelector(nextButtonClass);

    let tcurrentSlide = 0;
    const ttotalSlides = tslides.length;
    const tslidesPerView = 3;
    const tslideInterval = 3000;

    function tupdateSlider() {
        const tslideWidth = tslides[0].offsetWidth;
        tsliderWrapper.style.transform = `translateX(-${tcurrentSlide * tslideWidth}px)`;
    }

    tnextButton.addEventListener('click', () => {
        if (tcurrentSlide < ttotalSlides - tslidesPerView) {
            tcurrentSlide += tslidesPerView;
            tupdateSlider();
        } else {
            tcurrentSlide = 0;
            tupdateSlider();
        }
    });

    tprevButton.addEventListener('click', () => {
        if (tcurrentSlide > 0) {
            tcurrentSlide -= tslidesPerView;
            tupdateSlider();
        } else {
            tcurrentSlide = ttotalSlides - tslidesPerView;
            tupdateSlider();
        }
    });

    setInterval(() => {
        if (tcurrentSlide < ttotalSlides - tslidesPerView) {
            tcurrentSlide += tslidesPerView;
        } else {
            tcurrentSlide = 0;
        }
        tupdateSlider();
    }, tslideInterval);

    tupdateSlider();
}

// 두 슬라이더에 대해 각각 초기화
initSlider('.tslider-wrapper', '#slider1 .tprev', '#slider1 .tnext');
initSlider('.tslider-wrapper2', '#slider2 .tprev', '#slider2 .tnext');

//w투어 슬라이더
const productSlider = document.querySelector('.product-grid');  // 슬라이더 요소 참조
const productCards = document.querySelectorAll('.product-card'); // 카드 요소들 참조
const productPrevButton = document.querySelector('.pprev');      // 이전 버튼 참조
const productNextButton = document.querySelector('.pnext');      // 다음 버튼 참조

const productItemsPerView = 4;
let productCardWidth = productCards[0].offsetWidth;
const productGap = 16;
const totalProductCards = productCards.length;

let currentProductIndex = 0;

// 슬라이드 가능한 최대 인덱스 계산
const productMaxIndex = totalProductCards - productItemsPerView;

function updateProductButtons() {
    productPrevButton.style.display = currentProductIndex === 0 ? 'none' : 'flex';
    productNextButton.style.display = currentProductIndex >= productMaxIndex ? 'none' : 'flex';
}

function showProductSlide(index) {
    if (index < 0 || index > productMaxIndex) return;

    const moveAmount = index * (productCardWidth + productGap);
    productSlider.style.transform = `translateX(-${moveAmount}px)`; 
    currentProductIndex = index;
    updateProductButtons();
}

function nextProductSlide() {
    if (currentProductIndex < productMaxIndex) {
        showProductSlide(currentProductIndex + 1);
    }
}

function prevProductSlide() {
    if (currentProductIndex > 0) {
        showProductSlide(currentProductIndex - 1);
    }
}

productNextButton.addEventListener('click', nextProductSlide);
productPrevButton.addEventListener('click', prevProductSlide);

// 버튼의 초기 상태를 설정
updateProductButtons();

// 창 크기가 변경되었을 때 카드 너비 재계산
window.addEventListener('resize', () => {
    productCardWidth = productCards[0].offsetWidth;
    showProductSlide(currentProductIndex);
});


//티켓 랭킹 슬라이더
const musicalBtn = document.getElementById('musical-btn');
const concertBtn = document.getElementById('concert-btn');

const rankslide1 = document.querySelector('.rankslide');
const rankslide2 = document.querySelector('.rankslide2');

function showSlide(slideToShow) {
    // 모든 슬라이드를 숨김
    rankslide1.style.display = 'none';
    rankslide2.style.display = 'none';

    // 특정 슬라이드만 보이도록 설정
    slideToShow.style.display = 'block';
}

// 슬라이드 1을 위한 슬라이더 함수들
const ticketSlider1 = document.querySelector('.rankslide .rankslides'); // rankslide1의 슬라이더 요소
const ticketItems1 = ticketSlider1.querySelectorAll('a'); // rankslide1의 모든 항목
const ticketPrevButton1 = document.querySelector('.rankslide .rprev'); // rankslide1의 이전 버튼
const ticketNextButton1 = document.querySelector('.rankslide .rnext'); // rankslide1의 다음 버튼

const ticketItemsPerView = 4;
const totalTicketItems1 = ticketItems1.length;
let currentTicketIndex1 = 0;

function updateTicketButtons1() {
    ticketPrevButton1.style.display = currentTicketIndex1 === 0 ? 'none' : 'flex';
    ticketNextButton1.style.display = currentTicketIndex1 >= totalTicketItems1 - ticketItemsPerView ? 'none' : 'flex';
}

function showTicketSlide1(index) {
    if (index < 0 || index > totalTicketItems1 - ticketItemsPerView) return;

    const itemWidth = ticketItems1[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(ticketSlider1).gap);
    const moveAmount = index * (itemWidth + gap);
    ticketSlider1.style.transform = `translateX(-${moveAmount}px)`;
    currentTicketIndex1 = index;
    updateTicketButtons1();
}

function nextTicketSlide1() {
    if (currentTicketIndex1 < totalTicketItems1 - ticketItemsPerView) {
        showTicketSlide1(currentTicketIndex1 + ticketItemsPerView);
    }
}

function prevTicketSlide1() {
    if (currentTicketIndex1 > 0) {
        showTicketSlide1(currentTicketIndex1 - ticketItemsPerView);
    }
}

ticketNextButton1.addEventListener('click', nextTicketSlide1);
ticketPrevButton1.addEventListener('click', prevTicketSlide1);

showTicketSlide1(0); // 슬라이드1 초기 위치 설정

// 슬라이드 2를 위한 슬라이더 함수들
const ticketSlider2 = document.querySelector('.rankslide2 .rankslides2'); // rankslide2의 슬라이더 요소
const ticketItems2 = ticketSlider2.querySelectorAll('a'); // rankslide2의 모든 항목
const ticketPrevButton2 = document.querySelector('.rankslide2 .rprev'); // rankslide2의 이전 버튼
const ticketNextButton2 = document.querySelector('.rankslide2 .rnext'); // rankslide2의 다음 버튼

const totalTicketItems2 = ticketItems2.length;
let currentTicketIndex2 = 0;

function updateTicketButtons2() {
    ticketPrevButton2.style.display = currentTicketIndex2 === 0 ? 'none' : 'flex';
    ticketNextButton2.style.display = currentTicketIndex2 >= totalTicketItems2 - ticketItemsPerView ? 'none' : 'flex';
}

function showTicketSlide2(index) {
    if (index < 0 || index > totalTicketItems2 - ticketItemsPerView) return;

    const itemWidth = ticketItems2[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(ticketSlider2).gap);
    const moveAmount = index * (itemWidth + gap);
    ticketSlider2.style.transform = `translateX(-${moveAmount}px)`;
    currentTicketIndex2 = index;
    updateTicketButtons2();
}

function nextTicketSlide2() {
    if (currentTicketIndex2 < totalTicketItems2 - ticketItemsPerView) {
        showTicketSlide2(currentTicketIndex2 + ticketItemsPerView);
    }
}

function prevTicketSlide2() {
    if (currentTicketIndex2 > 0) {
        showTicketSlide2(currentTicketIndex2 - ticketItemsPerView);
    }
}

ticketNextButton2.addEventListener('click', nextTicketSlide2);
ticketPrevButton2.addEventListener('click', prevTicketSlide2);

showTicketSlide2(0); // 슬라이드2 초기 위치 설정

// 버튼 클릭 이벤트 핸들러
musicalBtn.addEventListener('click', function() {
    showSlide(rankslide1);
    musicalBtn.classList.add('active');
    concertBtn.classList.remove('active');
    showTicketSlide1(0); // 슬라이드1 초기화
});

concertBtn.addEventListener('click', function() {
    showSlide(rankslide2);
    concertBtn.classList.add('active');
    musicalBtn.classList.remove('active');
    showTicketSlide2(0); // 슬라이드2 초기화
});

// 초기 상태 설정
showSlide(rankslide1); // 뮤지컬 슬라이드 기본 표시