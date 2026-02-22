import {default as Sa11yStrings} from '../sa11y-lang/ptBR.js';

// todo check each file for link integrity, and escaping of tags in code blocks.
const testNames = {
	ALT_FILE_EXT: 'Este texto alternativo é um nome de arquivo, não uma descrição',
	ALT_MAYBE_BAD: 'Este texto alternativo pode não ser pronunciado corretamente por um leitor de tela',
	ALT_PLACEHOLDER: 'Este texto alternativo não descreve a imagem',
	ALT_UNPRONOUNCEABLE: 'Este texto alternativo é impossível de pronunciar',
	BTN_EMPTY: 'O botão não possui um rótulo acessível',
	BTN_EMPTY_LABELLEDBY: 'O botão possui um rótulo ARIA inválido',
	BTN_ROLE_IN_NAME: 'O nome do botão repete a palavra “button”',
	CONTRAST_ERROR: 'O texto não tem contraste suficiente para leitura confortável',
	CONTRAST_ERROR_GRAPHIC: 'A imagem ou o ícone não têm contraste suficiente',
	CONTRAST_INPUT: 'O campo de entrada não tem contraste suficiente para leitura confortável',
	CONTRAST_PLACEHOLDER: 'O texto do placeholder não tem contraste suficiente',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: 'O texto do placeholder possui contraste suficiente?',
	CONTRAST_WARNING: 'Este texto possui contraste suficiente?',
	CONTRAST_WARNING_GRAPHIC: 'Este gráfico ou ícone possui contraste suficiente?',
	DUPLICATE_ID: 'Atributo ID duplicado',
	DUPLICATE_TITLE: 'Este link possui um tooltip com o mesmo texto do link',
	EMBED_AUDIO: 'Este áudio possui transcrição?',
	EMBED_DATA_VIZ: 'Esta visualização é acessível?',
	EMBED_GENERAL: 'Iframes incorporados exigem verificação manual',
	EMBED_MISSING_TITLE: 'Frame sem atributo “title”',
	EMBED_UNFOCUSABLE: 'Um frame com tabindex="‑1" não será acessível pelo teclado',
	EMBED_VIDEO: 'Este vídeo possui legendas corretas?',
	HEADING_EMPTY: 'Este cabeçalho não possui texto',
	HEADING_EMPTY_WITH_IMAGE: 'Esta imagem é usada como cabeçalho e precisa de texto alternativo',
	HEADING_FIRST: 'O primeiro cabeçalho nesta página é um subtítulo',
	HEADING_LONG: 'Este cabeçalho pode ser mais curto?',
	HEADING_MISSING_ONE: 'Esta página não possui um Cabeçalho 1',
	HEADING_SKIPPED_LEVEL: 'Este cabeçalho está marcado no nível incorreto',
	HIDDEN_FOCUSABLE: 'Este elemento não pode ser descrito adequadamente por leitores de tela',
	IMAGE_ALT_TOO_LONG: 'Este texto alternativo pode ser mais curto?',
	IMAGE_DECORATIVE: 'Esta imagem é realmente apenas decorativa?',
	IMAGE_DECORATIVE_CAROUSEL: 'Imagem em carrossel/galeria marcada como decorativa',
	IMAGE_FIGURE_DECORATIVE: 'Verificação manual: imagem com legenda, porém sem texto alternativo',
	IMAGE_FIGURE_DUPLICATE_ALT: 'O texto alternativo não deve ser idêntico à legenda',
	LABELS_ARIA_LABEL_INPUT: 'Existe um rótulo visível para este campo?',
	LABELS_INPUT_RESET: 'Este botão “Limpar/Redefinir” é necessário?',
	LABELS_MISSING_LABEL: 'Este campo de entrada não está associado a um rótulo',
	LABELS_PLACEHOLDER: 'Verificação manual: texto de placeholder',
	LABEL_IN_NAME: 'O rótulo visível não corresponde ao nome acessível',
	LINK_ALT_FILE_EXT: 'Alt usado como link não deve ser uma URL',
	LINK_ALT_MAYBE_BAD: 'Este alt em link pode não ser pronunciado corretamente por leitores de tela',
	LINK_ALT_UNPRONOUNCEABLE: 'Imagens usadas como link precisam de texto alternativo pronunciável',
	LINK_CLICK_HERE: 'Verificação manual: o link contém “clique aqui”',
	LINK_DOI: 'Use o título do artigo como link, não o número DOI',
	LINK_EMPTY: 'Este link não contém palavras.',
	LINK_EMPTY_LABELLEDBY: 'Link com atributo “aria‑labelledby” inválido',
	LINK_EMPTY_NO_LABEL: 'Este link precisa de um rótulo',
	LINK_FILE_EXT: 'O link leva a um arquivo sem aviso prévio',
	LINK_IDENTICAL_NAME: 'Links com o mesmo texto levam a páginas diferentes',
	LINK_IMAGE_ALT: 'Verificação manual: imagem usada como link com alt‑texto',
	LINK_IMAGE_ALT_AND_TEXT: 'Este texto alternativo faz sentido no contexto do link?',
	LINK_IMAGE_LONG_ALT: 'O alt desta imagem usada como link pode ser mais curto?',
	LINK_IMAGE_NO_ALT_TEXT: 'Esta imagem usada como link precisa de texto alternativo',
	LINK_IMAGE_TEXT: 'Verificação manual: imagem dentro de link marcada como decorativa',
	LINK_NEW_TAB: 'Este link abre nova aba sem aviso?',
	LINK_PLACEHOLDER_ALT: 'Esta imagem usada como link precisa de texto alternativo significativo',
	LINK_STOPWORD: 'Este link contém apenas palavras genéricas',
	LINK_STOPWORD_ARIA: 'Texto significativo do link está disponível apenas via ARIA para leitores de tela',
	LINK_SUS_ALT: 'Este alt descreve a imagem ou o destino do link?',
	LINK_SYMBOLS: 'Verificação manual: símbolos ou emojis no link são significativos?',
	LINK_URL: 'O texto do link não deve ser uma URL',
	META_LANG: 'Falta a meta tag que indica o idioma da página',
	META_MAX: 'Meta tag limita o quanto usuário pode ampliar o texto',
	META_REFRESH: 'Meta tag atualiza automaticamente a página',
	META_SCALABLE: 'Meta tag impede que o usuário amplie o texto',
	META_TITLE: 'Falta a meta tag do título da página',
	MISSING_ALT: 'HTML inválido: imagem sem atributo alt',
	MISSING_ALT_LINK: 'HTML inválido: imagem usada como link sem atributo alt',
	MISSING_ALT_LINK_HAS_TEXT: 'HTML inválido: imagem dentro de link sem atributo alt',
	QA_BAD_LINK: 'Verificação manual: o destino do link pode ser inválido',
	QA_BLOCKQUOTE: 'Este bloco de citação deveria ser um cabeçalho?',
	QA_DOCUMENT: 'Este documento está marcado corretamente para leitores de tela?',
	QA_FAKE_HEADING: 'Este texto em negrito deveria ser um cabeçalho?',
	QA_FAKE_LIST: 'Isto deveria ser formatado como lista?',
	QA_IN_PAGE_LINK: 'Link interno quebrado',
	QA_JUSTIFY: 'Evite justificar texto',
	QA_NESTED_COMPONENTS: 'Componentes interativos aninhados',
	QA_PDF: 'Existe alternativa para este PDF?',
	QA_SMALL_TEXT: 'O texto está muito pequeno',
	QA_STRONG_ITALICS: 'Blocos grandes de texto enfatizado (negrito/itálico) são menos legíveis',
	QA_SUBSCRIPT: 'Não use sobrescrito/subscrito apenas como efeito visual',
	QA_UNDERLINE: 'Apenas links devem ser sublinhados',
	QA_UPPERCASE: 'Este texto em maiúsculas é realmente necessário?',
	SUS_ALT: 'Existem palavras redundantes neste texto alternativo?',
	TABINDEX_ATTR: 'O atributo tabindex pode interferir na ordem de leitura',
	TABLES_EMPTY_HEADING: 'Esta célula de cabeçalho de tabela precisa de texto',
	TABLES_MISSING_HEADINGS: 'Esta tabela está sem linha de cabeçalhos e/ou cabeçalhos de coluna',
	TABLES_SEMANTIC_HEADING: 'Cabeçalhos de conteúdo não devem ser usados dentro de tabelas',
	UNCONTAINED_LI: 'Lista HTML inválida',
};

