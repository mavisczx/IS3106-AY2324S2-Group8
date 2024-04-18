import React from "react";

const EventDetails = () => {
  // Simulated event data
  const event = {
    title: "Soir de Fêtes with The Horns Are Unique Jazz Ensemble",
    date: new Date().toDateString(), // Example date
    location: "The Jazz Loft, Singapore",
    image: "https://via.placeholder.com/500x300",
    description:
      "Join us for a night of fantastic jazz music featuring renowned artists and ensembles. It's an evening you won't want to miss!",
    price: "SGD 50",
    deadline: "December 25, 2023", // Example deadline
    category: "Jazz Concert", // Example category
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen -m-10">
      <div className="flex flex-col justify-center items-center">
        <div className="py-12 max-w-4xl mx-auto">
          {/* Event Image */}
          <img
            className="w-full object-cover h-96 rounded-lg shadow-md"
            src={event.image}
            alt="Event"
          />

          {/* Event Content */}
          <div className="mt-4">
            <h1 className="text-3xl font-bold leading-tight">{event.title}</h1>
            <p className="mt-2 text-gray-600">{event.description}</p>

            <div className="mt-4">
              <span className="inline-block bg-indigo-200 text-indigo-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                Date: {event.date}
              </span>
              <span className="inline-block bg-green-200 text-green-800 text-xs px-2 ml-2 rounded-full uppercase font-semibold tracking-wide">
                Location: {event.location}
              </span>
              <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 ml-2 rounded-full uppercase font-semibold tracking-wide">
                Price: {event.price}
              </span>
              <span className="inline-block bg-purple-200 text-purple-800 text-xs px-2 ml-2 rounded-full uppercase font-semibold tracking-wide">
                Category: {event.category}
              </span>
            </div>

            {/* Registration Button and Deadline */}
            <div className="mt-4 flex justify-between items-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Register
              </button>
              <span className="inline-block bg-red-200 text-red-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                Deadline: {event.deadline}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
