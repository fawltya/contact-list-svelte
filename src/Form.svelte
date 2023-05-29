<script>
  import { onDestroy } from "svelte";
  import contactStore from "./stores/contacts.store";
  let name = "";
  let phone = "";
  let description = "";
  $: title = $contactStore.editID ? "Edit Contact" : "Add Contact";

  function handleSubmit() {
    if ($contactStore.editID === undefined) {
      contactStore.add(name, phone, description);
      console.log(contactStore);
    } else {
      contactStore.edit($contactStore.editID, name, phone, description);
    }
    name = "";
    phone = "";
    description = "";
  }

  const unsub = contactStore.subscribe(({ contacts, editID }) => {
    if (!editID) return;
    const contact = contacts.find((c) => c.id === editID);
    name = contact.name;
    phone = contact.phone;
    description = contact.description;
  });

  onDestroy(() => {
    unsub();
  });
</script>

<form id="contact-form" on:submit|preventDefault={handleSubmit}>
  <label for="form-name">Name</label>
  <input type="text" id="form-name" bind:value={name} />
  <label for="form-phone">Phone</label>
  <input type="tel" id="form-phone" bind:value={phone} />
  <label for="form-description">Description</label>
  <textarea
    form="contact-form"
    id="form-description"
    bind:value={description}
  />
  <button class="button">{title}</button>
</form>
