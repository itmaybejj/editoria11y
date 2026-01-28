import strings from '../sa11y-lang/it.js';

// todo check each file for link integrity, and escaping of tags in code blocks.
export const testNames = {
	ALT_FILE_EXT: 'Questo testo alternativo è un nome di file, non una descrizione',
	ALT_MAYBE_BAD: 'Questo testo alternativo non può essere pronunciato da un lettore di schermo',
	ALT_PLACEHOLDER: 'Questo testo alternativo è un segnaposto privo di significato',
	ALT_UNPRONOUNCEABLE: 'Questo testo alternativo è impossibile da pronunciare',
	BTN_EMPTY: 'Il pulsante non ha un’etichetta accessibile',
	BTN_EMPTY_LABELLEDBY: 'Il pulsante ha un’etichetta ARIA non valida',
	BTN_ROLE_IN_NAME: 'Il nome del pulsante ripete la parola “button”',
	CONTRAST_ERROR: 'Il testo non ha un contrasto sufficiente per essere facilmente leggibile',
	CONTRAST_ERROR_GRAPHIC: 'La grafica o l’icona non ha un contrasto sufficiente',
	CONTRAST_INPUT: 'Il campo di input non ha un contrasto sufficiente per essere facilmente leggibile',
	CONTRAST_PLACEHOLDER: 'Il testo del segnaposto non ha un contrasto sufficiente per essere facilmente leggibile',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Questo testo del segnaposto ha un contrasto sufficiente?',
	CONTRAST_WARNING: 'Questo testo ha un contrasto sufficiente?',
	CONTRAST_WARNING_GRAPHIC: 'Questa grafica o icona ha un contrasto sufficiente?',
	DUPLICATE_ID: 'Attributo ID duplicato',
	DUPLICATE_TITLE: 'Questo link ha un tooltip con lo stesso testo del link',
	EMBED_AUDIO: 'Questo contenuto audio ha una trascrizione?',
	EMBED_DATA_VIZ: 'Questa visualizzazione è accessibile?',
	EMBED_GENERAL: 'I contenuti incorporati in iframe richiedono controlli manuali',
	EMBED_MISSING_TITLE: 'Frame senza attributo "title"',
	EMBED_UNFOCUSABLE: 'Un frame con tabindex="-1" non sarà accessibile tramite tastiera.',
	EMBED_VIDEO: 'Questo video ha sottotitoli corretti?',
	HEADING_EMPTY: 'Questa intestazione non contiene testo',
	HEADING_EMPTY_WITH_IMAGE: 'Questa immagine è usata come intestazione, quindi richiede un testo alternativo',
	HEADING_FIRST: 'La prima intestazione della pagina è un sottotitolo',
	HEADING_LONG: 'Questa intestazione può essere più breve?',
	HEADING_MISSING_ONE: 'A questa pagina manca un’intestazione di livello 1',
	HEADING_SKIPPED_LEVEL: 'Questa intestazione è marcata al livello errato',
	HIDDEN_FOCUSABLE: 'Questo elemento non può essere descritto dai lettori di schermo',
	IMAGE_ALT_TOO_LONG: 'Questo testo alternativo può essere più breve?',
	IMAGE_DECORATIVE: 'Questa immagine è davvero priva di significato?',
	IMAGE_DECORATIVE_CAROUSEL: 'Immagine in un carosello o galleria marcata come decorativa',
	IMAGE_FIGURE_DECORATIVE: 'Controllo manuale: immagine con didascalia ma senza testo alternativo',
	IMAGE_FIGURE_DUPLICATE_ALT: 'Il testo alternativo non deve essere identico alla didascalia',
	LABELS_ARIA_LABEL_INPUT: 'Esiste un’etichetta visibile per questo campo?',
	LABELS_PLACEHOLDER: 'Controllo manuale: testo del segnaposto',
	LABELS_INPUT_RESET: 'È necessario questo pulsante di reset?',
	LABEL_IN_NAME: 'L’etichetta visibile non corrisponde all’etichetta invisibile',
	LINK_ALT_FILE_EXT: 'Il testo alternativo usato come link non deve essere un URL',
	LINK_ALT_MAYBE_BAD: 'Questo alt associato al link non può essere pronunciato da un lettore di schermo',
	LINK_ALT_UNPRONOUNCEABLE: 'Le immagini linkate devono avere un testo alternativo pronunciabile',
	LINK_CLICK_HERE: 'Controllo manuale: il link contiene “clicca qui”',
	LINK_DOI: 'Collega i titoli degli articoli, non i numeri DOI',
	LINK_EMPTY: 'Questo link non ha testo',
	LINK_EMPTY_LABELLEDBY: 'Link con attributo "aria-labelledby" non valido',
	LINK_EMPTY_NO_LABEL: 'Questo link necessita di un’etichetta',
	LINK_FILE_EXT: 'Il link punta a un file senza avviso',
	LINK_IDENTICAL_NAME: 'Questo link descrive in modo univoco la sua destinazione?',
	LINK_IMAGE_ALT: 'Controllo manuale: immagine linkata con testo alternativo',
	LINK_IMAGE_ALT_AND_TEXT: 'Questo testo alternativo ha senso all’interno di questo link?',
	LINK_IMAGE_LONG_ALT: 'Questo testo alternativo all’interno del link può essere più breve?',
	LINK_IMAGE_NO_ALT_TEXT: 'Questa immagine linkata necessita di un testo alternativo',
	LINK_IMAGE_TEXT: 'Controllo manuale: immagine dentro un link marcata come decorativa.',
	LINK_NEW_TAB: 'Questo link apre una nuova scheda senza avviso?',
	LINK_PLACEHOLDER_ALT: 'Questa immagine linkata necessita di un testo alternativo significativo',
	LINK_STOPWORD: 'Questo link descrive la sua destinazione?',
	LINK_STOPWORD_ARIA: 'Testo significativo del link disponibile solo per utenti di lettori di schermo',
	LINK_SUS_ALT: 'Questo testo alternativo descrive l’immagine o il link?',
	LINK_SYMBOLS: 'Controllo manuale: i simboli o emoji in questo link sono significativi?',
	LINK_URL: 'Il testo del link non deve essere un URL',
	META_LANG: 'Meta tag per la lingua della pagina mancante',
	META_MAX: 'Meta tag limita quanto gli utenti possono ingrandire il testo',
	META_REFRESH: 'Meta tag aggiorna automaticamente la pagina',
	META_SCALABLE: 'Meta tag impedisce agli utenti di ingrandire il testo',
	META_TITLE: 'Meta tag per il titolo della pagina mancante',
	MISSING_ALT: 'HTML non valido: immagine senza attributo alt',
	MISSING_ALT_LINK: 'HTML non valido: immagine linkata senza attributo alt',
	MISSING_ALT_LINK_HAS_TEXT: 'HTML non valido: immagine dentro un link senza attributo alt',
	QA_BAD_LINK: 'Controllo manuale: la destinazione del link potrebbe essere non valida',
	QA_BLOCKQUOTE: 'Questa citazione dovrebbe essere un’intestazione?',
	QA_DOCUMENT: 'Questo documento è stato etichettato per i lettori di schermo?',
	QA_FAKE_HEADING: 'Questo testo in grassetto dovrebbe essere un’intestazione?',
	QA_FAKE_LIST: 'Questo dovrebbe essere formattato come una lista?',
	QA_IN_PAGE_LINK: 'Link interno non funzionante',
	QA_JUSTIFY: 'Non giustificare il testo',
	QA_NESTED_COMPONENTS: 'Componenti interattive annidate',
	QA_PDF: 'Esiste un’alternativa a questo PDF?',
	QA_SMALL_TEXT: 'Il testo è troppo piccolo',
	QA_STRONG_ITALICS: 'Blocchi ampi di testo enfatizzato sono più difficili da leggere',
	QA_SUBSCRIPT: 'Non usare apici o pedici come formattazione visiva',
	QA_UNDERLINE: 'Solo i link dovrebbero essere sottolineati',
	QA_UPPERCASE: 'Questo testo in maiuscolo è necessario?',
	SUS_ALT: 'Ci sono parole ridondanti in questo testo alternativo?',
	TABINDEX_ATTR: 'L’attributo tabindex interrompe l’ordine di lettura',
	TABLES_EMPTY_HEADING: 'Questa cella di intestazione necessita di testo',
	TABLES_MISSING_HEADINGS: 'Questa tabella necessita di una riga e/o colonna di intestazioni',
	TABLES_SEMANTIC_HEADING: 'Le intestazioni di contenuto non devono essere usate dentro le tabelle',
	UNCONTAINED_LI: 'Lista HTML non valida',
};

