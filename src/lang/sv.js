import strings from '../sa11y-lang/sv.js';

// todo check each file for link integrity, and escaping of tags in code blocks.
export const testNames = {
	ALT_FILE_EXT: 'Denna alt‑text är ett filnamn, inte en beskrivning',
	ALT_MAYBE_BAD: 'Denna alt‑text kan inte läsas korrekt av en skärmläsare',
	ALT_PLACEHOLDER: 'Denna alt‑text är en meningslös platshållare',
	ALT_UNPRONOUNCEABLE: 'Denna alt‑text går inte att uttala',
	BTN_EMPTY: 'Knappen saknar ett tillgängligt namn',
	BTN_EMPTY_LABELLEDBY: 'Knappen har en ogiltig ARIA‑etikett',
	BTN_ROLE_IN_NAME: 'Knappnamnet upprepar ordet "button"',
	CONTRAST_ERROR: 'Texten har för låg kontrast och är svår att läsa',
	CONTRAST_ERROR_GRAPHIC: 'Grafiken eller ikonen har otillräcklig kontrast',
	CONTRAST_INPUT: 'Inmatningsfältet har otillräcklig kontrast och är svårt att läsa',
	CONTRAST_PLACEHOLDER: 'Platshållartexten har otillräcklig kontrast och är svår att läsa',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Har denna platshållartext tillräcklig kontrast?',
	CONTRAST_WARNING: 'Har denna text tillräcklig kontrast?',
	CONTRAST_WARNING_GRAPHIC: 'Har denna grafik eller ikon tillräcklig kontrast?',
	DUPLICATE_ID: 'Duplicerat ID‑attribut',
	DUPLICATE_TITLE: 'Denna länk har en tooltip som är identisk med länken',
	EMBED_AUDIO: 'Har detta ljudmaterial en transkription?',
	EMBED_DATA_VIZ: 'Är denna visualisering tillgänglig?',
	EMBED_GENERAL: 'Inbäddade iframes kräver manuell granskning',
	EMBED_MISSING_TITLE: 'Iframe saknar "title"‑attribut',
	EMBED_UNFOCUSABLE: 'Ett iframe med tabindex="-1" går inte att fokusera med tangentbord',
	EMBED_VIDEO: 'Har denna video korrekta undertexter?',
	HEADING_EMPTY: 'Denna rubrik saknar text',
	HEADING_EMPTY_WITH_IMAGE: 'Denna bild används som rubrik och behöver alt‑text',
	HEADING_FIRST: 'Sidans första rubrik är en underrubrik',
	HEADING_LONG: 'Kan denna rubrik vara kortare?',
	HEADING_MISSING_ONE: 'Denna sida saknar en rubrik på nivå 1',
	HEADING_SKIPPED_LEVEL: 'Denna rubrik har fel nivåordning',
	HIDDEN_FOCUSABLE: 'Detta element kan inte beskrivas av skärmläsare',
	IMAGE_ALT_TOO_LONG: 'Kan denna alt‑text vara kortare?',
	IMAGE_DECORATIVE: 'Är denna bild verkligen dekorativ?',
	IMAGE_DECORATIVE_CAROUSEL: 'Bild i bildspel eller galleri är markerad som dekorativ',
	IMAGE_FIGURE_DECORATIVE: 'Manuell granskning: bild med bildtext men utan alt‑text',
	IMAGE_FIGURE_DUPLICATE_ALT: 'Alt‑text bör inte vara identisk med bildtexten',
	LABELS_ARIA_LABEL_INPUT: 'Finns det en synlig etikett för detta fält?',
	LABELS_PLACEHOLDER: 'Manuell granskning: platshållartext',
	LABELS_INPUT_RESET: 'Behövs denna återställningsknapp?',
	LABEL_IN_NAME: 'Den synliga etiketten matchar inte det tillgängliga namnet',
	LINK_ALT_FILE_EXT: 'Alt‑text i länk bör inte vara en URL',
	LINK_ALT_MAYBE_BAD: 'Alt‑text i länk kan inte uttalas av skärmläsare',
	LINK_ALT_UNPRONOUNCEABLE: 'Länkade bilder måste ha uttalbar alt‑text',
	LINK_CLICK_HERE: 'Manuell granskning: länk innehåller "klicka här"',
	LINK_DOI: 'Länka till artikelrubriker, inte DOI‑nummer',
	LINK_EMPTY: 'Denna länk saknar text',
	LINK_EMPTY_LABELLEDBY: 'Länken har ogiltigt aria-labelledby‑attribut',
	LINK_EMPTY_NO_LABEL: 'Denna länk behöver en etikett',
	LINK_FILE_EXT: 'Länken leder till en fil utan varning',
	LINK_IDENTICAL_NAME: 'Beskriver denna länk sitt mål på ett unikt sätt?',
	LINK_IMAGE_ALT: 'Manuell granskning: länkad bild med alt‑text',
	LINK_IMAGE_ALT_AND_TEXT: 'Är denna alt‑text meningsfull i länksammanhang?',
	LINK_IMAGE_LONG_ALT: 'Kan denna alt‑text för en länkad bild vara kortare?',
	LINK_IMAGE_NO_ALT_TEXT: 'Länkad bild behöver alt‑text',
	LINK_IMAGE_TEXT: 'Manuell granskning: bild i länk är markerad som dekorativ.',
	LINK_NEW_TAB: 'Öppnar denna länk en ny flik utan varning?',
	LINK_PLACEHOLDER_ALT: 'Denna bildlänk behöver meningsfull alt‑text',
	LINK_STOPWORD: 'Beskriver denna länk sitt mål?',
	LINK_STOPWORD_ARIA: 'Meningsfull länktext finns endast i ARIA‑etikett',
	LINK_SUS_ALT: 'Beskriver denna alt‑text bilden eller länken?',
	LINK_SYMBOLS: 'Manuell granskning: är symboler eller emoji i länken meningsfulla?',
	LINK_URL: 'Länktext bör inte vara en URL',
	META_LANG: 'Saknar meta‑tagg för sidans språk',
	META_MAX: 'Meta‑tagg begränsar användarens möjlighet att zooma',
	META_REFRESH: 'Meta‑tagg uppdaterar sidan automatiskt',
	META_SCALABLE: 'Meta‑tagg inaktiverar zoomning',
	META_TITLE: 'Saknar meta‑tagg för sidtitel',
	MISSING_ALT: 'Ogiltig HTML: bild utan alt‑attribut',
	MISSING_ALT_LINK: 'Ogiltig HTML: bildlänk saknar alt‑attribut',
	MISSING_ALT_LINK_HAS_TEXT: 'Ogiltig HTML: bild i länk saknar alt‑attribut',
	QA_BAD_LINK: 'Manuell granskning: länken kan vara ogiltig',
	QA_BLOCKQUOTE: 'Bör detta blockcitat vara en rubrik?',
	QA_DOCUMENT: 'Är detta dokument korrekt taggat för skärmläsare?',
	QA_FAKE_HEADING: 'Bör denna fetstilta text vara en rubrik?',
	QA_FAKE_LIST: 'Bör detta vara formaterat som en lista?',
	QA_IN_PAGE_LINK: 'Trasig intern länk',
	QA_JUSTIFY: 'Använd inte marginaljusterad text',
	QA_NESTED_COMPONENTS: 'Nästagade interaktiva komponenter',
	QA_PDF: 'Finns det ett alternativ till denna PDF?',
	QA_SMALL_TEXT: 'Texten är för liten',
	QA_STRONG_ITALICS: 'Stora block med fet/kursiv text är svåra att läsa',
	QA_SUBSCRIPT: 'Använd inte upphöjd/sänkt text som visuell stil',
	QA_UNDERLINE: 'Endast länkar bör vara understrukna',
	QA_UPPERCASE: 'Behöver denna text verkligen vara i versaler?',
	SUS_ALT: 'Finns onödiga ord i denna alt‑text?',
	TABINDEX_ATTR: 'Tabindex‑attributet stör läsordningen',
	TABLES_EMPTY_HEADING: 'Detta tabellhuvud behöver text',
	TABLES_MISSING_HEADINGS: 'Tabellen saknar rad- och/eller kolumnrubriker',
	TABLES_SEMANTIC_HEADING: 'Innehållsrubriker bör inte användas i tabeller',
	UNCONTAINED_LI: 'Ogiltig HTML‑lista',
};


