(() => {
  const displayComments = () => {
    const commentsView = document.querySelector('#comments');
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      commentsView.innerHTML = xhr.response;
    };
    xhr.open('GET', '/get-guests');
    xhr.send();
  };

  const updateGuestList = (event) => {
    const formData = new FormData(event.target.form);
    const name = formData.get('name');
    const comment = formData.get('comment');

    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      commentsView.innerHTML = xhr.response;
    };
    xhr.open('POST', '/add-guest');
    xhr.send(`name=${name}&comment=${comment}`);
  };

  const main = () => {
    displayComments();
    const submitButton = document.querySelector('#submit');
    submitButton.onclick = updateGuestList;
  };

  window.onload = main;
})();
