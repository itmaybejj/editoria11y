import {default as Sa11yStrings} from '../sa11y-lang/hu.js';

// todo check each file for link integrity, and escaping of tags in code blocks.
const testNames = {
	ALT_FILE_EXT: 'Ez az alternatív szöveg fájlnév, nem leírás',
	ALT_MAYBE_BAD: 'Ez az alternatív szöveg nem olvasható fel helyesen képernyőolvasóval',
	ALT_PLACEHOLDER: 'Ez az alternatív szöveg értelmetlen helykitöltő',
	ALT_UNPRONOUNCEABLE: 'Ez az alternatív szöveg nem ejthető ki',
	BTN_EMPTY: 'A gombnak nincs hozzáférhető címkéje',
	BTN_EMPTY_LABELLEDBY: 'A gomb érvénytelen ARIA‑címkét használ',
	BTN_ROLE_IN_NAME: 'A gomb neve ismétli a „button” szót',
	CONTRAST_ERROR: 'A szöveg kontrasztja túl alacsony, nehezen olvasható',
	CONTRAST_ERROR_GRAPHIC: 'A grafika vagy ikon nem rendelkezik megfelelő kontraszttal',
	CONTRAST_INPUT: 'A beviteli mező kontrasztja túl alacsony',
	CONTRAST_PLACEHOLDER: 'A helykitöltő szöveg kontrasztja túl alacsony',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: 'A helykitöltő szövegnek elegendő a kontrasztja?',
	CONTRAST_WARNING: 'Ennek a szövegnek elegendő a kontrasztja?',
	CONTRAST_WARNING_GRAPHIC: 'Ennek a grafikának vagy ikonnak elegendő a kontrasztja?',
	DUPLICATE_ID: 'Duplikált ID attribútum',
	DUPLICATE_TITLE: 'Ez a hivatkozás olyan eszköztippet tartalmaz, amely megegyezik a link szövegével',
	EMBED_AUDIO: 'Ennek a hanganyagnak van átirata?',
	EMBED_DATA_VIZ: 'Ez az adatvizualizáció hozzáférhető?',
	EMBED_GENERAL: 'A beágyazott iframe‑ek kézi ellenőrzést igényelnek',
	EMBED_MISSING_TITLE: 'A keret hiányolja a „title” attribútumot',
	EMBED_UNFOCUSABLE: 'A tabindex="‑1" értékű keret nem érhető el billentyűzettel.',
	EMBED_VIDEO: 'Van ennek a videónak megfelelő felirata?',
	HEADING_EMPTY: 'Ez a címsor nem tartalmaz szöveget',
	HEADING_EMPTY_WITH_IMAGE: 'Ez a kép címsorként van használva, ezért alt szöveget igényel',
	HEADING_FIRST: 'A lap első címsora alacsonyabb szintű címsor',
	HEADING_LONG: 'Ez a címsor lehetne rövidebb?',
	HEADING_MISSING_ONE: 'A lapon hiányzik egy 1. szintű címsor',
	HEADING_SKIPPED_LEVEL: 'A címsor rossz szintet használ',
	HIDDEN_FOCUSABLE: 'Ez az elem nem olvasható fel képernyőolvasóval',
	IMAGE_ALT_TOO_LONG: 'Ez az alternatív szöveg lehetne rövidebb?',
	IMAGE_DECORATIVE: 'Ez a kép valóban dekoratív (jelentés nélküli)?',
	IMAGE_DECORATIVE_CAROUSEL: 'A képgalériában található kép dekoratívként van megjelölve',
	IMAGE_FIGURE_DECORATIVE: 'Kézi ellenőrzés: a képaláírással rendelkező kép nem tartalmaz alt szöveget',
	IMAGE_FIGURE_DUPLICATE_ALT: 'Az alt szöveg nem lehet azonos a képaláírással',
	LABELS_ARIA_LABEL_INPUT: 'Van ennek a mezőnek látható címkéje?',
	LABELS_PLACEHOLDER: 'Kézi ellenőrzés: helykitöltő szöveg',
	LABELS_INPUT_RESET: 'Szükséges ez a „Törlés/Alaphelyzet” gomb?',
	LABEL_IN_NAME: 'A látható címke nem egyezik a hozzáférhető címkével',
	LINK_ALT_FILE_EXT: 'A hivatkozás alt szövege nem lehet URL',
	LINK_ALT_MAYBE_BAD: 'Ez a linkhez tartozó alt szöveg nem olvasható fel helyesen',
	LINK_ALT_UNPRONOUNCEABLE: 'A képlinkeknek ejthető alt szöveggel kell rendelkezniük',
	LINK_CLICK_HERE: 'Kézi ellenőrzés: a link „kattints ide” szöveget tartalmaz',
	LINK_DOI: 'A DOI szám helyett a cikk címére kell hivatkozni',
	LINK_EMPTY: 'Ez a hivatkozás nem tartalmaz szöveget',
	LINK_EMPTY_LABELLEDBY: 'A hivatkozás érvénytelen aria‑labelledby attribútumot használ',
	LINK_EMPTY_NO_LABEL: 'A hivatkozás címkét igényel',
	LINK_FILE_EXT: 'A hivatkozás fájlra mutat figyelmeztetés nélkül',
	LINK_IDENTICAL_NAME: 'Ez a hivatkozás egyértelműen leírja a célját?',
	LINK_IMAGE_ALT: 'Kézi ellenőrzés: kép linkben alt szöveggel',
	LINK_IMAGE_ALT_AND_TEXT: 'Ez az alt szöveg logikus része a linknek?',
	LINK_IMAGE_LONG_ALT: 'Ennek a képlinknek az alt szövege lehetne rövidebb?',
	LINK_IMAGE_NO_ALT_TEXT: 'Ez a képlink alt szöveget igényel',
	LINK_IMAGE_TEXT: 'Kézi ellenőrzés: linkben található kép dekoratívként van jelölve.',
	LINK_NEW_TAB: 'A hivatkozás új lapon nyílik meg figyelmeztetés nélkül?',
	LINK_PLACEHOLDER_ALT: 'Ez a képlink jelentéssel bíró alt szöveget igényel',
	LINK_STOPWORD: 'Ez a link megfelelően leírja a célját?',
	LINK_STOPWORD_ARIA: 'A link jelentéssel bíró szövege csak képernyőolvasóknak érhető el',
	LINK_SUS_ALT: 'Ez az alt szöveg a képet vagy a link célját írja le?',
	LINK_SYMBOLS: 'Kézi ellenőrzés: a linkben található szimbólumok vagy emojik jelentéssel bírnak?',
	LINK_URL: 'A link szövege nem lehet URL',
	META_LANG: 'Hiányzik a lap nyelvét megadó meta címke',
	META_MAX: 'Ez a meta címke korlátozza a felhasználói nagyítást',
	META_REFRESH: 'Ez a meta címke automatikusan frissíti az oldalt',
	META_SCALABLE: 'Ez a meta címke megakadályozza a nagyítást',
	META_TITLE: 'Hiányzik a lap címét megadó meta címke',
	MISSING_ALT: 'Érvénytelen HTML: a kép nem tartalmaz alt attribútumot',
	MISSING_ALT_LINK: 'Érvénytelen HTML: a linkben lévő kép nem tartalmaz alt attribútumot',
	MISSING_ALT_LINK_HAS_TEXT: 'Érvénytelen HTML: a hivatkozáson belüli kép alt attribútuma hiányzik',
	QA_BAD_LINK: 'Kézi ellenőrzés: a link célja lehet, hogy érvénytelen',
	QA_BLOCKQUOTE: 'Ez az idézet valójában címsor kellene legyen?',
	QA_DOCUMENT: 'Ez a dokumentum megfelelően tagelve van a képernyőolvasók számára?',
	QA_FAKE_HEADING: 'Ez a félkövér szöveg valójában címsor?',
	QA_FAKE_LIST: 'Ezt a tartalmat listaként kellene formázni?',
	QA_IN_PAGE_LINK: 'Hibás oldalon belüli hivatkozás',
	QA_JUSTIFY: 'Ne használjon sorkizárt igazítást',
	QA_NESTED_COMPONENTS: 'Beágyazott interaktív komponensek',
	QA_PDF: 'Van alternatívája ennek a PDF‑nek?',
	QA_SMALL_TEXT: 'A szöveg túl kicsi',
	QA_STRONG_ITALICS: 'A nagy mennyiségű kiemelt szöveg nehezen olvasható',
	QA_SUBSCRIPT: 'A felső‑ vagy alsóindexet ne használja pusztán vizuális formázásként',
	QA_UNDERLINE: 'Csak a linkek legyenek aláhúzva',
	QA_UPPERCASE: 'Szükséges ez a NAGYBETŰS szöveg?',
	SUS_ALT: 'Vannak felesleges szavak az alt szövegben?',
	TABINDEX_ATTR: 'A tabindex attribútum megzavarja az olvasási sorrendet',
	TABLES_EMPTY_HEADING: 'A táblázat fejléccellája hiányolja a szöveget',
	TABLES_MISSING_HEADINGS: 'A táblázatból hiányoznak sor‑ és/vagy oszlopfejlécek',
	TABLES_SEMANTIC_HEADING: 'Tartalmi címsorokat nem szabad táblázatokban használni',
	UNCONTAINED_LI: 'Érvénytelen HTML lista',
};

