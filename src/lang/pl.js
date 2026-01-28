import {default as Sa11yStrings} from '../sa11y-lang/pl.js';

const testNames = {
	ALT_FILE_EXT: 'Ten tekst alternatywny jest nazwą pliku, a nie opisem',
	ALT_MAYBE_BAD: 'Ten tekst alternatywny może być niepoprawnie odczytywany przez czytnik ekranu',
	ALT_PLACEHOLDER: 'Ten tekst alternatywny jest bezwartościową treścią zastępczą',
	ALT_UNPRONOUNCEABLE: 'Ten tekst alternatywny jest niewymawialny',
	BTN_EMPTY: 'Przycisk nie ma dostępnej etykiety',
	BTN_EMPTY_LABELLEDBY: 'Przycisk ma nieprawidłową etykietę ARIA',
	BTN_ROLE_IN_NAME: 'Nazwa przycisku powtarza słowo „button”',
	CONTRAST_ERROR: 'Tekst ma zbyt niski kontrast, aby był czytelny',
	CONTRAST_ERROR_GRAPHIC: 'Grafika lub ikona ma zbyt niski kontrast',
	CONTRAST_INPUT: 'Pole wprowadzania ma zbyt niski kontrast, aby było czytelne',
	CONTRAST_PLACEHOLDER: 'Tekst zastępczy ma zbyt niski kontrast',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Czy ten tekst zastępczy ma wystarczający kontrast?',
	CONTRAST_WARNING: 'Czy ten tekst ma wystarczający kontrast?',
	CONTRAST_WARNING_GRAPHIC: 'Czy ta grafika lub ikona ma wystarczający kontrast?',
	DUPLICATE_ID: 'Zduplikowany atrybut ID',
	DUPLICATE_TITLE: 'Ten link ma podpowiedź (tooltip) z taką samą treścią jak link',
	EMBED_AUDIO: 'Czy ten materiał audio ma transkrypcję?',
	EMBED_DATA_VIZ: 'Czy ta wizualizacja jest dostępna?',
	EMBED_GENERAL: 'Osadzone elementy iframe wymagają ręcznej weryfikacji',
	EMBED_MISSING_TITLE: 'Brak atrybutu „title” w ramce (iframe)',
	EMBED_UNFOCUSABLE: 'Ramka z tabindex="‑1" nie będzie dostępna z klawiatury',
	EMBED_VIDEO: 'Czy ten film ma poprawne napisy?',
	HEADING_EMPTY: 'Nagłówek nie zawiera tekstu',
	HEADING_EMPTY_WITH_IMAGE: 'Ten obraz jest użyty jako nagłówek, więc wymaga tekstu alternatywnego',
	HEADING_FIRST: 'Pierwszy nagłówek na stronie jest nagłówkiem niższego poziomu',
	HEADING_LONG: 'Czy ten nagłówek może być krótszy?',
	HEADING_MISSING_ONE: 'Na tej stronie brakuje nagłówka poziomu 1',
	HEADING_SKIPPED_LEVEL: 'Ten nagłówek ma nieprawidłowy poziom',
	HIDDEN_FOCUSABLE: 'Tego elementu nie można właściwie opisać w czytniku ekranu',
	IMAGE_ALT_TOO_LONG: 'Czy ten tekst alternatywny może być krótszy?',
	IMAGE_DECORATIVE: 'Czy ta grafika rzeczywiście jest tylko dekoracyjna?',
	IMAGE_DECORATIVE_CAROUSEL: 'Obraz w karuzeli/galerii oznaczony jako dekoracyjny',
	IMAGE_FIGURE_DECORATIVE: 'Ręczna kontrola: obraz z podpisem, ale bez tekstu alternatywnego',
	IMAGE_FIGURE_DUPLICATE_ALT: 'Tekst alternatywny nie powinien być identyczny z podpisem pod obrazem',
	LABELS_ARIA_LABEL_INPUT: 'Czy to pole ma widoczną etykietę?',
	LABELS_PLACEHOLDER: 'Ręczna kontrola: tekst zastępczy',
	LABELS_INPUT_RESET: 'Czy ten przycisk „Resetuj” jest potrzebny?',
	LABEL_IN_NAME: 'Widoczna etykieta nie zgadza się z dostępną nazwą',
	LINK_ALT_FILE_EXT: 'Alt użyty jako link nie powinien być adresem URL',
	LINK_ALT_MAYBE_BAD: 'Ten alt w linku może być nieczytelny dla czytników ekranu',
	LINK_ALT_UNPRONOUNCEABLE: 'Obrazy‑linki muszą mieć wymawialny tekst alternatywny',
	LINK_CLICK_HERE: 'Ręczna kontrola: link zawiera „kliknij tutaj”',
	LINK_DOI: 'Linkuj tytuły artykułów, nie numery DOI',
	LINK_EMPTY: 'Ten link nie ma tekstu',
	LINK_EMPTY_LABELLEDBY: 'Link ma nieprawidłowy atrybut aria‑labelledby',
	LINK_EMPTY_NO_LABEL: 'Ten link wymaga etykiety',
	LINK_FILE_EXT: 'Link prowadzi do pliku bez wcześniejszej informacji',
	LINK_IDENTICAL_NAME: 'Czy ten link jednoznacznie opisuje swój cel?',
	LINK_IMAGE_ALT: 'Ręczna kontrola: obraz użyty jako link z tekstem alternatywnym',
	LINK_IMAGE_ALT_AND_TEXT: 'Czy ten alt ma sens w kontekście linku?',
	LINK_IMAGE_LONG_ALT: 'Czy alt obrazu‑linku może być krótszy?',
	LINK_IMAGE_NO_ALT_TEXT: 'Obraz użyty jako link wymaga alt‑tekstu',
	LINK_IMAGE_TEXT: 'Ręczna kontrola: obraz w linku oznaczony jako dekoracyjny',
	LINK_NEW_TAB: 'Czy link otwiera nowe okno/zakładkę bez uprzedzenia?',
	LINK_PLACEHOLDER_ALT: 'Obraz‑link wymaga znaczącego tekstu alternatywnego',
	LINK_STOPWORD: 'Czy link opisuje swoją destynację?',
	LINK_STOPWORD_ARIA: 'Zrozumiała treść linku dostępna jest tylko dla czytników ekranu',
	LINK_SUS_ALT: 'Czy alt opisuje obraz, czy cel linku?',
	LINK_SYMBOLS: 'Ręczna kontrola: czy symbole/emoji w linku są znaczące?',
	LINK_URL: 'Tekst linku nie powinien być adresem URL',
	META_LANG: 'Brakuje meta‑tagu określającego język strony',
	META_MAX: 'Meta‑tag ogranicza powiększanie tekstu przez użytkownika',
	META_REFRESH: 'Meta‑tag automatycznie odświeża stronę',
	META_SCALABLE: 'Meta‑tag uniemożliwia powiększanie',
	META_TITLE: 'Brakuje meta‑tagu tytułu strony',
	MISSING_ALT: 'Nieprawidłowy HTML: obraz bez atrybutu alt',
	MISSING_ALT_LINK: 'Nieprawidłowy HTML: obraz‑link bez atrybutu alt',
	MISSING_ALT_LINK_HAS_TEXT: 'Nieprawidłowy HTML: obraz w linku bez atrybutu alt',
	QA_BAD_LINK: 'Ręczna kontrola: link może być nieprawidłowy',
	QA_BLOCKQUOTE: 'Czy ten cytat powinien być nagłówkiem?',
	QA_DOCUMENT: 'Czy dokument jest prawidłowo otagowany dla czytników ekranu?',
	QA_FAKE_HEADING: 'Czy ten pogrubiony tekst to w istocie nagłówek?',
	QA_FAKE_LIST: 'Czy to powinno być sformatowane jako lista?',
	QA_IN_PAGE_LINK: 'Uszkodzony link wewnętrzny',
	QA_JUSTIFY: 'Prosimy nie stosować justowania tekstu',
	QA_NESTED_COMPONENTS: 'Zagnieżdżone komponenty interaktywne',
	QA_PDF: 'Czy jest alternatywa dla tego pliku PDF?',
	QA_SMALL_TEXT: 'Tekst jest zbyt mały',
	QA_STRONG_ITALICS: 'Duże bloki wyróżnień (pogrubienie/kursywa) pogarszają czytelność',
	QA_SUBSCRIPT: 'Prosimy nie używać indeksu górnego/dolnego tylko dla efektu wizualnego',
	QA_UNDERLINE: 'Podkreślenie powinno oznaczać link — nie zwykły akcent',
	QA_UPPERCASE: 'Czy WIELKIE LITERY są tu konieczne?',
	SUS_ALT: 'Czy w alt‑tekście są zbędne słowa?',
	TABINDEX_ATTR: 'Atrybut tabindex może zaburzać kolejność czytania',
	TABLES_EMPTY_HEADING: 'Komórka nagłówka tabeli wymaga tekstu',
	TABLES_MISSING_HEADINGS: 'W tabeli brakuje wiersza nagłówków i/lub nagłówków kolumn',
	TABLES_SEMANTIC_HEADING: 'Nagłówków treści nie należy używać w tabelach',
	UNCONTAINED_LI: 'Nieprawidłowa lista HTML',
};

