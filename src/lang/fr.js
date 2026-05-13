import { default as Sa11yStrings } from '../sa11y-lang/fr.js';
// Caution: uncorrected machine translation. Contact us on GitHub to contribute.

const testNames = {
	ALT_FILE_EXT: 'Ce texte alternatif est un nom de fichier, pas une description',
	ALT_MAYBE_BAD: `S’agit‑il d’une description claire et concise de l’image ?`,
	ALT_MAYBE_BAD_WARNING: `S’agit‑il d’une description claire et concise de l’image ?`,
	ALT_PLACEHOLDER: 'Ce texte alternatif est peut‑être un texte de remplacement', // updated
	ALT_UNPRONOUNCEABLE: 'Ce texte alternatif est impossible à prononcer',
	ARIA_INPUT_FIELD_NAME: `Ce champ de saisie personnalisé n’a pas d’étiquette`,
	BTN_EMPTY: 'Le bouton n’a pas d’étiquette accessible',
	BTN_EMPTY_LABELLEDBY: 'Le bouton possède une étiquette ARIA non valide',
	BTN_ROLE_IN_NAME: 'Le nom du bouton répète le mot « button »',
	CONTRAST_ERROR: 'Le texte n’a pas un contraste suffisant pour être facilement lisible',
	CONTRAST_ERROR_GRAPHIC: 'Le graphique ou l’icône n’a pas un contraste suffisant',
	CONTRAST_INPUT: 'Le champ de saisie n’a pas un contraste suffisant pour être facilement lisible',
	CONTRAST_PLACEHOLDER: 'Le texte de remplacement n’a pas un contraste suffisant pour être facilement lisible',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Ce texte de remplacement a‑t‑il un contraste suffisant ?',
	CONTRAST_WARNING: 'Ce texte a‑t‑il un contraste suffisant ?',
	CONTRAST_WARNING_GRAPHIC: 'Ce graphique ou cette icône a‑t‑il un contraste suffisant ?',
	DUPLICATE_ID: 'Attribut ID dupliqué',
	DUPLICATE_TITLE: 'Ce lien possède une info‑bulle contenant le même texte que le lien',
	EMBED_AUDIO: 'Cet audio a‑t‑il une transcription ?',
	EMBED_DATA_VIZ: 'Cette visualisation est‑elle accessible ?',
	EMBED_GENERAL: 'Les iframes intégrées nécessitent des vérifications manuelles',
	EMBED_MISSING_TITLE: 'Le cadre ne possède pas d’attribut « title »',
	EMBED_UNFOCUSABLE: 'Un frame avec tabindex="‑1" ne sera pas accessible au clavier.',
	EMBED_VIDEO: 'Cette vidéo est‑elle correctement sous‑titrée ?',
	HEADING_EMPTY: 'Cet en‑tête ne contient aucun texte',
	HEADING_EMPTY_WITH_IMAGE: 'Cette image est utilisée comme en‑tête ; elle nécessite donc un texte alternatif',
	HEADING_FIRST: 'Le premier en‑tête de cette page est un sous‑titre',
	HEADING_LONG: 'Cet en‑tête peut‑il être raccourci ?',
	HEADING_MISSING_ONE: 'Cette page n’a pas de titre de niveau 1',
	HEADING_SKIPPED_LEVEL: 'Cet en‑tête utilise un niveau incorrect',
	HIDDEN_FOCUSABLE: 'Cet élément ne peut pas être décrit par les lecteurs d’écran',
	IMAGE_ALT_TOO_LONG: 'Ce texte alternatif pourrait‑il être plus court ?',
	IMAGE_DECORATIVE: 'Cette image est‑elle réellement dénuée de sens ?',
	IMAGE_DECORATIVE_CAROUSEL: 'Image dans un carrousel ou une galerie marquée comme décorative',
	IMAGE_FIGURE_DECORATIVE: 'Vérification manuelle : image avec légende sans texte alternatif',
	IMAGE_FIGURE_DUPLICATE_ALT: 'Le texte alternatif ne doit pas être identique à la légende',
	LABELS_ARIA_LABEL_INPUT: 'Ce champ possède‑t‑il une étiquette visible ?',
	LABELS_PLACEHOLDER: 'Préférez les étiquettes visibles aux textes de remplacement',
	LABELS_INPUT_RESET: 'Ce bouton de réinitialisation est‑il nécessaire ?',
	LABEL_IN_NAME: 'L’étiquette visible ne correspond pas à l’étiquette invisible',
	LABELS_MISSING_IMAGE_INPUT: `Ce bouton image n’a pas de texte alternatif`,
	LABELS_MISSING_LABEL: `Ce champ a une étiquette vide`,
	LABELS_NO_FOR_ATTRIBUTE: `Ce champ n’est pas connecté à une étiquette`,
	LANG_MISMATCH: 'La balise de langue ne correspond pas au contenu',
	LANG_OF_PARTS: 'Ce contenu semble être dans une autre langue',
	LANG_OF_PARTS_ALT: 'Ce texte alternatif semble être dans une autre langue',
	LINK_ALT_FILE_EXT: 'Un texte alternatif utilisé comme lien ne doit pas être une URL',
	LINK_ALT_MAYBE_BAD: `Ce texte alternatif lié n’est peut‑être pas clair et concis`,
	LINK_ALT_MAYBE_BAD_WARNING: `Ce texte alternatif lié n’est peut‑être pas clair et concis`,
	LINK_ALT_UNPRONOUNCEABLE: 'Les images liées doivent avoir un texte alternatif prononçable',
	LINK_CLICK_HERE: 'Vérification manuelle : le lien contient « cliquer ici »',
	LINK_DOI: "Liez les titres d’articles, pas les numéros DOI",
	LINK_EMPTY: 'Ce lien ne contient aucun mot.',
	LINK_EMPTY_LABELLEDBY: 'Lien avec attribut « aria‑labelledby » non valide',
	LINK_EMPTY_NO_LABEL: 'Ce lien a besoin d’une étiquette',
	LINK_UNPRONOUNCEABLE: 'Ce lien est imprononçable',
	LINK_FILE_EXT: 'Ce lien pointe vers un fichier sans avertissement',
	LINK_IDENTICAL_NAME: 'Des liens avec le même texte mènent à des pages différentes', // updated
	LINK_IMAGE_ALT: 'Vérification manuelle : image liée avec texte alternatif',
	LINK_IMAGE_ALT_AND_TEXT: 'Ce texte alternatif a‑t‑il un sens dans ce lien ?',
	LINK_IMAGE_LONG_ALT: 'Ce texte alternatif lié peut‑il être plus court ?',
	LINK_IMAGE_NO_ALT_TEXT: 'Cette image liée nécessite un texte alternatif',
	LINK_IMAGE_TEXT: 'Vérification manuelle : image dans un lien marquée comme décorative.',
	LINK_LABEL: 'Étiquette de lien',
	LINK_MAYBE_BUTTON: 'Ce lien est‑il en réalité un bouton ?',
	LINK_NEW_TAB: 'Ce lien ouvre‑t‑il un nouvel onglet sans avertissement ?',
	LINK_PLACEHOLDER_ALT: 'Ce texte alternatif lié est peut‑être un texte de remplacement',
	LINK_STOPWORD: 'Ce lien contient uniquement des mots génériques', // updated
	LINK_STOPWORD_ARIA: 'L’objet de ce lien est visuellement masqué',
	LINK_SUS_ALT: 'Le texte alternatif décrit‑il l’image ou le lien ?',
	LINK_SYMBOLS: 'Vérification manuelle : les symboles ou émojis dans ce lien sont‑ils significatifs ?',
	LINK_URL: 'Le texte du lien ne doit pas être une URL',
	META_LANG: 'Balise meta pour la langue manquante',
	META_LANG_SUGGEST: 'Vouliez‑vous utiliser un code de langue différent ?',
	META_LANG_VALID: 'Code de langue invalide',
	META_MAX: 'La balise meta limite l’agrandissement du texte',
	META_REFRESH: 'La balise meta actualise automatiquement la page',
	META_SCALABLE: 'La balise meta empêche l’agrandissement du texte',
	META_TITLE: 'Balise meta du titre de page manquante',
	PAGE_LANG_CONFIDENCE: 'La langue de la page peut ne pas correspondre au contenu',
	MISSING_ALT: 'HTML invalide : image sans attribut alt',
	MISSING_ALT_LINK: 'HTML invalide : image liée sans attribut alt',
	MISSING_ALT_LINK_HAS_TEXT: 'HTML invalide : image dans un lien sans attribut alt',
	QA_BAD_LINK: 'Vérification manuelle : la cible du lien semble invalide',
	QA_BLOCKQUOTE: 'Cette citation devrait‑elle être un en‑tête ?',
	QA_DOCUMENT: 'Ce document a‑t‑il été balisé pour les lecteurs d’écran ?',
	QA_FAKE_HEADING: 'Ce texte en gras devrait‑il être un en‑tête ?',
	QA_FAKE_LIST: 'Cela devrait‑il utiliser un format de liste ?',
	QA_IN_PAGE_LINK: 'Lien interne cassé',
	QA_JUSTIFY: 'Ne pas justifier le texte',
	QA_NESTED_COMPONENTS: 'Composants interactifs imbriqués',
	QA_PDF: 'Existe‑t‑il une alternative à ce PDF ?',
	QA_SMALL_TEXT: 'Texte trop petit',
	QA_STRONG_ITALICS: 'De grands blocs de texte accentué sont difficiles à lire',
	QA_SUBSCRIPT: 'Ne pas utiliser l’exposant ou l’indice comme mise en forme visuelle',
	QA_UNDERLINE: 'Seuls les liens doivent être soulignés',
	QA_UPPERCASE: 'Ce texte en majuscules est‑il nécessaire ?',
	SUS_ALT: 'Ce texte alternatif contient‑il des mots redondants ?',
	TABINDEX_ATTR: 'Les surcharges tabindex interrompent l’ordre du focus',
	TABLES_EMPTY_HEADING: 'Cette cellule d’en‑tête a besoin de texte',
	TABLES_MISSING_HEADINGS: 'Ce tableau a besoin d’une ligne et/ou d’une colonne d’en‑têtes',
	TABLES_INVALID_HEADERS_REF: `Ce tableau a un attribut headers invalide`,
	TABLES_SEMANTIC_HEADING: 'Les en‑têtes de contenu ne doivent pas être utilisés dans les tableaux',
	UNCONTAINED_LI: 'Liste HTML invalide',
};

