const router = require('express').Router();
const { User } = require('../../models');


router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    let isError = false;
    if (!user) {
      isError = true;

    } else {
      const validPassword = await user.checkPassword(req.body.password);
      
      if (!validPassword) {
        isError = true;
      }
    }

    if (isError) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.loggedIn = true;
      
      res.status(200).json({ user: user, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).json({ message: 'You are now logged out!' });
    });
  } else {
    res.status(404).json({ message: 'You were not logged in.'});
  }
});


// (C)reate
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// (R)ead All
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
    
  } catch (err) {
    res.status(500).json(err);
  }
});


// (R)ead by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (user != null) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: `No user found with id: ${req.params.id}` });
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});


// (U)update by id
router.put('/:id', async (req, res) => {
  try {
    const result = await User.update(req.body, { where: { id: req.params.id }, individualHooks: true });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});


// (D)elete by id
router.delete("/:id", async (req, res) => {
  try {
      const isDeleted = await User.destroy({ where: { id: req.params.id } });

      if (isDeleted != 0) {
          res.status(200).json(isDeleted);
      } else {
          res.status(404).json(isDeleted);
      }
  } catch (err) {
      res.status(500).json(err);
  }
});


module.exports = router;
