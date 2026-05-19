import { useEffect, useState } from "react";

import axios from "axios";
import "./Stores.css";

function Stores() {
  const [stores, setStores] =
    useState([]);

  const [ratings, setRatings] =
    useState([]);

  const [myRatings, setMyRatings] =
    useState([]);

  const [userRatings, setUserRatings] =
    useState({});

  const [search, setSearch] =
    useState("");

  const [newPassword,
    setNewPassword] =
    useState("");

  // FETCH STORES
  const fetchStores = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/stores/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStores(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH AVERAGE RATINGS
  const fetchRatings = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/ratings/average",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRatings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH USER RATINGS
  const fetchMyRatings =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "http://localhost:5000/api/ratings/my-ratings",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setMyRatings(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  // SUBMIT RATING
  const submitRating = async (
    storeId
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/ratings/submit",
        {
          store_id: storeId,
          rating:
            userRatings[storeId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Rating Submitted");

      fetchRatings();

      fetchMyRatings();
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE PASSWORD
  const updatePassword =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(
          "http://localhost:5000/api/auth/update-password",
          {
            newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(
          "Password Updated Successfully"
        );

        setNewPassword("");
      } catch (error) {
        console.log(error);

        alert(
          "Password Update Failed"
        );
      }
    };

  useEffect(() => {
    fetchStores();

    fetchRatings();

    fetchMyRatings();
  }, []);

 return (
  <div className="stores-page">
    <div className="stores-header">
      <h1>
        Stores
      </h1>
    </div>

    <div className="stores-actions">
      <div className="password-box">
        <h3>
          Update Password
        </h3>

        <div className="password-row">
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
          />

          <button
            onClick={
              updatePassword
            }
          >
            Update
          </button>
        </div>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search stores..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />
    </div>

    <table className="stores-table">
      <thead>
        <tr>
          <th>Name</th>

          <th>Email</th>

          <th>Address</th>

          <th>
            Average Rating
          </th>

          <th>
            Your Rating
          </th>

          <th>
            Submit
          </th>
        </tr>
      </thead>

      <tbody>
        {stores
          .filter((store) => {
            return (
              store.name
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                ) ||
              store.address
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
            );
          })
          .map((store) => {
            const avgRating =
              ratings.find(
                (r) =>
                  r.id ===
                  store.id
              );

            const existingRating =
              myRatings.find(
                (r) =>
                  r.store_id ===
                  store.id
              );

            return (
              <tr
                key={store.id}
              >
                <td>
                  {store.name}
                </td>

                <td>
                  {store.email}
                </td>

                <td>
                  {store.address}
                </td>

                <td>
                  {avgRating?.average_rating ||
                    0}
                </td>

                <td>
                  <input
                    className="rating-input"
                    type="number"
                    min="1"
                    max="5"
                    value={
                      userRatings[
                        store.id
                      ] ??
                      existingRating?.rating ??
                      ""
                    }
                    onChange={(e) =>
                      setUserRatings({
                        ...userRatings,
                        [store.id]:
                          e.target
                            .value,
                      })
                    }
                  />
                </td>

                <td>
                  <button
                    onClick={() =>
                      submitRating(
                        store.id
                      )
                    }
                  >
                    Submit
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  </div>
);
}

export default Stores;