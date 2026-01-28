import strings from '../sa11y-lang/it.js';
// Machine translation.

// todo check each file for link integrity, and escaping of tags in code blocks.
export const testNames = {
	ALT_FILE_EXT: 'Questo testo alternativo è un nome file, non una descrizione',
	ALT_MAYBE_BAD: 'Questo testo alternativo non può essere pronunciato da un lettore di schermo',
	ALT_PLACEHOLDER: 'Questo testo alternativo è un segnaposto privo di significato',
	ALT_UNPRONOUNCEABLE: 'Questo testo alternativo è impossibile da pronunciare',
	BTN_EMPTY: 'Il pulsante non ha un’etichetta accessibile',
	BTN_EMPTY_LABELLEDBY: 'Il pulsante ha un’etichetta ARIA non valida',
	BTN_ROLE_IN_NAME: 'Il nome del pulsante ripete la parola “button”',
	CONTRAST_ERROR: 'Il testo non ha contrasto sufficiente per una lettura agevole',
	CONTRAST_ERROR_GRAPHIC: 'La grafica o l’icona non ha contrasto sufficiente',
	CONTRAST_INPUT: 'Il campo di input non ha contrasto sufficiente',
	CONTRAST_PLACEHOLDER: 'Il testo del segnaposto non ha contrasto sufficiente',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Questo segnaposto ha contrasto sufficiente?',
	CONTRAST_WARNING: 'Questo testo ha contrasto sufficiente?',
	CONTRAST_WARNING_GRAPHIC: 'Questa grafica/questa icona ha contrasto sufficiente?',
	DUPLICATE_ID: 'Attributo ID duplicato',
	DUPLICATE_TITLE: 'Questo link ha un tooltip identico al testo del link',
	EMBED_AUDIO: 'Questo contenuto audio ha una trascrizione?',
	EMBED_DATA_VIZ: 'Questa visualizzazione è accessibile?',
	EMBED_GENERAL: 'I contenuti incorporati (iframe) richiedono controlli manuali',
	EMBED_MISSING_TITLE: 'Frame senza attributo “title”',
	EMBED_UNFOCUSABLE: 'Un frame con tabindex="‑1" non è raggiungibile da tastiera.',
	EMBED_VIDEO: 'Questo video ha sottotitoli corretti?',
	HEADING_EMPTY: 'Questa intestazione non contiene testo',
	HEADING_EMPTY_WITH_IMAGE: 'Questa immagine è usata come intestazione e richiede testo alternativo',
	HEADING_FIRST: 'La prima intestazione della pagina è un sottotitolo',
	HEADING_LONG: 'Questa intestazione può essere più breve?',
	HEADING_MISSING_ONE: 'Manca un’intestazione di livello 1 (H1)',
	HEADING_SKIPPED_LEVEL: 'Questa intestazione ha un livello errato',
	HIDDEN_FOCUSABLE: 'Questo elemento non può essere descritto dai lettori di schermo',
	IMAGE_ALT_TOO_LONG: 'Questo testo alternativo può essere più breve?',
	IMAGE_DECORATIVE: 'Questa immagine è davvero priva di significato?',
	IMAGE_DECORATIVE_CAROUSEL: 'Immagine in un carosello/galleria marcata come decorativa',
	IMAGE_FIGURE_DECORATIVE: 'Verifica manuale: immagine con didascalia senza testo alternativo',
	IMAGE_FIGURE_DUPLICATE_ALT: 'Il testo alternativo non deve essere identico alla didascalia',
	LABELS_ARIA_LABEL_INPUT: 'Esiste un’etichetta visibile per questo campo?',
	LABELS_PLACEHOLDER: 'Verifica manuale: testo del segnaposto',
	LABELS_INPUT_RESET: 'È necessario questo pulsante di reset?',
	LABEL_IN_NAME: 'L’etichetta visibile non corrisponde al nome accessibile',
	LINK_ALT_FILE_EXT: 'Il testo alternativo usato come link non deve essere un URL',
	LINK_ALT_MAYBE_BAD: 'Questo alt associato al link non può essere pronunciato',
	LINK_ALT_UNPRONOUNCEABLE: 'Le immagini linkate devono avere un alt pronunciabile',
	LINK_CLICK_HERE: 'Verifica manuale: il link contiene “clicca qui”',
	LINK_DOI: 'Collegare i titoli degli articoli, non i numeri DOI',
	LINK_EMPTY: 'Questo link non ha testo',
	LINK_EMPTY_LABELLEDBY: 'Attributo “aria‑labelledby” del link non valido',
	LINK_EMPTY_NO_LABEL: 'Questo link necessita di un’etichetta',
	LINK_FILE_EXT: 'Il link punta a un file senza avviso',
	LINK_IDENTICAL_NAME: 'Questo link descrive univocamente la sua destinazione?',
	LINK_IMAGE_ALT: 'Verifica manuale: immagine linkata con testo alternativo',
	LINK_IMAGE_ALT_AND_TEXT: 'Questo alt ha senso nel contesto del link?',
	LINK_IMAGE_LONG_ALT: 'Questo alt nel link può essere più breve?',
	LINK_IMAGE_NO_ALT_TEXT: 'Questa immagine linkata necessita di alt',
	LINK_IMAGE_TEXT: 'Verifica manuale: immagine dentro un link marcata come decorativa.',
	LINK_NEW_TAB: 'Il link apre una nuova scheda senza avviso?',
	LINK_PLACEHOLDER_ALT: 'Questa immagine linkata necessita di alt significativo',
	LINK_STOPWORD: 'Questo link descrive correttamente la sua destinazione?',
	LINK_STOPWORD_ARIA: 'Testo significativo disponibile solo ai lettori di schermo',
	LINK_SUS_ALT: 'L’alt descrive l’immagine o il link?',
	LINK_SYMBOLS: 'Verifica manuale: simboli o emoji nel link sono significativi?',
	LINK_URL: 'Il testo del link non deve essere un URL',
	META_LANG: 'Meta tag della lingua della pagina mancante',
	META_MAX: 'Meta tag limita lo zoom del testo',
	META_REFRESH: 'Meta tag aggiorna automaticamente la pagina',
	META_SCALABLE: 'Meta tag impedisce lo zoom',
	META_TITLE: 'Meta tag per il titolo della pagina mancante',
	MISSING_ALT: 'HTML non valido: immagine senza attributo alt',
	MISSING_ALT_LINK: 'HTML non valido: immagine linkata senza alt',
	MISSING_ALT_LINK_HAS_TEXT: 'HTML non valido: immagine nel link senza alt',
	QA_BAD_LINK: 'Verifica manuale: destinazione del link potenzialmente non valida',
	QA_BLOCKQUOTE: 'Questa citazione dovrebbe essere un’intestazione?',
	QA_DOCUMENT: 'Il documento è stato marcato per i lettori di schermo?',
	QA_FAKE_HEADING: 'Questo grassetto dovrebbe essere un’intestazione?',
	QA_FAKE_LIST: 'Questo dovrebbe essere formattato come elenco?',
	QA_IN_PAGE_LINK: 'Ancora interna non valida',
	QA_JUSTIFY: 'Non giustificare il testo',
	QA_NESTED_COMPONENTS: 'Componenti interattive annidate',
	QA_PDF: 'Esiste un’alternativa a questo PDF?',
	QA_SMALL_TEXT: 'Testo troppo piccolo',
	QA_STRONG_ITALICS: 'Blocchi estesi di testo enfatizzato sono difficili da leggere',
	QA_SUBSCRIPT: 'Non usare apice/pedice come mera formattazione visiva',
	QA_UNDERLINE: 'Solo i link devono essere sottolineati',
	QA_UPPERCASE: 'È necessario questo TESTO IN MAIUSCOLO?',
	SUS_ALT: 'Questo alt contiene parole ridondanti?',
	TABINDEX_ATTR: 'L’attributo tabindex interrompe l’ordine di lettura',
	TABLES_EMPTY_HEADING: 'Questa cella di intestazione richiede testo',
	TABLES_MISSING_HEADINGS: 'A questa tabella mancano intestazioni di riga/colonna',
	TABLES_SEMANTIC_HEADING: 'Intestazioni di contenuto non vanno usate dentro le tabelle',
	UNCONTAINED_LI: 'Elenco HTML non valido',
};

