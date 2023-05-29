import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

const store = writable({ contacts: [], editID: undefined });
export default {
  subscribe: store.subscribe,
  add: (name, phone, description) => {
    store.update(({ contacts }) => {
      const newContact = [
        { name, phone, description, id: uuidv4() },
        ...contacts,
      ];
      return { contacts: newContact, editID: undefined };
    });
  },
  editContact: (contactID) => {
    store.update(({ contacts }) => {
      return { contacts, editID: contactID };
    });
  },

  edit: (contactID, name, phone, description) => {
    store.update(({ contacts }) => {
      const newContact = contacts.map((contact) => {
        if (contact.id === contactID) {
          return { id: contactID, name, phone, description };
        }
        return contact;
      });

      return { contacts: newContact, editID: undefined };
    });
  },
  delete: (contactID) => {
    store.update(({ contacts }) => {
      const newContact = contacts.filter((c) => c.id !== contactID);
      return { contacts: newContact, editID: undefined };
    });
  },
};
