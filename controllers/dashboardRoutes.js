router.get('/dashboard/', async (req, res) => {
  try {
    res.render('dashboard', {
      title: 'Your Dashboard'
    });

  } catch (err) {
    res.status(500).json(err);
  }
});