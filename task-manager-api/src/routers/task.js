const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')

//to create a new tweet after loggin in.
router.post('/createtweet'  , async (req, res) => {
    const task = new Task(req.body);
    console.log(task);
    try {
        const saved_tweet = await task.save()
        res.status(201).send(saved_tweet)
    } catch (e) {
        res.status(400).send(e)
    }
})


//to get a tweet after loggin in.
router.get('/tasks/:id', async (req, res) => {
    const sort = {}
    const match = { owner: req.params.id }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        await Task.find(match)
          .limit(parseInt(req.query.limit))
          .skip(parseInt(req.query.skip))
          .sort(sort)
          .exec((error, tasks) => {
            if (error) {
              res.status(500).send();
            } else {
              res.send(tasks);
            }
          });
    } catch (e) {
        res.status(500).send();
    }
})

//get all the tweets.
router.get('/tasks', async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await Task.find(match)
          .limit(parseInt(req.query.limit))
          .skip(parseInt(req.query.skip))
          .sort(sort)
          .exec((error, tasks) => {
            if (error) {
              res.status(500).send();
            } else {
              res.send(tasks);
            }
          });
      } catch (e) {
        res.status(500).send();
      }
})



// router.get('/tasks/:id', auth, async (req, res) => {
//     const _id = req.params.id

//     try {
//         const task = await Task.findOne({_id, owner: req.user._id})
//         if (!task) {
//             return res.status(404).send()
//         }
//         res.send(task)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id })
       
        if (!task) {
            return task.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete a tweet.
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/explore', async (req, res) => {
    try {
        const getExploreTweets = await Task.find({
          likes: { $exists: true },
        }).sort({ likes: -1 });
    
        res.status(200).json(getExploreTweets);
      } catch (err) {
        handleError(500, err);
      }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/tasks/:id/avatar', upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250, fit: 'fill'}).png().toBuffer()
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
       
        if (!task) {
            return task.status(404).send()
        }
        task["image"] = buffer
        await task.save()

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id/avatar', auth, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
       
        if (!task) {
            return task.status(404).send()
        }
        task["image"] = undefined
        await task.save()

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router