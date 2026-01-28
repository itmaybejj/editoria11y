import strings from '../sa11y-lang/de.js';
// Machine translation.

export const testNames = {
	ALT_FILE_EXT: 'Dieser Alt‑Text ist ein Dateiname, keine Beschreibung',
	ALT_MAYBE_BAD: 'Dieser Alt‑Text kann von einem Screenreader nicht ausgesprochen werden',
	ALT_PLACEHOLDER: 'Dieser Alt‑Text ist ein bedeutungsloser Platzhalter',
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
	LABELS_PLACEHOLDER: 'Manuelle Prüfung: Platzhaltertext',
	LABELS_INPUT_RESET: 'Wird diese „Zurücksetzen“‑Schaltfläche benötigt?',
	LABEL_IN_NAME: 'Sichtbare Beschriftung stimmt nicht mit der unsichtbaren überein',
	LINK_ALT_FILE_EXT: 'Als Link verwendeter Alt‑Text sollte keine URL sein',
	LINK_ALT_MAYBE_BAD: 'Dieser verlinkte Alt‑Text kann von einem Screenreader nicht ausgesprochen werden',
	LINK_ALT_UNPRONOUNCEABLE: 'Verlinkte Bilder benötigen aussprechbaren Alt‑Text',
	LINK_CLICK_HERE: 'Manuelle Prüfung: Link enthält „Hier klicken“',
	LINK_DOI: 'Artikel sollten über ihren Titel verlinkt werden, nicht über DOI‑Nummern',
	LINK_EMPTY: 'Dieser Link hat keinen Text',
	LINK_EMPTY_LABELLEDBY: 'Link mit ungültigem „aria‑labelledby“‑Attribut',
	LINK_EMPTY_NO_LABEL: 'Dieser Link benötigt eine Beschriftung',
	LINK_FILE_EXT: 'Link führt zu einer Datei ohne vorherigen Hinweis',
	LINK_IDENTICAL_NAME: 'Beschreibt dieser Link sein Ziel eindeutig?',
	LINK_IMAGE_ALT: 'Manuelle Prüfung: verlinktes Bild mit Alt‑Text',
	LINK_IMAGE_ALT_AND_TEXT: 'Ergibt dieser Alt‑Text im Kontext dieses Links Sinn?',
	LINK_IMAGE_LONG_ALT: 'Kann dieser verlinkte Alt‑Text kürzer sein?',
	LINK_IMAGE_NO_ALT_TEXT: 'Dieses verlinkte Bild benötigt Alt‑Text',
	LINK_IMAGE_TEXT: 'Manuelle Prüfung: Bild in einem Link als dekorativ markiert.',
	LINK_NEW_TAB: 'Öffnet dieser Link eine neue Registerkarte ohne Hinweis?',
	LINK_PLACEHOLDER_ALT: 'Dieses verlinkte Bild benötigt aussagekräftigen Alt‑Text',
	LINK_STOPWORD: 'Beschreibt dieser Link sein Ziel?',
	LINK_STOPWORD_ARIA: 'Aussagekräftiger Linktext ist nur für Screenreader‑Nutzende verfügbar',
	LINK_SUS_ALT: 'Beschreibt dieser Alt‑Text das Bild oder den Link?',
	LINK_SYMBOLS: 'Manuelle Prüfung: Sind die Symbole oder Emojis in diesem Link sinnvoll?',
	LINK_URL: 'Linktext sollte keine URL sein',
	META_LANG: 'Meta‑Tag für die Seitensprache fehlt',
	META_MAX: 'Meta‑Tag begrenzt die mögliche Textvergrößerung',
	META_REFRESH: 'Meta‑Tag aktualisiert die Seite automatisch',
	META_SCALABLE: 'Meta‑Tag verhindert die Vergrößerung von Text',
	META_TITLE: 'Meta‑Tag für den Seitentitel fehlt',
	MISSING_ALT: 'Ungültiges HTML: Bild ohne Alt‑Attribut',
	MISSING_ALT_LINK: 'Ungültiges HTML: verlinktes Bild ohne Alt‑Attribut',
	MISSING_ALT_LINK_HAS_TEXT: 'Ungültiges HTML: Bild im Link ohne Alt‑Attribut',
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
	TABINDEX_ATTR: 'Das tabindex‑Attribut stört die Lesereihenfolge',
	TABLES_EMPTY_HEADING: 'Diese Tabellenkopfzelle benötigt Text',
	TABLES_MISSING_HEADINGS: 'Dieser Tabelle fehlen Kopfzeilen in Zeile und/oder Spalte',
	TABLES_SEMANTIC_HEADING: 'Inhaltsüberschriften gehören nicht in Tabellen',
	UNCONTAINED_LI: 'Ungültige HTML‑Liste',
};

