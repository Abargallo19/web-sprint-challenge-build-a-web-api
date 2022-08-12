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

router.post('/', (req, res) => {
    // const { name, description } = req.body;
    proModel.insert(req.body)
        .then(project => {
            if (!project.name || !project.description) {
                res.status(400).json({ message: "Please provide a name and a description" });
            } else {
                res.status(201).json(project)
            }
        })
        .catch(() => {
            res.status(400).json({message: "Please provide a name and a description"})
        })



    // .then(({ id }) => {
    //     return proModel.get(id)
    // })
    // .then(newProject => {
    //     res.status(201).json(newProject)
    // })





    // const newProject = await 
    // res.status(201).json({ id: req.params.id, newProject })


})














module.exports = router;