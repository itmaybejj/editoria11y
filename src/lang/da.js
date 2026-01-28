import strings from '../sa11y-lang/da.js';

// todo check each file for link integrity, and escaping of tags in code blocks.
export const testNames = {
	ALT_FILE_EXT: 'Denne alt‑tekst er et filnavn, ikke en beskrivelse',
	ALT_MAYBE_BAD: 'Denne alt‑tekst kan ikke udtales af en skærmlæser',
	ALT_PLACEHOLDER: 'Denne alt‑tekst er meningsløst placeholder‑indhold',
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
	EMBED_AUDIO: 'Har denne lyd et transskript?',
	EMBED_DATA_VIZ: 'Er denne visualisering tilgængelig?',
	EMBED_GENERAL: 'Indlejrede iframes kræver manuelle tjek',
	EMBED_MISSING_TITLE: 'Ramme mangler et "title"‑attribut',
	EMBED_UNFOCUSABLE: 'En ramme med tabindex="-1" kan ikke fokusere med tastatur.',
	EMBED_VIDEO: 'Har denne video korrekte undertekster?',
	HEADING_EMPTY: 'Denne overskrift har ingen tekst',
	HEADING_EMPTY_WITH_IMAGE: 'Dette billede bruges som overskrift og har derfor brug for alt‑tekst',
	HEADING_FIRST: 'Den første overskrift på denne side er en underoverskrift',
	HEADING_LONG: 'Kan denne overskrift være kortere?',
	HEADING_MISSING_ONE: 'Denne side mangler en overskrift på niveau 1',
	HEADING_SKIPPED_LEVEL: 'Denne overskrift har et forkert niveau',
	HIDDEN_FOCUSABLE: 'Dette element kan ikke beskrives af skærmlæsere',
	IMAGE_ALT_TOO_LONG: 'Kan denne alt‑tekst være kortere?',
	IMAGE_DECORATIVE: 'Er dette billede virkelig uden betydning?',
	IMAGE_DECORATIVE_CAROUSEL: 'Billede i et slideshow eller galleri er markeret som dekorativt',
	IMAGE_FIGURE_DECORATIVE: 'Manuel kontrol: billede med billedtekst mangler alt‑tekst',
	IMAGE_FIGURE_DUPLICATE_ALT: 'Alt‑tekst må ikke være identisk med billedteksten',
	LABELS_ARIA_LABEL_INPUT: 'Er der en synlig etiket til dette felt?',
	LABELS_PLACEHOLDER: 'Manuel kontrol: placeholder‑tekst',
	LABELS_INPUT_RESET: 'Er denne nulstillingsknap nødvendig?',
	LABEL_IN_NAME: 'Den synlige etiket matcher ikke den usynlige etiket',
	LINK_ALT_FILE_EXT: 'Alt‑tekst brugt som link må ikke være en URL',
	LINK_ALT_MAYBE_BAD: 'Denne alt‑tekst i linket kan ikke udtales af en skærmlæser',
	LINK_ALT_UNPRONOUNCEABLE: 'Billeder brugt som links skal have udtalevenlig alt‑tekst',
	LINK_CLICK_HERE: 'Manuel kontrol: link indeholder “klik her”',
	LINK_DOI: 'Link til artikeltitler, ikke DOI‑numre',
	LINK_EMPTY: 'Dette link har ingen tekst',
	LINK_EMPTY_LABELLEDBY: 'Linket har et ugyldigt "aria‑labelledby"‑attribut',
	LINK_EMPTY_NO_LABEL: 'Dette link har brug for en etiket',
	LINK_FILE_EXT: 'Link fører til en fil uden advarsel',
	LINK_IDENTICAL_NAME: 'Beskriver dette link tydeligt sin destination?',
	LINK_IMAGE_ALT: 'Manuel kontrol: billede i link med alt‑tekst',
	LINK_IMAGE_ALT_AND_TEXT: 'Giver denne alt‑tekst mening som del af linket?',
	LINK_IMAGE_LONG_ALT: 'Kan denne alt‑tekst i linket være kortere?',
	LINK_IMAGE_NO_ALT_TEXT: 'Dette billede, som bruges som link, har brug for alt‑tekst',
	LINK_IMAGE_TEXT: 'Manuel kontrol: billede i link er markeret som dekorativt.',
	LINK_NEW_TAB: 'Åbner dette link en ny fane uden advarsel?',
	LINK_PLACEHOLDER_ALT: 'Dette billede i et link har brug for meningsfuld alt‑tekst',
	LINK_STOPWORD: 'Beskriver dette link sin destination?',
	LINK_STOPWORD_ARIA: 'Meningsfuld linktekst er kun tilgængelig for skærmlæsere',
	LINK_SUS_ALT: 'Beskriver denne alt‑tekst billedet eller linket?',
	LINK_SYMBOLS: 'Manuel kontrol: er symbolerne eller emoji i dette link meningsfulde?',
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
	QA_FAKE_LIST: 'Skal dette være formateret som en liste?',
	QA_IN_PAGE_LINK: 'Ugyldigt internt link',
	QA_JUSTIFY: 'Brug ikke fuldjusteret tekst',
	QA_NESTED_COMPONENTS: 'Indlejrede interaktive komponenter',
	QA_PDF: 'Findes der et alternativ til denne PDF?',
	QA_SMALL_TEXT: 'Teksten er for lille',
	QA_STRONG_ITALICS: 'Store blokke med fremhævet tekst er svære at læse',
	QA_SUBSCRIPT: 'Brug ikke hævet/sænket skrift som visuel styling',
	QA_UNDERLINE: 'Kun links bør være understreget',
	QA_UPPERCASE: 'Er denne tekst med store bogstaver nødvendig?',
	SUS_ALT: 'Er der overflødige ord i denne alt‑tekst?',
	TABINDEX_ATTR: 'tabindex‑attribut forstyrrer læserækkefølgen',
	TABLES_EMPTY_HEADING: 'Denne tabeloverskrift skal indeholde tekst',
	TABLES_MISSING_HEADINGS: 'Denne tabel mangler række‑ og/eller kolonneoverskrifter',
	TABLES_SEMANTIC_HEADING: 'Indholdsoverskrifter bør ikke bruges inde i tabeller',
	UNCONTAINED_LI: 'Ugyldig HTML‑liste',
};

