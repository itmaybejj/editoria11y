import { default as Sa11yStrings } from '../sa11y-lang/de.js';
// Machine translation.

const testNames = {
	ARIA_INPUT_FIELD_NAME: 'Diesem benutzerdefinierten Eingabefeld fehlt eine Beschriftung',
	ALT_FILE_EXT: 'Dieser Alt‑Text ist ein Dateiname, keine Beschreibung',
	ALT_MAYBE_BAD: 'Ist dies eine klare und prägnante Beschreibung des Bildes?',
	ALT_MAYBE_BAD_WARNING: 'Ist dies eine klare und prägnante Beschreibung des Bildes?',
	ALT_PLACEHOLDER: 'Dieser Alt‑Text ist möglicherweise ein Platzhalter',
	ALT_UNPRONOUNCEABLE: 'Dieser Alt‑Text ist unaussprechlich',
	BTN_EMPTY: 'Schaltfläche hat keine zugängliche Beschriftung',
	BTN_EMPTY_LABELLEDBY: 'Schaltfläche hat ein ungültiges ARIA‑Label',
	BTN_ROLE_IN_NAME: 'Der Name der Schaltfläche wiederholt das Wort „button“',
	CONTRAST_ERROR: 'Der Text hat nicht genügend Kontrast, um gut lesbar zu sein',
	CONTRAST_ERROR_GRAPHIC: 'Grafik oder Symbol hat nicht genügend Kontrast',
	CONTRAST_INPUT: 'Eingabefeld hat nicht genügend Kontrast, um gut lesbar zu sein',
	CONTRAST_PLACEHOLDER: 'Platzhaltertext hat nicht genügend Kontrast, um gut lesbar zu sein',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Hat dieser Platzhaltertext genügend Kontrast?',
	CONTRAST_WARNING: 'Hat dieser Text genügend Kontrast?',
	CONTRAST_WARNING_GRAPHIC: 'Hat diese Grafik oder dieses Symbol genügend Kontrast?',
	DUPLICATE_ID: 'Doppeltes ID‑Attribut',
	DUPLICATE_TITLE: 'Dieser Link hat einen Tooltip mit dem gleichen Text wie der Link',
	EMBED_AUDIO: 'Hat dieses Audio eine Transkription?',
	EMBED_DATA_VIZ: 'Ist diese Visualisierung barrierefrei?',
	EMBED_GENERAL: 'Eingebettete iframes erfordern manuelle Prüfungen',
	EMBED_MISSING_TITLE: 'Frame ohne „title“‑Attribut',
	EMBED_UNFOCUSABLE: 'Frame mit tabindex="‑1" ist nicht per Tastatur erreichbar.',
	EMBED_VIDEO: 'Ist dieses Video korrekt untertitelt?',
	HEADING_EMPTY: 'Diese Überschrift hat keinen Text',
	HEADING_EMPTY_WITH_IMAGE: 'Dieses Bild wird als Überschrift verwendet und benötigt deshalb Alt‑Text',
	HEADING_FIRST: 'Die erste Überschrift auf dieser Seite ist eine Unterüberschrift',
	HEADING_LONG: 'Kann diese Überschrift kürzer sein?',
	HEADING_MISSING_ONE: 'Diese Seite hat keine Überschrift der Ebene 1',
	HEADING_SKIPPED_LEVEL: 'Diese Überschrift ist auf der falschen Ebene ausgezeichnet',
	HIDDEN_FOCUSABLE: 'Dieses Element kann von Screenreadern nicht beschrieben werden',
	IMAGE_ALT_TOO_LONG: 'Kann dieser Alt‑Text kürzer sein?',
	IMAGE_DECORATIVE: 'Ist dieses Bild wirklich bedeutungslos?',
	IMAGE_DECORATIVE_CAROUSEL: 'Bild in einem Karussell oder einer Galerie als dekorativ markiert',
	IMAGE_FIGURE_DECORATIVE: 'Manuelle Prüfung: Bild mit Bildunterschrift ohne Alt‑Text',
	IMAGE_FIGURE_DUPLICATE_ALT: 'Alt‑Text sollte nicht identisch mit der Bildunterschrift sein',
	LABELS_ARIA_LABEL_INPUT: 'Gibt es eine sichtbare Beschriftung für dieses Feld?',
	LABELS_PLACEHOLDER: 'Sichtbare Beschriftungen bevorzugen statt Platzhalter',
	LABELS_INPUT_RESET: 'Wird diese „Zurücksetzen“‑Schaltfläche benötigt?',
	LABEL_IN_NAME: 'Sichtbare Beschriftung stimmt nicht mit der unsichtbaren überein',
	LABELS_MISSING_IMAGE_INPUT: 'Dieses Bild-Eingabefeld hat keinen Alt-Text',
	LABELS_MISSING_LABEL: 'Dieses Eingabefeld hat eine leere Beschriftung',
	LABELS_NO_FOR_ATTRIBUTE: 'Dieses Eingabefeld ist nicht mit einer Beschriftung verbunden',
	LANG_MISMATCH: 'Sprach-Tag stimmt nicht mit dem Inhalt überein',
	LANG_OF_PARTS: 'Dieser Inhalt scheint in einer anderen Sprache zu sein',
	LANG_OF_PARTS_ALT: 'Dieser Alt-Text scheint in einer anderen Sprache zu sein',
	LINK_ALT_FILE_EXT: 'Als Link verwendeter Alt‑Text sollte keine URL sein',
	LINK_ALT_MAYBE_BAD: 'Dieser verlinkte Alt‑Text ist möglicherweise nicht klar und prägnant',
	LINK_ALT_MAYBE_BAD_WARNING: 'Dieser verlinkte Alt‑Text ist möglicherweise nicht klar und prägnant',
	LINK_ALT_UNPRONOUNCEABLE: 'Verlinkte Bilder benötigen aussprechbaren Alt‑Text',
	LINK_CLICK_HERE: 'Manuelle Prüfung: Link enthält „Hier klicken“',
	LINK_DOI: 'Artikel sollten über ihren Titel verlinkt werden, nicht über DOI‑Nummern',
	LINK_EMPTY: 'Dieser Link enthält keine Wörter.',
	LINK_EMPTY_LABELLEDBY: 'Link mit ungültigem „aria‑labelledby“‑Attribut',
	LINK_EMPTY_NO_LABEL: 'Dieser Link benötigt eine Beschriftung',
	LINK_UNPRONOUNCEABLE: 'Dieser Link ist nicht aussprechbar',
	LINK_FILE_EXT: 'Link führt zu einer Datei ohne vorherigen Hinweis',
	LINK_IDENTICAL_NAME: 'Mehrere Links mit demselben Text führen zu verschiedenen Seiten',
	LINK_IMAGE_ALT: 'Manuelle Prüfung: verlinktes Bild mit Alt‑Text',
	LINK_IMAGE_ALT_AND_TEXT: 'Ergibt dieser Alt‑Text im Kontext dieses Links Sinn?',
	LINK_IMAGE_LONG_ALT: 'Kann dieser verlinkte Alt‑Text kürzer sein?',
	LINK_IMAGE_NO_ALT_TEXT: 'Dieses verlinkte Bild benötigt Alt‑Text',
	LINK_IMAGE_TEXT: 'Manuelle Prüfung: Bild in einem Link als dekorativ markiert.',
	LINK_LABEL: 'Linkbeschriftung',
	LINK_MAYBE_BUTTON: 'Ist dieser Link tatsächlich eine Schaltfläche?',
	LINK_NEW_TAB: 'Öffnet dieser Link eine neue Registerkarte ohne Hinweis?',
	LINK_PLACEHOLDER_ALT: 'Dieser verlinkte Alt‑Text ist möglicherweise ein Platzhalter',
	LINK_STOPWORD: 'Dieser Link enthält nur generische Wörter',
	LINK_STOPWORD_ARIA: 'Der Zweck dieses Links ist visuell verborgen',
	LINK_SUS_ALT: 'Beschreibt dieser Alt‑Text das Bild oder den Link?',
	LINK_SYMBOLS: 'Manuelle Prüfung: Sind die Symbole oder Emojis in diesem Link sinnvoll?',
	LINK_URL: 'Linktext sollte keine URL sein',
	META_LANG: 'Meta‑Tag für die Seitensprache fehlt',
	META_LANG_SUGGEST: 'Meinten Sie einen anderen Sprachcode?',
	META_LANG_VALID: 'Ungültiger Sprachcode',
	META_MAX: 'Meta‑Tag begrenzt die mögliche Textvergrößerung',
	META_REFRESH: 'Meta‑Tag aktualisiert die Seite automatisch',
	META_SCALABLE: 'Meta‑Tag verhindert die Vergrößerung von Text',
	META_TITLE: 'Meta‑Tag für den Seitentitel fehlt',
	MISSING_ALT: 'Ungültiges HTML: Bild ohne Alt‑Attribut',
	MISSING_ALT_LINK: 'Ungültiges HTML: verlinktes Bild ohne Alt‑Attribut',
	MISSING_ALT_LINK_HAS_TEXT: 'Ungültiges HTML: Bild im Link ohne Alt‑Attribut',
	PAGE_LANG_CONFIDENCE: 'Die Seitensprache stimmt möglicherweise nicht mit dem Inhalt überein',
	QA_BAD_LINK: 'Manuelle Prüfung: Linkziel könnte ungültig sein',
	QA_BLOCKQUOTE: 'Sollte dieses Zitat eine Überschrift sein?',
	QA_DOCUMENT: 'Wurde dieses Dokument für Screenreader ausgezeichnet?',
	QA_FAKE_HEADING: 'Sollte dieser fett gesetzte Text eine Überschrift sein?',
	QA_FAKE_LIST: 'Sollte das als Liste formatiert sein?',
	QA_IN_PAGE_LINK: 'Defekter Link innerhalb derselben Seite',
	QA_JUSTIFY: 'Text nicht im Blocksatz ausrichten',
	QA_NESTED_COMPONENTS: 'Verschachtelte interaktive Layout‑Komponenten',
	QA_PDF: 'Gibt es eine Alternative zu diesem PDF?',
	QA_SMALL_TEXT: 'Text ist zu klein',
	QA_STRONG_ITALICS: 'Große Textblöcke mit Hervorhebung sind schwerer zu lesen',
	QA_SUBSCRIPT: 'Hoch‑/Tiefstellung nicht als reine visuelle Formatierung verwenden',
	QA_UNDERLINE: 'Nur Links sollten unterstrichen sein',
	QA_UPPERCASE: 'Ist dieser GROSSBUCHSTABENTEXT notwendig?',
	SUS_ALT: 'Enthält dieser Alt‑Text redundante Wörter?',
	TABINDEX_ATTR: 'Tabindex‑Überschreibungen stören die Fokusreihenfolge',
	TABLES_EMPTY_HEADING: 'Diese Tabellenkopfzelle benötigt Text',
	TABLES_INVALID_HEADERS_REF: 'Diese Tabelle hat ein ungültiges headers-Attribut',
	TABLES_MISSING_HEADINGS: 'Dieser Tabelle fehlen Kopfzeilen in Zeile und/oder Spalte',
	TABLES_SEMANTIC_HEADING: 'Inhaltsüberschriften gehören nicht in Tabellen',
	UNCONTAINED_LI: 'Ungültige HTML‑Liste',
};

