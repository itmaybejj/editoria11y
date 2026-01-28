import strings from '../sa11y-lang/sv.js';

// todo check each file for link integrity, and escaping of tags in code blocks.
export const testNames = {
	ALT_FILE_EXT: 'Denna alt‑text är ett filnamn, inte en beskrivning',
	ALT_MAYBE_BAD: 'Denna alt‑text kan vara svår för en skärmläsare att läsa korrekt',
	ALT_PLACEHOLDER: 'Denna alt‑text är en meningslös platshållare',
	ALT_UNPRONOUNCEABLE: 'Denna alt‑text går inte att uttala',
	BTN_EMPTY: 'Knappen saknar ett tillgängligt namn',
	BTN_EMPTY_LABELLEDBY: 'Knappen har en ogiltig ARIA‑etikett',
	BTN_ROLE_IN_NAME: 'Knappnamnet upprepar ordet ”button”',
	CONTRAST_ERROR: 'Texten har för låg kontrast och är svår att läsa',
	CONTRAST_ERROR_GRAPHIC: 'Grafiken eller ikonen har otillräcklig kontrast',
	CONTRAST_INPUT: 'Inmatningsfältet har otillräcklig kontrast och är svårt att läsa',
	CONTRAST_PLACEHOLDER: 'Platshållartexten har otillräcklig kontrast',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Har denna platshållartext tillräcklig kontrast?',
	CONTRAST_WARNING: 'Har denna text tillräcklig kontrast?',
	CONTRAST_WARNING_GRAPHIC: 'Har denna grafik eller ikon tillräcklig kontrast?',
	DUPLICATE_ID: 'Duplicerat ID‑attribut',
	DUPLICATE_TITLE: 'Denna länk har en tooltip som är identisk med länktexten',
	EMBED_AUDIO: 'Har detta ljudmaterial en transkription?',
	EMBED_DATA_VIZ: 'Är denna visualisering tillgänglig?',
	EMBED_GENERAL: 'Inbäddade iframes kräver manuell granskning',
	EMBED_MISSING_TITLE: 'Iframe saknar ”title”‑attribut',
	EMBED_UNFOCUSABLE: 'En iframe med tabindex="‑1" kan inte fokuseras med tangentbord',
	EMBED_VIDEO: 'Har denna video korrekta undertexter?',
	HEADING_EMPTY: 'Denna rubrik saknar text',
	HEADING_EMPTY_WITH_IMAGE: 'Denna bild används som rubrik och behöver alt‑text',
	HEADING_FIRST: 'Sidans första rubrik är en underrubrik',
	HEADING_LONG: 'Kan denna rubrik vara kortare?',
	HEADING_MISSING_ONE: 'Denna sida saknar en rubrik på nivå 1',
	HEADING_SKIPPED_LEVEL: 'Denna rubrik är på fel nivå i hierarkin',
	HIDDEN_FOCUSABLE: 'Detta element kan inte beskrivas korrekt av skärmläsare',
	IMAGE_ALT_TOO_LONG: 'Kan denna alt‑text vara kortare?',
	IMAGE_DECORATIVE: 'Är denna bild verkligen endast dekorativ?',
	IMAGE_DECORATIVE_CAROUSEL: 'Bild i bildspel/galleri är markerad som dekorativ',
	IMAGE_FIGURE_DECORATIVE: 'Manuell granskning: bild med bildtext men utan alt‑text',
	IMAGE_FIGURE_DUPLICATE_ALT: 'Alt‑text ska inte vara identisk med bildtext',
	LABELS_ARIA_LABEL_INPUT: 'Finns det en synlig etikett för detta fält?',
	LABELS_PLACEHOLDER: 'Manuell granskning: platshållartext',
	LABELS_INPUT_RESET: 'Behövs denna återställningsknapp?',
	LABEL_IN_NAME: 'Den synliga etiketten matchar inte det tillgängliga namnet',
	LINK_ALT_FILE_EXT: 'Alt‑text i länk ska inte vara en URL',
	LINK_ALT_MAYBE_BAD: 'Denna alt‑text i länk kan vara svår att uttala för skärmläsare',
	LINK_ALT_UNPRONOUNCEABLE: 'Länkade bilder måste ha uttalbar alt‑text',
	LINK_CLICK_HERE: 'Manuell granskning: länk innehåller ”klicka här”',
	LINK_DOI: 'Länka artikelrubriker, inte DOI‑nummer',
	LINK_EMPTY: 'Denna länk saknar text',
	LINK_EMPTY_LABELLEDBY: 'Länk med ogiltigt attribut aria‑labelledby',
	LINK_EMPTY_NO_LABEL: 'Denna länk behöver en etikett',
	LINK_FILE_EXT: 'Länken leder till en fil utan förvarning',
	LINK_IDENTICAL_NAME: 'Beskriver denna länk sitt mål på ett unikt sätt?',
	LINK_IMAGE_ALT: 'Manuell granskning: länkad bild med alt‑text',
	LINK_IMAGE_ALT_AND_TEXT: 'Är denna alt‑text meningsfull i länksammanhang?',
	LINK_IMAGE_LONG_ALT: 'Kan alt‑texten för den länkade bilden vara kortare?',
	LINK_IMAGE_NO_ALT_TEXT: 'Länkad bild behöver alt‑text',
	LINK_IMAGE_TEXT: 'Manuell granskning: bild i länk är markerad som dekorativ',
	LINK_NEW_TAB: 'Öppnar denna länk en ny flik utan varning?',
	LINK_PLACEHOLDER_ALT: 'Denna bildlänk behöver meningsfull alt‑text',
	LINK_STOPWORD: 'Beskriver denna länk sitt mål?',
	LINK_STOPWORD_ARIA: 'Meningsfull länktext finns endast via ARIA‑etikett',
	LINK_SUS_ALT: 'Beskriver denna alt‑text bilden eller länken?',
	LINK_SYMBOLS: 'Manuell granskning: är symboler eller emoji i länken meningsfulla?',
	LINK_URL: 'Länktext ska inte vara en URL',
	META_LANG: 'Meta‑tagg för sidans språk saknas',
	META_MAX: 'Meta‑tagg begränsar användarens möjlighet att zooma',
	META_REFRESH: 'Meta‑tagg uppdaterar sidan automatiskt',
	META_SCALABLE: 'Meta‑tagg inaktiverar zoomning',
	META_TITLE: 'Meta‑tagg för sidtitel saknas',
	MISSING_ALT: 'Ogiltig HTML: bild utan alt‑attribut',
	MISSING_ALT_LINK: 'Ogiltig HTML: länkad bild utan alt‑attribut',
	MISSING_ALT_LINK_HAS_TEXT: 'Ogiltig HTML: bild i länk saknar alt‑attribut',
	QA_BAD_LINK: 'Manuell granskning: länken kan vara ogiltig',
	QA_BLOCKQUOTE: 'Bör detta blockcitat vara en rubrik?',
	QA_DOCUMENT: 'Är detta dokument korrekt taggat för skärmläsare?',
	QA_FAKE_HEADING: 'Bör denna fetstilta text vara en rubrik?',
	QA_FAKE_LIST: 'Bör detta formateras som en lista?',
	QA_IN_PAGE_LINK: 'Trasig intern länk',
	QA_JUSTIFY: 'Undvik marginaljusterad text',
	QA_NESTED_COMPONENTS: 'Nästlade interaktiva komponenter',
	QA_PDF: 'Finns det ett alternativ till denna PDF?',
	QA_SMALL_TEXT: 'Texten är för liten',
	QA_STRONG_ITALICS: 'Stora textblock i fet/kursiv stil är svårlästa',
	QA_SUBSCRIPT: 'Använd inte upphöjd/sänkt text endast som visuell stil',
	QA_UNDERLINE: 'Endast länkar bör vara understrukna',
	QA_UPPERCASE: 'Behöver denna text verkligen skrivas med versaler?',
	SUS_ALT: 'Finns det onödiga ord i denna alt‑text?',
	TABINDEX_ATTR: 'Attributet tabindex kan störa läsordningen',
	TABLES_EMPTY_HEADING: 'Denna tabellhuvudcell behöver text',
	TABLES_MISSING_HEADINGS: 'Tabellen saknar rad‑ och/eller kolumnrubriker',
	TABLES_SEMANTIC_HEADING: 'Innehållsrubriker bör inte användas inne i tabeller',
	UNCONTAINED_LI: 'Ogiltig HTML‑lista',
};

