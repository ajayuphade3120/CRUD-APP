import { db } from "../config/db";
import { Request, Response } from "express";
  import { RowDataPacket } from 'mysql2';

 type user = {
  id :number,
  name:string,
  email :string,
  phone:string,
  dob:string,
  address:string
 }
 const getAllusers = async (req: Request, res: Response) => {
  try {
    const connection = await db;
    let [result] = await connection.query("SELECT * FROM user");
    // const updatedob = result.map((user: { dob: any; }) => user.dob);
    // result.dob =  new Date(updatedob)
    res.render('home', { data: result });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Server error");
  }
};
   const adduser  =  async (req: Request, res: Response) => {
  try {
    const users = req.body
    const {id, name, email,phone,dob,address } = req.body; 
    console.log("data",req.body);
    
    // console.log(users);
        const connection = await db;
        await connection.query('INSERT INTO user (id,name, email,phone,dob,address) VALUES (?, ?,?,?,?,?)' , [id ,name, email ,phone,dob,address],
        );
        res.redirect("/");

  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Server error");
  }
};

  const editForm = async (req:Request , res:Response) =>{
  const userid = req.params.id; 
    try {
          const sql = "SELECT * FROM user WHERE id =?" ;
          const connection = await db;
        const [rows]:any = await connection.query(sql, [userid]);
        const userDate = rows[0]?.dob.toISOString().split('T')[0];
        console.log(userDate);
        
        if (Array.isArray(rows) && rows.length > 0) {
            console.log(rows[0]);
                res.render('edit', { user: rows[0], dob: userDate,});
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ message: 'Server error' });
    }
  }
  const UpdateForm = async (req:Request , res:Response) =>{
      const userid = req.params.id; 
      const { name, email,phone,dob,address } = req.body; 
          console.log('Date of Birth:', req.body);

    try {
      const sql = "UPDATE user SET name = ?,email = ?,phone= ?,dob = ?,address= ? WHERE id = ?";
      const connection = await db;
      const [result] = await connection.query(sql, [name, email ,phone,dob,address,userid]); 
      console.log(result);
           
      res.redirect("/");
    }  catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ message: 'Server error' });
    }
  }

 const deletuser = async (req:Request , res:Response) =>{
    const userid = req.params.id; 

  try {
     const sql = "DELETE FROM user WHERE id =?" ;
     const connection = await db;
     await connection.query(sql, [userid]);
      res.redirect("/");
  } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ message: 'Server error' });
    }
 }

 export {getAllusers ,adduser,editForm ,UpdateForm,deletuser}