const why = {


	buttons: `<div class="why"><p>Dica: o nome acessível de um botão deve deixar claro o que ele faz. Botões que mudam de estado ao serem clicados também devem mudar de nome:</p><ul><li>Mudando o rótulo:<br>"Reproduzir/Pausar", "Mostrar detalhes/Ocultar detalhes"</li><li>Mudando <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">atributos de estado</a>:<br>"Reproduzir/Reproduzir, pressionado", "Detalhes, recolhido/Detalhes, expandido"</li></ul><p>Apenas não mude os dois ao mesmo tempo. Mudar de "Reproduzir" para "Pausar, pressionado" significa que o player está em pausa, não reproduzindo!</p></div>`,
	fix: `<strong class="badge">Como corrigir</strong>`,
	headings: `<div class="why"><p>Dica: cabeçalhos e subtítulos estruturam o conteúdo em níveis hierárquicos. Usuários de leitores de tela dependem dessa estrutura para compreender e navegar:</p><ul><li>Nível de cabeçalho 1: título da página<ul><li>Nível de cabeçalho 2: tópicos principais<ul><li>Nível de cabeçalho 3: subtópicos</li></ul></li></ul></li></ul></div>`,
	imageLinks: `<div class="why"><p>Dica: o objetivo do texto alternativo é fornecer uma alternativa ao significado da imagem, não apenas ao que ela contém. No caso de uma imagem que é um link, o significado é o destino do link:<ul><li>"<em>Uma lupa</em>" descreve uma imagem, não um link.</li><li>"<em>Uma lupa de pesquisa</em>" descreve as duas coisas e é confuso.</li><li>"<em>Pesquisar</em>" descreve com precisão o destino do link.</li></ul></p></div>`,
	images: `<div class="why"><p>Dica: ao escrever texto alternativo, descreva o <em>significado</em> da imagem no contexto — não apenas o que aparece. Uma foto de uma criança chutando uma bola pode significar, por exemplo:</p><ul><li>O jogo continuou mesmo sob chuva forte.</li><li>Os novos uniformes têm um logo de dragão estiloso.</li><li>Ela marcou o gol da vitória pela lateral esquerda!</li></ul></div>`,
	links: `<div class="why"><p>Dica: as pessoas costumam percorrer rapidamente a página olhando apenas os links e usar a busca na página para encontrá-los pelo nome. Links eficazes são significativos, únicos e concisos:</p><ul><li>Ideia ideal: "Saiba mais sobre <a href="https://webaim.org/techniques/hypertext/link_text">links significativos</a>"</li><li>Não é único: "Clique <a href="https://webaim.org/techniques/hypertext/link_text">aqui</a> para saber mais sobre links significativos."</li><li>Não é conciso: "<a href="https://webaim.org/techniques/hypertext/link_text">Clique aqui para saber mais sobre links significativos</a>"</li></ul></div>`,
};

