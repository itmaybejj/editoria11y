import strings from '../sa11y-lang/es.js';

export const testNames = {
	ALT_FILE_EXT: 'Este texto alternativo es un nombre de archivo, no una descripción',
	ALT_MAYBE_BAD: 'Este texto alternativo no puede ser pronunciado por un lector de pantalla',
	ALT_PLACEHOLDER: 'Este texto alternativo es un marcador de posición sin significado',
	ALT_UNPRONOUNCEABLE: 'Este texto alternativo es impronunciable',
	BTN_EMPTY: 'El botón no tiene una etiqueta accesible',
	BTN_EMPTY_LABELLEDBY: 'El botón tiene una etiqueta ARIA no válida',
	BTN_ROLE_IN_NAME: 'El nombre del botón repite la palabra "button"',
	CONTRAST_ERROR: 'El texto no tiene suficiente contraste para ser fácilmente legible',
	CONTRAST_ERROR_GRAPHIC: 'El gráfico o ícono no tiene suficiente contraste',
	CONTRAST_INPUT: 'El campo de entrada no proporciona suficiente contraste para ser legible',
	CONTRAST_PLACEHOLDER: 'El texto de placeholder no tiene suficiente contraste para ser fácilmente legible',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: '¿Este texto de placeholder tiene suficiente contraste?',
	CONTRAST_WARNING: '¿Este texto tiene suficiente contraste?',
	CONTRAST_WARNING_GRAPHIC: '¿Este gráfico o ícono tiene suficiente contraste?',
	DUPLICATE_ID: 'Atributo ID duplicado',
	DUPLICATE_TITLE: 'Este enlace tiene un tooltip con el mismo texto que el enlace',
	EMBED_AUDIO: '¿Este audio tiene una transcripción?',
	EMBED_DATA_VIZ: '¿Esta visualización es accesible?',
	EMBED_GENERAL: 'Los iframes incrustados requieren revisiones manuales',
	EMBED_MISSING_TITLE: 'El marco no tiene un atributo "title"',
	EMBED_UNFOCUSABLE: 'Un frame con tabindex="-1" no será accesible por teclado.',
	EMBED_VIDEO: '¿Este video tiene subtítulos precisos?',
	HEADING_EMPTY: 'Este encabezado no tiene texto',
	HEADING_EMPTY_WITH_IMAGE: 'Esta imagen se usa como encabezado, por lo que necesita texto alternativo',
	HEADING_FIRST: 'El primer encabezado en esta página es un subtítulo',
	HEADING_LONG: '¿Puede este encabezado ser más corto?',
	HEADING_MISSING_ONE: 'A esta página le falta un Encabezado 1',
	HEADING_SKIPPED_LEVEL: 'Este encabezado está etiquetado con un nivel incorrecto',
	HIDDEN_FOCUSABLE: 'Este elemento no puede ser descrito por lectores de pantalla',
	IMAGE_ALT_TOO_LONG: '¿Puede ser más breve este texto alternativo?',
	IMAGE_DECORATIVE: '¿Esta imagen realmente no tiene significado?',
	IMAGE_DECORATIVE_CAROUSEL: 'Imagen en un carrusel o galería marcada como decorativa',
	IMAGE_FIGURE_DECORATIVE: 'Revisión manual: imagen con pie de foto sin texto alternativo',
	IMAGE_FIGURE_DUPLICATE_ALT: 'El texto alternativo no debe ser igual al del pie de foto',
	LABELS_ARIA_LABEL_INPUT: '¿Hay una etiqueta visible para este campo?',
	LABELS_PLACEHOLDER: 'Revisión manual: texto de placeholder',
	LABELS_INPUT_RESET: '¿Es necesario este botón de restablecer?',
	LABEL_IN_NAME: 'La etiqueta visible no coincide con la etiqueta invisible',
	LINK_ALT_FILE_EXT: 'El alt usado como enlace no debe ser un URL',
	LINK_ALT_MAYBE_BAD: 'Este alt enlazado no puede ser pronunciado por un lector de pantalla',
	LINK_ALT_UNPRONOUNCEABLE: 'Las imágenes enlazadas necesitan texto alternativo pronunciable',
	LINK_CLICK_HERE: 'Revisión manual: el enlace contiene "click aquí"',
	LINK_DOI: 'Enlace los títulos de artículos, no los números DOI',
	LINK_EMPTY: 'Este enlace no tiene texto',
	LINK_EMPTY_LABELLEDBY: 'Enlace con atributo "aria-labelledby" no válido',
	LINK_EMPTY_NO_LABEL: 'Este enlace necesita una etiqueta',
	LINK_FILE_EXT: 'El enlace apunta a un archivo sin advertencia',
	LINK_IDENTICAL_NAME: '¿Este enlace describe de manera única su destino?',
	LINK_IMAGE_ALT: 'Revisión manual: imagen enlazada con texto alternativo',
	LINK_IMAGE_ALT_AND_TEXT: '¿Este texto alternativo tiene sentido como parte del enlace?',
	LINK_IMAGE_LONG_ALT: '¿Puede este texto alternativo ser más corto?',
	LINK_IMAGE_NO_ALT_TEXT: 'Esta imagen enlazada necesita texto alternativo',
	LINK_IMAGE_TEXT: 'Revisión manual: imagen dentro de un enlace marcada como decorativa.',
	LINK_NEW_TAB: '¿Este enlace abre una nueva pestaña sin advertencia?',
	LINK_PLACEHOLDER_ALT: 'Esta imagen enlazada necesita texto alternativo significativo',
	LINK_STOPWORD: '¿Este enlace describe su destino?',
	LINK_STOPWORD_ARIA: 'Texto significativo disponible solo para usuarios de lectores de pantalla',
	LINK_SUS_ALT: '¿El alt de esta imagen describe el enlace o la imagen?',
	LINK_SYMBOLS: 'Revisión manual: ¿los símbolos o emojis en este enlace son significativos?',
	LINK_URL: 'El texto del enlace no debe ser un URL',
	META_LANG: 'Falta la meta tag para el idioma de la página',
	META_MAX: 'La meta tag limita cuánto pueden ampliar el texto los usuarios',
	META_REFRESH: 'La meta tag actualiza la página automáticamente',
	META_SCALABLE: 'La meta tag impide que los usuarios amplíen el texto',
	META_TITLE: 'Falta la meta tag para el título de la página',
	MISSING_ALT: 'HTML no válido: la imagen no tiene atributo alt',
	MISSING_ALT_LINK: 'HTML no válido: la imagen enlazada no tiene atributo alt',
	MISSING_ALT_LINK_HAS_TEXT: 'HTML no válido: la imagen dentro de un enlace no tiene atributo alt',
	QA_BAD_LINK: 'Revisión manual: el enlace puede apuntar a un destino no válido',
	QA_BLOCKQUOTE: '¿Debería esta cita ser un encabezado?',
	QA_DOCUMENT: '¿Este documento ha sido etiquetado para lectores de pantalla?',
	QA_FAKE_HEADING: '¿Este texto en negrita debería ser un encabezado?',
	QA_FAKE_LIST: '¿Esto debería tener formato de lista?',
	QA_IN_PAGE_LINK: 'Enlace interno roto',
	QA_JUSTIFY: 'No justificar texto',
	QA_NESTED_COMPONENTS: 'Componentes interactivos anidados',
	QA_PDF: '¿Existe una alternativa para este PDF?',
	QA_SMALL_TEXT: 'El texto es demasiado pequeño',
	QA_STRONG_ITALICS: 'Los bloques largos de texto enfatizado son difíciles de leer',
	QA_SUBSCRIPT: 'No usar superíndices o subíndices como formato visual',
	QA_UNDERLINE: 'Solo los enlaces deben subrayarse',
	QA_UPPERCASE: '¿Este texto en mayúsculas es necesario?',
	SUS_ALT: '¿Hay palabras redundantes en este texto alternativo?',
	TABINDEX_ATTR: 'El atributo tabindex en este elemento rompe el orden de lectura',
	TABLES_EMPTY_HEADING: 'Esta celda de encabezado necesita texto',
	TABLES_MISSING_HEADINGS: 'A esta tabla le falta una fila o columna de encabezados',
	TABLES_SEMANTIC_HEADING: 'Los encabezados de contenido no deben usarse dentro de tablas',
	UNCONTAINED_LI: 'Lista HTML no válida',
};

