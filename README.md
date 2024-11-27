// Step 1. install packages 安裝所有依賴包
npm install

// Step 2. 在.env設定db連接URl
範例:
DATABASE_URL=mysql://<用戶名>:<密碼>@localhost:<port>/<table名>
DATABASE_URL=mysql://root:abc@localhost:3306/joitogether

注意:
server的port預設為3030，應該要與你的db server「不同」port

// Step 3. 於mysql匯入放置公用雲端資料夾的三個table  
users
applications
activities

// Step 4. 啟動伺服器 npm run dev

// Step 5. 可以打API了！
base url: http://localhost:3030  






Users:
// 獲得單一使用者資料
GET  /users/:id
// 新增使用者資料
POST /users/register
// 更改使用者資料
PUT /users/update/:id


Activities:
// 獲得單一活動資料
GET /activities/:id
// 獲得所有活動資料
GET /activities/
// 新增活動資料
POST /activities
// 取消單一活動
PUT /activities/cancel/:id


Applications:
// 獲得該活動所有報名資訊
GET /applications/:id
// 審核單筆報名
PUT /applications/:id