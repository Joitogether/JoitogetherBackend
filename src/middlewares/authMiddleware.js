// import { getAuth } from "firebase-admin/auth"



// export const authMiddleware = async (req, res, next) => {
//   const idToken = req.headers.authorization && req.headers.authorization.split(' ')[1]
//   if(!idToken){
//     return res.status(403).json({
//       message: '沒有提供id token',
//       status: 403
//     })
//   }

//   try{
//     const decodedToken = await getAuth().verifyIdToken(idToken)
//     req.user = decodedToken; // 解碼後的用戶資料會被放在 req.user 中
//     next()
//   }catch(err){
//     res.status(403).json({
//       message: 'Unauthorized' ,
//       status: 403,
//       err
//     })
//   }
// }