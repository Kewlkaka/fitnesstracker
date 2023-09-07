// Import database/pool from db.js
const pool = require('../../db');
const queries = require('./queries');

// Store our business logic related to each route
const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.render('userfit', { userfit: results.rows });
  });
};

const getUserById = (req, res) => {
  const user_id = parseInt(req.params.user_id);
  if (isNaN(user_id)) {
    res.status(400).json({ error: 'Invalid User ID' });
    return;
  }
  pool.query(queries.getUserById, [user_id], (error, results) => {
    if (error) {
      console.error('Error fetching User By Username:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.render('userfit', { userfit: results.rows});
  });
};

const getUsersByUsername = (req, res) =>{
  const username = req.params.username;
  pool.query(queries.getUsersByUsername, [username], (error, results) =>{
    if (error) {
      console.error('Error fetching User By Username:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.render('userfit', { userfit: results.rows});
  });
};

const getUsersByEmail = (req, res) =>{
  const email = req.params.email;
  pool.query(queries.getUsersByEmail, [email], (error, results) =>{
    if (error) {
      console.error('Error fetching User By Gender:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.render('userfit', { userfit: results.rows});
  });
};

const getUsersByGender = (req, res) =>{
  const gender = parseInt(req.params.gender);
  if (isNaN(gender)) {
    res.status(400).json({ error: 'Invalid Min Height' });
    return;
  }
  pool.query(queries.getUsersByGender, [gender], (error, results)=>{
    if (error) {
      console.error('Error fetching User By Gender:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.render('userfit', { userfit: results.rows });
  });
};

const getUsersByHeightRange = (req, res) => {
  const minHeight = parseInt(req.params.minHeight);
  if (isNaN(minHeight)) {
    res.status(400).json({ error: 'Invalid Min Height' });
    return;
  }
  const maxHeight = parseInt(req.params.maxHeight);
  if (isNaN(minHeight)) {
    res.status(400).json({ error: 'Invalid Min Height' });
    return;
  }
  pool.query(queries.getUsersByHeightRange, [minHeight, maxHeight], (error, results) => {
    if (error) {
      console.error('Error fetching User By Weight:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.render('userfit', {userfit: results.rows });
  });
};

const getUsersByWeightRange = (req, res) => {
  const minWeight = parseInt(req.params.minWeight);
  if (isNaN(minWeight)) {
    res.status(400).json({ error: 'Invalid Min Weight' });
    return;
  }
  const maxWeight = parseInt(req.params.maxWeight);
  if (isNaN(maxWeight)) {
    res.status(400).json({ error: 'Invalid Max Weight' });
    return;
  }
  pool.query(queries.getUsersByWeightRange, [minWeight, maxWeight], (error, results) => {
    if (error) {
      console.error('Error fetching User By Weight:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.render('userfit', {userfit: results.rows });
  });
};

const insertUserfit = (req, res) =>{
  const insertusername = req.body.username;
  const insertemail = req.body.email;
  const insertpassword = req.body.password;
  const insertheight = parseInt(req.body.heights);
  if (isNaN(insertheight)) {
    console.log(insertheight);
    res.status(400).json({ error: 'Invalid Height' });
    return;
  }
  const insertweight = parseInt(req.body.weight);
  if (isNaN(insertweight)) {
    res.status(400).json({ error: 'Invalid Weight' });
    return;
  }
  const insertbirthdate = req.body.birth_date ;
  const insertgender = parseInt(req.body.gender);
  if (isNaN(insertgender)) {
    res.status(400).json({ error: 'Invalid Gender' });
    return;
  }
  pool.query(queries.insertUserfit, 
    [insertusername, insertemail, insertpassword, 
      insertheight, insertweight, insertbirthdate, insertgender ], (error, results) => {
        if (error) {
          console.error('Error Inserting Data. Recheck Values:', error);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        res.status(200).json({ message: 'User inserted successfully' });
      });
};

const updateUserInfo = (req, res) => {
  const updateusername = req.body.username;
  const updateEmail = req.body.email;
  const updatepassword = req.body.password;
  const updateheight = parseInt(req.body.height);
  if(isNaN(updateheight)){
    res.status(400).json({error: 'Invalid Height'});
    return;
  }
  const updateweight = parseInt(req.body.weight);
  if(isNaN(updateweight)){
    res.status(400).json({error: 'Invalid Weight'});
    return;
  }
  const referenceuid = parseInt(req.body.user_id);
  if(isNaN(referenceuid)){
    res.status(400).json({error:'Invalid User ID'});
    return;
  }
  pool.query(queries.updateUserInfo, [updateusername, updateEmail, updatepassword, updateheight, updateweight, referenceuid], (error, results)=>{
    if(error){
      console.error('Error Inserting Data. Recheck Values', error);
      res.status(500).json({error:'Internal Server Error'});
      return;
    }
    res.status(200).json({message:'User Details Updated Successfully'})
  });
};


const deleteUserByUsernamePassword = (req, res) => {
  const deleteusername = req.body.username;
  const referencepwd = req.body.password;

  pool.query(queries.getUserIDByUsername, [deleteusername], (error, results) => {
      if (error) {
          console.error('Error retrieving user ID', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }
      if (results.rows.length === 0) {
          res.status(404).json({ error: 'User does not exist' });
          return;
      }

      const deleteuid = results.rows[0].user_id;

      pool.query(queries.getWorkoutIDByUserID, [deleteuid], (error, results) => {
          if (error) {
              console.error('Error retrieving workout IDs', error);
              res.status(500).json({ error: 'Internal Server Error' });
              return;
          }

          const workoutIDs = results.rows.map((row) => row.workout_id);

          if (workoutIDs.length > 0) {
              // Process workoutIDs in a for loop
              for (let k = 0; k < workoutIDs.length; k++) {
                  const workoutID = workoutIDs[k];

                  pool.query(queries.getworkoutExerciseIdByWId, [workoutID], (error, results) => {
                      if (error) {
                          console.error('Error retrieving workout exercises by workout ID', error);
                          return;
                      }

                      const workoutExerciseIDs = results.rows.map((row) => row.workout_id);

                      if (workoutExerciseIDs.length > 0) {
                          for (let x = 0; x < workoutExerciseIDs.length; x++) {
                              const workoutExerciseID = workoutExerciseIDs[x];
                              pool.query(queries.deleteWorkoutExerciseById, [workoutExerciseID], (error, results) => {
                                  if (error) {
                                      console.error('Error deleting workout exercise by ID', error);
                                      return;
                                  }
                              });
                          }
                      }
    
                  });
              }
              pool.query(queries.deleteWorkoutByUserId, [deleteuid], (error, results) => {
                  if (error) {
                      console.error('Error deleting workout by user ID', error);
                      return;
                  }

              });
          }
          pool.query(queries.deleteUserByUsernamePassword, [deleteusername, referencepwd], (error, results) => {
              if (error) {
                  console.error('Password or Username Incorrect', error);
                  res.status(500).json({ error: 'Internal Server Error' });
                  return;
              }
              res.status(200).json({ message: 'User deleted successfully, All associations deleted' });
          });
      });
  });
};
      
            

//Exercises

const getExercises = (req, res) => {
  pool.query(queries.getExercises, (error, results) => {
    if (error) throw error;
    res.render('exercises', { exercises: results.rows });
  });
};

const getExerciseById = (req, res) => {
  const exercise_id = parseInt(req.params.exercise_id);
  if (isNaN(exercise_id)) {
    res.status(400).json({ error: 'Invalid exercise ID' });
    return;
  }
  pool.query(queries.getExerciseById, [exercise_id], (error, results) => {
    if (error) {
      console.error('Error fetching exercise by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.render('exercises', { exercises: results.rows });
  });
};

const getExercisesByCategory = (req, res) => {
  const exercise_category = req.params.exercise_category;
  pool.query(queries.getExercisesByCategory, [exercise_category], (error, results) => {
    if (error) {
      console.error('Error fetching exercise by Category:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.render('exercises', { exercises: results.rows });
  });
};

const getExercisesByCaloriesRange = (req, res) => {
  const minCalories = parseInt(req.params.minCalories);
  if (isNaN(minCalories)) {
    res.status(400).json({ error: 'Invalid Min Calories' });
    return;
  }
  const maxCalories = parseInt(req.params.maxCalories);
  if (isNaN(maxCalories)) {
    res.status(400).json({ error: 'Invalid Max Calories' });
    return;
  }
  pool.query(queries.getExercisesByCaloriesRange, [minCalories, maxCalories], (error, results) => {
    if (error) {
      console.error('Error Fetching Exercise Within This Caloric Range:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.render('exercises', {exercises: results.rows });
  });
};

const insertExercises = (req, res) =>{
  const insertExerciseName = req.body.exercise_name;
  const insertDescription = req.body.exercise_description;
  const insertCategory = req.body.exercise_category;
  const insertCaloriesBurned = parseInt(req.body.calories_burned_per_minute);
  if (isNaN(insertCaloriesBurned)) {
    res.status(400).json({ error: 'Invalid Calories Burned' });
    return;
  }
  pool.query(queries.insertExercises, 
    [insertExerciseName, insertDescription, insertCategory, insertCaloriesBurned], (error, results) => {
        if (error) {
          console.error('Error Inserting Data. Recheck Values:', error);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        res.status(200).json({ message: 'Exercise inserted successfully' });
      });
};

const updateExerciseInfo = (req, res) => {
  const updateExercisename = req.body.exercise_name;
  const updateExerciseDescription = req.body.exercise_description;
  const updateExerciseCategory = req.body.exercise_category;
  const updatecaloiresbpm = parseInt(req.body.calories_burned_per_minute);
  if(isNaN(updatecaloiresbpm)){
    res.status(400).json({error: 'Invalid Height'});
    return;
  }
  const referenceEid = parseInt(req.body.exercise_id);
  if(isNaN(referenceEid)){
    res.status(400).json({error: 'Invalid Exercise ID'});
    return;
  }
  pool.query(queries.updateExerciseInfo, [updateExercisename, updateExerciseDescription, updateExerciseCategory, updatecaloiresbpm, referenceEid], (error, results)=>{
    if(error){
      console.error('Error Inserting Data. Recheck Values', error);
      res.status(500).json({error:'Internal Server Error'});
      return;
    }
    res.status(200).json({message:'Exercise Details Updated Successfully'})
  });
};

const deleteExercisesByName = (req, res) => {
  const deleteExercisename = req.body.exercise_name;

  pool.query(queries.getExerciseIDByExerciseName, [deleteExercisename], (error, results) => {
      if (error) {
          console.error('Error retrieving Exercise ID', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }
      if (results.rows.length === 0) {
          res.status(404).json({ error: 'User does not exist' });
          return;
      }

      const delete_eid = results.rows[0].exercise_id;

      pool.query(queries.getWorkoutIdByExerciseId, [delete_eid], (error, results) => {
          if (error) {
              console.error('Error retrieving workout IDs', error);
              res.status(500).json({ error: 'Internal Server Error' });
              return;
          }

          const workoutIDs = results.rows.map((row) => row.workout_id);

          if (workoutIDs.length > 0) {
              // Process workoutIDs in a for loop
              for (let k = 0; k < workoutIDs.length; k++) {
                  const workoutID = workoutIDs[k];

                  pool.query(queries.getworkoutExercise_EidByWId, [workoutID], (error, results) => {
                      if (error) {
                          console.error('Error retrieving workoutexercise Exercise Id by workout ID', error);
                          return;
                      }

                      const workoutExercise_Eids = results.rows.map((row) => row.exercise_id);

                      if (workoutExercise_Eids > 0) {
                          for (let x = 0; x < workoutExercise_Eids.length; x++) {
                              const workoutExercise_Eid = workoutExercise_Eids[x];
                              pool.query(queries.deleteWorkoutExerciseBy_Eid, [workoutExercise_Eid], (error, results) => {
                                  if (error) {
                                      console.error('Error deleting workout exercise by exercise ID', error);
                                      return;
                                  }
                              });
                          }
                      }
                      // Process workoutExerciseIDs in a for loop
                  });
              }
              pool.query(queries.deleteWorkoutByExerciseId, [delete_eid], (error, results) => {
                  if (error) {
                      console.error('Error deleting workout by Exercise ID', error);
                      return;
                  }

              });
          }
          pool.query(queries.deleteExercisesByName, [deleteExercisename], (error, results) => {
              if (error) {
                  console.error('Exercise Name Incorrect', error);
                  res.status(500).json({ error: 'Internal Server Error' });
                  return;
              }
              res.status(200).json({ message: 'Exercise deleted successfully, All associations deleted' });
          });
      });
  });
};
//Workout

const getAllWorkouts = (req,res) => {
  pool.query(queries.getAllWorkouts, (error, results) => {
    if (error) throw error;
    res.render('workout', { workout: results.rows });
  });
}

const getWorkoutsByUserId = (req, res) => {
  const  workout_userid = parseInt(req.params.workout_userid);
  if (isNaN(workout_userid)) {
    res.status(400).json({ error: 'Invalid User ID' });
    return;
  }
  pool.query(queries.getWorkoutsByUserId, [workout_userid], (error, results) => {
    if (error) {
      console.error('Error fetching Workout by User ID:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.render('workout', { workout: results.rows });
  });
};

const getWorkoutsByDate = (req, res) => {
  const workout_date = req.params.workout_date;
  pool.query(queries.getWorkoutsByDate, [workout_date], (error, results) => {
    if (error) {
      console.error('Error fetching workouts by date:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.render('workout', { workout: results.rows });
  });
};

const getWorkoutsByExerciseId = (req, res) => {
  const  workout_exerciseid = parseInt(req.params.workout_exerciseid);
  if (isNaN(workout_exerciseid)) {
    res.status(400).json({ error: 'Invalid Exercise ID' });
    return;
  }
  pool.query(queries.getWorkoutsByExerciseId, [workout_exerciseid], (error, results) => {
    if (error) {
      console.error('Error fetching Workout by User ID:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.render('workout', { workout: results.rows });
  });
};

const insertWorkout = (req, res) => {
  const insertuid = parseInt(req.body.user_id);
  if(isNaN(insertuid)){
    res.status(400).json({error: 'Invalid User ID'})
  }
  const insertwdate = req.body.workout_date;
  const insertwduration = parseInt(req.body.workout_duration);
  if(isNaN (insertwduration)){
    res.status(400).json({error: 'Invalid Workout Duration'})
  }
  const inserteid = req.body.exercise_id;
  if(isNaN (inserteid)){
    res.status(400).json({error: 'Invalid Exercise ID'})
  }
  pool.query(queries.insertWorkout, [insertuid, insertwdate, insertwduration, inserteid], (error, results)=>{
    if(error){
      console.error('Error Inserting Data. Recheck Values:', error);
          res.status(500).json({ error: 'Internal server error' });
          return;
    }
    res.status(200).json({ message: 'Workout inserted successfully' });
  });
};

const updateWorkoutInfo = (req, res) => {
  const updateuid = parseInt(req.body.user_id);
  if(isNaN(updateuid)){
    res.status(400).json({error: 'Invalid User ID'});
    return;
  }
  const updatewdate = req.body.workout_date;
  const updatewduration = parseInt(req.body.workout_duration);
  if(isNaN(updatewduration)){
    res.status(400).json({error: 'Invalid Workout Duration'});
    return;
  }
  const updateEid = parseInt(req.body.exercise_id);
  if(isNaN(updateEid)){
    res.status(400).json({error: 'Invalid Exercise ID'});
    return;
  }
  const referencewid = parseInt(req.body.workout_id);
  if(isNaN(referencewid)){
    res.status(400).json({error:'Invalid Workout ID'});
    return;
  }
  pool.query(queries.updateWorkoutInfo, [updateuid, updatewdate, updatewduration, updateEid, referencewid], (error, results)=>{
    if(error){
      console.error('Error Inserting Data. Recheck Values', error);
      res.status(500).json({error:'Internal Server Error'});
      return;
    }
    pool.query(queries.deleteWorkoutExerciseById, [referencewid], (deleteError, results) => {
      if (deleteError) {
        console.error('Error Deleting Workout Exercise Data', deleteError);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
    })
    res.status(200).json({message:'Workout Details Updated Successfully'})
  });
};

//WorkoutExercise

const getAllWorkoutExercises = (req, res) => {
  pool.query(queries.getAllWorkoutExercises, (error, results) => {
    if (error) {
      console.error('Error fetching Workout by User ID:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.render('workoutexercise', { workoutexercise: results.rows });
  })
}

const getWorkoutExercisesBySets = (req, res) => {
  const  workout_sets = parseInt(req.params.workout_sets);
  if (isNaN(workout_sets)) {
    res.status(400).json({ error: 'Invalid Set' });
    return;
  }
  pool.query(queries.getWorkoutExercisesBySets, [workout_sets], (error, results) => {
    if (error) {
      console.error('Error fetching Workout details by Sets:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.render('workoutexercise', { workoutexercise: results.rows });
  });
};

const getWorkoutExercisesByReps = (req, res) => {
  const  workout_reps = parseInt(req.params.workout_reps);
  if (isNaN(workout_reps)) {
    res.status(400).json({ error: 'Invalid Set' });
    return;
  }
  pool.query(queries.getWorkoutExercisesByReps, [workout_reps], (error, results) => {
    if (error) {
      console.error('Error fetching Workout details by Sets:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.render('workoutexercise', { workoutexercise: results.rows });
  });
};

const getWorkoutExerciseByWorkoutAndExerciseId = (req, res) => {
  const workout_id = parseInt(req.params.workout_id);
  if (isNaN(workout_id)) {
    res.status(400).json({ error: 'Invalid W_ID' });
    return;
  }
  const exercise_id = parseInt(req.params.exercise_id);
  if (isNaN(exercise_id)) {
    res.status(400).json({ error: 'Invalid E_ID' });
    return;
  }
  pool.query(
    queries.getWorkoutExercisesByWorkoutAndExerciseId,
    [workout_id, exercise_id],
    (error, results) => {
      if (error) throw error;
      res.render('workoutexercise', { workoutexercise: results.rows });
    }
  );
};

const insertWorkoutExercise = (req, res) => {
  const insertwid = parseInt(req.body.workout_id);
  if (isNaN(insertwid)) {
    res.status(400).json({ error: 'Invalid Workout ID' });
    return;
  }

  const inserteid = parseInt(req.body.exercise_id);
  if (isNaN(inserteid)) {
    res.status(400).json({ error: 'Invalid Exercise ID' });
    return;
  }
  pool.query(queries.checkQuery, [insertwid, inserteid], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.rowCount === 0) {
      // The workout and exercise IDs do not exist in the workout table
      res.status(400).json({ error: 'Invalid Workout and Exercise ID Pair. Please Refer to Workout Table' });
      return;
    }

    const insertsets = parseInt(req.body.sets);
    if (isNaN(insertsets)) {
      res.status(400).json({ error: 'Invalid Sets' });
      return;
    }

    const insertreps = parseInt(req.body.reps);
    if (isNaN(insertreps)) {
      res.status(400).json({ error: 'Invalid Reps' });
      return;
    }

    const insertweight = parseInt(req.body.weight);
    if (isNaN(insertweight)) {
      res.status(400).json({ error: 'Invalid Weight' });
      return;
    }

    pool.query(queries.insertWorkoutExercise, [insertwid, inserteid, insertsets, insertreps, insertweight], (error, results) => {
      if (error) {
        console.error('Error Inserting Data. Recheck Values:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      res.status(200).json({ message: 'Workout Details Inserted Successfully' });
    });
  });
};


const updateWorkoutExerciseInfo = (req, res) => {
  const updatesets = parseInt(req.body.sets);
  if(isNaN(updatesets)){
    res.status(400).json({error: 'Invalid Sets'});
    return;
  }
  const updatereps = parseInt(req.body.reps);
  if(isNaN(updatereps)){
    res.status(400).json({error: 'Invalid Reps'});
    return;
  }
  const referencewid = parseInt(req.body.workout_id);
  if(isNaN(referencewid)){
    res.status(400).json({error: 'Invalid Workout ID'});
    return;
  }
  const referenceEid = parseInt(req.body.workout_id);
  if(isNaN(referenceEid)){
    res.status(400).json({error:'Invalid Exercise ID'});
    return;
  }
  pool.query(queries.updateWorkoutExerciseInfo, [updatesets, updatereps, referencewid, referenceEid], (error, results)=>{
    if(error){
      console.error('Error Inserting Data. Recheck Values', error);
      res.status(500).json({error:'Internal Server Error'});
      return;
    }
    res.status(200).json({message:'Workout Details Updated Successfully'})
  });
};

//JOIN QUERIES

const getUserWorkoutDetails = (req, res) => {
  const getUsername = req.params.username;
  console.log('Username:', getUsername); // Log the username to check if it is received correctly

  pool.query(queries.getUserIDByUsername, [getUsername], (error, results) => {
    if (error) {
      console.error('Error fetching userID by username:', error);
      res.status(400).json({ error: 'Invalid Username' });
      return;
    }

    if (results.rows.length === 0) {
      console.error('No userID found with the provided username');
      res.status(400).json({ error: 'Invalid Username' });
      return;
    }

    const getUserId = results.rows[0].user_id;
    console.log('User ID:', getUserId); // Check if the user ID is retrieved correctly

    pool.query(queries.getUserWorkoutDetails, [getUserId], (error, results) => {
      if (error) {
        console.error('Error fetching userWorkout Details by User ID:', error);
        res.status(400).json({ error: 'Invalid Username' });
        return;
      }

      console.log('User Workout Details:', results.rows); // Check if the workout details are retrieved correctly

      res.render('userWorkoutDetails', { data: results.rows });
    });
  });
};

const getExerciseWorkoutExerciseDetails = (req, res) => {
  const getExerciseName = req.params.exercise_name;
  console.log('Exercise Name:', getExerciseName); // Log the username to check if it is received correctly

  pool.query(queries.getExerciseIDByExerciseName, [getExerciseName], (error, results) => {
    if (error) {
      console.error('Error fetching exerciseID by exercise name:', error);
      res.status(400).json({ error: 'Invalid Exercise Name' });
      return;
    }

    if (results.rows.length === 0) {
      console.error('No exerciseID found with the provided name');
      res.status(400).json({ error: 'Invalid Exercise Name' });
      return;
    }

    const getExerciseId = results.rows[0].exercise_id;
    console.log('Exercise ID:', getExerciseId); // Check if the user ID is retrieved correctly

    pool.query(queries.getExerciseWorkoutExerciseDetails, [getExerciseId], (error, results) => {
      if (error) {
        console.error('Error fetching Exercise Workout Details by Exercise ID:', error);
        res.status(400).json({ error: 'Invalid Exercise Name' });
        return;
      }
      console.log('Exercise WorkoutExercise Details:', results.rows); // Check if the workout details are retrieved correctly

      res.render('exerciseWorkoutExerciseDetails', { data: results.rows });
    });
  });
};

const getTotalUserWorkouts = (req, res) => {
  const getUsername = req.params.username;
  console.log('username:', getUsername); // Log the username to check if it is received correctly

  pool.query(queries.getTotalUserWorkouts, [getUsername], (error, results) => {
    if (error) {
      console.error('Error fetching total workouts by username:', error);
      res.status(400).json({ error: 'Invalid Username' });
      return;
    }
    console.log('Total User Workouts:', results.rows); // Check if the workout details are retrieved correctly
      res.render('totalUserWorkouts', { data: results.rows });
  });
};

const getTotalExercises = (req, res) => {
  pool.query(queries.getTotalExercises, (error, results) => {
    if (error) {
      console.error('Error fetching total workouts by username:', error);
      res.status(400).json({ error: 'Invalid Username' });
      return;
    }
      console.log('Total Exercises:', results.rows); 
      res.render('totalExercises', { data: results.rows });
  });
};

const calculateBMI = (req, res) => {
  const getUsername = req.params.username;
  pool.query(queries.calculateBMI, [getUsername], (error, results) => {
    if(error){
      console.error('Invalid Username');
      res.status(200).json({error: 'Error calculating bmi from username'});
      return;
    }
    res.render('calculateBmi', { data: results.rows });
  });
};

const totalCaloriesBurned = (req, res) => {
  const getUsername = req.params.username;
  pool.query(queries.totalCaloriesBurned, [getUsername], (error, results) => {
    if(error){
      console.error('Invalid Username');
      res.status(200).json({error: 'Error calculating tcb from username'});
      return;
    }
    res.render('totalCaloriesBurned', { data: results.rows });
  });
};


module.exports = {
  //Read User
  getUsers,
  getUserById,
  getUsersByUsername,
  getUsersByEmail,
  getUsersByGender,
  getUsersByHeightRange,
  getUsersByWeightRange,
  //Write User
  insertUserfit,
  updateUserInfo,
  deleteUserByUsernamePassword,
  //Read Exercise
  getExercises,
  getExerciseById,
  getExercisesByCategory,
  getExercisesByCaloriesRange,
  //Write Exercise
  insertExercises,
  updateExerciseInfo,
  deleteExercisesByName,
  //Read Workout
  getAllWorkouts,
  getWorkoutsByUserId,
  getWorkoutsByDate,
  getWorkoutsByExerciseId,
  //Write Workout
  insertWorkout,
  updateWorkoutInfo,
  //Read Workout Exercise Details
  getAllWorkoutExercises,
  getWorkoutExercisesBySets,
  getWorkoutExercisesByReps,
  getWorkoutExerciseByWorkoutAndExerciseId,
  //Write Workout Exercise
  insertWorkoutExercise,
  updateWorkoutExerciseInfo,
  //Calculative
  calculateBMI,
  totalCaloriesBurned,
  //JOIN
  getUserWorkoutDetails,
  getExerciseWorkoutExerciseDetails,
  getTotalUserWorkouts,
  getTotalExercises,
};





















//Import database/pool from db.js
//const pool = require('../../db');
//const queries = require('./queries');

//Store our business logic related to each route
/*const getKillers = (req, res)=>{
    //console.log("Getting students");
    //use pool to query our database 
    pool.query(queries.getKillers, (error, results)=>{
        if(error) throw error;
        //res.status(200).json(results.rows);
        res.render('killers',{killers: results.rows})
    })
}

const getKillersById = (req, res)=>{
    const id = parseInt(req.params.id);  
    pool.query(queries.getKillersById, [id], (error, results)=>{
        if(error) throw error;
        //res.status(200).json(results.rows);
        res.render('killer-details',{killers: results.rows })
    })
}

const getKillersByCountry = (req, res)=>{
    const country = req.params.country;
    pool.query(queries.getKillersByCountry, [country], (error, results)=>{
        if(error) throw error;
        res.render("killer-details",{killers: results.rows})
    })
}

const getKillersByYearsActive = (req, res)=>{
    const years_active = parseInt(req.params.years_active);  
    pool.query(queries.getKillersByYearsActive, [years_active], (error, results)=>{
        if(error) throw error;
        //res.status(200).json(results.rows);
        res.render('killer-details',{killers: results.rows })
    })
}
module.exports = {
    getKillers,
    getKillersById,
    getKillersByCountry,
    getKillersByYearsActive,
} */