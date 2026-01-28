import strings from '../sa11y-lang/ptBR.js';

// todo check each file for link integrity, and escaping of tags in code blocks.
export const testNames = {
	ALT_FILE_EXT: 'Este texto alternativo é um nome de arquivo, não uma descrição',
	ALT_MAYBE_BAD: 'Este texto alternativo não pode ser pronunciado por um leitor de tela',
	ALT_PLACEHOLDER: 'Este texto alternativo é um texto de preenchimento sem significado',
	ALT_UNPRONOUNCEABLE: 'Este texto alternativo é impossível de pronunciar',
	BTN_EMPTY: 'O botão não possui um rótulo acessível',
	BTN_EMPTY_LABELLEDBY: 'O botão possui um rótulo ARIA inválido',
	BTN_ROLE_IN_NAME: 'O nome do botão repete a palavra “button”',
	CONTRAST_ERROR: 'O texto não tem contraste suficiente para ser lido com facilidade',
	CONTRAST_ERROR_GRAPHIC: 'A imagem ou ícone não tem contraste suficiente',
	CONTRAST_INPUT: 'O campo de entrada não possui contraste suficiente para ser facilmente legível',
	CONTRAST_PLACEHOLDER: 'O texto do placeholder não tem contraste suficiente para ser facilmente legível',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: 'O texto do placeholder possui contraste suficiente?',
	CONTRAST_WARNING: 'Este texto possui contraste suficiente?',
	CONTRAST_WARNING_GRAPHIC: 'Este gráfico ou ícone possui contraste suficiente?',
	DUPLICATE_ID: 'Atributo ID duplicado',
	DUPLICATE_TITLE: 'Este link possui um tooltip com o mesmo texto do link',
	EMBED_AUDIO: 'Este áudio possui transcrição?',
	EMBED_DATA_VIZ: 'Esta visualização é acessível?',
	EMBED_GENERAL: 'Iframes incorporados precisam de verificações manuais',
	EMBED_MISSING_TITLE: 'Frame sem atributo "title"',
	EMBED_UNFOCUSABLE: 'Um frame com tabindex="-1" não será acessível pelo teclado.',
	EMBED_VIDEO: 'Este vídeo possui legendas precisas?',
	HEADING_EMPTY: 'Este cabeçalho não possui texto',
	HEADING_EMPTY_WITH_IMAGE: 'Esta imagem é usada como cabeçalho e precisa de texto alternativo',
	HEADING_FIRST: 'O primeiro cabeçalho nesta página é um subtítulo',
	HEADING_LONG: 'Este cabeçalho pode ser mais curto?',
	HEADING_MISSING_ONE: 'Esta página não possui um Cabeçalho 1',
	HEADING_SKIPPED_LEVEL: 'Este cabeçalho está marcado no nível errado',
	HIDDEN_FOCUSABLE: 'Este elemento não pode ser descrito por leitores de tela',
	IMAGE_ALT_TOO_LONG: 'Este texto alternativo pode ser mais curto?',
	IMAGE_DECORATIVE: 'Esta imagem é realmente sem significado?',
	IMAGE_DECORATIVE_CAROUSEL: 'Imagem em carrossel ou galeria marcada como decorativa',
	IMAGE_FIGURE_DECORATIVE: 'Verificação manual: imagem com legenda sem texto alternativo',
	IMAGE_FIGURE_DUPLICATE_ALT: 'O texto alternativo não deve ser igual ao texto da legenda',
	LABELS_ARIA_LABEL_INPUT: 'Existe um rótulo visível para este campo?',
	LABELS_PLACEHOLDER: 'Verificação manual: texto de placeholder',
	LABELS_INPUT_RESET: 'Este botão de limpar é necessário?',
	LABEL_IN_NAME: 'O rótulo visível não corresponde ao rótulo invisível',
	LINK_ALT_FILE_EXT: 'O alt usado como link não deve ser uma URL',
	LINK_ALT_MAYBE_BAD: 'Este alt vinculado não pode ser pronunciado por um leitor de tela',
	LINK_ALT_UNPRONOUNCEABLE: 'Imagens vinculadas precisam de texto alternativo pronunciável',
	LINK_CLICK_HERE: 'Verificação manual: o link contém “clique aqui”',
	LINK_DOI: 'Use o título do artigo como link, não o número DOI',
	LINK_EMPTY: 'Este link não possui texto',
	LINK_EMPTY_LABELLEDBY: 'Link com atributo "aria-labelledby" inválido',
	LINK_EMPTY_NO_LABEL: 'Este link precisa de um rótulo',
	LINK_FILE_EXT: 'O link leva a um arquivo sem aviso prévio',
	LINK_IDENTICAL_NAME: 'Este link descreve seu destino de forma única?',
	LINK_IMAGE_ALT: 'Verificação manual: imagem vinculada com alt‑texto',
	LINK_IMAGE_ALT_AND_TEXT: 'Este texto alternativo faz sentido dentro deste link?',
	LINK_IMAGE_LONG_ALT: 'Este alt de imagem vinculada pode ser mais curto?',
	LINK_IMAGE_NO_ALT_TEXT: 'Esta imagem vinculada precisa de texto alternativo',
	LINK_IMAGE_TEXT: 'Verificação manual: imagem dentro de link marcada como decorativa.',
	LINK_NEW_TAB: 'Este link abre uma nova aba sem aviso?',
	LINK_PLACEHOLDER_ALT: 'Esta imagem vinculada precisa de texto alternativo significativo',
	LINK_STOPWORD: 'Este link descreve seu destino?',
	LINK_STOPWORD_ARIA: 'Texto significativo de link disponível apenas para leitores de tela',
	LINK_SUS_ALT: 'Este alt descreve a imagem ou o link?',
	LINK_SYMBOLS: 'Verificação manual: os símbolos ou emojis neste link são significativos?',
	LINK_URL: 'O texto do link não deve ser uma URL',
	META_LANG: 'Meta tag de idioma da página ausente',
	META_MAX: 'Meta tag limita o quanto o usuário pode ampliar o texto',
	META_REFRESH: 'Meta tag atualiza automaticamente a página',
	META_SCALABLE: 'Meta tag impede que o usuário aumente o texto',
	META_TITLE: 'Meta tag para o título da página ausente',
	MISSING_ALT: 'HTML inválido: imagem sem atributo alt',
	MISSING_ALT_LINK: 'HTML inválido: imagem vinculada sem atributo alt',
	MISSING_ALT_LINK_HAS_TEXT: 'HTML inválido: imagem dentro de link sem atributo alt',
	QA_BAD_LINK: 'Verificação manual: destino do link pode ser inválido',
	QA_BLOCKQUOTE: 'Este bloco de citação deveria ser um cabeçalho?',
	QA_DOCUMENT: 'Este documento foi marcado para leitores de tela?',
	QA_FAKE_HEADING: 'Este texto em negrito deveria ser um cabeçalho?',
	QA_FAKE_LIST: 'Isto deveria ser formatado como uma lista?',
	QA_IN_PAGE_LINK: 'Link interno quebrado',
	QA_JUSTIFY: 'Não justifique texto',
	QA_NESTED_COMPONENTS: 'Componentes interativos aninhados',
	QA_PDF: 'Existe uma alternativa para este PDF?',
	QA_SMALL_TEXT: 'O texto está muito pequeno',
	QA_STRONG_ITALICS: 'Blocos grandes de texto enfatizado são mais difíceis de ler',
	QA_SUBSCRIPT: 'Não use sobrescrito ou subscrito como formatação visual',
	QA_UNDERLINE: 'Apenas links devem ser sublinhados',
	QA_UPPERCASE: 'Este texto em maiúsculas é necessário?',
	SUS_ALT: 'Existem palavras redundantes neste texto alternativo?',
	TABINDEX_ATTR: 'O atributo tabindex afeta a ordem de leitura',
	TABLES_EMPTY_HEADING: 'Esta célula de cabeçalho precisa de texto',
	TABLES_MISSING_HEADINGS: 'Esta tabela precisa de uma linha e/ou coluna de cabeçalhos',
	TABLES_SEMANTIC_HEADING: 'Cabeçalhos de conteúdo não devem ser usados dentro de tabelas',
	UNCONTAINED_LI: 'Lista HTML inválida',
};

