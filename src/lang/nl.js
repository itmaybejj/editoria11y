import {default as Sa11yStrings} from '../sa11y-lang/nl.js';

// todo check each file for link integrity, and escaping of tags in code blocks.
const testNames = {
	ALT_FILE_EXT: 'Deze alt‑tekst is een bestandsnaam, geen beschrijving',
	ALT_MAYBE_BAD: 'Deze alt‑tekst kan voor een schermlezer lastig correct uit te spreken zijn',
	ALT_PLACEHOLDER: 'Deze alt‑tekst is een betekenisloze placeholder',
	ALT_UNPRONOUNCEABLE: 'Deze alt‑tekst is niet uit te spreken',
	BTN_EMPTY: 'Knop mist een toegankelijke label',
	BTN_EMPTY_LABELLEDBY: 'Knop heeft een ongeldig ARIA‑label',
	BTN_ROLE_IN_NAME: 'De knopnaam herhaalt het woord “button”',
	CONTRAST_ERROR: 'Tekst heeft onvoldoende contrast om goed leesbaar te zijn',
	CONTRAST_ERROR_GRAPHIC: 'Afbeelding of pictogram heeft onvoldoende contrast',
	CONTRAST_INPUT: 'Invoerveld heeft onvoldoende contrast om goed leesbaar te zijn',
	CONTRAST_PLACEHOLDER: 'Placeholder‑tekst heeft onvoldoende contrast om goed leesbaar te zijn',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Heeft deze placeholder‑tekst voldoende contrast?',
	CONTRAST_WARNING: 'Heeft deze tekst voldoende contrast?',
	CONTRAST_WARNING_GRAPHIC: 'Heeft deze afbeelding of dit pictogram voldoende contrast?',
	DUPLICATE_ID: 'Dubbel ID‑attribuut',
	DUPLICATE_TITLE: 'Deze link heeft een tooltip met dezelfde tekst als de linktekst',
	EMBED_AUDIO: 'Heeft deze audio een transcriptie?',
	EMBED_DATA_VIZ: 'Is deze visualisatie toegankelijk?',
	EMBED_GENERAL: 'Ingebedde iframe‑elementen vereisen handmatige controle',
	EMBED_MISSING_TITLE: 'Frame mist een “title”‑attribuut',
	EMBED_UNFOCUSABLE: 'Frame met tabindex="‑1" is niet toetsenbordtoegankelijk',
	EMBED_VIDEO: 'Heeft deze video correcte ondertiteling?',
	HEADING_EMPTY: 'Deze kop heeft geen tekst',
	HEADING_EMPTY_WITH_IMAGE: 'Deze afbeelding wordt als kop gebruikt en heeft daarom alt‑tekst nodig',
	HEADING_FIRST: 'De eerste kop op deze pagina is een subkop',
	HEADING_LONG: 'Kan deze kop korter?',
	HEADING_MISSING_ONE: 'Op deze pagina ontbreekt een kop van niveau 1',
	HEADING_SKIPPED_LEVEL: 'Deze kop heeft een onjuist niveau',
	HIDDEN_FOCUSABLE: 'Dit element kan niet door schermlezers worden beschreven',
	IMAGE_ALT_TOO_LONG: 'Kan deze alt‑tekst korter?',
	IMAGE_DECORATIVE: 'Is deze afbeelding werkelijk alleen decoratief?',
	IMAGE_DECORATIVE_CAROUSEL: 'Afbeelding in een carrousel of galerij is als decoratief gemarkeerd',
	IMAGE_FIGURE_DECORATIVE: 'Handmatige controle: afbeelding met bijschrift zonder alt‑tekst',
	IMAGE_FIGURE_DUPLICATE_ALT: 'Alt‑tekst mag niet identiek zijn aan het bijschrift',
	LABELS_ARIA_LABEL_INPUT: 'Is er een zichtbare label voor dit veld?',
	LABELS_PLACEHOLDER: 'Handmatige controle: placeholder‑tekst',
	LABELS_INPUT_RESET: 'Is deze resetknop nodig?',
	LABEL_IN_NAME: 'Zichtbare label komt niet overeen met de toegankelijke naam',
	LINK_ALT_FILE_EXT: 'Alt‑tekst die als link wordt gebruikt, mag geen URL zijn',
	LINK_ALT_MAYBE_BAD: 'Deze gekoppelde alt‑tekst kan lastig worden uitgesproken door een schermlezer',
	LINK_ALT_UNPRONOUNCEABLE: 'Gekoppelde afbeeldingen moeten uitspreekbare alt‑tekst hebben',
	LINK_CLICK_HERE: 'Handmatige controle: link bevat “klik hier”',
	LINK_DOI: 'Link artikeltitels, niet DOI‑nummers',
	LINK_EMPTY: 'Deze link heeft geen tekst',
	LINK_EMPTY_LABELLEDBY: 'Link heeft een ongeldig “aria‑labelledby”‑attribuut',
	LINK_EMPTY_NO_LABEL: 'Deze link heeft een label nodig',
	LINK_FILE_EXT: 'Link verwijst naar een bestand zonder dat dit vooraf wordt vermeld',
	LINK_IDENTICAL_NAME: 'Beschrijft deze link zijn bestemming op unieke wijze?',
	LINK_IMAGE_ALT: 'Handmatige controle: gekoppelde afbeelding met alt‑tekst',
	LINK_IMAGE_ALT_AND_TEXT: 'Heeft deze alt‑tekst betekenis in de context van deze link?',
	LINK_IMAGE_LONG_ALT: 'Kan de alt‑tekst van het linkbeeld korter?',
	LINK_IMAGE_NO_ALT_TEXT: 'Deze gekoppelde afbeelding heeft alt‑tekst nodig',
	LINK_IMAGE_TEXT: 'Handmatige controle: afbeelding in een link is als decoratief gemarkeerd',
	LINK_NEW_TAB: 'Opent deze link een nieuw tabblad zonder waarschuwing?',
	LINK_PLACEHOLDER_ALT: 'Deze gekoppelde afbeelding heeft betekenisvolle alt‑tekst nodig',
	LINK_STOPWORD: 'Beschrijft deze link zijn bestemming?',
	LINK_STOPWORD_ARIA: 'Zinvolle linktekst is alleen beschikbaar via ARIA voor schermlezers',
	LINK_SUS_ALT: 'Beschrijft deze alt‑tekst de afbeelding of de link?',
	LINK_SYMBOLS: 'Handmatige controle: zijn de symbolen of emoji’s in deze link betekenisvol?',
	LINK_URL: 'Linktekst mag geen URL zijn',
	META_LANG: 'Meta‑tag voor paginataal ontbreekt',
	META_MAX: 'Meta‑tag beperkt hoeveel gebruikers kunnen inzoomen op tekst',
	META_REFRESH: 'Meta‑tag ververst de pagina automatisch',
	META_SCALABLE: 'Meta‑tag verhindert dat gebruikers tekst vergroten',
	META_TITLE: 'Meta‑tag voor paginatitel ontbreekt',
	MISSING_ALT: 'Ongeldige HTML: afbeelding zonder alt‑attribuut',
	MISSING_ALT_LINK: 'Ongeldige HTML: gekoppelde afbeelding zonder alt‑attribuut',
	MISSING_ALT_LINK_HAS_TEXT: 'Ongeldige HTML: afbeelding in link zonder alt‑attribuut',
	QA_BAD_LINK: 'Handmatige controle: linkdoel is mogelijk ongeldig',
	QA_BLOCKQUOTE: 'Moet dit citaat een kop zijn?',
	QA_DOCUMENT: 'Is dit document juist getagd voor schermlezers?',
	QA_FAKE_HEADING: 'Moet deze vetgedrukte tekst een kop zijn?',
	QA_FAKE_LIST: 'Moet dit als lijst worden opgemaakt?',
	QA_IN_PAGE_LINK: 'Interne link werkt niet',
	QA_JUSTIFY: 'Gelieve geen uitgevulde tekst (links‑ en rechtsuitlijning) te gebruiken',
	QA_NESTED_COMPONENTS: 'Geneste interactieve componenten',
	QA_PDF: 'Is er een alternatief voor deze PDF?',
	QA_SMALL_TEXT: 'Tekst is te klein',
	QA_STRONG_ITALICS: 'Grote blokken benadrukte (vet/cursief) tekst zijn moeilijker te lezen',
	QA_SUBSCRIPT: 'Gelieve subscript/superscript niet te gebruiken als loutere visuele opmaak',
	QA_UNDERLINE: 'Alleen links mogen onderstreept zijn',
	QA_UPPERCASE: 'Is deze tekst in hoofdletters noodzakelijk?',
	SUS_ALT: 'Bevat deze alt‑tekst overbodige woorden?',
	TABINDEX_ATTR: 'Het tabindex‑attribuut kan de leesvolgorde verstoren',
	TABLES_EMPTY_HEADING: 'Deze tabelkopcel heeft tekst nodig',
	TABLES_MISSING_HEADINGS: 'Deze tabel mist een koprij en/of kolomkoppen',
	TABLES_SEMANTIC_HEADING: 'Inhoudelijke koppen horen niet binnen tabellen',
	UNCONTAINED_LI: 'Ongeldige HTML‑lijst',
};

