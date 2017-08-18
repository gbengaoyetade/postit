import groupMembers from './groupMembers';

const Group = (sequelize, DataTypes) => {
  const Groups = sequelize.define('groups', {
    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Group name cannot be empty' },
      },
    },
    groupDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { args: true, msg: 'User Id can only be an integer' },
      },
    },
  }, {
    classMethods: {
      associate: (models) => {
        Groups.belongsToMany(models.users, {
          through: models.groupMembers,
        });
      },
    }, // end fo classMethods
      hooks: {
        afterCreate: (group) => {
          // groupMembers.create({
          //   groupId: group.id,
          //   userId: group.userId,
          //   addedBy: group.userId, 
          // })
          // .then((groupMember) => {
          //   console.log(groupMember);
          // })
          // .catch((error) =>{
          //   console.log(error);
          // });
          console.log('I got here');
        }, // end of afterCreate
      }, // end of hooks
  });
  return Groups;
};
export default Group;
