const {login, newUser} = require('../controllers/user');
const User = require('../models/user');
const crud = require('./utils/crud');
const router = crud(User);
const { authUser, authRole } = require('../middlewares/auth');
const upload = require('../middlewares/upload') 

const { ROLES } = require('../config/roles')

router.post('/login', login);
router.post('/newuser',upload.single('avatar'),newUser);

// router.post('/newuser', authUser, authRole(ROLES.admin), newUser);
// // 

module.exports = router;