'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    customer: DataTypes.STRING,
    table: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    item: DataTypes.STRING
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};