// footer.html
$(document).ready(function() {
    // 현재 URL을 가져와서 활성화된 링크를 찾음
    var currentURL = window.location.href;

    $('.nav-link').each(function() {
        // 각 링크의 href 속성 값을 가져옴
        var linkURL = $(this).attr('href');

        // 현재 URL과 href 속성 값이 일치하는 경우 "active" 클래스를 추가함
        if (currentURL.indexOf(linkURL) !== -1) {
            $(this).addClass('active');
        }
    });
});

// 페이지 이동 버튼
const $topBtn = document.querySelector(".moveTopBtn");

// 버튼 클릭 시 맨 위로 이동
$topBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });  
}

const $bottomBtn = document.querySelector(".moveBottomBtn");

// 버튼 클릭 시 맨 아래로 이동
$bottomBtn.onclick = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
};

// about.html
window.onscroll = () => {
    const parentDiv = document.querySelector('.parent_div');
    const viewportHeight = window.innerHeight;
    const fromViewportToParentHeight = parentDiv.getBoundingClientRect().top;
    const scrolling = viewportHeight - fromViewportToParentHeight;
    // parentDiv의 height가 뷰포트 높이보다 크면 viewport로, 아닐경우 parentDiv로
    let divHeight = parentDiv.clientHeight > viewportHeight ? viewportHeight : parentDiv.clientHeight;
    let scrollRate = scrolling / divHeight * 100;

    if (scrolling / divHeight * 100 < 0) {
        scrollRate = 0;
    } else if (scrolling / divHeight * 100 > 100) {
        scrollRate = 100;
    }

    // 스타일 적용
    const childDiv = document.querySelector('.child_div');
    childDiv.style.transform = `scale(${scrollRate / 100})`;
};

// spending.html
// JSON 파일 로드
fetch("json/payment_data.json")
.then((response) => response.json())
.then((data) => {
    // 결제내역 데이터 가져오기
    const paymentData = data.paymentData;

    // 차트 데이터 설정
    const chartData = {
        datasets: [{
            backgroundColor: ['rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)', 
            'rgba(75, 192, 192, 0.2', 
            'rgba(153, 102, 255, 0.2)'],
            data: paymentData.map(item => item.amount)
        }],       
        labels: paymentData.map(item => item.category)
    };

    // 차트 생성
    var ctx1 = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx1, {
        type: 'pie',
        data: chartData,
        options: {}
    });

    // 결제내역 이미지 추가
    const receiptImgDiv = document.getElementById("receipt_img_div");
    paymentData.forEach(item => {
        const img = document.createElement("img");
        img.src = item.receiptImage;
        img.width = "380";
        receiptImgDiv.appendChild(img);
    });
})
.catch((error) => {
    console.error("JSON 파일을 로드하는 중 오류가 발생했습니다:", error);
});

// hanamoney.html
// JSON 파일 로드
fetch("json/chart_data.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("JSON 파일을 로드하는데 오류가 발생했습니다.");
        }
        return response.json();
    })
    .then((data) => {
        // 차트 데이터 설정
        const chartData = {
            labels: data.labels,
            datasets: [{
                label: '연간 소비내역',
                data: data.data,
                backgroundColor: data.backgroundColor,
                borderColor: data.borderColor,
                borderWidth: 1
            }]
        };

        // 차트 생성
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    })
    .catch((error) => {
        console.error("JSON 파일을 로드하는 중 오류가 발생했습니다:", error);
    });

// mypage.html
const loginForm = document.getElementById("login_form");
const loginButton = document.getElementById("login_form_submit");
const loginErrorMsg = document.getElementById("login_error_msg");
const errorSecondLine = document.getElementById("error_msg_second_line");

let errorCount = 0; // 비밀번호 오류 횟수를 저장할 변수

loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (validateLoginForm(username, password)) {
        // JSON 파일 로드
        fetch("json/users.json")
        .then((response) => response.json())
        .then((data) => {
            const users = data.users;
            const user = users.find((user) => user.username === username && user.password === password);

            if (user) {
            // 로그인 성공
            alert("로그인 성공");
            location.reload();
            } else {
            // 잘못된 아이디 또는 비밀번호 입력
            errorCount++;
            if (errorCount >= 5) {
                // 5회 연속 오류 시 접근 차단
                displayErrorMessage("접근이 차단되었습니다.");
                loginButton.disabled = true; // 로그인 버튼 비활성화
            } else {
                // 오류 메시지 표시
                displayErrorMessage("잘못된 아이디 또는 비밀번호 입력입니다.");
                // errorSecondLine.innerText = "패스워드 입력입니다. (오류 횟수: " + errorCount + ")";
            }
            }
        })
        // json 예외 처리
        .catch((error) => {
            console.error("JSON 파일을 로드하는 중 오류가 발생했습니다.", error);
            displayErrorMessage("로그인에 실패했습니다. 나중에 다시 시도해주세요.");
        });
    } else {
        displayErrorMessage("아이디와 비밀번호를 모두 입력해주세요.");
    }
    });

// 에러메시지 출력
function displayErrorMessage(message) {
loginErrorMsg.innerText = message;
loginErrorMsg.style.opacity = 1;
}

// 아이디와 비밀번호가 모두 입력되었는지 확인
function validateLoginForm(username, password) {
return username.trim() !== "" && password.trim() !== "";
}

// 아이디가 영문 & 숫자로 연결되어있는지 확인
function isUsernameValid(username) {
const regex = /^[a-zA-Z0-9]+$/;
return regex.test(username);
}