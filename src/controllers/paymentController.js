import { createSesEncrypt, createShaEncrypt } from "../utils/payment.js";

const paymentEncrytOrder = async (req, res, next) => {
  try{
    const data = req.body
    const TimeStamp = Math.round(new Date().getTime() / 1000);
    const order = {
      ...data,
      TimeStamp,
      Amt: parseInt(data.Amount),
      MerchantOrderNo: TimeStamp,
    };
    
    const aesEncrypt = createSesEncrypt(order)
    const shaEncrypt = createShaEncrypt(aesEncrypt)
    order.aesEncrypt = aesEncrypt;
    order.shaEncrypt = shaEncrypt;

    res.status(200).json({
      status: 200,
      message: '加密成功',
      data: order
    })
  }catch(error){
    console.log(error)
    next(error)
  }
}

export { paymentEncrytOrder }