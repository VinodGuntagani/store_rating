const db = require("../db");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users(name,email,password,address,role)
      VALUES(?,?,?,?,?)
    `;

    db.query(
      sql,
      [
        name,
        email,
        hashedPassword,
        address,
        role || "USER",
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "User Registered Successfully",
        });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};


const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT * FROM users WHERE email = ?
  `;

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      "secretkey",
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
};


const updatePassword = async (
  req,
  res
) => {
  try {
    const userId = req.user.id;

    const { newPassword } =
      req.body;

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    const sql = `
      UPDATE users
      SET password = ?
      WHERE id = ?
    `;

    db.query(
      sql,
      [
        hashedPassword,
        userId,
      ],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json(err);
        }

        res.json({
          message:
            "Password Updated Successfully",
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
  register,
  login,
  updatePassword,
};