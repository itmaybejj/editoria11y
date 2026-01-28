import strings from '../sa11y-lang/es.js';

export const testNames = {
	ALT_FILE_EXT: 'Dieser Alt‑Text ist ein Dateiname, keine Beschreibung',
	ALT_MAYBE_BAD: 'Dieser Alt‑Text kann von einem Screenreader nicht ausgesprochen werden',
	ALT_PLACEHOLDER: 'Dieser Alt‑Text ist ein bedeutungsloser Platzhaltertext',
	ALT_UNPRONOUNCEABLE: 'Dieser Alt‑Text ist unaussprechlich',
	BTN_EMPTY: 'Schaltfläche hat keine barrierefreie Beschriftung',
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
	DUPLICATE_TITLE: 'Dieser Link hat einen Tooltip mit demselben Text wie der Link',
	EMBED_AUDIO: 'Hat dieses Audio eine Transkription?',
	EMBED_DATA_VIZ: 'Ist diese Visualisierung barrierefrei?',
	EMBED_GENERAL: 'Eingebettete iframes erfordern manuelle Prüfungen',
	EMBED_MISSING_TITLE: 'Frame ohne „title“-Attribut',
	EMBED_UNFOCUSABLE: 'Frame mit tabindex="-1" ist nicht per Tastatur erreichbar.',
	EMBED_VIDEO: 'Ist dieses Video korrekt untertitelt?',
	HEADING_EMPTY: 'Diese Überschrift hat keinen Text',
	HEADING_EMPTY_WITH_IMAGE: 'Dieses Bild wird als Überschrift verwendet und benötigt daher Alt‑Text',
	HEADING_FIRST: 'Die erste Überschrift auf dieser Seite ist eine Unterüberschrift',
	HEADING_LONG: 'Kann diese Überschrift kürzer sein?',
	HEADING_MISSING_ONE: 'Diese Seite hat keine Überschrift der Ebene 1',
	HEADING_SKIPPED_LEVEL: 'Diese Überschrift ist auf der falschen Ebene ausgezeichnet',
	HIDDEN_FOCUSABLE: 'Dieses Element kann nicht von Screenreadern beschrieben werden',
	IMAGE_ALT_TOO_LONG: 'Kann dieser Alt‑Text kürzer sein?',
	IMAGE_DECORATIVE: 'Ist dieses Bild wirklich bedeutungslos?',
	IMAGE_DECORATIVE_CAROUSEL: 'Bild in einem Karussell oder einer Galerie als dekorativ markiert',
	IMAGE_FIGURE_DECORATIVE: 'Manuelle Prüfung: Bild mit Bildunterschrift ohne Alt‑Text',
	IMAGE_FIGURE_DUPLICATE_ALT: 'Alt‑Text sollte nicht identisch mit der Bildunterschrift sein',
	LABELS_ARIA_LABEL_INPUT: 'Gibt es eine sichtbare Beschriftung für dieses Feld?',
	LABELS_PLACEHOLDER: 'Manuelle Prüfung: Platzhaltertext',
	LABELS_INPUT_RESET: 'Wird diese Zurücksetzen‑Schaltfläche benötigt?',
	LABEL_IN_NAME: 'Sichtbare Beschriftung stimmt nicht mit der unsichtbaren Beschriftung überein',
	LINK_ALT_FILE_EXT: 'Als Link verwendeter Alt‑Text sollte keine URL sein',
	LINK_ALT_MAYBE_BAD: 'Dieser verlinkte Alt‑Text kann von einem Screenreader nicht ausgesprochen werden',
	LINK_ALT_UNPRONOUNCEABLE: 'Verlinkte Bilder benötigen aussprechbaren Alt‑Text',
	LINK_CLICK_HERE: 'Manuelle Prüfung: Link enthält „Hier klicken“',
	LINK_DOI: 'Artikel sollten über ihren Titel verlinkt werden, nicht über DOI‑Nummern',
	LINK_EMPTY: 'Dieser Link hat keinen Text',
	LINK_EMPTY_LABELLEDBY: 'Link mit ungültigem „aria‑labelledby“-Attribut',
	LINK_EMPTY_NO_LABEL: 'Dieser Link benötigt eine Beschriftung',
	LINK_FILE_EXT: 'Link führt zu einer Datei ohne vorherige Warnung',
	LINK_IDENTICAL_NAME: 'Beschreibt dieser Link sein Ziel eindeutig?',
	LINK_IMAGE_ALT: 'Manuelle Prüfung: verlinktes Bild mit Alt‑Text',
	LINK_IMAGE_ALT_AND_TEXT: 'Ergibt dieser Alt‑Text im Kontext dieses Links Sinn?',
	LINK_IMAGE_LONG_ALT: 'Kann dieser verlinkte Alt‑Text kürzer sein?',
	LINK_IMAGE_NO_ALT_TEXT: 'Dieses verlinkte Bild benötigt Alt‑Text',
	LINK_IMAGE_TEXT: 'Manuelle Prüfung: Bild in einem Link als dekorativ markiert.',
	LINK_NEW_TAB: 'Öffnet dieser Link einen neuen Tab ohne Warnung?',
	LINK_PLACEHOLDER_ALT: 'Dieses verlinkte Bild benötigt aussagekräftigen Alt‑Text',
	LINK_STOPWORD: 'Beschreibt dieser Link sein Ziel?',
	LINK_STOPWORD_ARIA: 'Aussagekräftiger Linktext ist nur für Screenreader‑Nutzer verfügbar',
	LINK_SUS_ALT: 'Beschreibt dieser Alt‑Text das Bild oder den Link?',
	LINK_SYMBOLS: 'Manuelle Prüfung: Sind die Symbole oder Emojis in diesem Link sinnvoll?',
	LINK_URL: 'Linktext sollte keine URL sein',
	META_LANG: 'Meta‑Tag für die Seitensprache fehlt',
	META_MAX: 'Meta‑Tag begrenzt, wie stark Nutzer Text vergrößern können',
	META_REFRESH: 'Meta‑Tag aktualisiert die Seite automatisch',
	META_SCALABLE: 'Meta‑Tag verhindert das Vergrößern von Text',
	META_TITLE: 'Meta‑Tag für den Seitentitel fehlt',
	MISSING_ALT: 'Ungültiges HTML: Bild ohne Alt‑Attribut',
	MISSING_ALT_LINK: 'Ungültiges HTML: verlinktes Bild ohne Alt‑Attribut',
	MISSING_ALT_LINK_HAS_TEXT: 'Ungültiges HTML: Bild in Link ohne Alt‑Attribut',
	QA_BAD_LINK: 'Manuelle Prüfung: Linkziel könnte ungültig sein',
	QA_BLOCKQUOTE: 'Sollte dieses Zitat eine Überschrift sein?',
	QA_DOCUMENT: 'Wurde dieses Dokument für Screenreader ausgezeichnet?',
	QA_FAKE_HEADING: 'Sollte dieser fett formatierte Text eine Überschrift sein?',
	QA_FAKE_LIST: 'Sollte dies als Liste formatiert sein?',
	QA_IN_PAGE_LINK: 'Defekter Seiteninterner Link',
	QA_JUSTIFY: 'Text nicht im Blocksatz ausrichten',
	QA_NESTED_COMPONENTS: 'Verschachtelte interaktive Layout‑Komponenten',
	QA_PDF: 'Gibt es eine Alternative zu diesem PDF?',
	QA_SMALL_TEXT: 'Text ist zu klein',
	QA_STRONG_ITALICS: 'Große Textblöcke in Kursiv oder Fett sind schwerer zu lesen',
	QA_SUBSCRIPT: 'Hoch‑/Tiefstellung nicht als rein visuelle Formatierung verwenden',
	QA_UNDERLINE: 'Nur Links sollten unterstrichen sein',
	QA_UPPERCASE: 'Ist dieser Großbuchstext notwendig?',
	SUS_ALT: 'Sind in diesem Alt‑Text redundante Wörter enthalten?',
	TABINDEX_ATTR: 'Tabindex‑Attribut stört die Lesereihenfolge',
	TABLES_EMPTY_HEADING: 'Diese Tabellenkopfzelle benötigt Text',
	TABLES_MISSING_HEADINGS: 'Dieser Tabelle fehlen Kopfzeilen in Zeile und/oder Spalte',
	TABLES_SEMANTIC_HEADING: 'Inhaltliche Überschriften sollten nicht in Tabellen verwendet werden',
	UNCONTAINED_LI: 'Ungültige HTML‑Liste',
};

