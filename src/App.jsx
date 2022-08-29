import 'modern-normalize';
import { useState, useEffect } from 'react';
import { Container } from './components/common/Container.styled';
import { Title } from './components/common/Title.styled';
import { Form } from './components/Form/Form';
import { Filter } from './components/Filter/Filter';
import { ContactsList } from './components/Contacts/ContactsList';

const defaultList = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(defaultList);
  const [filter, setFilter] = useState('');
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);
  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts)
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  // }
  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    setContacts({ contacts: parsedContacts });
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const validateContact = data => {
    const normalizedValue = data.name.toLowerCase();
    const result = contacts.find(item =>
      item.name.toLowerCase().includes(normalizedValue)
    );
    return result;
  };

  const handlerFilter = evt => {
    setFilter(evt.target.value);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const handlerSubmit = data => {
    if (validateContact(data)) {
      alert(`${data.name} already exist`);
      return;
    } else {
      setContacts(prevContacts => [...prevContacts, data]);
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
    // if (validateContact(data)) {
    //   alert(`${data.name} already exist`);
    // } else {
    //   this.setState(prevState => {
    //     return {
    //       contacts: [...prevState.contacts, data],
    //     };
    //   });
    // }
  };

  return (
    <Container>
      <Title>Contact App</Title>
      <Form onSubmit={handlerSubmit} />
      <Title>Search by name</Title>
      <Filter value={filter} onChange={handlerFilter} />
      <ContactsList
        value={filter}
        options={contacts}
        onClickDelete={deleteContact}
      />
    </Container>
  );
}
