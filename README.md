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

// Step 4. 聯動db 啟動伺服器 
npx prisma db pull
npx prisma generate

npm run dev

// Step 5. 可以打API了！
base url: http://localhost:3030  






Users:
// 獲得所有使用者資料
GET /users
// 獲得單一使用者資料
GET  /users/:id
// 新增使用者資料
POST /users/register
data = {
  使用者資料
}
// 更改使用者資料
PUT /users/update/:id


Activities:
// 獲得單一活動資料
GET /activities/:id
// 獲得所有活動資料
GET /activities/
// 新增活動資料
POST /activities
data = {
  活動資料
}
// 取消單一活動
PUT /activities/cancel/:id
POST /activities/comment/:activity_id
{ participant_id, comment }
DELETE /activities/comment/:comment_id

Applications:
// 獲得該活動所有報名資訊
GET /applications/:activity_id
// 報名活動
POST /applications/register/:activity_id
data = {
  使用者id
  報名評論
}
// 取消報名
PUT /applications/cancel/:activity_id
// 審核單筆報名
PUT /applications/verify/:application_id
data = {
  status: registered/approved/host_declined/participant_cancelled
}

Posts:
// 新增貼文
POST /posts/
{
    "post_title": "上個禮拜去玩水好讚喔",
    "post_content": "上禮拜我們一群人一起去玩水，結果人超多的啦",
    "uid": "7P6ocyCefPc8oTzjfAEs16RZThR",
    "post_category": "Travel",
    "post_status": "onEdit",
    "post_img": "https://tse3.mm.bing.net/th?id=OIP.lvtKu4xQC80LcJUgC2qw3gHaE8&pid=Api&P=0&h=180"
}

// 新增貼文留言
POST /posts/comment/:post_id
{
    "uid": "abcd1234efgh5678",
    "comment_content": "超同意的啦" 
}