const why = {
	fix: `<strong class="badge">Hur du åtgärdar detta</strong> `,
	check: `<strong class="badge">Manuell kontroll</strong> `,

	buttons: `<div class="why"><p>Obs: Ett knappnamn måste tydligt beskriva vad knappen gör. Knappar som ändrar funktion när de klickas måste också ändra namn:</p><ul>
<li>Växlande etiketter:<br>"Spela/Pausa", "Visa detaljer/Dölj detaljer"</li>
<li>Ändrade https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_propertiesARIA-tillstånd</a>:<br>"Spela/Spela (nedtryckt)", "Detaljer (stängd)/Detaljer (öppen)"</li>
</ul>
<p>Viktigt: ändra inte både etiketten och tillståndet samtidigt. Om du ändrar ”Spela” till ”Pausa (nedtryckt)” betyder det att spelaren är pausad — inte att den spelar!</p></div>`,

	headings: `<div class="why"><p>Tips: Rubriker skapar en hierarkisk struktur i sidans innehåll. Skärmläsare förlitar sig på denna struktur för att förstå och navigera:</p><ul>
<li>Rubrik nivå 1: sidans titel
<ul><li>Rubrik nivå 2: huvudavsnitt
<ul><li>Rubrik nivå 3: underavsnitt</li></ul>
</li></ul>
</li>
</ul></div>`,

	images: `<div class="why"><p>Tips: När du skriver alt-text, beskriv vad bilden <em>betyder</em> i sammanhanget — inte bara vad den föreställer. En bild av ett barn som sparkar en boll kan betyda olika saker beroende på kontext:</p><ul>
<li>De spelade vidare trots kraftigt regn.</li>
<li>Lagets nya tröjor har snygga draklogotyper.</li>
<li>Hon gjorde segermålet från vänsterkanten!</li>
</ul></div>`,

	links: `<div class="why"><p>Användare skummar ofta länkar snabbt och söker efter dem via sidans sökfunktion. Därför måste bra länkar vara meningsfulla, unika och korta:</p><ul>
<li>Idealt: "Läs mer om https://webaim.org/techniques/hypertext/link_textmeningsfulla länkar</a>"</li>
<li>Ej unikt: "Klicka https://webaim.org/techniques/hypertext/link_texthär</a> för att läsa mer."</li>
<li>Ej kortfattat: "https://webaim.org/techniques/hypertext/link_textKlicka här för att läsa mer om meningsfulla länkar</a>"</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>Alt-textens syfte är att kommunicera bildens betydelse. För en bild som fungerar som länk är betydelsen själva länkmålet:</p><ul>
<li>"<em>Förstoringsglas</em>" beskriver bilden, inte länken.</li>
<li>"<em>Sökikon</em>" blandar ihop bild och funktion.</li>
<li>"<em>Sök</em>" beskriver korrekt länkmålet.</li>
</ul></p></div>`,
};