const why = {
	fix: `<strong class="badge">So beheben</strong>`,
	check: `<strong class="badge">Manuelle Prüfung</strong>`,

	buttons: `<div class="why"><p>Hinweis: Der zugängliche Name einer Schaltfläche muss klar sagen, was sie tut. Schaltflächen, die sich beim Klicken ändern, müssen auch ihren Namen ändern:</p><ul>
<li>Wechselnde Beschriftungen:<br>„Wiedergabe/Pause“, „Details anzeigen/Details ausblenden“</li>
<li>Wechsel von <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">Zustandsattributen</a>:<br>„Wiedergabe/Wiedergabe, gedrückt“, „Details, eingeklappt/Details, ausgeklappt.“</li>
</ul>
<p>Ändern Sie nicht beides gleichzeitig. „Wiedergabe“ zu „Pause, gedrückt“ bedeutet, dass der Player pausiert – nicht, dass er abspielt!</p></div>`,

	headings: `<div class="why"><p>Tipp: Überschriften und Unterüberschriften ordnen Inhalte in eine verschachtelte Struktur. Screenreader‑Nutzende verlassen sich darauf, um Seiten zu verstehen und zu navigieren:</p>
<ul><li>Überschrift Ebene 1: Seitentitel
<ul><li>Überschrift Ebene 2: Hauptthemen
<ul><li>Überschrift Ebene 3: Unterthemen</li></ul></li></ul></li></ul></div>`,

	images: `<div class="why"><p>Tipp: Beschreiben Sie beim Schreiben von Alt‑Text, was ein Bild <em>bedeutet</em>, nicht nur, was darauf zu sehen ist. Je nach Kontext kann ein Foto eines Kindes, das einen Ball tritt, bedeuten:</p>
<ul><li>Sie spielten im strömenden Regen.</li>
<li>Die neuen Trikots haben coole Drachen‑Logos.</li>
<li>Sie schoss das spielentscheidende Tor von der linken Seitenlinie!</li></ul></div>`,

	links: `<div class="why"><p>Nutzende überfliegen Seiten oft über die Links und nutzen die Seitensuche, um Links beim Namen zu finden. Effektive Links sind daher aussagekräftig, eindeutig und prägnant:</p>
<ul>
<li>Ideal: „Mehr erfahren über https://webaim.org/techniques/hypertext/link_textaussagekräftige Links</a>“</li>
<li>Nicht eindeutig: „Klicken Sie https://webaim.org/techniques/hypertext/link_texthier</a>, um mehr über aussagekräftige Links zu erfahren.“</li>
<li>Nicht prägnant: „https://webaim.org/techniques/hypertext/link_texthier klicken, um mehr über aussagekräftige Links zu erfahren</a>“</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>Der Zweck von Alt‑Text ist, die <em>Bedeutung</em> eines Bildes zu vermitteln, nicht nur dessen Inhalt. Bei einem verlinkten Bild ist die Bedeutung das Linkziel:
<ul>
<li>„<em>Eine Lupe</em>“ beschreibt ein Bild, nicht einen Link.</li>
<li>„<em>Eine Such‑Lupe</em>“ beschreibt verwirrend beides.</li>
<li>„<em>Suchen</em>“ beschreibt das Linkziel korrekt.</li>
</ul></p></div>`,
};

