





function SendErrors(res, err) {

  // console.log("data21234", err.error.details[0]);

  var errorList = err.error.details

  for (var r = 0; r < errorList.length; r++) {

    //console.log(err)
    switch (errorList[r].type) {

      case "string.max":


        res.json({
          status: 500,
          Message: errorList[r].message,
          Path: errorList[r].path[0],
          type: errorList[r].type

      })

      break;

      case "string.base":

        return res.json({
            status: 500,
            Message: errorList[r].message,
            Path: errorList[r].path[0]

        })
        break;
    case "string.pattern.name":

        return res.json({
            status: 500,
            Message: errorList[r].message,
            Path: errorList[r].path[0]

        })


        break;

    case "string.length":

        return res.json({
            status: 500,
            Message: errorList[r].message,
            Path: errorList[r].path[0]

        })

        break;
    case "any.required":


        return res.json({

            status: 500,
            Message: ' הכנס '+ errorList[r].context['label'],
            Path: errorList[r].path[0]
        })

        break;

    case "string.pattern.base":


        return res.json({

            status: 500,
            Message: 'Error ' + errorList[r].context['label'],
            Path: errorList[r].path[0]
        })

        break;

    case "passwordComplexity.uppercase":

        return res.json({

            status: 500,
            Message: errorList[r].message,
            Path: errorList[r].path[0]
        })


        break;

      case "number.min":
        res.json({
          status: 500,
         Message: errorList[r].context.label+' must be greater than or equal to 0.01',
          Path: errorList[r].path[0]

        })


        break;


      case "date.base":
        res.json({
          status: 500,
         Message: errorList[r].message,
          Path: errorList[r].path[0]

        })


        break;

      case "date.greater":

console.log(errorList[r])
        res.json({
          status: 500,
         Message: "תאריך גדול מ" + errorList[r].context.limit.toISOString().slice(0, 10),
          Path: errorList[r].path[0]

        })

        break;


      case "string.empty":


        return res.json({

          status: 500,
         Message: ' Enter ' + errorList[r].context['label'],
          Path: errorList[r].path[0],
          type: errorList[r].type
        })


        break;

      case "string.min":

        return res.json({

          status: 500,
         Message: errorList[r].message,
          Path: errorList[r].path[0]
        })


        break;

      case "string.email":


        return res.json({

          status: 500,
         Message: errorList[r].message,
          Path: errorList[r].path[0]
        })

        break;

      case "passwordComplexity.lowercase":

        return res.json({

          status: 500,
         Message: errorList[r].message,
          Path: errorList[r].path[0]
        })


        break;

      case "number.base":


        return res.json({

          status: 500,
         Message: errorList[r].message,
          Path: errorList[r].path[0]
        })
        break;
    }





  }

}




function SQL_ERROR(res, err) {


    if (err.code === 'ER_DUP_ENTRY') {
  
  
      var ErrorMessage = err.sqlMessage.split(' ')
      console.log(ErrorMessage)
      console.log(ErrorMessage[5].replace(/['"]+/g, ''))
      res.json({
        status: 500,
        Message: ErrorMessage[2] + ' Already Exists',
        Path: ErrorMessage[5].replace(/['"]+/g, '')
  
      })
  
    } else {
  
  
      res.json({
        status: 500,
        Message: err
      })
    }
  
  
  }



  function SQL_ERROR(res, err) {


    if (err.code === 'ER_DUP_ENTRY') {
  
  
      var ErrorMessage = err.sqlMessage.split(' ')
      console.log(ErrorMessage)
      console.log(ErrorMessage[5].replace(/['"]+/g, ''))
      res.json({
        status: 500,
        Message: ErrorMessage[2] + ' Already Exists',
        Path: ErrorMessage[5].replace(/['"]+/g, '')
  
      })
  
    } else {
  
  
      res.json({
        status: 500,
        Message: err
      })
    }
  
  
  }





  module.exports={SendErrors,SQL_ERROR}

  