export const tips = {

	ALT_FILE_EXT: `<p>Skärmläsare läser upp denna URL, ofta tecken för tecken. Detta förmedlar troligen inte samma betydelse som att se bilden.</p><p>${why.fix}Lägg till ett tomt alt (alt="") om detta är dekorativt och bör ignoreras, eller lägg till en beskrivande alternativtext.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Angiven beskrivning för denna bild: <strong>"%(alt)"</strong></p><p>${why.fix}Ange en alt‑text som kortfattat beskriver vad bilden betyder i sammanhanget.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Angiven beskrivning för denna bild: <strong>"%(alt)"</strong></p><p>${why.fix}Ange en alt‑text som kortfattat beskriver vad bilden betyder i sammanhanget.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>Alt‑texten "%(alt)" består endast av tecken och/eller mellanslag som inte kan uttalas. Skärmläsaren kommer att säga "bild: ____".</p><p>${why.fix}Lägg till en beskrivande alt‑text, eller använd alt="" om bilden är ett ikoniskt/visuellt avståndselement som bör ignoreras.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Använd en giltig metod för att beskriva knappens funktion — vanlig text, alt på ikonen eller ett title‑attribut.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Denna knapp har ett <code>aria-labelledby</code>‑attribut som är tomt eller inte matchar något <code>ID</code> på sidan.</p><p>${why.fix}Koppla ID:t till ett befintligt element eller ta bort attributet och ge en annan typ av beskrivning.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'En bakgrundsbild eller gradient gör det svårt att automatiskt avgöra bakgrundsfärgen. Använd färgväljaren nedan för manuell kontroll.',

	DUPLICATE_ID: `<p>ID används som etiketter eller länkmål, och måste därför vara unika.</p><p>${why.fix}Ändra detta ID: <strong>#%(id)</strong></p><div class="why"><p>I de flesta CMS kommer detta från fältet "name" eller "id". I HTML är det attributet: <code><a id="MY-ID"></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Ta bort <code>title</code>‑attributet från denna länk.</p><div class="why"><p>Obs: <code>title</code>-tooltips visas endast när muspekaren hovrar. De syns inte med tangentbord eller på mobil och bör aldrig innehålla viktig information.</p></div>`,

	EMBED_AUDIO: `<p>Om detta ljud innehåller tal måste en https://www.w3.org/WAI/media/av/transcribing/textbaserad transkription</a> finnas på sidan eller via en länk.</p><p>Automatiska transkriptioner måste granskas manuellt för att säkerställa korrekt identifikation av talare och viktiga ljud.</p>`,

	EMBED_DATA_VIZ: `<p>Inbäddade visualiseringar är ofta svåra eller omöjliga att använda med hjälpmedel. De kan vara svåra att tolka för personer med nedsatt syn eller färgblindhet och kan kräva horisontell rullning på mobil.</p><p>${why.fix}Om visualiseringen saknar hög kontrast, full tangentbordsåtkomst <strong><em>och</em></strong> skärmläsarstöd, behöver du ge ett likvärdigt alternativ: textsammanfattning, tabell eller datafil.</p>`,

	EMBED_GENERAL: 'Automatiska tester kan inte inspektera innehåll inuti embed‑element. Säkerställ alt‑texter, videoundertexter, tillräcklig kontrast och att länkar/knappar är https://webaim.org/techniques/keyboard/tangentbordsåtkomliga</a>. Därefter kan varningen ignoreras.',

	EMBED_MISSING_TITLE: `<p>Inbäddade ramar måste ha ett tillgängligt namn som beskriver innehållet.</p><p>${why.fix}Lägg till ett unikt <code>title</code> eller <code>aria-label</code>.</p>`,

	EMBED_UNFOCUSABLE: `Detta attribut instruerar tangentbord och hjälpmedel att hoppa över elementet. Om ramen har länkar, knappar eller scrollbart innehåll ska attributet tas bort.`,

	EMBED_VIDEO: `<p>Videor måste ha undertexter.</p><p>Automatiskt genererade undertexter måste manuellt korrigeras.</p><p>${why.fix}Lägg till eller korrigera undertexter och ignorera sedan denna varning.</p>`,

	HEADING_EMPTY: `<p>Tomma rubriker skapar luckor i dokumentstrukturen.</p><p>${why.fix}Lägg till text eller ta bort den tomma raden.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Tomma rubriker skapar luckor i strukturen.</p><p>${why.fix}Om detta inte är en rubrik, ändra från <strong {C}>Rubrik %(level)</strong> till <strong>Brödtext</strong>. Om det är en rubrik, beskriv bildens betydelse i alt‑texten.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Se till att sidans titel är format som Rubrik 1 eller Rubrik 2. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}Om detta inte är en fast titel (t.ex. artikelrubrik), gör den kortare för att öka överskådligheten.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Markera sidans titel som rubrik på nivå 1 för att definiera dokumentstrukturen.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Denna rubrik hoppar från <strong>nivå %(prevLevel)</strong> till <strong>nivå %(level)</strong>. Detta får det att låta som om innehåll saknas.</p><p>${why.fix}Justera nivåerna för att bevara en korrekt hierarki.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: 'Detta interaktiva element har <code>aria-hidden="true"</code> men kan fortfarande fokuseras. Om det ska döljas för skärmläsare, lägg till <code>tabindex="-1"</code>. Annars ta bort aria-hidden.',

	IMAGE_ALT_TOO_LONG: `<p>Alt‑text läses upp som en enda mening; om användaren missar något måste allt läsas om.</p><p>Alt‑textens längd: %(altLength) tecken<br><em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Tips: komplexa bilder behöver ofta en <strong>synlig bildtext</strong> eller en längre beskrivning.</p></div>`,

	IMAGE_DECORATIVE: `<p>Denna bild är dold för skärmläsare med tom alt. Endast riktigt dekorativa bilder bör döljas.</p><p>${why.fix}Om bilden har betydelse, lägg till alt‑text.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'Denna bild är markerad som <strong>dekorativ</strong>, men alla bilder i ett bildspel eller galleri måste ha beskrivande alt‑text.',

	IMAGE_FIGURE_DECORATIVE: `<p>Denna bild ignoreras av hjälpmedel. Är bildtexten förståelig utan bilden?</p><p>${why.fix}Om bildtexten inte fullt ut beskriver bildens visuella betydelse, lägg till alt‑text som kompletterar informationen.</p><div class="why"><p>Tips: bilder, alt‑texter och bildtexter fungerar tillsammans:</p><ul><li>Synliga bildtexter ger kontext och tolkning.</li><li>Alt‑text beskriver det visuella innehållet för användare som inte kan se bilden.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Justera alt‑texten så att den beskriver bildens visuella betydelse i stället för att duplicera bildtexten.</p><div class="why"><p>Tips: bilder, alt‑texter och bildtexter kompletterar varandra:</p><ul><li>Bildtexter ger sammanhang.</li><li>Alt‑text beskriver det visuella innehållet som bildtexten refererar till.</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: '<p><strong {B}>Osynlig fältetikett:</strong> <strong {C}>%(TEXT)</strong></p><p>Kontrollera att det finns en synlig etikett, att etiketten förblir synlig när man skriver och att den matchar det tillgängliga namnet.</p><div class="why"><p>Titel‑ och placeholder‑baserade etiketter försvinner vid inmatning och gör det svårt att granska data.</p></div>',

	LABELS_INPUT_RESET: `<p>Återställningsknappar är lätta att trycka på av misstag och kan radera data utan möjlighet att ångra.</p><p>${why.fix}Om knappen inte enbart rensar ett fält, överväg att ta bort den eller bekräfta åtgärden innan den utförs.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'Bildknappen saknar alt‑text. Lägg till ett namn som beskriver funktionen, t.ex. <em>Sök</em> eller <em>Skicka</em>.',

	LABELS_MISSING_LABEL: 'Detta fält saknar associerad etikett. Lägg till ett <code>id</code> och en matchande <code>for</code>‑etikett.',

	LABELS_NO_FOR_ATTRIBUTE: 'Detta fält saknar etikett. Lägg till ett <code>for</code>‑attribut på etiketten som matchar fältets <code>id</code>.<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>Placeholder‑text försvinner vid inmatning och har ofta låg kontrast eller kan misstas för faktisk innehållstext.</p><p>${why.fix}Se till att viktig information som etiketter, instruktioner och formatkrav alltid är synliga.</p>`,

	LABEL_IN_NAME: `<p>Den synliga etiketten verkar inte matcha det tillgängliga namnet. Detta kan förvirra skärmläsare och röststyrning.</p><p>${why.check}Säkerställ att den synliga etiketten börjar med och överensstämmer med det dolda tillgängliga namnet.</p><p><strong>Dold etikett:</strong> "%(TEXT)"</p>`,

	LINK_ALT_FILE_EXT: `<p>Alt‑texten för denna bild innehåller "%(alt)", vilket sannolikt är ett filnamn och inte ett meningsfullt länknamn.</p><p>${why.fix}Lägg alt‑text som beskriver länkmålet.</p><div class="why"><p>Alt‑text för bildlänkar ska beskriva det som länken leder till:</p><ul><li>"Text på sida" beskriver bilden, inte länken.</li><li>"IMG_1234.jpg" är bara ett filnamn.</li><li>"<strong><em>Anmälningsformulär (.doc)</em></strong>" beskriver länkmålet.</li></ul></p></div>`,

	LINK_ALT_MAYBE_BAD: `<p>Alt‑texten är en platshållare: "<strong>%(alt)</strong>".</p><p>${why.fix}Sätt alt‑text som beskriver vart länken leder.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>Alt‑texten "%(ALT_TEXT)" består av tecken som inte går att uttala. Skärmläsaren kan inte beskriva länken.</p><p>${why.fix}Ange alt‑text som beskriver länkens syfte eller destination.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `Fraser som "klicka här" bör undvikas eftersom de inte säger vad länken leder till.`,

	LINK_DOI: `<p>${why.fix}Länka till artikelns titel, inte dess DOI‑nummer.</p><div class="why"><p>APA‑stilen rekommenderar beskrivande länktext så att användare snabbt kan identifiera länkar.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Lägg till en beskrivande länktext eller ta bort länken om den skapades av misstag.</p><div class="why"><p>Skärmläsare hanterar tomma länkar dåligt och kan läsa upp URL tecken för tecken.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>Länken har ett <code>aria-labelledby</code>‑attribut som inte matchar något ID.</p><p>${why.fix}Korrigera ID‑kopplingen eller ta bort attributet.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Lägg till beskrivande text eller ta bort länken om den är oavsiktlig.</p><div class="why"><p>Skärmläsare kan inte tolka tomma länkar.</p></div>`,

	LINK_FILE_EXT: `<p>Länken leder till en fil (PDF, MP3, ZIP, Word) utan att informera användaren.</p><p>${why.fix}Lägg till text eller ikon som https://itmaybejj.github.io/linkpurpose/anger filtypen</a>.</p><p class="why">För större filer, ange storleken, t.ex. "Årsrapport (PDF, 3 MB)".</p>`,

	LINK_IDENTICAL_NAME: `<p>Flera länkar använder samma namn "<strong>%(TEXT)</strong>" men leder till olika mål.</p><p>${why.fix}Gör varje länknamn unikt och beskrivande.</p>${why.links}`,

	LINK_IMAGE_ALT: `Se till att denna alt‑text beskriver länkmålet:</p><p>{L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Kontrollera att alt‑texten hjälper till att beskriva länken utan att vara redundant:</p><p><strong class="badge">Alt</strong> "<em><strong>%(alt)</strong></em>"</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p>Enligt https://webaim.org/techniques/hypertext/link_text#alt_linkWebAIM</a> bör alt‑text för bildlänkar beskriva länkmålet. För lång alt‑text tyder på att den beskriver bilden i stället för länken.</p>Alt‑textens längd: %(altLength) tecken: <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>När en bild är en del av en länk används alt‑texten som länkens namn.</p><p>${why.fix}Sätt alt‑text som beskriver länkmålet.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'Bilden är markerad som dekorativ trots att omgivande text används som länknamn.',

	LINK_NEW_TAB: `<p>${why.fix}Få länken att öppnas i samma flik, eller https://itmaybejj.github.io/linkpurpose/informera användaren</a> om den öppnas i en ny flik.</p><div class="why"><p>Tvångsöppning i ny flik kan vara förvirrande, särskilt när tillbakaknappen inte fungerar som väntat.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>Alt‑texten är en platshållare: "<strong>%(alt)</strong>".</p><p>${why.fix}Sätt alt‑text baserat på länkmålet.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Länken innehåller onödig text som inte beskriver målet:<br><strong>%(text)</strong></p><p>${why.fix}Skriv om så att länktexten tydligt beskriver sitt mål.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>ARIA anger ett meningsfullt namn, men den synliga länktexten är generisk: "<strong {C}>%(ERROR)</strong>".</p><p>${why.fix}Ge meningsfull synlig länktext som matchar det tillgängliga namnet.</p>${why.links}`,

	LINK_SUS_ALT: `<p>Alt‑texten innehåller "%(alt)", vilket kan betyda att den beskriver bilden och inte länken.</p><strong class="badge">Alt‑text</strong> "%(ALT_TEXT)"    <p>Lösning: låt alt‑texten beskriva länkens mål.</p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Undvik att använda symboler som call‑to‑action i länkar om de inte är dolda för hjälpmedel. Skärmläsare kan uttala dem opålitligt. Överväg att ta bort: <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Använd en beskrivande titel i stället för URL som länktext.</p><div class="why"><p>Användare skannar länkar via deras namn — URL:er är svåra att läsa och identifiera.</p></div>`,

	META_LANG: `<p>${why.fix}Lägg till ett https://www.w3.org/International/questions/qa-html-language-declarationsspråkattribut</a> i HTML‑taggen.</p><div class="why"><p>Skärmläsare använder detta för korrekt uttal.</p></div>`,

	META_MAX: `<p>Detta meta‑tagg begränsar användarens zoom.</p><p>${why.fix}Tillåt full zoom genom att ta bort eller ändra taggen.</p>`,

	META_REFRESH: `<p>Automatiska uppdateringar med meta‑tagg kan störa användaren och göra att formulärdata förloras.</p><p>${why.fix}Använd AJAX eller informera användaren innan uppdatering.</p>`,

	META_SCALABLE: `<p>Detta meta‑tagg förhindrar zoomning.</p><p>${why.fix}Ändra eller ta bort för att tillåta zoom.</p>`,

	META_TITLE: `<p>${why.fix}Lägg till ett <code><title></code>‑element inne i <code><head></code>.</p><div class="why"><p>En kort och unik https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/titlesidtitel</a> är viktigt för:</p><ul><li>Sökresultat</li><li>Fliknamn</li><li>Skärmläsare vid flikbyte</li></ul><p>Utan titel ser användaren bara URL:en.</p></div>`,

	MISSING_ALT: `<p>Utan alt läser skärmläsare upp bildens URL tecken för tecken.</p><p>${why.fix}Lägg till alt="" för dekorativa bilder eller beskrivande alt för meningsfulla bilder.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>När en bild i en länk saknar alt läses bildens URL upp, vilket är särskilt problematiskt.</p><p>${why.fix}Lägg till alt som beskriver länkmålet.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Bilden är del av en länk som har text. Om texten tydligt beskriver målet, använd alt="". Annars lägg till alt som beskriver länkmålet.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>Länken verkar gå till en utvecklingsmiljö:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Byt till relativ sökväg (/folder) eller offentlig URL.</p>`,

	QA_BLOCKQUOTE: `<p>Blockquote läses upp som "citat". Korta citat är ofta avsedda att vara rubriker.</p><p>${why.fix}Om detta är en rubrik, använd rubrikformat.</p>${why.headings}`,

	QA_DOCUMENT: `<p>Länkade dokument är också webbinnehåll och måste vara tillgängliga. Se till att de har rubriker, korrekta tabeller och alt‑texter.</p><ul class="why"><li>Gör Google‑dokument tillgängliga: https://support.google.com/docs/answer/6199477?hl=sv</a></li><li>Gör Office‑dokument tillgängliga: https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155</a></li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}Om denna feta text introducerar ett nytt ämne, använd en riktig rubrik i stället.</p><div class="why"><p>Rubriker skapar struktur för hjälpmedel.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Om "%(text)" är del av en lista, formatera det som en lista.</p><div class="why"><p>Listor har både visuell och teknisk struktur:</p><ol><li>Jämna indrag förbättrar läsbarheten.</li><li>Skärmläsare säger "punkt 3 av 7".</li></ol><p>Text som börjar med en siffra är inte automatiskt en lista.</p></div>`,

	QA_IN_PAGE_LINK: `<p>Länkmålet för denna interna länk finns inte på sidan.</p><div class="why"><p>Utvecklaranteckning: Om detta är en JavaScript‑händelse, säkerställ tangentbordstöd.</p></div>`,

	QA_JUSTIFY: `<p>Marginaljusterad text skapar ojämna mellanrum och gör text svårare att läsa.</p><p>${why.fix}Använd vänsterjusterad text.</p>`,

	QA_NESTED_COMPONENTS: 'Undvik nästagade interaktiva element som accordion‑komponenter i flera nivåer eller flikar inuti flikar. Detta försvårar navigering och kan leda till missat innehåll.',

	QA_PDF: `<p>${why.fix}Gör en av följande och ignorera sedan varningen:</p><ul><li>Länka till en webbsida i stället för PDF,</li><li>eller ge både PDF och webbvänlig version,</li><li>eller säkerställ att PDF:en är korrekt taggad med rubriker, läsordning och alt‑texter.</li></ul><div class="why"><p>Mobil- och skärmläsaranvändare föredrar ofta webbsidor framför PDF.</p></div>`,

	QA_SMALL_TEXT: 'Text som är för liten är svår att läsa, särskilt för personer med nedsatt syn. Undvik för små typsnitt.',

	QA_STRONG_ITALICS: `<p>${why.fix}Använd fetstil och kursiv sparsamt — endast för viktiga ord eller korta fraser.</p><div class="why"><p>Obs: Om detta är ett citat, använd blockquote.</p></div>`,

	QA_SUBSCRIPT: `Upphöjd och nedsänkt text gör text mindre läsbar. Använd endast för kemiska formler (H<sub>2</sub>O), ordningstal (4<sup>e</sup>), eller fotnoter.`,

	QA_UNDERLINE: `<p>Understruken text betyder vanligtvis ”länk”. Användare kommer tro att texten är klickbar.</p><p>${why.fix}Använd <strong>fetstil</strong> eller <em>kursiv</em> för betoning i stället.</p><div class="why"><p>Hjälpmedel annonserar inte visuell stil, endast struktur såsom rubriker.</p></div>`,

	QA_UPPERCASE: `<p>TEXT MED BARA VERSALER ÄR SVÅRLÄST OCH KAN UPPFATTAS SOM ATT MAN ”ROPAR”.</p><p>${why.fix}Använd hellre fetstil än versaler för betoning.</p><div class="why"><p>Skärmläsare annonserar inte stil som fetstil — använd rubriker för strukturella övergångar.</p></div>`,

	SUS_ALT: `<p>Alt‑texten innehåller "%(alt)", vilket kan vara överflödigt:</p><p><strong class="badge">Alt‑text</strong> "%(ALT_TEXT)"</p><p>Lösning: skriv om alt‑texten så att den kort beskriver betydelsen.</p><div class="why"><p>Tips: Skärmläsare säger redan att detta är en ”bild”, så uttryck som ”bild av” är oftast onödiga.</p></div>`,

	TABINDEX_ATTR: `<p>${why.fix}Använd aldrig positiv tabindex. Ordna i stället HTML‑strukturen så att visuell ordning, tabbordning och läsordning matchar.</p><div class="why"><p>Som standard matchar dessa tre ordningar varandra.</p><p>Positiv tabindex flyttar elementet i tabbningen men inte visuellt, vilket kan förvirra användare.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Alla tabellhuvuden måste innehålla text.</p><div class="why"><p>Skärmläsare använder rubriker för att ge sammanhang i tabeller.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Ange om tabellhuvuden finns i första raden, första kolumnen eller båda.</p><div class="why"> <p>Skärmläsare upprepar relevant rad‑ eller kolumnrubrik vid cellnavigering.</p><p>Om tabellen bara används för layout bör du ta bort tabellstrukturen.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Ta bort detta innehåll som är formaterat som rubrik (h2, h3). Använd tabellhuvuden i stället. Om flera nivåer behövs, dela tabellen i flera.</p><div class="why"> <p>Tabellhuvuden gäller för rader eller kolumner, medan sidhuvuden gäller för allt innehåll under dem.</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2"><strong>Tabellhuvud</strong> i cell 2 märker cell B.<br><br><strong>Sidrubrik</strong> i cell 2 märker 3, A, B, C och hela texten.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,

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
	NOT_VISIBLE: 'Obs: detta innehåll kan vara dolt. Leta efter det i det markerade området.',
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
	errorOutlinePrefixHeadingIsLong: '(markerad för längd)',
	errorOutlinePrefixSkippedLevel: '(markerad för överhoppad nivå)',
	issueContent: 'Innehållsproblem',
	issueDeveloper: 'Utvecklingsproblem',
	issueTemplate: 'Mallproblem',
	main_toggle_hide: 'Dölj tillgänglighetsverktyg',
	main_toggle_hide_alerts: 'Dölj tillgänglighetsvarningar',
	main_toggle_show: 'Visa tillgänglighetsverktyg',
	main_toggle_show_alerts: 'Visa tillgänglighetsvarningar',
	panelCheckAltText: '<p class="ed11y-small">Se till att varje bilds alt‑text beskriver dess betydelse i sammanhanget och att det inte finns bilder med inbäddad text.</p>',
	panelCheckOutline: '<p class="ed11y-small">Detta visar sidans rubrikstruktur. Kontrollera att den speglar sidans visuella organisation.</p>',
	PANEL_HEADING_MISSING_ONE: 'Rubrik på nivå 1 saknas.',
	PANEL_NO_HEADINGS: 'Inga rubriker hittades.',
	reportsLink: 'Öppna webbplatsrapporter',
	toggleDisabled: 'Ingen innehåll finns att granska med Editoria11y.',
	transferFocus: 'Redigera detta innehåll',
	unDismissHideButton: 'Återställ denna avfärdade varning',
	unDismissNotePermissions: 'Denna varning döljs av en administratör',
	unDismissOKButton: 'Återställ denna varning markerad som OK',
};

const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips),
  testNames: testNames,
};

export default newStrings;
