import { TopupService } from "../services/topupService.js";
import paymentService from "../services/paymentService.js";
import { createSesEncrypt, createShaEncrypt, createSesDecrypt } from "../utils/payment.js";

//建立訂單＋加密訂單資料回傳前端
export const handleTopupProcess = async(req, res, next) => {
    try {
        const data = req.body;
        console.log('data',data);
        
        
        const TimeStamp = Math.round(new Date().getTime() / 1000);       
        const splice_uid = (data.topuper_id).slice(25) 
        const order = {
            ...data,
            Email: data.email,
            Amt: parseInt(data.amount),
            ItemDesc: data.type,
            TimeStamp,
            MerchantID: process.env.MerchantID,
            merchantOrderNo: `Joi${TimeStamp}Deposit${splice_uid}`,
            Version: process.env.Version,
            };
            const newTopupRecord = await TopupService.createTopup(order);
    
            const aesEncrypt = createSesEncrypt(order, newTopupRecord.id);
            const shaEncrypt = createShaEncrypt(aesEncrypt);
            order.aesEncrypt = aesEncrypt;
            order.shaEncrypt = shaEncrypt;
    
            res.status(200).json({
            status: 200,
            message: "訂單儲存成功＆加密成功",
            data: order,
            });
    
        } catch(error) {
        console.log(error);
        next(error);
        }
    }

export const getTopuperRecord = async(req, res, next) => {
    try {
        const result = await TopupService.getTopupRecordById(req.params.uid)
        if (!result || result.length === 0) {
            return res.status(404).json({
                message: "查無此資料",
                status: 404,
            });
            }
            res.status(200).json({
            message: "資料獲取成功",
            status: 200,
            data: result,
            });
    } catch (error) {
        next(error)
    }

}
// 接收藍新notify,更新該筆交易status，增加一筆錢包紀錄並更新錢包餘額
export const handleNewebpayNotify = async (req, res, next) => {
    try {
        const response = req.body;
        const decryptData = createSesDecrypt(response.TradeInfo);
        console.log('解密後的資料', decryptData);
        const createResponse = await TopupService.updateNewebpayOrder(decryptData)
        console.log('createResponse:', createResponse);
        
        if(createResponse.payment_status == 'SUCCESS') {
            //增加錢包餘額＋新增一筆錢包deposit紀錄
            const addDepositResponse = await paymentService.addDeposit(createResponse.topuper_id, createResponse.amount);
                const record = await paymentService.createPaymentRecord(
                createResponse.topuper_id,
                "deposit",
                createResponse.amount,
                addDepositResponse.balance
                );
                if(record){
                    return res.end("1|OK");
                }
        }
        } catch (error) {
        console.error('處理藍新notify發生錯誤：', error);
        }
    };
