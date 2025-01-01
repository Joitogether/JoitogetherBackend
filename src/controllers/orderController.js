import { orderService } from "../services/orderService.js";

const fetchAllOrders = async (_req, res, next) => {
  try {
    const response = await orderService.getAllOrders();

    if (!response || response.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "查無資料",
        data: [],
      });
    }
    res.status(200).json({
      status: 200,
      message: "成功取得資料",
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
      return res.status(200).json({
        status: 200,
        message: "查無資料",
        data: [],
      });
    }
    res.status(200).json({
      status: 200,
      message: "成功取得資料",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const fetchPendingOrder = async (req, res, next) => {
  const { uid } = req.params;
  try {
    const response = await orderService.getPendingOrder(uid);

    if (!response || response.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "查無此資料",
        data: [],
      });
    }

    res.status(200).json({
      status: 200,
      message: "成功取得資料",
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

    if (!response) {
      return res.status(400).json({
        status: 400,
        message: "資料建立失敗",
        data: null,
      });
    }

    res.status(201).json({
      status: 201,
      message: "資料建立成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const completeOrder = async (req, res, next) => {
  try {
    const order_id = parseInt(req.params.order_id);
    const { order_status } = req.body;

    const response = await orderService.updateOrderStatus(
      order_id,
      order_status
    );

    res.status(201).json({
      status: 201,
      message: "訂單完成",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const failOrder = async (req, res, next) => {
  try {
    const order_id = parseInt(req.params.order_id);
    const { order_status } = req.body;

    const response = await orderService.updateOrderStatus(
      order_id,
      order_status
    );

    res.status(201).json({
      status: 201,
      message: "訂單失敗",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    const order_id = parseInt(req.params.order_id);
    const { order_status } = req.body;

    const response = await orderService.updateOrderStatus(
      order_id,
      order_status
    );

    res.status(201).json({
      status: 201,
      message: "訂單取消",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const removeOrder = async (req, res, next) => {
  try {
    const order_id = parseInt(req.params.order_id);
    const { order_status } = req.body;

    const response = await orderService.updateOrderStatus(
      order_id,
      order_status
    );

    res.status(201).json({
      status: 201,
      message: "訂單刪除",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export {
  fetchAllOrders,
  fetchOrderById,
  fetchPendingOrder,
  addOrder,
  completeOrder,
  failOrder,
  cancelOrder,
  removeOrder,
};
