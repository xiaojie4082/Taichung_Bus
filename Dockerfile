# 使用 Node.js 官方映像作為基礎
FROM node:18-alpine

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製所有源代碼
COPY . .

# 構建應用
RUN npm run build

# 使用 nginx 作為生產環境的 Web 服務器
FROM nginx:alpine

# 複製構建好的文件到 nginx 目錄
COPY --from=0 /app /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 啟動 nginx
CMD ["nginx", "-g", "daemon off;"] 