const why = {
	fix: `<strong class="badge">Per correggere</strong> `,
	check: `<strong class="badge">Verifica manuale</strong> `,

	buttons: `<div class="why"><p>Nota: il nome accessibile di un pulsante deve chiarire cosa farà. I pulsanti che cambiano quando vengono cliccati devono cambiare anche il loro nome:</p><ul>
<li>Etichette che cambiano:<br>"Riproduci/Pausa", "Mostra dettagli/Nascondi dettagli"</li>
<li>Cambiamento degli <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">attributi di stato</a>:<br>"Riproduci/Riproduci, premuto", "Dettagli, compressi/Dettagli, espansi."</li>
</ul>
<p>Basta non cambiare entrambe le cose contemporaneamente. Cambiare "Riproduci" in "Pausa, premuto" significa che il lettore multimediale è in pausa, non in riproduzione!</p></div>`,

	headings: `<div class="why"><p>Suggerimento: le intestazioni e le sotto‑intestazioni organizzano i contenuti in una struttura gerarchica. Gli utenti di lettori di schermo si affidano a questa struttura per comprendere e navigare nelle pagine:</p><ul>
<li>Intestazione livello 1: titoli di pagina
<ul><li>Intestazione livello 2: argomenti principali
<ul><li>Intestazione livello 3: sotto‑argomenti</li></ul>
</li></ul>
</li>
</ul></div>`,

	images: `<div class="why"><p>Suggerimento: quando si scrive un testo alternativo, descrivere ciò che un’immagine significa, non solo ciò che mostra. A seconda del contesto, una foto di una bambina che calcia un pallone potrebbe significare:</p><ul>
<li>Hanno giocato sotto la pioggia battente.</li>
<li>Le nuove divise della squadra hanno fantastici loghi di draghi.</li>
<li>Ha segnato il gol della vittoria dalla fascia sinistra!</li>
</ul></div>`,

	// todo error on line 3
	links: `<div class="why"><p>Le persone scorrono rapidamente i link e usano la ricerca nella pagina per trovarli per nome, quindi i link efficaci devono essere significativi, unici e concisi:</p><ul>
<li>Ideale: "Scopri di più su https://webaim.org/techniques/hypertext/link_text"</li>
<li>Non unico: "Clicca <a href="https://webaim.org/techniques/hypertext/link_text">qui</a> per saperne di più sui link significativi."</li>
<li>Non conciso: "<a href="https://webaim.org/techniques/hypertext/link_text">Clicca qui per saperne di più sui link significativi</a>"</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>Lo scopo del testo alternativo è fornire un’alternativa a ciò che l’immagine significa, non solo a ciò che contiene. Il significato di un’immagine usata come link è la destinazione del link:</p><ul>
<li>"<em>Una lente di ingrandimento</em>" descrive un’immagine, non un link.</li>
<li>"<em>Una lente di ingrandimento per la ricerca</em>" descrive confusamente entrambe le cose.</li>
<li>"<em>Cerca</em>" descrive accuratamente la destinazione del link.</li>
</ul></p></div>`,
};

