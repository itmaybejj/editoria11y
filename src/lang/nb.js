import strings from '../sa11y-lang/nb.js';

// todo check each file for link integrity, and escaping of tags in code blocks.
export const testNames = {
	ALT_FILE_EXT: 'Denne alternative teksten er et filnavn, ikke en beskrivelse',
	ALT_MAYBE_BAD: 'Denne alternative teksten kan ikke uttales av en skjermleser',
	ALT_PLACEHOLDER: 'Denne alternative teksten er en meningsløs plassholder',
	ALT_UNPRONOUNCEABLE: 'Denne alternative teksten er umulig å uttale',
	BTN_EMPTY: 'Knappen har ikke en tilgjengelig etikett',
	BTN_EMPTY_LABELLEDBY: 'Knappen har en ugyldig ARIA‑etikett',
	BTN_ROLE_IN_NAME: 'Knappens navn gjentar ordet "button"',
	CONTRAST_ERROR: 'Teksten har ikke tilstrekkelig kontrast til å være lett å lese',
	CONTRAST_ERROR_GRAPHIC: 'Grafikken eller ikonet har ikke tilstrekkelig kontrast',
	CONTRAST_INPUT: 'Inndatafeltet har ikke tilstrekkelig kontrast til å være lett å lese',
	CONTRAST_PLACEHOLDER: 'Plassholderteksten har ikke tilstrekkelig kontrast til å være lett å lese',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Har denne plassholderteksten tilstrekkelig kontrast?',
	CONTRAST_WARNING: 'Har denne teksten tilstrekkelig kontrast?',
	CONTRAST_WARNING_GRAPHIC: 'Har denne grafikken eller dette ikonet tilstrekkelig kontrast?',
	DUPLICATE_ID: 'Duplisert ID‑attributt',
	DUPLICATE_TITLE: 'Denne lenken har et verktøytips med samme tekst som lenken',
	EMBED_AUDIO: 'Har denne lydfilen en transkripsjon?',
	EMBED_DATA_VIZ: 'Er denne visualiseringen tilgjengelig?',
	EMBED_GENERAL: 'Integrerte iframes krever manuell gjennomgang',
	EMBED_MISSING_TITLE: 'Ramme mangler "title"-attributt',
	EMBED_UNFOCUSABLE: 'En ramme med tabindex="-1" vil ikke være tastaturnavigerbar.',
	EMBED_VIDEO: 'Har denne videoen korrekte undertekster?',
	HEADING_EMPTY: 'Denne overskriften mangler tekst',
	HEADING_EMPTY_WITH_IMAGE: 'Dette bildet brukes som en overskrift og trenger alternativ tekst',
	HEADING_FIRST: 'Den første overskriften på siden er en underoverskrift',
	HEADING_LONG: 'Kan denne overskriften være kortere?',
	HEADING_MISSING_ONE: 'Denne siden mangler en overskrift på nivå 1',
	HEADING_SKIPPED_LEVEL: 'Denne overskriften har feil nivå',
	HIDDEN_FOCUSABLE: 'Dette elementet kan ikke beskrives av skjermlesere',
	IMAGE_ALT_TOO_LONG: 'Kan denne alternative teksten være kortere?',
	IMAGE_DECORATIVE: 'Er dette bildet virkelig dekorativt?',
	IMAGE_DECORATIVE_CAROUSEL: 'Bilde i karusell eller galleri er merket som dekorativt',
	IMAGE_FIGURE_DECORATIVE: 'Manuell gjennomgang: figur med bilde og bildetekst, men uten alternativ tekst',
	IMAGE_FIGURE_DUPLICATE_ALT: 'Alternativ tekst skal ikke være identisk med bildeteksten',
	LABELS_ARIA_LABEL_INPUT: 'Finnes det en synlig etikett for dette feltet?',
	LABELS_PLACEHOLDER: 'Manuell gjennomgang: plassholdertekst',
	LABELS_INPUT_RESET: 'Er denne tilbakestillingsknappen nødvendig?',
	LABEL_IN_NAME: 'Den synlige etiketten samsvarer ikke med den usynlige etiketten',
	LINK_ALT_FILE_EXT: 'Alternativ tekst brukt som lenke bør ikke være en URL',
	LINK_ALT_MAYBE_BAD: 'Denne alternative teksten i lenken kan ikke uttales av en skjermleser',
	LINK_ALT_UNPRONOUNCEABLE: 'Bilder brukt som lenker må ha uttalbar alternativ tekst',
	LINK_CLICK_HERE: 'Manuell gjennomgang: lenken inneholder "klikk her"',
	LINK_DOI: 'Koble til artikkeltitler, ikke DOI‑numre',
	LINK_EMPTY: 'Denne lenken mangler tekst',
	LINK_EMPTY_LABELLEDBY: 'Lenke med ugyldig "aria‑labelledby"-attributt',
	LINK_EMPTY_NO_LABEL: 'Denne lenken trenger en etikett',
	LINK_FILE_EXT: 'Lenken peker på en fil uten advarsel',
	LINK_IDENTICAL_NAME: 'Beskriver denne lenken målet sitt på en unik måte?',
	LINK_IMAGE_ALT: 'Manuell gjennomgang: bilde brukt som lenke med alternativ tekst',
	LINK_IMAGE_ALT_AND_TEXT: 'Gir denne alternative teksten mening som del av lenken?',
	LINK_IMAGE_LONG_ALT: 'Kan denne alternative teksten være kortere?',
	LINK_IMAGE_NO_ALT_TEXT: 'Dette bilde som lenke trenger alternativ tekst',
	LINK_IMAGE_TEXT: 'Manuell gjennomgang: bilde inne i lenke er merket som dekorativt.',
	LINK_NEW_TAB: 'Åpner denne lenken en ny fane uten advarsel?',
	LINK_PLACEHOLDER_ALT: 'Dette bilde som lenke trenger meningsfull alternativ tekst',
	LINK_STOPWORD: 'Beskriver denne lenken målet sitt?',
	LINK_STOPWORD_ARIA: 'Meningsfull lenketekst er kun tilgjengelig via ARIA‑etikett for skjermlesere',
	LINK_SUS_ALT: 'Beskriver denne alternative teksten bildet eller lenken?',
	LINK_SYMBOLS: 'Manuell gjennomgang: er symbolene eller emojiene i lenken meningsfulle?',
	LINK_URL: 'Lenketekst bør ikke være en URL',
	META_LANG: 'Meta‑tagg for sidens språk mangler',
	META_MAX: 'Meta‑tagg begrenser hvor mye brukerne kan zoome inn på tekst',
	META_REFRESH: 'Meta‑tagg oppdaterer siden automatisk',
	META_SCALABLE: 'Meta‑tagg hindrer brukeren i å zoome inn på tekst',
	META_TITLE: 'Meta‑tagg for sidetittel mangler',
	MISSING_ALT: 'Ugyldig HTML: bilde uten alt‑attributt',
	MISSING_ALT_LINK: 'Ugyldig HTML: bilde brukt som lenke uten alt‑attributt',
	MISSING_ALT_LINK_HAS_TEXT: 'Ugyldig HTML: bilde inne i lenke uten alt‑attributt',
	QA_BAD_LINK: 'Manuell gjennomgang: lenken kan ha ugyldig mål',
	QA_BLOCKQUOTE: 'Bør dette sitatet være en overskrift?',
	QA_DOCUMENT: 'Er dette dokumentet tagget for skjermlesere?',
	QA_FAKE_HEADING: 'Bør denne uthevede teksten være en overskrift?',
	QA_FAKE_LIST: 'Bør dette være formatert som en liste?',
	QA_IN_PAGE_LINK: 'Intern lenke fungerer ikke',
	QA_JUSTIFY: 'Ikke juster tekst i begge marger',
	QA_NESTED_COMPONENTS: 'Nestede interaktive komponenter',
	QA_PDF: 'Finnes det et alternativ til denne PDF‑filen?',
	QA_SMALL_TEXT: 'Teksten er for liten',
	QA_STRONG_ITALICS: 'Store blokker med uthevet eller kursiv tekst er vanskelige å lese',
	QA_SUBSCRIPT: 'Ikke bruk hevet eller senket skrift som visuell formatering',
	QA_UNDERLINE: 'Kun lenker bør være understreket',
	QA_UPPERCASE: 'Er denne teksten i store bokstaver nødvendig?',
	SUS_ALT: 'Er det unødvendige ord i denne alternative teksten?',
	TABINDEX_ATTR: 'tabindex‑attributtet bryter leseordenen',
	TABLES_EMPTY_HEADING: 'Denne tabelloverskriftscellen trenger tekst',
	TABLES_MISSING_HEADINGS: 'Denne tabellen mangler overskriftsrad og/eller kolonneoverskrifter',
	TABLES_SEMANTIC_HEADING: 'Innholdsoverskrifter bør ikke brukes inni tabeller',
	UNCONTAINED_LI: 'Ugyldig HTML‑liste',
};

