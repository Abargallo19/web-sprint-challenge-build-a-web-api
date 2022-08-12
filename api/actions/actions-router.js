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
})














module.exports = router;
