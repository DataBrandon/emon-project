const express = require('express');
const router = express.Router();
const DefaultModel = require('../model/default');

// get All smartsensors
router.get('/',async (req, res) => {
    try{
        const smartmeters = await DefaultModel.find();
        if(smartmeters == null){
            return res.status(404).json({message: "No sensors available" });
        }
        else{
        res.json(smartmeters);
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
});


router.get('/:id',async (req,res)=>{
    try{
        var sensors = await DefaultModel.find({signature:req.params.id}).exec();
        if(sensors == null){
            return res.status(404).json({message: "No sensors available" });
        }
        else{
        res.json(sensors);
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

router.get('/:id/latest',async (req,res)=>{
    try{
        var sensors = await DefaultModel.findOne({signature:req.params.id},{},{sort: {'RecordDate' : -1}}).exec();
        if(sensors == null){
            return res.status(404).json({message: "No sensors available" });
        }
        else{
        res.json(sensors);
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

router.get('/:id/:startdate',async (req,res)=>{
    try{
        //var sensors = await DefaultModel.find({signature:req.params.id},{},{sort: {'RecordDate' : 1}}).exec();
        var sensors = await DefaultModel.find({$and : [{signature:req.params.id},{RecordDate: {$gte:req.params.startdate}}]},{},{sort: {'RecordDate' : 1}}).exec();
        if(sensors == null){
            return res.status(404).json({message: "No sensors available" });
        }
        else{
        res.json(sensors);
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
});






module.exports = router;