export const tips = {







































































	ALT_FILE_EXT: `<p><span style="display: none">%(alt)</span>Texto alternativo: <strong>"%(ALT_TEXT)"</strong></p><p>Leitores de tela lerão este URL, muitas vezes caractere por caractere. Isso provavelmente não transmite o mesmo significado que ver a imagem.</p><p>${why.fix}Adicione alt vazio (alt="") se for uma decoração sem significado que deve ser ignorada por leitores de tela, ou adicione um texto alternativo descritivo.</p>${why.images}`,
	ALT_MAYBE_BAD: `<p>Texto alternativo: <strong>"%(alt)"</strong></p><p>${why.fix}Defina o texto alternativo como uma descrição concisa do que esta imagem significa neste contexto.</p>${why.images}`,
	ALT_PLACEHOLDER: `<p>Texto alternativo: <strong>"%(alt)"</strong></p><p>${why.fix}Defina o texto alternativo como uma descrição concisa do que esta imagem significa neste contexto.</p>${why.images}`,
	ALT_UNPRONOUNCEABLE: `<p>Texto alternativo: "<strong>%(alt)</strong>"</p><p>Este texto alternativo contém apenas símbolos que não podem ser pronunciados e/ou espaços. Leitores de tela vão indicar que há uma imagem e, em seguida, fazer uma pausa estranha ou ler algo ininteligível.</p><p>${why.fix}Adicione um texto alternativo descritivo ou forneça um alt completamente vazio (alt="") se for apenas um ícone ou espaçador que deve ser ignorado.</p>${why.images}`,
	BTN_EMPTY: `<p>${why.fix}Use qualquer método válido para informar aos leitores de tela o que este botão faz, por exemplo, texto visível, alt em um ícone ou um atributo title.</p>`,
	BTN_EMPTY_LABELLEDBY: `<p>O atributo <code>aria-labelledby</code> está vazio ou aponta para um <code>ID</code> inexistente.</p><p>${why.fix}Aponte para um ID válido, ou remova o atributo e nomeie o botão de outra forma.</p>`,
	BTN_TIP: `${why.buttons}`,
	CONTRAST_WARNING: 'Imagem de fundo/gradiente impede determinar com segurança a cor por trás do texto. Use o seletor para verificar manualmente.',
	DUPLICATE_ID: `<p>IDs servem como rótulos ou destinos de link, portanto precisam ser únicos.</p><p>${why.fix}Altere este ID: <strong>#%(id)</strong></p><div class="why"><p>Em muitos CMS vem de “name/id”. Em HTML é o atributo: <code>&lt;a id=""></code></p></div>`,
	DUPLICATE_TITLE: `<p>${why.fix}Apague o texto ou o atributo <code>title</code> deste link.</p><div class="why"><p>Dica: as dicas de ferramenta de <code>title</code> só aparecem ao passar o mouse. Elas não podem ser vistas ao navegar em um celular ou com o teclado, então muitos usuários nunca as verão. Não coloque nelas informações únicas ou importantes.</p></div>`,
	EMBED_AUDIO: `<p>Se houver fala, disponibilize uma https://www.w3.org/WAI/media/av/transcribing/alternativa em texto</a> na página ou em link.</p><p>Transcrições/legendas automáticas precisam de revisão humana (falantes e sons relevantes).</p>`,
	EMBED_DATA_VIZ: `<p>Visualizações embutidas podem ser difíceis para tecnologias assistivas, pouco claras para pessoas com baixa visão/daltonismo e exigir rolagem horizontal no celular.</p><p>${why.fix}Se não houver alto contraste, operação completa por teclado <strong><em>e</em></strong> estrutura interpretável por leitor de tela, forneça alternativa equivalente (descrição, tabela, download).</p>`,
	EMBED_GENERAL: 'Ferramentas automáticas não analisam conteúdo dentro de embeds. Garanta alt em imagens, legendas em vídeos, contraste adequado e links/botões https://webaim.org/techniques/keyboard/acessíveis por teclado</a>. Depois, ignore o alerta.',
	EMBED_MISSING_TITLE: `<p>Embeds precisam de nome acessível que descreva seu conteúdo.</p><p>${why.fix}Forneça <code>title</code> ou <code>aria-label</code> exclusivos.</p>`,
	EMBED_UNFOCUSABLE: `O atributo instrui teclado/AT a pular o elemento. Se o iframe tiver links/botões/formulários ou rolagem, remova-o.`,
	EMBED_VIDEO: `<p>Vídeos devem ter legendas.</p><p>Legendas automáticas requerem edição (falas e efeitos).</p><p>${why.fix}Inclua ou corrija as legendas e então ignore o alerta.</p>`,
	HEADING_EMPTY: `<p>Cabeçalhos vazios criam lacunas na estrutura.</p><p>${why.fix}Adicione texto ou remova a linha vazia.</p>${why.headings}`,
	HEADING_EMPTY_WITH_IMAGE: `<p>Cabeçalhos vazios desorganizam a estrutura.</p><p>${why.fix}Se não for cabeçalho, mude de <strong {C}>Cabeçalho %(level)</strong> para <strong>Parágrafo</strong>. Se for, descreva o significado da imagem no alt.</p>${why.headings}`,
	HEADING_FIRST: `${why.fix}Marque o título da página como Cabeçalho 1 ou 2. ${why.headings}`,
	HEADING_LONG: `<p>${why.fix}Se não for um título formal (p.ex., de artigo), reduza para facilitar a varredura.</p>${why.headings}`,
	HEADING_MISSING_ONE: `<p>${why.fix}Marque o título como nível 1 para iniciar a estrutura do documento.</p>${why.headings}`,
	HEADING_SKIPPED_LEVEL: `<p>Salto de <strong>%(prevLevel)</strong> para <strong>%(level)</strong>. Em leitores de tela, soa como conteúdo faltando.</p><p>${why.fix}Ajuste os níveis para manter a hierarquia correta.</p>${why.headings}`,
	HIDDEN_FOCUSABLE: `Este elemento tem <code>aria-hidden="true"</code> mas recebe foco pelo teclado. Para escondê-lo de leitores, adicione <code>tabindex="-1"</code>; caso contrário, remova <code>aria-hidden</code>.`,
	IMAGE_ALT_TOO_LONG: `<p>Texto alternativo com %(altLength) caracteres: <strong class="ed11y-small">%(ALT_TEXT)</strong></p><p>${why.fix}Faça um resumo ou mova parte da descrição para uma legenda.</p><div class="why"><p>Dica: imagens complexas que transmitem mais informação do que cabe em uma frase geralmente precisam de uma alternativa <strong>visível</strong>, como uma legenda, que descreva ou interprete os detalhes principais. Tudo bem direcionar usuários de leitores de tela para esse texto:</p><ul><li>"Cartaz da festa de sexta-feira; detalhes na legenda a seguir."</li><li>"Gráfico mostrando que o número de ocorrências caiu 10% neste ano; detalhes na tabela a seguir."</li></ul></div>`,
	IMAGE_DECORATIVE: `<p>Imagem ocultada por alt vazio. Apenas itens sem significado informativo devem ser marcados assim.</p><p>${why.fix}Se houver informação, forneça alt.</p>${why.images}`,
	IMAGE_DECORATIVE_CAROUSEL: 'Marcada como <strong>decorativa</strong>, mas em carrosséis/galerias recomenda-se alt descritivo para todas as imagens.',
	IMAGE_FIGURE_DECORATIVE: `<p>A imagem será ignorada por tecnologias assistivas. A legenda é suficiente sem a imagem?</p><p>${why.fix}Se não, complemente a legenda com alt para o que falta.</p><div class="why"><p>Dica: imagem, alt e legenda atuam juntos.</p></div>`,
	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Altere o alt para descrever o significado visual (não repita a legenda).</p><div class="why"><p>Dica: legenda dá contexto; alt descreve o que a legenda se refere para quem não enxerga.</p></div>`,
	LABELS_ARIA_LABEL_INPUT: `<p><strong {B}>Rótulo invisível do campo:</strong> <strong {C}>%(TEXT)</strong></p><p>Verifique se existe rótulo visível que permaneça após digitar e se coincide com o nome acessível.</p><div class="why"><p>Rótulos via <em>placeholder</em>/<em>title</em> somem ao digitar e dificultam revisão.</p></div>`,
	LABELS_INPUT_RESET: `<p>Botões “Limpar/Redefinir” são acionados por engano com frequência e podem causar perda de dados.</p><p>${why.fix}Se não limpar apenas um campo, remova ou peça confirmação.</p>`,
	LABELS_MISSING_IMAGE_INPUT: 'Botão‑imagem sem texto alternativo. Forneça alt funcional, como <em>Pesquisar</em> ou <em>Enviar</em>.',
	LABELS_MISSING_LABEL: `<p>${why.fix}Adicione um <code>id</code> a este campo de entrada e um atributo <code>for</code> correspondente ao rótulo.</p>`,
	LABELS_NO_FOR_ATTRIBUTE: `Não há rótulo associado a este campo de entrada. Adicione ao rótulo um atributo <code>for</code> que corresponda ao <code>id</code> deste campo. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>`,
	LABELS_PLACEHOLDER: `<p>Placeholder desaparece ao digitar, costuma ter pouco contraste e pode ser confundido com conteúdo.</p><p>${why.fix}Garanta que rótulo, instruções e requisitos de formato permaneçam visíveis.</p>`,
	LABEL_IN_NAME: `<p>O texto visível deste elemento parece ser diferente do nome acessível. Isso pode confundir usuários de leitores de tela e prejudicar o uso por comandos de voz.</p><p>${why.fix}Certifique-se de que o rótulo visível comece com o texto do rótulo invisível e não contenha informações adicionais relevantes.</p><p><strong>Rótulo invisível:</strong> "%(TEXT)"</p>`,
	LINK_ALT_FILE_EXT: `<p><span style="display: none;">%(ALT)</span>Texto alternativo: "<strong>%(alt)</strong>"</p><p>Este texto alternativo provavelmente é um nome de arquivo, e não um rótulo significativo para o link.</p><p>${why.fix}Defina o texto alternativo desta imagem como o nome do destino do link.</p><div class="why"><p>O objetivo do texto alternativo é fornecer uma alternativa para o significado da imagem, não para o que ela contém. No caso de uma imagem que é um link, o significado é o destino do link:</p><ul><li>"Página com texto" descreve a imagem, não o link.</li><li>"IMG_1234.jpg" é apenas um nome de arquivo.</li><li>"<strong><em>Formulário de inscrição para o evento (.doc)</em></strong>" é o destino do link.</li></ul></p></div>`,
	LINK_ALT_MAYBE_BAD: `<p>Texto alternativo: "<strong>%(alt)</strong>"</p><p>${why.fix}Defina o texto alternativo desta imagem como o nome do destino do link.</p>${why.imageLinks}`,
	LINK_ALT_UNPRONOUNCEABLE: `<p>Alt “%(ALT_TEXT)” tem caracteres impronunciáveis — não descreve a ligação.</p><p>${why.fix}Use alt que descreva a função/destino do link.</p>${why.imageLinks}`,
	LINK_CLICK_HERE: `Evite “clique aqui” — não comunica finalidade.`,
	LINK_DOI: `<p>${why.fix}Vincule o título do artigo; apresente o DOI como texto simples.</p><div class="why"><p>Links descritivos facilitam a varredura e o anúncio por leitores.</p></div>`,
	LINK_EMPTY: `<p>${why.fix}Adicione texto que descreva o destino do link ou apague-o se for apenas um erro, como um espaço em branco linkado.</p><div class="why"><p>Dica: leitores de tela não conseguem descrever links vazios. Eles podem ficar em silêncio ("Link, [...pausa estranha onde o título deveria estar...]") ou ler o URL caractere por caractere.</p><p>Espaços em branco linkados podem ser difíceis de apagar em alguns editores de conteúdo; às vezes é preciso apagar e reescrever as palavras em ambos os lados do espaço.</p></div>`,
	LINK_EMPTY_LABELLEDBY: `<p><code>aria-labelledby</code> não aponta para um <code>ID</code> válido.</p><p>${why.fix}Corrija a referência ou remova o atributo.</p>`,
	LINK_EMPTY_NO_LABEL: `<p>${why.fix}Adicione texto que descreva o destino do link ou apague-o se for apenas um erro, como um espaço em branco linkado.</p><div class="why"><p>Dica: leitores de tela não conseguem descrever links vazios. Eles podem ficar em silêncio ou ler o URL.</p><p>Espaços linkados podem ser difíceis de apagar; às vezes é necessário apagar e digitar novamente o texto em torno do link.</p></div>`,
	LINK_FILE_EXT: `<p>O link leva a arquivo (PDF/MP3/ZIP/Word etc.) sem aviso.</p><p>${why.fix}Indique o tipo de arquivo na própria ligação (texto ou ícone): https://itmaybejj.github.io/linkpurpose/</a>.</p><p class="why">Para arquivos grandes, informe o tamanho (ex.: “Relatório (PDF, 3 MB)”).</p>`,
	LINK_IDENTICAL_NAME: `<p>Texto do link: "<strong>%(TEXT)</strong>"</p><p>${why.fix}Reformule links que levam a destinos diferentes para que o texto reflita o título específico de cada destino.</p>${why.links}`,
	LINK_IMAGE_ALT: `Verifique se o alt descreve o destino da ligação:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,
	LINK_IMAGE_ALT_AND_TEXT: `<p><span style="display: none;">%(ALT)</span>Link incluindo texto alternativo:<br>"<strong>%(LINK)</strong>"</p><p>${why.fix}Altere ou remova o texto alternativo se ele estiver adicionando informações irrelevantes ou redundantes.</p>${why.imageLinks}`,
	LINK_IMAGE_LONG_ALT: `<p>Texto alternativo com %(altLength) caracteres: <strong class="ed11y-small">%(ALT_TEXT)</strong></p><p>${why.fix}Defina o texto alternativo desta imagem como o título do destino do link.</p><div class="why"><p>Usuários de leitores de tela costumam ouvir uma lista de links da página fora de contexto. Como o texto alternativo de uma imagem linkada se torna o título do link nessa lista, ele deve <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">descrever o destino do link</a>, não o conteúdo da imagem.</p></div>`,
	LINK_IMAGE_NO_ALT_TEXT: `<p>Quando um link contém uma imagem, o alt vira https://webaim.org/techniques/hypertext/link_text#alt_linko nome do link</a>.</p><p>${why.fix}Descreva no alt a função/destino do link.</p>${why.imageLinks}`,
	LINK_IMAGE_TEXT: 'A imagem foi marcada como decorativa, enquanto o rótulo visível vem do texto adjacente.',
	LINK_NEW_TAB: `<p>${why.fix}Abra no mesmo separador ou https://itmaybejj.github.io/linkpurpose/avise previamente</a> que abrirá em nova aba.</p><div class="why"><p>Forçar nova aba pode confundir (o “voltar” não funciona como esperado). Em formulários, às vezes é usado para evitar perda de dados.</p></div>`,
	LINK_PLACEHOLDER_ALT: `<p>Alt é um placeholder: “<strong>%(alt)</strong>”.</p><p>${why.fix}Defina o alt para descrever o destino.</p>${why.imageLinks}`,
	LINK_STOPWORD: `<p>Texto do link: "<strong>%(text)</strong>"</p><p>${why.fix}Use um texto de link que descreva o destino.</p>${why.links}`,
	LINK_STOPWORD_ARIA: `<p>Há nome acessível via ARIA, mas o texto visível é genérico: “<strong {C}>%(ERROR)</strong>”.</p><p>${why.fix}Forneça texto visível significativo e consistente com o nome acessível.</p>${why.links}`,
	LINK_SUS_ALT: `<p>O texto alternativo desta imagem contém a palavra "%(alt)", o que geralmente indica que ele não está descrevendo o destino do link.</p><p>Texto alternativo: "<strong>%(ALT_TEXT)</strong>"</p><p>${why.fix}Garanta que o texto alternativo descreva o destino ou propósito do link.</p>${why.imageLinks}`,
	LINK_SYMBOLS: `<p>Símbolo encontrado: <strong {C}>%(ERROR)</strong></p><p>${why.fix}Evite usar símbolos como chamada para ação no texto do link, a menos que estejam ocultos das tecnologias assistivas. Leitores de tela podem ler os símbolos em voz alta, o que pode ser confuso.</p>`,
	LINK_URL: `<p>${why.fix}Use um título ou objetivo da página/arquivo em vez de URL como texto do link.</p><div class="why"><p>Pessoas — especialmente com leitor de tela — buscam links pelo nome.</p><p>URLs como texto dificultam varredura e busca.</p></div>`,
	META_LANG: `<p>${why.fix}Adicione https://www.w3.org/International/questions/qa-html-language-declarationsatributo de idioma</a> ao elemento <code>html</code>.</p><div class="why"><p>Leitores de tela dependem do idioma para pronunciar corretamente; idioma incorreto atrapalha a compreensão.</p></div>`,
	META_MAX: `<p>Esta meta tag limita o zoom.</p><p>${why.fix}Permita zoom completo removendo ou ajustando a restrição.</p>`,
	META_REFRESH: `<p>Atualizações automáticas interrompem o uso e podem causar perda de dados de formulários.</p><p>${why.fix}Use AJAX/JS com aviso prévio e opção de adiar.</p>`,
	META_SCALABLE: `<p>Esta meta tag impede ampliar.</p><p>${why.fix}Remova ou ajuste para permitir zoom.</p>`,
	META_TITLE: `<p>${why.fix}Inclua <code><title></code> dentro de <code><head></code>.</p><div class="why"><p>Um https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/títulocurto e único</a> é importante para resultados de busca, abas do navegador e anúncio por leitores.</p><p>Sem título, usuários veem/ouvirão apenas a URL.</p></div>`,
	MISSING_ALT: `<p>Sem alt, leitores costumam anunciar a URL do arquivo (até letra por letra).</p><p>${why.fix}Use alt="" para decoração; para conteúdo, forneça alt descritivo.</p>${why.images}`,
	MISSING_ALT_LINK: `<p>Imagem dentro de link sem alt resulta em anúncio da URL — especialmente problemático.</p><p>${why.fix}Forneça alt que descreva a função/destino.</p>${why.imageLinks}`,
	MISSING_ALT_LINK_HAS_TEXT: `<p>A imagem está em um link com texto. Se o texto já descreve suficientemente, use alt=""; caso contrário, inclua alt com o destino/função.</p>${why.imageLinks}`,
	QA_BAD_LINK: `<p>O link parece apontar para ambiente de desenvolvimento:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Troque por caminho relativo (/pasta) ou URL pública.</p>`,
	QA_BLOCKQUOTE: `<p>A formatação <code>blockquote</code> indica aos leitores de tela que o texto deve ser anunciado como uma citação. Blocos de citação curtos muitas vezes são, na prática, títulos.</p><p>${why.fix}Se este texto for um título e não uma citação, use a formatação de título, para que ele apareça na estrutura da página.</p>${why.headings}`,
	QA_DOCUMENT: `<p>Documentos linkados também são considerados conteúdo da Web e precisam ser acessíveis. Verifique se o documento tem títulos marcados, cabeçalhos de tabela e texto alternativo em imagens, depois você pode ignorar este alerta.</p><div class="why"><ul><li>Torne seu <a href="https://support.google.com/docs/answer/6199477?hl=en">documento ou apresentação do Google Workspace mais acessível</a>.</li><li>Torne seus <a href="https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">documentos do Office mais acessíveis</a>.</li></ul></div>`,
	QA_FAKE_HEADING: `<p>${why.fix}Se o texto em negrito introduz novo tópico, use estilo de cabeçalho (não apenas formatação visual).</p><div class="why"><p>Cabeçalhos constroem a “mapa” de navegação para tecnologias assistivas.</p></div>`,
	QA_FAKE_LIST: `<p>${why.fix}Se “%(text)” é item de lista, aplique formatação de lista.</p><div class="why"><p>Listas oferecem estrutura visual e semântica:</p><ol><li>Recuos consistentes melhoram legibilidade.</li><li>Leitores anunciam posição (“item 3 de 7”).</li></ol><p>Iniciar linha com número não cria uma lista real.</p></div>`,
	QA_IN_PAGE_LINK: `<p>O destino desta âncora interna não existe na página.</p><div class="why"><p>Para desenvolvedores: se depende de JavaScript, valide a operação por teclado antes de ignorar.</p></div>`,
	QA_JUSTIFY: `<p>Justificar cria espaços irregulares, dificultando a leitura para muitas pessoas.</p><p>${why.fix}Prefira alinhamento à esquerda.</p>`,
	QA_NESTED_COMPONENTS: 'Evite componentes interativos aninhados (abas em abas, acordeões em acordeões), pois dificultam navegação e aumentam a carga cognitiva.',
	QA_PDF: `<p>${why.fix}Faça uma das opções e então ignore:</p><ul><li>Vincule para página web em vez do PDF;</li><li>ou forneça também versão HTML/editável;</li><li>ou, no mínimo, garanta marcação acessível (leitura/ordem, cabeçalhos, alt‑textos).</li></ul><div class="why"><p>Muitos usuários — especialmente em celular e com tecnologias assistivas — preferem HTML a PDF.</p></div>`,
	QA_SMALL_TEXT: 'Texto muito pequeno prejudica a leitura, sobretudo para baixa visão. Evite fontes menores que o padrão.',
	QA_STRONG_ITALICS: `<p>${why.fix}Use negrito/itálico com moderação, apenas para pontos-chave.</p><div class="why"><p>Para citações, prefira <code>blockquote</code>.</p></div>`,
	QA_SUBSCRIPT: `Sobrescrito/subscrito reduz a legibilidade. Use apenas em 4º, H<sub>2</sub>O, notas de rodapé etc.`,
	QA_UNDERLINE: `<p>No web, sublinhado indica link. Usuários esperarão clicabilidade.</p><p>${why.fix}Use <strong>negrito</strong> ou <em>itálico</em> para ênfase, e cabeçalhos para demarcar seções.</p><div class="why"><p>Leitores não anunciam estilos visuais; cabeçalhos sim estruturam.</p></div>`,
	QA_UPPERCASE: `<p>BLOCOS EM MAIÚSCULAS SÃO MENOS LEGÍVEIS E PODEM SOAR COMO “GRITOS”.</p><p>${why.fix}Prefira destacar poucas palavras em negrito em vez de usar maiúsculas.</p><div class="why"><p>Leitores não anunciam negrito; para novo tópico, use cabeçalho.</p></div>`,
	SUS_ALT: `<p>O texto alternativo desta imagem contém a palavra "%(alt)", o que provavelmente é redundante.</p><p>Texto alternativo: "<strong>%(ALT_TEXT)</strong>"</p><p>${why.fix}Reformule o texto alternativo para transmitir de forma breve o que a imagem significa.</p><div class="why"><p>Dica: leitores de tela anunciam que vão descrever uma imagem antes de ler o texto alternativo, portanto expressões como "imagem de" e "foto de" geralmente são redundantes. Isso é aceitável apenas quando as palavras se referem a conteúdo <em>dentro</em> da imagem:</p><ul><li>Não redundante: "<em>Uma foto em</em> um álbum de fotos mostrado à turma."</li><li>Redundante: "<em>Foto de</em> uma foto em um álbum mostrado à turma."</li></ul></div>`,
	TABINDEX_ATTR: `<p>${why.fix}Nunca use valores de tabindex maiores que "0" (a ordem padrão). Em vez disso, altere a ordem dos elementos no HTML, para que a ordem de tabulação e a ordem de leitura permaneçam iguais à ordem visual.</p><div class="why"><p>Dica: por padrão, a ordem visual, a ordem de foco ao usar Tab e a ordem de leitura pelos leitores de tela são as mesmas.</p><p>Atribuir um tabindex positivo a um elemento o move para o início da ordem de tabulação, <strong>mas não muda a ordem visual nem a ordem de leitura</strong>. Usuários de tecnologias assistivas podem ter que procurar botões e campos de formulário em pontos opostos da página em relação a seus rótulos e instruções.</p></div>`,
	TABLES_EMPTY_HEADING: ` <p>${why.fix}Assegure que cada célula de cabeçalho tenha texto.</p><div class="why"><p>Leitores usam cabeçalhos para dar contexto às células.</p></div>`,
	TABLES_MISSING_HEADINGS: ` <p>${why.fix}Nas propriedades da tabela, indique cabeçalhos na primeira linha/coluna (ou ambos).</p><div class="why"> <p>Leitores repetem o cabeçalho relevante em cada célula.</p><p>Se a tabela é apenas layout, remova a estrutura tabular.</p></div>`,
	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}Remova h2/h3 de dentro da tabela; use cabeçalhos de linha/coluna. Se houver múltiplos níveis, divida em tabelas menores.</p><div class="why"> <p>Cabeçalho de tabela vale para linha/coluna; cabeçalho de conteúdo afeta todo o conteúdo subsequente:</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Um <strong>cabeçalho de tabela</strong> na célula 2 rotula a coluna B.<br><br> Um <strong>cabeçalho de conteúdo</strong> na célula 2 “rotula” 3, A, B, C e até este texto e o rodapé.</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,
};

