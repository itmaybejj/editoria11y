import {default as Sa11yStrings} from '../sa11y-lang/da.js';
// Machine translation.

const testNames = {
	ALT_FILE_EXT: 'Denne alt‑tekst er et filnavn, ikke en beskrivelse',
	ALT_MAYBE_BAD: 'Denne alt‑tekst kan ikke udtales af en skærmlæser',
	ALT_PLACEHOLDER: 'Denne alt‑tekst beskriver ikke billedet',
	ALT_UNPRONOUNCEABLE: 'Denne alt‑tekst kan ikke udtales',
	BTN_EMPTY: 'Knappen mangler et tilgængeligt navn',
	BTN_EMPTY_LABELLEDBY: 'Knappen har et ugyldigt ARIA‑label',
	BTN_ROLE_IN_NAME: 'Knappens navn gentager ordet “button”',
	CONTRAST_ERROR: 'Teksten har utilstrækkelig kontrast og er svær at læse',
	CONTRAST_ERROR_GRAPHIC: 'Grafik eller ikon har utilstrækkelig kontrast',
	CONTRAST_INPUT: 'Inputfeltet har utilstrækkelig kontrast og er svært at læse',
	CONTRAST_PLACEHOLDER: 'Placeholder‑tekst har utilstrækkelig kontrast og er svær at læse',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Har denne placeholder‑tekst tilstrækkelig kontrast?',
	CONTRAST_WARNING: 'Har denne tekst tilstrækkelig kontrast?',
	CONTRAST_WARNING_GRAPHIC: 'Har denne grafik eller dette ikon tilstrækkelig kontrast?',
	DUPLICATE_ID: 'Duplikeret ID‑attribut',
	DUPLICATE_TITLE: 'Dette link har en tooltip med samme tekst som linket',
	EMBED_AUDIO: 'Har denne lyd en transskription?',
	EMBED_DATA_VIZ: 'Er denne visualisering tilgængelig?',
	EMBED_GENERAL: 'Indlejrede iframes kræver manuelle tjek',
	EMBED_MISSING_TITLE: 'Ramme uden “title”‑attribut',
	EMBED_UNFOCUSABLE: 'En ramme med tabindex="‑1" kan ikke fokuseres med tastatur.',
	EMBED_VIDEO: 'Har denne video korrekte undertekster?',
	HEADING_EMPTY: 'Denne overskrift har ingen tekst',
	HEADING_EMPTY_WITH_IMAGE: 'Dette billede bruges som overskrift og kræver alt‑tekst',
	HEADING_FIRST: 'Den første overskrift på denne side er en underoverskrift',
	HEADING_LONG: 'Kan denne overskrift være kortere?',
	HEADING_MISSING_ONE: 'Denne side mangler en overskrift på niveau 1',
	HEADING_SKIPPED_LEVEL: 'Denne overskrift har et forkert niveau',
	HIDDEN_FOCUSABLE: 'Dette element kan ikke beskrives af skærmlæsere',
	IMAGE_ALT_TOO_LONG: 'Kan denne alt‑tekst være kortere?',
	IMAGE_DECORATIVE: 'Er dette billede virkelig uden betydning?',
	IMAGE_DECORATIVE_CAROUSEL: 'Billede i slideshow/galleri markeret som dekorativt',
	IMAGE_FIGURE_DECORATIVE: 'Manuel kontrol: billede med billedtekst mangler alt‑tekst',
	IMAGE_FIGURE_DUPLICATE_ALT: 'Alt‑tekst må ikke være identisk med billedteksten',
	LABELS_ARIA_LABEL_INPUT: 'Er der en synlig etiket til dette felt?',
	LABELS_PLACEHOLDER: 'Manuel kontrol: placeholder‑tekst',
	LABELS_INPUT_RESET: 'Er denne “Nulstil”‑knap nødvendig?',
	LABEL_IN_NAME: 'Den synlige etiket matcher ikke den usynlige etiket',
	LABELS_MISSING_LABEL: 'Dette inputfelt mangler en label',
	LINK_ALT_FILE_EXT: 'Alt‑tekst brugt som link må ikke være en URL',
	LINK_ALT_MAYBE_BAD: 'Denne alt‑tekst i linket kan ikke udtales af en skærmlæser',
	LINK_ALT_UNPRONOUNCEABLE: 'Billeder brugt som links skal have udtalelig alt‑tekst',
	LINK_CLICK_HERE: 'Manuel kontrol: link indeholder “klik her”',
	LINK_DOI: 'Link til artikeltitler, ikke DOI‑numre',
	LINK_EMPTY: 'Dette link har ingen tekst',
	LINK_EMPTY_LABELLEDBY: 'Linket har et ugyldigt “aria‑labelledby”‑attribut',
	LINK_EMPTY_NO_LABEL: 'Dette link behøver en etiket',
	LINK_FILE_EXT: 'Link fører til en fil uden advarsel',
	LINK_IDENTICAL_NAME: 'Flere links med samme tekst fører til forskellige sider',
	LINK_IMAGE_ALT: 'Manuel kontrol: billede i link med alt‑tekst',
	LINK_IMAGE_ALT_AND_TEXT: 'Giver denne alt‑tekst mening i linket?',
	LINK_IMAGE_LONG_ALT: 'Kan denne alt‑tekst i linket være kortere?',
	LINK_IMAGE_NO_ALT_TEXT: 'Dette billede, som bruges som link, behøver alt‑tekst',
	LINK_IMAGE_TEXT: 'Manuel kontrol: billede i link er markeret som dekorativt.',
	LINK_NEW_TAB: 'Åbner dette link en ny fane uden advarsel?',
	LINK_PLACEHOLDER_ALT: 'Dette billede‑link behøver meningsfuld alt‑tekst',
	LINK_STOPWORD: 'Dette link indeholder kun generiske ord',
	LINK_STOPWORD_ARIA: 'Meningsfuld linktekst er kun tilgængelig for skærmlæsere',
	LINK_SUS_ALT: 'Beskriver denne alt‑tekst billedet eller linket?',
	LINK_SYMBOLS: 'Manuel kontrol: er symboler/emoji i dette link meningsfulde?',
	LINK_URL: 'Linktekst må ikke være en URL',
	META_LANG: 'Meta‑tag for sidens sprog mangler',
	META_MAX: 'Meta‑tag begrænser, hvor meget brugeren kan zoome',
	META_REFRESH: 'Meta‑tag opdaterer siden automatisk',
	META_SCALABLE: 'Meta‑tag forhindrer brugeren i at zoome',
	META_TITLE: 'Meta‑tag for sidens titel mangler',
	MISSING_ALT: 'Ugyldig HTML: billede uden alt‑attribut',
	MISSING_ALT_LINK: 'Ugyldig HTML: billede i link uden alt‑attribut',
	MISSING_ALT_LINK_HAS_TEXT: 'Ugyldig HTML: billede i link mangler alt‑attribut',
	QA_BAD_LINK: 'Manuel kontrol: linkdestination kan være ugyldig',
	QA_BLOCKQUOTE: 'Skal dette citat være en overskrift?',
	QA_DOCUMENT: 'Er dette dokument tagget til skærmlæsere?',
	QA_FAKE_HEADING: 'Skal denne fede tekst være en overskrift?',
	QA_FAKE_LIST: 'Skal dette formateres som en liste?',
	QA_IN_PAGE_LINK: 'Ugyldigt internt link',
	QA_JUSTIFY: 'Brug ikke fuldjusteret tekst',
	QA_NESTED_COMPONENTS: 'Indlejrede interaktive komponenter',
	QA_PDF: 'Findes der et alternativ til denne PDF?',
	QA_SMALL_TEXT: 'Teksten er for lille',
	QA_STRONG_ITALICS: 'Store blokke med fremhævet tekst er svære at læse',
	QA_SUBSCRIPT: 'Brug ikke hævet/sænket skrift som ren visuel styling',
	QA_UNDERLINE: 'Kun links bør være understreget',
	QA_UPPERCASE: 'Er denne tekst med STORE bogstaver nødvendig?',
	SUS_ALT: 'Er der overflødige ord i denne alt‑tekst?',
	TABINDEX_ATTR: 'tabindex‑attribut forstyrrer læserækkefølgen',
	TABLES_EMPTY_HEADING: 'Denne tabeloverskriftscelle skal indeholde tekst',
	TABLES_MISSING_HEADINGS: 'Denne tabel mangler række‑ og/eller kolonneoverskrifter',
	TABLES_SEMANTIC_HEADING: 'Indholdsoverskrifter bør ikke bruges inde i tabeller',
	UNCONTAINED_LI: 'Ugyldig HTML‑liste',
};

