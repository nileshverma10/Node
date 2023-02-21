const detailsModel = require("../model/main");

const addData = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const data = new detailsModel({
      name: name,
      email: email,
      password: password,
    });

    await data.save();
    if (!data) {
      res.status(404).json({
        message: "Data not added",
      });
    } else {
      res.status(200).json({
        message: "Data added",
        data: data,
      });
    }
  } catch (error) {
    console.log("error===>", error);
    res.send("something went wrong");
  }
};


const getData = async (req, res) => {
  try {
    
    const data = await detailsModel.find();
    res.status(200).json({
        message: "Data fetched",
        data: data,
    })

  } catch (error) {
    console.log("error===>", error);
    res.send("something went wrong");
  }
  }
  
module.exports = {
  addData,
  getData,
};