import { TopupService } from "../services/topupService.js";


export const saveTopupDetail = async(req, res, next) => {
    const data = req.body;
    try {
    const newTopupRecord = await TopupService.createTopup(data);
    res.status(201).json({
        status: 201,
        data: newTopupRecord,
    });

} catch(error) {
    next(error)
    }
}

export const getTopupRecord = async(req, res, next) => {
    try {
        const result = await TopupService.getTopupById(req.params.uid)
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