const why = {
	fix: `<strong class="badge">Slik løser du det</strong> `,
	check: `<strong class="badge">Manuell kontroll</strong> `,

	buttons: `<div class="why"><p>Merk: Den tilgjengelige navnet til en knapp må gjøre det klart hva den gjør. Knapper som endrer funksjon når de klikkes, må også endre navnet sitt:</p><ul>
<li>Skiftende etiketter:<br>"Spill av/Pause", "Vis detaljer/Skjul detaljer"</li>
<li>Endring i <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">ARIA‑tilstandsattributter</a>:<br>"Spill av/Spill av, trykket", "Detaljer, lukket/Detaljer, åpnet."</li>
</ul>
<p>Ikke endre både etiketten og tilstands‑attributtet samtidig. Å endre "Spill av" til "Pause, trykket" ville bety at spilleren er i pause, ikke at den spiller.</p></div>`,

	headings: `<div class="why"><p>Tips: Overskrifter og underoverskrifter organiserer innholdet i en hierarkisk struktur. Brukere av skjermlesere er avhengige av denne strukturen for å forstå og navigere på siden:</p><ul>
<li>Overskrift nivå 1: sidetittel
<ul><li>Overskrift nivå 2: hovedtemaer
<ul><li>Overskrift nivå 3: undertemaer</li></ul>
</li></ul>
</li>
</ul></div>`,

	images: `<div class="why"><p>Tips: Når du skriver alternativ tekst, beskriv hva bildet <em>betyr</em>, ikke bare hva det viser. Avhengig av kontekst kan et bilde av et barn som sparker en ball bety:</p><ul>
<li>De spilte ute i kraftig regn.</li>
<li>De nye lagdraktene har stilige drage‑logoer.</li>
<li>Hun scoret vinnermålet fra venstrekanten!</li>
</ul></div>`,

	links: `<div class="why"><p>Folk skanner siden ved å lese lenker og bruker søk i siden for å finne dem. Derfor må gode lenker være meningsfulle, unike og konsise:</p><ul>
<li>Ideelt: "Lær mer om <a href="https://webaim.org/techniques/hypertext/link_text">meningsfulle lenker</a>"</li>
<li>Ikke unikt: "Klikk <a href="https://webaim.org/techniques/hypertext/link_text">her</a> for å lære mer om meningsfulle lenker."</li>
<li>Ikke konsist: "<a href="https://webaim.org/techniques/hypertext/link_text">Klikk her for å lære mer om meningsfulle lenker</a>"</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>Målet med alternativ tekst er å formidle hva et bilde betyr, ikke bare hva det inneholder. Hvis et bilde er en lenke, er betydningen av bildet <strong>lenkens mål</strong>:</p><ul>
<li>"<em>Forstørrelsesglass</em>" beskriver et bilde, ikke en lenke.</li>
<li>"<em>Søkeforstørrelsesglass</em>" beskriver begge deler på en uklar måte.</li>
<li>"<em>Søk</em>" beskriver korrekt hva lenken leder til.</li>
</ul></p></div>`,
};