const why = {
	fix: `<strong class="badge">Oplossen</strong>`,
	check: `<strong class="badge">Handmatige controle</strong>`,

	buttons: `<div class="why"><p>Opmerking: de toegankelijke naam van een knop moet duidelijk maken wat deze doet. Knoppen die na een klik van toestand veranderen, dienen ook hun naam aan te passen:</p><ul>
<li>Veranderende labels:<br>“Afspelen/Pauzeren”, “Details tonen/Details verbergen”</li>
<li>Veranderende https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_propertiesstatusattributen</a>:<br>“Afspelen/Afspelen, ingedrukt”, “Details, samengevouwen/Details, uitgevouwen”.</li>
</ul>
<p>Wijzig alstublieft niet tegelijk zowel het label als het statusattribuut. “Afspelen” veranderen in “Pauzeren, ingedrukt” betekent dat de speler gepauzeerd is — niet dat deze afspeelt.</p></div>`,

	headings: `<div class="why"><p>Tip: koppen en subkoppen brengen inhoud onder in een hiërarchische structuur. Schermlezers vertrouwen hierop om pagina’s te begrijpen en te navigeren:</p>
<ul><li>Kopniveau 1: paginatitel
<ul><li>Kopniveau 2: hoofdonderwerpen
<ul><li>Kopniveau 3: subonderwerpen</li></ul></li></ul></li></ul></div>`,

	images: `<div class="why"><p>Tip: beschrijf in de alt‑tekst wat een afbeelding <em>betekent</em> in de context — niet alleen wat erop te zien is. Een foto van een kind dat een bal schopt kan, afhankelijk van de context, betekenen:</p>
<ul><li>Er werd doorgespeeld in de stromende regen.</li>
<li>De nieuwe teamshirts hebben coole drakenlogo’s.</li>
<li>Zij scoorde het winnende doelpunt vanaf de linkerzijlijn!</li></ul></div>`,

	links: `<div class="why"><p>Gebruikers scannen vaak op linkteksten en zoeken op naam. Effectieve links zijn betekenisvol, uniek en beknopt:</p>
<ul>
<li>Ideaal: “Lees meer over https://webaim.org/techniques/hypertext/link_textbetekenisvolle links</a>”.</li>
<li>Niet uniek: “Klik https://webaim.org/techniques/hypertext/link_texthier</a> om meer te leren …”.</li>
<li>Niet beknopt: “https://webaim.org/techniques/hypertext/link_textKlik hier om meer te leren over betekenisvolle links</a>”.</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>Het doel van alt‑tekst is de <em>betekenis</em> van een afbeelding over te brengen, niet enkel de inhoud. Bij een gekoppelde afbeelding is die betekenis de linkbestemming:</p>
<ul>
<li>“<em>Vergrootglas</em>” beschrijft de afbeelding, niet de link.</li>
<li>“<em>Zoek‑vergrootglas</em>” is dubbelzinnig.</li>
<li>“<em>Zoeken</em>” beschrijft de linkbestemming correct.</li>
</ul></div>`,
};