const why = {
	fix: `<strong class="badge">Sådan løser du det</strong>`,
	check: `<strong class="badge">Manuel kontrol</strong>`,

	buttons: `<div class="why"><p>Bemærk: en knaps tilgængelige navn skal tydeligt angive, hvad den gør. Knapper, der ændrer funktion ved klik, skal også ændre navn:</p><ul>
<li>Skiftende etiketter:<br>“Afspil/Pause”, “Vis detaljer/Skjul detaljer”</li>
<li>Skift af <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">ARIA‑tilstandsattributter</a>:<br>“Afspil/Afspil (trykket)”, “Detaljer (sammenfoldet)/Detaljer (udfoldet)”.</li>
</ul>
<p>Skift ikke både etiket og ARIA‑tilstand samtidigt. At ændre “Afspil” til “Pause (trykket)” betyder, at afspilleren er på pause — ikke at den spiller!</p></div>`,

	headings: `<div class="why"><p>Tip: overskrifter og underoverskrifter strukturerer indhold i et hierarki. Skærmlæsere bruger denne struktur til at forstå og navigere sider:</p>
<ul><li>Overskrift niveau 1: sidetitel
<ul><li>Overskrift niveau 2: hovedemner
<ul><li>Overskrift niveau 3: underemner</li></ul></li></ul></li></ul></div>`,

	images: `<div class="why"><p>Tip: når du skriver alt‑tekst, så beskriv hvad billedet <em>betyder</em> i konteksten — ikke kun hvad det viser. Et billede af et barn, der sparker til en bold, kan betyde:</p>
<ul><li>De spillede i kraftig regn.</li>
<li>De nye trøjer har flotte drage‑logoer.</li>
<li>Hun scorede sejrsmålet fra venstre side!</li></ul></div>`,

	links: `<div class="why"><p>Brugere skimmer efter links og bruger søg‑på‑side for at finde dem ved navn; effektive links er derfor meningsfulde, unikke og korte:</p>
<ul>
<li>Ideelt: “Læs mere om <a href="https://webaim.org/techniques/hypertext/link_text">meningsfulde links</a>”</li>
<li>Ikke unikt: “Klik <a href="https://webaim.org/techniques/hypertext/link_text">her</a> for at læse mere.”</li>
<li>Ikke kort: “<a href="https://webaim.org/techniques/hypertext/link_text">Klik her for at lære mere</a>”</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>Alt‑tekst skal beskrive et billedes <em>betydning</em> — ikke bare udseendet. Når billedet er et link, er betydningen linkets destination:
<ul>
<li>“<em>Et forstørrelsesglas</em>” beskriver et billede, ikke et link.</li>
<li>“<em>Et søge‑forstørrelsesglas</em>” beskriver uklart begge dele.</li>
<li>“<em>Søg</em>” beskriver korrekt linkets destination.</li>
</ul></p></div>`,
};

