import express from "express";
const router = express.Router();

router.get("/fail", (req,res)=>{
    res.send(false);
});
export default router;