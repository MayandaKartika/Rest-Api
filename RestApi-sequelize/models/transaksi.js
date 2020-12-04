'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    static associate(models) {     
      this.belongsTo(models.costumer,{
        foreignKey: "costumer_id",
        as: "costumer"
      })
    
    this.hasMany(models.detail_transaksi, {
      foreignKey: "transaksi_id",
        as: "detail_transaksi"
    })
    }
  };
  transaksi.init({
    transaksi_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },    
    costumer_id: DataTypes.INTEGER,
    waktu: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'transaksi',
    tableName: "transaksi"
  });
  return transaksi;
};