const why = {
	fix: `<strong class="badge">À corriger</strong>`,
	check: `<strong class="badge">Vérification manuelle</strong>`,

	buttons: `<div class="why"><p>Note : le nom accessible d’un bouton doit indiquer clairement ce qu’il fera une fois cliqué. Si cela change, l’état actuel doit être clair :</p><ul>
<li>Boutons qui mettent à jour les libellés :<br>"Lecture/Pause", "Afficher les détails/Masquer les détails"</li>
<li>Boutons qui <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">mettent à jour l’état</a> :<br>"Lecture/Lecture, activé", "Détails, réduit/Détails, développé."</li>
</ul></div>`,

	headings: `<div class="why"><p>Astuce : les en-têtes et sous-titres organisent le contenu en une structure hiérarchique. Les utilisateurs de lecteurs d’écran s’appuient sur cette structure pour comprendre et parcourir une page :</p>
<ul><li>En-tête niveau 1 : titre de page
<ul><li>En-tête niveau 2 : sujets principaux
<ul><li>En-tête niveau 3 : sous-sujets</li></ul></li></ul></li></ul>
</div>`,

	images: `<div class="why"><p>Astuce : décrivez ce que signifie une image, pas seulement ce qu’elle contient. Selon le contexte, une photo d’un enfant donnant un coup de pied dans un ballon peut signifier :</p>
<ul>
<li>Ils jouaient sous la pluie.</li>
<li>Les nouveaux uniformes ont un motif de dragon.</li>
<li>Elle a marqué le but de la victoire depuis le côté gauche&nbsp;!</li>
</ul></div>`,

	links: `<div class="why"><p>Les utilisateurs repèrent les contenus par les liens et utilisent la recherche interne pour les trouver par nom ; des liens efficaces sont donc significatifs, uniques et concis :</p>
<ul>
<li>Idéal : "En savoir plus sur <a href="https://webaim.org/techniques/hypertext/link_text">les liens significatifs</a>"</li>
<li>Pas unique : "<a href="https://webaim.org/techniques/hypertext/link_text">Cliquez ici</a> pour en savoir plus."</li>
<li>Pas concis : "<a href="https://webaim.org/techniques/hypertext/link_text">Cliquez ici pour en apprendre davantage sur les liens significatifs</a>"</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>Le but du texte alternatif est de fournir une alternative au sens d’une image, pas à son contenu brut. Pour une image liée, le sens correspond à la destination du lien :</p><ul>
<li>"<em>Une loupe</em>" décrit l’image, pas le lien.</li>
<li>"<em>Une loupe de recherche</em>" décrit confusément les deux.</li>
<li>"<em>Rechercher</em>" décrit correctement la destination du lien.</li>
</ul></div>`
};

