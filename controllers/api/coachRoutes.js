const router = require('express').Router();
const { Client, Coach, } = require('../../models');

router.get("/", (req, res) => {
  Coach.findAll({
    include: [Client,]
  }).then(data => {
    res.json(data)
  }).catch(err => {
    res.status(500).json({ msg: "womp womp", err })
  })
})

//TODO: get Coach by id

router.get("/:email", async (req, res) => {
  try {
    const coachData = await Coach.findByPk(req.params.email, {
      include: { model: Client },
    });

    if (!coachData) {
      res.status(404).json({ message: 'No Coach found with that id!' });
      return;
    }

    res.status(200).json(coachData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//CREATES Coach
router.post('/', async (req, res) => {
  try {
    const newCoach = await Coach.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json(newCoach);
  } catch (err) {
    res.status(400).json(err);
  }
});

// TODO: DELETE COACH

router.delete('/:id', async (req, res) => {
  try {
    const deleteCoach = await Coach.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCoach) {
      res.status(404).json({ message: 'No coach found with this id!' });
      return;
    }

    res.status(200).json(deleteCoach);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updateCoach = await Coach.update(
      req.body,
      {

        where: {
          id: req.params.id,
        },
      });

    if (!updateCoach) {
      res.status(404).json({ message: 'No coach found with this id!' });
      return;
    }

    res.status(200).json(updateCoach);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

module.exports = router;