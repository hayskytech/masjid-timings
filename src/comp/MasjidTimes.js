import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { onValue, push, ref, set } from 'firebase/database'
import { Button, Form, Icon, List, Modal } from 'semantic-ui-react'
import { MyContext } from '../App'
import { db } from '../firebase'

export default function MasjidTimes() {
  const { user } = useContext(MyContext)
  const [box, setBox] = useState(false)
  const [Name, setName] = useState('')
  const [Fajr, setFajr] = useState('')
  const [Zohar, setZohar] = useState('')
  const [Asar, setAsar] = useState('')
  const [Magrib, setMagrib] = useState('')
  const [Juma, setJuma] = useState('')
  const [Isha, setIsha] = useState('')
  const [list, setList] = useState([])
  const [editid, seteditid] = useState(null)

  useEffect(() => {
    const myRef = ref(db, 'timings/masjid/')
    onValue(myRef, (snapshot) => {
      const res = snapshot.val()
      setList(res);
    })
  }, [])
  return (
    <div>
      <h3>Namaz Timings</h3>
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{Name}</td>
          </tr>
          <tr>
            <td>Fajr:</td>
            <td>{Fajr}</td>
          </tr>
          <tr>
            <td>Zohar:</td>
            <td>{Zohar}</td>
          </tr>
          <tr>
            <td>Asar:</td>
            <td>{Asar}</td>
          </tr>
          <tr>
            <td>Magrib:</td>
            <td>{Magrib}</td>
          </tr>
          <tr>
            <td>Isha:</td>
            <td>{Isha}</td>
          </tr>
          <tr>
            <td>Juma:</td>
            <td>{Juma}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
