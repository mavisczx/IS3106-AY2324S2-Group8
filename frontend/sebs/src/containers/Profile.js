import React from "react";
import { useEffect, useState } from "react";


//import Api from "../helpers/API";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Button from "../components/Button";
import CustomDialog from "../components/CustomDialog";

import { Icon } from "@iconify/react";

import ApiStudent from "../helpers/ApiStudent";


const ProfileForm = ({ userInfo, setUserInfo, setProfileDialog, updateUser }) => {

    const [formInfo, setFormInfo] = useState(userInfo);

    const handleChange = (e) => {
        const { name, value } = e.target;
        e.target.setCustomValidity('')

        setFormInfo({
            ...formInfo,
            [name]: value
        });
    };

    const checkValidUsername = (email) => {
        return true; //dummy function; replace this with API.then() call later, don't actually use this please
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate the form for username

        if (checkValidUsername(formInfo.email) === false && formInfo.email !== userInfo.email) {
            // Set custom validity to trigger the browser-native popup
            const inputElement = e.target[2];
            inputElement.setCustomValidity('Email already taken');
            inputElement.reportValidity();

        } else {
            //Api.updateUser(formInfo.id, formInfo)
            //.then((res) => console.log(res))
            //.then(() => updateUser())

            // Reset form fields
            setProfileDialog(false);
        }






    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-2">
                <div className="flex flex-row space-x-2">
                    <label>Name:</label>
                    <input className="px-1 border"
                        type="text"
                        name="name"
                        value={formInfo.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex flex-row space-x-2">

                    <label>Contact:</label>
                    <input className="px-1 border"
                        type="text"
                        name="contact"
                        value={formInfo.contact}
                        onChange={handleChange}

                    />
                </div>

                <div className="flex flex-row space-x-2">
                    <label>Email:</label>
                    <input className="px-1 border"
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




function Profile() {

    const id = localStorage.getItem("token");

    const [userType, setUserType] = useState("student") //can also be admin

    const [userInfo, setUserInfo] = useState({
        contact: "12345",
        email: "dummy@dummy.com",
        exchangeUni: "National University of Singapore 2",
        originUni: "National University of Singapore",
        id: -1,
        name: "dummy",
        password: "dummy",
        profilePhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNiWy0rcwErKtx6GbzcswtRJBjDTJVxgdjrWTVOUMcKw&s",
        postsCreated: ["dummy"],
        threadsCreated: ["dummy", "dummy"],
        eventsCreated: [],
        eventsJoined: ["dummy"]
    });

    const [imgDialog, setImgDialog] = useState(false)

    const [profileDialog, setProfileDialog] = useState(false)


    const [currentFile, setCurrentFile] = useState();

    const updateUser = () => {
        // Insert API call here...
        if (userType === "student") {
            console.log(id)

            if (userInfo.id !== -1) {
                console.log(userInfo)
                ApiStudent.updateStudentProfile(userInfo, id)
                    .then((resp) => { return resp.text() })
                    .then((resp) => {
                        console.log(resp)
                        ApiStudent.retrieveStudentById(id)
                            .then((res) => {
                                //console.log(id)
                                return res.json()
                            })
                            .then((user) => {
                                //console.log(user)
                                //console.log(user.originUni)
                                setUserInfo(user)

                            }
                            )
                    }
                    )
            }
            ApiStudent.retrieveStudentById(id)
                .then((res) => {
                    //console.log(id)
                    return res.json()
                })
                .then((user) => {
                    //console.log(user)
                    //console.log(user.originUni)
                    setUserInfo(user)

                }
                )

        }
    }


    useEffect(() => {
        updateUser();

    }, [])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setCurrentFile(file);
    };

    const uploadFile = () => {

        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result;

            let tempUserInfo = userInfo
            tempUserInfo.profilePhoto = base64String
            setUserInfo(userInfo)
            updateUser()

        };

        reader.readAsDataURL(currentFile);




    }

    let fileInput;



    return <div>
        <ToastContainer />
        <CustomDialog title="Upload Profile Picture"
            open={imgDialog}
            onClose={() => setImgDialog(false)}
        >
            <div className="p-4 space-y-2">
                <input
                    type="file"
                    ref={(input) => (fileInput = input)}
                    onChange={(e) => handleFileChange(e)} />
                <div className="flex flex-row space-x-4">
                    <Button type="submit" onClick={() => uploadFile()}>Submit</Button>
                    <Button onClick={() => setImgDialog(false)}>Cancel</Button>
                </div>

            </div>

        </CustomDialog>

        <CustomDialog title="Edit Profile"
            open={profileDialog}
            onClose={() => setProfileDialog(false)}
        >
            <div className="p-4 space-y-4">
                <ProfileForm
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    setProfileDialog={setProfileDialog}
                    updateUser={updateUser} />
            </div>
        </CustomDialog>

        <div class="bg-gray-300 antialiased">
            <div class="container mx-auto my-36">
                <div>

                    <div class="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto pb-2">
                        <div class="flex justify-center">

                            <img src={userInfo.profilePhoto} alt="" class="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
                            {/*<span class="absolute top-0 transform translate-x-10 translate-y-7 w-3.5 h-3.5">
                            <Icon icon="lucide:edit" className = "text-2xl" />
                        </span>*/}
                        </div>

                        <div class="mt-16 flex flex-col items-center">
                            <h1 class="font-bold text-center text-3xl text-gray-900">{userInfo.name}</h1>
                            {userType === "admin" && <b className="text-red-600"> (ADMIN) </b>}
                            <p class="text-center text-sm text-gray-400 font-medium">
                                <div className="flex flex-row items-center space-x-1">
                                    <Icon icon="ic:baseline-email" className="mt-1" />
                                    <span>{userInfo.email}</span>
                                </div>
                            </p>
                            {(userInfo.contact !== "" && userInfo.contact !== undefined) &&
                                <p class="text-center text-sm text-gray-400 font-medium">
                                    <div className="flex flex-row items-center space-x-1">
                                        <Icon icon="ic:baseline-phone" className="mt-1" />
                                        <span>{userInfo.contact}</span>
                                    </div>
                                </p>}
                            <br />

                            {userType === "student" &&
                                <div class="flex-col flex justify-between space-y-4">
                                    {
                                        userInfo.originUni !== undefined &&

                                        <p className="text-sm text-gray-700"> <b>{userInfo.name} is from:</b> <br />{userInfo.originUni}</p>
                                    }
                                    {
                                        userInfo.originUni !== undefined &&
                                        <p className="text-sm text-gray-700"> <b>Now on exchange at:</b> <br />{userInfo.exchangeUni}</p>}
                                </div>
                            }

                            <div class="flex flex-col text-center text-xs text-gray-400 font-medium justify-around">
                                <div class="flex flex-row justify-around space-x-4">
                                    <div>{userInfo.postsCreated.length} post{userInfo.postsCreated.length != 1 && "s"} created</div>
                                    <div>{userInfo.threadsCreated.length} thread{userInfo.threadsCreated.length != 1 && "s"} created</div>
                                </div>
                                <div class="flex flex-row justify-around space-x-4">
                                    <div>{userInfo.eventsCreated.length} event{userInfo.eventsCreated.length != 1 && "s"} created</div>
                                    {userType == "student" && <div>{userInfo.eventsJoined.length} event{userInfo.eventsJoined.length != 1 && "s"} joined</div>}
                                </div>
                            </div>

                            {/*add check for if id = user's? needs token first though. */}
                            <div class="my-5 px-6 flex flex-row items-center justify-center space-x-1 text-xs">
                                <Button onClick={() => setImgDialog(true)}> Upload Picture </Button>
                                <Button onClick={() => setProfileDialog(true)}> Edit Profile </Button>

                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
}

export default Profile;