# JoitogetherBackend

[技術](#技術) • [開始使用](#開始使用) • [clone 專案](#clone-專案) • [配置.env 變數](#配置env-變數) • [開始](#開始) • [API 端點](#api-端點) • [成員](#成員)

## 技術

- axios
- dayjs
- express
- firebase
- mysql2
- socket.io
- swagger-autogen
- zod
- prisma
- node-cron

## 開始使用

1. 下載 MySQL
2. 設定用戶名及密碼
3. Google API Key
4. Firebase, project ID, email and private key
5. 開啟 vscode
6. clone 專案～

## clone 專案

```bash
git clone https://github.com/Joitogether/JoitogetherBackend.git
```

注意: server 的 port 預設為 3030，應該要與你的 db server「不同」port

## 配置.env 變數

- DATABASE_URL=
- FIREBASE_CLIENT_EMAIL=""
- FIREBASE_PRIVATE_KEY=""""
- FIREBASE_PROJECT_ID=""
- FRONTEND_URL=""
- GOOGLE_API_KEY=""
- HASHIV=""
- HASHKEY=""
- MerchantID=""
- NotifyUrl=""
- PayGateWay=""
- ReturnUrl=""
- Version=

## 開始

Step 1. install packages 安裝所有依賴包
npm install

Step 2. 在.env 設定 db 連接 URl

Step 3. 於 mysql 匯入放置公用雲端資料夾的三個 table

- users
- applications
- activities

Step 4. 聯動 db 啟動伺服器
npx prisma db pull
npx prisma generate

Step 5. 可以打 API 了！
base url: http://localhost:3030

## API 端點

http://localhost:3030/api-docs/

開啟前請先 npm run dev

## 成員

**王嘉駿 / Jun** -
[GitHub](https://github.com/Junwanghere)
[Email](change60201@gmail.com)

**黃芷妍 / Latte** -
[GitHub](https://github.com/Warmlatte)
[Email](latte.0975582420@gmail.com)

**李佳樺 / Helen** -
[GitHub](https://github.com/h-e-l-e-n)
[Email](leeleilei07@gmail.com)

**黃俊龍 / Roger** -
[GitHub](https://github.com/Roger0122)
[Email](a86527913@gmail.com)

**林侑萱 / Yuka** -
[GitHub](https://github.com/yucochann)
[Email](yuca.work@gmail.com)

**蔡庚志 / Evan** -
[GitHub](https://github.com/ggps9924114)
[Email](ggps9924114@gmail.com)

**柯宣宇 / Lance** -
[GitHub](https://github.com/Yellowaystry)
[Email](kk772641@gmail.com)
