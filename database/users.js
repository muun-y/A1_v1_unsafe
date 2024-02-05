const database = include("databaseConnection");

async function createUser(postData) {
  // Vulnerable to SQL Injection
  let createUserSQL = `
    INSERT INTO user
    (username, password)
    VALUES
    ('${postData.user}', '${postData.hashedPassword}');`;

  try {
    const results = await database.query(createUserSQL);

    console.log("Successfully created user");
    console.log(results[0]);
    return true;
  } catch (err) {
    console.log("Error inserting user");
    console.log(err);
    return false;
  }
}

async function getUsers(postData) {
  let getUsersSQL = `
    SELECT username, password
    FROM user;`;

  try {
    const results = await database.query(getUsersSQL);

    console.log("Successfully retrieved users");
    console.log(results[0]);
    return results[0];
  } catch (err) {
    console.log("Error getting users");
    console.log(err);
    return false;
  }
}

async function getUser(postData) {
  // Vulnerable to SQL Injection
  let getUserSQL = `SELECT user_id, username, password
    FROM user
    WHERE username = '${postData.user}';`;

  try {
    const results = await database.query(getUserSQL);

    console.log("Successfully found user");
    console.log(results[0]);
    return results[0];
  } catch (err) {
    console.log("Error trying to find user");
    console.log(err);
    return false;
  }
}

module.exports = { createUser, getUsers, getUser };
