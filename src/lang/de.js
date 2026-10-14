import { default as Sa11yStrings } from '../sa11y-lang/de.js';
// Note: use "Überschrift" for general headings and "Tabellenkopf", "Kopfzelle", "Kopfzeile"/"Kopfspalte" for headers (table etc).
// Machine translation.

const testNames = {
	ARIA_INPUT_FIELD_NAME: 'Diesem benutzerdefinierten Eingabefeld fehlt eine Beschriftung',
	ALT_FILE_EXT: 'Dieser Alt-Text ist ein Dateiname, keine Beschreibung',
	ALT_MAYBE_BAD: 'Ist dies eine klare und prägnante Beschreibung des Bildes?',
	ALT_MAYBE_BAD_WARNING: 'Ist dies eine klare und prägnante Beschreibung des Bildes?',
	ALT_PLACEHOLDER: 'Dieser Alt-Text ist möglicherweise ein Platzhalter',
	ALT_UNPRONOUNCEABLE: 'Dieser Alt-Text ist nicht aussprechbar',
	BTN_EMPTY: 'Schaltfläche hat keine zugängliche Beschriftung',
	BTN_UNPRONOUNCEABLE: 'Diese Schaltfläche ist nicht aussprechbar',
	BTN_EMPTY_LABELLEDBY: 'Schaltfläche hat ein ungültiges ARIA-Label',
	BTN_ROLE_IN_NAME: 'Der Name der Schaltfläche wiederholt das Wort „Schaltfläche“',
	CONTRAST_ERROR: 'Der Text hat nicht genügend Kontrast, um gut lesbar zu sein',
	CONTRAST_ERROR_GRAPHIC: 'Grafik oder Symbol hat nicht genügend Kontrast',
	CONTRAST_INPUT: 'Eingabefeld hat nicht genügend Kontrast, um gut lesbar zu sein',
	CONTRAST_PLACEHOLDER: 'Platzhaltertext hat nicht genügend Kontrast, um gut lesbar zu sein',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Hat dieser Platzhaltertext genügend Kontrast?',
	CONTRAST_WARNING: 'Hat dieser Text genügend Kontrast?',
	CONTRAST_WARNING_GRAPHIC: 'Hat diese Grafik oder dieses Symbol genügend Kontrast?',
	DUPLICATE_ID: 'Doppeltes ID-Attribut',
	DUPLICATE_TITLE: 'Dieser Link hat einen Tooltip mit dem gleichen Text wie der Link',
	EMBED_AUDIO: 'Gibt es für diesen Audioinhalt ein Transkript?',
	EMBED_DATA_VIZ: 'Ist diese Visualisierung barrierefrei?',
	EMBED_GENERAL: 'Eingebettete iFrames erfordern manuelle Prüfungen',
	EMBED_MISSING_TITLE: 'Frame ohne „title“-Attribut',
	EMBED_UNFOCUSABLE: 'Frame mit tabindex="-1" ist nicht per Tastatur erreichbar.',
	EMBED_VIDEO: 'Ist dieses Video korrekt untertitelt?',
	HEADING_EMPTY: 'Diese Überschrift hat keinen Text',
	HEADING_UNPRONOUNCEABLE: 'Diese Überschrift ist nicht aussprechbar',
	HEADING_EMPTY_WITH_IMAGE: 'Dieses Bild wird als Überschrift verwendet und benötigt deshalb Alt-Text',
	HEADING_FIRST: 'Die erste Überschrift auf dieser Seite ist eine Unterüberschrift',
	HEADING_LONG: 'Kann diese Überschrift kürzer sein?',
	HEADING_MISSING_ONE: 'Dieser Seite fehlt eine Überschrift 1',
	HEADING_SKIPPED_LEVEL: 'Diese Überschrift ist auf der falschen Ebene ausgezeichnet',
	HIDDEN_FOCUSABLE: 'Dieses Element kann von Screenreadern nicht beschrieben werden',
	IMAGE_ALT_TOO_LONG: 'Kann dieser Alt-Text kürzer sein?',
	IMAGE_DECORATIVE: 'Ist dieses Bild wirklich bedeutungslos?',
	IMAGE_DECORATIVE_CAROUSEL: 'Bild in einem Karussell oder einer Galerie als dekorativ markiert',
	IMAGE_FIGURE_DECORATIVE: 'Dieses Bild mit Bildunterschrift hat keinen Alt-Text',
	IMAGE_FIGURE_DUPLICATE_ALT: 'Alt-Text sollte nicht identisch mit der Bildunterschrift sein',
	LABELS_ARIA_LABEL_INPUT: 'Gibt es eine sichtbare Beschriftung für dieses Feld?',
	LABELS_PLACEHOLDER: 'Sichtbare Beschriftungen statt Platzhaltern bevorzugen',
	LABELS_INPUT_RESET: 'Wird diese „Zurücksetzen“-Schaltfläche benötigt?',
	LABEL_IN_NAME: 'Sichtbare Beschriftung stimmt nicht mit der unsichtbaren überein',
	LABELS_MISSING_IMAGE_INPUT: 'Dieser Bildschaltfläche fehlt der Alt-Text',
	LABELS_MISSING_LABEL: 'Dieses Eingabefeld hat eine leere Beschriftung',
	LABELS_NO_FOR_ATTRIBUTE: 'Dieses Eingabefeld ist nicht mit einer Beschriftung verbunden',
	LANG_MISMATCH: 'Sprach-Tag stimmt nicht mit dem Inhalt überein',
	LANG_OF_PARTS: 'Dieser Inhalt scheint in einer anderen Sprache zu sein',
	LANG_OF_PARTS_ALT: 'Dieser Alt-Text scheint in einer anderen Sprache zu sein',
	LINK_ALT_FILE_EXT: 'Als Link verwendeter Alt-Text sollte keine URL sein',
	LINK_ALT_MAYBE_BAD: 'Dieser verlinkte Alt-Text ist möglicherweise nicht klar und prägnant',
	LINK_ALT_MAYBE_BAD_WARNING: 'Dieser verlinkte Alt-Text ist möglicherweise nicht klar und prägnant',
	LINK_ALT_UNPRONOUNCEABLE: 'Verlinkte Bilder benötigen aussprechbaren Alt-Text',
	LINK_CLICK_HERE: 'Dieser Link enthält „Hier klicken“',
	LINK_DOI: 'Artikel sollten über ihren Titel verlinkt werden, nicht über DOI-Nummern',
	LINK_EMPTY: 'Dieser Link enthält keine Wörter',
	LINK_EMPTY_LABELLEDBY: 'Link mit ungültigem „aria-labelledby“-Attribut',
	LINK_EMPTY_NO_LABEL: 'Dieser Link benötigt eine Beschriftung',
	LINK_UNPRONOUNCEABLE: 'Dieser Link ist nicht aussprechbar',
	LINK_FILE_EXT: 'Link führt zu einer Datei ohne vorherigen Hinweis',
	LINK_IDENTICAL_NAME: 'Mehrere Links mit demselben Text führen zu verschiedenen Seiten',
	LINK_IMAGE_ALT: 'Beschreibt dieser Alt-Text den Link oder das Bild?',
	LINK_IMAGE_ALT_AND_TEXT: 'Ergibt dieser Alt-Text im Kontext dieses Links Sinn?',
	LINK_IMAGE_LONG_ALT: 'Kann dieser verlinkte Alt-Text kürzer sein?',
	LINK_IMAGE_NO_ALT_TEXT: 'Dieses verlinkte Bild benötigt Alt-Text',
	LINK_IMAGE_TEXT: 'Benötigt dieses verlinkte Bild eine Beschreibung?',
	LINK_LABEL: 'Linkbeschriftung',
	LINK_MAYBE_BUTTON: 'Ist dieser Link tatsächlich eine Schaltfläche?',
	LINK_NEW_TAB: 'Öffnet dieser Link ohne Hinweis einen neuen Tab?',
	LINK_PLACEHOLDER_ALT: 'Dieser verlinkte Alt-Text ist möglicherweise ein Platzhalter',
	LINK_STOPWORD: 'Dieser Link enthält nur generische Wörter',
	LINK_STOPWORD_ARIA: 'Der Zweck dieses Links ist visuell verborgen',
	LINK_SUS_ALT: 'Beschreibt dieser Alt-Text das Bild oder den Link?',
	LINK_SYMBOLS: 'Haben die Symbole oder Emojis in diesem Link eine Bedeutung?',
	LINK_URL: 'Linktext sollte keine URL sein',
	META_LANG: 'Meta-Tag für die Seitensprache fehlt',
	META_LANG_SUGGEST: 'Meinten Sie einen anderen Sprachcode?',
	META_LANG_VALID: 'Ungültiger Sprachcode',
	META_MAX: 'Meta-Tag begrenzt die mögliche Textvergrößerung',
	META_REFRESH: 'Meta-Tag aktualisiert die Seite automatisch',
	META_SCALABLE: 'Meta-Tag verhindert die Vergrößerung von Text',
	META_TITLE: 'Meta-Tag für den Seitentitel fehlt',
	MISSING_ALT: 'Ungültiges HTML: Bild ohne Alt-Attribut',
	MISSING_ALT_LINK: 'Ungültiges HTML: verlinktes Bild ohne Alt-Attribut',
	MISSING_ALT_LINK_HAS_TEXT: 'Ungültiges HTML: Bild im Link ohne Alt-Attribut',
	PAGE_LANG_CONFIDENCE: 'Die Seitensprache stimmt möglicherweise nicht mit dem Inhalt überein',
	QA_BAD_LINK: 'Dieses Linkziel könnte ungültig sein',
	QA_BLOCKQUOTE: 'Sollte dieses Zitat eine Überschrift sein?',
	QA_DOCUMENT: 'Wurde dieses Dokument für Screenreader getaggt?',
	QA_FAKE_HEADING: 'Sollte dieser fett gesetzte Text eine Überschrift sein?',
	QA_FAKE_LIST: 'Sollte das als Liste formatiert sein?',
	QA_IN_PAGE_LINK: 'Defekter Link innerhalb derselben Seite',
	QA_JUSTIFY: 'Text nicht im Blocksatz ausrichten',
	QA_NESTED_COMPONENTS: 'Verschachtelte interaktive Layout-Komponenten',
	QA_PDF: 'Gibt es eine Alternative zu diesem PDF?',
	QA_SMALL_TEXT: 'Text ist zu klein',
	QA_STRONG_ITALICS: 'Große Textblöcke mit Hervorhebung sind schwerer zu lesen',
	QA_SUBSCRIPT: 'Hoch-/Tiefstellung nicht als reine visuelle Formatierung verwenden',
	QA_UNDERLINE: 'Nur Links sollten unterstrichen sein',
	QA_UPPERCASE: 'Ist dieser Text in Großbuchstaben notwendig?',
	SUS_ALT: 'Enthält dieser Alt-Text redundante Wörter?',
	TABINDEX_ATTR: 'Tabindex-Überschreibungen stören die Fokusreihenfolge',
	TABLES_EMPTY_HEADING: 'Diese Kopfzelle benötigt Text',
	TABLES_INVALID_HEADERS_REF: 'Diese Tabelle hat ein ungültiges headers-Attribut',
	TABLES_MISSING_HEADINGS: 'Dieser Tabelle fehlt eine Kopfzeile und/oder Kopfspalte',
	TABLES_SEMANTIC_HEADING: 'Inhaltsüberschriften gehören nicht in Tabellen',
	UNCONTAINED_LI: 'Ungültige HTML-Liste',
};

