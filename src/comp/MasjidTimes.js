import React from 'react'
export default function MasjidTimes() {
  return (
    <div style={{ marginTop: '50px', maxWidth: 400 }}>
      <h3>Namaz Timings</h3>
      <table className='ui celled blue table unstackable'>
        <tr>
          <td>Fajr</td>
          <td>5:30 AM</td>
        </tr>
        <tr>
          <td>Zohar</td>
          <td>1:30 PM</td>
        </tr>
        <tr>
          <td>Asar</td>
          <td>5:00 PM</td>
        </tr>
        <tr>
          <td>Magrib</td>
          <td>6:15 PM</td>
        </tr>
        <tr>
          <td>Isha</td>
          <td>8:15 PM</td>
        </tr>
      </table>
    </div>
  )
}
