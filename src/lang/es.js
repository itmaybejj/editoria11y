import { default as Sa11yStrings } from '../sa11y-lang/es.js';

const testNames = {
	ARIA_INPUT_FIELD_NAME: 'A este campo de entrada personalizado le falta una etiqueta',
	ALT_FILE_EXT: 'Este texto alternativo es un nombre de archivo, no una descripción',
	ALT_MAYBE_BAD: '¿Es esta una descripción clara y concisa de la imagen?',
	ALT_MAYBE_BAD_WARNING: '¿Es esta una descripción clara y concisa de la imagen?',
	ALT_PLACEHOLDER: 'Este texto alternativo podría ser un marcador de posición',
	ALT_UNPRONOUNCEABLE: 'Este texto alternativo es impronunciable',
	BTN_EMPTY: 'El botón no tiene una etiqueta accesible',
	BTN_UNPRONOUNCEABLE: 'Este botón no se puede pronunciar',
	BTN_EMPTY_LABELLEDBY: 'El botón tiene una etiqueta ARIA no válida',
	BTN_ROLE_IN_NAME: 'El nombre del botón repite la palabra «botón»',
	CONTRAST_ERROR: 'El texto no tiene suficiente contraste para ser fácilmente legible',
	CONTRAST_ERROR_GRAPHIC: 'El gráfico o ícono no tiene suficiente contraste',
	CONTRAST_INPUT: 'El campo de entrada no proporciona suficiente contraste para ser legible',
	CONTRAST_PLACEHOLDER: 'El texto de marcador de posición no tiene suficiente contraste para ser fácilmente legible',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: '¿Este texto de marcador de posición tiene suficiente contraste?',
	CONTRAST_WARNING: '¿Este texto tiene suficiente contraste?',
	CONTRAST_WARNING_GRAPHIC: '¿Este gráfico o ícono tiene suficiente contraste?',
	DUPLICATE_ID: 'Atributo ID duplicado',
	DUPLICATE_TITLE: 'Este enlace tiene un texto emergente con el mismo texto que el enlace',
	EMBED_AUDIO: '¿Este audio tiene una transcripción?',
	EMBED_DATA_VIZ: '¿Esta visualización es accesible?',
	EMBED_GENERAL: 'Los iframes incrustados requieren revisiones manuales',
	EMBED_MISSING_TITLE: 'El frame no tiene un atributo «title»',
	EMBED_UNFOCUSABLE: 'Un frame con tabindex="‑1" no será accesible por teclado.',
	EMBED_VIDEO: '¿Este video está correctamente subtitulado?',
	HEADING_EMPTY: 'Este encabezado no tiene texto',
	HEADING_UNPRONOUNCEABLE: 'Este encabezado no se puede pronunciar',
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
	LABELS_PLACEHOLDER: 'Prefiera etiquetas visibles a los marcadores de posición',
	LABELS_INPUT_RESET: '¿Es necesario este botón de restablecer?',
	LABEL_IN_NAME: 'La etiqueta visible no coincide con la etiqueta invisible',
	LABELS_MISSING_IMAGE_INPUT: 'A este campo de imagen le falta texto alternativo',
	LABELS_MISSING_LABEL: 'Este campo de entrada tiene una etiqueta vacía',
	LABELS_NO_FOR_ATTRIBUTE: 'Este campo de entrada no está conectado a una etiqueta',
	LINK_ALT_FILE_EXT: 'El texto alternativo usado como vínculo no debe ser una URL',
	LINK_ALT_MAYBE_BAD: 'Este texto alternativo vinculado podría no ser claro ni conciso',
	LINK_ALT_MAYBE_BAD_WARNING: 'Este texto alternativo vinculado podría no ser claro ni conciso',
	LINK_ALT_UNPRONOUNCEABLE: 'Las imágenes vinculadas necesitan texto alternativo pronunciable',
	LINK_CLICK_HERE: 'Revisión manual: el enlace contiene «haz clic aquí»',
	LINK_DOI: 'Vincula los títulos de artículos, no los números DOI',
	LINK_EMPTY: 'Este enlace no contiene palabras.',
	LINK_EMPTY_LABELLEDBY: 'Enlace con atributo «aria‑labelledby» no válido',
	LINK_EMPTY_NO_LABEL: 'Este enlace necesita una etiqueta',
	LINK_UNPRONOUNCEABLE: 'Este enlace no se puede pronunciar',
	LINK_FILE_EXT: 'El enlace apunta a un archivo sin advertencia',
	LINK_IDENTICAL_NAME: 'Varios enlaces con el mismo texto dirigen a páginas diferentes',
	LINK_IMAGE_ALT: 'Revisión manual: imagen vinculada con texto alternativo',
	LINK_IMAGE_ALT_AND_TEXT: '¿Este texto alternativo tiene sentido como parte del enlace?',
	LINK_IMAGE_LONG_ALT: '¿Puede este texto alternativo vinculado ser más corto?',
	LINK_IMAGE_NO_ALT_TEXT: 'Esta imagen vinculada necesita texto alternativo',
	LINK_IMAGE_TEXT: 'Revisión manual: imagen dentro de un enlace marcada como decorativa.',
	LINK_LABEL: 'Etiqueta de enlace',
	LINK_MAYBE_BUTTON: '¿Es este enlace en realidad un botón?',
	LINK_NEW_TAB: '¿Este enlace abre una pestaña nueva sin advertencia?',
	LINK_PLACEHOLDER_ALT: 'Este texto alternativo vinculado podría ser un marcador de posición',
	LINK_STOPWORD: 'Este enlace solo contiene palabras genéricas',
	LINK_STOPWORD_ARIA: 'El propósito de este enlace está oculto visualmente',
	LINK_SUS_ALT: '¿El texto alternativo describe el enlace o la imagen?',
	LINK_SYMBOLS: 'Revisión manual: ¿los símbolos o emojis en este enlace son significativos?',
	LINK_URL: 'El texto del enlace no debe ser una URL',
	LANG_MISMATCH: 'La etiqueta de idioma no coincide con el contenido',
	LANG_OF_PARTS: 'Este contenido parece estar en un idioma diferente',
	LANG_OF_PARTS_ALT: 'Este texto alternativo parece estar en un idioma diferente',
	META_LANG: 'Falta la metaetiqueta para el idioma de la página',
	META_LANG_SUGGEST: '¿Quiso decir un código de idioma diferente?',
	META_LANG_VALID: 'Código de idioma no válido',
	META_MAX: 'La metaetiqueta limita cuánto pueden ampliar el texto los usuarios',
	META_REFRESH: 'La metaetiqueta actualiza la página automáticamente',
	META_SCALABLE: 'La metaetiqueta impide que los usuarios amplíen el texto',
	META_TITLE: 'Falta la metaetiqueta para el título de la página',
	PAGE_LANG_CONFIDENCE: 'Es posible que el idioma de la página no coincida con el contenido',
	MISSING_ALT: 'HTML no válido: la imagen no tiene atributo alt',
	MISSING_ALT_LINK: 'HTML no válido: la imagen vinculada no tiene atributo alt',
	MISSING_ALT_LINK_HAS_TEXT: 'HTML no válido: la imagen dentro de un enlace no tiene atributo alt',
	QA_BAD_LINK: 'Revisión manual: el destino del enlace puede ser inválido',
	QA_BLOCKQUOTE: '¿Debería esta cita ser un encabezado?',
	QA_DOCUMENT: '¿Este documento ha sido etiquetado para lectores de pantalla?',
	QA_FAKE_HEADING: '¿Este texto en negrita debería ser un encabezado?',
	QA_FAKE_LIST: '¿Esto debería tener formato de lista?',
	QA_IN_PAGE_LINK: 'Enlace interno roto',
	QA_JUSTIFY: 'No justificar el texto',
	QA_NESTED_COMPONENTS: 'Componentes interactivos anidados',
	QA_PDF: '¿Existe una alternativa para este PDF?',
	QA_SMALL_TEXT: 'El texto es demasiado pequeño',
	QA_STRONG_ITALICS: 'Los bloques largos de texto enfatizado son difíciles de leer',
	QA_SUBSCRIPT: 'No usar superíndices o subíndices como formato visual',
	QA_UNDERLINE: 'Solo los enlaces deben subrayarse',
	QA_UPPERCASE: '¿Este texto en mayúsculas es necesario?',
	SUS_ALT: '¿Hay palabras redundantes en este texto alternativo?',
	TABINDEX_ATTR: 'Las sobrescrituras de tabindex interrumpen el orden de foco',
	TABLES_EMPTY_HEADING: 'Esta celda de encabezado necesita texto',
	TABLES_INVALID_HEADERS_REF: 'Esta tabla tiene un atributo headers no válido',
	TABLES_MISSING_HEADINGS: 'A esta tabla le falta una fila o columna de encabezados',
	TABLES_SEMANTIC_HEADING: 'Los encabezados de contenido no deben usarse dentro de tablas',
	UNCONTAINED_LI: 'Lista HTML no válida',
};