const why = {
	fix: `<strong class="badge">So beheben</strong> `,

	buttons: `<div class="why"><p>Tipp: Der zugängliche Name einer Schaltfläche sollte klar machen, was sie beim Klicken tut. Wenn sich das ändert, sollte der aktuelle Zustand klar erkennbar sein:</p><ul>
<li>Schaltflächen, die Beschriftungen aktualisieren:<br>„Wiedergabe/Pause“, „Details anzeigen/Details ausblenden“</li>
<li>Schaltflächen, die <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">den Zustand aktualisieren</a>:<br>„Wiedergabe/Wiedergabe, gedrückt“, „Details, eingeklappt/Details, ausgeklappt“.</li>
</ul></div>`,

	headings: `<div class="why"><p>Tipp: Überschriften und Unterüberschriften ordnen Inhalte in eine verschachtelte Struktur. Screenreader-Nutzende verlassen sich darauf, um Seiten zu verstehen und zu navigieren:</p>
<ul><li>Überschrift Ebene 1: Seitentitel
<ul><li>Überschrift Ebene 2: Hauptthemen
<ul><li>Überschrift Ebene 3: Unterthemen</li></ul></li></ul></li></ul></div>`,

	images: `<div class="why"><p>Tipp: Beschreiben Sie beim Schreiben von Alt-Text, was ein Bild <em>bedeutet</em>, nicht nur, was darauf zu sehen ist. Je nach Kontext kann ein Foto eines Kindes, das einen Ball tritt, bedeuten:</p>
<ul><li>Sie spielten im strömenden Regen.</li>
<li>Die neuen Trikots haben coole Drachen-Logos.</li>
<li>Sie schoss das spielentscheidende Tor von der linken Seitenlinie!</li></ul></div>`,

	links: `<div class="why"><p>Tipp: Lesende überfliegen Seiten anhand der Links und nutzen die Seitensuche, um Links anhand ihres Namens zu finden. Wirksame Links sind daher aussagekräftig, eindeutig und prägnant:</p><ul><li>Ideal: „Mehr über <a href="https://webaim.org/techniques/hypertext/link_text">aussagekräftige Links</a> erfahren“</li><li>Nicht eindeutig: „Klicken Sie <a href="https://webaim.org/techniques/hypertext/link_text">hier</a>, um mehr über aussagekräftige Links zu erfahren.“</li><li>Nicht prägnant: „<a href="https://webaim.org/techniques/hypertext/link_text">Klicken Sie hier, um mehr über aussagekräftige Links zu erfahren</a>“</li></ul></div>`,

	imageLinks: `<div class="why"><p>Tipp: Der Zweck von Alt-Text ist, die <em>Bedeutung</em> eines Bildes zu vermitteln, nicht nur dessen Inhalt. Bei einem verlinkten Bild ist die Bedeutung das Linkziel:</p><ul><li>„<em>Eine Lupe</em>“ beschreibt ein Bild, keinen Link.</li><li>„<em>Eine Lupe für die Suche</em>“ beschreibt verwirrenderweise beides.</li><li>„<em>Suchen</em>“ beschreibt das Linkziel korrekt.</li></ul></div>`,
};

