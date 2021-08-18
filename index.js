const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

let app = express();
app.use(express.json());

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pra&Rekha@102021",
  database: "occupational_health_services",
  multipleStatements: true,
});

connection.connect((error) => {
  if (!error) {
    console.log("Connection Succeeded.");
  } else {
    console.log("Connection Failed. " + error);
  }
});

app.listen(3000, () => {
  console.log("Listening... @ Port Number 3000");
});

let organizations_fetch = "CALL organizations_fetch;";

app.get("/organizations", (request, response) => {
  connection.query(organizations_fetch, (Errors, Rows, Fields) => {
    if (!Errors) {
      Rows.forEach((element) => {
        if (element.constructor == Array) {
          response.send(element);
        }
      });
      // response.send(Rows);
      //console.log(Fields[0][0].name);
    } else {
      console.log(Errors);
    }
  });
});

let organizations_fetch_id =
  "SET @_Id = ?; CALL organizations_fetch_id(@_Id); ";

app.get("/organizations/:id", (request, response) => {
  connection.query(
    organizations_fetch_id,
    [request.params.id],
    (Errors, Rows, Fields) => {
      if (!Errors) {
        Rows.forEach((element) => {
          if (element.constructor == Array) {
            response.send(element);
            // response.send(element["Name"]);
          }
        });
        //response.send(Rows);
        //console.log(Fields[0][0].name);
      } else {
        console.log(Errors);
      }
    }
  );
});

const organizations_insert =
  "SET @_Name = ?; SET @_Address = ?; SET @_MIDC = ?; SET @_City = ?; SET @_ContactNumber = ?; SET @_FaxNumber = ?; SET @_EmailId = ?; SET @_Website = ?; SET @_IndustryType = ?; SET @_Status = ?; SET @_CreatedBy = ?; \
   CALL organizations_insert(@_Name,@_Address,@_MIDC,@_City,@_ContactNumber,@_FaxNumber,@_EmailId,@_Website,@_IndustryType,@_Status,@_CreatedBy);";

app.post("/organizations", (request, response) => {
  let Organization = request.body;

  connection.query(
    organizations_insert,
    [
      Organization.Name,
      Organization.Address,
      Organization.MIDC,
      Organization.City,
      Organization.ContactNumber,
      Organization.FaxNumber,
      Organization.EmailId,
      Organization.Website,
      Organization.IndustryType,
      Organization.Status,
      Organization.CreatedBy,
    ],
    (Errors, Rows, Fields) => {
      if (!Errors) {
        Rows.forEach((element) => {
          if (element.constructor == Array) {
            response.send("Last Inserted OrganizationId:- " + element[0].Id);
          }
        });
        // response.send(Rows);
        //console.log(Fields[0][0].name);
      } else {
        console.log(Errors);
      }
    }
  );
});

const organizations_update =
  "SET @_Id = ?; SET @_Name = ?; SET @_Address = ?; SET @_MIDC = ?; SET @_City = ?; SET @_ContactNumber = ?; SET @_FaxNumber = ?; SET @_EmailId = ?; SET @_Website = ?; SET @_IndustryType = ?; SET @_Status = ?; SET @_ModifiedBy = ?; \
   CALL organizations_update(@_Id,@_Name,@_Address,@_MIDC,@_City,@_ContactNumber,@_FaxNumber,@_EmailId,@_Website,@_IndustryType,@_Status,@_ModifiedBy);";

app.put("/organizations", (request, response) => {
  let Organization = request.body;

  connection.query(
    organizations_update,
    [
      Organization.Id,
      Organization.Name,
      Organization.Address,
      Organization.MIDC,
      Organization.City,
      Organization.ContactNumber,
      Organization.FaxNumber,
      Organization.EmailId,
      Organization.Website,
      Organization.IndustryType,
      Organization.Status,
      Organization.ModifiedBy,
    ],
    (Errors, Rows, Fields) => {
      if (!Errors) {
        Rows.forEach((element) => {
          if (element.constructor == Array) {
            response.send("Last Updated OrganizationId:- " + element[0].Id);
          }
        });
        // response.send(Rows);
        //console.log(Fields[0][0].name);
      } else {
        console.log(Errors);
      }
    }
  );
});

const organizations_delete =
  "SET @_Id = ?; SET @_Status = ?; SET @_ModifiedBy = ?; \
   CALL organizations_delete(@_Id,@_Status,@_ModifiedBy);";

app.delete("/organizations", (request, response) => {
  let Organization = request.body;

  connection.query(
    organizations_delete,
    [Organization.Id, Organization.Status, Organization.ModifiedBy],
    (Errors, Rows, Fields) => {
      if (!Errors) {
        Rows.forEach((element) => {
          if (element.constructor == Array) {
            response.send("Last Deleted OrganizationId:- " + element[0].Id);
          }
        });
        // response.send(Rows);
        //console.log(Fields[0][0].name);
      } else {
        console.log(Errors);
      }
    }
  );
});
