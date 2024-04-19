import React from "react";
import { useEffect, useState } from "react";

//import Api from "../helpers/API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../components/Button";
import CustomDialog from "../components/CustomDialog";

import { Icon } from "@iconify/react";

import ApiStudent from "../helpers/ApiStudent";

const ProfileForm = ({
  userInfo,
  setUserInfo,
  setProfileDialog,
  updateUser,
}) => {
  const id = localStorage.getItem("token");

  const [formInfo, setFormInfo] = useState(userInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    e.target.setCustomValidity("");
    //console.log("Setting form info...")
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
    //console.log(formInfo)
  };

  const checkValidUsername = (email) => {
    return true; //dummy function; replace this with API.then() call later, don't actually use this please
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form for username

    if (
      checkValidUsername(formInfo.email) === false &&
      formInfo.email !== userInfo.email
    ) {
      // Set custom validity to trigger the browser-native popup
      const inputElement = e.target[2];
      inputElement.setCustomValidity("Email already taken");
      inputElement.reportValidity();
    } else {
      // Reset form fields
      //console.log(formInfo)
      setUserInfo(formInfo);
      updateUser(formInfo);
      setProfileDialog(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <div className="flex flex-row space-x-2">
          <label>Name:</label>
          <input
            className="px-1 border"
            type="text"
            name="name"
            value={formInfo.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-row space-x-2">
          <label>Userame:</label>
          <input
            className="px-1 border"
            type="text"
            name="username"
            value={formInfo.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-row space-x-2">
          <label>Contact:</label>
          <input
            className="px-1 border"
            type="text"
            name="contact"
            value={formInfo.contact}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row space-x-2">
          <label>Origin University:</label>
          <input
            className="px-1 border"
            type="text"
            name="originUni"
            value={formInfo.originUni}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row space-x-2">
          <label>Exchange University:</label>
          <input
            className="px-1 border"
            type="text"
            name="exchangeUni"
            value={formInfo.exchangeUni}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row space-x-2">
          <label>Email:</label>
          <input
            className="px-1 border"
            type="text"
            name="email"
            value={formInfo.email}
            onChange={handleChange}
            required
            id="email"
          />
        </div>

        <div className="flex flex-row space-x-4">
          <Button type="submit">Submit</Button>
          <Button onClick={() => setProfileDialog(false)}>Cancel</Button>
        </div>
      </div>
    </form>
  );
};

const PasswordForm = ({
    userInfo,
    setUserInfo,
    setPasswordDialog,
    updateUser,
  }) => {
    const id = localStorage.getItem("token");

    const [formInfo, setFormInfo] = useState({
      "password": "",
      "passwordConfirm": ""
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      e.target.setCustomValidity("");
      //console.log("Setting form info...")
      setFormInfo({
        ...formInfo,
        [name]: value,
      });
      //console.log(formInfo)
    };
  
    const checkValidPassword = (password1, password2) => {
      return password1 === password2; //dummy function; replace this with API.then() call later, don't actually use this please
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Validate the form for username
  
      if (
        checkValidPassword(formInfo.password, formInfo.passwordConfirm) === false
      ) {
        // Set custom validity to trigger the browser-native popup
        const inputElement = e.target[1];
        inputElement.setCustomValidity("Passwords do not match");
        inputElement.reportValidity();
      } else {
        // Reset form fields
        //console.log(formInfo)
  
        let tempUserInfo = userInfo;
        tempUserInfo.password = formInfo.password;
        setUserInfo(tempUserInfo)
        updateUser(tempUserInfo);
        setPasswordDialog(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          <div className="flex flex-row space-x-2">
            <label>New Password:</label>
            <input
              className="px-1 border"
              type="text"
              name="password"
              value={formInfo.password}
              onChange={handleChange}
              required
              
            />
          </div>
          <div className="flex flex-row space-x-2">
            <label>Re-enter Password:</label>
            <input
              className="px-1 border"
              type="text"
              name="passwordConfirm"
              value={formInfo.passwordConfirm}
              onChange={handleChange}
              required
              
            />
            </div>
          
  
          <div className="flex flex-row space-x-4">
            <Button type="submit">Submit</Button>
            <Button onClick={() => setPasswordDialog(false)}>Cancel</Button>
          </div>
        </div>
      </form>
    );
  
  };

function Profile() {
  const id = localStorage.getItem("token");

  const [userType, setUserType] = useState("student"); //can also be admin

  const [userInfo, setUserInfo] = useState({
    contact: "",
    email: "",
    exchangeUni: "",
    originUni: "",
    id: -1,
    name: "",
    password: "",
    profilePhoto:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNiWy0rcwErKtx6GbzcswtRJBjDTJVxgdjrWTVOUMcKw&s",
    postsCreated: [],
    threadsCreated: [],
    eventsCreated: [],
    eventsJoined: [],
  });

  //This is why we can't have nice things
  const [createdEventsSize, setCreatedEventsSize] = useState("0")
  const [threadSize, setThreadSize] = useState("0")
  const [joinedEventsSize, setJoinedEventsSize] = useState("0")
  const [postsSize, setPostsSize] = useState("0")

  const [imgDialog, setImgDialog] = useState(false);

  const [profileDialog, setProfileDialog] = useState(false);

  const [passwordDialog, setPasswordDialog] = useState(false);

  const [currentFile, setCurrentFile] = useState();

  const updateUser = (userInfo) => {
    // Insert API call here...
    if (userType === "student") {
      console.log(id);

      if (userInfo.id !== -1) {
        console.log("Updating with...");
        console.log(userInfo);
        ApiStudent.updateStudentProfile(userInfo, id)
          .then((resp) => {
            return resp.text();
          })
          .then((resp) => {
            console.log(resp);
            ApiStudent.retrieveStudentById(id)
              .then((res) => {
                //console.log(id)
                return res.json();
              })
              .then((user) => {
                //console.log(user)
                //console.log(user.originUni)
                setUserInfo(user);
              });
          });
      }
      ApiStudent.retrieveStudentById(id)
        .then((res) => {
          //console.log(id)
          return res.json();
        })
        .then((user) => {
          //console.log(user)
          //console.log(user.originUni)
          setUserInfo(user);
        });

    }
    ApiStudent.getCreatedEventSize(id).then(
        (res) => {return res.text()}).then((value) => {
            setCreatedEventsSize(value)
        }
    )
    ApiStudent.getJoinedEventsSize(id).then(
        (res) => {return res.text()}).then((value) =>{
            setJoinedEventsSize(value)
        }
    )
    ApiStudent.getThreadSize(id).then(
        (res) => {return res.text()}).then((value) =>{
            setThreadSize(value)
        }
    )
    ApiStudent.getPostSize(id).then(
        (res) => {return res.text()}).then((value) =>{
            setPostsSize(value)
        }
    )
  };

  useEffect(() => {
    updateUser(userInfo);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCurrentFile(file);
  };

  const uploadFile = () => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result;
      console.log(base64String);

      let tempUserInfo = userInfo;
      tempUserInfo.profilePhoto = base64String;
      setUserInfo(userInfo);
      updateUser(tempUserInfo);
    };

    reader.readAsDataURL(currentFile);
  };

  let fileInput;

  return (
    <div>
      <ToastContainer />
      <CustomDialog
        title="Upload Profile Picture"
        open={imgDialog}
        onClose={() => setImgDialog(false)}
      >
        <div className="p-4 space-y-2">
          <input
            type="file"
            ref={(input) => (fileInput = input)}
            onChange={(e) => handleFileChange(e)}
          />
          <div className="flex flex-row space-x-4">
            <Button type="submit" onClick={() => uploadFile()}>
              Submit
            </Button>
            <Button onClick={() => setImgDialog(false)}>Cancel</Button>
          </div>
        </div>
      </CustomDialog>

      <CustomDialog
        title="Edit Profile"
        open={profileDialog}
        onClose={() => setProfileDialog(false)}
      >
        <div className="p-4 space-y-4">
          <ProfileForm
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            setProfileDialog={setProfileDialog}
            updateUser={updateUser}
          />
        </div>
      </CustomDialog>
      <CustomDialog
        title="Update Password"
        open={passwordDialog}
        onClose={() => setPasswordDialog(false)}
      >
        <div className="p-4 space-y-4">
        <PasswordForm
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            setPasswordDialog={setPasswordDialog}
            updateUser={updateUser}
          />
        </div>
      </CustomDialog>
      <div class="bg-gray-300 antialiased">
        <div class="container mx-auto my-36">
          <div>
            <div class="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto pb-2">
              <div class="flex justify-center">
                <img
                  src={
                    userInfo.profilePhoto != ""
                      ? userInfo.profilePhoto
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNiWy0rcwErKtx6GbzcswtRJBjDTJVxgdjrWTVOUMcKw&s"
                  }
                  alt=""
                  class="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                />
                {/*<span class="absolute top-0 transform translate-x-10 translate-y-7 w-3.5 h-3.5">
                            <Icon icon="lucide:edit" className = "text-2xl" />
                        </span>*/}
              </div>

              <div class="mt-16 flex flex-col items-center">
                <h1 class="font-bold text-center text-3xl text-gray-900">
                  {userInfo.name}
                </h1>
                <b> {userInfo.username} </b>
                {userType === "admin" && (
                  <b className="text-red-600"> (ADMIN) </b>
                )}
                <p class="text-center text-sm text-gray-400 font-medium">
                  <div className="flex flex-row items-center space-x-1">
                    <Icon icon="ic:baseline-email" className="mt-1" />
                    <span>{userInfo.email}</span>
                  </div>
                </p>
                {userInfo.contact !== "" && userInfo.contact !== undefined && (
                  <p class="text-center text-sm text-gray-400 font-medium">
                    <div className="flex flex-row items-center space-x-1">
                      <Icon icon="ic:baseline-phone" className="mt-1" />
                      <span>{userInfo.contact}</span>
                    </div>
                  </p>
                )}
                <br />

                {userType === "student" && (
                  <div class="flex-col flex justify-between space-y-4">
                    {userInfo.originUni !== undefined && (
                      <p className="text-sm text-gray-700">
                        
                        <b>{userInfo.name} is from:</b> <br />
                        {userInfo.originUni}
                      </p>
                    )}
                    {userInfo.originUni !== undefined && (
                      <p className="text-sm text-gray-700">
                        
                        <b>Now on exchange at:</b> <br />
                        {userInfo.exchangeUni}
                      </p>
                    )}
                    <br />
                  </div>
                )}

                <div class="flex flex-col text-center text-xs text-gray-400 font-medium justify-around">
                  <div class="flex flex-row justify-around space-x-4">
                    <div>
                      {postsSize} post
                      {postsSize != "1" && "s"} created
                    </div>
                    <div>
                      {threadSize} thread
                      {threadSize != "1" && "s"} created
                    </div>
                  </div>
                  <div class="flex flex-row justify-around space-x-4">
                    <div>
                      {createdEventsSize} event
                      {createdEventsSize != "1" && "s"} created
                    </div>
                    {userType == "student" && (
                      <div>
                        {joinedEventsSize} event
                        {joinedEventsSize != "1" && "s"} joined
                      </div>
                    )}
                  </div>
                </div>

                {/*add check for if id = user's? needs token first though. */}
                <div class="my-5 px-6 flex flex-col items-center justify-center text-xs space-y-1">
                    <div className = "flex flex-row space-x-1">
                  <Button onClick={() => setImgDialog(true)}>
                    Upload Picture
                  </Button>
                  <Button onClick={() => setProfileDialog(true)}>
                    Edit Profile
                  </Button>
                  </div>
                    <Button onClick = {() => setPasswordDialog(true)}> 
                        Update Password 
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
