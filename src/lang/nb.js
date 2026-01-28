import strings from '../sa11y-lang/nb.js';
// Machine translation.

export const testNames = {
	ALT_FILE_EXT: 'Denne alternative teksten er et filnavn, ikke en beskrivelse',
	ALT_MAYBE_BAD: 'Denne alternative teksten kan være vanskelig for en skjermleser å lese korrekt',
	ALT_PLACEHOLDER: 'Denne alternative teksten er en meningsløs plassholder',
	ALT_UNPRONOUNCEABLE: 'Denne alternative teksten kan ikke uttales',
	BTN_EMPTY: 'Knappen mangler en tilgjengelig etikett',
	BTN_EMPTY_LABELLEDBY: 'Knappen har en ugyldig ARIA‑etikett',
	BTN_ROLE_IN_NAME: 'Knappens navn gjentar ordet «button»',
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
	EMBED_GENERAL: 'Innebygde iframe‑elementer krever manuell gjennomgang',
	EMBED_MISSING_TITLE: 'Ramme mangler «title»‑attributt',
	EMBED_UNFOCUSABLE: 'En ramme med tabindex="‑1" kan ikke nås med tastatur',
	EMBED_VIDEO: 'Har denne videoen korrekte undertekster?',
	HEADING_EMPTY: 'Denne overskriften mangler tekst',
	HEADING_EMPTY_WITH_IMAGE: 'Dette bildet brukes som overskrift og trenger alternativ tekst',
	HEADING_FIRST: 'Den første overskriften på siden er en underoverskrift',
	HEADING_LONG: 'Kan denne overskriften være kortere?',
	HEADING_MISSING_ONE: 'Denne siden mangler en overskrift på nivå 1',
	HEADING_SKIPPED_LEVEL: 'Denne overskriften har feil nivå',
	HIDDEN_FOCUSABLE: 'Dette elementet kan ikke beskrives av skjermlesere',
	IMAGE_ALT_TOO_LONG: 'Kan denne alternative teksten være kortere?',
	IMAGE_DECORATIVE: 'Er dette bildet virkelig dekorativt?',
	IMAGE_DECORATIVE_CAROUSEL: 'Bilde i karusell eller galleri er merket som dekorativt',
	IMAGE_FIGURE_DECORATIVE: 'Manuell gjennomgang: figur med bildetekst, men uten alternativ tekst',
	IMAGE_FIGURE_DUPLICATE_ALT: 'Alternativ tekst skal ikke være identisk med bildeteksten',
	LABELS_ARIA_LABEL_INPUT: 'Finnes det en synlig etikett for dette feltet?',
	LABELS_PLACEHOLDER: 'Manuell gjennomgang: plassholdertekst',
	LABELS_INPUT_RESET: 'Er denne tilbakestillingsknappen nødvendig?',
	LABEL_IN_NAME: 'Den synlige etiketten samsvarer ikke med den tilgjengelige etiketten',
	LINK_ALT_FILE_EXT: 'Alternativ tekst brukt som lenke bør ikke være en URL',
	LINK_ALT_MAYBE_BAD: 'Denne alternative teksten i lenken kan være vanskelig å lese for en skjermleser',
	LINK_ALT_UNPRONOUNCEABLE: 'Bilder brukt som lenker må ha uttalbar alternativ tekst',
	LINK_CLICK_HERE: 'Manuell gjennomgang: lenken inneholder «klikk her»',
	LINK_DOI: 'Lenk til artikkeltitler, ikke DOI‑numre',
	LINK_EMPTY: 'Denne lenken mangler tekst',
	LINK_EMPTY_LABELLEDBY: 'Lenke med ugyldig «aria‑labelledby»‑attributt',
	LINK_EMPTY_NO_LABEL: 'Denne lenken trenger en etikett',
	LINK_FILE_EXT: 'Lenken peker til en fil uten at det opplyses på forhånd',
	LINK_IDENTICAL_NAME: 'Beskriver denne lenken målet sitt på en unik måte?',
	LINK_IMAGE_ALT: 'Manuell gjennomgang: bilde brukt som lenke med alternativ tekst',
	LINK_IMAGE_ALT_AND_TEXT: 'Gir denne alternative teksten mening i denne lenkesammenhengen?',
	LINK_IMAGE_LONG_ALT: 'Kan den alternative teksten for lenkebildet være kortere?',
	LINK_IMAGE_NO_ALT_TEXT: 'Dette lenkebildet trenger alternativ tekst',
	LINK_IMAGE_TEXT: 'Manuell gjennomgang: bilde inne i lenke er merket som dekorativt',
	LINK_NEW_TAB: 'Åpner denne lenken en ny fane uten advarsel?',
	LINK_PLACEHOLDER_ALT: 'Dette lenkebildet trenger meningsfull alternativ tekst',
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
	QA_DOCUMENT: 'Er dette dokumentet riktig tagget for skjermlesere?',
	QA_FAKE_HEADING: 'Bør denne uthevede teksten være en overskrift?',
	QA_FAKE_LIST: 'Bør dette være formatert som en liste?',
	QA_IN_PAGE_LINK: 'Intern lenke fungerer ikke',
	QA_JUSTIFY: 'Vennligst unngå fulljustering (tekst i begge marger)',
	QA_NESTED_COMPONENTS: 'Nestede interaktive komponenter',
	QA_PDF: 'Finnes det et alternativ til denne PDF‑filen?',
	QA_SMALL_TEXT: 'Teksten er for liten',
	QA_STRONG_ITALICS: 'Store tekstblokker i fet/kursiv er vanskelige å lese',
	QA_SUBSCRIPT: 'Vennligst ikke bruk hevet eller senket skrift som ren visuell formatering',
	QA_UNDERLINE: 'Kun lenker bør ha understreking',
	QA_UPPERCASE: 'Er denne teksten i store bokstaver nødvendig?',
	SUS_ALT: 'Inneholder denne alternative teksten overflødige ord?',
	TABINDEX_ATTR: 'tabindex‑attributtet kan bryte leseordenen',
	TABLES_EMPTY_HEADING: 'Denne tabelloverskriftscellen trenger tekst',
	TABLES_MISSING_HEADINGS: 'Denne tabellen mangler overskriftsrad og/eller kolonneoverskrifter',
	TABLES_SEMANTIC_HEADING: 'Innholdsoverskrifter bør ikke brukes inni tabeller',
	UNCONTAINED_LI: 'Ugyldig HTML‑liste',
};

