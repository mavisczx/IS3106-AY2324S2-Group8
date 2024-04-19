import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ApiEvent from "../../helpers/ApiEvent";

const RegisteredUsersTable = ({ eventId }) => {
  const [registrants, setRegistrants] = useState([]);

  useEffect(() => {
    const fetchRegistrants = async () => {
      const token = localStorage.getItem("token");
      const response = await ApiEvent.viewAllRegistered(eventId, token);
      if (response.ok) {
        const data = await response.json();
        setRegistrants(data);
      } else {
        console.error("Error fetching registrants");
      }
    };

    fetchRegistrants();
  }, [eventId]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contact || "N/A",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
  ];

  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Registered Users
      </h3>
      <DataTable
        columns={columns}
        data={registrants}
        defaultSortFieldId={1}
        pagination
        highlightOnHover
        persistTableHead
      />
    </div>
  );
};

export default RegisteredUsersTable;
