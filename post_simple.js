var request = require('request');

const data = ({
    title: "title",
    department: "Fibre",
    type: 'pareto',
    label: 'new turnback label',
    date: new Date(),
    data: 1,
})

function post (data, url) {
  request.post(
      url,
      { json: data },
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body);
          }
      }
  ); 
}

module.exports = {
  post,
}