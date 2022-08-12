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
        if (!projectSelect) return res.status(404).json({ message: 'Houston, we have a problem...that doesnt exist.' })
        res.json(projectSelect)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong on our end' })
    }

});

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
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    proModel.update(req.params.id, changes)
        .then(updatedProject => {
            if (!updatedProject) {
                res.status(404).json({ message: "doesnt exist with that id" })
            }
            else if (!updatedProject.name || !updatedProject.description) {
                res.status(400).json({ message: 'We Need DETAILS; give name and description' })
            }
            else {
                res.status(200).json(updatedProject)
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'We Need a new server' })
        })
});

router.delete('/:id', async (req, res) => {
    try {
        const killswitch = await proModel.get(req.params.id);
        if (!killswitch) {
            res.status(404).json({ message: "whoa! try again doesnt exist" });
        } else {
            await proModel.remove(req.params.id)
            res.status(200).json({ message: "confirmed kill" })
        }
    } catch (error) {
        res.status(500)

    }
});

router.get('/:id/actions', async (req, res) => {
    try {
        const actionJackson = await proModel.get(req.params.id);
        if (!actionJackson) {
            res.status(404).json({ message: "doesnt exist, no action for you" })
        } else {
            const allActions = await proModel.getProjectActions(req.params.id)
            res.status(200).json(allActions)
        }
    } catch (error) {
        res.status(500)
    }
});
module.exports = router;