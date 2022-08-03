import { ContactListComponent } from 'components/ContactListComponent/ContactListComponent';

export const ContactList = ({ contacts, filter, deleteContact }) => (
  <ul>
    {filter === ''
      ? contacts.map(contact => (
          <ContactListComponent
            key={contact.id}
            contact={contact}
            deleteContact={deleteContact}
          />
        ))
      : contacts
          .filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map(contact => (
            <ContactListComponent
              key={contact.id}
              contact={contact}
              deleteContact={deleteContact}
            />
          ))}
  </ul>
);
