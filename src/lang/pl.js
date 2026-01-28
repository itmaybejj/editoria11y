import strings from '../sa11y-lang/pl.js';

// todo check each file for link integrity, and escaping of tags in code blocks.
export const testNames = {
	ALT_FILE_EXT: 'Ten tekst alternatywny jest nazwą pliku, a nie opisem',
	ALT_MAYBE_BAD: 'Ten tekst alternatywny nie może zostać poprawnie odczytany przez czytnik ekranu',
	ALT_PLACEHOLDER: 'Ten tekst alternatywny jest bezwartościowym tekstem zastępczym',
	ALT_UNPRONOUNCEABLE: 'Ten tekst alternatywny jest niewymawialny',
	BTN_EMPTY: 'Przycisk nie ma dostępnej etykiety',
	BTN_EMPTY_LABELLEDBY: 'Przycisk ma nieprawidłową etykietę ARIA',
	BTN_ROLE_IN_NAME: 'Nazwa przycisku powtarza słowo „button”',
	CONTRAST_ERROR: 'Tekst ma zbyt niski kontrast, aby był łatwo czytelny',
	CONTRAST_ERROR_GRAPHIC: 'Grafika lub ikona ma zbyt niski kontrast',
	CONTRAST_INPUT: 'Pole tekstowe ma zbyt niski kontrast, aby było czytelne',
	CONTRAST_PLACEHOLDER: 'Tekst zastępczy ma zbyt niski kontrast, aby był łatwo czytelny',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Czy ten tekst zastępczy ma wystarczający kontrast?',
	CONTRAST_WARNING: 'Czy ten tekst ma wystarczający kontrast?',
	CONTRAST_WARNING_GRAPHIC: 'Czy ta grafika lub ikona ma wystarczający kontrast?',
	DUPLICATE_ID: 'Zduplikowany atrybut ID',
	DUPLICATE_TITLE: 'Ten link ma podpowiedź (tooltip) z taką samą treścią jak sam link',
	EMBED_AUDIO: 'Czy ten materiał audio ma transkrypcję?',
	EMBED_DATA_VIZ: 'Czy ta wizualizacja jest dostępna?',
	EMBED_GENERAL: 'Osadzone elementy iframe wymagają ręcznej kontroli',
	EMBED_MISSING_TITLE: 'Brak atrybutu „title” w ramce (iframe)',
	EMBED_UNFOCUSABLE: 'Ramka z tabindex="-1" nie będzie dostępna z klawiatury.',
	EMBED_VIDEO: 'Czy ten film ma poprawne napisy?',
	HEADING_EMPTY: 'Nagłówek nie zawiera żadnego tekstu',
	HEADING_EMPTY_WITH_IMAGE: 'To zdjęcie jest użyte jako nagłówek, więc wymaga tekstu alternatywnego',
	HEADING_FIRST: 'Pierwszy nagłówek na tej stronie jest nagłówkiem niższego poziomu',
	HEADING_LONG: 'Czy ten nagłówek mógłby być krótszy?',
	HEADING_MISSING_ONE: 'Na tej stronie brakuje nagłówka poziomu 1',
	HEADING_SKIPPED_LEVEL: 'Ten nagłówek ma nieprawidłowy poziom hierarchii',
	HIDDEN_FOCUSABLE: 'Ten element nie może zostać poprawnie zinterpretowany przez czytniki ekranu',
	IMAGE_ALT_TOO_LONG: 'Czy ten tekst alternatywny może być krótszy?',
	IMAGE_DECORATIVE: 'Czy to zdjęcie naprawdę nie ma żadnego znaczenia?',
	IMAGE_DECORATIVE_CAROUSEL: 'Obraz w karuzeli lub galerii oznaczony jako dekoracyjny',
	IMAGE_FIGURE_DECORATIVE: 'Ręczna kontrola: obraz z podpisem, lecz bez tekstu alternatywnego',
	IMAGE_FIGURE_DUPLICATE_ALT: 'Tekst alternatywny nie powinien być taki sam jak podpis pod zdjęciem',
	LABELS_ARIA_LABEL_INPUT: 'Czy to pole ma widoczną etykietę?',
	LABELS_PLACEHOLDER: 'Ręczna kontrola: tekst zastępczy',
	LABELS_INPUT_RESET: 'Czy ten przycisk „resetuj” jest naprawdę potrzebny?',
	LABEL_IN_NAME: 'Widoczna etykieta nie zgadza się z etykietą ukrytą',
	LINK_ALT_FILE_EXT: 'Alt użyty jako link nie powinien być adresem URL',
	LINK_ALT_MAYBE_BAD: 'Ten tekst alternatywny w linku nie może zostać odczytany przez czytnik ekranu',
	LINK_ALT_UNPRONOUNCEABLE: 'Obrazy będące linkami muszą mieć wymawialny tekst alternatywny',
	LINK_CLICK_HERE: 'Ręczna kontrola: link zawiera słowa „kliknij tutaj”',
	LINK_DOI: 'Linkuj tytuły artykułów, a nie numery DOI',
	LINK_EMPTY: 'Ten link nie ma tekstu',
	LINK_EMPTY_LABELLEDBY: 'Link z nieprawidłowym atrybutem aria-labelledby',
	LINK_EMPTY_NO_LABEL: 'Ten link wymaga etykiety',
	LINK_FILE_EXT: 'Link prowadzi do pliku bez ostrzeżenia',
	LINK_IDENTICAL_NAME: 'Czy ten link jednoznacznie opisuje swój cel?',
	LINK_IMAGE_ALT: 'Ręczna kontrola: obraz użyty jako link z tekstem alternatywnym',
	LINK_IMAGE_ALT_AND_TEXT: 'Czy ten tekst alternatywny ma sens wewnątrz linku?',
	LINK_IMAGE_LONG_ALT: 'Czy tekst alternatywny tego obrazu‑linku może być krótszy?',
	LINK_IMAGE_NO_ALT_TEXT: 'Obraz użyty jako link wymaga tekstu alternatywnego',
	LINK_IMAGE_TEXT: 'Ręczna kontrola: obraz wewnątrz linku oznaczony jako dekoracyjny.',
	LINK_NEW_TAB: 'Czy ten link otwiera nowe okno/zakładkę bez ostrzeżenia?',
	LINK_PLACEHOLDER_ALT: 'Ten obraz‑link wymaga znaczącego tekstu alternatywnego',
	LINK_STOPWORD: 'Czy ten link opisuje swoją destynację?',
	LINK_STOPWORD_ARIA: 'Znaczący tekst linku dostępny jest tylko dla czytników ekranu',
	LINK_SUS_ALT: 'Czy tekst alternatywny opisuje obraz, czy link?',
	LINK_SYMBOLS: 'Ręczna kontrola: czy symbole lub emoji w tym linku mają znaczenie?',
	LINK_URL: 'Tekst linku nie powinien być adresem URL',
	META_LANG: 'Brakuje meta tagu określającego język strony',
	META_MAX: 'Meta tag ogranicza skalowanie tekstu przez użytkownika',
	META_REFRESH: 'Meta tag automatycznie odświeża stronę',
	META_SCALABLE: 'Meta tag uniemożliwia powiększanie tekstu',
	META_TITLE: 'Brakuje meta tagu „title” strony',
	MISSING_ALT: 'Nieprawidłowy HTML: obraz bez atrybutu alt',
	MISSING_ALT_LINK: 'Nieprawidłowy HTML: obraz‑link bez atrybutu alt',
	MISSING_ALT_LINK_HAS_TEXT: 'Nieprawidłowy HTML: obraz wewnątrz linku bez atrybutu alt',
	QA_BAD_LINK: 'Ręczna kontrola: link może prowadzić do niepoprawnego miejsca',
	QA_BLOCKQUOTE: 'Czy ten blok cytatu powinien być nagłówkiem?',
	QA_DOCUMENT: 'Czy ten dokument jest poprawnie otagowany dla czytników ekranu?',
	QA_FAKE_HEADING: 'Czy ten pogrubiony tekst powinien być nagłówkiem?',
	QA_FAKE_LIST: 'Czy to powinno być sformatowane jako lista?',
	QA_IN_PAGE_LINK: 'Uszkodzony link wewnętrzny',
	QA_JUSTIFY: 'Nie używaj justowania tekstu',
	QA_NESTED_COMPONENTS: 'Zagnieżdżone komponenty interaktywne',
	QA_PDF: 'Czy istnieje alternatywa dla tego pliku PDF?',
	QA_SMALL_TEXT: 'Tekst jest zbyt mały',
	QA_STRONG_ITALICS: 'Duże bloki wyróżnionego tekstu są trudniejsze w czytaniu',
	QA_SUBSCRIPT: 'Nie używaj indeksu górnego/dolnego tylko dla efektu wizualnego',
	QA_UNDERLINE: 'Podkreślenie powinno oznaczać linki — nie zwykły tekst',
	QA_UPPERCASE: 'Czy ten tekst WIELKIMI LITERAMI jest konieczny?',
	SUS_ALT: 'Czy w tym tekście alternatywnym są zbędne słowa?',
	TABINDEX_ATTR: 'Atrybut tabindex zakłóca kolejność czytania',
	TABLES_EMPTY_HEADING: 'Ta komórka nagłówka tabeli wymaga tekstu',
	TABLES_MISSING_HEADINGS: 'W tej tabeli brakuje rzędu i/lub kolumny nagłówków',
	TABLES_SEMANTIC_HEADING: 'Nagłówków treści nie należy używać wewnątrz tabel',
	UNCONTAINED_LI: 'Niepoprawna lista HTML',
};