const why = {
	fix: `<strong class="badge">Sådan løser du det</strong> `,
	check: `<strong class="badge">Manuel kontrol</strong> `,

	buttons: `<div class="why"><p>Bemærk: En knaps tilgængelige navn skal tydeligt angive, hvad knappen gør. Knapper, der ændrer funktion når de klikkes, skal også ændre navn:</p><ul>
<li>Ændrede etiketter:<br>"Afspil/Pause", "Vis detaljer/Skjul detaljer"</li>
<li>Ændrede https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_propertiesARIA‑tilstandsattributter</a>:<br>"Afspil/Afspil (trykket)", "Detaljer (foldet sammen)/Detaljer (udfoldet)"</li>
</ul>
<p>Men skift ikke både etiket og ARIA‑tilstand på samme tid. At ændre “Afspil” til “Pause (trykket)” betyder, at afspilleren er på pause — ikke at den spiller!</p></div>`,

	headings: `<div class="why"><p>Tip: Overskrifter og underoverskrifter strukturerer indholdet i et hierarki. Skærmlæsere bruger denne struktur til at forstå og navigere sider:</p><ul>
<li>Overskrift niveau 1: sidetitel
<ul><li>Overskrift niveau 2: hovedemner
<ul><li>Overskrift niveau 3: underemner</li></ul>
</li></ul>
</li>
</ul></div>`,

	images: `<div class="why"><p>Tip: Når du skriver alt‑tekst, skal du beskrive, hvad billedet betyder i konteksten — ikke kun hvad det viser. Et billede af et barn der sparker til en bold kan betyde forskellige ting:</p><ul>
<li>De spillede i kraftig regn.</li>
<li>De nye trøjer har flotte drage‑logoer.</li>
<li>Hun scorede sejrsmålet fra venstre side!</li>
</ul></div>`,

	links: `<div class="why"><p>Brugere scanner sider for at finde links og bruger søg‑på‑side til at finde dem efter navn. Gode links skal derfor være meningsfulde, unikke og korte:</p><ul>
<li>Ideelt: "Læs mere om https://webaim.org/techniques/hypertext/link_textmeningsfulde links</a>"</li>
<li>Ikke unikt: "Klik https://webaim.org/techniques/hypertext/link_texther</a> for at lære mere."</li>
<li>Ikke kort: "https://webaim.org/techniques/hypertext/link_textKlik her for at lære mere</a>"</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>Alt‑tekst skal beskrive betydningen af et billede — ikke blot dets udseende. For et billede, der fungerer som et link, er betydningen linkets destination:</p><ul>
<li>"<em>Et forstørrelsesglas</em>" beskriver et billede, ikke et link.</li>
<li>"<em>Et søge‑forstørrelsesglas</em>" beskriver begge dele uklart.</li>
<li>"<em>Søg</em>" beskriver korrekt linkets funktion.</li>
</ul></p></div>`,
};

