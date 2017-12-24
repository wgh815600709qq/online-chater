export default (sequelize, DataTypes) => {
  return sequelize.define('Relationship', {
    id: { // id
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    friendId: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'relationship',
    paranoid: true // 软删除
  })
}
