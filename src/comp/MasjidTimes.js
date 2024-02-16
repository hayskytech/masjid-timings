import { onValue, ref } from 'firebase/database';
<<<<<<< HEAD
import { List, Icon, Table } from 'semantic-ui-react';
import { MyContext } from '../App';
=======
import React, { useContext, useEffect, useState } from 'react'
>>>>>>> 3f47972d39fba5a322a9ad84e252953170f28962
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
<<<<<<< HEAD
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h3>Namaz Timings</h3>
      <div style={{ margin: 'auto', maxWidth: '800px' }}>
        <Table celled textAlign='center'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Masjid E Abubakkar</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Fajr</Table.Cell>
              <Table.Cell>05:30 AM</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Zohar</Table.Cell>
              <Table.Cell>01:30 PM</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Asar</Table.Cell>
              <Table.Cell>04:30 PM</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Magrib</Table.Cell>
              <Table.Cell>06:30 PM</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Isha</Table.Cell>
              <Table.Cell>08:15 PM</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Juma</Table.Cell>
              <Table.Cell>02:00 PM</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
=======
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
>>>>>>> 3f47972d39fba5a322a9ad84e252953170f28962
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