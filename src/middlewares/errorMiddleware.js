import { z } from 'zod'
export const errorMiddleware = (err, req, res, next) => {
  console.log(err)
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      message: '資料驗證發生錯誤',
      status: 400,
      error: err.issues
    });
  }


  if (err.code === 'P2002') {
    return res.status(400).json({
      message: '資料唯一性衝突',
      status: 400,
      error: err.message
    });
  }

  if (err.code === 'P2003') {
    return res.status(400).json({
      message: '外鍵約束失敗',
      status: 400,
      error: err.meta,
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      message: '查無此資料',
      status: 404
    });
  }

  res.status(500).json({
    message:  '伺服器發生錯誤',
    status: 500,
    error: err.message  
  })
}


