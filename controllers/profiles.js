import { Profile } from '../models/profile.js'
import {Location} from "../models/location.js"

function index(req, res) {
  Profile.find({})
  .populate([
    { 
      path: 'favLocations', model: Location
    },
    {
      path: 'favBars',
    }, 
    {
      path: 'followers',
    }, 
  ])
  .then(profiles => {
    res.json(profiles)
    })
}

function show(req, res) {
    Profile.findById(req.params.id)
    .populate("followers")
    .then(profiles => {
      res.json(profiles)
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })
}

function addFollower(req, res) {
    Profile.findById(req.user.profile)
    .then(profile => {
      profile.followers.push(req.params.id)
      profile.save()
      .then(() => {
        console.log(profile)
        res.json(profile)
      })
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })
}


function deleteFollower(req, res) {
  Profile.findByIdAndDelete(req.params.id)
  .then(profile => {
    res.json(profile)
  })
}

export {
  index,
  show,
  addFollower,
  deleteFollower as delete,
}