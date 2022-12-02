'use strict';

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const {
	addUser,
	addFavorite,
	getUser,
	addBookmarks,
	addIsWatched,
  addComment,
  deleteAnime,
  addRating
} = require('./handler');

const port = 8000;

express()
	.use(express.json())
	.use(helmet())
	.use(morgan('tiny'))
	.use(express.static('public'))

	//GET USER
	.get('/api/get-user/:userId', getUser)

	//POST ADD USER IN THE SYSTEM
	.post('/api/add-user', addUser)

	//PATCH ADD FAVORITE 
	.patch('/api/add-favorite', addFavorite)

	//PATCH BOOKMARK 
	.patch('/api/add-bookmarks', addBookmarks)

	//PATCH IS WATCHED 
	.patch('/api/add-watch', addIsWatched)

  //PATCH TO REMOVE ONE ANIME
  .patch('/api/delete-anime/:collectionId', deleteAnime)

  //PATCH RATING
  .patch('/api/add-rating', addRating)
  
  //POST = CREATE FORUM COMMENT
  .patch('/api/comment', addComment)

	//CATCH  ENDPOINT
	.get('*', (req, res) => {
		res.status(404).json({
			status: 404,
			message: 'This is obviously not what you are looking for.',
		});
	})

	.listen(port, () => {
		console.log(`Listening on port ${port}`);
	});
