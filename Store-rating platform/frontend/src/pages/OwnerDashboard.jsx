import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import "./OwnerDashboard.css";
import {
  useNavigate,
} from "react-router-dom";

function OwnerDashboard() {
  const navigate =
    useNavigate();

  const [stores,
    setStores] =
    useState([]);

  const [ratings,
    setRatings] =
    useState([]);

  const fetchDashboard =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "http://localhost:5000/api/owner/dashboard",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setStores(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const fetchRatings =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "http://localhost:5000/api/owner/ratings",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setRatings(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    navigate("/");
  };

  useEffect(() => {
    fetchDashboard();

    fetchRatings();
  }, []);

return (
  <div className="owner-page">
    <div className="owner-header">
      <h1>
        Owner Dashboard
      </h1>

      
    </div>

    <div className="owner-actions">
      <button
        className="owner-btn"
        onClick={() =>
          navigate("/stores")
        }
      >
        Rate Stores
      </button>

      <button
        className="owner-btn"
        onClick={() =>
          navigate(
            "/update-password"
          )
        }
      >
        Update Password
      </button>
    </div>

    <div className="owner-section">
      <h2>
        Store Ratings
      </h2>

      <table className="owner-table">
        <thead>
          <tr>
            <th>Store</th>

            <th>
              Average Rating
            </th>
          </tr>
        </thead>

        <tbody>
          {stores.map(
            (store) => (
              <tr
                key={store.id}
              >
                <td>
                  {store.name}
                </td>

                <td>
                  {store.average_rating
                    ? Number(
                        store.average_rating
                      ).toFixed(1)
                    : 0}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>

    <div className="owner-section">
      <h2>
        Users Who Rated
      </h2>

      <table className="owner-table">
        <thead>
          <tr>
            <th>Name</th>

            <th>Email</th>

            <th>Store</th>

            <th>Rating</th>
          </tr>
        </thead>

        <tbody>
          {ratings.map(
            (
              rating,
              index
            ) => (
              <tr
                key={index}
              >
                <td>
                  {rating.name}
                </td>

                <td>
                  {rating.email}
                </td>

                <td>
                  {rating.store_name}
                </td>

                <td>
                  {rating.rating}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default OwnerDashboard;