import strings from '../sa11y-lang/ptPT.js';

// todo check each file for link integrity, and escaping of tags in code blocks.
export const testNames = {
	ALT_FILE_EXT: 'Este texto alternativo é um nome de ficheiro, não uma descrição',
	ALT_MAYBE_BAD: 'Este texto alternativo pode não ser pronunciado corretamente por um leitor de ecrã',
	ALT_PLACEHOLDER: 'Este texto alternativo é um marcador de posição sem significado',
	ALT_UNPRONOUNCEABLE: 'Este texto alternativo é impossível de pronunciar',
	BTN_EMPTY: 'O botão não tem um rótulo acessível',
	BTN_EMPTY_LABELLEDBY: 'O botão tem um rótulo ARIA inválido',
	BTN_ROLE_IN_NAME: 'O nome do botão repete a palavra “button”',
	CONTRAST_ERROR: 'O texto não tem contraste suficiente para ser lido com conforto',
	CONTRAST_ERROR_GRAPHIC: 'A imagem ou o ícone não têm contraste suficiente',
	CONTRAST_INPUT: 'O campo de entrada não tem contraste suficiente para leitura confortável',
	CONTRAST_PLACEHOLDER: 'O texto do marcador de posição não tem contraste suficiente',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Este texto de marcador de posição tem contraste suficiente?',
	CONTRAST_WARNING: 'Este texto tem contraste suficiente?',
	CONTRAST_WARNING_GRAPHIC: 'Esta imagem ou ícone têm contraste suficiente?',
	DUPLICATE_ID: 'Atributo ID duplicado',
	DUPLICATE_TITLE: 'Esta ligação tem um tooltip com o mesmo texto da ligação',
	EMBED_AUDIO: 'Este conteúdo áudio tem transcrição?',
	EMBED_DATA_VIZ: 'Esta visualização é acessível?',
	EMBED_GENERAL: 'Iframes incorporados exigem verificação manual',
	EMBED_MISSING_TITLE: 'Frame sem atributo “title”',
	EMBED_UNFOCUSABLE: 'Um frame com tabindex="‑1" não será acessível por teclado',
	EMBED_VIDEO: 'Este vídeo tem legendas corretas?',
	HEADING_EMPTY: 'Este cabeçalho não tem texto',
	HEADING_EMPTY_WITH_IMAGE: 'Esta imagem é usada como cabeçalho e precisa de texto alternativo',
	HEADING_FIRST: 'O primeiro cabeçalho nesta página é um sub‑cabeçalho',
	HEADING_LONG: 'Este cabeçalho pode ser mais curto?',
	HEADING_MISSING_ONE: 'Falta um cabeçalho de nível 1 nesta página',
	HEADING_SKIPPED_LEVEL: 'Este cabeçalho está marcado no nível incorreto',
	HIDDEN_FOCUSABLE: 'Este elemento não pode ser adequadamente descrito por leitores de ecrã',
	IMAGE_ALT_TOO_LONG: 'Este texto alternativo pode ser mais curto?',
	IMAGE_DECORATIVE: 'Esta imagem é realmente apenas decorativa?',
	IMAGE_DECORATIVE_CAROUSEL: 'Imagem em carrossel/galeria marcada como decorativa',
	IMAGE_FIGURE_DECORATIVE: 'Verificação manual: imagem com legenda, mas sem texto alternativo',
	IMAGE_FIGURE_DUPLICATE_ALT: 'O texto alternativo não deve ser idêntico ao texto da legenda',
	LABELS_ARIA_LABEL_INPUT: 'Existe um rótulo visível para este campo?',
	LABELS_PLACEHOLDER: 'Verificação manual: texto de marcador de posição',
	LABELS_INPUT_RESET: 'Este botão “Limpar” é necessário?',
	LABEL_IN_NAME: 'O rótulo visível não corresponde ao nome acessível',
	LINK_ALT_FILE_EXT: 'O alt usado como ligação não deve ser um URL',
	LINK_ALT_MAYBE_BAD: 'Este alt em ligação pode não ser pronunciado corretamente por leitores de ecrã',
	LINK_ALT_UNPRONOUNCEABLE: 'Imagens usadas como ligação precisam de texto alternativo pronunciável',
	LINK_CLICK_HERE: 'Verificação manual: a ligação contém “clique aqui”',
	LINK_DOI: 'Ligue títulos de artigos, não números DOI',
	LINK_EMPTY: 'Esta ligação não tem texto',
	LINK_EMPTY_LABELLEDBY: 'Ligação com atributo “aria‑labelledby” inválido',
	LINK_EMPTY_NO_LABEL: 'Esta ligação precisa de um rótulo',
	LINK_FILE_EXT: 'A ligação abre um ficheiro sem aviso prévio',
	LINK_IDENTICAL_NAME: 'Esta ligação descreve o destino de forma clara e única?',
	LINK_IMAGE_ALT: 'Verificação manual: imagem usada como ligação com alt‑texto',
	LINK_IMAGE_ALT_AND_TEXT: 'Este alt tem significado no contexto desta ligação?',
	LINK_IMAGE_LONG_ALT: 'O alt desta imagem usada como ligação pode ser mais curto?',
	LINK_IMAGE_NO_ALT_TEXT: 'Esta imagem usada como ligação precisa de texto alternativo',
	LINK_IMAGE_TEXT: 'Verificação manual: imagem dentro de ligação marcada como decorativa',
	LINK_NEW_TAB: 'Esta ligação abre um novo separador sem aviso?',
	LINK_PLACEHOLDER_ALT: 'Esta imagem usada como ligação precisa de texto alternativo significativo',
	LINK_STOPWORD: 'Esta ligação descreve o seu destino?',
	LINK_STOPWORD_ARIA: 'Texto de ligação significativo disponível apenas via ARIA',
	LINK_SUS_ALT: 'Este alt descreve a imagem ou o destino da ligação?',
	LINK_SYMBOLS: 'Verificação manual: os símbolos/emoji na ligação são significativos?',
	LINK_URL: 'O texto da ligação não deve ser um URL',
	META_LANG: 'Falta a meta tag para o idioma da página',
	META_MAX: 'A meta tag limita a ampliação do texto pelo utilizador',
	META_REFRESH: 'A meta tag atualiza automaticamente a página',
	META_SCALABLE: 'A meta tag impede que o utilizador aumente o texto',
	META_TITLE: 'Falta a meta tag do título da página',
	MISSING_ALT: 'HTML inválido: imagem sem atributo alt',
	MISSING_ALT_LINK: 'HTML inválido: imagem usada como ligação sem atributo alt',
	MISSING_ALT_LINK_HAS_TEXT: 'HTML inválido: imagem dentro de ligação sem atributo alt',
	QA_BAD_LINK: 'Verificação manual: a ligação pode ter destino inválido',
	QA_BLOCKQUOTE: 'Esta citação deveria ser um cabeçalho?',
	QA_DOCUMENT: 'Este documento está devidamente marcado para leitores de ecrã?',
	QA_FAKE_HEADING: 'Este texto a negrito deveria ser um cabeçalho?',
	QA_FAKE_LIST: 'Isto deveria ser formatado como lista?',
	QA_IN_PAGE_LINK: 'Ligação interna quebrada',
	QA_JUSTIFY: 'Evite justificar texto',
	QA_NESTED_COMPONENTS: 'Componentes interativos aninhados',
	QA_PDF: 'Existe alternativa para este PDF?',
	QA_SMALL_TEXT: 'O texto está demasiado pequeno',
	QA_STRONG_ITALICS: 'Blocos grandes de texto enfatizado (negrito/itálico) dificultam a leitura',
	QA_SUBSCRIPT: 'Não utilize superíndice/subscrito apenas para efeito visual',
	QA_UNDERLINE: 'Apenas ligações devem estar sublinhadas',
	QA_UPPERCASE: 'Este texto em maiúsculas é realmente necessário?',
	SUS_ALT: 'Este texto alternativo contém palavras redundantes?',
	TABINDEX_ATTR: 'O atributo tabindex pode perturbar a ordem de leitura',
	TABLES_EMPTY_HEADING: 'Esta célula de cabeçalho precisa de texto',
	TABLES_MISSING_HEADINGS: 'Esta tabela precisa de linha de cabeçalhos e/ou cabeçalhos de coluna',
	TABLES_SEMANTIC_HEADING: 'Cabeçalhos de conteúdo não devem ser usados dentro de tabelas',
	UNCONTAINED_LI: 'Lista HTML inválida',
};

