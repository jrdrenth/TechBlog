const router = require('express').Router();

const URL_PREFIX = `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}`

// gets all posts
router.get('/', async (req, res) => {
  try {
    const postsResponse = await fetch(`${URL_PREFIX}/api/posts/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const postsText = await postsResponse.text();
    const posts = JSON.parse(postsText);

    res.render('homepage', {
      title: 'The Tech Blog',
      posts
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get('/posts/:id', async (req, res) => {
  try {
    // get post by id
    const postId = req.params.id;
    const postResponse = await fetch(`${URL_PREFIX}/api/posts/${postId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const postText = await postResponse.text();
    const post = JSON.parse(postText);

    res.render('homepage', {
      title: 'The Tech Blog',
      post
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});


module.exports = router;
