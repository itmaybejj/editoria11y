import {default as Sa11yStrings} from '../sa11y-lang/fr.js';
// Caution: uncorrected machine translation. Contact us on GitHub to contribute.

const testNames = {
	ALT_FILE_EXT: 'Ce texte alternatif est un nom de fichier, pas une description',
	ALT_MAYBE_BAD: 'Ce texte alternatif ne peut pas être prononcé par un lecteur d’écran',
	ALT_PLACEHOLDER: 'Ce texte alternatif ne décrit pas l’image', // updated
	ALT_UNPRONOUNCEABLE: 'Ce texte alternatif est impossible à prononcer',
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
	LABELS_PLACEHOLDER: 'Vérification manuelle : texte de remplacement',
	LABELS_INPUT_RESET: 'Ce bouton de réinitialisation est‑il nécessaire ?',
	LABEL_IN_NAME: 'L’étiquette visible ne correspond pas à l’étiquette invisible',
	LABELS_MISSING_LABEL: 'Ce champ n’est pas connecté à une étiquette', // updated new
	LINK_ALT_FILE_EXT: 'Un texte alternatif utilisé comme lien ne doit pas être une URL',
	LINK_ALT_MAYBE_BAD: 'Ce texte alternatif lié ne peut pas être prononcé par un lecteur d’écran',
	LINK_ALT_UNPRONOUNCEABLE: 'Les images liées doivent avoir un texte alternatif prononçable',
	LINK_CLICK_HERE: 'Vérification manuelle : le lien contient « cliquer ici »',
	LINK_DOI: "Liez les titres d’articles, pas les numéros DOI",
	LINK_EMPTY: 'Ce lien ne contient aucun mot.',
	LINK_EMPTY_LABELLEDBY: 'Lien avec attribut « aria‑labelledby » non valide',
	LINK_EMPTY_NO_LABEL: 'Ce lien a besoin d’une étiquette',
	LINK_FILE_EXT: 'Ce lien pointe vers un fichier sans avertissement',
	LINK_IDENTICAL_NAME: 'Des liens avec le même texte mènent à des pages différentes', // updated
	LINK_IMAGE_ALT: 'Vérification manuelle : image liée avec texte alternatif',
	LINK_IMAGE_ALT_AND_TEXT: 'Ce texte alternatif a‑t‑il un sens dans ce lien ?',
	LINK_IMAGE_LONG_ALT: 'Ce texte alternatif lié peut‑il être plus court ?',
	LINK_IMAGE_NO_ALT_TEXT: 'Cette image liée nécessite un texte alternatif',
	LINK_IMAGE_TEXT: 'Vérification manuelle : image dans un lien marquée comme décorative.',
	LINK_NEW_TAB: 'Ce lien ouvre‑t‑il un nouvel onglet sans avertissement ?',
	LINK_PLACEHOLDER_ALT: 'Cette image liée nécessite un texte alternatif significatif',
	LINK_STOPWORD: 'Ce lien contient uniquement des mots génériques', // updated
	LINK_STOPWORD_ARIA: 'Le texte du lien n’est significatif que pour les utilisateurs de lecteurs d’écran',
	LINK_SUS_ALT: 'Le texte alternatif décrit‑il l’image ou le lien ?',
	LINK_SYMBOLS: 'Vérification manuelle : les symboles ou émojis dans ce lien sont‑ils significatifs ?',
	LINK_URL: 'Le texte du lien ne doit pas être une URL',
	META_LANG: 'Balise meta pour la langue manquante',
	META_MAX: 'La balise meta limite l’agrandissement du texte',
	META_REFRESH: 'La balise meta actualise automatiquement la page',
	META_SCALABLE: 'La balise meta empêche l’agrandissement du texte',
	META_TITLE: 'Balise meta du titre de page manquante',
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
	TABINDEX_ATTR: 'tabindex sur cet élément perturbe l’ordre de lecture',
	TABLES_EMPTY_HEADING: 'Cette cellule d’en‑tête a besoin de texte',
	TABLES_MISSING_HEADINGS: 'Ce tableau a besoin d’une ligne et/ou d’une colonne d’en‑têtes',
	TABLES_SEMANTIC_HEADING: 'Les en‑têtes de contenu ne doivent pas être utilisés dans les tableaux',
	UNCONTAINED_LI: 'Liste HTML invalide',
};

