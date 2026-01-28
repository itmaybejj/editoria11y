import strings from '../sa11y-lang/ptPT.js';

// todo check each file for link integrity, and escaping of tags in code blocks.
export const testNames = {
	ALT_FILE_EXT: 'Este texto alternativo é um nome de ficheiro, não uma descrição',
	ALT_MAYBE_BAD: 'Este texto alternativo não pode ser pronunciado por um leitor de ecrã',
	ALT_PLACEHOLDER: 'Este texto alternativo é um marcador de posição sem significado',
	ALT_UNPRONOUNCEABLE: 'Este texto alternativo é impossível de pronunciar',
	BTN_EMPTY: 'O botão não tem um rótulo acessível',
	BTN_EMPTY_LABELLEDBY: 'O botão tem um rótulo ARIA inválido',
	BTN_ROLE_IN_NAME: 'O nome do botão repete a palavra "button"',
	CONTRAST_ERROR: 'O texto não tem contraste suficiente para ser facilmente legível',
	CONTRAST_ERROR_GRAPHIC: 'A imagem ou ícone não tem contraste suficiente',
	CONTRAST_INPUT: 'O campo de entrada não tem contraste suficiente para ser facilmente legível',
	CONTRAST_PLACEHOLDER: 'O texto de marcador de posição não tem contraste suficiente para ser facilmente legível',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Este texto de marcador de posição tem contraste suficiente?',
	CONTRAST_WARNING: 'Este texto tem contraste suficiente?',
	CONTRAST_WARNING_GRAPHIC: 'Esta imagem ou ícone tem contraste suficiente?',
	DUPLICATE_ID: 'Atributo ID duplicado',
	DUPLICATE_TITLE: 'Esta ligação tem uma dica (tooltip) com o mesmo texto da ligação',
	EMBED_AUDIO: 'Este conteúdo áudio tem transcrição?',
	EMBED_DATA_VIZ: 'Esta visualização é acessível?',
	EMBED_GENERAL: 'Elementos iframe incorporados requerem verificações manuais',
	EMBED_MISSING_TITLE: 'Frame sem atributo "title"',
	EMBED_UNFOCUSABLE: 'Um frame com tabindex="-1" não será acessível por teclado.',
	EMBED_VIDEO: 'Este vídeo tem legendas correctas?',
	HEADING_EMPTY: 'Este cabeçalho não tem texto',
	HEADING_EMPTY_WITH_IMAGE: 'Esta imagem é usada como cabeçalho, por isso precisa de texto alternativo',
	HEADING_FIRST: 'O primeiro cabeçalho nesta página é um sub‑cabeçalho',
	HEADING_LONG: 'Este cabeçalho pode ser mais curto?',
	HEADING_MISSING_ONE: 'Falta um Cabeçalho de nível 1 nesta página',
	HEADING_SKIPPED_LEVEL: 'Este cabeçalho está marcado no nível errado',
	HIDDEN_FOCUSABLE: 'Este elemento não pode ser descrito por leitores de ecrã',
	IMAGE_ALT_TOO_LONG: 'Este texto alternativo pode ser mais curto?',
	IMAGE_DECORATIVE: 'Esta imagem é realmente decorativa?',
	IMAGE_DECORATIVE_CAROUSEL: 'Imagem num carrossel ou galeria marcada como decorativa',
	IMAGE_FIGURE_DECORATIVE: 'Verificação manual: imagem com legenda sem texto alternativo',
	IMAGE_FIGURE_DUPLICATE_ALT: 'O texto alternativo não deve ser igual ao texto da legenda',
	LABELS_ARIA_LABEL_INPUT: 'Existe um rótulo visível para este campo?',
	LABELS_PLACEHOLDER: 'Verificação manual: texto de marcador de posição',
	LABELS_INPUT_RESET: 'Este botão de limpar é necessário?',
	LABEL_IN_NAME: 'O rótulo visível não corresponde ao rótulo invisível',
	LINK_ALT_FILE_EXT: 'O texto alternativo usado como link não deve ser um URL',
	LINK_ALT_MAYBE_BAD: 'Este texto alternativo ligado não pode ser pronunciado por um leitor de ecrã',
	LINK_ALT_UNPRONOUNCEABLE: 'Imagens ligadas devem ter texto alternativo pronunciável',
	LINK_CLICK_HERE: 'Verificação manual: a ligação contém "clique aqui"',
	LINK_DOI: 'Ligue títulos de artigos, não números DOI',
	LINK_EMPTY: 'Esta ligação não tem texto',
	LINK_EMPTY_LABELLEDBY: 'Ligação com atributo "aria‑labelledby" inválido',
	LINK_EMPTY_NO_LABEL: 'Esta ligação precisa de um rótulo',
	LINK_FILE_EXT: 'A ligação aponta para um ficheiro sem aviso',
	LINK_IDENTICAL_NAME: 'Esta ligação descreve de forma única o seu destino?',
	LINK_IMAGE_ALT: 'Verificação manual: imagem ligada com texto alternativo',
	LINK_IMAGE_ALT_AND_TEXT: 'Este texto alternativo faz sentido como parte desta ligação?',
	LINK_IMAGE_LONG_ALT: 'O texto alternativo desta imagem ligada pode ser mais curto?',
	LINK_IMAGE_NO_ALT_TEXT: 'Esta imagem ligada precisa de texto alternativo',
	LINK_IMAGE_TEXT: 'Verificação manual: imagem dentro de uma ligação marcada como decorativa.',
	LINK_NEW_TAB: 'Esta ligação abre um novo separador sem aviso?',
	LINK_PLACEHOLDER_ALT: 'Esta imagem ligada precisa de texto alternativo significativo',
	LINK_STOPWORD: 'Esta ligação descreve o seu destino?',
	LINK_STOPWORD_ARIA: 'Texto de ligação significativo disponível apenas para utilizadores de leitores de ecrã',
	LINK_SUS_ALT: 'Este texto alternativo descreve a imagem ou a ligação?',
	LINK_SYMBOLS: 'Verificação manual: os símbolos ou emojis nesta ligação são significativos?',
	LINK_URL: 'O texto da ligação não deve ser um URL',
	META_LANG: 'Meta tag para o idioma da página em falta',
	META_MAX: 'Meta tag limita quanto os utilizadores podem ampliar o texto',
	META_REFRESH: 'Meta tag actualiza automaticamente a página',
	META_SCALABLE: 'Meta tag impede que os utilizadores aumentem o texto',
	META_TITLE: 'Meta tag para o título da página em falta',
	MISSING_ALT: 'HTML inválido: imagem sem atributo alt',
	MISSING_ALT_LINK: 'HTML inválido: imagem ligada sem atributo alt',
	MISSING_ALT_LINK_HAS_TEXT: 'HTML inválido: imagem numa ligação sem atributo alt',
	QA_BAD_LINK: 'Verificação manual: a ligação pode ser inválida',
	QA_BLOCKQUOTE: 'Esta citação deveria ser um cabeçalho?',
	QA_DOCUMENT: 'Este documento foi marcado para leitores de ecrã?',
	QA_FAKE_HEADING: 'Este texto a negrito deveria ser um cabeçalho?',
	QA_FAKE_LIST: 'Isto deveria ter formatação de lista?',
	QA_IN_PAGE_LINK: 'Ligação interna quebrada',
	QA_JUSTIFY: 'Não justificar texto',
	QA_NESTED_COMPONENTS: 'Componentes interactivos aninhados',
	QA_PDF: 'Existe uma alternativa para este PDF?',
	QA_SMALL_TEXT: 'Texto demasiado pequeno',
	QA_STRONG_ITALICS: 'Blocos grandes de texto enfatizado são difíceis de ler',
	QA_SUBSCRIPT: 'Não usar superior ou inferior como formatação visual',
	QA_UNDERLINE: 'Apenas ligações devem estar sublinhadas',
	QA_UPPERCASE: 'Este texto em maiúsculas é necessário?',
	SUS_ALT: 'Existem palavras redundantes neste texto alternativo?',
	TABINDEX_ATTR: 'O atributo tabindex quebra a ordem de leitura',
	TABLES_EMPTY_HEADING: 'Esta célula de cabeçalho precisa de texto',
	TABLES_MISSING_HEADINGS: 'Esta tabela precisa de uma linha e/ou coluna de cabeçalhos',
	TABLES_SEMANTIC_HEADING: 'Cabeçalhos de conteúdo não devem ser usados dentro de tabelas',
	UNCONTAINED_LI: 'Lista HTML inválida',
};

