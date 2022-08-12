// Write your "projects" router here!
const express = require('express');
const proModel = require('./projects-model');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const allProjects = await proModel.get()
        if (allProjects) return res.status(200).json(allProjects)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong on our end' })
    }

});


router.get('/:id', async (req, res) => {
    try {
        const projectSelect = await proModel.get(req.params.id)
        if (!projectSelect) {
            res.status(404).json({ message: 'Houston, we have a problem...that doesnt exist.' })
        } else {
            res.json(projectSelect)
        }
    } catch (error) {

    }

})













module.exports = router;