const why = {
	fix: `<strong class="badge">À corriger</strong>`,
	check: `<strong class="badge">Vérification manuelle</strong>`,

	buttons: `<div class="why"><p>Note : le nom accessible d’un bouton doit indiquer clairement ce qu’il fait. Les boutons qui changent après un clic doivent également changer de nom :</p><ul>
<li>Changement de libellés :<br>"Lecture/Pause", "Afficher les détails/Masquer les détails"</li>
<li>Changement d’<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">attributs d’état</a> :<br>"Lecture/Lecture, activé", "Détails, réduit/Détails, développé."</li>
</ul>
<p>Veillez simplement à ne pas changer ces deux aspects en même temps. Passer de “Lecture” à “Pause, activé” indiquerait que le lecteur est en pause, et non en lecture&nbsp;!</p></div>`,

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

	imageLinks: `<div class="why"><p>Le but du texte alternatif est de fournir une alternative au sens d’une image, pas à son contenu brut. Pour une image liée, le sens correspond à la destination du lien :
<ul>
<li>"<em>Une loupe</em>" décrit l’image, pas le lien.</li>
<li>"<em>Une loupe de recherche</em>" décrit confusément les deux.</li>
<li>"<em>Rechercher</em>" décrit correctement la destination du lien.</li>
</ul></p></div>`
};