export const tips = {
	ALT_FILE_EXT: `<p>Skærmlæsere læser denne URL højt, ofte én bogstav ad gangen. Det svarer sjældent til at se billedet.</p><p>${why.fix}Tilføj tom alt (alt="") hvis billedet er ren dekoration, eller tilføj en beskrivende alt‑tekst.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Angivet beskrivelse: <strong>"%(alt)"</strong></p><p>${why.fix}Giv en kort alt‑tekst, der beskriver, hvad billedet betyder i konteksten.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Angivet beskrivelse: <strong>"%(alt)"</strong></p><p>${why.fix}Giv en kort alt‑tekst, der beskriver, hvad billedet betyder i konteksten.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>Alt‑teksten “%(alt)” indeholder kun uudtalelige tegn eller mellemrum. Skærmlæseren annoncerer “billede” og holder en akavet pause: “billede: ____”.</p><p>${why.fix}Tilføj en beskrivende alt‑tekst — eller en helt tom alt (alt=""), hvis det er et ikon/afstandselement, som bør ignoreres.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Brug en gyldig metode til at fortælle skærmlæsere, hvad knappen gør — fx synlig tekst, alt‑tekst på et ikon eller et <code>title</code>‑attribut.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Knappens <code>aria-labelledby</code> er tom eller matcher ikke et <code>ID</code> på siden.</p><p>${why.fix}Kobl ID’et til et eksisterende element eller fjern attributten og beskriv knappen på en anden måde.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'Et baggrundsbillede eller en gradient gør, at værktøjet ikke sikkert kan fastslå farven bag teksten. Brug farvevælgeren herunder til et manuelt tjek.',

	DUPLICATE_ID: `<p>ID’er bruges her som etiketter eller linkmål og skal derfor være unikke.</p><p>${why.fix}Redigér denne ID: <strong>#%(id)</strong></p><div class="why"><p>I mange CMS stammer den fra et felt “name” eller “id”. I HTML er det attributten: <code>&lt;a id=""></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Fjern linkets tekst eller <code>title</code>‑attribut.</p><div class="why"><p>Bemærk: <code>title</code>‑tooltips ses kun ved muse‑hover, ikke på mobil eller med tastatur. De bør ikke indeholde unik eller vigtig information.</p></div>`,

	EMBED_AUDIO: `<p>Hvis lydklippet indeholder tale, skal der leveres en <a href="https://www.w3.org/WAI/media/av/transcribing/">tekstlig version</a> på siden eller via link.</p><p>Automatiske transskriptioner skal efterses manuelt (talere og betydende lyde).</p>`,

	EMBED_DATA_VIZ: `<p>Indlejrede visualiseringer er ofte svære for hjælpemidler, for personer med nedsat syn/farvesyn og kan kræve vandret rulning på mobil.</p><p>${why.fix}Medmindre visualiseringen har høj kontrast, fuld tastaturbetjening <strong><em>og</em></strong> kan beskrives af skærmlæsere, så tilføj en ligeværdig alternativ form (tekstbeskrivelse, datatabel eller download).</p>`,

	EMBED_GENERAL: 'Automatiske værktøjer kan ikke analysere indhold inde i embeds. Sørg for alt‑tekst, undertekster, tilstrækkelig kontrast og at links/knapper er <a href="https://webaim.org/techniques/keyboard/">tastaturtilgængelige</a>, og luk derefter advarslen.',

	EMBED_MISSING_TITLE: `<p>Indlejrede elementer kræver et tilgængeligt navn, der beskriver indholdet.</p><p>${why.fix}Tilføj et unikt <code>title</code> eller <code>aria-label</code>.</p>`,

	EMBED_UNFOCUSABLE: `Attributten instruerer tastatur og hjælpemidler i at springe elementet over. Hvis iframe‑indholdet indeholder links/knapper/formularer eller kan scrolles, fjern attributten.`,

	EMBED_VIDEO: `<p>Videoer skal have undertekster.</p><p>Automatiske undertekster skal korrigeres manuelt.</p><p>${why.fix}Tilføj/korrigér undertekster og luk derefter advarslen.</p>`,

	HEADING_EMPTY: `<p>Tomme overskrifter skaber huller i sidens struktur.</p><p>${why.fix}Tilføj tekst eller fjern den tomme linje.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Tomme overskrifter skaber huller i sidens struktur.</p><p>${why.fix}Hvis det ikke er en overskrift, skift format fra <strong {C}>Overskrift %(level)</strong> til <strong>Afsnit</strong>. Ellers hør hjemme i billedets alt‑tekst.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Sørg for, at sidetitel er markeret som Overskrift 1 eller Overskrift 2. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}Hvis ikke det er en fast titel (fx en udgivet artikel), så gør den kortere for bedre skimning.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Markér sidetitlen som overskrift på niveau 1 for at markere dokumentstart.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Overskriften sprang fra <strong>niveau %(prevLevel)</strong> til <strong>niveau %(level)</strong>; for skærmlæsere lyder det som manglende indhold.</p><p>${why.fix}Juster niveauerne, så strukturen er uden huller.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: `Dette interaktive element har <code>aria-hidden="true"</code>, men kan stadig fokuseres med tastatur. Skal det skjules for skærmlæsere, tilføj også <code>tabindex="-1"</code>; ellers fjern <code>aria-hidden</code>.`,

	IMAGE_ALT_TOO_LONG: `<p>Alt‑tekst læses som en sammenhængende sætning; hvis noget misse, må alt høres igen.</p><p>Alt‑tekstlængde: %(altLength) tegn. <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Tip: komplekse billeder kræver ofte en <strong>synlig</strong> billedtekst eller alternativ beskrivelse. Det er okay at henvise i alt‑teksten:</p><ul><li>“Plakat for fredag; detaljer i billedteksten.”</li><li>“Diagram: −10 % i år; detaljer i tabellen.”</li></ul></div>`,

	IMAGE_DECORATIVE: `<p>Billedet er skjult for skærmlæsere via tom alt. Kun reelt dekorative billeder bør skjules.</p><p>${why.fix}Hvis billedet har betydning, tilføj alt‑tekst.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'Billedet er markeret som <strong>dekorativt</strong>, men i slideshows/gallerier bør alle billeder have beskrivende alt‑tekst.',

	IMAGE_FIGURE_DECORATIVE: `<p>Billedet ignoreres af hjælpemidler. Giver billedteksten mening uden selve billedet?</p><p>${why.fix}Hvis ikke, tilføj alt‑tekst for det, billedteksten ikke dækker.</p><div class="why"><p>Tip: billeder, alt‑tekster og billedtekster arbejder sammen:</p><ul><li>Billedtekster giver kontekst/fortolkning.</li><li>Alt‑tekster beskriver billedet for dem, der ikke ser det.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Redigér alt‑teksten, så den beskriver den visuelle betydning.</p><div class="why"><p>Tip: billeder, alt‑tekster og billedtekster arbejder sammen:</p><ul><li>Billedtekster leverer kontekst.</li><li>Alt‑tekster gør billedteksten forståelig for ikke‑seende.</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: `<p><strong {B}>Usynlig feltetiket:</strong> <strong {C}>%(TEXT)</strong></p><p>Sørg for, at feltet har en synlig etiket, at den forbliver synlig under input, og at den matcher det usynlige navn.</p><div class="why"><p>Etiketter kun i <em>placeholder</em>/<em>title</em> forsvinder ved indtastning og gør kontrol vanskelig.</p></div>`,

	LABELS_INPUT_RESET: `<p>Nulstillingsknapper aktiveres let ved et uheld og kan medføre datatab.</p><p>${why.fix}Medmindre kun ét felt nulstilles, fjern knappen eller kræv bekræftelse.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'Billedknappen mangler alt‑tekst. Tilføj fx <em>Søg</em> eller <em>Send</em>.',

	LABELS_MISSING_LABEL: `<p>${why.fix}Tilføj et <code>id</code> til dette inputfelt, og tilføj et matchende <code>for</code>-attribut til label'en.</p>`,

	LABELS_NO_FOR_ATTRIBUTE: 'Dette inputfelt mangler en label. Tilføj en <code>for</code> på label, der matcher feltets <code>id</code>.<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>Placeholder‑tekst forsvinder under indtastning og kan have lav kontrast eller ligne indhold.</p><p>${why.fix}Sørg for, at vigtig info (label, hjælp, formatkrav) altid er synlig.</p>`,

	LABEL_IN_NAME: `<p>Synlig tekst ser ud til at afvige fra det tilgængelige navn. Det kan forvirre skærmlæser‑brugere og tale‑styring.</p><p>${why.fix}Den synlige etiket skal starte med teksten fra den usynlige etiket og må ikke indeholde yderligere meningsfuld information.</p><p><strong>Skjult etiket:</strong> “%(TEXT)”</p>`,

	LINK_ALT_FILE_EXT: `<p>Alt‑teksten indeholder “%(alt)”, hvilket sandsynligvis er et filnavn, ikke en linkbetegnelse.</p><p>${why.fix}Sæt alt‑teksten til linkets destination.</p><div class="why"><p>Alt‑tekst afspejler betydning; for billeder‑som‑links er det destinationen:</p><ul><li>“Side med tekst” beskriver et billede, ikke et link.</li><li>“IMG_1234.jpg” er et filnavn.</li><li>“<strong><em>Tilmeldingsformular (doc)</em></strong>” beskriver linkets mål.</li></ul></div>`,

	LINK_ALT_MAYBE_BAD: `<p>Alt‑tekst: "<strong>%(alt)</strong>"</p><p>${why.fix}Sæt alt‑teksten for dette billede til linkets destination.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>Alt‑teksten for dette linkede billede består kun af uudtalelige tegn: “%(ALT_TEXT)”.</p><p>${why.fix}Sæt alt‑teksten til linkets mål eller formål.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: '“Klik”/“Klik her” er overflødigt og skjuler linkets formål.',

	LINK_DOI: `<p>${why.fix}Brug artiklens titel som link og lad DOI stå som tekst, ikke omvendt.</p><div class="why"><p>Beskrivende links er nemmere at skimme efter navn og mere tilgængelige.</p><p>Skærmlæsere kan dermed annoncere meningsfulde links fremfor talrækker.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Tilføj beskrivende tekst eller slet linket, hvis det er et uheld (fx et linket mellemrum).</p><div class="why"><p>Skærmlæsere kæmper med tomme links: stilhed eller bogstavvis URL.</p><p>Linkede mellemrum kan kræve at omskrive teksten omkring.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>Linkets <code>aria-labelledby</code> henviser ikke til et eksisterende <code>ID</code>.</p><p>${why.fix}Angiv et gyldigt ID eller fjern attributten.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Tilføj tekst der beskriver destinationen, eller slet linket.</p><div class="why"><p>Tomme links kan ikke beskrives.</p><p>Kan kræve omskrivning af omkringstående tekst.</p></div>`,

	LINK_FILE_EXT: `<p>Linket fører til en fil (PDF, MP3, Zip, Word, …) uden advarsel.</p><p>${why.fix}Angiv filtype i linket via tekst/ikon.</a>.</p><p class="why">Angiv evt. filstørrelse: “Årsrapport (PDF, 3 MB)”.</p>`,

	LINK_IDENTICAL_NAME: `<p>Tekst for linket: "<strong>%(TEXT)</strong>"</p><p>${why.fix}Gør linkteksterne unikke ved at bruge de forskellige destinations titler.</p>${why.links}`,

	LINK_IMAGE_ALT: `Sørg for at denne alt‑tekst beskriver linkets destination:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p><span style="display: none;">%(ALT)</span>Link med alt‑tekst:<br>"<strong>%(LINK)</strong>"</p><p>${why.fix}Redigér eller fjern alt‑teksten, hvis den tilføjer irrelevant eller redundant information.</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p><a href="https://webaim.org/techniques/hypertext/link_text#alt_link">Alt‑tekst for linkede billeder beskriver linkets mål</a>. Lange alt‑tekster tyder ofte på, at billedet beskrives i stedet for linket.</p>Alt‑teksten er %(altLength) tegn: <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Når et link indeholder et billede, bruges billedets alt‑tekst https://webaim.org/techniques/hypertext/link_text#alt_linksom linkets navn</p><p>${why.fix}Sæt alt‑teksten til linkets mål/formål.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'Billedet er markeret som dekorativt, men linket bruger omkringstående tekst som etiket.',

	LINK_NEW_TAB: `<p>${why.fix}Åbn i samme fane eller <a href="https://itmaybejj.github.io/linkpurpose/">advar brugeren</a> om ny fane.</p><div class="why"><p>Brugere kan selv vælge ny fane; tvang kan forvirre, især mht. “tilbage”.</p><p>I formularer åbner links ofte i ny fane for at undgå datatab.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>Alt‑teksten for dette linkede billede er en placeholder: “<strong>%(alt)</strong>”.</p><p>${why.fix}Sæt alt‑teksten til linkets destination.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Linket indeholder ord, der ikke hjælper med at beskrive formålet:<br><strong>%(text)</strong></p><p>${why.fix}Omskriv så formål eller destination er klart.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>ARIA leverer et tilgængeligt navn, men den synlige tekst er generisk: “<strong {C}>%(ERROR)</strong>”.</p><p>${why.fix}Skriv meningsfulde, synlige linktekster, der matcher ARIA‑navnet.</p>${why.links}`,

	LINK_SUS_ALT: `<p>Alt‑teksten indeholder “%(alt)”, hvilket ofte betyder, at billedet beskrives frem for linkdestinationen.</p><p>Alt‑tekst: "<strong>%(ALT_TEXT)</strong>"</p><p>For at rette: sørg for at alt‑teksten beskriver linkets formål eller destination.</p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Undgå symboler som call‑to‑action i linktekst, medmindre de skjules for hjælpemidler. Skærmlæsere kan udtale dem forvirrende. Overvej at fjerne: <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Erstat URL som linktekst med titel eller formål.</p><div class="why"><p>Brugere — særligt skærmlæser‑brugere — skimmer links ved navn.</p><p>URL’er er svære at skimme/søge i.</p></div>`,

	META_LANG: `<p>${why.fix}Tilføj <a href="https://www.w3.org/International/questions/qa-html-language-declarations">sprog‑attribut</a> på sidens HTML‑tag.</p><div class="why"><p>Skærmlæsere vælger udtale efter sprog. Forkert sprog ⇒ uforståelig tale.</p></div>`,

	META_MAX: `<p>Dette meta‑tag begrænser zoom.</p><p>${why.fix}Fjern/tilpas begrænsningen, så fuld zoom er mulig.</p>`,

	META_REFRESH: `<p>Automatisk opdatering via meta afbryder brugeren og kan nulstille formularer.</p><p>${why.fix}Brug AJAX/JS og giv varsel, så brugeren kan udsætte opdateringen.</p>`,

	META_SCALABLE: `<p>Dette meta‑tag forhindrer zoom.</p><p>${why.fix}Tillad fuld zoom ved at fjerne/justere tagget.</p>`,

	META_TITLE: `<p>${why.fix}Tilføj <code>&lt;title&gt;</code> i <code>&lt;head&gt;</code>.</p><div class="why"><p>En <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title">short, unik sidetitel</a> er vigtig:</p><ul><li>Søgeresultater</li><li>Browserfaner</li><li>Skærmlæsere ved faneskift</li></ul><p>Uden titel ser/hører man kun en rå URL.</p></div>`,

	MISSING_ALT: `<p>Mangler alt, læser skærmlæsere billed‑URL’en bogstav for bogstav.</p><p>${why.fix}Brug alt="" for dekorative billeder, eller en beskrivende alt‑tekst for meningsbærende billeder.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Ved linkede billeder uden alt læses billed‑URL’en — særligt problematisk.</p><p>${why.fix}Tilføj en alt‑tekst, der beskriver linkets mål.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Billedet er del af et link med tekst. Hvis synlig tekst er tilstrækkelig, brug alt="". Ellers tilføj alt‑tekst, der beskriver målet.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>Linket ser ud til at pege på et udviklingsmiljø:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Brug en relativ sti (/folder) eller offentlig URL.</p>`,

	QA_BLOCKQUOTE: `<p><code>blockquote</code> tolkes som citat. Korte “citat‑blokke” er ofte overskrifter.</p><p>${why.fix}Er det en overskrift, så brug overskriftsformat.</p>${why.headings}`,

	QA_DOCUMENT: `<p>Linkede dokumenter er webindhold og skal være tilgængelige. Tjek overskrifter, tabelhoveder og alt‑tekster; luk derefter advarslen.</p><div class="why"><ul><li>Gør dine <a href="https://support.google.com/docs/answer/6199477?hl=da">Google‑dokumenter</a> tilgængelige.</li><li>Gør dine <a href="https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office‑dokumenter</a> tilgængelige.</li></ul></div>`,

	QA_FAKE_HEADING: `<p>${why.fix}Hvis den fede linje introducerer et emne, så brug overskriftsformat.</p><div class="why"><p>Tip: overskrifter giver en navigérbar indholdsfortegnelse for hjælpemidler.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Hvis “%(text)” er et punktopstillingselement, så brug listeformat.</p><div class="why"><p>Lister har visuel og semantisk struktur:</p><ol><li>Jævne indryk gør læsning lettere.</li><li>Skærmlæsere annoncerer placering (“punkt 3 af 7”).</li></ol><p>En sætning med et tal i starten er ikke en rigtig liste.</p></div>`,

	QA_IN_PAGE_LINK: `<p>Linkets mål matcher ikke noget element på siden.</p><div class="why"><p>Udviklernote: hvis det er en JS‑anker, så test tastaturbetjening før udelukkelse.</p></div>`,

	QA_JUSTIFY: `<p>Fuldjusteret tekst skaber ujævne mellemrum og gør læsning vanskelig.</p><p>${why.fix}Brug venstrejusteret tekst.</p>`,

	QA_NESTED_COMPONENTS: 'Undgå indlejrede interaktive komponenter (accordion i accordion, tabs i accordion) — det besværliggør navigation og kan skjule indhold.',

	QA_PDF: `<p>${why.fix}Gør én af følgende og luk advarslen:</p><ul><li>Link til en webside i stedet for PDF,</li><li>eller tilbyd også en web/redigerbar version,</li><li>eller sørg for at PDF’en er tagget (overskrifter, læserækkefølge, tabelhoveder, alt‑tekster).</li></ul><div class="why"><p>Mange — især mobil‑ og hjælpemiddel‑brugere — foretrækker websider frem for PDF’er.</p></div>`,

	QA_SMALL_TEXT: 'For lille tekst er svær at læse, særligt for brugere med nedsat syn. Undgå mindre end standardstørrelse.',

	QA_STRONG_ITALICS: `<p>${why.fix}Brug fed/kursiv sparsomt til nøgleord.</p><div class="why"><p>Tip: er det et citat, så brug <code>blockquote</code>.</p></div>`,

	QA_SUBSCRIPT: `Hævet/sænket skrift gør teksten lille og svær at læse. Brug kun til fx 4<sup>e</sup>, H<sub>2</sub>O, fodnoter.`,

	QA_UNDERLINE: `<p>Understregning betyder “link” på webben. Brugere vil tro, det kan klikkes.</p><p>${why.fix}Brug <strong>fed</strong> eller <em>kursiv</em> til fremhævelse, og overskrifter til nye sektioner.</p><div class="why"><p>Skærmlæsere annoncerer ikke visuelle stilarter; struktur skabes af overskrifter.</p></div>`,

	QA_UPPERCASE: `<p>STORE BLOKKE MED VERSALER ER SVÆRERE AT LÆSE OG KAN OPFATTES SOM “RAAB”.</p><p>${why.fix}Fremhæv få ord ad gangen, helst med fed frem for versaler.</p><div class="why"><p>Skærmlæsere annoncerer ikke “fed”. Brug overskrift ved nyt emne.</p></div>`,

	SUS_ALT: `<p>Alt‑teksten indeholder “%(alt)” og er formentlig redundant:</p><p><strong class="badge">Alt‑tekst</strong> “%(ALT_TEXT)”</p><p>${why.fix}Omskriv alt‑teksten kort og betydningsbærende.</p><div class="why"><p>Skærmlæsere annoncerer allerede “billede”, så “billede af …” er ofte unødvendigt.</p></div>`,

	TABINDEX_ATTR: `<p>${why.fix}Brug aldrig tabindex > "0". Tilpas HTML‑rækkefølgen, så tab‑, læse‑ og visuel rækkefølge matcher.</p><div class="why"><p>Som standard matcher de tre rækkefølger.</p><p>Positiv tabindex flytter elementet op i tab‑rækkefølgen, <strong>uden</strong> at flytte det visuelt — det forvirrer.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Sørg for, at hver tabeloverskriftscelle indeholder tekst.</p><div class="why"><p>Tip: skærmlæsere bruger overskrifter til at orientere i tabeller.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Angiv i tabellens indstillinger om overskrifter findes i første række, første kolonne eller begge.</p><div class="why"> <p>Tip: skærmlæsere gentager relevante overskrifter i celler.</p><p>Er tabellen kun til layout, fjern tabel‑formatet.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Fjern indholdsoverskrifter (h2, h3) fra tabellen. Brug tabeloverskrifter. For flere niveauer: del i flere tabeller.</p><div class="why"> <p>Tip: tabeloverskrifter er rettede (række/kolonne). Indholdsoverskrifter gælder alt efterfølgende — også i andre kolonner:</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">En <strong>tabeloverskrift</strong> i celle 2 mærker celle B. <br><br> En <strong>indholdsoverskrift</strong> i celle 2 påvirker 3, A, B, C og denne tekst samt tooltip‑fod.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,
}

export const interfaceStrings = {
	ALERT_CLOSE: 'Luk',
	ALT: 'Alt‑tekst: ',
	DECORATIVE: 'Markeret som dekorativ',
	DISMISS: 'Ignorer',
	DISMISS_ALL: 'På denne side: ignorer',
	edit_page: 'Rediger side',
	edit_layout: 'Rediger layout',
	edit_term: 'Rediger term',
	edit_user: 'Rediger bruger',
	IMAGES: 'Alt‑tekst',
	MAIN_TOGGLE_LABEL: 'Aktivér tilgængelighedsværktøjer',
	MISSING: '(mangler!)',
	NOT_VISIBLE: 'Bemærk: Dette indhold kan være skjult. Find det i det markerede område.',
	NO_IMAGES: 'Ingen billeder fundet.',
	OUTLINE: 'Overskrifter',
	PANEL_DISMISS_BUTTON: `Vis %(dismissCount) skjulte beskeder`,
	PANEL_HEADING: 'Vis visualiseringer',
	SKIP_TO_ISSUE: 'Vis advarsel',
	WARNING: 'kræver manuel kontrol',
	WARNINGS: 'kræver manuelle kontroller',
	buttonFirstContent: 'Vis den første advarsel',
	buttonHideHiddenAlert: 'Skjul skjult besked',
	buttonHideHiddenAlerts: `Skjul %(count) skjulte beskeder`,
	buttonShowHiddenAlert: 'Vis skjult besked',
	buttonToolsActive: 'Skjul visualiseringer',
	dismissActions: `Lignende beskeder`,
	dismissHideTitle: 'Skjuler kun beskeden for dig',
	dismissOkAllButton: 'På denne side: marker som OK',
	dismissOkButtonContent: 'Marker som OK',
	dismissOkTitle: 'Skjuler beskeden for alle redaktører',
	dismissOnSite: 'På hele sitet: marker som OK',
	dismissalsHeader: 'Tænker du ikke at løse dette?',
	errorOutlinePrefixHeadingEmpty: '(tom overskrift)',
	errorOutlinePrefixHeadingIsLong: '(markeret for længde)',
	errorOutlinePrefixSkippedLevel: '(markeret for niveau‑spring)',
	issueContent: 'Indholdsproblem',
	issueDeveloper: 'Udviklingsproblem',
	issueTemplate: 'Skabelonproblem',
	main_toggle_hide: 'Skjul tilgængelighedsværktøjer',
	main_toggle_hide_alerts: 'Skjul tilgængelighedsbeskeder',
	main_toggle_show: 'Vis tilgængelighedsværktøjer',
	main_toggle_show_alerts: 'Vis tilgængelighedsbeskeder',
	panelCheckAltText: `<p class="ed11y-small">Kontrollér at hvert billede beskriver sin betydning i konteksten, og at der ikke er “tekst i billeder”.</p>`,
	panelCheckOutline: `<p class="ed11y-small">Dette viser overskriftsstrukturen. Sørg for at den matcher sidens visuelle struktur.</p>`,
	PANEL_HEADING_MISSING_ONE: 'Overskrift på niveau 1 mangler.',
	PANEL_NO_HEADINGS: 'Ingen overskrifter fundet.',
	reportsLink: 'Åbn webstedsrapporter',
	toggleDisabled: 'Der er intet indhold som Editoria11y kan kontrollere.',
	transferFocus: 'Redigér dette indhold',
	unDismissHideButton: 'Gendan denne ignorerede besked',
	unDismissNotePermissions: 'Denne kontrol er skjult af en administrator',
	unDismissOKButton: 'Gendan denne besked markeret som OK',
};

export const lang = {
	strings: Object.assign(Sa11yStrings.strings, interfaceStrings, tips),
	testNames: testNames,
}