const why = {
	fix: `<strong class="badge">Para corregir</strong> `,
	check: `<strong class="badge">Revisión manual</strong> `,
	buttons: `<div class="why"><p>Nota: el nombre accesible de un botón debe dejar claro lo que hará. Los botones que cambian al hacer clic también deben cambiar su nombre:</p><ul><li>Cambios de etiquetas:<br>"Reproducir/Pausar", "Mostrar detalles/Ocultar detalles"</li><li>Cambios en <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">atributos de estado</a>:<br>"Reproducir/Reproducir, presionado", "Detalles, contraído/Detalles, expandido."</li></ul>
    <p>Solo no cambie ambas cosas al mismo tiempo. Cambiar “Reproducir” a “Pausar, presionado” significa que el reproductor está en pausa, no reproduciendo.</p></div>`,

	headings: `<div class="why"><p>Consejo: los encabezados y subencabezados organizan el contenido en una estructura jerárquica. Los usuarios de lectores de pantalla dependen de esta estructura para comprender y explorar las páginas:</p><ul><li>Encabezado nivel 1: título de la página<ul><li>Encabezado nivel 2: temas principales<ul><li>Encabezado nivel 3: subtemas</li></ul></li></ul></li></ul></div>`,

	images: `<div class="why"><p>Consejo: al escribir texto alternativo, describa lo que la imagen <em>significa</em>, no solo lo que contiene. Dependiendo del contexto, una foto de una niña pateando una pelota podría significar:</p><ul><li>Estaban jugando bajo la lluvia.</li><li>Los nuevos uniformes del equipo tienen logos de dragones muy llamativos.</li><li>Ella anotó el gol de la victoria desde la banda izquierda.</li></ul></div>`,

	links: `<div class="why"><p>Las personas hojean la página leyendo los enlaces y usando la búsqueda interna para encontrarlos por nombre, por lo que los enlaces efectivos deben ser significativos, únicos y concisos:</p><ul><li>Ideal: "Aprende sobre <a href="https://webaim.org/techniques/hypertext/link_text">enlaces significativos</a>"</li><li>No único: "Haz clic <a href="https://webaim.org/techniques/hypertext/link_text">aquí</a> para aprender sobre enlaces significativos."</li>
    <li>No conciso: "<a href="https://webaim.org/techniques/hypertext/link_text">Haz clic aquí para aprender más sobre enlaces significativos</a>"</li></ul></div>`,

	imageLinks: `<div class="why"><p>El propósito del texto alternativo es proporcionar una alternativa al significado de una imagen, no a su contenido superficial. En imágenes enlazadas, el significado es el destino del enlace:<ul><li>"<em>Una lupa</em>" describe una imagen, no un enlace.</li><li>"<em>Una lupa de búsqueda</em>" describe ambiguamente ambas cosas.</li><li>"<em>Buscar</em>" describe correctamente el destino del enlace.</li></ul></p></div>`,
};