const why = {
	fix: `<strong class="badge">So beheben</strong> `,
	check: `<strong class="badge">Manuelle Prüfung</strong> `,

	buttons: `<div class="why"><p>Hinweis: Der zugängliche Name einer Schaltfläche sollte klar machen, was sie tut. Schaltflächen, die sich beim Klicken ändern, sollten auch ihren Namen ändern:</p><ul>
<li>Ändernde Beschriftungen:<br>"Wiedergabe/Pause", "Details anzeigen/Details ausblenden"</li>
<li>Änderung von <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">Zustandsattributen</a>:<br>"Wiedergabe/Wiedergabe, gedrückt", "Details, eingeklappt/Details, ausgeklappt."</li>
</ul>
<p>Ändern Sie jedoch nicht beides gleichzeitig. Wenn „Wiedergabe“ zu „Pause, gedrückt“ geändert wird, bedeutet das, dass der Player pausiert ist — nicht, dass er abspielt!</p></div>`,

	headings: `<div class="why"><p>Tipp: Überschriften und Unterüberschriften organisieren Inhalte in einer geschachtelten Struktur. Screenreader‑Nutzende verlassen sich darauf, um Seiten zu verstehen und zu navigieren:</p>
<ul><li>Überschrift Ebene 1: Seitentitel
<ul><li>Überschrift Ebene 2: Hauptthemen
<ul><li>Überschrift Ebene 3: Unterthemen</li></ul>
</li></ul>
</li></ul></div>`,

	images: `<div class="why"><p>Tipp: Beschreiben Sie beim Schreiben von Alt‑Text, was ein Bild <em>bedeutet</em>, nicht nur, was darauf zu sehen ist. Je nach Kontext kann ein Foto eines Kindes, das einen Ball tritt, bedeuten:</p>
<ul><li>Sie spielten im strömenden Regen.</li>
<li>Die neuen Teamtrikots haben coole Drachenlogos.</li>
<li>Sie schoss das entscheidende Tor von der linken Seitenlinie!</li></ul></div>`,

	links: `<div class="why"><p>Lesende überfliegen Seiten anhand der Links und verwenden die Seitensuche, um Links nach Name zu finden. Effektive Links sollten daher aussagekräftig, eindeutig und prägnant sein:</p>
<ul>
<li>Ideal: „Mehr erfahren über <a href="https://webaim.org/techniques/hypertext/link_text">aussagekräftige Links</a>“</li>
<li>Nicht eindeutig: „Klicken Sie <a href="https://webaim.org/techniques/hypertext/link_text">hier</a>, um mehr über aussagekräftige Links zu erfahren.“</li>
<li>Nicht prägnant: „<a href="https://webaim.org/techniques/hypertext/link_text">Hier klicken, um mehr über aussagekräftige Links zu erfahren</a>“</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>Der Zweck von Alt‑Text besteht darin, eine Alternative für die Bedeutung eines Bildes zu vermitteln, nicht nur für seinen Inhalt. Bei einem verlinkten Bild ist die Bedeutung das Linkziel:
<ul>
<li>„<em>Eine Lupe</em>“ beschreibt ein Bild, nicht einen Link.</li>
<li>„<em>Eine Suchlupe</em>“ beschreibt verwirrend beides.</li>
<li>„<em>Suchen</em>“ beschreibt das Linkziel korrekt.</li>
</ul></p></div>`,
};

