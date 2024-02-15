import { onValue, ref } from 'firebase/database';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { MyContext } from '../App';
export default function MasjidTimes() {
  const { user, params } = useContext(MyContext)
  let urlParams = new URLSearchParams(window.location.search);
  let key = urlParams.get('key');
  if (!key && params.key) {
    key = params.key
  }
  const [data, setData] = useState(null)
  useEffect(() => {
    if (key) {
      onValue(ref(db, 'timings/masjid/' + key), (snapshot) => {
        const res = snapshot.val()
        setData(res);
      })
    }
  }, [key])
  return (
    <div style={{ marginTop: '50px', maxWidth: 400 }}>
      <h3>{data?.Name} - Namaz Timings</h3>
      <table className='ui celled fixed blue table unstackable'>
        <tr>
          <td>Fajr</td>
          <td>{convertTimeFormat(data?.Fajr)}</td>
        </tr>
        <tr>
          <td>Zohar</td>
          <td>{convertTimeFormat(data?.Zohar)}</td>
        </tr>
        <tr>
          <td>Asar</td>
          <td>{convertTimeFormat(data?.Asar)}</td>
        </tr>
        <tr>
          <td>Magrib</td>
          <td>{convertTimeFormat(data?.Magrib)}</td>
        </tr>
        <tr>
          <td>Isha</td>
          <td>{convertTimeFormat(data?.Isha)}</td>
        </tr>
        <tr className='positve'>
          <td>Juma</td>
          <td>{convertTimeFormat(data?.Juma)}</td>
        </tr>
      </table>
    </div>
  )
}
function convertTimeFormat(timeString) {
  if (!timeString) return ''
  const [hours, minutes] = timeString.split(':');
  let period = 'AM';
  if (parseInt(hours) >= 12) {
    period = 'PM';
  }
  const convertedHours = parseInt(hours) % 12 || 12;
  return `${convertedHours}:${minutes} ${period}`;
}