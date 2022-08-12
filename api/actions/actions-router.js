// Write your "actions" router here!
const express = require('express');
const actionMod = require('./actions-model');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const weGotAction = await actionMod.get()
        if (weGotAction) return res.status(200).json(weGotAction)

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong on our end' })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const actionId = await actionMod.get(req.params.id);
        if (!actionId) return res.status(404).json({ message: 'not an existing ID' });
        res.json(actionId)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong on our end' })
    }
});


router.post('/', async (req, res) => {
    try {
        const { project_id, description, notes } = req.body;
        const action = await actionMod.insert({ project_id, description, notes });
        if (!project_id || !description || !notes) {
            res.status(400).json({ message: 'missing reqs' })
        } else {
            res.status(201).json(action)
        }
    }
    catch (error) {
        res.status(500).json({ message: "uh oh" })
    }
});

router.delete('/:id', async (req, res) => {
try{
    const annihilate = await actionMod.get(req.params.id);
    if(!annihilate){
        res.status(404).json({message: "whoa! try again doesnt exist"});
    } else {
        await actionMod.remove(req.params.id)
        res.status(200).json({message: "confirmed kill"})
    }
} catch(error) {
res.status(500)
}

});
router.put('/:id', (req, res) => {

});


module.exports = router;