const why = {
	fix: `<strong class="badge">Slik løser du det</strong>`,
	check: `<strong class="badge">Manuell kontroll</strong>`,

	buttons: `<div class="why"><p>Merk: Det tilgjengelige navnet til en knapp skal tydelig formidle hva den gjør. Knapper som endrer funksjon etter klikk, bør også endre navn:</p><ul>
<li>Skiftende etiketter:<br>«Spill av/Pause», «Vis detaljer/Skjul detaljer»</li>
<li>Endring i <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">ARIA‑tilstandsattributter</a>:<br>«Spill av/Spill av, trykket», «Detaljer, lukket/Detaljer, åpnet».</li>
</ul>
<p>Vennligst ikke endre både etikett og tilstandsattributt samtidig. Å endre «Spill av» til «Pause, trykket» betyr at spilleren er pauset – ikke at den spiller.</p></div>`,

	headings: `<div class="why"><p>Tips: Overskrifter og underoverskrifter organiserer innholdet i en hierarkisk struktur. Skjermleserbrukere er avhengige av strukturen for å forstå og navigere på siden:</p>
<ul><li>Overskrift nivå 1: sidetittel
<ul><li>Overskrift nivå 2: hovedtemaer
<ul><li>Overskrift nivå 3: undertemaer</li></ul></li></ul></li></ul></div>`,

	images: `<div class="why"><p>Tips: Når du skriver alternativ tekst, beskriv hva bildet <em>betyr</em> i konteksten – ikke bare hva som vises. Et barn som sparker en ball kan for eksempel bety:</p>
<ul><li>De fortsetter å spille i kraftig regn.</li>
<li>De nye lagdraktene har stilige drage‑logoer.</li>
<li>Hun scoret vinnermålet fra venstrekanten!</li></ul></div>`,

	links: `<div class="why"><p>Brukere skanner ofte lenker og søker etter navn. Gode lenker bør derfor være meningsfulle, unike og konsise:</p>
<ul>
<li>Ideelt: «Lær mer om <a href="https://webaim.org/techniques/hypertext/link_text">meningsfulle lenker</a>»</li>
<li>Ikke unikt: «Klikk <a href="https://webaim.org/techniques/hypertext/link_text">her</a> for å lære mer …»</li>
<li>Ikke konsist: «<a href="https://webaim.org/techniques/hypertext/link_text">Klikk her for å lære mer om meningsfulle lenker</a>»</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>Målet med alternativ tekst er å formidle hva bildet betyr. For et bilde som er en lenke, er betydningen <strong>lenkens mål</strong>:</p>
<ul>
<li>«<em>Forstørrelsesglass</em>» beskriver et bilde, ikke lenken.</li>
<li>«<em>Søkeforstørrelsesglass</em>» blir fort tvetydig.</li>
<li>«<em>Søk</em>» beskriver korrekt hva lenken gjør.</li>
</ul></div>`,
};

