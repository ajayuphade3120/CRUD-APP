import express from "express";
const router = express.Router();
// import { getAllusers ,adduser, editForm, UpdateForm, deletuser} from "../controller/userController";
import { getAllusers ,adduser, editForm, UpdateForm, deletuser, searchUser} from "../controller/userControllerwithproc"

router.get('/users', getAllusers);
router.post('/create', adduser);
router.get('/createUser', function(req, res) {
  res.render('adduser');
});
router.get('/edit/:id', editForm);
router.post('/update/:id',UpdateForm);
router.get('/delete/:id', deletuser)
router.get('/search', searchUser)
export default router;