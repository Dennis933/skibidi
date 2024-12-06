document.getElementById('add-button').addEventListener('click', function() {
    const bestellbereich = document.getElementById('bestellbereich');
    const neueBestellung = document.createElement('div');
    neueBestellung.classList.add('bestellung');
    neueBestellung.innerHTML = `
        <label for="eissorte">Eissorte:</label>
        <select class="eissorte" name="eissorte" required>
            <option value="vanille">Vanille</option>
            <option value="schokolade">Schokolade</option>
            <option value="erdbeere">Erdbeere</option>
            <option value="stracciatella">Stracciatella</option>
            <option value="pistazie">Pistazie</option>
        </select>

        <label for="anzahl">Anzahl:</label>
        <input type="number" class="anzahl" name="anzahl" min="1" value="1" required>

        <button type="button" class="remove-button">Entfernen</button>
    `;
    bestellbereich.appendChild(neueBestellung);

    // Event Listener für den Entfernen-Button
    neueBestellung.querySelector('.remove-button').addEventListener('click', function() {
        bestellbereich.removeChild(neueBestellung);
    });
});

document.getElementById('bestellformular').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars

    // Werte aus dem Formular abrufen
    const name = document.getElementById('name').value;
    const bestellungen = Array.from(document.querySelectorAll('.bestellung'));
    const bestellDetails = bestellungen.map(bestellung => {
        const eissorte = bestellung.querySelector('.eissorte').value;
        const anzahl = bestellung.querySelector('.anzahl').value;
        return `${anzahl} Portion(en) ${eissorte}`;
    }).join(', ');

    // Erstelle FormData-Objekt
    const formData = new FormData();
    formData.append('name', name);
    formData.append('bestellungen', bestellDetails);
    formData.append('_subject', 'Neue Bestellung von ' + name);
    formData.append('_cc', 'another-email@example.com'); // Optional: CC an eine andere E-Mail-Adresse

    // Sende die Daten an FormSubmit
    fetch('https://formsubmit.co/dennismertmert@outlook.de', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            // Bestellbestätigung anzeigen
            const bestellbestaetigung = document.getElementById('bestellbestaetigung');
            bestellbestaetigung.innerHTML = `<h3>Bestellung erfolgreich!</h3>
                                              <p>Vielen Dank, ${name}! Ihre Bestellung: ${bestellDetails} wurde erfolgreich gesendet.</p>`;
            // Formular zurücksetzen
            document.getElementById('bestellformular').reset();
            // Alle Bestellungen entfernen
            while (bestellungen.length > 0) {
                bestellungen[0].remove();
            }
        } else {
            throw new Error('Fehler beim Senden der Bestellung');
        }
    })
    .catch(error => {
        console.error('FAILED...', error);
        const bestellbestaetigung = document.getElementById('bestellbestaetigung');
        bestellbestaetigung.innerHTML = `<h3>Fehler!</h3>
                                          <p>Die Bestellung konnte nicht gesendet werden. Bitte versuche es später erneut.</p>`;
    });
});