const why = {
	fix: `<strong class="badge">Hogyan javítható</strong>`,
	check: `<strong class="badge">Kézi ellenőrzés</strong>`,

	buttons: `<div class="why"><p>Megjegyzés: egy gomb hozzáférhető neve egyértelműen jelezze, mit csinál. Olyan gomboknál, amelyek kattintás után állapotot váltanak, a névnek is változnia kell:</p><ul>
<li>Váltó címkék:<br>„Lejátszás/Szünet”, „Részletek megjelenítése/Részletek elrejtése”</li>
<li>Állapotváltozás ARIA-tulajdonságokban:<br><a ref="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">összekapcsolt szerepek, állapotok és tulajdonságok</a>: „Lejátszás/Lejátszás – megnyomva”, „Részletek – összecsukva/Részletek – kinyitva”.</li>
</ul>
<p>Ne változtassa meg egyszerre a címkét <em>és</em> az állapotot. Ha a „Lejátszás” feliratot „Szünet – megnyomva” értékre cseréli, az azt jelenti, hogy a lejátszó szünetel — nem azt, hogy játszik!</p></div>`,

	headings: `<div class="why"><p>Tipp: a címsorok és alcímek hierarchikus szerkezetbe rendezik a tartalmat. A képernyőolvasót használók erre a szerkezetre támaszkodnak a megértéshez és a navigációhoz:</p>
<ul><li>1. szintű címsor: oldal címe
<ul><li>2. szintű címsor: fő témák
<ul><li>3. szintű címsor: altémák</li></ul></li></ul></li></ul></div>`,

	images: `<div class="why"><p>Tipp: amikor alt szöveget ír, azt adja vissza, mit <em>jelent</em> a kép a kontextusban — nem csak azt, mi látható. Egy gyerekről készült kép, ahogy labdába rúg, a helyzettől függően jelentheti például:</p>
<ul><li>Esőben is folytatták a játékot.</li>
<li>Az új mezek menő sárkánylogóval készültek.</li>
<li>A bal oldalvonal mellől lőtt győztes gólt!</li></ul></div>`,

	links: `<div class="why"><p>Az emberek gyakran a linkek alapján tájékozódnak az oldalon, és név szerint keresik őket. Ezért a jó linkek legyenek: egyértelműek, egyediek és tömörek:</p>
<ul>
<li>Ideális: „További információk az <a href="https://webaim.org/techniques/hypertext/link_text">értelmes hivatkozásokról</a>”</li>
<li>Nem egyedi: „<a href="https://webaim.org/techniques/hypertext/link_text">Kattintson ide</a> további tudnivalókért.”</li>
<li>Nem tömör: „<a href="https://webaim.org/techniques/hypertext/link_text">Kattintson ide, ha többet szeretne megtudni az értelmes hivatkozásokról</a>”</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>Az alt szöveg célja a kép <em>jelentésének</em> közvetítése, nem a puszta tartalomé. Ha a kép egy hivatkozás része, a jelentés a link célja:
<ul>
<li>„<em>Nagyító</em>” — a képet írja le, nem a linket.</li>
<li>„<em>Kereső ikon</em>” — kétértelmű, mindkettőt sugallja.</li>
<li>„<em>Keresés</em>” — pontosan a link funkcióját/célját írja le.</li>
</ul></p></div>`,
};

