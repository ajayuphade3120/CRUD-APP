import fs from "fs";
import express from "express";
import { saveUser } from "../controller/userControllerwithproc";
import csv from "csv-parser";
import path from "path";
const router = express.Router();
import { Request, Response } from 'express';
import { UploadedFile } from "express-fileupload";

type user = {
  name: string;
  email: string;
  phone: string;
  dob: Date;
  address: string;
};
router.post("/upload", async (req: Request, res: Response) => {
  const csvFile = req.files?.myFile as UploadedFile;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  if (csvFile.mimetype !== "text/csv") {
    return res.status(400).send("Only CSV files are allowed.");
  }
  const uploadPath = path.join(__dirname ,"../uploads", csvFile.name);
  let users: user[] = [];

   await csvFile.mv(uploadPath);
  fs.createReadStream(uploadPath)
    .pipe(csv())
    .on("data", (data: user) => {
      if (data.dob) {
        data.dob =  new Date(data.dob);
        console.log("data.dob",data.dob );
        
      }
      users.push(data);
    })

    .on("end", async () => {
    for (const user of users) {
      const result = await saveUser(user);
      if (!result.success) {
        console.error("Failed to save user:", user.name);
      }
    }
       res.json({message: 'Data saved and updated successfully!',status: 'success',});
    console.log("CSV data:", users);
    });
});

export default router;