const why = {
	fix: `<strong class="badge">Per correggere</strong>`,
	check: `<strong class="badge">Verifica manuale</strong>`,

	buttons: `<div class="why"><p>Nota: il nome accessibile di un pulsante deve chiarire cosa fa. I pulsanti che cambiano al clic devono cambiare anche nome:</p><ul>
<li>Etichette a interruttore:<br>“Riproduci/Pausa”, “Mostra dettagli/Nascondi dettagli”</li>
<li>Cambio di <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">attributi di stato ARIA</a>:<br>“Riproduci/Riproduci, premuto”, “Dettagli, compressi/Dettagli, espansi”.</li>
</ul>
<p>Non cambiare etichetta <em>e</em> stato insieme. Passare da “Riproduci” a “Pausa, premuto” significa che il player è in pausa — non in riproduzione!</p></div>`,

	headings: `<div class="why"><p>Suggerimento: intestazioni e sotto‑intestazioni organizzano i contenuti in una struttura gerarchica. I lettori di schermo usano tale struttura per comprendere e navigare:</p>
<ul><li>Intestazione livello 1: titolo di pagina
<ul><li>Intestazione livello 2: argomenti principali
<ul><li>Intestazione livello 3: sotto‑argomenti</li></ul></li></ul></li></ul></div>`,

	images: `<div class="why"><p>Suggerimento: quando scrivi un testo alternativo, descrivi ciò che l’immagine <em>significa</em> nel contesto, non solo ciò che mostra. Per esempio, una foto di una bambina che calcia un pallone può significare:</p>
<ul><li>Hanno giocato sotto la pioggia battente.</li>
<li>Le nuove divise hanno loghi di draghi.</li>
<li>Ha segnato il gol della vittoria dalla fascia sinistra!</li></ul></div>`,

	links: `<div class="why"><p>Le persone scorrono la pagina attraverso i link e usano la ricerca nella pagina per trovarli per nome; link efficaci devono quindi essere significativi, unici e concisi:</p>
<ul>
<li>Ideale: “Scopri di più sui https://webaim.org/techniques/hypertext/link_textlink significativi</a>”</li>
<li>Non unico: “Clicca https://webaim.org/techniques/hypertext/link_texthere</a> per saperne di più.”</li>
<li>Non conciso: “https://webaim.org/techniques/hypertext/link_textClicca qui per saperne di più sui link significativi</a>”</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>Il testo alternativo deve rendere la <em>significatività</em> di un’immagine, non il mero contenuto. Per un’immagine usata come link, il significato è la destinazione del link:
<ul>
<li>“<em>Lente d’ingrandimento</em>” descrive l’immagine, non il link.</li>
<li>“<em>Lente di ricerca</em>” è ambiguo.</li>
<li>“<em>Cerca</em>” descrive correttamente la destinazione.</li>
</ul></p></div>`,
};

