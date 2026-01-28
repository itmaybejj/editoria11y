import strings from '../sa11y-lang/es.js';

// todo check each file for link integrity, and escaping of tags in code blocks.
export const testNames = {
	ALT_FILE_EXT: 'Deze alt‑tekst is een bestandsnaam, geen beschrijving',
	ALT_MAYBE_BAD: 'Deze alt‑tekst kan niet door een schermlezer worden uitgesproken',
	ALT_PLACEHOLDER: 'Deze alt‑tekst is betekenisloze tijdelijke tekst',
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
	DUPLICATE_TITLE: 'Deze link heeft een tooltip met dezelfde tekst als de link',
	EMBED_AUDIO: 'Heeft deze audio een transcriptie?',
	EMBED_DATA_VIZ: 'Is deze visualisatie toegankelijk?',
	EMBED_GENERAL: 'Ingebedde iframes vereisen handmatige controles',
	EMBED_MISSING_TITLE: 'Frame mist een "title"-attribuut',
	EMBED_UNFOCUSABLE: 'Frame met tabindex="-1" is niet toegankelijk via het toetsenbord.',
	EMBED_VIDEO: 'Heeft deze video nauwkeurige ondertiteling?',
	HEADING_EMPTY: 'Deze kop heeft geen tekst',
	HEADING_EMPTY_WITH_IMAGE: 'Deze afbeelding wordt als kop gebruikt en heeft dus alt‑tekst nodig',
	HEADING_FIRST: 'De eerste kop op deze pagina is een subkop',
	HEADING_LONG: 'Kan deze kop korter?',
	HEADING_MISSING_ONE: 'Op deze pagina ontbreekt een kop van niveau 1',
	HEADING_SKIPPED_LEVEL: 'Deze kop heeft een onjuist niveau',
	HIDDEN_FOCUSABLE: 'Dit element kan niet door schermlezers worden beschreven',
	IMAGE_ALT_TOO_LONG: 'Kan deze alt‑tekst korter?',
	IMAGE_DECORATIVE: 'Is deze afbeelding werkelijk betekenisloos?',
	IMAGE_DECORATIVE_CAROUSEL: 'Afbeelding in een carrousel of galerij is als decoratief gemarkeerd',
	IMAGE_FIGURE_DECORATIVE: 'Handmatige controle: afbeelding met bijschrift heeft geen alt‑tekst',
	IMAGE_FIGURE_DUPLICATE_ALT: 'Alt‑tekst mag niet identiek zijn aan het bijschrift',
	LABELS_ARIA_LABEL_INPUT: 'Is er een zichtbare label voor dit veld?',
	LABELS_PLACEHOLDER: 'Handmatige controle: placeholder‑tekst',
	LABELS_INPUT_RESET: 'Is deze reset‑knop nodig?',
	LABEL_IN_NAME: 'Zichtbare label komt niet overeen met de onzichtbare label',
	LINK_ALT_FILE_EXT: 'Alt‑tekst die als link wordt gebruikt mag geen URL zijn',
	LINK_ALT_MAYBE_BAD: 'Deze gekoppelde alt‑tekst kan niet door een schermlezer worden uitgesproken',
	LINK_ALT_UNPRONOUNCEABLE: 'Gekoppelde afbeeldingen moeten uitspreekbare alt‑tekst hebben',
	LINK_CLICK_HERE: 'Handmatige controle: link bevat "klik hier"',
	LINK_DOI: 'Link artikeltitels, niet DOI‑nummers',
	LINK_EMPTY: 'Deze link heeft geen tekst',
	LINK_EMPTY_LABELLEDBY: 'Link heeft een ongeldig "aria‑labelledby"-attribuut',
	LINK_EMPTY_NO_LABEL: 'Deze link heeft een label nodig',
	LINK_FILE_EXT: 'Link verwijst naar een bestand zonder waarschuwing',
	LINK_IDENTICAL_NAME: 'Beschrijft deze link zijn bestemming duidelijk?',
	LINK_IMAGE_ALT: 'Handmatige controle: gekoppelde afbeelding met alt‑tekst',
	LINK_IMAGE_ALT_AND_TEXT: 'Maakt deze alt‑tekst zin als onderdeel van deze link?',
	LINK_IMAGE_LONG_ALT: 'Kan deze gekoppelde alt‑tekst korter?',
	LINK_IMAGE_NO_ALT_TEXT: 'Deze gekoppelde afbeelding heeft alt‑tekst nodig',
	LINK_IMAGE_TEXT: 'Handmatige controle: afbeelding in een link is als decoratief gemarkeerd.',
	LINK_NEW_TAB: 'Opent deze link een nieuw tabblad zonder waarschuwing?',
	LINK_PLACEHOLDER_ALT: 'Deze gekoppelde afbeelding heeft zinvolle alt‑tekst nodig',
	LINK_STOPWORD: 'Beschrijft deze link zijn bestemming?',
	LINK_STOPWORD_ARIA: 'Zinvolle linktekst is alleen beschikbaar voor schermlezers',
	LINK_SUS_ALT: 'Beschrijft deze alt‑tekst de afbeelding of de link?',
	LINK_SYMBOLS: 'Handmatige controle: zijn de symbolen of emoji’s in deze link betekenisvol?',
	LINK_URL: 'Linktekst mag geen URL zijn',
	META_LANG: 'Meta‑tag voor paginataal ontbreekt',
	META_MAX: 'Meta‑tag beperkt hoe veel gebruikers de tekst kunnen vergroten',
	META_REFRESH: 'Meta‑tag vernieuwt de pagina automatisch',
	META_SCALABLE: 'Meta‑tag voorkomt dat gebruikers tekst vergroten',
	META_TITLE: 'Meta‑tag voor paginatitel ontbreekt',
	MISSING_ALT: 'Ongeldige HTML: afbeelding heeft geen alt‑attribuut',
	MISSING_ALT_LINK: 'Ongeldige HTML: gekoppelde afbeelding zonder alt‑attribuut',
	MISSING_ALT_LINK_HAS_TEXT: 'Ongeldige HTML: afbeelding in link mist alt‑attribuut',
	QA_BAD_LINK: 'Handmatige controle: linkdoel is mogelijk ongeldig',
	QA_BLOCKQUOTE: 'Moet dit citaat een kop zijn?',
	QA_DOCUMENT: 'Is dit document getagd voor schermlezers?',
	QA_FAKE_HEADING: 'Moet deze vetgedrukte tekst een kop zijn?',
	QA_FAKE_LIST: 'Moet dit lijstopmaak hebben?',
	QA_IN_PAGE_LINK: 'Defecte interne link',
	QA_JUSTIFY: 'Tekst niet uitvullen',
	QA_NESTED_COMPONENTS: 'Geneste interactieve componenten',
	QA_PDF: 'Is er een alternatief voor deze PDF?',
	QA_SMALL_TEXT: 'Tekst is te klein',
	QA_STRONG_ITALICS: 'Grote blokken benadrukte tekst zijn moeilijker te lezen',
	QA_SUBSCRIPT: 'Gebruik subscript/superscript niet als visuele opmaak',
	QA_UNDERLINE: 'Alleen links mogen onderstreept zijn',
	QA_UPPERCASE: 'Is deze tekst in hoofdletters nodig?',
	SUS_ALT: 'Zijn er overbodige woorden in deze alt‑tekst?',
	TABINDEX_ATTR: 'Het tabindex‑attribuut verstoort de leesvolgorde',
	TABLES_EMPTY_HEADING: 'Deze tabelkopcel heeft tekst nodig',
	TABLES_MISSING_HEADINGS: 'Deze tabel heeft een koprij en/of kolomkoppen nodig',
	TABLES_SEMANTIC_HEADING: 'Inhoudelijke koppen mogen niet binnen tabellen worden gebruikt',
	UNCONTAINED_LI: 'Ongeldige HTML‑lijst',
};