const tips = {
	ALT_FILE_EXT: `<p>Los lectores de pantalla leerán este URL, a menudo letra por letra. Esto probablemente no transmite el mismo significado que ver la imagen.</p><p>${why.fix}Agregue un alt vacío (alt="") si esto es una decoración sin significado que deba ser ignorada por los lectores de pantalla, o agregue un texto alternativo descriptivo.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Descripción proporcionada de esta imagen: <strong>"%(alt)"</strong></p><p>${why.fix}Configure el texto alternativo de esta imagen como una descripción concisa de lo que significa en este contexto.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Descripción proporcionada de esta imagen: <strong>"%(alt)"</strong></p><p>${why.fix}Configure el texto alternativo de esta imagen como una descripción concisa de lo que significa en este contexto.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>El texto alternativo de esta imagen es "%(alt)", que solo contiene símbolos impronunciables y/o espacios. Los lectores de pantalla anunciarán que hay una imagen y luego harán una pausa incómoda: "imagen: ____."</p><p>${why.fix}Agregue un alt descriptivo, o proporcione un alt <em>completamente</em> vacío (alt="") si esto es solo un ícono o separador que los lectores de pantalla deben ignorar.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Use cualquier método válido para indicar a los lectores de pantalla qué hace este botón, por ejemplo, texto, texto alternativo en un ícono o un atributo title.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Este botón tiene un valor <code>aria-labelledby</code> que está vacío o no coincide con el valor <code>ID</code> de otro elemento en la página.</p><p>${why.fix}Reconecte el ID a un elemento en la página, o elimine este atributo y describa el botón de otra manera.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'Una imagen de fondo o un degradado significa que este verificador no está seguro de qué color está detrás de este texto. Use el selector de color a continuación para verificar manualmente.',

	DUPLICATE_ID: `<p>Los IDs se usan en esta página para etiquetas o destinos de enlaces, lo que significa que deben ser únicos.</p><p>${why.fix}Cambie este ID: <strong>#%(id)</strong></p><div class="why"><p>En la mayoría de los sistemas de gestión de contenido, esto proviene de un campo llamado "name" o "id" en las propiedades del elemento. En HTML, es un atributo: <code><a id="MY-ID"></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Elimine el atributo <code>title</code> de este enlace.</p><div class="why"><p>Nota: los tooltips de <code>title</code> solo aparecen al pasar el ratón. No pueden verse al navegar con un teléfono o con teclado, por lo que muchos usuarios nunca los verán. Nunca deben contener información única o importante.</p></div>`,

	EMBED_AUDIO: `<p>Si este audio contiene habla, se debe proporcionar una <a href="https://www.w3.org/WAI/media/av/transcribing/">alternativa en texto</a> en esta página o mediante un enlace.</p><p>Tenga en cuenta que una persona debe revisar las transcripciones automáticas y asegurarse de que los hablantes y efectos de sonido significativos estén identificados correctamente.</p>`,

	EMBED_DATA_VIZ: `<p>Los widgets de visualización incrustados suelen ser difíciles o imposibles de operar para los dispositivos de asistencia, pueden ser difíciles de entender para personas con baja visión o daltonismo y pueden requerir desplazamiento horizontal extenso en teléfonos.</p><p>${why.fix}A menos que esta incrustación tenga un contraste visual alto, pueda operarse con teclado <strong><em>y</em></strong> pueda describirse mediante un lector de pantalla, agregue un formato alterno equivalente como una descripción textual, una tabla de datos o una hoja de cálculo descargable, y luego descarte esta alerta.</p>`,

	EMBED_GENERAL: 'Los verificadores automáticos no pueden evaluar el contenido dentro de elementos incrustados. Asegúrese de que alguien haya verificado que todas las imágenes dentro de este embed tengan texto alternativo, los videos tengan subtítulos, el texto tenga suficiente contraste y los enlaces y botones sean <a href="https://webaim.org/techniques/keyboard/">accesibles mediante teclado</a>, y luego descarte esta alerta.',

	EMBED_MISSING_TITLE: `<p>Los elementos incrustados necesitan un nombre accesible que describa su contenido para los lectores de pantalla.</p><p>${why.fix}Proporcione un atributo <code>title</code> o <code>aria-label</code> único.</p>`,

	EMBED_UNFOCUSABLE: `Este atributo indica a los teclados y dispositivos de asistencia que salten este elemento. A menos que el contenido del iframe no contenga enlaces, botones o formularios y no se pueda desplazar, este atributo debe eliminarse.`,

	EMBED_VIDEO: `<p>Los videos deben proporcionar subtítulos.</p><p>Tenga en cuenta que una persona debe revisar las transcripciones automáticas para asegurar que los hablantes y efectos de sonido significativos estén identificados correctamente.</p><p>${why.fix}Agregue o revise los subtítulos, y luego descarte esta alerta.</p>`,

	HEADING_EMPTY: `<p>Los encabezados vacíos crean vacíos confusos en el esquema de la página.</p><p>${why.fix}Agregue texto a este encabezado, o elimine esta línea vacía.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Los encabezados vacíos crean vacíos confusos en el esquema de la página.</p><p>${why.fix}Si esto no es un encabezado, cambie su formato de <strong {C}>Heading %(level)</strong> a <strong>Párrafo</strong>. De lo contrario, coloque el significado de la imagen en su alt.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Asegúrese de que el título de la página esté marcado como Encabezado 1 o Encabezado 2. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}A menos que esto sea algo de longitud fija como el título de un artículo publicado, acórtelo para ayudar a las personas a hojear el contenido.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Marque el título de la página como un encabezado de nivel 1 para indicar el comienzo del esquema del documento.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Este encabezado saltó de <strong>nivel %(prevLevel) a nivel %(level)</strong>. Para un lector de pantalla, esto suena como si faltara contenido.</p><p>${why.fix}Ajuste los niveles para formar un esquema preciso, sin saltos.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: 'Este elemento interactivo tiene un atributo <code>aria-hidden="true"</code>, pero sigue siendo accesible mediante teclado. Si <strong>pretende</strong> ocultar este elemento de los lectores de pantalla, también debe agregar <code>tabindex="-1"</code>. De lo contrario, elimine el atributo <code>aria-hidden="true"</code>.',

	IMAGE_ALT_TOO_LONG: `<p>Los textos alternativos se leen como una sola oración continua; si alguien pierde algo, debe volver a escucharlo completo.</p><p>El texto alternativo de %(altLength) caracteres de esta imagen es: <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Consejo: las imágenes complejas que transmiten más información de la que cabe en una frase generalmente necesitan un pie de foto <strong>visible</strong> o una alternativa que describa o interprete los detalles clave. Está bien referir a los usuarios del lector de pantalla a dicho texto:</p><ul><li>"Póster del baile del viernes; detalles en el pie de foto."</li><li>"Gráfico que muestra que los casos han bajado 10% este año; detalles en la tabla."</li></ul></div>`,

	IMAGE_DECORATIVE: `<p>Esta imagen ha sido ocultada de los lectores de pantalla mediante un alt vacío. Solo las imágenes sin significado, como íconos redundantes o texturas decorativas, deben ocultarse de esta manera.</p><p>${why.fix}Si esta imagen aporta valor a la página, proporcione un texto alternativo.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'La imagen está marcada como <strong>decorativa</strong>, pero todas las imágenes en un carrusel o galería deben incluir texto alternativo descriptivo para asegurar una experiencia equivalente para todas las personas.',

	IMAGE_FIGURE_DECORATIVE: `<p>Esta imagen será ignorada por la tecnología de asistencia. ¿El pie de foto tendrá sentido sin la imagen?</p><p>${why.fix}Si el pie de foto no describe el significado visual de la imagen, proporcione texto alternativo para aquello que el pie de foto no describe.</p><div class="why"><p>Consejo: las imágenes, los textos alternativos y las leyendas trabajan juntos:</p><ul><li>Las leyendas visibles proporcionan contexto e interpretación.</li><li>Los textos alternativos describen la imagen para quienes no pueden verla, para que sepan qué está describiendo la leyenda.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Cambie el texto alternativo para describir el significado visual de la imagen.</p><div class="why"><p>Consejo: las imágenes, los textos alternativos y las leyendas trabajan juntos:</p><ul><li>Las leyendas visibles proporcionan contexto e interpretación.</li><li>Los textos alternativos describen la imagen para quienes no pueden verla, para que sepan qué está discutiendo la leyenda.</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: `<p><strong {B}>Etiqueta invisible del campo:</strong> <strong {C}>%(TEXT)</strong></p><p>Verifique que exista una etiqueta visible, que permanezca cuando se introduce texto en este campo y que coincida con el nombre invisible del campo.</p><div class="why"><p>Etiquetar campos solo con un título o un placeholder hace que la etiqueta desaparezca visualmente cuando alguien empieza a escribir. Esto dificulta revisar el contenido cuando hay varios campos y también facilita olvidar actualizar la etiqueta invisible.</p></div>`,

	LABELS_INPUT_RESET: `<p>Los botones de restablecer pueden activarse por error con facilidad, provocando pérdida de datos sin oportunidad de cancelar o deshacer.</p><p>${why.fix}A menos que esto restablezca un solo campo, considere eliminarlo o proporcionar un método para cancelar la acción antes de ejecutarla.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'El botón de imagen no tiene texto alternativo. Agregue uno para proporcionar un nombre accesible. Por ejemplo: <em>Buscar</em> o <em>Enviar</em>.',

	LABELS_MISSING_LABEL: 'No hay una etiqueta asociada con este campo. Agregue un atributo <code>id</code> a este input y un atributo <code>for</code> correspondiente a la etiqueta.',

	LABELS_NO_FOR_ATTRIBUTE: 'No hay una etiqueta asociada con este campo. Agregue un atributo <code>for</code> a la etiqueta que coincida con el atributo <code>id</code> de este campo. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>El texto de placeholder desaparece en cuanto alguien empieza a escribir, y a menudo tiene muy poco contraste o tanto contraste que se confunde con contenido real.</p><p>${why.fix}Asegúrese de que la información clave como la etiqueta del campo, el texto de ayuda y las instrucciones de formato permanezcan visibles cuando el campo tenga contenido, y considere eliminar el placeholder por completo.</p>`,

	LABEL_IN_NAME: `<p>El texto visible de este elemento parece ser distinto del nombre accesible. Esto puede causar confusión para los usuarios de lectores de pantalla y afectar el control por voz.</p><p>${why.check}Asegúrese de que la etiqueta visible comience con el texto de la etiqueta invisible y no contenga información significativa adicional.</p><p><strong>Etiqueta invisible:</strong> "%(TEXT)"</p>`,

	LINK_ALT_FILE_EXT: `<p>El texto alternativo de esta imagen incluye "%(alt)", lo que probablemente significa que es un nombre de archivo en lugar del nombre significativo del destino del enlace.</p><p>${why.fix}Configure el alt de esta imagen al nombre del destino del enlace.</p><div class="why"> <p>El propósito del texto alternativo es describir lo que la imagen significa, no lo que contiene. El significado de una imagen enlazada es el destino del enlace:</p><ul><li>"Página con escritura" describe la imagen, no un enlace.</li><li>"IMG_1234.jpg" es solo un nombre de archivo.</li><li>"<strong><em>Formulario de registro (doc)</em></strong>" es un destino del enlace.</li></ul></p></div>`,

	LINK_ALT_MAYBE_BAD: `<p>El texto alternativo de esta imagen es un marcador de posición: "<strong>%(alt)</strong>".</p><p>${why.fix}Configure el alt de esta imagen al nombre del destino del enlace.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>El alt de esta imagen enlazada contiene solo símbolos impronunciables o espacios: "%(ALT_TEXT)". Los lectores de pantalla anunciarán que hay un enlace, pero no podrán describirlo.</p><p>${why.fix}Configure el alt a la finalidad o destino del enlace.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `La frase "click" o "click aquí" es redundante y desvía la atención del propósito del enlace.`,

	LINK_DOI: `<p>${why.fix}Enlace el título del artículo y deje el número DOI como texto plano, en lugar de enlazar el DOI y dejar el título sin enlace.</p><div class="why"><p>La <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA Style</a> recomienda usar enlaces descriptivos porque las personas hojean los enlaces y usan la búsqueda dentro de la página para encontrarlos. Es más probable que los usuarios noten artículos de interés cuando el título es el enlace.</p><p>Esto también permite a los lectores de pantalla describir el enlace de forma significativa en lugar de leer una secuencia de números.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Agregue texto que describa su destino o elimínelo si fue un error, como un espacio enlazado.</p><div class="why"><p>Los lectores de pantalla tienen dificultades para describir enlaces vacíos, quedándose en silencio ("Enlace, [...pausa...]") o leyendo la URL entera letra por letra.</p><p>Nota: los espacios enlazados pueden ser difíciles de eliminar; a veces es necesario borrar texto en ambos lados para eliminarlos.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>Este enlace tiene un atributo <code>aria-labelledby</code> que no coincide con el <code>ID</code> de ningún elemento en la página.</p><p>${why.fix}Proporcione un ID válido, o elimine este atributo y describa el enlace de otra manera.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Agregue un texto que describa su destino, o elimínelo si fue un error como un espacio enlazado.</p><div class="why"><p>Los lectores de pantalla tienen dificultades para describir enlaces vacíos, quedándose en silencio o leyendo la URL completa.</p><p>Los espacios enlazados pueden requerir volver a escribir texto adyacente para eliminarlos.</p></div>`,

	LINK_FILE_EXT: `<p>Este enlace apunta a un PDF o archivo descargable (por ejemplo MP3, Zip, Word) sin advertencia.</p><p>${why.fix}Use texto o un ícono para <a href="https://itmaybejj.github.io/linkpurpose/">indicar el tipo de archivo</a> en el enlace.</p><p class="why">Para archivos grandes, considere incluir el tamaño. Ejemplo: "Informe ejecutivo (PDF, 3MB)"</p>`,

	LINK_IDENTICAL_NAME: `<p>Varios enlaces que llevan a destinos distintos usan la misma etiqueta "<strong>%(TEXT)</strong>".</p><p>${why.fix}Reescriba los enlaces que llevan a lugares distintos para que sus etiquetas reflejen sus destinos únicos.</p>${why.links}`,

	LINK_IMAGE_ALT: `Asegúrese de que este alt describa el destino del enlace:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Verifique que esto ayude a describir el destino del enlace y no agregue información redundante:</p><p><strong class="badge">Alt</strong> "<em><strong>%(alt)</strong></em>"</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p><a href="https://webaim.org/techniques/hypertext/link_text#alt_link">El alt de una imagen enlazada se usa para describir el destino del enlace</a>. Los enlaces deben ser breves y precisos para que quienes usan lectores de pantalla puedan navegar la lista de enlaces fácilmente. Un alt largo suele indicar que describe la imagen en lugar del destino del enlace.</p>El texto alternativo de %(altLength) caracteres de esta imagen es: <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Cuando un enlace envuelve una imagen, el alt de la imagen <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">proporciona el título del enlace</a>.</p><p>${why.fix}Configure el texto alternativo con el destino o propósito del enlace.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'La imagen está marcada como decorativa, aunque el enlace está usando el texto circundante como etiqueta descriptiva.',

	LINK_NEW_TAB: `<p>${why.fix}Configure este enlace para que abra en la misma pestaña o <a href="https://itmaybejj.github.io/linkpurpose/">avise a los usuarios</a> con anticipación.</p><div class="why"><p>Los usuarios siempre pueden elegir abrir un enlace en otra pestaña. Cuando un enlace abre una pestaña nueva sin aviso, puede ser confuso, especialmente para usuarios con tecnología de asistencia.</p><p>Nota: Los formularios son la excepción; los enlaces dentro de un formulario suelen abrirse en otra pestaña para evitar pérdida de datos.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>El alt de esta imagen enlazada es un placeholder: "<strong>%(alt)</strong>".</p><p>${why.fix}Use un alt que describa el destino del enlace.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Este enlace contiene texto que no ayuda a describir su destino:<br><strong>%(text)</strong></p><p>${why.fix}Reescriba este enlace para describir su destino de manera concisa.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>Se proporcionó un nombre accesible mediante ARIA, pero el texto visible del enlace es genérico: "<strong {C}>%(ERROR)</strong>".</p><p>${why.fix}Escriba enlaces significativos para todos y asegúrese de que la etiqueta visual coincida con el nombre accesible.</p>${why.links}`,

	LINK_SUS_ALT: `<p>El alt de esta imagen incluye la palabra "%(alt)", lo que probablemente significa que no describe el destino del enlace.</p><strong class="badge">Alt text</strong> "%(ALT_TEXT)"<p>Para corregirlo: asegúrese de que el alt describa el destino o propósito del enlace.<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Evite usar símbolos como llamadas a la acción dentro del texto del enlace a menos que estén ocultos de la tecnología de asistencia. Los lectores de pantalla pueden leerlos en voz alta, lo que puede confundir. Considere eliminar: <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Cambie este enlace al título de su destino o propósito.</p><div class="why"><p>Las personas hojean los enlaces para encontrar información, especialmente quienes usan lectores de pantalla.</p><p>Las URLs enlazadas no pueden hojearse ni encontrarse fácilmente con búsqueda interna.</p></div>`,

	META_LANG: `<p>${why.fix}Agregue un <a href="https://www.w3.org/International/questions/qa-html-language-declarations">atributo de idioma</a> en la etiqueta HTML de la página.</p><div class="why"><p>Consejo: los lectores de pantalla pronuncian palabras basándose en el idioma declarado. Usar el idioma incorrecto produce discurso ininteligible.</p></div>`,

	META_MAX: `<p>Esta etiqueta meta limita cuánto pueden ampliar el texto los usuarios.</p><p>${why.fix}Configure los valores para permitir el zoom completo o elimínela.</p>`,

	META_REFRESH: `<p>Las páginas no deben actualizarse automáticamente mediante una meta tag, ya que interrumpe al usuario sin aviso, puede hacer que pierdan su lugar y puede reiniciar formularios.</p><p>${why.fix}Para actualizar contenido, use AJAX o JavaScript para avisar al usuario y dar la opción de retrasar el evento.</p>`,

	META_SCALABLE: `<p>Esta meta tag impide que los usuarios amplíen el texto.</p><p>${why.fix}Asegúrese de permitir el zoom completo eliminando o ajustando este valor.</p>`,

	META_TITLE: `<p>${why.fix}Agregue una etiqueta <code>&lt;title&gt;</code> al <code>&lt;head&gt;</code> de la página.</p><div class="why"><p>Muchas partes de la experiencia de navegación dependen de un <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title">título corto y único</a>:</p><ul><li>Los motores de búsqueda lo usan para titular resultados.</li><li>Los navegadores lo usan para titular pestañas.</li><li>Los lectores de pantalla lo anuncian al cambiar de pestaña.</li></ul><p>Sin título, las personas ven u oyen la URL en bruto.</p></div>`,

	MISSING_ALT: `<p>Cuando los lectores de pantalla encuentran una imagen sin atributo alt, leen la URL del archivo imagen, a menudo letra por letra.</p><p>${why.fix}Agregue alt="" si la imagen debe ser ignorada, o un alt descriptivo si es significativa.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Cuando una imagen enlazada no tiene atributo alt, los lectores de pantalla leen la URL del archivo imagen. Esto es especialmente problemático en imágenes enlazadas.</p><p>${why.fix}Proporcione un alt que coincida con el destino del enlace.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Esta imagen forma parte de un enlace con texto. Si el texto visible describe suficientemente el destino, agregue alt="" para que la imagen sea ignorada. Si no, agregue un alt que describa ese destino.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>El enlace parece apuntar a un entorno de desarrollo:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Cámbielo a una ruta relativa (/folder) o a la URL pública.</p>`,

	QA_BLOCKQUOTE: `<p>El formato blockquote indica a los lectores de pantalla que el texto debe anunciarse como cita. Las citas cortas suelen ser encabezados.</p><p>${why.fix}Si esto es un encabezado, use formato de encabezado para que aparezca en el esquema de la página.</p>${why.headings}`,

	QA_DOCUMENT: `<p>Los documentos enlazados cuentan como contenido web y deben ser accesibles. Verifique encabezados, tablas y alts, y luego descarte esta alerta.</p><ul class="why"><li>Cómo hacer accesibles tus <a href="https://support.google.com/docs/answer/6199477?hl=en">documentos o presentaciones de Google Workspace</a>.</li><li>Cómo hacer accesibles tus <a href="https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">documentos de Office</a>.</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}Si esta línea en negrita introduce un tema, reemplácela con un estilo de encabezado.</p><div class="why"><p>Consejo: los encabezados crean una tabla de contenido navegable para la asistencia técnica. Su número indica su profundidad en el esquema.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Si "%(text)" es parte de una lista, reemplácelo con formato de lista.</p><div class="why"><p>Las listas son estructurales visual y técnicamente:</p><ol><li>Alinean sangrías y mejoran la lectura.</li><li>Son legibles por máquina; los lectores de pantalla anuncian "ítem 3 de 7".</li></ol><p>Un número al inicio de una oración no crea un verdadero ítem de lista.</p></div>`,

	QA_IN_PAGE_LINK: `<p>El destino de este enlace no coincide con ningún elemento en esta página.</p><div class="why"><p>Nota para desarrolladores: si esto es parte de un evento JavaScript, asegúrese de que funcione con teclado antes de ignorarlo.</p></div>`,

	QA_JUSTIFY: `<p>El texto justificado agrega espacios adicionales, creando huecos que dificultan la lectura para muchas personas.</p><p>${why.fix}Use texto alineado a la izquierda.</p>`,

	QA_NESTED_COMPONENTS: 'Evite anidar componentes interactivos, como colocar acordeones dentro de otros acordeones o pestañas dentro de acordeones. Esto puede complicar la navegación y provocar que se pase por alto contenido.',

	QA_PDF: `<p>${why.fix}Haga una de las siguientes acciones y luego descarte esta alerta:</p><ul><li>Enlace a una página web en lugar del PDF,</li><li>O proporcione también una página web o documento editable,</li><li>O asegúrese como mínimo de que el PDF sea accesible verificando etiquetas, encabezados, orden de lectura, tablas y alt en imágenes.</li></ul><div class="why"><p>Los usuarios móviles y de asistencia técnica generalmente prefieren páginas web a PDFs. Los PDFs suelen no refluír y carecer de etiquetas necesarias.</p></div>`,

	QA_SMALL_TEXT: 'El texto pequeño es más difícil de leer, especialmente para personas con baja visión. Evite tamaños de fuente más pequeños que el predeterminado.',

	QA_STRONG_ITALICS: `<p>${why.fix}Reserve negritas y cursivas para pocas palabras o frases clave.</p><div class="why"><p>Nota: si esto es una cita, use blockquote para destacarla.</p></div>`,

	QA_SUBSCRIPT: `Los subíndices y superíndices hacen el texto más pequeño y difícil de leer. Úselos solo para usos específicos, como números ordinales (4<sup>to</sup>), fórmulas (H<sub>2</sub>O) o referencias de notas.`,

	QA_UNDERLINE: `<p>El subrayado indica un enlace en la Web. Los usuarios creerán que pueden hacer clic en esto.</p><p>${why.fix}Use <strong>negrita</strong> o <em>cursiva</em> para énfasis, y estilos de encabezado para marcar cambios de tema.</p><div class="why"><p>Nota: los lectores de pantalla no anuncian formato visual como subrayado. Solo los encabezados agregan estructura.</p></div>`,

	QA_UPPERCASE: `<p>LOS BLOQUES DE TEXTO EN MAYÚSCULAS SON MÁS DIFÍCILES DE LEER Y PUEDEN INTERPRETARSE COMO GRITOS.</p><p>${why.fix}Enfatice solo unas pocas palabras a la vez, preferentemente con negritas.</p><div class="why"><p>Nota: los lectores de pantalla no anuncian negritas. Use encabezados si esto introduce un tema o contenido importante.</p></div>`,

	SUS_ALT: `<p>El alt de esta imagen incluye la palabra "%(alt)", lo cual probablemente es redundante:</p><p><strong class="badge">Alt text</strong> "%(ALT_TEXT)"</p><p>Para corregirlo: reescriba el alt para transmitir brevemente el significado de la imagen.</p><div class="why"><p>Consejo: los lectores de pantalla ya anuncian que están describiendo una imagen, por lo que frases como "imagen de" suelen ser redundantes.</p><p>Esto está bien si esas palabras forman parte del contenido descrito:</p><ul><li>No redundante: "<em>Una foto en</em> un álbum de fotos mostrado a la clase."</li><li>Redundante: "<em>Foto de</em> una foto en un álbum..."</li></ul></div>`,

	TABINDEX_ATTR: `<p>${why.fix}Nunca use valores tabindex mayores que "0". Cambie el orden de los elementos en el HTML para que el orden visual, de tabulación y de lectura coincidan.</p><div class="why"><p>Por defecto, el orden visual, el orden del teclado y el orden de lectura son el mismo.</p><p>Asignar tabindex positivo mueve un elemento al inicio del orden de tabulación, <strong>pero no del orden visual</strong>. Esto obliga a los usuarios a buscar controles fuera de contexto.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Asegúrese de que cada celda de encabezado tenga texto.</p><div class="why"><p>Consejo: los lectores de pantalla usan los encabezados para orientar a los usuarios dentro de una tabla.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Edite las propiedades de la tabla e indique si los encabezados están en la primera fila, primera columna o ambas.</p><div class="why"> <p>Consejo: los lectores de pantalla repiten el encabezado relevante al entrar en cada columna o fila.</p><p>Si esta tabla no tiene encabezados porque solo se usa para diseño visual, elimine el formato de tabla.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Elimine este formato de encabezado (h2, h3). Proporcione filas o columnas de encabezado en su lugar. Si necesita múltiples filas de encabezado, divida la tabla.</p><div class="why"> <p>Consejo: los encabezados de tablas son direccionales (fila o columna). Los encabezados de contenido afectan todo lo que sigue en la estructura.</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Un <strong>encabezado de tabla</strong> en la celda 2 etiqueta la celda B. <br><br> Un <strong>encabezado de contenido</strong> etiqueta celdas 3, A, B, C, y este texto y pie de tooltip.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,
}

const interfaceStrings = {
	ALERT_CLOSE: 'Cerrar',
	ALT: 'Texto alternativo: ',
	DECORATIVE: 'Marcado como decorativo',
	DISMISS: 'Ignorar',
	DISMISS_ALL: 'En esta página: ignorar',
	edit_page: 'Editar página',
	edit_layout: 'Editar diseño',
	edit_term: 'Editar término',
	edit_tags: 'Editar usuario',
	IMAGES: 'Texto alternativo',
	MAIN_TOGGLE_LABEL: 'Activar herramientas de accesibilidad',
	MISSING: '(faltante!)',
	NOT_VISIBLE: 'Nota: este contenido puede no ser visible. Búsquelo dentro del contenedor delineado.',
	NO_IMAGES: 'No se encontraron imágenes.',
	OUTLINE: 'Encabezados',
	PANEL_DISMISS_BUTTON: `Mostrar %(dismissCount) alertas ocultas`,
	PANEL_HEADING: 'Mostrar visualizadores',
	SKIP_TO_ISSUE: 'Ir al problema',
	WARNING: 'revisión manual necesaria',
	WARNINGS: 'revisiones manuales necesarias',
	buttonFirstContent: 'Ir a la primera alerta',
	buttonHideHiddenAlert: 'Ocultar alerta oculta',
	buttonHideHiddenAlerts: `Ocultar %(count) alertas ocultas`,
	buttonShowHiddenAlert: 'Mostrar alerta oculta',
	buttonToolsActive: 'Ocultar visualizadores',
	dismissActions: `Alertas similares`,
	dismissHideTitle: 'Solo oculta la alerta para usted',
	dismissOkAllButton: 'En esta página: marcar como OK',
	dismissOkButtonContent: 'Marcar como OK',
	dismissOkTitle: 'Oculta la alerta para todos los editores',
	dismissOnSite: 'En todas las páginas: marcar como OK',
	dismissalsHeader: '¿No piensa corregir esto?',
	errorOutlinePrefixHeadingEmpty: '(encabezado vacío)',
	errorOutlinePrefixHeadingIsLong: '(marcado por longitud)',
	errorOutlinePrefixSkippedLevel: '(marcado por salto de nivel)',
	issueContent: 'Problema de contenido',
	issueDeveloper: 'Problema de desarrollo',
	issueTemplate: 'Problema de plantilla',
	main_toggle_hide: 'Ocultar herramientas de accesibilidad',
	main_toggle_hide_alerts: 'Ocultar alertas de accesibilidad',
	main_toggle_show: 'Mostrar herramientas de accesibilidad',
	main_toggle_show_alerts: 'Mostrar alertas de accesibilidad',
	panelCheckAltText: '<p class="ed11y-small">Verifique que cada imagen describa lo que significa en contexto y que no haya imágenes de texto.</p>',
	panelCheckOutline: '<p class="ed11y-small">Esto muestra el esquema de encabezados. Verifique que coincida con la organización visual del contenido.</p>',
	PANEL_HEADING_MISSING_ONE: 'Falta el Encabezado 1.',
	PANEL_NO_HEADINGS: 'No se encontraron encabezados.',
	reportsLink: 'Abrir reportes del sitio',
	toggleDisabled: 'No hay contenido disponible para que Editoria11y lo revise.',
	transferFocus: 'Editar este contenido',
	unDismissHideButton: 'Restaurar esta alerta ignorada',
	unDismissNotePermissions: 'Esta revisión ha sido ocultada por un administrador',
	unDismissOKButton: 'Restaurar esta alerta marcada como OK',
};


const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips),
  testNames: testNames,
};

export default newStrings;