export const tips = {

	ALT_FILE_EXT: `<p>Skærmlæsere vil læse denne URL højt, ofte én bogstav ad gangen. Det gengiver sandsynligvis ikke den samme betydning som at se billedet.</p><p>${why.fix}Tilføj en tom alt (alt=""), hvis dette er ren dekoration, som bør ignoreres af skærmlæsere, eller tilføj en beskrivende alt‑tekst.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Angivet beskrivelse for dette billede: <strong>"%(alt)"</strong></p><p>${why.fix}Sæt en alt‑tekst, der kort beskriver, hvad billedet betyder i denne kontekst.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Angivet beskrivelse for dette billede: <strong>"%(alt)"</strong></p><p>${why.fix}Sæt en alt‑tekst, der kort beskriver, hvad billedet betyder i denne kontekst.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>Alt‑teksten for dette billede er "%(alt)", men indeholder kun symboler og/eller mellemrum, som ikke kan udtales. En skærmlæser vil annoncere billedet og derefter holde en akavet pause: "billede: ____."</p><p>${why.fix}Tilføj en beskrivende alt‑tekst, eller brug en helt tom alt (alt=""), hvis billedet blot er et ikon eller afstandselement, som bør ignoreres.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Brug en gyldig metode til at give skærmlæsere besked om, hvad denne knap gør — fx synlig tekst, alt‑tekst på et ikon eller et title‑attribut.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Denne knap har et <code>aria-labelledby</code>‑attribut, som enten er tomt eller ikke matcher et <code>ID</code> på siden.</p><p>${why.fix}Knyt ID’et til et eksisterende element, eller fjern attributtet og beskriv knappen på en anden måde.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'Et baggrundsbillede eller en gradient gør, at denne kontrol ikke med sikkerhed kan afgøre farven bag teksten. Brug farvevælgeren herunder til manuel kontrol.',

	DUPLICATE_ID: `<p>ID’er bruges på denne side som etiketter eller linkmål og skal derfor være unikke.</p><p>${why.fix}Redigér denne ID: <strong>#%(id)</strong></p><div class="why"><p>I mange CMS’er stammer dette fra et felt kaldet “name” eller “id”. I HTML er det attributten: <code><a id="MY-ID"></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Fjern <code>title</code>‑attributtet fra dette link.</p><div class="why"><p>Bemærk: Tooltips fra <code>title</code> vises kun ved muse‑hover. De er ikke synlige for tastaturnavigation eller mobilbrugere og bør derfor aldrig indeholde vigtig information.</p></div>`,

	EMBED_AUDIO: `<p>Hvis dette lydklip indeholder tale, skal der leveres en https://www.w3.org/WAI/media/av/transcribing/tekstlig version</a> på siden eller via et link.</p><p>Automatiske transskriptioner skal efterses manuelt for at sikre korrekt angivelse af talere og relevante lyde.</p>`,

	EMBED_DATA_VIZ: `<p>Indlejrede visualiseringer er ofte svære eller umulige for brugere af hjælpemidler at anvende, svære at afkode for brugere med nedsat syn eller farveblindhed og kan kræve vandret scroll på mobil.</p><p>${why.fix}Medmindre visualiseringen har høj kontrast, fuld tastaturbetjening <strong><em>og</em></strong> kan beskrives af skærmlæsere, skal du give et ligeværdigt alternativ såsom en tekstlig beskrivelse, datatabel eller et downloadbart regneark.</p>`,

	EMBED_GENERAL: 'Automatiske værktøjer kan ikke analysere indhold inde i embeds. Sørg for, at billeder har alt‑tekst, videoer har undertekster, tekst har tilstrækkelig kontrast, og at links og knapper er https://webaim.org/techniques/keyboard/tastaturtilgængelige</a>, og luk derefter advarslen.',

	EMBED_MISSING_TITLE: `<p>Indlejrede elementer kræver et tilgængeligt navn, som beskriver indholdet for skærmlæsere.</p><p>${why.fix}Tilføj et entydigt <code>title</code>‑ eller <code>aria-label</code>‑attribut.</p>`,

	EMBED_UNFOCUSABLE: `Dette attribut instruerer tastatur og hjælpemidler i at ignorere elementet. Medmindre iframe‑indholdet ikke har links, knapper, formularer og ikke kan scrolles, bør attributtet fjernes.`,

	EMBED_VIDEO: `<p>Videoer skal have undertekster.</p><p>Automatisk genererede undertekster skal kontrolleres manuelt.</p><p>${why.fix}Tilføj eller korrigér underteksterne og luk derefter denne advarsel.</p>`,

	HEADING_EMPTY: `<p>Tomme overskrifter skaber forvirrende huller i sidens struktur.</p><p>${why.fix}Tilføj tekst til denne overskrift eller fjern den tomme linje.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Tomme overskrifter skaber forvirrende huller i sidens struktur.</p><p>${why.fix}Hvis dette ikke er en overskrift, ændr formatet fra <strong {C}>Overskrift %(level)</strong> til <strong>Afsnit</strong>. Hvis det er en overskrift, skal billedets betydning skrives ind i alt‑teksten.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Sørg for, at sidetitel er markeret som Overskrift 1 eller Overskrift 2. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}Medmindre dette er en fast titel (fx en udgivet artikel), bør den gøres kortere for at være lettere at skimme.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Markér sidetitel som en overskrift på niveau 1 for at angive dokumentets startpunkt.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Denne overskrift sprang fra <strong>niveau %(prevLevel)</strong> til <strong>niveau %(level)</strong>. For skærmlæsere virker det som om indhold mangler.</p><p>${why.fix}Juster niveauerne for at bevare en logisk struktur.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: 'Dette interaktive element har <code>aria-hidden="true"</code>, men kan stadig fokuseres med tastaturet. Hvis det skal skjules for skærmlæsere, tilføj også <code>tabindex="-1"</code>. Ellers fjern <code>aria-hidden="true"</code>.',

	IMAGE_ALT_TOO_LONG: `<p>Alt‑tekst læses op som én sammenhængende sætning — hvis brugeren misser noget, skal hele teksten genhøres.</p><p>Denne alt‑tekst er %(altLength) tegn lang: <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Tip: Komplekse billeder kræver ofte en <strong>synlig</strong> billedtekst eller udvidet beskrivelse.</p></div>`,

	IMAGE_DECORATIVE: `<p>Dette billede er skjult for skærmlæsere ved hjælp af en tom alt. Kun reelt dekorative billeder bør skjules.</p><p>${why.fix}Hvis billedet har betydning, skal du tilføje alt‑tekst.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'Dette billede er markeret som <strong>dekorativt</strong>, men alle billeder i slideshows eller gallerier skal have beskrivende alt‑tekst.',

	IMAGE_FIGURE_DECORATIVE: `<p>Dette billede bliver ignoreret af hjælpemidler. Giver billedteksten mening uden selve billedet?</p><p>${why.fix}Hvis billedteksten ikke fuldt ud formidler den visuelle betydning, tilføj da alt‑tekst der dækker den manglende information.</p><div class="why"><p>Tip: billeder, alt‑tekster og billedtekster arbejder sammen:</p><ul><li>Synlige billedtekster giver kontekst og fortolkning.</li><li>Alt‑tekst beskriver billedets indhold for brugere, der ikke kan se det.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Redigér alt‑teksten, så den beskriver billedets visuelle betydning.</p><div class="why"><p>Tip: billeder, alt‑tekster og billedtekster fungerer sammen:</p><ul><li>Billedtekster giver kontekst og forklaring.</li><li>Alt‑tekst beskriver det visuelle indhold, så billedteksten giver mening.</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: '<p><strong {B}>Usynlig feltetiket:</strong> <strong {C}>%(TEXT)</strong></p><p>Sørg for, at feltet har en synlig etiket, at den forbliver synlig når der skrives i feltet, og at den matcher det skjulte tilgængelige navn.</p><div class="why"><p>Etiketter i title eller placeholder forsvinder når man begynder at skrive, hvilket gør det svært at tjekke eller rette indholdet korrekt.</p></div>',

	LABELS_INPUT_RESET: `<p>Nulstillingsknapper aktiveres let ved et uheld og kan føre til datatab uden advarsel.</p><p>${why.fix}Medmindre den kun nulstiller ét enkelt felt, bør du fjerne den eller kræve en bekræftelse.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'Billedknappen mangler alt‑tekst. Tilføj fx <em>Søg</em> eller <em>Send</em>.',

	LABELS_MISSING_LABEL: 'Dette inputfelt har ingen tilknyttet etiket. Tilføj et <code>id</code> til feltet og et tilhørende <code>for</code>‑attribut til en label.',

	LABELS_NO_FOR_ATTRIBUTE: 'Dette inputfelt har ingen tilknyttet etiket. Tilføj et <code>for</code>‑attribut, der matcher feltets <code>id</code>.<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>Placeholder‑tekst forsvinder når der indtastes tekst, og har ofte utilstrækkelig kontrast eller ligner regulært indhold.</p><p>${why.fix}Sørg for, at vigtig information såsom etiket, hjælp og formateringskrav altid er synlig.</p>`,

	LABEL_IN_NAME: `<p>Denne synlige etiket stemmer ikke overens med det tilgængelige navn. Det kan forvirre brugere af skærmlæsere samt stemmestyring.</p><p>${why.check}Sørg for, at den synlige etiket starter med og matcher det skjulte, tilgængelige navn.</p><p><strong>Skjult etiket:</strong> "%(TEXT)"</p>`,

	LINK_ALT_FILE_EXT: `<p>Alt‑teksten for dette billede indeholder "%(alt)", hvilket sandsynligvis er et filnavn og ikke en meningsfuld linkbetegnelse.</p><p>${why.fix}Sæt alt‑teksten til linkets destination.</p><div class="why"><p>Alt‑tekst skal beskrive betydningen af billedet. For et billede, der bruges som link, er betydningen det sted linket fører til:</p><ul><li>"Tekst på en side" beskriver billedet, ikke linket.</li><li>"IMG_1234.jpg" er kun et filnavn.</li><li>"<strong><em>Tilmeldingsformular (.doc)</em></strong>" er en korrekt linkdestination.</li></ul></p></div>`,

	LINK_ALT_MAYBE_BAD: `<p>Denne alt‑tekst er en placeholder: "<strong>%(alt)</strong>".</p><p>${why.fix}Sæt alt‑teksten så den beskriver linkets destination.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>Alt‑teksten for dette linkede billede består kun af uudtalelige tegn: "%(ALT_TEXT)".</p><p>${why.fix}Sæt alt‑teksten til at beskrive linkets formål.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `Udtryk som “klik her” er overflødige og skjuler linkets egentlige formål.`,

	LINK_DOI: `<p>${why.fix}Brug artiklens titel som link, og lad DOI stå som almindelig tekst.</p><div class="why"><p>https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20linksAPA anbefaler</a> beskrivende links, da brugere scanner efter linknavne.</p><p>Dette gør det også muligt for skærmlæsere at annoncere meningsfulde links fremfor talrækker.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Tilføj meningsfuld linktekst, eller slet linket hvis det er et uheld (fx et linket mellemrum).</p><div class="why"><p>Skærmlæsere kan ikke håndtere tomme links — de er tavse eller læser URL’er bogstav for bogstav.</p><p>Tomme links kan være svære at slette i nogle redaktører.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>Denne link har et <code>aria-labelledby</code>‑attribut som ikke matcher en node på siden.</p><p>${why.fix}Ret ID‑referencen eller fjern attributtet.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Tilføj en beskrivelse af linkets destination eller fjern linket.</p><div class="why"><p>Skærmlæsere kan ikke beskrive tomme links og kan læse URL’er bogstav for bogstav.</p></div>`,

	LINK_FILE_EXT: `<p>Denne link fører til en fil (PDF, MP3, ZIP, Word, osv.) uden advarsel.</p><p>${why.fix}Angiv filtypen i linkteksten ved hjælp af tekst eller ikon (se https://itmaybejj.github.io/linkpurpose/)</a>.</p><p class="why">For store filer angiv også filstørrelse, fx “Rapport (PDF, 3 MB)”.</p>`,

	LINK_IDENTICAL_NAME: `<p>Flere links med forskellige destinationer har samme navn: "<strong>%(TEXT)</strong>".</p><p>${why.fix}Gør linknavnene unikke og beskrivende.</p>${why.links}`,

	LINK_IMAGE_ALT: `Sørg for at denne alt‑tekst beskriver linkets destination:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Tjek om denne alt‑tekst hjælper med at beskrive linkdestinationen uden at være redundant:</p><p><strong class="badge">Alt</strong> "<em><strong>%(alt)</strong></em>"</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p>Ifølge https://webaim.org/techniques/hypertext/link_text#alt_linkWebAIM</a> bør alt‑tekst for linkede billeder beskrive linkets mål. Hvis den er for lang, beskriver den typisk billedet, ikke linket.</p>Alt‑teksten er %(altLength) tegn: <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Når billeder bruges som links, fungerer deres alt‑tekst som linkets navn for skærmlæsere.</p><p>${why.fix}Sæt alt‑teksten så den beskriver linkets mål.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'Dette billede er markeret som dekorativt, men linket bruger omkringstående tekst som etiket.',

	LINK_NEW_TAB: `<p>${why.fix}Lad linket åbne i samme fane eller https://itmaybejj.github.io/linkpurpose/advar brugeren</a>.</p><div class="why"><p>Brugere kan selv vælge at åbne i ny fane — når en side tvinger det, kan det være forvirrende, især når “tilbage” ikke virker som forventet.</p><p>I formularer åbner links ofte i nye faner for at undgå datatab.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>Alt‑teksten for dette linkede billede er en placeholder: "<strong>%(alt)</strong>".</p><p>${why.fix}Sæt alt‑tekst baseret på linkets destination.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Denne link indeholder tekst, som ikke hjælper brugeren med at forstå destinationen:<br><strong>%(text)</strong></p><p>${why.fix}Omskriv linkteksten så den beskriver formålet.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>Linket har et tilgængeligt ARIA‑navn, men den synlige tekst er generisk: "<strong {C}>%(ERROR)</strong>".</p><p>${why.fix}Brug meningsfuld synlig linktekst, der matcher ARIA‑navnet.</p>${why.links}`,

	LINK_SUS_ALT: `<p>Denne alt‑tekst indeholder ordet "%(alt)", hvilket normalt betyder, at den beskriver billedet og ikke linket.</p><strong class="badge">Alt‑tekst</strong> "%(ALT_TEXT)"    <p>Løsning: sørg for at alt‑teksten beskriver linkets mål.<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Undgå symboler som call‑to‑action i linktekst, medmindre de er skjult for hjælpemidler. Skærmlæsere kan udtale dem på forvirrende måder. Overvej at fjerne: <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Erstat URL som linktekst med en titel eller beskrivelse af destinationen.</p><div class="why"><p>Brugere — især skærmlæserbrugere — scanner linklister efter navne.</p><p>URL’er er svære at scanne og søge i.</p></div>`,

	META_LANG: `<p>${why.fix}Tilføj https://www.w3.org/International/questions/qa-html-language-declarationssprog‑attribut</a> i HTML‑tagget.</p><div class="why"><p>Skærmlæsere bruger deklareret sprog til at bestemme korrekt udtale.</p></div>`,

	META_MAX: `<p>Dette meta‑tag begrænser brugernes mulighed for at zoome.</p><p>${why.fix}Tillad fuld zoom ved at ændre eller fjerne dette tag.</p>`,

	META_REFRESH: `<p>Automatisk sideopdatering bør undgås, da det kan afbryde brugeren eller føre til tab af indtastede data.</p><p>${why.fix}Brug AJAX eller en bekræftelsesdialog i stedet.</p>`,

	META_SCALABLE: `<p>Dette meta‑tag forhindrer brugeren i at zoome ind.</p><p>${why.fix}Fjern eller ændr dette tag så zoom er tilladt.</p>`,

	META_TITLE: `<p>${why.fix}Tilføj et <code><title></code>‑element inde i <code><head></code>.</p><div class="why"><p>En kort og unik https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/titlesidetitel</a> er vigtig for:</p><ul><li>Søgeresultater</li><li>Browserfaner</li><li>Skærmlæsere</li></ul><p>Uden en titel ser brugeren kun en rå URL.</p></div>`,

	MISSING_ALT: `<p>Når skærmlæsere møder et billede uden alt‑attribut, læser de URL’en højt bogstav for bogstav.</p><p>${why.fix}Tilføj alt="" for dekorative billeder eller en beskrivende alt‑tekst for meningsbærende billeder.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Når et linket billede mangler en alt‑tekst, læser skærmlæsere URL’en. Dette er særligt problematisk for links.</p><p>${why.fix}Tilføj alt‑tekst, der beskriver linkets mål.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Dette billede er del af et link med synlig tekst. Hvis den synlige tekst fuldt ud beskriver linkets formål, brug alt="". Ellers tilføj en alt‑tekst der beskriver destinationen.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>Linket ser ud til at pege på et udviklingsmiljø:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Brug en relativ sti (/folder) eller den offentlige URL.</p>`,

	QA_BLOCKQUOTE: `<p>Blockquote‑formatet får skærmlæsere til at læse teksten som et citat. Korte citater er ofte ment som overskrifter.</p><p>${why.fix}Hvis dette er en overskrift, brug da overskriftsformat.</p>${why.headings}`,

	QA_DOCUMENT: `<p>Linkede dokumenter er også webindhold og skal være tilgængelige. Tjek overskrifter, tabeller og alt‑tekster.</p><ul class="why"><li>Gør dine https://support.google.com/docs/answer/6199477?hl=daGoogle‑dokumenter</a> tilgængelige.</li><li>Gør dine https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155Office‑dokumenter</a> tilgængelige.</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}Hvis denne fede tekst introducerer et nyt emne, skift den til en overskrift.</p><div class="why"><p>Tip: Overskrifter skaber en navigerbar indholdsfortegnelse for skærmlæsere.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Hvis "%(text)" er en del af en liste, brug da listeformat.</p><div class="why"><p>Lister skaber både visuel og semantisk struktur:</p><ol><li>Indryk hjælper læsbarheden.</li><li>Skærmlæsere annoncerer position (“punkt 3 af 7”).</li></ol><p>En sætning der starter med et tal er ikke en rigtig liste.</p></div>`,

	QA_IN_PAGE_LINK: `<p>Dette interne link peger ikke på noget element på siden.</p><div class="why"><p>Udviklernote: Hvis dette er et JavaScript‑anker, så test at det virker med tastatur.</p></div>`,

	QA_JUSTIFY: `<p>Fuldjusteret tekst skaber ujævne mellemrum og gør læsning vanskelig for mange.</p><p>${why.fix}Brug venstrejusteret tekst.</p>`,

	QA_NESTED_COMPONENTS: 'Undgå indlejrede interaktive komponenter såsom faner i faner eller akordeoner i akordeoner. Dette gør navigation vanskelig og kan skjule indhold.',

	QA_PDF: `<p>${why.fix}Gør én af følgende ting og ignorér derefter denne advarsel:</p><ul><li>Link til en webside i stedet for PDF‑filen,</li><li>eller tilbyd en webversion eller redigerbar version ud over PDF,</li><li>eller sørg for, at PDF’en er tilgængelig (tagget korrekt, har orden på læserækkefølge, tabelhoved osv.).</li></ul><div class="why"><p>Mobilbrugere og brugere af hjælpemidler foretrækker næsten altid websider frem for PDF‑filer.</p></div>`,

	QA_SMALL_TEXT: 'Teksten er for lille og svær at læse, især for brugere med nedsat syn. Undgå for små skriftstørrelser.',

	QA_STRONG_ITALICS: `<p>${why.fix}Brug kun fed og kursiv til at fremhæve enkelte ord eller korte fraser.</p><div class="why"><p>Bemærk: Brug blockquote hvis dette er et citat.</p></div>`,

	QA_SUBSCRIPT: `Hævet og sænket skrift gør teksten lille og svær at læse. Brug det kun til ting som ordenstal (4<sup>e</sup>), kemiske formler (H<sub>2</sub>O) eller fodnoter.`,

	QA_UNDERLINE: `<p>Understreget tekst betyder normalt “link” på webben. Ellers kan det forvirre brugere.</p><p>${why.fix}Brug <strong>fed</strong> eller <em>kursiv</em> til fremhævning.</p><div class="why"><p>Skærmlæsere nævner ikke visuelle stilarter — kun overskrifter skaber struktur.</p></div>`,

	QA_UPPERCASE: `<p>STORE MÆNGDER TEKST MED STORE BOGSTAVER ER SVÆRERE AT LÆSE OG KAN OPFATTES SOM “RÅBEN”.</p><p>${why.fix}Brug store bogstaver sparsomt og brug hellere fed skrift.</p><div class="why"><p>Skærmlæsere annoncerer ikke fed tekst. Brug overskrifter til at markere vigtige sektioner.</p></div>`,

	SUS_ALT: `<p>Alt‑teksten indeholder ordet "%(alt)", hvilket ofte er overflødigt:</p><p><strong class="badge">Alt‑tekst</strong> "%(ALT_TEXT)"</p><p>Løsning: Skriv alt‑teksten om, så den kort beskriver billedets betydning.</p><div class="why"><p>Tip: Skærmlæsere annoncerer allerede “billede”, så vendinger som “billede af” er ofte unødvendige.</p></div>`,

	TABINDEX_ATTR: `<p>${why.fix}Brug aldrig en positiv tabindex. Sørg for at HTML‑elementernes orden afspejler både visuel og logisk rækkefølge.</p><div class="why"><p>Normalt er visuel rækkefølge, tabulatorrækkefølge og læserækkefølge ens.</p><p>En positiv tabindex flytter elementet til toppen af tabulatorrækkefølgen, <strong>men ikke i den visuelle rækkefølge</strong>.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Sørg for at hver tabeloverskriftscelle indeholder tekst.</p><div class="why"><p>Tip: Skærmlæsere bruger tabeloverskrifter til at orientere brugeren.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Angiv i tabelindstillingerne, om tabeloverskrifter findes i første række, første kolonne eller begge.</p><div class="why"> <p>Tip: Skærmlæsere gentager relevante overskrifter når der navigeres i tabellen.</p><p>Hvis tabellen bruges til layout og ikke data, bør tabelformatet fjernes.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Fjern denne overskrift (h2, h3). Brug tabeloverskrifter i stedet. Ved behov for flere niveauer: del tabellen op.</p><div class="why"> <p>Forklaring: Tabeloverskrifter gælder for en række eller kolonne, mens indholdsoverskrifter gælder for alt underliggende indhold.</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2"><strong>Tabeloverskrift</strong> i celle 2 mærker celle B. <br><br> En <strong>indholdsoverskrift</strong> i celle 2 mærker både 3, A, B og C samt denne tekst og fodnoten.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,

};

export const interfaceStrings = {
	ALERT_CLOSE: 'Luk',
	ALT: 'Alt‑tekst: ',
	DECORATIVE: 'Markeret som dekorativ',
	DISMISS: 'Ignorer',
	DISMISS_ALL: 'På denne side: ignorer',
	edit_page: 'Rediger side',
	edit_layout: 'Rediger layout',
	edit_term: 'Rediger term',
	edit_tags: 'Rediger bruger',
	IMAGES: 'Alt‑tekst',
	MAIN_TOGGLE_LABEL: 'Aktivér tilgængelighedsværktøjer',
	MISSING: '(mangler!)',
	NOT_VISIBLE: 'Bemærk: Dette indhold er muligvis ikke synligt. Søg efter det i det markerede område.',
	NO_IMAGES: 'Ingen billeder fundet.',
	OUTLINE: 'Overskrifter',
	PANEL_DISMISS_BUTTON: `Vis %(dismissCount) skjulte beskeder`,
	PANEL_HEADING: 'Vis visualiseringer',
	SKIP_TO_ISSUE: 'Gå til problemet',
	WARNING: 'kræver manuel kontrol',
	WARNINGS: 'kræver manuelle kontroller',
	buttonFirstContent: 'Gå til første besked',
	buttonHideHiddenAlert: 'Skjul skjult besked',
	buttonHideHiddenAlerts: `Skjul %(count) skjulte beskeder`,
	buttonShowHiddenAlert: 'Vis skjult besked',
	buttonToolsActive: 'Skjul visualiseringer',
	dismissActions: `Lignende beskeder`,
	dismissHideTitle: 'Skjuler denne besked kun for dig',
	dismissOkAllButton: 'På denne side: markér som OK',
	dismissOkButtonContent: 'Markér som OK',
	dismissOkTitle: 'Skjuler beskeden for alle redaktører',
	dismissOnSite: 'På hele sitet: markér som OK',
	dismissalsHeader: 'Har du ikke tænkt dig at løse dette?',
	errorOutlinePrefixHeadingEmpty: '(tom overskrift)',
	errorOutlinePrefixHeadingIsLong: '(markeret for længde)',
	errorOutlinePrefixSkippedLevel: '(markeret for manglende niveau)',
	issueContent: 'Indholdsproblem',
	issueDeveloper: 'Udviklingsproblem',
	issueTemplate: 'Skabelonproblem',
	main_toggle_hide: 'Skjul tilgængelighedsværktøjer',
	main_toggle_hide_alerts: 'Skjul tilgængelighedsbeskeder',
	main_toggle_show: 'Vis tilgængelighedsværktøjer',
	main_toggle_show_alerts: 'Vis tilgængelighedsbeskeder',
	panelCheckAltText: '<p class="ed11y-small">Kontrollér at hvert billede beskriver sin betydning i konteksten, og at der ikke findes billeder med tekstindhold.</p>',
	panelCheckOutline: '<p class="ed11y-small">Dette viser overskriftsstrukturen. Sørg for at den matcher sidens visuelle struktur.</p>',
	PANEL_HEADING_MISSING_ONE: 'Overskrift på niveau 1 mangler.',
	PANEL_NO_HEADINGS: 'Ingen overskrifter fundet.',
	reportsLink: 'Åbn webstedsrapporter',
	toggleDisabled: 'Ingen indhold er tilgængeligt for Editoria11y at kontrollere.',
	transferFocus: 'Redigér dette indhold',
	unDismissHideButton: 'Gendan denne ignorerede besked',
	unDismissNotePermissions: 'Denne kontrol er skjult af en administrator',
	unDismissOKButton: 'Gendan denne besked markeret som OK',
};

const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips),
  testNames: testNames,
};

export default newStrings;
