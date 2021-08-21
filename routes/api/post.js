const express = require('express')
const apipost = express.Router()
const Post = require('../../models/post')


apipost.get('/api/:id',(req, res) => {
    const id = req.params.id;
    Post.findById(id)
    .then(result => {
      res.send(result)
      res.status(201).send(result);
        })
    .catch(err => {
      console.log(err);
    }); 
  }); 


apipost.get('/api',(req, res)=>
{
    Post.find().sort({ createdAt: -1 }).then((result)=>{
      res.send(result)
      res.status(201).send();

    }) 
     .catch(err => {
      console.log(err);
    }); 
    }
)


 apipost.post('/api', (req, res) => {
      const Post1 = new Post({
        title: req.body.title,
        content: req.body.content,
      });
        Post1.save().then(()=>{
          res.status(201).send();

        });
       }); 

        apipost.delete('/api/del/:id', async (req, res) => {
      var id = req.params.id;
      Post.deleteOne({ _id: id }).then(()=>{ 
        res.status(200).send();
      }).catch(err=>{console.log(err)})
    }); 
    
     apipost.post('/api/:id', (req, res) => {
      Post.updateMany({ _id: req.params.id }, {
        title: req.body.title,
        content: req.body.content
      }).then(()=>{
        res.status(200).send();
      });
       })

module.exports = apipost