export const tips = {
	ALT_FILE_EXT: `<p>Schermlezers lezen deze URL voor, vaak letter voor letter. Dat geeft niet dezelfde betekenis als de afbeelding bekijken.</p><p>${why.fix}Voeg een lege alt toe (alt="") als dit louter decoratief is en genegeerd mag worden, of voeg een beschrijvende alt‑tekst toe.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Opgegeven beschrijving van deze afbeelding: <strong>"%(alt)"</strong></p><p>${why.fix}Stel een beknopte alt‑tekst in die weergeeft wat deze afbeelding in deze context betekent.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Opgegeven beschrijving van deze afbeelding: <strong>"%(alt)"</strong></p><p>${why.fix}Stel een beknopte alt‑tekst in die weergeeft wat deze afbeelding in deze context betekent.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>De alt‑tekst “%(alt)” bevat alleen niet‑uitspreekbare tekens en/of spaties. Schermlezers kondigen dan “afbeelding” aan en vallen stil: “afbeelding: ____”.</p><p>${why.fix}Voeg een beschrijvende alt‑tekst toe, of gebruik alt="" als het om een te negeren pictogram/decoratie gaat.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Zorg voor een toegankelijke knopnaam via tekst, alt‑tekst op het pictogram, of een <code>title</code>‑attribuut.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Het <code>aria-labelledby</code> attribuut verwijst naar een lege of ongeldige <code>ID</code>.</p><p>${why.fix}Verwijs naar een geldige ID, of verwijder het attribuut en voorzie de knop van een andere toegankelijke naam.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'Een achtergrondafbeelding of verloop verhindert een zekere bepaling van de achtergrondkleur. Gebruik de kleurenkiezer hieronder voor handmatige controle.',

	DUPLICATE_ID: `<p>Op deze pagina worden ID’s gebruikt als labels of linkdoelen en moeten daarom uniek zijn.</p><p>${why.fix}Wijzig deze ID: <strong>#%(id)</strong></p><div class="why"><p>In veel CMS’en komt dit uit een veld “name” of “id”. In HTML is het een attribuut: <code>&lt;a id=""></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Verwijder het <code>title</code>‑attribuut van deze link.</p><div class="why"><p>Opmerking: <code>title</code>‑tooltips verschijnen alleen bij muis‑hover; op mobiel of met toetsenbord zijn ze niet zichtbaar en mogen geen essentiële informatie bevatten.</p></div>`,

	EMBED_AUDIO: `<p>Als audio spraak bevat, voorzie dan een https://www.w3.org/WAI/media/av/transcribing/tekstalternatief</a> op de pagina of via een link.</p><p>Automatisch gegenereerde ondertitels/transcripten moeten handmatig worden nagekeken (sprekers, betekenisvolle geluiden).</p>`,

	EMBED_DATA_VIZ: `<p>Ingebedde visualisaties zijn vaak moeilijk te bedienen met hulpmiddelen, lastig te begrijpen voor slechtzienden of kleurenblinden en vragen op mobiel soms horizontaal scrollen.</p><p>${why.fix}Tenzij er hoog contrast is, volledige toetsenbordbediening <strong><em>én</em></strong> schermlezerbeschrijving mogelijk is, biedt u een gelijkwaardig alternatief (tekstbeschrijving, datatabel, download) en sluit u de waarschuwing.</p>`,

	EMBED_GENERAL: 'Automatische controles zien de inhoud binnen embeds niet. Zorg dat afbeeldingen alt hebben, video’s ondertiteld zijn, tekst voldoende contrast heeft en links/knoppen https://webaim.org/techniques/keyboard/toetsenbordtoegankelijk</a> zijn. Daarna kunt u deze melding sluiten.',

	EMBED_MISSING_TITLE: `<p>Een embedded element heeft een toegankelijke naam nodig die de inhoud beschrijft.</p><p>${why.fix}Voorzie een unieke <code>title</code> of <code>aria-label</code>.</p>`,

	EMBED_UNFOCUSABLE: `Dit attribuut laat toetsenbord en hulpmiddelen het element overslaan. Als de iframe inhoud links/knoppen/formulieren bevat of scrollbaar is, verwijdert u dit attribuut.`,

	EMBED_VIDEO: `<p>Video’s moeten ondertiteld zijn.</p><p>Automatische ondertitels moeten worden nagekeken (sprekers, betekenisvolle geluiden).</p><p>${why.fix}Voeg ondertitels toe of corrigeer ze en sluit de melding.</p>`,

	HEADING_EMPTY: `<p>Lege koppen veroorzaken gaten in de documentstructuur.</p><p>${why.fix}Voeg tekst toe of verwijder de lege regel.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Lege koppen veroorzaken gaten in de structuur.</p><p>${why.fix}Als dit geen kop is, wijzig de opmaak van <strong {C}>Kop %(level)</strong> naar <strong>Alinea</strong>. Is het wel een kop, beschrijf dan de betekenis van de afbeelding in de alt‑tekst.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Zorg ervoor dat de paginatitel is gemarkeerd als Kop 1 of Kop 2. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}Tenzij het om een vaste titel gaat (bv. publicatie), verkort de kop voor betere scanbaarheid.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Markeer de paginatitel als kopniveau 1 om het begin van de structuur aan te geven.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Deze kop springt van <strong>niveau %(prevLevel)</strong> naar <strong>niveau %(level)</strong>. Voor schermlezers klinkt dit alsof er inhoud ontbreekt.</p><p>${why.fix}Pas de niveaus aan zodat de structuur logisch blijft.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: `Dit interactieve element heeft <code>aria-hidden="true"</code>, maar kan nog steeds focussen. Als u het echt wilt verbergen voor schermlezers, voeg dan <code>tabindex="-1"</code> toe; anders verwijdert u <code>aria-hidden</code>.`,

	IMAGE_ALT_TOO_LONG: `<p>Schermlezers lezen alt‑tekst als één doorlopende zin. Wie iets mist, moet opnieuw luisteren.</p><p>Lengte van de alt‑tekst: %(altLength) tekens. <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Tip: complexe afbeeldingen hebben vaak een <strong>zichtbaar</strong> bijschrift/tekst en de alt mag daarnaar verwijzen:</p><ul><li>“Poster voor het bal op vrijdag; zie bijschrift voor details.”</li><li>“Grafiek: dit jaar −10% meldingen; zie tabel.”</li></ul></div>`,

	IMAGE_DECORATIVE: `<p>Deze afbeelding is verborgen voor schermlezers met een lege alt. Alleen betekenisloze decoraties mogen zo worden verborgen.</p><p>${why.fix}Als de afbeelding betekenis heeft, voeg dan alt‑tekst toe.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'Afbeelding is gemarkeerd als <strong>decoratief</strong>, maar in carrousels/galerijen dienen afbeeldingen een beschrijvende alt‑tekst te hebben.',

	IMAGE_FIGURE_DECORATIVE: `<p>Deze afbeelding wordt genegeerd door hulpmiddelen. Is het bijschrift zonder de afbeelding voldoende?</p><p>${why.fix}Als niet, voeg alt‑tekst toe voor de visuele informatie die het bijschrift niet dekt.</p><div class="why"><p>Tip: afbeelding, alt‑tekst en bijschrift werken samen:</p><ul><li>Bijschrift geeft context/duiding.</li><li>Alt‑tekst beschrijft de afbeelding voor wie deze niet ziet.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Wijzig de alt‑tekst zodat deze de visuele betekenis beschrijft (geen kopie van het bijschrift).</p><div class="why"><p>Tip: afbeelding, alt‑tekst en bijschrift vullen elkaar aan:</p><ul><li>Bijschrift biedt context.</li><li>Alt‑tekst beschrijft het beeld voor wie het niet ziet.</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: `<p><strong {B}>Onzichtbare veldlabel:</strong> <strong {C}>%(TEXT)</strong></p><p>Controleer of er een zichtbare label is, of deze zichtbaar blijft bij invoer én overeenkomt met de toegankelijke naam.</p><div class="why"><p>Labels die alleen als <em>title</em> of <em>placeholder</em> verschijnen, verdwijnen bij typen en bemoeilijken controle en consistentie.</p></div>`,

	LABELS_INPUT_RESET: `<p>Resetknoppen worden snel per vergissing geactiveerd en kunnen tot gegevensverlies leiden.</p><p>${why.fix}Tenzij slechts één veld wordt gereset, verwijdert u de knop of vraagt u eerst om bevestiging.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'De afbeeldingsknop mist alt‑tekst. Voeg een functie‑label toe, zoals <em>Zoeken</em> of <em>Verzenden</em>.',

	LABELS_MISSING_LABEL: 'Aan dit invoerveld is geen label gekoppeld. Voeg een <code>id</code> toe en koppel met een <code>for</code> op het label.',

	LABELS_NO_FOR_ATTRIBUTE: 'Aan dit veld is geen label gekoppeld. Voorzie het label van een <code>for</code> dat overeenkomt met de <code>id</code> van het veld.<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>Placeholder‑tekst verdwijnt zodra iemand begint te typen, heeft vaak gering contrast of lijkt op inhoud.</p><p>${why.fix}Zorg dat label, hulp‑ en vormeisen zichtbaar blijven, ook wanneer het veld gevuld is.</p>`,

	LABEL_IN_NAME: `<p>De zichtbare tekst wijkt af van de toegankelijke naam. Dat kan schermlezergebruikers verwarren en spraakbediening belemmeren.</p><p>${why.check}Zorg dat de zichtbare label begint met de toegankelijke naam en geen extra betekenis toevoegt.</p><p><strong>Onzichtbare label:</strong> “%(TEXT)”</p>`,

	LINK_ALT_FILE_EXT: `<p>De alt‑tekst bevat “%(alt)”, vermoedelijk een bestandsnaam, geen linkbestemming.</p><p>${why.fix}Stel de alt‑tekst in op de naam/het doel van de link.</p><div class="why"><p>Alt‑tekst draagt betekenis; bij een linkbeeld is dat de bestemming:</p><ul><li>“Pagina met tekst” beschrijft het beeld.</li><li>“IMG_1234.jpg” is slechts een bestandsnaam.</li><li>“<strong><em>Aanmeldingsformulier (doc)</em></strong>” beschrijft het doel.</li></ul></div>`,

	LINK_ALT_MAYBE_BAD: `<p>Alt‑tekst is een placeholder: “<strong>%(alt)</strong>”.</p><p>${why.fix}Stel de alt‑tekst in op de linkbestemming.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>De alt‑tekst “%(ALT_TEXT)” bestaat uit niet‑uitspreekbare tekens/spaties; het linkdoel kan niet worden aangekondigd.</p><p>${why.fix}Beschrijf de linkbestemming of functie in de alt‑tekst.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `Gebruik alstublieft geen “klik hier”: het doel blijft zo onduidelijk.`,

	LINK_DOI: `<p>${why.fix}Link de artikeltitel en geef de DOI in platte tekst; link niet de DOI zelf.</p><div class="why"><p>Beschrijvende links zijn makkelijker te scannen en helpen schermlezers betekenisvolle linknamen voor te lezen.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Voeg beschrijvende linktekst toe of verwijder de link wanneer deze per ongeluk is ontstaan (bijv. gekoppelde spatie).</p><div class="why"><p>Lege links leiden tot stilte of letterlijke URL‑opname.</p><p>Een gekoppelde spatie verwijderen kan soms herschrijven van omliggende tekst vereisen.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p><code>aria-labelledby</code> verwijst niet naar een geldige <code>ID</code> op de pagina.</p><p>${why.fix}Corrigeer de referentie of verwijder het attribuut.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Voeg beschrijvende linktekst toe of verwijder de lege link.</p><div class="why"><p>Lege links kunnen niet betekenisvol worden aangekondigd door schermlezers.</p></div>`,

	LINK_FILE_EXT: `<p>Deze link verwijst naar een bestand (bijv. PDF/MP3/ZIP/Word) zonder waarschuwing.</p><p>${why.fix}Geef in de linktekst het bestandstype aan (tekst/pictogram): https://itmaybejj.github.io/linkpurpose/</a>.</p><p class="why">Vermeld bij grote bestanden ook de grootte, bijvoorbeeld “Jaarverslag (PDF, 3 MB)”.</p>`,

	LINK_IDENTICAL_NAME: `<p>Meerdere links met verschillende bestemmingen gebruiken dezelfde tekst: “<strong>%(TEXT)</strong>”.</p><p>${why.fix}Herschrijf de linkteksten zodat iedere link zijn eigen bestemming uniek beschrijft.</p>${why.links}`,

	LINK_IMAGE_ALT: `Controleer of de alt‑tekst de linkbestemming beschrijft:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Gelieve te controleren of dit bijdraagt aan het beschrijven van de link, zonder overbodige informatie:</p><p><strong class="badge">Alt</strong> “<em><strong>%(alt)</strong></em>”</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p>https://webaim.org/techniques/hypertext/link_text#alt_linkDe alt‑tekst van een gekoppelde afbeelding dient de linkbestemming te beschrijven</a>. Lange alt‑teksten duiden vaak op beschrijving van het beeld i.p.v. het doel.</p>Deze alt‑tekst heeft %(altLength) tekens: <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Als een link een afbeelding bevat, wordt de alt‑tekst van die afbeelding https://webaim.org/techniques/hypertext/link_text#alt_linkde linknaam</a> voor schermlezers.</p><p>${why.fix}Beschrijf de linkbestemming of functie in de alt‑tekst.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'Afbeelding is als decoratief gemarkeerd, terwijl de omliggende tekst als linklabel dient.',

	LINK_NEW_TAB: `<p>${why.fix}Laat de link in hetzelfde tabblad openen of https://itmaybejj.github.io/linkpurpose/waarschuw vooraf</a> dat een nieuw tabblad wordt geopend.</p><div class="why"><p>Gebruikers kunnen zelf kiezen voor een nieuw tabblad; afdwingen werkt verwarrend (bijv. “terug” werkt anders).</p><p>Uitzondering: in formulieren worden links vaak in een nieuw tabblad geopend om verlies van invoer te voorkomen.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>Alt‑tekst is een placeholder: “<strong>%(alt)</strong>”.</p><p>${why.fix}Stel de alt‑tekst in op de linkbestemming.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>De link bevat tekst die niet helpt om de bestemming te beschrijven:<br><strong>%(text)</strong></p><p>${why.fix}Herschrijf naar korte, duidelijke doel‑ of functiebeschrijving.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>Er is een ARIA‑naam aanwezig, maar de zichtbare tekst is generiek: “<strong {C}>%(ERROR)</strong>”.</p><p>${why.fix}Zorg voor betekenisvolle zichtbare linktekst en laat die overeenkomen met de toegankelijke naam.</p>${why.links}`,

	LINK_SUS_ALT: `<p>De alt‑tekst bevat “%(alt)”, wat erop kan duiden dat de afbeelding (en niet de link) wordt beschreven.</p><strong class="badge">Alt‑tekst</strong> “%(ALT_TEXT)”<p>Oplossing: zorg dat de alt‑tekst het doel of de functie van de link beschrijft.<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Gebruik geen symbolen als call‑to‑action in linkteksten, tenzij ze voor hulpmiddelen verborgen zijn; schermlezers kunnen ze verwarrend oplezen. Overweeg te verwijderen: <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Gebruik de titel of het doel van de bestemming i.p.v. een URL als linktekst.</p><div class="why"><p>Gebruikers — zeker schermlezergebruikers — scannen links op naam.</p><p>URL’s als linktekst scannen en zoeken lastig.</p></div>`,

	META_LANG: `<p>${why.fix}Voeg een https://www.w3.org/International/questions/qa-html-language-declarationstaalattribuut</a> toe op het HTML‑element.</p><div class="why"><p>Schermlezers stemmen uitspraak af op de ingestelde taal; een verkeerde taal maakt voorlezen onduidelijk.</p></div>`,

	META_MAX: `<p>Deze meta‑tag beperkt inzoomen.</p><p>${why.fix}Sta volledige zoom toe door de beperking te wijzigen of te verwijderen.</p>`,

	META_REFRESH: `<p>Automatisch vernieuwen via meta onderbreekt het lezen en kan formuliervelden resetten.</p><p>${why.fix}Gebruik AJAX of JavaScript met voorafgaande melding en mogelijkheid tot uitstellen.</p>`,

	META_SCALABLE: `<p>Deze meta‑tag verhindert vergroten/zoomen.</p><p>${why.fix}Verwijder of wijzig deze instelling zodat zoom is toegestaan.</p>`,

	META_TITLE: `<p>${why.fix}Voeg een <code><title></code> toe in de <code><head></code>.</p><div class="why"><p>Een https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/titlekorte, unieke titel</a> is cruciaal: zoekresultaten, browsertabbladen en schermlezers gebruiken die.</p><p>Zonder titel ziet/hoort men alleen de ruwe URL.</p></div>`,

	MISSING_ALT: `<p>Zonder alt leest een schermlezer vaak de bestands‑URL letter voor letter voor.</p><p>${why.fix}Gebruik alt="" voor decoratieve beelden, of een beschrijvende alt‑tekst voor betekenisvolle beelden.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Bij een linkbeeld zonder alt leest de schermlezer de bestands‑URL — extra verwarrend.</p><p>${why.fix}Voorzie een alt‑tekst die het linkdoel beschrijft.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Deze afbeelding staat in een link met tekst. Als die tekst het doel volledig beschrijft, gebruik alt=""; anders, beschrijf in de alt‑tekst de bestemming/functie.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>De link lijkt naar een ontwikkelomgeving te verwijzen:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Gebruik een relatief pad (/map) of de publieke URL.</p>`,

	QA_BLOCKQUOTE: `<p><code>blockquote</code> vertelt hulpmiddelen dat het om een citaat gaat. Korte “citaten” zijn vaak eigenlijk koppen.</p><p>${why.fix}Als dit een kop is, gebruik dan kopopmaak zodat het in de structuur zichtbaar is.</p>${why.headings}`,

	QA_DOCUMENT: `<p>Gekoppelde documenten gelden als webinhoud en moeten toegankelijk zijn. Controleer op koppen, tabelkoppen en alt‑teksten en sluit daarna de melding.</p><ul class="why"><li>Maak uw https://support.google.com/docs/answer/6199477?hl=nlGoogle‑documenten</a> toegankelijk.</li><li>Maak uw https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155Office‑documenten</a> toegankelijk.</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}Als deze vetgedrukte regel een onderwerp inleidt, gebruik dan kopopmaak in plaats van alleen visuele nadruk.</p><div class="why"><p>Tip: koppen vormen voor hulpmiddelen een navigeerbare inhoudsopgave.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Als “%(text)” bij een lijst hoort, gebruik dan lijstopmaak.</p><div class="why"><p>Lijsten geven visuele én semantische structuur:</p><ol><li>Uitgelijnde inspringingen verbeteren de leesbaarheid.</li><li>Schermlezers melden positie (“item 3 van 7”).</li></ol><p>Een zin die met een nummer begint is nog geen echte lijst.</p></div>`,

	QA_IN_PAGE_LINK: `<p>Het linkdoel komt niet overeen met een element op deze pagina.</p><div class="why"><p>Voor ontwikkelaars: als dit door JavaScript wordt afgehandeld, verifieer dan toetsenbordbediening voordat u deze controle negeert.</p></div>`,

	QA_JUSTIFY: `<p>Uitvullen creëert onregelmatige spaties en bemoeilijkt het lezen.</p><p>${why.fix}Gebruik links uitgelijnde tekst.</p>`,

	QA_NESTED_COMPONENTS: 'Vermijd geneste interactieve componenten (bijv. accordeon in accordeon, tabs in accordeon). Dit vergroot de cognitieve belasting en vergroot de kans op gemiste inhoud.',

	QA_PDF: `<p>${why.fix}Doe één van het volgende en sluit daarna deze melding:</p><ul><li>Link naar een webpagina in plaats van de PDF,</li><li>of bied naast de PDF ook een HTML/bewerkbaar document aan,</li><li>of controleer minimaal of de PDF getagd is (koppen, leesvolgorde, tabelkoppen, alt‑teksten).</li></ul><div class="why"><p>Met name mobiele en hulpmiddelengebruikers geven de voorkeur aan webpagina’s boven PDF (beter herflow, vaker adequaat getagd).</p></div>`,

	QA_SMALL_TEXT: 'Te kleine tekst is moeilijk te lezen, vooral voor slechtzienden. Gebruik geen kleiner lettertype dan de standaardgrootte.',

	QA_STRONG_ITALICS: `<p>${why.fix}Gebruik vet en cursief spaarzaam, bij voorkeur voor kernwoorden.</p><div class="why"><p>Opmerking: gebruik <code>blockquote</code> voor citaten.</p></div>`,

	QA_SUBSCRIPT: `Subscript/superscript maakt tekst klein en moeilijk leesbaar. Gebruik het gericht voor 4<sup>e</sup>, H<sub>2</sub>O, voetnootreferenties e.d.`,

	QA_UNDERLINE: `<p>Onderstreping betekent op het web meestal “link”. Gebruikers verwachten klikbaarheid.</p><p>${why.fix}Gebruik <strong>vet</strong> of <em>cursief</em> voor nadruk, en koppen om secties te markeren.</p><div class="why"><p>Schermlezers melden visuele opmaak niet; koppen geven wél structuur.</p></div>`,

	QA_UPPERCASE: `<p>GROTE BLOKKEN TEKST IN HOOFDLETTERS ZIJN MOEILIJKER TE LEZEN EN KOMEN SCHREEUWERIG OVER.</p><p>${why.fix}Benadruk liever beperkt en met vet i.p.v. hoofdletters.</p><div class="why"><p>Schermlezers melden visuele nadruk (vet) niet; gebruik koppen voor nieuwe onderwerpen.</p></div>`,

	SUS_ALT: `<p>De alt‑tekst bevat “%(alt)”, wat doorgaans overbodig is:</p><p><strong class="badge">Alt‑tekst</strong> “%(ALT_TEXT)”</p><p>Oplossing: herschrijf beknopt zodat de betekenis duidelijk wordt.</p><div class="why"><p>Tip: schermlezers melden al dat het om een afbeelding gaat, dus “afbeelding van …/foto van …” is meestal overbodig.</p></div>`,

	TABINDEX_ATTR: `<p>${why.fix}Gebruik geen positieve <code>tabindex</code>‑waarden. Orden HTML‑elementen zodat visuele volgorde, tabvolgorde en leesvolgorde overeenkomen.</p><div class="why"><p>Standaard vallen deze drie samen.</p><p>Een positieve tabindex zet een element vooraan in de tabvolgorde, <strong>zonder</strong> de visuele/logische volgorde aan te passen, wat verwarring geeft.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Zorg dat iedere tabelkopcel tekst bevat.</p><div class="why"><p>Schermlezers gebruiken kopcellen om context te geven.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Geef in de instellingen aan of koppen in de eerste rij, eerste kolom of beide staan.</p><div class="why"> <p>Schermlezers herhalen de relevante kop bij het betreden van rij of kolom.</p><p>Gaat het om lay‑out i.p.v. data? Vermijd dan tabellen.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Verwijder (h2/h3) binnen de tabel en gebruik kopcellen. Bij meerdere niveaus: splits de tabel op.</p><div class="why"> <p>Kopcellen werken rij‑ of kolomgericht. Inhoudelijke koppen beïnvloeden alles eronder, ook in andere kolommen:</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Een <strong>tabelkop</strong> in cel 2 labelt B. <br><br> Een <strong>inhoudskop</strong> in cel 2 “labelt” 3, A, B, C en zelfs deze tekst en de tooltipfooter.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,
};

export const interfaceStrings = {
	ALERT_CLOSE: 'Sluiten',
	ALT: 'Alt‑tekst: ',
	DECORATIVE: 'Als decoratief gemarkeerd',
	DISMISS: 'Negeren',
	DISMISS_ALL: 'Op deze pagina: negeren',
	edit_page: 'Pagina bewerken',
	edit_layout: 'Lay‑out bewerken',
	edit_term: 'Term bewerken',
	edit_user: 'Gebruiker bewerken',
	IMAGES: 'Alt‑tekst',
	MAIN_TOGGLE_LABEL: 'Toegankelijkheidstools aan/uit zetten',
	MISSING: '(ontbreekt!)',
	NOT_VISIBLE: 'Opmerking: deze inhoud is mogelijk niet zichtbaar. Zoek in het gemarkeerde gebied.',
	NO_IMAGES: 'Geen afbeeldingen gevonden.',
	OUTLINE: 'Koppen',
	PANEL_DISMISS_BUTTON: `%(dismissCount) verborgen meldingen tonen`,
	PANEL_HEADING: 'Visualisaties tonen',
	SKIP_TO_ISSUE: 'Ga naar probleem',
	WARNING: 'handmatige controle nodig',
	WARNINGS: 'handmatige controles nodig',
	buttonFirstContent: 'Ga naar eerste melding',
	buttonHideHiddenAlert: 'Verborgen melding verbergen',
	buttonHideHiddenAlerts: `%(count) verborgen meldingen verbergen`,
	buttonShowHiddenAlert: 'Verborgen melding tonen',
	buttonToolsActive: 'Visualisaties verbergen',
	dismissActions: `Vergelijkbare meldingen`,
	dismissHideTitle: 'Verbergt deze melding alleen voor jou',
	dismissOkAllButton: 'Op deze pagina: markeren als OK',
	dismissOkButtonContent: 'Markeren als OK',
	dismissOkTitle: 'Verbergt deze melding voor alle redacteuren',
	dismissOnSite: 'Op alle pagina’s: markeren als OK',
	dismissalsHeader: 'Gaat u dit niet oplossen?',
	errorOutlinePrefixHeadingEmpty: '(lege kop)',
	errorOutlinePrefixHeadingIsLong: '(gemarkeerd vanwege lengte)',
	errorOutlinePrefixSkippedLevel: '(gemarkeerd vanwege overgeslagen niveau)',
	issueContent: 'Inhoudsprobleem',
	issueDeveloper: 'Ontwikkelprobleem',
	issueTemplate: 'Sjabloonprobleem',
	main_toggle_hide: 'Toegankelijkheidstools verbergen',
	main_toggle_hide_alerts: 'Toegankelijkheidsmeldingen verbergen',
	main_toggle_show: 'Toegankelijkheidstools tonen',
	main_toggle_show_alerts: 'Toegankelijkheidsmeldingen tonen',
	panelCheckAltText: `<p class="ed11y-small">Controleer of elke afbeelding duidelijk maakt wat zij in de context betekent, en dat er geen afbeeldingen met tekst worden gebruikt.</p>`,
	panelCheckOutline: `<p class="ed11y-small">Toont de koppenstructuur. Controleer of deze overeenkomt met de visuele opbouw van de inhoud.</p>`,
	PANEL_HEADING_MISSING_ONE: 'Kop niveau 1 ontbreekt.',
	PANEL_NO_HEADINGS: 'Geen koppen gevonden.',
	reportsLink: 'Websiterapporten openen',
	toggleDisabled: 'Er is geen inhoud beschikbaar die Editoria11y kan controleren.',
	transferFocus: 'Deze inhoud bewerken',
	unDismissHideButton: 'Genegeerde melding herstellen',
	unDismissNotePermissions: 'Deze controle is verborgen door een beheerder',
	unDismissOKButton: 'Als OK gemarkeerde melding herstellen',
};

export const lang = {
	strings: Object.assign(Sa11yStrings.strings, interfaceStrings, tips),
	testNames: testNames,
}