const why = {
	fix: `<strong class="badge">So beheben</strong>`,

	buttons: `<div class="why"><p>Hinweis: Der zugängliche Name einer Schaltfläche muss klar sagen, was sie beim Klicken tut. Wenn sich das ändert, sollte der aktuelle Zustand klar erkennbar sein:</p><ul>
<li>Schaltflächen, die Beschriftungen aktualisieren:<br>„Wiedergabe/Pause“, „Details anzeigen/Details ausblenden“</li>
<li>Schaltflächen, die <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">den Zustand aktualisieren</a>:<br>„Wiedergabe/Wiedergabe, gedrückt“, „Details, eingeklappt/Details, ausgeklappt“.</li>
</ul></div>`,

	headings: `<div class="why"><p>Tipp: Überschriften und Unterüberschriften ordnen Inhalte in eine verschachtelte Struktur. Screenreader‑Nutzende verlassen sich darauf, um Seiten zu verstehen und zu navigieren:</p>
<ul><li>Überschrift Ebene 1: Seitentitel
<ul><li>Überschrift Ebene 2: Hauptthemen
<ul><li>Überschrift Ebene 3: Unterthemen</li></ul></li></ul></li></ul></div>`,

	images: `<div class="why"><p>Tipp: Beschreiben Sie beim Schreiben von Alt‑Text, was ein Bild <em>bedeutet</em>, nicht nur, was darauf zu sehen ist. Je nach Kontext kann ein Foto eines Kindes, das einen Ball tritt, bedeuten:</p>
<ul><li>Sie spielten im strömenden Regen.</li>
<li>Die neuen Trikots haben coole Drachen‑Logos.</li>
<li>Sie schoss das spielentscheidende Tor von der linken Seitenlinie!</li></ul></div>`,

	links: `<div class="why"><p>Nutzende überfliegen Seiten oft über die Links und nutzen die Seitensuche, um Links beim Namen zu finden. Effektive Links sind daher aussagekräftig, eindeutig und prägnant:</p><ul><li>Ideal: "Mehr erfahren über <a href="https://webaim.org/techniques/hypertext/link_text">aussagekräftige Links</a>"</li><li>Nicht eindeutig: "Klicken Sie <a href="https://webaim.org/techniques/hypertext/link_text">hier</a>, um mehr über aussagekräftige Links zu erfahren."</li><li>Nicht prägnant: "<a href="https://webaim.org/techniques/hypertext/link_text">Klicken Sie hier, um mehr über aussagekräftige Links zu lernen</a>"</li></ul></div>`,

	imageLinks: `<div class="why"><p>Der Zweck von Alt‑Text ist, die <em>Bedeutung</em> eines Bildes zu vermitteln, nicht nur dessen Inhalt. Bei einem verlinkten Bild ist die Bedeutung das Linkziel:</p><ul><li>"<em>Eine Lupe</em>" beschreibt ein Bild, nicht einen Link.</li><li>"<em>Eine Such‑Lupe</em>" beschreibt verwirrend beide Dinge.</li><li>"<em>Suchen</em>" beschreibt das Linkziel korrekt.</li></ul></div>`,
};

