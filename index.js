var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');

var app = express();

var fs = require('fs');
var _ = require("underscore");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

var _DATA = (JSON.parse(fs.readFileSync('fortnite_data.json'))).wins; //get data from file

var toAdd = {};


function stringify_data(data) {
	var new_data = [];
	for (var x=0; x < _DATA.length; x++) {
  		new_data.push(
  			{"id":data[x].id.toString(),
  			 "kills":data[x].kills.toString(),
  			 "weapons":data[x].weapons.toString(),
  			 "match_length":data[x].match_length.toString(),
  			 "location":data[x].location.toString()});
    }
}
/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */
var request;
var result;


app.get('/',function(req,res){
  	var data = stringify_data(_DATA);
  	res.render('home',{
		found: true,
		data: _DATA,
    s_data: data
	});
})

app.get('/api/getWins',function(req,res){
  var win_data = []
  for (var x=0; x < _DATA.length; x++) {
  	win_data.push(JSON.stringify(_DATA[x]));
  }
  res.render('getwins',{
  	wins: win_data
  });
})

app.get('/firstwin',function(req,res){
	var first_w = _.findWhere(_DATA, { "id": 1 });
  res.render('firstwin',{
  	id: first_w.id.toString(),
  	kills: first_w.kills.toString(),
  	weapons: first_w.weapons.toString(),
  	match_l: first_w.match_length.toString(),
  	location: first_w.location.toString()
  });
})

app.get('/location',function(req,res){
  var deadlist_loc = {};//_DATA[0].location;
  for (var x=0; x < _DATA.length; x++) {
    var loc_key = _DATA[x].location;
    if (loc_key in deadlist_loc) {
          deadlist_loc[loc_key]++;
        } else {
          deadlist_loc[loc_key] = 1;
        }
  }
  var to_return = _DATA[0].location;//_findWhere(_DATA, {"location": deadliest_loc})
  var count = 0;
  var keys = Object.keys(deadlist_loc);
  for (var x=0; x < keys; x++) {
    if (deadlist_loc[keys[x]] > count) {
      to_return = keys[x];
    }
  }

  res.render('location',{
    loc: to_return
  });
})

app.get('/shortest',function(req,res){
  var s_win = _DATA[0];
  var count = s_win.match_length;
  //var keys = Object.keys(_DATA);
  for (var x=0; x < _DATA.length; x++) {
    if (_DATA[x].match_length < count) {
      s_win = _DATA[x];
      count = s_win.match_length;
    }
  }

  res.render('shortest',{
    id: s_win.id.toString(),
    kills: s_win.kills.toString(),
    weapons: s_win.weapons.toString(),
    match_l: s_win.match_length.toString(),
    location: s_win.location.toString()
  });
})

app.get('/mostKills',function(req,res){
  var m_win = _DATA[0];
  var count = m_win.kills;
  //var keys = Object.keys(_DATA);
  for (var x=0; x < _DATA.length; x++) {
    if (_DATA[x].kills > count) {
      m_win = _DATA[x];
      count = m_win.kills;
    }
  }

  res.render('mostKills',{
    id: m_win.id.toString(),
    kills: m_win.kills.toString(),
    weapons: m_win.weapons.toString(),
    match_l: m_win.match_length.toString(),
    location: m_win.location.toString()
  });
})

app.get('/clutch',function(req,res){
  var new_data = [];
  //var data = stringify_data(_DATA);
  //var keys = Object.keys(_DATA);
  for (var x=0; x < _DATA.length; x++) {
    if (!_DATA[x].weapons.includes("medkit") && !_DATA[x].weapons.includes("shield")) {
      new_data.push(_DATA[x]);
      //m_win = _DATA[x];
      //count = m_win.kills;
    }
  }


  res.render('clutch',{
    found: true,
    data: _DATA,
    s_data: new_data
  });
})



//ADD WIN
app.get('/addwin',function(req,res) {
	res.render('addwin',{
		num_wins: _DATA.length.toString()
	});
})

app.get('/addwin/added',function(req,res) {
	var winNum = parseInt(req.query.winnum);
    var kill_count = parseInt(req.query.kills);
    var w1 = req.query.weapon1;
    var w2 = req.query.weapon2;
    var w3 = req.query.weapon3;
    var w4 = req.query.weapon4;
    var w5 = req.query.weapon5;
    var duration = parseFloat(req.query.m_duration);
    var location_letter = req.query.w_location_letter.toString();
    var location_number = req.query.w_location_num.toString();
    weapons = [];
    weapons.push(w1);
    weapons.push(w2);
    weapons.push(w3);
    weapons.push(w4);
    weapons.push(w5);

    //add data to _DATA
    win_data = {"id": winNum,
				"kills": kill_count,
				"weapons": weapons,
				"match_length": duration,
				"location": location_letter.concat(location_number)};
	var ver = true;
  var dup = false;
  for (var x=0; x < _DATA.length; x++) {
    if (_DATA[x].id == winNum) {
      dup = true;
    }
  }
  //var sds = (_.findWhere(_DATA, {"id": winNum}));
  //if ) {
	if ((!winNum || !kill_count || !duration || !location_letter || !location_number)) {//!(dup[0].id == winNum)) {//
		ver = false;
	} else {
    if (!dup) {
  		_DATA.push(win_data);

  		var obj = {
  			wins: _DATA
  		};

  		fs.writeFileSync('fortnite_data.json', JSON.stringify(obj));
  	} else {
      ver = false;
    }
  }

	res.render('addedwin',{
		verified: ver,
		data: JSON.stringify(win_data)
	});
})

app.post('/api/addWin',function(req,res){

	var winNum = parseInt(req.body.id);
    var kill_count = parseInt(req.body.kills);
    var w1 = req.body.weapon1;
    var w2 = req.body.weapon2;
    var w3 = req.body.weapon3;
    var w4 = req.body.weapon4;
    var w5 = req.body.weapon5;
    var duration = parseFloat(req.body.m_duration);
    var location_letter = req.body.w_location_letter.toString();
    var location_number = req.body.w_location_num.toString();
    weapons = [];
    weapons.push(w1);
    weapons.push(w2);
    weapons.push(w3);
    weapons.push(w4);
    weapons.push(w5);

    //add data to _DATA
    win_data = {"id": winNum,
				"kills": kill_count,
				"weapons": weapons,
				"match_length": duration,
				"location": location_letter.concat(location_number)};

	_DATA.push(win_data);

	var obj = {
		wins: _DATA
	};

	fs.writeFileSync('fortnite_data.json', JSON.stringify(obj));

	res.render('addedwin',{
		data: JSON.stringify(win_data)
	});
});

app.listen(process.env.PORT || 3000, function() {
    console.log('Listening!');
});













