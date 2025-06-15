# 台中公車即時查詢系統

這是一個提供台中市公車路線即時到站資訊的網頁應用程式。系統整合了 TDX 運輸資料流通服務的即時公車資訊，並提供友善的使用者介面。

## 功能特點

- 🚌 即時公車到站資訊查詢
- 🎨 支援深色/淺色主題切換
- 📱 響應式設計，支援各種裝置
- 🔄 自動更新公車資訊（每分鐘更新一次）
- 📍 顯示公車路線起訖站資訊
- ⏰ 即時顯示公車到站時間
- 🎯 顯示公車進站狀態（進站中、已離站、未發車等）

## 技術架構

- 前端框架：HTML5、CSS3、JavaScript
- UI 框架：Bootstrap 5
- 圖示：Feather Icons
- 資料來源：TDX 運輸資料流通服務
- 資料庫：Firebase Realtime Database
- 分析工具：Firebase Analytics
- 容器化：Docker

## 使用方式

### 本地開發

1. 開啟首頁 `index.html`
2. 輸入欲查詢的公車路線編號
3. 選擇行駛方向（去程/返程）
4. 查看即時到站資訊

### 使用 Docker

1. 構建 Docker 映像：
   ```bash
   docker build -t taichung-bus .
   ```

2. 運行容器：
   ```bash
   docker run -d -p 80:80 taichung-bus
   ```

3. 在瀏覽器中訪問 `http://localhost` 即可使用系統

## 系統需求

- 支援的瀏覽器：
  - Google Chrome（建議使用）
  - Firefox
  - Safari
  - Microsoft Edge
- 需要網路連線以獲取即時資料
- 如需使用 Docker 版本，需要安裝 Docker 環境

## 開發者資訊

- 作者：xiaojie4082
- 版本：1.0.0
- 最後更新：2025

## 授權說明

Copyright © 2025 xiaojie4082. All rights reserved.

## 資料來源

本系統使用 [TDX 運輸資料流通服務](https://tdx.transportdata.tw/) 提供的即時公車資訊。

## 注意事項

- 系統每分鐘自動更新一次資料
- 如遇到 API 存取限制，系統會自動等待 30 秒後重試
- 建議使用最新版本的瀏覽器以獲得最佳使用體驗
- Docker 版本使用 nginx 作為 Web 服務器，確保最佳效能 