const fs = require('fs');
const path = require('path');
require('dotenv').config();

// 讀取 config.js 模板
const configTemplate = fs.readFileSync(path.join(__dirname, 'js', 'config.js'), 'utf8');

// 替換環境變數
const configContent = configTemplate.replace(/process\.env\.(\w+)/g, (match, key) => {
    return process.env[key] || match;
});

// 確保 dist 目錄存在
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

// 要排除的目錄和文件
const excludeDirs = ['.git', 'node_modules', 'dist'];
const excludeFiles = ['.env', 'build.js', 'package.json', 'package-lock.json'];

// 複製所有檔案到 dist 目錄
function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        // 跳過要排除的目錄和文件
        if (entry.isDirectory()) {
            if (!excludeDirs.includes(entry.name)) {
                copyDir(srcPath, destPath);
            }
        } else if (!excludeFiles.includes(entry.name)) {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// 複製所有檔案
copyDir('.', 'dist');

// 寫入處理過的 config.js
fs.writeFileSync(path.join('dist', 'js', 'config.js'), configContent); 