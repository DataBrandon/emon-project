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

router.get('/getsmart',async (req,res)=>{
    try{
        var sensors = await DefaultModel.distinct('signature').exec();
        
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

router.get('/:id/latest/:amount',async (req,res)=>{
    try{
        var sensors = await DefaultModel.aggregate([
            {"$match":{signature:req.params.id}},
            {"$sort":{'RecordDate' : -1}},
            {"$limit": (parseInt(req.params.amount))},
            {"$sort":{'RecordDate' : 1}}
        ]).exec();
        
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


router.get('/:id/backd/:amount',async (req,res)=>{
    try{
        var now = new Date();
        var daysback = new Date(now.valueOf() - (req.params.amount * (1000*3600*24)));
        var sensors = await DefaultModel.find({$and : [{signature:req.params.id},{RecordDate: {$gte:daysback}}]},{},{sort: {'RecordDate' : 1}}).exec();
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

router.get('/:id/backh/:amount',async (req,res)=>{
    try{
        var now = new Date();
        var hoursback = new Date(now.valueOf() - (req.params.amount * (1000*3600)));
        var sensors = await DefaultModel.find({$and : [{signature:req.params.id},{RecordDate: {$gte:hoursback}}]},{},{sort: {'RecordDate' : 1}}).exec();
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