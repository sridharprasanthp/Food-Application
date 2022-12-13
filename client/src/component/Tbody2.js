import "./td.css"
export default function Tbody2(props) {
  let arraydate = [];
  const dates = new Date(props.filter);
  const currentYear = dates.getFullYear();
  const currentMonth = dates.getMonth() + 1;
  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
  

  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  for (var i = 1; i <= daysInCurrentMonth; i++) {
    arraydate.push(currentMonth + "/" + i + "/" + currentYear);
  }
  let brkf = null;
  let lunc = null;
  let dinn = null;
  if (new Date(props.filter).toLocaleDateString("en-US")) {

    return (
      <tbody>
        {props.datas.filter((gets) => gets.name === props.data.name).map((userdata) => <>
          <p style={{ display: "none" }}>{brkf = null}</p>
          <p style={{ display: "none" }}>{lunc = null}</p>
          <p style={{ display: "none" }}>{dinn = null}</p>
          <tr key={userdata._id} style={{ borderBottom: "1px solid black" }}>
            <td className="text-center text-dark fw-bold" style={{ textAlign: "center", borderRight: "1px solid black", borderLeft: "1px solid Black" ,lineHeight:"40px"}}>{userdata.name}</td>
            <td className="text-center text-dark fw-bold" style={{ textAlign: "center", borderRight: "1px solid black" ,lineHeight:"40px"}}>{userdata.password}</td>
            <td className="text-center text-dark fw-bold" style={{ borderRight: "1px solid black" }}>
              {userdata.date.map((userbreakfast) => { new Date(userbreakfast.date).getMonth() + 1 === new Date(props.filter).getMonth() + 1 && userbreakfast.breakfast === "true" ? <>{brkf++}</> : <></> }
              )}
              {brkf === null ? <p style={{ textAlign: "center" }}>-</p> : <p style={{ textAlign: "center" ,paddingTop:"4px"}}>{brkf}</p>}
            </td>

            <td className="text-center text-dark fw-bold" style={{ borderRight: "1px solid black" }}>
              {userdata.date.map((userbreakfast) => { new Date(userbreakfast.date).getMonth() + 1 === new Date(props.filter).getMonth() + 1 && userbreakfast.lunch === "true" ? <>{lunc++}</> : <></> }
              )}
              {lunc === null ? <p style={{ textAlign: "center" }}>-</p> : <p style={{ textAlign: "center" ,paddingTop:"4px"}}>{lunc}</p>}
            </td>

            <td className="text-center text-dark fw-bold" style={{ borderRight: "1px solid black" }}>
              {userdata.date.map((userbreakfast) => { new Date(userbreakfast.date).getMonth() + 1 === new Date(props.filter).getMonth() + 1 && userbreakfast.dinner === "true" ? <>{dinn++}</> : <></> }
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

              <td className="text-center text-Dark  fw-bold" style={{paddingTop:"15px"}}>
                {userdata.date.filter((date) => date.date === arraydate).map((userdatadate, index) =>
                  <>
                    <>{userdatadate.breakfast === "true" ? <>✅</> : <>-</>}
                    </>
                  </>
                )}
              </td>
              <td className="text-center text-Dark fw-bold" style={{paddingTop:"15px"}}>
                {userdata.date.filter((date) => date.date === arraydate).map((userdatadate, index) => <>
                  <>
                    {userdatadate.lunch === "true" ? <>✅</> : <>-</>}
                  </>
                </>
                )}
              </td>
              <td className="text-center text-Dark fw-bold" style={{ borderRight: "1px solid black",paddingTop:"15px" }}>
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