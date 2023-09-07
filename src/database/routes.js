const express = require('express');
const controller = require('./controller');
const router = express.Router();


router.get("/", controller.getUsers);
router.get("/userfit/id/:user_id", controller.getUserById);
router.get("/userfit/username/:username", controller.getUsersByUsername);
router.get("/userfit/emails/:email", controller.getUsersByEmail);
router.get("/userfit/genders/:gender", controller.getUsersByGender);
router.get("/userfit/heights/:minHeight/:maxHeight", controller.getUsersByHeightRange);
router.get("/userfit/weights/:minWeight/:maxWeight", controller.getUsersByWeightRange);

router.get("/exercises", controller.getExercises);
router.get("/exercises/eid/:exercise_id", controller.getExerciseById);
router.get("/exercises/ecategory/:exercise_category", controller.getExercisesByCategory);
router.get("/exercises/ecalories/:minCalories/:maxCalories", controller.getExercisesByCaloriesRange);

router.get("/workout", controller.getAllWorkouts);
router.get("/workout/wid/:workout_userid", controller.getWorkoutsByUserId);
router.get("/workout/date/:workout_date", controller.getWorkoutsByDate);
router.get("/workout/w_eid/:workout_exerciseid", controller.getWorkoutsByExerciseId);

router.get("/workoutexercise", controller.getAllWorkoutExercises);
router.get("/workoutexercise/sets/:workout_sets", controller.getWorkoutExercisesBySets);
router.get("/workoutexercise/reps/:workout_reps", controller.getWorkoutExercisesByReps);
router.get("/workoutexercise/wid_eid/:workout_id/:exercise_id", controller.getWorkoutExerciseByWorkoutAndExerciseId);

router.post("/insertuserfit", controller.insertUserfit);
router.post("/insertexercises", controller.insertExercises);
router.post("/insertworkout", controller.insertWorkout);
router.post("/insertWorkoutExercise", controller.insertWorkoutExercise);

router.post("/updateuserfit", controller.updateUserInfo);
router.post("/updateExercise", controller.updateExerciseInfo);
router.post("/updateworkout", controller.updateWorkoutInfo);
router.post("/updateworkoutexercise", controller.updateWorkoutExerciseInfo);
router.post("/deleteuserfit", controller.deleteUserByUsernamePassword);
router.post("/deleteExercises", controller.deleteExercisesByName);

router.get("/userfit/userWorkoutDetails/:username", controller.getUserWorkoutDetails);
router.get("/exercises/exerciseWorkoutExerciseDetails/:exercise_name", controller.getExerciseWorkoutExerciseDetails);
router.get("/userworkout/totalUserWorkouts/:username", controller.getTotalUserWorkouts);
router.get("/calculateBmi/Bmi/:username", controller.calculateBMI);
router.get("/join-queries/totalExercises", controller.getTotalExercises);
router.get("/tcb_calculator/totalCaloriesBurned/:username", controller.totalCaloriesBurned);


module.exports = router;



