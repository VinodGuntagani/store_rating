import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] =
    useState({});

  const [stores, setStores] =
    useState([]);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [address,
    setAddress] =
    useState("");
    const [users, setUsers] =
  useState([]);
  const [search, setSearch] =
  useState("");
  const [userName,
  setUserName] =
  useState("");

const [userEmail,
  setUserEmail] =
  useState("");

const [userPassword,
  setUserPassword] =
  useState("");

const [userAddress,
  setUserAddress] =
  useState("");

const [userRole,
  setUserRole] =
  useState("USER");

  const [selectedUser,
  setSelectedUser] =
  useState(null);

  const [userRatings,
  setUserRatings] =
  useState([]);

  const [ownerStores,
  setOwnerStores] =
  useState([]);

const [owners,
  setOwners] =
  useState([]);

const [ownerId,
  setOwnerId] =
  useState("");

  const [sortOrder,
  setSortOrder] =
  useState("asc");

  const fetchDashboard =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "http://localhost:5000/api/admin/dashboard",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  const fetchStores =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
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

  const addStore =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(
          "http://localhost:5000/api/stores/add",
          {
            name,
            email,
            address,
            owner_id: ownerId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(
          "Store Added Successfully"
        );

        setName("");

        setEmail("");

        setAddress("");

        fetchDashboard();

        fetchStores();
      } catch (error) {
        console.log(error);
      }
    };
const fetchUsers =
  async () => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addUser =
  async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: userName,
          email: userEmail,
          password:
            userPassword,
          address:
            userAddress,
          role: userRole,
        }
      );

      alert(
        "User Added Successfully"
      );

      setUserName("");

      setUserEmail("");

      setUserPassword("");

      setUserAddress("");

      setUserRole("USER");

      fetchUsers();

      fetchDashboard();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserDetails =
  async (id) => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
          `http://localhost:5000/api/admin/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setSelectedUser(
        res.data
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserRatings =
  async (id) => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
          `http://localhost:5000/api/admin/users/${id}/ratings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setUserRatings(
        res.data
      );
    } catch (error) {
      console.log(error);
    }
  };
  const fetchOwnerStores =
  async (id) => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
          `http://localhost:5000/api/admin/users/${id}/stores`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setOwnerStores(
        res.data
      );
    } catch (error) {
      console.log(error);
    }
  };
  const fetchOwners =
  async () => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
          "http://localhost:5000/api/admin/owners",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setOwners(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDashboard();
    fetchUsers();
    fetchStores();
    fetchOwners();
  }, []);

 return (
  <div className="admin-page">
     <div className="admin-header">
  <h1>
    Admin Dashboard
  </h1>
</div>

<div className="stats-grid">
  <div className="stat-card">
    <h3>Total Users</h3>

    <p>
      {stats.totalUsers}
    </p>
  </div>

  <div className="stat-card">
    <h3>Total Stores</h3>

    <p>
      {stats.totalStores}
    </p>
  </div>

  <div className="stat-card">
    <h3>Total Ratings</h3>

    <p>
      {stats.totalRatings}
    </p>
  </div>
</div>
<div className="admin-card">
      <h2>Add Store</h2>

      <input
        type="text"
        placeholder="Store Name"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Store Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Store Address"
        value={address}
        onChange={(e) =>
          setAddress(
            e.target.value
          )
        }
      />

      <br />
      <br />


        <select
          value={ownerId}
          onChange={(e) =>
            setOwnerId(
              e.target.value
            )
          }
        >
          <option value="">
            Select Owner
          </option>

          {owners.map((owner) => (
            <option
              key={owner.id}
              value={owner.id}
            >
              {owner.name}
            </option>
          ))}
        </select>

        <br />
        <br />
      <button onClick={addStore}>
        Add Store
      </button>
</div>
      <hr />

      <h2>All Stores</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>

            <th>Email</th>

            <th>Address</th>

            <th>Rating</th>

          
          </tr>
        </thead>

       
        <tbody>
{stores
  .sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(
        b.name
      );
    }

    return b.name.localeCompare(
      a.name
    );
  })

  .map((store) => (
    <tr key={store.id}>
      <td>{store.name}</td>

      <td>{store.email}</td>

      <td>{store.address}</td>

      <td>
        {store.average_rating
          ? Number(
              store.average_rating
            ).toFixed(1)
          : 0}
      </td>
    </tr>
  ))}