export const interfaceStrings = {
	ALERT_CLOSE: 'Fechar',
	ALT: 'Texto alternativo: ',
	CONSOLE_ERROR: 'Há um problema com o verificador de acessibilidade nesta página. %(link)<a href="%(link)">Informe-o no GitHub</a>.',
	DECORATIVE: 'Marcado como decorativo',
	DISMISS: 'Ignorar',
	DISMISS_ALL: 'Nesta página: ignorar',
	IMAGES: 'Texto alternativo',
	MAIN_TOGGLE_LABEL: 'Alternar ferramentas de acessibilidade',
	MISSING: '(faltando!)',
	NOT_VISIBLE: 'Observação: este conteúdo pode não estar visível. Procure dentro da área demarcada.',
	NO_IMAGES: 'Nenhuma imagem encontrada.',
	OUTLINE: 'Cabeçalhos',
	PANEL_DISMISS_BUTTON: `Mostrar %(dismissCount) alertas ocultos`,
	PANEL_HEADING: 'Mostrar visualizadores',
	PANEL_HEADING_MISSING_ONE: 'Falta Cabeçalho 1.',
	PANEL_NO_HEADINGS: 'Nenhum cabeçalho encontrado.',
	SKIP_TO_ISSUE: 'Mostrar alerta',
	WARNING: 'verificação manual necessária',
	WARNINGS: 'verificações manuais necessárias',
	buttonFirstContent: 'Mostrar primeiro alerta',
	buttonHideHiddenAlert: 'Ocultar alerta oculto',
	buttonHideHiddenAlerts: `Ocultar %(count) alertas ocultos`,
	buttonShowHiddenAlert: 'Mostrar alerta oculto',
	buttonToolsActive: 'Ocultar visualizadores',
	dismissActions: `Alertas semelhantes`,
	dismissHideTitle: 'Oculta este alerta apenas para você',
	dismissOkAllButton: 'Nesta página: marcar como OK',
	dismissOkButtonContent: 'Marcar como OK',
	dismissOkTitle: 'Oculta o alerta para todos os editores',
	dismissOnSite: 'Em todas as páginas: marcar como OK',
	dismissalsHeader: 'Não pretende corrigir isto?',
	edit_layout: 'Editar layout',
	edit_page: 'Editar página',
	edit_term: 'Editar termo',
	edit_user: 'Editar usuário',
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
	panelCheckAltText: `<p class="ed11y-small">Verifique se cada imagem transmite seu significado no contexto e se não há “texto dentro da imagem”.</p>`,
	panelCheckOutline: `<p class="ed11y-small">Exibe a estrutura de cabeçalhos. Verifique se corresponde à organização visual.</p>`,
	reportsLink: 'Abrir relatórios do site',
	toggleDisabled: 'Não há conteúdo que o Editoria11y possa verificar.',
	transferFocus: 'Editar este conteúdo',
	unDismissHideButton: 'Restaurar este alerta ignorado',
	unDismissNotePermissions: 'Esta verificação foi ocultada por um administrador',
	unDismissOKButton: 'Restaurar alerta marcado como OK',
};

export const lang = {
	strings: Object.assign(Sa11yStrings.strings, interfaceStrings, tips),
	testNames: testNames,
}
