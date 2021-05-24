const Anime = require("../src/schema/Anime");

const asserttype = require("chai-asserttype");
const axios = require("axios");
const chai = require("chai");

chai.use(asserttype);
const expect = chai.expect;


describe("/anime", function () {
    this.timeout(10000);

    describe("GET", () => {
        it("should return a list of all Anime", done => {
            axios.get("http://localhost:8081/anime")
                .then(response => {
                    expect(response.status).to.equal(200);
                    expect(response.data.length).to.eql(1563);
                    done();
                })
                .catch(err => done(err));
        });

    });
});

describe("/anime/query", function () {
    this.timeout(10000);

    describe("POST", () => {
        const params = { "Title": "Kimi", "Type": "TV", "Score": 8 };
        const badParams = { "Title": "sdfsdfsd" };
        const invalidParams = { "Genres": "not a list" };
        
        it("should return 4 anime", done => {
            
            axios.post("http://localhost:8081/anime/query", params )
                .then(response => {
                    expect(response.status).to.equal(200);
                    expect(response.data.length).to.eql(4);
                    done();
                })
                .catch(err => done(err));
        })

        it("should return 404", done => {
            axios.post('http://localhost:8081/anime/query', badParams)
                .then(response => {
                    expect(response.status).to.equal(404);
                    done();
                })
                .catch(err => {
                    if (err.response && err.response.status == 404) {
                        done();
                    } else {
                        throw err;
                    }
                })
                .catch(err => done(err));
        })

        it("should return 500", done => {
            axios.post('http://localhost:8081/anime/query', invalidParams)
                .then(response => {
                    expect(response.status).to.equal(500);
                    done();
                })
                .catch(err => {
                    if (err.response && err.response.status == 500) {
                        done();
                    } else {
                        throw err;
                    }
                })
                .catch(err => done(err));
        })
    })
})

describe("/anime/:id", function () {
    this.timeout(10000);

    describe("GET", () => {
        it("should return Full Metal", done => {
            axios.get("http://localhost:8081/anime/60aae2bc4796232c58097617")
                .then(response => {
                    expect(response.status).to.equal(200);
                    expect(response.data.Title).to.eql("Fullmetal Alchemist: Brotherhood");
                    done();
                })
                .catch(err => done(err));
        });
        it("should return 404", done => {
            axios.get('http://localhost:8081/anime/asdfasd')
            .then(response => {
                expect(response.status).to.equal(404);
                done();
            })
            .catch(err => {
                if (err.response && err.response.status == 404) {
                    done();
                } else {
                    throw err;
                }
            })
            .catch(err => done(err));
        })

    });
});