const tips = {
	ALT_FILE_EXT: `<p>A képernyőolvasók ezt az URL‑t fogják felolvasni, gyakran karakterenként. Ez valószínűleg nem adja vissza ugyanazt a jelentést, mint a kép látványa.</p><p>${why.fix}Adjon meg üres alt attribútumot (alt=""), ha ez jelentés nélküli dekoráció, amelyet a képernyőolvasók figyelmen kívül hagyhatnak; különben adjon meg értelmes, leíró alternatív szöveget.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>A képhez tartozó megadott leírás: <strong>"%(alt)"</strong></p><p>${why.fix}Állítson be rövid, lényegre törő alt szöveget, amely leírja a kép jelentését ebben a kontextusban.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>A képhez tartozó megadott leírás: <strong>"%(alt)"</strong></p><p>${why.fix}Állítson be rövid, lényegre törő alt szöveget, amely leírja a kép jelentését ebben a kontextusban.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>A kép alt szövege „%(alt)”, de csak kimondhatatlan karaktereket és/vagy szóközöket tartalmaz. A képernyőolvasó bejelenti, hogy „kép”, majd kínos szünetet tart: „kép: ____.”</p><p>${why.fix}Adjon meg leíró alt szöveget, vagy teljesen üres alt attribútumot (alt=""), ha a képet figyelmen kívül kell hagyni.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Biztosítson a gomb számára hozzáférhető nevet — például gombfeliratot, ikon alt szövegét vagy <code>title</code> attribútumot.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Ennek a gombnak a <code>aria-labelledby</code> attribútuma üres, vagy nem egyezik egyetlen <code>ID</code> értékkel sem az oldalon.</p><p>${why.fix}Kösse össze érvényes ID‑vel, vagy távolítsa el az attribútumot, és adjon más módon hozzáférhető nevet.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'A háttérkép vagy színátmenet miatt ez az ellenőrzés nem tudja biztosan megállapítani a szöveg mögötti háttérszínt. Használja az alábbi színválasztót a kézi ellenőrzéshez.',

	DUPLICATE_ID: `<p>Az ID attribútumokat címkékhez vagy linkcélokhoz használjuk az oldalon, ezért egyedieknek kell lenniük.</p><p>${why.fix}Módosítsa ezt az ID‑t: <strong>#%(id)</strong></p><div class="why"><p>A legtöbb tartalomkezelő rendszerben ez a mező a „name” vagy „id” beállításból származik. HTML‑ben ez maga az attribútum: <code>&lt;a id=""></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Távolítsa el a hivatkozás <code>title</code> attribútumát.</p><div class="why"><p>Megjegyzés: a <code>title</code> eszköztippek csak egérmutató fölé vitelekor jelennek meg; mobilon és billentyűzettel nem láthatók, ezért ne tartalmazzanak fontos információt.</p></div>`,

	EMBED_AUDIO: `<p>Ha a hanganyag beszédet tartalmaz, a <a href="https://www.w3.org/WAI/media/av/transcribing/">szöveges átirat</a> legyen elérhető a lapon vagy linkelve onnan.</p><p>Az automatikus átiratokat kézzel kell ellenőrizni (beszélők, releváns hangok).</p>`,

	EMBED_DATA_VIZ: `<p>A beágyazott adatvizualizációk gyakran nem használhatók megfelelően képernyőolvasóval, nehezen értelmezhetők gyengénlátóknak vagy színtévesztőknek, és mobilon vízszintes görgetést igényelhetnek.</p><p>${why.fix}Ha a vizualizáció nem rendelkezik magas kontraszttal, teljes billentyűzet‑támogatással <strong><em>és</em></strong> képernyőolvasóval értelmezhető szerkezettel, biztosítson értékegyenértékű alternatívát (szöveges leírás, adattáblázat vagy letölthető adatfájl), majd hagyja figyelmen kívül ezt a figyelmeztetést.</p>`,

	EMBED_GENERAL: 'Az automatikus eszközök nem tudják ellenőrizni a beágyazott tartalmat. Győződjön meg róla, hogy a képek rendelkeznek alt szöveggel, a videók felirattal, a szöveg megfelelő kontraszttal, és a hivatkozások/gombok <a href="https://webaim.org/techniques/keyboard/">billentyűzettel elérhetők</a>, majd hagyja figyelmen kívül ezt a figyelmeztetést.',

	EMBED_MISSING_TITLE: `<p>A beágyazott elemeknek hozzáférhető névre van szükségük a képernyőolvasók számára.</p><p>${why.fix}Adjon egyedi <code>title</code> vagy <code>aria-label</code> attribútumot.</p>`,

	EMBED_UNFOCUSABLE: `Ez az attribútum azt jelzi a billentyűzetnek és a kisegítő technológiáknak, hogy ugorják át az elemet. Ha az iframe hivatkozásokat, gombokat vagy űrlapelemeket tartalmaz, vagy görgethető, az attribútumot el kell távolítani.`,

	EMBED_VIDEO: `<p>A videóknak felirattal kell rendelkezniük.</p><p>Az automatikus feliratokat kézzel kell javítani (beszélők, releváns hangok).</p><p>${why.fix}Adjon hozzá vagy javítsa a feliratokat, majd hagyja figyelmen kívül ezt a figyelmeztetést.</p>`,

	HEADING_EMPTY: `<p>Az üres címsorok zavart okoznak a dokumentumszerkezetben.</p><p>${why.fix}Adjon szöveget ehhez a címsorhoz, vagy távolítsa el az üres sort.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Az üres címsorok zavart okoznak a dokumentumszerkezetben.</p><p>${why.fix}Ha nem címsor, változtassa a formátumot <strong {C}>% (level). szintű címsorból</strong> <strong>bekezdéssé</strong>. Ha címsor, írja le a kép jelentését az alt szövegben.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Győződjön meg róla, hogy az oldal címe 1. vagy 2. szintű címsorként van megadva. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}Hacsak nem hivatalos cím (például publikált tanulmány címe), rövidítse a címsort az átláthatóság érdekében.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Adja meg az oldal címét 1. szintű címsorként, hogy a dokumentum szerkezete világos legyen.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>A címsor kihagyott egy szintet: <strong>%(prevLevel)</strong> → <strong>%(level)</strong>. Ez képernyőolvasó számára hiányzó tartalomnak tűnhet.</p><p>${why.fix}Állítsa be a címsorszinteket megfelelő hierarchiába.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: `Ez az interaktív elem <code>aria-hidden="true"</code> beállítással rendelkezik, mégis fókuszálható. Ha el akarja rejteni a képernyőolvasók elől, adjon hozzá <code>tabindex="-1"</code>. Ha nem, távolítsa el az <code>aria-hidden</code> attribútumot.`,

	IMAGE_ALT_TOO_LONG: `<p>A képernyőolvasók az alt szöveget folyamatosan, egyetlen mondatként olvassák fel; ha a felhasználó lemarad róla, nehéz visszatérni egy adott részhez.</p><p>Ennek az alt szövegnek a hossza: %(altLength) karakter. <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Tipp: az összetett képekhez általában <strong>látható felirat</strong> vagy részletesebb leírás szükséges. Elfogadható, ha az alt erre hivatkozik:</p><ul><li>„Plakát a pénteki bálhoz; részletek a feliratban.”</li><li>„Diagram: idén −10% esetszám; részletek a táblázatban.”</li></ul></div>`,

	IMAGE_DECORATIVE: `<p>Ez a kép üres alt attribútummal van ellátva, így a képernyőolvasók figyelmen kívül hagyják. Csak valódi dekorációkat szabad így megjelölni.</p><p>${why.fix}Ha a kép információt hordoz, adjon hozzá alt szöveget.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'A kép <strong>dekoratív</strong> jelölést kapott, de diavetítésben vagy galériában minden képnek rendelkeznie kell leíró alt szöveggel.',

	IMAGE_FIGURE_DECORATIVE: `<p>Ezt a képet a kisegítő technológiák figyelmen kívül hagyják. A képaláírás önmagában érthető a kép nélkül?</p><p>${why.fix}Ha a képaláírás nem írja le a teljes vizuális jelentést, adjon meg kiegészítő alt szöveget.</p><div class="why"><p>Tipp: a képek, az alt szövegek és a képaláírások együtt működnek:</p><ul><li>A látható képaláírás kontextust és értelmezést ad.</li><li>Az alt szöveg leírja a képet azok számára, akik nem látják.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Módosítsa az alt szöveget úgy, hogy az a kép vizuális jelentését írja le (ne ismételje a képaláírást).</p><div class="why"><p>Tipp: a képek, alt szövegek és képaláírások együtt működnek:</p><ul><li>A képaláírás kontextust és értelmezést ad.</li><li>Az alt szöveg leírja a képet azok számára, akik nem látják.</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: `<p><strong {B}>Rejtett mezőcímke:</strong> <strong {C}>%(TEXT)</strong></p><p>Ellenőrizze, hogy van‑e látható címke, amely bevitel után is látható marad, és megegyezik a hozzáférhető névvel.</p><div class="why"><p>A csak <em>placeholder</em>-ként vagy <em>title</em>-ként megadott címkék eltűnnek gépeléskor, így nehéz ellenőrizni a bevitt adatokat és könnyű elfelejteni a rejtett címke frissítését.</p></div>`,

	LABELS_INPUT_RESET: `<p>A „Törlés/Alaphelyzet” gomb könnyen véletlenül aktiválható, és adatvesztést okozhat.</p><p>${why.fix}Ha nem csak egy mezőt töröl, távolítsa el, vagy kérjen megerősítést a használat előtt.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'A képalapú gombnak nincs alt szövege. Adjon meg olyan alt szöveget, mint például: <em>Keresés</em> vagy <em>Küldés</em>.',

	LABELS_MISSING_LABEL: 'Ehhez a mezőhöz nincs társítva címke. Adjon a mezőnek <code>id</code> attribútumot, és a címkének egy hozzá illő <code>for</code> attribútumot.',

	LABELS_NO_FOR_ATTRIBUTE: 'Ehhez a mezőhöz nincs címke társítva. Adjon a címkének <code>for</code> attribútumot, amely megegyezik a mező <code>id</code> értékével.<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>A placeholder szöveg eltűnik gépeléskor, és gyakran alacsony kontrasztú — vagy épp megtévesztően hasonlít a valódi tartalomra.</p><p>${why.fix}Biztosítsa, hogy fontos információk (címke, útmutatás, formátumkövetelmények) mindig láthatók legyenek — akkor is, ha a mezőben már van szöveg.</p>`,

	LABEL_IN_NAME: `<p>Ennek az elemnek a látható címkéje nem egyezik a hozzáférhető névvel. Ez összezavarhatja a képernyőolvasót használókat és a hangvezérlést.</p><p>${why.check}Győződjön meg róla, hogy a látható címke a hozzáférhető névvel kezdődik, és nem tartalmaz extra jelentést.</p><p><strong>Hozzáférhető név:</strong> „%(TEXT)”</p>`,

	LINK_ALT_FILE_EXT: `<p>A kép alt szövege „%(alt)”, ami fájlnévre utal, nem pedig linkcélra.</p><p>${why.fix}Állítsa be az alt szöveget a hivatkozás céljának megfelelően.</p><div class="why"><p>Az alt szöveg a kép <em>jelentését</em> közvetíti. Ha a kép hivatkozás, a jelentés a link célja:</p><ul><li>„Egy oldal szöveggel” — a képet írja le, nem a linket.</li><li>„IMG_1234.jpg” — puszta fájlnév.</li><li>„<strong><em>Jelentkezési űrlap (doc)</em></strong>” — valódi linkcél.</li></ul></div>`,

	LINK_ALT_MAYBE_BAD: `<p>A képlink alt szövege helykitöltő: „<strong>%(alt)</strong>”.</p><p>${why.fix}Állítsa be az alt szöveget a link céljának megfelelően.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>A képlink alt szövege csak kimondhatatlan karaktereket és/vagy szóközöket tartalmaz: „%(ALT_TEXT)”. A link nem írható le.</p><p>${why.fix}Adjon meg alt szöveget, amely a link célját vagy funkcióját írja le.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `A „kattintson/kattints ide” típusú szöveg felesleges, és nem mondja el a link célját.`,

	LINK_DOI: `<p>${why.fix}A DOI szám helyett a cikk címét linkelje, a DOI maradjon sima szöveg.</p><div class="why"><p>A leíró linkek segítik a keresést és szkennelést; a képernyőolvasók is így tudnak értelmes linklistát felolvasni.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Adjon hozzá leíró linkszöveget, vagy törölje, ha véletlenül került oda (például linkelt szóköz).</p><div class="why"><p>A képernyőolvasók nehezen kezelik az üres linkeket — csend vagy URL betűzése.</p><p>A linkelt szóköz eltávolításához sokszor a környező szöveget is újra kell írni.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>A link <code>aria-labelledby</code> értéke nem felel meg egyetlen <code>ID</code>-nek sem.</p><p>${why.fix}Adjon meg érvényes ID‑t vagy távolítsa el az attribútumot.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Adjon leíró szöveget, vagy törölje ezt az üres linket.</p><div class="why"><p>Az üres linkek nem írhatók le a képernyőolvasók számára.</p><p>Előfordulhat, hogy a környező szöveg átírása szükséges a link végleges eltávolításához.</p></div>`,

	LINK_FILE_EXT: `<p>A link fájlra mutat (PDF, MP3, ZIP, Word stb.) előzetes tájékoztatás nélkül.</p><p>${why.fix}Jelezze a fájltípust a linkben (szöveggel vagy ikonnal): https://itmaybejj.github.io/linkpurpose/</a>.</p><p class="why">Nagy fájloknál érdemes a méretet is feltüntetni: „Éves jelentés (PDF, 3 MB)”.</p>`,

	LINK_IDENTICAL_NAME: `<p>Több különböző link azonos névvel rendelkezik: „<strong>%(TEXT)</strong>”.</p><p>${why.fix}Készítsen egyedi, céljukat leíró linkneveket.</p>${why.links}`,

	LINK_IMAGE_ALT: `Ügyeljen arra, hogy az alt szöveg a link célját írja le:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Ellenőrizze, hogy az alt szöveg segíti‑e a link céljának megértését, nem pedig ismétli a környező szöveget:</p><p><strong class="badge">Alt</strong> „<em><strong>%(alt)</strong></em>”</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p>https://webaim.org/techniques/hypertext/link_text#alt_linkA képlink alt szövege a link célját kell leírja</a>. A linkek legyenek rövidek és világosak; a hosszú alt rendszerint a képet, nem a célt írja le.</p>Ez az alt szöveg %(altLength) karakter: <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Ha egy link képben jelenik meg, az alt szöveg https://webaim.org/techniques/hypertext/link_text#alt_linka link neveként hangzik el</a>.</p><p>${why.fix}Adjon meg alt szöveget, amely a link célját vagy funkcióját írja le.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'A kép dekoratívnak van jelölve, de a link környező szövege adja a jelentést.',

	LINK_NEW_TAB: `<p>${why.fix}Állítsa be, hogy ugyanabban a lapon nyíljon meg, vagy https://itmaybejj.github.io/linkpurpose/előre jelezze</a> a felhasználónak az új lap megnyitását.</p><div class="why"><p>A kényszerített új lap zavaró lehet, különösen ha a „Vissza” gomb nem várt módon működik.</p><p>Kivétel: űrlapoknál a linkek gyakran új lapon nyílnak a bevitt adatok elvesztésének elkerülésére.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>A képlink alt szövege helykitöltő: „<strong>%(alt)</strong>”.</p><p>${why.fix}Állítsa be a link célját leíró alt szöveget.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>A link olyan szót tartalmaz, amely nem írja le a célját:<br><strong>%(text)</strong></p><p>${why.fix}Írjon helyette rövid, a célt leíró szöveget.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>A link ARIA névvel rendelkezik, de a látható szöveg általános: „<strong {C}>%(ERROR)</strong>”.</p><p>${why.fix}Legyen mindenki számára érthető, jelentéssel bíró linkszöveg, és egyezzen az ARIA névvel.</p>${why.links}`,

	LINK_SUS_ALT: `<p>Az alt szöveg tartalmazza: „%(alt)”, ami általában arra utal, hogy nem a link célját írja le.</p><strong class="badge">Alt szöveg</strong> „%(ALT_TEXT)”<p>Megoldás: az alt szöveg írja le a link célját vagy funkcióját.<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Ne használjon szimbólumokat cselekvésre ösztönző linkszövegként, hacsak nincsenek elrejtve a képernyőolvasók elől. Megtévesztő felolvasást eredményezhetnek. Távolítsa el: <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Használjon a link célját leíró szöveget az URL helyett.</p><div class="why"><p>A felhasználók — különösen képernyőolvasót használók — neveket keresnek, nem URL‑eket.</p><p>Az URL‑ek linkszövegként nehezen szkennelhetők és kereshetők.</p></div>`,

	META_LANG: `<p>${why.fix}Adjon hozzá <a href="https://www.w3.org/International/questions/qa-html-language-declarations">lang attribútumot</a> a HTML elemhez.</p><div class="why"><p>A képernyőolvasók a kijelölt nyelv alapján állítják a kiejtést; a hibás nyelv érthetetlen felolvasást eredményezhet.</p></div>`,

	META_MAX: `<p>Ez a meta címke korlátozza a nagyítást.</p><p>${why.fix}Engedélyezze a teljes nagyítást a korlátozás módosításával vagy eltávolításával.</p>`,

	META_REFRESH: `<p>A meta frissítés megszakíthatja a felhasználót és visszaállíthat űrlapokat.</p><p>${why.fix}Használjon AJAX‑ot vagy úgy frissítsen, hogy előtte tájékoztatja a felhasználót és lehetőséget ad a halasztásra.</p>`,

	META_SCALABLE: `<p>Ez a meta címke megakadályozza a nagyítást.</p><p>${why.fix}Távolítsa el vagy módosítsa, hogy engedélyezze a nagyítást.</p>`,

	META_TITLE: `<p>${why.fix}Adjon meg <code><title></code> elemet a <code><head></code> részben.</p><div class="why"><p>Egy <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title">rövid és egyedi oldalcím</a> kulcsfontosságú:</p><ul><li>Keresési találatok címeként,</li><li>lapfülek címeként,</li><li>képernyőolvasó-felolvasásnál lapváltáskor.</li></ul><p>Cím nélkül a felhasználó csak az URL‑t látja/hallja.</p></div>`,

	MISSING_ALT: `<p>Alt hiányában a képernyőolvasók a kép URL‑jét olvassák fel, gyakran karakterenként.</p><p>${why.fix}Adjon alt="" értéket a dekoratív képekhez, illetve leíró alt szöveget az információhordozó képekhez.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Ha a linkben lévő képnek nincs alt attribútuma, a képernyőolvasó a kép URL‑jét olvassa fel — különösen zavaró.</p><p>${why.fix}Adjon meg alt szöveget, amely a link célját írja le.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Ez a kép egy olyan link része, amelynek van látható szövege. Ha ez a szöveg teljesen leírja a célt, használjon alt=""; különben adjon meg a link célját leíró alt szöveget.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>A hivatkozás valószínűleg fejlesztői környezetre mutat:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Használjon relatív útvonalat (/mappa) vagy nyilvános URL‑t.</p>`,

	QA_BLOCKQUOTE: `<p>A <code>blockquote</code> elemet a képernyőolvasók idézetként jelentik be. A rövid „idézetek” sokszor valójában címsorok.</p><p>${why.fix}Ha ez címsor, állítsa át címsorstílusra, hogy bekerüljön a szerkezetbe.</p>${why.headings}`,

	QA_DOCUMENT: `<p>A hivatkozott dokumentumok webes tartalomnak minősülnek, és hozzáférhetőnek kell lenniük. Ellenőrizze a címsorokat, táblázatfejléceket és alt szövegeket, majd hagyja figyelmen kívül ezt a figyelmeztetést.</p><ul class="why"><li>Google Dokumentumok/Diák hozzáférhetővé tétele: https://support.google.com/docs/answer/6199477?hl=hu</a>.</li><li>Microsoft Office dokumentumok hozzáférhetővé tétele: https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155</a>.</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}Ha a félkövér sor egy témát vezet be, használjon helyette címsorstílust.</p><div class="why"><p>Tipp: a címsorok a dokumentum tartalmi térképét adják a képernyőolvasóknak.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Ha a „%(text)” egy lista része, alakítsa listává.</p><div class="why"><p>A listák vizuális és szemantikai struktúrát adnak:</p><ol><li>Az egységes behúzás segíti az olvashatóságot.</li><li>A képernyőolvasók a pozíciót is bemondják („3/7. elem”).</li></ol><p>Egy szám a sor elején még nem teszi listává a bekezdést.</p></div>`,

	QA_IN_PAGE_LINK: `<p>A hivatkozás célja nem található a lapon.</p><div class="why"><p>Megjegyzés fejlesztőknek: ha ez JavaScript‑es horgony, ellenőrizze, hogy billentyűzettel is működik, mielőtt a kivételek közé veszi.</p></div>`,

	QA_JUSTIFY: `<p>A sorkizárt szöveg egyenetlen szóközöket eredményez, ami sokak számára nehezebb olvasást okoz.</p><p>${why.fix}Használjon balra igazítást.</p>`,

	QA_NESTED_COMPONENTS: 'Kerülje az egymásba ágyazott interaktív komponenseket (pl. tabok tabokban vagy harmonikák más harmonikákban). Ez megnehezíti a navigációt és növeli a kognitív terhelést.',

	QA_PDF: `<p>${why.fix}Végezze el az alábbiak egyikét, majd hagyja figyelmen kívül ezt a figyelmeztetést:</p><ul><li>Linkeljen weboldalra PDF helyett;</li><li>vagy biztosítson webes/szerkeszthető alternatívát;</li><li>vagy ellenőrizze, hogy a PDF megfelelően tagolt‑e (címsorok, olvasási sorrend, táblázatfejlécek, alt szövegek).</li></ul><div class="why"><p>A felhasználók — különösen mobilon és kisegítő technológiákkal — előnyben részesítik a weboldalt a PDF‑fel szemben, mivel a PDF általában nem folyik át kis képernyőre és gyakran hiányoznak belőle a jelölések.</p></div>`,

	QA_SMALL_TEXT: 'A túl kicsi szöveg nehezen olvasható, különösen gyengénlátók számára. Kerülje az alapértelmezettnél kisebb betűméreteket.',

	QA_STRONG_ITALICS: `<p>${why.fix}A félkövér és dőlt formázást ritkán, kiemelésre használja.</p><div class="why"><p>Megjegyzés: ha idézet, használja a <code>blockquote</code> elemet.</p></div>`,

	QA_SUBSCRIPT: `A felső‑ és alsóindex csökkenti az olvashatóságot. Csak speciális esetekben használja (4<sup>.</sup>, H<sub>2</sub>O, lábjegyzet).`,

	QA_UNDERLINE: `<p>Az aláhúzott szöveg a weben általában linket jelent. A felhasználók rákattinthatónak gondolják.</p><p>${why.fix}Használjon <strong>félkövér</strong> vagy <em>dőlt</em> formázást kiemeléshez, és címsort új szakasz jelzésére.</p><div class="why"><p>A képernyőolvasók a formázást nem jelzik — a címsorok viszont szerkezetet adnak.</p></div>`,

	QA_UPPERCASE: `<p>A CSUPA NAGYBETŰS SZÖVEG NEHEZEBBEN OLVASHATÓ, ÉS SOKSZOR „KIABÁLÁSNAK” HANGZIK.</p><p>${why.fix}Emeljen ki inkább kevés szót félkövérrel, ne nagybetűsítéssel.</p><div class="why"><p>A képernyőolvasók nem jelzik a félkövérséget — új téma jelzésére használjon címsort.</p></div>`,

	SUS_ALT: `<p>Ez az alt szöveg tartalmazza: „%(alt)”, ami tipikusan felesleges:</p><p><strong class="badge">Alt szöveg</strong> „%(ALT_TEXT)”</p><p>Megoldás: írja át rövid, lényegre törő leírásra, amely a kép jelentését adja vissza.</p><div class="why"><p>Tipp: a képernyőolvasók már így is bejelentik, hogy „kép”, ezért az olyan kifejezések, mint „kép a/egy…”, rendszerint feleslegesek.</p></div>`,

	TABINDEX_ATTR: `<p>${why.fix}Kerülje a pozitív <code>tabindex</code> értékeket. A HTML-elemek sorrendje tükrözze a vizuális, a tabulátor- és az olvasási sorrendet.</p><div class="why"><p>Alapesetben a három sorrend megegyezik.</p><p>A pozitív tabindex a tabulátorsorrend elejére helyezi az elemet, <strong>de</strong> nem változtatja meg a vizuális sorrendet — ez zavart okoz.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Biztosítsa, hogy minden táblázatfejléc tartalmazzon szöveget.</p><div class="why"><p>Tipp: a képernyőolvasók a fejlécből tudják meg, hogy milyen adatot látnak.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Adja meg a táblázat beállításaiban, hogy a fejléc az első sorban, az első oszlopban vagy mindkettőben található.</p><div class="why"> <p>Tipp: a képernyőolvasók minden cellánál ismétlik a vonatkozó sort vagy oszlopcímet.</p><p>Ha a táblázat csak elrendezési cél, kerülje a táblázat használatát.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Távolítsa el a tartalmi címsort (h2, h3). Használjon inkább táblázatfejléceket. Ha több szint kell, bontsa több táblázatra.</p><div class="why"> <p>Magyarázat: a táblázatfejlécek irányhoz kötöttek (sor vagy oszlop). A tartalmi címsor az alatta következő teljes tartalomra hatással van.</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">A <strong>táblázatfejléc</strong> a 2. cellában a B cellát jelöli.<br><br> A <strong>tartalmi címsor</strong> a 2. cellában a 3., A, B, C cellákat, valamint ezt a szöveget és a lábjegyzetet is „címkézi”.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,
};

const interfaceStrings = {
	ALERT_CLOSE: 'Bezárás',
	ALT: 'Alternatív szöveg: ',
	DECORATIVE: 'Dekoratívként megjelölve',
	DISMISS: 'Elutasítás',
	DISMISS_ALL: 'Ezen az oldalon: elutasítás',
	edit_page: 'Oldal szerkesztése',
	edit_layout: 'Elrendezés szerkesztése',
	edit_term: 'Kifejezés szerkesztése',
	edit_user: 'Felhasználó szerkesztése',
	IMAGES: 'Alternatív szöveg',
	MAIN_TOGGLE_LABEL: 'Hozzáférhetőségi eszközök be/ki',
	MISSING: '(hiányzik!)',
	NOT_VISIBLE: 'Megjegyzés: ez a tartalom lehet, hogy nem látható. Keresse a kijelölt területen belül.',
	NO_IMAGES: 'Nem találhatók képek.',
	OUTLINE: 'Címsorok',
	PANEL_DISMISS_BUTTON: `%(dismissCount) rejtett figyelmeztetés megjelenítése`,
	PANEL_HEADING: 'Eszközök megjelenítése',
	SKIP_TO_ISSUE: 'Ugrás a problémára',
	WARNING: 'kézi ellenőrzést igényel',
	WARNINGS: 'kézi ellenőrzést igényel',
	buttonFirstContent: 'Ugrás az első figyelmeztetésre',
	buttonHideHiddenAlert: 'Rejtett figyelmeztetés elrejtése',
	buttonHideHiddenAlerts: `%(count) rejtett figyelmeztetés elrejtése`,
	buttonShowHiddenAlert: 'Rejtett figyelmeztetés megjelenítése',
	buttonToolsActive: 'Eszközök elrejtése',
	dismissActions: `Hasonló figyelmeztetések`,
	dismissHideTitle: 'Csak az Ön számára rejti el ezt a figyelmeztetést',
	dismissOkAllButton: 'Ezen az oldalon: OK jelölése',
	dismissOkButtonContent: 'OK jelölése',
	dismissOkTitle: 'A figyelmeztetés elrejtése minden szerkesztő számára',
	dismissOnSite: 'Az egész webhelyen: OK jelölése',
	dismissalsHeader: 'Nem szeretné kijavítani ezt?',
	errorOutlinePrefixHeadingEmpty: '(üres címsor)',
	errorOutlinePrefixHeadingIsLong: '(hossz miatt jelölve)',
	errorOutlinePrefixSkippedLevel: '(szintkihagyás miatt jelölve)',
	issueContent: 'Tartalmi probléma',
	issueDeveloper: 'Fejlesztési probléma',
	issueTemplate: 'Sablonprobléma',
	main_toggle_hide: 'Hozzáférhetőségi eszközök elrejtése',
	main_toggle_hide_alerts: 'Hozzáférhetőségi figyelmeztetések elrejtése',
	main_toggle_show: 'Hozzáférhetőségi eszközök megjelenítése',
	main_toggle_show_alerts: 'Hozzáférhetőségi figyelmeztetések megjelenítése',
	panelCheckAltText: `<p class="ed11y-small">Ellenőrizze, hogy minden kép visszaadja‑e a jelentését a kontextusban, és hogy nincs‑e „képben lévő szöveg”.</p>`,
	panelCheckOutline: `<p class="ed11y-small">Ez megjeleníti a címsorstruktúrát. Ellenőrizze, hogy megfelel‑e a vizuális szerkezetnek.</p>`,
	PANEL_HEADING_MISSING_ONE: 'Hiányzik az 1. szintű címsor.',
	PANEL_NO_HEADINGS: 'Nem találhatók címsorok.',
	reportsLink: 'Webhelyjelentések megnyitása',
	toggleDisabled: 'Nincs olyan tartalom, amit az Editoria11y ellenőrizni tudna.',
	transferFocus: 'Tartalom szerkesztése',
	unDismissHideButton: 'Elutasított figyelmeztetés visszaállítása',
	unDismissNotePermissions: 'Ezt az ellenőrzést egy adminisztrátor rejtette el',
	unDismissOKButton: '„OK”-ként jelölt figyelmeztetés visszaállítása',
};


export const lang = {
	strings: Object.assign(Sa11yStrings.strings, interfaceStrings, tips),
	testNames: testNames,
}
