(() => {
  const updateGuestList = (event) => {
    const commentsView = document.querySelector('#comments');
    const formData = new FormData(event.target.form);
    const name = formData.get('name');
    const comment = formData.get('comment');

    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      commentsView.innerHTML = xhr.response;
    };
    xhr.open('POST', '/add-guest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(`name=${name}&comment=${comment}`);
  };

  const main = () => {
    const submitButton = document.querySelector('#submit');
    submitButton.onclick = updateGuestList;
  };

  window.onload = main;
})();
