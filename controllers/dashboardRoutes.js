const router = require('express').Router();
const withAuth = require('../utils/auth');
const fetch = require("node-fetch");

const URL_PREFIX = `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}`

router.get('/', withAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    // fetches api from serverside through userId
    const response = await fetch(`${URL_PREFIX}/api/posts/byuserid/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    // waits for response of fetch
    const responseText = await response.text();
    // parses the response
    const postsByUser = JSON.parse(responseText);

    console.log('DASHBOARD POSTS BY USER ID:')
    console.log(postsByUser);

    res.render('dashboard', {
      title: 'Your Dashboard',
      postsByUser,
      loggedIn: req.session.loggedIn
    });
    
    console.log('DASHBOARD END');

  } catch (err) {
    res.redirect('login');
  }
});

router.get('/newpost', withAuth, (req, res) => {
  res.render('newPost', {
    title: 'Your Dashboard',
    loggedIn: req.session.loggedIn
  });
});

router.get('/updatePost/:id', withAuth, async (req, res) => {
  try {
    console.log('UPDATE POST ROUTE');

    const postId = req.params.id;    
    const response = await fetch(`${URL_PREFIX}/api/posts/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const responseText = await response.text();
    const post = JSON.parse(responseText);

    console.log(post);

    if (post) {
      res.render('updatePost', {
        title: 'Your Dashboard',
        post,
        loggedIn: req.session.loggedIn
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
