const productModel = require("../model/modelschema")
const bcrypt = require("bcrypt")


async function hash(password) {
    return await bcrypt.hashSync(password, 10)
}
////--------------------------------------------------to compare hashed password with hashed confirmed password
async function validatePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
}


const register = async (req, res) => {
    try {
        const { name, email, city, password, cpassword } = req.body
        const hashedPassword = await hash(password, cpassword)

        //------------------------------------------------------------------------matching password with confirm password--------------------------------------------------------
        if (password !== cpassword) {
            return res.json({ message: "password not match" })
        }
        //---------------------------------------------------------------------- email verification removing duplicacy------------------------------------------------------------
        const checkMail = await productModel.findOne({ email })

        if (checkMail) {
            return res.json({ message: "Email already exist" })
        }

        // const comparepassword = await hashPassword(password,cpassword)
        const collectdata = new productModel({
            name: name,
            email: email,
            password: hashedPassword,
            cpassword: hashedPassword,
            city: city
        })

        await collectdata.save()



        if (collectdata) {
            res.status(202).json({
                message: "data added",
                collectdata: collectdata
            })
        } else {
            res.status(404).json({
                message: "data is not  added",
            })
        }
    } catch (error) {
        res.send("error in register")
        console.log(error);

    }
}
const getdata = async (req, res) => {
    try {
        const collectdata = await productModel.find()
        res.status(202).json({
            message: "data found",
            collectdata: collectdata
        })
    } catch (error) {
        res.send("error occured in getdata")
        console.log(error);

    }
}
const deletedata = async (req, res) => {
    try {
        const collectdata = await productModel.findByIdAndDelete(req.params.id)
        res.status(202).json({
            message: "data deleted",
            collectdata: collectdata
        })
    } catch (error) {
        res.send("error occured in delete api")
        console.log(error);

    }
}

const updatePassword = async (req, res) => {
    try {
        const id = req.params.id
        const { password, cpassword } = req.body;
        const hashedPassword = await hash(password, cpassword)

        if (!password) {
            return res.status(404).json({ message: "password incorrect" })
        }

        if (!cpassword) {
            return res.status(404).json({ message: " confirm password incorrect" })
        }

        if (password !== cpassword) {
            return res.status(500).json({ message: "password & confirm password doesnt match" })
        }

        const updatePassword = await productModel.findOneAndUpdate({ _id: id },

            { $set: { password: hashedPassword, cpassword: hashedPassword } }

        )

        const result = await updatePassword.save()
        if (!result) {
            return res.status(500).json({ message: "password and confirm password does not found" })
        } else {
            return res.status(200).json({
                statusCode: 200,
                message: "password updated successfully",
                data: result
            })
        }


    } catch (error) {
        console.log(error.message)

    }
}


const changePassword = async (req, res) => {
    try {
        const id = req.params.id;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const cpassword = req.body.cpassword;

        const data = await productModel.findOne({ _id: id })
        console.log("data==>", data)

        const validOldPassword = await validatePassword(oldPassword, data.password)
        if (!validOldPassword) {
            return res.status(500).json({ message: "password not match" })
        }

        const hashedPassword = await hash(newPassword)

        const result = await productModel.findOneAndUpdate(
            { _id: id },
            { $set: { password: hashedPassword, cpassword: hashedPassword } }
        )

        if (!result) {
            return res.status(500).json({ message: "data not changed" })
        } else {
            return res.status(200).json({
                statusCode: 200,
                message: "password changed successfully",
                data: result
            })
        }





    } catch (error) {
        console.log(error.message)

    }
}
const getemail = async (req, res) => {
    try {
        // const collectdata = await productModel.find({ email: req.body.email })
        const collectdata = await productModel.findOne({ email: req.body.email });
        if (collectdata) {
            return res.status(400).json({ error: 'Email already used' });
        } else {
            console.log(req.body.email)
            
            return res.status(404).json({ error: 'This email is unique' })
           
        }
       ;
       

    } catch (error) {
        res.send("error occured in getdata")
        console.log(error);

    }
}
module.exports = { register, getdata, deletedata, updatePassword, getemail, changePassword }