const why = {
	fix: `<strong class="badge">Como corrigir</strong> `,
	check: `<strong class="badge">Verificação manual</strong> `,

	buttons: `<div class="why"><p>Observação: o nome acessível de um botão deve deixar claro o que ele faz. Botões que mudam quando clicados também devem mudar seu nome:</p><ul>
<li>Rótulos que mudam:<br>"Reproduzir/Pausar", "Mostrar detalhes/Ocultar detalhes"</li>
<li>Mudando <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">de atributos de estado</a>:<br>"Reproduzir/Reproduzir, pressionado", "Detalhes, recolhido/Detalhes, expandido."</li>
</ul>
<p>Apenas não altere ambas as coisas ao mesmo tempo. Mudar “Reproduzir” para “Pausar, pressionado” significa que o player está pausado — não tocando!</p></div>`,

	headings: `<div class="why"><p>Dica: cabeçalhos e subtítulos organizam conteúdo em uma estrutura hierárquica. Usuários de leitores de tela dependem dessa estrutura para entender e navegar pelas páginas:</p><ul>
<li>Nível de cabeçalho 1: títulos de página
<ul><li>Nível de cabeçalho 2: tópicos principais
<ul><li>Nível de cabeçalho 3: subtópicos</li></ul>
</li></ul>
</li>
</ul></div>`,

	images: `<div class="why"><p>Dica: descreva o que uma imagem significa, não apenas o que ela contém. Dependendo do contexto, uma foto de uma criança chutando uma bola pode significar:</p><ul>
<li>Elas jogaram debaixo de chuva forte.</li>
<li>Os novos uniformes do time têm logos de dragão muito legais.</li>
<li>Ela marcou o gol da vitória pela lateral esquerda!</li>
</ul></div>`,

	links: `<div class="why"><p>Leitores percorrem rapidamente uma página procurando links e usando a busca na página. Por isso, bons links devem ser significativos, únicos e concisos:</p><ul>
<li>Ideal: "Saiba mais sobre <a href="https://webaim.org/techniques/hypertext/link_text">links significativos</a>"</li>
<li>Não é único: "Clique <a href="https://webaim.org/techniques/hypertext/link_text">aqui</a> para saber mais sobre links significativos."</li>
<li>Não é conciso: "<a href="https://webaim.org/techniques/hypertext/link_text">Clique aqui para saber mais sobre links significativos</a>"</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>O objetivo do texto alternativo é fornecer uma alternativa ao significado de uma imagem, não apenas descrever seu conteúdo visual. No caso de uma imagem que é um link, o significado é o destino desse link:</p><ul>
<li>"<em>Uma lupa</em>" descreve a imagem, não o link.</li>
<li>"<em>Uma lupa de pesquisa</em>" descreve ambas de maneira confusa.</li>
<li>"<em>Pesquisar</em>" descreve corretamente o destino do link.</li>
</ul></p></div>`,
};

