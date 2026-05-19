const db = require("../db");

const addStore = (
  req,
  res
) => {
  const {
    name,
    email,
    address,
    owner_id,
  } = req.body;

  const sql = `
    INSERT INTO stores
    (name, email, address, owner_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      email,
      address,
      owner_id,
    ],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json(err);
      }

      res.json({
        message:
          "Store Added Successfully",
      });
    }
  );
};

const getStores = (
  req,
  res
) => {
  const sql = `
    SELECT
      stores.id,
      stores.name,
      stores.email,
      stores.address,

      AVG(ratings.rating)
      AS average_rating

    FROM stores

    LEFT JOIN ratings
    ON stores.id = ratings.store_id

    GROUP BY stores.id
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
  addStore,
  getStores,
};