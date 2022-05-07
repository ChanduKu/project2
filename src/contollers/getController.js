const collegeModel = require('../models/collegeModel')
const internModel = require('../models/studentModel')
const getdata = async (req, res) => {
    try {
        const data = req.query.collegeName
        console.log(data)
        if (!data) return res.status(400).send({ status: false, message: 'please enter the college name' })
        if (!(typeof (data) !== String)) return res.status(400).send({ status: false, message: 'please provid valid college name' })

        const collegeDetails = await collegeModel.find({ name: data })
        if (collegeDetails.length==0) return res.status(400).send({ status: false, message: 'college is not present in the data base' })

        const student = await internModel.find({ collegeId: collegeDetails[0]._id })
        if(student.length==0) return res.status(400).send({status:false,message:'there are no studnets who are interested from this college'})
        res.status(400).send({ status: true, collegeDetails, interests: student })

    }
    catch (e) {
        res.send(e.message)

    }
}
module.exports.getdata=getdata

