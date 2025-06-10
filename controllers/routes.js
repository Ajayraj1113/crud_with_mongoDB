const express = require("express")
const router = express.Router()
const Employee = require("../models/connection.model")


// router.get("/", (req, res)=> {
//     res.render("home");
// });

router.get("/add-emp", (req, res) => {
    res.render("addEmp")
})

router.post("/save-emp", async (req,res)=>{
    // console.log(req.body)
    try {
        const Emp = new Employee({
            fullname : req.body.fullname,
            email : req.body.email,
            phone : req.body.mobile,
            city : req.body.city
        })

       await Emp.save()
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})


// show data
router.get("/show-all-emp", async (req,res)=>{
    try {
        const result = await Employee.find()
        // console.log(result)
        res.render("showEmp", {list : result})
    } catch (error) {
        console.log(error)
    }
})

router.get("/delete-all-emp", async (req, res)=>{
    try {
        const result = await Employee.find()
        // console.log(result)
        res.render("deleteEmp", {list : result})
    } catch (error) {
        console.log(error)
    }
})

router.get("/final-delete/:uid", async (req, res)=>{
    try {
        const result = await Employee.findByIdAndDelete(req.params.uid)
        console.log(result)
        res.redirect("/emp/delete-all-emp")

    } catch (error) {
        console.log(error)
    }
})

router.get("/updateEmployee", async (req, res)=>{
    try{
        let emp = await Employee.find();
    // let empdata = emp.map(empdata => empdata.toObject());
    res.render("updateEmployee" , {emp});
}catch(err){
    console.log(err)
}
})
router.get("/editEmployee/:id", async(req, res)=>{
    try{
        // console.log(req.params.id)
        let employee = await Employee.findById(req.params.id);
        console.log(employee)
        res.render("editEmployee", {employee});
    }catch(err){
        console.log(err)
    }
})
router.post("/updateEmp/:id", async(req, res)=>{
    try {
        await Employee.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/emp/updateEmployee")

    } catch (err) {
        console.log(err);
    }
})
module.exports = router