'use strict';
const mongo = require('../database/mongo.js');

exports.get_all_playgrounds = function (req, res) {
  mongo.db.collection("fields").find({}).toArray(function (fieldsError, playgrounds) {
      if (fieldsError) throw fieldsError;
      mongo.db.collection("trainers").find({}).toArray(function (trainersErr, trainersArray) {
          if (trainersErr) throw trainersErr;
          const trainers = {}

          trainersArray.forEach(trainer => {
              const temp = {...trainer}
              delete temp._id
              trainers[trainer._id] = temp;
          })

          mongo.db.collection("muscle-groups").find({}).toArray(function (muscleErr, muscleGroupsArray) {
              if (trainersErr) throw trainersErr;
              const muscleGroups = {}

              muscleGroupsArray.forEach(muscleGroup => {
                  const temp = {...muscleGroup}
                  delete temp._id
                  muscleGroups[muscleGroup._id] = temp;
              })

              res.json({playgrounds, trainers, muscleGroups});
          })
      })
  });
}