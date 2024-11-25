export const errorMiddleware = (err, req, res, next) => {
  console.log(err.stack)
  res.status(500).json({
    message:  '伺服器發生錯誤',
    status: 500,
  })
}