export const tips = {
	ALT_FILE_EXT: `<p><span style="display: none">%(alt)</span>Texte alternatif : <strong>"%(ALT_TEXT)"</strong></p><p>Les lecteurs d’écran liront cette URL, souvent lettre par lettre. Cela ne transmet probablement pas la même signification que de voir l’image.</p><p>${why.fix}Ajoutez un texte alternatif vide (alt="") si cette image est purement décorative et doit être ignorée par les lecteurs d’écran, ou ajoutez un texte alternatif descriptif.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Texte alternatif : <strong>"%(alt)"</strong></p><p>${why.fix}Définissez le texte alternatif de cette image sur une description concise de ce que l’image signifie dans ce contexte.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Texte alternatif : <strong>"%(alt)"</strong></p><p>${why.fix}Définissez le texte alternatif de cette image sur une description concise de ce que l’image signifie dans ce contexte.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>Le texte alternatif de cette image est "%(alt)", et ne contient que des symboles imprononçables et/ou des espaces. Les lecteurs d’écran annonceront qu’une image est présente, puis feront une pause embarrassante : "image : ____."</p><p>${why.fix}Ajoutez un texte alternatif descriptif, ou un texte alternatif <em>entièrement</em> vide (alt="") si ce n’est qu’une icône ou un espaceur devant être ignoré par les lecteurs d’écran.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Utilisez une méthode valide pour indiquer aux lecteurs d’écran l’action de ce bouton : texte, alt sur une icône ou attribut <code>title</code>.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Ce bouton possède un attribut <code>aria-labelledby</code> vide ou ne correspondant à aucun <code>ID</code> d’un autre élément sur la page.</p><p>${why.fix}Reconnectez l’ID à un élément existant sur la page, ou supprimez cet attribut et décrivez le bouton autrement.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: `Une image d’arrière-plan ou un dégradé empêche ce vérificateur de connaître précisément la couleur derrière ce texte. Utilisez l’outil pipette ci‑dessous pour vérifier manuellement.`,

	DUPLICATE_ID: `<p>Les ID sont utilisés sur cette page pour des étiquettes ou des cibles de lien, ce qui implique qu’ils doivent être uniques.</p><p>${why.fix}Modifiez cet ID : <strong>#%(id)</strong></p><div class="why"><p>Dans la plupart des systèmes de gestion de contenu, cela provient d’un champ “name” ou “id” dans les propriétés de l’élément. En HTML, il s’agit d’un attribut : <code>&lt;a id=""></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Supprimez l’attribut <code>title</code> du lien.</p><div class="why"><p>Note : les info‑bulles <code>title</code> n’apparaissent qu’au survol de la souris. Elles ne sont pas visibles sur mobile ni au clavier ; de nombreux utilisateurs ne les verront jamais. Elles ne doivent jamais contenir d’information importante ou unique.</p></div>`,

	EMBED_AUDIO: `<p>Si l’audio contient de la parole, une <a href="https://www.w3.org/WAI/media/av/transcribing/">alternative textuelle</a> doit être fournie sur cette page ou via un lien.</p><p>Note : une personne doit relire et corriger les transcriptions automatiques, et identifier les locuteurs et sons significatifs.</p>`,

	EMBED_DATA_VIZ: `<p>Les visualisations intégrées sont souvent difficiles, voire impossibles, à utiliser pour les technologies d’assistance ; elles peuvent être difficiles à comprendre pour les personnes malvoyantes ou daltoniennes, et nécessiter un défilement horizontal important sur mobile.</p><p>${why.fix}À moins que cette visualisation ne présente un contraste visuel élevé, soit entièrement utilisable au clavier <strong><em>et</em></strong> décrite par un lecteur d’écran, ajoutez un format équivalent (description textuelle, tableau de données ou feuille de calcul téléchargeable), puis ignorez cette alerte.</p>`,

	EMBED_GENERAL: `Les vérificateurs automatiques ne peuvent pas analyser le contenu des éléments intégrés. Assurez‑vous que toutes les images ont un texte alternatif, que les vidéos ont des sous‑titres, que le texte a un contraste suffisant et que les liens et boutons sont <a href="https://webaim.org/techniques/keyboard/">accessibles au clavier</a>, puis ignorez cette alerte.`,

	EMBED_MISSING_TITLE: `<p>Les contenus intégrés doivent avoir un nom accessible décrivant leur contenu pour les lecteurs d’écran.</p><p>${why.fix}Fournissez un attribut <code>title</code> ou <code>aria-label</code> unique.</p>`,

	EMBED_UNFOCUSABLE: `Cet attribut indique au clavier et aux technologies d’assistance d’ignorer cet élément. À moins que l’iframe ne contienne aucun lien, bouton ou champ de saisie et ne puisse défiler, cet attribut doit être supprimé.`,

	EMBED_VIDEO: `<p>Les vidéos doivent être sous‑titrées.</p><p>Note : une personne doit relire et corriger les sous‑titres automatiques, identifier les locuteurs et les sons significatifs.</p><p>${why.fix}Ajoutez ou corrigez les sous‑titres, puis ignorez cette alerte.</p>`,

	HEADING_EMPTY: `<p>Les en‑têtes vides créent des lacunes confuses dans la structure de la page.</p><p>${why.fix}Ajoutez du texte à cet en‑tête ou supprimez cette ligne vide.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Les en‑têtes vides créent des lacunes confuses dans la structure de la page.</p><p>${why.fix}S’il ne s’agit pas d’un en‑tête, changez son style de <strong {C}>En‑tête %(level)</strong> à <strong>Paragraphe</strong>. Sinon, placez la signification de l’image dans son texte alternatif.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Assurez‑vous que le titre de la page est marqué comme En‑tête de niveau 1 ou 2. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}À moins qu’il ne s’agisse d’un titre fixe (comme celui d’un article publié), raccourcissez‑le pour faciliter le survol de lecture.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Marquez le titre de la page comme en‑tête de niveau 1 pour indiquer le début de la structure du document.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Cet en‑tête est passé de <strong>niveau %(prevLevel) à niveau %(level)</strong>. Pour un lecteur d’écran, cela donne l’impression qu’il manque du contenu.</p><p>${why.fix}Ajustez les niveaux pour former une structure correcte, sans saut.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: `Cet élément interactif possède un attribut <code>aria-hidden="true"</code>, mais reste accessible au clavier. Si vous <strong>souhaitez</strong> le masquer pour les lecteurs d’écran, vous devez également ajouter <code>tabindex="-1"</code>. Sinon, supprimez l’attribut <code>aria-hidden="true"</code>.`,

	IMAGE_ALT_TOO_LONG: `<p>Les textes alternatifs sont lus comme une phrase continue par les lecteurs d’écran ; si quelque chose est manqué, il faut tout réécouter.</p><p>Le texte alternatif de %(altLength) caractères pour cette image est : <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Astuce : les images complexes qui nécessitent plus qu’une phrase ont généralement besoin d’une légende <strong>visible</strong> ou d’une alternative décrivant/interprétant les points clés. Il est acceptable d’y renvoyer :</p><ul><li>"Affiche pour la danse de vendredi ; détails dans la légende."</li><li>"Graphique montrant une baisse de 10 % cette année ; détails dans le tableau."</li></ul></div>`,

	IMAGE_DECORATIVE: `<p>Cette image a été masquée pour les lecteurs d’écran via un alt vide. Seules les images sans signification (icônes redondantes, textures décoratives) doivent être masquées ainsi.</p><p>${why.fix}Si cette image apporte une information, fournissez un texte alternatif.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: `L’image est marquée comme <strong>décorative</strong>, mais toutes les images dans un carrousel ou une galerie doivent avoir un texte alternatif descriptif.`,

	IMAGE_FIGURE_DECORATIVE: `<p>Cette image sera ignorée par les technologies d’assistance. La légende a‑t‑elle un sens sans l’image ?</p><p>${why.fix}Si la légende ne décrit pas la signification visuelle, fournissez un texte alternatif pour les éléments non décrits.</p><div class="why"><p>Astuce : images, alts et légendes fonctionnent ensemble :</p><ul><li>Les légendes visibles donnent du contexte.</li><li>Les textes alternatifs décrivent l’image pour ceux qui ne peuvent pas la voir.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Modifiez le texte alternatif pour décrire la signification visuelle de l’image.</p><div class="why"><p>Astuce : images, alts et légendes fonctionnent ensemble :</p><ul><li>Les légendes visibles donnent du contexte et une interprétation.</li><li>Les textes alternatifs décrivent l’image pour ceux qui ne peuvent pas la voir.</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: `<p><strong {B}>Étiquette invisible :</strong> <strong {C}>%(TEXT)</strong></p><p>Vérifiez qu’il existe une étiquette visible, qu’elle reste visible quand du texte est saisi, et qu’elle correspond à l’étiquette invisible.</p><div class="why"><p>Des étiquettes visibles uniquement via <em>title</em> ou <em>placeholder</em> disparaissent dès la saisie, ce qui complique la relecture et facilite l’oubli de mettre à jour l’étiquette invisible.</p></div>`,

	LABELS_INPUT_RESET: `<p>Les boutons de réinitialisation sont facilement activés par erreur, provoquant une perte de données sans possibilité d’annuler.</p><p>${why.fix}À moins de réinitialiser un seul champ, envisagez de le retirer ou de proposer une confirmation avant l’action.</p>`,

	LABELS_MISSING_IMAGE_INPUT: `Le bouton image n’a pas de texte alternatif. Ajoutez‑en un pour fournir un nom accessible, par exemple : <em>Chercher</em> ou <em>Envoyer</em>.`,

	LABELS_MISSING_LABEL: `<p>${why.fix}Ajoutez un <code>id</code> à ce champ, et ajoutez un attribut <code>for</code> correspondant à l’étiquette.</p>`, // updated to mirror baseAll

	LABELS_NO_FOR_ATTRIBUTE: `Aucune étiquette n’est associée à ce champ. Ajoutez un attribut <code>for</code> à l’étiquette correspondant au <code>id</code> du champ. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>`,

	LABELS_PLACEHOLDER: `<p>Le placeholder disparaît dès que l’on saisit du texte, et peut manquer de contraste ou ressembler à du contenu réel.</p><p>${why.fix}Assurez‑vous que les informations clés (étiquette, aide, instructions) restent visibles même lorsque le champ contient du texte.</p>`,

	LABEL_IN_NAME: `<p>Le texte visible de cet élément semble différent de son nom accessible. Cela peut dérouter les utilisateurs de lecteurs d’écran et gêner le contrôle vocal.</p><p>${why.fix}Assurez‑vous que l’étiquette visible commence par l’étiquette invisible et n’ajoute aucune information significative supplémentaire.</p><p><strong>Étiquette invisible :</strong> "%(TEXT)"</p>`, // updated to match baseAll

	LINK_ALT_FILE_EXT: `<p><span style="display: none;">%(ALT)</span>Texte alternatif : "<strong>%(alt)</strong>"</p><p>Le texte alternatif de cette image est probablement un nom de fichier au lieu d’un libellé utile pour un lien.</p><p>${why.fix}Définissez le texte alternatif de cette image sur le nom de la destination du lien.</p><div class="why"> <p>Le texte alternatif doit refléter la signification, pas le contenu brut : pour une image liée, la signification est la destination du lien :</p><ul><li>"Page avec texte" décrit l’image, pas le lien.</li><li>"IMG_1234.jpg" est un simple nom de fichier.</li><li>"<strong><em>Formulaire d’inscription (doc)</em></strong>" est une vraie destination.</li></ul></div>`,

	LINK_ALT_MAYBE_BAD: `<p>Le texte alternatif de cette image est un placeholder : "<strong>%(alt)</strong>".</p><p>${why.fix}Définissez le texte alternatif de cette image sur la destination du lien.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>Le texte alternatif de cette image liée ne contient que des symboles imprononçables ou des espaces : "%(ALT_TEXT)". Les lecteurs d’écran annonceront le lien mais seront incapables de le décrire.</p><p>${why.fix}Définissez le texte alternatif selon la destination ou la fonction du lien.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `L’expression "cliquer" ou "cliquer ici" est redondante et détourne l’attention de la destination du lien.`,

	LINK_DOI: `<p>${why.fix}Liez le titre de l’article et laissez le DOI en texte simple, au lieu de lier le DOI et laisser le titre sans lien.</p><div class="why"><p>Selon les recommandations de l’APA, les liens doivent être descriptifs : ils aident les utilisateurs à trouver les contenus pertinents en parcourant uniquement les liens.</p><p>Les lecteurs d’écran peuvent ainsi annoncer des liens significatifs plutôt qu’une série de chiffres incompréhensibles.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Ajoutez du texte décrivant la destination, ou supprimez ce lien s’il s’agit d’un accident (comme un espace lié).</p><div class="why"><p>Les lecteurs d’écran peinent avec les liens vides, restant silencieux ou lisant l’URL lettre par lettre.</p><p>Les espaces liés peuvent être difficiles à supprimer ; il faut parfois réécrire les mots de part et d’autre.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>Ce lien possède un attribut <code>aria-labelledby</code> qui ne correspond à aucun <code>ID</code> sur la page.</p><p>${why.fix}Fournissez un ID valide ou supprimez cet attribut.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Ajoutez du texte décrivant sa destination, ou supprimez ce lien s’il s’agit d’un accident.</p><div class="why"><p>Les liens vides provoquent silence ou lecture des URL.</p><p>Les espaces liés nécessitent parfois de réécrire le texte environnant pour les supprimer.</p></div>`,

	LINK_FILE_EXT: `<p>Ce lien pointe vers un fichier téléchargeable (PDF, MP3, Zip, Word, etc.) sans avertissement.</p><p>${why.fix}Utilisez du texte ou une icône pour <a href="https://itmaybejj.github.io/linkpurpose/">indiquer le type de fichier</a> dans le lien.</p><p class="why">Pour les fichiers volumineux, indiquez la taille : ex. "Rapport annuel (PDF, 3 Mo)"</p>`,

	LINK_IDENTICAL_NAME: `<p>Texte du lien : "<strong>%(TEXT)</strong>"</p><p>${why.fix}Réécrivez les liens menant à des destinations différentes en utilisant les titres uniques de chaque destination.</p>${why.links}`,

	LINK_IMAGE_ALT: `Assurez‑vous que ce texte alternatif décrit la destination du lien :</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Vérifiez que le texte alternatif contribue à décrire la destination du lien, sans ajouter d’information redondante :</p><p><strong class="badge">Alt</strong> "<em><strong>%(alt)</strong></em>"</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p><a href="https://webaim.org/techniques/hypertext/link_text#alt_link">Le texte alternatif d’une image liée sert à décrire la destination du lien</a>. Les liens doivent être brefs et clairs ; les utilisateurs de lecteurs d’écran parcourent souvent la liste des liens. Un texte alternatif long indique souvent qu’il décrit l’image plutôt que la destination.</p>Le texte alternatif de %(altLength) caractères de cette image est : <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Quand une image est utilisée comme lien, son texte alternatif <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">doit décrire la destination du lien</a>.</p><p>${why.fix}Définissez le texte alternatif sur la destination ou la fonction du lien.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: `L’image est marquée comme décorative, mais le lien utilise le texte environnant comme libellé descriptif.`,

	LINK_NEW_TAB: `<p>${why.fix}Configurez ce lien pour s’ouvrir dans le même onglet, ou <a href="https://itmaybejj.github.io/linkpurpose/">prévoyez un avertissement aux utilisateurs</a> avant l’ouverture dans un nouvel onglet.</p><div class="why"><p>Les utilisateurs peuvent toujours choisir d’ouvrir un lien dans un nouvel onglet. Forcer l’ouverture peut être déroutant, surtout pour les technologies d’assistance.</p><p>Note : les liens dans les formulaires ouvrent souvent un nouvel onglet pour éviter la perte de données.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>Le texte alternatif de cette image liée est un placeholder : "<strong>%(alt)</strong>".</p><p>${why.fix}Définissez le texte alternatif sur la destination du lien.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Ce lien contient du texte qui n’aide pas à décrire sa destination :<br><strong>%(text)</strong></p><p>${why.fix}Réécrivez ce lien pour décrire sa destination de manière concise.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>Un nom accessible a été fourni via ARIA, mais le texte visible du lien est générique : "<strong {C}>%(ERROR)</strong>".</p><p>${why.fix}Écrivez des liens significatifs pour tous les utilisateurs et assurez‑vous que l’étiquette visible correspond au nom accessible.</p>${why.links}`,

	LINK_SUS_ALT: `<p>Le texte alternatif contient le mot "%(alt)", ce qui indique généralement qu’il ne décrit pas la destination du lien.</p><strong class="badge">Texte alternatif</strong> "%(ALT_TEXT)"<p>Pour corriger : assurez‑vous que le texte alternatif décrit la destination ou la fonction du lien.<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Évitez d’utiliser des symboles comme appels à l’action dans les liens, sauf s’ils sont masqués pour les technologies d’assistance. Les lecteurs d’écran peuvent les lire à voix haute, ce qui peut semer la confusion. Envisagez de supprimer : <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Changez ce lien pour utiliser le titre de sa destination ou sa fonction.</p><div class="why"><p>Les utilisateurs parcourent la page par ses liens — en particulier les utilisateurs de lecteurs d’écran.</p><p>Les URL en texte de lien sont difficiles à parcourir et à rechercher.</p></div>`,

	META_LANG: `<p>${why.fix}Ajoutez un <a href="https://www.w3.org/International/questions/qa-html-language-declarations">attribut de langue</a> sur la balise HTML.</p><div class="why"><p>Astuce : les lecteurs d’écran prononcent les mots selon la langue indiquée. Une mauvaise langue produit un discours incompréhensible.</p></div>`,

	META_MAX: `<p>Cette balise meta limite la possibilité pour les utilisateurs d’agrandir le texte.</p><p>${why.fix}Ajustez ou supprimez cette limitation pour permettre un zoom complet.</p>`,

	META_REFRESH: `<p>Les pages ne devraient pas se recharger automatiquement via une balise meta, car cela interrompt l’utilisateur sans avertissement et peut réinitialiser les formulaires.</p><p>${why.fix}Utilisez AJAX ou JavaScript pour mettre à jour le contenu en informant l’utilisateur et en lui donnant la possibilité de retarder l’événement.</p>`,

	META_SCALABLE: `<p>Cette balise meta empêche les utilisateurs d’agrandir le texte.</p><p>${why.fix}Permettez un zoom complet en supprimant ou ajustant ce paramètre.</p>`,

	META_TITLE: `<p>${why.fix}Ajoutez une balise <code><title></code> dans la balise <code><head></code> de la page.</p><div class="why"><p>Un <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title">titre court et unique</a> est essentiel :</p><ul><li>Les moteurs de recherche l’utilisent pour les résultats.</li><li>Les navigateurs l’utilisent pour les onglets.</li><li>Les lecteurs d’écran l’annoncent lors des changements d’onglet.</li></ul><p>Sans titre, les utilisateurs n’obtiennent qu’une URL brute.</p></div>`,

	MISSING_ALT: `<p>Lorsqu’un lecteur d’écran rencontre une image sans attribut alt, il lit l’URL du fichier image, souvent lettre par lettre.</p><p>${why.fix}Ajoutez un alt vide (alt="") pour ignorer l’image, ou un texte alternatif descriptif.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Lorsqu’une image liée n’a pas d’attribut alt, les lecteurs d’écran lisent l’URL, ce qui est particulièrement problématique.</p><p>${why.fix}Ajoutez un texte alternatif correspondant à la destination du lien.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Cette image fait partie d’un lien contenant du texte. Si le texte visible décrit correctement la destination, ajoutez alt="" pour ignorer l’image. Sinon, fournissez un texte alternatif décrivant la destination.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>Le lien semble pointer vers un environnement de développement :<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Remplacez‑le par un chemin relatif (/folder) ou par l’URL publique.</p>`,

	QA_BLOCKQUOTE: `<p>Le format <em>blockquote</em> indique aux lecteurs d’écran qu’il s’agit d’une citation. Les citations courtes sont souvent en réalité des titres.</p><p>${why.fix}Si ceci est un en‑tête, utilisez un style d’en‑tête pour qu’il apparaisse dans la structure de la page.</p>${why.headings}`,

	QA_DOCUMENT: `<p>Les documents liés sont considérés comme du contenu web et doivent également être accessibles. Vérifiez titres, tableaux et textes alternatifs, puis ignorez cette alerte.</p><ul class="why"><li>Rendre vos <a href="https://support.google.com/docs/answer/6199477?hl=fr">documents Google Workspace accessibles</a>.</li><li>Rendre vos <a href="https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">documents Office accessibles</a>.</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}Si ce texte en gras introduit un sujet, remplacez sa mise en forme visuelle par un style d’en‑tête.</p><div class="why"><p>Astuce : les en‑têtes créent une table des matières navigable pour les technologies d’assistance. Leur numéro indique leur niveau d’imbrication.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Si "%(text)" fait partie d’une liste, formatez‑le comme une liste.</p><div class="why"><p>Les listes ont une structure visuelle et technique :</p><ol><li>Elles alignent les éléments et facilitent la lecture.</li><li>Elles sont reconnues par les lecteurs d’écran, qui annoncent "élément 3 sur 7".</li></ol><p>Un paragraphe commençant par un numéro n’est pas une vraie liste.</p></div>`,

	QA_IN_PAGE_LINK: `<p>La cible de ce lien ne correspond à aucun élément de la page.</p><div class="why"><p>Note pour les développeurs : si le lien déclenche un événement JavaScript, testez son fonctionnement au clavier avant de l’ajouter à la liste d’exclusion.</p></div>`,

	QA_JUSTIFY: `<p>Le texte justifié ajoute des espacements irréguliers entre les mots, ce qui rend la lecture plus difficile pour de nombreuses personnes.</p><p>${why.fix}Utilisez un alignement à gauche.</p>`,

	QA_NESTED_COMPONENTS: `Évitez d’imbriquer des composants interactifs, tels que des accordéons dans d’autres accordéons ou des onglets dans des accordéons. Cela complique la navigation et peut faire manquer du contenu.`,

	QA_PDF: `<p>${why.fix}Faites l’une des actions suivantes puis ignorez cette alerte :</p><ul><li>Liez à une page web plutôt qu’à un PDF,</li><li>Ou fournissez également une version web ou éditable,</li><li>Ou assurez‑vous que le PDF est accessible (titres, ordre de lecture, en‑têtes de tableau, textes alternatifs).</li></ul><div class="why"><p>Les utilisateurs mobiles et les technologies d’assistance préfèrent largement les pages web aux PDFs, qui ne se reformatent pas pour mobile et manquent souvent de balisage nécessaire.</p></div>`,

	QA_SMALL_TEXT: `Le texte trop petit est difficile à lire, particulièrement pour les personnes malvoyantes. Évitez les tailles inférieures à la taille par défaut.`,

	QA_STRONG_ITALICS: `<p>${why.fix}Réservez le gras et l’italique aux mots ou phrases clés.</p><div class="why"><p>Note : si c’est une citation, utilisez la balise <em>blockquote</em>.</p></div>`,

	QA_SUBSCRIPT: `Les exposants et indices rendent le texte trop petit et difficile à lire. Ne les utilisez que pour des usages spécifiques : nombres ordinaux (4<sup>e</sup>), formules chimiques (H<sub>2</sub>O), références de notes.`,

	QA_UNDERLINE: `<p>Le texte souligné indique un lien sur le Web. Les utilisateurs penseront qu’il est cliquable.</p><p>${why.fix}Utilisez <strong>gras</strong> ou <em>italique</em> pour l’emphase, ou un style d’en‑tête pour marquer un changement de section.</p><div class="why"><p>Note : les lecteurs d’écran n’annoncent pas les mises en forme visuelles comme le soulignement. Seuls les en‑têtes créent de la structure.</p></div>`,

	QA_UPPERCASE: `<p>LES BLOCS DE TEXTE EN MAJUSCULES SONT PLUS DIFFICILES À LIRE ET PEUVENT ÊTRE PERCUS COMME DES CRIS.</p><p>${why.fix}N’utilisez les majuscules que pour quelques mots à la fois ; préférez le gras.</p><div class="why"><p>Note : les lecteurs d’écran n’annoncent pas le gras. Utilisez un en‑tête si vous introduisez un nouveau sujet.</p></div>`,

	SUS_ALT: `<p>Le texte alternatif contient le mot "%(alt)", ce qui est probablement redondant :</p><p><strong class="badge">Texte alternatif</strong> "%(ALT_TEXT)"</p><p>Pour corriger : reformulez le texte alternatif pour transmettre brièvement la signification de l’image.</p><div class="why"><p>Astuce : les lecteurs d’écran annoncent déjà qu’ils lisent la description d’une image. Des expressions comme "image de" ou "photo de" sont souvent redondantes.</p></div>`,

	TABINDEX_ATTR: `<p>${why.fix}N’utilisez jamais une valeur de <code>tabindex</code> supérieure à "0" (ordre par défaut). Modifiez l’ordre des éléments dans le HTML pour que l’ordre visuel, de tabulation et de lecture restent identiques.</p><div class="why"><p>Par défaut, l’ordre visuel, l’ordre de tabulation et l’ordre de lecture sont alignés.</p><p>Un <em>tabindex</em> positif place l’élément au début du cycle de tabulation, <strong>mais pas dans l’ordre visuel</strong>, ce qui déroute les utilisateurs.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Assurez‑vous que chaque cellule d’en‑tête contient du texte.</p><div class="why"><p>Astuce : les lecteurs d’écran utilisent les en‑têtes pour orienter les utilisateurs dans un tableau.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Modifiez les propriétés du tableau et indiquez si les en‑têtes se trouvent dans la première ligne, la première colonne ou les deux.</p><div class="why"> <p>Astuce : les lecteurs d’écran répètent l’en‑tête pertinent en entrant dans chaque ligne ou colonne.</p><p>Si ce tableau n’a pas d’en‑têtes car il sert de mise en page visuelle, remplacez‑le par autre chose qu’un tableau.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Supprimez ce format d’en‑tête (h2, h3). Fournissez plutôt des lignes ou colonnes d’en‑têtes. Si vous avez besoin de plusieurs niveaux, utilisez plusieurs tableaux.</p><div class="why"> <p>Astuce : les en‑têtes de tableau sont directionnels (ligne ou colonne). Les en‑têtes de contenu, eux, affectent tout ce qui suit.</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Un <strong>en‑tête de tableau</strong> en cellule 2 étiquette la cellule B. <br><br> Un <strong>en‑tête de contenu</strong> étiquette les cellules 3, A, B, C, ainsi que ce texte et le pied de ce conseil.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`
};