const why = {
	fix: `<strong class="badge">Como corrigir</strong>`,
	check: `<strong class="badge">Verificação manual</strong>`,

	buttons: `<div class="why"><p>Nota: o nome acessível de um botão deve deixar claro o que faz. Botões que mudam de estado após clique também devem alterar o nome:</p><ul>
<li>Rótulos que mudam:<br>“Reproduzir/Pausar”, “Mostrar detalhes/Ocultar detalhes”</li>
<li>Mudança em https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_propertiesatributos de estado ARIA</a>:<br>“Reproduzir/Reproduzir, premido”, “Detalhes, recolhido/Detalhes, expandido”.</li>
</ul>
<p>Não altere simultaneamente o rótulo <em>e</em> o estado. Trocar “Reproduzir” por “Pausar, premido” transmite pausa — não reprodução.</p></div>`,

	headings: `<div class="why"><p>Dica: cabeçalhos e sub‑cabeçalhos organizam o conteúdo numa hierarquia. Utilizadores de leitores de ecrã dependem desta estrutura para compreender e navegar:</p>
<ul><li>Cabeçalho nível 1: título da página
<ul><li>Cabeçalho nível 2: temas principais
<ul><li>Cabeçalho nível 3: subtemas</li></ul></li></ul></li></ul></div>`,

	images: `<div class="why"><p>Dica: descreva no alt o <em>significado</em> da imagem no contexto, não apenas o que se vê. Uma fotografia de uma criança a chutar a bola pode significar:</p>
<ul><li>O jogo continuou apesar da chuva intensa.</li>
<li>Os novos equipamentos têm um logótipo de dragão apelativo.</li>
<li>Ela marcou o golo da vitória pela ala esquerda!</li></ul></div>`,

	links: `<div class="why"><p>As pessoas percorrem páginas olhando para as ligações e procuram pelo nome. Por isso, ligações eficazes devem ser significativas, únicas e concisas:</p>
<ul>
<li>Ideal: “Saiba mais sobre https://webaim.org/techniques/hypertext/link_textligações significativas</a>”.</li>
<li>Não única: “Clique https://webaim.org/techniques/hypertext/link_textaqui</a> para saber mais…”.</li>
<li>Não concisa: “https://webaim.org/techniques/hypertext/link_textClique aqui para saber mais sobre ligações significativas</a>”.</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>O propósito do alt é transmitir o <em>significado</em> da imagem. Se a imagem é uma ligação, o significado é o destino/função da própria ligação:</p>
<ul>
<li>“<em>Lupa</em>” descreve a imagem, não a ligação.</li>
<li>“<em>Lupa de pesquisa</em>” é ambíguo.</li>
<li>“<em>Pesquisar</em>” descreve corretamente a finalidade/destino.</li>
</ul></div>`,
};

