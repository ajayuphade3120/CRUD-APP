import {pool} from "../config/db";
// import { db,sqlpool } from "../config/db";
import { Request, Response } from "express";
  import { RowDataPacket } from 'mysql2';

 type user = {
  name:string,
  email :string,
  phone:string,
  dob:Date,
  address:string
 }
 const getAllusers = async (req: Request, res: Response) => {
  try {
    // let [result]:any = await sqlpool.execute(`CALL GetAllUsers()`);   
    let pgresult :any = await pool.query('SELECT * FROM get_all_users()'); 
    // console.log("pgresult",pgresult.rows);
    // res.render('home', { data: pgresult.rows });
      return res.json(pgresult.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Server error");
  }
};
  const saveUser = async (user: user) => {
  try {
    await pool.query('SELECT insert_new_user($1, $2,$3, $4,$5) AS id', [
      user.name,
      user.email,
      user.phone,
      user.dob,
      user.address,
    ]);
    return { success: true };
  } catch (error) {
    console.error("Error saving user:", error);
    return { success: false, error };
  }
};
   const adduser = async (req: Request, res: Response) => {
  const user = req.body;
  const result = await saveUser(user);
  if (result.success) {
    res.status(200).json({ message: "User registered successfully" });
  } else {    
    console.error("Failed to save user:", user.name);
    return res.status(500).json({ message: `${user.email} is Already Registred, Please Changed it and try again.`});
  }
};

   const adduser1  =  async (req: Request, res: Response) => {
  try {
    const {name, email,phone,dob,address } = req.body; 
    console.log("user data",req.body);
        // await sqlpool.execute('CALL createUser(?,?,?,?,?)' , [name, email ,phone,dob,address]);
        await pool.query('SELECT insert_new_user($1, $2,$3, $4,$5) AS id', [name, email ,phone,dob,address]);
        res.json({message: 'user created successfully!',status: 'success',});
        // res.redirect("/");

  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Server error");
  }
};

    

  const editForm = async (req:Request , res:Response) =>{
  const userid = req.params.id;
      console.log("userid",userid); 
   
    try {
          const sql =`CALL GetUserById(?)`;
        // const [[rows]]:any = await sqlpool.execute(sql, [userid]);
        const pgrows:any =   await pool.query('SELECT * FROM get_user_by_id($1)', [userid]);
          console.log("pgrows",pgrows.rows[0]);
          // console.log(rows[0]);
        // const userDate = rows[0].dob?.toISOString().split('T')[0];
          const pguserDate = pgrows.rows[0].dob?.toISOString().split('T')[0];
        console.log(pguserDate);
        
        // if (Array.isArray(rows) && rows.length > 0) {
        //     console.log(rows[0]);
        //         res.render('edit', { user: rows[0], dob: pguserDate,});
        // } else
           if(pgrows.rows.length > 0){
                    res.render('edit', { user:pgrows.rows[0], dob: pguserDate,});
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ message: 'Server error' });
    }
  }
  const UpdateForm = async (req:Request , res:Response) =>{
      const userid = req.params.id; 
      console.log("userid",userid);
      const { name, email,phone,dob,address } = req.body; 
          console.log('Date of Birth:', req.body);

    try {
      const sql = `CALL updateUser(?,?,?,?,?,?)`;
      // const [result] = await sqlpool.execute(sql, [name, email ,phone,dob,address,userid]); 
      // const pgsql = 'UPDATE users SET name=$1, email =$2, phone =$3, dob =$4, address =$5 WHERE id = $6'
           await pool.query('SELECT update_user($1, $2,$3, $4,$5,$6)', [name, email ,phone,dob,address,userid]);
      // console.log(result);
           res.json({message: 'Data updated successfully!',status: 'success',});
      // res.redirect("/");
    }  catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ message: 'Server error' });
    }
  }

 const deletuser = async (req:Request , res:Response) =>{
    const userid = req.params.id; 

  try {
     const sql = `CALL deleteUser(?)`;
    //  await sqlpool.execute(sql, [userid]);
      await pool.query(`SELECT delete_user($1)`, [userid]);
      res.json({message: 'user deleted successfully!',status: 'deleted',});
  } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ message: 'Server error' });
    }
 }
  const searchUser =  async (req:Request, res:Response) => {
   const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Search query is required.' });
    }

    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1`,[`%${query}%`]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

 export {getAllusers ,adduser,editForm ,UpdateForm,deletuser,saveUser,searchUser}