const why = {
	fix: `<strong class="badge">Para corregir</strong>`,
	// check: `<strong class="badge">Revisión manual</strong>`, // kept commented if needed

	buttons: `<div class="why"><p>Consejo: el nombre accesible de un botón debe dejar claro lo que hará al hacer clic. Si eso cambia, el estado actual debe quedar claro:</p><ul><li>Botones que actualizan etiquetas:<br>"Reproducir/Pausar", "Mostrar detalles/Ocultar detalles"</li><li>Botones que <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">actualizan el estado</a>:<br>"Reproducir/Reproducir, activado", "Detalles, contraído/Detalles, expandido."</li></ul></div>`,

	headings: `<div class="why"><p>Consejo: los encabezados y subencabezados organizan el contenido en una estructura jerárquica. Los usuarios de lectores de pantalla dependen de esta estructura para comprender y explorar las páginas:</p><ul><li>Encabezado nivel 1: título de la página<ul><li>Encabezado nivel 2: temas principales<ul><li>Encabezado nivel 3: subtemas</li></ul></li></ul></li></ul></div>`,

	images: `<div class="why"><p>Consejo: al escribir texto alternativo, describa lo que la imagen <em>significa</em>, no solo lo que contiene. Dependiendo del contexto, una foto de una niña pateando una pelota podría significar:</p><ul><li>Estaban jugando bajo la lluvia.</li><li>Los nuevos uniformes del equipo tienen logos de dragones muy llamativos.</li><li>Ella anotó el gol de la victoria desde la banda izquierda.</li></ul></div>`,

	links: `<div class="why"><p>Consejo: las personas recorren la página leyendo los enlaces y usando la búsqueda interna para encontrarlos por nombre, por lo que los enlaces efectivos deben ser significativos, únicos y concisos:</p><ul><li>Ideal: "Aprende sobre <a href="https://webaim.org/techniques/hypertext/link_text">enlaces significativos</a>"</li><li>No único: "Haz clic <a href="https://webaim.org/techniques/hypertext/link_text">aquí</a> para aprender sobre enlaces significativos."</li><li>No conciso: "<a href="https://webaim.org/techniques/hypertext/link_text">Haz clic aquí para aprender más sobre enlaces significativos</a>"</li></ul></div>`,

	imageLinks: `<div class="why"><p>Consejo: el propósito del texto alternativo es proporcionar una alternativa al significado de una imagen, no a su contenido superficial. En imágenes enlazadas, el significado es el destino del enlace:</p><ul><li>"<em>Una lupa</em>" describe una imagen, no un enlace.</li><li>"<em>Una lupa de búsqueda</em>" describe ambiguamente ambas cosas.</li><li>"<em>Buscar</em>" describe correctamente el destino del enlace.</li></ul></div>`,
};

