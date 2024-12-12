import { cartService } from '../services/cartService.js'
import {
    AddToCartSchema,
    UpdateCartItemSchema,
    RemoveFromCartSchema,
    UserIdParamSchema,
  } from "../validations/cartSchema.js";


const fetchCartByUserId = async (req,res,next)=> {
    try {
        const userID =req.params.userId
        const cart =await cartService.getCartByUserId(userID)
        res.status(200).json({
            status:200,
            message:'購物車資料獲取成功',
            data:cart,
        })
    } catch (error){
        next(error);
    }
    }

const addActivityToCart = async (req,res,next) => {
    try{
        const userID =req.params.userID
        const {activityID,quantity}=req.body // 接收活動 ID 和數量
        const cart =await cartService.addToCart(userID,activityID,quantity)
    res.status(201).json({
        status:201,
        message:'成功新增至購物車',
        data:cart
        })
    } catch (error){
        next(error)
    }
    
    }


const updateCartInfo = async (req, res, next)=> {
    try{
        const userID =req.params.userID
        const {activityID,quantity}=req.body
        const cart =await cartService.updateCartItem(userID, activityID, quantity)
    res.status(200).json({
        status:200,
        message:'購物車更新成功',
        data:cart,
        })
    }  catch (error){
        next(error)
    }
}


const removeActivityFromCart = async(req, res , next)=>{
    try{
        const userID =req.params.userID;
        const activityID =req.params.activityId;
        await cartService.removeFromCart(userID,activityID)
        res.status(200).json({
            status:200,
            message:'成功一處購物車項目',
        })
    }catch(error){
        next(error)
    }
}


export {
    fetchCartByUserId,
    addActivityToCart,
    updateCartInfo,
    removeActivityFromCart,
};