export default (sequelize, DataTypes) => {
  return sequelize.define('TalkRecords', {
    id: { // id
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    speak_id: { // 谈话人id
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: 1
    },
    grounp_ids: { // 群组人员id数组
      type: DataTypes.STRING(200),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: { // 谈话时间
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'talking_records',
    paranoid: true // 软删除
  })
}
