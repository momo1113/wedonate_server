const connection = require('./dbconfig')
const getDonation = (callback) => {
    connection.connection.query('SELECT * FROM wedonate', function (error, results) {
        // If some error occurs, we throw an error.
        if (error) {
            callback(error, null)

        } else {
            callback(null, results)

        }
        // Getting the 'response' from the database and sending it to our route. This is were the data is.
    });
}

module.exports = getDonation

