import express, { Router } from 'express';  
import bodyParser from 'body-parser';
import mongoose from 'mongoose';    
import cors from 'cors';
import exceljs from 'exceljs';
import userRouter from './Routes/routes.js';
// import multer from 'multer';



const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

mongoose.connect('mongodb://localhost:27017/Money');
const db = mongoose.connection;
db.on('error', () => console.log("Error in connecting to the Database"));
db.once('open', () => console.log("Connected to Database"));

// app.post('/upload', upload.single('file'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         const workbook = new exceljs.Workbook();
//         const buffer = req.file.buffer;
//         await workbook.xlsx.load(buffer);

//         const worksheet = workbook.worksheets[0];
//         const data = [];

//         worksheet.eachRow((row, rowNumber) => {
//             if (rowNumber !== 1) { // Skip header row
//                 data.push({
//                     category: row.getCell(1).value,
//                     amount: row.getCell(2).value,
//                     info: row.getCell(3).value,
//                     date: row.getCell(4).value
//                 });
//             }
//         });

//         // Insert data into MongoDB
//         // Example:
//         // await db.collection('users').insertMany(data);

//         res.status(200).json(data);
//     } catch (error) {
//         console.error('Error uploading file:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

app.use(cors());
app.get('/', cors(), (req, res) => {
    
});
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('index.html');
});

app.use('/',userRouter);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});




