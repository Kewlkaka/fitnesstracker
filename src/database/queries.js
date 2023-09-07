// All SQL queries we are going to use against our database
//Read Queries for UserFit
const getUsers = "SELECT * FROM userfit";
const getUserById = "SELECT * FROM userfit WHERE user_id = $1";
const getUsersByUsername = "SELECT * FROM userfit WHERE username = $1";
const getUsersByEmail = "SELECT * FROM userfit WHERE email = $1";
const getUsersByGender = "SELECT * FROM userfit WHERE gender = $1";
const getUsersByHeightRange = "SELECT * FROM userfit WHERE height >= $1 AND height <= $2";
const getUsersByWeightRange = "SELECT * FROM userfit WHERE weight >= $1 AND weight <= $2";

//Read Queries for Exercises

const getExercises = "SELECT * FROM exercises";
const getExerciseIdByExerciseName = "SELECT exercise_id FROM exercises WHERE exercise_name = $1";
const getExerciseById = "SELECT * FROM exercises WHERE exercise_id = $1";
const getExercisesByCategory = "SELECT * FROM exercises WHERE exercise_category = $1";
const getExercisesByCaloriesRange = "SELECT * FROM exercises WHERE calories_burned_per_minute BETWEEN $1 AND $2";
const getExerciseIDByExerciseName = "SELECT exercise_id FROM exercises WHERE exercise_name = $1"

//Delete Queries For Exercises
const deleteExercisesByName = "DELETE FROM exercises WHERE exercise_name = $1";

//Read Queries for Workout
const getAllWorkouts = "SELECT * FROM workout";
const getWorkoutsByUserId = "SELECT * FROM workout WHERE user_id = $1";
const getWorkoutsByDate = "SELECT * FROM workout WHERE workout_date = CAST($1 AS DATE)";
const getWorkoutsByDuration = "SELECT * FROM workout WHERE workout_duration > $1";
const getWorkoutIdByExerciseId = "SELECT * FROM workout WHERE exercise_id = $1";
const getworkoutExerciseIdByWId = "SELECT workout_id FROM workoutexercise WHERE workout_id = $1";
const getworkoutExercise_EidByWId = "SELECT exercise_id FROM workoutexercise WHERE workout_id = $1";

//Delete Workout Queries
const deleteWorkoutByExerciseId = "DELETE FROM workout WHERE exercise_id = $1";

//const deleteWorkoutById = "DELETE FROM workout WHERE workout_id = $1";

//Read Queries for WorkoutExercise
const getAllWorkoutExercises = "SELECT * FROM workoutexercise";
const getWorkoutExercisesBySets = "SELECT * FROM workoutexercise WHERE sets = $1";
const getWorkoutExercisesByReps = "SELECT * FROM workoutexercise WHERE reps = $1";
const getWorkoutExercisesByWorkoutAndExerciseId = "SELECT * FROM workoutexercise WHERE workout_id = $1 AND exercise_id = $2";

//Insertion Query for UserFit table
const insertUserfit = "INSERT INTO userfit (username, email, password, height, weight, birth_date, gender) VALUES ($1, $2, $3, $4, $5, $6, $7)";

//Deletion Query User
const deleteUserByUsernamePassword = "DELETE FROM userfit WHERE username = $1 AND password = $2";
const getUserIDByUsername = "SELECT user_id FROM userfit WHERE username = $1"; //Associated
const deleteWorkoutByUserId = "DELETE FROM workout WHERE user_id = $1"; //Associated
const getWorkoutIDByUserID = "SELECT workout_id FROM workout WHERE user_id = $1";

// Insertion queries for exercises table
const insertExercises = "INSERT INTO exercises (exercise_name, exercise_description, exercise_category, calories_burned_per_minute) VALUES ($1, $2, $3, $4)";

// Insertion queries for workout table
const insertWorkout = "INSERT INTO workout (user_id, workout_date, workout_duration, exercise_id) VALUES ($1, $2, $3, $4)";

//Insertion query for workoutexercise table
const insertWorkoutExercise = "INSERT INTO workoutexercise (workout_id, exercise_id, sets, reps, weight) VALUES ($1, $2, $3, $4, $5)";
const checkQuery = "SELECT * FROM workout WHERE workout_id = $1 AND exercise_id = $2";

