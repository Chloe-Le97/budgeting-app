const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Category extends Model {}

const iconArray = ['faPhone',
  'faBriefcaseMedical',
  'faSuitcaseMedical',
  'faCar',
  'faToiletPaper',
  'faCartShopping',
  'faUtensils',
  'faLaptopFile',
  'faGraduationCap',
  'faBook',
  'faPlaneDeparture',
  'faFaceSmile',
  'faDumbbell',
  'faCoffee',
  'faPaw',
  'faBaby',
  'faCircleQuestion',
  'faSackDollar',
  'faPiggyBank',
  'faPersonDigging',
  'faMoneyBillTrendUp',
  'faHouse',
  'faDollarSign',
  'faLaptopCode',
  'faTruck',
  'faTaxi',
  'faFerry',
  'faTrain',
  'faLeaf',
  'faPaperPlane',
  'faSolarPanel',
  'faLandmark',
  'faScaleBalanced',
  'faShip',
  'faGears',
  'faScrewdriverWrench',
  'faCakeCandles',
  'faMartiniGlassCitrus',
  'faBurger',
  'faHeadphones',
  'faPrint',
  'faNewspaper',
  'faLightbulb',
  'faCouch',
  'faGift',
  'faRadio',
  'faSmoking',
  'faHandshake',
  'faCapsules',
  'faIceCream',
  'faCookie',
  'faFlask',
  'faHeartPulse',
  'faFire',
  'faTooth',
  'faSyringe',
  'faHospital',
  'faTableTennisPaddleBall',
  'faBasketball',
  'faBowlingBall',
  'faFootball',
  'faBicycle',
  'faWeightHanging',
  'faVolleyball',
  'faBaseball',
  'faAnchor',
  'faGamepad',
  'faDice',
  'faTicket',
  'faFilm',
  'faMusic',
  'faPeopleGroup',
  'faChild',
  'faMoneyBill',
  'faHandHoldingDollar',
  'faSeedling', 
  'faArrowTrendUp']

Category.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  icon: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isIn: {
        args: [iconArray], 
        msg: 'Invalid icon name.'
      }
    }, 
    defaultValue: 'faPhone'
  },
  type:{
    type: DataTypes.TEXT,
    allowNull: false,
    validate:{
      isIn:{
        args: [['Expenses','Income']],
        msg: 'Invalid type'
      }
    },
    defaultValue: 'Expenses'
  },              
  userId:{
    type: DataTypes.INTEGER,
		allowNull: false,
		references: { model: 'users', key: 'id' },
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'category'
})

module.exports = Category