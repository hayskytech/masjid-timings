import React, { useContext, useState, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { List, Icon, Table } from 'semantic-ui-react';
import { MyContext } from '../App';
import { db } from '../firebase';

export default function MasjidTimes() {
  const { user } = useContext(MyContext);
  const [list, setList] = useState([]);

  useEffect(() => {
    const myRef = ref(db, 'timings/masjid/');
    onValue(myRef, (snapshot) => {
      const res = snapshot.val();
      setList(res || []);
    });
  }, []);

  return (
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
    </div>
  );
}
