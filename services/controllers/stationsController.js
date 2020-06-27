var Stations = require('../models/StationModel');

module.exports = function(app) {

  setInterval(function(){ 
    console.log('station service called');
   }, 3000);
    
    app.post('/api/todo', function(req, res) {
        if (req.body.id) {
          Stations.findByIdAndUpdate(req.body.id, { todo: req.body.todo, isDone: req.body.isDone, hasAttachment: req.body.hasAttachment }, function(err, todo) {
                if (err) throw err;
                
                res.send('Success');
            });
        }
        else {
            var newStation = Stations({
                username: 'test',
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            });
            newStation.save(function(err) {
                if (err) throw err;
                res.send('Success');
            });
        }
    });
    
}