</tbody>
      </table>
      <hr />


<br />
<br />
<hr />
<div className="admin-card">
<h2>Add User</h2>

<input
  type="text"
  placeholder="Name"
  value={userName}
  onChange={(e) =>
    setUserName(
      e.target.value
    )
  }
/>

<br />
<br />

<input
  type="email"
  placeholder="Email"
  value={userEmail}
  onChange={(e) =>
    setUserEmail(
      e.target.value
    )
  }
/>

<br />
<br />

<input
  type="password"
  placeholder="Password"
  value={userPassword}
  onChange={(e) =>
    setUserPassword(
      e.target.value
    )
  }
/>

<br />
<br />

<input
  type="text"
  placeholder="Address"
  value={userAddress}
  onChange={(e) =>
    setUserAddress(
      e.target.value
    )
  }
/>

<br />
<br />

<select
  value={userRole}
  onChange={(e) =>
    setUserRole(
      e.target.value
    )
  }
>
  <option value="USER">
    USER
  </option>

  <option value="ADMIN">
    ADMIN
  </option>

  <option value="OWNER">
    OWNER
  </option>
</select>

<br />
<br />

<button onClick={addUser}>
  Add User
</button>
<hr /></div>
<h2>All Users</h2>
<input
  type="text"
  placeholder="Search users..."
  value={search}
  onChange={(e) =>
    setSearch(
      e.target.value
    )
  }
/>
<br />
<br />
<p>sort all tables</p>
<select
  value={sortOrder}
  onChange={(e) =>
    setSortOrder(
      e.target.value
    )
  }
>
  <option value="asc">
    A-Z
  </option>

  <option value="desc">
    Z-A
  </option>
</select>

<br />
<br />
<table className="admin-table">
  
  <thead>
    <tr>
      <th>Name</th>

      <th>Email</th>

      <th>Address</th>

      <th>Role</th>

      <th>View</th>
    </tr>
  </thead>

  <tbody>
    {users
  .filter((user) => {
    return (
      user.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      user.email
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      user.address
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      user.role
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );
  })
.sort((a, b) => {
  if (sortOrder === "asc") {
    return a.name.localeCompare(
      b.name
    );
  }

  return b.name.localeCompare(
    a.name
  );
})
  .map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>

        <td>{user.email}</td>

        <td>{user.address}</td>

        <td>{user.role}</td>

        <td>
          <button
              onClick={() => {
                fetchUserDetails(
                  user.id
                );

                fetchUserRatings(
                  user.id
                );
                fetchOwnerStores(
                   user.id
                  );
              }}
            >
              View
            </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

<hr />

<h2>User Details and User Ratings</h2>

{selectedUser && (
  <table className="admin-table">
    <thead>
      <tr>
        <th>Name</th>

        <th>Email</th>

        <th>Address</th>

        <th>Role</th>

       
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>
          {selectedUser.name}
        </td>

        <td>
          {selectedUser.email}
        </td>

        <td>
          {selectedUser.address}
        </td>

        <td>
          {selectedUser.role}
        </td>

        
      </tr>
    </tbody>
  </table>
)}





<table className="admin-table">
  <thead>
    <tr>
      <th>Store</th>

      <th>Rating</th>
    </tr>
  </thead>

  <tbody>
  {userRatings

  .sort((a, b) => {
    if (sortOrder === "asc") {
      return a.store_name.localeCompare(
        b.store_name
      );
    }

    return b.store_name.localeCompare(
      a.store_name
    );
  })

  .map(
      (rating, index) => (
        <tr key={index}>
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
<hr />

<h2>Owner Stores</h2>

<table className="admin-table">
  <thead>
    <tr>
      <th>Store</th>

      <th>
        Average Rating
      </th>
    </tr>
  </thead>

  <tbody>
    {ownerStores

  .sort((a, b) => {
    if (sortOrder === "asc") {
      return a.store_name.localeCompare(
        b.store_name
      );
    }

    return b.store_name.localeCompare(
      a.store_name
    );
  })

  .map(
      (store, index) => (
        <tr key={index}>
          <td>
            {store.store_name}
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
    
  );
}

export default AdminDashboard;