const why = {
	fix: `<strong class="badge">Jak naprawić</strong> `,
	check: `<strong class="badge">Wymaga ręcznej kontroli</strong> `,

	buttons: `<div class="why"><p>Uwaga: dostępna nazwa przycisku powinna jasno wskazywać jego działanie. Przyciski, które zmieniają swoje działanie po kliknięciu, muszą również zmieniać swoją nazwę:</p><ul>
<li>Zmiana etykiet:<br>"Odtwórz/Pauza", "Pokaż szczegóły/Ukryj szczegóły"</li>
<li>Zmiana <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">atrybutów stanu ARIA</a>:<br>"Odtwórz/Odtwórz — wciśnięty", "Szczegóły — zwinięte/Szczegóły — rozwinięte."</li>
</ul>
<p>Nie zmieniaj obu rzeczy jednocześnie. Zmiana „Odtwórz” na „Pauza — wciśnięty” oznacza, że odtwarzacz jest wstrzymany, a nie że odtwarza!</p></div>`,

	headings: `<div class="why"><p>Wskazówka: nagłówki i podnagłówki organizują treść w strukturę hierarchiczną. Użytkownicy czytników ekranu polegają na tej strukturze, aby rozumieć i poruszać się po stronie:</p><ul>
<li>Nagłówek poziomu 1: tytuł strony
<ul><li>Nagłówek poziomu 2: główne sekcje
<ul><li>Nagłówek poziomu 3: podsekcje</li></ul>
</li></ul>
</li>
</ul></div>`,

	images: `<div class="why"><p>Wskazówka: pisząc tekst alternatywny, opisz to, co obraz <em>znaczy</em>, a nie tylko to, co przedstawia. W zależności od kontekstu to samo zdjęcie może oznaczać:</p><ul>
<li>Grali na zewnątrz mimo ulewy.</li>
<li>Nowe stroje drużyny mają efektowne smocze logo.</li>
<li>Zdobyła zwycięskiego gola z lewej strony boiska!</li>
</ul></div>`,

	links: `<div class="why"><p>Użytkownicy przeglądają stronę, skanując linki i wyszukując je po nazwie. Dlatego linki powinny być znaczące, unikalne i zwięzłe:</p><ul>
<li>Idealny przykład: "Dowiedz się więcej o <a href="https://webaim.org/techniques/hypertext/link_text">znaczących linkach</a>"</li>
<li>Nieunikalny: "Kliknij <a href="https://webaim.org/techniques/hypertext/link_text">her</a>, aby dowiedzieć się więcej."</li>
<li>Niezwięzły: "<a href="https://webaim.org/techniques/hypertext/link_text">Kliknij tutaj, aby dowiedzieć się więcej o znaczących linkach</a>"</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>Celem tekstu alternatywnego jest przekazanie znaczenia obrazu. W przypadku obrazów użytych jako linki ich znaczeniem jest cel linku:</p><ul>
<li>"<em>Lupa</em>" opisuje obraz, a nie link.</li>
<li>"<em>Lupa wyszukiwania</em>" niejasno opisuje oba.</li>
<li>"<em>Szukaj</em>" opisuje cel linku poprawnie.</li>
</ul></p></div>`,
};

