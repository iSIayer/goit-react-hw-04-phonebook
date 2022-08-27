import PropTypes from 'prop-types';
import {
  ContactsListItem,
  ContactsListButton,
  ContactsListIcon,
} from './ContactsList.styled';

export const ContactsList = ({ value, options, onClickDelete }) => {
  const normalizedValue = value.toLowerCase();
  const filteredArray = options.filter(option =>
    option.name.toLowerCase().includes(normalizedValue)
  );

  return (
    <ul>
      {filteredArray.map(({ id, name, number }) => {
        return (
          <ContactsListItem key={id}>
            {name}: {number}
            <ContactsListButton
              onClick={() => {
                onClickDelete(id);
              }}
            >
              <ContactsListIcon />
              Delete
            </ContactsListButton>
          </ContactsListItem>
        );
      })}
    </ul>
  );
};

ContactsList.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  onClickDelete: PropTypes.func.isRequired,
};
