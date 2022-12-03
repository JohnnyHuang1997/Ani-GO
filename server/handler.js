'use strict';

//////////// CLIENT CONFIG ////////////////////
const { request } = require('express');
const { MongoClient } = require('mongodb');

require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
//////////////////////////////////////////////

//////////// ADD USER (GET) ////////////////////
const addUser = async (req, res) => {
	const { email } = req.body;
	const client = new MongoClient(MONGO_URI, options);
	try {
		await client.connect();
		const db = client.db('anigo_1');

		const find = await db.collection('user').findOne({ email });
		if (find) {
			return res
				.status(200)
				.json({ status: 200, message: 'User already exist' });
		}
		if (Object.keys(req.body).length === 0) {
			return res.status(200).json({ status: 200, message: 'Empty request' });
		}

		const result = await db.collection('user').insertOne(req.body);
		res.status(201).json({ status: 201, data: result, message: 'User Added' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ status: 500, data: req.body, message: err.message });
	}
	client.close();
};
////////////////////////////////////////////////////////////////

//////////////////// GET USER (GET) ////////////////////////////
const getUser = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	const { userId } = req.params;

	try {
		await client.connect();
		const db = client.db('anigo_1');

		const find = await db.collection('user').findOne({ email: userId });

		if (find) {
			return res
				.status(200)
				.json({ status: 200, data: find, message: 'success' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ status: 500, message: err.message });
	}
	client.close();
};
/////////////////////////////////////////////////////////////////

/////////////////// (PATCH) FAVORITE  ///////////////////////////
const addFavorite = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);

	const { email, favorite } = req.body;
	const query = { email };

	try {
		await client.connect();

		const db = client.db('anigo_1');

		const findUser = await db.collection('user').findOne({ email: email });

		const findAnime = Object.values(findUser.favorite).filter((anime) => {
			return anime.id === favorite.id;
		});
		if (findAnime.length > 0) {
			res.status(200).json({
				status: 200,
				data: findAnime[0],
				message: 'Anime already exist in Favorite List',
			});
		} else {
			const updateList = await db
				.collection('user')
				.updateOne(
					query,
					{ $set: { [`favorite.${favorite.id}`]: favorite } },
					{ upsert: true }
				);

			res.status(201).json({
				status: 201,
				data: updateList,
				message: 'Anime added to Favorite list',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ status: 500, data: req.body, message: err.message });
	}
	client.close();
};
////////////////////////////////////////////////////////////////

//////////////////// (PATCH) BOOKMARK //////////////////////////
const addBookmarks = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);

	const { email, bookmarks } = req.body;

	const query = { email };

	try {
		await client.connect();

		const db = client.db('anigo_1');

		const findUser = await db.collection('user').findOne({ email: email });
		const findAnime = Object.values(findUser.bookmarks).filter((anime) => {
			return anime.id === bookmarks.id;
		});
		if (findAnime.length > 0) {
			res.status(200).json({
				status: 200,
				data: findAnime[0],
				message: 'Anime already exist in bookmark List',
			});
		} else {
			const updateList = await db
				.collection('user')
				.updateOne(
					query,
					{ $set: { [`bookmarks.${bookmarks.id}`]: bookmarks } },
					{ upsert: true }
				);

			res.status(201).json({
				status: 201,
				data: updateList,
				message: 'Anime added to Bookmark list',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ status: 500, data: req.body, message: err.message });
	}
	client.close();
};
////////////////////////////////////////////////////////////////

///////////////////// (PATCH) WATCHED LIST ////////////////////
const addIsWatched = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);

	const { email, isWatched } = req.body;

	const query = { email };

	try {
		await client.connect();

		const db = client.db('anigo_1');

		const findUser = await db.collection('user').findOne({ email: email });

		const findAnime = Object.values(findUser.isWatched).filter((anime) => {
			return anime.id === isWatched.id;
		});

		if (findAnime.length > 0) {
			res.status(200).json({
				status: 200,
				data: findAnime[0],
				message: 'Anime already in Watch List!',
			});
		} else {
			const updateList = await db
				.collection('user')
				.updateOne(
					query,
					{ $set: { [`isWatched.${isWatched.id}`]: isWatched } },
					{ upsert: true }
				);

			res.status(201).json({
				status: 201,
				data: updateList,
				message: 'Anime added to watch list!',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ status: 500, data: req.body, message: err.message });
	}
	client.close();
};
///////////////////////////////////////////////////////////////////

////////////////////  PATCH ADD RATING  ///////////////////////////
const addRating = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);

	const { email, rating, anime } = req.body;

	const query = { email };

	try {
		await client.connect();
		const db = client.db('anigo_1');

		const findUser = await db.collection('user').findOne({ email: email });
		const updateRating = await db
			.collection('user')
			.updateOne(
				query,
				{ $set: { [`isWatched.${anime.id}`]: { ...anime, rating: rating } } },
				{ upsert: true }
			);

		res
			.status(201)
			.json({ status: 201, data: updateRating, message: 'rating updated' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ status: 500, data: req.body, message: err.message });
	}
	client.close();
};
//////////////////////////////////////////////////////////////////////

///////////// (PATCH) REMOVE DELETE ONE SPECIFIC ANIME //////////////
const deleteAnime = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);

	const { collectionId } = req.params;

	const bodyId = req.body.id;
	const email = req.body.email;

	try {
		await client.connect();

		const db = client.db('anigo_1');

		const result = await db
			.collection('user')
			.update({ email }, { $unset: { [`${collectionId}.${bodyId}`]: '' } });

		res.status(201).json({
			status: 201,
			data: result,
			message: 'Anime Deleted from database',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ status: 500, data: req.body, message: err.message });
	}
	client.close();
};
/////////////////////////////////////////////////////////////////

//////////////// (PATCH) FORUM COMMENT ///////////////////////////
const addComment = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);

	const { email, input } = req.body;

	try {
		await client.connect();

		const db = client.db('anigo_1');

		const createComment = await db
			.collection('forum')
			.insertOne({ email: email, message: input });

		if (createComment.acknowledged === true) {
			const getAllComments = await db.collection('forum').find().toArray();

			return res.status(201).json({
				status: 201,
				data: getAllComments,
				message: 'Input was successfully added to forum!',
			});
		} else {
			return res.status(400).json({
				status: 400,
				data: undefined,
				message: 'Input was unsuccessfully added to forum!',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ status: 500, data: req.body, message: err.message });
	}
	client.close();
};
/////////////////////////////////////////////////////////////////

module.exports = {
	addUser,
	addFavorite,
	getUser,
	addBookmarks,
	addIsWatched,
	addComment,
	deleteAnime,
	addRating,
};