export const tips = {
	ARIA_INPUT_FIELD_NAME: `<p><strong>Élément :</strong> <code>%(EL)</code></p><p>${why.fix}Fournissez une étiquette valide ; pour les éléments de saisie personnalisés, cela signifie souvent du texte interne, ou un attribut title, aria-label ou aria-labelledby.</p>`,

	ALT_FILE_EXT: `<p><span hidden>%(alt)</span><strong>Texte alternatif :</strong> <i>%(ALT_TEXT)</i></p><p>Les lecteurs d’écran tenteront de prononcer cette URL, souvent lettre par lettre. Cela ne transmet probablement pas la même signification que de voir l’image.</p><p>${why.fix}Décrivez brièvement ce que signifie cette image, dans ce contexte.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p><strong>Texte alternatif :</strong> <i>%(alt)</i></p><p>${why.fix}Décrivez brièvement ce que signifie cette image, dans ce contexte.</p>${why.images}`,

	ALT_MAYBE_BAD_WARNING: `<p><strong>Texte alternatif :</strong> <i>%(alt)</i></p><p>${why.fix}Décrivez brièvement ce que signifie cette image, dans ce contexte.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p><strong>Texte alternatif :</strong> <i>%(alt)</i></p><p>${why.fix}Décrivez brièvement ce que signifie cette image, dans ce contexte.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p><strong>Texte alternatif :</strong> <i>%(alt)</i></p><p>Ce texte alternatif ne contient que des symboles imprononçables et/ou des espaces. Les lecteurs d’écran annonceront qu’une image est présente, puis feront une pause embarrassante : "image : ____."</p><p>${why.fix}Décrivez brièvement ce que signifie cette image, dans ce contexte.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Utilisez une méthode valide pour indiquer aux lecteurs d’écran l’action de ce bouton : texte, alt sur une icône ou attribut <code>title</code>.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Ce bouton possède un attribut <code>aria-labelledby</code> vide ou ne correspondant à aucun <code>ID</code> d’un autre élément sur la page.</p><p>${why.fix}Reconnectez l’ID à un élément existant sur la page, ou supprimez cet attribut et décrivez le bouton autrement.</p>`,

	BTN_TIP: `${why.buttons}`,

	BTN_ROLE_IN_NAME: `<p><strong>Étiquette pour lecteurs d’écran :</strong> <i>%(TEXT)</i></p><p>Les lecteurs d’écran utilisent le mot « bouton » pour annoncer qu’ils décrivent un bouton ; ce mot est donc répétitif.</p><p>${why.fix}L’étiquette du bouton doit correspondre à son action. Si l’étiquette visible est une icône plutôt qu’un texte, étiquetez le bouton selon la signification de l’icône, par exemple « Lecture », « Rechercher » ou « Menu ».</p>`,

	CONTRAST_WARNING: `Une image d’arrière-plan ou un dégradé empêche ce vérificateur de connaître précisément la couleur derrière ce texte. Utilisez l’outil pipette ci‑dessous pour vérifier manuellement.`,

	DUPLICATE_ID: `<p>Les ID sont utilisés sur cette page pour des étiquettes ou des cibles de lien, ce qui implique qu’ils doivent être uniques.</p><p>${why.fix}Modifiez cet ID : <code>#%(ID)</code></p><div class="why"><p>Dans la plupart des systèmes de gestion de contenu, cela provient d’un champ “name” ou “id” dans les propriétés de l’élément. En HTML, il s’agit d’un attribut : <code>&lt;a id=""></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Supprimez l’attribut <code>title</code> du lien.</p><div class="why"><p>Note : les info‑bulles <code>title</code> n’apparaissent qu’au survol de la souris. Elles ne sont pas visibles sur mobile ni au clavier ; de nombreux utilisateurs ne les verront jamais. Elles ne doivent jamais contenir d’information importante ou unique.</p></div>`,

	EMBED_AUDIO: `<p>Ce vérificateur ne peut pas déterminer si un lecteur audio dispose d’une transcription, ni si celle‑ci est exacte.</p><p>${why.fix}Assurez‑vous qu’une <a href="https://www.w3.org/WAI/media/av/transcribing/">transcription ou alternative textuelle</a> est disponible, et que les locuteurs et effets sonores significatifs sont correctement identifiés.</p>`,

	EMBED_DATA_VIZ: `<p>Les visualisations intégrées sont souvent difficiles, voire impossibles, à utiliser pour les technologies d’assistance ; elles peuvent être difficiles à comprendre pour les personnes malvoyantes ou daltoniennes, et nécessiter un défilement horizontal important sur mobile.</p><p>${why.fix}À moins que cette visualisation ne présente un contraste visuel élevé, soit entièrement utilisable au clavier <strong><em>et</em></strong> décrite par un lecteur d’écran, ajoutez un format équivalent (description textuelle, tableau de données ou feuille de calcul téléchargeable), puis ignorez cette alerte.</p>`,

	EMBED_GENERAL: `Les vérificateurs automatiques ne peuvent pas analyser le contenu des éléments intégrés. Assurez‑vous que toutes les images ont un texte alternatif, que les vidéos ont des sous‑titres, que le texte a un contraste suffisant et que les liens et boutons sont <a href="https://webaim.org/techniques/keyboard/">accessibles au clavier</a>, puis ignorez cette alerte.`,

	EMBED_MISSING_TITLE: `<p>Les contenus intégrés doivent avoir un nom accessible décrivant leur contenu pour les lecteurs d’écran.</p><p>${why.fix}Fournissez un attribut <code>title</code> ou <code>aria-label</code> unique.</p>`,

	EMBED_UNFOCUSABLE: `<p>Cet attribut indique au clavier et aux technologies d’assistance d’ignorer cet élément. Supprimez cet attribut, sauf si l’iframe ne contient aucun lien, bouton, champ de formulaire ni contenu défilable.</p>`,

	EMBED_VIDEO: `<p>Ce vérificateur ne peut pas « voir » si les vidéos ont des sous‑titres, ni si quelqu'un les a relus ; une vérification manuelle est donc nécessaire.</p><p>${why.fix}Assurez‑vous que des <a href="https://www.w3.org/WAI/media/av/captions/">sous‑titres (« CC ») précis</a> sont disponibles, et que les locuteurs et effets sonores significatifs sont correctement identifiés.</p>`,

	HEADING_EMPTY: `<p>Les en‑têtes vides créent des lacunes confuses dans la structure de la page.</p><p>${why.fix}Ajoutez du texte à cet en‑tête ou supprimez cette ligne vide.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Les en‑têtes vides créent des lacunes confuses dans la structure de la page.</p><p>${why.fix}S’il ne s’agit pas d’un en‑tête, changez son style de <code>En‑tête %(level)</code> à <code>Paragraphe</code>. Sinon, placez la signification de l’image dans son texte alternatif.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Assurez‑vous que le titre de la page est marqué comme En‑tête de niveau 1 ou 2. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}À moins qu’il ne s’agisse d’un titre fixe (comme celui d’un article publié), raccourcissez‑le pour faciliter le survol de lecture :<span hidden>%(drop)%(drop)</span></p><p><i>%(TEXT)</i></p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Marquez le titre de la page comme en‑tête de niveau 1 pour indiquer le début de la structure du document.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Cet en‑tête est passé de <code>niveau %(prevLevel)</code> à <code>niveau %(level)</code>. Pour un lecteur d’écran, cela donne l’impression qu’il manque du contenu.</p><p>${why.fix}Ajustez les niveaux pour former une structure correcte, sans saut.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: `<p>Cet élément interactif possède un attribut <code>aria-hidden="true"</code>, mais reste accessible au clavier. Si vous <strong>souhaitez</strong> le masquer pour les lecteurs d’écran, vous devez également ajouter <code>tabindex="-1"</code>. Sinon, supprimez l’attribut <code>aria-hidden="true"</code>.</p><p><strong>Élément :</strong> <code>%(ELEMENT)</code></p>`,

	IMAGE_ALT_TOO_LONG: `<p>Ce texte alternatif comporte %(altLength) caractères : <i class="ed11y-small">%(ALT_TEXT)</i></p><p>${why.fix}Résumez, ou déplacez une partie de la description dans une légende.</p><div class="why"><p>Astuce : les images complexes qui nécessitent plus qu’une phrase ont généralement besoin d’une légende <strong>visible</strong> ou d’une alternative décrivant/interprétant les points clés. Il est acceptable d’y renvoyer :</p><ul><li>"Affiche pour la danse de vendredi ; détails dans la légende."</li><li>"Graphique montrant une baisse de 10 % cette année ; détails dans le tableau."</li></ul></div>`,

	IMAGE_DECORATIVE: `<p>Cette image a été masquée pour les lecteurs d’écran via un alt vide. Seules les images sans signification (icônes redondantes, textures décoratives) doivent être masquées ainsi.</p><p>${why.fix}Si cette image apporte une information, fournissez un texte alternatif.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: `L’image est marquée comme <strong>décorative</strong>, mais toutes les images dans un carrousel ou une galerie doivent avoir un texte alternatif descriptif.`,

	IMAGE_FIGURE_DECORATIVE: `<p>Cette image sera ignorée par les technologies d’assistance. La légende a‑t‑elle un sens sans l’image ?</p><p>${why.fix}Si la légende ne décrit pas la signification visuelle, fournissez un texte alternatif pour les éléments non décrits.</p><div class="why"><p>Astuce : images, alts et légendes fonctionnent ensemble :</p><ul><li>Les légendes visibles donnent du contexte.</li><li>Les textes alternatifs décrivent l’image pour ceux qui ne peuvent pas la voir.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p><strong>Texte en double : </strong><i>%(ALT_TEXT)</i></p><p>${why.fix}Décrivez dans le texte alternatif toute signification visuelle manquante.</p><div class="why"><p>Astuce : images, alts et légendes fonctionnent ensemble :</p><ul><li>Les légendes visibles donnent du contexte et une interprétation.</li><li>Les textes alternatifs décrivent l’image pour ceux qui ne peuvent pas la voir.</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: `<p><strong>Étiquette invisible :</strong> <i>%(TEXT)</i></p><p>Vérifiez qu’il existe une étiquette visible, qu’elle reste visible quand du texte est saisi, et qu’elle correspond à l’étiquette invisible.</p><div class="why"><p>Des étiquettes visibles uniquement via <em>title</em> ou <em>placeholder</em> disparaissent dès la saisie, ce qui complique la relecture et facilite l’oubli de mettre à jour l’étiquette invisible.</p></div>`,

	LABELS_INPUT_RESET: `<p>Les boutons de réinitialisation sont facilement activés par erreur, provoquant une perte de données sans possibilité d’annuler.</p><p>${why.fix}À moins de réinitialiser un seul champ, envisagez de le retirer ou de proposer une confirmation avant l’action.</p>`,

	LABELS_MISSING_IMAGE_INPUT: `Le bouton image n’a pas de texte alternatif. Ajoutez‑en un pour fournir un nom accessible, par exemple : <em>Chercher</em> ou <em>Envoyer</em>.`,

	LABELS_MISSING_LABEL: `<p>${why.fix}Ajoutez un <code>id</code> à ce champ, et ajoutez un attribut <code>for</code> correspondant à l’étiquette.</p>`, // updated to mirror baseAll

	LABELS_NO_FOR_ATTRIBUTE: `Aucune étiquette n’est associée à ce champ. Ajoutez un attribut <code>for</code> à l’étiquette correspondant au <code>id</code> du champ. <hr> <strong>ID :</strong> <code>#%(ID)</code>`,

	LABELS_PLACEHOLDER: `<p>Le texte de remplacement peut être confondu avec du contenu déjà saisi s’il a un bon contraste, ou être illisible s’il n’en a pas. Il disparaît ensuite dès la saisie, ce qui peut supprimer des informations dont les utilisateurs ont besoin pour vérifier leurs erreurs.</p><p>${why.fix}Assurez‑vous que les informations clés (étiquette, aide, instructions) restent visibles même lorsque le champ contient du texte.</p>`,

	LABEL_IN_NAME: `<p><strong>Texte visible :</strong> <i>%(VISIBLE)</i></p><p><strong>Étiquette pour lecteurs d’écran :</strong> <i>%(LABEL)</i></p><p>Le texte visible de cet élément semble différent de son nom accessible. Cela peut dérouter les utilisateurs de lecteurs d’écran et gêner le contrôle vocal.</p><p>${why.fix}Assurez‑vous que l’étiquette visible commence par le texte de l’étiquette invisible et ne contient aucune information significative qui serait absente de l’étiquette invisible.</p>`, // updated to match baseAll

	LINK_ALT_FILE_EXT: `<p>Le texte alternatif de cette image est probablement un nom de fichier au lieu d’un libellé utile pour un lien :<br><span hidden>%(ALT)</span><i>%(alt)</i></p><p>${why.fix}Utilisez le titre de la destination du lien comme texte alternatif pour les images liées.</p><div class="why"> <p>Le texte alternatif doit refléter la signification, pas le contenu brut : pour une image liée, la signification est la destination du lien :</p><ul><li>"Page avec texte" décrit l’image, pas le lien.</li><li>"IMG_1234.jpg" est un simple nom de fichier.</li><li>"Formulaire d’inscription (doc)" est une vraie destination.</li></ul></div>`,

	LINK_ALT_MAYBE_BAD: `<p><strong>Texte alternatif :</strong> <i>%(alt)</i></p><p>${why.fix}Utilisez le titre de la destination du lien comme texte alternatif pour les images liées.</p>${why.imageLinks}`,

	LINK_ALT_MAYBE_BAD_WARNING: `<p><strong>Texte alternatif :</strong> <i>%(alt)</i></p><p>${why.fix}Utilisez le titre de la destination du lien comme texte alternatif pour les images liées.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>Le texte alternatif de cette image liée ne contient que des symboles imprononçables ou des espaces : <i>%(ALT_TEXT)</i></p><p>Les lecteurs d’écran annonceront le lien mais seront incapables de le décrire.</p><p>${why.fix}Utilisez le titre de la destination du lien comme texte alternatif pour les images liées.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `<p><strong>Texte du lien :</strong> <i>%(TEXT)</i></p><p>${why.fix}Supprimez les mots redondants qui détournent l’attention de l’objet du lien.</p>${why.links}`,

	LINK_DOI: `<p><strong>Texte du lien :</strong> <i>%(TEXT)</i></p><p>${why.fix}Liez le titre de l’article et laissez le DOI en texte simple, au lieu de lier le DOI et laisser le titre sans lien.</p><div class="why"><p>Selon les recommandations de l’APA, les liens doivent être descriptifs : ils aident les utilisateurs à trouver les contenus pertinents en parcourant uniquement les liens.</p><p>Les lecteurs d’écran peuvent ainsi annoncer des liens significatifs plutôt qu’une série de chiffres incompréhensibles.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Ajoutez du texte décrivant sa destination, ou supprimez-le s'il s'agit simplement d'une faute de frappe ou d'un caractère d'espace lié.</p><div class="why"><p>Conseil : les lecteurs d'écran ne peuvent pas décrire les liens qui ne contiennent que des espaces ou des symboles. Ils restent soit silencieux (« Lien, [...pause maladroite là où le titre du lien devrait être...]»), soit lisent l'URL : "Lien, H-T-T-P-S barre oblique barre oblique exemple point com."</p><p>Notez que les caractères d'espace liés peuvent être difficiles à supprimer dans certains éditeurs de contenu ; il est parfois nécessaire de supprimer « à travers l'écart » en supprimant et en retapant les mots de chaque côté d'un espace lié.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>Ce lien possède un attribut <code>aria-labelledby</code> qui ne correspond à aucun <code>ID</code> sur la page.</p><p>${why.fix}Fournissez un ID valide ou supprimez cet attribut.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Ajoutez du texte décrivant sa destination, ou supprimez ce lien s’il s’agit d’un accident.</p><div class="why"><p>Les liens vides provoquent silence ou lecture des URL.</p><p>Les espaces liés nécessitent parfois de réécrire le texte environnant pour les supprimer.</p></div>`,
	LINK_UNPRONOUNCEABLE: `<p><strong>Texte du lien :</strong> <i>%(TEXT)</i></p><p>${why.fix}Ajoutez du texte ou un titre décrivant sa destination, ou supprimez-le s'il s'agit simplement d'une faute de frappe ou d'un caractère d'espace lié.</p><div class="why"><p>Conseil : les lecteurs d'écran ne peuvent pas décrire les liens qui ne contiennent que des espaces ou des symboles. Ils restent soit silencieux (« Lien, [...pause maladroite là où le titre du lien devrait être...] »), soit lisent le nom du symbole.</p></div>`,

	LINK_FILE_EXT: `<p><strong>Texte du lien :</strong> <i>%(TEXT)</i></p><p>Ce lien pointe vers un fichier téléchargeable (PDF, MP3, Zip, Word, etc.) sans avertissement.</p><p>${why.fix}Utilisez du texte ou une icône pour <a href="https://itmaybejj.github.io/linkpurpose/">indiquer le type de fichier</a> dans le lien.</p><p class="why">Pour les fichiers volumineux, indiquez la taille : ex. "Rapport annuel (PDF, 3 Mo)"</p>`,

	LINK_IDENTICAL_NAME: `<p>Texte du lien : <i>%(TEXT)</i></p><p>${why.fix}Réécrivez les liens menant à des destinations différentes en utilisant les titres uniques de chaque destination.</p>${why.links}`,

	LINK_IMAGE_ALT: `<p><strong>Texte alternatif :</strong> <i>%(ALT_TEXT)</i></p><p>${why.fix}Utilisez le titre de la destination du lien comme texte alternatif pour les images liées.</p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p><strong>Texte alternatif :</strong> <i>%(ALT_TEXT)</i></p><p><strong>Texte du lien incluant le texte alternatif :</strong> <i>%(TEXT)</i></p><p>${why.fix}Modifiez ou supprimez le texte alternatif s’il ajoute des informations non pertinentes ou redondantes.</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p>Ce texte alternatif comporte %(altLength) caractères : <i class="ed11y-small">%(ALT_TEXT)</i></p><p>${why.fix}Utilisez le titre de la destination du lien comme texte alternatif pour les images liées.</p><div class="why"><p>Les utilisateurs de lecteurs d’écran entendent souvent la liste des liens d’une page hors contexte. Puisque le texte alternatif d’une image liée devient le titre du lien dans cette liste, il doit <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">décrire la destination du lien</a>, et non le contenu de l’image.</p></div>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Quand une image est utilisée comme lien, son texte alternatif <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">doit décrire la destination du lien</a>.</p><p>${why.fix}Utilisez le titre de la destination du lien comme texte alternatif pour les images liées.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: `L’image est marquée comme décorative, mais le lien utilise le texte environnant comme libellé descriptif.`,

	LINK_MAYBE_BUTTON: `<p><strong>Lien :</strong> <i>%(TEXT)</i></p><p>Ce lien a une cible invalide et porte un nom qui suggère qu’il fonctionne peut‑être comme un bouton ou un interrupteur plutôt que comme un lien.</p><p>${why.fix}Utilisez plutôt un <a href="https://www.w3.org/WAI/ARIA/apg/patterns/button/">&lt;button&gt;</a>, ou corrigez la cible du lien.</p><div class="why"><p>Astuce : les technologies d’assistance traitent les boutons et les liens différemment. Utiliser le bon élément HTML garantit que les utilisateurs connaissent les raccourcis clavier appropriés et l’action qui sera déclenchée.</p></div>`,

	LINK_NEW_TAB: `<p><strong>Texte du lien :</strong> <i>%(TEXT)</i></p><p>${why.fix}Configurez ce lien pour s’ouvrir dans le même onglet, ou <a href="https://itmaybejj.github.io/linkpurpose/">prévoyez un avertissement aux utilisateurs</a> avant l’ouverture dans un nouvel onglet.</p><div class="why"><p>Les utilisateurs peuvent toujours choisir d’ouvrir un lien dans un nouvel onglet. Forcer l’ouverture peut être déroutant, surtout pour les technologies d’assistance.</p><p>Note : les liens dans les formulaires ouvrent souvent un nouvel onglet pour éviter la perte de données.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p><strong>Texte alternatif :</strong> <i>%(alt)</i>.</p><p>${why.fix}Utilisez le titre de la destination du lien comme texte alternatif pour les images liées.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Ce lien contient du texte qui n’aide pas à décrire sa destination :<br><i>%(ERROR)</i></p><p>${why.fix}Réécrivez ce lien pour décrire sa destination de manière concise.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>Un nom différent a été fourni via ARIA :</p><p><strong>Texte visible :</strong> <i>%(VISIBLE)</i></p><p><strong>Texte masqué :</strong> <i>%(HIDDEN)</i></p><p>${why.fix}Écrivez des liens significatifs pour tous les utilisateurs, et assurez‑vous que <a href="https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html">l’étiquette visible de chaque élément correspond à son nom</a>, afin que les utilisateurs du contrôle vocal puissent indiquer à leur navigateur sur quel lien cliquer.</p>${why.links}`,

	LINK_SUS_ALT: `<p>À moins que "<i>%(alt)</i>" ne décrive la destination du lien, ce texte alternatif décrit probablement l’image.</p><p><strong>Texte alternatif :</strong> <i>%(ALT_TEXT)</i></p><p>${why.fix}Utilisez le titre de la destination du lien comme texte alternatif pour les images liées.</p>${why.imageLinks}`,

	LINK_SYMBOLS: `<p>Symbole trouvé : <i>%(ERROR)</i></p><p>${why.fix}Évitez d’utiliser des symboles comme appels à l’action dans les liens, sauf s’ils sont masqués pour les technologies d’assistance. Les lecteurs d’écran peuvent les lire à voix haute, ce qui peut semer la confusion.</p>`,

	LINK_URL: `<p><strong>Texte du lien :</strong> <i>%(TEXT)</i></p><p>${why.fix}Changez ce lien pour utiliser le titre de sa destination ou sa fonction.</p><div class="why"><p>Les utilisateurs parcourent la page par ses liens — en particulier les utilisateurs de lecteurs d’écran.</p><p>Les URL en texte de lien sont difficiles à parcourir et à rechercher.</p></div>`,

	META_LANG: `<p>${why.fix}Ajoutez un <a href="https://www.w3.org/International/questions/qa-html-language-declarations">attribut de langue</a> sur la balise HTML.</p><div class="why"><p>Astuce : les lecteurs d’écran prononcent les mots selon la langue indiquée. Une mauvaise langue produit un discours incompréhensible.</p></div>`,

	META_LANG_VALID: `<p><strong>Élément :</strong> <code>&lt;%(ELEMENT) lang="%(CODE)"&gt;</code></p><p>${why.fix}Remplacez l’attribut lang par un code de langue valide.</p><div class="why"><p>Astuce : les pages et les éléments possèdent des <a href="https://www.w3.org/International/questions/qa-html-language-declarations">attributs de langue</a> afin que les lecteurs d’écran et les outils de traduction lisent correctement le texte.</p></div>`,

	META_MAX: `<p>Cette balise meta limite la possibilité pour les utilisateurs d’agrandir le texte.</p><p>${why.fix}Ajustez ou supprimez cette limitation pour permettre un zoom complet.</p>`,

	META_REFRESH: `<p>Les pages ne devraient pas se recharger automatiquement via une balise meta, car cela interrompt l’utilisateur sans avertissement et peut réinitialiser les formulaires.</p><p>${why.fix}Utilisez AJAX ou JavaScript pour mettre à jour le contenu en informant l’utilisateur et en lui donnant la possibilité de retarder l’événement.</p>`,

	META_SCALABLE: `<p>Cette balise meta empêche les utilisateurs d’agrandir le texte.</p><p>${why.fix}Permettez un zoom complet en supprimant ou ajustant ce paramètre.</p>`,

	META_TITLE: `<p>${why.fix}Ajoutez une balise <code><title></code> dans l’élément <code>head</code> de la page.</p><div class="why"><p>Un <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title">titre court et unique</a> est essentiel :</p><ul><li>Les moteurs de recherche l’utilisent pour les résultats.</li><li>Les navigateurs l’utilisent pour les onglets.</li><li>Les lecteurs d’écran l’annoncent lors des changements d’onglet.</li></ul><p>Sans titre, les utilisateurs n’obtiennent qu’une URL brute.</p></div>`,

	MISSING_ALT: `<p>Lorsqu’un lecteur d’écran rencontre une image sans attribut alt, il tente de prononcer l’URL du fichier image, souvent lettre par lettre.</p><p>${why.fix}Décrivez brièvement ce que signifie cette image, dans ce contexte.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Lorsqu’une image liée n’a pas d’attribut alt, les lecteurs d’écran tentent de prononcer l’URL, ce qui est particulièrement problématique.</p><p>${why.fix}Ajoutez un texte alternatif correspondant à la destination du lien.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Cette image fait partie d’un lien contenant du texte. Si le texte visible décrit correctement la destination, ajoutez alt="" pour ignorer l’image. Sinon, fournissez un texte alternatif qui aide à décrire la destination ou la fonction du lien.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>Le lien semble pointer vers un environnement de développement :<br>{L} <code>%(LINK)</code></p><p>${why.fix}Remplacez‑le par un chemin relatif (/folder) ou par l’URL publique.</p>`,

	QA_BLOCKQUOTE: `<p><strong>Citation suspicieusement courte :</strong> <i>%(TEXT)</i></p><p>${why.fix}Si ceci n’est pas une citation mais un en‑tête, marquez‑le comme en‑tête pour qu’il apparaisse dans la structure de la page.</p>${why.headings}`,

	QA_DOCUMENT: `<p><strong>Lien :</strong> <i>%(TEXT)</i></p><p>Les documents liés sont considérés comme du contenu web et doivent également être accessibles. Vérifiez titres, tableaux et textes alternatifs, puis ignorez cette alerte.</p><ul class="why"><li>Rendre vos <a href="https://support.google.com/docs/answer/6199477?hl=fr">documents Google Workspace accessibles</a>.</li><li>Rendre vos <a href="https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">documents Office accessibles</a>.</li></ul>`,

	QA_FAKE_HEADING: `<p><strong>Texte en gras :</strong> <i>%(TEXT)</i></p><p>${why.fix}Si ce texte est en gras pour marquer un changement de sujet, marquez‑le comme en‑tête afin que les utilisateurs de lecteurs d’écran puissent s’en servir pour naviguer dans la page.</p><div class="why"> <p>Astuce : les styles gras et italique apportent une emphase visuelle, mais n’ajoutent pas automatiquement de texte à la table des matières pour les technologies d’assistance.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Si <i>%(TEXT)</i> fait partie d’une liste, formatez‑le comme une liste.</p><div class="why"><p>Les listes ont une structure visuelle et technique :</p><ol><li>Elles alignent les éléments et facilitent la lecture.</li><li>Elles sont reconnues par les lecteurs d’écran, qui annoncent "élément 3 sur 7".</li></ol><p>Un paragraphe commençant par un numéro n’est pas une vraie liste.</p></div>`,

	QA_IN_PAGE_LINK: `<p><strong>URL :</strong> <i>#%(ID)</i></p><p><strong>Lien :</strong> <code>%(TEXT)</code></p><p>La cible de ce lien ne correspond à aucun élément de la page.</p><div class="why"><p>Note pour les développeurs : si le lien déclenche un événement JavaScript, testez son fonctionnement au clavier avant de l’ajouter à la liste d’exclusion.</p></div>`,

	QA_JUSTIFY: `<p>Le texte justifié ajoute des espacements irréguliers entre les mots, ce qui rend la lecture plus difficile pour de nombreuses personnes.</p><p>${why.fix}Utilisez un alignement à gauche.</p>`,

	QA_NESTED_COMPONENTS: `Évitez d’imbriquer des composants interactifs, tels que des accordéons dans d’autres accordéons ou des onglets dans des accordéons. Cela complique la navigation et peut faire manquer du contenu.`,

	QA_PDF: `<p><strong>Lien :</strong> <i>%(TEXT)</i></p><p>${why.fix}Faites l’une des actions suivantes puis ignorez cette alerte :</p><ul><li>Liez à une page web plutôt qu’à un PDF,</li><li>Ou fournissez également une version web ou éditable,</li><li>Ou assurez‑vous que le PDF est accessible (titres, ordre de lecture, en‑têtes de tableau, textes alternatifs).</li></ul><div class="why"><p>Les utilisateurs mobiles et les technologies d’assistance préfèrent largement les pages web aux PDFs, qui ne se reformatent pas pour mobile et manquent souvent de balisage nécessaire.</p></div>`,

	QA_SMALL_TEXT: `<p><strong>Texte :</strong> <i>%(TEXT)</i></p><p>${why.fix}Restez au‑dessus de 80 % de la taille de police par défaut. Un texte trop petit est difficile à lire, particulièrement pour les personnes malvoyantes.</p>`,

	QA_STRONG_ITALICS: `<p><strong>Texte :</strong> <i>%(TEXT)</i></p><p>${why.fix}Réservez le gras et l’italique aux mots ou phrases clés.</p><div class="why"><p>Note : si c’est une citation, utilisez la balise <em>blockquote</em>.</p></div>`,

	QA_SUBSCRIPT: `<p><strong>Texte :</strong> <i>%(TEXT)</i></p><p>Les exposants et indices rendent le texte trop petit et difficile à lire. Ne les utilisez que pour des usages spécifiques : nombres ordinaux (4<sup>e</sup>), formules chimiques (H<sub>2</sub>O), références de notes.</p>`,

	QA_UNDERLINE: `<p>Sur le Web, le texte souligné sert pour les liens, pas pour l’emphase. Les utilisateurs penseront qu’il est cliquable : <i><u>%(TEXT)</u></i></p><p>${why.fix} Utilisez <strong>gras</strong> ou <em>italique</em> pour l’emphase, et des en‑têtes pour la structure.</p><div class="why"><p>Note : les lecteurs d’écran n’annoncent pas les mises en forme visuelles comme le soulignement. Seuls les en‑têtes créent de la structure.</p></div>`,

	QA_UPPERCASE: `<p><strong>Texte :</strong> <i>%(TEXT)</i></p><p>${why.fix}N’utilisez les majuscules que pour quelques mots à la fois pour l’emphase. LES BLOCS DE TEXTE EN MAJUSCULES SONT PLUS DIFFICILES À LIRE, ET DE NOMBREUX LECTEURS LES INTERPRÈTENT COMME DES CRIS.</p><div class="why"><p>Note : les lecteurs d’écran n’annoncent pas les mises en forme visuelles comme le texte en majuscules. Utilisez un style d’en‑tête si ce texte emphatique introduit un changement de sujet ou un contenu d’importance critique.</p></div>`,
	SUS_ALT: `<p>Le texte alternatif de cette image contient le mot "<i>%(alt)</i>". Les lecteurs d’écran annoncent déjà qu’ils lisent la description d’une image, donc des expressions comme "image de" ou "photo de" sont généralement redondantes.</p><p><strong>Texte alternatif :</strong> <i>%(ALT_TEXT)</i></p><p>${why.fix}Décrivez brièvement ce que signifie cette image, dans ce contexte.</p><div class="why"><p>Astuce : ces expressions méritent d’être conservées si le format lui‑même a un sens :<br>"Une photo d’un chat, encadrée et accrochée au mur."</p></div>`,

	TABINDEX_ATTR: `<p>Les valeurs de tabindex supérieures à 0 déplacent les éléments focusables hors de leur ordre visuel, ce qui rend difficile pour les utilisateurs de technologies d’assistance de les localiser et de les utiliser.</p><p>${why.fix}Modifiez plutôt l’ordre des éléments dans le HTML, pour que l’ordre du focus et l’ordre de lecture correspondent.</p><div class="why"><p>Astuce : l’ordre visuel des mots sur la page et l’ordre dans lequel les claviers parcourent les éléments sont généralement les mêmes.</p><p>Attribuer un tabindex positif à un élément le déplace au début de l’ordre de tabulation, <strong>mais pas de l’ordre visuel ou de lecture</strong>.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Assurez‑vous que chaque cellule d’en‑tête contient du texte.</p><div class="why"><p>Astuce : les lecteurs d’écran utilisent les en‑têtes pour orienter les utilisateurs dans un tableau.</p></div>`,

	TABLES_INVALID_HEADERS_REF: `<p>Ce tableau essaie d’associer une cellule de données à une cellule d’en‑tête spécifique, mais l’ID de l’en‑tête est introuvable : <code>%(VALUE)</code>.</p><p>${why.fix}Assurez‑vous que chaque attribut <code>headers</code> correspond à l’ID d’une cellule d’en‑tête du même tableau.</p><div class="why">Astuce : <a href="https://www.w3.org/WAI/WCAG22/Techniques/html/H43">l’utilisation de références d’ID manuelles</a> pour associer des cellules de données à des cellules d’en‑tête est complexe et fragile. Quand c’est possible, divisez les données complexes en tableaux plus petits avec des lignes et colonnes d’en‑têtes simples.</div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Modifiez les propriétés du tableau et indiquez si les en‑têtes se trouvent dans la première ligne, la première colonne ou les deux.</p><div class="why"> <p>Astuce : les lecteurs d’écran répètent l’en‑tête pertinent en entrant dans chaque ligne ou colonne.</p><p>Si ce tableau n’a pas d’en‑têtes car il sert de mise en page visuelle, remplacez‑le par autre chose qu’un tableau.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Supprimez ce format d’en‑tête (h2, h3). Fournissez plutôt des lignes ou colonnes d’en‑têtes. Si vous avez besoin de plusieurs niveaux, utilisez plusieurs tableaux.</p><div class="why"> <p>Astuce : les en‑têtes de tableau sont directionnels (ligne ou colonne). Les en‑têtes de contenu, eux, affectent tout ce qui suit.</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Un <strong>en‑tête de tableau</strong> en cellule 2 étiquette la cellule B. <br><br> Un <strong>en‑tête de contenu</strong> étiquette les cellules 3, A, B, C, ainsi que ce texte et le pied de ce conseil.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`
};

