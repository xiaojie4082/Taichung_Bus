/*!
* Start Bootstrap - Bare v5.0.7 (https://startbootstrap.com/template/bare)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

// 全域變數
let currentRoute = '';
let currentDirection = '0';

// 頁面載入完成後執行
document.addEventListener('DOMContentLoaded', function() {
    // 從 URL 獲取路線和方向參數
    const params = new URLSearchParams(window.location.search);
    currentRoute = params.get('route');
    currentDirection = params.get('direction') || '0';

    // 載入公車資訊
    loadBusInfo();

    // 每60秒更新一次資料
    setInterval(loadBusInfo, 60000);
});

// 載入公車資訊
function loadBusInfo() {
    const routeTitle = document.getElementById('routeTitle');
    const routeInfo = document.getElementById('routeInfo');
    const scheduleTable = document.getElementById('scheduleTable').getElementsByTagName('tbody')[0];

    // 顯示載入中狀態
    routeTitle.textContent = '載入中...';
    routeInfo.textContent = '正在獲取路線資訊';
    scheduleTable.innerHTML = '<tr><td colspan="4" class="text-center">載入中...</td></tr>';

    // 構建 API URL
    const apiUrl = `https://tdx.transportdata.tw/api/basic/v2/Bus/EstimatedTimeOfArrival/City/Taichung?$filter=RouteName%2FZh_tw%20eq%20%27${currentRoute}%27%20and%20Direction%20eq%20%27${currentDirection}%27&$orderby=StopSequence%20asc&$top=100&$format=JSON`;

    // 發送 API 請求
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                throw new Error('找不到此路線的即時資訊，請確認路線編號是否正確');
            }

            // 更新路線標題
            const startStop = data[0].StopName.Zh_tw;
            const endStop = data[data.length - 1].StopName.Zh_tw;
            routeTitle.innerHTML = `
                <div class="d-flex align-items-center">
                    <span class="badge bg-primary me-2" style="font-size: 1.2rem;">${currentRoute}</span>
                    <div class="d-flex align-items-center">
                        <span>${startStop}</span>
                        <i class="bi bi-arrow-right mx-2"></i>
                        <span>${endStop}</span>
                    </div>
                </div>
            `;
            routeInfo.textContent = '即時更新中';

            // 清空表格
            scheduleTable.innerHTML = '';

            // 更新時刻表
            data.forEach(stop => {
                const time = parseInt(stop.EstimateTime / 60);
                let statusClass, statusText;

                if (isNaN(time)) {
                    statusClass = 'status-not-scheduled';
                    statusText = '未發車';
                } else if (time < 0) {
                    statusClass = 'status-departed';
                    statusText = '已離站';
                } else if (time < 3) {
                    statusClass = 'status-arriving';
                    statusText = '進站中';
                } else {
                    statusClass = 'status-waiting';
                    statusText = `${time} 分`;
                }

                const row = scheduleTable.insertRow();
                row.innerHTML = `
                    <td>${stop.StopName.Zh_tw}</td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                `;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            routeTitle.textContent = '載入失敗';
            routeInfo.textContent = error.message;
            scheduleTable.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center text-danger">
                        <i class="bi bi-exclamation-triangle me-2"></i>${error.message}
                    </td>
                </tr>
            `;
        });
}

// 重新整理資料
function refreshData() {
    loadBusInfo();
}

// 切換方向
function switchDirection() {
    currentDirection = currentDirection === '0' ? '1' : '0';
    const newUrl = `bus-route.html?route=${currentRoute}&direction=${currentDirection}`;
    window.location.href = newUrl;
}