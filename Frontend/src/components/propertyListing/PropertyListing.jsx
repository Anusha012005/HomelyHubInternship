import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "../../css/PropertyListing.css";

import PropertyImg from "./PropertyImg";
import PaymentForm from "./PaymentForm";
import PropertyAmenities from "./PropertyAmenities";
import PropertyMapInfo from "./PropertyMapInfo";
import LoadingSpinner from "../LoadingSpinner";

import { getPropertyDetails } from "../../store/PropertyDetails/propertyDetails-action";

const PropertyListing = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    loading,
    propertydetails,
    error,
  } = useSelector((state) => state.propertydetails);

  useEffect(() => {
    if (id) {
      dispatch(getPropertyDetails(id));
    }
  }, [dispatch, id]);

  // Loading
  if (loading) {
    return (
      <div className="row justify-content-around mt-5">
        <LoadingSpinner />
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="container mt-5">
        <h3>Something went wrong</h3>
        <p>{error}</p>
      </div>
    );
  }

  // No property
  if (!propertydetails) {
    return (
      <div className="container mt-5">
        <h3>Property details not found</h3>
      </div>
    );
  }

  const {
    propertyName,
    address,
    description,
    images,
    amenities,
    maximumGuest,
    price,
    currentBookings,
  } = propertydetails;

  return (
    <div className="property-container">

      {/* Property Name */}
      <p className="property-header">
        {propertyName}
      </p>

      {/* Property Location */}
      <h6 className="property-location">
        <span className="material-symbols-outlined">
          house
        </span>

        <span className="location">
          {address?.area}, {address?.city}, {address?.state}
        </span>
      </h6>

      {/* Property Images */}
      <PropertyImg images={images} />

      <div className="middle-container row">

        {/* Description and Amenities */}
        <div className="des-and-amenities col-md-8 col-sm-12 col-12">

          <h2 className="property-description-header">
            Description
          </h2>

          <p className="property-description">
            {description}
            <br />
            <br />
            Max number of guests: {maximumGuest}
          </p>

          <hr />

          <PropertyAmenities amenities={amenities} />

        </div>

        {/* Payment */}
        <div className="property-payment col-md-4 col-sm-12 col-12">

          <PaymentForm
            propertyId={id}
            price={price}
            propertyName={propertyName}
            address={address}
            maximumGuest={maximumGuest}
            currentBookings={currentBookings}
          />

        </div>
      </div>

      <hr />

      {/* Map */}
      <div className="property-map">
        <div className="map-image-exinfo-container row">

          <PropertyMapInfo address={address} />

        </div>
      </div>

    </div>
  );
};

export default PropertyListing;