const interfaceStrings = {
	ALERT_CLOSE: 'Fermer',
	ALT: 'Texte alternatif : ',
	CONSOLE_ERROR:
		`Un problème affecte le vérificateur d’accessibilité sur cette page. Veuillez <a class="g-link">le signaler sur GitHub</a>. Informations de débogage :`,
	DECORATIVE: 'Marqué comme décoratif',
	DISMISS: 'Ignorer',
	DISMISS_ALL: 'Sur cette page : ignorer',
	edit_page: 'Modifier la page',
	edit_layout: 'Modifier la mise en page',
	edit_media: 'Modifier le média',
	edit_term: 'Modifier le terme',
	edit_user: 'Modifier l’utilisateur',
	IMAGES: 'Texte alternatif',
	MAIN_TOGGLE_LABEL: 'Activer les outils d’accessibilité',
	MISSING: '(manquant !)',
	NOT_VISIBLE: 'Note : ce contenu peut ne pas être visible. Cherchez‑le dans le conteneur délimité.',
	NO_IMAGES: 'Aucune image trouvée.',
	OUTLINE: 'En‑têtes',
	PANEL_DISMISS_BUTTON: `Afficher %(dismissCount) alertes masquées`,
	PANEL_HEADING: 'Afficher les visualisations',
	SKIP_TO_ISSUE: 'Afficher l’alerte', // updated
	WARNING: 'vérification manuelle',
	WARNINGS: 'vérifications manuelles',
	buttonFirstContent: 'Afficher la première alerte', // updated
	buttonHideHiddenAlert: 'Masquer l’alerte masquée',
	buttonHideHiddenAlerts: `Masquer %(count) alertes masquées`,
	buttonShowHiddenAlert: 'Afficher l’alerte masquée',
	buttonToolsActive: 'Masquer les visualisations',
	dismissActions: `Similaires`,
	dismissHideTitle: 'Masque seulement l’alerte pour vous',
	dismissOkAllButton: 'Sur cette page : marquer comme OK',
	dismissOkButtonContent: 'Marquer comme OK',
	dismissOkTitle: 'Masque l’alerte pour tous les éditeurs',
	dismissOnSite: 'Sur toutes les pages : marquer comme OK',
	dismissalsHeader: 'Vous n’allez pas corriger ceci ?',
	errorOutlinePrefixHeadingEmpty: '(en‑tête vide)',
	errorOutlinePrefixHeadingIsLong: '(signalé pour longueur)',
	errorOutlinePrefixSkippedLevel: '(signalé pour niveau sauté)',
	issueContent: 'Problème de contenu',
	issueDeveloper: 'Problème de développement',
	issueTemplate: 'Problème de modèle',
	main_toggle_hide: 'Masquer les outils d’accessibilité',
	main_toggle_hide_alerts: 'Masquer les alertes d’accessibilité',
	main_toggle_show: 'Afficher les outils d’accessibilité',
	main_toggle_show_alerts: 'Afficher les alertes d’accessibilité',
	main_toggle_1: 'Une alerte d’accessibilité',
	main_toggle_2: 'Deux alertes d’accessibilité',
	main_toggle_plural: ` alertes d’accessibilité`,
	MISSING_ROOT: `Editoria11y n'a trouvé aucun élément correspondant à la configuration de la zone de vérification : <code>%(root)</code>`,
	panelCheckAltText: `Vérifiez que chaque image décrit ce qu’elle signifie dans le contexte et qu’il n’y a pas d’images contenant du texte.`,
	panelCheckOutline: `Ceci affiche la structure des en‑têtes. Vérifiez qu’elle correspond à l’organisation visuelle du contenu.`,
	panel_HEADING_MISSING_ONE: 'En‑tête de niveau 1 manquant.',
	PANEL_NO_HEADINGS: 'Aucun en‑tête trouvé.',
	reportsLink: 'Ouvrir les rapports du site',
	toggleDisabled: 'Aucun contenu disponible à vérifier pour Editoria11y.',
	transferFocus: 'Modifier ce contenu',
	unDismissHideButton: 'Restaurer cette alerte ignorée',
	unDismissNotePermissions: 'Cette vérification a été masquée par un administrateur',
	unDismissOKButton: 'Restaurer cette alerte marquée comme OK',
};

export const lang = {
	strings: Object.assign(Sa11yStrings.strings, interfaceStrings, tips),
	testNames: testNames,
}
