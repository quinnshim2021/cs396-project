"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnimeScheme = new Schema({
    Title: {
        type: Schema.Types.String,
        required: true
    },
    Type: {
        type: Schema.Types.String,
        required: true
    },
    Episodes: {
        type: Schema.Types.String,
        required: true
    },
    Status: {
        type: Schema.Types.String,
        required: true
    },
    Episodes: {
        type: Schema.Types.String,
        required: true
    },
    StartAiring: {
        type: Schema.Types.String,
        required: true
    },
    Studios: {
        type: Schema.Types.String,
        required: true
    },
    Genres: {
        type: Schema.Types.String,
        required: true
    },
    Duration: {
        type: Schema.Types.String,
        required: true
    },
    Rating: {
        type: Schema.Types.String,
        required: true
    },
    Score: {
        type: Schema.Types.String,
        required: true
    },
    Favorites: {
        type: Schema.Types.String,
        required: true
    },
});

AnimeScheme.statics.create = function(obj) {
    const Anime = mongoose.model("Anime", AnimeScheme);
    const anime = new Anime();
    anime.Title = obj.Title;
    anime.Type = obj.Type;
    anime.Episodes = obj.Episodes;
    anime.Status = obj.Status;
    anime.StartAiring = obj.StartAiring;
    anime.Studios = obj.Studios;
    anime.Genres = obj.Genres;
    anime.Duration = obj.Duration;
    anime.Rating = obj.Rating;
    anime.Score = obj.Score;
    anime.Favorites = obj.Favorites;

    return anime;
}

module.exports = mongoose.model("Anime", AnimeScheme);
