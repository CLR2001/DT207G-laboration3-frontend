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
      Databassystemet som används för denna laboration är SQLite. Databas-filen är lagrad på en privat NAS och går att ansluta till via en nätverkstunnel hos Cloudflare. Addressen för att komma åt API:t hostas också hos Cloudflare under en privat domän. (clr-server.com)
    </p>
  </section>
  <section class="about-section">
    <h2>Slutsatser</h2>
    <p>
      Mina slutsatser för denna laboration är att skapandet av ett API är mycket enklare än vad jag trodde innan laborationen. Det var egentligen ingen ny kunskap som behövdes jämfört med tidigare laborationen utan mer hur man använde exempelvis express osv. Den stora utmaningen var att hantera säkerheten för sin databas med sql-injections mm.
    </p>
    <p>
      Utöver detta valde jag att hosta databasen själv istället för att använda exempelvis Render. Med tanke på att jag redan har en NAS som är på 24/7 kunde jag hosta den därifrån istället på min dator så att jag kan stänga av den fritt utan att databasen går offline. Även detta gick smidigare än vad jag trott och för mindre projekt kommer jag troligtvis att fortsätta att arbeta på detta sätt.
    </p>
    <p>Avslutningsvis kan jag säga att denna laboration varit väldigt användbar då jag lärt mig att dela upp backend och frontend till olika applikationer vilket gör utveckling och underhåll mycket enklare.</p>
  </section>
</section>
`;
export const pageTemplate = template;