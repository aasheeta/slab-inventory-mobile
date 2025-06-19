const Order = require('../models/order');
const Bundle = require('../models/Bundle');

// Create new order and update bundle status
exports.createOrder = async (req, res) => {
  try {
    const { customerName, orderDate, bundles, notes, status } = req.body;

    const order = new Order({
      customerName,
      orderDate,
      bundles,
      notes,
      status
    });

    await order.save();

    // Update each selected bundle to status "sold"
    await Bundle.updateMany(
      { _id: { $in: bundles } },
      { $set: { status: 'sold' } }
    );

    res.status(201).json({ message: 'Order created and bundles updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('bundles');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};
