var express = require('express');
var router = require('express').Router();
var Promise = require('bluebird');

var models = require('../../models');

var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Place = models.Place;
var Day = models.Day; 

//get ALL days
router.get('/', function (req, res, next) {
	Day.findAll()
		.then(function(days){
			res.json(days)
		})
		.catch(next)

	// res.send('this should be all days');
});

//get ONE specific day
router.get('/:id', function (req, res, next) {
	Day.findById(req.params.id)
		.then(function(day){
			res.json(day)
		})
		.catch(next)
});

//delete ONE specific day
router.delete('/:id', function (req, res, next) {
	Day.destroy({
		where: {id: req.params.id}
	})
	.then(function(){
		res.sendStatus(204)
	})
	.catch(next)
});

//create ONE new day
router.post('/', function (req, res, next) {
	var num = +req.body.number

	Day.create({number: num})
	// .save()
	.then(function(day){
		res.json(day);
	})
	.catch(function(err){
		res.sendStatus(204)
	})
});


//add NEW attraction for ONE specific day
router.post('/:id/hotel', function (req, res, next) {
	// console.log('REQPARAMS HERE', req.params)
	console.log('REQBODY HERE', req.body)
	var num = +req.params.id;
	Day.findOne({
		where: {
			number: num
		}
	})
		.then(function(day){
			// console.log('here is the DAY', day);
			day.setHotel(req.body.hotelId)
		})
		.catch(next)	
});

router.post('/:id/restaurant', function (req, res, next) {

});

router.post('/:id/activity', function (req, res, next) {

});

//remove ONE attraction for ONE specific day
router.delete('/:id/hotel', function (req, res, next) {

});

router.delete('/:id/restaurant', function (req, res, next) {

});

router.delete('/:id/activity', function (req, res, next) {

});


module.exports = router;