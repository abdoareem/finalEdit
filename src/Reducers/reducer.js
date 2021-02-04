import React from "react";

// The available AZ codes; left out 'a' because it is added by default
let azCodes = ["b", "c", "d", "e", "f"];

const reducer = (state, action) => {
  switch (action.type) {
    /**
     * Changes the region and updates the name of each AZ
     *
     * @payload {string} The new region name
     */
    case "CHANGE_REGION": {
      // Create new AZ array with new az object references
      let newAZs = [];
      state.AZs.forEach((az) => {
        newAZs.push(Object.assign({}, az));
      });

      // Now change the region names
      newAZs.forEach((az, i) => {
        az.name = action.payload + az.name.slice(-1);
      });

      return { ...state, region: action.payload, AZs: newAZs };
    }
    /**
     * Adds a new subnet to the AZ
     *
     * @payload {type, services, azNumber} where the type is public/private
     */
    case "ADD_SUBNET": {
      const { azNumber, services, type, ip } = action.payload;
      let AZs = state.AZs.slice(0);
      if (type === "private") {
        AZs[azNumber].privateSubnets.push({
          name: `private-subnet-${AZs[azNumber].privateSubnets.length}`,
          services,
          ip,
        });
      } else if (type === "public") {
        AZs[azNumber].publicSubnets.push({
          name: `public-subnet-${AZs[azNumber].publicSubnets.length}`,
          services,
          ip,
        });
      }
      return { ...state, AZs };
    }
    /**
     * deletes a subnet from the related AZ
     *
     * @payload {type, services, azNumber} where the type is public/private
     */
    case "DELETE_SUBNET": {
      const { azIndex, subnetIndex, subnetType } = action.payload;
      let AZs = state.AZs.slice(0);
      if (subnetType === "private") {
        AZs[azIndex].privateSubnets.splice(subnetIndex, 1);
      } else if (subnetType === "public") {
        AZs[azIndex].publicSubnets.splice(subnetIndex, 1);
      }
      return { ...state, AZs };
    }
    /**
     * Adds an availability zone
     */
    case "ADD_AZ": {
      // Create new AZ array with new az object references
      let newAZs = [];
      state.AZs.forEach((az) => {
        newAZs.push(Object.assign({}, az));
      });

      // Now add an az
      const name = state.region + azCodes.shift();
      newAZs.push({
        name: name,
        NATType: "AWS::EC2::NatGateway",
        privateSubnets: [],
        publicSubnets: [],
      });

      return { ...state, AZs: newAZs };
    }
    /**
     * Deletes an availability zone
     *
     * @payload {Integer} The index of the AZ to delete
     */
    case "DELETE_AZ": {
      // Create new AZ array with new az object references
      let newAZs = [];
      state.AZs.forEach((az, i) => {
        if (i != action.payload) {
          // exclude AZ to delete
          newAZs.push(Object.assign({}, az));
        } else if (i == action.payload) {
          // make az code available again
          azCodes.unshift(az.name.slice(-1));
        }
      });
      return { ...state, AZs: newAZs };
    }
    /**
     * Changes the NAT type of an AZ
     *
     * @payload {[NATType <String>, Index <Integer>]} Array of two elements: a string of
     *        the NAT Type to change the AZ to and the index of the AZ to change
     */
    case "CHANGE_NAT": {
      // Create new AZ array with new az object references
      let newAZs = [];
      state.AZs.forEach((az, i) => {
        newAZs.push(Object.assign({}, az));
      });

      // Change NAT type in given AZ
      newAZs[action.payload[1]].NATType = action.payload[0];

      return { ...state, AZs: newAZs };
    }
    default:
      throw new Error("Unhandled action in reducer");
  }
};

export default reducer;