export const tips = {
	ALT_FILE_EXT: `<p>I lettori di schermo possono leggere l’URL carattere per carattere; questo raramente trasmette la stessa informazione dell’immagine.</p><p>${why.fix}Aggiungi alt vuoto (alt="") se è decorazione, oppure un testo alternativo descrittivo se è informativa.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Descrizione fornita: <strong>"%(alt)"</strong></p><p>${why.fix}Imposta un testo alternativo conciso che esprima cosa significa l’immagine in questo contesto.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Descrizione fornita: <strong>"%(alt)"</strong></p><p>${why.fix}Imposta un testo alternativo conciso che esprima cosa significa l’immagine in questo contesto.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>Il testo alternativo “%(alt)” contiene solo simboli o spazi non pronunciabili. Il lettore annuncerà “immagine” e poi una pausa: “immagine: ____”.</p><p>${why.fix}Aggiungi un alt descrittivo, o un alt completamente vuoto (alt="") se è un’icona/spaziatore da ignorare.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Comunica ai lettori di schermo cosa fa il pulsante mediante testo visibile, alt su un’icona o attributo <code>title</code>.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p><code>aria-labelledby</code> è vuoto o non corrisponde a nessun <code>ID</code> in pagina.</p><p>${why.fix}Collega un ID valido o rimuovi l’attributo e descrivi diversamente il pulsante.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'Uno sfondo (immagine/gradiente) impedisce di determinare con certezza il colore dietro al testo. Usa il selettore qui sotto per il controllo manuale.',

	DUPLICATE_ID: `<p>Gli ID sono usati per etichette o destinazioni di link e devono essere unici.</p><p>${why.fix}Modifica questo ID: <strong>#%(id)</strong></p><div class="why"><p>Nei CMS l’ID proviene spesso da un campo “name/id”. In HTML è l’attributo: <code><a id="MY-ID"></a></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Rimuovi l’attributo <code>title</code> del link.</p><div class="why"><p>Nota: i tooltip <code>title</code> appaiono solo al passaggio del mouse; non sono visibili su mobile o con tastiera, quindi non devono contenere informazioni importanti.</p></div>`,

	EMBED_AUDIO: `<p>Se c’è parlato, fornisci un’https://www.w3.org/WAI/media/av/transcribing/alternativa testuale</a> in pagina o via link.</p><p>Le trascrizioni automatiche vanno riviste da una persona (parlanti/suoni significativi).</p>`,

	EMBED_DATA_VIZ: `<p>Le visualizzazioni incorporate possono essere difficili o impossibili da usare con tecnologie assistive e su mobile (scorrimento orizzontale).</p><p>${why.fix}Se non hanno alto contrasto, sono tastiera‑usabili <strong><em>e</em></strong> leggibili da screen reader, fornisci alternativa equivalente (testo, tabella, download) e chiudi l’avviso.</p>`,

	EMBED_GENERAL: 'I controlli automatici non esaminano il contenuto interno di embed. Assicurati che le immagini abbiano alt, i video sottotitoli, il testo contrasto sufficiente e che link/pulsanti siano https://webaim.org/techniques/keyboard/accessibili da tastiera</a>, quindi chiudi l’avviso.',

	EMBED_MISSING_TITLE: `<p>Gli embed necessitano di un nome accessibile che descriva il contenuto.</p><p>${why.fix}Aggiungi <code>title</code> o <code>aria-label</code> univoco.</p>`,

	EMBED_UNFOCUSABLE: `L’attributo fa sì che tastiera/AT saltino l’elemento. Se l’iframe ha link, pulsanti o è scorrevole, rimuovilo.`,

	EMBED_VIDEO: `<p>I video devono avere sottotitoli.</p><p>Quelli automatici necessitano revisione umana.</p><p>${why.fix}Aggiungi o correggi i sottotitoli, poi chiudi l’avviso.</p>`,

	HEADING_EMPTY: `<p>Intestazioni vuote creano buchi nella struttura.</p><p>${why.fix}Aggiungi testo o rimuovi la riga vuota.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Intestazioni vuote creano buchi nella struttura.</p><p>${why.fix}Se non è un’intestazione, cambia da <strong {C}>Intestazione %(level)</strong> a <strong>Paragrafo</strong>. Altrimenti, inserisci il significato dell’immagine nel suo alt.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Assicurati che il titolo sia marcato come Intestazione 1 o 2. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}Se non è un titolo fisso (es. articolo), accorcialo per la lettura veloce.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Contrassegna il titolo come H1 per indicare l’inizio della struttura.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>L’intestazione salta da <strong>livello %(prevLevel)</strong> a <strong>livello %(level)</strong>, dando l’idea di contenuto mancante.</p><p>${why.fix}Allinea i livelli per una gerarchia continua.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: `Questo elemento ha <code>aria-hidden="true"</code>, ma è ancora focalizzabile da tastiera. Se va nascosto agli screen reader, aggiungi <code>tabindex="-1"</code>; altrimenti rimuovi <code>aria-hidden</code>.`,

	IMAGE_ALT_TOO_LONG: `<p>Gli screen reader leggono l’alt come un’unica frase; se si perde un punto, occorre riascoltare tutto.</p><p>L’alt è lungo %(altLength) caratteri: <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Suggerimento: per immagini complesse usa una <strong>didascalia visibile</strong> o una descrizione estesa e rimanda ad essa nell’alt.</p></div>`,

	IMAGE_DECORATIVE: `<p>Immagine nascosta con alt vuoto. Solo immagini puramente decorative dovrebbero esserlo.</p><p>${why.fix}Se ha significato, fornisci un alt.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'Segnata come <strong>decorativa</strong>, ma in caroselli/gallerie tutte le immagini dovrebbero avere alt descrittivi.',

	IMAGE_FIGURE_DECORATIVE: `<p>Ignorata dalle tecnologie assistive. La didascalia ha senso senza immagine?</p><p>${why.fix}Se no, aggiungi alt per ciò che la didascalia non copre.</p><div class="why"><p>Suggerimento: immagini, alt e didascalie lavorano insieme.</p></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Modifica l’alt per descrivere la <em>significatività</em> visiva.</p><div class="why"><p>Suggerimento: didascalie = contesto; alt = descrizione per chi non vede.</p></div>`,

	LABELS_ARIA_LABEL_INPUT: `<p><strong {B}>Etichetta invisibile del campo:</strong> <strong {C}>%(TEXT)</strong></p><p>Assicurati che esista un’etichetta visibile, che resti tale mentre si digita, e che corrisponda al nome accessibile.</p><div class="why"><p>Etichettare solo con <em>placeholder</em>/<em>title</em> fa scomparire le etichette al primo input, complicando la verifica.</p></div>`,

	LABELS_INPUT_RESET: `<p>I pulsanti “Reimposta” si attivano facilmente per errore e possono far perdere dati.</p><p>${why.fix}Se non reimposta un singolo campo, rimuovilo o richiedi conferma.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'Il pulsante‑immagine non ha alt. Aggiungi un alt (es. <em>Cerca</em>, <em>Invia</em>).',

	LABELS_MISSING_LABEL: 'Nessuna etichetta associata. Aggiungi <code>id</code> al campo e <code>for</code> corrispondente alla label.',

	LABELS_NO_FOR_ATTRIBUTE: 'Nessuna label associata. Aggiungi <code>for</code> alla label che corrisponda all’<code>id</code> del campo.<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>Il placeholder scompare mentre si digita e spesso ha basso contrasto o somiglia a contenuto reale.</p><p>${why.fix}Mantieni visibili informazioni chiave (etichetta, aiuto, formati).</p>`,

	LABEL_IN_NAME: `<p>Il testo visibile non coincide con il nome accessibile, confondendo screen reader e controllo vocale.</p><p>${why.check}L’etichetta visibile deve iniziare con il nome accessibile e non aggiungere significato extra.</p><p><strong>Nome accessibile:</strong> “%(TEXT)”</p>`,

	LINK_ALT_FILE_EXT: `<p>L’alt contiene “%(alt)”, probabilmente un nome file, non una destinazione significativa.</p><p>${why.fix}Imposta l’alt sul nome della destinazione.</p><div class="why"><p>L’alt deve rendere la <em>destinazione</em> per immagini‑link:</p><ul><li>“Pagina con testo” descrive l’immagine, non il link.</li><li>“IMG_1234.jpg” è un file.</li><li>“<strong><em>Modulo di registrazione (doc)</em></strong>” è una destinazione.</li></ul></div>`,

	LINK_ALT_MAYBE_BAD: `<p>L’alt è un segnaposto: “<strong>%(alt)</strong>”.</p><p>${why.fix}Imposta l’alt sulla destinazione del link.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>L’alt per l’immagine linkata contiene solo simboli/spazi: “%(ALT_TEXT)”.</p><p>${why.fix}Usa un alt che descriva destinazione o scopo del link.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `“Clicca qui” è ridondante e non comunica lo scopo.`,

	LINK_DOI: `<p>${why.fix}Collega il titolo dell’articolo e lascia il DOI in testo semplice.</p><div class="why"><p>I link descrittivi aiutano gli utenti a scansionare e i lettori a pronunciare testi significativi.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Aggiungi testo descrittivo o elimina il link se è un errore (p.es. spazio linkato).</p><div class="why"><p>I link vuoti producono silenzio o lettura dell’URL.</p><p>Gli spazi linkati possono richiedere riscrittura del testo circostante.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p><code>aria-labelledby</code> non corrisponde a nessun <code>ID</code>.</p><p>${why.fix}Fornisci un ID valido o rimuovi l’attributo.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Aggiungi un testo descrittivo o elimina il link.</p><div class="why"><p>I link vuoti non sono annunciabili.</p><p>Spesso va riscritto il testo intorno.</p></div>`,

	LINK_FILE_EXT: `<p>Il link punta a un file (PDF, MP3, ZIP, Word, …) senza avviso.</p><p>${why.fix}Indica nel link il tipo di file (testo/icone; vedi https://itmaybejj.github.io/linkpurpose/)</a>.</p><p class="why">Per file grandi, indica la dimensione, es. “Rapporto (PDF, 3 MB)”.</p>`,

	LINK_IDENTICAL_NAME: `<p>Più link con destinazioni diverse usano lo stesso testo: “<strong>%(TEXT)</strong>”.</p><p>${why.fix}Rendi i testi unici e allineati alla destinazione.</p>${why.links}`,

	LINK_IMAGE_ALT: `Assicurati che l’alt descriva la destinazione del link:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Controlla che aiuti a descrivere la destinazione, senza ridondanza:</p><p><strong class="badge">Alt</strong> “<em><strong>%(alt)</strong></em>”</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p>https://webaim.org/techniques/hypertext/link_text#alt_linkL’alt di immagini‑link descrive la destinazione</a>. Alt lunghi indicano spesso che si descrive l’immagine, non la destinazione.</p>Alt: %(altLength) caratteri. <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Se un link contiene un’immagine, il suo alt https://webaim.org/techniques/hypertext/link_text#alt_linkfunge da etichetta del link</a>.</p><p>${why.fix}Imposta l’alt su destinazione o scopo del link.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'L’immagine è marcata come decorativa, ma il link usa il testo circostante come etichetta.',

	LINK_NEW_TAB: `<p>${why.fix}Apri nella stessa scheda o https://itmaybejj.github.io/linkpurpose/avvisa prima</a>.</p><div class="why"><p>Aprire forzatamente in una nuova scheda può confondere (es. “indietro” inatteso).</p><p>Nei moduli è spesso un’eccezione per evitare perdita dati.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>L’alt dell’immagine linkata è un segnaposto: “<strong>%(alt)</strong>”.</p><p>${why.fix}Imposta l’alt sulla destinazione.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Il link contiene testo non utile a descrivere la destinazione:<br><strong>%(text)</strong></p><p>${why.fix}Riscrivi in modo conciso e descrittivo.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>Esiste un nome ARIA, ma il testo visibile è generico: “<strong {C}>%(ERROR)</strong>”.</p><p>${why.fix}Scrivi testi visibili significativi e allineali al nome accessibile.</p>${why.links}`,

	LINK_SUS_ALT: `<p>L’alt contiene “%(alt)”; di solito indica che non descrive la destinazione.</p><strong class="badge">Testo alternativo</strong> “%(ALT_TEXT)”<p>Correzione: assicurati che l’alt descriva destinazione/scopo del link.<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Evita simboli come call‑to‑action nel link, salvo siano nascosti all’AT. Possono essere letti in modo confuso. Valuta la rimozione: <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Sostituisci l’URL con titolo o scopo del link.</p><div class="why"><p>Gli utenti — in particolare chi usa screen reader — scansionano i link per nome.</p><p>Gli URL come testo link sono difficili da scansionare/ricercare.</p></div>`,

	META_LANG: `<p>${why.fix}Aggiungi l’https://www.w3.org/International/questions/qa-html-language-declarationsattributo di lingua</a> al tag HTML.</p><div class="why"><p>I lettori di schermo impostano la pronuncia dalla lingua; una lingua errata produce pronuncia confusa.</p></div>`,

	META_MAX: `<p>Questo meta limita lo zoom del testo.</p><p>${why.fix}Rimuovilo/modificalo per consentire lo zoom completo.</p>`,

	META_REFRESH: `<p>Il refresh via meta interrompe l’utente e può azzerare moduli.</p><p>${why.fix}Usa AJAX/JS con avviso e possibilità di rinviare.</p>`,

	META_SCALABLE: `<p>Questo meta impedisce lo zoom.</p><p>${why.fix}Consenti lo zoom rimuovendo/modificando il parametro.</p>`,

	META_TITLE: `<p>${why.fix}Aggiungi <code><title></code> in <code><head></code>.</p><div class="why"><p>Un https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/titletitolo breve e unico</a> è fondamentale:</p><ul><li>Nei risultati di ricerca</li><li>Nelle schede del browser</li><li>Annunciato dai lettori di schermo al cambio scheda</li></ul><p>Senza titolo, si vede/sente un URL grezzo.</p></div>`,

	MISSING_ALT: `<p>In assenza di alt, gli screen reader leggono l’URL dell’immagine.</p><p>${why.fix}Aggiungi alt="" per immagini decorative o un alt descrittivo per quelle informative.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Con immagini linkate senza alt, gli screen reader leggono l’URL — particolarmente problematico.</p><p>${why.fix}Aggiungi alt in linea con la destinazione.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>L’immagine è parte di un link con testo. Se il testo visibile descrive la destinazione, usa alt=""; altrimenti, fornisci un alt descrittivo.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>Il link sembra puntare a un ambiente di sviluppo:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Usa un percorso relativo (/cartella) o l’URL pubblico.</p>`,

	QA_BLOCKQUOTE: `<p><code>blockquote</code> fa annunciare “citazione”. Spesso le citazioni brevi sono intestazioni formattate male.</p><p>${why.fix}Se è un’intestazione, usa lo stile di intestazione.</p>${why.headings}`,

	QA_DOCUMENT: `<p>I documenti linkati sono contenuti web e devono essere accessibili. Verifica intestazioni, intestazioni di tabella e alt immagini; poi chiudi l’avviso.</p><ul class="why"><li>Rendere accessibili i https://support.google.com/docs/answer/6199477?hl=itdocumenti Google Workspace</a>.</li><li>Rendere accessibili i https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155documenti Office</a>.</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}Se questa riga in grassetto introduce un argomento, usa una vera intestazione.</p><div class="why"><p>Suggerimento: le intestazioni creano un sommario navigabile per l’AT.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Se “%(text)” fa parte di un elenco, usa la formattazione di elenco.</p><div class="why"><p>Gli elenchi hanno struttura visiva e semantica:</p><ol><li>Rientri uniformi migliorano la leggibilità.</li><li>I lettori annunciano la posizione (“elemento 3 di 7”).</li></ol><p>Un paragrafo che inizia con un numero non è un elenco reale.</p></div>`,

	QA_IN_PAGE_LINK: `<p>La destinazione del link non corrisponde a nessun elemento in pagina.</p><div class="why"><p>Nota dev: se è un handler JS, verifica anche l’uso da tastiera prima di escludere il controllo.</p></div>`,

	QA_JUSTIFY: `<p>La giustificazione inserisce spazi irregolari che ostacolano la lettura.</p><p>${why.fix}Usa allineamento a sinistra.</p>`,

	QA_NESTED_COMPONENTS: 'Evita componenti interattive annidate (accordion in accordion, tab in accordion): complicano la navigazione e possono far perdere contenuto.',

	QA_PDF: `<p>${why.fix}Esegui una delle azioni seguenti e chiudi l’avviso:</p><ul><li>Collega a una pagina web;</li><li>oppure fornisci anche una versione web/modificabile;</li><li>oppure verifica che il PDF sia taggato (intestazioni, ordine, tabelle, alt).</li></ul><div class="why"><p>Molti utenti — specialmente su mobile e con AT — preferiscono pagine web ai PDF.</p></div>`,

	QA_SMALL_TEXT: 'Il testo troppo piccolo è difficile da leggere; evita dimensioni inferiori al predefinito.',

	QA_STRONG_ITALICS: `<p>${why.fix}Riserva grassetto/corsivo a poche parole o frasi chiave.</p><div class="why"><p>Nota: per citazioni utilizza <code>blockquote</code>.</p></div>`,

	QA_SUBSCRIPT: `Apice/pedice riducono la leggibilità: usali solo quando necessario (4<sup>º</sup>, H<sub>2</sub>O, note).`,

	QA_UNDERLINE: `<p>Nel web, sottolineato significa “link”. Gli utenti lo considereranno cliccabile.</p><p>${why.fix}Usa <strong>grassetto</strong> o <em>corsivo</em> e intestazioni per nuove sezioni.</p><div class="why"><p>I lettori non annunciano la formattazione visiva; la struttura la danno le intestazioni.</p></div>`,

	QA_UPPERCASE: `<p>BLOCCHI IN MAIUSCOLO SONO PIÙ DIFFICILI DA LEGGERE E POSSONO SEMBRARE “URLO”.</p><p>${why.fix}Evidenzia poche parole alla volta, preferibilmente con grassetto.</p><div class="why"><p>I lettori non annunciano il grassetto; per nuovi argomenti usa un’intestazione.</p></div>`,

	SUS_ALT: `<p>L’alt contiene “%(alt)”, probabilmente ridondante:</p><p><strong class="badge">Testo alternativo</strong> “%(ALT_TEXT)”</p><p>Correzione: rendilo conciso e informativo.</p><div class="why"><p>I lettori annunciano già “immagine”; “immagine/foto di…” è spesso superfluo.</p></div>`,

	TABINDEX_ATTR: `<p>${why.fix}Non usare tabindex > “0”. Ordina gli elementi nel markup affinché ordine di tab, visivo e di lettura coincidano.</p><div class="why"><p>In genere i tre ordini coincidono.</p><p>Un tabindex positivo cambia solo l’ordine di tab, non quello visivo: confonde.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Ogni cella d’intestazione deve contenere testo.</p><div class="why"><p>Suggerimento: i lettori usano le intestazioni per orientarsi nelle tabelle.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Indica nelle proprietà della tabella dove si trovano le intestazioni (prima riga/colonna o entrambe).</p><div class="why"> <p>I lettori ripetono l’intestazione pertinente entrando in ogni riga/colonna.</p><p>Se la tabella è solo per layout, rimuovi il formato tabellare.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Rimuovi l’intestazione di contenuto (h2, h3) dalla tabella. Usa intestazioni di riga/colonna; per più livelli, dividi in più tabelle.</p><div class="why"> <p>Le intestazioni di tabella sono direzionali (riga/colonna). Le intestazioni di contenuto etichettano tutto ciò che segue.</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Un’<strong>intestazione di tabella</strong> in cella 2 etichetta la cella B. <br><br> Un’<strong>intestazione di contenuto</strong> in cella 2 etichetta 3, A, B, C oltre a questo testo e al piè del tooltip.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,
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
	NOT_VISIBLE: 'Nota: questo contenuto potrebbe non essere visibile. Cercalo nel riquadro evidenziato.',
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
	dismissalsHeader: 'Non intendi correggerlo?',
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
	panelCheckAltText: `<p class="ed11y-small">Verifica che ogni immagine esprima il proprio significato nel contesto e che non ci siano immagini con testo incorporato.</p>`,
	panelCheckOutline: `<p class="ed11y-small">Mostra la struttura delle intestazioni. Verifica che corrisponda all’organizzazione visiva.</p>`,
	PANEL_HEADING_MISSING_ONE: 'Intestazione di livello 1 mancante.',
	PANEL_NO_HEADINGS: 'Nessuna intestazione trovata.',
	reportsLink: 'Apri i rapporti del sito',
	toggleDisabled: 'Nessun contenuto disponibile per la verifica di Editoria11y.',
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
