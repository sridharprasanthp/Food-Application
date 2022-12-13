
import { useState, useEffect } from "react";
import axios from "axios";
import "./td.css";

export default function Tbody(props) {
  const [order, setOrder] = useState([])

  useEffect(() => {
    axios.get(`http://172.16.0.137:3001/getorderedfood`).then(res => setOrder(res.data))
  }, [])

  let breakfasttotalcount = order.filter((dat) => {
    return (new Date(dat.date).getMonth() + 1 === new Date(props.filter).getMonth() + 1) && dat.breakfast === "true"
  })

  let lunchtotalcount = order.filter((dat) => {
    return (new Date(dat.date).getMonth() + 1 === new Date(props.filter).getMonth() + 1) && dat.lunch === "true"
  })
  let dinnertotalcount = order.filter((dat) => {
    return (new Date(dat.date).getMonth() + 1 === new Date(props.filter).getMonth() + 1) && dat.dinner === "true"
  })
  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  var breakfastcount = ""
  var countlunch = "";
  var countdinner = "";
  let arraydate = [];
  const dates = new Date(props.filter);
  const currentYear = dates.getFullYear();
  const currentMonth = dates.getMonth() + 1;
  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

  for (var i = 1; i <= daysInCurrentMonth; i++) {
    arraydate.push(currentMonth + "/" + i + "/" + currentYear);
  }
  let brkf = null;
  let lunc = null;
  let dinn = null;



  if (new Date(props.filter).toLocaleDateString("en-US")) {

    return (
      <tbody>
                <tr className="text-center text-danger fw-bold" style={{backgroundColor:"lightyellow"}}>
          <td colSpan="2" style={{textAlign:"center", borderBottom: "1px solid black", borderRight: "1px solid black" }}>Total</td>
          <td style={{textAlign:"center", borderBottom: "1px solid black", borderRight: "1px solid black" }}>{breakfasttotalcount.length}</td>
          <td style={{textAlign:"center", borderBottom: "1px solid black", borderRight: "1px solid black" }}>{lunchtotalcount.length}</td>
          <td style={{textAlign:"center", borderBottom: "1px solid black", borderRight: "1px solid black" }}> {dinnertotalcount.length}</td>
          <td style={{textAlign:"center", borderBottom: "1px solid black", borderRight: "1px solid black" }}>₹{breakfasttotalcount.length * 25}</td>
          <td style={{textAlign:"center", borderBottom: "1px solid black", borderRight: "1px solid black" }}>₹{lunchtotalcount.length * 50}</td>
          <td style={{textAlign:"center", borderBottom: "1px solid black", borderRight: "1px solid black" }}>₹{dinnertotalcount.length * 35}</td>
          {arraydate.map((array, index) =>
            <>
              <>
                <>{breakfastcount = ""}</>
                {props.datas.map((userdata) => userdata.date.filter((date) => date.date === array).map((userdatass) => {
                  userdatass.breakfast === "true" ?
                    <>{breakfastcount++}</> : <></>
                }))}</>
              <td style={{ textAlign:"center", borderBottom: "1px solid black" }}>{breakfastcount}</td>



              <>
                <>{countlunch = ""}</>
                {props.datas.map((userdata) => userdata.date.filter((date) => date.date === array).map((userdatass) => {
                  userdatass.lunch === "true" ?
                    <>{countlunch++}</> : <></>
                }))}</>
              <td style={{textAlign:"center",  borderBottom: "1px solid black" }}>{countlunch}</td>


              <>
                <>{countdinner = ""}</>
                {props.datas.map((userdata) => userdata.date.filter((date) => date.date === array).map((userdatass) => {
                  userdatass.dinner === "true" ?
                    <>{countdinner++}</> : <></>
                }))}</>
              <td style={{ textAlign:"center", borderRight: "1px solid black", borderBottom: "1px solid black" }}>{countdinner}</td>

            </>)}

        </tr>
        {props.datas.filter((gets) => gets._id !== "638041665140bfbdbc1f5d4a").map((userdata) => <>
          <p style={{ display: "none" }}>{brkf = null}</p>
          <p style={{ display: "none" }}>{lunc = null}</p>
          <p style={{ display: "none" }}>{dinn = null}</p>
          <tr key={userdata._id} style={{ borderBottom: "1px solid black" }}>
            <td className="text-center text-dark fw-bold" style={{ textAlign: "center", borderRight: "1px solid black",lineHeight:"40px" }}>{userdata.name}</td>
            <td className="text-center text-dark fw-bold" style={{ textAlign: "center", borderRight: "1px solid black",lineHeight:"40px" }}>{userdata.password}</td>
            <td className="text-center text-dark fw-bold" style={{ borderRight: "1px solid black" }}>
              {userdata.date.map((userbreakfast) => { (new Date(userbreakfast.date).getMonth() + 1 === new Date(props.filter).getMonth() + 1) && userbreakfast.breakfast === "true" ? <>{brkf++}</> : <></> }
              )}
              {brkf === null ? <p style={{ textAlign: "center" }}>-</p> : <p style={{ textAlign: "center" ,paddingTop:"4px"}}>{brkf}</p>}
            </td>

            <td className="text-center text-dark fw-bold" style={{ borderRight: "1px solid black" }}>
              {userdata.date.map((userbreakfast) => { (new Date(userbreakfast.date).getMonth() + 1 === new Date(props.filter).getMonth() + 1) && userbreakfast.lunch === "true" ? <>{lunc++}</> : <></> }
              )}
              {lunc === null ? <p style={{ textAlign: "center" }}>-</p> : <p style={{ textAlign: "center" ,paddingTop:"4px"}}>{lunc}</p>}
            </td>

            <td className="text-center text-dark fw-bold" style={{ borderRight: "1px solid black" }}>
              {userdata.date.map((userbreakfast) => { (new Date(userbreakfast.date).getMonth() + 1 === new Date(props.filter).getMonth() + 1) && userbreakfast.dinner === "true" ? <>{dinn++}</> : <></> }
              )}
              {dinn === null ? <p style={{ textAlign: "center" }}>-</p> : <p style={{ textAlign: "center" ,paddingTop:"4px"}}>{dinn}</p>}
            </td>
            <td className="text-center text-dark fw-bold" style={{ borderRight: "1px solid black" }}>
              {brkf === null ? <p style={{ textAlign: "center" }}>-</p> : <p style={{ textAlign: "center" ,paddingTop:"4px"}}>₹{brkf * 25}</p>}
            </td>
            <td className="text-center text-dark fw-bold" style={{ borderRight: "1px solid black" }}>
              {lunc === null ? <p style={{ textAlign: "center" }}>-</p> : <p style={{ textAlign: "center" ,paddingTop:"4px"}}>₹{lunc * 50}</p>}
            </td>
            <td className="text-center text-dark fw-bold" style={{ borderRight: "1px solid black" }}>
              {dinn === null ? <p style={{ textAlign: "center" }}>-</p> : <p style={{ textAlign: "center" ,paddingTop:"4px"}}>₹{dinn * 35}</p>}
            </td>
            {arraydate.map((arraydate) => <>

              <td className="text-center text-dark  fw-bold" style={{ textAlign:"center",paddingTop:"15px"}}>
                {userdata.date.filter((date) => date.date === arraydate).map((userdatadate, index) =>
                  <>
                    <>{userdatadate.breakfast === "true" ? <>✅</> : <>-</>}
                    </>
                  </>
                )}
              </td>
              <td className="text-center text-dark  fw-bold" style={{ textAlign:"center",paddingTop:"15px"}}>
                {userdata.date.filter((date) => date.date === arraydate).map((userdatadate, index) => <>
                  <>
                    {userdatadate.lunch === "true" ? <>✅</> : <>-</>}
                  </>
                </>
                )}
              </td>
              <td className="text-center text-dark  fw-bold" style={{ textAlign:"center",borderRight: "1px solid black",paddingTop:"15px" }}>
                {userdata.date.filter((date) => date.date === arraydate).map((userdatadate, index) => <>
                  <>{userdatadate.dinner === "true" ? <>✅</> : <>-</>}
                  </>
                </>
                )}
              </td>

            </>
            )}
          </tr>
        </>
        )}

      </tbody>)
  }

}