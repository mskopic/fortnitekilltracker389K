
# Fortnite Win Tracker

---

Name: Mitchell Skopic

Date: 4/2/19

Project Topic: Fortnite Win Tracker

URL: https://fortnitekilltracker.herokuapp.com/

---


### 1. Data Format and Storage

Data point fields:
- `num`:     ...       `Type: Number`
- `kills`:     ...       `Type: Number`
- `weapons`:     ...       `Type: Array`
- `m_length`:     ...       `Type: Number`
- `location`:     ...       `Type: String`

Schema: 
```javascript
{
   ...
}
```

### 2. Add New Data

HTML form route: `/addWin`

POST endpoint route: `/api/addWin`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/addWin',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: {
      id: 6,
      kills: 5,
      weapon1: "shotgun",
      weapon2: "smg",
      weapon3: "AR",
      weapon4: "sniper",
      weapon5: "medkit",
      m_duration: 21.4,
      w_location_letter: F,
      w_location_number: 2
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getWins`

### 4. Search Data

Search Field: w_location

### 5. Navigation Pages

Navigation Filters
1. First Win -> `/firstwin`
2. Winningest Location -> `/Location`
3. Shortest Win -> `/Shortest`
4. Most Kills in a Game -> `/MostKills`
5. Wins with No Heals -> `/Clutch`