export const tips = {

	ALT_FILE_EXT: `<p>Screenreader lesen diese URL vor – oft Buchstabe für Buchstabe. Das vermittelt wahrscheinlich nicht dieselbe Bedeutung wie das Bild selbst.</p><p>${why.fix}Fügen Sie entweder ein leeres alt (alt="") hinzu, wenn dies eine bedeutungslose Dekoration ist, die von Screenreadern ignoriert werden soll, oder fügen Sie einen beschreibenden Alt‑Text hinzu.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Angegebene Beschreibung für dieses Bild: <strong>"%(alt)"</strong></p><p>${why.fix}Geben Sie einen kurzen Alt‑Text ein, der beschreibt, was dieses Bild in diesem Kontext bedeutet.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Angegebene Beschreibung für dieses Bild: <strong>"%(alt)"</strong></p><p>${why.fix}Geben Sie einen kurzen Alt‑Text ein, der beschreibt, was dieses Bild in diesem Kontext bedeutet.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>Der Alt‑Text dieses Bildes lautet "%(alt)", enthält jedoch nur unaussprechliche Zeichen oder Leerzeichen. Screenreader kündigen ein Bild an und halten dann peinlich inne: „Bild: ____.“</p><p>${why.fix}Fügen Sie einen beschreibenden Alt‑Text hinzu, oder lassen Sie den Alt‑Text <em>vollständig</em> leer (alt=""), wenn es sich nur um ein Icon oder einen Abstandshalter handelt.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Verwenden Sie eine beliebige gültige Methode, um Screenreadern mitzuteilen, was dieser Button tut – z. B. Text, Alt‑Text auf einem Icon oder ein title‑Attribut.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Dieser Button verwendet ein <code>aria-labelledby</code>, das leer ist oder nicht mit einem bestehenden <code>ID</code>-Wert auf der Seite übereinstimmt.</p><p>${why.fix}Stellen Sie eine gültige Verbindung zu einem Element mit passender ID her oder entfernen Sie dieses Attribut.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'Ein Hintergrundbild oder Farbverlauf bedeutet, dass dieses Tool die tatsächliche Hintergrundfarbe nicht feststellen kann. Nutzen Sie den Farbwähler unten, um manuell zu prüfen.',

	DUPLICATE_ID: `<p>IDs werden auf dieser Seite für Beschriftungen oder Linkziele verwendet und müssen daher eindeutig sein.</p><p>${why.fix}Ändern Sie diese ID: <strong>#%(id)</strong></p><div class="why"><p>In vielen CMS‑Systemen stammt diese ID aus einem Feld namens „name“ oder „id“. In HTML ist es ein Attribut: <code><a id="MY-ID"></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Löschen Sie das <code>title</code>-Attribut dieses Links.</p><div class="why"><p>Hinweis: <code>title</code>-Tooltips erscheinen nur bei Maus‑Hover. Sie sind weder auf Mobilgeräten noch per Tastatur zugänglich und sollten deshalb keine wichtigen Informationen enthalten.</p></div>`,

	EMBED_AUDIO: `<p>Wenn dieses Audio Sprache enthält, muss eine <a href="https://www.w3.org/WAI/media/av/transcribing/">Textalternative</a> auf dieser Seite bereitgestellt oder verlinkt werden.</p><p>Automatische Transkriptionen müssen von Menschen korrigiert werden, damit Sprecher und relevante Geräusche korrekt identifiziert werden.</p>`,

	EMBED_DATA_VIZ: `<p>Eingebettete Visualisierungen sind häufig schwer oder gar nicht für Hilfstechnologien nutzbar, können bei geringer Sehkraft schwer verständlich sein und erfordern oft horizontales Scrollen.</p><p>${why.fix}Wenn diese Visualisierung keinen hohen Kontrast besitzt, nicht per Tastatur bedienbar ist <strong><em>und</em></strong> nicht von Screenreadern beschrieben werden kann, sollten Sie eine gleichwertige Alternative wie eine Textbeschreibung oder Datentabelle bereitstellen.</p>`,

	EMBED_GENERAL: 'Automatisierte Prüfungen können eingebettete Inhalte nicht analysieren. Stellen Sie sicher, dass alle Bilder Alt‑Text haben, Videos Untertitel besitzen, Text ausreichenden Kontrast hat und Links/Buttons <a href="https://webaim.org/techniques/keyboard/">tastaturbedienbar</a> sind, und schließen Sie dann diese Meldung.',

	EMBED_MISSING_TITLE: `<p>Eingebettete Inhalte benötigen einen zugänglichen Namen, der ihren Zweck für Screenreader beschreibt.</p><p>${why.fix}Fügen Sie ein eindeutiges <code>title</code>‑ oder <code>aria-label</code>‑Attribut hinzu.</p>`,

	EMBED_UNFOCUSABLE: `Dieses Attribut weist Tastatur und Hilfstechnologien an, das Element zu überspringen. Wenn der iFrame Links, Buttons oder Formulare enthält oder scrollbar ist, muss dieses Attribut entfernt werden.`,

	EMBED_VIDEO: `<p>Videos müssen Untertitel enthalten.</p><p>Automatisch erzeugte Untertitel müssen von Menschen korrigiert werden.</p><p>${why.fix}Fügen Sie Untertitel hinzu oder überarbeiten Sie diese, und schließen Sie dann diese Meldung.</p>`,

	HEADING_EMPTY: `<p>Leere Überschriften erzeugen Lücken in der Dokumentstruktur.</p><p>${why.fix}Fügen Sie Text hinzu oder entfernen Sie die leere Zeile.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Leere Überschriften erzeugen Lücken in der Dokumentstruktur.</p><p>${why.fix}Wenn dies keine Überschrift ist, ändern Sie das Format von <strong {C}>Überschrift %(level)</strong> zu <strong>Absatz</strong>. Andernfalls geben Sie die Bedeutung des Bildes im Alt‑Text an.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Stellen Sie sicher, dass der Seitentitel als Überschrift der Ebene 1 oder 2 ausgezeichnet ist. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}Wenn dies kein feststehender Titel wie ein Artikelname ist, kürzen Sie die Überschrift, um das Überfliegen zu erleichtern.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Versehen Sie den Seitentitel mit einer Überschrift der Ebene 1, um den Beginn der Dokumentstruktur zu markieren.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Diese Überschrift springt von <strong>Ebene %(prevLevel) zu Ebene %(level)</strong>. Für Screenreader klingt dies, als fehle Inhalt.</p><p>${why.fix}Passen Sie die Ebenen an, um eine logische Struktur ohne Lücken zu schaffen.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: 'Dieses interaktive Element besitzt <code>aria-hidden="true"</code>, ist aber weiterhin per Tastatur erreichbar. Wenn es wirklich verborgen sein soll, muss zusätzlich <code>tabindex="-1"</code> gesetzt werden; sonst entfernen Sie <code>aria-hidden</code>.',

	IMAGE_ALT_TOO_LONG: `<p>Screenreader lesen Alt‑Text als zusammenhängenden Satz vor; wenn etwas verpasst wird, muss alles erneut gehört werden.</p><p>Der Alt‑Text mit %(altLength) Zeichen lautet: <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Tipp: Komplexe Bilder benötigen oft eine <strong>sichtbare</strong> Bildunterschrift oder Beschreibung. Screenreader‑Nutzer dürfen auf diese verwiesen werden:</p><ul><li>"Plakat für den Tanz am Freitag; Details folgen in der Bildunterschrift."</li><li>"Diagramm, das einen Rückgang von 10 % zeigt; Details in der Tabelle."</li></ul></div>`,

	IMAGE_DECORATIVE: `<p>Dieses Bild wurde mit leerem Alt‑Text für Screenreader ausgeblendet. Nur bedeutungslose Bilder sollten so ausgeblendet werden.</p><p>${why.fix}Wenn dieses Bild inhaltlichen Wert hat, fügen Sie Alt‑Text hinzu.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'Das Bild ist als <strong>dekorativ</strong> markiert, aber alle Bilder in einem Karussell oder einer Galerie benötigen beschreibenden Alt‑Text.',

	IMAGE_FIGURE_DECORATIVE: `<p>Dieses Bild wird von Hilfstechnologien ignoriert. Ergibt die Bildunterschrift ohne das Bild Sinn?</p><p>${why.fix}Wenn nicht, ergänzen Sie Alt‑Text für alles, was die Bildunterschrift nicht erklärt.</p><div class="why"><p>Tipp: Bilder, Alt‑Texte und Bildunterschriften arbeiten zusammen:</p><ul><li>Bildunterschriften geben Kontext und Interpretation.</li><li>Alt‑Texte beschreiben das Bild für Nutzer, die es nicht sehen können.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Passen Sie den Alt‑Text so an, dass er die visuelle Bedeutung beschreibt.</p><div class="why"><p>Tipp: Bilder, Alt‑Texte und Bildunterschriften arbeiten zusammen:</p><ul><li>Bildunterschriften liefern Kontext.</li><li>Alt‑Texte beschreiben das Bild für Menschen, die es nicht sehen können.</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: '<p><strong {B}>Unsichtbare Feldbezeichnung:</strong> <strong {C}>%(TEXT)</strong></p><p>Stellen Sie sicher, dass es eine sichtbare Beschriftung gibt, dass sie sichtbar bleibt, wenn das Feld Text enthält, und dass sie mit dem unsichtbaren Namen übereinstimmt.</p><div class="why"><p>Platzhalter oder Titel verschwinden beim Tippen, was die Überprüfung erschwert.</p></div>',

	LABELS_INPUT_RESET: `<p>Zurücksetzen‑Buttons können leicht versehentlich ausgelöst werden und Datenverlust verursachen.</p><p>${why.fix}Wenn dies nicht nur ein einzelnes Feld zurücksetzt, entfernen Sie den Button oder ermöglichen Sie eine Bestätigung.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'Bild‑Buttons benötigen Alt‑Text. Fügen Sie einen Alt‑Text wie <em>Suchen</em> oder <em>Senden</em> hinzu.',

	LABELS_MISSING_LABEL: 'Dieses Eingabefeld hat keine Beschriftung. Fügen Sie ein <code>id</code> hinzu und verwenden Sie im Label das passende <code>for</code>.',

	LABELS_NO_FOR_ATTRIBUTE: 'Dieses Feld hat keine zugeordnete Beschriftung. Fügen Sie dem Label ein <code>for</code> mit dem passenden <code>id</code> hinzu.<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>Platzhaltertext verschwindet, sobald man tippt, und besitzt oft zu wenig Kontrast.</p><p>${why.fix}Stellen Sie sicher, dass wichtige Informationen wie Label, Hilfe und Formatierung sichtbar bleiben.</p>`,

	LABEL_IN_NAME: `<p>Der sichtbare Text dieses Elements scheint vom zugänglichen Namen abzuweichen. Dies kann Screenreader‑Nutzer verwirren und Sprachsteuerung beeinträchtigen.</p><p>${why.check}Stellen Sie sicher, dass das sichtbare Label mit dem unsichtbaren beginnt und keine zusätzliche Bedeutung enthält.</p><p><strong>Unsichtbares Label:</strong> "%(TEXT)"</p>`,

	LINK_ALT_FILE_EXT: `<p>Der Alt‑Text dieses Bildes enthält "%(alt)", was wahrscheinlich ein Dateiname ist statt einer bedeutungsvollen Linkbezeichnung.</p><p>${why.fix}Setzen Sie den Alt‑Text auf den Namen des Linkziels.</p><div class="why"><p>Alt‑Text beschreibt die Bedeutung eines Bildes. Bei verlinkten Bildern ist das die Linkdestination:</p><ul><li>"Seite mit Text" beschreibt das Bild, nicht den Link.</li><li>"IMG_1234.jpg" ist ein Dateiname.</li><li>"<strong><em>Anmeldeformular (doc)</em></strong>" ist eine sinnvolle Linkbezeichnung.</li></ul></p></div>`,

	LINK_ALT_MAYBE_BAD: `<p>Der Alt‑Text dieses Bildes ist ein Platzhalter: "<strong>%(alt)</strong>".</p><p>${why.fix}Setzen Sie den Alt‑Text auf die Linkdestination.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>Der Alt‑Text dieses verlinkten Bildes enthält nur unaussprechliche Symbole oder Leerzeichen: "%(ALT_TEXT)". Screenreader kündigen den Link an, können ihn jedoch nicht beschreiben.</p><p>${why.fix}Setzen Sie den Alt‑Text auf die Linkdestination oder -funktion.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `Die Formulierung „hier klicken“ ist überflüssig und lenkt von der eigentlichen Linkbedeutung ab.`,

	LINK_DOI: `<p>${why.fix}Verlinken Sie den Artikeltitel und geben Sie die DOI‑Nummer im Klartext an, anstatt die DOI‑Nummer zu verlinken.</p><div class="why"><p>Die APA‑Richtlinien empfehlen beschreibende Links, da Nutzer Links nach Titel scannen.</p><p>So erhalten auch Screenreader aussagekräftige Beschreibungen statt bedeutungsloser Zahlenfolgen.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Fügen Sie Text hinzu oder löschen Sie den Link, wenn er aus Versehen erstellt wurde.</p><div class="why"><p>Screenreader können leere Links kaum beschreiben und bleiben still oder lesen die URL.</p><p>Versehentlich verlinkte Leerzeichen sind manchmal schwer zu löschen.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>Dieses <code>aria-labelledby</code>-Attribut verweist nicht auf ein existierendes Element.</p><p>${why.fix}Fügen Sie eine gültige ID hinzu oder entfernen Sie das Attribut.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Fügen Sie Text hinzu oder löschen Sie den Link, wenn er versehentlich entstanden ist.</p><div class="why"><p>Screenreader können leere Links nicht aussagekräftig ankündigen.</p><p>Verlinkte Leerzeichen müssen oft durch Neuschreiben des umgebenden Texts entfernt werden.</p></div>`,

	LINK_FILE_EXT: `<p>Dieser Link führt zu einer Datei (z. B. PDF, MP3, Zip, Word) ohne Hinweis.</p><p>${why.fix}Geben Sie im Linktext an, um welchen Dateityp es sich handelt.</p><p class="why">Bei großen Dateien sollten Sie auch die Dateigröße nennen, z. B. „Bericht (PDF, 3 MB)“.</p>`,

	LINK_IDENTICAL_NAME: `<p>Mehrere Links mit unterschiedlichen Zielen verwenden denselben Linktext: "<strong>%(TEXT)</strong>".</p><p>${why.fix}Formulieren Sie die Linktexte so um, dass sie ihre unterschiedlichen Ziele eindeutig beschreiben.</p>${why.links}`,

	LINK_IMAGE_ALT: `Stellen Sie sicher, dass dieser Alt‑Text das Linkziel beschreibt:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Stellen Sie sicher, dass dies zur Beschreibung des Linkziels beiträgt und nicht zusätzliche irrelevante Informationen hinzufügt:</p><p><strong class="badge">Alt</strong> "<em><strong>%(alt)</strong></em>"</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p><a href="https://webaim.org/techniques/hypertext/link_text#alt_linkWebAIM">Laut dient der Alt‑Text eines verlinkten Bildes dazu, das Linkziel zu beschreiben</a>. Links sollten kurz und klar sein. Ein langer Alt‑Text deutet oft darauf hin, dass er das Bild beschreibt statt den Link.</p>Dieser Alt‑Text hat %(altLength) Zeichen: <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Wenn ein Link ein Bild enthält, dient der Alt‑Text des Bildes als Linkbezeichnung für Screenreader.</p><p>${why.fix}Setzen Sie den Alt‑Text auf die Linkdestination.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'Das Bild ist als dekorativ markiert, obwohl der umgebende Text als Linkbeschriftung dient.',

	LINK_NEW_TAB: `<p>${why.fix}Lassen Sie den Link im selben Tab öffnen oder warnen Sie Nutzende vorher.</p><div class="why"><p>Nutzende können immer selbst entscheiden, einen Link in einem neuen Tab zu öffnen. Wenn dies erzwungen wird, kann es verwirrend sein – besonders, wenn die Zurück‑Taste nicht mehr funktioniert.</p><p>Ausnahme: In Formularen öffnen Links häufig neue Tabs, um Datenverlust zu vermeiden.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>Der Alt‑Text dieses verlinkten Bildes ist ein Platzhalter: "<strong>%(alt)</strong>".</p><p>${why.fix}Setzen Sie den Alt‑Text auf die Linkdestination.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Dieser Link enthält nichtssagenden Text:<br><strong>%(text)</strong></p><p>${why.fix}Formulieren Sie ihn so um, dass er sein Ziel oder seinen Zweck klar beschreibt.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>Ein barrierefreier Name wurde per ARIA vergeben, aber der sichtbare Linktext ist generisch: "<strong {C}>%(ERROR)</strong>".</p><p>${why.fix}Schreiben Sie aussagekräftige Links für alle Nutzenden und stellen Sie sicher, dass sichtbare und zugängliche Bezeichnung übereinstimmen.</p>${why.links}`,

	LINK_SUS_ALT: `<p>Der Alt‑Text enthält das Wort "%(alt)", was oft bedeutet, dass er das Bild statt das Linkziel beschreibt.</p><strong class="badge">Alt‑Text</strong> "%(ALT_TEXT)"<p>So beheben: Stellen Sie sicher, dass der Alt‑Text die Linkdestination beschreibt.<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Vermeiden Sie Symbole als Call‑to‑Action im Linktext, außer sie sind für Screenreader versteckt. Screenreader können Symbole laut vorlesen, was verwirrend wirken kann. Erwägen Sie, Folgendes zu entfernen: <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Ersetzen Sie den Linktext durch den Titel oder Zweck des Linkziels.</p><div class="why"><p>Nutzende überfliegen Links nach Name, besonders Screenreader‑Nutzende.</p><p>Eine URL als Linktext kann nicht einfach überflogen oder durchsucht werden.</p></div>`,

	// language=HTML
	META_LANG: `<p>${why.fix}Fügen Sie ein <a href="https://www.w3.org/International/questions/qa-html-language-declarations">Sprachattribut</a> am HTML‑Tag der Seite hinzu.</p><div class="why"><p>Tipp: Screenreader wählen ihre Aussprache basierend auf der angegebenen Sprache. Ohne richtige Sprachangabe entstehen unverständliche Ansagen.</p></div>`,

	META_MAX: `<p>Dieses Meta‑Tag begrenzt, wie stark Text vergrößert werden kann.</p><p>${why.fix}Entfernen Sie diese Begrenzung oder passen Sie sie an, um Zoom zu ermöglichen.</p>`,

	META_REFRESH: `<p>Seiten sollten nicht automatisch über ein Meta‑Tag aktualisiert werden. Nutzer verlieren dadurch ihren Platz oder Formulareingaben.</p><p>${why.fix}Verwenden Sie AJAX oder JavaScript, damit Nutzer gewarnt werden und die Aktualisierung verzögern können.</p>`,

	META_SCALABLE: `<p>Dieses Meta‑Tag verhindert, dass Nutzende Text vergrößern.</p><p>${why.fix}Erlauben Sie vollständigen Zoom, indem Sie dieses Tag entfernen oder anpassen.</p>`,

	META_TITLE: `<p>${why.fix}Fügen Sie ein <code>&lt;title&gt;</code>-Tag in den <code>&lt;head&gt;</code>-Bereich hinzu.</p><div class="why"><p>Ein kurzer, eindeutiger <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title">Titeltag</a> ist wichtig:</p><ul><li>Suchmaschinen nutzen ihn als Ergebnisüberschrift.</li><li>Browser nutzen ihn als Tab‑Titel.</li><li>Screenreader lesen ihn beim Wechseln zwischen Tabs.</li></ul><p>Ohne Titel sehen/hören Nutzer nur die rohe URL.</p></div>`,

	MISSING_ALT: `<p>Wenn Screenreader ein Bild ohne Alt‑Attribut finden, lesen sie die Bild‑URL vor, oft Buchstabe für Buchstabe.</p><p>${why.fix}Fügen Sie entweder alt="" hinzu, wenn das Bild ignoriert werden soll, oder einen beschreibenden Alt‑Text.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Wenn ein verlinktes Bild kein Alt‑Attribut besitzt, lesen Screenreader die Bild‑URL vor. Dies ist besonders problematisch bei verlinkten Bildern.</p><p>${why.fix}Fügen Sie einen Alt‑Text hinzu, der das Linkziel beschreibt.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Dieses Bild ist Teil eines Links mit Text. Wenn der sichtbare Text das Linkziel klar beschreibt, setzen Sie alt="" für das Bild. Andernfalls fügen Sie einen Alt‑Text zum Linkziel hinzu.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>Der Link scheint auf eine Entwicklungsumgebung zu verweisen:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Setzen Sie stattdessen einen relativen Pfad (/ordner) oder die öffentliche URL.</p>`,

	QA_BLOCKQUOTE: `<p>Blockquote‑Formatierung signalisiert Screenreadern, dass es sich um ein Zitat handelt. Kurze Zitate sind häufig tatsächlich Überschriften.</p><p>${why.fix}Wenn es eine Überschrift ist, verwenden Sie stattdessen Überschriftenformatierung.</p>${why.headings}`,

	// todo errors here
	QA_DOCUMENT: `<p>Verlinkte Dokumente gelten als Webinhalte und müssen ebenfalls barrierefrei sein. Stellen Sie sicher, dass Überschriften, Tabellenköpfe und Alt‑Texte vorhanden sind.</p><ul class="why"><li>So machen Sie <a href="https://support.google.com/docs/answer/6199477?hl=de>"Google‑Dokumente barrierefrei</a>.</li><li>So machen Sie <a href="https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office‑Dokumente barrierefrei</a>.</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}Wenn dieser fett gedruckte Text ein Thema einleitet, ersetzen Sie das reine Fettformat durch eine echte Überschrift.</p><div class="why"><p>Tipp: Überschriften erzeugen ein navigierbares Inhaltsverzeichnis für Hilfstechnologien.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Wenn "%(text)" zu einer Liste gehört, verwenden Sie Listenformatierung.</p><div class="why"><p>Listen sind sowohl visuell als auch technisch strukturiert:</p><ol><li>Einheitliche Einzüge erleichtern das Lesen.</li><li>Screenreader geben Positionen an („Eintrag 3 von 7“).</li></ol><p>Ein Satz mit einer Zahl davor ist keine echte Liste.</p></div>`,

	QA_IN_PAGE_LINK: `<p>Das Linkziel passt zu keinem Element auf dieser Seite.</p><div class="why"><p>Hinweis für Entwickler: Prüfen Sie, ob der JavaScript‑Handler auch per Tastatur funktioniert, falls dies kein normaler Link ist.</p></div>`,

	QA_JUSTIFY: `<p>Blocksatz fügt unregelmäßige Abstände ein, was das Lesen erschwert.</p><p>${why.fix}Verwenden Sie linksbündigen Text.</p>`,

	QA_NESTED_COMPONENTS: 'Vermeiden Sie verschachtelte interaktive Komponenten wie Akkordeons in Akkordeons oder Tabs in Akkordeons. Dies erschwert Navigation und Verständnis.',

	QA_PDF: `<p>${why.fix}Tun Sie Folgendes und schließen Sie dann diese Meldung:</p><ul><li>Verlinken Sie stattdessen auf eine Webseite,</li><li>oder bieten Sie zusätzlich eine Webseite oder ein bearbeitbares Dokument an,</li><li>oder stellen Sie mindestens sicher, dass das PDF über Tags, richtige Lesereihenfolge, Tabellenköpfe und Alt‑Texte verfügt.</li></ul><div class="why"><p>Viele Nutzer – besonders auf Mobilgeräten – bevorzugen Webseiten statt PDFs, da PDFs nicht umfließen und häufig keine Barrierefreiheitsmarkierungen enthalten.</p></div>`,

	QA_SMALL_TEXT: 'Kleine Schrift ist schwerer lesbar, besonders für Menschen mit Sehbeeinträchtigungen. Vermeiden Sie zu kleine Schriftgrößen.',

	QA_STRONG_ITALICS: `<p>${why.fix}Verwenden Sie Fett und Kursiv nur sparsam für wichtige Wörter.</p><div class="why"><p>Hinweis: Für Zitate kann stattdessen blockquote verwendet werden.</p></div>`,

	QA_SUBSCRIPT: `Hoch‑ und Tiefstellung macht Text schwer lesbar. Sie sollten nur für einzelne Wörter oder Formeln verwendet werden, z. B. 4<sup>te</sup>, H<sub>2</sub>O.`,

	QA_UNDERLINE: `<p>Unterstrichener Text bedeutet im Web meist einen Link. Nutzende könnten fälschlicherweise erwarten, dass er klickbar ist.</p><p>${why.fix}Verwenden Sie stattdessen <strong>Fett</strong> oder <em>Kursiv</em> – oder echte Überschriften, wenn es ein Themenwechsel ist.</p><div class="why"><p>Hinweis: Screenreader kündigen rein visuelle Formatierungen nicht an. Nur Überschriften strukturieren den Inhalt.</p></div>`,

	QA_UPPERCASE: `<p>GROSSGESCHRIEBENER TEXT IST SCHWERER LESBAR UND WIRKT OFT WIE SCHREIEN.</p><p>${why.fix}Betonen Sie nur einzelne Wörter und bevorzugt durch Fett statt durch Großschreibung.</p><div class="why"><p>Screenreader kündigen visuelle Hervorhebungen wie Fett nicht an – verwenden Sie Überschriften für strukturelle Bedeutung.</p></div>`,

	SUS_ALT: `<p>Der Alt‑Text enthält das Wort "%(alt)", was wahrscheinlich redundant ist:</p><p><strong class="badge">Alt‑Text</strong> "%(ALT_TEXT)"</p><p>So beheben: Formulieren Sie den Alt‑Text so, dass er kurz und präzise die Bedeutung des Bildes vermittelt.</p><div class="why"><p>Tipp: Screenreader kündigen bereits „Bild“ an, daher sind Formulierungen wie „Bild von“ meist überflüssig.</p><p>Ausnahme: Wenn „Bild von“ selbst Teil der dargestellten Information ist:</p><ul><li>Nicht redundant: „<em>Ein Foto in</em> einem Fotoalbum …“</li><li>Redundant: „<em>Foto von</em> einem Fotoalbum …“</li></ul></div>`,

	TABINDEX_ATTR: `<p>${why.fix}Verwenden Sie niemals tabindex größer als „0“. Ändern Sie stattdessen die Reihenfolge der Elemente im HTML, damit Tastatur‑, Lese‑ und visuelle Reihenfolge übereinstimmen.</p><div class="why"><p>Standardmäßig stimmen visuelle Reihenfolge, Tab‑Reihenfolge und Screenreader‑Reihenfolge überein.</p><p>Ein positiver tabindex verschiebt Elemente an den Anfang der Tab‑Reihenfolge – aber nicht der visuellen.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Stellen Sie sicher, dass jede Tabellenkopfzelle Text enthält.</p><div class="why"><p>Tipp: Screenreader verwenden Tabellenköpfe, um Nutzende zu orientieren.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Geben Sie in den Tabelleneinstellungen an, ob Kopfzeilen in der ersten Zeile, der ersten Spalte oder beidem vorhanden sind.</p><div class="why"> <p>Tipp: Screenreader wiederholen den relevanten Tabellenkopf in jeder Zelle.</p><p>Wenn diese Tabelle keine Daten darstellt, sondern nur Layout ist, verwenden Sie keine Tabelle.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Entfernen Sie diese Überschriftenformatierung (h2, h3). Verwenden Sie stattdessen Tabellenkopfzeilen. Wenn mehrere Ebenen nötig sind, teilen Sie die Tabelle in mehrere Tabellen auf.</p><div class="why"> <p>Tipp: Tabellenüberschriften sind richtungsgebunden (Zeile oder Spalte). Inhaltsüberschriften beeinflussen das gesamte Folgende.</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Eine <strong>Tabellenüberschrift</strong> in Zelle 2 bezeichnet Zelle B. <br><br> Eine <strong>Inhaltsüberschrift</strong> in Zelle 2 bezeichnet Zellen 3, A, B, C sowie diesen Text und die Fußnote des Tooltips.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,
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
	NOT_VISIBLE: 'Hinweis: Dieser Inhalt ist möglicherweise nicht sichtbar. Suchen Sie ihn innerhalb des markierten Containers.',
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
	dismissHideTitle: 'Blendet diese Meldung nur für Sie aus',
	dismissOkAllButton: 'Auf dieser Seite: als OK markieren',
	dismissOkButtonContent: 'Als OK markieren',
	dismissOkTitle: 'Blendet die Meldung für alle Bearbeiter aus',
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
	panelCheckAltText: '<p class="ed11y-small">Überprüfen Sie, dass jedes Bild beschreibt, was es im Kontext bedeutet, und dass es keine Bilder mit Text gibt.</p>',
	panelCheckOutline: '<p class="ed11y-small">Dies zeigt die Überschriftenstruktur. Stellen Sie sicher, dass sie der visuellen Struktur des Inhalts entspricht.</p>',
	PANEL_HEADING_MISSING_ONE: 'Überschrift Ebene 1 fehlt.',
	PANEL_NO_HEADINGS: 'Keine Überschriften gefunden.',
	reportsLink: 'Website‑Berichte öffnen',
	toggleDisabled: 'Für Editoria11y ist kein prüfbarer Inhalt verfügbar.',
	transferFocus: 'Diesen Inhalt bearbeiten',
	unDismissHideButton: 'Diese ausgeblendete Meldung wiederherstellen',
	unDismissNotePermissions: 'Diese Prüfung wurde von einem Administrator ausgeblendet',
	unDismissOKButton: 'Diese als OK markierte Meldung wiederherstellen',
};

const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips),
  testNames: testNames,
};

export default newStrings;
