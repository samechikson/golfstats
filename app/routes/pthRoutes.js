//  // app/routes/pthRoutes.js

module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      Pth = require('../models/pth'),
      api = {};

  // ALL
  api.pths = function (req, res) {
    Pth.find(function(err, pths) {
      if (err) {
        res.json(500, err);
      } else {    
        res.json(pths);
      }
    });
  };

  // GET
  api.pth = function (req, res) {
    var id = req.params.id;
    Pth.findOne({ '_id': id }, function(err, pth) {
      if (err) {
        res.json(404, err);
      } else {
        res.json(200, {pth: pth});
      }
    });
  };

  api.pthsId = function(req, res) {
    var id = req.params.id;
    var field = req.params.field;
    if (field == 'tournament') id = mongoose.Types.ObjectId(id);
    var query = {};
    query[field] = id;
    Pth.find(query, function(err, pths) {
      if (err) {
        res.json(404, err);
      } else {
        res.json(pths);
      }
    });
  };

  // POST
  api.addPth = function (req, res) {
    
    var pth;
    console.log(req.body);
      
    if(typeof req.body.pth == 'undefined'){
      return res.json(500, {message: 'pth is undefined and damn'});
    }

    pth = new Pth(req.body);

    pth.save(function (err) {
      if (!err) {
        console.log("created pth");
        return res.json(201, pth.toObject());
      } else {
         return res.json(500, err);
      }
    });

  };

  // PUT
  api.editPth = function (req, res) {
    var id = req.params.id;

    Pth.findById(id, function (err, pth) {
    
      if(typeof req.body.pth["title"] != 'undefined'){
        pth["title"] = req.body.pth["title"];
      }  

      return pth.save(function (err) {
        if (!err) {
          console.log("updated pth");
          return res.json(200, pth.toObject());        
        } else {
         return res.json(500, err);
        }
        return res.json(pth);
      });
    });

  };

  // DELETE
  api.deletePth = function (req, res) {
    var id = req.params.id;
    Pth.findById(id, function (err, pth) {
      return pth.remove(function (err) {
        if (!err) {
          console.log("removed pth");
          return res.send(204);
        } else {
          console.log(err);
          return res.json(500, err);
        }
      });
    });

  };


  app.get('/api/pths', api.pths);
  app.get('/api/pths/:field/:id', api.pthsId);
  app.get('/api/pth/:id', api.pth);
  app.post('/api/pth', api.addPth);
  app.put('/api/pth/:id', api.editPth);
  app.delete('/api/pth/:id', api.deletePth);
};