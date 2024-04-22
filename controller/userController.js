import Manual from '../models/manualModel.js';
import User from '../models/userModel.js';
import exceljs from 'exceljs';
const registerUser=async(req,res)=>{
    try{
        const {username,email,password}=req.body;
       
        const user= new User({
            name :username,
            email:email,
            password:password,
        });

       await user.save() 
        res.status(201).json({
            status:"success",
            message:"success"
        });


    }catch(err){
        res.json({
            status:"fail",
            message:err.message
        });
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const userExist=await User.findOne({email:email,password:password});
       
        if(userExist){
            res.status(200).json({
                message:"success",
                success:true,
                name:userExist.name,
            })
        }else {
            
            res.json({
                message:"notexists",
                success:true
            })
        }

        
        
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:err.message
        });
    }
}

const manualData = async(req,res)=>{
    const {category} = req.body
    const {amount} = req.body
    const {info} = req.body
    const {date} = req.body
   
    try {
        const data = new Manual({
            category: category,
            amount: amount,
            info: info,
            date: date
        });
        
        await data.save();
        res.status(201).json({
            status: 'success',
            message: 'Data added successfully',
            data: data,
        });
    } catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        });

    }
    
}


const addDatatoFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
 
        const workbook = new exceljs.Workbook();
        const buffer = req.file.buffer;
        await workbook.xlsx.load(buffer);
       

        const worksheet = workbook.worksheets[0];
        const data = [];

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber !== 1) { // Skip header row
                data.push({
                    category: row.getCell(1).value,
                    amount: row.getCell(2).value,
                    info: row.getCell(3).value,
                    date: row.getCell(4).value
                });
            }
        });

        // Insert data into MongoDB
        data.forEach(entry => {
            const data = new Manual({
                category: entry.category,
                amount: entry.amount,
                info: entry.info,
                date: entry.date
            });
            data.save();
        });
        res.status(200).json(data);
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export  {registerUser,login,manualData,addDatatoFile};