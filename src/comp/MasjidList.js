import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { onValue, push, ref, set } from 'firebase/database'
import { Button, Form, Icon, List, Modal } from 'semantic-ui-react'
import { MyContext } from '../App'
import { db } from '../firebase'

export default function MasjidList() {
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
  function addItem(e) {
    e.preventDefault()
    if (Name && Fajr && Zohar && Asar && Magrib && Juma && Isha) {
      const form = e.target
      const formData = new FormData(form)
      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson);
      push(ref(db, 'timings/masjid'), formJson)
    } else {
      window.alert('Please enter all the values')
    }
  }
  function editItem(key) {
    seteditid(key)
    setName(list[key].Name)
    setFajr(list[key].Fajr)
    setZohar(list[key].Zohar)
    setAsar(list[key].Asar)
    setMagrib(list[key].Magrib)
    setJuma(list[key].Juma)
    setIsha(list[key].Isha)
  }
  function saveItem() {
    if (Name && Fajr && Zohar && Asar && Magrib && Juma && Isha) {
      set(ref(db, 'timings/masjid/' + editid), { Name, Fajr, Zohar, Asar, Magrib, Juma, Isha })
      seteditid(null)
      console.log('saving');
      setBox(false)
    } else {
      window.alert('Please enter all the values')
    }
  }
  return (
    <div>
      <Modal
        open={box}
        onOpen={() => setBox(true)}
        onClose={() => setBox(false)}
        closeIcon
      >
        <Modal.Content>
          <Form onSubmit={editid ? saveItem : addItem} id='mainForm'>
            <h3>Namaz Timings</h3>
            <table>
              <tr>
                <td>Name:</td>
                <td><input type="text" value={Name} onChange={e => setName(e.target.value)} /></td>
              </tr>
              <tr>
                <td>Fajr:</td>
                <td><input type="time" value={Fajr} onChange={e => setFajr(e.target.value)} /></td>
              </tr>
              <tr>
                <td>Zohar:</td>
                <td><input type="time" value={Zohar} onChange={e => setZohar(e.target.value)} /></td>
              </tr>
              <tr>
                <td>Asar:</td>
                <td><input type="time" value={Asar} onChange={e => setAsar(e.target.value)} /></td>
              </tr>
              <tr>
                <td>Magrib:</td>
                <td><input type="time" value={Magrib} onChange={e => setMagrib(e.target.value)} /></td>
              </tr>
              <tr>
                <td>Isha:</td>
                <td><input type="time" value={Isha} onChange={e => setIsha(e.target.value)} /></td>
              </tr>
              <tr>
                <td>Juma:</td>
                <td><input type="time" value={Juma} onChange={e => setJuma(e.target.value)} /></td>
              </tr>
            </table>
            <Button color='blue'>Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>
      {user ? <Button onClick={() => setBox(true)} color='green'>Add Masjid</Button> : ''}

      <List divided size='large' relaxed
      // onItemClick={(e, data) => console.log('data')}
      >
        {Object.entries(list).map((item) =>
          <List.Item
            onClick={(e, data) => console.log('data')}
            key={item[0]}>
            {user ?
              <List.Content floated='right'>
                <Icon name='edit' size='big' onClick={() => { setBox(true); editItem(item[0]) }} />
              </List.Content> : ''
            }
            <List.Content>
              <List.Header>{item[1].Name}</List.Header>
              <List.Description>Nandikotkur</List.Description>
            </List.Content>
          </List.Item>
        )}
      </List>
    </div >
  )
}
