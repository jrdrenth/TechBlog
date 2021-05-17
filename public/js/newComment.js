const commentButtonHandler = async function(event) {
  event.preventDefault();

  const postId = document.querySelector('input[name="post-id"]').value;
  const content = document.querySelector('#comment-text').value;

  if (content) {
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id: postId,
        content
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    document.location.reload();
  }
};

document
  .querySelector('#comment-btn')
  .addEventListener('click', commentButtonHandler);
