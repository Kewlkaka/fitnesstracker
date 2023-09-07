/*const deleteExercisesByName = (req, res) => {
    const deleteExerciseName = req.body.exercise_name;
  
    pool.query(queries.getExerciseIDByExerciseName, [deleteExerciseName], (error, results) => {
      if (error) {
        console.error('Error retrieving Exercise ID', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (results.rows.length === 0) {
        res.status(404).json({ error: 'Exercise does not exist' });
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
          pool.query(queries.deleteWorkoutByExerciseId, [delete_eid], (error, results) => {
            if (error) {
              console.error('Error deleting workout by exercise ID', error);
              return;
            }
          });
        }
  
        pool.query(queries.deleteExercisesByName, [deleteExerciseName], (error, results) => {
          if (error) {
            console.error('Exercise name incorrect', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          res.status(200).json({ message: 'Exercise deleted successfully, All associations deleted' });
        });
      });
    });
  }; */


  const deleteExercisesByName = (req, res) => {
    const deleteExercisename = req.body.exercise_name;
  
    pool.query(queries.getExerciseIDByExerciseName, [deleteExcercisename], (error, results) => {
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
  
        pool.query(queries.getWorkoutIDByExerciseID, [delete_eid], (error, results) => {
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