const why = {
	fix: `<strong class="badge">Oplossen</strong> `,
	check: `<strong class="badge">Handmatige controle</strong> `,

	buttons: `<div class="why"><p>Opmerking: de toegankelijke naam van een knop moet duidelijk maken wat deze doet. Knoppen die veranderen wanneer erop wordt geklikt, moeten hun naam ook aanpassen:</p><ul>
<li>Veranderende labels:<br>"Afspelen/Pauzeren", "Details tonen/Details verbergen"</li>
<li>Veranderende <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">statusattributen</a>:<br>"Afspelen/Afspelen, ingedrukt", "Details, samengevouwen/Details, uitgevouwen."</li>
</ul>
<p>Verander alleen niet beide tegelijk. "Afspelen" veranderen in "Pauzeren, ingedrukt" betekent dat de speler gepauzeerd is — niet dat hij afspeelt!</p></div>`,

	headings: `<div class="why"><p>Tip: koppen en subkoppen structureren inhoud in een hiërarchische opbouw. Schermlezers vertrouwen op deze structuur om pagina’s te begrijpen en te navigeren:</p><ul>
<li>Kopniveau 1: paginatitels
<ul><li>Kopniveau 2: hoofdonderwerpen
<ul><li>Kopniveau 3: subonderwerpen</li></ul>
</li></ul>
</li>
</ul></div>`,

	images: `<div class="why"><p>Tip: beschrijf bij alt‑tekst wat een afbeelding betekent, niet alleen wat erop staat. Afhankelijk van de context kan een foto van een kind dat een bal schopt betekenen:</p><ul>
<li>Ze speelden in de stromende regen.</li>
<li>De nieuwe teamshirts hebben coole drakenlogo’s.</li>
<li>Ze scoorde het winnende doelpunt vanaf de linkerzijlijn!</li>
</ul></div>`,

	links: `<div class="why"><p>Lezers scannen pagina’s op links en gebruiken zoeken in de pagina om links op naam te vinden. Effectieve links zijn betekenisvol, uniek en beknopt:</p><ul>
<li>Ideaal: "Lees meer over <a href="https://webaim.org/techniques/hypertext/link_text">betekenisvolle links</a>"</li>
<li>Niet uniek: "Klik <a href="https://webaim.org/techniques/hypertext/link_text">hier</a> om meer te leren over betekenisvolle links."</li>
<li>Niet beknopt: "<a href="https://webaim.org/techniques/hypertext/link_text">Klik hier om meer te leren over betekenisvolle links</a>"</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>Het doel van alt‑tekst is om een alternatief te bieden voor de betekenis van een afbeelding, niet alleen voor wat erop te zien is. Bij een gekoppelde afbeelding is de betekenis de bestemming van de link:</p><ul>
<li>"<em>Een vergrootglas</em>" beschrijft een afbeelding, niet een link.</li>
<li>"<em>Een zoek‑vergrootglas</em>" beschrijft beide op een verwarrende manier.</li>
<li>"<em>Zoeken</em>" beschrijft correct het linkdoel.</li>
</ul></p></div>`,
};

