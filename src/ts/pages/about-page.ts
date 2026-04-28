const template = document.createElement('template');
template.innerHTML = `
  <section class="main-content about-main">
  <h1>Om laborationen</h1>
  <section class="about-section">
    <h2>Webbplats & databas</h2>
    <p>
      Webbplatsen är en enkel och minimalitstisk webbplats som visar upp sparade jobberfarenheter från en databas. Utöver uppvisning så går det att lägga till nya jobberfarenheten samt att radera befintliga.
    </p>
    <p>
      Databassystemet som används för denna laboration är MongoDB. Databasen lagras på MongoDB Atlas och hostas sedan på Render. Addressen för att komma åt API:t finns under en privat domän. (lab3.api.clr-server.com)
    </p>
  </section>
  <section class="about-section">
    <h2>Slutsatser</h2>
    <p>
      Till skillnad från "vanliga" SQL databaser tycker jag MongoDB har varit mycket lättare att arbeta med när man skapar webbplatser. Eftersom man redan arbetar så mycket med JSON blec det väldigt naturligt att använda deras BSON jämfört med "vanliga" tabeller med rader och kolumner. Man behöver inte skriva lika mycket kod för exempelvis SQL Injections utan det var i princip som att använda local storage. Mycket smidigare!
    </p>
    <p>
      Avslutningsvis kan jag säga att för just webbutveckling och med den lilla erfarenheten jag har känns NoSQL som ett självklart val för applikationer som detta. För se om denna åsikt ändras framöver.
    </p>
  </section>
</section>
`;
export const pageTemplate = template;