export default (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: { // id
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sex: { // 性别 // 1男 2女
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: 1
    },
    username: { // 名称
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: { // 登录密码
      type: DataTypes.STRING(64),
      allowNull: false
    },
    birthday: { // 生日
      type: DataTypes.DATE,
      allowNull: true
    },
    level: { // 等级
      type: DataTypes.INTEGER(1),
      allowNull: false,
      default: 0
    },
    name: { // 手机
      type: DataTypes.STRING(45),
      allowNull: true
    },
    address: { // 地址
      type: DataTypes.STRING(200),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'user',
    paranoid: true // 软删除
  })
}
