
import companyModel from "../../model/createCompany.js"

const getCompany = async (req, res) => {
    const userId = req.query.userId;
    await companyModel.find({ userId }).then((data) => {
        res.status(200).json({
            message: "Company data get successfully",
            status: true,
            data: data,
            userId:userId
        })
    }).catch((err) => {
        res.status(200).json({
            message: "Something is wrong to getting company name.Please try again later",
            status: false,
        })
    })
}

export default getCompany;