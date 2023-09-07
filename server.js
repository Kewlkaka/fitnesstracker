//Creating an express server
const express = require('express')
const app = express()
const port = 3000
const trackerRoutes = require('./src/database/routes');
//Set up EJS engine
app.set('view engine', 'ejs');
app.use(express.json()) //help post and get json from endpoints.


app.use('/api/v1/fitness_tracker', trackerRoutes);


app.get('/', (req, res) => {
  res.render('homepage'); // Replace with the appropriate route handler for your fitness tracker API
});

app.get('/read-queries/userfitform', (req, res) => {
  res.render('userfitform'); // Render the userfitform.ejs file
});

app.get('/read-queries/exercisesform', (req, res) => {
  res.render('exercisesform'); // Render the exercisesform.ejs file
});

app.get('/read-queries/workoutform', (req, res) => {
  res.render('workoutform'); // Render the workoutform.ejs file
});

app.get('/read-queries/workoutexerciseform', (req, res) => {
  res.render('workoutexerciseform'); // Render the workoutexerciseform.ejs file
});

app.get('/insert-queries/adduserfitform', (req, res) => {
  res.render('adduserfitform'); // Render the adduserfitform.ejs file
});

app.get('/insert-queries/addexercisesform', (req, res) => {
  res.render('addexercisesform'); // Render the addexcercisesform.ejs file
});

app.get('/insert-queries/addworkoutform', (req, res) => {
  res.render('addworkoutform'); // Render the addworkoutform.ejs file
});

app.get('/insert-queries/addworkoutexerciseform', (req, res) => {
  res.render('addworkoutexerciseform'); // Render the addworkoutexcerciseform.ejs file
});

app.get('/update-queries/updateuserfitform', (req, res) => {
  res.render('updateuserfitform'); // Render the updateuserfitform.ejs file
});

app.get('/update-queries/updateexerciseform', (req, res) => {
  res.render('updateexerciseform'); // Render the updateexercise.ejs file
});

app.get('/update-queries/updateworkoutform', (req, res) => {
  res.render('updateworkoutform'); // Render the updateworkoutform.ejs file
});

app.get('/update-queries/updateworkoutexerciseform', (req, res) => {
  res.render('updateworkoutexerciseform'); // Render the updateworkoutexerciseform.ejs file
});

app.get('/delete-queries/deleteuserfitform', (req, res) => {
  res.render('deleteuserfitform'); // Render the deleteuserfitform.ejs file
});

app.get('/delete-queries/deleteExercisesform', (req, res) => {
  res.render('deleteExercisesform'); // Render the deleteExercisesform.ejs file
});

app.get('/join-queries/userWorkoutDetailsForm', (req, res) => {
  res.render('userWorkoutDetailsForm'); // Render the deleteExercisesform.ejs file
});

app.get('/join-queries/exerciseWorkoutExerciseDetailsForm', (req, res) => {
  res.render('exerciseWorkoutExerciseDetailsForm'); // Render the deleteExercisesform.ejs file
});

app.get('/join-queries/totalUserWorkoutsForm', (req, res) => {
  res.render('totalUserWorkoutsForm'); // Render the deleteExercisesform.ejs file
});

app.get('/calculative-queries1/calculateBmiForm', (req, res) => {
  res.render('calculateBmiForm'); // Render the calculateBmiForm.ejs file
});

app.get('/calculative-queries1/totalCaloriesBurnedForm', (req, res) => {
  res.render('totalCaloriesBurnedForm'); // Render the calculateBmiForm.ejs file
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})