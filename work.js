//libraries

const express = require("express");
const mongoose = require("mongoose");
const userSch = require("./UserSchema");
const RoleSch = require("./RoleSchema");

const app = express();

app.use(express.json());

//connectivity with mongoDB

mongoose
  .connect("mongodb://localhost:27017/UserDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDb connected....");
  });
//users  CRUD....
//Add User

app.post("/UserDB", (req, res) => {
  console.log(req.body);

  const userWork = new userSch({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  userWork.save((err, user) => {
    if (err) {
      res.json({ errmsg: err });
      return;ho
    } else {
      res.json({ msg: user });
      console.log("User Added Successfully to DB");
    }
  });
});

//Get all User
app.get("/UserDB", (req, res) => {
  userSch.find({}, (err, users) => {
    if (err) {
      console.log(err);
      res.status(500).json({ errmsg: err });
      return;
    } else {
      console.log("users", users);

      res.status(200).json({ msg: users });
      console.log("All user data is extracted");
    }
  }).populate('role');
});

//get User by id
app.get("/UserDB/:id", (req, res) => {
  userSch.findById({ _id: req.params.id }, (err, users) => {
    if (err) {
      console.log(err);
      res.status(500).json({ errmsg: err });
      return;
    } else {
      res.status(200).json({ msg: users });
      console.log("users", users);
      console.log("require useer id is extracted");
    }
  }).populate('role');
});

//update user
app.put("/UserDB/:id", (req, res) => {
  console.log("req.body", req.body);
  userSch.findById(req.params.id, (err, users) => {
    if (err) {
      res.status(500).json({ errmsg: err });
      return;
    } else {
      (users.name = req.body.name),
        (users.email = req.body.email),
        (users.password = req.body.password),
        (users.role = req.body.role);
      users.save((err, users) => {
        if (err) {
          res.status(500).json({ errmsg: err });
          return;
        } else {
          res.status(200).json({ data: users, status: true });
          console.log("updated successfully...");
        }
      });
    }
  });
});

//delete user
app.delete("/UserDB/:id", (req, res) => {
  userSch.findOneAndRemove(req.params.id, (err, user) => {
    if (err) {
      res.status(500).json({ errmsg: err });
      return;
    } else {
      res.status(200).json({ msg: user });
      console.log("deleted sucessfully!");
    }
  });
});

//ROLES CRUD

//Add User role

app.post("/UserDB/roles", (req, res) => {
  console.log(req.body);

  const userRole = new RoleSch({
    roleName: req.body.roleName,
    roleTitle: req.body.roleTitle,
  });
  userRole.save((err, role) => {
    if (err) {
      res.json({ errmsg: role });
      return;
    } else {
      res.json({ msg: role });
      console.log("User Role Added Successfully to DB");
    }
  });
});

//Get all roles
app.get("/api/roles", (req, res) => {
  RoleSch.find({}, (err, role) => {
    if (err) {
      console.log(err);
      res.status(500).json({ errmsg: err });
      return;
    } else {
      console.log("role", role);

      res.status(200).json({ msg: role });
      console.log("All available roles are extracted");
    }
  });
});

//get User by id
app.get("/UserDB/roles/:id", (req, res) => {
  RoleSch.findById({ _id: req.params.id }, (err, role) => {
    if (err) {
      console.log(err);
      res.status(500).json({ errmsg: err });
      return;
    } else {
      res.status(200).json({ msg: role });
      console.log("role", role);
      console.log("require role id is extracted");
    }
  });
});

//update user role
app.put("/UserDB/roles/:id", (req, res) => {
  console.log("req.body", req.body);
  RoleSch.findById(req.params.id, (err, role) => {
    if (err) {
      res.status(500).json({ errmsg: err });
      return;
    } else {
      (role.roleName = req.body.roleName),
        (role.roleTitle = req.body.roleTitle),
        role.save((err, role) => {
          if (err) {
            res.status(500).json({ errmsg: err });
            return;
          } else {
            res.status(200).json({ data: role, status: true });
            console.log("roles updated successfully...");
          }
        });
    }
  });
});

//delete Role
app.delete("/UserDB/roles/:id", (req, res) => {
  RoleSch.findOneAndRemove((_id = req.params.id), (err, user) => {
    if (err) {
      res.status(500).json({ errmsg: err });
      return;
    } else {
      res.status(200).json({ msg: user });
      console.log("deleted sucessfully!");
    }
  });
});

app.listen(4000, () => {
  console.log("listening on Port 4000");
});