const updateUserInfo = "UPDATE userfit SET username = $1, email = $2, password = $3, height = $4, weight = $5 WHERE user_id = $6";


const updateExerciseInfo = "UPDATE exercises SET exercise_name = $1, exercise_description = $2, exercise_category = $3, calories_burned_per_minute = $4 WHERE exercise_id = $5";


const updateWorkoutInfo = "UPDATE workout SET user_id = $1, workout_date = $2, workout_duration = $3, exercise_id = $4 WHERE workout_id = $5";
const deleteWorkoutExerciseById = "DELETE FROM workoutExercise WHERE workout_id = $1";
const deleteWorkoutExerciseBy_Eid = "DELETE FROM workoutexercise WHERE exercise_id = $1";


const updateWorkoutExerciseInfo = "UPDATE workoutexercise SET sets = $1, reps=$2 WHERE workout_id = $3 AND exercise_id=$4";

//JOIN QUERIES

const getUserWorkoutDetails = "SELECT userfit.username, workout.workout_date, workout.workout_duration, exercises.exercise_name FROM userfit INNER JOIN workout ON userfit.user_id = workout.user_id INNER JOIN exercises ON workout.exercise_id = exercises.exercise_id WHERE userfit.user_id = $1";
const getExerciseWorkoutExerciseDetails = "SELECT exercises.exercise_name, workoutExercise.sets, workoutExercise.reps, workoutExercise.weight FROM exercises INNER JOIN workoutExercise ON exercises.exercise_id = workoutExercise.exercise_id WHERE exercises.exercise_id = $1";
const getTotalUserWorkouts = "SELECT u.username, COUNT(w.workout_id) AS num_workouts FROM userfit u LEFT JOIN workout w ON u.user_id = w.user_id WHERE u.username = $1 GROUP BY u.username";
const getTotalExercises = "SELECT exercise_category, COUNT(*) AS num_exercises FROM exercises GROUP BY exercise_category";


//Calculate BMI
const calculateBMI = "SELECT username, weight / ((height / 100.0) * (height / 100.0)) AS bmi FROM userfit WHERE username=$1";

//Calculate TCB
const totalCaloriesBurned = "SELECT u.username, w.workout_id, SUM(e.calories_burned_per_minute * w.workout_duration) AS total_calories_burned FROM userfit u INNER JOIN workout w ON u.user_id = w.user_id INNER JOIN exercises e ON w.exercise_id = e.exercise_id WHERE u.username = $1 GROUP BY u.username, w.workout_id";


module.exports = {
  getUsers,
  getUserById,
  getUsersByUsername,
  getUsersByEmail,
  getUsersByGender,
  getUsersByHeightRange,
  getUsersByWeightRange,
  insertUserfit,
  updateUserInfo,
  deleteUserByUsernamePassword,
  getUserIDByUsername, //associated to deleteUserByUsernamePassword.
  //Exercises
  getExercises,
  getExerciseIdByExerciseName,
  getExerciseById,
  getExercisesByCategory,
  getExercisesByCaloriesRange,
  insertExercises,
  updateExerciseInfo,
  deleteExercisesByName,
  getExerciseIDByExerciseName,
  //Workout
  getAllWorkouts,
  getWorkoutsByUserId,
  getWorkoutsByDate,
  getWorkoutsByDuration,
  //getWorkoutsByExerciseId,
  insertWorkout,
  updateWorkoutInfo,
  deleteWorkoutExerciseById, //follow up to updateWorkoutInfo
  deleteWorkoutByUserId,
  deleteWorkoutByExerciseId,
  getWorkoutIDByUserID,
  getWorkoutIdByExerciseId,
  getworkoutExercise_EidByWId,
  deleteWorkoutExerciseBy_Eid,
  //WorkoutExercise
  getAllWorkoutExercises,
  getWorkoutExercisesBySets,
  getWorkoutExercisesByReps,
  getWorkoutExercisesByWorkoutAndExerciseId,
  insertWorkoutExercise,
  checkQuery,
  updateWorkoutExerciseInfo,
  getworkoutExerciseIdByWId,
  //Join Queries
  getUserWorkoutDetails,
  getExerciseWorkoutExerciseDetails,
  getTotalUserWorkouts,
  getTotalExercises,
  //Calculative
  calculateBMI,
  totalCaloriesBurned,
};