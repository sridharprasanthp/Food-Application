import React from 'react';
import "./td.css"

export default function Dates(props) {
  function DaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
    let some = []
    var date = new Date(props.filter);
    var month = date.getMonth() + 1;
    var year = date.getFullYear();  

    for (let i = 1; i < DaysInMonth(month, year) + 1; i++) {
      some.push([
        <div key={i}>
          {month}/{i}/{year}
        </div>])
    };

    return (
        <>{some.map((somes, index) =>
          <th className="text-center text-dark fw-bold" style={{ backgroundColor:"lightblue",textAlign: "center", borderBottom: "1px solid black", borderRight: "1px solid black" }} key={index} colSpan="3" scope="col">{somes}</th>)}</>
      )
}
