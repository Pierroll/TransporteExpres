const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();

// Configuración de la base de datos
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);

// Probar la conexión a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos exitosa.');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

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
        type: DataTypes.FLOAT,
    }
}, {});

// Definición del modelo Route
const Route = sequelize.define('Route', {
    companyId: {
        type: DataTypes.INTEGER,
        references: {
            model: TransportCompany,
            key: 'id'
        }
    },
    origin: {
        type: DataTypes.STRING,
    },
    destination: {
        type: DataTypes.STRING,
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

// Sincronizar la base de datos
sequelize.sync().then(() => {
    console.log("Database & tables created!");
}).catch(error => {
    console.error("Error al crear la base de datos y las tablas:", error);
});

// Middleware para parsear JSON
app.use(express.json());

// Configuración de la sesión
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// Configuración de CORS
app.use(cors({
    origin: process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000',
    credentials: true, 
}));


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback'
}, async (token, tokenSecret, profile, done) => {
    try {
        const [user, created] = await User.findOrCreate({
            where: { googleId: profile.id },
            defaults: {
                name: profile.displayName,
                email: profile.emails[0].value,
                imageUrl: profile.photos[0].value,
                promotionCode: 'PROMO-' + Math.random().toString(36).substr(2, 9).toUpperCase()
            }
        });

        user.created = created; // Agregar el flag para identificar si el usuario fue creado

        if (created) {
            console.log('Usuario registrado:', user);
        } else {
            console.log('Usuario existente:', user);
        }
        
        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));

// Rutas de autenticación
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login?error=true' }),
    (req, res) => {
        const isNew = req.user.created ? 'true' : 'false';
        const promotionCode = req.user.promotionCode;
        const redirectUrl = isNew === 'true'
            ? `http://localhost:3000/signup?promoCode=${promotionCode}&isNew=${isNew}`
            : 'http://localhost:3000/';
        res.redirect(redirectUrl);
    }
);

app.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) { return next(err); }
        res.redirect('http://localhost:3000/');
    });
});

// Ruta para obtener el usuario actual
app.get('/api/current_user', (req, res) => {
    console.log(req.user);  // Verifica qué datos se están enviando
    res.json({ user: req.user || null });
});

// Ruta para obtener las compañías de transporte con sus rutas
app.get('/api/transport-companies', async (req, res) => {
    try {
        const companies = await TransportCompany.findAll({
            include: [Route]
        });
        res.json(companies);
    } catch (error) {
        console.error("Error fetching transport companies:", error);
        res.status(500).send("Error fetching transport companies");
    }
});

app.get('/api/transport-companies/:id', async (req, res) => {
    try {
        const company = await TransportCompany.findByPk(req.params.id, {
            include: [Route]
        });
        if (company) {
            res.json(company);
        } else {
            res.status(404).send("Company not found");
        }
    } catch (error) {
        console.error("Error fetching company details:", error);
        res.status(500).send("Error fetching company details");
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // El flag 'isNew' indica si el usuario ha sido creado en esta sesión
        const isNew = req.user && req.user.created ? 'true' : 'false';
        const redirectUrl = isNew === 'true'
            ? `http://localhost:3000/signup?promoCode=${req.user.promotionCode}&isNew=${isNew}`
            : `http://localhost:3000/`;
        res.redirect(redirectUrl);
    }
);
app.get('/api/origins', async (req, res) => {
    try {
        const origins = await Route.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('origin')), 'origin']],
        });
        res.json(origins.map(route => route.origin));
    } catch (error) {
        console.error('Error fetching origins:', error);
        res.status(500).send('Error fetching origins');
    }
});

// Obtener destinos basados en el origen seleccionado
app.get('/api/destinations', async (req, res) => {
    const { origin } = req.query;
    try {
        const destinations = await Route.findAll({
            where: { origin },
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('destination')), 'destination']],
        });
        res.json(destinations.map(route => route.destination));
    } catch (error) {
        console.error('Error fetching destinations:', error);
        res.status(500).send('Error fetching destinations');
    }
});

// Buscar rutas según el origen y destino
app.get('/api/routes', async (req, res) => {
    const { origin, destination } = req.query;
    try {
        const routes = await Route.findAll({
            where: { origin, destination },
            include: [TransportCompany],
        });
        res.json(routes);
    } catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).send('Error fetching routes');
    }
});
