const studnetModel = require('../models/studentModel')
const collegeModel = require('../models/collegeModel')
const validators = require("validator")
const studentCreate = async (req, res) => {
  try {
    const data = req.body


    const { name, mobile, email, collegeName } = data
    if(!mobile)return res.status(400).send({status:false,message:'please enter the number '})
    let number = mobile.toString()
    if (!(email)) return res.status(404).send({ status: false, message: 'please enter the email' })
    if (!(validators.isEmail(email))) return res.status(400).send({ status: false, msg: 'plese enter valid email id' })
    let emailex = await studnetModel.findOne({ email: email })
    if (emailex!=null) return res.status(400).send({ status: false, message: 'email already registerd' })
    if (!mobile) return res.status(400).send({ status: false, mesggage: 'please enter the mobile number ' })
    if((number.leght)!=10)return res.status(400).send({status:false,message:'moblie number must be 10 digits '})
    if (!(validators.isMobilePhone(number))) return res.status(400).send({ status: false, message: 'please enter the valid mobile number' })
    let mobileex = await studnetModel.findOne({ mobile:  number})
   
    if (mobileex) return res.status(400).send({ status: false, message: 'mobile number is already exists' })
    if (!collegeName) return res.status(400).send({ status: false, message: 'please enter the college name' })
  
    if (!(typeof (collegeName) == "string")) return res.status(400).send({ status: false, message: 'please enter the valid college name' })

    const college = await collegeModel.findOne({ name: collegeName }, { _id: 1 })
    const collegeId = college._id
    const finaldetails = { collegeId, ...data }
    console.log(college)
    const student = await studnetModel.create(finaldetails)
    
    res.status(201).send({status:true,message:student})
  }
  catch (e) {
    res.status(500).send({ Status: false, error: e.message})
  }
}
module.exports.interns = studentCreate