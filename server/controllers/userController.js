const mysql = require('mysql');

// connection POOL

const pool = mysql.createPool({
    connectionLimit: 10000,
    host: "localhost",
    user: "root",
    password: "password",
    database: "database"
})




// view users 
exports.view = (req, res) => {
    // CONNEC TO db
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected is ID' + connection.threadId);
        // user the connect 
        connection.query("SELECT * FROM users WHERE status = 'active'", (err, rows) => {
            // when done with the connection, release it 
            connection.release();
            if (!err) {
                res.render('home', { rows })
            } else {
                console.log(err);
            }
            // console.log(rows);
        })
    });
}


//find user by search
exports.find = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected is ID' + connection.threadId);
        // user the connect 

        let searchTerm = req.body.search;
        connection.query("SELECT * FROM users WHERE first_name  LIKE ? OR last_name LIKE ?", ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // when done with the connection, release it 
            connection.release();
            if (!err) {
                res.render('home', { rows })
            } else {
                console.log(err);
            }
            // console.log(rows);
        });

    });

}

exports.form = (req, res) => {
    res.render('add-user')
}


// add new user
exports.create = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected is ID' + connection.threadId);
        // user the connect 

        let searchTerm = req.body.search;
        let sql = "INSERT INTO users SET first_name = ?,last_name = ?,email = ?,phone = ?,comments = ?";
        connection.query(sql, [first_name, last_name, email, phone, comments], (err, rows) => {
            // when done with the connection, release it 
            connection.release();
            if (!err) {
                res.render('add-user', { alert: "user added successfuly." })
            } else {
                console.log(err);
            }
            // console.log(rows);
        });

    });
}


// edit user
exports.edit = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected is ID' + connection.threadId);
        // user the connect 
        connection.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, rows) => {
            // when done with the connection, release it 
            connection.release();
            if (!err) {
                res.render('edit-user', { rows })
            } else {
                console.log(err);
            }
            // console.log(rows);
        })
    });
}


// update user
exports.update = (req, res) => {

    const { first_name, last_name, email, phone, comments } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected is ID' + connection.threadId);
        // user the connect 

        let sql = "UPDATE users SET first_name = ?,last_name = ?,email = ?,phone = ?,comments = ? WHERE id = ?";
        let values = [first_name, last_name, email, phone, comments, req.params.id];
        connection.query(sql, values, (err, rows) => {
            // when done with the connection, release it 
            connection.release();
            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err;
                    console.log('connected is ID' + connection.threadId);
                    // user the connect 
                    connection.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, rows) => {
                        // when done with the connection, release it 
                        connection.release();
                        if (!err) {
                            res.render('edit-user', { rows, alert: `${first_name} added` })
                        } else {
                            console.log(err);
                        }
                        // console.log(rows);
                    })
                });

            } else {
                console.log(err);
            }
            // console.log(rows);
        })
    });
};


// delete user
exports.delete = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected is ID' + connection.threadId);
        // user the connect 
        connection.query("DELETE FROM users WHERE id = ?", [req.params.id], (err, rows) => {
            // when done with the connection, release it 
            connection.release();
            if (!err) {
                res.redirect('/')
            } else {
                console.log(err);
            }
            // console.log(rows);
        })
    });
};



// view users 
exports.viewall = (req, res) => {
    // CONNEC TO db
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected is ID' + connection.threadId);
        // user the connect 
        connection.query("SELECT * FROM users WHERE id = ?",[req.params.id], (err, rows) => {
            // when done with the connection, release it 
            connection.release();
            if (!err) {
                res.render('view-user', { rows })
            } else {
                console.log(err);
            }
            console.log(rows);
        })
    });
}

