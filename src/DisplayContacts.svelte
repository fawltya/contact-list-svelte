<script>
  import contactStore from "./stores/contacts.store";
  function onEdit(contactID) {
    contactStore.editContact(contactID);
  }
  function onDelete(contactID) {
    contactStore.delete(contactID);
  }
</script>

{#each $contactStore.contacts as contact (contact.id)}
  <div class="row">
    <div class="column">Name: {contact.name}</div>
  </div>
  <div class="row">
    <div class="column">Phone: {contact.phone}</div>
  </div>
  <div class="row">
    <div class="column">{contact.description}</div>
  </div>
  <div class="row">
    <div class="column">
      <button on:click={() => onEdit(contact.id)} class="button">Edit</button>
      <button on:click={() => onDelete(contact.id)} class="button"
        >Delete</button
      >
    </div>
  </div>
{/each}
