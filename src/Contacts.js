import React, { useState, useEffect } from 'react';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [userName, setuserName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setContacts(data));
  }, []);

  const handleDeleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleAddContact = () => {
    setShowForm(true);
  };

  const handleSaveContact = () => {
    const newContact = {
      id: contacts.length + 1,
      name: `${firstName} ${userName}`,
      phone: phone
    };

    setContacts([...contacts, newContact]);
    setShowForm(false);
    setFirstName('');
    setuserName('');
    setPhone('');
  };

  const handleCancel = () => {
    setShowForm(false);
    setFirstName('');
    setuserName('');
    setPhone('');
  };

  return (
    <div>
      <h1>Contacts</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Phone</th> 
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.username}</td> 
              <td>{contact.phone}</td>
              <td>
                <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!showForm && (
        <button onClick={handleAddContact}>Add Contact</button>
      )}
      {showForm && (
        <div>
          <h2>Add Contact</h2>
          <form>
            <label>
              Name:
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </label>
            <br />
            <label>
              User Name:
              <input type="text" value={userName} onChange={e => setuserName(e.target.value)} />
            </label>
            <br />
            <label>
              Phone:
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
            </label>
            <br />
            <button type="button" onClick={handleSaveContact}>Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Contacts;
