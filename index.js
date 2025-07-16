import express from  "express";
import multer from "multer";
import bp from "bodyParser";
import XLSX from "xlsx";
import PdfParse from "pdf-parse";
import pg from "pg";
import fs from"fs";
//import jsonwebtoken from "jsonwebtoken"
const app=express();
const port=4000;
app.use(bp.urlencoded({ extended: true }));
const db=new pg.Pool({
    host:"postgres",
    username:"Tharun",//wil be securd later using dotenv
    password:"123456",
    port:5432
})
db.connect();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploadexcel/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension); 
  }
});
const upload = multer({ storage: storage });
app.get("/",(req,res)=>{
    res.send("hi");
});
app.post("/login",)
app.post("/upload/excel",upload.single("file"),async (req,res,next)=>{
    try{
    let workbook = XLSX.utils.table_to_book(file);
    await db.query("INSERT INTO TABLE_NAME  (NAME,EMAIL,PHONE) VALUES $1,$2,$3",[workbook.name,workbook.email,workbook.phone]);
    res.json(workbook);
    }catch{
        res.send(401).json("error occured");
    }
    next();
});
app.post("/upload/pdf",upload.single("pdf_file"),async(req,res,next)=>{
    try{
     let dataBuffer = fs.readFileSync('/uploadpdf');
     PdfParse(dataBuffer).then (function(data) {
     db.query("INSERT INTO TABLE_NAME  (NAME,EMAIL,PHONE) VALUES $1,$2,$3"),[data.name,data.email,data.phone];
    res.json(data)
    })
    }catch{
    res.send(401).json("error occured");
    }

})
app.listen(port,()=>{
    console.log("Listen at 4000");
})
