import userModel from "../../model/userModel.js";



const getFiles = async(req,res) => {
   const userid = req.body.userid;
   const selectModel = await userModel.find({eq:{userId:userid}});
   res.status(200).json({
      data:selectModel
   })

}

export default getFiles;