const tips = {
	ALT_FILE_EXT: `<p>Leitores de ecrã anunciam a URL, muitas vezes letra a letra — o que raramente transmite o mesmo sentido que ver a imagem.</p><p>${why.fix}Use alt vazio (alt="") se for decoração sem significado; caso contrário, forneça texto alternativo descritivo.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Descrição fornecida: <strong>"%(alt)"</strong></p><p>${why.fix}Defina um alt conciso que expresse o que a imagem significa neste contexto.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Descrição fornecida: <strong>"%(alt)"</strong></p><p>${why.fix}Defina um alt conciso que expresse o que a imagem significa neste contexto.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>O alt “%(alt)” contém apenas símbolos/espaços impronunciáveis. O leitor anuncia “imagem” e segue-se silêncio: “imagem: ____”.</p><p>${why.fix}Forneça alt descritivo ou alt="" quando o elemento deva ser ignorado (p. ex., ícone decorativo).</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Forneça um nome acessível por meio de texto, alt no ícone ou atributo <code>title</code>.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p><code>aria-labelledby</code> está vazio ou aponta para um <code>ID</code> inexistente.</p><p>${why.fix}Aponte para um ID válido ou remova o atributo e nomeie o botão por outro método.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'Imagem de fundo/gradiente impede identificar com segurança a cor de fundo. Utilize o seletor de cor para confirmar manualmente.',

	DUPLICATE_ID: `<p>IDs funcionam como rótulos/destinos de ligação; portanto, têm de ser únicos.</p><p>${why.fix}Altere este ID: <strong>#%(id)</strong></p><div class="why"><p>Em muitos CMS vem de “name/id”. Em HTML é o atributo: <code><a id="MY-ID"></a></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Remova o atributo <code>title</code> desta ligação.</p><div class="why"><p>Tooltips <code>title</code> só aparecem com rato (não ao teclado ou em telemóvel) e não devem conter informação essencial.</p></div>`,

	EMBED_AUDIO: `<p>Se houver fala, forneça uma https://www.w3.org/WAI/media/av/transcribing/alternativa em texto</a> na página ou em ligação.</p><p>Legendagens/transcrições automáticas requerem revisão humana (locutores e sons relevantes).</p>`,

	EMBED_DATA_VIZ: `<p>Visualizações incorporadas podem ser difíceis para tecnologias de apoio, pouco claras para baixa visão/daltonismo e exigir scroll horizontal em telemóvel.</p><p>${why.fix}Se não houver alto contraste, operação total por teclado <strong><em>e</em></strong> descrição interpretável por leitores de ecrã, forneça alternativa equivalente (descrição, tabela, download) antes de ignorar o alerta.</p>`,

	EMBED_GENERAL: 'Ferramentas automáticas não analisam conteúdo dentro de embeds. Garanta alt em imagens, legendas em vídeos, contraste suficiente e ligações/botões https://webaim.org/techniques/keyboard/acessíveis por teclado</a>. Depois, ignore o alerta.',

	EMBED_MISSING_TITLE: `<p>Os elementos incorporados precisam de nome acessível que descreva o conteúdo.</p><p>${why.fix}Forneça <code>title</code> ou <code>aria-label</code> exclusivos.</p>`,

	EMBED_UNFOCUSABLE: `O atributo indica a teclado/AT para ignorarem o elemento. Se o iframe tiver ligações/botões/formulários ou rolagem, remova-o.`,

	EMBED_VIDEO: `<p>Vídeos devem ter legendas.</p><p>Legendagens automáticas necessitam de correção (falas/efeitos).</p><p>${why.fix}Inclua ou corrija as legendas e, depois, ignore o alerta.</p>`,

	HEADING_EMPTY: `<p>Cabeçalhos vazios criam lacunas na estrutura.</p><p>${why.fix}Adicione texto ou remova a linha vazia.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Cabeçalhos vazios desorganizam a estrutura.</p><p>${why.fix}Se não for cabeçalho, mude de <strong {C}>Cabeçalho %(level)</strong> para <strong>Parágrafo</strong>. Se for, descreva o significado da imagem no alt.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Marque o título da página como Cabeçalho 1 ou 2. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}Se não for um título formal, reduza para melhorar a leitura rápida.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Marque o título como nível 1 para iniciar a estrutura do documento.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Salto de <strong>%(prevLevel)</strong> para <strong>%(level)</strong>. Em leitores de ecrã, soa a conteúdo em falta.</p><p>${why.fix}Ajuste os níveis para manter a hierarquia correta.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: `Este elemento tem <code>aria-hidden="true"</code> mas recebe foco por teclado. Para o esconder de leitores, adicione <code>tabindex="-1"</code>; caso contrário, remova <code>aria-hidden</code>.`,

	IMAGE_ALT_TOO_LONG: `<p>Leitores pronunciam o alt como uma frase única; quando longo, é difícil voltar a partes específicas.</p><p>Comprimento: %(altLength) caracteres. <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Dica: imagens complexas costumam exigir <strong>legenda visível</strong> ou descrição detalhada — e o alt pode remeter para ela.</p></div>`,

	IMAGE_DECORATIVE: `<p>Imagem ocultada por alt vazio. Apenas itens sem significado informativo devem ser marcados assim.</p><p>${why.fix}Se a imagem tem informação, forneça alt.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'Marcada como <strong>decorativa</strong>, mas em carrosséis/galerias recomenda‑se alt descritivo para todas as imagens.',

	IMAGE_FIGURE_DECORATIVE: `<p>A imagem será ignorada por tecnologias de apoio. A legenda sozinha é suficiente?</p><p>${why.fix}Se não for, complemente com alt o que a legenda não descreve.</p><div class="why"><p>Dica: imagem, alt e legenda funcionam em conjunto.</p></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Altere o alt para descrever o significado visual (evite repetir a legenda).</p><div class="why"><p>Dica: a legenda oferece contexto; o alt descreve o que a legenda referencia.</p></div>`,

	LABELS_ARIA_LABEL_INPUT: `<p><strong {B}>Rótulo invisível do campo:</strong> <strong {C}>%(TEXT)</strong></p><p>Verifique se há rótulo visível, se permanece após escrever e se coincide com o nome acessível.</p><div class="why"><p>Rótulos apenas via <em>placeholder</em>/<em>title</em> desaparecem ao escrever e dificultam validação.</p></div>`,

	LABELS_INPUT_RESET: `<p>Botões “Limpar” são frequentemente acionados por engano e podem causar perda de dados.</p><p>${why.fix}Se não limpar apenas um campo, remova ou peça confirmação.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'Botão‑imagem sem alt. Forneça alt funcional, p. ex., <em>Pesquisar</em> ou <em>Enviar</em>.',

	LABELS_MISSING_LABEL: 'Campo sem rótulo associado. Adicione <code>id</code> ao campo e <code>for</code> correspondente no <code>label</code>.',

	LABELS_NO_FOR_ATTRIBUTE: 'Este campo não tem rótulo associado. No <code>label</code>, adicione <code>for</code> igual ao <code>id</code> do campo.<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>Placeholder desaparece ao escrever, pode ter baixo contraste e ser confundido com conteúdo.</p><p>${why.fix}Garanta que rótulos, instruções e requisitos se mantenham visíveis.</p>`,

	LABEL_IN_NAME: `<p>O rótulo visível difere do nome acessível, confundindo leitores de ecrã e comandos de voz.</p><p>${why.check}Certifique‑se de que o rótulo visível começa pelo nome acessível e não acrescenta nova informação.</p><p><strong>Rótulo invisível:</strong> “%(TEXT)”</p>`,

	LINK_ALT_FILE_EXT: `<p>O alt contém “%(alt)”, provavelmente um nome de ficheiro, não o destino da ligação.</p><p>${why.fix}Defina o alt para descrever o destino/finalidade da ligação.</p><div class="why"><p>O alt transmite significado; em imagem‑ligação, o significado é o destino.</p></div>`,

	LINK_ALT_MAYBE_BAD: `<p>Alt desta imagem é um placeholder: “<strong>%(alt)</strong>”.</p><p>${why.fix}Defina o alt de acordo com o destino da ligação.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>Alt “%(ALT_TEXT)” contém caracteres impronunciáveis; não descreve a ligação.</p><p>${why.fix}Use alt que descreva a função/destino da ligação.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `Evite “clique aqui” — não comunica a finalidade.`,

	LINK_DOI: `<p>${why.fix}Ligue o título do artigo; apresente o DOI como texto simples.</p><div class="why"><p>Ligações descritivas facilitam a procura e o anúncio por leitores de ecrã.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Forneça texto descritivo ou remova a ligação se for erro (p. ex., espaço ligado).</p><div class="why"><p>Ligações vazias provocam silêncio ou soletração da URL.</p><p>Em alguns editores, remover o espaço ligado exige reescrever o trecho.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p><code>aria-labelledby</code> não aponta para um <code>ID</code> válido.</p><p>${why.fix}Corrija a referência ou remova o atributo.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Adicione texto descritivo ou elimine a ligação vazia.</p><div class="why"><p>Leitores de ecrã não conseguem anunciar ligações vazias de forma útil.</p></div>`,

	LINK_FILE_EXT: `<p>Esta ligação abre um ficheiro (PDF/MP3/ZIP/DOC) sem aviso.</p><p>${why.fix}Identifique o tipo de ficheiro no próprio texto/ícone da ligação: https://itmaybejj.github.io/linkpurpose/</a>.</p><p class="why">Para ficheiros grandes, indique o tamanho (ex.: “Relatório (PDF, 3 MB)”).</p>`,

	LINK_IDENTICAL_NAME: `<p>Várias ligações para destinos diferentes usam o mesmo texto: “<strong>%(TEXT)</strong>”.</p><p>${why.fix}Diferencie os textos de acordo com o destino.</p>${why.links}`,

	LINK_IMAGE_ALT: `Verifique se o alt descreve o destino da ligação:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Confirme que o alt contribui para descrever a ligação sem redundância:</p><p><strong class="badge">Alt</strong> “<em><strong>%(alt)</strong></em>”</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p>O alt de uma imagem ligada deve descrever o destino; textos longos tendem a descrever o aspeto visual.</p>Este alt tem %(altLength) caracteres: <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Quando a ligação contém uma imagem, o alt torna‑se https://webaim.org/techniques/hypertext/link_text#alt_linko rótulo da ligação</a>.</p><p>${why.fix}Descreva no alt a função/destino.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'A imagem está marcada como decorativa, enquanto o rótulo visível vem do texto adjacente.',

	LINK_NEW_TAB: `<p>${why.fix}Abra no mesmo separador ou https://itmaybejj.github.io/linkpurpose/avise antecipadamente</a> que abrirá em novo separador.</p><div class="why"><p>Forçar novo separador pode confundir (o botão “voltar” comporta‑se de forma diferente). Em formulários, às vezes evita perda de dados.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>Alt é um placeholder: “<strong>%(alt)</strong>”.</p><p>${why.fix}Defina o alt de acordo com o destino.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>A ligação contém texto que não descreve o destino:<br><strong>%(text)</strong></p><p>${why.fix}Reescreva para uma descrição curta e clara da finalidade/destino.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>Há nome acessível via ARIA, mas o texto visível é genérico: “<strong {C}>%(ERROR)</strong>”.</p><p>${why.fix}Forneça texto visível significativo e compatível com o nome acessível.</p>${why.links}`,

	LINK_SUS_ALT: `<p>O alt contém “%(alt)”, sinal de que descreve a imagem e não o destino.</p><strong class="badge">Alt‑texto</strong> “%(ALT_TEXT)”<p>Correção: descreva a finalidade/destino da ligação.<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Evite símbolos como call‑to‑action na ligação (a menos que estejam ocultos de AT). Podem ser lidos de forma confusa. Considere remover: <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Use um título/propósito do destino em vez de URL como texto da ligação.</p><div class="why"><p>Utilizadores — especialmente com leitor de ecrã — procuram ligações pelo nome.</p><p>URLs como texto dificultam varredura e pesquisa.</p></div>`,

	META_LANG: `<p>${why.fix}Adicione https://www.w3.org/International/questions/qa-html-language-declarationso atributo de idioma</a> ao elemento <code>html</code>.</p><div class="why"><p>Leitores de ecrã dependem do idioma para pronunciar corretamente; idioma incorreto prejudica a compreensão.</p></div>`,

	META_MAX: `<p>Esta meta tag limita o zoom.</p><p>${why.fix}Permita zoom completo removendo/ajustando a restrição.</p>`,

	META_REFRESH: `<p>Atualizações automáticas interrompem o utilizador e podem causar perda de dados de formulários.</p><p>${why.fix}Use AJAX/JS com aviso e opção de adiar.</p>`,

	META_SCALABLE: `<p>Esta meta tag impede ampliar.</p><p>${why.fix}Remova/ajuste para permitir zoom.</p>`,

	META_TITLE: `<p>${why.fix}Inclua <code><title></code> dentro de <code><head></code>.</p><div class="why"><p>Um https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/titletítulo curto e único</a> é essencial: motores de busca, separadores e leitores de ecrã dependem dele.</p><p>Sem título, o utilizador vê/ouve apenas a URL.</p></div>`,

	MISSING_ALT: `<p>Sem alt, leitores tendem a anunciar a URL do ficheiro (por vezes, letra a letra).</p><p>${why.fix}Use alt="" para decoração; para conteúdo, forneça alt descritivo.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Imagem em ligação sem alt leva à leitura da URL — especialmente problemático.</p><p>${why.fix}Forneça alt que descreva a função/destino da ligação.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>A imagem está numa ligação com texto. Se o texto já descreve o destino, use alt=""; caso contrário, inclua alt com a finalidade/destino.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>A ligação parece apontar para ambiente de desenvolvimento:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Use caminho relativo (/pasta) ou URL pública.</p>`,

	QA_BLOCKQUOTE: `<p><code>blockquote</code> sinaliza citação. Citações curtas são frequentemente cabeçalhos.</p><p>${why.fix}Se for cabeçalho, aplique estilo de cabeçalho.</p>${why.headings}`,

	QA_DOCUMENT: `<p>Documentos ligados são conteúdo web e devem ser acessíveis. Verifique cabeçalhos, cabeçalhos de tabela e alt‑textos; depois, ignore o alerta.</p><ul class="why"><li>Torne o seu https://support.google.com/docs/answer/6199477?hl=pt-PTdocumento Google</a> acessível.</li><li>Torne os seus https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155documentos Office</a> acessíveis.</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}Se o texto a negrito introduz um tópico novo, use um cabeçalho real em vez de apenas formatação visual.</p><div class="why"><p>Cabeçalhos criam uma estrutura navegável para tecnologias de apoio.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Se “%(text)” é um item de lista, aplique a formatação de lista.</p><div class="why"><p>Listas acrescentam estrutura visual e semântica (leitores anunciam “item 3 de 7”).</p></div>`,

	QA_IN_PAGE_LINK: `<p>O destino desta âncora interna não existe na página.</p><div class="why"><p>Para programadores: se depende de JavaScript, valide o funcionamento por teclado antes de ignorar.</p></div>`,

	QA_JUSTIFY: `<p>Justificar cria espaços irregulares que dificultam a leitura.</p><p>${why.fix}Prefira alinhamento à esquerda.</p>`,

	QA_NESTED_COMPONENTS: 'Evite componentes interativos aninhados (abas em abas, acordeões em acordeões), pois dificultam a navegação e aumentam a carga cognitiva.',

	QA_PDF: `<p>${why.fix}Faça uma das opções e, depois, ignore:</p><ul><li>Ligue para uma página web em vez do PDF;</li><li>ou forneça também versão HTML/editável;</li><li>ou, no mínimo, garanta marcação acessível (cabeçalhos, ordem de leitura, cabeçalhos de tabela, alt‑textos).</li></ul><div class="why"><p>Muitos utilizadores — sobretudo em telemóvel e com tecnologias de apoio — preferem HTML a PDF.</p></div>`,

	QA_SMALL_TEXT: 'Texto muito pequeno prejudica a leitura, especialmente para baixa visão. Evite tamanhos inferiores ao padrão.',

	QA_STRONG_ITALICS: `<p>${why.fix}Use negrito/itálico com moderação, apenas para pontos-chave.</p><div class="why"><p>Se for citação, utilize <code>blockquote</code>.</p></div>`,

	QA_SUBSCRIPT: `Superíndices/subscritos tornam o texto pequeno e menos legível. Use apenas em 4.º, H<sub>2</sub>O, referências, etc.`,

	QA_UNDERLINE: `<p>No contexto web, sublinhado indica ligação; os utilizadores esperam clicabilidade.</p><p>${why.fix}Use <strong>negrito</strong> ou <em>itálico</em> para ênfase e cabeçalhos para estruturar.</p><div class="why"><p>Leitores não anunciam estilos visuais; cabeçalhos dão estrutura.</p></div>`,

	QA_UPPERCASE: `<p>BLOCOS EM MAIÚSCULAS SÃO MENOS LÉGIVEIS E PODEM SOAR COMO “GRITOS”.</p><p>${why.fix}Destaque poucas palavras em negrito em vez de usar maiúsculas.</p><div class="why"><p>Leitores não anunciam negrito; para novo tópico, use cabeçalho.</p></div>`,

	SUS_ALT: `<p>O alt contém “%(alt)”, provavelmente redundante:</p><p><strong class="badge">Alt‑texto</strong> “%(ALT_TEXT)”</p><p>Correção: reescreva de forma breve e significativa.</p><div class="why"><p>Dica: “imagem de …” é, em geral, redundante, pois o leitor já anuncia tratar‑se de uma imagem.</p></div>`,

	TABINDEX_ATTR: `<p>${why.fix}Evite <code>tabindex</code> positivo. Ordene o HTML para que ordem visual, tabulação e leitura coincidam.</p><div class="why"><p>Por padrão, coincidem.</p><p>Valor positivo move na tabulação mas não visualmente — gerando confusão.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Assegure que cada célula de cabeçalho contém texto.</p><div class="why"><p>Leitores usam cabeçalhos para dar contexto às células.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Indique nas propriedades da tabela cabeçalhos na primeira linha/coluna (ou ambos).</p><div class="why"> <p>Leitores repetem o cabeçalho relevante em cada célula.</p><p>Se a tabela for apenas para layout, evite usar estrutura tabular.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Remova h2/h3 dentro da tabela; use cabeçalhos de linha/coluna. Para vários níveis, divida em tabelas menores.</p><div class="why"> <p>Cabeçalhos de tabela atuam por linha/coluna; cabeçalhos de conteúdo influenciam toda a secção subsequente.</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Um <strong>cabeçalho de tabela</strong> na célula 2 rotula a coluna B.<br><br> Um <strong>cabeçalho de conteúdo</strong> na célula 2 “rotula” 3, A, B, C, este texto e o rodapé.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,
};

export const interfaceStrings = {
	ALERT_CLOSE: 'Fechar',
	ALT: 'Texto alternativo: ',
	DECORATIVE: 'Marcado como decorativo',
	DISMISS: 'Ignorar',
	DISMISS_ALL: 'Nesta página: ignorar',
	edit_page: 'Editar página',
	edit_layout: 'Editar layout',
	edit_term: 'Editar termo',
	edit_tags: 'Editar utilizador',
	IMAGES: 'Texto alternativo',
	MAIN_TOGGLE_LABEL: 'Ativar ferramentas de acessibilidade',
	MISSING: '(em falta!)',
	NOT_VISIBLE: 'Nota: este conteúdo pode não estar visível. Procure‑o dentro da área demarcada.',
	NO_IMAGES: 'Nenhuma imagem encontrada.',
	OUTLINE: 'Cabeçalhos',
	PANEL_DISMISS_BUTTON: `Mostrar %(dismissCount) alertas ocultos`,
	PANEL_HEADING: 'Mostrar visualizadores',
	SKIP_TO_ISSUE: 'Ir para o problema',
	WARNING: 'verificação manual necessária',
	WARNINGS: 'verificações manuais necessárias',
	buttonFirstContent: 'Ir para o primeiro alerta',
	buttonHideHiddenAlert: 'Ocultar alerta oculto',
	buttonHideHiddenAlerts: `Ocultar %(count) alertas ocultos`,
	buttonShowHiddenAlert: 'Mostrar alerta oculto',
	buttonToolsActive: 'Ocultar visualizadores',
	dismissActions: `Alertas semelhantes`,
	dismissHideTitle: 'Oculta este alerta apenas para si',
	dismissOkAllButton: 'Nesta página: marcar como OK',
	dismissOkButtonContent: 'Marcar como OK',
	dismissOkTitle: 'Oculta o alerta para todos os editores',
	dismissOnSite: 'Em todas as páginas: marcar como OK',
	dismissalsHeader: 'Não vai corrigir isto?',
	errorOutlinePrefixHeadingEmpty: '(cabeçalho vazio)',
	errorOutlinePrefixHeadingIsLong: '(assinalado por comprimento)',
	errorOutlinePrefixSkippedLevel: '(assinalado por nível saltado)',
	issueContent: 'Problema de conteúdo',
	issueDeveloper: 'Problema de desenvolvimento',
	issueTemplate: 'Problema de template',
	main_toggle_hide: 'Ocultar ferramentas de acessibilidade',
	main_toggle_hide_alerts: 'Ocultar alertas de acessibilidade',
	main_toggle_show: 'Mostrar ferramentas de acessibilidade',
	main_toggle_show_alerts: 'Mostrar alertas de acessibilidade',
	panelCheckAltText: `<p class="ed11y-small">Verifique se cada imagem transmite o seu significado no contexto e se não há “texto dentro da imagem”.</p>`,
	panelCheckOutline: `<p class="ed11y-small">Mostra a hierarquia de cabeçalhos. Verifique se corresponde à organização visual do conteúdo.</p>`,
	PANEL_HEADING_MISSING_ONE: 'Falta um cabeçalho de nível 1.',
	PANEL_NO_HEADINGS: 'Nenhum cabeçalho encontrado.',
	reportsLink: 'Abrir relatórios do site',
	toggleDisabled: 'Não há conteúdo que o Editoria11y possa verificar.',
	transferFocus: 'Editar este conteúdo',
	unDismissHideButton: 'Restaurar este alerta ignorado',
	unDismissNotePermissions: 'Esta verificação foi ocultada por um administrador',
	unDismissOKButton: 'Restaurar alerta marcado como OK',
};

const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips),
  testNames: testNames,
};

export default newStrings;
