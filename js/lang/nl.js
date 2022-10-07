ed11yLang['nl'] = {

  // ESLint config:
  /* global Ed11y */
  /* global ed11yLang */

  // Main Panel =========================================
  toggleAccessibilityTools: 'Toggle toegankelijkheidstools',
  toggleDisabled: 'Editorially is uitgeschakeld.',
  panelCount0 : 'Geen problemen gedetecteerd.',
  panelCountAllDismissed : 'Alle problemen verborgen.',
  panelCount1 : 'Eén probleem.',
  panelCountMultiple: ' problemen.',
  panelCountBase: '<span class=\'count\'>Geen</span> <span class=\'content-type\'>toegankelijkheidsfouten gedetecteerd</span>.',
  panelControls: 'Editorially panel controls',
  buttonIssuesContent: 'Problemen',
  buttonOutlineContent: 'Structuur',
  buttonAltsContent: 'Alt-tekst',
  buttonAboutTitle: 'Over deze tool',
  buttonPrevContent: 'Vorige',
  buttonFirstContent: 'Eerste',
  buttonNextContent: 'Volgende',
  buttonShowHiddenAlertsContent: 'Toon verborgen waarschuwingen',
  panelCheckOutline: '<p>Controleer of dit <a href=\'https://accessibility.princeton.edu/how/content/headings\'>een volledig overzicht</a> vormt:</p>',
  panelCheckAltText: '<p>Controleer <a href=\'https://accessibility.princeton.edu/how/content/alternative-text\'>alt-tekst</a>, <a href=\'https://accessibility.princeton.edu/how/content/images-text\'>afbeeldingen van tekst</a>, &amp; <a href=\'https://webaim.org/techniques/captions/\'>captions</a>.</p>',
  panelHelp : `
    <p>Ondersteunende technologieën en crawlers van zoekmachines werken het beste met goed gestructureerde inhoud. <a href='https://itmaybejj.github.io/editoria11y/demo/'>Editoria11y</a> controleert op algemene behoeften, zoals als beschrijvende alternatieve tekst voor afbeeldingen, betekenisvolle kopcontouren en goed benoemde links.</p>
    <p>Merk op dat het <strong>alleen</strong> de redactionele inhoud controleert; er zijn verschillende tools en technieken nodig <a href='https://webaim.org/resources/evalquickref/'>het ontwerp en de code testen </a>.<p>
    <p>Heeft u een bug of functieverzoek? <a href='https://github.com/itmaybejj/editoria11y/issues' class='ed11y-small'>Neem contact op met de Editoria11y-beheerders</a>.</p >
  `,
  altLabelPrefix: 'Alt-tekst:',
  errorAltMissing: '(ontbreekt!)',
  errorAltNull: '(geen; afbeelding gemarkeerd als decoratief)',
  errorOutlinePrefixSkippedLevel: '(gemarkeerd voor overgeslagen niveau) ',
  errorOutlinePrefixHeadingEmpty: '(lege hoofding)',
  errorOutlinePrefixHeadingIsLong: '(gemarkeerd voor lengte) ',

  // Errors and alerts ==================================

  consoleNotSupported: 'Deze browser kan Editoria11y niet uitvoeren.',
  jumpedToInvisibleTip: 'Het gemarkeerde item is mogelijk niet zichtbaar. Zoek het in de omlijnde container.',
  jumpedToAriaHiddenTip: 'Het item met dit probleem is mogelijk onzichtbaar of buiten het scherm.',

  // Strings used in tests ==============================

  suspiciousWords: ['afbeelding van','beeld van','tekening van','foto van','plaatshouder','foto van'],
  linksUrls: ['http:/', 'https:/', '.asp', '.htm', '.php', '.edu/', '.com/', '.nl/'],
  linksMeaningless: /leer|meer|klik|hier|op|deze|link|nu|this|bladzijde|webpagina|website|bekijk|\.|,|:|downloaden|het|formulier|webformulier|>|<|\s/g,
  
  // Tooltips base ======================================

  toggleManualCheck: 'handmatige controle nodig',
  toggleAlert: 'waarschuwing',
  toggleAriaLabel: (resultID, label) => `Toegankelijkheidsprobleem ${resultID}, ${label}`,
  dismissOkButtonContent: 'Markeer als nagekeken en OK',
  dismissOkButtonTitle: 'Weigert waarschuwing voor alle editors',
  dismissHideButtonContent: 'Waarschuwing verbergen',
  dismissHideButtonTitle: 'Sluit waarschuwing voor u af',
  elementDismissalHelpOK : '"Markeer als nagekeken en OK" verbergt deze waarschuwing op deze pagina, voor alle site-editors. De waarschuwing kan opnieuw verschijnen als de inhoud van de pagina verandert, of als een editor op "verborgen waarschuwingen weergeven" voor deze pagina drukt.',
  elementDismissalHelpHide : '"Verberg waarschuwing" verbergt deze waarschuwing op deze pagina, alleen voor u. De waarschuwing kan opnieuw verschijnen als de pagina-inhoud verandert of als u van apparaat wisselt.',
  elementDismissalHelpAll : 'Om een waarschuwing voor de hele site te negeren, moet een beheerder de configuratie-opties aanpassen om dit element te negeren.',

  // Tooltips for heading tests =========================

  headingExample : `
    <ul>
      <li>Hoofding niveau 1
        <ul>
            <li>Hoofding niveau 2: een onderwerp
                <ul>
                    <li>Hoofding niveau 3: een subonderwerp</li>
                </ul>
            </li>
            <li>Hoofding niveau 2: een nieuw onderwerp</li>
        </ul>
    </li>
  </ul>
`,

  headingLevelSkipped : {
    title: 'Handmatige controle: is er een hoofdingsniveau overgeslagen?',
    tip: (prevLevel, level) =>
      `<p>Hoofdings en subniveaus zijn de inhoudsopgave van de pagina. De <em>cijfers</em> geven inspringingen aan, in een geneste relatie:</p>
      ${Ed11y.M.headingExample}
      <p>Deze hoofding is overgeslagen van niveau ${prevLevel} naar niveau ${level}. Vanuit een schermlezer klinkt dit alsof er inhoud ontbreekt.</p>
      <p>Oplossen: pas de niveaus aan om een nauwkeurig overzicht te krijgen, zonder gaten.</p>
      `,
  },

  headingEmpty : {
    title: 'Hoofding tag zonder enige tekst',
    tip: () => 
      `<p>Hoofdings en subniveaus creëren een navigeerbare inhoudsopgave voor hulpmiddelen. Het <strong><em>nummer</em></strong> van de hoofding geeft de <strong><em>diepte</em></strong aan > in het paginaoverzicht; bijv.:</p>
      ${Ed11y.M.headingExample}
      <p>"Lege" hoofdings zorgen voor verwarrende hiaten in dit overzicht: ze kunnen betekenen dat de volgende inhoud nog steeds deel uitmaakt van de vorige sectie, of dat de tekst om de een of andere reden onuitspreekbaar was.</p>
      <p><strong>Oplossen:</strong> voeg tekst toe aan deze hoofding of verwijder deze.</p>
      `,
  },

  headingIsLong : {
    title: 'Handmatige controle: lange hoofding',
    tip: () =>
      `<p>Hoofdings moeten kort en duidelijk zijn. Hulpmiddelen gebruiken ze om een navigeerbare inhoudsopgave voor de pagina te maken. Het <strong><em>nummer</em></strong> van de hoofding geeft de <strong><em >diepte</em></strong> in het paginaoverzicht; bijv.:</p>
      ${Ed11y.M.headingExample}
      <p><strong>Oplossen:</strong> verkort deze hoofding indien mogelijk, of verwijder de hoofdingstijl als deze alleen op deze tekst werd toegepast om visuele nadruk te leggen.</p>
      `,
  },
          
  blockquoteIsShort : {
    title: 'Handmatige controle: is dit een blockquote?',
    tip: () =>
      '<p>Opmaak van blokcitaten vertelt schermlezers dat de tekst moet worden aangekondigd als een citaat. Dit werd gemarkeerd omdat korte blokcitaten soms koppen zijn. Als dit een kop is en geen aanhalingsteken, gebruik dan kopopmaak, zodat dit verschijnt in het paginaoverzicht.</p>'
  },

  // Tooltips for image tests =========================

  altAttributeExample : 
          `<p>Houd er rekening mee dat een goede alt weergeeft wat een afbeelding <strong>communiceert</strong>, niet wat het <strong>bevat</strong>. Een foto van een kind dat tegen een bal trapt, is mogelijk geselecteerd vanwege de instelling , het kind, de trap of de bal:</p>
          <ul>
              <li>Kind schopt vrolijk tegen een bal op een zomerse dag</li>
              <li>A.J. speelt in het nieuwe teamuniform</li>
              <li>A.J.'s spel-winnende trap kwam binnen vanaf de linkerzijlijn!</li>
              <li>De bal "medium" heeft de juiste maat voor dit 9-jarige kind</li>
          </ul>`,
      
  altAttributeProvided: (alt) => 
    `<p>De alternatieve tekst van deze afbeelding is: <strong>${alt}</strong></p>`,

  altMissing : {
    title: 'Afbeelding heeft geen alternatief tekstkenmerk',
    tip: () =>
      `<p>Als schermlezers een afbeelding tegenkomen zonder alt-attribuut, dicteren ze in plaats daarvan de url van het afbeeldingsbestand, vaak letter voor letter. Om dit op te lossen: voeg ofwel een lege alt toe (alt="") om aan te geven dat deze afbeelding door schermlezers moet worden genegeerd, of voeg beschrijvende alternatieve tekst toe.</p>
          ${Ed11y.M.altAttributeExample}`,
  },

  altNull : {
    title: 'Handmatige controle: afbeelding heeft geen alt-tekst',
    tip: () =>
      `<p>Schermlezers gaan ervan uit dat afbeeldingen met lege alt-tekst alleen voor decoratie zijn (spacers en achtergronden), en vermelden niet dat ze bestaan. Als deze afbeelding zinvol is, moet een alt worden opgegeven.</p>
          ${Ed11y.M.altAttributeExample}`,
  },

  altURL : {
    title: 'Het tekstalternatief van de afbeelding is een URL',
    tip: (alt) =>
      `<p>Stel de alternatieve tekst van deze afbeelding in op een beknopte beschrijving van wat deze afbeelding in deze context betekent.</p>
          ${Ed11y.M.altAttributeExample}
          ${Ed11y.M.altAttributeProvided(alt)}`
    ,
  },

  altURLLinked : {
    title: 'Het tekstalternatief van de gekoppelde afbeelding is een URL',
    tip: (alt) =>
      `<p>Schermlezers <strong>kondigen aan</strong> dat ze een afbeelding beschrijven bij het lezen van alternatieve tekst, dus zinnen als "afbeelding van" en "foto van" zijn meestal overbodig en klinken als "deze afbeelding is alt is de alt van een afbeelding.</p>
        <p>Merk op dat de zin soms niet overbodig is en moet worden bewaard, omdat de afbeelding een afbeelding van een afbeelding is:</p>
        <ul>
        <li>Overbodig: "beeld van een cassettebandje"</li>
        <li>Relevant: "beeld van een cassettebandje die wordt getoond in de geschiedenisles"</li>
        </ul>
        ${Ed11y.M.altAttributeProvided(alt)}`,
  },

  altImageOf : {
    title: 'Handmatige controle: mogelijk overbodige tekst in gekoppelde afbeelding',
    tip: (alt) =>
      `<p>Schermlezers <strong>kondigen aan</strong> dat ze een afbeelding beschrijven bij het lezen van alternatieve tekst, dus zinnen als "afbeelding van" en "foto van" zijn meestal overbodig en klinken als "deze afbeelding is alt is de alt van een afbeelding."</p>
      <p>Merk op dat de zin soms niet overbodig is en moet worden bewaard, omdat de afbeelding een afbeelding van een afbeelding is:</p>
      <ul>
       <li>Overbodig: "beeld van een cassettebandje"</li>
       <li>Relevant: "beeld van een cassettebandje die wordt getoond in de geschiedenisles"</li>
      </ul>
          ${Ed11y.M.altAttributeProvided(alt)}`
  },
  altImageOfLinked : {
    title: 'Handmatige controle: mogelijk overbodige tekst in gekoppelde afbeelding',
    tip: (alt) =>
      `<p>Links moeten hun bestemming duidelijk en beknopt beschrijven. Aangezien woorden als "afbeelding", "afbeelding" of "foto" overbodig zijn in tekstalternatieven (schermlezers identificeren de afbeelding al als een afbeelding), ze geven vaak aan dat het tekstalternatief van de afbeelding de afbeelding beschrijft in plaats van de link.</p>
      <ul>
       <li>Goede linktekst: "Over ons"</li>
       <li>Slechte linktekst: "Stockfoto van vijf mensen die springen en high fiven rond een vergadertafel, afbeelding"</li>
      </ul>
      <hr>
          ${Ed11y.M.altAttributeProvided(alt)}`
  },

  altDeadspace : {
    title: 'Het tekstalternatief van de afbeelding is onuitspreekbaar',
    tip: (alt) =>
      `<p>De alt van deze afbeelding bevat alleen tekens die niet door schermlezers worden uitgesproken. De aanwezigheid van een afbeelding wordt aangekondigd, maar de beschrijving ervan is onbegrijpelijk.</p>
      <p>Oplossen: voeg een beschrijvende alt toe of geef een <em>volledig</em> lege alt (alt="") om schermlezers te vertellen deze afbeelding te negeren.</p>      
          ${Ed11y.M.altAttributeExample}
          ${Ed11y.M.altAttributeProvided(alt)}`,
  },

  altDeadspaceLinked : {
    title: 'Het tekstalternatief van de gekoppelde afbeelding is onuitspreekbaar',
    tip: (alt) =>
      `<p>De alt van deze afbeelding bestaat alleen uit stille tekens (spaties en aanhalingstekens). Het wordt door schermlezers aangekondigd als onderdeel van de tekst van de link, maar de beschrijving van wat de afbeelding is, is onbegrijpelijk. alternatieve tekst voor iets dat de bestemming van de link beschrijft, of geef een <em>volledig</em> lege alt (alt="") als de afbeelding helemaal niet mag worden vermeld.</p>
        <ul>
        <li>Goede linktekst: "Over ons"</li>
        <li>Slechte linktekst: "Over ons, afbeelding: [korte verwarrende stilte]"</li>
        </ul>
        ${Ed11y.M.altAttributeProvided(alt)}`,
  },

  altEmptyLinked : {
    title: 'Gelinkte afbeelding heeft geen alt-tekst',
    tip: () =>
      `<p>Als een link om een afbeelding wordt gewikkeld, geeft de alt-tekst van de afbeelding de titel van de link voor schermlezers</p>
      <p>Stel de alternatieve tekst van deze afbeelding in op iets dat de bestemming van de link beschrijft, of voeg tekst toe aan de link.</p>
      <ul>
       <li>Goede gelinkte alt: "Betekenisvolle linktips"</li>
       <li>Slechte gekoppelde alt: "Drie gelukkige honden rollen in het gras"</li>
      </ul>
          `,
  },

  altLong : {
    title: 'Handmatige controle: zeer lange alternatieve tekst',
    tip: (alt) =>
      `<p>Alternatieven voor afbeeldingstekst worden door schermlezers aangekondigd als een enkele vervolgzin; luisteraars moeten de hele alt een tweede keer beluisteren als ze iets missen. Het is meestal beter om een <em>zichtbare</em> te geven en ernaar te verwijzen em> tekstalternatief voor complexe afbeeldingen die lange beschrijvingen nodig hebben. Bijvoorbeeld:</p>
      <ul>
       <li>"Evenement poster; details in bijschrift"</li>
       <li>"Grafiek waarin onze problemen naar nul gaan; details volgen in tabel"</li>
      </ul>
          ${Ed11y.M.altAttributeProvided(alt)}
          `,
  },

  altLongLinked : {
    title: 'Handmatige controle: zeer lange alternatieve tekst in gekoppelde afbeelding',
    tip: (alt) =>
      `<p>De alt-tekst op een gekoppelde afbeelding wordt gebruikt om de bestemming van de link te beschrijven. Links moeten kort, duidelijk en beknopt zijn, aangezien gebruikers van schermlezers vaak naar de lijst met links op de pagina luisteren om interessante inhoud te vinden. Lang alternatief tekst in een link geeft vaak aan dat het tekstalternatief van de afbeelding de afbeelding beschrijft in plaats van de link.</p>
          ${Ed11y.M.altAttributeProvided(alt)}
          `,
  },

  altPartOfLinkWithText : {
    title: 'Handmatige controle: link bevat zowel tekst als een afbeelding',
    tip: (alt) => 
      `<p>Als een link een afbeelding bevat, spreken schermlezers de alt-tekst van de afbeelding uit als onderdeel van de link. Dit kan verwarrend zijn als de alt van de afbeelding de afbeelding beschrijft in plaats van de link.</p>
      <p>Voor een link in kaartstijl met zowel tekst als een stockfoto, vergelijk:</p>
      <ul>
       <li>"Link, vijf mensen springen en high fiven rond een vergadertafel, afbeelding, over ons"</li>
       <li>"Link, over ons"</li>
      </ul>
          ${Ed11y.M.altAttributeProvided(alt)}
          <p>Als deze link duidelijker is zonder deze alt, is het misschien beter om een lege alt te gebruiken om schermlezers te vertellen de afbeelding te negeren.</p>
          `,
  },

  linkNoText : {
    title: 'Link zonder toegankelijke tekst',
    tip: () =>
      `<p>Deze link is ofwel onzichtbaar en leeg (bijvoorbeeld een gekoppeld spatieteken), of is om iets heen gewikkeld zonder tekstalternatief (een afbeelding zonder alt-attribuut).</p>
      <p>Schermlezers pauzeren met een nietszeggende stilte wanneer ze deze link bereiken: <br>"Link, [...onhandige pauze waar de titel van de link zou moeten staan...],"<br>of spellen uit de URL, teken voor teken: <br>"Link, H-T-T-P-S forward-slash forward-slash voorbeeld punt com"</p>
      <p>Oplossen: voeg tekst toe als dit een link zou moeten zijn, of verwijder deze als dit niet het geval is.</p>
      `,
  },

  linkTextIsURL : {
    title: 'Handmatige controle: is deze linktekst een URL?',
    tip: (text) => 
      `<p>Links moeten zinvol en beknopt zijn. Lezers bladeren vaak door titels van links. Dit geldt met name voor gebruikers van schermlezers, die navigeren met behulp van een lijst met links op de pagina.</p>\
        <p>Een gekoppelde URL doorbreekt dit patroon; de lezer moet de voorgaande alinea lezen om het doel van de link uit de context te achterhalen.</p>
        <ul>
          <li>Betekenisvolle en beknopte link: "Tips voor het schrijven van zinvolle links"</li>
          <li>Gelinkte URL, zoals uitgesproken door een schermlezer: "H T T P S dubbele punt forward-slash forward-slash voorbeeld dot com forward-slash tips forward-slash zinvolle-links"</li>
        </ul>
        <p>De tekst van deze link is:<br>  <strong>${text}</strong></p>
              `,
  },

  linkTextIsGeneric : {
    title: 'Handmatige controle: is deze link zinvol en beknopt?',
    tip: (text) => 
      `<p>Lezers zoeken snel naar links. Dit geldt met name voor gebruikers van schermlezers, die navigeren met behulp van een lijst met links op de pagina.</p>
      <p>Algemene links zoals "klik hier," "lees meer" of "download" verwachten dat de lezer langzaam en zorgvuldig leest, zodat ze het doel van elke link uit de context voor zichzelf kunnen achterhalen. doe dit, zodat de klikfrequenties op nietszeggende links extreem laag zijn.</p>
      <ul>
       <li>Niet zinvol: "Voor meer informatie over zinvolle links, <a href='https://www.google.com/search?q=zinvolle+links+schrijven'>klik hier</a>".</li>
       <li>Niet beknopt: "<a href='https://www.google.com/search?q=zinvolle+links+schrijven'>Klik hier voor meer informatie over zinvolle links</a>"</li>
       <li>Ideaal: "Meer informatie over <a href='https://www.google.com/search?q=zinvolle+links+schrijven'>betekenisvolle links</a>"</li>
      </ul>
      <p>De tekst van deze link is:<br><strong>${text}</strong></p>`
    ,
  },

  linkDocument : {
    title : 'Handmatige controle: is het gekoppelde document toegankelijk?',
    tip: () => 
      `<p>Deze geautomatiseerde controle zorgt ervoor dat <strong><em>websites</em></strong> de functies bevatten die nodig zijn voor toegankelijke inhoud, zaken als kopstructuur en tekstalternatieven voor afbeeldingen en audio. <strong>Het is niet in staat om u te helpen bij het controleren van de documenten die u linkt.</strong></p>
      <p>De meeste gebruikers van mobiele apparaten en ondersteunende apparaten lezen liever tekst op webpagina's, waar de inhoud opnieuw wordt weergegeven om op het scherm te passen. Als het hier gelinkte document niet kan worden geconverteerd naar een webpagina, controleer dan handmatig de structuur (koppen, lijsten, tabel headers) en afbeelding alt-tekst.</p>
      <ul>
       <li>Tips voor <a href='https://webaim.org/techniques/word/'>MS Word</a> en <a href='https://support.google.com/docs/answer/6199477?hl=nl&ref_topic=6039805'>Google Documenten</a></li>
       <li><a href='https://webaim.org/techniques/powerpoint/'>Diavoorstellingen</a> & <a href='https://support.microsoft.com/nl-nl/office/uw-excel-documenten-toegankelijk-maken-voor-personen-met-een-handicap-6cc05fc5-1314-48b5-8eb3-683e49b3e593'>Spreadsheets</a>
       <li><a href='https://webaim.org/techniques/acrobat/'>Documenten die zijn opgemaakt voor print in plaats van schermen (PDF)</a></li>
      </ul>`
    ,
  },

  linkNewWindow : {
    title: 'Handmatige controle: wordt een nieuw venster verwacht?',
    tip: () => 
      `<p>Lezers kunnen er altijd voor kiezen om een link in een nieuw venster te openen. Wanneer een link een nieuw venster forceert, 
      kan dit verwarrend en vervelend zijn, vooral voor gebruikers van hulpmiddelen die zich afvragen waarom de "terug" knop van hun browser is plotseling uitgeschakeld.</p>
      <p>Er zijn twee algemene uitzonderingen:</p>
      <ul>
       <li>Als de gebruiker een formulier invult en een link in hetzelfde venster opent, zou hij zijn werk kwijtraken.</li>
       <li>Als de gebruiker duidelijk wordt gewaarschuwd, wordt er een link geopend in een nieuw venster.</li>
      </ul>
      <p>Oplossen: zet deze link terug op zijn standaarddoel, of voeg een waarschuwing toe die toegankelijk is voor de schermlezer (tekst of een pictogram met alternatieve tekst).</p>      
              `
    ,
  },

  // Tooltips for Text QA ===============================

  tableNoHeaderCells : {
    title: 'Tabel heeft geen koptekstcellen',
    tip: () => `
    <p>Tabellen worden door schermlezers aangekondigd als navigeerbare gegevenssets. Schermlezers herhalen rij- en kolomkoppen indien nodig om gebruikers te oriënteren tijdens het lezen van inhoudscellen.</p>
    <p>Oplossen:</p>
    <ul>
     <li>Als deze tabel informatie bevat die zinvol is geordend op rij en kolom, bewerk dan de eigenschappen van de tabel en geef aan of de koppen in de eerste rij, kolom of beide staan.</li>
     <li>Als deze tabel geen rijen en kolommen met gegevens bevat, maar alleen wordt gebruikt voor visuele lay-out, kunt u deze het beste verwijderen. Tabellen overlopen de pagina in plaats van de tekst opnieuw te laten plaatsen op mobiele apparaten, en moeten alleen worden gebruikt wanneer horizontale relaties nodig zijn om de inhoud te begrijpen.</li>
    </ul>
          `,
  },

  tableContainsContentHeading : {
    title: 'Contentkop in een tabel',
    tip: () => 
      `<p>Inhoudskoppen ("Kop 1", "Kop 2") vormen een navigeerbare inhoudsopgave voor gebruikers van schermlezers, waarin alle inhoud <strong>tot de volgende kop</strong> wordt gelabeld. specifieke kolommen of rijen binnen een tabel.</p>
      <p></p>
      <table>
       <tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Ter illustratie: een <strong>tabel</strong> koptekst in cel 2 zou alleen de kolom labelen: cel B. <br> <br> Een <strong>inhoud</strong> kop in cel 2 zou alle volgende tekst labelen, lezend van links naar rechts: cellen 3, A, B en C, evenals deze tekst!</td></tr>
       <tr><td>A</td><td>B</td><td>C</td></tr>
      </table>
      <p>Oplossing: verwijder kopopmaak in tekst in tabelcellen.</p>
          `
  },

  tableEmptyHeaderCell : {
    title: 'Lege tabelkopcel',
    tip: () => `
      <p>Bij het verkennen van tabellen herhalen schermlezers de cellen van de tabelkopteksten om gebruikers te oriënteren. Zonder kopteksten is het heel gemakkelijk om te verdwalen; gebruikers van schermlezers moeten kolommen en rijen tellen en proberen te onthouden welke kolommen bij welke horen rijen.</p>
          `,
  },

  textPossibleList : {
    title: 'Handmatige controle: moet deze lijstindeling hebben?',
    tip : (text) => 
      `<p>Lijstopmaak is structureel:</p>
      <ol>
       <li>Lijst opmaak inspringingen en opnieuw plaatsen bij overloop. Tekst wordt verticaal uitgelijnd met tekst, in plaats van de "${text}"</li>
       <li>Lijsten zijn machineleesbaar. Schermlezers kunnen hun gebruikers oriënteren en dit aankondigen als "lijstitem, 2 van 2."</li>
      </ol>
      <p>3. Terwijl dit niet-opgemaakte item (alleen een getal, getypt als tekst) niet visueel of hoorbaar in de lijst is opgenomen.</p>
      <p>Oplossen: als deze "${text}" een lijst start, vervang deze dan door lijstopmaak.</p>
          `,
  },

  textPossibleHeading : {
    title: 'Handmatige controle: moet dit een kop zijn?',
    tip : () => 
      `<p>Koppen en subkoppen creëren een navigeerbare inhoudsopgave voor hulpmiddelen. Het <strong><em>nummer</em></strong> van de kop geeft de <strong> ><em>diepte</em></strong> in het paginaoverzicht; bijv.:</p>
      ${Ed11y.M.headingExample}
      <p>Als deze vetgedrukte tekst visueel als kop fungeert, vervang dan de vetgedrukte opmaak door de correct genummerde kop.</p>
      `,
  },

  textUppercase : {
    title: 'Handmatige controle: is deze tekst in hoofdletters nodig?',
    tip : () => 
      `<p>TEKST IN HOOFDLETTERS KAN VOOR VEEL MENSEN MOEILIJKER TE LEZEN ZIJN, EN WORDT VAAK INTERPRETEERD ALS SCHREEUWEN.</p>
      <p>Overweeg om in plaats daarvan hoofdletters te gebruiken en vetgedrukte tekst of lettertypewijzigingen te gebruiken voor visuele nadruk, of structurele opmaak zoals koppen voor nadruk die ook worden aangekondigd door schermlezers.</p>
      `,
  },

  embedVideo : {
    title: 'Handmatige controle: is deze tekst in hoofdletters nodig?',
    tip : () => 
      `<p>Als een opgenomen video spraak of betekenisvolle geluiden bevat, moet deze voorzien zijn van ondertiteling.</p>
      <p>Houd er rekening mee dat automatische, machinaal gegenereerde bijschriften moeten worden nagelezen en sprekeridentificaties moeten worden toegevoegd voordat ze als een gelijkwaardig alternatief worden beschouwd.</p>
      `,
  },

  embedAudio : {
    title: 'Handmatige controle: is er een nauwkeurige transcriptie voorzien?',
    tip : () => 
      `<p>Als deze audio spraak bevat, moet op deze pagina een tekstalternatief worden verstrekt of moet worden gelinkt.</p>
      <p>Houd er rekening mee dat automatische, machinaal gegenereerde transcripties moeten worden nagelezen en sprekersidentificaties moeten worden toegevoegd voordat ze als een gelijkwaardig alternatief worden beschouwd</p>
      `,
  },

  embedVisualization : {
    title: 'Handmatige controle: is deze visualisatie toegankelijk?',
    tip : () => 
      `<p>Visualisatie-widgets zijn vaak moeilijk of onmogelijk te bedienen voor hulpmiddelen en kunnen moeilijk te begrijpen zijn voor lezers met slechtziendheid of kleurenblindheid.</p>
        <p>Tenzij deze specifieke widget een hoog visueel contrast heeft, kan worden bediend met een toetsenbord en kan worden beschreven door een schermlezer, moet u ervan uitgaan dat er ook een alternatief formaat (tekstbeschrijving, gegevenstabel of downloadbare spreadsheet) moet worden verstrekt.</p> 
      `,
  },

  embedTwitter : {
    title: 'Manual check: is this embed a keyboard trap?',
    tip : () => 
      `<p>Als ingesloten feeds zijn ingesteld om een groot aantal items weer te geven, moeten toetsenbordgebruikers mogelijk tientallen of honderden keren op de tab-toets klikken om het onderdeel te verlaten.</p>
        <p>Controleer of slechts een klein aantal items onmiddellijk of tijdens het scrollen automatisch wordt geladen. Extra items op verzoek laden ("meer weergeven") is prima.</p>
      `,
  },

  embedCustom : {
    title: 'Handmatige controle: is deze ingesloten inhoud toegankelijk?',
    tip : () => 
      '<p>Zorg ervoor dat afbeeldingen in deze insluiting alt-tekst hebben, video\'s bijschriften hebben en dat interactieve componenten <a href=\'https://webaim.org/techniques/keyboard/\'>worden bediend door een toetsenbord</a>.</p>',
  }

};