const why = {
	fix: `<strong class="badge">Jak naprawić</strong>`,
	check: `<strong class="badge">Wymaga ręcznej kontroli</strong>`,

	buttons: `<div class="why"><p>Uwaga: dostępna nazwa przycisku musi jasno wskazywać jego działanie. Przyciski, które po kliknięciu zmieniają stan, powinny zmieniać również swoją nazwę:</p><ul>
<li>Zmiana etykiet:<br>„Odtwórz/Pauza”, „Pokaż szczegóły/Ukryj szczegóły”</li>
<li>Zmiana https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_propertiesatrybutów stanu ARIA</a>:<br>„Odtwórz/Odtwórz — wciśnięty”, „Szczegóły — zwinięte/Szczegóły — rozwinięte”.</li>
</ul>
<p>Nie zmieniaj jednocześnie etykiety <em>i</em> stanu. Zastąpienie „Odtwórz” etykietą „Pauza — wciśnięty” oznacza pauzę — nie odtwarzanie.</p></div>`,

	headings: `<div class="why"><p>Wskazówka: nagłówki i podnagłówki porządkują treść w strukturę hierarchiczną. Użytkownicy czytników ekranu polegają na niej podczas nawigacji:</p>
<ul><li>Nagłówek poziomu 1: tytuł strony
<ul><li>Nagłówek poziomu 2: główne sekcje
<ul><li>Nagłówek poziomu 3: podsekcje</li></ul></li></ul></li></ul></div>`,

	images: `<div class="why"><p>Wskazówka: pisząc alt‑tekst, opisz to, co obraz <em>znaczy</em> w danym kontekście, nie tylko to, co przedstawia. Zdjęcie dziecka kopiącego piłkę może oznaczać:</p>
<ul><li>Grali mimo ulewy.</li>
<li>Nowe stroje mają efektowne smocze logo.</li>
<li>Zdobyła zwycięskiego gola z lewej strony boiska!</li></ul></div>`,

	links: `<div class="why"><p>Użytkownicy skanują strony po linkach i szukają ich nazwą. Dobre linki są znaczące, unikalne i zwięzłe:</p>
<ul>
<li>Idealnie: „Przeczytaj o https://webaim.org/techniques/hypertext/link_textznaczących linkach</a>”.</li>
<li>Nieunikalnie: „Kliknij https://webaim.org/techniques/hypertext/link_texther</a>, aby dowiedzieć się więcej”.</li>
<li>Niezwięźle: „https://webaim.org/techniques/hypertext/link_textKliknij tutaj, aby dowiedzieć się więcej o znaczących linkach</a>”.</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>Celem alt‑tekstu jest przekazanie <em>znaczenia</em> obrazu. Dla obrazu‑linku znaczeniem jest cel linku:</p>
<ul>
<li>„<em>Lupa</em>” opisuje obraz, nie link.</li>
<li>„<em>Lupa wyszukiwania</em>” jest niejednoznaczne.</li>
<li>„<em>Szukaj</em>” poprawnie opisuje cel linku.</li>
</ul></div>`,
};

