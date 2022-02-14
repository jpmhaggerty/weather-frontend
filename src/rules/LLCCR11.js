const llccr11 = () => {
  // [LLCCR 11] A launch operator shall wait 30 minutes to launch after any type of lightning occurs at a slant distance of less than or equal to 10 nmi from the flight path, unless:
  // a. The non-transparent part of the cloud that produced the lightning is at a slant distance of greater than 10 nmi from the flight path;
  // AND
  // b. At least one working field mill is at a horizontal distance of less than or equal to 5 nmi from each such lightning discharge;
  // AND
  // c. The absolute values of all electric field measurements at a horizontal distance of less than or equal to 5 nmi from the flight path, and at each field mill specified in section 4.1.1.1b in this NASA Technical Standard, have been less than 1000 V m-1 for at least 15 minutes.

  //needs:

  //manifest of all lightning strikes within the last thirty minutes
  //including time, location, and volumetric boundary edges

  //flight path equation or point cloud

  //field mill locations and readings

  let lat1 = 28.212745;
  let lon1 = -80.606594;
  let lat2 = 28.252657;
  let lon2 = -80.603685;

  let distance =
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin((lat1 - lat2) / 2) ^
          (2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon1 - lon2) / 2)) ^
          2
      )
    );

    console.log("Distance between two points: ", distance)

    //launch will be clear if time difference for every strike exceeds thirty minutes
    //check strike time against current time and build array of events within last thirty minutes- sort from most recent to oldest

    //if array is not empty,

    //find field mills within 5mi of a point location
    //get mill readings for identified location for past 15 minutes
    //if within bounds return true

  //true if rule allows a launch; false if rule prevents a launch
  return true;
};