export const tips = {

	ALT_FILE_EXT: `<p>Czytniki ekranu przeczytają ten adres URL, często litera po literze. Prawdopodobnie nie przekazuje to tego samego znaczenia, co obejrzenie obrazu.</p><p>${why.fix}Dodaj pusty atrybut alt (alt=""), jeśli jest to dekoracja i powinna być ignorowana przez czytniki ekranu, lub dodaj opisowy tekst alternatywny.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Podany opis tego obrazu: <strong>"%(alt)"</strong></p><p>${why.fix}Ustaw tekst alternatywny jako zwięzły opis tego, co obraz znaczy w tym kontekście.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Podany opis tego obrazu: <strong>"%(alt)"</strong></p><p>${why.fix}Ustaw tekst alternatywny jako zwięzły opis tego, co obraz znaczy w tym kontekście.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>Tekst alternatywny tego obrazu to "%(alt)", ale zawiera tylko symbole i/lub spacje, których nie da się wypowiedzieć. Czytniki ekranu ogłoszą, że obraz jest obecny, a następnie zrobią znaczącą pauzę: „obraz: ____”.</p><p>${why.fix}Dodaj opisowy tekst alternatywny lub pozostaw alt całkowicie pusty (alt=""), jeśli to tylko ikona lub element odstępu, który powinien być ignorowany.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Użyj dowolnej poprawnej metody, aby poinformować czytniki ekranu, co robi ten przycisk — tekst, alt‑tekst ikony lub atrybut title.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Ten przycisk ma atrybut <code>aria-labelledby</code>, który jest pusty lub nie odpowiada żadnemu atrybutowi <code>ID</code> na stronie.</p><p>${why.fix}Połącz ten ID z istniejącym elementem lub usuń atrybut i opisz przycisk w inny sposób.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'Obraz tła lub gradient utrudnia określenie koloru znajdującego się za tekstem. Użyj selektora kolorów poniżej, aby ręcznie sprawdzić kontrast.',

	DUPLICATE_ID: `<p>Atrybuty ID są używane na tej stronie jako etykiety lub cele linków, więc muszą być unikalne.</p><p>${why.fix}Zmień ten ID: <strong>#%(id)</strong></p><div class="why"><p>W większości CMS wartość ta pochodzi z pola „name” lub „id” w opcjach edycji. W HTML jest to atrybut: <code><a id="MY-ID"></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Usuń atrybut <code>title</code> z tego linku.</p><div class="why"><p>Uwaga: podpowiedzi <code>title</code> pojawiają się tylko po najechaniu myszą. Nie są widoczne na telefonach ani przy użyciu klawiatury, więc wielu użytkowników ich nie zobaczy. Nigdy nie powinny zawierać kluczowych informacji.</p></div>`,

	EMBED_AUDIO: `<p>Jeśli ten materiał audio zawiera mowę, należy udostępnić https://www.w3.org/WAI/media/av/transcribing/alternatywną wersję tekstową</a> na tej stronie lub podlinkować ją osobno.</p><p>Automatyczne transkrypcje muszą zostać sprawdzone przez człowieka, aby zapewnić poprawną identyfikację mówców i ważnych dźwięków.</p>`,

	EMBED_DATA_VIZ: `<p>Osadzone wizualizacje są często trudne lub niemożliwe do obsługi przez technologie wspomagające. Mogą być nieczytelne dla osób niedowidzących lub z zaburzeniami widzenia barw, i mogą wymagać nadmiernego przewijania poziomego na telefonach.</p><p>${why.fix}Jeśli ta wizualizacja nie ma wysokiego kontrastu, nie jest w pełni obsługiwana klawiaturą <strong><em>i</em></strong> nie jest poprawnie interpretowana przez czytniki ekranu, należy udostępnić równoważną alternatywę: opis tekstowy, tabelę lub pobieralny arkusz danych.</p>`,

	EMBED_GENERAL: 'Automatyczne narzędzia testujące nie mogą analizować treści wewnątrz elementów embed. Upewnij się, że wszystkie obrazy mają alt‑tekst, filmy mają napisy, tekst ma wystarczający kontrast, a linki i przyciski są <a href="https://webaim.org/techniques/keyboard/">dostępne z klawiatury</a>, a następnie możesz zignorować ten alert.',

	EMBED_MISSING_TITLE: `<p>Elementy osadzone wymagają dostępnej nazwy opisującej ich treść dla czytników ekranu.</p><p>${why.fix}Dodaj unikalny atrybut <code>title</code> lub <code>aria-label</code>.</p>`,

	EMBED_UNFOCUSABLE: `Ten atrybut informuje klawiatury i technologie wspomagające, aby ignorowały ten element. Jeśli wewnątrz iframa znajdują się linki, przyciski lub pola formularzy albo jeśli można go przewijać, należy usunąć ten atrybut.`,

	EMBED_VIDEO: `<p>Filmy muszą mieć napisy.</p><p>Automatyczne napisy wymagają ręcznej korekty w celu poprawnego oznaczenia mówców i istotnych dźwięków.</p><p>${why.fix}Dodaj lub popraw napisy, a następnie zamknij ten alert.</p>`,

	HEADING_EMPTY: `<p>Puste nagłówki tworzą luki w strukturze strony.</p><p>${why.fix}Dodaj tekst do tego nagłówka lub usuń pustą linię.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Puste nagłówki tworzą luki w strukturze strony.</p><p>${why.fix}Jeśli to nie jest nagłówek, zmień format z <strong {C}>Nagłówka %(level)</strong> na <strong>Akapit</strong>. Jeśli jest to nagłówek, przenieś znaczenie obrazu do tekstu alternatywnego.</p>${why.headings}`,

	HEADING_FIRST: `<p>${why.fix}Upewnij się, że tytuł strony jest oznaczony jako nagłówek poziomu 1 lub 2.</p>${why.headings}`,

	HEADING_LONG: `<p>${why.fix}Jeśli nie jest to tytuł formalny (np. artykułu naukowego), skróć go, aby ułatwić użytkownikom skanowanie treści.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Oznacz tytuł strony jako nagłówek poziomu 1, aby zaznaczyć początek struktury dokumentu.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Ten nagłówek przeskoczył z <strong>poziomu %(prevLevel)</strong> na <strong>poziom %(level)</strong>. Dla czytników ekranu wygląda to tak, jakby brakowało części treści.</p><p>${why.fix}Dostosuj poziomy nagłówków, aby zachować logiczną strukturę.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: 'Ten interaktywny element ma <code>aria-hidden="true"</code>, ale nadal może otrzymać fokus z klawiatury. Jeśli ma być ukryty dla czytników ekranu, dodaj także <code>tabindex="-1"</code>. W przeciwnym razie usuń <code>aria-hidden="true"</code>.',

	IMAGE_ALT_TOO_LONG: `<p>Tekst alternatywny jest odczytywany przez czytniki ekranu jako jedno zdanie — jeśli użytkownik coś przegapi, musi odsłuchać wszystko od nowa.</p><p>Ten tekst alternatywny ma %(altLength) znaków: <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Wskazówka: złożone obrazy, potrzebujące więcej niż jedno zdanie opisu, zwykle wymagają <strong>widocznego</strong> podpisu lub dłuższego opisu tekstowego.</p></div>`,

	IMAGE_DECORATIVE: `<p>To zdjęcie zostało ukryte przed czytnikami ekranu poprzez pusty alt. Tylko obrazy bez znaczenia — np. dekoracyjne ikony — powinny być ukrywane w ten sposób.</p><p>${why.fix}Jeśli to zdjęcie wnosi treść, dodaj do niego tekst alternatywny.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'Zdjęcie oznaczone jako <strong>dekoracyjne</strong>, ale wszystkie obrazy w karuzeli lub galerii powinny mieć opisowy tekst alternatywny.',

	IMAGE_FIGURE_DECORATIVE: `<p>To zdjęcie będzie ignorowane przez technologie asystujące. Czy podpis ma sens bez samego obrazu?</p><p>${why.fix}Jeśli podpis nie opisuje w pełni znaczenia wizualnego, dodaj tekst alternatywny uzupełniający brakujące informacje.</p><div class="why"><p>Wskazówka: obrazy, teksty alternatywne i podpisy działają razem:</p><ul><li>Widoczne podpisy zapewniają kontekst i interpretację.</li><li>Teksty alternatywne opisują obraz dla osób, które go nie widzą.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Zmień tekst alternatywny tak, aby opisywał znaczenie wizualne obrazu.</p><div class="why"><p>Wskazówka: obrazy, teksty alternatywne i podpisy działają razem:</p><ul><li>Widoczne podpisy zapewniają kontekst i interpretację.</li><li>Tekst alternatywny opisuje obraz, aby osoby niewidzące mogły zrozumieć, do czego odnosi się podpis.</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: '<p><strong {B}>Niewidoczna etykieta pola:</strong> <strong {C}>%(TEXT)</strong></p><p>Upewnij się, że istnieje widoczna etykieta, że pozostaje widoczna po wprowadzeniu tekstu i że zgadza się z niewidoczną etykietą ARIA.</p><div class="why"><p>Etykiety dostępne wyłącznie przez title lub placeholder znikają podczas pisania i utrudniają przeglądanie oraz wprowadzanie danych.</p></div>',

	LABELS_INPUT_RESET: `<p>Przyciski resetowania można łatwo kliknąć przypadkowo, co może spowodować utratę danych bez możliwości cofnięcia.</p><p>${why.fix}Jeśli nie resetuje on tylko jednego pola, rozważ jego usunięcie lub dodanie potwierdzenia przed wykonaniem działania.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'Przycisk‑obrazek nie ma tekstu alternatywnego. Dodaj alt opisujący cel przycisku, np. <em>Szukaj</em> lub <em>Wyślij</em>.',

	LABELS_MISSING_LABEL: 'Do tego pola nie jest przypisana żadna etykieta. Dodaj atrybut <code>id</code> do pola i dopasowany atrybut <code>for</code> w etykiecie.',

	LABELS_NO_FOR_ATTRIBUTE: 'Brak powiązanej etykiety dla tego pola. Dodaj do etykiety atrybut <code>for</code> zgodny z atrybutem <code>id</code> pola.<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>Tekst zastępczy znika po rozpoczęciu pisania, często ma niski kontrast lub może wyglądać jak treść właściwa.</p><p>${why.fix}Upewnij się, że kluczowe informacje — etykieta, instrukcje, wskazówki — pozostają widoczne, nawet gdy użytkownik wpisuje tekst.</p>`,

	LABEL_IN_NAME: `<p>Widoczna etykieta tego elementu wydaje się różna od jego dostępnej nazwy. Może to dezorientować użytkowników czytników ekranu oraz utrudniać korzystanie z komend głosowych.</p><p>${why.check}Upewnij się, że widoczna etykieta rozpoczyna się od niewidocznej etykiety, a także nie zawiera dodatkowych, ważnych informacji nieobecnych w ARIA.</p><p><strong>Niewidoczna etykieta:</strong> "%(TEXT)"</p>`,

	LINK_ALT_FILE_EXT: `<p>Tekst alternatywny tego obrazu zawiera "%(alt)", co prawdopodobnie oznacza nazwę pliku, a nie opis celu linku.</p><p>${why.fix}Ustaw tekst alternatywny tak, aby opisywał cel linku.</p><div class="why"> <p>Teksty alternatywne powinny odzwierciedlać znaczenie obrazu. W przypadku obrazów‑linków znaczeniem jest <strong>cel linku</strong>:</p><ul><li>"Strona z tekstem" opisuje obraz, a nie link.</li><li>"IMG_1234.jpg" to tylko nazwa pliku.</li><li>"<strong><em>Formularz zgłoszeniowy (doc)</em></strong>" opisuje faktyczny cel linku.</li></ul></p></div>`,

	LINK_ALT_MAYBE_BAD: `<p>Tekst alternatywny tego obrazu jest tekstem zastępczym: "<strong>%(alt)</strong>".</p><p>${why.fix}Ustaw alt tak, aby opisywał cel linku.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>Tekst alternatywny tego obrazu‑linku zawiera jedynie niewymawialne znaki lub spacje: "%(ALT_TEXT)". Czytniki ekranu ogłoszą link, ale nie będą w stanie go opisać.</p><p>${why.fix}Ustaw alt tak, aby opisywał przeznaczenie lub funkcję linku.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `Sformułowania „kliknij” lub „kliknij tutaj” są zbędne i odwracają uwagę od właściwego celu linku.`,

	LINK_DOI: `<p>${why.fix}Podlinkuj tytuł artykułu, a numer DOI pozostaw jako zwykły tekst — zamiast linkować DOI i pozostawiać tytuł niepodlinkowany.</p><div class="why"><p>https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20linksZasady APA</a> zalecają stosowanie opisowych linków, ponieważ użytkownicy skanują listy linków, szukając nazw.</p><p>Ułatwia to także czytnikom ekranu ogłaszanie znaczących linków zamiast nic nieznaczących numerów.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Dodaj tekst opisujący cel linku lub usuń link, jeśli został przypadkowo utworzony (np. link na pustej spacji).</p><div class="why"><p>Czytniki ekranu mają trudności z linkami pustymi — mogą milczeć lub odczytywać adres URL znak po znaku.</p><p>Czasem trudno usunąć pusty link — w niektórych edytorach trzeba przepisać tekst wokół niego.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>Ten link ma atrybut <code>aria-labelledby</code>, który nie odpowiada żadnemu ID na stronie.</p><p>${why.fix}Dodaj poprawne ID lub usuń ten atrybut.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Dodaj opisowy tekst lub usuń link, jeśli to pomyłka.</p><div class="why"><p>Czytniki ekranu nie radzą sobie dobrze z pustymi linkami i mogą czytać adres URL litera po literze.</p><p>Aby usunąć pusty link, czasami trzeba przepisać fragment tekstu.</p></div>`,

	LINK_FILE_EXT: `<p>Ten link prowadzi do pliku (PDF, MP3, ZIP, Word itp.) bez wcześniejszej informacji o tym.</p><p>${why.fix}Użyj tekstu lub ikony, aby https://itmaybejj.github.io/linkpurpose/oznaczyć typ pliku</a>.</p><p class="why">W przypadku dużych plików warto podać rozmiar, np. "Raport roczny (PDF, 3 MB)".</p>`,

	LINK_IDENTICAL_NAME: `<p>Wiele linków mających różne cele ma tę samą nazwę: "<strong>%(TEXT)</strong>".</p><p>${why.fix}Przepisz linki tak, aby każdy z nich jasno i jednoznacznie opisywał swój cel.</p>${why.links}`,

	LINK_IMAGE_ALT: `Upewnij się, że ten tekst alternatywny opisuje cel linku:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Sprawdź, czy ta alt‑tekst pomaga opisać cel linku i nie dodaje zbędnych, mylących informacji:</p><p><strong class="badge">Alt</strong> "<em><strong>%(alt)</strong></em>"</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p>https://webaim.org/techniques/hypertext/link_text#alt_linkWedług zaleceń WebAIM</a> tekst alternatywny obrazu będącego linkiem powinien opisywać cel linku. Linki muszą być krótkie i jasne, ponieważ użytkownicy często przeglądają tylko listę linków. Długi alt sugeruje opis obrazu, a nie celu.</p>Tekst alternatywny ma %(altLength) znaków: <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Gdy obraz jest częścią linku, jego alt‑tekst https://webaim.org/techniques/hypertext/link_text#alt_linkstaje się nazwą linku</a> dla czytnika ekranu.</p><p>${why.fix}Ustaw alternatywny tekst opisujący cel lub funkcję linku.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'Obraz oznaczono jako dekoracyjny, ale link wykorzystuje otaczający tekst jako widoczną etykietę.',

	LINK_NEW_TAB: `<p>${why.fix}Ustaw link tak, aby otwierał się w tej samej karcie lub https://itmaybejj.github.io/linkpurpose/poinformuj użytkowników</a>, jeśli ma otwierać nową kartę.</p><div class="why"><p>Narzucanie otwierania w nowej karcie może być mylące, szczególnie gdy użytkownicy polegają na przycisku „cofnij”.</p><p>Uwaga: linki w formularzach często otwierają się w nowych kartach, aby zapobiec utracie danych.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>Alternatywny tekst tego obrazu‑linku to tekst zastępczy: "<strong>%(alt)</strong>".</p><p>${why.fix}Ustaw tekst alternatywny tak, aby opisywał cel linku.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Ten link zawiera tekst, który nie opisuje celu linku:<br><strong>%(text)</strong></p><p>${why.fix}Przepisz tekst linku tak, aby jasno opisywał jego cel.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>Podano dostępną nazwę ARIA, ale widoczna etykieta linku jest ogólnikowa: "<strong {C}>%(ERROR)</strong>".</p><p>${why.fix}Upewnij się, że widoczny tekst linku jest znaczący i zgodny z nazwą ARIA.</p>${why.links}`,

	LINK_SUS_ALT: `<p>Tekst alternatywny zawiera słowo "%(alt)", co często jest sygnałem, że opisuje obraz zamiast celu linku.</p><strong class="badge">Tekst alternatywny</strong> "%(ALT_TEXT)"    <p>Aby poprawić: upewnij się, że alt opisuje cel lub funkcję linku.<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Unikaj używania symboli jako elementów zachęcających do kliknięcia w tekstach linków, chyba że są ukryte przed czytnikami ekranu. Mogą być wymawiane w niejednoznaczny sposób. Rozważ usunięcie: <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Użyj nazwy opisującej cel linku zamiast adresu URL.</p><div class="why"><p>Użytkownicy — w tym osoby korzystające z czytników ekranu — przeglądają linki po ich treści.</p><p>URL jako tekst linku jest trudny do szybkiego zeskanowania i znalezienia.</p></div>`,

	META_LANG: `<p>${why.fix}Dodaj https://www.w3.org/International/questions/qa-html-language-declarationsatrybut języka</a> do elementu HTML na stronie.</p><div class="why"><p>Czytniki ekranu używają tego atrybutu, aby poprawnie wymówić tekst. Niepoprawny język utrudnia zrozumienie.</p></div>`,

	META_MAX: `<p>Ten meta tag ogranicza możliwość powiększania tekstu przez użytkownika.</p><p>${why.fix}Usuń to ograniczenie lub zmodyfikuj je, aby umożliwić pełne powiększanie.</p>`,

	META_REFRESH: `<p>Strony nie powinny odświeżać się automatycznie przy użyciu meta tagu, ponieważ może to utrudnić pracę użytkownikom, spowodować utratę wpisanych danych czy przenieść ich w inne miejsce.</p><p>${why.fix}Użyj AJAX lub JavaScript, aby odświeżać treść i jednocześnie poinformować użytkownika lub pozwolić mu opóźnić odświeżenie.</p>`,

	META_SCALABLE: `<p>Ten meta tag uniemożliwia powiększanie strony.</p><p>${why.fix}Zezwól na pełne skalowanie, usuwając lub dostosowując ten atrybut.</p>`,

	META_TITLE: `<p>${why.fix}Dodaj tag <code><title></code> wewnątrz elementu <code><head></code>.</p><div class="why"><p>https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/titleKrótki i unikalny tytuł strony</a> jest niezbędny dla:</p><ul><li>wyników wyszukiwarek,</li><li>nazw kart w przeglądarkach,</li><li>czytników ekranu — odczytujących tytuł podczas przełączania kart.</li></ul><p>Bez tytułu użytkownik zobaczy tylko adres URL.</p></div>`,

	MISSING_ALT: `<p>Gdy czytniki ekranu napotkają obraz bez alt, czytają adres URL obrazu litera po literze.</p><p>${why.fix}Dodaj alt="" dla obrazów dekoracyjnych lub opisowy tekst alternatywny dla obrazów znaczących.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Gdy obraz znajdujący się w linku nie ma alt, czytniki ekranu odczytują adres URL — co jest szczególnie problematyczne.</p><p>${why.fix}Dodaj tekst alternatywny opisujący cel linku.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Ten obraz jest częścią linku posiadającego tekst widoczny dla użytkownika. Jeśli ten tekst dokładnie opisuje cel linku, dodaj alt="" aby czytniki go ignorowały. W przeciwnym razie dodaj alt opisujący cel linku.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>Link wydaje się prowadzić do środowiska programistycznego:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Zmień go na ścieżkę względną (/folder) lub publiczny adres URL.</p>`,

	QA_BLOCKQUOTE: `<p>Format blockquote oznacza cytat wyczytywany przez czytniki ekranu. Krótkie cytaty często są faktycznie nagłówkami.</p><p>${why.fix}Jeśli to nagłówek, użyj stylu nagłówka.</p>${why.headings}`,

	QA_DOCUMENT: `<p>Linkowane dokumenty są traktowane jako treści internetowe i również muszą być dostępne. Sprawdź nagłówki, tabele i teksty alternatywne, a następnie możesz zignorować ten alert.</p><ul class="why"><li>Dostępność dokumentów https://support.google.com/docs/answer/6199477?hl=plGoogle Workspace</a>.</li><li>Dostępność dokumentów https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155Microsoft Office</a>.</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}Jeśli ten pogrubiony tekst wprowadza nowy temat, zastąp formatowanie wizualne stylem nagłówka.</p><div class="why"><p>Wskazówka: nagłówki tworzą czytelną strukturę dokumentu i pomagają w nawigacji czytnikom ekranu.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Jeśli "%(text)" faktycznie jest elementem listy, sformatuj go jako listę.</p><div class="why"><p>Listy mają strukturę wizualną i semantyczną:</p><ol><li>Lepiej organizują treść i ułatwiają skanowanie.</li><li>Są rozpoznawane przez czytniki ekranu, które ogłaszają pozycję, np. „element 3 z 7”.</li></ol><p>Akapit zaczynający się od liczby nie jest prawdziwą listą.</p></div>`,

	QA_IN_PAGE_LINK: `<p>Cel tego linku wewnętrznego nie odpowiada żadnemu elementowi na stronie.</p><div class="why"><p>Uwaga dla programistów: jeśli link wywołuje zdarzenie JavaScript, upewnij się, że działa także przy użyciu klawiatury.</p></div>`,

	QA_JUSTIFY: `<p>Justowanie tekstu wprowadza nierówne odstępy między słowami, co utrudnia czytanie wielu osobom.</p><p>${why.fix}Użyj wyrównania do lewej.</p>`,

	QA_NESTED_COMPONENTS: 'Unikaj zagnieżdżania komponentów interaktywnych — np. akordeonów w akordeonach lub zakładek w akordeonach. To utrudnia nawigację i może powodować pomijanie treści.',

	QA_PDF: `<p>${why.fix}Wykonaj jedną z poniższych czynności, a następnie możesz zignorować ten alert:</p><ul><li>Linkuj do strony internetowej zamiast do PDF,</li><li>lub udostępnij również wersję HTML lub edytowalną,</li><li>lub upewnij się, że PDF jest dostępny (ma nagłówki, poprawny porządek odczytu, tabele i teksty alternatywne).</li></ul><div class="why"><p>Użytkownicy mobilni i osoby korzystające z czytników ekranu zwykle wolą strony internetowe niż PDF — pliki PDF często nie są responsywne i brakuje im struktury dostępności.</p></div>`,

	QA_SMALL_TEXT: 'Zbyt mały tekst jest trudny do czytania, szczególnie dla osób niedowidzących. Unikaj rozmiarów mniejszych niż domyślne.',

	QA_STRONG_ITALICS: `<p>${why.fix}Używaj pogrubienia i kursywy oszczędnie — tylko dla najważniejszych słów.</p><div class="why"><p>Uwaga: jeśli jest to cytat, użyj elementu blockquote.</p></div>`,

	QA_SUBSCRIPT: `Indeks górny i dolny zmniejsza czytelność tekstu. Używaj go tylko w przypadkach takich jak liczebniki porządkowe (np. 4<sup>ta</sup>), wzory chemiczne (H<sub>2</sub>O) lub przypisy.`,

	QA_UNDERLINE: `<p>W sieci tekst podkreślony oznacza link. Użytkownicy będą zakładać, że mogą go kliknąć.</p><p>${why.fix}Używaj <strong>pogrubienia</strong> lub <em>kursywy</em> do wyróżnień oraz nagłówków do zmian sekcji.</p><div class="why"><p>Uwaga: czytniki ekranu nie ogłaszają stylów wizualnych, takich jak podkreślenie. Tylko nagłówki nadają strukturę.</p></div>`,

	QA_UPPERCASE: `<p>TEKST WIELKIMI LITERAMI JEST TRUDNIEJSZY DO CZYTANIA I MOŻE SPRAWIAĆ WRAŻENIE KRZYKU.</p><p>${why.fix}Podkreślaj tylko pojedyncze słowa lub użyj pogrubienia zamiast wielkich liter.</p><div class="why"><p>Uwaga: czytniki ekranu nie informują o pogrubieniu. Używaj nagłówków, jeśli tekst wprowadza nowy temat.</p></div>`,

	SUS_ALT: `<p>Tekst alternatywny zawiera słowo "%(alt)", co może być zbędne:</p><p><strong class="badge">Tekst alternatywny</strong> "%(ALT_TEXT)"</p><p>Aby poprawić: napisz krótki i zwięzły opis znaczenia obrazu.</p><div class="why"><p>Wskazówka: czytniki ekranu ogłaszają już, że to opis obrazu, więc zwroty typu „obraz przedstawiający” są zwykle zbędne.</p></div>`,

	TABINDEX_ATTR: `<p>${why.fix}Nigdy nie używaj wartości tabindex większych niż „0”. Zamiast tego zmień kolejność elementów w HTML, tak aby kolejność wizualna, klawiaturowa i logiczna były spójne.</p><div class="why"><p>Domyślnie kolejność wizualna, kolejność tabulacji i kolejność odczytu są zgodne.</p><p>Dodatnie tabindex przenosi element na początek kolejności tabulacji, <strong>ale nie w strukturze wizualnej</strong>, co może być mylące.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Upewnij się, że każda komórka nagłówka zawiera tekst.</p><div class="why"><p>Wskazówka: czytniki ekranu używają nagłówków, aby pomagać użytkownikom orientować się w tabeli.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Określ w ustawieniach tabeli, czy nagłówki znajdują się w pierwszym wierszu, pierwszej kolumnie, czy w obu.</p><div class="why"> <p>Wskazówka: czytniki ekranu powtarzają odpowiedni nagłówek przy wejściu do każdej komórki.</p><p>Jeśli tabela służy wyłącznie do układu graficznego, usuń formatowanie tabeli.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Usuń ten nagłówek treści (h2, h3). Zamiast tego użyj nagłówków wierszy lub kolumn. Jeśli potrzebne są różne poziomy nagłówków, rozważ podział tabeli na kilka mniejszych.</p><div class="why"> <p>Wskazówka: nagłówki tabel przypisują znaczenie do wierszy lub kolumn, natomiast nagłówki treści wpływają na całą strukturę poniżej.</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2"><strong>Nagłówek tabeli</strong> w komórce 2 opisuje komórkę B. <br><br> <strong>Nagłówek treści</strong> opisuje komórki 3, A, B, C, a także ten tekst i przypis.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,

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
	edit_tags: 'Edytuj użytkownika',
	IMAGES: 'Tekst alternatywny',
	MAIN_TOGGLE_LABEL: 'Włącz narzędzia dostępności',
	MISSING: '(brak!)',
	NOT_VISIBLE: 'Uwaga: ta treść może być niewidoczna. Poszukaj jej wewnątrz zaznaczonego obszaru.',
	NO_IMAGES: 'Nie znaleziono żadnych obrazów.',
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
	issueTemplate: 'Problem w szablonie',
	main_toggle_hide: 'Ukryj narzędzia dostępności',
	main_toggle_hide_alerts: 'Ukryj alerty dostępności',
	main_toggle_show: 'Pokaż narzędzia dostępności',
	main_toggle_show_alerts: 'Pokaż alerty dostępności',
	panelCheckAltText: '<p class="ed11y-small">Upewnij się, że każdy obraz opisuje swoje znaczenie w kontekście i że nie ma obrazów zawierających tekst.</p>',
	panelCheckOutline: '<p class="ed11y-small">To narzędzie pokazuje strukturę nagłówków. Sprawdź, czy odpowiada ona wizualnej strukturze treści.</p>',
	PANEL_HEADING_MISSING_ONE: 'Brakuje nagłówka poziomu 1.',
	PANEL_NO_HEADINGS: 'Nie znaleziono żadnych nagłówków.',
	reportsLink: 'Otwórz raporty serwisu',
	toggleDisabled: 'Brak treści dostępnej do sprawdzenia w Editoria11y.',
	transferFocus: 'Edytuj tę treść',
	unDismissHideButton: 'Przywróć ten ukryty alert',
	unDismissNotePermissions: 'Ten alert został ukryty przez administratora',
	unDismissOKButton: 'Przywróć ten alert oznaczony jako OK',
};

const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips),
  testNames: testNames,
};

export default newStrings;
