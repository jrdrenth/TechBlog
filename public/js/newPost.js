const newButtonHandler = async function(event) {
  event.preventDefault();

  const title = document.querySelector('#title-text').value;
  const content = document.querySelector('#content-text').value;

  await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      title,
      content
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#new-btn')
  .addEventListener('click', newButtonHandler);
