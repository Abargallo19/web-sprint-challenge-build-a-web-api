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
    proModel.insert(req.body)
        .then(project => {
            if (!project.name || !project.description) {
                res.status(400).json({ message: "Please provide a name and a description" });
            } else {
                res.status(201).json(project)
            }
        })
        .catch(() => {
            res.status(400).json({ message: "Please provide a name and a description" })
        })
})

router.put('/:id', (req, res) => {
const changes = req.body;
proModel.update(req.params.id, changes)
.then(updatedProject => {
    if(updatedProject) {
        res.status(200).json(updatedProject)
    } else {
        res.status(404).json({message: "doesnt exist with that id"})
    }
})
.catch( error => {
    res.status(400).json({message: 'We Need DETAILS; give name and description'})
})




    // const { name, description } = req.body;

    // if (!name || !description) return res.status(400).json({ message: 'We Need DETAILS; give name and description' });
    // try {
    //     const updatedProjectResult = await proModel.update(req.params.id, { name, description })
    //     if (!updatedProjectResult) return res.status(404).json({ message: "doesnt exist with that id" })

    //     const newUpdate = await proModel.get(req.params.id)
    //     res.status(200).json(newUpdate)
    // } catch (error) {
    //     res.status(400)
    // }
})














module.exports = router;