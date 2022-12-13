import React from 'react';
import "./td.css"

function DaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

export default function Foodss(props) {

    let arrays = []
    var date = new Date(props.filter);
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    for (let i = 1; i < DaysInMonth(month, year) + 3; i++) {
      arrays.push([
        <>
          {month}/{i}/{year}
        </>])
          };
          return (
            <>{arrays.map((array, index) =>
              <>
                <th className="text-center text-dark fw-bold" style={{ backgroundColor:"lightblue", textAlign: "center", borderBottom: "1px solid black" }} scope="col">Break</th>
                <th className="text-center text-dark fw-bold" style={{ backgroundColor:"lightblue", textAlign: "center", borderBottom: "1px solid black" }} scope="col">Lunch</th>
                <th className="text-center text-dark fw-bold" style={{ backgroundColor:"lightblue", textAlign: "center", borderRight: "1px solid black", borderBottom: "1px solid black" }} scope="col">Dinner</th>
              </>)}</>
          )
}
