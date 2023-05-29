
var database = require('./database')
var joi = require('joi')
var Error = require('../Errors')


exports.Login = function (req, res, next) {
    var body = req.body
    var username = body.username
    var password = body.password


    const schema = joi.object().keys({
        username: joi.string().min(4).required().label('user name'),
        password: joi.string().min(4).required().label("password"),
    });


    const validate = schema.validate({
        username: username,
        password: password,


    })



    if (!validate.error) {

        database.select('*').from('users').where({
            'username': username
        }).asCallback(function (err, user) {
            if (err) {
                console.log(err)
            } else {


                if (user.length == 0) {


                    res.json({
                        status: 500,
                        Message: "user dosent exists"
                    })

                    console.log('user dosent exists')
                } else {


                    if (username == user[0].username && password == user[0].password) {

                        res.json({
                            status: 200,
                            Message: "Login ok"
                        })
                    } else {

                        res.json({
                            status: 500,
                            Message: "Login faild"
                        })
                    }



                }






            }
        })

    } else {


        console.log(validate.error)

        Error.SendErrors(res, validate)


    }




}
