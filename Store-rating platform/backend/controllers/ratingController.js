const db = require("../db");

const submitRating = (req, res) => {
  const { store_id, rating } = req.body;

  const user_id = req.user.id;

  const checkSql = `
    SELECT * FROM ratings
    WHERE user_id = ? AND store_id = ?
  `;

  db.query(
    checkSql,
    [user_id, store_id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      // UPDATE EXISTING RATING
      if (result.length > 0) {
        const updateSql = `
          UPDATE ratings
          SET rating = ?
          WHERE user_id = ? AND store_id = ?
        `;

        db.query(
          updateSql,
          [rating, user_id, store_id],
          (err, result) => {
            if (err) {
              return res.status(500).json(err);
            }

            return res.json({
              message: "Rating Updated",
            });
          }
        );
      }

      // INSERT NEW RATING
      else {
        const insertSql = `
          INSERT INTO ratings(user_id, store_id, rating)
          VALUES(?,?,?)
        `;

        db.query(
          insertSql,
          [user_id, store_id, rating],
          (err, result) => {
            if (err) {
              return res.status(500).json(err);
            }

            res.json({
              message: "Rating Submitted",
            });
          }
        );
      }
    }
  );
};

const getAverageRatings = (req, res) => {
  const sql = `
    SELECT 
      stores.id,
      stores.name,
      AVG(ratings.rating) AS average_rating
    FROM stores
    LEFT JOIN ratings
    ON stores.id = ratings.store_id
    GROUP BY stores.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};
const getUserRatings = (
  req,
  res
) => {
  const userId = req.user.id;

  const sql = `
    SELECT store_id, rating
    FROM ratings
    WHERE user_id = ?
  `;

  db.query(
    sql,
    [userId],
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
  submitRating,
  getAverageRatings,
  getUserRatings,
};