const db = require("../db");

const getDashboard = (
  req,
  res
) => {
  const usersQuery =
    "SELECT COUNT(*) AS totalUsers FROM users";

  const storesQuery =
    "SELECT COUNT(*) AS totalStores FROM stores";

  const ratingsQuery =
    "SELECT COUNT(*) AS totalRatings FROM ratings";

  db.query(
    usersQuery,
    (err, usersResult) => {
      if (err) {
        return res
          .status(500)
          .json(err);
      }

      db.query(
        storesQuery,
        (
          err,
          storesResult
        ) => {
          if (err) {
            return res
              .status(500)
              .json(err);
          }

          db.query(
            ratingsQuery,
            (
              err,
              ratingsResult
            ) => {
              if (err) {
                return res
                  .status(500)
                  .json(err);
              }

              res.json({
                totalUsers:
                  usersResult[0]
                    .totalUsers,

                totalStores:
                  storesResult[0]
                    .totalStores,

                totalRatings:
                  ratingsResult[0]
                    .totalRatings,
              });
            }
          );
        }
      );
    }
  );
};
const getUsers = (
  req,
  res
) => {
  const sql = `
    SELECT
      id,
      name,
      email,
      address,
      role
    FROM users
  `;

  db.query(
    sql,
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json(err);
      }

      res.json(result);
    }
  );
};
const getUserDetails = (
  req,
  res
) => {
  const { id } = req.params;

 const sql = `
  SELECT
    users.id,
    users.name,
    users.email,
    users.address,
    users.role,

    stores.id
    AS store_id,

    stores.name
    AS store_name,

    AVG(ratings.rating)
    AS average_rating

  FROM users

  LEFT JOIN stores
  ON users.id = stores.owner_id

  LEFT JOIN ratings
  ON stores.id = ratings.store_id

  WHERE users.id = ?

  GROUP BY
users.id,
stores.id,
stores.name
`;

  db.query(
    sql,
    [id],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json(err);
      }

      res.json(result[0]);
    }
  );
};
const getUserRatings = (
  req,
  res
) => {
  const { id } = req.params;

  const sql = `
    SELECT
      stores.name
      AS store_name,

      ratings.rating

    FROM ratings

    JOIN stores
    ON ratings.store_id = stores.id

    WHERE ratings.user_id = ?
  `;

  db.query(
    sql,
    [id],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json(err);
      }

      res.json(result);
    }
  );
};
const getOwnerStores = (
  req,
  res
) => {
  const { id } = req.params;

  const sql = `
    SELECT
      stores.name
      AS store_name,

      AVG(ratings.rating)
      AS average_rating

    FROM stores

    LEFT JOIN ratings
    ON stores.id = ratings.store_id

    WHERE stores.owner_id = ?

    GROUP BY stores.id
  `;

  db.query(
    sql,
    [id],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json(err);
      }

      res.json(result);
    }
  );
};
const getOwners = (
  req,
  res
) => {
  const sql = `
    SELECT
      id,
      name
    FROM users

    WHERE role = 'OWNER'
  `;

  db.query(
    sql,
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json(err);
      }

      res.json(result);
    }
  );
};

module.exports = {
  getDashboard,
  getUsers,
  getUserDetails,
  getUserRatings,
  getOwnerStores,
  getOwners,
};