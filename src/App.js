import React from "react";


export default class App extends React.Component {

  constructor(props){
    super(props)
    //properties
    this.state ={
      firstname: "",
      lastname: "",
      newfirstname: "",
      newlastname: "",
      updateId: "",
      id: "",
      names: null,
    }
    //api end point
    this.ENDPOINT = "https://crudcrud.com/api/237d8773078a4092b5098542f7c0d535"
  }
   //event handler for buttons
   handleChange = (e) => {
    var id = e.target.getAttribute("id");
    if (id == "fNameForm") {
      this.setState({ firstname: e.target.value });
    }
    if (id == "lNameForm") {
      this.setState({ lastname: e.target.value });
    }
    if (id == "deleteForm") {
      this.setState({ id: e.target.value });
    }
    if (id == "updateFName") {
      this.setState({ newfirstname: e.target.value });
    }
    if (id == "updateLName") {
      this.setState({ newlastname: e.target.value });
    }
    if (id == "updateId") {
      this.setState({ updateId: e.target.value });
    }
  };
  //Create request here
  createRequest = (fname,lname) => {
    console.log("Create request");
    fetch(this.ENDPOINT + "/names", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first: fname, last:lname}),
    }).then((result) => {
      console.log(result);
    });
  };

//Delete request here
deleteRequest = (id) => {
  console.log("Delete request");
  fetch(this.ENDPOINT + "/names/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    console.log(result);
  });
};

//Update request here
updateRequest = (id, fname, lname) => {
 console.log("Update Request")
  fetch(this.ENDPOINT + "/names/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ first: fname, last: lname }),
  }).then((result) => {
    console.log(result);
  });
};
//read request
readRequest = () => {
  console.log("Read request")
  fetch(this.ENDPOINT + "/names")
    .then((result) => result.json())
    .then((data) => {
      this.setState({ names: data });
    });
};


  render(){
    
    //Displays all name data in console
   console.log(this.state.names);
   
    return(
      //render our 4 crud buttons 
    <div className="container">
      
    <input id='fNameForm' type="text"  placeholder='First name here' onChange={this.handleChange} value = {this.state.firstname}/> 
    <input id='lNameForm' type="text"  placeholder='Last name here' onChange={this.handleChange} value = {this.state.lastname}/> 
    <button id = "createButton" className="btn btn-primary" onClick={() =>
            this.createRequest(this.state.firstname,this.state.lastname)}>Create</button>
      <br></br>
      <br></br>
    
    
    <input id='updateFName' type="text"  placeholder='new first name here' onChange={this.handleChange} value = {this.state.newfirstname}/> 
    <input id='updateLName' type="text"  placeholder='new last name here' onChange={this.handleChange} value = {this.state.newlastname}/> 
    <input id="updateId"type="text"  placeholder='Search for id to update 'onChange={this.handleChange} value = {this.state.updateId}  /> 
    <br></br>
    <button id="updateButton" className="btn btn-primary" onClick={() => this.updateRequest(this.state.updateId,this.state.newfirstname,this.state.newlastname)}>Update</button>
    <br></br>
    <br></br>
    <input id="deleteForm"type="text" placeholder='Delete here' onChange={this.handleChange} value = {this.state.id} /> 
    <button id="deleteButton" className="btn btn-primary"onClick={() => this.deleteRequest(this.state.id)}>Delete</button>
    <br></br>
    <br></br>
    <button id="readButton" className="btn btn-primary"onClick={() => this.readRequest()}>Read</button>
    </div>
    )
    
    
}
}

