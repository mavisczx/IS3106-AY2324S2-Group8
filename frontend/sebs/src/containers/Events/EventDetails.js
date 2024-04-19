import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiEvent from "../../helpers/ApiEvent";
import ApiStudent from "../../helpers/ApiStudent";
import moment from "moment";
import workshop_image from "../../Images/workshop.jpg";
import concert_image from "../../Images/concert.jpg";
import festival_image from "../../Images/festival.jpg";
import theatre_image from "../../Images/theatre.jpg";
import other_image from "../../Images/other.jpg";
import food_image from "../../Images/food.jpg";
import attraction_image from "../../Images/attraction.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomDialog from "../../components/CustomDialog";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [owner, setOwner] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const categoryImages = {
    attractions: attraction_image,
    festivals: festival_image,
    workshops: workshop_image,
    concerts: concert_image,
    theatre: theatre_image,
    others: other_image,
    food: food_image,
  };

  useEffect(() => {
    reloadData();
  }, []);

  const reloadData = () => {
    const token = localStorage.getItem("token");
    ApiEvent.getEventById(id, token).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          const { eventDate, deadline } = data;
          data.eventDate = eventDate.substring(0, eventDate.length - 5);
          data.eventDate = moment(data.eventDate).format("DD/MM/YYYY");
          data.deadline = deadline.substring(0, deadline.length - 5);
          data.deadline = moment(data.deadline).format("DD/MM/YYYY");
          setEvent(data);
        });
        checkStatus(id);
      } else {
        console.error("Error fetching event");
      }
    });
  };

  const checkRegister = () => {
    if (moment(event.eventDate, "DD/MM/YYYY").toDate() < new Date()) {
      toast.error("Event date has passed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      return;
    } else if (moment(event.deadline, "DD/MM/YYYY").toDate() < new Date()) {
      toast.error("Registration deadline has passed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      return;
    }

    handleRegister(id);
  };

  const handleRegister = (id) => {
    const token = localStorage.getItem("token");
    try {
      ApiStudent.registerForEvent(id, token).then((res) => {
        if (res.ok) {
          toast.success("Registered for event successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
          });
          reloadData();
        } else if (res.status === 404) {
          toast.error("Error registering for event", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        }
      });
    } catch (error) {
      console.error("Error registering for event", error);
    }
  };

  const checkStatus = (id) => {
    const token = localStorage.getItem("token");
    ApiStudent.isEventOwner(id, token).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          if (data) {
            setOwner(true);
          } else {
            setOwner(false);
          }
        });
      } else {
        setOwner(false);
      }
    });

    ApiStudent.checkRegistrationForEvent(id, token).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          if (data) {
            setRegistered(true);
          } else {
            setRegistered(false);
          }
        });
      } else {
        setRegistered(false);
      }
    });
  };

  const openUnregister = () => {
    setIsDialogOpen(true);
  };

  const handleDelete = () => {
    const token = localStorage.getItem("token");

    try {
      ApiStudent.unregisterForEvent(id, token).then((res) => {
        if (res.ok) {
          toast.success("Unregistered from event successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
          });
          reloadData();
          setIsDialogOpen(false);
        } else if (res.status === 404) {
          toast.error("Error unregistering from event", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        }
      });
    } catch (error) {
      console.error("Error unregistering from event", error);
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen -m-10">
      <div className="flex flex-col justify-center items-center">
        <div className="py-12 max-w-4xl mx-auto">
          {/* Event Image */}
          <img
            className="w-full object-cover h-96 rounded-lg shadow-md"
            src={categoryImages[event.eventCategory]}
            alt="Event"
          />

          {/* Event Content */}
          <div className="mt-4">
            <h1 className="text-3xl font-bold leading-tight">
              {event.eventTitle}
            </h1>
            <p className="mt-2 text-gray-600">{event.eventDescription}</p>

            <div className="mt-4">
              <span className="inline-block bg-indigo-200 text-indigo-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                Date: {event.eventDate}
              </span>
              <span className="inline-block bg-green-200 text-green-800 text-xs px-2 ml-2 rounded-full uppercase font-semibold tracking-wide">
                Location: {event.eventLocation}
              </span>
              <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 ml-2 rounded-full uppercase font-semibold tracking-wide">
                Price: {event.eventPrice}
              </span>
              <span className="inline-block bg-purple-200 text-purple-800 text-xs px-2 ml-2 rounded-full uppercase font-semibold tracking-wide">
                Category: {event.eventCategory}
              </span>
            </div>

            {/* Registration Button and Deadline */}
            <div className="mt-4 flex justify-between items-center">
              {owner && (
                <div className="bg-orange-400 text-white font-bold py-2 px-4 rounded">
                  <p>Owner</p>
                </div>
              )}
              {registered && !owner && (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => openUnregister()}
                >
                  <p>Registered</p>
                </button>
              )}
              {isDialogOpen && (
                <CustomDialog
                  title="Unregister from Event"
                  open={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                >
                  {/* Content of the dialog */}
                  <div className="space-y-4 p-5">
                    <div className="mt-3 text-center">
                      <p class="text-md text-gray-500">
                        Are you sure you want to unregister from this event?
                      </p>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => handleDelete()}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </CustomDialog>
              )}
              {!registered && !owner && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => checkRegister()}
                >
                  Register
                </button>
              )}

              <span className="inline-block bg-red-200 text-red-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                Deadline: {event.deadline}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
