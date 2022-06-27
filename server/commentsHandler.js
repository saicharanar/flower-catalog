const fs = require('fs');

const storeComments = (request, response) => {
  const { name, comment } = request.queryParams;
  const commenter = { name, comment };
  fs.appendFileSync('data/comments.json', JSON.stringify(commenter), 'utf8');
};

const commentsHandler = (request, response) => {
  const { uri } = request;

  console.log(uri);
  if (uri === '/comments') {
    storeComments(request, response);
    return true;
  }

  return false;
};

module.exports = { commentsHandler };
