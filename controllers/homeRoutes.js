const router = require('express').Router();
const fetch = require("node-fetch");
const withAuth = require('../utils/auth');

const URL_PREFIX = `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}`

// gets all posts
router.get('/', async (req, res) => {
  try {

    console.log('TEST');
    console.log(`${URL_PREFIX}/api/posts/`);

    const postsResponse = await fetch(`${URL_PREFIX}/api/posts/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const postsText = await postsResponse.text();
    const posts = JSON.parse(postsText);

    console.log('POSTS:')
    console.log(posts);

    res.render('homepage', {
      title: 'The Tech Blog',
      posts,
      loggedIn: req.session.loggedIn
    });

    console.log('THE END');

  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    // get post by id
    const postId = req.params.id;
    const postResponse = await fetch(`${URL_PREFIX}/api/posts/${postId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const postText = await postResponse.text();
    const post = JSON.parse(postText);

    res.render('viewPost', {
      title: 'The Tech Blog',
      post,
      loggedIn: req.session.loggedIn
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

  res.render('login', {
    title: 'The Tech Blog'
  });

});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup', {
    title: 'The Tech Blog'
  });
});


module.exports = router;