export const tips = {
	ALT_FILE_EXT: `<p>Skjermlesere vil lese opp denne URL‑en, ofte bokstav for bokstav. Dette formidler ikke samme mening som å se bildet.</p><p>${why.fix}Legg inn tom alt (alt="") dersom dette kun er dekorasjon som bør ignoreres, eller legg inn en beskrivende alternativ tekst.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Oppgitt beskrivelse for dette bildet: <strong>"%(alt)"</strong></p><p>${why.fix}Angi en kort, kontekstavhengig alt‑tekst som beskriver hva bildet betyr her.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Oppgitt beskrivelse for dette bildet: <strong>"%(alt)"</strong></p><p>${why.fix}Angi en kort, kontekstavhengig alt‑tekst som beskriver hva bildet betyr her.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>Alt‑teksten «%(alt)» består bare av tegn/mellomrom som ikke kan uttales. Skjermleseren annonserer «bilde» og gjør en merkbar pause: «bilde: ____».</p><p>${why.fix}Legg til en lesbar alt‑tekst, eller bruk alt="" hvis bildet skal ignoreres.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Gi knappen et tilgjengelig navn via tekst, alt‑tekst på ikon eller <code>title</code>‑attributt.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Denne knappen refererer i <code>aria-labelledby</code> til en tom eller ugyldig <code>ID</code>.</p><p>${why.fix}Koble til en gyldig ID, eller fjern attributtet og beskriv knappen på annen måte.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'Et bakgrunnsbilde eller en gradient gjør at sjekken ikke kan fastslå bakgrunnsfargen sikkert. Bruk fargevelgeren nedenfor for manuell kontroll.',

	DUPLICATE_ID: `<p>ID‑er brukes som etiketter og lenkemål, og må være unike.</p><p>${why.fix}Endre denne ID‑en: <strong>#%(id)</strong></p><div class="why"><p>I mange CMS kommer den fra «name» eller «id». I HTML er det et attributt: <code><a id="MY-ID"></a></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Fjern <code>title</code>‑attributtet fra lenken.</p><div class="why"><p>Merk: <code>title</code> vises kun ved hover med mus. Det er ikke synlig på mobil eller ved tastatur, og bør ikke inneholde viktig informasjon.</p></div>`,

	EMBED_AUDIO: `<p>Hvis lydfilen inneholder tale, skal det finnes en <a href="https://www.w3.org/WAI/media/av/transcribing/">tekstlig alternativ versjon</a> på siden eller via lenke.</p><p>Automatiske transkripsjoner må kvalitetssikres slik at talere og viktige lyder er korrekte.</p>`,

	EMBED_DATA_VIZ: `<p>Innebygde visualiseringer kan være vanskelige å bruke med hjelpemidler, krevende for svaksynte/fargeblinde, og kan kreve horisontal rulling på mobil.</p><p>${why.fix}Hvis den ikke har høy kontrast, full tastaturstøtte <strong><em>og</em></strong> kan beskrives av en skjermleser, bør du tilby en likeverdig alternativ versjon (tekstbeskrivelse, tabell eller nedlastbar datafil).</p>`,

	EMBED_GENERAL: 'Automatikk kan ikke kontrollere innhold inne i embeds. Kontroller at bilder har alt, videoer har undertekster, tekst har nok kontrast, og at lenker/knapper er <a href="https://webaim.org/techniques/keyboard/">tastaturnavigerbare</a>. Deretter kan dette varslet ignoreres.',

	EMBED_MISSING_TITLE: `<p>Innebygde elementer trenger et tilgjengelig navn for skjermlesere.</p><p>${why.fix}Legg til et unikt <code>title</code> eller <code>aria-label</code>.</p>`,

	EMBED_UNFOCUSABLE: `Attributtet ber tastatur og hjelpemidler hoppe over elementet. Hvis iframen inneholder lenker/knapper/skjema eller kan rulles, må attributtet fjernes.`,

	EMBED_VIDEO: `<p>Videoer skal ha undertekster.</p><p>Automatiske undertekster må revideres for korrekt speaker/lyd.</p><p>${why.fix}Legg til eller korriger undertekster og avvis varslet.</p>`,

	HEADING_EMPTY: `<p>Tomme overskrifter skaper hull i dokumentstrukturen.</p><p>${why.fix}Legg til tekst eller fjern den tomme linjen.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Tomme overskrifter skaper hull i strukturen.</p><p>${why.fix}Hvis dette ikke er en overskrift, endre format fra <strong {C}>Overskrift %(level)</strong> til <strong>Avsnitt</strong>. Hvis det er en overskrift, beskriv bildets betydning i alt‑teksten.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Sørg for at sidetittelen er merket som Overskrift 1 eller Overskrift 2. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}Med mindre dette er en fast tittel (f.eks. en publisert artikkel), bør overskriften kortes ned for bedre skanning.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Merk sidens tittel som nivå 1 for å angi starten på dokumentstrukturen.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Overskriften hoppet fra <strong>nivå %(prevLevel)</strong> til <strong>nivå %(level)</strong>. Det kan høres ut som om innhold mangler.</p><p>${why.fix}Juster nivåene slik at strukturen blir sammenhengende.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: `Dette interaktive elementet har <code>aria-hidden="true"</code>, men kan få tastaturfokus. Hvis du vil skjule det for skjermlesere, bruk også <code>tabindex="-1"</code>; hvis ikke, fjern <code>aria-hidden</code>.`,

	IMAGE_ALT_TOO_LONG: `<p>Alt‑tekst leses som én sammenhengende frase; ved lange tekster blir gjenhøring vanskelig.</p><p>Alt‑tekstlengde: %(altLength) tegn. <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Tips: komplekse bilder trenger ofte en <strong>synlig</strong> bildetekst eller utvidet beskrivelse, og alt‑teksten kan henvise dit.</p></div>`,

	IMAGE_DECORATIVE: `<p>Bildet er skjult for skjermlesere med tom alt. Kun bilder uten mening (f.eks. dekor) bør skjules slik.</p><p>${why.fix}Hvis bildet tilfører innhold, legg inn alt‑tekst.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'Bildet er merket som <strong>dekorativt</strong>, men alle bilder i en karusell/galleri bør ha beskrivende alt‑tekst.',

	IMAGE_FIGURE_DECORATIVE: `<p>Bildet blir ignorert av hjelpemidler. Er bildeteksten tilstrekkelig uten bildet?</p><p>${why.fix}Hvis ikke, supplér det bildeteksten ikke dekker med alt‑tekst.</p><div class="why"><p>Tips: bilder, alt‑tekst og bildetekst virker sammen:</p><ul><li>Bildetekst gir kontekst/fortolkning.</li><li>Alt‑tekst beskriver motivet for dem som ikke ser bildet.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Endre alt‑teksten slik at den beskriver bildets visuelle betydning, ikke bare gjentar bildeteksten.</p><div class="why"><p>Tips: bilder, alt‑tekst og bildetekst virker sammen:</p><ul><li>Bildetekst gir kontekst.</li><li>Alt‑tekst beskriver motivet for lesere som ikke ser bildet.</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: `<p><strong {B}>Usynlig feltetikett:</strong> <strong {C}>%(TEXT)</strong></p><p>Kontroller at det finnes en synlig etikett, at den forblir synlig når feltet har innhold, og at den samsvarer med det tilgjengelige navnet.</p><div class="why"><p>Etiketter kun via <em>placeholder</em> eller <em>title</em> forsvinner ved skriving, og gjør validering vanskelig.</p></div>`,

	LABELS_INPUT_RESET: `<p>Tilbakestillingsknapper kan lett trykkes ved et uhell og føre til datatap.</p><p>${why.fix}Hvis den ikke bare tilbakestiller ett felt, bør den fjernes eller kreve bekreftelse.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'Bildeknappen mangler alt‑tekst. Legg til en funksjonsbeskrivende alt‑tekst, f.eks. <em>Søk</em> eller <em>Send</em>.',

	LABELS_MISSING_LABEL: 'Dette feltet mangler etikett. Legg til <code>id</code> på feltet og en samsvarende <code>for</code> på etiketten.',

	LABELS_NO_FOR_ATTRIBUTE: 'Dette feltet har ikke tilknyttet etikett. Legg til <code>for</code> på etiketten som samsvarer med feltets <code>id</code>.<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>Plassholdertekst forsvinner ved skriving, har ofte lav kontrast eller kan forveksles med innhold.</p><p>${why.fix}Sørg for at viktige opplysninger (etikett, hjelpetekst, formateringsregler) alltid er synlige.</p>`,

	LABEL_IN_NAME: `<p>Den synlige teksten ser ut til å avvike fra elementets tilgjengelige navn. Dette kan forvirre skjermleserbrukere og hindre stemmestyring.</p><p>${why.check}Sørg for at den synlige etiketten begynner med det tilgjengelige navnet og ikke legger til ny betydning.</p><p><strong>Usynlig etikett:</strong> «%(TEXT)»</p>`,

	LINK_ALT_FILE_EXT: `<p>Alt‑teksten inneholder «%(alt)», som ofte betyr at den er et filnavn – ikke et meningsfullt navn på målet.</p><p>${why.fix}Sett alt‑teksten til navnet på lenkens destinasjon.</p><div class="why"><p>Alt‑tekst skal formidle betydningen. For lenkebilder er det målet som er betydningen:</p><ul><li>«Side med tekst» beskriver bildet.</li><li>«IMG_1234.jpg» er et filnavn.</li><li>«<strong><em>Påmeldingsskjema (doc)</em></strong>» er en tydelig destinasjon.</li></ul></div>`,

	LINK_ALT_MAYBE_BAD: `<p>Alt‑teksten er en plassholder: «<strong>%(alt)</strong>».</p><p>${why.fix}Sett alt‑teksten til lenkens mål.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>Alt‑teksten «%(ALT_TEXT)» består av tegn som ikke kan uttales og kan ikke beskrive lenken.</p><p>${why.fix}Beskriv lenkens formål eller mål med alt‑teksten.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `Vennligst unngå «klikk her» – det kommuniserer ikke hva lenken gjør.`,

	LINK_DOI: `<p>${why.fix}Lenk til artikkeltittelen, og vis DOI som ren tekst (ikke lenk DOI direkte).</p><div class="why"><p>Beskrivende lenker gjør skanning enklere, og skjermlesere kan annonsere meningsfulle navn i stedet for tall.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Legg til en beskrivende lenketekst, eller slett lenken hvis den er lagt til ved en feil (f.eks. et lenket mellomrom).</p><div class="why"><p>Tomme lenker gir stillhet eller bokstavvis opplesning av URL.</p><p>I noen redaktører må teksten rundt omskrives for å fjerne et lenket mellomrom.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p><code>aria-labelledby</code> peker ikke til en gyldig <code>ID</code>.</p><p>${why.fix}Oppgi en gyldig ID eller fjern attributtet.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Legg til beskrivende tekst eller fjern den tomme lenken.</p><div class="why"><p>Tomme lenker kan ikke annonseres meningsfullt.</p></div>`,

	LINK_FILE_EXT: `<p>Lenken går til en fil (f.eks. PDF/MP3/ZIP/Word) uten at det opplyses.</p><p>${why.fix}Indiker filtype i lenken (tekst/ikon): <a href="https://itmaybejj.github.io/linkpurpose/">eksempler</a>.</p><p class="why">Oppgi gjerne størrelse for store filer, f.eks. «Rapport (PDF, 3 MB)».</p>`,

	LINK_IDENTICAL_NAME: `<p>Flere lenker med ulike mål bruker samme tekst: «<strong>%(TEXT)</strong>».</p><p>${why.fix}Omskriv slik at hver lenke unikt beskriver målet sitt.</p>${why.links}`,

	LINK_IMAGE_ALT: `Kontroller at alt‑teksten beskriver lenkens mål:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Vennligst sjekk at dette bidrar til å beskrive lenkens formål, uten unødvendig informasjon:</p><p><strong class="badge">Alt</strong> «<em><strong>%(alt)</strong></em>»</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p><a href="https://webaim.org/techniques/hypertext/link_text#alt_link">Alt‑teksten for et lenkebilde skal beskrive lenkens mål</a>. Lange alt‑tekster tyder ofte på at bildet beskrives i stedet for målet.</p>Denne alt‑teksten er %(altLength) tegn: <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Når en lenke inneholder et bilde, brukes bildets alt som <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">lenkens navn</a> for skjermlesere.</p><p>${why.fix}Sett en alt‑tekst som beskriver målet.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'Bildet er merket som dekorativt, men lenken bruker omgivende tekst som etikett.',

	LINK_NEW_TAB: `<p>${why.fix}Åpne i samme fane, eller <a href="https://itmaybejj.github.io/linkpurpose/">opplys på forhånd</a> at lenken åpnes i ny fane.</p><div class="why"><p>Brukere kan selv velge ny fane; tvunget atferd kan virke forvirrende (tilbake‑knappen oppfører seg ikke som ventet).</p><p>Unntak: I skjemaer åpnes lenker ofte i ny fane for å unngå datatap.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>Alt‑teksten er en plassholder: «<strong>%(alt)</strong>».</p><p>${why.fix}Bruk en alt‑tekst som beskriver lenkens mål.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Lenken inneholder en tekst som ikke hjelper med å beskrive målet:<br><strong>%(text)</strong></p><p>${why.fix}Skriv kort og tydelig hva lenken leder til.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>Lenken har en ARIA‑etikett, men den synlige teksten er generell: «<strong {C}>%(ERROR)</strong>».</p><p>${why.fix}Gi meningsfull synlig lenketekst, og sørg for samsvar med det tilgjengelige navnet.</p>${why.links}`,

	LINK_SUS_ALT: `<p>Alt‑teksten inneholder «%(alt)», som ofte betyr at bildet – ikke lenken – blir beskrevet.</p><strong class="badge">Alt‑tekst</strong> «%(ALT_TEXT)»<p>Løsning: sørg for at alt‑teksten beskriver lenkens formål.</p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Unngå symboler som handlingsoppfordring i lenketekst (med mindre de skjules for skjermlesere). Skjermlesere kan lese dem på forvirrende måter. Vurder å fjerne: <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Bruk et beskrivende navn eller formål i stedet for URL som lenketekst.</p><div class="why"><p>Brukere – særlig med skjermleser – skanner lenker etter navn.</p><p>URL som lenketekst er tung å skanne/søke etter.</p></div>`,

	META_LANG: `<p>${why.fix}Legg til et <a href="https://www.w3.org/International/questions/qa-html-language-declarations">språkattributt</a> på HTML‑elementet.</p><div class="why"><p>Skjermlesere trenger riktig språk for korrekt uttale; feil språk gir utydelig opplesning.</p></div>`,

	META_MAX: `<p>Denne meta‑taggen begrenser zoom.</p><p>${why.fix}Tillat full zoom ved å endre eller fjerne begrensningen.</p>`,

	META_REFRESH: `<p>Automatisk oppdatering via meta avbryter brukeren og kan føre til tap av inndata.</p><p>${why.fix}Bruk AJAX/JavaScript med forhåndsvarsel og mulighet til å utsette oppdateringen.</p>`,

	META_SCALABLE: `<p>Denne meta‑taggen hindrer zoom.</p><p>${why.fix}Endre eller fjern den slik at zoom er tillatt.</p>`,

	META_TITLE: `<p>${why.fix}Legg til <code><title></code> i <code><head></code>.</p><div class="why"><p>En kort og unik <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title">sidetittel</a> er viktig for søkeresultater, nettleserfaner og skjermlesere ved fane‑bytte.</p><p>Uten tittel vises kun URL.</p></div>`,

	MISSING_ALT: `<p>Uten alt leser skjermlesere opp bilde‑URL (ofte bokstavvis).</p><p>${why.fix}Bruk alt="" for dekorative bilder, og en beskrivende alt‑tekst for innholdsbærende bilder.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Når et bilde i en lenke mangler alt, leses bilde‑URL opp – ekstra problematisk.</p><p>${why.fix}Legg inn en alt‑tekst som beskriver lenkens mål.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Bildet er del av en lenke som også har tekst. Hvis teksten allerede beskriver målet, bruk alt=""; ellers, legg inn alt som beskriver målet.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>Lenken ser ut til å peke mot et utviklingsmiljø:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Bruk relativ sti (/mappe) eller offentlig URL.</p>`,

	QA_BLOCKQUOTE: `<p><code>blockquote</code> signaliserer «sitat». Korte «sitater» er ofte egentlig overskrifter.</p><p>${why.fix}Hvis det er en overskrift, bruk overskriftsstil.</p>${why.headings}`,

	QA_DOCUMENT: `<p>Lenkede dokumenter regnes som webinnhold og må også være tilgjengelige. Kontroller overskrifter, tabelloverskrifter og alt‑tekster.</p><ul class="why"><li>Gjør <a href="https://support.google.com/docs/answer/6199477?hl=nb">Google‑dokumenter</a> tilgjengelige.</li><li>Gjør <a href="https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office‑dokumenter</a> tilgjengelige.</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}Hvis den fete linjen introduserer et tema, bruk en faktisk overskrift i stedet for visuell utheving.</p><div class="why"><p>Overskrifter gir navigerbar struktur for hjelpemidler.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Hvis «%(text)» er et listepunkt, bruk listeformat.</p><div class="why"><p>Lister har visuell og semantisk struktur:</p><ol><li>Jeven innrykk forbedrer lesbarheten.</li><li>Skjermlesere opplyser posisjon («element 3 av 7»).</li></ol><p>Et tall først i linjen er ikke en liste.</p></div>`,

	QA_IN_PAGE_LINK: `<p>Målet for denne interne lenken finnes ikke på siden.</p><div class="why"><p>For utviklere: Hvis lenken håndteres av JavaScript, verifiser tastaturstøtte.</p></div>`,

	QA_JUSTIFY: `<p>Fulljustering gir ujevne mellomrom og svekker lesbarheten.</p><p>${why.fix}Bruk venstrejustert tekst.</p>`,

	QA_NESTED_COMPONENTS: 'Unngå komponenter inni komponenter (f.eks. faner i faner, akordeon i akordeon). Det gjør navigasjon vanskelig og øker kognitiv belastning.',

	QA_PDF: `<p>${why.fix}Gjør ett av følgende og avvis deretter varslet:</p><ul><li>Lenk til webside i stedet for PDF,</li><li>eller tilby både PDF og en HTML/editerbar versjon,</li><li>eller verifiser som minimum at PDF‑en er tagget, har riktig leseorden, tabelloverskrifter og alt‑tekster.</li></ul><div class="why"><p>Mange – særlig mobil‑ og skjermleserbrukere – foretrekker websider fremfor PDF.</p></div>`,

	QA_SMALL_TEXT: 'Liten skrift er vanskelig å lese, spesielt for personer med nedsatt syn. Unngå for liten fontstørrelse.',

	QA_STRONG_ITALICS: `<p>${why.fix}Bruk fet/kursiv sparsommelig til nøkkelord.</p><div class="why"><p>For sitater: bruk <code>blockquote</code>.</p></div>`,

	QA_SUBSCRIPT: `Hevet/senket skrift gjør teksten liten og vanskelig å lese. Bruk kun til 4<sup>e</sup>, H<sub>2</sub>O, fotnoter o.l.`,

	QA_UNDERLINE: `<p>Understreking signaliserer lenke. Brukere kan tro teksten er klikkbar.</p><p>${why.fix}Bruk <strong>fet</strong> eller <em>kursiv</em> for utheving; bruk overskrift for nye tema.</p><div class="why"><p>Skjermlesere annonserer ikke visuelle effekter; kun overskrifter gir struktur.</p></div>`,

	QA_UPPERCASE: `<p>TEKST I STORE BOKSTAVER ER TUNGT Å LESE OG KAN OPPFATTES SOM ROPING.</p><p>${why.fix}Bruk fet skrift fremfor store bokstaver for utheving.</p><div class="why"><p>Skjermlesere annonserer ikke fet/kursiv; bruk overskrifter for struktur.</p></div>`,

	SUS_ALT: `<p>Alt‑teksten inneholder «%(alt)», som trolig er overflødig:</p><p><strong class="badge">Alt‑tekst</strong> «%(ALT_TEXT)»</p><p>Løsning: skriv kort og presist hva bildet betyr.</p><div class="why"><p>Skjermlesere sier allerede «bilde», så «bilde av …» er ofte unødvendig.</p></div>`,

	TABINDEX_ATTR: `<p>${why.fix}Unngå positive <code>tabindex</code>‑verdier. La rekkefølgen i HTML matche visuell rekkefølge, tabulatorrekkefølge og leseorden.</p><div class="why"><p>Som standard er disse rekkefølgene like.</p><p>Positive verdier flytter elementer i tabulatorrekkefølgen uten å endre visuell plassering og skaper forvirring.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Kontroller at hver tabelloverskriftscelle inneholder tekst.</p><div class="why"><p>Skjermlesere bruker overskrifter til å gi kontekst.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Angi i oppsettet om overskrifter ligger i første rad, første kolonne eller begge.</p><div class="why"> <p>Skjermlesere gjentar relevant rad/kolonne‑overskrift i hver celle.</p><p>Hvis tabellen er rent layout, bør du vurdere annet oppsett.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Fjern h2/h3 inni tabellen. Bruk rad‑/kolonneoverskrifter. Trengs flere nivåer, del opp i flere tabeller.</p><div class="why"> <p>Tabelloverskrifter knyttes til rader/kolonner; innholdsoverskrifter påvirker alt innhold under.</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2"><strong>Tabelloverskrift</strong> i celle 2 merker B‑kolonnen.<br><br><strong>Innholdsoverskrift</strong> i celle 2 «merker» 3, A, B, C – samt teksten her og fotnoter.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,
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
	NOT_VISIBLE: 'Merk: Dette innholdet kan være skjult. Se i det markerte området.',
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
	dismissHideTitle: 'Skjuler dette varslet kun for deg',
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
	panelCheckAltText: `<p class="ed11y-small">Kontroller at hvert bilde formidler betydning i konteksten, og at det ikke brukes bilder med innebygd tekst.</p>`,
	panelCheckOutline: `<p class="ed11y-small">Dette viser overskriftsstrukturen. Kontroller at den samsvarer med sidens visuelle struktur.</p>`,
	PANEL_HEADING_MISSING_ONE: 'Overskrift nivå 1 mangler.',
	PANEL_NO_HEADINGS: 'Ingen overskrifter funnet.',
	reportsLink: 'Åpne nettstedrapporter',
	toggleDisabled: 'Ingen innhold tilgjengelig for sjekk av Editoria11y.',
	transferFocus: 'Rediger dette innholdet',
	unDismissHideButton: 'Gjenopprett dette ignorerte varslet',
	unDismissNotePermissions: 'Dette varselet er skjult av en administrator',
	unDismissOKButton: 'Gjenopprett varslet som er merket som OK',
};

const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips),
  testNames: testNames,
};

export default newStrings;
