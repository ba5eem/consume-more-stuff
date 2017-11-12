module.exports = function(sequelize, DataTypes){
  const Item = sequelize.define('item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
     type: DataTypes.STRING,
     allowNull: false
    },
    price:{
      type: DataTypes.DECIMAL
    },
    manufacturer:{
      type: DataTypes.STRING
    },
    model:{
      type: DataTypes.STRING
    },
    dimensions:{
      type: DataTypes.STRING
    },
    notes:{
      type: DataTypes.TEXT
    },
    image:{
      type: DataTypes.STRING
    },
    deletedAt:{
      type: DataTypes.DATEONLY,
      defaultValue: null
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    conditionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    itemstatusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })

  Item.associate = function(models){
    Item.belongsTo(models.user, {
      foreignKey: 'userId', as: 'seller'
    }),
    Item.belongsTo(models.category, {
      foreignKey: 'categoryId', as: 'itemcategory'
    }),
    Item.belongsTo(models.condition, {
      foreignKey: 'conditionId', as: 'itemcondition'
    }),
    Item.belongsTo(models.itemstatus, {
      foreignKey: 'itemstatusId', as: 'itemstatus'
    })
  }
  return Item;
}