const tips = {
	ARIA_INPUT_FIELD_NAME: `<p><strong>Elemento:</strong> <code>%(EL)</code></p><p>${why.fix}Proporcione cualquier etiqueta válida; para elementos de entrada personalizados eso suele ser texto interno, o un atributo title, aria-label o aria-labelledby.</p>`,

	ALT_FILE_EXT: `<p><span hidden>%(alt)</span><strong>Texto alternativo:</strong> <i>%(ALT_TEXT)</i></p><p>Los lectores de pantalla intentarán pronunciar esta URL, a menudo letra por letra. Esto probablemente no transmite el mismo significado que ver la imagen.</p><p>${why.fix}Describa de manera concisa lo que significa esta imagen en este contexto.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p><strong>Texto alternativo:</strong> <i>%(alt)</i></p><p>${why.fix}Describa de manera concisa lo que significa esta imagen en este contexto.</p>${why.images}`,

	ALT_MAYBE_BAD_WARNING: `<p><strong>Texto alternativo:</strong> <i>%(alt)</i></p><p>${why.fix}Describa de manera concisa lo que significa esta imagen en este contexto.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p><strong>Texto alternativo:</strong> <i>%(alt)</i></p><p>${why.fix}Describa de manera concisa lo que significa esta imagen en este contexto.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p><strong>Texto alternativo:</strong> <i>%(alt)</i></p><p>Este texto alternativo solo contiene símbolos impronunciables y/o espacios. Los lectores de pantalla anunciarán que hay una imagen y luego harán una pausa incómoda o dirán algo ininteligible.</p><p>${why.fix}Describa de manera concisa lo que significa esta imagen en este contexto.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Use cualquier método válido para indicar a los lectores de pantalla qué hace este botón; por ejemplo: texto, texto alternativo en un icono o el atributo <code>title</code>.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Este botón tiene un valor <code>aria-labelledby</code> que está vacío o no coincide con el <code>ID</code> de otro elemento de la página.</p><p>${why.fix}Vuelva a vincular el ID a un elemento en la página, o elimine este atributo y describa el botón de otra manera.</p>`,

	BTN_TIP: `${why.buttons}`,

	BTN_ROLE_IN_NAME: `<p><strong>Etiqueta para lectores de pantalla:</strong> <i>%(TEXT)</i></p><p>Los lectores de pantalla usan la palabra «botón» para anunciar que están describiendo un botón, por lo que esta palabra es repetitiva.</p><p>${why.fix}La etiqueta del botón debe coincidir con su acción. Si la etiqueta visible es un ícono en lugar de texto, etiquete el botón con el significado del ícono, por ejemplo: «Reproducir», «Buscar» o «Menú».</p>`,
	BTN_UNPRONOUNCEABLE: `<p><strong>Texto del botón:</strong> <i>%(TEXT)</i></p><p>${why.fix}Añada texto, un título o un aria-label que describa su destino.</p><div class="why"><p>Consejo: Los lectores de pantalla no pueden describir botones que solo contengan espacios o símbolos. Quedan silenciosos ("Botón, [...pausa incómoda donde debería estar la etiqueta del botón...]"), o leen el nombre del símbolo.</p></div>`,

	CONTRAST_WARNING: 'Una imagen de fondo o un degradado impide a este verificador determinar con seguridad el color detrás de este texto. Use el selector de color a continuación para verificar manualmente.',

	DUPLICATE_ID: `<p>Los ID se usan en esta página para etiquetas o destinos de enlace, por lo que deben ser únicos.</p><p>${why.fix}Cambie este ID: <code>#%(ID)</code></p><div class="why"><p>En la mayoría de los sistemas de gestión de contenido, esto proviene de un campo "name" o "id" en las propiedades del elemento. En HTML, es un atributo: <code>&lt;a id="MY-ID"&gt;</code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Elimine el texto del enlace o el atributo <code>title</code>.</p><div class="why"><p>Nota: los textos emergentes de <code>title</code> solo aparecen al pasar el puntero del ratón. No se ven al navegar en un teléfono o con el teclado, por lo que muchas personas nunca los verán. No deben contener información única o importante.</p></div>`,

	EMBED_AUDIO: `<p>Este verificador no puede determinar si un reproductor de audio tiene una transcripción, ni si la transcripción es precisa.</p><p>${why.fix}Asegúrese de que haya disponible una <a href="https://www.w3.org/WAI/media/av/transcribing/">transcripción o alternativa en texto</a>, y verifique que los hablantes y los efectos de sonido significativos estén correctamente identificados.</p>`,

	EMBED_DATA_VIZ: `<p>Los elementos de visualización incrustados a menudo son difíciles o imposibles de operar con tecnologías de asistencia; pueden resultar difíciles de comprender para personas con baja visión o daltonismo, y pueden requerir mucho desplazamiento horizontal en teléfonos.</p><p>${why.fix}A menos que este embed tenga alto contraste visual, se pueda operar con teclado <strong><em>y</em></strong> sea descrito por un lector de pantalla, agregue un formato alternativo equivalente (descripción textual, tabla de datos o hoja de cálculo descargable) y luego descarte esta alerta.</p>`,

	EMBED_GENERAL: 'Los verificadores automáticos no pueden evaluar el contenido dentro de elementos incrustados. Asegúrese de que todas las imágenes dentro de este embed tengan texto alternativo, los videos tengan subtítulos, el texto tenga suficiente contraste y que los enlaces y los botones sean <a href="https://webaim.org/techniques/keyboard/">accesibles mediante teclado</a>, y luego descarte esta alerta.',

	EMBED_MISSING_TITLE: `<p>Los contenidos incrustados necesitan un nombre accesible que describa su contenido para los lectores de pantalla.</p><p>${why.fix}Agregue un atributo <code>title</code> o <code>aria-label</code> único.</p>`,

	EMBED_UNFOCUSABLE: `<p>Este atributo indica a los teclados y tecnologías de asistencia que omitan este elemento. Elimine este atributo a menos que el iframe no tenga enlaces, botones, campos ni contenido desplazable.</p>`,

	EMBED_VIDEO: `<p>Este verificador no puede «ver» si los videos tienen subtítulos, ni determinar si alguien los ha revisado, por lo que se necesita una verificación manual.</p><p>${why.fix}Asegúrese de que haya disponibles <a href="https://www.w3.org/WAI/media/av/captions/">subtítulos precisos («CC»)</a>, y verifique que los hablantes y los efectos de sonido significativos estén correctamente identificados.</p>`,

	HEADING_EMPTY: `<p>Los encabezados vacíos crean huecos confusos en el esquema de la página.</p><p>${why.fix}Agregue texto a este encabezado o elimine esta línea vacía.</p>${why.headings}`,
	HEADING_UNPRONOUNCEABLE: `<p>Los encabezados vacíos crean huecos confusos en el esquema de la página.</p><p>${why.fix}Agregue texto legible a este encabezado, o conviértalo en un párrafo.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Los encabezados vacíos crean huecos confusos en el esquema de la página.</p><p>${why.fix}Si esto no es un encabezado, cambie su formato de <code>Encabezado %(level)</code> a <code>Párrafo</code>. De lo contrario, plasme el significado de la imagen en su alt.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Asegúrese de que el título de la página esté marcado como Encabezado 1 o Encabezado 2. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}A menos que este encabezado sea una referencia de longitud fija (por ejemplo, el título de un artículo publicado), acórtelo para ayudar a que las personas hojeen el contenido:<span hidden>%(drop)%(drop)</span></p><p><i>%(TEXT)</i></p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Marque el título de la página como un encabezado de nivel 1 para indicar el inicio del esquema del documento.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Este encabezado saltó de <code>nivel %(prevLevel)</code> a <code>nivel %(level)</code>. Para un lector de pantalla, esto suena como si faltara contenido.</p><p>${why.fix}Ajuste los niveles para formar un esquema correcto, sin saltos.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: `<p>Este elemento interactivo tiene un atributo <code>aria-hidden="true"</code>, pero sigue siendo accesible mediante teclado.</p><p>${why.fix}Si <strong>pretende</strong> ocultar este elemento a los lectores de pantalla, también debe agregar <code>tabindex="-1"</code>. De lo contrario, elimine el atributo <code>aria-hidden="true"</code>.</p><p><strong>Elemento:</strong> <code>%(ELEMENT)</code></p>`,

	IMAGE_ALT_TOO_LONG: `<p>Este texto alternativo tiene %(altLength) caracteres: <i class="ed11y-small">%(ALT_TEXT)</i></p><p>${why.fix}Resuma, o mueva parte de la descripción a un pie de foto.</p><div class="why"><p>Consejo: las imágenes complejas que transmiten más información de la que cabe en una frase suelen necesitar un pie de foto <strong>visible</strong> o una alternativa que describa o interprete los detalles clave. Está bien remitir a las personas usuarias de lectores de pantalla a ese texto:</p><ul><li>"Póster del baile del viernes; detalles en el pie de foto."</li><li>"Gráfico que muestra que los casos han bajado un 10% este año; detalles en la tabla."</li></ul></div>`,

	IMAGE_DECORATIVE: `<p>Esta imagen ha sido ocultada a los lectores de pantalla mediante un alt vacío. Solo las imágenes sin significado (íconos redundantes, texturas decorativas) deben ocultarse de esta manera.</p><p>${why.fix}Si esta imagen aporta valor a la página, proporcione un texto alternativo.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'La imagen está marcada como <strong>decorativa</strong>, pero todas las imágenes en un carrusel o galería deben incluir texto alternativo descriptivo.',

	IMAGE_FIGURE_DECORATIVE: `<p>Esta imagen será ignorada por la tecnología de asistencia. ¿El pie de foto tendrá sentido sin la imagen?</p><p>${why.fix}Si el pie de foto no describe el significado visual, proporcione texto alternativo para aquello que no queda descrito.</p><div class="why"><p>Consejo: las imágenes, los textos alternativos y las leyendas trabajan juntos:</p><ul><li>Las leyendas visibles proporcionan contexto.</li><li>Los textos alternativos describen la imagen para quienes no pueden verla.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p><strong>Texto duplicado: </strong><i>%(ALT_TEXT)</i></p><p>${why.fix}Describa en el texto alternativo cualquier significado visual que falte.</p><div class="why"><p>Consejo: las imágenes, los textos alternativos y las leyendas trabajan juntos:</p><ul><li>Las leyendas visibles proporcionan contexto e interpretación.</li><li>Los textos alternativos describen la imagen para quienes no pueden verla.</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: `<p><strong>Etiqueta invisible del campo:</strong> <i>%(TEXT)</i></p><p>Verifique que exista una etiqueta visible, que permanezca cuando se introduzca texto en este campo y que coincida con el nombre invisible del campo.</p><div class="why"><p>Etiquetar campos solo con un título o un marcador de posición hace que la etiqueta desaparezca visualmente cuando alguien empieza a escribir. Esto dificulta revisar el contenido cuando hay varios campos y facilita olvidar actualizar la etiqueta invisible.</p></div>`,

	LABELS_INPUT_RESET: `<p>Los botones de restablecer pueden activarse por error con facilidad, provocando pérdida de datos sin oportunidad de cancelar o deshacer.</p><p>${why.fix}A menos que restablezca un único campo, considere eliminarlo o proporcionar una confirmación antes de ejecutar la acción.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'El botón de imagen no tiene texto alternativo. Agregue uno para proporcionar un nombre accesible; por ejemplo: <em>Buscar</em> o <em>Enviar</em>.',

	LABELS_MISSING_LABEL: `<p>${why.fix}Agregue un <code>id</code> a este campo y un atributo <code>for</code> correspondiente en la etiqueta.</p>`,

	LABELS_NO_FOR_ATTRIBUTE: `No hay una etiqueta asociada con este campo. Agregue a la etiqueta un atributo <code>for</code> que coincida con el <code>id</code> de este campo. <hr> <strong>ID:</strong> <code>#%(ID)</code>`,

	LABELS_PLACEHOLDER: `<p>El texto de marcador de posición puede confundirse con contenido ya introducido si tiene buen contraste, o resultar ilegible si no lo tiene. Además desaparece al escribir, lo que puede ocultar información que las personas usuarias necesitaban para comprobar errores.</p><p>${why.fix}Asegúrese de que la información clave (etiqueta del campo, texto de ayuda e instrucciones de formato) permanezca visible cuando el campo tenga contenido, y considere eliminar el marcador de posición por completo.</p>`,

	LABEL_IN_NAME: `<p><strong>Texto visible:</strong> <i>%(VISIBLE)</i></p><p><strong>Etiqueta para lectores de pantalla:</strong> <i>%(LABEL)</i></p><p>El texto visible de este elemento parece distinto del nombre accesible. Esto puede causar confusión a quienes usan lectores de pantalla y afectar el control por voz.</p><p>${why.fix}Asegúrese de que la etiqueta visible comience con el texto de la etiqueta invisible y no contenga información significativa que falte en la etiqueta invisible.</p>`,

	LINK_ALT_FILE_EXT: `<p>Este texto alternativo probablemente es un nombre de archivo en lugar de un nombre significativo para el destino del enlace:<br><span hidden>%(ALT)</span><i>%(alt)</i></p><p>${why.fix}Use el título del destino del enlace como texto alternativo para las imágenes vinculadas.</p><div class="why"><p>El propósito del texto alternativo es describir lo que la imagen significa, no lo que contiene. El significado de una imagen vinculada es el destino del enlace:</p><ul><li>"Página con texto" describe la imagen, no un enlace.</li><li>"IMG_1234.jpg" es solo un nombre de archivo.</li><li>"Formulario de registro (doc)" es un destino del enlace.</li></ul></div>`,

	LINK_ALT_MAYBE_BAD: `<p><strong>Texto alternativo:</strong> <i>%(alt)</i></p><p>${why.fix}Use el título del destino del enlace como texto alternativo para las imágenes vinculadas.</p>${why.imageLinks}`,

	LINK_ALT_MAYBE_BAD_WARNING: `<p><strong>Texto alternativo:</strong> <i>%(alt)</i></p><p>${why.fix}Use el título del destino del enlace como texto alternativo para las imágenes vinculadas.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>El alt de esta imagen vinculada contiene solo símbolos impronunciables o espacios: <i>%(ALT_TEXT)</i></p><p>Los lectores de pantalla anunciarán que hay un enlace, pero no podrán describirlo.</p><p>${why.fix}Use el título del destino del enlace como texto alternativo para las imágenes vinculadas.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `<p><strong>Texto del enlace:</strong> <i>%(TEXT)</i></p><p>${why.fix}Elimine palabras redundantes que desvían la atención del propósito del enlace.</p>${why.links}`,

	LINK_DOI: `<p><strong>Texto del enlace:</strong> <i>%(TEXT)</i></p><p>${why.fix}Vincule el título del artículo y deje el DOI como texto plano, en lugar de vincular el DOI y dejar el título sin enlace.</p><div class="why"><p>La guía de estilo de la APA recomienda usar enlaces descriptivos porque las personas recorren los enlaces y usan la búsqueda dentro de la página para encontrarlos.</p><p>Esto también permite a los lectores de pantalla describir los enlaces de forma significativa, en lugar de leer una sucesión de números.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Añada texto que describa su destino, o elimínelo si es solo un error tipográfico o un carácter de espacio vinculado.</p><div class="why"><p>Consejo: Los lectores de pantalla no pueden describir enlaces que solo contengan espacios o símbolos. Quedan silenciosos ("Enlace, [...pausa incómoda donde debería estar el título del enlace...]"), o leen la URL: "Enlace, H-T-T-P-S barra diagonal barra diagonal ejemplo punto com."</p><p>Tenga en cuenta que los caracteres de espacio vinculados pueden ser difíciles de eliminar en algunos editores de contenido; a veces es necesario eliminar "cruzando la brecha" eliminando y reescribiendo las palabras a ambos lados de un espacio vinculado.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>Este enlace tiene un atributo <code>aria-labelledby</code> que no coincide con el <code>ID</code> de ningún elemento en la página.</p><p>${why.fix}Proporcione un ID válido o elimine este atributo.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Agregue texto que describa su destino, o elimínelo si fue un error.</p><div class="why"><p>Los enlaces vacíos ocasionan silencio o la lectura completa de la URL.</p><p>Los espacios vinculados a veces requieren reescribir el texto adyacente para eliminarlos.</p></div>`,
	LINK_UNPRONOUNCEABLE: `<p><strong>Texto del enlace:</strong> <i>%(TEXT)</i></p><p>${why.fix}Añada texto o un título que describa su destino, o elimínelo si es solo un error tipográfico o un carácter de espacio vinculado.</p><div class="why"><p>Consejo: Los lectores de pantalla no pueden describir enlaces que solo contengan espacios o símbolos. Quedan silenciosos ("Enlace, [...pausa incómoda donde debería estar el título del enlace...]"), o leen el nombre del símbolo.</p></div>`,

	LINK_FILE_EXT: `<p><strong>Texto del enlace:</strong> <i>%(TEXT)</i></p><p>Este enlace apunta a un archivo descargable (PDF, MP3, Zip, Word, etc.) sin advertencia.</p><p>${why.fix}Use texto o un ícono para <a href="https://itmaybejj.github.io/linkpurpose/">indicar el tipo de archivo</a> en el propio enlace.</p><p class="why">Para archivos grandes, considere incluir el tamaño. Ejemplo: "Informe anual (PDF, 3 MB)"</p>`,

	LINK_IDENTICAL_NAME: `<p><strong>Texto del enlace:</strong> <i>%(TEXT)</i></p><p>${why.fix}Reescriba los enlaces que llevan a diferentes destinos usando los títulos únicos de cada destino.</p>${why.links}`,

	LINK_IMAGE_ALT: `<p><strong>Texto alternativo:</strong> <i>%(ALT_TEXT)</i></p><p>${why.fix}Use el título del destino del enlace como texto alternativo para las imágenes vinculadas.</p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p><strong>Texto alternativo:</strong> <i>%(ALT_TEXT)</i></p><p><strong>Texto del enlace incluido el texto alternativo:</strong> <i>%(TEXT)</i></p><p>${why.fix}Modifique o elimine el texto alternativo si añade información irrelevante o redundante.</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p>Este texto alternativo tiene %(altLength) caracteres: <i class="ed11y-small">%(ALT_TEXT)</i></p><p>${why.fix}Use el título del destino del enlace como texto alternativo para las imágenes vinculadas.</p><div class="why"><p>Los usuarios de lectores de pantalla suelen oír una lista de enlaces fuera de contexto. El alt de una imagen vinculada se convierte en el título del enlace en esa lista; por tanto, debe describir el destino, no el contenido de la imagen.</p></div>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Cuando un enlace envuelve una imagen, el alt de la imagen <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">proporciona el título del enlace</a>.</p><p>${why.fix}Use el título del destino del enlace como texto alternativo para las imágenes vinculadas.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'La imagen está marcada como decorativa, aunque el enlace utiliza el texto circundante como etiqueta descriptiva.',

	LINK_MAYBE_BUTTON: `<p><strong>Enlace:</strong> <i>%(TEXT)</i></p><p>Este enlace tiene un destino no válido y su nombre sugiere que podría estar funcionando como un botón o interruptor en lugar de un enlace.</p><p>${why.fix}Use un <a href="https://www.w3.org/WAI/ARIA/apg/patterns/button/">&lt;button&gt;</a> en su lugar, o corrija el destino del enlace.</p><div class="why"><p>Consejo: las tecnologías de asistencia tratan los botones y los enlaces de manera diferente. Usar el elemento HTML correcto asegura que las personas usuarias sepan qué atajos de teclado usar y qué acción se activará.</p></div>`,

	LINK_NEW_TAB: `<p><strong>Texto del enlace:</strong> <i>%(TEXT)</i></p><p>${why.fix}Configure este enlace para que se abra en la misma pestaña o <a href="https://itmaybejj.github.io/linkpurpose/">avise a las personas usuarias</a> con antelación.</p><div class="why"><p>Las personas siempre pueden elegir abrir un enlace en una pestaña nueva. Forzar una nueva pestaña sin aviso puede resultar confuso, especialmente para quienes usan tecnologías de asistencia.</p><p>Nota: los enlaces dentro de formularios suelen abrirse en otra pestaña para evitar la pérdida de datos.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p><strong>Texto alternativo:</strong> <i>%(alt)</i>.</p><p>${why.fix}Use el título del destino del enlace como texto alternativo para las imágenes vinculadas.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Este enlace contiene texto que no ayuda a describir su destino:<br><i>%(ERROR)</i></p><p>${why.fix}Reescríbalo para describir su destino de manera concisa.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>Se proporcionó un nombre diferente mediante ARIA:</p><p><strong>Texto visible:</strong> <i>%(VISIBLE)</i></p><p><strong>Texto oculto:</strong> <i>%(HIDDEN)</i></p><p>${why.fix}Escriba enlaces significativos para todas las personas, no solo para usuarios de lectores de pantalla, y asegúrese de que la <a href="https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html">etiqueta visual de cada elemento coincida con su nombre</a>, de modo que las personas usuarias de control por voz puedan indicar a su navegador en qué enlace hacer clic.</p>${why.links}`,

	LINK_SUS_ALT: `<p>A menos que "<i>%(alt)</i>" describa el destino del enlace, este alt probablemente describe la imagen.</p><p><strong>Texto alternativo:</strong> <i>%(ALT_TEXT)</i></p><p>${why.fix}Use el título del destino del enlace como texto alternativo para las imágenes vinculadas.</p>${why.imageLinks}`,

	LINK_SYMBOLS: `<p>Símbolo encontrado: <i>%(ERROR)</i></p><p>${why.fix}Evite usar símbolos como llamadas a la acción dentro del texto del enlace a menos que estén ocultos a las tecnologías de asistencia. Los lectores de pantalla pueden leerlos en voz alta, lo que puede confundir.</p>`,

	LINK_URL: `<p><strong>Texto del enlace:</strong> <i>%(TEXT)</i></p><p>${why.fix}Cambie este enlace para usar el título de su destino o su finalidad.</p><div class="why"><p>Las personas localizan contenido por sus enlaces —especialmente quienes usan lectores de pantalla—.</p><p>Las URL como texto de enlace son difíciles de recorrer y de buscar.</p></div>`,

	META_LANG: `<p>${why.fix}Agregue un <a href="https://www.w3.org/International/questions/qa-html-language-declarations">atributo de idioma</a> en la etiqueta HTML de la página.</p><div class="why"><p>Consejo: los lectores de pantalla pronuncian las palabras según el idioma declarado. Un idioma incorrecto produce un discurso ininteligible.</p></div>`,

	META_LANG_VALID: `<p><strong>Elemento:</strong> <code>&lt;%(ELEMENT) lang="%(CODE)"&gt;</code></p><p>${why.fix}Reemplace el atributo lang con un código de idioma válido.</p><div class="why"><p>Consejo: las páginas y los elementos tienen <a href="https://www.w3.org/International/questions/qa-html-language-declarations">atributos de idioma</a> para que los lectores de pantalla y las herramientas de traducción lean el texto correctamente.</p></div>`,

	META_MAX: `<p>Esta metaetiqueta limita cuánto pueden ampliar el texto las personas usuarias.</p><p>${why.fix}Ajuste o elimine esta limitación para permitir zoom completo.</p>`,

	META_REFRESH: `<p>Las páginas no deben actualizarse automáticamente mediante una metaetiqueta, ya que interrumpe a la persona usuaria sin aviso y puede reiniciar formularios.</p><p>${why.fix}Use AJAX o JavaScript para actualizar el contenido informando a la persona usuaria y dándole la opción de retrasar el evento.</p>`,

	META_SCALABLE: `<p>Esta metaetiqueta impide que las personas amplíen el texto.</p><p>${why.fix}Permita zoom completo eliminando o ajustando este parámetro.</p>`,

	META_TITLE: `<p>${why.fix}Agregue una etiqueta <code>&lt;title&gt;</code> dentro de la etiqueta <code>head</code> de la página.</p><div class="why"><p>Un <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title">título breve y único</a> es esencial:</p><ul><li>Los motores de búsqueda lo usan para titular resultados.</li><li>Los navegadores lo usan para titular pestañas.</li><li>Los lectores de pantalla lo anuncian al cambiar de pestaña.</li></ul><p>Sin título, las personas ven u oyen una URL en bruto.</p></div>`,

	MISSING_ALT: `<p>Cuando los lectores de pantalla encuentran una imagen sin atributo alt, intentan pronunciar la URL del archivo de imagen, a menudo letra por letra.</p><p>${why.fix}Describa de manera concisa lo que significa esta imagen en este contexto.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Cuando una imagen vinculada no tiene atributo alt, los lectores de pantalla intentan pronunciar la URL del archivo de imagen, lo que es especialmente problemático.</p><p>${why.fix}Proporcione un alt que coincida con el destino del enlace.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Esta imagen forma parte de un enlace con texto. Si el texto visible describe suficientemente el destino, agregue alt="" para que la imagen sea ignorada. En caso contrario, agregue un alt que ayude a describir el destino o la finalidad del enlace.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>El enlace parece apuntar a un entorno de desarrollo:<br>{L} <code>%(LINK)</code></p><p>${why.fix}Cámbielo a una ruta relativa (/folder) o a la URL pública.</p>`,

	QA_BLOCKQUOTE: `<p><strong>Cita sospechosamente corta:</strong> <i>%(TEXT)</i></p><p>${why.fix}Si esto es un encabezado y no una cita, etiquételo como encabezado para que aparezca en el esquema de la página.</p>${why.headings}`,

	QA_DOCUMENT: `<p><strong>Enlace:</strong> <i>%(TEXT)</i></p><p>Los documentos vinculados cuentan como contenido web y deben ser accesibles. Verifique que el documento tenga encabezados etiquetados, encabezados de tabla y texto alternativo para imágenes, luego descarte esta alerta.</p><div class="why"><ul><li>Haga que su <a href="https://support.google.com/docs/answer/6199477?hl=es">documento o presentación de Google Workspace</a> sea accesible.</li><li>Haga que su <a href="https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">documento de Office</a> sea accesible.</li></ul></div>`,

	QA_FAKE_HEADING: `<p><strong>Texto en negrita:</strong> <i>%(TEXT)</i></p><p>${why.fix}Si este texto está en negrita para marcar un cambio de tema, etiquételo como encabezado para que las personas usuarias de lectores de pantalla puedan usarlo para navegar por la página.</p><div class="why"> <p>Consejo: los estilos de negrita y cursiva proporcionan énfasis visual, pero no añaden automáticamente el texto a la tabla de contenido del documento para las tecnologías de asistencia.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Si <i>%(TEXT)</i> forma parte de una lista, aplique formato de lista.</p><div class="why"><p>Las listas tienen estructura visual y técnica:</p><ol><li>Alinean sus elementos y mejoran la lectura.</li><li>Son legibles por máquina: los lectores de pantalla anuncian "ítem 3 de 7".</li></ol><p>Un párrafo que empieza con un número no es una lista real.</p></div>`,

	QA_IN_PAGE_LINK: `<p><strong>URL:</strong> <i>#%(ID)</i></p><p><strong>Enlace:</strong> <code>%(TEXT)</code></p><p>El destino de este enlace no coincide con ningún elemento de la página.</p><div class="why"><p>Nota para desarrolladores: si el enlace dispara un evento JavaScript, pruebe su funcionamiento con teclado antes de añadirlo a la lista de exclusión.</p></div>`,

	QA_JUSTIFY: `<p>El texto justificado añade espacios irregulares, lo que dificulta la lectura a muchas personas.</p><p>${why.fix}Use alineación a la izquierda.</p>`,

	QA_NESTED_COMPONENTS: 'Evite anidar componentes interactivos, como colocar acordeones dentro de otros acordeones o pestañas dentro de acordeones. Esto complica la navegación y puede hacer que se pase por alto contenido.',

	QA_PDF: `<p><strong>Enlace:</strong> <i>%(TEXT)</i></p><p>${why.fix}Haga una de las siguientes acciones y luego descarte esta alerta:</p><ul><li>Vincule a una página web en lugar del PDF,</li><li>o proporcione también una página web o un documento editable,</li><li>o, como mínimo, asegúrese de que el PDF sea accesible (títulos, orden de lectura por columnas, encabezados de tabla, textos alternativos).</li></ul><div class="why"><p>Las personas usuarias móviles y de tecnologías de asistencia suelen preferir páginas web a PDFs, que no se adaptan al tamaño de pantalla y a menudo carecen del etiquetado necesario.</p></div>`,

	QA_SMALL_TEXT: `<p><strong>Texto:</strong> <i>%(TEXT)</i></p><p>${why.fix}Manténgase por encima del 80 % del tamaño de fuente predeterminado. El texto pequeño es difícil de leer, especialmente para personas con baja visión.</p>`,

	QA_STRONG_ITALICS: `<p><strong>Texto:</strong> <i>%(TEXT)</i></p><p>${why.fix}Reserve negritas y cursivas para palabras o frases clave.</p><div class="why"><p>Nota: si se trata de una cita, use la etiqueta <em>blockquote</em>.</p></div>`,

	QA_SUBSCRIPT: `<p><strong>Texto:</strong> <i>%(TEXT)</i></p><p>Los subíndices y superíndices hacen el texto más pequeño y difícil de leer. Úselos solo para casos específicos, como números ordinales (4<sup>º</sup>), fórmulas (H<sub>2</sub>O) o referencias a notas.</p>`,

	QA_UNDERLINE: `<p>En la Web, el subrayado se usa para enlaces, no para énfasis. Las personas creerán que se puede hacer clic: <i><u>%(TEXT)</u></i></p><p>${why.fix}Use <strong>negrita</strong> o <em>cursiva</em> para énfasis, y encabezados para la estructura.</p><div class="why"><p>Nota: los lectores de pantalla no anuncian el formato visual como el subrayado. Solo los encabezados añaden estructura.</p></div>`,

	QA_UPPERCASE: `<p><strong>Texto:</strong> <i>%(TEXT)</i></p><p>${why.fix}Use mayúsculas solo en unas pocas palabras para enfatizar. LOS BLOQUES DE TEXTO EN MAYÚSCULAS SON MÁS DIFÍCILES DE LEER, Y MUCHAS PERSONAS LOS INTERPRETAN COMO GRITOS.</p><div class="why"><p>Nota: los lectores de pantalla no anuncian el formato solo visual como el texto en mayúsculas. Use un estilo de encabezado si este texto destacado introduce un cambio de tema o contenido de importancia crítica.</p></div>`,

	SUS_ALT: `<p>El alt de esta imagen incluye la palabra "<i>%(alt)</i>." Los lectores de pantalla anuncian que están describiendo una imagen cuando leen el texto alternativo, por lo que frases como «imagen de» o «foto de» suelen ser redundantes.</p><p><strong>Texto alternativo:</strong> <i>%(ALT_TEXT)</i></p><p>${why.fix}Describa de manera concisa lo que significa esta imagen en este contexto.</p><div class="why"><p>Consejo: estas frases vale la pena conservarlas si el formato en sí tiene significado:<br>«Una foto de un gato, enmarcada y colgada en la pared.»</p></div>`,

	TABINDEX_ATTR: `<p>Los valores de tabindex mayores que 0 sacan los elementos enfocables de su orden visual, lo que dificulta a las personas usuarias de tecnologías de asistencia localizarlos y operarlos.</p><p>${why.fix}Cambie el orden de los elementos en el HTML para que el orden de foco y el orden de lectura coincidan.</p><div class="why"><p>Consejo: el orden visual de las palabras en la página y el orden en que el teclado tabula por los elementos suelen ser el mismo.</p><p>Asignar un tabindex positivo a un elemento lo mueve al inicio del orden de tabulación, <strong>pero no del orden visual ni de lectura</strong>.</p></div>`,

	TABLES_EMPTY_HEADING: `<p>${why.fix}Asegúrese de que cada celda de encabezado contenga texto.</p><div class="why"><p>Consejo: los lectores de pantalla usan los encabezados para orientar a las personas dentro de una tabla.</p></div>`,

	TABLES_INVALID_HEADERS_REF: `<p>Esta tabla intenta asociar una celda de datos concreta con una celda de encabezado concreta, pero no se encuentra el ID del encabezado: <code>%(VALUE)</code>.</p><p>${why.fix}Asegúrese de que cada atributo <code>headers</code> coincida con el ID de una celda de encabezado de la misma tabla.</p><div class="why">Consejo: <a href="https://www.w3.org/WAI/WCAG22/Techniques/html/H43">usar referencias de ID manuales</a> para asociar celdas de datos con celdas de encabezado es complicado y frágil. Cuando sea posible, divida los datos complejos en tablas más pequeñas con filas y columnas de encabezado simples.</div>`,

	TABLES_MISSING_HEADINGS: `<p>${why.fix}Edite las propiedades de la tabla e indique si los encabezados están en la primera fila, la primera columna o en ambas.</p><div class="why"><p>Consejo: los lectores de pantalla repiten el encabezado pertinente al entrar en cada columna o fila. Si esta tabla no tiene encabezados porque solo se usa para diseño visual, elimine el formato de tabla y use columnas solo visuales.</p></div>`,

	TABLES_SEMANTIC_HEADING: `<p>${why.fix}Elimine este formato de encabezado (h2, h3). Proporcione filas o columnas de encabezado en su lugar. Si necesita múltiples niveles de encabezado, divida la información en más de una tabla.</p><div class="why"><p>Consejo: los encabezados de tabla son direccionales (fila o columna). Los encabezados de contenido etiquetan todo lo que sigue, incluso en columnas no relacionadas:</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Un <strong>encabezado de tabla</strong> en la celda 2 etiqueta la celda B. <br><br> Un <strong>encabezado de contenido</strong> etiqueta las celdas 3, A, B y C, así como este texto y el pie de este tooltip.</td></tr><tr><td>A</td><td>B</td><td>C</td></tr></table></div>`,
}