const why = {
	fix: `<strong class="badge">Hur du åtgärdar detta</strong>`,
	check: `<strong class="badge">Manuell kontroll</strong>`,

	buttons: `<div class="why"><p>Obs: Ett knappnamn ska tydligt beskriva vad knappen gör. Knappar som byter tillstånd efter klick bör också byta namn:</p><ul>
<li>Växlande etiketter:<br>”Spela/Pausa”, ”Visa detaljer/Dölj detaljer”</li>
<li>Ändring av https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_propertiesARIA‑tillstånd</a>:<br>”Spela/Spela (nedtryckt)”, ”Detaljer (stängd)/Detaljer (öppen)”.</li>
</ul>
<p>Ändra inte både etiketten och tillståndet samtidigt. Att ändra ”Spela” till ”Pausa (nedtryckt)” betyder att spelaren är pausad — inte att den spelar.</p></div>`,

	headings: `<div class="why"><p>Tips: Rubriker skapar en tydlig hierarki. Skärmläsare förlitar sig på denna struktur för förståelse och navigering:</p>
<ul><li>Rubrik nivå 1: sidtitel
<ul><li>Rubrik nivå 2: huvudavsnitt
<ul><li>Rubrik nivå 3: underavsnitt</li></ul></li></ul></li></ul></div>`,

	images: `<div class="why"><p>Tips: Beskriv i alt‑texten vad bilden <em>betyder</em> i sitt sammanhang — inte bara vad den föreställer. En bild av ett barn som sparkar en boll kan till exempel betyda:</p>
<ul><li>De fortsatte spela trots kraftigt regn.</li>
<li>De nya matchtröjorna har snygga draklogotyper.</li>
<li>Hon avgjorde matchen från vänsterkanten!</li></ul></div>`,

	links: `<div class="why"><p>Många användare skummar länkar och söker dem på namn. Bra länktexter behöver vara meningsfulla, unika och korta:</p>
<ul>
<li>Idealt: ”Läs mer om https://webaim.org/techniques/hypertext/link_textmeningsfulla länkar</a>”.</li>
<li>Inte unikt: ”Klicka https://webaim.org/techniques/hypertext/link_texthär</a> för att läsa mer …”.</li>
<li>Inte kort: ”https://webaim.org/techniques/hypertext/link_textKlicka här för att läsa mer om meningsfulla länkar</a>”.</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>Alt‑textens syfte är att förmedla bildens <em>betydelse</em>. För en bild som är en länk är betydelsen länkens mål/funktion:</p>
<ul>
<li>”<em>Förstoringsglas</em>” beskriver bilden, inte länken.</li>
<li>”<em>Sökikon</em>” är tvetydigt.</li>
<li>”<em>Sök</em>” beskriver korrekt vad länken gör.</li>
</ul></div>`,
};