export const tips = {

	ALT_FILE_EXT: `<p>I lettori di schermo leggeranno questo URL, spesso una lettera alla volta. Questo probabilmente non trasmette lo stesso significato che vedere l’immagine.</p><p>${why.fix}Aggiungi un alt vuoto (alt="") se si tratta di una decorazione senza significato che dovrebbe essere ignorata dai lettori di schermo, oppure aggiungi un testo alternativo descrittivo.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Descrizione fornita per questa immagine: <strong>"%(alt)"</strong></p><p>${why.fix}Imposta il testo alternativo di questa immagine su una descrizione concisa di ciò che l’immagine significa in questo contesto.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Descrizione fornita per questa immagine: <strong>"%(alt)"</strong></p><p>${why.fix}Imposta il testo alternativo di questa immagine su una descrizione concisa di ciò che l’immagine significa in questo contesto.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>Il testo alternativo di questa immagine è "%(alt)", e contiene solo simboli e/o spazi impossibili da pronunciare. I lettori di schermo annunceranno che c’è un’immagine, poi faranno una pausa imbarazzante: "immagine: ____."</p><p>${why.fix}Aggiungi un alt descrittivo, oppure un alt <em>completamente</em> vuoto (alt="") se si tratta solo di un’icona o di uno spazio che dovrebbe essere ignorato.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Usa qualsiasi metodo valido per comunicare ai lettori di schermo cosa fa questo pulsante: testo, alt‑testo su un’icona o un attributo title.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Questo pulsante ha un attributo <code>aria-labelledby</code> vuoto o che non corrisponde al valore <code>ID</code> di un altro elemento nella pagina.</p><p>${why.fix}Collega nuovamente l’ID a un elemento presente nella pagina, oppure rimuovi l’attributo e descrivi il pulsante in un altro modo.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'Un’immagine o un gradiente di sfondo rendono incerto questo controllo sul colore effettivo dietro il testo. Usa il selettore colore qui sotto per verificare manualmente.',

	DUPLICATE_ID: `<p>Gli ID vengono utilizzati in questa pagina per etichette o destinazioni di link, perciò devono essere unici.</p><p>${why.fix}Modifica questo ID: <strong>#%(id)</strong></p><div class="why"><p>Nella maggior parte dei CMS, questo valore proviene da un campo chiamato "name" o "id". In HTML è un attributo: <code><a id="MY-ID"></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Elimina l’attributo <code>title</code> del link.</p><div class="why"><p>Nota: i tooltip basati su <code>title</code> appaiono solo al passaggio del mouse. Non sono visibili tramite tastiera o su dispositivi mobili, quindi molti utenti non li vedranno mai. Non dovrebbero mai contenere informazioni importanti.</p></div>`,

	EMBED_AUDIO: `<p>Se questo contenuto audio contiene parlato, deve essere fornita una https://www.w3.org/WAI/media/av/transcribing/alternativa testuale</a> su questa pagina o tramite un link.</p><p>Le trascrizioni automatiche richiedono una revisione umana per garantire che i parlanti e gli effetti sonori significativi siano identificati correttamente.</p>`,

	EMBED_DATA_VIZ: `<p>Le visualizzazioni incorporate sono spesso difficili o impossibili da usare per le tecnologie assistive, possono essere difficili da interpretare per utenti ipovedenti o daltonici e possono richiedere uno scorrimento orizzontale eccessivo sui telefoni.</p><p>${why.fix}A meno che questa visualizzazione non abbia un elevato contrasto visivo, sia interamente utilizzabile tramite tastiera <strong><em>e</em></strong> descrivibile da un lettore di schermo, fornisci un formato alternativo equivalente come descrizione testuale, tabella o foglio di calcolo scaricabile.</p>`,

	EMBED_GENERAL: 'I controlli automatici non possono verificare il contenuto all’interno degli embed. Assicurati che tutte le immagini abbiano un testo alternativo, i video abbiano sottotitoli, il testo abbia contrasto sufficiente e che link e pulsanti siano https://webaim.org/techniques/keyboard/accessibili tramite tastiera</a>, quindi puoi ignorare questo avviso.',

	EMBED_MISSING_TITLE: `<p>Gli embed necessitano di un nome accessibile che descriva il loro contenuto ai lettori di schermo.</p><p>${why.fix}Fornisci un attributo <code>title</code> o <code>aria-label</code> univoco.</p>`,

	EMBED_UNFOCUSABLE: `Questo attributo dice a tastiere e tecnologie assistive di saltare l’elemento. A meno che il contenuto dell’iframe non contenga link, pulsanti o moduli e non sia scorrevole, l’attributo deve essere rimosso.`,

	EMBED_VIDEO: `<p>I video devono includere sottotitoli.</p><p>Le trascrizioni automatiche devono essere riviste da una persona per garantire accuratezza e attribuzione dei parlanti.</p><p>${why.fix}Aggiungi o correggi i sottotitoli, quindi ignora questo avviso.</p>`,

	HEADING_EMPTY: `<p>Le intestazioni vuote creano lacune confuse nella struttura della pagina.</p><p>${why.fix}Aggiungi testo a questa intestazione oppure rimuovi questa riga vuota.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Le intestazioni vuote creano lacune confuse nella struttura della pagina.</p><p>${why.fix}Se questa non è un’intestazione, cambia il formato da <strong {C}>Intestazione %(level)</strong> a <strong>Paragrafo</strong>. Altrimenti inserisci il significato dell’immagine nel suo testo alternativo.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Assicurati che il titolo della pagina sia marcato come Intestazione 1 o Intestazione 2. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}A meno che non si tratti di un titolo fisso, come quello di un articolo pubblicato, accorcialo per facilitare la lettura rapida.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Contrassegna il titolo della pagina come un’intestazione di livello 1, per indicare l’inizio della struttura del documento.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Questa intestazione è passata da <strong>livello %(prevLevel)</strong> a <strong>livello %(level)</strong>. Per un lettore di schermo, ciò può sembrare un contenuto mancante.</p><p>${why.fix}Regola i livelli per creare una struttura coerente, senza salti.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: 'Questo elemento interattivo ha <code>aria-hidden="true"</code> ma può ancora ricevere focus da tastiera. Se intendi nasconderlo ai lettori di schermo, devi anche aggiungere <code>tabindex="-1"</code>; altrimenti rimuovi <code>aria-hidden="true"</code>.',

	IMAGE_ALT_TOO_LONG: `<p>I testi alternativi vengono letti dai lettori di schermo come una frase continua; se l’utente perde una parte, deve riascoltare tutto.</p><p>Il testo alternativo di %(altLength) caratteri di questa immagine è: <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Suggerimento: immagini complesse che richiedono più informazioni di quelle contenibili in una frase necessitano spesso di una <strong>didascalia visibile</strong> o un’alternativa che descriva i dettagli chiave.</p></div>`,

	IMAGE_DECORATIVE: `<p>Questa immagine è stata nascosta ai lettori di schermo con un alt vuoto. Solo immagini prive di significato, come icone ridondanti o sfondi decorativi, dovrebbero essere nascoste in questo modo.</p><p>${why.fix}Se questa immagine aggiunge valore alla pagina, fornisci un testo alternativo.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'L’immagine è marcata come <strong>decorativa</strong>, ma tutte le immagini in un carosello o galleria devono includere un testo alternativo descrittivo.',
	IMAGE_FIGURE_DECORATIVE: `<p>Questa immagine sarà ignorata dalle tecnologie assistive. La sua didascalia ha senso senza l’immagine?</p><p>${why.fix}Se la didascalia non descrive completamente il significato visivo dell’immagine, fornisci un testo alternativo che copra ciò che la didascalia non descrive.</p><div class="why"><p>Suggerimento: immagini, testi alternativi e didascalie lavorano insieme:</p><ul><li>Le didascalie visibili forniscono contesto e interpretazione.</li><li>I testi alternativi descrivono l’immagine per chi non può vederla, così da capire cosa la didascalia sta descrivendo.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Modifica il testo alternativo affinché descriva il significato visivo dell’immagine.</p><div class="why"><p>Suggerimento: immagini, testi alternativi e didascalie lavorano insieme:</p><ul><li>Le didascalie visibili forniscono contesto e interpretazione.</li><li>I testi alternativi descrivono l’immagine per chi non può vederla, in modo che comprendano cosa la didascalia sta discutendo.</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: '<p><strong {B}>Etichetta invisibile del campo:</strong> <strong {C}>%(TEXT)</strong></p><p>Controlla che esista un’etichetta visibile, che rimanga quando viene inserito del testo nel campo e che corrisponda al nome accessibile invisibile.</p><div class="why"><p>Etichettare i campi solo tramite titolo o placeholder fa sì che l’etichetta scompaia appena si inizia a digitare, rendendo difficile rivedere i dati o aggiornare correttamente l’etichetta invisibile.</p></div>',

	LABELS_INPUT_RESET: `<p>I pulsanti di reset possono essere attivati accidentalmente, causando perdita di dati senza possibilità di annullamento.</p><p>${why.fix}A meno che questo non reimposti un singolo campo, considera di rimuoverlo o di richiedere una conferma prima dell’azione.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'Il pulsante immagine non ha un testo alternativo. Aggiungi un alt che fornisca un nome accessibile, ad esempio <em>Cerca</em> o <em>Invia</em>.',

	LABELS_MISSING_LABEL: 'Non esiste un’etichetta associata a questo campo. Aggiungi un attributo <code>id</code> al campo e un attributo <code>for</code> corrispondente all’etichetta.',

	LABELS_NO_FOR_ATTRIBUTE: 'Non esiste un’etichetta associata a questo campo. Aggiungi un attributo <code>for</code> all’etichetta che corrisponda all’attributo <code>id</code> del campo. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>Il testo del placeholder scompare appena si inizia a digitare, e spesso ha troppo poco contrasto o abbastanza contrasto da sembrare contenuto reale.</p><p>${why.fix}Assicurati che informazioni chiave come etichetta del campo, testo di aiuto e istruzioni rimangano visibili quando il campo contiene del testo e valuta se rimuovere del tutto il placeholder.</p>`,

	LABEL_IN_NAME: `<p>Il testo visibile di questo elemento sembra essere diverso dal nome accessibile. Questo può confondere gli utenti di lettori di schermo e interferire con il controllo vocale.</p><p>${why.check}Assicurati che l’etichetta visibile inizi con il testo dell’etichetta invisibile e che non contenga informazioni significative aggiuntive.</p><p><strong>Etichetta invisibile:</strong> "%(TEXT)"</p>`,

	LINK_ALT_FILE_EXT: `<p>Il testo alternativo di questa immagine contiene "%(alt)", il che indica probabilmente un nome di file invece di un nome significativo per il link.</p><p>${why.fix}Imposta il testo alternativo dell’immagine come il nome della destinazione del link.</p><div class="why"> <p>Il testo alternativo deve fornire un’alternativa a ciò che l’immagine significa. Per un’immagine linkata, il significato è la destinazione del link:</p><ul><li>"Pagina con testo" descrive l’immagine, non il link.</li><li>"IMG_1234.jpg" è solo un nome di file.</li><li>"<strong><em>Modulo di registrazione (.doc)</em></strong>" è la destinazione del link.</li></ul></p></div>`,

	LINK_ALT_MAYBE_BAD: `<p>Il testo alternativo di questa immagine è un segnaposto: "<strong>%(alt)</strong>".</p><p>${why.fix}Imposta il testo alternativo sull’obiettivo del link.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>Il testo alternativo di questa immagine linkata contiene solo simboli e/o spazi impossibili da pronunciare: "%(ALT_TEXT)". I lettori di schermo annunciano la presenza del link ma non riescono a descriverlo.</p><p>${why.fix}Imposta il testo alternativo in modo che descriva la destinazione o lo scopo del link.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `Le parole "clicca" o "clicca qui" sono ridondanti e distolgono dal vero scopo del link.`,

	LINK_DOI: `<p>${why.fix}Collega il titolo dell’articolo e mostra il numero DOI come testo semplice, invece di linkare il DOI e lasciare il titolo non linkato.</p><div class="why"><p>Le https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20linkslinee guida APA</a> raccomandano link descrittivi perché gli utenti scorrono la pagina cercando link per nome.</p><p>Questo permette anche ai lettori di schermo di annunciare link significativi invece di sequenze di numeri prive di significato.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Aggiungi testo descrittivo sulla sua destinazione o elimina il link se è un errore (come uno spazio linkato accidentalmente).</p><div class="why"><p>I lettori di schermo hanno difficoltà a descrivere link vuoti, rimanendo in silenzio o leggendo l’URL carattere per carattere.</p><p>Nota: gli spazi linkati possono essere difficili da eliminare in alcuni editor; potrebbe essere necessario riscrivere il testo intorno allo spazio.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>Questo link ha un attributo <code>aria-labelledby</code> che non corrisponde all’<code>ID</code> di nessun elemento nella pagina.</p><p>${why.fix}Fornisci un ID valido o rimuovi l’attributo e descrivi il link in un altro modo.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Aggiungi testo che descriva la destinazione del link o elimina il link se è un errore.</p><div class="why"><p>I lettori di schermo faticano con i link vuoti, restando in silenzio o pronunciando l’URL intero.</p><p>Gli spazi linkati possono richiedere la riscrittura del testo circostante.</p></div>`,

	LINK_FILE_EXT: `<p>Questo link punta a un PDF o ad un file scaricabile (ad esempio MP3, ZIP, documento Word) senza avviso.</p><p>${why.fix}Utilizza testo o un’icona per https://itmaybejj.github.io/linkpurpose/indicare il tipo di file</a> direttamente nel link.</p><p class="why">Per file di grandi dimensioni, considera di indicare la dimensione, ad esempio: "Rapporto annuale (PDF, 3 MB)".</p>`,

	LINK_IDENTICAL_NAME: `<p>Link che portano a destinazioni diverse condividono lo stesso testo: "<strong>%(TEXT)</strong>".</p><p>${why.fix}Riscrivi i link che portano a destinazioni diverse usando nomi unici che descrivano chiaramente ogni destinazione.</p>${why.links}`,

	LINK_IMAGE_ALT: `Assicurati che questo alt descriva la destinazione del link:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Assicurati che questo aiuti a descrivere la destinazione del link senza aggiungere informazioni irrilevanti o ridondanti:</p><p><strong class="badge">Alt</strong> "<em><strong>%(alt)</strong></em>"</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p>https://webaim.org/techniques/hypertext/link_text#alt_linkIl testo alternativo di un’immagine linkata descrive la destinazione del link</a>. I link devono essere brevi e chiari, perché molti utenti di lettori di schermo navigano tramite l’elenco dei link.</p>Questo alt ha %(altLength) caratteri: <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Quando un link contiene un’immagine, il testo alternativo dell’immagine https://webaim.org/techniques/hypertext/link_text#alt_linkviene usato come etichetta del link</a>.</p><p>${why.fix}Imposta l’alt sull’obiettivo o lo scopo del link.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'L’immagine è marcata come decorativa, ma il link usa il testo circostante come etichetta descrittiva.',

	LINK_NEW_TAB: `<p>${why.fix}Imposta il link affinché si apra nella stessa scheda, oppure https://itmaybejj.github.io/linkpurpose/avvisa prima gli utenti</a>.</p><div class="why"><p>Gli utenti possono sempre decidere di aprire un link in una nuova scheda. Quando il link forza l’apertura in una nuova scheda, questo può risultare confuso — soprattutto se il pulsante "indietro" smette di funzionare.</p><p>Nota: i link all’interno dei moduli spesso si aprono in nuova scheda per prevenire la perdita dei dati inseriti.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>Il testo alternativo di questa immagine linkata è un segnaposto: "<strong>%(alt)</strong>".</p><p>${why.fix}Imposta il testo alternativo in base alla destinazione del link.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Questo link contiene testo che non aiuta a descrivere la destinazione:<br><strong>%(text)</strong></p><p>${why.fix}Riscrivi questo link in modo da descrivere chiaramente la sua destinazione o il suo scopo.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>È stato fornito un nome accessibile via ARIA, ma il testo visibile del link è generico: "<strong {C}>%(ERROR)</strong>".</p><p>${why.fix}Scrivi testi di link significativi per tutti gli utenti e assicurati che l’etichetta visibile corrisponda al nome accessibile.</p>${why.links}`,

	LINK_SUS_ALT: `<p>Il testo alternativo di questa immagine contiene "%(alt)", che di solito significa che non sta descrivendo la destinazione del link.</p><strong class="badge">Testo alternativo</strong> "%(ALT_TEXT)"    <p>Per correggere: assicurati che questo alt descriva la destinazione o lo scopo del link.<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Evita di usare simboli come call‑to‑action dentro il testo del link a meno che non siano nascosti alle tecnologie assistive. I lettori di schermo possono leggerli ad alta voce in modo confuso. Considera di rimuovere: <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Sostituisci questo link con il titolo della sua destinazione o il suo scopo.</p><div class="why"><p>Gli utenti scorrono i link cercandone il nome. Ciò vale soprattutto per gli utenti di lettori di schermo, che navigano tramite l’elenco dei link nella pagina.</p><p>I link composti da URL non possono essere facilmente scansionati o cercati nella pagina, quindi sono meno utili.</p></div>`,

	META_LANG: `<p>${why.fix}Aggiungi un https://www.w3.org/International/questions/qa-html-language-declarationsattributo di lingua</a> al tag HTML della pagina.</p><div class="why"><p>Suggerimento: i lettori di schermo pronunciano le parole basandosi sulla lingua dichiarata. Se la lingua non è specificata, la pronuncia può risultare errata o incomprensibile.</p></div>`,

	META_MAX: `<p>Questo meta tag limita di quanto gli utenti possono ingrandire il testo.</p><p>${why.fix}Regola questo valore o rimuovilo per consentire lo zoom completo.</p>`,

	META_REFRESH: `<p>Le pagine non dovrebbero aggiornarsi automaticamente tramite meta tag. Questo interrompe l’utente senza avviso, può fargli perdere il punto della lettura o cancellare il lavoro svolto in un modulo.</p><p>${why.fix}Per aggiornare il contenuto nella stessa pagina, usa AJAX o JavaScript per avvisare prima l’utente e permettere un rinvio dell’evento.</p>`,

	META_TITLE: `<p>${why.fix}Aggiungi un tag <code><title></code> all’interno del tag <code><head></code> della pagina.</p><div class="why"><p>Diversi aspetti dell’esperienza di navigazione dipendono da un https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title titolo breve e unico</a>:</p><ul><li>I motori di ricerca lo usano come titolo nei risultati.</li><li>I browser lo usano come titolo della scheda.</li><li>I lettori di schermo lo annunciano quando si cambia scheda.</li></ul><p>Senza un titolo, gli utenti vedono o sentono un URL.</p></div>`,

	MISSING_ALT: `<p>Quando i lettori di schermo incontrano un’immagine senza attributo alt, leggono l’URL del file immagine, spesso una lettera alla volta.</p><p>${why.fix}Aggiungi un alt vuoto (alt="") se l’immagine deve essere ignorata, o aggiungi un testo alternativo descrittivo se è significativa.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Quando i lettori di schermo incontrano un’immagine linkata senza attributo alt, leggono l’URL del file, spesso una lettera alla volta. Questo è particolarmente problematico per le immagini all’interno dei link.</p><p>${why.fix}Aggiungi un alt che descriva la destinazione del link.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Questa immagine fa parte di un link che include testo. Se il testo visibile descrive sufficientemente la destinazione del link, aggiungi alt="" per far ignorare l’immagine ai lettori di schermo. Altrimenti, aggiungi un alt che descriva lo scopo o la destinazione.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>Il link sembra puntare a un ambiente di sviluppo:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Modificalo affinché punti a un percorso relativo (/cartella) o all’URL pubblico.</p>`,

	QA_BLOCKQUOTE: `<p>La formattazione blockquote indica ai lettori di schermo che il testo è una citazione. Citazioni brevi sono spesso intestazioni erroneamente formattate.</p><p>${why.fix}Se questo è un’intestazione, usa la formattazione di intestazione appropriata.</p>${why.headings}`,

	QA_DOCUMENT: `<p>I documenti collegati sono considerati contenuti web e devono essere accessibili. Controlla che il documento abbia intestazioni, celle di intestazione nelle tabelle e testi alternativi per le immagini.</p><ul class="why"><li>Rendi il tuo https://support.google.com/docs/answer/6199477?hl=itdocumento Google Workspace</a> più accessibile.</li><li>Rendi i tuoi https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155documenti Office</a> più accessibili.</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}Se questa riga in grassetto introduce un nuovo argomento, sostituisci la sola formattazione visiva con uno stile di intestazione.</p><div class="why"><p>Suggerimento: le intestazioni creano una struttura navigabile per gli strumenti assistivi. Il livello dell’intestazione indica la profondità nella gerarchia della pagina.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Se "%(text)" fa parte di un elenco, sostituiscilo con una lista vera e propria.</p><div class="why"><p>Gli elenchi sono strutturali, sia visivamente che per l’accessibilità:</p><ol><li>Hanno rientri allineati che agevolano la lettura.</li><li>Sono leggibili dai lettori di schermo che annunciano la posizione ("elemento 3 di 7").</li></ol><p>Un paragrafo che inizia con un numero non è un elenco reale e non viene annunciato correttamente.</p></div>`,

	QA_IN_PAGE_LINK: `<p>La destinazione del link non corrisponde a nessun elemento presente nella pagina.</p><div class="why"><p>Nota per gli sviluppatori: se non è un link normale e la destinazione è un handler JavaScript, controlla che funzioni con la tastiera prima di ignorare questo avviso.</p></div>`,

	QA_JUSTIFY: `<p>La giustificazione del testo inserisce spazi extra per allineare i margini, creando irregolarità che rendono la lettura più difficile.</p><p>${why.fix}Usa l’allineamento a sinistra.</p>`,

	QA_NESTED_COMPONENTS: 'Evita di annidare componenti interattive, come mettere un accordion dentro un altro accordion, o tab dentro un accordion. Queste strutture complicano la navigazione e aumentano il carico cognitivo.',

	QA_PDF: `<p>${why.fix}Esegui una delle seguenti azioni, poi ignora questo avviso:</p><ul><li>Collega a una pagina web invece del PDF,</li><li>Oppure fornisci anche una pagina web o un documento modificabile affinché il PDF sia solo l’opzione “stampabile”,</li><li>Oppure assicurati almeno che il PDF sia leggibile dai lettori di schermo verificando la presenza di tag, ordine di lettura, intestazioni di tabella e testi alternativi.</li></ul><div class="why"><p>Gli utenti mobili e chi usa tecnologie assistive preferiscono quasi sempre pagine web ai PDF, che spesso non si adattano ai dispositivi mobili e possono mancare di struttura accessibile.</p></div>`,

	QA_SMALL_TEXT: 'Il testo troppo piccolo è difficile da leggere, soprattutto per gli utenti ipovedenti. Evita dimensioni inferiori alla dimensione predefinita.',

	QA_STRONG_ITALICS: `<p>${why.fix}Riserva il grassetto e il corsivo per singole parole o frasi chiave.</p><div class="why"><p>Nota: se questo è un testo citato, l’elemento blockquote può essere usato per evidenziarlo.</p></div>`,

	QA_SUBSCRIPT: `La formattazione in apice o pedice rende il testo troppo piccolo e difficile da leggere. Usala solo per casi specifici, come numeri ordinali (4<sup>º</sup>), formule chimiche (H<sub>2</sub>O) e riferimenti di note.`,

	QA_UNDERLINE: `<p>Nel web, il testo sottolineato indica un link. Gli utenti penseranno che sia cliccabile.</p><p>${why.fix}Usa <strong>grassetto</strong> o <em>corsivo</em> per l’enfasi, e usa stili di intestazione per indicare cambiamenti di sezione.</p><div class="why"><p>Nota: i lettori di schermo non annunciano la formattazione visiva come la sottolineatura. Solo le intestazioni creano struttura.</p></div>`,

	QA_UPPERCASE: `<p>BLOCCHI DI TESTO IN MAIUSCOLO SONO PIÙ DIFFICILI DA LEGGERE E POSSONO ESSERE PERCEPITI COME “URLO”.</p><p>${why.fix}Evidenzia solo poche parole per volta, preferibilmente con il grassetto invece delle maiuscole.</p><div class="why"><p>Nota: i lettori di schermo non annunciano il grassetto. Usa un’intestazione se questo testo introduce un nuovo argomento importante.</p></div>`,

	SUS_ALT: `<p>Il testo alternativo contiene la parola "%(alt)", che probabilmente è ridondante:</p><p><strong class="badge">Testo alternativo</strong> "%(ALT_TEXT)"</p><p>Per correggere: riscrivi il testo alternativo per trasmettere brevemente il significato dell’immagine.</p><div class="why"><p>Suggerimento: i lettori di schermo annunciano già che stanno leggendo la descrizione di un’immagine, quindi espressioni come “immagine di” o “foto di” sono di solito ridondanti.</p><p>Questo è accettabile solo se tali parole fanno parte del contenuto descritto:</p><ul><li>Non ridondante: "<em>Una foto in</em> un album fotografico mostrato alla classe."</li><li>Ridondante: "<em>Foto di</em> una foto in un album..."</li></ul></div>`,

	TABINDEX_ATTR: `<p>${why.fix}Non usare valori di tabindex superiori a "0" (l’ordine predefinito). Modifica l’ordine degli elementi nel codice HTML in modo che ordine di tabulazione, di lettura e visivo rimangano coerenti.</p><div class="why"><p>Per impostazione predefinita, l’ordine visivo, l’ordine della tabulazione e l’ordine di lettura del lettore di schermo coincidono.</p><p>Assegnare un tabindex positivo sposta l’elemento all’inizio dell’ordine di tabulazione, <strong>ma non dell’ordine visivo o di lettura</strong>, creando confusione.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Assicurati che ogni cella di intestazione contenga testo.</p><div class="why"><p>Suggerimento: i lettori di schermo utilizzano le intestazioni per orientare gli utenti durante l’esplorazione della tabella.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Modifica le proprietà della tabella e specifica se le intestazioni si trovano nella prima riga, nella prima colonna o in entrambe.</p><div class="why"> <p>Suggerimento: i lettori di schermo ripetono l’intestazione rilevante ogni volta che il cursore entra in una riga o colonna.</p><p>Se questa tabella non ha intestazioni perché viene usata solo per layout visivo, rimuovi il formato tabellare.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Rimuovi questa intestazione (h2, h3). Fornisci invece righe o colonne di intestazione. Se hai bisogno di più intestazioni a livelli diversi, usa più tabelle.</p><div class="why"> <p>Suggerimento: le intestazioni di tabella sono direzionali (una riga o una colonna). Le intestazioni di contenuto etichettano tutto ciò che segue:</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Un <strong>intestazione di tabella</strong> nella cella 2 etichetta la cella B. <br><br> Un <strong>intestazione di contenuto</strong> nella cella 2 etichetta le celle 3, A, B e C, oltre a questo testo e il piè di pagina del tooltip.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,

};

export const interfaceStrings = {
	ALERT_CLOSE: 'Chiudi',
	ALT: 'Testo alternativo: ',
	DECORATIVE: 'Marcato come decorativo',
	DISMISS: 'Ignora',
	DISMISS_ALL: 'In questa pagina: ignora',
	edit_page: 'Modifica pagina',
	edit_layout: 'Modifica layout',
	edit_term: 'Modifica termine',
	edit_tags: 'Modifica utente',
	IMAGES: 'Testo alternativo',
	MAIN_TOGGLE_LABEL: 'Attiva strumenti di accessibilità',
	MISSING: '(mancante!)',
	NOT_VISIBLE: 'Nota: questo contenuto potrebbe non essere visibile. Cercalo all’interno del riquadro evidenziato.',
	NO_IMAGES: 'Nessuna immagine trovata.',
	OUTLINE: 'Intestazioni',
	PANEL_DISMISS_BUTTON: `Mostra %(dismissCount) avvisi nascosti`,
	PANEL_HEADING: 'Mostra visualizzatori',
	SKIP_TO_ISSUE: 'Vai al problema',
	WARNING: 'verifica manuale necessaria',
	WARNINGS: 'verifiche manuali necessarie',
	buttonFirstContent: 'Vai al primo avviso',
	buttonHideHiddenAlert: 'Nascondi avviso nascosto',
	buttonHideHiddenAlerts: `Nascondi %(count) avvisi nascosti`,
	buttonShowHiddenAlert: 'Mostra avviso nascosto',
	buttonToolsActive: 'Nascondi visualizzatori',
	dismissActions: `Avvisi simili`,
	dismissHideTitle: 'Nasconde l’avviso solo per te',
	dismissOkAllButton: 'In questa pagina: segna come OK',
	dismissOkButtonContent: 'Segna come OK',
	dismissOkTitle: 'Nasconde l’avviso per tutti gli editor',
	dismissOnSite: 'In tutte le pagine: segna come OK',
	dismissalsHeader: 'Non hai intenzione di risolvere questo?',
	errorOutlinePrefixHeadingEmpty: '(intestazione vuota)',
	errorOutlinePrefixHeadingIsLong: '(segnalato per lunghezza)',
	errorOutlinePrefixSkippedLevel: '(segnalato per salto di livello)',
	issueContent: 'Problema di contenuto',
	issueDeveloper: 'Problema di sviluppo',
	issueTemplate: 'Problema di modello',
	main_toggle_hide: 'Nascondi strumenti di accessibilità',
	main_toggle_hide_alerts: 'Nascondi avvisi di accessibilità',
	main_toggle_show: 'Mostra strumenti di accessibilità',
	main_toggle_show_alerts: 'Mostra avvisi di accessibilità',
	panelCheckAltText: '<p class="ed11y-small">Verifica che ogni immagine descriva ciò che significa nel contesto e che non ci siano immagini contenenti testo.</p>',
	panelCheckOutline: '<p class="ed11y-small">Questo mostra la struttura delle intestazioni. Controlla che corrisponda all’organizzazione visiva del contenuto.</p>',
	PANEL_HEADING_MISSING_ONE: 'Intestazione di livello 1 mancante.',
	PANEL_NO_HEADINGS: 'Nessuna intestazione trovata.',
	reportsLink: 'Apri i rapporti del sito',
	toggleDisabled: 'Non c’è contenuto disponibile per la verifica da parte di Editoria11y.',
	transferFocus: 'Modifica questo contenuto',
	unDismissHideButton: 'Ripristina questo avviso ignorato',
	unDismissNotePermissions: 'Questa verifica è stata nascosta da un amministratore',
	unDismissOKButton: 'Ripristina questo avviso segnato come OK',
};

const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips),
  testNames: testNames,
};

export default newStrings;
