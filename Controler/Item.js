var database = require('./database')
var joi = require('joi')
var Error = require('../Errors')
const multer = require('multer')
const {initializeApp }= require('firebase/app');
const {getStorage,ref, uploadBytes,getDownloadURL,uploadBytesResumable,deleteObject }=require('firebase/storage');
const firebaseConfig = {
    apiKey: "AIzaSyDTiRQ5eAZfNY-i_LCLi03ful8LCwZc6rc",
    authDomain: "freshwaterfish-3d060.firebaseapp.com",
    projectId: "freshwaterfish-3d060",
    storageBucket: "freshwaterfish-3d060.appspot.com",
    messagingSenderId: "454196403610",
    appId: "1:454196403610:web:53e8e00f2623750a1aee23",
    measurementId: "G-HHR5RLG1Z0"
  };

  const firebaseApp  = initializeApp(firebaseConfig);
  
  

  
  
  const storagefireBase = getStorage(firebaseApp,'gs://freshwaterfish-3d060.appspot.com');


exports.AddItem = function (req, res, next) {
  

    
    var storage=multer.memoryStorage()

    const upload = multer({ storage: storage }).single('image')


    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }


        var body = JSON.parse(req.body.item)
        var item_name = body.item_name
        var category = body.category
        var price = body.price
        var image = body.image

        console.log(body)
        console.log(req.file)

        const schema = joi.object().keys({
            item_name: joi.string().required().label('item name'),
            category: joi.string().required().label('category'),
            price: joi.number().min(0.01).required().label('price'),
        });
    
    
    
        const validate = schema.validate({
            item_name: item_name,
            category: category,
            price: price,
           
        })
    
    
        if (!validate.error) {

            
        const storageRef = ref(storagefireBase, req.file.originalname);

        const uploadImage =uploadBytesResumable(storageRef,req.file.buffer,{contentType:req.file.mimetype})
      
        uploadImage.on('state_changed',(snapshot)=>{
    
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if(progress==100)
            {



                getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {



                    database('items').insert({
                        item_name: item_name,
                        category: category,
                        price: price,
                        image: downloadURL
                    }).asCallback(function (err, treatment) {
                        if (err) {
            
             database.select('item_id').from('items').where({
                        'item_name': item_name,
                    }).asCallback(function (err, data) {
                        if (err) {
            
                        } else {
            
            
                                database('items').where({
                                    'item_id': data[0].item_id
                                }).update({
                                    item_name: item_name,
                                    category: category,
                                    price: price,
                                    image: downloadURL
                                }).asCallback(function (err, updated) {
            
                                    if (err) {
            
                                        Error.SQL_ERROR(res, err)
            
                                    } else {
            
            
                                        res.json({
                                            status: 200,
                                            Message: 'item updated',
                                           
                                        })
            
            
                                    }
            
            
                                })
            
                          
            
            
            
                        }
                    })
            
            
            
            
                        } else {
                            res.json({
                                status: 200,
                                Message: "Item Added"
                            })
                        }
                    })
            


                });
            }



      })

 
    
        } else {
    
    
            Error.SendErrors(res, validate)
    
            console.log(validate)
    
    
        }
    
    
    



    })
    




}



exports.GetItem = function (req, res, next) {


    database.select('*').from('items')
        .asCallback(function (err, items) {

            if (err) {

                console.log(err)

            } else {

                res.json({
                    status: 200,
                    items: items
                })
            }


        })



}

