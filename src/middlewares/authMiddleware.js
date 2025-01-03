import { auth } from "../config/firebase.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({
      status: 403,
      message: "沒有提供 Authorization header",
    });
  }

  const idToken = authHeader.split(" ")[1];
  if (!idToken) {
    return res.status(403).json({
      status: 403,
      message: "沒有提供 id token",
    });
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken; // 將用戶信息保存到請求對象
    next();
  } catch (err) {
    res.status(403).json({
      status: 403,
      message: "無效的憑證",
      error: err.message,
    });
  }
};
