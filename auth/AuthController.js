var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
var User = require('../user/User');
var VerifyToken = require('./VerifyToken');
const Domain = require('../company_domain_list/DomainSchema');

router.get('/list', (req, res) => {
    const temp = new Domain({
        company_name: 'friebase',
        domain_list: ['www.xyz.com', 'www.google.com', 'www.stackoverflow.com'],
    });
    temp.save().then((resp) => res.json(resp));
});


router.post('/register', async (req, res) => {
    User.findOne({ email: req.body.email }, async (error, doc) => {
        if (error)
            res.status(500).send({
                error:
                    "Unknown server error. Please contact Deck's customer support for help",
                user: null,
                token: null,
            });

        if (doc)
            return res.send({
                error: 'Account already exists! Sign in instead.',
                user: null,
                token: null,
            });
    });
    const domList =[]
    Domain.findOne({ company_name: req.body.company_name })
    .then(async (result)=>{
        result.domain_list.forEach((item) => {
            var temp = {
                name: item,
                status: 'pending',
            };
            domList.push(temp);
        });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword, 
            token: jwt.sign({ email: req.body.email }, process.env.TOKEN_SECRET),
            company_name: req.body.company_name,
            domains: domList,
        });
        user.save()
            .then((resp) => {
                res.send({ user: resp, error: null });
            })
            .catch((err) => {
                res.status(400).send({user: null, error: err});
            });
    })
    .catch(err=>console.log(err))
   


   
});

router.get('/me', VerifyToken, (req, res) => {
    var token = req.headers['x-access-token'];
    if (!token)
        return res
            .status(401)
            .send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.',
            });
        console.log(decoded);
        User.findById(
            decoded._id,
            { password: 0 }, // projection
            (err, user) => {
                if (err)
                    return res
                        .status(500)
                        .send('There was a problem finding the user.');
                if (!user) return res.status(404).send('No user found.');

                res.status(200).send(user);
            }
        );
        //token
        const token = jwt.sign({ _id: doc._id }, process.env.TOKEN_SECRET, {
            expiresIn: 86400,
        });
        res.header('auth-token', token).send({
            error: null,
            auth: true,
            user: doc,
            token: token,
        }); //user data error null
    });
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, async (err, doc) => {
        if (err) {
            console.log(err);
            res.status(400).send({
                error: err,
                user: null,
                auth: false,
                token: null,
            });
        }
        console.log('doc', doc);
        if (!doc) {
            return res.send({
                error: 'Email unregistered. Signup now!',
                auth: false,
                user: null,
                token: null,
            }); //{user,error}
        }
        const checkPassword = await bcrypt.compare(
            req.body.password,
            doc.password
        );
        if (!checkPassword) {
            return res.send({
                error: 'Password is incorrect!',
                user: null,
                auth: false,
                token: null,
            });
        }

        if (doc.admin !== true) {
            var tempDomains = doc.domains;
            var status = 'pending';
            // req.body.service_name === 'Deck' ? status = 'active' : status = status
            tempDomains.map((item) => {
                if (req.body.service_name === item.name) status = item.status;
            });
            if (status === 'pending') {
                return res.send({
                    error:
                        "Your account still doesn't have access to this site!",
                    user: null,
                    auth: false,
                    token: null,
                });
            }
        }

        //token
        const token = jwt.sign({ _id: doc._id }, process.env.TOKEN_SECRET, {
            expiresIn: 86400,
        });
        res.header('auth-token', token).send({
            error: null,
            auth: true,
            user: doc,
            token: token,
        }); //user data error null
    });
});

router.post('/update', VerifyToken, async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    if (req.body?.password) {
        var hashedPassword = await bcrypt.hash(req.body.password, salt);
    }
    var presentData = await User.findOne({ _id: req.body._id });
    presentData.name = req.body?.name;
    presentData.company_name = req.body?.company_name;
    req.body?.password
        ? (presentData.password = hashedPassword)
        : (presentData = presentData);
    var update = await User.findOneAndUpdate(
        { _id: req.body._id },
        presentData,
        {
            new: true,
        }
    );
    res.json(update);
});

module.exports = router;