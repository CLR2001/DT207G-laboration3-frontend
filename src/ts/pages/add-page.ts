const template = document.createElement('template');
template.innerHTML = `
<section class="main-content add-main">
  <h1>Lägg till</h1>
  <form method="post" class="add-form">
  <div class="input-container">
    <label for="name">Företagsnamn: *</label>
    <input type="text" name="name" id="name" autocomplete="off">
  </div>

  <div class="input-container">
    <label for="title">Roll: *</label>
    <input type="text" name="title" id="title" autocomplete="off">
  </div>

  <div class="input-container">
    <label for="location">Plats: *</label>
    <input type="text" name="location" id="location" autocomplete="off">
  </div>

  <div class="input-container">
    <label for="start-date">Startdatum: *</label>
    <input type="date" name="start-date" id="start-date">
  </div>

  <div class="input-container">
    <label for="end-date">Slutdatum: </label>
    <input type="date" name="end-date" id="end-date">
  </div>

  <div class="input-container">
    <label for="description">Beskrivning: </label>
    <textarea name="description" id="description"></textarea>
  </div>

  <div class="form-buttons">
    <button type="submit" class="submit-button">Spara</button>
    <button type="reset" class="reset-button">Rensa</button>
  </div>
</form>
<ul class="message-list"></ul>
</section>
`;
export const pageTemplate = template;