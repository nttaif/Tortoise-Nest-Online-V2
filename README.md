# Tortoise-Nest-Online-V2

> Tortoise-Nest-Online-V2 là một nền tảng học trực tuyến (Learning Management System) được phát triển bằng **NestJS** cho backend và **Next.js** cho frontend. Dự án bao gồm các tính năng quản lý khóa học, bài học, học viên, giảng viên, giao dịch thanh toán và báo cáo tài chính.

---

## 🚀 Tổng quan

- **Mục tiêu:** Xây dựng hệ thống quản lý lớp học trực tuyến đầy đủ chức năng cho cả vai trò Admin, Teacher và Student.
- **Tính năng chính:** Đăng ký/đăng nhập, quản lý khóa học, quản lý học viên/giảng viên, lịch học, bài giảng (lessons), thanh toán, báo cáo, và hệ thống quyền hạn (roles/guards).

## 🧩 Kiến trúc & Công nghệ

- Frontend: **Next.js**, TypeScript, Tailwind CSS
- Backend: **NestJS**, TypeScript, MongoDB (mongoose)
- Monorepo: cấu trúc gồm `client/` (Next.js) và `server/` (NestJS)
- Các thư mục chính:
  - `client/`: ứng dụng frontend, UI components, pages, hooks, APIs client
  - `server/`: dịch vụ backend, module, controllers, services, database config, seeds
  - `packages/`: shared-types giữa các phần

## ⚙️ Cài đặt & Chạy ứng dụng (Phát triển)

Yêu cầu:
- Node.js (>=16)
- Yarn hoặc npm
- MongoDB (local hoặc kết nối đến cluster)

1. Clone repo

```bash
git clone <repo-url>
cd Tortoise-Nest-Online-V2
```

2. Cài đặt dependencies

```bash
# Ở thư mục gốc dùng pnpm / yarn workspaces / npm install tùy cấu hình mono-repo
pnpm install
# hoặc
yarn install
# hoặc
npm install
```

3. Chạy backend (server)

```bash
cd server
# thiết lập biến môi trường (ví dụ .env hoặc config tương ứng)
npm run start:dev
```

4. Chạy frontend (client)

```bash
cd client
# thiết lập biến môi trường (NEXT_PUBLIC_...)
npm run dev
# truy cập http://localhost:3000
```

> Lưu ý: kiểm tra `server/.env` và `client/.env` (nếu có) để cấu hình kết nối DB, JWT, API keys, v.v.

## 🧪 Kiểm thử

- Backend: dùng Jest + e2e tests (xem `server/test`)
- Frontend: có thể thêm unit/integration tests theo yêu cầu

## 🗂 Một số file và thư mục quan trọng

- `client/src/app` - routing và pages chính cho ứng dụng Next.js
- `client/src/components` - UI và component tái sử dụng
- `server/src/module` - các module: `auth`, `courses`, `enrollments`, `lessons`, `transactions`, `user`...
- `server/src/database` - cấu hình mongoose, seeds
- `packages/shared-types` - các kiểu TypeScript chia sẻ

## 📦 Scripts thường dùng

- `npm run dev` / `pnpm dev` (ở `client/`): chạy frontend dev server
- `npm run start:dev` (ở `server/`): chạy backend NestJS ở môi trường development
- `npm run build` / `npm run start` tương ứng cho môi trường production

## 🛠 Gợi ý triển khai

- Dùng Docker cho MongoDB hoặc môi trường production
- Triển khai frontend trên Vercel / Netlify, backend trên Heroku / DigitalOcean / Render hoặc container-based services
- Thiết lập CI/CD cho tests và build

## 🤝 Đóng góp

Xin chào mừng mọi đóng góp!
- Fork repository -> tạo branch feature -> mở PR
- Viết unit tests cho các thay đổi lớn
- Ghi rõ mô tả và cách kiểm thử trong PR

## 📬 Liên hệ

Nếu cần giải thích thêm hoặc hỗ trợ, mở issue hoặc liên hệ trực tiếp với đội phát triển repository.