const interfaceStrings = {
	ALERT_CLOSE: 'Cerrar',
	ALT: 'Texto alternativo: ',
	CONSOLE_ERROR:
		'Hay un problema con el comprobador de accesibilidad en esta página. Por favor <a class="g-link">repórtelo en GitHub</a>. Información de depuración:',
	DECORATIVE: 'Marcado como decorativo',
	DISMISS: 'Ignorar',
	DISMISS_ALL: 'En esta página: ignorar',
	edit_page: 'Editar página',
	edit_layout: 'Editar diseño',
	edit_media: 'Editar multimedia',
	edit_term: 'Editar término',
	edit_user: 'Editar usuario',
	IMAGES: 'Texto alternativo',
	MAIN_TOGGLE_LABEL: 'Activar herramientas de accesibilidad',
	MISSING: '(faltante!)',
	NOT_VISIBLE: 'Nota: este contenido puede no ser visible. Búsquelo dentro del contenedor delineado.',
	NO_IMAGES: 'No se encontraron imágenes.',
	OUTLINE: 'Encabezados',
	PANEL_DISMISS_BUTTON: `Mostrar %(dismissCount) alertas ocultas`,
	PANEL_HEADING: 'Mostrar visualizadores',
	SKIP_TO_ISSUE: 'Mostrar alerta',
	WARNING: 'revisión manual',
	WARNINGS: 'revisiones manuales',
	buttonFirstContent: 'Mostrar la primera alerta',
	buttonHideHiddenAlert: 'Ocultar alerta oculta',
	buttonHideHiddenAlerts: `Ocultar %(count) alertas ocultas`,
	buttonShowHiddenAlert: 'Mostrar alerta oculta',
	buttonToolsActive: 'Ocultar visualizadores',
	dismissActions: `Similares`,
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
	main_toggle_1: 'Una alerta de accesibilidad',
	main_toggle_2: 'Dos alertas de accesibilidad',
	main_toggle_plural: ` alertas de accesibilidad`,
	MISSING_ROOT: `Editoria11y no encontró ningún elemento que coincida con la configuración del área de verificación: <code>%(root)</code>`,
	panelCheckAltText: `Verifique que cada imagen describa lo que significa en contexto y que no haya imágenes que contengan texto.`,
	panelCheckOutline: `Esto muestra el esquema de encabezados. Verifique que coincida con la organización visual del contenido.`,
	panel_HEADING_MISSING_ONE: 'Falta el Encabezado 1.',
	PANEL_NO_HEADINGS: 'No se encontraron encabezados.',
	reportsLink: 'Abrir reportes del sitio',
	toggleDisabled: 'No hay contenido disponible para que Editoria11y lo revise.',
	transferFocus: 'Editar este contenido',
	unDismissHideButton: 'Restaurar esta alerta ignorada',
	unDismissNotePermissions: 'Esta revisión ha sido ocultada por un administrador',
	unDismissOKButton: 'Restaurar esta alerta marcada como OK',
};

export const lang = {
	strings: Object.assign(Sa11yStrings.strings, interfaceStrings, tips),
	testNames: testNames,
}
