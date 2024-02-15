import React, { useContext, useState, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { List, Icon } from 'semantic-ui-react';
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
      <div style={{ margin: 'auto', display: 'inline-block' }}>
        <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Name:</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
            </tr>
            <tr> <th style={{ border: '1px solid black', padding: '8px' }}>Fajr:</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Time</th>
            </tr>
            <tr><th style={{ border: '1px solid black', padding: '8px' }}>Zohar:</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Time</th>
            </tr>
            <tr> <th style={{ border: '1px solid black', padding: '8px' }}>Asar:</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Time</th>
            </tr>
            <tr>  <th style={{ border: '1px solid black', padding: '8px' }}>Magrib:</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Time</th>
            </tr>
            <tr> <th style={{ border: '1px solid black', padding: '8px' }}>Isha:</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Time</th>
            </tr>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Juma:</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Time</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  );
}
