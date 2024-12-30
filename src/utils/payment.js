import "dotenv/config";
import crypto from "crypto";

const RespondType = 'JSON'

// 使用 aes 對信用卡號等重要交易資訊行加密
export function createSesEncrypt(TradeInfo, id) {
  // encrypt是加密器,enc才是加密過後的字串  
  const encrypt = crypto.createCipheriv('aes-256-cbc', process.env.HASHKEY, process.env.HASHIV);
  // update開始加密，final完成加密，genDataChain將物件轉換成適合加密的格式
  const enc = encrypt.update(genDataChain(TradeInfo, id), 'utf8', 'hex');
  return enc + encrypt.final('hex');
}

// p.20,使用 sha256 加密，將aes加密字串產生檢查碼，並轉換為大寫，hash轉換過的文字無法再轉回
export function createShaEncrypt(aesEncrypt) {
  const hash = crypto.createHash('sha256');
  const plainText = `HashKey=${process.env.HASHKEY}&${aesEncrypt}&HashIV=${process.env.HASHIV}`;

  return hash.update(plainText).digest('hex').toUpperCase();
}

function genDataChain(order, id) {
  return `MerchantID=${process.env.MerchantID}&TimeStamp=${
  order.TimeStamp
  }&Version=${process.env.Version}&RespondType=${RespondType}&MerchantOrderNo=${
  order.merchantOrderNo
  }&Amt=${order.Amt}&NotifyURL=${encodeURIComponent(
  process.env.NotifyUrl,
  )}&ReturnURL=${encodeURIComponent(process.env.ReturnUrl + `/${id}`)}&ItemDesc=${encodeURIComponent(
  order.ItemDesc,
  )}&Email=${encodeURIComponent(order.Email)}`;
}
//解密
export function createSesDecrypt(TradeInfo) {
  const decrypt = crypto.createDecipheriv('aes256', process.env.HASHKEY, process.env.HASHIV);
  decrypt.setAutoPadding(false);
  const text = decrypt.update(TradeInfo, 'hex', 'utf8');
  const plainText = text + decrypt.final('utf8');
  const result = plainText.replace(/[\x00-\x20]+/g, '');
  return JSON.parse(result);
}