const why = {
	fix: `<strong class="badge">Como corrigir</strong> `,
	check: `<strong class="badge">Verificação manual</strong> `,

	// todo here broken link in third line
	buttons: `<div class="why"><p>Nota: o nome acessível de um botão deve deixar claro o que ele faz. Botões que mudam quando clicados também devem mudar o seu nome:</p><ul>
<li>Etiquetas que mudam:<br>"Reproduzir/Pausar", "Mostrar detalhes/Ocultar detalhes"</li>
<li>Mudança de https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties:<br>"Reproduzir/Reproduzir, premido", "Detalhes, recolhido/Detalhes, expandido."</li>
</ul>
<p>Atenção para não alterar ambas as coisas ao mesmo tempo. Mudar "Reproduzir" para "Pausar, premido" indica que o reprodutor está em pausa — não que está a reproduzir!</p></div>`,

	headings: `<div class="why"><p>Dica: cabeçalhos e sub‑cabeçalhos organizam o conteúdo numa estrutura hierárquica. Utilizadores de leitores de ecrã dependem desta estrutura para compreender e explorar páginas:</p><ul>
<li>Cabeçalho nível 1: títulos de página
<ul><li>Cabeçalho nível 2: temas principais
<ul><li>Cabeçalho nível 3: subtemas</li></ul>
</li></ul>
</li>
</ul></div>`,

	images: `<div class="why"><p>Dica: ao escrever texto alternativo, descreva o que a imagem significa e não apenas o que contém. Dependendo do contexto, uma fotografia de uma criança a chutar uma bola pode significar:</p><ul>
<li>Estavam a jogar à chuva intensa.</li>
<li>Os novos equipamentos da equipa têm logótipos de dragão giros.</li>
<li>Ela marcou o golo da vitória a partir da ala esquerda!</li>
</ul></div>`,

	// todo broken link here in third line
	links: `<div class="why"><p>As pessoas percorrem rapidamente uma página olhando para as ligações e usando a pesquisa na página para as encontrar pelo nome. Ligações eficazes devem ser significativas, únicas e concisas:</p><ul>
<li>Ideal: "Saiba mais sobre https://webaim.org/techniques/hypertext/link_text"</li>
<li>Não é única: "Clique <a href="https://webaim.org/techniques/hypertext/link_text">aqui</a> para saber mais sobre ligações significativas."</li>
<li>Não é concisa: "<a href="https://webaim.org/techniques/hypertext/link_text">Clique aqui para saber mais sobre ligações significativas</a>"</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>O propósito do texto alternativo é fornecer uma alternativa ao significado de uma imagem, não apenas ao seu conteúdo literal. No caso de uma imagem que é uma ligação, o significado é o destino da ligação:</p><ul>
<li>"<em>Uma lupa</em>" descreve a imagem, não a ligação.</li>
<li>"<em>Uma lupa de pesquisa</em>" descreve ambas de forma confusa.</li>
<li>"<em>Pesquisar</em>" descreve corretamente o destino da ligação.</li>
</ul></p></div>`,
};

