const express = require('express');
const router = express.Router();
const MoistSensor = require('../model/moistsensor');

// get All smartsensors
router.get('/',async (req, res) => {
    try{
        const moistsensors = await MoistSensor.find();
        if(moistsensors == null){
            return res.status(404).json({message: "No sensors available" });
        }
        else{
        res.json(moistsensors);
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
});


router.get('/:nid',async (req,res)=>{
    try{
        var sensors = await MoistSensor.find({NetworkId:req.params.nid}).exec();
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

router.get('/:nid/:sid',async (req,res)=>{
    try{
        var sensors = await MoistSensor.find({$and : [{NetworkId:req.params.nid},{SensorId:req.params.sid}]},{},{sort: {'RecordDate' : 1}}).exec();
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

router.get('/:nid/:sid/latest',async (req,res)=>{
    try{
        var sensors = await MoistSensor.findOne({$and : [{NetworkId:req.params.nid},{SensorId:req.params.sid}]},{},{sort: {'RecordDate' : -1}}).exec();
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

router.get('/:nid/:sid/:startdate',async (req,res)=>{
    try{
        var sensors = await MoistSensor.find({$and : [{NetworkId:req.params.nid},{SensorId:req.params.sid},{RecordDate: {$gte:req.params.startdate}}]},{},{sort: {'RecordDate' : 1}}).exec();
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