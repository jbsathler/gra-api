import * as restify from 'restify';
import { Router   } from '../common/router';

class AwardsRouter extends Router {
    constructor() {
        super();
    }

    applyRoutes(application: restify.Server) {
        application.get(`/awards`, [
            this.getAwardWinners
        ]);
    }

    getAwardWinners = (request, response, next) => {
        this.getMinMaxIntervalAwardWinners().then(winners => {
            response.json(winners);
        });
    }

    getMinMaxIntervalAwardWinners() : any {
        return new Promise((resolve, reject) => {
            try {
                let producers = []
                global.db.find({ winner: /yes/i }).sort({ year: 1 }).exec((err, docs) => {
                    // console.log(docs);
                    let pivot          = this.pivotData(docs);
                    let multipleAwards = pivot.then(docs => this.filterMultipleAwards(docs));
                    let winners        = multipleAwards.then(docs => this.formatWinnersList(docs));
                    let interval       = winners.then(docs => this.buildMinMaxObject(docs));

                    interval.then(docs => {
                        resolve(docs);
                    });
                });
            } catch(error) {
                reject(error);
            }
        });
    }

    pivotData(docs) : any {
        return new Promise((resolve, reject) => {
            try {
                let pivot = {};

                docs.forEach(row => {
                    row.producers.forEach(producer => {
                        if (pivot[`${producer}`] === undefined) {
                            pivot[`${producer}`] = {
                                'producer' : producer,
                                'years'    : []
                            }
                        }
                        pivot[`${producer}`]['years'].push(row.year);
                    });
                });

                resolve(pivot);
            } catch(error) {
                reject(error);
            }
        });
    }

    filterMultipleAwards(docs) : any {
        return new Promise((resolve, reject) => {
            try {
                let multipleAwards = {};

                Object.keys(docs).forEach(key => {
                    if (docs[key].years.length > 1) {
                        multipleAwards[key] = docs[key];
                    }
                });

                resolve(multipleAwards);
            } catch(error) {
                reject(error);
            }
        });
    }

    formatWinnersList(docs) : any {
        return new Promise((resolve, reject) => {
            try {
                let winners = [];

                Object.keys(docs).forEach(key => {
                    this.formatWinnerDoc(docs[key]).then(doc => {
                        winners.push(doc)
                    });
                });

                resolve(winners);
            } catch(error) {
                reject(error);
            }
        });
    }

    formatWinnerDoc(doc) : any {
        return new Promise((resolve, reject) => {
            try {
                let winner: object = {
                    'producer'     : doc.producer,
                    'interval'     : doc.years[1] - doc.years[0],
                    'previousWin'  : doc.years[0],
                    'followingWin' : doc.years[1]
                }

                resolve(winner);
            } catch(error) {
                reject(error);
            }
        });
    }

    buildMinMaxObject(docs): any {
        return new Promise((resolve, reject) => {
            try {
                docs.sort((a, b) => (a.interval > b.interval) ? 1 : -1);

                resolve({
                    "min" : [ docs[0] ],
                    "max" : [ docs[docs.length - 1] ]
                });
            } catch(error) {
                reject(error);
            }
        });
    }
}

export const awardsRouter = new AwardsRouter();