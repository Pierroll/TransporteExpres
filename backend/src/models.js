const { Sequelize, DataTypes } = require('sequelize');

// Configuración de la base de datos
const sequelize = new Sequelize('postgres://postgres:Pierol123@localhost:5432/transporte_express');

// Definición del modelo User
const User = sequelize.define('User', {
    googleId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    phoneNumber: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.TEXT,
    },
    registrationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    promotionCode: {
        type: DataTypes.STRING,
    }
}, {});

// Definición del modelo TransportCompany
const TransportCompany = sequelize.define('TransportCompany', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logoUrl: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
}, {});

// Definición del modelo Route
const Route = sequelize.define('Route', {
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    departureTime: {
        type: DataTypes.STRING,
    },
    arrivalTime: {
        type: DataTypes.STRING,
    }
}, {});

// Relaciones
TransportCompany.hasMany(Route, { foreignKey: 'companyId' });
Route.belongsTo(TransportCompany, { foreignKey: 'companyId' });

sequelize.sync().then(() => {
    console.log("Database & tables created!");
}).catch(error => {
    console.error("Error al crear la base de datos y las tablas:", error);
});

module.exports = { sequelize, User, TransportCompany, Route };