export const tips = {
	ALT_FILE_EXT: `<p>Screenreader lesen diese URL vor – oft Buchstabe für Buchstabe. Das vermittelt kaum die gleiche Bedeutung wie das Bild selbst.</p><p>${why.fix}Fügen Sie entweder ein leeres alt (alt="") hinzu, wenn dies eine bedeutungslose Dekoration ist, die ignoriert werden soll, oder fügen Sie einen beschreibenden Alt‑Text hinzu.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Angegebene Beschreibung für dieses Bild: <strong>"%(alt)"</strong></p><p>${why.fix}Geben Sie einen kurzen Alt‑Text an, der beschreibt, was dieses Bild in diesem Kontext bedeutet.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Angegebene Beschreibung für dieses Bild: <strong>"%(alt)"</strong></p><p>${why.fix}Geben Sie einen kurzen Alt‑Text an, der beschreibt, was dieses Bild in diesem Kontext bedeutet.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>Der Alt‑Text dieses Bildes lautet „%(alt)“ und enthält nur unaussprechliche Zeichen oder Leerzeichen. Screenreader kündigen ein Bild an und halten dann peinlich inne: „Bild: ____.“</p><p>${why.fix}Fügen Sie einen beschreibenden Alt‑Text hinzu – oder lassen Sie den Alt‑Text <em>vollständig</em> leer (alt=""), wenn es sich nur um ein Icon/Abstandshalter handelt, der ignoriert werden soll.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Verwenden Sie eine gültige Methode, um Screenreadern mitzuteilen, was diese Schaltfläche tut – z. B. Text, Alt‑Text auf einem Icon oder ein <code>title</code>‑Attribut.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Diese Schaltfläche verwendet ein <code>aria-labelledby</code>, das leer ist oder keinem vorhandenen <code>ID</code> auf der Seite entspricht.</p><p>${why.fix}Stellen Sie die Verbindung zu einem Element mit passender ID her oder entfernen Sie das Attribut und beschreiben Sie die Schaltfläche anders.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'Ein Hintergrundbild oder Farbverlauf verhindert, dass dieses Tool die tatsächliche Hintergrundfarbe sicher bestimmen kann. Nutzen Sie den Farbwähler unten für eine manuelle Prüfung.',

	DUPLICATE_ID: `<p>IDs werden auf dieser Seite für Beschriftungen oder Linkziele verwendet und müssen daher eindeutig sein.</p><p>${why.fix}Ändern Sie diese ID: <strong>#%(id)</strong></p><div class="why"><p>In vielen CMS stammt sie aus einem Feld „name“ oder „id“. In HTML ist sie ein Attribut: <code><a id="MY-ID"></a></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Löschen Sie das <code>title</code>‑Attribut dieses Links.</p><div class="why"><p>Hinweis: <code>title</code>‑Tooltips erscheinen nur beim Maus‑Hover. Auf Mobilgeräten oder per Tastatur sind sie nicht sichtbar und sollten daher keine wichtigen Informationen enthalten.</p></div>`,

	EMBED_AUDIO: `<p>Wenn dieses Audio Sprache enthält, muss eine <a href="https://www.w3.org/WAI/media/av/transcribing/">Textalternative</a> auf dieser Seite bereitgestellt oder verlinkt werden.</p><p>Automatisch erzeugte Transkriptionen/Untertitel müssen von Menschen geprüft werden (Sprecher, relevante Geräusche).</p>`,

	EMBED_DATA_VIZ: `<p>Eingebettete Visualisierungen sind häufig schwer oder gar nicht mit Hilfstechnologien bedienbar, können für Menschen mit Sehbeeinträchtigung schwer verständlich sein und erfordern auf Mobilgeräten oft horizontales Scrollen.</p><p>${why.fix}Wenn diese Einbettung keinen hohen Kontrast hat, nicht per Tastatur bedienbar <strong><em>und</em></strong> nicht sinnvoll von Screenreadern beschrieben werden kann, fügen Sie eine gleichwertige Alternative hinzu (Textbeschreibung, Datentabelle, Download) und schließen Sie dann diesen Hinweis.</p>`,

	EMBED_GENERAL: 'Automatisierte Prüfungen können Inhalte innerhalb von Einbettungen nicht analysieren. Stellen Sie sicher, dass alle Bilder Alt‑Text haben, Videos Untertitel besitzen, Text ausreichenden Kontrast hat und Links/Buttons <a href="https://webaim.org/techniques/keyboard/">tastaturbedienbar</a> sind – und schließen Sie dann den Hinweis.',

	EMBED_MISSING_TITLE: `<p>Eingebettete Inhalte benötigen einen zugänglichen Namen, der ihr Inhalt/Zweck für Screenreader beschreibt.</p><p>${why.fix}Fügen Sie ein eindeutiges <code>title</code>‑ oder <code>aria-label</code>‑Attribut hinzu.</p>`,

	EMBED_UNFOCUSABLE: `Dieses Attribut weist Tastatur und Hilfstechnologien an, das Element zu überspringen. Wenn der iFrame Links, Buttons oder Formulare enthält oder scrollbar ist, entfernen Sie dieses Attribut.`,

	EMBED_VIDEO: `<p>Videos müssen Untertitel enthalten.</p><p>Automatische Untertitel brauchen menschliche Korrektur (Sprecher, relevante Geräusche).</p><p>${why.fix}Untertitel hinzufügen/prüfen und den Hinweis schließen.</p>`,

	HEADING_EMPTY: `<p>Leere Überschriften erzeugen Lücken in der Seitenstruktur.</p><p>${why.fix}Text hinzufügen oder die leere Zeile entfernen.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Leere Überschriften erzeugen Lücken in der Seitenstruktur.</p><p>${why.fix}Wenn dies keine Überschrift ist, ändern Sie das Format von <strong {C}>Überschrift %(level)</strong> zu <strong>Absatz</strong>. Andernfalls gehört die Bildbedeutung in den Alt‑Text.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Stellen Sie sicher, dass der Seitentitel als Überschrift der Ebene 1 oder 2 ausgezeichnet ist. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}Wenn es kein feststehender Titel (z. B. Artikelname) ist, kürzen Sie ihn für besseres Überfliegen.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Versehen Sie den Seitentitel mit Ebene‑1‑Überschrift, um den Beginn der Dokumentstruktur zu markieren.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Diese Überschrift springt von <strong>Ebene %(prevLevel)</strong> zu <strong>Ebene %(level)</strong>. Für Screenreader klingt das, als fehle Inhalt.</p><p>${why.fix}Passen Sie die Ebenen an, damit die Struktur lückenlos ist.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: `Dieses interaktive Element hat <code>aria-hidden="true"</code>, ist aber weiterhin per Tastatur erreichbar. Wenn es wirklich verborgen sein soll, fügen Sie zusätzlich <code>tabindex="-1"</code> hinzu. Andernfalls entfernen Sie <code>aria-hidden</code>.`,

	IMAGE_ALT_TOO_LONG: `<p>Alt‑Text wird als zusammenhängender Satz vorgelesen; wer etwas verpasst, muss alles erneut hören.</p><p>Dieser Alt‑Text hat %(altLength) Zeichen: <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Tipp: Komplexe Bilder brauchen meist eine <strong>sichtbare</strong> Bildunterschrift oder alternative Beschreibung. Es ist okay, im Alt‑Text darauf zu verweisen:</p><ul><li>„Poster für den Tanz am Freitag; Details in der Bildunterschrift.“</li><li>„Diagramm: Fälle −10 % dieses Jahr; Details in der Tabelle.“</li></ul></div>`,

	IMAGE_DECORATIVE: `<p>Dieses Bild wurde mit leerem Alt‑Text für Screenreader ausgeblendet. Nur bedeutungslose Bilder (redundante Icons, Texturen) sollten so ausgeblendet werden.</p><p>${why.fix}Wenn das Bild inhaltlichen Wert hat, geben Sie Alt‑Text an.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'Das Bild ist als <strong>dekorativ</strong> markiert, aber in Karussells/Galerien sollten alle Bilder beschreibenden Alt‑Text haben.',

	IMAGE_FIGURE_DECORATIVE: `<p>Dieses Bild wird von Hilfstechnologien ignoriert. Ergibt die Bildunterschrift ohne das Bild Sinn?</p><p>${why.fix}Wenn nicht, ergänzen Sie im Alt‑Text, was die Bildunterschrift nicht abdeckt.</p><div class="why"><p>Tipp: Bilder, Alt‑Texte und Bildunterschriften wirken zusammen:</p><ul><li>Bildunterschriften geben Kontext/Deutung.</li><li>Alt‑Texte beschreiben das Bild für Menschen, die es nicht sehen.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Passen Sie den Alt‑Text so an, dass er die visuelle Bedeutung beschreibt.</p><div class="why"><p>Tipp: Bilder, Alt‑Texte und Bildunterschriften wirken zusammen:</p><ul><li>Bildunterschriften liefern Kontext und Interpretation.</li><li>Alt‑Texte beschreiben das Bild für Menschen, die es nicht sehen.</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: `<p><strong {B}>Unsichtbare Feldbezeichnung:</strong> <strong {C}>%(TEXT)</strong></p><p>Stellen Sie sicher, dass es eine sichtbare Beschriftung gibt, dass sie beim Eintippen sichtbar bleibt und der unsichtbaren Bezeichnung entspricht.</p><div class="why"><p>Platzhalter oder Titel verschwinden beim Tippen; das erschwert die Kontrolle und macht es leicht, die unsichtbare Bezeichnung zu vergessen.</p></div>`,

	LABELS_INPUT_RESET: `<p>„Zurücksetzen“‑Buttons werden leicht versehentlich ausgelöst und führen zu Datenverlust.</p><p>${why.fix}Wenn nicht nur ein einzelnes Feld zurückgesetzt wird, entfernen Sie den Button oder fordern Sie eine Bestätigung an.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'Bild‑Buttons benötigen Alt‑Text. Fügen Sie z. B. <em>Suchen</em> oder <em>Senden</em> hinzu.',

	LABELS_MISSING_LABEL: 'Dieses Eingabefeld hat keine zugeordnete Beschriftung. Fügen Sie ein <code>id</code> hinzu und verwenden Sie am Label ein passendes <code>for</code>.',

	LABELS_NO_FOR_ATTRIBUTE: 'Dieses Feld hat keine zugeordnete Beschriftung. Fügen Sie dem Label ein <code>for</code> hinzu, das dem <code>id</code> des Feldes entspricht.<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>Platzhalter verschwinden beim Tippen und haben oft zu wenig Kontrast – oder so viel, dass sie wie Inhalt wirken.</p><p>${why.fix}Sorgen Sie dafür, dass wichtige Informationen (Label, Hilfe, Format) sichtbar bleiben und erwägen Sie, auf Platzhalter zu verzichten.</p>`,

	LABEL_IN_NAME: `<p>Der sichtbare Text scheint vom zugänglichen Namen abzuweichen. Das kann Screenreader‑Nutzende verwirren und die Sprachsteuerung beeinträchtigen.</p><p>${why.check}Stellen Sie sicher, dass das sichtbare Label mit dem unsichtbaren beginnt und keine zusätzliche Bedeutung hinzufügt.</p><p><strong>Unsichtbares Label:</strong> „%(TEXT)“</p>`,

	LINK_ALT_FILE_EXT: `<p>Der Alt‑Text dieses Bildes enthält „%(alt)“ – wahrscheinlich ein Dateiname statt einer sinnvollen Linkbezeichnung.</p><p>${why.fix}Setzen Sie den Alt‑Text auf den Namen des Linkziels.</p><div class="why"><p>Alt‑Text spiegelt Bedeutung, nicht Rohinhalt. Bei verlinkten Bildern ist das die Linkdestination:</p><ul><li>„Seite mit Text“ beschreibt das Bild, nicht den Link.</li><li>„IMG_1234.jpg“ ist nur ein Dateiname.</li><li>„<strong><em>Anmeldeformular (doc)</em></strong>“ ist eine sinnvolle Linkdestination.</li></ul></div>`,

	LINK_ALT_MAYBE_BAD: `<p>Der Alt‑Text dieses Bildes ist ein Platzhalter: „<strong>%(alt)</strong>“.</p><p>${why.fix}Setzen Sie den Alt‑Text auf das Linkziel.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>Der Alt‑Text dieses verlinkten Bildes enthält nur unaussprechliche Symbole/Leerzeichen: „%(ALT_TEXT)“; der Link kann nicht beschrieben werden.</p><p>${why.fix}Setzen Sie den Alt‑Text auf Linkziel oder ‑zweck.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `Die Formulierungen „klicken“/„hier klicken“ sind überflüssig und lenken vom Linkzweck ab.`,

	LINK_DOI: `<p>${why.fix}Verlinken Sie den Artikeltitel und geben Sie die DOI‑Nummer im Klartext an, nicht umgekehrt.</p><div class="why"><p>Beschreibende Links erleichtern das Scannen nach Titeln; so werden passende Inhalte besser gefunden.</p><p>Screenreader können so sinnvolle Links ansagen statt bedeutungsloser Zahlenreihen.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Fügen Sie beschreibenden Text hinzu oder löschen Sie den Link, wenn er versehentlich entstanden ist (z. B. verlinktes Leerzeichen).</p><div class="why"><p>Leere Links führen zu Stille oder zur buchstabenweisen URL‑Ansage.</p><p>Verlinkte Leerzeichen sind teils schwer zu löschen; nötig ist oft das Neuschreiben der umgebenden Worte.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>Dieses <code>aria-labelledby</code> verweist auf kein vorhandenes <code>ID</code>.</p><p>${why.fix}Hinterlegen Sie eine gültige ID oder entfernen Sie das Attribut.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Fügen Sie beschreibenden Text hinzu oder löschen Sie den versehentlichen Link.</p><div class="why"><p>Leere Links können nicht sinnvoll angekündigt werden.</p><p>Oft hilft es, das umgebende Textfragment neu zu schreiben.</p></div>`,

	LINK_FILE_EXT: `<p>Dieser Link führt zu einer Datei (z. B. PDF, MP3, Zip, Word) ohne Hinweis.</p><p>${why.fix}Geben Sie im Linktext den Dateityp an – z. B. mit Text oder Symbol (<a href="https://itmaybejj.github.io/linkpurpose/">Beispiele</a>).</p><p class="why">Bei großen Dateien nennen Sie die Größe, z. B. „Jahresbericht (PDF, 3 MB)“.</p>`,

	LINK_IDENTICAL_NAME: `<p>Mehrere Links mit unterschiedlichen Zielen nutzen denselben Text: „<strong>%(TEXT)</strong>“.</p><p>${why.fix}Formulieren Sie um, sodass der Text das spezifische Ziel eindeutig beschreibt.</p>${why.links}`,

	LINK_IMAGE_ALT: `Stellen Sie sicher, dass dieser Alt‑Text das Linkziel beschreibt:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Prüfen Sie, dass der Alt‑Text das Linkziel mit beschreibt, ohne redundante Inhalte hinzuzufügen:</p><p><strong class="badge">Alt</strong> „<em><strong>%(alt)</strong></em>“</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p><a href="https://webaim.org/techniques/hypertext/link_text#alt_link">Der Alt‑Text eines verlinkten Bildes beschreibt das Linkziel</a>. Links sollten kurz und klar sein; langer Alt‑Text deutet oft darauf hin, dass das Bild statt der Linkdestination beschrieben wird.</p>Dieser Alt‑Text hat %(altLength) Zeichen: <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Wenn ein Link ein Bild enthält, dient dessen Alt‑Text <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">als Linktitel für Screenreader</a>.</p><p>${why.fix}Setzen Sie den Alt‑Text auf Linkziel oder ‑zweck.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'Das Bild ist als dekorativ markiert, obwohl der umgebende Text als Linkbeschriftung dient.',

	LINK_NEW_TAB: `<p>${why.fix}Öffnen Sie den Link im selben Tab oder <a href="https://itmaybejj.github.io/linkpurpose/">warnen Sie vorab</a>.</p><div class="why"><p>Nutzende können selbst in neuem Tab öffnen; erzwungenes Verhalten ist oft verwirrend – besonders wenn die Zurück‑Taste „nicht mehr funktioniert“.</p><p>Ausnahme: In Formularen öffnen Links oft in neuem Tab, um Datenverlust zu vermeiden.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>Der Alt‑Text dieses verlinkten Bildes ist ein Platzhalter: „<strong>%(alt)</strong>“.</p><p>${why.fix}Setzen Sie den Alt‑Text auf die Linkdestination.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Der Link enthält Text, der das Ziel nicht beschreibt:<br><strong>%(text)</strong></p><p>${why.fix}Formulieren Sie ihn so um, dass er Ziel oder Zweck knapp beschreibt.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>Es existiert ein ARIA‑Name, aber der sichtbare/auffindbare Linktext ist generisch: „<strong {C}>%(ERROR)</strong>“.</p><p>${why.fix}Schreiben Sie aussagekräftige Links für alle und gleichen Sie sichtbare Beschriftung und zugänglichen Namen an.</p>${why.links}`,

	LINK_SUS_ALT: `<p>Der Alt‑Text enthält das Wort „%(alt)“, was darauf hindeutet, dass nicht die Linkdestination beschrieben wird.</p><strong class="badge">Alt‑Text</strong> „%(ALT_TEXT)“<p>So beheben: Stellen Sie sicher, dass der Alt‑Text Ziel oder Zweck des Links beschreibt.<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Vermeiden Sie Symbole als Call‑to‑Action im Linktext, außer sie sind für Hilfstechnologien verborgen. Screenreader lesen sie ggf. vor und verwirren. Entfernen Sie ggf.: <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Ersetzen Sie die URL durch den Titel des Ziels oder seinen Zweck.</p><div class="why"><p>Nutzende scannen Links nach Namen – Screenreader‑Nutzende besonders.</p><p>URLs als Linktext sind schwer zu scannen/zu finden.</p></div>`,

	META_LANG: `<p>${why.fix}Fügen Sie am HTML‑Tag der Seite ein <a href="https://www.w3.org/International/questions/qa-html-language-declarations">Sprachattribut</a> hinzu.</p><div class="why"><p>Tipp: Screenreader wählen die Aussprache nach Sprache. Falsche Sprache → unverständliche Ansagen.</p></div>`,

	META_MAX: `<p>Dieses Meta‑Tag begrenzt die Textvergrößerung.</p><p>${why.fix}Begrenzung entfernen oder anpassen, um Zoom zu erlauben.</p>`,

	META_REFRESH: `<p>Seiten sollten nicht per Meta‑Tag automatisch aktualisieren: Das unterbricht ohne Warnung und kann Formularangaben zurücksetzen.</p><p>${why.fix}Nutzen Sie AJAX oder JavaScript, damit vorher gewarnt werden kann und eine Verzögerung möglich ist.</p>`,

	META_SCALABLE: `<p>Dieses Meta‑Tag verhindert die Vergrößerung des Textes.</p><p>${why.fix}Erlauben Sie vollständigen Zoom durch Entfernen/Anpassen.</p>`,

	META_TITLE: `<p>${why.fix}Fügen Sie im <code><head></code> ein <code><title></code> hinzu.</p><div class="why"><p>Ein <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title">kurzer, eindeutiger Titel</a> ist wichtig:</p><ul><li>Suchmaschinen nutzen ihn als Ergebnis‑Titel.</li><li>Browser zeigen ihn auf Tabs.</li><li>Screenreader lesen ihn beim Tab‑Wechsel.</li></ul><p>Ohne Titel sehen/hören Nutzende nur die rohe URL.</p></div>`,

	MISSING_ALT: `<p>Ohne Alt‑Attribut lesen Screenreader die Bild‑URL vor, oft Buchstabe für Buchstabe.</p><p>${why.fix}Fügen Sie alt="" hinzu, wenn das Bild ignoriert werden soll, oder einen beschreibenden Alt‑Text.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Fehlt Alt am verlinkten Bild, lesen Screenreader die Bild‑URL – besonders problematisch.</p><p>${why.fix}Fügen Sie Alt‑Text hinzu, der die Linkdestination beschreibt.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Dieses Bild ist Teil eines Links mit Text. Wenn der sichtbare Text das Ziel beschreibt, setzen Sie alt="". Ansonsten fügen Sie einen Alt‑Text hinzu, der Ziel/Zweck beschreibt.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>Der Link scheint auf eine Entwicklungsumgebung zu verweisen:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Nutzen Sie einen relativen Pfad (/ordner) oder die öffentliche URL.</p>`,

	QA_BLOCKQUOTE: `<p><code>blockquote</code> signalisiert „Zitat“. Kurze „Zitate“ sind oft Überschriften.</p><p>${why.fix}Wenn es eine Überschrift ist, verwenden Sie Überschriften‑Formatierung, damit sie in der Struktur erscheint.</p>${why.headings}`,

	QA_DOCUMENT: `<p>Verlinkte Dokumente gelten als Web‑Inhalt und müssen ebenfalls barrierefrei sein. Prüfen Sie Überschriften, Tabellenköpfe und Alt‑Texte, und schließen Sie dann den Hinweis.</p><ul class="why"><li>Machen Sie Ihre <a href="https://support.google.com/docs/answer/6199477?hl=de">Google‑Dokumente/Präsentationen barrierefrei</a>.</li><li>Machen Sie Ihre <a href="https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office‑Dokumente barrierefrei</a>.</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}Wenn dieser fette Text ein Thema einleitet, ersetzen Sie die reine Fettsetzung durch ein Überschriften‑Format.</p><div class="why"><p>Tipp: Überschriften erzeugen ein navigierbares Inhaltsverzeichnis für Hilfstechnologien.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Wenn „%(text)“ Teil einer Liste ist, verwenden Sie Listenformatierung.</p><div class="why"><p>Listen sind visuell und semantisch strukturiert:</p><ol><li>Einheitliche Einzüge erleichtern das Lesen.</li><li>Screenreader geben die Position an („Eintrag 3 von 7“).</li></ol><p>Eine Zeile mit vorangestellter Zahl ist keine echte Liste.</p></div>`,

	QA_IN_PAGE_LINK: `<p>Das Linkziel entspricht keinem Element auf dieser Seite.</p><div class="why"><p>Hinweis für Entwickler: Wenn es ein JS‑Handler ist, testen Sie die Tastaturbedienung, bevor Sie den Check ignorieren.</p></div>`,

	QA_JUSTIFY: `<p>Blocksatz erzeugt unregelmäßige Lücken und erschwert das Lesen.</p><p>${why.fix}Verwenden Sie linksbündigen Text.</p>`,

	QA_NESTED_COMPONENTS: 'Vermeiden Sie verschachtelte interaktive Komponenten (z. B. Akkordeon in Akkordeon oder Tabs im Akkordeon). Das erschwert die Navigation und erhöht die kognitive Last.',

	QA_PDF: `<p>${why.fix}Tun Sie eines der Folgenden und schließen Sie den Hinweis:</p><ul><li>Verlinken Sie stattdessen auf eine Webseite,</li><li>oder bieten Sie zusätzlich eine Webseite/ ein bearbeitbares Dokument an,</li><li>oder stellen Sie mindestens sicher, dass das PDF getaggt ist (Überschriften, Lesereihenfolge, Tabellenköpfe, Alt‑Texte).</li></ul><div class="why"><p>Viele Nutzende – besonders mobil – bevorzugen Webseiten gegenüber PDFs, die nicht umfließen und oft Markup für die Barrierefreiheit missen.</p></div>`,

	QA_SMALL_TEXT: 'Zu kleine Schrift ist schwer lesbar – vermeiden Sie kleinere Größen als die Voreinstellung.',

	QA_STRONG_ITALICS: `<p>${why.fix}Setzen Sie fett/kursiv sparsam für Schlüsselwörter ein.</p><div class="why"><p>Hinweis: Für Zitate verwenden Sie <code>blockquote</code>.</p></div>`,

	QA_SUBSCRIPT: `Hoch‑/Tiefstellung macht Text klein und schwer lesbar. Nutzen Sie sie nur gezielt, z. B. 4<sup>te</sup>, H<sub>2</sub>O, Fußnotenzeichen.`,

	QA_UNDERLINE: `<p>Unterstrichenes bedeutet im Web meist „Link“. Nutzende erwarten Klickbarkeit.</p><p>${why.fix}Nutzen Sie <strong>fett</strong> oder <em>kursiv</em> für Betonung und Überschriften für Abschnittswechsel.</p><div class="why"><p>Screenreader kündigen rein visuelle Formatierungen nicht an; Struktur geben nur Überschriften.</p></div>`,

	QA_UPPERCASE: `<p>GROSSGESCHRIEBENE TEXTBLÖCKE SIND SCHWERER LESBAR UND WERDEN OFT ALS „SCHREIEN“ WAHRGENOMMEN.</p><p>${why.fix}Betonen Sie nur wenige Wörter auf einmal, vorzugsweise mit Fett statt Versalien.</p><div class="why"><p>Screenreader kündigen „fett“ nicht an. Nutzen Sie Überschriften für neue Themen.</p></div>`,

	SUS_ALT: `<p>Der Alt‑Text enthält „%(alt)“, was wahrscheinlich redundant ist:</p><p><strong class="badge">Alt‑Text</strong> „%(ALT_TEXT)“</p><p>So beheben: Formulieren Sie den Alt‑Text so, dass er die Bildbedeutung kurz vermittelt.</p><div class="why"><p>Tipp: Screenreader kündigen ein Bild bereits an – „Bild/Foto von …“ ist oft überflüssig.</p></div>`,

	TABINDEX_ATTR: `<p>${why.fix}Verwenden Sie nie ein tabindex größer als „0“. Ordnen Sie die HTML‑Elemente so, dass Tab‑, Lese‑ und visuelle Reihenfolge übereinstimmen.</p><div class="why"><p>Standardmäßig sind diese drei Reihenfolgen deckungsgleich.</p><p>Ein positives tabindex setzt ein Element an den Anfang der Tab‑Reihenfolge, <strong>nicht</strong> der visuellen; das führt zu Verwirrung.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Sorgen Sie dafür, dass jede Tabellenkopfzelle Text enthält.</p><div class="why"><p>Tipp: Screenreader nutzen Tabellenköpfe zur Orientierung in Tabellen.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Geben Sie in den Tabelleneigenschaften an, ob Kopfzeilen in der ersten Zeile, ersten Spalte oder in beiden vorhanden sind.</p><div class="why"> <p>Tipp: Beim Betreten einer Spalte/Zeile wird der passende Kopf wiederholt.</p><p>Wenn der Tisch nur Layout dient, verzichten Sie auf die Tabellenformatierung.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Entfernen Sie die Überschriften‑Formatierung (h2, h3). Verwenden Sie stattdessen Kopfzeilen in Zeile/Spalte. Für mehrere Ebenen nutzen Sie mehrere Tabellen.</p><div class="why"> <p>Tipp: Tabellenköpfe sind gerichtet (Zeile oder Spalte). Inhaltsüberschriften beeinflussen alles Folgende, auch in anderen Spalten:</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Eine <strong>Tabellenkopf</strong>‑Zelle in Spalte 2 beschriftet Zelle B. <br><br> Eine <strong>Inhaltsüberschrift</strong> in Zelle 2 „beschriftet“ 3, A, B, C sowie diesen Text und den Tooltip‑Fuß.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,
};

export const interfaceStrings = {
	ALERT_CLOSE: 'Schließen',
	ALT: 'Alt‑Text: ',
	DECORATIVE: 'Als dekorativ markiert',
	DISMISS: 'Ignorieren',
	DISMISS_ALL: 'Auf dieser Seite: ignorieren',
	edit_page: 'Seite bearbeiten',
	edit_layout: 'Layout bearbeiten',
	edit_term: 'Begriff bearbeiten',
	edit_tags: 'Benutzer bearbeiten',
	IMAGES: 'Alt‑Text',
	MAIN_TOGGLE_LABEL: 'Barrierefreiheits‑Werkzeuge ein-/ausschalten',
	MISSING: '(fehlt!)',
	NOT_VISIBLE: 'Hinweis: Dieser Inhalt ist möglicherweise nicht sichtbar. Suchen Sie ihn im markierten Container.',
	NO_IMAGES: 'Keine Bilder gefunden.',
	OUTLINE: 'Überschriften',
	PANEL_DISMISS_BUTTON: `%(dismissCount) ausgeblendete Meldungen anzeigen`,
	PANEL_HEADING: 'Visualisierungen anzeigen',
	SKIP_TO_ISSUE: 'Zum Problem springen',
	WARNING: 'manuelle Prüfung erforderlich',
	WARNINGS: 'manuelle Prüfungen erforderlich',
	buttonFirstContent: 'Zur ersten Meldung',
	buttonHideHiddenAlert: 'Ausgeblendete Meldung verbergen',
	buttonHideHiddenAlerts: `%(count) ausgeblendete Meldungen verbergen`,
	buttonShowHiddenAlert: 'Ausgeblendete Meldung anzeigen',
	buttonToolsActive: 'Visualisierungen verbergen',
	dismissActions: `Ähnliche Meldungen`,
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
	panelCheckAltText: `<p class="ed11y-small">Prüfen Sie, dass jedes Bild seine Bedeutung im Kontext beschreibt und dass es keine Bilder mit eingebettetem Text gibt.</p>`,
	panelCheckOutline: `<p class="ed11y-small">Dies zeigt die Überschriftenstruktur. Stellen Sie sicher, dass sie der visuellen Struktur entspricht.</p>`,
	PANEL_HEADING_MISSING_ONE: 'Überschrift Ebene 1 fehlt.',
	PANEL_NO_HEADINGS: 'Keine Überschriften gefunden.',
	reportsLink: 'Website‑Berichte öffnen',
	toggleDisabled: 'Für Editoria11y ist kein prüfbarer Inhalt verfügbar.',
	transferFocus: 'Diesen Inhalt bearbeiten',
	unDismissHideButton: 'Diese ignorierte Meldung wiederherstellen',
	unDismissNotePermissions: 'Diese Prüfung wurde von einer Administration ausgeblendet',
	unDismissOKButton: 'Diese als OK markierte Meldung wiederherstellen',
};


const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips),
  testNames: testNames,
};

export default newStrings;
