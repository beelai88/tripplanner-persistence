var Sequelize = require('sequelize');

module.exports = function(db){
  var Day = db.define('day', {
    number: {
    	type: Sequelize.INTEGER, 
    	allowNull: false,
    	unique: true
    }
  });
  return Day;   
}