export const tips = {

	ALT_FILE_EXT: `<p>Leitores de tela irão ditar esta URL, muitas vezes letra por letra. Isso provavelmente não transmite o mesmo significado que ver a imagem.</p><p>${why.fix}Adicione um alt vazio (alt="") se isto for uma decoração sem significado que deve ser ignorada por leitores de tela, ou adicione um texto alternativo descritivo.</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>Descrição fornecida para esta imagem: <strong>"%(alt)"</strong></p><p>${why.fix}Defina o texto alternativo desta imagem como uma descrição concisa do que ela significa neste contexto.</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>Descrição fornecida para esta imagem: <strong>"%(alt)"</strong></p><p>${why.fix}Defina o texto alternativo desta imagem como uma descrição concisa do que ela significa neste contexto.</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>O texto alternativo desta imagem é "%(alt)", contendo apenas símbolos e/ou espaços impossíveis de pronunciar. Leitores de tela irão anunciar que há uma imagem e então fazer uma pausa estranha: "imagem: ____."</p><p>${why.fix}Adicione um alt descritivo ou deixe o alt completamente vazio (alt="") se isto for apenas um ícone ou elemento de espaçamento que deveria ser ignorado.</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}Use qualquer método válido para informar aos leitores de tela o que este botão faz — por exemplo, texto, alt em um ícone, ou um atributo title.</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>Este botão possui um atributo <code>aria-labelledby</code> que está vazio ou não corresponde ao valor de <code>ID</code> de outro elemento na página.</p><p>${why.fix}Conecte a ID a um elemento válido ou remova esse atributo e descreva o botão de outra forma.</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: 'Uma imagem de fundo ou gradiente faz com que este verificador não consiga determinar com certeza a cor atrás deste texto. Use o seletor de cores abaixo para verificar manualmente.',

	DUPLICATE_ID: `<p>IDs são usadas nesta página para rótulos ou destinos de links, o que significa que precisam ser únicas.</p><p>${why.fix}Altere esta ID: <strong>#%(id)</strong></p><div class="why"><p>Na maioria dos sistemas de gestão de conteúdo, isso vem de um campo chamado "name" ou "id". Em HTML, é um atributo: <code><a id="MY-ID"></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}Delete o atributo <code>title</code> deste link.</p><div class="why"><p>Observação: tooltips de <code>title</code> só aparecem com o mouse. Eles não podem ser vistos ao navegar por teclado ou em dispositivos móveis, então muitos usuários nunca verão estes tooltips. Eles não devem conter informações importantes.</p></div>`,

	EMBED_AUDIO: `<p>Se este áudio contém fala, uma <a href="https://www.w3.org/WAI/media/av/transcribing/">alternativa em texto</a> deve ser fornecida nesta página ou em um link.</p><p>Legendas automáticas precisam ser revisadas por uma pessoa para garantir que os falantes e sons significativos estejam corretamente identificados.</p>`,

	EMBED_DATA_VIZ: `<p>Widgets de visualização embutidos muitas vezes são difíceis ou impossíveis de usar com tecnologias assistivas, podem ser difíceis de interpretar para pessoas com baixa visão ou daltonismo e podem exigir muito deslocamento horizontal em celulares.</p><p>${why.fix}A menos que esta incorporação tenha alto contraste visual, seja totalmente operável por teclado <strong><em>e</em></strong> possa ser descrita por leitores de tela, forneça uma alternativa equivalente, como descrição em texto, tabela de dados ou planilha para download.</p>`,

	EMBED_GENERAL: 'Ferramentas automáticas não conseguem testar conteúdo dentro de embeds. Certifique-se de que todas as imagens possuem texto alternativo, vídeos têm legendas, o texto tem contraste adequado e links e botões são <a href="https://webaim.org/techniques/keyboard/">acessíveis por teclado</a>, e então ignore este alerta.',

	EMBED_MISSING_TITLE: `<p>Embeds precisam de um nome acessível que descreva seu conteúdo para leitores de tela.</p><p>${why.fix}Forneça um atributo <code>title</code> ou <code>aria-label</code> único.</p>`,

	EMBED_UNFOCUSABLE: `Este atributo indica para teclados e tecnologias assistivas que devem ignorar o elemento. A menos que o conteúdo do iframe não contenha links, botões ou formulários e não possa ser rolado, este atributo deve ser removido.`,

	EMBED_VIDEO: `<p>Vídeos devem fornecer legendas.</p><p>Legendas automáticas precisam ser revisadas para garantir que falas e efeitos sonoros importantes estejam corretamente identificados.</p><p>${why.fix}Adicione ou revise as legendas e depois ignore este alerta.</p>`,

	HEADING_EMPTY: `<p>Cabeçalhos vazios criam lacunas confusas na estrutura da página.</p><p>${why.fix}Adicione texto a este cabeçalho ou remova esta linha vazia.</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>Cabeçalhos vazios criam lacunas confusas na estrutura da página.</p><p>${why.fix}Se isto não for um cabeçalho, altere o formato de <strong {C}>Cabeçalho %(level)</strong> para <strong>Parágrafo</strong>. Caso seja um cabeçalho, coloque o significado da imagem no seu texto alternativo.</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}Certifique-se de que o título da página está marcado como Cabeçalho 1 ou Cabeçalho 2. ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}A menos que seja um título fixo, como o de um artigo publicado, reduza o comprimento para facilitar a leitura rápida.</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}Marque o título da página como um cabeçalho de nível 1 para iniciar a estrutura do documento.</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>Este cabeçalho saltou de <strong>nível %(prevLevel)</strong> para <strong>nível %(level)</strong>. Em leitores de tela, isso soa como se conteúdo estivesse faltando.</p><p>${why.fix}Ajuste os níveis para formar uma estrutura correta sem lacunas.</p>${why.headings}`,

	HIDDEN_FOCUSABLE: 'Este elemento interativo possui <code>aria-hidden="true"</code>, mas ainda pode receber foco pelo teclado. Se pretende escondê-lo de leitores de tela, também deve adicionar <code>tabindex="-1"</code>. Caso contrário, remova o atributo <code>aria-hidden="true"</code>.',

	IMAGE_ALT_TOO_LONG: `<p>Leitores de tela anunciam textos alternativos como uma única frase corrida; se alguém perder alguma parte, terá de ouvir tudo novamente.</p><p>O texto alternativo desta imagem, com %(altLength) caracteres, é: <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>Dica: imagens complexas que transmitem mais informação do que cabe em uma frase normalmente precisam de uma <strong>legenda visível</strong> ou outra alternativa que descreva os detalhes importantes.</p></div>`,

	IMAGE_DECORATIVE: `<p>Esta imagem foi escondida de leitores de tela usando um alt vazio. Apenas imagens sem significado — como ícones redundantes — devem ser ocultadas desta forma.</p><p>${why.fix}Se esta imagem adiciona valor à página, forneça um texto alternativo.</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'A imagem está marcada como <strong>decorativa</strong>, mas todas as imagens em um carrossel ou galeria devem incluir texto alternativo descritivo.',

	IMAGE_FIGURE_DECORATIVE: `<p>Esta imagem será ignorada por tecnologias assistivas. A legenda faz sentido sem a imagem?</p><p>${why.fix}Se a legenda não descrever totalmente o significado visual da imagem, forneça texto alternativo para o que a legenda não cobre.</p><div class="why"><p>Dica: imagens, textos alternativos e legendas funcionam juntos:</p><ul><li>Legendas visíveis fornecem contexto e interpretação.</li><li>Textos alternativos descrevem a imagem para quem não pode vê-la, permitindo entender o que a legenda descreve.</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Altere o texto alternativo para descrever o significado visual da imagem.</p><div class="why"><p>Dica: imagens, textos alternativos e legendas funcionam juntos:</p><ul><li>Legendas visíveis fornecem contexto e interpretação.</li><li>Textos alternativos descrevem a imagem para quem não pode vê-la, ajudando a compreender o que a legenda discute.</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: '<p><strong {B}>Rótulo invisível do campo:</strong> <strong {C}>%(TEXT)</strong></p><p>Verifique se existe um rótulo visível, que ele permanece quando há texto no campo e se corresponde ao nome acessível invisível.</p><div class="why"><p>Rótulos fornecidos apenas por title ou placeholder desaparecem quando o usuário começa a digitar, dificultando revisar valores e facilitando esquecimentos.</p></div>',

	LABELS_INPUT_RESET: `<p>Botões de limpar podem ser clicados por engano, causando perda de dados sem chance de cancelar ou desfazer.</p><p>${why.fix}A menos que este botão limpe apenas um único campo, considere removê-lo ou adicionar uma confirmação antes da ação.</p>`,

	LABELS_MISSING_IMAGE_INPUT: 'O botão de imagem não possui texto alternativo. Adicione texto alternativo para servir como nome acessível, como <em>Pesquisar</em> ou <em>Enviar</em>.',

	LABELS_MISSING_LABEL: 'Não existe um rótulo associado a este campo. Por favor, adicione um <code>id</code> ao campo e um atributo <code>for</code> correspondente ao rótulo.',

	LABELS_NO_FOR_ATTRIBUTE: 'Não existe um rótulo associado a este campo. Adicione ao rótulo um atributo <code>for</code> que corresponda ao atributo <code>id</code> deste campo. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>O texto do placeholder desaparece assim que o usuário começa a digitar, e frequentemente possui contraste insuficiente ou é confundido com conteúdo.</p><p>${why.fix}Garanta que informações importantes como o rótulo do campo, instruções de formato e ajuda permaneçam visíveis mesmo após inserir dados, e considere remover o placeholder se ele não for essencial.</p>`,

	LABEL_IN_NAME: `<p>O texto visível deste elemento parece diferente do nome acessível. Isso pode confundir usuários de leitores de tela e prejudicar comandos de voz.</p><p>${why.check}Garanta que o rótulo visível comece com o texto do rótulo invisível e não contenha informações adicionais importantes.</p><p><strong>Rótulo invisível:</strong> "%(TEXT)"</p>`,

	LINK_ALT_FILE_EXT: `<p>O texto alternativo desta imagem inclui "%(alt)", o que provavelmente significa que é um nome de arquivo e não descreve o destino do link.</p><p>${why.fix}Defina o texto alternativo desta imagem como o nome do destino do link.</p><div class="why"> <p>O objetivo do texto alternativo é fornecer uma alternativa ao significado da imagem. No caso de imagens linkadas, o significado é o destino do link:</p><ul><li>"Página com texto" descreve a imagem, não o link.</li><li>"IMG_1234.jpg" é apenas um nome de arquivo.</li><li>"<strong><em>Formulário de inscrição (.doc)</em></strong>" é um destino real de link.</li></ul></p></div>`,

	LINK_ALT_MAYBE_BAD: `<p>O texto alternativo desta imagem é um placeholder: "<strong>%(alt)</strong>".</p><p>${why.fix}Defina o alt desta imagem como o nome do destino do link.</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>O texto alternativo desta imagem linkada contém apenas símbolos impronunciáveis e/ou espaços: "%(ALT_TEXT)". Leitores de tela anunciarão o link mas não conseguirão descrevê-lo.</p><p>${why.fix}Defina o alt da imagem como a finalidade ou destino do link.</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `A expressão "clique aqui" é redundante e tira o foco do propósito real da ligação.`,

	LINK_DOI: `<p>${why.fix}Use o título do artigo como link e apresente o DOI como texto simples, em vez de linkar o DOI e deixar o título sem link.</p><div class="why"><p>https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20linksA APA recomenda</a> links descritivos, pois usuários procuram rapidamente por nomes de links. Títulos linkados melhoram acessibilidade e encontrabilidade.</p><p>Isso também permite que leitores de tela anunciem links significativos, em vez de cadeias de números sem sentido.</p></div>`,

	LINK_EMPTY: `<p>${why.fix}Adicione texto descrevendo o destino do link ou o exclua caso seja um erro, como um espaço acidental linkado.</p><div class="why"><p>Leitores de tela têm dificuldade para descrever links vazios: podem ficar silenciosos (“Link, [...]”) ou ler a URL por extenso.</p><p>Espaços linkados podem ser difíceis de excluir em alguns editores; às vezes é necessário remover o texto ao redor.</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>Este link tem um atributo <code>aria-labelledby</code> que não corresponde ao <code>ID</code> de nenhum elemento na página.</p><p>${why.fix}Forneça um <code>ID</code> válido ou remova o atributo e descreva o link de outra forma.</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Adicione texto descrevendo seu destino ou apague o link se ele for um erro.</p><div class="why"><p>Leitores de tela têm dificuldade para lidar com links vazios e podem ler a URL letra por letra.</p><p>Links contendo apenas espaços podem exigir apagar partes ao redor para serem removidos.</p></div>`,

	LINK_FILE_EXT: `<p>Este link aponta para um PDF ou arquivo descarregável (MP3, ZIP, Word, etc.) sem aviso.</p><p>${why.fix}Use texto ou um ícone para https://itmaybejj.github.io/linkpurpose/indicar o tipo de arquivo</a> no link.</p><p class="why">Para arquivos grandes, considere incluir o tamanho: por exemplo, "Relatório Executivo (PDF, 3 MB)".</p>`,

	LINK_IDENTICAL_NAME: `<p>Links para diferentes destinos têm o mesmo nome: "<strong>%(TEXT)</strong>".</p><p>${why.fix}Reescreva links que levam a destinos diferentes com textos exclusivos que descrevam esses destinos.</p>${why.links}`,

	LINK_IMAGE_ALT: `Garanta que este alt descreve o destino do link:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Verifique se isto ajuda a descrever o destino do link, em vez de adicionar conteúdo redundante:</p><p><strong class="badge">Alt</strong> "<em><strong>%(alt)</strong></em>"</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p>https://webaim.org/techniques/hypertext/link_text#alt_linkO alt de uma imagem linkada é usado para descrever o destino do link</a>. Links devem ser breves e claros, pois leitores de tela frequentemente navegam por listas de links. Alt‑textos longos geralmente descrevem a imagem em vez do destino.</p>Este alt possui %(altLength) caracteres: <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>Quando uma imagem é usada dentro de um link, o seu texto alternativo https://webaim.org/techniques/hypertext/link_text#alt_linkfornece o nome do link</a>.</p><p>${why.fix}Defina a alt‑text da imagem como a função ou destino do link.</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'A imagem foi marcada como decorativa, embora o link esteja usando texto adjacente como rótulo.',

	LINK_NEW_TAB: `<p>${why.fix}Configure este link para abrir na mesma aba ou https://itmaybejj.github.io/linkpurpose/avise primeiro os usuários</a>.</p><div class="why"><p>Usuários podem decidir abrir um link em nova aba se quiserem. Quando o site força isso, pode ser confuso — especialmente para usuários que dependem do botão “voltar”.</p><p>Observação: em formulários, abrir links em nova aba pode evitar perda de dados.</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>O alt desta imagem ligada é um placeholder: "<strong>%(alt)</strong>".</p><p>${why.fix}Defina a alt‑text como o nome do destino do link.</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>Este link contém texto que não ajuda a descrever seu destino:<br><strong>%(text)</strong></p><p>${why.fix}Escreva um texto de link conciso que descreva seu destino.</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>Foi fornecido um nome acessível via ARIA, mas o texto visível do link é genérico: "<strong {C}>%(ERROR)</strong>".</p><p>${why.fix}Escreva textos de link significativos para todos e garanta que o rótulo visual corresponda ao nome acessível.</p>${why.links}`,

	LINK_SUS_ALT: `<p>O alt desta imagem contém a palavra "%(alt)", o que geralmente indica que ele descreve a imagem, não o destino do link.</p><strong class="badge">Alt‑texto</strong> "%(ALT_TEXT)"    <p>Para corrigir: verifique se o alt descreve a finalidade ou destino do link.<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}Evite usar símbolos como chamadas para ação dentro do texto de links, a menos que estejam ocultos de tecnologias assistivas. Leitores de tela podem pronunciá‑los de maneira confusa. Considere remover: <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}Mude este link para um título que descreva seu destino ou propósito.</p><div class="why"><p>Usuários percorrem páginas procurando links por nome — isso é ainda mais comum com leitores de tela.</p><p>URLs como texto de link não podem ser facilmente buscadas ou identificadas.</p></div>`,

	META_LANG: `<p>${why.fix}Adicione um https://www.w3.org/International/questions/qa-html-language-declarationsatributo de idioma</a> na tag HTML da página.</p><div class="why"><p>Leitores de tela precisam do idioma correto para pronunciar palavras adequadamente. Se a língua não for informada, o leitor pode adivinhar errado.</p></div>`,

	META_MAX: `<p>Esta meta tag limita o quanto os usuários podem ampliar o texto.</p><p>${why.fix}Remova ou ajuste esta limitação para permitir zoom completo.</p>`,

	META_REFRESH: `<p>Páginas não devem atualizar automaticamente usando uma meta tag. Isso interrompe o usuário sem aviso, pode fazê-lo perder o local onde estava ou apagar dados de formulários.</p><p>${why.fix}Use AJAX para atualizar conteúdo sem recarregar a página, ou use JavaScript para solicitar confirmação antes de recarregar.</p>`,

	META_SCALABLE: `<p>Esta meta tag impede que usuários aumentem o tamanho do texto.</p><p>${why.fix}Permita zoom total removendo ou ajustando esta configuração.</p>`,

	META_TITLE: `<p>${why.fix}Adicione uma tag <code><title></code> dentro do elemento <code><head></code> da página.</p><div class="why"><p>Um https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/titletítulo curto e único</a> é importante:</p><ul><li>É usado por motores de busca nos resultados.</li><li>É exibido como título das abas do navegador.</li><li>É anunciado por leitores de tela ao alternar abas.</li></ul><p>Sem um título, usuários verão/ouvirão apenas a URL.</p></div>`,

	MISSING_ALT: `<p>Quando leitores de tela encontram uma imagem sem atributo alt, eles ditam o URL do arquivo da imagem, frequentemente letra por letra.</p><p>${why.fix}Adicione um alt vazio (alt="") para indicar que a imagem deve ser ignorada, ou adicione um texto alternativo descritivo.</p>${why.images}`,

	MISSING_ALT_LINK: `<p>Quando leitores de tela encontram uma imagem ligada sem atributo alt, eles ditam o URL do arquivo. Isso é especialmente problemático em imagens dentro de links.</p><p>${why.fix}Forneça um alt que corresponda ao destino do link.</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>Esta imagem faz parte de um link com texto. Se o texto visível descreve adequadamente o destino, adicione alt="" para que leitores de tela ignorem a imagem. Caso contrário, adicione um alt descrevendo o destino ou propósito.</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>O link parece apontar para um ambiente de desenvolvimento:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Substitua por um caminho relativo (/pasta) ou pela URL pública.</p>`,

	QA_BLOCKQUOTE: `<p>A formatação blockquote indica aos leitores de tela que o texto deve ser anunciado como uma citação. Citações curtas muitas vezes são na verdade cabeçalhos.</p><p>${why.fix}Se isto for um cabeçalho, use formatação apropriada para que ele apareça na estrutura da página.</p>${why.headings}`,

	QA_DOCUMENT: `<p>Documentos vinculados também são considerados conteúdo web e precisam ser acessíveis. Verifique se o documento possui cabeçalhos, cabeçalhos de tabela e textos alternativos.</p><ul class="why"><li>Torne o seu https://support.google.com/docs/answer/6199477?hl=pt-BRdocumento do Google Workspace</a> mais acessível.</li><li>Torne os seus https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155documentos Office</a> mais acessíveis.</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}Se este texto em negrito introduz um novo tópico, substitua a formatação visual por um estilo de cabeçalho.</p><div class="why"><p>Dica: cabeçalhos criam uma estrutura navegável para tecnologias assistivas.</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}Se "%(text)" faz parte de uma lista, substitua pela formatação de lista.</p><div class="why"><p>Listas são estruturais e facilitam leitura e navegação:</p><ol><li>Listas alinham recuos, melhorando legibilidade.</li><li>Listas são legíveis por leitores de tela, que anunciam a posição (“item 3 de 7”).</li></ol><p>Mas uma frase numerada não cria uma lista estrutural.</p></div>`,

	QA_IN_PAGE_LINK: `<p>O destino desta ligação não corresponde a nenhum elemento existente na página.</p><div class="why"><p>Nota para desenvolvedores: se isto dispara um evento JavaScript, teste se funciona com teclado antes de ignorar este alerta.</p></div>`,

	QA_JUSTIFY: `<p>Texto justificado insere espaços adicionais para alinhar bordas esquerda e direita. As lacunas irregulares dificultam a leitura para muitas pessoas.</p><p>${why.fix}Use texto alinhado à esquerda.</p>`,

	QA_NESTED_COMPONENTS: 'Evite aninhar componentes interativos — como acordeões dentro de acordeões ou abas dentro de acordeões. Isso dificulta a navegação e aumenta a carga cognitiva.',

	QA_PDF: `<p>${why.fix}Faça uma das ações abaixo e depois ignore este alerta:</p><ul><li>Link para uma página web em vez do PDF,</li><li>Ou forneça também uma página web ou documento editável, para que o PDF seja apenas a opção para impressão,</li><li>Ou, no mínimo, certifique‑se de que o PDF está acessível verificando marcação, ordem de leitura, cabeçalhos e alt‑textos.</li></ul><div class="why"><p>Usuários de celular e tecnologias assistivas quase sempre preferem páginas web a PDFs, pois PDFs não se ajustam bem a telas pequenas e frequentemente não possuem marcação acessível.</p></div>`,

	QA_SMALL_TEXT: 'Texto pequeno é mais difícil de ler, especialmente para pessoas com baixa visão. Evite tamanhos menores do que o padrão.',

	QA_STRONG_ITALICS: `<p>${why.fix}Use negrito e itálico apenas para palavras ou frases importantes.</p><div class="why"><p>Nota: se isto for uma citação, use o elemento blockquote.</p></div>`,

	QA_SUBSCRIPT: `Superscrito e subscrito tornam o texto pequeno e difícil de ler. Use apenas em casos como números ordinais (4º), fórmulas químicas (H<sub>2</sub>O) e referências de notas de rodapé.`,

	QA_UNDERLINE: `<p>No ambiente web, texto sublinhado indica link. Usuários irão presumir que o texto é clicável.</p><p>${why.fix}Use <strong>negrito</strong> ou <em>itálico</em> para ênfase, e use cabeçalhos reais para estruturar o conteúdo.</p><div class="why"><p>Nota: leitores de tela não anunciam formatação visual como sublinhado. Apenas cabeçalhos adicionam estrutura.</p></div>`,

	QA_UPPERCASE: `<p>BLOCOS DE TEXTO EM MAIÚSCULAS SÃO MAIS DIFÍCEIS DE LER E PODEM SER INTERPRETADOS COMO “GRITOS”.</p><p>${why.fix}Use maiúsculas com moderação, preferindo negrito para destaque.</p><div class="why"><p>Nota: leitores de tela não anunciam negrito. Use cabeçalhos para marcar mudanças importantes de tópico.</p></div>`,

	SUS_ALT: `<p>O alt desta imagem inclui a palavra "%(alt)", que provavelmente é redundante:</p><p><strong class="badge">Alt‑texto</strong> "%(ALT_TEXT)"</p><p>Para corrigir: reescreva o alt de forma breve e significativa.</p><div class="why"><p>Dica: leitores de tela já anunciam “imagem”, então frases como “imagem de” geralmente são redundantes.</p><p>Isto é aceitável apenas quando essas palavras são parte do conteúdo significativo:</p><ul><li>Não redundante: "<em>Uma foto em</em> um álbum de fotos sendo mostrado à turma."</li><li>Redundante: "<em>Foto de</em> uma foto em um álbum..."</li></ul></div>`,

	TABINDEX_ATTR: `<p>${why.fix}Nunca use valores de tabindex maiores do que “0”. Ajuste a ordem dos elementos no HTML para que a ordem de leitura, de tabulação e visual permaneçam consistentes.</p><div class="why"><p>Por padrão, a ordem visual, a ordem de tabulação e a ordem anunciada por leitores de tela são as mesmas.</p><p>Definir tabindex positivo move um elemento para o início da ordem de tabulação, <strong>mas não altera a ordem visual ou de leitura</strong>, causando confusão.</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}Certifique‑se de que cada célula de cabeçalho contenha texto.</p><div class="why"><p>Dica: leitores de tela usam cabeçalhos de tabelas para orientar na navegação.</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Edite as propriedades da tabela e indique se há cabeçalhos na primeira linha, primeira coluna ou ambas.</p><div class="why"> <p>Dica: leitores de tela repetem o cabeçalho relevante ao entrar em cada célula.</p><p>Se a tabela não contém dados e serve apenas para layout, remova a formatação de tabela.</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Remova este formato de cabeçalho (h2, h3). Forneça cabeçalhos de tabela adequados. Se precisar de vários níveis, divida o conteúdo em várias tabelas.</p><div class="why"> <p>Dica: cabeçalhos de tabela são direcionais (linha ou coluna). Cabeçalhos de conteúdo afetam todas as células seguintes.</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Um <strong>cabeçalho de tabela</strong> na célula 2 rotula a célula B. <br><br> Um <strong>cabeçalho de conteúdo</strong> na célula 2 rotula as células 3, A, B e C, além deste texto e deste rodapé.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,

}

export const interfaceStrings = {
	ALERT_CLOSE: 'Fechar',
	ALT: 'Texto alternativo: ',
	DECORATIVE: 'Marcado como decorativo',
	DISMISS: 'Ignorar',
	DISMISS_ALL: 'Nesta página: ignorar',
	edit_page: 'Editar página',
	edit_layout: 'Editar layout',
	edit_term: 'Editar termo',
	edit_tags: 'Editar usuário',
	IMAGES: 'Texto alternativo',
	MAIN_TOGGLE_LABEL: 'Alternar ferramentas de acessibilidade',
	MISSING: '(faltando!)',
	NOT_VISIBLE: 'Observação: este conteúdo pode não estar visível. Procure dentro do contêiner demarcado.',
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
	dismissHideTitle: 'Oculta o alerta somente para você',
	dismissOkAllButton: 'Nesta página: marcar como OK',
	dismissOkButtonContent: 'Marcar como OK',
	dismissOkTitle: 'Oculta o alerta para todos os editores',
	dismissOnSite: 'Em todas as páginas: marcar como OK',
	dismissalsHeader: 'Não vai corrigir isto?',
	errorOutlinePrefixHeadingEmpty: '(cabeçalho vazio)',
	errorOutlinePrefixHeadingIsLong: '(marcado por comprimento)',
	errorOutlinePrefixSkippedLevel: '(marcado por nível pulado)',
	issueContent: 'Problema de conteúdo',
	issueDeveloper: 'Problema de desenvolvimento',
	issueTemplate: 'Problema de template',
	main_toggle_hide: 'Ocultar ferramentas de acessibilidade',
	main_toggle_hide_alerts: 'Ocultar alertas de acessibilidade',
	main_toggle_show: 'Mostrar ferramentas de acessibilidade',
	main_toggle_show_alerts: 'Mostrar alertas de acessibilidade',
	panelCheckAltText: '<p class="ed11y-small">Verifique se cada imagem descreve o que significa no contexto e se não há imagens contendo texto.</p>',
	panelCheckOutline: '<p class="ed11y-small">Isto mostra a estrutura de cabeçalhos. Verifique se ela corresponde à organização visual do conteúdo.</p>',
	PANEL_HEADING_MISSING_ONE: 'Falta Cabeçalho 1.',
	PANEL_NO_HEADINGS: 'Nenhum cabeçalho encontrado.',
	reportsLink: 'Abrir relatórios do site',
	toggleDisabled: 'Não há conteúdo disponível para o Editoria11y verificar.',
	transferFocus: 'Editar este conteúdo',
	unDismissHideButton: 'Restaurar este alerta ignorado',
	unDismissNotePermissions: 'Esta verificação foi ocultada por um administrador',
	unDismissOKButton: 'Restaurar este alerta marcado como OK',
}

const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips),
  testNames: testNames,
};

export default newStrings;
