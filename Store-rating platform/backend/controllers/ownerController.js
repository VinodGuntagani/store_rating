const db = require("../db");

const getOwnerDashboard = (
  req,
  res
) => {
  const ownerId =
    req.user.id;

  const sql = `
    SELECT
      stores.id,
      stores.name,

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
    [ownerId],
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

const getStoreRatings = (
  req,
  res
) => {
  const ownerId =
    req.user.id;

  const sql = `
    SELECT
      users.name,
      users.email,

      ratings.rating,

      stores.name
      AS store_name

    FROM ratings

    JOIN users
    ON ratings.user_id = users.id

    JOIN stores
    ON ratings.store_id = stores.id

    WHERE stores.owner_id = ?
  `;

  db.query(
    sql,
    [ownerId],
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
  getOwnerDashboard,
  getStoreRatings,
};