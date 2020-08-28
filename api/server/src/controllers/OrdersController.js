import Util from './utils';
import ProductOrderServices from '../services/ProductOrderServices';
import OrderServices from '../services/OrderServices';

const util = new Util()

class OrderController {
  static async all(req, res) {
    const products = await OrderServices.all()
    if (products.length > 0) {
      util.setSuccess(200, 'Orders retrieved', products)
    }else {
      util.setSuccess(200, 'No Order found')
    }
    return util.send(res)
  }
  static async getById(req, res) {
    const { id } = req.params
    const order = await OrderServices.getById(id)
    util.setSuccess(200, 'Order retrieved', order)
    return util.send(res)
  }
    static async getItemsById(req, res) {
      const { id } = req.params
      const items = await ProductOrderServices.findByOrderId(id, req.body)
      util.setSuccess(200, 'Order retrieved', items)
      return util.send(res)
    }
  
    static async createItem(req,res){
      const { id } = req.params
      const item = await ProductOrderServices.add(id, req.body)
      util.setSuccess(200, 'Order retrieved', item)
      return util.send(res)
    }


  static async add(req, res) {
    if (!req.body.customer || !req.body.table) {
      util.setError(400, 'Please complete details')
      return util.send(res)
    }
    const newOrder = req.body
    try {
      const createdOrder = await OrderServices.add(newOrder)
      util.setSuccess(201, 'Order Added!', createdOrder)
      return util.send(res)
    } catch (error) {
      util.setError(400, error.message)
      return util.send(res)
    }
  }
  static async allItems(req, res) {
    return []
  }

  static async updatedOrder(req, res) {
    const alteredOrder = req.body
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const updateOrder = await OrderServices.updateOrder(id, alteredOrder)
      if (!updateOrder) {
        util.setError(404, `Cannot find Order with the id: ${id}`)
      } else {
        util.setSuccess(200, 'Order updated', updateOrder)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async getOrder(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }

    try {
      const theOrder = await OrderServices.getOrder(id)

      if (!theOrder) {
        util.setError(404, `Cannot find Order with the id ${id}`)
      } else {
        util.setSuccess(200, 'Found Order', theOrder)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async deleteOrder(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }

    try {
      const orderToDelete = await OrderServices.deleteOrder(id)

      if (orderToDelete) {
        util.setSuccess(200, 'Order deleted')
      } else {
        util.setError(404, `Order with the id ${id} cannot be found`)
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }
}

export default OrderController;