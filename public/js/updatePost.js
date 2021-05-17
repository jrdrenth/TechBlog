const postId = document.querySelector('input[name="post-id"]').value;

const updateButtonHandler = async function(event) {
  event.preventDefault();

  // const title = document.querySelector('input[name="post-title"]').value;
  // const content = document.querySelector('textarea[name="post-content"]').value;

  const title = document.querySelector('#title-text').value;
  const content = document.querySelector('#content-text').value;

  await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  document.location.replace('/dashboard');
};

const deleteButtonHandler = async function() {
  await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#update-btn')
  .addEventListener('click', updateButtonHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteButtonHandler);
