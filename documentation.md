
# Fortnite Win Tracker

---

Name: Mitchell Skopic

Date: 4/2/19

Project Topic: Fortnite Win Tracker

URL: 

---


### 1. Data Format and Storage

Data point fields:
- `num`:     ...       `Type: Number`
- `kills`:     ...       `Type: Number`
- `weapons`:     ...       `Type: Array`
- `m_length`:     ...       `Type: Number`
- `w_location`:     ...       `Type: String`

Schema: 
```javascript
{
   ...
}
```

### 2. Add New Data

HTML form route: `/...`

POST endpoint route: `/api/...`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/...',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       ...
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/...`

### 4. Search Data

Search Field: ...

### 5. Navigation Pages

Navigation Filters
1. name -> `  route  `
2. ... -> `  ...  `
3. ... -> `  ...  `
4. ... -> `  ...  `
5. ... -> `  ...  `

