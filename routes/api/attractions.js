var express = require('express');
var router = require('express').Router();
var Promise = require('bluebird');

var models = require('../../models');

var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Place = models.Place;
var Day = models.Day;



router.get('/hotels', function (req, res, next) {
	Hotel.findAll()
	.then(function(hotels) {
		res.json(hotels);
	})
	.catch(next);
});

router.get('/restaurants', function (req, res, next) {
	//sequelize query here
	Restaurant.findAll()
	.then(function(restaurants) {
		res.json(restaurants);
	})
	.catch(next);

});

router.get('/activities', function (req, res, next) {
	Activity.findAll()
	.then(function(activities) {
		res.json(activities);
	})
	.catch(next);
});

module.exports = router;