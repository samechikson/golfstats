//  // app/routes/tournamentRoutes.js

module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      Tournament = require('../models/tournament'),
      api = {};

  // ALL
  api.tournaments = function (req, res) {
    Tournament.find(function(err, tournaments) {
      if (err) {
        res.json(500, err);
      } else {    
        res.json(tournaments);
      }
    });
  };

  // GET
  api.tournament = function (req, res) {
    var id = req.params.id;
    Tournament.findOne({ '_id': id }, function(err, tournament) {
      if (err) {
        res.json(404, err);
      } else {
        res.json(200, tournament);
      }
    });
  };

  // POST
  api.addTournament = function (req, res) {
    
    var tournament;
    console.log(req.body);
      
    if(typeof req.body.tournament == 'undefined'){
      return res.json(500, {message: 'tournament is undefined'});
    }

    tournament = new Tournament(req.body);

    tournament.save(function (err) {
      if (!err) {
        console.log("created tournament");
        return res.json(201, tournament.toObject());
      } else {
         return res.json(500, err);
      }
    });

  };

  // PUT
  api.editTournament = function (req, res) {
    var id = req.params.id;

    Tournament.findById(id, function (err, tournament) {
    
      if(typeof req.body.tournament["title"] != 'undefined'){
        tournament["title"] = req.body.tournament["title"];
      }  

      return tournament.save(function (err) {
        if (!err) {
          console.log("updated tournament");
          return res.json(200, tournament.toObject());        
        } else {
         return res.json(500, err);
        }
        return res.json(tournament);
      });
    });

  };

  // DELETE
  api.deleteTournament = function (req, res) {
    var id = req.params.id;
    Tournament.findById(id, function (err, tournament) {
      return tournament.remove(function (err) {
        if (!err) {
          console.log("removed tournament");
          return res.send(204);
        } else {
          console.log(err);
          return res.json(500, err);
        }
      });
    });

  };


  app.get('/api/tournaments', api.tournaments);
  app.get('/api/tournament/:id', api.tournament);
  app.post('/api/tournament', api.addTournament);
  app.put('/api/tournament/:id', api.editTournament);
  app.delete('/api/tournament/:id', api.deleteTournament);
};