const tips = {
	ARIA_INPUT_FIELD_NAME: `<p><strong>Element:</strong> <code>%(EL)</code></p><p>${why.fix}Geben Sie eine gültige Beschriftung an; bei benutzerdefinierten Eingabeelementen bedeutet das oft innenliegenden Text oder ein title-, aria-label- oder aria-labelledby-Attribut.</p>`,

	ALT_FILE_EXT: `<p><span style="display: none">%(alt)</span><strong>Alt‑Text:</strong> <i>%(ALT_TEXT)</i></p><p>Screenreader versuchen, diese URL auszusprechen – oft Buchstabe für Buchstabe. Das vermittelt kaum die gleiche Bedeutung wie das Bild selbst.</p><p>${why.fix}Beschreiben Sie kurz, was dieses Bild in diesem Kontext bedeutet.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p><strong>Alt‑Text:</strong> <i>%(alt)</i></p><p>${why.fix}Beschreiben Sie kurz, was dieses Bild in diesem Kontext bedeutet.</p>${why.images}`,

	ALT_MAYBE_BAD_WARNING: `<p><strong>Alt‑Text:</strong> <i>%(alt)</i></p><p>${why.fix}Beschreiben Sie kurz, was dieses Bild in diesem Kontext bedeutet.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p><strong>Alt‑Text:</strong> <i>%(alt)</i></p><p>${why.fix}Beschreiben Sie kurz, was dieses Bild in diesem Kontext bedeutet.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p><strong>Alt‑Text:</strong> <i>%(alt)</i></p><p>Dieser Alt‑Text enthält nur unaussprechliche Zeichen oder Leerzeichen. Screenreader kündigen ein Bild an und halten dann peinlich inne: „Bild: ____".</p><p>${why.fix}Beschreiben Sie kurz, was dieses Bild in diesem Kontext bedeutet.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Verwenden Sie eine gültige Methode, um Screenreadern mitzuteilen, was diese Schaltfläche tut – z. B. Text, Alt‑Text auf einem Icon oder ein <code>title</code>‑Attribut.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Diese Schaltfläche verwendet ein <code>aria-labelledby</code>, das leer ist oder keinem vorhandenen <code>ID</code> auf der Seite entspricht.</p><p>${why.fix}Stellen Sie die Verbindung zu einem Element mit passender ID her oder entfernen Sie das Attribut und beschreiben Sie die Schaltfläche anders.</p>`,

	BTN_TIP: `${why.buttons}`,

	BTN_ROLE_IN_NAME: `<p><strong>Label für Screenreader:</strong> <i>%(TEXT)</i></p><p>Screenreader verwenden das Wort „button", um anzukündigen, dass sie eine Schaltfläche beschreiben; dieses Wort ist daher doppelt gemoppelt.</p><p>${why.fix}Die Beschriftung der Schaltfläche sollte ihrer Aktion entsprechen. Wenn die sichtbare Beschriftung ein Symbol statt Text ist, beschriften Sie die Schaltfläche mit der Bedeutung des Symbols, z. B. „Wiedergabe", „Suchen" oder „Menü".</p>`,

	CONTRAST_WARNING: 'Ein Hintergrundbild oder Farbverlauf verhindert, dass dieses Tool die tatsächliche Hintergrundfarbe sicher bestimmen kann. Nutzen Sie den Farbwähler unten für eine manuelle Prüfung.',

	DUPLICATE_ID: `<p>IDs werden auf dieser Seite für Beschriftungen oder Linkziele verwendet und müssen daher eindeutig sein.</p><p>${why.fix}Ändern Sie diese ID: <code>#%(ID)</code></p><div class="why"><p>In vielen CMS stammt sie aus einem Feld „name" oder „id". In HTML ist sie ein Attribut: <code>&lt;a id="MY-ID"&gt;</code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Löschen Sie den Linktext oder das <code>title</code>‑Attribut.</p><div class="why"><p>Hinweis: <code>title</code>‑Tooltips erscheinen nur beim Maus‑Hover. Auf Mobilgeräten oder per Tastatur sind sie nicht sichtbar und sollten daher keine wichtigen Informationen enthalten.</p></div>`,

	EMBED_AUDIO: `<p>Dieses Prüfwerkzeug kann nicht feststellen, ob ein Audioplayer eine Transkription hat, oder ob die Transkription korrekt ist.</p><p>${why.fix}Stellen Sie sicher, dass eine <a href="https://www.w3.org/WAI/media/av/transcribing/">Transkription oder Textalternative</a> verfügbar ist, und dass Sprecher und bedeutsame Geräusche korrekt gekennzeichnet sind.</p>`,

	EMBED_DATA_VIZ: `<p>Eingebettete Visualisierungen sind häufig schwer oder gar nicht mit Hilfstechnologien bedienbar, können für Menschen mit Sehbeeinträchtigung schwer verständlich sein und erfordern auf Mobilgeräten oft horizontales Scrollen.</p><p>${why.fix}Wenn diese Einbettung keinen hohen Kontrast hat, nicht per Tastatur bedienbar <strong><em>und</em></strong> nicht sinnvoll von Screenreadern beschrieben werden kann, fügen Sie eine gleichwertige Alternative hinzu (Textbeschreibung, Datentabelle, Download) und schließen Sie dann diesen Hinweis.</p>`,

	EMBED_GENERAL: 'Automatisierte Prüfungen können Inhalte innerhalb von Einbettungen nicht analysieren. Stellen Sie sicher, dass alle Bilder Alt‑Text haben, Videos Untertitel besitzen, Text ausreichenden Kontrast hat und Links/Buttons <a href="https://webaim.org/techniques/keyboard/">tastaturbedienbar</a> sind – und schließen Sie dann den Hinweis.',

	EMBED_MISSING_TITLE: `<p>Eingebettete Inhalte benötigen einen zugänglichen Namen, der ihr Inhalt/Zweck für Screenreader beschreibt.</p><p>${why.fix}Fügen Sie ein eindeutiges <code>title</code>‑ oder <code>aria-label</code>‑Attribut hinzu.</p>`,

	EMBED_UNFOCUSABLE: `<p>Dieses Attribut weist Tastatur und Hilfstechnologien an, das Element zu überspringen. Entfernen Sie dieses Attribut, es sei denn, das iFrame enthält keine Links, Schaltflächen, Formularelemente oder scrollbaren Inhalte.</p>`,

	EMBED_VIDEO: `<p>Dieses Prüfwerkzeug kann nicht „sehen", ob Videos Untertitel haben, oder ob jemand sie Korrektur gelesen hat – eine manuelle Prüfung ist erforderlich.</p><p>${why.fix}Stellen Sie sicher, dass <a href="https://www.w3.org/WAI/media/av/captions/">korrekte Untertitel („CC") oder Untertitel</a> verfügbar sind, und dass Sprecher und bedeutsame Geräusche korrekt gekennzeichnet sind.</p>`,

	HEADING_EMPTY: `<p>Leere Überschriften erzeugen Lücken in der Seitenstruktur.</p><p>${why.fix}Text hinzufügen oder die leere Zeile entfernen.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Leere Überschriften erzeugen Lücken in der Seitenstruktur.</p><p>${why.fix}Wenn dies keine Überschrift ist, ändern Sie das Format von <code>Überschrift %(level)</code> zu <code>Absatz</code>. Andernfalls gehört die Bildbedeutung in den Alt‑Text.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Stellen Sie sicher, dass der Seitentitel als Überschrift der Ebene 1 oder 2 ausgezeichnet ist. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}Wenn es kein feststehender Titel (z. B. Artikelname) ist, kürzen Sie ihn für besseres Überfliegen:<span hidden>%(drop)%(drop)</span></p><p><i>%(TEXT)</i></p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Versehen Sie den Seitentitel mit Ebene‑1‑Überschrift, um den Beginn der Dokumentstruktur zu markieren.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Diese Überschrift springt von <code>Ebene %(prevLevel)</code> zu <code>Ebene %(level)</code>. Für Screenreader klingt das, als fehle Inhalt.</p><p>${why.fix}Passen Sie die Ebenen an, damit die Struktur lückenlos ist.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: `<p>Dieses interaktive Element hat <code>aria-hidden="true"</code>, ist aber weiterhin per Tastatur erreichbar. Wenn es wirklich verborgen sein soll, fügen Sie zusätzlich <code>tabindex="-1"</code> hinzu. Andernfalls entfernen Sie <code>aria-hidden</code>.</p><p><strong>Element:</strong> <code>%(ELEMENT)</code></p>`,

	IMAGE_ALT_TOO_LONG: `<p>Dieser Alt‑Text ist %(altLength) Zeichen lang: <i class="ed11y-small">%(ALT_TEXT)</i></p><p>${why.fix}Fassen Sie zusammen oder verschieben Sie Teile der Beschreibung in eine Bildunterschrift.</p><div class="why"><p>Tipp: Komplexe Bilder brauchen meist eine <strong>sichtbare</strong> Bildunterschrift oder eine alternative Beschreibung, die wichtige Details erläutert. Es ist in Ordnung, im Alt‑Text darauf zu verweisen:</p><ul><li>„Poster für den Tanz am Freitag; Details in der Bildunterschrift.“</li><li>„Diagramm: Fälle −10 % dieses Jahr; Details in der Tabelle.“</li></ul></div>`,

	IMAGE_DECORATIVE: `<p>Dieses Bild wurde mit leerem Alt‑Text für Screenreader ausgeblendet. Nur bedeutungslose Bilder (redundante Icons, Texturen) sollten so ausgeblendet werden.</p><p>${why.fix}Wenn das Bild inhaltlichen Wert hat, geben Sie Alt‑Text an.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'Das Bild ist als <strong>dekorativ</strong> markiert, aber in Karussells/Galerien sollten alle Bilder beschreibenden Alt‑Text haben.',

	IMAGE_FIGURE_DECORATIVE: `<p>Dieses Bild wird von Hilfstechnologien ignoriert. Ergibt die Bildunterschrift ohne das Bild Sinn?</p><p>${why.fix}Wenn nicht, ergänzen Sie im Alt‑Text, was die Bildunterschrift nicht abdeckt.</p><div class="why"><p>Tipp: Bilder, Alt‑Texte und Bildunterschriften wirken zusammen:</p><ul><li>Bildunterschriften geben Kontext/Deutung.</li><li>Alt‑Texte beschreiben das Bild für Menschen, die es nicht sehen.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p><strong>Doppelter Text: </strong><i>%(ALT_TEXT)</i></p><p>${why.fix}Beschreiben Sie im Alt‑Text die visuelle Bedeutung, die sonst fehlen würde.</p><div class="why"><p>Tipp: Bilder, Alt‑Texte und Bildunterschriften wirken zusammen:</p><ul><li>Bildunterschriften liefern Kontext und Interpretation.</li><li>Alt‑Texte beschreiben das Bild für Menschen, die es nicht sehen.</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: `<p><strong>Unsichtbare Feldbezeichnung:</strong> <i>%(TEXT)</i></p><p>Stellen Sie sicher, dass es eine sichtbare Beschriftung gibt, dass sie beim Eintippen sichtbar bleibt und der unsichtbaren Bezeichnung entspricht.</p><div class="why"><p>Platzhalter oder Titel verschwinden beim Tippen; das erschwert die Kontrolle und macht es leicht, die unsichtbare Bezeichnung zu vergessen.</p></div>`,

	LABELS_INPUT_RESET: `<p>„Zurücksetzen“‑Buttons werden leicht versehentlich ausgelöst und führen zu Datenverlust.</p><p>${why.fix}Wenn nicht nur ein einzelnes Feld zurückgesetzt wird, entfernen Sie den Button oder fordern Sie eine Bestätigung an.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'Bild‑Buttons benötigen Alt‑Text. Fügen Sie z. B. <em>Suchen</em> oder <em>Senden</em> hinzu.',

	LABELS_MISSING_LABEL: `<p>${why.fix}Fügen Sie eine <code>id</code> zu diesem Feld hinzu und setzen Sie im Label ein entsprechendes <code>for</code>‑Attribut.</p>`,

	LABELS_NO_FOR_ATTRIBUTE: 'Dieses Feld hat keine zugeordnete Beschriftung. Fügen Sie dem Label ein <code>for</code> hinzu, das dem <code>id</code> des Feldes entspricht. <hr> <strong>ID:</strong> <code>#%(ID)</code>',

	LABELS_PLACEHOLDER: `<p>Platzhaltertext kann bei gutem Kontrast mit zuvor eingegebenem Inhalt verwechselt werden oder bei schlechtem Kontrast unleserlich sein. Er verschwindet zudem beim Tippen, was Informationen entfernen kann, die Nutzende zur Fehlerkontrolle benötigen.</p><p>${why.fix}Sorgen Sie dafür, dass wichtige Informationen (Label, Hilfe, Format) sichtbar bleiben und erwägen Sie, auf Platzhalter zu verzichten.</p>`,

	LABEL_IN_NAME: `<p><strong>Sichtbarer Text:</strong> <i>%(VISIBLE)</i></p><p><strong>Label für Screenreader:</strong> <i>%(LABEL)</i></p><p>Der sichtbare Text dieses Elements scheint vom zugänglichen Namen abzuweichen. Das kann Screenreader‑Nutzende verwirren und die Sprachsteuerung beeinträchtigen.</p><p>${why.fix}Stellen Sie sicher, dass das sichtbare Label mit dem Text des unsichtbaren Labels beginnt und keine bedeutungstragenden Informationen enthält, die im unsichtbaren Label fehlen.</p>`,

	LINK_ALT_FILE_EXT: `<p>Dieser Alt‑Text ist wahrscheinlich ein Dateiname statt einer sinnvollen Bezeichnung für das Linkziel:<br><span style="display: none;">%(ALT)</span><i>%(alt)</i></p><p>${why.fix}Verwenden Sie den Titel des Linkziels als Alt‑Text für verlinkte Bilder.</p><div class="why"><p>Alt‑Text soll die Bedeutung eines Bildes wiedergeben, nicht nur dessen Inhalt. Bei verlinkten Bildern ist die Bedeutung das Linkziel:</p><ul><li>„Seite mit Text" beschreibt das Bild, nicht den Link.</li><li>„IMG_1234.jpg" ist nur ein Dateiname.</li><li>„Anmeldeformular (doc)" ist eine Linkdestination.</li></ul></div>`,

	LINK_ALT_MAYBE_BAD: `<p><strong>Alt‑Text:</strong> <i>%(alt)</i></p><p>${why.fix}Verwenden Sie den Titel des Linkziels als Alt‑Text für verlinkte Bilder.</p>${why.imageLinks}`,

	LINK_ALT_MAYBE_BAD_WARNING: `<p><strong>Alt‑Text:</strong> <i>%(alt)</i></p><p>${why.fix}Verwenden Sie den Titel des Linkziels als Alt‑Text für verlinkte Bilder.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>Der Alt‑Text dieses verlinkten Bildes besteht nur aus unaussprechlichen Symbolen/Leerzeichen: <i>%(ALT_TEXT)</i></p><p>Screenreader kündigen einen Link an, können ihn dann aber nicht beschreiben.</p><p>${why.fix}Verwenden Sie den Titel des Linkziels als Alt‑Text für verlinkte Bilder.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `<p><strong>Linktext:</strong> <i>%(TEXT)</i></p><p>${why.fix}Entfernen Sie überflüssige Wörter, die vom Zweck des Links ablenken.</p>${why.links}`,

	LINK_DOI: `<p><strong>Linktext:</strong> <i>%(TEXT)</i></p><p>${why.fix}Verlinken Sie den Artikeltitel und geben Sie die DOI‑Nummer im Klartext an, nicht umgekehrt.</p><div class="why"><p>Die APA‑Richtlinie empfiehlt beschreibende Links, weil Nutzende Links nach Name scannen. So werden relevante Artikel eher gefunden.</p><p>Screenreader können so sinnvolle Links ansagen statt Zahlenreihen.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Fügen Sie Text hinzu, der das Ziel beschreibt, oder löschen Sie es, wenn es sich nur um einen Tippfehler oder ein verlinktes Leerzeichen handelt.</p><div class="why"><p>Tipp: Bildschirmleser können Links, die nur Leerzeichen oder Symbole enthalten, nicht beschreiben. Sie werden entweder stumm ("Link, [...unangenehme Pause, wo der Linktitel sein sollte...]"), oder lesen die URL vor: "Link, H-T-T-P-S Schrägstrich Schrägstrich Beispiel Punkt com."</p><p>Beachten Sie, dass verlinkte Leerzeichen in einigen Editoren schwer zu löschen sein können; manchmal ist es notwendig, "über die Lücke hinweg" zu löschen, indem Sie die Wörter auf beiden Seiten des verlinkten Leerzeichens entfernen und neu eingeben.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>Dieses <code>aria-labelledby</code> verweist auf kein vorhandenes <code>ID</code>.</p><p>${why.fix}Hinterlegen Sie eine gültige ID oder entfernen Sie das Attribut.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Fügen Sie Text hinzu, der das Ziel beschreibt, oder löschen Sie den versehentlichen Link.</p><div class="why"><p>Leere Links können nicht sinnvoll angekündigt werden.</p><p>Oft hilft es, das umgebende Textfragment neu zu schreiben.</p></div>`,
	LINK_UNPRONOUNCEABLE: `<p><strong>Linktext:</strong> <i>%(TEXT)</i></p><p>${why.fix}Fügen Sie Text oder einen Titel hinzu, der das Ziel beschreibt, oder löschen Sie ihn, wenn es sich nur um einen Tippfehler oder ein verlinktes Leerzeichen handelt.</p><div class="why"><p>Tipp: Bildschirmleser können Links, die nur Leerzeichen oder Symbole enthalten, nicht beschreiben. Sie werden entweder stumm ("Link, [...unangenehme Pause, wo der Linktitel sein sollte...]"), oder lesen den Namen des Symbols vor.</p></div>`,

	LINK_FILE_EXT: `<p><strong>Linktext:</strong> <i>%(TEXT)</i></p><p>Dieser Link führt zu einer Datei (z. B. PDF, MP3, Zip, Word), ohne das anzuzeigen.</p><p>${why.fix}Geben Sie im Linktext den Dateityp an – z. B. per Text oder Icon (<a href="https://itmaybejj.github.io/linkpurpose/">Beispiele</a>).</p><p class="why">Bei großen Dateien nennen Sie die Größe, z. B. „Jahresbericht (PDF, 3 MB)“.</p>`,

	LINK_IDENTICAL_NAME: `<p>Linktext: <i>%(TEXT)</i></p><p>${why.fix}Formulieren Sie Links zu unterschiedlichen Zielen um, sodass sie die eindeutigen Titel ihrer Ziele verwenden.</p>${why.links}`,

	LINK_IMAGE_ALT: `<p><strong>Alt‑Text:</strong> <i>%(ALT_TEXT)</i></p><p>${why.fix}Verwenden Sie den Titel des Linkziels als Alt‑Text für verlinkte Bilder.</p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p><strong>Alt‑Text:</strong> <i>%(ALT_TEXT)</i></p><p><strong>Linktext einschließlich Alt‑Text:</strong> <i>%(TEXT)</i></p><p>${why.fix}Bearbeiten oder entfernen Sie den Alt‑Text, wenn er irrelevante oder redundante Informationen hinzufügt.</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p>Dieser Alt‑Text ist %(altLength) Zeichen lang: <i class="ed11y-small">%(ALT_TEXT)</i></p><p>${why.fix}Verwenden Sie den Titel des Linkziels als Alt‑Text für verlinkte Bilder.</p><div class="why"><p>Screenreader‑Nutzende hören oft eine Liste von Links ohne Kontext. Der Alt‑Text eines verlinkten Bildes wird in dieser Liste als Linktitel vorgelesen; daher sollte er das Ziel beschreiben, nicht den Bildinhalt.</p></div>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Wenn ein Link ein Bild umschließt, liefert dessen Alt‑Text den Linktitel für Screenreader.</p><p>${why.fix}Verwenden Sie den Titel des Linkziels als Alt‑Text für verlinkte Bilder.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'Das Bild ist als dekorativ markiert, obwohl der umgebende Text als Linkbeschriftung dient.',

	LINK_MAYBE_BUTTON: `<p><strong>Link:</strong> <i>%(TEXT)</i></p><p>Dieser Link hat ein ungültiges Ziel und trägt einen Namen, der darauf hindeutet, dass er möglicherweise als Schaltfläche oder Umschalter statt als Link fungiert.</p><p>${why.fix}Verwenden Sie stattdessen ein <a href="https://www.w3.org/WAI/ARIA/apg/patterns/button/">&lt;button&gt;</a>, oder korrigieren Sie das Linkziel.</p><div class="why"><p>Tipp: Hilfstechnologien behandeln Schaltflächen und Links unterschiedlich. Das richtige HTML‑Element stellt sicher, dass Nutzende wissen, welche Tastenkombinationen sie verwenden und welche Aktion ausgelöst wird.</p></div>`,

	LINK_NEW_TAB: `<p><strong>Linktext:</strong> <i>%(TEXT)</i></p><p>${why.fix}Öffnen Sie den Link im selben Tab oder <a href="https://itmaybejj.github.io/linkpurpose/">warnen Sie vorab</a>.</p><div class="why"><p>Nutzende können selbst in neuem Tab öffnen; erzwungene neue Tabs können verwirren, besonders wenn die Zurück‑Taste nicht wie erwartet funktioniert.</p><p>Ausnahme: In Formularen öffnen Links oft in neuem Tab, um Datenverlust zu vermeiden.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p><strong>Alt‑Text:</strong> <i>%(alt)</i>.</p><p>${why.fix}Verwenden Sie den Titel des Linkziels als Alt‑Text für verlinkte Bilder.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Dieser Link enthält nur generische Wörter:<br><i>%(ERROR)</i></p><p>${why.fix}Formulieren Sie ihn so um, dass er sein Ziel beschreibt.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>Über ARIA wurde ein abweichender Name angegeben:</p><p><strong>Sichtbarer Text:</strong> <i>%(VISIBLE)</i></p><p><strong>Verborgener Text:</strong> <i>%(HIDDEN)</i></p><p>${why.fix}Schreiben Sie aussagekräftige Links für alle, nicht nur für Screenreader‑Nutzende, und stellen Sie sicher, dass das <a href="https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html">sichtbare Label jedes Elements mit seinem Namen übereinstimmt</a>, damit Sprachsteuerungs‑Nutzende ihrem Browser sagen können, welchen Link sie anklicken möchten.</p>${why.links}`,

	LINK_SUS_ALT: `<p>Sofern „<i>%(alt)</i>" nicht das Linkziel beschreibt, beschreibt dieser Alt‑Text wahrscheinlich das Bild.</p><p><strong>Alt‑Text:</strong> <i>%(ALT_TEXT)</i></p><p>${why.fix}Verwenden Sie den Titel des Linkziels als Alt‑Text für verlinkte Bilder.</p>${why.imageLinks}`,

	LINK_SYMBOLS: `<p>Symbol gefunden: <i>%(ERROR)</i></p><p>${why.fix}Vermeiden Sie Symbole als Call‑to‑Action im Linktext, sofern sie nicht für Hilfstechnologien verborgen sind. Screenreader lesen Symbole möglicherweise vor, was verwirrend sein kann.</p>`,

	LINK_URL: `<p><strong>Linktext:</strong> <i>%(TEXT)</i></p><p>${why.fix}Ersetzen Sie die URL durch den Titel des Ziels oder dessen Zweck.</p><div class="why"><p>Nutzende suchen Links nach Namen – besonders Screenreader‑Nutzende.</p><p>URLs als Linktext sind schwer zu scannen oder per Seitensuche zu finden.</p></div>`,

	META_LANG: `<p>${why.fix}Fügen Sie ein <a href="https://www.w3.org/International/questions/qa-html-language-declarations">Sprachattribut</a> am HTML‑Tag der Seite hinzu.</p><div class="why"><p>Tipp: Screenreader wählen die Aussprache nach Sprache. Falsche Sprache liefert unverständliche Ansagen.</p></div>`,

	META_LANG_VALID: `<p><strong>Element:</strong> <code>&lt;%(ELEMENT) lang="%(CODE)"&gt;</code></p><p>${why.fix}Ersetzen Sie das lang‑Attribut durch einen gültigen Sprachcode.</p><div class="why"><p>Tipp: Seiten und Elemente haben <a href="https://www.w3.org/International/questions/qa-html-language-declarations">Sprachattribute</a>, damit Screenreader und Übersetzungstools den Text korrekt lesen.</p></div>`,

	META_MAX: `<p>Dieses Meta‑Tag begrenzt die Textvergrößerung.</p><p>${why.fix}Entfernen oder passen Sie die Begrenzung an, damit volles Zoomen möglich ist.</p>`,

	META_REFRESH: `<p>Seiten sollten nicht per Meta‑Tag automatisch aktualisiert werden. Das unterbricht Nutzende ohne Vorwarnung und kann Formulare zurücksetzen.</p><p>${why.fix}Verwenden Sie AJAX/JS und informieren Sie Nutzende, damit sie die Aktualisierung verzögern können.</p>`,

	META_SCALABLE: `<p>Dieses Meta‑Tag verhindert die Textvergrößerung.</p><p>${why.fix}Erlauben Sie komplettes Zoomen durch Entfernen oder Anpassen des Tags.</p>`,

	META_TITLE: `<p>${why.fix}Fügen Sie im <code>head</code> ein <code>&lt;title&gt;</code> hinzu.</p><div class="why"><p>Ein <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title">kurzer, eindeutiger Titel</a> ist wichtig:</p><ul><li>Suchmaschinen nutzen ihn für Ergebnisse.</li><li>Browser zeigen ihn auf Tabs.</li><li>Screenreader lesen ihn beim Tab‑Wechsel vor.</li></ul><p>Ohne Titel sehen/​hören Nutzende nur eine rohe URL.</p></div>`,

	MISSING_ALT: `<p>Wenn ein Bild kein Alt‑Attribut hat, versuchen Screenreader meist, die Bild‑URL Buchstabe für Buchstabe auszusprechen.</p><p>${why.fix}Beschreiben Sie kurz, was dieses Bild in diesem Kontext bedeutet.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Fehlt Alt am verlinkten Bild, versuchen Screenreader, die Bild‑URL auszusprechen – besonders problematisch.</p><p>${why.fix}Fügen Sie einen Alt‑Text hinzu, der die Linkdestination beschreibt.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Dieses Bild ist Teil eines Links mit Text. Wenn der sichtbare Text das Ziel beschreibt, setzen Sie alt="". Andernfalls fügen Sie einen Alt‑Text hinzu, der hilft, Ziel oder Zweck des Links zu beschreiben.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>Der Link scheint auf ein Entwicklungsumfeld zu verweisen:<br>{L} <code>%(LINK)</code></p><p>${why.fix}Verweisen Sie auf einen relativen Pfad (/folder) oder die öffentliche URL.</p>`,

	QA_BLOCKQUOTE: `<p><strong>Verdächtig kurzes Zitat:</strong> <i>%(TEXT)</i></p><p>${why.fix}Wenn es eine Überschrift und kein Zitat ist, markieren Sie es als Überschrift, damit es in der Seitenstruktur erscheint.</p>${why.headings}`,

	QA_DOCUMENT: `<p><strong>Link:</strong> <i>%(TEXT)</i></p><p>Verlinkte Dokumente gelten als Webinhalt und müssen ebenfalls barrierefrei sein. Prüfen Sie Überschriften, Tabellenköpfe und Alt‑Texte, und schließen Sie dann den Hinweis.</p><div class="why"><ul><li>Machen Sie Ihre <a href="https://support.google.com/docs/answer/6199477?hl=de">Google‑Dokumente/Präsentationen</a> barrierefrei.</li><li>Machen Sie Ihre <a href="https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office‑Dokumente</a> barrierefrei.</li></ul></div>`,

	QA_FAKE_HEADING: `<p><strong>Fett gesetzter Text:</strong> <i>%(TEXT)</i></p><p>${why.fix}Wenn dieser Text fett ist, um einen Themenwechsel zu markieren, markieren Sie ihn als Überschrift, damit Screenreader‑Nutzende damit auf der Seite navigieren können.</p><div class="why"><p>Tipp: Fett‑ und Kursivstile geben visuelle Hervorhebung, fügen aber nicht automatisch Text zum Inhaltsverzeichnis des Dokuments für Hilfstechnologien hinzu.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Wenn <i>%(TEXT)</i> Teil einer Liste ist, verwenden Sie Listenformatierung.</p><div class="why"><p>Listen haben visuelle und semantische Struktur:</p><ol><li>Einheitliche Einzüge erleichtern das Lesen.</li><li>Screenreader geben die Position an („Eintrag 3 von 7“).</li></ol><p>Ein Absatz mit einer vorangestellten Zahl ist keine echte Liste.</p></div>`,

	QA_IN_PAGE_LINK: `<p><strong>Link:</strong> <i>%(TEXT)</i></p><p><strong>URL:</strong> <code>#%(ID)</code></p><p>Das Linkziel entspricht keinem Element auf dieser Seite.</p><div class="why"><p>Hinweis für Entwickler: Wenn es ein JS‑Handler ist, testen Sie die Tastaturbedienung, bevor Sie den Check ignorieren.</p></div>`,

	QA_JUSTIFY: `<p>Blocksatz erzeugt unregelmäßige Lücken und erschwert das Lesen.</p><p>${why.fix}Verwenden Sie linksbündigen Text.</p>`,

	QA_NESTED_COMPONENTS: 'Vermeiden Sie verschachtelte interaktive Komponenten (z. B. Akkordeon in Akkordeon oder Tabs im Akkordeon). Das erschwert die Navigation und kann Inhalte übersehen lassen.',

	QA_PDF: `<p><strong>Link:</strong> <i>%(TEXT)</i></p><p>${why.fix}Tun Sie eines der Folgenden und schließen Sie den Hinweis:</p><ul><li>Linken Sie stattdessen auf eine Webseite,</li><li>oder bieten Sie zusätzlich eine Web‑/bearbeitbare Version an,</li><li>oder stellen Sie sicher, dass das PDF getaggt ist (Überschriften, Lesereihenfolge, Tabellenköpfe, Alt‑Texte).</li></ul><div class="why"><p>Viele Nutzende – besonders mobil – bevorzugen Webseiten gegenüber PDFs, die nicht umfließen und oft notwendige Tags fehlen.</p></div>`,

	QA_SMALL_TEXT: `<p><strong>Text:</strong> <i>%(TEXT)</i></p><p>${why.fix}Bleiben Sie über 80 % der Standard‑Schriftgröße. Kleiner Text ist schwer lesbar, besonders für Menschen mit Sehbeeinträchtigung.</p>`,

	QA_STRONG_ITALICS: `<p><strong>Text:</strong> <i>%(TEXT)</i></p><p>${why.fix}Setzen Sie fett/kursiv sparsam für Schlüsselwörter ein.</p><div class="why"><p>Hinweis: Für Zitate verwenden Sie <code>blockquote</code>.</p></div>`,

	QA_SUBSCRIPT: `<p><strong>Text:</strong> <i>%(TEXT)</i></p><p>Hoch‑/Tiefstellung macht Text klein und schwer lesbar. Nutzen Sie sie nur gezielt, z. B. 4<sup>te</sup>, H<sub>2</sub>O, Fußnotenzeichen.</p>`,

	QA_UNDERLINE: `<p>Unterstrichener Text im Web wird für Links verwendet, nicht zur Hervorhebung. Nutzende erwarten Klickbarkeit: <i><u>%(TEXT)</u></i></p><p>${why.fix}Nutzen Sie <strong>fett</strong> oder <em>kursiv</em> für Betonung und Überschriften für die Struktur.</p><div class="why"><p>Screenreader kündigen rein visuelle Formatierungen nicht an; Struktur geben nur Überschriften.</p></div>`,

	QA_UPPERCASE: `<p><strong>Text:</strong> <i>%(TEXT)</i></p><p>${why.fix}Schreiben Sie nur wenige Wörter zur Hervorhebung groß. GROSSGESCHRIEBENE TEXTBLÖCKE SIND SCHWERER LESBAR, UND VIELE LESENDE EMPFINDEN SIE ALS „SCHREIEN“.</p><div class="why"><p>Hinweis: Screenreader kündigen rein visuelle Formatierungen wie Großbuchstaben nicht an. Nutzen Sie stattdessen einen Überschriftenstil, wenn dieser hervorgehobene Text einen Themenwechsel oder besonders wichtige Inhalte einleitet.</p></div>`,

	SUS_ALT: `<p>Der Alt‑Text dieses Bildes enthält das Wort „<i>%(alt)</i>." Screenreader kündigen bereits an, dass sie ein Bild beschreiben, daher sind Formulierungen wie „Bild von" und „Foto von" meist überflüssig.</p><p><strong>Alt‑Text:</strong> <i>%(ALT_TEXT)</i></p><p>${why.fix}Beschreiben Sie kurz, was dieses Bild in diesem Kontext bedeutet.</p><div class="why"><p>Tipp: Diese Formulierungen sind es wert beibehalten zu werden, wenn das Format selbst bedeutsam ist:<br>„Ein Foto einer Katze, gerahmt und an der Wand hängend."</p></div>`,

	TABINDEX_ATTR: `<p>Tabindex‑Werte größer als 0 verschieben fokussierbare Elemente aus ihrer visuellen Reihenfolge heraus, was es Nutzenden von Hilfstechnologien erschwert, sie zu finden und zu bedienen.</p><p>${why.fix}Ordnen Sie stattdessen die HTML‑Elemente so um, dass Fokusreihenfolge und Lesereihenfolge übereinstimmen.</p><div class="why"><p>Tipp: Die visuelle Reihenfolge der Wörter auf der Seite und die Reihenfolge, in der Tastaturen die Elemente durchlaufen, sind in der Regel dieselbe.</p><p>Ein positives tabindex setzt ein Element an den Anfang der Tab‑Reihenfolge, <strong>aber nicht</strong> der visuellen oder Lesereihenfolge.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Sorgen Sie dafür, dass jede Tabellenkopfzelle Text enthält.</p><div class="why"><p>Tipp: Screenreader nutzen Tabellenköpfe zur Orientierung in Tabellen.</p></div>`,

	TABLES_INVALID_HEADERS_REF: `<p>Diese Tabelle versucht, eine bestimmte Datenzelle mit einer bestimmten Kopfzelle zu verknüpfen, aber die Header‑ID ist nicht auffindbar: <code>%(VALUE)</code>.</p><p>${why.fix}Stellen Sie sicher, dass jedes <code>headers</code>‑Attribut der ID einer Kopfzelle in derselben Tabelle entspricht.</p><div class="why">Tipp: <a href="https://www.w3.org/WAI/WCAG22/Techniques/html/H43">Die manuelle Verwendung von ID‑Referenzen</a>, um Datenzellen mit Kopfzellen zu verknüpfen, ist aufwendig und fehleranfällig. Teilen Sie nach Möglichkeit komplexe Daten in kleinere Tabellen mit einfachen Kopfzeilen und ‑spalten auf.</div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Geben Sie in den Tabelleneigenschaften an, ob Kopfzeilen in der ersten Zeile, ersten Spalte oder in beiden vorhanden sind.</p><div class="why"> <p>Tipp: Beim Betreten einer Spalte/Zeile wird der passende Kopf wiederholt. Wenn die Tabelle nur für Layoutzwecke dient, entfernen Sie die Tabellenformatierung.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Entfernen Sie die Überschriften‑Formatierung (h2, h3) aus der Tabelle. Verwenden Sie stattdessen Kopfzeilen. Wenn mehrere Ebenen nötig sind, teilen Sie die Daten auf mehrere Tabellen auf.</p><div class="why"> <p>Tipp: Tabellenköpfe sind gerichtet (Zeile oder Spalte). Inhaltsüberschriften würden alles Folgende beschriften, auch in anderen Spalten:</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Eine <strong>Tabellenkopf</strong>‑Zelle in Spalte 2 beschriftet Zelle B. <br><br> Eine <strong>Inhaltsüberschrift</strong> in Zelle 2 würde 3, A, B und C sowie diesen Text und den Tooltip‑Fuß betreffen.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,
}

const interfaceStrings = {
	ALERT_CLOSE: 'Schließen',
	ALT: 'Alt‑Text: ',
	CONSOLE_ERROR: 'Es gibt ein Problem mit dem Barrierefreiheitsprüfer auf dieser Seite. Bitte <a class="g-link">melden Sie es auf GitHub</a>. Debug-Informationen:',
	DECORATIVE: 'Als dekorativ markiert',
	DISMISS: 'Ignorieren',
	DISMISS_ALL: 'Auf dieser Seite: ignorieren',
	edit_page: 'Seite bearbeiten',
	edit_layout: 'Layout bearbeiten',
	edit_media: 'Medium bearbeiten',
	edit_term: 'Begriff bearbeiten',
	edit_user: 'Benutzer bearbeiten',
	IMAGES: 'Alt‑Text',
	MAIN_TOGGLE_LABEL: 'Barrierefreiheits‑Werkzeuge ein-/ausschalten',
	MISSING: '(fehlt!)',
	NOT_VISIBLE: 'Hinweis: Dieser Inhalt ist möglicherweise nicht sichtbar. Suchen Sie ihn im markierten Container.',
	NO_IMAGES: 'Keine Bilder gefunden.',
	OUTLINE: 'Überschriften',
	PANEL_DISMISS_BUTTON: `%(dismissCount) ausgeblendete Meldungen anzeigen`,
	PANEL_HEADING: 'Visualisierungen anzeigen',
	SKIP_TO_ISSUE: 'Zum Problem springen',
	WARNING: 'Manuelle Prüfung',
	WARNINGS: 'manuelle Prüfungen',
	buttonFirstContent: 'Zur ersten Meldung',
	buttonHideHiddenAlert: 'Ausgeblendete Meldung verbergen',
	buttonHideHiddenAlerts: `%(count) ausgeblendete Meldungen verbergen`,
	buttonShowHiddenAlert: 'Ausgeblendete Meldung anzeigen',
	buttonToolsActive: 'Visualisierungen verbergen',
	dismissActions: `Ähnliche`,
	dismissHideTitle: 'Blendet die Meldung nur für Sie aus',
	dismissOkAllButton: 'Auf dieser Seite: als OK markieren',
	dismissOkButtonContent: 'Als OK markieren',
	dismissOkTitle: 'Blendet die Meldung für alle Bearbeitenden aus',
	dismissOnSite: 'Auf allen Seiten: als OK markieren',
	dismissalsHeader: 'Wollen Sie das nicht beheben?',
	errorOutlinePrefixHeadingEmpty: '(leere Überschrift)',
	errorOutlinePrefixHeadingIsLong: '(als lang markiert)',
	errorOutlinePrefixSkippedLevel: '(als Ebene übersprungen markiert)',
	issueContent: 'Inhaltsproblem',
	issueDeveloper: 'Entwicklungsproblem',
	issueTemplate: 'Vorlagenproblem',
	main_toggle_hide: 'Barrierefreiheits‑Werkzeuge ausblenden',
	main_toggle_hide_alerts: 'Barrierefreiheits‑Meldungen ausblenden',
	main_toggle_show: 'Barrierefreiheits‑Werkzeuge anzeigen',
	main_toggle_show_alerts: 'Barrierefreiheits‑Meldungen anzeigen',
	main_toggle_1: 'Eine Barrierefreiheitswarnung',
	main_toggle_2: 'Zwei Barrierefreiheitswarnungen',
	main_toggle_plural: ` Barrierefreiheitswarnungen`,
	MISSING_ROOT: `Editoria11y hat keine Elemente gefunden, die der Konfiguration des Prüfbereichs entsprachen: <code>%(root)</code>`,
	panelCheckAltText: `Prüfen Sie, dass jedes Bild seine Bedeutung im Kontext beschreibt und dass es keine Bilder mit eingebettetem Text gibt.`,
	panelCheckOutline: `Dies zeigt die Überschriftenstruktur. Stellen Sie sicher, dass sie der visuellen Struktur entspricht.`,
	panel_HEADING_MISSING_ONE: 'Überschrift Ebene 1 fehlt.',
	PANEL_NO_HEADINGS: 'Keine Überschriften gefunden.',
	reportsLink: 'Website‑Berichte öffnen',
	toggleDisabled: 'Für Editoria11y ist kein prüfbarer Inhalt verfügbar.',
	transferFocus: 'Diesen Inhalt bearbeiten',
	unDismissHideButton: 'Diese ignorierte Meldung wiederherstellen',
	unDismissNotePermissions: 'Diese Prüfung wurde von einer Administration ausgeblendet',
	unDismissOKButton: 'Diese als OK markierte Meldung wiederherstellen',
};

export const lang = {
	strings: Object.assign(Sa11yStrings.strings, interfaceStrings, tips),
	testNames: testNames,
}
