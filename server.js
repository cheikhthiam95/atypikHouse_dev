const express = require('express');
const mongoose = require('mongoose')
const dotenvi = require('dotenv');
const locataireRoutes = require('./routes/locataires');
const reservationRoutes = require('./routes/reservations');
const session = require('express-session')
const expressValidator = require('express-session')
const parseurl = require('parseurl')

const app = express();
dotenvi.config();


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(function (req, res, next) {
    if (!req.session.views) {
      req.session.views = {}
    }
  
    // get the url pathname
    var pathname = parseurl(req).pathname
  
    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
  
    next()
  })
//charger les fichiers qui sont dans le répertoire public :
app.use(express.static('public'));

app.use(express.json());

// Routes midlleware  
app.use('/api/locataire/', locataireRoutes)

app.use('/api/reservation', reservationRoutes)

var port = process.env.PORT || 5001;
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}
).then(() => {
    // Commment démarrer l'écoute de notre server
    app.listen(port, () => {
        console.log(' Le serveur écoute au port',port)
    });
}).catch((err) => {
    console.log(err)
})
