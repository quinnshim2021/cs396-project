"use strict";

const resetDB = require("../config/scripts/populateDB")

const Anime = require("./schema/Anime");

const express = require("express");
const router = express.Router();

router.route("/")
    .get((_req, res) => {
        console.log("GET /");
        res.status(200).send({
            data: "App is running."
        });
    });

router.route("/anime")
    .get((req, res) => {
        console.log("GET /anime");

        // already implemented:
        Anime.find({})
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })

/*
    *genre: list that i need to regex all
    Status := 'Finished Airing' || 'Currently Airing'
    Type := 'TV' || 'Movie'
    StartAiring: idk how to do the dates
    Rating := regular ones
    Duration := remove per ep. if in it
    Score, Favorites := do gte for greater than equal to
*/
// only need to check genre because rest will result in bad query if wrong
const validQuery = (queries) => {
    if (queries.Genres && ! typeof queries.Genres === Array){
        return false;
    }

    return true;
}

router.route("/anime/query")
    .post((req, res) => {
        const queries = req.body;
        
        // CHECK LEGALITY
        if (! validQuery(queries)){
            res.status(501).send("Genres not correct shape.");
            return;
        }
        console.log("HERE", queries)

        // CONSTRUCT QUERY
        let props = {};

        if (queries.Title){
            // make regex object for regular expression for title, keep all case insensitive with i
            props.Title = new RegExp(queries.Title, "i")
        }
        if (queries.Type){
            props.Type = queries.Type
        }
        if (queries.Status){
            props.Status = queries.Status
        }
        if (queries.Studios){
            props.Studios = new RegExp(queries.Studios, "i")
        }
        if (queries.Genres){
            let r = "";
            queries.Genres.forEach((genre) => {
                r += genre + "|"
            })
            r.slice(0, -1);

            props.Genres = new RegExp(r, "i")
        }
        if (queries.Rating){
            props.Rating = queries.Rating
        }
        if (queries.Score){
            props.Score = { $gte: queries.Score }
        }

        Anime.find(props) // take in props here
            .then(data => {
                if (!data || data.length === 0){
                    res.status(404).send("Anime not found");
                    return;
                }
                res.status(200).send(data);
                return;
            })
            .catch(error => {
                res.status(501).send("Anime not found or there was an error");
                return;
            });
    })

router.route("/anime/:id")
    .get((req, res) => {
        console.log(`GET /anime/${req.params.id}`);
        
        Anime.findById(req.params.id)
            .then(data => {
                if (!data){
                    res.status(404).send("Anime not found");
                    return;
                }
                res.status(200).send(data);
                return;
            })
            .catch(error => {
                res.status(404).send("Anime not found");
                return;
            });
    })



module.exports = router;