const interfaceStrings = {
	ALERT_CLOSE: 'Fermer',
	ALT: 'Texte alternatif : ',
	CONSOLE_ERROR:
		'Un problème affecte le vérificateur d’accessibilité sur cette page. Veuillez %(link)<a href="%(link)">le signaler sur GitHub</a>.', // updated new
	DECORATIVE: 'Marqué comme décoratif',
	DISMISS: 'Ignorer',
	DISMISS_ALL: 'Sur cette page : ignorer',
	edit_page: 'Modifier la page',
	edit_layout: 'Modifier la mise en page',
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
	WARNING: 'vérification manuelle requise',
	WARNINGS: 'vérifications manuelles requises',
	buttonFirstContent: 'Afficher la première alerte', // updated
	buttonHideHiddenAlert: 'Masquer l’alerte masquée',
	buttonHideHiddenAlerts: `Masquer %(count) alertes masquées`,
	buttonShowHiddenAlert: 'Afficher l’alerte masquée',
	buttonToolsActive: 'Masquer les visualisations',
	dismissActions: `Alertes similaires`,
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
	panelCheckAltText: `<p class="ed11y-small">Vérifiez que chaque image décrit ce qu’elle signifie dans le contexte et qu’il n’y a pas d’images contenant du texte.</p>`,
	panelCheckOutline: `<p class="ed11y-small">Ceci affiche la structure des en‑têtes. Vérifiez qu’elle correspond à l’organisation visuelle du contenu.</p>`,
	PANEL_HEADING_MISSING_ONE: 'En‑tête de niveau 1 manquant.',
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