const tips = {

	ALT_FILE_EXT: `<p>Os leitores de ecrã irão ler este URL, muitas vezes letra por letra. Isto provavelmente não transmite o mesmo significado que ver a imagem.</p><p>${why.fix}Adicione um alt vazio (alt="") se isto for uma decoração sem significado que deve ser ignorada pelos leitores de ecrã, ou adicione texto alternativo descritivo.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Descrição fornecida desta imagem: <strong>"%(alt)"</strong></p><p>${why.fix}Defina o texto alternativo desta imagem como uma descrição concisa do que ela significa neste contexto.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Descrição fornecida desta imagem: <strong>"%(alt)"</strong></p><p>${why.fix}Defina o texto alternativo desta imagem como uma descrição concisa do que ela significa neste contexto.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>O texto alternativo desta imagem é "%(alt)", contendo apenas símbolos impronunciáveis e/ou espaços. Os leitores de ecrã irão anunciar que há uma imagem e depois fazer uma pausa incómoda: "imagem: ____."</p><p>${why.fix}Adicione um alt descritivo, ou forneça um alt <em>completamente</em> vazio (alt="") se isto for apenas um ícone ou espaçador que deve ser ignorado.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Use qualquer método válido para dizer aos leitores de ecrã o que este botão faz, por exemplo texto, alt‑texto num ícone ou um atributo title.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Este botão tem um valor <code>aria-labelledby</code> que está vazio ou não corresponde ao valor <code>ID</code> de outro elemento na página.</p><p>${why.fix}Ligue novamente o ID a um elemento existente, ou remova o atributo e descreva o botão de outra forma.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'Uma imagem de fundo ou gradiente faz com que este verificador não tenha certeza da cor real por trás deste texto. Use o seletor de cor abaixo para verificar manualmente.',

	DUPLICATE_ID: `<p>Os IDs estão a ser usados nesta página como rótulos ou destinos de ligação, o que significa que têm de ser únicos.</p><p>${why.fix}Altere este ID: <strong>#%(id)</strong></p><div class="why"><p>Na maioria dos CMS, isto vem de um campo chamado “name” ou “id”. Em HTML, é um atributo: <code><a id="MY-ID"></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Apague o atributo <code>title</code> desta ligação.</p><div class="why"><p>Nota: tooltips <code>title</code> só aparecem ao passar com o rato. Não são visíveis em telemóveis ou por teclado, por isso muitos utilizadores nunca os verão. Nunca devem conter informação importante.</p></div>`,

	EMBED_AUDIO: `<p>Se este áudio contiver fala, deve ser fornecida uma <a href="https://www.w3.org/WAI/media/av/transcribing/">alternativa em texto</a> nesta página ou num link.</p><p>Note que uma pessoa deve rever e corrigir legendas automáticas para garantir que os locutores e sons significativos são identificados corretamente.</p>`,

	EMBED_DATA_VIZ: `<p>Widgets de visualização incorporados são frequentemente difíceis ou impossíveis de operar com tecnologias de apoio, difíceis de compreender para pessoas com baixa visão ou daltonismo, e podem exigir muito scroll horizontal em telemóveis.</p><p>${why.fix}A menos que esta incorporação tenha elevado contraste, seja operável por teclado <strong><em>e</em></strong> descrita por um leitor de ecrã, forneça um formato alternativo equivalente, como uma descrição textual, tabela de dados ou folha de cálculo descarregável.</p>`,

	EMBED_GENERAL: 'Ferramentas automáticas não conseguem testar conteúdo dentro de elementos incorporados. Certifique‑se de que todas as imagens têm alt‑texto, vídeos têm legendas, texto tem contraste suficiente e que ligações e botões são <a href="https://webaim.org/techniques/keyboard/">acessíveis por teclado</a> antes de ignorar este alerta.',

	EMBED_MISSING_TITLE: `<p>Embeds precisam de um nome acessível que descreva o seu conteúdo para leitores de ecrã.</p><p>${why.fix}Forneça um atributo <code>title</code> ou <code>aria-label</code> único.</p>`,

	EMBED_UNFOCUSABLE: `Este atributo diz ao teclado e às tecnologias de apoio para saltarem este elemento. A menos que o conteúdo do iframe não tenha ligações, botões ou formulários e não seja rolável, este atributo deve ser removido.`,

	EMBED_VIDEO: `<p>Vídeos devem incluir legendas.</p><p>Legendas automáticas precisam de ser revistas por humanos para garantir precisão.</p><p>${why.fix}Adicione ou revise as legendas e depois ignore este alerta.</p>`,

	HEADING_EMPTY: `<p>Cabeçalhos vazios criam lacunas confusas na estrutura da página.</p><p>${why.fix}Adicione texto a este cabeçalho ou elimine esta linha vazia.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Cabeçalhos vazios criam lacunas confusas na estrutura da página.</p><p>${why.fix}Se não for um cabeçalho, mude o formato de <strong {C}>Cabeçalho %(level)</strong> para <strong>Parágrafo</strong>. Caso contrário, coloque o significado da imagem no alt‑texto.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Certifique‑se de que o título da página está marcado como Cabeçalho de nível 1 ou 2. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}A menos que seja um título fixo (como o de um artigo publicado), torne‑o mais curto para facilitar a leitura rápida.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Marque o título da página como nível 1 para indicar o início da estrutura do documento.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Este cabeçalho saltou de <strong>nível %(prevLevel) para nível %(level)</strong>. Para utilizadores de leitores de ecrã, isto parece indicar falta de conteúdo.</p><p>${why.fix}Ajuste os níveis para criar uma estrutura coerente.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: 'Este elemento interativo tem <code>aria-hidden="true"</code>, mas continua acessível pelo teclado. Se pretende escondê-lo dos leitores de ecrã, também deve adicionar <code>tabindex="-1"</code>. Caso contrário, remova o atributo <code>aria-hidden="true"</code>.',

	IMAGE_ALT_TOO_LONG: `<p>Leitores de ecrã lêem texto alternativo como uma frase contínua; se alguém perder informação, tem de ouvir tudo de novo.</p><p>O alt‑texto desta imagem tem %(altLength) caracteres: <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Dica: imagens complexas que transmitem mais do que cabe numa frase precisam normalmente de um <strong>bijascrito visível</strong> ou texto alternativo completo.</p><ul><li>"Cartaz para o baile de sexta-feira; ver detalhes na legenda."</li><li>"Gráfico mostra que os casos diminuíram 10%; detalhes na tabela."</li></ul></div>`,

	IMAGE_DECORATIVE: `<p>Esta imagem está escondida de leitores de ecrã com alt vazio. Apenas imagens sem significado, como ícones redundantes, devem ser escondidas assim.</p><p>${why.fix}Se esta imagem acrescenta valor, forneça texto alternativo.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'A imagem está marcada como <strong>decorativa</strong>, mas todas as imagens num carrossel ou galeria devem incluir texto alternativo descritivo.',

	IMAGE_FIGURE_DECORATIVE: `<p>Esta imagem será ignorada por tecnologias de apoio. A legenda faz sentido sem a imagem?</p><p>${why.fix}Se não, adicione alt‑texto para cobrir o que a legenda não descreve.</p><div class="why"><p>Dica: imagens, alts e legendas funcionam em conjunto.</p></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Altere o alt‑texto para descrever o significado visual da imagem.</p><div class="why"><p>Dica: imagens, alts e legendas funcionam em conjunto.</p></div>`,

	LABELS_ARIA_LABEL_INPUT: '<p><strong {B}>Rótulo invisível do campo:</strong> <strong {C}>%(TEXT)</strong></p><p>Verifique se existe um rótulo visível, se este permanece visível quando há texto no campo e se corresponde ao rótulo invisível.</p><div class="why"><p>Usar apenas placeholder ou title faz com que o rótulo desapareça quando se digita, dificultando a revisão.</p></div>',

	LABELS_INPUT_RESET: `<p>Botões de limpar podem ser ativados por engano e causar perda de dados sem confirmação.</p><p>${why.fix}A menos que limpe apenas um campo, considere removê-lo ou pedir confirmação.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'Botão de imagem não tem texto alternativo. Adicione texto alternativo, por exemplo <em>Pesquisar</em> ou <em>Enviar</em>.',

	LABELS_MISSING_LABEL: 'Não há rótulo associado a este campo. Adicione um <code>id</code> ao campo e um atributo <code>for</code> correspondente no rótulo.',

	LABELS_NO_FOR_ATTRIBUTE: 'Não há rótulo associado a este campo. Adicione ao rótulo um atributo <code>for</code> correspondente ao <code>id</code> do campo.<hr><strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>O texto do placeholder desaparece ao escrever e pode ter contraste insuficiente ou parecer texto real.</p><p>${why.fix}Assegure que informação importante como rótulos e instruções permanece visível.</p>`,

	LABEL_IN_NAME: `<p>O texto visível deste elemento parece ser diferente do nome acessível. Isto pode confundir utilizadores de leitores de ecrã e afetar controlo por voz.</p><p>${why.check}Certifique‑se de que o rótulo visível começa com o rótulo invisível e que não adiciona informação significativa extra.</p><p><strong>Rótulo invisível:</strong> "%(TEXT)"</p>`,

	LINK_ALT_FILE_EXT: `<p>O alt‑texto desta imagem contém "%(alt)", o que sugere que é um nome de ficheiro, e não uma descrição significativa.</p><p>${why.fix}Defina o alt‑texto como o nome da ligação ou destino.</p><div class="why"><p>O alt deve refletir o significado de uma imagem. Numa imagem ligada, o significado é o destino.</p></div>`,

	LINK_ALT_MAYBE_BAD: `<p>O alt‑texto desta imagem é um placeholder: "<strong>%(alt)</strong>".</p><p>${why.fix}Defina o alt‑texto para o destino da ligação.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>O alt‑texto desta imagem ligada contém apenas símbolos impronunciáveis ou espaços: "%(ALT_TEXT)". Os leitores de ecrã não conseguem descrevê-lo.</p><p>${why.fix}Defina o alt‑texto como o objetivo ou destino da ligação.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `As expressões "clique" ou "clique aqui" são redundantes e desviam do propósito da ligação.`,

	LINK_DOI: `<p>${why.fix}Ligue o título do artigo e apresente o DOI como texto simples, em vez de ligar o DOI.</p><div class="why"><p>As diretrizes da APA recomendam ligações descritivas para melhorar acessibilidade e pesquisa.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Adicione texto descritivo ou elimine se for um erro, como uma ligação num espaço vazio.</p><div class="why"><p>Leitores de ecrã têm dificuldades com ligações vazias.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>O atributo <code>aria-labelledby</code> desta ligação não corresponde a nenhum <code>ID</code> na página.</p><p>${why.fix}Forneça um ID válido ou remova este atributo.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Adicione texto descritivo ou remova se for engano.</p><div class="why"><p>Ligações vazias causam silêncio ou leitura da URL letra por letra.</p></div>`,

	LINK_FILE_EXT: `<p>Esta ligação abre um ficheiro descarregável (PDF, MP3, ZIP, DOC) sem aviso.</p><p>${why.fix}Indique o tipo de ficheiro no texto da ligação.</p><p class="why">Para ficheiros grandes, indique também o tamanho.</p>`,

	LINK_IDENTICAL_NAME: `<p>Ligações diferentes partilham o mesmo texto: "<strong>%(TEXT)</strong>".</p><p>${why.fix}Reformule ligações para que descrevam de forma única o seu destino.</p>${why.links}`,

	LINK_IMAGE_ALT: `Certifique‑se de que este alt descreve o destino da ligação:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

LINK_IMAGE_ALT_AND_TEXT: `<p>Verifique se isto ajuda a descrever o destino da ligação e não adiciona conteúdo redundante:</p><p><strong class="badge">Alt</strong> "<em><strong>%(alt)</strong></em>"</p>${why.imageLinks}`,

LINK_IMAGE_LONG_ALT: `<p>O alt de uma imagem ligada deve descrever o objetivo da ligação. Alt‑textos longos podem indicar descrição da imagem em vez do destino.</p>Este alt tem %(altLength) caracteres: <em>%(ALT_TEXT)</em>`,

LINK_IMAGE_NO_ALT_TEXT: `<p>Quando uma ligação envolve uma imagem, o alt‑texto torna‑se o rótulo do link para leitores de ecrã.</p><p>${why.fix}Defina o alt de acordo com o destino.</p>${why.imageLinks}`,

LINK_IMAGE_TEXT: 'A imagem está marcada como decorativa, mas a ligação usa texto circundante como rótulo.',

LINK_NEW_TAB: `<p>${why.fix}Abra a ligação no mesmo separador ou <a href="https://itmaybejj.github.io/linkpurpose/">avise os utilizadores</a> antes.</p><div class="why"><p>A abertura automática em novo separador pode ser confusa para utilizadores que dependem do botão voltar.</p><p>Exceção: em formulários, abrir em novo separador evita perda de dados.</p></div>`,

LINK_PLACEHOLDER_ALT: `<p>O alt desta imagem ligada é um placeholder: "<strong>%(alt)</strong>".</p><p>${why.fix}Defina o alt como a descrição do destino.</p>${why.imageLinks}`,

LINK_STOPWORD: `<p>Esta ligação contém texto que não descreve o destino:<br><strong>%(text)</strong></p><p>${why.fix}Reescreva para descrever a finalidade da ligação.</p>${why.links}`,

LINK_STOPWORD_ARIA: `<p>Um nome acessível foi fornecido via ARIA, mas o texto visível é genérico: "<strong {C}>%(ERROR)</strong>".</p><p>${why.fix}Use textos de ligação significativos para todos e assegure correspondência com o nome acessível.</p>${why.links}`,

LINK_SUS_ALT: `<p>O alt desta imagem contém "%(alt)", o que geralmente indica que descreve a imagem e não o objetivo da ligação.</p><strong class="badge">Alt‑texto</strong> "%(ALT_TEXT)"<p>Para corrigir: o alt deve descrever o objetivo da ligação.<br></p>${why.imageLinks}`,

LINK_SYMBOLS: `${why.fix}Evite usar símbolos como chamadas para ação em ligação, exceto se estiverem escondidos a tecnologias de apoio. Leitores de ecrã podem lê‑los de forma confusa. Considere remover: <strong {C}>%(ERROR)</strong>`,

LINK_URL: `<p>${why.fix}Substitua este texto da ligação pelo título ou propósito do destino.</p><div class="why"><p>Utilizadores procuram ligações por nome. URLs não são fáceis de procurar ou distinguir.</p></div>`,

META_LANG: `<p>${why.fix}Adicione um <a href="https://www.w3.org/International/questions/qa-html-language-declarations">atributo de idioma</a> na tag HTML.</p><div class="why"><p>Leitores de ecrã dependem da idioma definido para pronunciar corretamente. Sem esse atributo, podem adivinhar mal.</p></div>`,

META_MAX: `<p>Esta meta tag limita quanto os utilizadores podem ampliar o texto.</p><p>${why.fix}Ajuste ou remova esta limitação para suportar zoom completo.</p>`,

META_REFRESH: `<p>Páginas não devem atualizar automaticamente por meta tag. Isto interrompe utilizadores sem aviso e pode apagar progresso em formulários.</p><p>${why.fix}Use AJAX ou JavaScript para atualizar partes da página com aviso ao utilizador.</p>`,

META_TITLE: `<p>${why.fix}Adicione uma tag <code>&lt;title&gt;</code> ao <code>&lt;head&gt;</code> da página.</p><div class="why"><p>Um <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title">título curto e único</a> é essencial:</p><ul><li>Motores de busca usam-no nos resultados.</li><li>Navegadores usam-no para nomear separadores.</li><li>Leitores de ecrã anunciam-no ao mudar de separador.</li></ul><p>Sem título, os utilizadores veem/ouvem apenas o URL.</p></div>`,

MISSING_ALT: `<p>Quando leitores de ecrã encontram uma imagem sem alt, lêem o URL do ficheiro, muitas vezes letra por letra.</p><p>${why.fix}Adicione alt vazio (alt="") para imagens decorativas ou alt descritivo para imagens informativas.</p>${why.images}`,

MISSING_ALT_LINK: `<p>Uma imagem ligada sem alt leva leitores de ecrã a lerem o URL do ficheiro, que é especialmente problemático.</p><p>${why.fix}Adicione alt correspondente ao destino da ligação.</p>${why.imageLinks}`,

MISSING_ALT_LINK_HAS_TEXT: `<p>Esta imagem faz parte de uma ligação com texto. Se o texto descreve suficientemente o destino, use alt="". Caso contrário, forneça alt‑texto descritivo.</p>${why.imageLinks}`,

QA_BAD_LINK: `<p>A ligação parece apontar para um ambiente de desenvolvimento:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Mude para um caminho relativo (/pasta) ou para o URL público.</p>`,

QA_BLOCKQUOTE: `<p>A formatação blockquote indica citação. Citações curtas são frequentemente cabeçalhos.</p><p>${why.fix}Se isto for um cabeçalho, use formatação de cabeçalho.</p>${why.headings}`,

QA_DOCUMENT: `<p>Documentos ligados são considerados conteúdo web e devem ser acessíveis. Verifique se o documento tem cabeçalhos, cabeçalhos de tabela e alt‑texto.</p><ul class="why"><li>Torne o seu <a href="https://support.google.com/docs/answer/6199477?hl=pt-PT">documento Google</a> acessível.</li><li>Torne os seus <a href="https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">documentos Office</a> acessíveis.</li></ul>`,

QA_FAKE_HEADING: `<p>${why.fix}Se este texto a negrito introduz um tópico, substitua-o por um estilo de cabeçalho.</p><div class="why"><p>Tip: cabeçalhos criam uma tabela de conteúdos navegável para tecnologias de apoio.</p></div>`,

QA_FAKE_LIST: `<p>${why.fix}Se "%(text)" fizer parte de uma lista, substitua por formatação de lista.</p><div class="why"><p>Listas alinhadas são mais legíveis e são anunciadas por leitores de ecrã ("item 3 de 7").</p><p>Frases numeradas não oferecem esta estrutura.</p></div>`,

QA_IN_PAGE_LINK: `<p>O destino desta ligação não corresponde a nenhum elemento na página.</p><div class="why"><p>Nota para programadores: se isto for um gancho JavaScript, certifique‑se de que funciona com teclado.</p></div>`,

QA_JUSTIFY: `<p>Texto justificado cria espaços irregulares, tornando a leitura mais difícil.</p><p>${why.fix}Use alinhamento à esquerda.</p>`,

QA_NESTED_COMPONENTS: 'Evite componentes interativos aninhados, como acordeões dentro de acordeões ou separadores (tabs) dentro de acordeões.',

QA_PDF: `<p>${why.fix}Faça uma das seguintes ações e ignore este alerta:</p><ul><li>Ligue para uma página web em vez do PDF,</li><li>Ou forneça também uma página web ou documento editável,</li><li>Ou, no mínimo, certifique-se de que o PDF está etiquetado com cabeçalhos, ordem de leitura, cabeçalhos de tabela e alt‑texto.</li></ul><div class="why"><p>Utilizadores móveis e utilizadores de tecnologias de apoio preferem páginas web a PDFs, que muitas vezes não têm estrutura acessível.</p></div>`,

QA_SMALL_TEXT: 'Texto pequeno é mais difícil de ler, sobretudo para pessoas com baixa visão. Evite usar tamanhos de letra inferiores ao padrão.',

QA_STRONG_ITALICS: `<p>${why.fix}Reserve negrito e itálico para palavras ou frases-chave.</p><div class="why"><p>Nota: se isto for uma citação, use blockquote.</p></div>`,

QA_SUBSCRIPT: `Superíndices e subscritos tornam o texto demasiado pequeno para ser facilmente legível. Devem ser usados apenas em casos como ordinais (4º), fórmulas (H<sub>2</sub>O) e referências de rodapé.`,

QA_UNDERLINE: `<p>No contexto web, texto sublinhado indica uma ligação. Os utilizadores irão achar que é clicável.</p><p>${why.fix}Use <strong>negrito</strong> ou <em>itálico</em> para ênfase.</p><div class="why"><p>Nota: leitores de ecrã não anunciam formatação visual — cabeçalhos devem ser usados para estrutura.</p></div>`,

QA_UPPERCASE: `<p>BLOCOS DE TEXTO EM MAIÚSCULAS SÃO MAIS DIFÍCEIS DE LER E PODEM DAR A SENSAÇÃO DE "GRITOS".</p><p>${why.fix}Use maiúsculas apenas em poucas palavras, preferindo negrito.</p><div class="why"><p>Leitores de ecrã não anunciam negrito; use cabeçalhos quando o conteúdo for importante.</p></div>`,

SUS_ALT: `<p>O alt‑texto desta imagem contém "%(alt)", o que provavelmente é redundante:</p><p><strong class="badge">Alt‑texto</strong> "%(ALT_TEXT)"</p><p>Para corrigir: reescreva o alt‑texto para transmitir brevemente o significado da imagem.</p><div class="why"><p>Dica: leitores de ecrã já anunciam que estão a descrever uma imagem, por isso frases como "imagem de" são redundantes.</p></div>`,

TABINDEX_ATTR: `<p>${why.fix}Nunca use valores tabindex superiores a "0". Reordene os elementos no HTML para manter coerência entre ordem visual, de leitura e tabulação.</p><div class="why"><p>Tabindex positivo altera a ordem de tabulação mas não a ordem visual ou de leitura.</p></div>`,

TABLES_EMPTY_HEADING: ` <p>${why.fix}Certifique‑se de que cada célula de cabeçalho contém texto.</p><div class="why"><p>Dica: leitores de ecrã usam cabeçalhos para orientar utilizadores em tabelas.</p></div>`,

TABLES_MISSING_HEADINGS: ` <p>${why.fix}Indique nas propriedades da tabela onde ficam os cabeçalhos (linha, coluna ou ambos).</p><div class="why"> <p>Dica: leitores de ecrã repetem o cabeçalho relevante à medida que se move por linhas e colunas.</p><p>Se a tabela é apenas para layout visual, remova a formatação de tabela.</p></div>`,

TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Remova esta formatação de cabeçalho (h2, h3). Use antes cabeçalhos de tabela. Se precisar de vários níveis, use várias tabelas.</p><div class="why"> <p>Dica: cabeçalhos de tabela aplicam‑se a uma direção (linha ou coluna). Cabeçalhos de conteúdo afetam toda a estrutura subsequente.</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Um <strong>cabeçalho de tabela</strong> na célula 2 rotula a célula B. <br><br> Um <strong>cabeçalho de conteúdo</strong> na célula 2 rotula as células 3, A, B e C, bem como este texto e o rodapé deste tooltip.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,

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
	NOT_VISIBLE: 'Nota: este conteúdo pode não estar visível. Procure-o dentro do contorno marcado.',
	NO_IMAGES: 'Nenhuma imagem encontrada.',
	OUTLINE: 'Cabeçalhos',
	PANEL_DISMISS_BUTTON: `Mostrar %(dismissCount) alertas ocultados`,
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
	dismissHideTitle: 'Apenas oculta o alerta para si',
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
	panelCheckAltText: '<p class="ed11y-small">Verifique que cada imagem descreve o que significa no contexto e que não existem imagens com texto.</p>',
	panelCheckOutline: '<p class="ed11y-small">Isto mostra a estrutura de cabeçalhos. Verifique que corresponde à organização visual do conteúdo.</p>',
	PANEL_HEADING_MISSING_ONE: 'Falta um Cabeçalho de nível 1.',
	PANEL_NO_HEADINGS: 'Nenhum cabeçalho encontrado.',
	reportsLink: 'Abrir relatórios do site',
	toggleDisabled: 'Não há conteúdo disponível para o Editoria11y verificar.',
	transferFocus: 'Editar este conteúdo',
	unDismissHideButton: 'Restaurar este alerta ignorado',
	unDismissNotePermissions: 'Esta verificação foi ocultada por um administrador',
	unDismissOKButton: 'Restaurar este alerta marcado como OK',
};

const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips),
  testNames: testNames,
};

export default newStrings;
