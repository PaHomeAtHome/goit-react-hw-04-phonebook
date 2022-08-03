import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import Container from './Container/Container';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export function App() {
  const storageContacts = localStorage.getItem('contacts');
  const parsedContacts = JSON.parse(storageContacts);

  const templateContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(parsedContacts || templateContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = ({ name, number }, { resetForm }) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(name + ' is already in contacts');
      return;
    }

    const contact = {
      name,
      number,
      id: nanoid(),
    };

    setContacts([contact, ...contacts]);

    resetForm();
    return;
  };

  const filterContacts = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));

    return;
  };

  return (
    <Container>
      <h2>Phonebook</h2>
      <ContactForm handleSubmit={handleSubmit} />

      <h2>Contacts</h2>
      <Filter filterContacts={filterContacts} />
      {contacts.length !== 0 && (
        <ContactList
          contacts={contacts}
          filter={filter}
          deleteContact={deleteContact}
        />
      )}
    </Container>
  );
}
