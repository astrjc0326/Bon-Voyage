import React from 'react';

const DestinationEntry = ( { flightlist } ) => {
  console.log(flightlist)
  const contries = flightlist.map(country => (
  <tr>
    <td>
      {country.flight_to}
    </td>
    <td>
      {country.price}
    </td>
  </tr>
  ))
return (
  <div>Destinations
    <table>
      <thead>
      <th>Desination</th>
      <th>Price</th>
      </thead>
      <tbody>
    {contries}
    </tbody>
    </table>
  </div>

)

}

export default DestinationEntry