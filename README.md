// Step 1. install packages
npm install

// Step 2. 在.env設定db連接URl
範例:
DATABASE_URL=mysql://<用戶名>:<密碼>@localhost:<port>/<table名>
DATABASE_URL=mysql://root:adc@localhost:3306/joitogether

// Step 3. 匯入table  
users, activities, participants
匯入這三個db

// Step 4. 啟動伺服器 npm un dev

// Step 5. 可以打API了！

base url: http://localhost:xxxx  


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
