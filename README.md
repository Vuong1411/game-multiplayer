# 🎮 Game Multiplayer

Một dự án game multiplayer sử dụng React (client) và Node.js (server) với Socket.IO cho kết nối thời gian thực.

## ✨ Chức năng

### 1. 👤 Quản lý tài khoản
- 🔐 Đăng ký/Đăng nhập user
- 👑 Phân quyền admin/user
- 📝 Quản lý profile

### 2. 📚 Quản lý nội dung
- 📦 CRUD bộ câu hỏi
- ❓ CRUD câu hỏi (hỗ trợ text và choice)
- 🖼️ Upload hình ảnh cho câu hỏi

### 3. 🎯 Quản lý game
- 🎲 Tạo phòng với PIN
- 🚪 Join phòng bằng PIN
- ⚡ Real-time gameplay
- ⏱️ Tính điểm theo thời gian trả lời
- 🏆 Bảng xếp hạng realtime
- 📊 Thống kê kết quả game

## 📂 Cấu trúc thư mục
```
game-multiplayer/
├── client/                 # 🖥️ Frontend React
│   ├── src/
│   │   ├── assets/         # 🎨 Hình ảnh, styles
│   │   ├── components/     # 🧩 Shared components
│   │   ├── pages/          # 📱 Game screens
│   │   ├── services/       # 🔌 API calls
│   │   ├── store/          # 🗄️ Global state
│   │   └── App.tsx         # 📱 Main app
│   ├── .env                # ⚙️ Frontend env vars
│   └── vite.config.ts      # 🛠️ Vite config
├── server/                 # 🖧 Backend Node.js
│   ├── src/
│   │   ├── config/         # ⚙️ Database & env config
│   │   ├── controllers/    # 🎮 Route handlers
│   │   ├── middleware/     # 🔒 Auth & validation
│   │   ├── models/         # 📊 Database models
│   │   ├── routes/         # 🛣️ API routes
│   │   ├── services/       # 💼 Business logic
│   │   ├── socket/         # 🔌 Socket.IO handlers
│   │   └── server.js       # 🚀 Main server
│   ├── database/
│   │   ├── migrations/    # 💾 Database scripts
│   │   └── seeders/       # 🌱 Sample data
│   └── .env               # ⚙️ Backend env vars
└── README.md
```

## 🚀 Cài đặt

1. 📥 Clone repository:
```bash
git clone https://github.com/Vuong1411/game-multiplayer.git
cd game-multiplayer
```

2. 📦 Cài đặt dependencies:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. 🗃️ Cấu hình database:
```bash
# Import database structure
cd server/database/migrations
mysql -u root -p game_multiplayer < script.sql
```

4. ⚙️ Cấu hình môi trường:
- Copy `.env.example` thành `.env` trong cả client và server
- Cập nhật các biến môi trường theo cài đặt local

## 🎯 Khởi động

1. 🖧 Chạy server:
```bash
cd server
npm run dev
```

2. 🖥️ Chạy client:
```bash
cd client
npm run dev
```

🌐 Ứng dụng sẽ chạy tại:
- 📱 Client: http://localhost:3000
- 🖧 Server: http://localhost:5000

## 🛠️ Công nghệ sử dụng
- 📱 Frontend: React, TypeScript, Socket.IO Client
- 🖧 Backend: Node.js, Express, Socket.IO
- 🗃️ Database: MySQL
- 🐳 Tools: Docker (optional)