export const tips = {

	ALT_FILE_EXT: `<p>Skjermlesere vil lese opp denne URL‑en, ofte én bokstav om gangen. Dette gir sannsynligvis ikke samme mening som å se bildet.</p><p>${why.fix}Legg til en tom alt (alt="") dersom dette er ren dekorasjon som bør ignoreres av skjermlesere, eller legg til en beskrivende alternativ tekst.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Oppgitt beskrivelse for dette bildet: <strong>"%(alt)"</strong></p><p>${why.fix}Angi den alternative teksten som en kort beskrivelse av hva bildet betyr i denne konteksten.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Oppgitt beskrivelse for dette bildet: <strong>"%(alt)"</strong></p><p>${why.fix}Angi den alternative teksten som en kort beskrivelse av hva bildet betyr i denne konteksten.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>Den alternative teksten for dette bildet er "%(alt)", som kun inneholder symboler og/eller mellomrom som ikke kan uttales. Skjermlesere vil annonsere bildet og deretter gjøre en merkbar pause: "bilde: ____."</p><p>${why.fix}Legg til en beskrivende alternativ tekst, eller en helt tom alt (alt="") dersom dette kun er et ikon eller en visuell avstand som bør ignoreres.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Bruk en gyldig metode for å fortelle skjermlesere hva knappen gjør, for eksempel tekst, alternativ tekst på et ikon, eller et title‑attributt.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Denne knappen har et <code>aria-labelledby</code>‑attributt som er tomt eller ikke samsvarer med et <code>ID</code> på siden.</p><p>${why.fix}Koble ID‑en til et eksisterende element, eller fjern attributtet og beskriv knappen på en annen måte.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'Et bakgrunnsbilde eller en gradient gjør at denne sjekken ikke med sikkerhet kan vite hvilken farge som ligger bak teksten. Bruk fargevelgeren nedenfor for en manuell kontroll.',

	DUPLICATE_ID: `<p>ID‑er brukes på denne siden som etiketter eller lenkemål og må derfor være unike.</p><p>${why.fix}Endre denne ID‑en: <strong>#%(id)</strong></p><div class="why"><p>I de fleste CMS‑systemer kommer dette fra et felt kalt “name” eller “id” i egenskapsdialogen. I HTML er det et attributt: <code><a id="MY-ID"></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Fjern <code>title</code>‑attributtet fra denne lenken.</p><div class="why"><p>Merk: <code>title</code>‑verktøytips vises kun ved musepeker. De er ikke synlige for brukere på mobil eller ved tastaturnavigasjon, så mange vil aldri se dem. De bør aldri inneholde viktig eller unik informasjon.</p></div>`,

	EMBED_AUDIO: `<p>Hvis lydfilen inneholder tale, må det leveres en <a href="https://www.w3.org/WAI/media/av/transcribing/">tekstlig alternativ versjon</a> på siden eller via lenke.</p><p>Automatisk genererte transkripsjoner må gjennomgås av en person for å sikre at talere og viktige lydeffekter er riktig identifisert.</p>`,

	EMBED_DATA_VIZ: `<p>Integrerte visualiserings‑widgets er ofte vanskelige eller umulige å bruke for assistive teknologier, kan være vanskelige å tolke for svaksynte eller fargeblinde brukere, og kan kreve omfattende horisontal scrolling på mobil.</p><p>${why.fix}Med mindre denne widgeten har sterk visuell kontrast, full tastaturstøtte <strong><em>og</em></strong> kan beskrives av en skjermleser, bør du tilby en likeverdig alternativ versjon som tekstbeskrivelse, datatabell eller nedlastbar regneark‑fil.</p>`,

	EMBED_GENERAL: 'Automatiske kontrollverktøy kan ikke undersøke innhold inne i embed‑elementer. Sørg for at bilder har alternativ tekst, videoer har undertekster, tekst har nok kontrast, og at lenker og knapper er <a href="https://webaim.org/techniques/keyboard/">tastaturnavigerbare</a>, og avvis deretter denne advarselen.',

	EMBED_MISSING_TITLE: `<p>Innebygde elementer trenger et tilgjengelig navn som beskriver innholdet for skjermlesere.</p><p>${why.fix}Legg til et unikt <code>title</code> eller <code>aria-label</code>.</p>`,

	EMBED_UNFOCUSABLE: `Dette attributtet instruerer tastaturer og assistive teknologier om å hoppe over elementet. Med mindre innholdet i iframen ikke inneholder lenker, knapper, skjemaelementer og heller ikke kan rulles, må attributtet fjernes.`,

	EMBED_VIDEO: `<p>Videoer må inkludere undertekster.</p><p>Automatisk genererte undertekster må revideres manuelt for å sikre at talere og viktige lyder identifiseres korrekt.</p><p>${why.fix}Legg til eller rett undertekstene og avvis denne advarselen.</p>`,

	HEADING_EMPTY: `<p>Tomme overskrifter skaper forvirrende hull i sidestrukturen.</p><p>${why.fix}Legg til tekst i denne overskriften eller fjern den tomme linjen.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Tomme overskrifter skaper forvirrende hull i sidestrukturen.</p><p>${why.fix}Hvis dette ikke skal være en overskrift, bytt format fra <strong {C}>Overskrift %(level)</strong> til <strong>Avsnitt</strong>. Hvis det skal være en overskrift, legg bildets betydning inn i alt‑teksten.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Sørg for at sidens tittel er merket som Overskrift 1 eller Overskrift 2. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}Med mindre dette er en fastlagt tittel (for eksempel en publisert artikkel), gjør overskriften kortere for å hjelpe brukere å skanne innholdet.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Merk sidens tittel som overskrift på nivå 1 for å indikere starten på dokumentstrukturen.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Denne overskriften hoppet fra <strong>nivå %(prevLevel)</strong> til <strong>nivå %(level)</strong>. For en skjermleser høres dette ut som om innhold mangler.</p><p>${why.fix}Juster nivåene slik at strukturen blir sammenhengende.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: 'Dette interaktive elementet har <code>aria-hidden="true"</code>, men kan fortsatt fokuseres med tastatur. Hvis du <strong>ønsker</strong> å skjule det for skjermlesere, må du også legge til <code>tabindex="-1"</code>. Hvis ikke, fjern <code>aria-hidden="true"</code>.',

	IMAGE_ALT_TOO_LONG: `<p>Alternativ tekst leses opp som én sammenhengende setning; hvis brukeren mister en del, må hele teksten gjentas.</p><p>Den alternative teksten på %(altLength) tegn er: <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Tips: komplekse bilder som formidler mer enn én setning bør ha en <strong>synlig</strong> bildetekst eller separat utvidet beskrivelse.</p></div>`,

	IMAGE_DECORATIVE: `<p>Dette bildet er skjult for skjermlesere ved hjelp av en tom alt. Kun bilder uten mening — som redundante ikoner eller dekorative teksturer — bør skjules slik.</p><p>${why.fix}Hvis bildet bidrar meningsfullt, legg til alternativ tekst.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'Bildet er markert som <strong>dekorativt</strong>, men alle bilder i en karusell eller et galleri må ha beskrivende alternativ tekst.',
	IMAGE_FIGURE_DECORATIVE: `<p>Dette bildet vil bli ignorert av hjelpemiddelteknologi. Gir bildeteksten mening uten selve bildet?</p><p>${why.fix}Hvis bildeteksten ikke beskriver den visuelle betydningen, legg til alternativ tekst for det som mangler i beskrivelsen.</p><div class="why"><p>Tips: bilder, alternativ tekst og bildetekster fungerer sammen:</p><ul><li>Synlige bildetekster gir kontekst og tolkning.</li><li>Alt‑tekst beskriver bildet for brukere som ikke kan se det, slik at de forstår hva bildeteksten refererer til.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Endre alt‑teksten slik at den beskriver den visuelle betydningen av bildet.</p><div class="why"><p>Tips: bilder, alternativ tekst og bildetekster fungerer sammen:</p><ul><li>Synlige bildetekster gir kontekst og tolkning.</li><li>Alt‑tekst beskriver bildet slik at leseren vet hva bildeteksten handler om.</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: '<p><strong {B}>Usynlig feltetikett:</strong> <strong {C}>%(TEXT)</strong></p><p>Sjekk at det finnes en synlig etikett, at den forblir synlig når man skriver i feltet, og at den samsvarer med den usynlige tilgjengelige navnet.</p><div class="why"><p>Etiketter som kun gis via title eller placeholder forsvinner når brukeren begynner å skrive, noe som gjør det vanskelig å kontrollere feltverdiene.</p></div>',

	LABELS_INPUT_RESET: `<p>Tilbakestillingsknapper trykkes lett ved et uhell og kan føre til tap av data uten mulighet til å angre.</p><p>${why.fix}Med mindre knappen kun tilbakestiller ett enkelt felt, vurder å fjerne den eller kreve en bekreftelse før handlingen utføres.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'Bildeknappen mangler alt‑tekst. Legg til alternativ tekst for å gi et tilgjengelig navn, for eksempel <em>Søk</em> eller <em>Send</em>.',

	LABELS_MISSING_LABEL: 'Det finnes ingen etikett knyttet til dette feltet. Legg til et <code>id</code> på feltet og et tilsvarende <code>for</code>‑attributt på etiketten.',

	LABELS_NO_FOR_ATTRIBUTE: 'Ingen etikett er knyttet til dette feltet. Legg til et <code>for</code>‑attributt på etiketten som samsvarer med feltets <code>id</code>.<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>Plassholdertekst forsvinner så snart brukeren begynner å skrive, og har ofte utilstrekkelig kontrast eller kan forveksles med reelt innhold.</p><p>${why.fix}Sørg for at viktig informasjon, som feltetiketter, hjelpetekster og formateringsinstruksjoner, alltid er synlige – også etter at man har skrevet i feltet.</p>`,

	LABEL_IN_NAME: `<p>Den synlige teksten for dette elementet ser ut til å avvike fra det tilgjengelige navnet. Dette kan forvirre skjermleserbrukere og hindre stemmestyring.</p><p>${why.check}Sørg for at den synlige teksten starter med den usynlige etiketten og ikke inneholder ekstra betydningsfull informasjon.</p><p><strong>Usynlig etikett:</strong> "%(TEXT)"</p>`,

	LINK_ALT_FILE_EXT: `<p>Alt‑teksten for dette bildet inneholder "%(alt)", noe som sannsynligvis betyr at det er et filnavn og ikke et meningsfullt navn på lenkens mål.</p><p>${why.fix}Sett alt‑teksten til navnet på lenkens destinasjon.</p><div class="why"><p>Alt‑tekst skal formidle betydningen av bildet. For et bilde som er en lenke, er betydningen lenkens mål:</p><ul><li>"Side med tekst" beskriver bildet, ikke lenken.</li><li>"IMG_1234.jpg" er bare et filnavn.</li><li>"<strong><em>Registreringsskjema (.doc)</em></strong>" er en faktisk destinasjon.</li></ul></p></div>`,

	LINK_ALT_MAYBE_BAD: `<p>Alt‑teksten for dette bildet er en plassholder: "<strong>%(alt)</strong>".</p><p>${why.fix}Sett alt‑teksten til lenkens mål.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>Alt‑teksten for dette lenkede bildet inneholder kun symboler eller blanke tegn: "%(ALT_TEXT)". Skjermlesere kan ikke beskrive det.</p><p>${why.fix}Sett alt‑teksten til formålet eller destinasjonen for lenken.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `Uttrykk som "klikk" eller "klikk her" er unødvendige og tar oppmerksomheten bort fra hva lenken faktisk gjør.`,

	LINK_DOI: `<p>${why.fix}Koble til artikkeltittelen og la DOI‑nummeret stå som ren tekst, i stedet for å lenke DOI og la tittelen være uten lenke.</p><div class="why"><p><a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA anbefaler</a> beskrivende lenketekster fordi brukere skanner lenkelister etter navn.</p><p>Dette gjør det også mulig for skjermlesere å annonsere meningsfulle lenker i stedet for tallrekker.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Legg til tekst som beskriver lenkens destinasjon, eller slett lenken hvis den ble laget ved en feil, som et lenket mellomrom.</p><div class="why"><p>Skjermlesere har problemer med tomme lenker og kan forbli stille eller lese opp hele URL‑en.</p><p>Lenkede mellomrom kan være vanskelige å fjerne i enkelte redigeringsverktøy og kan kreve at teksten rundt omskrives.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>Denne lenken har et <code>aria-labelledby</code> som ikke samsvarer med noen <code>ID</code> på siden.</p><p>${why.fix}Korriger ID‑henvisningen eller fjern attributtet og gi lenken et annet tilgjengelig navn.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Legg til tekst som beskriver destinasjonen, eller slett lenken hvis den er laget ved en feil.</p><div class="why"><p>Skjermlesere kan ha problemer med å håndtere tomme lenker og kan lese opp URL‑en bokstav for bokstav.</p><p>Lenkede mellomrom krever ofte at teksten rundt omskrives for å kunne slettes.</p></div>`,

	LINK_FILE_EXT: `<p>Denne lenken peker til en PDF eller annen nedlastbar fil (f.eks. MP3, ZIP, Word) uten advarsel.</p><p>${why.fix}Bruk tekst eller et ikon for å <a href="https://itmaybejj.github.io/linkpurpose/">indikere filtypen</a> direkte i lenken.</p><p class="why">For store filer bør også størrelsen oppgis, f.eks. "Årsrapport (PDF, 3 MB)".</p>`,

	LINK_IDENTICAL_NAME: `<p>Flere lenker til ulike destinasjoner har samme navn: "<strong>%(TEXT)</strong>".</p><p>${why.fix}Omskriv lenketekstene slik at hver av dem unikt beskriver destinasjonen.</p>${why.links}`,

	LINK_IMAGE_ALT: `Sørg for at denne alt‑teksten beskriver lenkens destinasjon:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Sjekk at dette bidrar til å beskrive lenkens mål og ikke legger til unødvendig informasjon:</p><p><strong class="badge">Alt</strong> "<em><strong>%(alt)</strong></em>"</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p><a href="https://webaim.org/techniques/hypertext/link_text#alt_link">Alt‑teksten for et lenket bilde brukes til å beskrive destinasjonen</a>. Lenker bør være korte og tydelige for brukere som skanner lenkelisten. Lang alt‑tekst kan tyde på at teksten beskriver bildet i stedet for lenken.</p>Alt‑teksten for dette bildet er %(altLength) tegn: <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Når et bilde inngår i en lenke, brukes alt‑teksten https://webaim.org/techniques/hypertext/link_text#alt_linksom selve lenken</a>.</p><p>${why.fix}Sett en alt‑tekst som beskriver lenkens formål.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'Bildet er markert som dekorativt, men teksten rundt brukes som lenkens beskrivelse.',

	LINK_NEW_TAB: `<p>${why.fix}Åpne denne lenken i samme fane eller https://itmaybejj.github.io/linkpurpose/gi brukeren et varsel først</a>.</p><div class="why"><p>Brukere kan selv velge å åpne lenker i nye faner. Når et nettsted tvinger dette, kan det være forvirrende — spesielt når tilbake‑knappen ikke fungerer som forventet.</p><p>Merk: I skjemaer åpnes lenker ofte i en ny fane for å hindre tap av data.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>Alt‑teksten for dette lenkede bildet er en plassholder: "<strong>%(alt)</strong>".</p><p>${why.fix}Sett alt‑teksten til lenkens destinasjon.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Denne lenken inneholder tekst som ikke hjelper med å beskrive destinasjonen:<br><strong>%(text)</strong></p><p>${why.fix}Omskriv teksten slik at den konsist beskriver målet.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>En tilgjengelig ARIA‑etikett er oppgitt, men den synlige lenketeksten er generisk: "<strong {C}>%(ERROR)</strong>".</p><p>${why.fix}Skriv meningsfulle lenketekster for alle brukere og sørg for samsvar mellom synlig og tilgjengelig navn.</p>${why.links}`,

	LINK_SUS_ALT: `<p>Alt‑teksten inneholder ordet "%(alt)", noe som ofte betyr at den beskriver bildet fremfor lenken.</p><strong class="badge">Alt‑tekst</strong> "%(ALT_TEXT)"    <p>For å løse dette: sørg for at alt‑teksten beskriver lenkens formål.<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Unngå å bruke symboler som handlingsoppfordringer i lenketekst, med mindre de er skjult for assistive teknologier. Skjermlesere kan uttale dem på forvirrende måter. Vurder å fjerne: <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Bruk en beskrivende tittel som lenketekst i stedet for en URL.</p><div class="why"><p>Brukere skanner lenker etter navn — spesielt brukere av skjermlesere.</p><p>URL‑er som lenketekster er vanskelige å skanne og søke etter.</p></div>`,

	META_LANG: `<p>${why.fix}Legg til et https://www.w3.org/International/questions/qa-html-language-declarationsspråkattributt</a> i HTML‑elementet.</p><div class="why"><p>Skjermlesere trenger riktig språk for å uttale teksten korrekt. Feil språkvalg kan gjøre innholdet vanskelig å forstå.</p></div>`,

	META_MAX: `<p>Denne meta‑taggen begrenser hvor mye brukere kan zoome inn.</p><p>${why.fix}Tillat full zoom ved å endre eller fjerne denne begrensningen.</p>`,

	META_REFRESH: `<p>Sider bør ikke oppdateres automatisk via en meta‑tagg. Dette avbryter leseren og kan føre til tap av data i skjemaer.</p><p>${why.fix}Bruk AJAX eller JavaScript for å oppdatere innholdet på siden og varsle brukeren før handlingen utføres.</p>`,

	META_SCALABLE: `<p>Denne meta‑taggen hindrer brukeren i å zoome inn.</p><p>${why.fix}Tillat zoom ved å endre eller fjerne denne innstillingen.</p>`,

	META_TITLE: `<p>${why.fix}Legg til et <code><title></code>‑element i <code><head></code>-delen av siden.</p><div class="why"><p>https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/titleEn kort og unik tittel</a> er viktig for:</p><ul><li>Søkeresultater</li><li>Nettleserfaner</li><li>Skjermlesere når brukeren bytter fane</li></ul><p>Uten en tittel vil brukeren bare se URL‑en.</p></div>`,

	MISSING_ALT: `<p>Når skjermlesere møter et bilde uten alt‑attributt, vil de lese opp bilde‑URL‑en bokstav for bokstav.</p><p>${why.fix}Legg til alt="" hvis bildet skal ignoreres, eller en beskrivende alternativ tekst hvis bildet er meningsbærende.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Når et bilde inne i en lenke mangler alt, vil skjermlesere lese opp URL‑en til bildefilen. Dette er spesielt problematisk.</p><p>${why.fix}Gi en alt‑tekst som beskriver lenkens mål.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Dette bildet er del av en lenke som også har tekst. Hvis den synlige teksten fullt ut beskriver lenkens mål, bruk alt="" slik at skjermleseren ignorerer bildet. Hvis ikke, legg til en alt‑tekst som beskriver målet.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>Denne lenken ser ut til å peke mot et utviklingsmiljø:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Bytt den ut med en relativ sti (/folder) eller den offentlige URL‑en.</p>`,

	QA_BLOCKQUOTE: `<p>Blockquote‑format angir at teksten er et sitat. Korte sitater er ofte ment å være overskrifter.</p><p>${why.fix}Hvis dette faktisk er en overskrift, bruk et overskriftsnivå.</p>${why.headings}`,

	QA_DOCUMENT: `<p>Dokumenter som lenkes til, regnes som webinnhold og må være tilgjengelige. Kontroller at de har overskrifter, tabell‑overskrifter og alt‑tekst for bilder.</p><ul class="why"><li>Gjør dine https://support.google.com/docs/answer/6199477?hl=nbGoogle‑dokumenter</a> mer tilgjengelige.</li><li>Gjør dine https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155Office‑dokumenter</a> mer tilgjengelige.</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}Hvis denne fete linjen introduserer et tema, bruk heller en faktisk overskriftsstil.</p><div class="why"><p>Tips: overskrifter skaper et navigerbart innholdskart for hjelpemiddelteknologi.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Hvis "%(text)" egentlig er del av en liste, bruk listeformat.</p><div class="why"><p>Lister har både visuell og teknisk struktur:</p><ol><li>De gir jevne innrykk som forbedrer lesbarheten.</li><li>De er maskinlesbare: skjermlesere sier "element 3 av 7".</li></ol><p>Å starte en linje med et tall er ikke nok til å lage en ekte liste.</p></div>`,

	QA_IN_PAGE_LINK: `<p>Målet for denne interne lenken finnes ikke på siden.</p><div class="why"><p>Merk for utviklere: Hvis dette er knyttet til en JavaScript‑hendelse, sjekk at den fungerer med tastatur.</p></div>`,

	QA_JUSTIFY: `<p>Fulljustering legger inn ekstra mellomrom i tekst, noe som gjør det vanskeligere å lese for mange brukere.</p><p>${why.fix}Bruk venstrejustert tekst.</p>`,

	QA_NESTED_COMPONENTS: 'Unngå nestede interaktive komponenter, som faner inne i andre faner eller akkumulatorer inne i akkumulatorer. Dette gjør navigasjon vanskeligere og øker risikoen for at innhold overses.',

	QA_PDF: `<p>${why.fix}Gjør én av følgende og avvis deretter denne advarselen:</p><ul><li>Lenk til en webside i stedet for PDF‑en,</li><li>eller tilby både PDF og en lettlest webversjon,</li><li>eller sørg som minimum for at PDF‑en er tilgjengelig med korrekt tagging, overskrifter og leseorden.</li></ul><div class="why"><p>Brukere, spesielt på mobil og med hjelpemidler, foretrekker nesten alltid websider fremfor PDF‑er.</p></div>`,

	QA_SMALL_TEXT: 'Liten tekst er vanskeligere å lese, spesielt for personer med nedsatt syn. Unngå skriftstørrelser mindre enn standard.',

	QA_STRONG_ITALICS: `<p>${why.fix}Bruk fet og kursiv sparsomt, kun for nøkkelord eller korte fraser.</p><div class="why"><p>Merk: hvis dette er et sitat, bruk blockquote‑elementet i stedet.</p></div>`,

	QA_SUBSCRIPT: `Hevet og senket skrift gjør teksten mindre og vanskeligere å lese. Bruk kun til formål som ordensnumre (4<sup>e</sup>), kjemiske formler (H<sub>2</sub>O) eller fotnotereferanser.`,

	QA_UNDERLINE: `<p>Understreket tekst signaliserer en lenke på web. Brukere vil forvente at teksten er klikkbar.</p><p>${why.fix}Bruk <strong>fet</strong> eller <em>kursiv</em> for utheving, og overskrifter for strukturelle overganger.</p><div class="why"><p>Merk: skjermlesere annonserer ikke visuelle formateringer som understreking; kun overskrifter gir struktur.</p></div>`,

	QA_UPPERCASE: `<p>STORE BLOKKER MED TEKST ER TYNGRE Å LESE OG KAN OPPFATTES SOM ROPING.</p><p>${why.fix}Begrens bruken av store bokstaver og bruk heller fet skrift for utheving.</p><div class="why"><p>Merk: skjermlesere annonserer ikke fet skrift. Bruk overskrifter når teksten introduserer et nytt tema.</p></div>`,

	SUS_ALT: `<p>Alt‑teksten inneholder ordet "%(alt)", noe som sannsynligvis er overflødig:</p><p><strong class="badge">Alt‑tekst</strong> "%(ALT_TEXT)"</p><p>For å korrigere det: skriv om alt‑teksten slik at den kort formidler meningen med bildet.</p><div class="why"><p>Tips: skjermlesere annonserer allerede at dette er et bilde, så uttrykk som “bilde av” er vanligvis unødvendige.</p><p>Dette er kun riktig hvis ordene faktisk er del av innholdet:</p><ul><li>Ikke overflødig: "<em>Et foto i</em> et fotoalbum vist i klassen."</li><li>Overflødig: "<em>Foto av</em> et foto i et fotoalbum..."</li></ul></div>`,

	TABINDEX_ATTR: `<p>${why.fix}Bruk aldri positive tabindex‑verdier. Endre heller rekkefølgen på elementene i HTML slik at visuell rekkefølge, tabulatorrekkefølge og leseorden samsvarer.</p><div class="why"><p>Som standard samsvarer den visuelle plasseringen med tabulatorrekkefølgen og skjermleserens leseorden.</p><p>Positive tabindex‑verdier flytter elementer til toppen av tabulatorrekkefølgen, <strong>men ikke i den visuelle strukturen</strong>, noe som forvirrer brukeren.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Sørg for at hver tabelloverskriftscelle har tekst.</p><div class="why"><p>Tips: skjermlesere bruker overskrifter til å gi kontekst for celler.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Angi i tabellinnstillingene om overskrifter ligger i første rad, første kolonne eller begge.</p><div class="why"> <p>Tips: skjermlesere gjentar relevant rad‑ eller kolonneoverskrift når brukeren flytter seg i tabellen.</p><p>Hvis denne tabellen ikke inneholder data og kun brukes for layout, fjern tabellformateringen.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Fjern overskriftsformatet (h2, h3). Legg inn tabelloverskrifter i stedet. Hvis du trenger flere nivåer av overskrifter, del tabellen i flere.</p><div class="why"> <p>Forklaring: tabelloverskrifter er assosiert enten med rader eller kolonner. Innholdsoverskrifter gjelder alt innhold under dem.</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2"><strong>Tabelloverskrift</strong> i celle 2 merker celle B. <br><br> En <strong>innholdsoverskrift</strong> merker celler 3, A, B og C, samt denne teksten og verktøytipset.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,

};

export const interfaceStrings = {
	ALERT_CLOSE: 'Lukk',
	ALT: 'Alternativ tekst: ',
	DECORATIVE: 'Merket som dekorativ',
	DISMISS: 'Ignorer',
	DISMISS_ALL: 'På denne siden: ignorer',
	edit_page: 'Rediger side',
	edit_layout: 'Rediger oppsett',
	edit_term: 'Rediger term',
	edit_tags: 'Rediger bruker',
	IMAGES: 'Alternativ tekst',
	MAIN_TOGGLE_LABEL: 'Aktiver tilgjengelighetsverktøy',
	MISSING: '(mangler!)',
	NOT_VISIBLE: 'Merk: dette innholdet kan være skjult. Se etter det i det markerte området.',
	NO_IMAGES: 'Ingen bilder funnet.',
	OUTLINE: 'Overskrifter',
	PANEL_DISMISS_BUTTON: `Vis %(dismissCount) skjulte varsler`,
	PANEL_HEADING: 'Vis visualiseringer',
	SKIP_TO_ISSUE: 'Hopp til problemet',
	WARNING: 'manuell gjennomgang nødvendig',
	WARNINGS: 'manuelle gjennomganger nødvendig',
	buttonFirstContent: 'Gå til første varsel',
	buttonHideHiddenAlert: 'Skjul skjult varsel',
	buttonHideHiddenAlerts: `Skjul %(count) skjulte varsler`,
	buttonShowHiddenAlert: 'Vis skjult varsel',
	buttonToolsActive: 'Skjul visualiseringer',
	dismissActions: `Lignende varsler`,
	dismissHideTitle: 'Skjuler varslet kun for deg',
	dismissOkAllButton: 'På denne siden: merk som OK',
	dismissOkButtonContent: 'Merk som OK',
	dismissOkTitle: 'Skjuler varslet for alle redaktører',
	dismissOnSite: 'På alle sider: merk som OK',
	dismissalsHeader: 'Har du ikke tenkt å rette dette?',
	errorOutlinePrefixHeadingEmpty: '(tom overskrift)',
	errorOutlinePrefixHeadingIsLong: '(flagget for lengde)',
	errorOutlinePrefixSkippedLevel: '(flagget for nivåhopp)',
	issueContent: 'Innholdsproblem',
	issueDeveloper: 'Utviklingsproblem',
	issueTemplate: 'Malproblem',
	main_toggle_hide: 'Skjul tilgjengelighetsverktøy',
	main_toggle_hide_alerts: 'Skjul tilgjengelighetsvarsler',
	main_toggle_show: 'Vis tilgjengelighetsverktøy',
	main_toggle_show_alerts: 'Vis tilgjengelighetsvarsler',
	panelCheckAltText: '<p class="ed11y-small">Sjekk at hvert bilde beskriver betydningen i konteksten og at det ikke finnes bilder med tekstinnhold.</p>',
	panelCheckOutline: '<p class="ed11y-small">Dette viser overskriftsstrukturen. Sjekk at den samsvarer med innholdets visuelle organisering.</p>',
	PANEL_HEADING_MISSING_ONE: 'Overskrift nivå 1 mangler.',
	PANEL_NO_HEADINGS: 'Ingen overskrifter funnet.',
	reportsLink: 'Åpne nettstedrapporter',
	toggleDisabled: 'Ingen innhold tilgjengelig for sjekk av Editoria11y.',
	transferFocus: 'Rediger dette innholdet',
	unDismissHideButton: 'Gjenopprett dette ignorerte varselet',
	unDismissNotePermissions: 'Dette varselet ble skjult av en administrator',
	unDismissOKButton: 'Gjenopprett dette varslet merket som OK',
};

const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips),
  testNames: testNames,
};

export default newStrings;