export const tips = {

	ALT_FILE_EXT: `<p>Schermlezers lezen deze URL voor, vaak één letter per keer. Dit geeft waarschijnlijk niet dezelfde betekenis als het bekijken van de afbeelding.</p><p>${why.fix}Voeg een lege alt toe (alt="") als dit een betekenisloze decoratie is die door schermlezers moet worden genegeerd, of voeg een beschrijvende alt‑tekst toe.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Opgegeven beschrijving van deze afbeelding: <strong>"%(alt)"</strong></p><p>${why.fix}Stel de alternatieve tekst van deze afbeelding in op een beknopte beschrijving van wat deze afbeelding in deze context betekent.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Opgegeven beschrijving van deze afbeelding: <strong>"%(alt)"</strong></p><p>${why.fix}Stel de alternatieve tekst van deze afbeelding in op een beknopte beschrijving van wat deze afbeelding in deze context betekent.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>De alt‑tekst van deze afbeelding is "%(alt)", maar bevat alleen onspeelbare symbolen en/of spaties. Schermlezers kondigen aan dat er een afbeelding aanwezig is, en pauzeren dan ongemakkelijk: "afbeelding: ____."</p><p>${why.fix}Voeg een beschrijvende alt‑tekst toe, of gebruik een volledig lege alt (alt="") als het gaat om een pictogram of afstandhouder die genegeerd moet worden.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Gebruik een geldige methode om schermlezers te laten weten wat deze knop doet, zoals tekst, alt‑tekst op een pictogram, of een title‑attribuut.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Deze knop heeft een <code>aria-labelledby</code>-waarde die leeg is of niet overeenkomt met de <code>ID</code> van een ander element op de pagina.</p><p>${why.fix}Koppel de ID opnieuw aan een element op de pagina, of verwijder dit attribuut en beschrijf de knop op een andere manier.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'Een achtergrondafbeelding of kleurverloop betekent dat deze controle niet zeker weet welke kleur zich achter deze tekst bevindt. Gebruik de kleurenkiezer hieronder om handmatig te controleren.',

	DUPLICATE_ID: `<p>IDs worden op deze pagina gebruikt voor labels of linkdoelen en moeten daarom uniek zijn.</p><p>${why.fix}Wijzig deze ID: <strong>#%(id)</strong></p><div class="why"><p>In veel CMS-systemen komt dit uit een veld "name" of "id" in de eigenschappen. In HTML is het een attribuut: <code><a id="MY-ID"></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Verwijder het <code>title</code>-attribuut van deze link.</p><div class="why"><p>Opmerking: tooltips met <code>title</code> verschijnen alleen bij muis-hover. Ze zijn niet zichtbaar op telefoons of via toetsenbordnavigatie, dus veel gebruikers zien ze nooit. Ze mogen nooit unieke of belangrijke informatie bevatten.</p></div>`,

	EMBED_AUDIO: `<p>Als deze audio spraak bevat, moet een <a href="https://www.w3.org/WAI/media/av/transcribing/">tekstalternatief</a> worden verstrekt op deze pagina of via een link.</p><p>Opmerking: automatisch gegenereerde ondertitels moeten door een mens worden nagekeken en gecorrigeerd.</p>`,

	EMBED_DATA_VIZ: `<p>Ingebedde visualisaties zijn vaak moeilijk of onmogelijk te bedienen met ondersteunende technologieën, moeilijk te begrijpen voor gebruikers met slecht zicht of kleurenblindheid, en vereisen soms horizontaal scrollen op telefoons.</p><p>${why.fix}Tenzij deze visualisatie hoog contrast heeft, met toetsenbord te bedienen is <strong><em>én</em></strong> door schermlezers kan worden beschreven, dient u een gelijkwaardig alternatief aan te bieden, zoals een tekstbeschrijving, datatabel of downloadbaar spreadsheet.</p>`,

	EMBED_GENERAL: 'Automatische controles kunnen inhoud binnen embeds niet controleren. Zorg dat alle afbeeldingen alt‑tekst hebben, video’s ondertitels hebben, tekst voldoende contrast heeft, en links en knoppen <a href="https://webaim.org/techniques/keyboard/">toetsenbordtoegankelijk</a> zijn, en sluit deze waarschuwing dan.',

	EMBED_MISSING_TITLE: `<p>Embeds hebben een toegankelijke naam nodig die hun inhoud beschrijft voor schermlezers.</p><p>${why.fix}Geef een unieke <code>title</code>- of <code>aria-label</code>-attribuut.</p>`,

	EMBED_UNFOCUSABLE: `Dit attribuut zorgt ervoor dat toetsenborden en ondersteunende technologieën het element overslaan. Tenzij de iframe-inhoud geen links, knoppen of formulieren bevat én niet scrollbaar is, moet dit attribuut worden verwijderd.`,

	EMBED_VIDEO: `<p>Video’s moeten ondertiteld zijn.</p><p>Automatisch gegenereerde ondertitels moeten worden nagekeken en gecorrigeerd.</p><p>${why.fix}Voeg ondertitels toe of corrigeer deze en sluit de waarschuwing.</p>`,

	HEADING_EMPTY: `<p>Lege koppen creëren verwarrende hiaten in de paginahiërarchie.</p><p>${why.fix}Voeg tekst aan deze kop toe of verwijder deze lege regel.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Lege koppen creëren verwarrende hiaten in de paginahiërarchie.</p><p>${why.fix}Als dit geen kop is, wijzig het formaat van <strong {C}>Kop %(level)</strong> naar <strong>Alinea</strong>. Zo wel: plaats de betekenis van de afbeelding in de alt‑tekst.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Zorg dat de paginatitel is gemarkeerd als Kop 1 of Kop 2. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}Tenzij dit een vaste titel is (zoals van een gepubliceerd artikel), maak hem korter om scannen te vergemakkelijken.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Markeer de paginatitel als een kop van niveau 1, om het begin van de documentstructuur aan te geven.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Deze kop is overgeslagen van <strong>niveau %(prevLevel)</strong> naar <strong>niveau %(level)</strong>. Voor schermlezers voelt dit alsof inhoud ontbreekt.</p><p>${why.fix}Pas kopniveaus aan zodat de structuur logisch blijft.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: 'Dit interactieve element heeft een <code>aria-hidden="true"</code>-attribuut, maar is nog steeds via het toetsenbord bereikbaar. Als u het wilt verbergen voor schermlezers, moet u ook <code>tabindex="-1"</code> toevoegen. Anders moet u <code>aria-hidden="true"</code> verwijderen.',

	IMAGE_ALT_TOO_LONG: `<p>Alt‑tekst wordt als één doorlopende zin uitgesproken door schermlezers. Als iemand iets mist, moeten ze het opnieuw horen.</p><p>De alt‑tekst van %(altLength) tekens is: <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Tip: complexe afbeeldingen die meer informatie bevatten dan in één zin past, hebben meestal een <strong>zichtbaar</strong> bijschrift of alternatieve beschrijving nodig.</p><ul><li>"Poster voor het dansfeest op vrijdag; details volgen in het bijschrift."</li><li>"Grafiek toont dat meldingen 10% zijn gedaald; details in de tabel."</li></ul></div>`,

	IMAGE_DECORATIVE: `<p>Deze afbeelding is verborgen voor schermlezers door een lege alt. Alleen betekenisloze afbeeldingen, zoals redundante pictogrammen, mogen op deze manier worden verborgen.</p><p>${why.fix}Als deze afbeelding waarde toevoegt, geef dan een alt‑tekst.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'Afbeelding is gemarkeerd als <strong>decoratief</strong>, maar alle afbeeldingen in een carrousel of galerij moeten een beschrijvende alt‑tekst hebben.',

	IMAGE_FIGURE_DECORATIVE: `<p>Deze afbeelding wordt genegeerd door ondersteunende technologie. Heeft het bijschrift betekenis zonder de afbeelding?</p><p>${why.fix}Als het bijschrift de visuele betekenis niet volledig beschrijft, voeg dan alt‑tekst toe voor ontbrekende informatie.</p><div class="why"><p>Tip: afbeeldingen, alt‑teksten en bijschriften werken samen:</p><ul><li>Bijschriften geven context en interpretatie.</li><li>Alt‑teksten beschrijven de afbeelding voor wie deze niet kan zien.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Wijzig de alt‑tekst zodat deze de visuele betekenis van de afbeelding beschrijft.</p><div class="why"><p>Tip: afbeeldingen, alt‑teksten en bijschriften vullen elkaar aan.</p></div>`,

	LABELS_ARIA_LABEL_INPUT: '<p><strong {B}>Onzichtbare veldlabel:</strong> <strong {C}>%(TEXT)</strong></p><p>Zorg voor een zichtbare label die overeenkomt met de onzichtbare naam en zichtbaar blijft wanneer het veld tekst bevat.</p><div class="why"><p>Labels die alleen via een title of placeholder zichtbaar zijn, verdwijnen zodra iemand begint te typen en maken herziening van invoer moeilijk.</p></div>',

	LABELS_INPUT_RESET: `<p>Resetknoppen worden gemakkelijk per ongeluk geactiveerd en kunnen gegevensverlies veroorzaken zonder waarschuwing.</p><p>${why.fix}Tenzij het slechts één veld reset, overweeg om hem te verwijderen of een bevestiging te vereisen.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'De afbeeldingsknop mist alt‑tekst. Voeg alt‑tekst toe zoals <em>Zoeken</em> of <em>Verzenden</em>.',

	LABELS_MISSING_LABEL: 'Aan dit invoerveld is geen label gekoppeld. Voeg een <code>id</code> toe en verbind dit met een <code>for</code>-attribuut op een label.',

	LABELS_NO_FOR_ATTRIBUTE: 'Aan dit invoerveld is geen label gekoppeld. Voeg een <code>for</code>-attribuut toe dat overeenkomt met de <code>id</code> van dit invoerveld.<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>Placeholder‑tekst verdwijnt zodra iemand begint te typen, en heeft vaak onvoldoende contrast of lijkt op inhoud.</p><p>${why.fix}Zorg dat belangrijke informatie zoals label, hulpftekst en formaatvereisten zichtbaar blijven.</p>`,

	LABEL_IN_NAME: `<p>De zichtbare tekst lijkt anders te zijn dan de toegankelijke naam. Dit kan verwarrend zijn voor schermlezers en spraakbediening.</p><p>${why.check}Zorg dat de zichtbare label begint met de onzichtbare label en geen extra betekenis toevoegt.</p><p><strong>Onzichtbare label:</strong> "%(TEXT)"</p>`,

	LINK_ALT_FILE_EXT: `<p>De alt‑tekst van deze afbeelding bevat "%(alt)", wat waarschijnlijk een bestandsnaam is in plaats van een betekenisvolle linknaam.</p><p>${why.fix}Stel de alt‑tekst in op de bestemming van de link.</p><div class="why"><p>Alt‑tekst beschrijft de betekenis van een afbeelding. Bij gekoppelde afbeeldingen is de betekenis de bestemming van de link:</p><ul><li>"Pagina met tekst" beschrijft de afbeelding, niet de link.</li><li>"IMG_1234.jpg" is alleen een bestandsnaam.</li><li>"<strong><em>Inschrijfformulier (.doc)</em></strong>" is een linkbestemming.</li></ul></p></div>`,

	LINK_ALT_MAYBE_BAD: `<p>De alt‑tekst van deze afbeelding is een placeholder: "<strong>%(alt)</strong>".</p><p>${why.fix}Stel de alt‑tekst in op de naam van de linkbestemming.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>De alt‑tekst van deze gekoppelde afbeelding bevat alleen onspeelbare tekens of spaties: "%(ALT_TEXT)". Schermlezers kondigen de link aan maar kunnen deze niet beschrijven.</p><p>${why.fix}Stel de alt‑tekst in op de bestemming of functie van de link.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `De woorden "klik" of "klik hier" zijn overbodig en leiden af van het doel van de link.`,

	LINK_DOI: `<p>${why.fix}Link de titel van het artikel en geef de DOI als platte tekst weer, in plaats van de DOI te linken en de titel onopgemerkt te laten.</p><div class="why"><p><a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">De APA‑stijl</a> beveelt beschrijvende links aan omdat gebruikers op links scannen.</p><p>Hierdoor kunnen schermlezers betekenisvolle links aankondigen in plaats van zinloze getallenreeksen.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Voeg tekst toe die de bestemming beschrijft, of verwijder de link als deze een fout is, zoals een gekoppelde spatie.</p><div class="why"><p>Schermlezers hebben moeite met lege links en blijven stil of lezen de URL letter per letter.</p><p>Gekoppelde spaties kunnen lastig te verwijderen zijn; soms moeten woorden eromheen herschreven worden.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>Deze link heeft een <code>aria-labelledby</code>-attribuut dat niet overeenkomt met een <code>ID</code> op de pagina.</p><p>${why.fix}Geef een geldige <code>ID</code> op, of verwijder dit attribuut en beschrijf de knop op een andere manier.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Voeg tekst toe die de bestemming beschrijft, of verwijder de link als het een fout is.</p><div class="why"><p>Schermlezers kunnen lege links niet beschrijven en blijven stil of lezen de URL.</p><p>Gekoppelde spaties moeten soms worden verwijderd door omringende tekst opnieuw te typen.</p></div>`,

	LINK_FILE_EXT: `<p>Deze link verwijst naar een PDF of ander downloadbaar bestand (bijv. MP3, ZIP, Word‑document) zonder waarschuwing.</p><p>${why.fix}Gebruik tekst of een pictogram om <a href="https://itmaybejj.github.io/linkpurpose/">het bestandstype aan te geven</a> in de linktekst.</p><p class="why">Voor grote bestanden kunt u ook de bestandsgrootte vermelden, zoals "Rapport (PDF, 3 MB)".</p>`,

	LINK_IDENTICAL_NAME: `<p>Links met verschillende bestemmingen hebben dezelfde tekst: "<strong>%(TEXT)</strong>".</p><p>${why.fix}Herschrijf de links zodat elke linktekst uniek is gebaseerd op de bestemming.</p>${why.links}`,

	LINK_IMAGE_ALT: `Zorg dat deze alt‑tekst de linkbestemming beschrijft:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Controleer of dit helpt om de linkbestemming te beschrijven, zonder irrelevante of dubbele informatie toe te voegen:</p><p><strong class="badge">Alt</strong> "<em><strong>%(alt)</strong></em>"</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p><a href="https://webaim.org/techniques/hypertext/link_text#alt_link">De alt‑tekst van een gekoppelde afbeelding wordt gebruikt als linknaam</a>. Links moeten kort en duidelijk zijn, omdat schermlezers een lijst met links gebruiken om snel te navigeren. Een lange alt‑tekst duidt vaak op een beschrijving van de afbeelding in plaats van het doel van de link.</p>De alt‑tekst van %(altLength) tekens is: <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Wanneer een link om een afbeelding heen staat, vormt de alt‑tekst van de afbeelding <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">de linknaam voor schermlezers</a>.</p><p>${why.fix}Stel de alternatieve tekst in op de bestemming of functie van de link.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'Deze afbeelding is als decoratief gemarkeerd, hoewel de link de omliggende tekst als label gebruikt.',

	LINK_NEW_TAB: `<p>${why.fix}Laat deze link in hetzelfde tabblad openen of <a href="https://itmaybejj.github.io/linkpurpose/">waarschuw gebruikers vooraf</a>.</p><div class="why"><p>Gebruikers kunnen zelf kiezen om een link in een nieuw tabblad te openen. Als de link dit afdwingt, kan dat verwarrend zijn — vooral als de "terug"-knop niet meer werkt.</p><p>Opmerking: in formulieren openen links meestal in een nieuw tabblad om verlies van werk te voorkomen.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>De alt‑tekst van deze gekoppelde afbeelding is een placeholder: "<strong>%(alt)</strong>".</p><p>${why.fix}Stel de alt‑tekst in op de bestemming van de link.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Deze link bevat tekst die niet helpt om de bestemming te beschrijven:<br><strong>%(text)</strong></p><p>${why.fix}Herschrijf deze link zodat de bestemming of functie duidelijk en beknopt wordt beschreven.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>Een toegankelijke naam is via ARIA opgegeven, maar de zichtbare linktekst is generiek: "<strong {C}>%(ERROR)</strong>".</p><p>${why.fix}Schrijf betekenisvolle links voor alle gebruikers en zorg dat de zichtbare label overeenkomt met de toegankelijke naam.</p>${why.links}`,

	LINK_SUS_ALT: `<p>De alt‑tekst van deze afbeelding bevat het woord "%(alt)", wat meestal betekent dat deze de afbeelding beschrijft en niet de linkbestemming.</p><strong class="badge">Alt‑tekst</strong> "%(ALT_TEXT)"<p>Oplossing: zorg dat de alt‑tekst de bestemming of functie van de link beschrijft.<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Gebruik geen symbolen als oproep‑tot‑actie in linktekst, tenzij ze verborgen zijn voor ondersteunende technologieën. Schermlezers kunnen deze symbolen voorlezen, wat verwarrend kan zijn. Overweeg het verwijderen van: <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Verander deze linktekst in de titel van zijn bestemming of functie.</p><div class="why"><p>Gebruikers scannen links op naam, vooral schermlezergebruikers.</p><p>Linkteksten die een URL zijn, zijn moeilijk te scannen en moeilijk doorzoekbaar.</p></div>`,

	META_LANG: `<p>${why.fix}Voeg een <a href="https://www.w3.org/International/questions/qa-html-language-declarations">taalattribuut</a> toe aan de HTML‑tag van de pagina.</p><div class="why"><p>Tip: schermlezers gebruiken taalinformatie om uitgesproken woorden correct te vormen. Als de taal niet is ingesteld, raden ze of gebruiken ze de standaard, wat slechte uitspraak oplevert.</p></div>`,

	META_MAX: `<p>Deze meta‑tag beperkt hoeveel gebruikers tekst kunnen vergroten.</p><p>${why.fix}Sta volledige zoom toe door dit attribuut te verwijderen of aan te passen.</p>`,

	META_REFRESH: `<p>Pagina’s moeten niet automatisch vernieuwen via een meta‑tag. Dit onderbreekt de gebruiker zonder waarschuwing en kan ervoor zorgen dat ze hun plaats verliezen of ingevoerde gegevens kwijtraken.</p><p>${why.fix}Gebruik AJAX of JavaScript om inhoud te vernieuwen, zodat gebruikers worden gewaarschuwd en de actie kunnen uitstellen.</p>`,

	META_SCALABLE: `<p>Deze meta‑tag voorkomt dat gebruikers tekst kunnen vergroten.</p><p>${why.fix}Verwijder deze beperking of sta volledige zoom toe.</p>`,

	META_TITLE: `<p>${why.fix}Voeg een <code>&lt;title&gt;</code>-tag toe aan de <code>&lt;head&gt;</code> van de pagina.</p><div class="why"><p>Veel onderdelen van de browse‑ervaring zijn afhankelijk van een <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title">korte en unieke titel</a>:</p><ul><li>Zoekmachines gebruiken deze voor zoekresultaten.</li><li>Browsers tonen deze als tabbladtitel.</li><li>Schermlezers spreken deze uit bij het wisselen tussen tabbladen.</li></ul><p>Zonder titel zien of horen gebruikers een ruwe URL.</p></div>`,

	MISSING_ALT: `<p>Wanneer schermlezers een afbeelding zonder alt‑attribuut tegenkomen, lezen ze het URL‑bestand van de afbeelding voor, vaak letter voor letter.</p><p>${why.fix}Voeg ofwel een lege alt toe (alt="") voor decoratieve afbeeldingen, of een beschrijvende alt‑tekst.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Wanneer schermlezers een gekoppelde afbeelding zonder alt‑attribuut tegenkomen, lezen ze de bestands‑URL voor. Dit is extra problematisch voor gekoppelde afbeeldingen.</p><p>${why.fix}Voeg alt‑tekst toe die overeenkomt met de linkfunctie.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Deze afbeelding maakt deel uit van een link met tekst. Als de zichtbare tekst voldoende beschrijft, gebruik dan alt="". Anders: voeg alt‑tekst toe die de bestemming of functie van de link beschrijft.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>Link lijkt naar een ontwikkelomgeving te verwijzen:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Verander dit naar een relatief pad (/folder) of de publieke URL.</p>`,

	QA_BLOCKQUOTE: `<p>Blockquote‑opmaak vertelt schermlezers dat dit een citaat is. Korte citaten zijn vaak eigenlijk koppen.</p><p>${why.fix}Als dit een kop is, gebruik dan kopopmaak zodat deze in de structuur verschijnt.</p>${why.headings}`,

	QA_DOCUMENT: `<p>Gekoppelde documenten zijn webinhoud en moeten ook toegankelijk zijn. Controleer koppen, tabelkoppen en alt‑tekst.</p><ul class="why"><li>Maak uw <a href="https://support.google.com/docs/answer/6199477?hl=nl">Google Workspace‑document</a> toegankelijk.</li><li>Maak uw <a href="https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office‑documenten</a> toegankelijk.</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}Als deze vetgedrukte regel een nieuw onderwerp introduceert, vervang de visuele opmaak dan door kopopmaak.</p><div class="why"><p>Tip: koppen vormen een navigeerbare inhoudsopgave voor ondersteunende technologieën.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Als "%(text)" onderdeel is van een lijst, gebruik dan lijstopmaak.</p><div class="why"><p>Lijsten geven visuele en structurele informatie:</p><ol><li>Lijsten hebben uitgelijnde inspringingen voor leesbaarheid.</li><li>Ze zijn machine‑leesbaar. Schermlezers kondigen posities aan ("item 3 van 7").</li></ol><p>Maar een zin die met een nummer begint, is geen echte lijst en mist deze structuur.</p></div>`,

	QA_IN_PAGE_LINK: `<p>Het linkdoel komt niet overeen met een element op deze pagina.</p><div class="why"><p>Opmerking voor ontwikkelaars: als dit geen normale link is en een JavaScript‑gebeurtenis triggert, test dan eerst of deze werkt via toetsenbordbediening.</p></div>`,

	QA_JUSTIFY: `<p>Uitgevulde tekst voegt extra spaties toe om links en rechts uit te lijnen. Deze onregelmatige tussenruimtes maken het voor veel mensen moeilijker om te lezen.</p><p>${why.fix}Gebruik links uitgelijnde tekst.</p>`,

	QA_NESTED_COMPONENTS: 'Vermijd geneste interactieve lay‑outcomponenten, zoals accordeons binnen andere accordeons of tabbladen binnen accordeons. Dit bemoeilijkt navigatie en kan ertoe leiden dat inhoud over het hoofd wordt gezien.',

	QA_PDF: `<p>${why.fix}Doe één van de volgende dingen en sluit daarna deze waarschuwing:</p><ul><li>Link naar een webpagina in plaats van een PDF,</li><li>of bied naast de PDF ook een webpagina of bewerkbaar document aan,</li><li>of zorg er op zijn minst voor dat de PDF toegankelijk is door te controleren op tags, koppen, leesvolgorde, tabelkoppen en alt‑tekst.</li></ul><div class="why"><p>Mobiele gebruikers en gebruikers van ondersteunende technologieën geven bijna altijd de voorkeur aan webpagina’s boven PDF’s, omdat PDF’s niet goed herflowen en vaak niet correct getagd zijn.</p></div>`,

	QA_SMALL_TEXT: 'Kleine tekst is moeilijker te lezen, vooral voor mensen met een visuele beperking. Gebruik geen lettergrootte kleiner dan de standaardgrootte.',

	QA_STRONG_ITALICS: `<p>${why.fix}Gebruik vet en cursief alleen voor belangrijke woorden of korte zinsdelen.</p><div class="why"><p>Opmerking: als dit een citaat is, kunt u blockquote gebruiken.</p></div>`,

	QA_SUBSCRIPT: `Subscript en superscript maken tekst klein en moeilijk leesbaar. Gebruik ze alleen voor specifieke doeleinden, zoals ordinale getallen (4<sup>e</sup>), chemische formules (H<sub>2</sub>O) of voetnootreferenties.`,

	QA_UNDERLINE: `<p>Onderstreepte tekst op het web betekent meestal een link. Gebruikers zullen verwachten dat het klikbaar is.</p><p>${why.fix}Gebruik <strong>vet</strong> of <em>cursief</em> voor nadruk, en gebruik koppen om onderwerpen af te bakenen.</p><div class="why"><p>Opmerking: schermlezers kondigen visuele opmaak zoals onderstrepen niet aan. Alleen koppen voegen structuur toe.</p></div>`,

	QA_UPPERCASE: `<p>GROTE BLOKKEN TEKST IN HOOFDLETTERS ZIJN MOEILIJKER TE LEZEN EN KUNNEN OVERKOMEN ALS SCHREEUWEN.</p><p>${why.fix}Benadruk liever enkele woorden ineens of gebruik vet in plaats van hoofdletters.</p><div class="why"><p>Opmerking: schermlezers kondigen visuele nadruk zoals vetgedrukte tekst niet aan. Gebruik een kop als dit een nieuw onderwerp introduceert.</p></div>`,

	SUS_ALT: `<p>De alt‑tekst bevat het woord "%(alt)", wat waarschijnlijk overbodig is:</p><p><strong class="badge">Alt‑tekst</strong> "%(ALT_TEXT)"</p><p>Oplossing: herschrijf de alt‑tekst zodat deze beknopt de betekenis van de afbeelding weergeeft.</p><div class="why"><p>Tip: schermlezers kondigen al aan dat ze een afbeelding beschrijven, dus frases zoals "afbeelding van" of "foto van" zijn vaak overbodig.</p><p>Uitzondering: wanneer de woorden zelf deel zijn van de inhoud van de afbeelding:</p><ul><li>Niet overbodig: "<em>Een foto in</em> een fotoalbum dat aan de klas wordt getoond."</li><li>Overbodig: "<em>Foto van</em> een foto in een fotoalbum dat aan de klas wordt getoond."</li></ul></div>`,

	TABINDEX_ATTR: `<p>${why.fix}Gebruik nooit tabindex‑waarden hoger dan "0" (de standaardvolgorde). Orden HTML‑elementen zodat tabvolgorde en leesvolgorde overeenkomen.</p><div class="why"><p>Standaard komen visuele volgorde, tabvolgorde en schermlezer‑leesvolgorde overeen.</p><p>Een positieve tabindex verplaatst een element naar het begin van de tabvolgorde, <strong>maar niet naar het begin van de visuele of logische volgorde</strong>.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Zorg dat elke tabelkopcel tekst bevat.</p><div class="why"><p>Tip: schermlezers gebruiken kopcellen om gebruikers te oriënteren binnen een tabel.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Geef in de tabelinstellingen aan of koppen zich in de eerste rij, eerste kolom of beide bevinden.</p><div class="why"> <p>Tip: schermlezers herhalen de relevante kop wanneer de cursor een nieuwe kolom of rij binnengaat.</p><p>Als deze tabel geen gegevens bevat maar alleen voor lay‑out dient, verwijder dan de tabelopmaak.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Verwijder deze kopopmaak (h2, h3). Gebruik in plaats daarvan tabelkoppen. Als u meerdere koprijen nodig hebt, splits de tabel dan op.</p><div class="why"> <p>Tip: tabelkoppen zijn richtinggebonden: één rij of één kolom. Inhoudelijke koppen beïnvloeden alle daaropvolgende inhoud:</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Een <strong>tabelkop</strong> in cel 2 labelt cel B. <br><br> Een <strong>inhoudskop</strong> in cel 2 labelt cel 3, A, B en C, evenals deze tekst en de footer van deze tooltip.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,

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
	edit_tags: 'Gebruiker bewerken',
	IMAGES: 'Alt‑tekst',
	MAIN_TOGGLE_LABEL: 'Toegankelijkheidstools aan/uit zetten',
	MISSING: '(ontbreekt!)',
	NOT_VISIBLE: 'Opmerking: deze inhoud is mogelijk niet zichtbaar. Zoek hem in het omlijnde onderdeel.',
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
	panelCheckAltText: '<p class="ed11y-small">Controleer dat elke afbeelding beschrijft wat deze in de context betekent, en dat er geen afbeeldingen met tekst zijn.</p>',
	panelCheckOutline: '<p class="ed11y-small">Dit toont de structuur van de koppen. Controleer dat deze overeenkomt met de visuele indeling van de inhoud.</p>',
	PANEL_HEADING_MISSING_ONE: 'Kop niveau 1 ontbreekt.',
	PANEL_NO_HEADINGS: 'Geen koppen gevonden.',
	reportsLink: 'Websiterapporten openen',
	toggleDisabled: 'Er is geen inhoud beschikbaar die Editoria11y kan controleren.',
	transferFocus: 'Deze inhoud bewerken',
	unDismissHideButton: 'Deze genegeerde melding herstellen',
	unDismissNotePermissions: 'Deze controle is verborgen door een beheerder',
	unDismissOKButton: 'Deze als OK gemarkeerde melding herstellen',
};

const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips),
  testNames: testNames,
};

export default newStrings;
