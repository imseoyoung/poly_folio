<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        tr:nth-child(odd) {
            background-color: #f2f2f2; /* 홀수 행 배경색 */
        }
        tr:nth-child(even) {
            background-color: #ffffff; /* 짝수 행 배경색 */
        }
        tr:first-child th {
            background-color: #000000; /* 첫 번째 행 배경색 */
            color: #ffffff; /* 첫 번째 행 텍스트 색상 */
            text-align: center;
        }
        .pagination {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
        .pagination button {
            margin: 0 5px;
            padding: 5px 10px;
            border: none;
            background-color: #f2f2f2;
            cursor: pointer;
        }
        .pagination button.active {
            background-color: #ccc;
        }
        tr.selected {
            background-color: rgb(255, 255, 185); /* 선택한 행 배경색 */
        }
    </style>
</head>
<body>
    <!-- table -->
    <table id="myTable">
        <thead>
            <tr>
                <th><input type="checkbox" id="selectAll"></th> <!-- 체크박스를 위한 빈 열 -->
                <th>ID</th>
                <th>타이틀</th>
            </tr>
        </thead>
        <tbody draggable="true">
        </tbody>
    </table>
    
    <div class="pagination"></div>

    <script>
        const dataPerPage = 10; // 페이지당 데이터 수
        let currentPage = 1; // 현재 페이지
        let selectedRows = []; // 선택된 행들

        fetch('data.json')
        .then((response) => response.json())
        .then((data) => {
            const table = document.getElementById('myTable');
            const tbody = table.getElementsByTagName('tbody')[0];

            let totalPages = Math.ceil(data.length / dataPerPage); // 전체 페이지 수

            // 특정 페이지의 데이터를 테이블에 추가하는 함수
            function displayData(page) {
                tbody.innerHTML = ''; // 테이블 비우기

                let startIndex = (page - 1) * dataPerPage; // 시작 인덱스
                let endIndex = startIndex + dataPerPage; // 끝 인덱스

                for (let i = startIndex; i < endIndex; i++) {
                    if (i >= data.length) {
                        break;
                    }

                    const row = tbody.insertRow(i - startIndex);
                    row.draggable = true; // 드래그 가능하도록 설정
                    row.addEventListener('dragstart', () => {
                        selectedRows = []; // 드래그할 때 선택된 행 초기화
                        selectedRows.push(row); // 드래그하는 행 추가
                    });

                    const checkboxCell = row.insertCell(0); // 체크박스 열
                    const idCell = row.insertCell(1); // ID 열
                    const titleCell = row.insertCell(2);

                    checkboxCell.innerHTML = '<input type="checkbox" class="dataCheckbox">';
                    idCell.innerHTML = data[i].id;
                    titleCell.innerHTML = data[i].title;

                    // 체크박스 변경 이벤트 핸들러
                    const checkbox = row.querySelector('.dataCheckbox');
                    checkbox.addEventListener('change', () => {
                        if (checkbox.checked) {
                            row.classList.add('selected'); // 선택한 행에 클래스 추가
                        } else {
                            row.classList.remove('selected'); // 선택 취소한 행에서 클래스 제거
                        }
                    });
                }
            }

            // 페이지네이션 버튼 생성 및 이벤트 핸들러 설정
            function setupPagination() {
                const paginationContainer = document.querySelector('.pagination');

                // 이전 페이지로 이동하는 버튼
                const prevButton = document.createElement('button');
                prevButton.innerText = 'Previous';
                prevButton.addEventListener('click', () => {
                    if (currentPage > 1) {
                        currentPage--;
                        displayData(currentPage);
                        updatePaginationButtons();
                    }
                });
                paginationContainer.appendChild(prevButton);

                // 페이지 버튼 생성
                for (let i = 1; i <= totalPages; i++) {
                    const pageButton = document.createElement('button');
                    pageButton.innerText = i;
                    pageButton.addEventListener('click', () => {
                        currentPage = i;
                        displayData(currentPage);
                        updatePaginationButtons();
                    });
                    paginationContainer.appendChild(pageButton);
                }

                // 다음 페이지로 이동하는 버튼
                const nextButton = document.createElement('button');
                nextButton.innerText = 'Next';
                nextButton.addEventListener('click', () => {
                    if (currentPage < totalPages) {
                        currentPage++;
                        displayData(currentPage);
                        updatePaginationButtons();
                    }
                });
                paginationContainer.appendChild(nextButton);

                updatePaginationButtons();
            }

            // 현재 페이지에 따라 페이지네이션 버튼 스타일 변경
            function updatePaginationButtons() {
                const buttons = document.querySelectorAll('.pagination button');
                buttons.forEach((button) => button.classList.remove('active'));
                buttons[currentPage].classList.add('active');
            }

            // 전체 선택 및 선택 해제를 위한 체크박스 이벤트 핸들러
            const selectAllCheckbox = document.getElementById('selectAll');
            selectAllCheckbox.addEventListener('change', () => {
                const dataCheckboxes = document.getElementsByClassName('dataCheckbox');
                for (let i = 0; i < dataCheckboxes.length; i++) {
                    dataCheckboxes[i].checked = selectAllCheckbox.checked;

                    const row = dataCheckboxes[i].parentNode.parentNode;
                    if (selectAllCheckbox.checked) {
                        row.classList.add('selected'); // 선택한 행에 클래스 추가
                    } else {
                        row.classList.remove('selected'); // 선택 취소한 행에서 클래스 제거
                    }
                }
            });

            // 드래그 앤 드롭 이벤트 핸들러
            tbody.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            tbody.addEventListener('drop', (e) => {
                e.preventDefault();
                const targetRow = e.target.closest('tr'); // 드롭된 위치의 가장 가까운 tr 요소 찾기
                if (targetRow && selectedRows.length > 0) {
                    const currentIndex = Array.from(tbody.children).indexOf(selectedRows[0]); // 현재 선택된 행의 인덱스
                    const targetIndex = Array.from(tbody.children).indexOf(targetRow); // 드롭된 위치의 행의 인덱스

                    if (currentIndex !== targetIndex) {
                        const selectedData = [];
                        selectedRows.forEach((row) => {
                            selectedData.push(row.innerHTML); // 선택된 행의 HTML 내용 저장
                            row.remove(); // 선택된 행 제거
                        });

                        tbody.insertBefore(document.createElement('tr'), tbody.children[targetIndex]); // 드롭된 위치에 임시 행 삽입

                        const tempRow = tbody.children[targetIndex];
                        selectedData.forEach((html) => {
                            tempRow.insertAdjacentHTML('beforebegin', html); // 드롭된 위치 이전에 선택된 행들을 삽입
                        });

                        tempRow.remove(); // 임시 행 제거
                        selectedRows = []; // 선택된 행 초기화
                        updatePaginationButtons();
                    }
                }
            });

            displayData(currentPage);
            setupPagination();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    </script>
</body>
</html>