export const tips = {
	ALT_FILE_EXT: `<p>Skärmläsare läser ofta upp URL:en tecken för tecken, vilket sällan motsvarar den faktiska bildens innebörd.</p><p>${why.fix}Använd alt="" om bilden är dekorativ och ska ignoreras, annars skriv en beskrivande alt‑text.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Angiven beskrivning: <strong>"%(alt)"</strong></p><p>${why.fix}Ange en kort alt‑text som uttrycker vad bilden betyder här.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Angiven beskrivning: <strong>"%(alt)"</strong></p><p>${why.fix}Ange en kort alt‑text som uttrycker vad bilden betyder här.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>Alt‑texten ”%(alt)” består endast av tecken/mellanrum som inte kan uttalas. Resultatet blir ”bild: ____”.</p><p>${why.fix}Skriv en läsbar alt‑text eller använd alt="" för innehåll som ska ignoreras (t.ex. rent dekorativa ikoner).</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Ge knappen ett tillgängligt namn via text, alt på ikonen eller <code>title</code>‑attribut.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p><code>aria-labelledby</code> är tomt eller pekar inte på ett befintligt <code>ID</code>.</p><p>${why.fix}Länka till ett giltigt ID eller ta bort attributet och namnge knappen på annat sätt.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'Bakgrundsbild/gradient gör det osäkert att avgöra bakgrunden. Verifiera manuellt med färgväljaren.',

	DUPLICATE_ID: `<p>ID används som etiketter eller länkmål och måste därför vara unika.</p><p>${why.fix}Ändra detta ID: <strong>#%(id)</strong></p><div class="why"><p>I många CMS hämtas det från fälten ”name/id”. I HTML är det <code><a id="MY-ID"></a></code>.</p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Ta bort <code>title</code> från länken.</p><div class="why"><p>Obs: <code>title</code>‑tooltips visas endast med muspekare; de syns inte med tangentbord eller på mobil och ska inte innehålla viktig information.</p></div>`,

	EMBED_AUDIO: `<p>Om ljudet innehåller tal, ge en https://www.w3.org/WAI/media/av/transcribing/textbaserad transkription</a> på sidan eller som länk.</p><p>Automatiska transkriptioner behöver kvalitetssäkras (talare och viktiga ljud).</p>`,

	EMBED_DATA_VIZ: `<p>Inbäddade visualiseringar kan vara svåra för hjälpmedel, otydliga för användare med nedsatt syn/färgseende och kräva horisontell rullning på mobil.</p><p>${why.fix}Om den saknar hög kontrast, full tangentbordsåtkomst <strong><em>och</em></strong> meningsfullt uppläst innehåll, ge en likvärdig alternativversion (text, tabell eller nedladdningsbar datafil).</p>`,

	EMBED_GENERAL: 'Automatisk kontroll ser inte innehållet i inbäddade element. Säkerställ alt‑texter, undertexter, tillräcklig kontrast och https://webaim.org/techniques/keyboard/tangentbordsåtkomlighet</a> för länkar/knappar innan varningen ignoreras.',

	EMBED_MISSING_TITLE: `<p>Inbäddade element behöver ett tillgängligt namn som beskriver innehållet.</p><p>${why.fix}Lägg till ett unikt <code>title</code> eller <code>aria-label</code>.</p>`,

	EMBED_UNFOCUSABLE: `Attributet instruerar tangentbord/hjälpmedel att hoppa över elementet. Om iframen innehåller länkar, knappar eller kan rullas – ta bort attributet.`,

	EMBED_VIDEO: `<p>Video ska ha undertexter.</p><p>Automatiska undertexter behöver granskas/korrigeras.</p><p>${why.fix}Lägg till eller rätta undertexter och avfärda sedan varningen.</p>`,

	HEADING_EMPTY: `<p>Tomma rubriker skapar luckor i strukturen.</p><p>${why.fix}Lägg till text eller ta bort den tomma raden.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Tomma rubriker skapar luckor i strukturen.</p><p>${why.fix}Om detta inte ska vara en rubrik, ändra från <strong {C}>Rubrik %(level)</strong> till <strong>Brödtext</strong>. Om det ska vara en rubrik, beskriv bildens betydelse i alt‑texten.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Se till att sidtiteln är märkt som Rubrik 1 eller Rubrik 2. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}Om det inte är en formell titel (t.ex. artikelrubrik), gör den kortare för bättre överblick.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Märk sidtiteln som rubriknivå 1 för att ange dokumentets början.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Rubriken hoppar från <strong>nivå %(prevLevel)</strong> till <strong>nivå %(level)</strong>. Det kan låta som om innehåll saknas.</p><p>${why.fix}Justera nivåerna så att hierarkin blir sammanhängande.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: `Detta interaktiva element har <code>aria-hidden="true"</code> men kan fortfarande fokuseras. Om det ska döljas för skärmläsare, lägg till <code>tabindex="-1"</code>; annars ta bort <code>aria-hidden</code>.`,

	IMAGE_ALT_TOO_LONG: `<p>Alt‑text läses som en enda fras; långa texter blir svåra att återlyssna på i delar.</p><p>Längd: %(altLength) tecken. <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Tips: mer komplexa bilder kan behöva <strong>synlig bildtext</strong> eller utökad beskrivning, och alt‑texten kan hänvisa dit.</p></div>`,

	IMAGE_DECORATIVE: `<p>Bilden är dold med tom alt. Använd endast för verkligt dekorativa bilder.</p><p>${why.fix}Om bilden bär betydelse, ange alt‑text.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'Markerad som <strong>dekorativ</strong>, men i bildspel/gallerier bör alla bilder ha beskrivande alt‑text.',

	IMAGE_FIGURE_DECORATIVE: `<p>Bilden ignoreras av hjälpmedel. Räcker bildtexten utan bilden?</p><p>${why.fix}Om inte, komplettera med alt‑text för det bildtexten inte täcker.</p><div class="why"><p>Bilder, alt‑texter och bildtexter samverkar: bildtext ger kontext; alt beskriver det visuella.</p></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Justera alt‑texten för att beskriva motivets visuella betydelse i stället för att upprepa bildtexten.</p><div class="why"><p>Bilder, alt‑texter och bildtexter kompletterar varandra.</p></div>`,

	LABELS_ARIA_LABEL_INPUT: `<p><strong {B}>Osynlig fältetikett:</strong> <strong {C}>%(TEXT)</strong></p><p>Kontrollera att det finns en synlig etikett, att den förblir synlig vid inmatning och att den matchar det tillgängliga namnet.</p><div class="why"><p>Etiketter via <em>placeholder</em>/<em>title</em> försvinner vid inmatning och försvårar granskning.</p></div>`,

	LABELS_INPUT_RESET: `<p>Återställningsknappar trycks lätt av misstag och kan orsaka databortfall.</p><p>${why.fix}Om den inte endast rensar ett fält, ta bort knappen eller kräva bekräftelse.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'Bildknappen saknar alt‑text. Lägg till ett funktionsnamn, t.ex. <em>Sök</em> eller <em>Skicka</em>.',

	LABELS_MISSING_LABEL: 'Fältet saknar kopplad etikett. Lägg till <code>id</code> och en motsvarande <code>for</code>‑etikett.',

	LABELS_NO_FOR_ATTRIBUTE: 'Fältet saknar etikett. Lägg till ett <code>for</code>‑attribut på etiketten som matchar fältets <code>id</code>.<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>Platshållartext försvinner när man skriver och har ofta låg kontrast eller blandas ihop med innehåll.</p><p>${why.fix}Se till att viktig information (etikett, hjälp, formatkrav) alltid är synlig.</p>`,

	LABEL_IN_NAME: `<p>Den synliga etiketten verkar avvika från det tillgängliga namnet. Det kan förvirra användare och hindra röststyrning.</p><p>${why.check}Säkerställ att etiketten inleds med det tillgängliga namnet och inte tillför ny betydelse.</p><p><strong>Osynlig etikett:</strong> ”%(TEXT)”</p>`,

	LINK_ALT_FILE_EXT: `<p>Alt‑texten innehåller ”%(alt)”, vilket sannolikt är ett filnamn — inte länkens mål.</p><p>${why.fix}Ange alt som beskriver länkens mål.</p><div class="why"><p>För bildlänkar beskriver alt målet:</p><ul><li>”Text på sida” beskriver bilden.</li><li>”IMG_1234.jpg” är bara ett filnamn.</li><li>”<strong><em>Anmälningsformulär (doc)</em></strong>” beskriver målet.</li></ul></div>`,

	LINK_ALT_MAYBE_BAD: `<p>Alt‑texten är en platshållare: ”<strong>%(alt)</strong>”.</p><p>${why.fix}Ange alt utifrån länkens mål.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>Alt‑texten ”%(ALT_TEXT)” består av tecken som inte kan uttalas; länken kan inte beskrivas.</p><p>${why.fix}Ange alt som beskriver länkens syfte eller mål.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `Undvik ”klicka här” — det förklarar inte vad länken leder till.`,

	LINK_DOI: `<p>${why.fix}Länka artikelns titel och visa DOI som vanlig text.</p><div class="why"><p>Beskrivande länkar underlättar skanning och uppläsning i länklister.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Lägg till beskrivande länktext eller ta bort länken om den skapats av misstag (t.ex. en länkad blanktecken).</p><div class="why"><p>Tomma länkar kan ge tystnad eller stavning av URL:en.</p><p>Vissa redigerare kräver omskrivning av omgivande text för att ta bort blankteckenslänkar.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p><code>aria-labelledby</code> pekar inte på ett giltigt <code>ID</code>.</p><p>${why.fix}Korrigera referensen eller ta bort attributet.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Lägg till beskrivande text eller ta bort den tomma länken.</p><div class="why"><p>Skärmläsare kan inte meningsfullt tillkännage tomma länkar.</p></div>`,

	LINK_FILE_EXT: `<p>Länken leder till en fil (PDF/MP3/ZIP/Word) utan att informera användaren.</p><p>${why.fix}Ange filtyp i länktext/ikon: https://itmaybejj.github.io/linkpurpose/</a>.</p><p class="why">För stora filer, ange gärna storlek (t.ex. ”Årsrapport (PDF, 3 MB)”).</p>`,

	LINK_IDENTICAL_NAME: `<p>Flera länkar med olika mål har samma text: ”<strong>%(TEXT)</strong>”.</p><p>${why.fix}Skriv om så att varje länktext unikt beskriver sitt mål.</p>${why.links}`,

	LINK_IMAGE_ALT: `Kontrollera att alt‑texten beskriver länkens mål:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Kontrollera att alt‑texten bidrar till att beskriva länken utan överflöd:</p><p><strong class="badge">Alt</strong> ”<em><strong>%(alt)</strong></em>”</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p>https://webaim.org/techniques/hypertext/link_text#alt_linkAlt för bildlänkar ska beskriva länkens mål</a>. Långa alt‑texter antyder ofta att bilden beskrivs i stället för målet.</p>Denna alt‑text är %(altLength) tecken: <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>När en länk innehåller en bild används dess alt som https://webaim.org/techniques/hypertext/link_text#alt_linklänkens namn</a>.</p><p>${why.fix}Beskriv syfte/mål i alt‑texten.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'Bilden är markerad som dekorativ, men länken förlitar sig på omgivande text som etikett.',

	LINK_NEW_TAB: `<p>${why.fix}Öppna i samma flik eller https://itmaybejj.github.io/linkpurpose/informera i förväg</a> om ny flik används.</p><div class="why"><p>Tvång till ny flik kan förvirra (tillbaka‑knappen fungerar annorlunda). I formulär kan ny flik ibland skydda ifyllda uppgifter.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>Alt‑texten är en platshållare: ”<strong>%(alt)</strong>”.</p><p>${why.fix}Ange alt som beskriver länkens mål.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Länken innehåller text som inte hjälper att beskriva målet:<br><strong>%(text)</strong></p><p>${why.fix}Skriv en kort, tydlig mål‑ eller funktionsbeskrivning.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>Det finns en ARIA‑etikett, men den synliga texten är generisk: ”<strong {C}>%(ERROR)</strong>”.</p><p>${why.fix}Ge meningsfull synlig länktext och låt den matcha det tillgängliga namnet.</p>${why.links}`,

	LINK_SUS_ALT: `<p>Alt‑texten innehåller ”%(alt)”, vilket tyder på att bilden beskrivs i stället för länken.</p><strong class="badge">Alt‑text</strong> ”%(ALT_TEXT)”<p>Lösning: låt alt beskriva länkens syfte/mål.<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Undvik symboler som call‑to‑action i länktext (om de inte döljs för hjälpmedel). De kan läsas upp förvirrande. Överväg att ta bort: <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Använd titel/mål i stället för URL som länktext.</p><div class="why"><p>Användare — särskilt med skärmläsare — skannar länkar via deras namn.</p><p>URL som länktext är svår att skumma och söka.</p></div>`,

	META_LANG: `<p>${why.fix}Lägg till https://www.w3.org/International/questions/qa-html-language-declarationsspråkattribut</a> på <code>html</code>‑elementet.</p><div class="why"><p>Korrekt språk ger korrekt uttal och begriplighet.</p></div>`,

	META_MAX: `<p>Denna meta‑tagg begränsar zoom.</p><p>${why.fix}Tillåt full zoom genom att ta bort eller justera begränsningen.</p>`,

	META_REFRESH: `<p>Automatisk uppdatering kan avbryta användaren och nollställa formulär.</p><p>${why.fix}Använd AJAX/JS med förhandsinfo och möjlighet att skjuta upp.</p>`,

	META_SCALABLE: `<p>Denna meta‑tagg hindrar förstoring.</p><p>${why.fix}Ta bort eller justera för att tillåta zoom.</p>`,

	META_TITLE: `<p>${why.fix}Lägg till <code><title></code> i <code><head></code>.</p><div class="why"><p>En https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/titlekort och unik titel</a> är central för sökresultat, fliknamn och uppläsning vid flikbyte.</p><p>Utan titel återstår bara URL:en.</p></div>`,

	MISSING_ALT: `<p>Utan alt‑attribut läses bildens URL ofta upp tecken för tecken.</p><p>${why.fix}Använd alt="" för dekorativa bilder, och beskrivande alt för informativa bilder.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Länkad bild utan alt leder till att bildens URL läses upp — extra problematiskt.</p><p>${why.fix}Ge en alt‑text som beskriver länkens mål.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Bilden ingår i en länk som även har text. Om texten redan beskriver målet, använd alt=""; annars ange alt som beskriver målet.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>Länken verkar peka mot utvecklingsmiljö:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Använd relativ sökväg (/folder) eller publik URL.</p>`,

	QA_BLOCKQUOTE: `<p><code>blockquote</code> signalerar ”citat”. Korta ”citat” är ofta rubriker.</p><p>${why.fix}Om det är rubrik — använd rubrikformat.</p>${why.headings}`,

	QA_DOCUMENT: `<p>Länkade dokument räknas som webbinnehåll och ska vara tillgängliga. Kontrollera rubriker, tabeller och alt‑texter och avfärda sedan varningen.</p><ul class="why"><li>Gör https://support.google.com/docs/answer/6199477?hl=svGoogle‑dokument</a> tillgängliga.</li><li>Gör https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155Office‑dokument</a> tillgängliga.</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}Om den feta raden introducerar ett nytt ämne, använd en riktig rubrik.</p><div class="why"><p>Rubriker skapar navigerbar struktur för hjälpmedel.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Om ”%(text)” hör till en lista — formatera den som lista.</p><div class="why"><p>Listor har både visuell och semantisk struktur: indrag förbättrar läsbarhet och skärmläsare anger position (”punkt 3 av 7”).</p></div>`,

	QA_IN_PAGE_LINK: `<p>Länkmålet för denna interna länk saknas på sidan.</p><div class="why"><p>För utvecklare: om JS hanterar länken, säkerställ tangentbordsstöd innan varningen ignoreras.</p></div>`,

	QA_JUSTIFY: `<p>Marginaljustering skapar ojämna mellanrum som försämrar läsbarheten.</p><p>${why.fix}Använd vänsterjusterad text.</p>`,

	QA_NESTED_COMPONENTS: 'Undvik nästlade interaktiva komponenter (t.ex. flikar i flikar, dragspel i dragspel) — det försvårar navigering och ökar kognitiv belastning.',

	QA_PDF: `<p>${why.fix}Gör något av följande och avfärda sedan varningen:</p><ul><li>Länka till webbsida i stället för PDF,</li><li>eller ge både PDF och HTML/editerbar version,</li><li>eller säkerställ att PDF är korrekt taggad (rubriker, läsordning, tabellhuvuden, alt‑texter).</li></ul><div class="why"><p>Många — särskilt mobil‑ och skärmläsaranvändare — föredrar HTML framför PDF.</p></div>`,

	QA_SMALL_TEXT: 'För liten text är svår att läsa, särskilt för personer med nedsatt syn. Undvik för små storlekar.',

	QA_STRONG_ITALICS: `<p>${why.fix}Använd fet/kursiv sparsamt, endast för nyckelord/korta fraser.</p><div class="why"><p>För citat: använd <code>blockquote</code>.</p></div>`,

	QA_SUBSCRIPT: `Upphöjd/sänkt text minskar läsbarheten. Använd endast för t.ex. 4<sup>e</sup>, H<sub>2</sub>O och fotnoter.`,

	QA_UNDERLINE: `<p>Understruket signalerar vanligtvis länk. Användare förväntar sig klickbarhet.</p><p>${why.fix}Använd <strong>fet</strong> eller <em>kursiv</em> för betoning; använd rubriker för strukturella skiften.</p><div class="why"><p>Skärmläsare meddelar inte visuell stil; rubriker ger faktisk struktur.</p></div>`,

	QA_UPPERCASE: `<p>LÅNG TEXT I VERSALER ÄR SVÅRLÄST OCH UPPFATTAS OFTA SOM ”ROP”.</p><p>${why.fix}Betona hellre några ord i fet stil än att använda versaler.</p><div class="why"><p>Skärmläsare annonserar inte fet stil; använd rubriker för nya ämnen.</p></div>`,

	SUS_ALT: `<p>Alt‑texten innehåller ”%(alt)”, vilket sannolikt är överflödigt:</p><p><strong class="badge">Alt‑text</strong> ”%(ALT_TEXT)”</p><p>Lösning: skriv om alt‑texten så att den kort beskriver bildens betydelse.</p><div class="why"><p>Tips: ”bild av …” behövs sällan eftersom skärmläsaren redan säger att det är en bild.</p></div>`,

	TABINDEX_ATTR: `<p>${why.fix}Undvik positiv <code>tabindex</code>. Låt HTML‑ordningen spegla visuell ordning, tabbordning och läsordning.</p><div class="why"><p>Som standard sammanfaller dessa ordningar.</p><p>Positiv tabindex flyttar fokus i tabbordningen utan att ändra visuellt läge — det blir förvirrande.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Se till att varje tabellhuvudcell innehåller text.</p><div class="why"><p>Skärmläsare använder rubriker för att ge kontext i tabeller.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Ange i tabellinställningarna om rubriker finns i första raden, första kolumnen eller båda.</p><div class="why"> <p>Skärmläsare upprepar relevant rad/kolumnrubrik i varje cell.</p><p>Om tabellen är layout‑enbart, ta bort tabellformatet.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Ta bort innehållsrubriker (h2/h3) i tabeller. Använd tabellhuvuden och dela upp tabellen vid behov.</p><div class="why"> <p>Tabellhuvuden gäller rader/kolumner; innehållsrubriker påverkar allt som följer under dem.</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2"><strong>Tabellhuvud</strong> i cell 2 märker B‑kolumnen.<br><br><strong>Innehållsrubrik</strong> i cell 2 ”omfattar” 3, A, B, C samt denna text och verktygstipsfoten.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,
};

export const interfaceStrings = {
	ALERT_CLOSE: 'Stäng',
	ALT: 'Alt‑text: ',
	DECORATIVE: 'Markerad som dekorativ',
	DISMISS: 'Avfärda',
	DISMISS_ALL: 'På denna sida: avfärda',
	edit_page: 'Redigera sida',
	edit_layout: 'Redigera layout',
	edit_term: 'Redigera term',
	edit_tags: 'Redigera användare',
	IMAGES: 'Alt‑text',
	MAIN_TOGGLE_LABEL: 'Aktivera tillgänglighetsverktyg',
	MISSING: '(saknas!)',
	NOT_VISIBLE: 'Obs: detta innehåll kan vara dolt. Leta i det markerade området.',
	NO_IMAGES: 'Inga bilder hittades.',
	OUTLINE: 'Rubrikstruktur',
	PANEL_DISMISS_BUTTON: `Visa %(dismissCount) dolda varningar`,
	PANEL_HEADING: 'Visa visualiseringsverktyg',
	SKIP_TO_ISSUE: 'Hoppa till problemet',
	WARNING: 'manuell kontroll krävs',
	WARNINGS: 'manuella kontroller krävs',
	buttonFirstContent: 'Hoppa till första varningen',
	buttonHideHiddenAlert: 'Dölj dold varning',
	buttonHideHiddenAlerts: `Dölj %(count) dolda varningar`,
	buttonShowHiddenAlert: 'Visa dold varning',
	buttonToolsActive: 'Dölj visualiseringsverktyg',
	dismissActions: `Liknande varningar`,
	dismissHideTitle: 'Döljer endast för dig',
	dismissOkAllButton: 'På denna sida: markera som OK',
	dismissOkButtonContent: 'Markera som OK',
	dismissOkTitle: 'Döljer varningen för alla redaktörer',
	dismissOnSite: 'På hela webbplatsen: markera som OK',
	dismissalsHeader: 'Vill du inte åtgärda detta?',
	errorOutlinePrefixHeadingEmpty: '(tom rubrik)',
	errorOutlinePrefixHeadingIsLong: '(markerad p.g.a. längd)',
	errorOutlinePrefixSkippedLevel: '(markerad p.g.a. nivåhopp)',
	issueContent: 'Innehållsproblem',
	issueDeveloper: 'Utvecklingsproblem',
	issueTemplate: 'Mallproblem',
	main_toggle_hide: 'Dölj tillgänglighetsverktyg',
	main_toggle_hide_alerts: 'Dölj tillgänglighetsvarningar',
	main_toggle_show: 'Visa tillgänglighetsverktyg',
	main_toggle_show_alerts: 'Visa tillgänglighetsvarningar',
	panelCheckAltText: `<p class="ed11y-small">Kontrollera att varje bilds alt‑text förmedlar betydelsen i sammanhanget, och att inga ”bilder med inbäddad text” används.</p>`,
	panelCheckOutline: `<p class="ed11y-small">Visar rubrikstrukturen. Kontrollera att den motsvarar sidans visuella struktur.</p>`,
	PANEL_HEADING_MISSING_ONE: 'Rubrik på nivå 1 saknas.',
	PANEL_NO_HEADINGS: 'Inga rubriker hittades.',
	reportsLink: 'Öppna webbplatsrapporter',
	toggleDisabled: 'Inget innehåll tillgängligt för Editoria11y att kontrollera.',
	transferFocus: 'Redigera detta innehåll',
	unDismissHideButton: 'Återställ denna avfärdade varning',
	unDismissNotePermissions: 'Denna kontroll har dolts av en administratör',
	unDismissOKButton: 'Återställ denna varning markerad som OK',
};

const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips),
  testNames: testNames,
};

export default newStrings;
