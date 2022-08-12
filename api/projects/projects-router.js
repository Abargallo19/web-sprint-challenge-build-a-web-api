// Write your "projects" router here!
const express = require('express');
const proModel = require('./projects-model');

const router = express.Router();


router.get('/', async (req, res) => {
    // proModel.get()
    // .then(projects => {
    //     res.status(200).json(projects);
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json({message: 'Something went wrong on our end'})
    // });
    try {
        const allProjects = await proModel.get()
        if(allProjects) return res.status(200).json(allProjects)
    } catch (error) {
        
    }


    
});













module.exports = router;