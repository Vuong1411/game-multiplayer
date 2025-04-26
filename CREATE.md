## Khởi tạo dự án

### Bước 1: Tạo thư mục dự án
```bash
mkdir game-multiplayer
cd game-multiplayer
```

### Bước 2: Khởi tạo client với Vite
```bash
npm create vite@latest client -- --template react-ts
cd client
npm install

# Cài đặt dependencies cho client
npm install @reduxjs/toolkit react-redux
npm install react-router-dom
npm install @mui/material @emotion/react @emotion/styled
npm install socket.io-client axios sass
cd ..
```

### Bước 3: Khởi tạo server với Express
```bash
mkdir server
cd server

# Khởi tạo package.json
npm init -y

# Cài đặt dependencies cho server
npm install express cors dotenv mongoose socket.io
npm install mysql2
npm install jsonwebtoken bcryptjs
npm install --save-dev nodemon
cd ..
```

## Cấu hình files

### Server (.env)
```plaintext
PORT=5000
MONGODB_URI=mongodb://localhost:27017/game-multiplayer
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Client (.env)
```plaintext
VITE_API_URL=http://localhost:5000
VITE_WS_URL=ws://localhost:5000
```

### Client (vite.config.ts)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/ws': {
        target: 'ws://localhost:5000',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/ws/, '')
      }
    }
  }
})
```

## Khởi động ứng dụng

1. Khởi động MongoDB:
```bash
mongod
```

2. Khởi động Server:
```bash
cd server
npm run dev
```

3. Khởi động Client:
```bash
cd client
npm run dev
```

Ứng dụng sẽ chạy tại:
- Client: http://localhost:3000
- Server: http://localhost:5000