export const tips = {
	ALT_FILE_EXT: `<p>Czytniki ekranu przeczytają ten adres URL — często litera po literze. To zwykle nie oddaje sensu obrazu.</p><p>${why.fix}Dodaj pusty alt (alt=""), jeśli to dekoracja i ma być ignorowana, lub dodaj opisowy alt‑tekst.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Podany opis obrazu: <strong>"%(alt)"</strong></p><p>${why.fix}Ustaw krótki alt‑tekst, który oddaje znaczenie obrazu w tym kontekście.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Podany opis obrazu: <strong>"%(alt)"</strong></p><p>${why.fix}Ustaw krótki alt‑tekst, który oddaje znaczenie obrazu w tym kontekście.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>Alt‑tekst „%(alt)” składa się wyłącznie z niewymawialnych znaków/odstępów. Czytnik ogłosi „obraz”, po czym nastąpi cisza: „obraz: ____”.</p><p>${why.fix}Dodaj opisowy alt‑tekst lub użyj alt="" dla elementów, które mają być ignorowane (np. ikony dekoracyjne).</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Nadaj przyciskowi dostępną nazwę (np. tekstem, alt‑tekstem ikony lub atrybutem <code>title</code>).</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Atrybut <code>aria-labelledby</code> jest pusty lub wskazuje nieistniejące <code>ID</code>.</p><p>${why.fix}Powiąż poprawne ID albo usuń atrybut i zastosuj inną metodę nazwania przycisku.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'Obraz tła/gradient utrudnia automatyczne rozpoznanie koloru tła. Użyj selektora poniżej, aby ręcznie sprawdzić kontrast.',

	DUPLICATE_ID: `<p>ID na tej stronie służą jako etykiety i cele linków, więc muszą być unikalne.</p><p>${why.fix}Zmień ten identyfikator: <strong>#%(id)</strong></p><div class="why"><p>W wielu CMS pochodzi z pól „name/id”. W HTML to atrybut: <code>&lt;a id=""></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Usuń atrybut <code>title</code> z linku.</p><div class="why"><p>Uwaga: tooltips <code>title</code> są widoczne tylko przy najechaniu myszą — nie na urządzeniach mobilnych i nie w nawigacji klawiaturą; nie umieszczaj w nich kluczowych informacji.</p></div>`,

	EMBED_AUDIO: `<p>Jeśli audio zawiera mowę, zapewnij https://www.w3.org/WAI/media/av/transcribing/tekstową alternatywę</a> na stronie lub jako link.</p><p>Automatyczne transkrypcje/napisy należy skorygować (mówcy, znaczące dźwięki).</p>`,

	EMBED_DATA_VIZ: `<p>Osadzone wizualizacje bywają trudne dla technologii wspomagających, mało czytelne dla osób niedowidzących/ze ślepotą barw oraz wymagają przewijania w poziomie na urządzeniach mobilnych.</p><p>${why.fix}Jeśli nie zapewniają wysokiego kontrastu, pełnej obsługi klawiaturą <strong><em>i</em></strong> zrozumiałego opisu przez czytnik, udostępnij równoważnik (opis, tabelę, plik do pobrania), a następnie zamknij alert.</p>`,

	EMBED_GENERAL: 'Automatyczne testy nie analizują zawartości wewnątrz osadzeń. Upewnij się, że obrazy mają alt, filmy — napisy, tekst — odpowiedni kontrast, a linki/przyciski są https://webaim.org/techniques/keyboard/dostępne z klawiatury</a>. Potem możesz zignorować alert.',

	EMBED_MISSING_TITLE: `<p>Osadzony element potrzebuje dostępnej nazwy opisującej zawartość.</p><p>${why.fix}Dodaj unikalny <code>title</code> lub <code>aria-label</code>.</p>`,

	EMBED_UNFOCUSABLE: `Atrybut nakazuje pominąć element klawiaturze i technologiom wspomagającym. Jeśli iframe zawiera linki/przyciski/formularze albo jest przewijalny — usuń atrybut.`,

	EMBED_VIDEO: `<p>Filmy muszą mieć napisy.</p><p>Automatyczne napisy wymagają korekty (mówcy, dźwięki).</p><p>${why.fix}Dodaj/popraw napisy i zamknij alert.</p>`,

	HEADING_EMPTY: `<p>Puste nagłówki powodują luki w strukturze.</p><p>${why.fix}Dodaj treść albo usuń pustą linię.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Puste nagłówki zaburzają strukturę.</p><p>${why.fix}Jeśli to nie jest nagłówek, zmień format z <strong {C}>Nagłówka %(level)</strong> na <strong>Akapit</strong>. Jeśli to nagłówek — opisz znaczenie obrazu w alt‑tekście.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Upewnij się, że tytuł strony jest oznaczony jako Nagłówek 1 albo 2. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}Jeśli to nie tytuł formalny, skróć nagłówek dla lepszej skanowalności.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Oznacz tytuł strony jako nagłówek poziomu 1 — to początek struktury dokumentu.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Nagłówek przeskoczył z <strong>poziomu %(prevLevel)</strong> na <strong>poziom %(level)</strong>. Dla czytników brzmi to jak brak treści.</p><p>${why.fix}Ujednolić poziomy, aby zachować spójność.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: `Element ma <code>aria-hidden="true"</code>, a mimo to może otrzymać fokus klawiatury. Jeśli ma być niewidoczny dla czytników, dodaj też <code>tabindex="-1"</code>; w przeciwnym razie usuń <code>aria-hidden</code>.`,

	IMAGE_ALT_TOO_LONG: `<p>Czytniki czytają alt jako jedną frazę; przy długim tekście trudno wrócić do fragmentu.</p><p>Długość alt: %(altLength) znaków. <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Wskazówka: złożone obrazy zwykle wymagają <strong>widocznego</strong> opisu (podpisu/tekstu) — alt może do niego odsyłać:</p><ul><li>„Plakat balu w piątek — szczegóły w opisie poniżej”.</li><li>„Wykres: −10% r/r — szczegóły w tabeli”.</li></ul></div>`,

	IMAGE_DECORATIVE: `<p>Obraz ukryto przed czytnikami przez alt="". Tylko obrazy bez znaczenia treściowego powinny być tak oznaczane.</p><p>${why.fix}Jeśli obraz wnosi treść, dodaj alt‑tekst.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'Obraz oznaczony jako <strong>dekoracyjny</strong>, ale w karuzeli/galerii wszystkie obrazy powinny mieć opisowy alt‑tekst.',

	IMAGE_FIGURE_DECORATIVE: `<p>Obraz zostanie pominięty przez technologie wspomagające. Czy sam podpis wystarcza?</p><p>${why.fix}Jeśli nie — uzupełnij brakujące informacje w alt‑tekście.</p><div class="why"><p>Wskazówka: obraz + alt + podpis współdziałają:</p><ul><li>Podpis daje kontekst.</li><li>Alt opisuje, co jest na obrazie, dla osób, które go nie widzą.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Zmień alt tak, aby opisywał znaczenie wizualne, a nie powtarzał podpis.</p><div class="why"><p>Wskazówka: podpis to kontekst/interpretacja; alt wyjaśnia, co podpis opisuje.</p></div>`,

	LABELS_ARIA_LABEL_INPUT: `<p><strong {B}>Niewidoczna etykieta pola:</strong> <strong {C}>%(TEXT)</strong></p><p>Sprawdź, czy istnieje etykieta widoczna, pozostaje widoczna po wprowadzeniu treści i jest zgodna z nazwą dostępną.</p><div class="why"><p>Etykiety wyłącznie jako <em>title</em>/<em>placeholder</em> znikają podczas pisania i utrudniają weryfikację.</p></div>`,

	LABELS_INPUT_RESET: `<p>Przyciski „Resetuj” łatwo kliknąć przypadkowo — ryzyko utraty danych.</p><p>${why.fix}Jeśli nie resetuje pojedynczego pola, usuń lub wymagaj potwierdzenia.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'Przycisk‑obrazek nie ma alt‑tekstu. Dodaj np. <em>Szukaj</em> lub <em>Wyślij</em>.',

	LABELS_MISSING_LABEL: 'To pole nie ma powiązanej etykiety. Dodaj <code>id</code> i pasujące <code>for</code> w etykiecie.',

	LABELS_NO_FOR_ATTRIBUTE: 'Pole nie ma powiązanej etykiety. Dodaj w etykiecie <code>for</code> zgodny z <code>id</code> pola.<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>Tekst zastępczy znika przy pisaniu, bywa słabo kontrastowy lub mylony z treścią.</p><p>${why.fix}Zapewnij stałą widoczność etykiet, wskazówek i wymagań formatowania.</p>`,

	LABEL_IN_NAME: `<p>Widoczna etykieta różni się od nazwy dostępnej. To myli użytkowników i utrudnia sterowanie głosem.</p><p>${why.check}Zadbaj, aby widoczny tekst zaczynał się od nazwy dostępnej i nie dodawał nowej, ważnej treści.</p><p><strong>Niewidoczna etykieta:</strong> „%(TEXT)”</p>`,

	LINK_ALT_FILE_EXT: `<p>Alt obrazu zawiera „%(alt)”, co zwykle oznacza nazwę pliku, a nie cel linku.</p><p>${why.fix}Ustaw alt na opis celu linku.</p><div class="why"><p>Alt przekazuje znaczenie; dla obrazu‑linku jest nim jego cel:</p><ul><li>„Strona z tekstem” — opis obrazu.</li><li>„IMG_1234.jpg” — nazwa pliku.</li><li>„<strong><em>Formularz zgłoszeniowy (doc)</em></strong>” — faktyczny cel.</li></ul></div>`,

	LINK_ALT_MAYBE_BAD: `<p>Alt tego obrazu to placeholder: „<strong>%(alt)</strong>”.</p><p>${why.fix}Ustaw alt na cel linku.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>Alt „%(ALT_TEXT)” zawiera niewymawialne znaki/odstępy — linku nie da się opisać.</p><p>${why.fix}Opisz w alcie cel lub funkcję linku.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `Unikaj „kliknij tutaj” — nie przekazuje celu linku.`,

	LINK_DOI: `<p>${why.fix}Podlinkuj tytuł artykułu; DOI podaj jako zwykły tekst.</p><div class="why"><p>Opisowe linki ułatwiają skanowanie oraz zapowiedzi w czytnikach.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Dodaj opisowy tekst linku lub usuń go, jeśli powstał przez pomyłkę (np. na spacji).</p><div class="why"><p>Puste linki skutkują ciszą albo literowaniem URL.</p><p>Usunięcie „zlinkowanej spacji” może wymagać przepisania fragmentu.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p><code>aria-labelledby</code> wskazuje na nieistniejące <code>ID</code>.</p><p>${why.fix}Popraw odwołanie lub usuń atrybut.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Dodaj opisowy tekst albo usuń pusty link.</p><div class="why"><p>Czytniki nie są w stanie sensownie zapowiedzieć pustych linków.</p></div>`,

	LINK_FILE_EXT: `<p>Link prowadzi do pliku (PDF/MP3/ZIP/Word) bez uprzedzenia.</p><p>${why.fix}Wskaż typ pliku w tekście/ikonie: https://itmaybejj.github.io/linkpurpose/</a>.</p><p class="why">Przy dużych plikach podaj rozmiar, np. „Raport (PDF, 3 MB)”.</p>`,

	LINK_IDENTICAL_NAME: `<p>Wiele różnych linków używa tej samej etykiety: „<strong>%(TEXT)</strong>”.</p><p>${why.fix}Nadaj każdemu unikalną, opisową nazwę.</p>${why.links}`,

	LINK_IMAGE_ALT: `Upewnij się, że alt opisuje cel linku:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Sprawdź, czy alt pomaga opisać cel linku, nie dublując informacji:</p><p><strong class="badge">Alt</strong> „<em><strong>%(alt)</strong></em>”</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p>https://webaim.org/techniques/hypertext/link_text#alt_linkAlt obrazu‑linku powinien opisywać cel linku</a>. Długie alty zwykle opisują obraz, nie cel.</p>Ten alt ma %(altLength) znaków: <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Gdy link zawiera obraz, jego alt staje się https://webaim.org/techniques/hypertext/link_text#alt_linknazwą linku</a> dla czytnika.</p><p>${why.fix}Opisz w alcie cel/funkcję linku.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'Obraz oznaczono jako dekoracyjny, a link opiera się na otaczającym tekście jako etykiecie.',

	LINK_NEW_TAB: `<p>${why.fix}Otwieraj w tej samej karcie lub https://itmaybejj.github.io/linkpurpose/poinformuj z wyprzedzeniem</a> o nowej karcie.</p><div class="why"><p>Wymuszanie nowej karty bywa dezorientujące (np. „Cofnij” działa inaczej). Wyjątek: linki w formularzach często otwierają się w nowej karcie, aby nie utracić danych.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>Alt w obrazie‑linku to placeholder: „<strong>%(alt)</strong>”.</p><p>${why.fix}Ustaw alt na cel linku.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Link zawiera tekst, który nie opisuje celu:<br><strong>%(text)</strong></p><p>${why.fix}Zastąp go krótkim, jasnym opisem celu/funkcji.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>Jest nazwa ARIA, ale widoczny tekst jest ogólny: „<strong {C}>%(ERROR)</strong>”.</p><p>${why.fix}Zadbaj o znaczącą widoczną etykietę i spójność z ARIA.</p>${why.links}`,

	LINK_SUS_ALT: `<p>Alt zawiera „%(alt)”, co może oznaczać, że opisuje obraz zamiast celu linku.</p><strong class="badge">Alt‑tekst</strong> „%(ALT_TEXT)”<p>Naprawa: alt powinien opisywać cel/funkcję linku.<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Unikaj symboli jako „wezwania do działania” w treści linku (chyba że ukryte przed czytnikami). Mogą być myląco odczytywane. Rozważ usunięcie: <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Użyj tytułu celu lub jego funkcji zamiast adresu URL jako tekstu linku.</p><div class="why"><p>Użytkownicy — szczególnie z czytnikiem — skanują linki po nazwie.</p><p>URL w roli tekstu linku gorzej się skanuje i wyszukuje.</p></div>`,

	META_LANG: `<p>${why.fix}Dodaj https://www.w3.org/International/questions/qa-html-language-declarationsatrybut języka</a> do elementu HTML.</p><div class="why"><p>Czytniki dobierają wymowę na podstawie języka; błędny język utrudnia zrozumienie.</p></div>`,

	META_MAX: `<p>Meta‑tag ogranicza powiększanie.</p><p>${why.fix}Zezwól na pełny zoom, modyfikując lub usuwając ograniczenie.</p>`,

	META_REFRESH: `<p>Automatyczne odświeżanie bez uprzedzenia przerywa pracę i może resetować formularze.</p><p>${why.fix}Użyj AJAX/JS z komunikatem i opcją odłożenia.</p>`,

	META_SCALABLE: `<p>Ten meta‑tag blokuje powiększanie.</p><p>${why.fix}Usuń lub zmień ustawienia, aby dopuścić zoom.</p>`,

	META_TITLE: `<p>${why.fix}Dodaj <code><title></code> w sekcji <code><head></code>.</p><div class="why"><p>https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/titleKrótki, unikalny tytuł</a> jest kluczowy (wyniki wyszukiwarki, karty przeglądarki, czytniki podczas przełączania kart).</p><p>Bez tytułu użytkownik widzi tylko URL.</p></div>`,

	MISSING_ALT: `<p>Bez alt czytnik odczyta URL obrazu (często znak po znaku).</p><p>${why.fix}Użyj alt="" dla obrazów dekoracyjnych, a opisowego alt‑tekstu dla obrazów treściowych.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Obraz w linku bez alt skutkuje odczytaniem URL — szczególnie kłopotliwe.</p><p>${why.fix}Dodaj alt opisujący cel linku.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Obraz jest częścią linku z tekstem. Jeśli tekst opisuje cel — użyj alt=""; w przeciwnym razie dodaj alt z celem linku.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>Link wygląda na wewnętrzny (deweloperski):<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Użyj ścieżki względnej (/folder) albo publicznego URL.</p>`,

	QA_BLOCKQUOTE: `<p><code>blockquote</code> oznacza cytat. Krótkie „cytaty” bywają w rzeczywistości nagłówkami.</p><p>${why.fix}Jeśli to nagłówek — użyj stylu nagłówka, by pojawił się w strukturze.</p>${why.headings}`,

	QA_DOCUMENT: `<p>Linkowane pliki także są treścią WWW i muszą być dostępne. Sprawdź nagłówki, tabele i alty, po czym zamknij alert.</p><ul class="why"><li>Zobacz: https://support.google.com/docs/answer/6199477?hl=plGoogle Workspace — dostępność</a>.</li><li>Zobacz: https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155Microsoft Office — dostępność</a>.</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}Jeśli pogrubiony wiersz wprowadza nowy temat, zastosuj styl nagłówka zamiast samego wyróżnienia.</p><div class="why"><p>Nagłówki tworzą nawigowalną strukturę dla technologii wspomagających.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Jeśli „%(text)” to element listy — użyj prawdziwej listy.</p><div class="why"><p>Listy mają strukturę wizualną i semantyczną:</p><ol><li>Wyrównane wcięcia poprawiają czytelność.</li><li>Czytniki podają pozycję („3 z 7”).</li></ol><p>Sama liczba na początku zdania nie czyni listy.</p></div>`,

	QA_IN_PAGE_LINK: `<p>Cel linku wewnętrznego nie istnieje na stronie.</p><div class="why"><p>Dla programistów: jeśli to handler JS — zweryfikuj obsługę klawiaturą, zanim wyłączysz kontrolę.</p></div>`,

	QA_JUSTIFY: `<p>Justowanie tworzy nierówne odstępy i utrudnia czytanie.</p><p>${why.fix}Użyj wyrównania do lewej.</p>`,

	QA_NESTED_COMPONENTS: 'Unikaj zagnieżdżonych interaktywnych komponentów (np. akordeon w akordeonie, zakładki w akordeonie) — zwiększają obciążenie poznawcze i utrudniają nawigację.',

	QA_PDF: `<p>${why.fix}Wykonaj jedną z opcji i zamknij alert:</p><ul><li>Linkuj do strony WWW zamiast PDF,</li><li>albo obok PDF zapewnij wersję HTML/edytowalną,</li><li>albo upewnij się, że PDF ma znaczniki dostępności (nagłówki, kolejność czytania, nagłówki tabel, alty).</li></ul><div class="why"><p>Użytkownicy mobilni i korzystający z technologii asystujących zwykle wolą strony WWW — PDF nie reflowuje i często nie ma znaczników dostępności.</p></div>`,

	QA_SMALL_TEXT: 'Zbyt mały tekst jest trudny do czytania, zwłaszcza dla osób słabowidzących. Unikaj rozmiarów poniżej domyślnych.',

	QA_STRONG_ITALICS: `<p>${why.fix}Używaj pogrubienia/kursywy oszczędnie — dla słów kluczowych.</p><div class="why"><p>Jeśli to cytat, użyj <code>blockquote</code>.</p></div>`,

	QA_SUBSCRIPT: `Indeks górny/dolny zmniejsza czytelność. Stosuj go celowo (4<sup>ta</sup>, H<sub>2</sub>O, odnośniki).`,

	QA_UNDERLINE: `<p>Podkreślenie zwykle oznacza link — użytkownik będzie oczekiwał klikalności.</p><p>${why.fix}Wyróżniaj <strong>pogrubieniem</strong> lub <em>kursywą</em>; zmiany sekcji sygnalizuj nagłówkiem.</p><div class="why"><p>Czytniki nie zapowiadają stylu podkreślenia; strukturę daje nagłówek.</p></div>`,

	QA_UPPERCASE: `<p>DUŻE BLOKI TEKSTU WIELKIMI LITERAMI SĄ TRUDNIEJSZE DO CZYTANIA I BRZMIĄ JAK KRZYK.</p><p>${why.fix}Akcentuj krótkie frazy, lepiej pogrubieniem niż kapitalikami.</p><div class="why"><p>Czytniki nie zapowiadają pogrubienia; nowy temat sygnalizuj nagłówkiem.</p></div>`,

	SUS_ALT: `<p>Alt zawiera „%(alt)”, co bywa zbędne:</p><p><strong class="badge">Alt‑tekst</strong> „%(ALT_TEXT)”</p><p>Popraw: napisz krótki opis znaczenia obrazu.</p><div class="why"><p>Wskazówka: czytniki i tak zapowiadają obraz, więc zwroty „obraz/zdjęcie …” zwykle są zbędne.</p></div>`,

	TABINDEX_ATTR: `<p>${why.fix}Nie używaj dodatnich wartości <code>tabindex</code>. Uporządkuj HTML tak, by porządek wizualny, tabulacji i czytania był spójny.</p><div class="why"><p>Domyślnie trzy porządki się pokrywają.</p><p>Pozytywny tabindex zmienia tylko kolejność tabulacji — <strong>nie</strong> wizualną — co wprowadza chaos.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Upewnij się, że każda komórka nagłówka ma tekst.</p><div class="why"><p>Nagłówki pomagają czytnikom opisać kontekst komórek.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Wskaż w ustawieniach, czy nagłówki znajdują się w pierwszym wierszu, pierwszej kolumnie czy w obu.</p><div class="why"> <p>Czytniki powtarzają odpowiedni nagłówek przy wejściu do komórki.</p><p>Jeśli tabela służy tylko layoutowi, rozważ usunięcie formatowania tabeli.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Usuń nagłówek treści (h2, h3) z wnętrza tabeli; użyj nagłówków wierszy/kolumn. Jeśli potrzebne są poziomy — podziel tabelę.</p><div class="why"> <p>Nagłówki tabel działają „w rzędzie/kolumnie”; nagłówek treści wpływa na całą sekcję poniżej — nawet w innych kolumnach:</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2"><strong>Nagłówek tabeli</strong> w komórce 2 oznacza komórkę B.<br><br><strong>Nagłówek treści</strong> w komórce 2 „obejmuje” 3, A, B, C oraz ten tekst i stopkę podpowiedzi.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,
};

export const interfaceStrings = {
	ALERT_CLOSE: 'Zamknij',
	ALT: 'Tekst alternatywny: ',
	DECORATIVE: 'Oznaczone jako dekoracyjne',
	DISMISS: 'Ignoruj',
	DISMISS_ALL: 'Na tej stronie: ignoruj',
	edit_page: 'Edytuj stronę',
	edit_layout: 'Edytuj układ',
	edit_term: 'Edytuj termin',
	edit_user: 'Edytuj użytkownika',
	IMAGES: 'Tekst alternatywny',
	MAIN_TOGGLE_LABEL: 'Włącz narzędzia dostępności',
	MISSING: '(brak!)',
	NOT_VISIBLE: 'Uwaga: ta treść może być niewidoczna. Poszukaj jej w zaznaczonym obszarze.',
	NO_IMAGES: 'Nie znaleziono obrazów.',
	OUTLINE: 'Nagłówki',
	PANEL_DISMISS_BUTTON: `Pokaż %(dismissCount) ukrytych alertów`,
	PANEL_HEADING: 'Pokaż wizualizacje',
	SKIP_TO_ISSUE: 'Przejdź do problemu',
	WARNING: 'wymagana ręczna weryfikacja',
	WARNINGS: 'wymagane ręczne weryfikacje',
	buttonFirstContent: 'Przejdź do pierwszego alertu',
	buttonHideHiddenAlert: 'Ukryj ukryty alert',
	buttonHideHiddenAlerts: `Ukryj %(count) ukrytych alertów`,
	buttonShowHiddenAlert: 'Pokaż ukryty alert',
	buttonToolsActive: 'Ukryj wizualizacje',
	dismissActions: `Podobne alerty`,
	dismissHideTitle: 'Ukrywa alert tylko dla Ciebie',
	dismissOkAllButton: 'Na tej stronie: oznacz jako OK',
	dismissOkButtonContent: 'Oznacz jako OK',
	dismissOkTitle: 'Ukrywa alert dla wszystkich edytorów',
	dismissOnSite: 'Na wszystkich stronach: oznacz jako OK',
	dismissalsHeader: 'Nie zamierzasz tego naprawić?',
	errorOutlinePrefixHeadingEmpty: '(pusty nagłówek)',
	errorOutlinePrefixHeadingIsLong: '(oznaczony jako zbyt długi)',
	errorOutlinePrefixSkippedLevel: '(oznaczony jako pominięty poziom)',
	issueContent: 'Problem z treścią',
	issueDeveloper: 'Problem techniczny',
	issueTemplate: 'Problem szablonu',
	main_toggle_hide: 'Ukryj narzędzia dostępności',
	main_toggle_hide_alerts: 'Ukryj alerty dostępności',
	main_toggle_show: 'Pokaż narzędzia dostępności',
	main_toggle_show_alerts: 'Pokaż alerty dostępności',
	panelCheckAltText: `<p class="ed11y-small">Sprawdź, czy każdy obraz oddaje swoje znaczenie w kontekście i czy nie ma obrazów zawierających tekst.</p>`,
	panelCheckOutline: `<p class="ed11y-small">To narzędzie pokazuje strukturę nagłówków. Sprawdź, czy odpowiada ona wizualnej organizacji treści.</p>`,
	PANEL_HEADING_MISSING_ONE: 'Brakuje nagłówka poziomu 1.',
	PANEL_NO_HEADINGS: 'Nie znaleziono nagłówków.',
	reportsLink: 'Otwórz raporty serwisu',
	toggleDisabled: 'Brak treści, które Editoria11y może sprawdzić.',
	transferFocus: 'Edytuj tę treść',
	unDismissHideButton: 'Przywróć ten ukryty alert',
	unDismissNotePermissions: 'Ten test został ukryty przez administratora',
	unDismissOKButton: 'Przywróć alert oznaczony jako OK',
};

export const lang = {
	strings: Object.assign(Sa11yStrings.strings, interfaceStrings, tips),
	testNames: testNames,
}
