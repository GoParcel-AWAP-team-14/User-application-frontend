import React, { useEffect, useState } from "react";

const TrackParcelsHistory = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const handleTrack = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/parcelhistory`,
          {
            method: "GET",
            headers: {
              auth_token: localStorage.getItem("token"),
              mobile: localStorage.getItem("mobile"),
            },
          }
        );

        if (!isMounted) {
          return;
        }

        const json = await response.json();

        if (json.success) {
          setParcels(json.response || []);
        }

        setLoading(false);
      } catch (error) {
        alert("An error occurred:", error);
        setLoading(false);
      }
    };

    handleTrack();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(undefined, options);
  };

  return (
    <div className="container mt-1">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {parcels.length === 0 ? (
            <p>No parcel data found</p>
          ) : (
            <div>
              {parcels.map((parcel, index) => (
                <div key={index} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <div className="card-body">
                        <div className="mb-3">
                          <p
                            style={{
                              fontWeight: "bold",
                              color: "rgb(72, 135, 248)",
                              fontSize: "20px",
                            }}
                          >
                            Sender Information
                          </p>
                          <p>Name: {parcel.sender.name}</p>
                          <p>Address: {parcel.sender.address}</p>
                          <p>Mobile: {parcel.sender.mobile}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card-body">
                        <div className="mb-3">
                          <p
                            style={{
                              fontWeight: "bold",
                              color: "rgb(72, 135, 248)",
                              fontSize: "20px",
                            }}
                          >
                            Recipient Information
                          </p>
                          <p>Name: {parcel.recipient.name}</p>
                          <p>Address: {parcel.recipient.address}</p>
                          <p>Mobile: {parcel.recipient.mobile}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card-body">
                        <div>
                          <p
                            style={{
                              fontWeight: "bold",
                              color: "rgb(72, 135, 248)",
                              fontSize: "20px",
                            }}
                          >
                            Parcel Information
                          </p>
                          <p>
                            Ready For Pickup:{" "}
                            {formatDate(parcel.readyForPickupDateTime)}
                          </p>
                          <p>
                            Picked Up: {formatDate(parcel.pickedUpDateTime)}
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              color: "rgb(246, 65, 47)",
                              fontSize: "20px",
                            }}
                          >
                            Status: {parcel.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackParcelsHistory;
