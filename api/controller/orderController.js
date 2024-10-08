import catchAsycError from "../middleware/catchAsycError.js";
import Order from "../model/orderModel.js";
import Product from "../model/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
// Utility Function
function calcPrices(orderItems) {
    const itemsPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxRate = 0.15;
    const taxPrice = (itemsPrice * taxRate).toFixed(2);
  
    const totalPrice = (
      itemsPrice +
      shippingPrice +
      parseFloat(taxPrice)
    ).toFixed(2);
  
    return {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice: shippingPrice.toFixed(2),
      taxPrice,
      totalPrice,
    };
  }
export const createOrder = catchAsycError(async(req,res,next)=>{
try {
    const {orderItems, shippingAddress, paymentMethod} = req.body
    if (orderItems && orderItems.length === 0) {
        return next(new ErrorHandler("No order items", 400))
    }
    const itemsFromDB = await Product.find({
        _id : {$in: orderItems.map((x)=> x._id)}
    })

    const dbOrderItems = orderItems.map((itemsFromClient)=>{
        const matchingItemFromDB = itemsFromDB.find(
            (itemFromDB) => itemFromDB._id.toString() === itemsFromClient._id
        )
        if (!matchingItemFromDB) {
            return next(new ErrorHandler(`Product not found : ${itemsFromClient._id}`))
        }
        return {
            ...itemsFromClient,
            product : itemsFromClient._id,
            price : matchingItemFromDB.price,
            _id : undefined
        }
    })
    const { itemsPrice, taxPrice,shippingPrice,totalPrice} = calcPrices(dbOrderItems)
const order = new Order({
    orderItems : dbOrderItems,
    user : req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
})
const createdOrder = await order.save()
res.status(201).json(createdOrder)
} catch (error) {
    res.status(500).json({ error: error.message });
}
})

export const getAllOrders = catchAsycError(async(req,res,next)=>{
   try {
     const orders = await Order.find({}).populate("user", "id username")
     res.status(200).json(orders)
   } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
   }
})

export const getUserOrder = catchAsycError(async(req,res,next)=>{
   try {
     const order = await Order.find({user : req.user._id})
     res.status(200).json(order)
   } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
    
   }
})

export const calculateTotalOrder = catchAsycError(async(req,res,next)=>{
   try {
     const totalOrders = await Order.countDocuments()
     res.status(200).json(totalOrders)
   } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
   }
})

export const countTotalSales = catchAsycError(async(req,res,next)=>{
    try {
        const orders = await Order.find();
        const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
        res.json({ totalSales });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})

export const calcualteTotalSalesByDate = catchAsycError(async(req,res,next)=>{
    try {
        const salesByDate = await Order.aggregate([
          {
            $match: {
              isPaid: true,
            },
          },
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
              },
              totalSales: { $sum: "$totalPrice" },
            },
          },
        ]);
    
        res.json(salesByDate);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})

export const findOrderById = catchAsycError(async(req,res,next)=>{
  try {
      const order = await Order.findById(req.params.id).populate("user", "username email")
     if (order) {
        res.status(200).json(order)
     }else{
        return next(new ErrorHandler("order not found", 400))
     }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

export const markOrderAsPaid = catchAsycError(async(req,res,next)=>{
    try {
        const order = await Order.findById(req.params.id)
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id : req.body.id,
                status : req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address,
            };
            const updateOrder = await order.save()
            res.status(200).json(updateOrder)

        } else{
            return next(new ErrorHandler("Order not found", 404))
        }      
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export const markOrderAsDelivered = catchAsycError(async(req,res,next)=>{
    try {
        const order = await Order.findById(req.params.id);
    
        if (order) {
          order.isDelivered = true;
          order.deliveredAt = Date.now();
    
          const updatedOrder = await order.save();
          res.json(updatedOrder);
        } else {
            return next(new ErrorHandler("Order not found", 404))
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})