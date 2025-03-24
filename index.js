const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = '';

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.
// * Code for Route 1 goes here
app.get('/', async (req, res) => {
    const dogsEndpoint = 'https://api.hubspot.com/crm/v3/objects/dogs';
    const headers = {
      Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
      'Content-Type': 'application/json'
    }
    const params = {
      properties: 'name,breed,color'
    }
    try {
      const response = await axios.get(dogsEndpoint, { headers, params });
      console.log('resp: ', JSON.stringify(response.data, null, 2));
      const dogs = response.data.results;
      console.log('dogs:', JSON.stringify(dogs, null, 2));
      res.render('homepage', { dogs: dogs });
    } catch (error) {
      console.error(error);
    }
  })

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here
app.get('/update-dogs', (req, res) => {
    try {
      res.render('updates', { pageTitle: 'Update Dogs Form | Integrating With HubSpot I Practicum' }); // Render the updates.pug template
    } catch (error) {
      console.error(error);
    }
  });

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here
app.post('/update-dogs', async (req, res) => {
    const dogsEndpoint = 'https://api.hubspot.com/crm/v3/objects/dogs';
    const headers = {
      Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
      'Content-Type': 'application/json'
    }
    const props = {
      properties: {
        name: req.body.name,
        breed: req.body.breed,
        color: req.body.color
      }
    }
    try {
      const response = await axios.post(dogsEndpoint, props, { headers });
      console.log('API Response:', JSON.stringify(response.data, null, 2));
      res.redirect('/'); // Redirects to home page
    } catch (error) {
      console.error(error);
    }
  });

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));