const tips = {
	ARIA_INPUT_FIELD_NAME: `<p><strong>Element:</strong> <code>%(EL)</code></p><p>${why.fix}Geben Sie eine gültige Beschriftung an; bei benutzerdefinierten Eingabeelementen bedeutet das oft innenliegenden Text oder ein title-, aria-label- oder aria-labelledby-Attribut.</p>`,

	ALT_FILE_EXT: `<p><span hidden>%(alt)</span><strong>Alt-Text:</strong> <i>%(ALT_TEXT)</i></p><p>Screenreader versuchen, diese URL auszusprechen – oft Buchstabe für Buchstabe. Das vermittelt kaum die gleiche Bedeutung wie das Bild selbst.</p><p>${why.fix}Beschreiben Sie kurz, was dieses Bild in diesem Kontext bedeutet.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p><strong>Alt-Text:</strong> <i>%(alt)</i></p><p>${why.fix}Beschreiben Sie kurz, was dieses Bild in diesem Kontext bedeutet.</p>${why.images}`,

	ALT_MAYBE_BAD_WARNING: `<p><strong>Alt-Text:</strong> <i>%(alt)</i></p><p>${why.fix}Beschreiben Sie kurz, was dieses Bild in diesem Kontext bedeutet.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p><strong>Alt-Text:</strong> <i>%(alt)</i></p><p>${why.fix}Beschreiben Sie kurz, was dieses Bild in diesem Kontext bedeutet.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p><strong>Alt-Text:</strong> <i>%(alt)</i></p><p>Dieser Alt-Text enthält nur nicht aussprechbare Symbole und/oder Leerzeichen. Screenreader kündigen an, dass ein Bild vorhanden ist, und machen dann eine unangenehme Pause oder sagen etwas Unverständliches.</p><p>${why.fix}Beschreiben Sie kurz, was dieses Bild in diesem Kontext bedeutet.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Verwenden Sie eine gültige Methode, um Screenreadern mitzuteilen, was diese Schaltfläche tut – z. B. Text, Alt-Text für ein Icon oder ein <code>title</code>-Attribut.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Diese Schaltfläche hat einen <code>aria-labelledby</code>-Wert, der leer ist oder nicht mit dem <code>ID</code>-Wert eines anderen Elements auf der Seite übereinstimmt.</p><p>${why.fix}Verbinden Sie die ID wieder mit einem Element auf der Seite oder entfernen Sie dieses Attribut und beschreiben Sie die Schaltfläche auf andere Weise.</p>`,

	BTN_TIP: `${why.buttons}`,

	BTN_ROLE_IN_NAME: `<p><strong>Beschriftung für Screenreader:</strong> <i>%(TEXT)</i></p><p>Screenreader kündigen bereits selbst an, dass sie eine Schaltfläche beschreiben; das Wort „Schaltfläche“ ist daher überflüssig.</p><p>${why.fix}Die Beschriftung der Schaltfläche sollte ihrer Aktion entsprechen. Wenn die sichtbare Beschriftung ein Symbol statt Text ist, beschriften Sie die Schaltfläche mit der Bedeutung des Symbols, z. B. „Wiedergabe“, „Suchen“ oder „Menü“.</p>`,
	BTN_UNPRONOUNCEABLE: `<p><strong>Schaltflächentext:</strong> <i>%(TEXT)</i></p><p>${why.fix}Fügen Sie Text, einen Titel oder ein aria-label hinzu, um zu beschreiben, was die Schaltfläche tut.</p><div class="why"><p>Tipp: Screenreader können Schaltflächen, die nur Leerzeichen oder Symbole enthalten, nicht beschreiben. Sie verstummen entweder („Schaltfläche, [...unangenehme Pause, wo die Beschriftung stehen sollte...]“) oder lesen den Namen des Symbols vor.</p></div>`,

	CONTRAST_WARNING: 'Ein Hintergrundbild oder Farbverlauf verhindert, dass dieses Tool die tatsächliche Hintergrundfarbe sicher bestimmen kann. Nutzen Sie den Farbwähler unten für eine manuelle Prüfung.',

	DUPLICATE_ID: `<p>IDs werden auf dieser Seite für Beschriftungen oder Linkziele verwendet und müssen daher eindeutig sein.</p><p>${why.fix}Ändern Sie diese ID: <code>#%(ID)</code></p><div class="why"><p>In den meisten Content-Management-Systemen stammt sie aus einem Feld namens „name“ oder „id“ in den Elementeigenschaften. In HTML ist sie ein Attribut: <code>&lt;a id="MY-ID"&gt;</code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Löschen Sie den Linktext oder das <code>title</code>-Attribut.</p><div class="why"><p>Tipp: <code>title</code>-Tooltips erscheinen nur, wenn man mit der Maus darüberfährt. Auf dem Smartphone oder bei der Navigation per Tastatur sind sie nicht sichtbar, daher sehen viele Nutzende sie nie. Sie sollten niemals eindeutige oder wichtige Informationen enthalten.</p></div>`,

	EMBED_AUDIO: `<p>Dieses Prüfwerkzeug kann nicht feststellen, ob ein Audioplayer ein Transkript hat oder ob das Transkript korrekt ist.</p><p>${why.fix}Stellen Sie sicher, dass ein <a href="https://www.w3.org/WAI/media/av/transcribing/">Transkript oder eine Textalternative</a> verfügbar ist und dass Sprechende und bedeutsame Geräusche korrekt angegeben sind.</p>`,

	EMBED_DATA_VIZ: `<p>Eingebettete Visualisierungen sind häufig schwer oder gar nicht mit Hilfstechnologien bedienbar, für Menschen mit Sehbeeinträchtigung oder Farbenblindheit oft schwer verständlich und erfordern auf Smartphones oft umfangreiches horizontales Scrollen.</p><p>${why.fix}Wenn diese Einbettung nicht gleichzeitig kontrastreich, per Tastatur bedienbar <strong><em>und</em></strong> für Screenreader beschreibbar ist, fügen Sie ein gleichwertiges alternatives Format hinzu, z. B. eine Textbeschreibung, eine Datentabelle oder eine Tabellenkalkulationsdatei zum Herunterladen.</p>`,

	EMBED_GENERAL: 'Automatisierte Prüfwerkzeuge können Inhalte innerhalb von Einbettungen nicht testen. Stellen Sie sicher, dass jemand geprüft hat, ob alle Bilder in dieser Einbettung Alt-Text haben, Videos Untertitel haben, Text ausreichenden Kontrast hat und Links und Schaltflächen <a href="https://webaim.org/techniques/keyboard/">per Tastatur bedienbar</a> sind.',

	EMBED_MISSING_TITLE: `<p>Eingebettete Inhalte benötigen einen zugänglichen Namen, der ihren Inhalt für Screenreader beschreibt.</p><p>${why.fix}Fügen Sie ein eindeutiges <code>title</code>- oder <code>aria-label</code>-Attribut hinzu.</p>`,

	EMBED_UNFOCUSABLE: `<p>Dieses Attribut weist Tastaturen und Hilfstechnologien an, das Element zu überspringen. Entfernen Sie dieses Attribut, es sei denn, das iFrame enthält keine Links, Schaltflächen, Formularelemente oder scrollbaren Inhalte.</p>`,

	EMBED_VIDEO: `<p>Dieses Prüfwerkzeug kann nicht „sehen“, ob Videos Untertitel haben oder ob jemand sie Korrektur gelesen hat – eine manuelle Prüfung ist erforderlich.</p><p>${why.fix}Stellen Sie sicher, dass <a href="https://www.w3.org/WAI/media/av/captions/">korrekte Untertitel für Hörgeschädigte („CC“) oder Untertitel</a> verfügbar sind und dass Sprechende und bedeutsame Geräusche korrekt angegeben sind.</p>`,

	HEADING_EMPTY: `<p>Leere Überschriften erzeugen verwirrende Lücken in der Seitenstruktur.</p><p>${why.fix}Fügen Sie dieser Überschrift Text hinzu oder löschen Sie diese leere Zeile.</p>${why.headings}`,
	HEADING_UNPRONOUNCEABLE: `<p>Leere Überschriften erzeugen verwirrende Lücken in der Seitenstruktur.</p><p>${why.fix}Fügen Sie dieser Überschrift für Menschen lesbaren Text hinzu oder wandeln Sie sie in einen Absatz um.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Leere Überschriften erzeugen verwirrende Lücken in der Seitenstruktur.</p><p>${why.fix}Wenn dies keine Überschrift ist, ändern Sie das Format von <code>Überschrift %(level)</code> in <code>Absatz</code>. Andernfalls geben Sie die Bedeutung des Bildes in seinem Alt-Text an.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Stellen Sie sicher, dass der Seitentitel als Überschrift 1 oder Überschrift 2 ausgezeichnet ist. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}Sofern diese Überschrift kein feststehender Verweis wie der Titel eines veröffentlichten Artikels ist, kürzen Sie sie, damit man die Seite leichter überfliegen kann:<span hidden>%(drop)%(drop)</span></p><p><i>%(TEXT)</i></p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Zeichnen Sie den Seitentitel als Überschrift 1 aus, um den Beginn der Dokumentstruktur zu markieren.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Diese Überschrift springt von <code>Ebene %(prevLevel)</code> zu <code>Ebene %(level)</code>. Mit einem Screenreader klingt das, als fehle Inhalt.</p><p>${why.fix}Passen Sie die Ebenen an, damit die Struktur lückenlos ist.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: `<p>Dieses interaktive Element hat <code>aria-hidden="true"</code>, ist aber weiterhin per Tastatur erreichbar.</p><p>${why.fix}Wenn Sie dieses Element <strong>absichtlich</strong> vor Screenreadern verbergen möchten, müssen Sie zusätzlich <code>tabindex="-1"</code> hinzufügen. Andernfalls entfernen Sie das Attribut <code>aria-hidden="true"</code>.</p><p><strong>Element:</strong> <code>%(ELEMENT)</code></p>`,

	IMAGE_ALT_TOO_LONG: `<p>Dieser Alt-Text ist %(altLength) Zeichen lang: <i class="ed11y-small">%(ALT_TEXT)</i></p><p>${why.fix}Fassen Sie zusammen oder verschieben Sie Teile der Beschreibung in eine Bildunterschrift.</p><div class="why"><p>Tipp: Komplexe Bilder, die mehr Informationen vermitteln, als in einen Satz passen, brauchen meist eine <strong>sichtbare</strong> Bildunterschrift oder Alternative, die wichtige Details beschreibt oder erläutert. Es ist in Ordnung, Screenreader-Nutzende auf einen solchen Text zu verweisen:</p><ul><li>„Plakat für die Tanzveranstaltung am Freitag; Details folgen in der Bildunterschrift.“</li><li>„Diagramm, das zeigt, dass die Probleme dieses Jahr um 10 % zurückgegangen sind; Details folgen in der Tabelle.“</li></ul></div>`,

	IMAGE_DECORATIVE: `<p>Dieses Bild wurde mit leerem Alt-Text für Screenreader ausgeblendet. Nur bedeutungslose Bilder wie redundante Icons und Hintergrundtexturen sollten so ausgeblendet werden.</p><p>${why.fix}Wenn das Bild inhaltlichen Wert hat, geben Sie Alt-Text an.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'Das Bild ist als <strong>dekorativ</strong> markiert, aber alle Bilder in einem Karussell oder einer Galerie sollten beschreibenden Alt-Text haben, damit alle Nutzenden ein gleichwertiges Erlebnis haben.',

	IMAGE_FIGURE_DECORATIVE: `<p>Dieses Bild wird von Hilfstechnologien ignoriert. Ergibt die Bildunterschrift ohne das Bild Sinn?</p><p>${why.fix}Wenn die Bildunterschrift die visuelle Bedeutung des Bildes nicht beschreibt, geben Sie Alt-Text für alles an, was die Bildunterschrift nicht beschreibt.</p><div class="why"><p>Tipp: Bilder, Alt-Texte und Bildunterschriften wirken zusammen:</p><ul><li>Sichtbare Bildunterschriften liefern Kontext und eine Deutung des Bildes.</li><li>Unsichtbare Alt-Texte beschreiben das Bild für Menschen, die es nicht sehen können, damit sie wissen, was die Bildunterschrift beschreibt.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p><strong>Doppelter Text: </strong><i>%(ALT_TEXT)</i></p><p>${why.fix}Beschreiben Sie im Alt-Text die visuelle Bedeutung, die sonst fehlen würde.</p><div class="why"><p>Tipp: Bilder, Alt-Texte und Bildunterschriften wirken zusammen:</p><ul><li>Sichtbare Bildunterschriften liefern Kontext und eine Deutung des Bildes.</li><li>Unsichtbare Alt-Texte beschreiben das Bild für Menschen, die es nicht sehen können, damit sie wissen, worauf sich die Bildunterschrift bezieht.</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: `<p><strong>Unsichtbare Feldbeschriftung:</strong> <i>%(TEXT)</i></p><p>Prüfen Sie, ob es eine sichtbare Feldbeschriftung gibt, ob sie sichtbar bleibt, wenn Text im Feld steht, und ob sie mit dem unsichtbaren Feldnamen übereinstimmt.</p><div class="why"><p>Wenn Felder nur mit einem Titel oder Platzhalter beschriftet sind, verschwindet die Beschriftung visuell, sobald jemand zu schreiben beginnt. Das erschwert es, die Eingaben zu überprüfen, wenn es mehrere Felder gibt. Außerdem vergisst man so leicht, die unsichtbare Feldbeschriftung zu aktualisieren.</p></div>`,

	LABELS_INPUT_RESET: `<p>„Zurücksetzen“-Schaltflächen werden leicht versehentlich ausgelöst und führen dann zu Datenverlust, ohne dass man abbrechen oder den Vorgang rückgängig machen kann.</p><p>${why.fix}Sofern hier nicht nur ein einzelnes Feld zurückgesetzt wird, sollten Sie die Schaltfläche entfernen oder eine Möglichkeit bieten, die Aktion vor dem Ausführen abzubrechen.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'Der Bildschaltfläche fehlt Alt-Text. Fügen Sie Alt-Text hinzu, um einen zugänglichen Namen bereitzustellen, z. B. <em>Suchen</em> oder <em>Senden</em> hinzu.',

	LABELS_MISSING_LABEL: `<p>${why.fix}Fügen Sie diesem Eingabefeld eine <code>id</code> hinzu und dem zugehörigen <code>label</code>-Element ein passendes <code>for</code>-Attribut.</p>`,

	LABELS_NO_FOR_ATTRIBUTE: 'Diesem Eingabefeld ist keine Beschriftung zugeordnet. Fügen Sie dem <code>label</code>-Element ein <code>for</code>-Attribut hinzu, das der <code>id</code> dieses Eingabefelds entspricht. <hr> <strong>ID:</strong> <code>#%(ID)</code>',

	LABELS_PLACEHOLDER: `<p>Platzhaltertext kann bei gutem Kontrast mit zuvor eingegebenem Inhalt verwechselt werden oder bei schlechtem Kontrast unleserlich sein. Er verschwindet zudem bei der Eingabe, wodurch Informationen verloren gehen können, die Nutzende zur Fehlerkontrolle benötigen.</p><p>${why.fix}Sorgen Sie dafür, dass wichtige Informationen wie die Feldbeschriftung, Hilfetexte und Formatvorgaben sichtbar bleiben, wenn das Feld Inhalt enthält, und erwägen Sie, ganz auf den Platzhalter zu verzichten.</p>`,

	LABEL_IN_NAME: `<p><strong>Sichtbarer Text:</strong> <i>%(VISIBLE)</i></p><p><strong>Beschriftung für Screenreader:</strong> <i>%(LABEL)</i></p><p>Der sichtbare Text dieses Elements scheint vom zugänglichen Namen abzuweichen. Das kann Screenreader-Nutzende verwirren und die Sprachsteuerung beeinträchtigen.</p><p>${why.fix}Stellen Sie sicher, dass die sichtbare Beschriftung mit dem Text der unsichtbaren Beschriftung beginnt und keine bedeutungstragenden Informationen enthält, die in der unsichtbaren Beschriftung fehlen.</p>`,

	LINK_ALT_FILE_EXT: `<p>Dieser Alt-Text ist wahrscheinlich ein Dateiname statt einer aussagekräftigen Beschriftung für einen Link:<br><span hidden>%(ALT)</span><i>%(alt)</i></p><p>${why.fix}Verwenden Sie den Titel des Linkziels als Alt-Text für verlinkte Bilder.</p><div class="why"><p>Alt-Text soll die Bedeutung eines Bildes wiedergeben, nicht nur dessen Inhalt. Bei verlinkten Bildern ist die Bedeutung das Linkziel:</p><ul><li>„Seite mit Text“ beschreibt das Bild, nicht den Link.</li><li>„IMG_1234.jpg“ ist nur ein Dateiname.</li><li>„Anmeldeformular für die Veranstaltung (.doc)“ ist ein Linkziel.</li></ul></div>`,

	LINK_ALT_MAYBE_BAD: `<p><strong>Alt-Text:</strong> <i>%(alt)</i></p><p>${why.fix}Verwenden Sie den Titel des Linkziels als Alt-Text für verlinkte Bilder.</p>${why.imageLinks}`,

	LINK_ALT_MAYBE_BAD_WARNING: `<p><strong>Alt-Text:</strong> <i>%(alt)</i></p><p>${why.fix}Verwenden Sie den Titel des Linkziels als Alt-Text für verlinkte Bilder.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>Der Alt-Text dieses verlinkten Bildes besteht nur aus nicht aussprechbaren Symbolen und/oder Leerzeichen: <i>%(ALT_TEXT)</i></p><p>Screenreader kündigen einen Link an, können ihn dann aber nicht beschreiben.</p><p>${why.fix}Verwenden Sie den Titel des Linkziels als Alt-Text für verlinkte Bilder.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `<p><strong>Linktext:</strong> <i>%(TEXT)</i></p><p>${why.fix}Entfernen Sie überflüssige Wörter, die vom Zweck des Links ablenken.</p>${why.links}`,

	LINK_DOI: `<p><strong>Linktext:</strong> <i>%(TEXT)</i></p><p>${why.fix}Verlinken Sie den Artikeltitel und geben Sie die DOI-Nummer im Klartext an, nicht umgekehrt.</p><div class="why"><p>Der <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA-Stilleitfaden</a> empfiehlt beschreibende Links auf Websites, weil Nutzende Seiten anhand der Links überfliegen und die Seitensuche nutzen, um Links anhand ihres Namens zu finden. Interessante Artikel fallen Nutzenden viel eher auf, wenn der Titel verlinkt ist.</p><p>So können Screenreader außerdem jeden Link aussagekräftig beschreiben, statt eine bedeutungslose Zahlenfolge vorzulesen.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Fügen Sie Text hinzu, der das Ziel beschreibt, oder löschen Sie ihn, wenn es sich nur um einen Tippfehler oder ein verlinktes Leerzeichen handelt.</p><div class="why"><p>Tipp: Screenreader können Links, die nur Leerzeichen oder Symbole enthalten, nicht beschreiben. Sie verstummen entweder („Link, [...unangenehme Pause, wo der Linktitel stehen sollte...]“) oder lesen die URL vor: „Link, H-T-T-P-S Schrägstrich Schrägstrich example Punkt com“.</p><p>Beachten Sie, dass verlinkte Leerzeichen in einigen Editoren schwer zu löschen sein können; manchmal ist es notwendig, „über die Lücke hinweg“ zu löschen, indem Sie die Wörter auf beiden Seiten des verlinkten Leerzeichens entfernen und neu eingeben.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>Dieser Link hat ein <code>aria-labelledby</code>-Attribut, das mit keiner <code>ID</code> eines Elements auf der Seite übereinstimmt.</p><p>${why.fix}Geben Sie eine gültige <code>ID</code> an oder entfernen Sie dieses Attribut und beschreiben Sie den Link auf andere Weise.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Fügen Sie Text hinzu, der das Ziel beschreibt, oder löschen Sie den Link, wenn es sich nur um einen Tippfehler wie ein verlinktes Leerzeichen handelt.</p><div class="why"><p>Tipp: Screenreader können leere Links nicht beschreiben. Sie verstummen entweder („Link, [...unangenehme Pause, wo der Linktitel stehen sollte...]“) oder lesen die URL vor: „Link, H-T-T-P-S Schrägstrich Schrägstrich example Punkt com“.</p><p>Beachten Sie, dass verlinkte Leerzeichen in einigen Editoren schwer zu löschen sein können; manchmal ist es notwendig, „über die Lücke hinweg“ zu löschen, indem Sie die Wörter auf beiden Seiten des verlinkten Leerzeichens entfernen und neu eingeben.</p></div>`,
	LINK_UNPRONOUNCEABLE: `<p><strong>Linktext:</strong> <i>%(TEXT)</i></p><p>${why.fix}Fügen Sie Text oder einen Titel hinzu, der das Ziel beschreibt, oder löschen Sie ihn, wenn es sich nur um einen Tippfehler oder ein verlinktes Leerzeichen handelt.</p><div class="why"><p>Tipp: Screenreader können Links, die nur Leerzeichen oder Symbole enthalten, nicht beschreiben. Sie verstummen entweder („Link, [...unangenehme Pause, wo der Linktitel stehen sollte...]“) oder lesen den Namen des Symbols vor.</p></div>`,

	LINK_FILE_EXT: `<p><strong>Linktext:</strong> <i>%(TEXT)</i></p><p>Dieser Link führt ohne Hinweis zu einem PDF oder einer herunterladbaren Datei (z. B. MP3, Zip, Word-Dokument).</p><p>${why.fix}Verwenden Sie Text oder ein Icon, um im Linktext <a href="https://itmaybejj.github.io/linkpurpose/">den Dateityp anzugeben</a>.</p><p class="why">Bei großen Dateien sollten Sie auch die Dateigröße angeben, z. B. „Jahresbericht (PDF, 3 MB)“.</p>`,

	LINK_IDENTICAL_NAME: `<p><strong>Linktext:</strong> <i>%(TEXT)</i></p><p>${why.fix}Formulieren Sie Links zu unterschiedlichen Zielen um, sodass sie die eindeutigen Titel ihrer Ziele verwenden.</p>${why.links}`,

	LINK_IMAGE_ALT: `<p><strong>Alt-Text:</strong> <i>%(ALT_TEXT)</i></p><p>${why.fix}Verwenden Sie den Titel des Linkziels als Alt-Text für verlinkte Bilder.</p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p><strong>Alt-Text:</strong> <i>%(ALT_TEXT)</i></p><p><strong>Linktext einschließlich Alt-Text:</strong> <i>%(TEXT)</i></p><p>${why.fix}Bearbeiten oder entfernen Sie den Alt-Text, wenn er irrelevante oder redundante Informationen hinzufügt.</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p>Dieser Alt-Text ist %(altLength) Zeichen lang: <i class="ed11y-small">%(ALT_TEXT)</i></p><p>${why.fix}Verwenden Sie den Titel des Linkziels als Alt-Text für verlinkte Bilder.</p><div class="why"><p>Screenreader-Nutzende hören oft eine Liste von Links ohne Kontext. Der Alt-Text eines verlinkten Bildes wird in dieser Liste als Linktitel vorgelesen; daher sollte er <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">das Linkziel beschreiben</a>, nicht den Bildinhalt.</p></div>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Wenn ein Link ein Bild umschließt, <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">liefert der Alt-Text des Bildes den Linktitel für Screenreader</a>.</p><p>${why.fix}Verwenden Sie den Titel des Linkziels als Alt-Text für verlinkte Bilder.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'Das Bild ist als dekorativ markiert, obwohl der umgebende Text als Linkbeschriftung dient.',

	LINK_MAYBE_BUTTON: `<p><strong>Link:</strong> <i>%(TEXT)</i></p><p>Dieser Link hat ein ungültiges Ziel und trägt einen Namen, der darauf hindeutet, dass er möglicherweise als Schaltfläche oder Umschalter statt als Link fungiert.</p><p>${why.fix}Verwenden Sie stattdessen ein <a href="https://www.w3.org/WAI/ARIA/apg/patterns/button/">&lt;button&gt;</a> oder korrigieren Sie das Linkziel.</p><div class="why"><p>Tipp: Hilfstechnologien behandeln Schaltflächen und Links unterschiedlich. Das richtige HTML-Element stellt sicher, dass Nutzende wissen, welche Tastenkombinationen sie verwenden und welche Aktion ausgelöst wird.</p></div>`,

	LINK_NEW_TAB: `<p><strong>Linktext:</strong> <i>%(TEXT)</i></p><p>${why.fix}Stellen Sie den Link so ein, dass er im selben Tab geöffnet wird, oder <a href="https://itmaybejj.github.io/linkpurpose/">weisen Sie Nutzende vorher darauf hin</a>.</p><div class="why"><p>Lesende können jederzeit <em>selbst entscheiden</em>, einen Link in einem neuen Tab zu öffnen. Wenn ein Link das Öffnen eines neuen Tabs erzwingt, ist das oft verwirrend oder störend, besonders für Nutzende von Hilfstechnologien, die sich fragen, warum die „Zurück“-Schaltfläche ihres Browsers nicht mehr funktioniert.</p><p>Hinweis: Formulare sind die Ausnahme. Wenn jemand ein Formular ausfüllt, könnten durch das Öffnen eines Links im selben Fenster die bisherigen Eingaben verloren gehen; daher öffnen Links in Formularen meist in einem neuen Tab.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p><strong>Alt-Text:</strong> <i>%(alt)</i></p><p>${why.fix}Verwenden Sie den Titel des Linkziels als Alt-Text für verlinkte Bilder.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Linktext: <i>%(ERROR)</i></p><p>${why.fix}Verwenden Sie einen Linktext, der das Linkziel beschreibt.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>Über ARIA wurde ein abweichender Name angegeben:</p><p><strong>Sichtbarer Text:</strong> <i>%(VISIBLE)</i></p><p><strong>Verborgener Text:</strong> <i>%(HIDDEN)</i></p><p>${why.fix}Schreiben Sie aussagekräftige Links für alle, nicht nur für Screenreader-Nutzende, und stellen Sie sicher, dass das <a href="https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html">sichtbare Beschriftung jedes Elements mit seinem Namen übereinstimmt</a>, damit Sprachsteuerungs-Nutzende ihrem Browser sagen können, welchen Link sie anklicken möchten.</p>${why.links}`,

	LINK_SUS_ALT: `<p>Sofern „<i>%(alt)</i>“ nicht das Linkziel beschreibt, beschreibt dieser Alt-Text wahrscheinlich das Bild.</p><p><strong>Alt-Text:</strong> <i>%(ALT_TEXT)</i></p><p>${why.fix}Verwenden Sie den Titel des Linkziels als Alt-Text für verlinkte Bilder.</p>${why.imageLinks}`,

	LINK_SYMBOLS: `<p>Symbol gefunden: <i>%(ERROR)</i></p><p>${why.fix}Vermeiden Sie Symbole als Handlungsaufforderung im Linktext, sofern sie nicht für Hilfstechnologien verborgen sind. Screenreader lesen Symbole möglicherweise vor, was verwirrend sein kann.</p>`,

	LINK_URL: `<p><strong>Linktext:</strong> <i>%(TEXT)</i></p><p>${why.fix}Ersetzen Sie den Linktext durch den Titel des Linkziels oder den Zweck des Links.</p><div class="why"><p>Tipp: Lesende überfliegen Seiten auf der Suche nach Links anhand ihres Namens. Das gilt besonders für Screenreader-Nutzende, die mithilfe einer Liste der Links auf der Seite navigieren und suchen.</p><p>Verlinkte URLs lassen sich weder gut überfliegen noch mit der Seitensuche finden, daher werden sie seltener gefunden und seltener angeklickt.</p></div>`,

	META_LANG: `<p>${why.fix}Fügen Sie dem HTML-Tag der Seite ein <a href="https://www.w3.org/International/questions/qa-html-language-declarations">Sprachattribut</a> hinzu.</p><div class="why"><p>Tipp: Screenreader sprechen Wörter anhand von Sprach-Tags aus. Wird eine Sprache mit dem falschen Sprachpaket ausgesprochen, ist das Ergebnis unverständlich. Wenn Ihre Sprache nicht ausgezeichnet ist, verwendet der Screenreader entweder die Standardsprache des Browsers oder versucht, die Sprache zu erraten – mit unvorhersehbaren Ergebnissen.</p></div>`,

	META_LANG_VALID: `<p><strong>Element:</strong> <code>&lt;%(ELEMENT) lang="%(CODE)"&gt;</code></p><p>${why.fix}Ersetzen Sie das lang-Attribut durch einen gültigen Sprachcode.</p><div class="why"><p>Tipp: Seiten und Elemente haben <a href="https://www.w3.org/International/questions/qa-html-language-declarations">Sprachattribute</a>, damit Screenreader und Übersetzungstools den Text korrekt lesen.</p></div>`,

	META_MAX: `<p>Dieses Meta-Tag begrenzt die Textvergrößerung.</p><p>${why.fix}Entfernen oder passen Sie die Begrenzung an, damit volles Zoomen möglich ist.</p>`,

	META_REFRESH: `<p>Seiten sollten nicht per Meta-Tag automatisch aktualisiert werden. Das unterbricht Nutzende ohne Vorwarnung oder Möglichkeit, die Aktualisierung zu verhindern, lässt sie beim Lesen die Stelle verlieren und kann bereits ausgefüllte Formulare zurücksetzen.</p><p>${why.fix}Um Inhalte auf derselben Seite zu aktualisieren, verwenden Sie AJAX, um Abschnitte ohne Neuladen zu aktualisieren, oder lösen Sie das Neuladen per JavaScript aus, damit Nutzende vorher gewarnt werden und es verzögern können.</p>`,

	META_SCALABLE: `<p>Dieses Meta-Tag verhindert die Textvergrößerung.</p><p>${why.fix}Erlauben Sie komplettes Zoomen durch Entfernen oder Anpassen des Tags.</p>`,

	META_TITLE: `<p>${why.fix}Fügen Sie dem <code>head</code>-Element der Seite ein <code>&lt;title&gt;</code>-Tag hinzu.</p><div class="why"><p>Tipp: Vieles beim Surfen hängt von einem <a href="https://developer.mozilla.org/de/docs/Web/HTML/Reference/Elements/title">kurzen und eindeutigen title-Tag</a> ab:</p><ul><li>Suchmaschinen verwenden ihn als Titel der Suchergebnisse.</li><li>Browser verwenden ihn als Titel der Tabs.</li><li>Screenreader lesen ihn beim Wechseln zwischen Tabs vor.</li></ul><p>Ohne Seitentitel sehen bzw. hören Nutzende stattdessen nur eine reine URL.</p></div>`,

	MISSING_ALT: `<p>Wenn Screenreader auf ein Bild ganz ohne Alt-Attribut stoßen, versuchen sie stattdessen, die URL der Bilddatei auszusprechen, oft Buchstabe für Buchstabe.</p><p>${why.fix}Beschreiben Sie kurz, was dieses Bild in diesem Kontext bedeutet.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Wenn Screenreader auf ein Bild ganz ohne Alt-Attribut stoßen, versuchen sie stattdessen, die URL der Bilddatei auszusprechen, oft Buchstabe für Buchstabe. Bei verlinkten Bildern ist das besonders problematisch.</p><p>${why.fix}Fügen Sie einen Alt-Text hinzu, der dem Linkziel entspricht.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Dieses Bild ist Teil eines Links mit Text. Wenn der sichtbare Text ausreicht, um den Link zu beschreiben, fügen Sie ein leeres Alt-Attribut (alt="") hinzu, damit Screenreader dieses Bild ignorieren. Andernfalls fügen Sie einen Alt-Text hinzu, der hilft, Ziel oder Zweck des Links zu beschreiben.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>Der Link scheint auf eine Entwicklungsumgebung zu verweisen:<br>{L} <code>%(LINK)</code></p><p>${why.fix}Ändern Sie den Link so, dass er auf einen relativen Pfad (/ordner) oder die öffentliche URL verweist.</p>`,

	QA_BLOCKQUOTE: `<p><strong>Verdächtig kurzes Zitat:</strong> <i>%(TEXT)</i></p><p>${why.fix}Wenn es sich um eine Überschrift und kein Zitat handelt, zeichnen Sie den Text als Überschrift aus, damit es in der Seitenstruktur erscheint.</p>${why.headings}`,

	QA_DOCUMENT: `<p><strong>Link:</strong> <i>%(TEXT)</i></p><p>Verlinkte Dokumente gelten als Webinhalt und müssen ebenfalls barrierefrei sein. Prüfen Sie, ob in diesem Dokument Überschriften, Tabellenköpfe und Alt-Texte für Bilder ausgezeichnet sind.</p><div class="why"><ul><li>Machen Sie Ihr <a href="https://support.google.com/docs/answer/6199477?hl=de">Google Workspace-Dokument oder Ihre Präsentation barrierefreier.</a></li><li>Machen Sie Ihre <a href="https://support.microsoft.com/de-de/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office-Dokumente barrierefreier.</a></li></ul></div>`,

	QA_FAKE_HEADING: `<p><strong>Fett gesetzter Text:</strong> <i>%(TEXT)</i></p><p>${why.fix}Wenn dieser Text fett ist, um einen Themenwechsel zu kennzeichnen, zeichnen Sie ihn als Überschrift aus, damit Screenreader-Nutzende damit auf der Seite navigieren können.</p><div class="why"><p>Tipp: Fett- und Kursivstile geben visuelle Hervorhebung, fügen aber nicht automatisch Text zum Inhaltsverzeichnis des Dokuments für Hilfstechnologien hinzu.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Wenn <i>%(TEXT)</i> Teil einer Liste ist, verwenden Sie Listenformatierung.</p><div class="why"><p>Tipp: Listenformatierung ist strukturell, sowohl visuell als auch für die Navigation:</p> <ol><li>Listen richten ihre Einzüge einheitlich aus und sind dadurch leicht zu lesen.</li> <li>Listen sind maschinenlesbar. Screenreader orientieren ihre Nutzenden, indem sie regelmäßig die Position in der Liste ansagen („Element 3 von 7“).</li></ol> <p>&nbsp;&nbsp;&nbsp;3. Ein Satz mit einer vorangestellten Zahl wie dieser rückt dagegen seine zweite Zeile beim Umbruch nicht ein und wird für Screenreader-Nutzende nicht bei der Anzahl der Einträge mitgezählt.</p></div>`,

	QA_IN_PAGE_LINK: `<p><strong>URL:</strong> <i>#%(ID)</i></p><p><strong>Link:</strong> <code>%(TEXT)</code></p><p>Das Linkziel entspricht keinem Element auf dieser Seite.</p><div class="why"><p>Hinweis für die Entwicklung: Wenn dies kein normaler Link ist und das Linkziel ein Platzhalter für ein JavaScript-Ereignis ist, testen Sie, ob der Link auch beim Klicken per Tastatur funktioniert, bevor Sie ihn zur Ignorierliste des Prüfwerkzeugs hinzufügen.</p></div>`,

	QA_JUSTIFY: `<p>Blocksatz fügt zusätzliche Leerräume ein, um Absätze sowohl am linken als auch am rechten Rand auszurichten. Die von Zeile zu Zeile unregelmäßigen Lücken erschweren vielen Menschen das Lesen.</p><p>${why.fix}Verwenden Sie linksbündigen Text.</p>`,

	QA_NESTED_COMPONENTS: 'Vermeiden Sie es, interaktive Layout-Komponenten zu verschachteln, z. B. Akkordeons in anderen Akkordeons oder Tabs in Akkordeons und umgekehrt. Das kann die Navigation erschweren, die kognitive Belastung erhöhen und dazu führen, dass Inhalte übersehen werden.',

	QA_PDF: `<p><strong>Link:</strong> <i>%(TEXT)</i></p><p>${why.fix}Tun Sie eines der Folgenden:</p><ul><li>Verlinken Sie stattdessen auf eine Webseite,</li><li>verlinken Sie <em>zusätzlich</em> auf eine Webseite oder ein bearbeitbares Dokument, sodass dieses PDF nur die „druckbare“ Variante ist, oder</li><li>stellen Sie zumindest sicher, dass dieses PDF mit Screenreadern lesbar ist, indem Sie <a href='https://webaim.org/techniques/acrobat/' target='_blank'>manuell prüfen, ob es getaggt wurde</a>: mit Überschriften, Lesereihenfolge der Spalten, Tabellenköpfen und Alt-Text.</li></ul><div class="why"><p>Tipp: Nutzende von Mobilgeräten und Hilfstechnologien bevorzugen fast ausnahmslos Webseiten gegenüber PDFs. PDFs passen sich nicht an Mobilgeräte an (kein Umfließen) und haben oft nicht die Tags, die für die Navigation im Text mit Screenreadern nötig sind.</p></div>`,

	QA_SMALL_TEXT: `<p><strong>Text:</strong> <i>%(TEXT)</i></p><p>${why.fix}Bleiben Sie über 80 % der Standard-Schriftgröße. Kleiner Text ist schwer lesbar, besonders für Menschen mit Sehbeeinträchtigung.</p>`,

	QA_STRONG_ITALICS: `<p><strong>Text:</strong> <i>%(TEXT)</i></p><p>${why.fix}Verwenden Sie Fett- und Kursivschrift nur für Schlüsselwörter und wichtige Formulierungen.</p><div class="why"><p>Hinweis: Wenn es sich um ein Zitat handelt, kann es mit dem <code>blockquote</code>-Tag abgesetzt werden.</p></div>`,

	QA_SUBSCRIPT: `<p><strong>Text:</strong> <i>%(TEXT)</i></p><p>Hoch- und Tiefstellung machen Text für viele Menschen zu klein, um ihn gut lesen zu können. Sie sollten nur für einzelne Wörter oder Ausdrücke verwendet werden, etwa für Maßeinheiten (m<sup>2</sup>), chemische Formeln (H<sub>2</sub>O) und Verweise auf Fußnoten.</p>`,

	QA_UNDERLINE: `<p>Unterstrichener Text im Web wird für Links verwendet, nicht zur Hervorhebung. Nutzende werden denken, dass sie hierauf klicken können: <i><u>%(TEXT)</u></i></p><p>${why.fix}Verwenden Sie <strong>Fettschrift</strong> oder <em>Kursivschrift</em> zur Hervorhebung und Überschriften für die Struktur.</p><div class="why"><p>Hinweis: Screenreader sagen rein visuelle Formatierungen wie Unterstreichungen nicht an. Nur Überschriften fügen der Seitenstruktur Text hinzu.</p></div>`,

	QA_UPPERCASE: `<p><strong>Text:</strong> <i>%(TEXT)</i></p><p>${why.fix}Schreiben Sie nur wenige Wörter zur Hervorhebung groß. GROSSGESCHRIEBENE TEXTBLÖCKE SIND SCHWERER LESBAR, UND VIELE LESENDE EMPFINDEN SIE ALS „SCHREIEN“.</p><div class="why"><p>Hinweis: Screenreader kündigen rein visuelle Formatierungen wie Großbuchstaben nicht an. Nutzen Sie stattdessen einen Überschriftenstil, wenn dieser hervorgehobene Text einen Themenwechsel oder besonders wichtige Inhalte einleitet.</p></div>`,

	SUS_ALT: `<p>Der Alt-Text dieses Bildes enthält das Wort „<i>%(alt)</i>“. Screenreader kündigen bereits an, dass sie ein Bild beschreiben, daher sind Formulierungen wie „Bild von“ und „Foto von“ meist überflüssig.</p><p><strong>Alt-Text:</strong> <i>%(ALT_TEXT)</i></p><p>${why.fix}Beschreiben Sie kurz, was dieses Bild in diesem Kontext bedeutet.</p><div class="why"><p>Tipp: Diese Formulierungen sollten Sie beibehalten, wenn das Format selbst bedeutsam ist:<br>„Ein Foto einer Katze, gerahmt an der Wand hängend.“</p></div>`,

	TABINDEX_ATTR: `<p>Tabindex-Werte größer als 0 verschieben fokussierbare Elemente aus ihrer visuellen Reihenfolge heraus, was es Nutzenden von Hilfstechnologien erschwert, sie zu finden und zu bedienen.</p><p>${why.fix}Ordnen Sie stattdessen die HTML-Elemente so um, dass Fokusreihenfolge und Lesereihenfolge übereinstimmen.</p><div class="why"><p>Tipp: Die visuelle Reihenfolge der Wörter auf der Seite und die Reihenfolge, in der Tastaturen die Elemente durchlaufen, sind in der Regel dieselbe.</p><p>Ein positiver tabindex-Wert setzt ein Element an den Anfang der Tab-Reihenfolge, <strong>aber nicht an den Anfang der visuellen oder der Lesereihenfolge</strong>.</p></div>`,

	TABLES_EMPTY_HEADING: `<p>${why.fix}Sorgen Sie dafür, dass jede Kopfzelle Text enthält.</p><div class="why"><p>Tipp: Screenreader nutzen Tabellenköpfe, um Nutzende beim Erkunden einer Tabelle zu orientieren. Der zugehörige Tabellenkopf wird jeweils wiederholt, wenn der Cursor eine neue Spalte oder Zeile erreicht.</p></div>`,

	TABLES_INVALID_HEADERS_REF: `<p>Diese Tabelle versucht, eine bestimmte Datenzelle mit einer bestimmten Kopfzelle zu verknüpfen, aber die ID der Kopfzelle ist nicht auffindbar: <code>%(VALUE)</code>.</p><p>${why.fix}Stellen Sie sicher, dass jedes <code>headers</code>-Attribut der ID einer Kopfzelle in derselben Tabelle entspricht.</p><div class="why">Tipp: <a href="https://www.w3.org/WAI/WCAG22/Techniques/html/H43">Die manuelle Verwendung von ID-Referenzen</a>, um Datenzellen mit Kopfzellen zu verknüpfen, ist aufwendig und fehleranfällig. Teilen Sie nach Möglichkeit komplexe Daten in kleinere Tabellen mit einfachen Kopfzeilen und -spalten auf.</div>`,

	TABLES_MISSING_HEADINGS: `<p>${why.fix}Bearbeiten Sie die Tabelleneigenschaften und legen Sie fest, ob sich Tabellenköpfe in der ersten Zeile, der ersten Spalte oder in beiden befinden.</p><div class="why"> <p>Tipp: Screenreader nutzen Tabellenköpfe, um Nutzende beim Erkunden einer Tabelle zu orientieren. Der zugehörige Tabellenkopf wird jeweils wiederholt, wenn der Cursor eine neue Spalte oder Zeile erreicht.</p><p>Wenn diese Tabelle keine Tabellenköpfe hat, weil sie nur für das visuelle Layout verwendet wird, entfernen Sie die Tabellenformatierung und verwenden Sie stattdessen eine rein visuelle Spaltenformatierung.</p></div> `,

	TABLES_SEMANTIC_HEADING: `<p>${why.fix}Entfernen Sie diese Überschriften-Formatierung (h2, h3). Verwenden Sie stattdessen Kopfzeilen und Kopfspalten. Wenn Sie mehrere Kopfzeilen benötigen, teilen Sie die Tabelle in mehrere Tabellen auf.</p><div class="why"> <p>Tipp: Tabellenköpfe sind gerichtet: Sie gelten für eine Zeile oder Spalte. Inhaltsüberschriften beschriften den gesamten nachfolgenden Text, auch in Spalten, die nichts damit zu tun haben:</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Ein <strong>Tabellenkopf</strong> in Zelle 2 beschriftet Zelle B. <br><br> Eine <strong>Inhaltsüberschrift</strong> in Zelle 2 beschriftet die Zellen 3, A, B und C sowie diesen Text und die Fußzeile dieses Tooltips.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,
}

const interfaceStrings = {
	ALERT_CLOSE: 'Schließen',
	ALT: 'Alt-Text: ',
	CONSOLE_ERROR: 'Es gibt ein Problem mit dem Barrierefreiheitsprüfer auf dieser Seite. Bitte <a class="g-link">melden Sie es auf GitHub</a>. Debug-Informationen:',
	DECORATIVE: 'Als dekorativ markiert',
	DISMISS: 'Ignorieren',
	DISMISS_ALL: 'Auf dieser Seite: ignorieren',
	edit_page: 'Seite bearbeiten',
	edit_layout: 'Layout bearbeiten',
	edit_media: 'Medium bearbeiten',
	edit_term: 'Begriff bearbeiten',
	edit_user: 'Benutzer bearbeiten',
	IMAGES: 'Alt-Text',
	MAIN_TOGGLE_LABEL: 'Barrierefreiheits-Werkzeuge ein- oder ausblenden',
	MISSING: '(fehlt!)',
	NOT_VISIBLE: 'Hinweis: Dieser Inhalt ist möglicherweise nicht sichtbar. Suchen Sie ihn im umrandeten Container.',
	NO_IMAGES: 'Keine Bilder gefunden.',
	OUTLINE: 'Überschriften',
	PANEL_DISMISS_BUTTON: `%(dismissCount) ausgeblendete Meldungen anzeigen`,
	PANEL_HEADING: 'Visualisierungen anzeigen',
	SKIP_TO_ISSUE: 'Meldung anzeigen',
	WARNING: 'Manuelle Prüfung',
	WARNINGS: 'manuelle Prüfungen',
	buttonFirstContent: 'Erste Meldung anzeigen',
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
	errorOutlinePrefixHeadingIsLong: '(wegen Länge markiert)',
	errorOutlinePrefixSkippedLevel: '(wegen übersprungener Ebene markiert)',
	issueContent: 'Inhaltsproblem',
	issueDeveloper: 'Entwicklungsproblem',
	issueTemplate: 'Vorlagenproblem',
	main_toggle_hide: 'Barrierefreiheits-Werkzeuge ausblenden',
	main_toggle_hide_alerts: 'Barrierefreiheits-Meldungen ausblenden',
	main_toggle_show: 'Barrierefreiheits-Werkzeuge anzeigen',
	main_toggle_show_alerts: 'Barrierefreiheits-Meldungen anzeigen',
	main_toggle_1: 'Eine Barrierefreiheits-Meldung',
	main_toggle_2: 'Zwei Barrierefreiheits-Meldungen',
	main_toggle_plural: ` Barrierefreiheits-Meldungen`,
	MISSING_ROOT: `Editoria11y hat keine Elemente gefunden, die der Konfiguration des Prüfbereichs entsprechen: <code>%(root)</code>`,
	panelCheckAltText: `Prüfen Sie, ob jedes Bild beschreibt, was es im Kontext bedeutet, und ob es keine Bilder von Text gibt.`,
	panelCheckOutline: `Hier wird die Überschriftenstruktur angezeigt. Prüfen Sie, ob sie der visuellen Gliederung des Inhalts entspricht.`,
	PANEL_HEADING_MISSING_ONE: 'Überschrift 1 fehlt.',
	PANEL_NO_HEADINGS: 'Keine Überschriften gefunden.',
	reportsLink: 'Website-Berichte öffnen',
	toggleDisabled: 'Für Editoria11y ist kein prüfbarer Inhalt verfügbar.',
	transferFocus: 'Diesen Inhalt bearbeiten',
	unDismissHideButton: 'Diese ignorierte Meldung wiederherstellen',
	unDismissNotePermissions: 'Diese Prüfung wurde von der Administration ausgeblendet',
	unDismissOKButton: 'Diese als OK markierte Meldung wiederherstellen',
};

export const lang = {
	strings: Object.assign(Sa11yStrings.strings, interfaceStrings, tips),
	testNames: testNames,
	ruleset: Sa11yStrings.ruleset,
}
