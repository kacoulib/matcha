'use strict'

let dataValidator = require('./dataValidator'),
    fs = require('fs'),
    dest = './';

function store(pic, id)
{
  return ;
  console.log(pic)
  //pic = pic.replace(/^data:image\/png;base64,/, "")
  fs.writeFile(dest + "out.png", pic, 'base64', function(err)
  {
    if (err)
      console.log(err);

      console.log('ok')
      return (false);
    fs.readFile(__dirname + "/upload/out.png", function(err, data) {
        if (err) throw err;
        console.log('reading file...', data.toString('base64'));
        res.send(data);
    });
  });
}

module.exports =
{
  save: (pictures, user_id)=>
  {
    if (!dataValidator.is_valid_db_id(user_id))
      return (false);

    pictures.forEach((pic)=> (pic) ? store(pic, user_id) : '');
  },

  delete: (user)=>
  {

  },

  update: (user)=>
  {

  }
}
