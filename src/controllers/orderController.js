import { orderService } from "../services/orderService.js";

const fetchAllOrders = async (_req, res, next) => {
  try {
    const response = await orderService.getAllOrders();
    if (!response || response.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "查無資料",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "資料獲取成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const fetchOrderById = async (req, res, next) => {
  try {
    const order_id = parseInt(req.params.order_id);
    const response = await orderService.getOrderById(order_id);
    if (!response || response.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "查無此資料",
      });
    }
    res.status(200).json({
      status: 200,
      message: "資料獲取成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const addOrder = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await orderService.createOrder(data);
    res.status(201).json({
      status: 201,
      message: "資料創建成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export { fetchAllOrders, fetchOrderById, addOrder };
