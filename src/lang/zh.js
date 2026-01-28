import strings from '../sa11y-lang/zh.js';
// Caution: machine translation.

export const testNames = {
	ALT_FILE_EXT: '此替代文本是文件名，而不是描述',
	ALT_MAYBE_BAD: '此替代文本可能无法被读屏软件正确朗读',
	ALT_PLACEHOLDER: '此替代文本是无意义的占位内容',
	ALT_UNPRONOUNCEABLE: '此替代文本不可发音',
	BTN_EMPTY: '按钮缺少可访问名称',
	BTN_EMPTY_LABELLEDBY: '按钮的 ARIA 标注无效',
	BTN_ROLE_IN_NAME: '按钮名称重复了“button”一词',
	CONTRAST_ERROR: '文本对比度不足，可能难以阅读',
	CONTRAST_ERROR_GRAPHIC: '图形或图标的对比度不足',
	CONTRAST_INPUT: '输入框的对比度不足，可能难以阅读',
	CONTRAST_PLACEHOLDER: '占位符文本的对比度不足，可能难以阅读',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: '此占位符文本的对比度是否足够？',
	CONTRAST_WARNING: '此文本的对比度是否足够？',
	CONTRAST_WARNING_GRAPHIC: '此图形或图标的对比度是否足够？',
	DUPLICATE_ID: '重复的 ID 属性',
	DUPLICATE_TITLE: '此链接的工具提示与链接文本相同',
	EMBED_AUDIO: '该音频是否提供文本稿？',
	EMBED_DATA_VIZ: '此数据可视化是否可访问？',
	EMBED_GENERAL: '嵌入的 iframe 需要手动检查',
	EMBED_MISSING_TITLE: '此框架缺少 "title" 属性',
	EMBED_UNFOCUSABLE: 'tabindex="‑1" 的框架将无法通过键盘访问。',
	EMBED_VIDEO: '此视频是否有准确的字幕？',
	HEADING_EMPTY: '该标题没有文本',
	HEADING_EMPTY_WITH_IMAGE: '该图片被用作标题，因此需要替代文本',
	HEADING_FIRST: '本页的第一个标题是副标题',
	HEADING_LONG: '该标题是否可以更短？',
	HEADING_MISSING_ONE: '本页缺少一级标题（H1）',
	HEADING_SKIPPED_LEVEL: '该标题的层级标注不正确',
	HIDDEN_FOCUSABLE: '此元素无法被读屏软件描述',
	IMAGE_ALT_TOO_LONG: '此替代文本是否可以更短？',
	IMAGE_DECORATIVE: '该图片是否确为无意义的装饰？',
	IMAGE_DECORATIVE_CAROUSEL: '轮播/相册中的图片被标记为装饰性',
	IMAGE_FIGURE_DECORATIVE: '手动检查：带标题的图片缺少替代文本',
	IMAGE_FIGURE_DUPLICATE_ALT: '替代文本不应与图片标题相同',
	LABELS_ARIA_LABEL_INPUT: '此表单字段是否有可见标签？',
	LABELS_PLACEHOLDER: '手动检查：占位符文本',
	LABELS_INPUT_RESET: '是否需要此“重置”按钮？',
	LABEL_IN_NAME: '可见标签与不可见标签不一致',
	LINK_ALT_FILE_EXT: '作为链接使用的替代文本不应为 URL',
	LINK_ALT_MAYBE_BAD: '该链接图片的替代文本可能无法被朗读',
	LINK_ALT_UNPRONOUNCEABLE: '链接图片需要可发音的替代文本',
	LINK_CLICK_HERE: '手动检查：链接包含“点击这里”',
	LINK_DOI: '应链接文章标题，而非 DOI 编号',
	LINK_EMPTY: '该链接没有文本',
	LINK_EMPTY_LABELLEDBY: '链接的 aria‑labelledby 属性无效',
	LINK_EMPTY_NO_LABEL: '该链接需要标签',
	LINK_FILE_EXT: '链接指向文件但未提前告知',
	LINK_IDENTICAL_NAME: '该链接是否能唯一描述其目标？',
	LINK_IMAGE_ALT: '手动检查：链接图片包含替代文本',
	LINK_IMAGE_ALT_AND_TEXT: '此替代文本放在该链接中是否合理？',
	LINK_IMAGE_LONG_ALT: '该链接图片的替代文本是否可以更短？',
	LINK_IMAGE_NO_ALT_TEXT: '该链接图片需要替代文本',
	LINK_IMAGE_TEXT: '手动检查：链接中的图片被标记为装饰性。',
	LINK_NEW_TAB: '该链接是否在未告知的情况下新开标签页？',
	LINK_PLACEHOLDER_ALT: '该链接图片需要有意义的替代文本',
	LINK_STOPWORD: '该链接是否清晰描述其目标？',
	LINK_STOPWORD_ARIA: '有意义的链接文本仅对读屏用户可见',
	LINK_SUS_ALT: '此替代文本描述的是图片还是链接？',
	LINK_SYMBOLS: '手动检查：链接中的符号或 emoji 是否有意义？',
	LINK_URL: '链接文本不应为 URL',
	META_LANG: '缺少页面语言的 meta 标签',
	META_MAX: 'meta 标签限制了用户放大文本的能力',
	META_REFRESH: 'meta 标签会自动刷新页面',
	META_SCALABLE: 'meta 标签阻止用户放大页面',
	META_TITLE: '缺少页面标题的 meta 标签',
	MISSING_ALT: '无效 HTML：图片缺少 alt 属性',
	MISSING_ALT_LINK: '无效 HTML：链接图片缺少 alt 属性',
	MISSING_ALT_LINK_HAS_TEXT: '无效 HTML：链接中的图片缺少 alt 属性',
	QA_BAD_LINK: '手动检查：链接目标可能无效',
	QA_BLOCKQUOTE: '这段引用是否应为标题？',
	QA_DOCUMENT: '该文档是否已为读屏软件适当标注？',
	QA_FAKE_HEADING: '这段加粗文字是否应为标题？',
	QA_FAKE_LIST: '此处是否应使用列表格式？',
	QA_IN_PAGE_LINK: '同页锚点链接失效',
	QA_JUSTIFY: '不要两端对齐文本',
	QA_NESTED_COMPONENTS: '嵌套的交互式布局组件',
	QA_PDF: '是否有此 PDF 的可替代内容？',
	QA_SMALL_TEXT: '文字过小',
	QA_STRONG_ITALICS: '大段强调文本更难阅读',
	QA_SUBSCRIPT: '不要将上/下标用于纯视觉排版',
	QA_UNDERLINE: '只有链接应使用下划线',
	QA_UPPERCASE: '是否有必要使用全大写文本？',
	SUS_ALT: '该替代文本中是否有冗余词？',
	TABINDEX_ATTR: '此元素上的 tabindex 属性破坏了阅读顺序',
	TABLES_EMPTY_HEADING: '此表头单元格需要文本',
	TABLES_MISSING_HEADINGS: '该表格缺少表头行或表头列',
	TABLES_SEMANTIC_HEADING: '内容标题不应放在表格内使用',
	UNCONTAINED_LI: '无效 HTML 列表',
};

const why = {
	fix: `<strong class="badge">如何修复</strong>`,
	check: `<strong class="badge">手动检查</strong>`,

	buttons: `<div class="why"><p>注意：按钮的可访问名称应清楚说明其作用。点击后会改变状态的按钮，其名称也应同步更新：</p><ul>
<li>切换标签：<br>“播放/暂停”、“显示详情/隐藏详情”</li>
<li>切换<a ref="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">ARIA 状态属性</a>：<br>“播放/播放（已按下）”、“详情（已折叠）/详情（已展开）”。</li>
</ul>
<p>不要同时更改二者。若将“播放”改为“暂停（已按下）”，这表示播放器处于暂停，而不是正在播放！</p></div>`,

	headings: `<div class="why"><p>提示：标题与副标题将内容组织为分级结构。依赖读屏软件的用户通过标题大纲来理解与导航页面：</p><ul>
<li>一级标题：页面标题
<ul><li>二级标题：主要主题
<ul><li>三级标题：子主题</li></ul>
</li></ul>
</li></ul></div>`,

	images: `<div class="why"><p>提示：编写替代文本时，应描述图片在当前语境中的<em>含义</em>，而不仅是它“包含了什么”。例如，一张孩子踢球的照片在不同语境下可能意味着：</p><ul>
<li>他们在大雨中坚持比赛。</li>
<li>新队服上有很酷的龙形标志。</li>
<li>她从左侧边线射入了制胜一球！</li>
</ul></div>`,

	links: `<div class="why"><p>用户常通过扫描链接与站内搜索来按名称查找链接，因此有效的链接应当有意义、唯一且简洁：</p><ul>
<li>理想示例：“了解<a href="https://webaim.org/techniques/hypertext/link_text">有意义的链接</a>”</li>
<li>不唯一：“<a href="https://webaim.org/techniques/hypertext/link_text">点击这里</a>了解更多有意义的链接。”</li>
<li>不简洁：“<a href="https://webaim.org/techniques/hypertext/link_text">点击此处以了解更多关于有意义链接的内容</a>”</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>替代文本的目的在于表达图片的<em>意义</em>，而非表面内容。对链接图片而言，其意义就是链接目标：<ul>
<li>“<em>放大镜</em>”是在描述图片，不是链接。</li>
<li>“<em>放大镜 搜索</em>”会让人不清楚是在描述图片还是动作。</li>
<li>“<em>搜索</em>”能准确描述链接目标。</li>
</ul></p></div>`,
};

const tips = {
	ALT_FILE_EXT: `<p>读屏软件会朗读此 URL，通常逐字逐字符。这很可能无法传达与看到图片相同的含义。</p><p>${why.fix}若为无意义的装饰图像，请添加空 alt（alt=""）以便读屏软件忽略；若非装饰，请添加有意义的替代文本。</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>此图片的提供描述为：<strong>"%(alt)"</strong></p><p>${why.fix}请将替代文本改为简要且符合当前语境的描述，表达图片的意义。</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>此图片的提供描述为：<strong>"%(alt)"</strong></p><p>${why.fix}请将替代文本改为简要且符合当前语境的描述，表达图片的意义。</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>此替代文本 "%(alt)" 仅包含不可发音的符号和/或空格。读屏软件会提示有图片，然后出现尴尬的停顿：“图片：____。”</p><p>${why.fix}请添加可读的替代文本；若仅为图标或占位，请使用完全空的 alt（alt=""），使读屏软件忽略。</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}使用任意有效方式为按钮提供可访问名称，例如：按钮上的文字、图标的 alt 文本，或 <code>title</code> 属性。</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>此按钮的 <code>aria-labelledby</code> 为空或未匹配到页面中任何元素的 <code>ID</code>。</p><p>${why.fix}请将该 ID 关联到实际元素，或移除此属性并改用其他方式描述按钮。</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: '由于存在背景图或渐变色，检测工具无法确定该文本后方的实际底色。请使用下方取色器进行手动对比度检查。',

	DUPLICATE_ID: `<p>本页使用 ID 作为标签或链接目标，因此 ID 必须唯一。</p><p>${why.fix}请修改该 ID：<strong>#%(id)</strong></p><div class="why"><p>在多数 CMS 中，该值来自元素属性中的 “name” 或 “id” 字段。在 HTML 中，它是一个属性：<code><a id="MY-ID"></a></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}删除链接的 <code>title</code> 属性。</p><div class="why"><p>注意：<code>title</code> 工具提示仅在鼠标悬停时出现；在手机或键盘导航时不可见，因此不应包含独有或重要信息。</p></div>`,

	EMBED_AUDIO: `<p>若音频包含语音，必须在本页提供或链接到<a href="https://www.w3.org/WAI/media/av/transcribing/">文本替代</a>。</p><p>注意：自动生成的字幕/文本需人工校对，确保说话者与有意义的音效被正确标注。</p>`,

	EMBED_DATA_VIZ: `<p>嵌入的可视化小部件常难以被辅助技术操作；对低视力或色觉异常用户不易理解，并可能在手机上需要横向滚动。</p><p>${why.fix}除非该嵌入具备高对比度、完全可用键盘操作，<strong><em>并且</em></strong>能被读屏软件描述，否则请提供等效的替代形式（文字描述、数据表或可下载表格），然后忽略此提示。</p>`,

	EMBED_GENERAL: '自动化工具无法检测嵌入内容内部。请确保：嵌入内的图片有 alt、视频有字幕、文本对比度充足，并且链接与按钮<a href="https://webaim.org/techniques/keyboard/">可用键盘访问</a>；随后可忽略此提示。',

	EMBED_MISSING_TITLE: `<p>嵌入内容需要可访问名称，以便读屏软件描述其内容。</p><p>${why.fix}请提供唯一的 <code>title</code> 或 <code>aria-label</code> 属性。</p>`,

	EMBED_UNFOCUSABLE: `该属性会让键盘与辅助技术跳过此元素。除非该 iframe 内无链接、按钮、表单且不可滚动，否则应移除此属性。`,

	EMBED_VIDEO: `<p>视频必须提供字幕。</p><p>注意：自动字幕需人工校对，标明说话者与有意义的音效。</p><p>${why.fix}请添加或校对字幕，然后忽略此提示。</p>`,

	HEADING_EMPTY: `<p>空标题会在页面大纲中形成困惑性的缺口。</p><p>${why.fix}请为该标题添加文本，或删除此空行。</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>空标题会在页面大纲中形成困惑性的缺口。</p><p>${why.fix}若这并非标题，请将格式从 <strong {C}>Heading %(level)</strong> 改为 <strong>段落</strong>；若确为标题，请将图片的意义写入其 alt。</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}请确保页面标题标注为一级或二级标题。 ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}除非为固定长度（如已发表文章标题），否则请缩短以便快速扫描。</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}将页面标题标注为一级标题，以标记文档大纲的开始。</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>该标题由 <strong>级别 %(prevLevel)</strong> 跳至 <strong>级别 %(level)</strong>。在读屏软件中，这听起来像是缺少内容。</p><p>${why.fix}请调整层级，形成无缺口、准确的大纲结构。</p>${why.headings}`,

	HIDDEN_FOCUSABLE: `该交互元素带有 <code>aria-hidden="true"</code>，但仍可通过键盘聚焦。若<strong>确实</strong>要对读屏软件隐藏，则还需添加 <code>tabindex="-1"</code>；否则请移除 <code>aria-hidden</code>。`,

	IMAGE_ALT_TOO_LONG: `<p>读屏软件会将替代文本作为一句连续的话朗读；若漏听某部分，用户必须重听整段。</p><p>该图片的替代文本长度为 %(altLength) 字符：<em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>提示：若图片信息复杂、超出一句话，请提供<strong>可见</strong>的文字说明或其它等效替代，并在 alt 中引用该说明：</p><ul><li>“周五舞会海报；详情见下方说明。”</li><li>“图表显示本年问题减少 10%；详情见表格。”</li></ul></div>`,

	IMAGE_DECORATIVE: `<p>该图片已通过空 alt 对读屏软件隐藏。只有冗余图标、背景纹理等无意义图片才应隐藏。</p><p>${why.fix}若该图片对页面有价值，请提供替代文本。</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: '该图片被标记为<strong>装饰性</strong>，但轮播或相册中的所有图片都应包含描述性替代文本，以确保等效体验。',

	IMAGE_FIGURE_DECORATIVE: `<p>该图片将被辅助技术忽略。仅凭文字说明是否仍可理解？</p><p>${why.fix}若说明未覆盖图片的视觉含义，请为未覆盖的部分提供 alt。</p><div class="why"><p>提示：图片、替代文本与说明相互配合：</p><ul><li>可见说明提供上下文与解读。</li><li>不可见的 alt 为看不到图片的用户描述视觉信息。</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}请修改 alt，以描述图片的视觉意义，而非重复说明文字。</p><div class="why"><p>提示：图片、替代文本与说明相互配合：</p><ul><li>可见说明提供上下文与解读。</li><li>不可见的 alt 使用户知道说明在谈论什么。</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: `<p><strong {B}>不可见字段标签：</strong> <strong {C}>%(TEXT)</strong></p><p>请确认该字段具有可见标签、在输入后仍保持可见，并且与不可见字段名一致。</p><div class="why"><p>仅使用 title 或 placeholder 作为标签，会在用户开始输入时消失；这会导致复核困难并易忘记同步更新不可见标签。</p></div>`,

	LABELS_INPUT_RESET: `<p>重置按钮容易被误触，可能造成数据丢失且无法撤销。</p><p>${why.fix}除非仅重置单一字段，否则建议移除，或在执行前提供确认。</p>`,

	LABELS_MISSING_IMAGE_INPUT: '图片按钮缺少替代文本。请添加替代文本以提供可访问名称，例如：<em>搜索</em> 或 <em>提交</em>。',

	LABELS_MISSING_LABEL: '此输入框没有关联标签。请为该输入框添加 <code>id</code>，并在标签上添加匹配的 <code>for</code>。',

	LABELS_NO_FOR_ATTRIBUTE: '此输入框没有关联标签。请在标签上添加匹配输入框 <code>id</code> 的 <code>for</code> 属性。<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>占位符在输入后即消失，且常要么对比度不足、要么因过于醒目而被误认为内容。</p><p>${why.fix}请确保字段标签、帮助文本与格式说明在字段有内容时仍保持可见，并考虑移除占位符。</p>`,

	LABEL_IN_NAME: `<p>该元素的可见文本似乎与可访问名称不同。这会让读屏用户困惑，并可能影响语音控制。</p><p>${why.check}请确保可见标签以不可见标签的文本开头，且不增加额外有意义信息。</p><p><strong>不可见标签：</strong> "%(TEXT)"</p>`,

	LINK_ALT_FILE_EXT: `<p>该图片的替代文本包含 "%(alt)"，这通常意味着它是文件名，而非有意义的链接名称。</p><p>${why.fix}将替代文本设置为链接目标的名称。</p><div class="why"><p>替代文本应表达图片的意义；对链接图片而言，意义即链接目标：</p><ul><li>“有文字的页面”是在描述图片，不是链接。</li><li>“IMG_1234.jpg”只是文件名。</li><li>“<strong><em>活动报名表（doc）</em></strong>”才是链接目标。</li></ul></div>`,

	LINK_ALT_MAYBE_BAD: `<p>该图片的替代文本是占位符：“<strong>%(alt)</strong>”。</p><p>${why.fix}请将替代文本设置为链接目标的名称。</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>该链接图片的替代文本仅包含不可发音的符号和/或空格：“%(ALT_TEXT)”。读屏软件会宣布存在链接，但无法描述其含义。</p><p>${why.fix}请将替代文本设置为链接的目标或用途。</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `“点击”或“点击这里”这类词语是多余的，并会分散对链接目的的注意力。`,

	LINK_DOI: `<p>${why.fix}请链接文章标题，并以纯文本提供 DOI 号码，而不是把 DOI 设为链接、标题留作纯文本。</p><div class="why"><p>APA 指南建议在网站中使用具描述性的链接——用户会按链接名称扫描与搜索，标题被链接更易被注意。</p><p>这也能让读屏软件用有意义的文本描述链接，而不是一串数字。</p></div>`,

	LINK_EMPTY: `<p>${why.fix}为该链接添加描述其目标的文本；若是误操作（如给空格加了链接），请删除链接。</p><div class="why"><p>读屏软件难以描述空链接：要么沉默（“链接，[……尴尬的停顿……]”），要么逐字母读出 URL。</p><p>有些编辑器中，链接化的空格难以删除，可能需要删掉并重打两侧文字来清除。</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>此链接的 <code>aria-labelledby</code> 并未匹配到页面中的任何 <code>ID</code>。</p><p>${why.fix}请提供有效的 ID，或移除此属性并用其他方式描述按钮。</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}为该链接添加描述其目标的文本；若只是误操作，请删除链接。</p><div class="why"><p>空链接会导致读屏软件沉默或读出 URL。</p><p>要删除“链接化的空格”，有时需要重写其两侧文本。</p></div>`,

	LINK_FILE_EXT: `<p>该链接指向可下载文件（如 PDF、MP3、Zip、Word）但未提前告知。</p><p>${why.fix}请在链接文本中使用文字或图标<a href="https://itmaybejj.github.io/linkpurpose/">标明文件类型</a>。</p><p class="why">对于大文件，建议标注文件大小，例如：“年度报告（PDF，3 MB）”。</p>`,

	LINK_IDENTICAL_NAME: `<p>多个指向不同目标的链接使用了相同的文本：“<strong>%(TEXT)</strong>”。</p><p>${why.fix}请改写这些链接文本，使其能唯一对应各自的目标标题。</p>${why.links}`,

	LINK_IMAGE_ALT: `请确保该 alt 描述链接目标：</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>请检查这是否有助于描述链接目标，而不是添加无关或冗余信息：</p><p><strong class="badge">Alt</strong> “<em><strong>%(alt)</strong></em>”</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p><a href="https://webaim.org/techniques/hypertext/link_text#alt_link">链接图片的替代文本用于描述链接目标</a>。读屏用户经常通过“链接列表”定位内容，因此链接应简短清晰。冗长的替代文本通常表示它在描述图片本身而非链接目标。</p>该图片的替代文本长度为 %(altLength) 字符：<em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>当链接包裹图片时，图片的替代文本<a href="https://webaim.org/techniques/hypertext/link_text#alt_link">将作为链接标题被朗读</a>。</p><p>${why.fix}请将替代文本设置为链接的目标或用途。</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: '图片被标记为装饰性，但该链接使用周围文本作为描述性标签。',

	LINK_NEW_TAB: `<p>${why.fix}将该链接设置为在同一标签页打开，或<a href="https://itmaybejj.github.io/linkpurpose/">事先告知用户</a>。</p><div class="why"><p>用户始终可以自行选择新开标签；若强制新开，尤其对辅助技术用户常显得困惑（例如“后退”按钮失效）。</p><p>注意：表单中通常例外。为避免丢失已填数据，表单里的链接常在新标签页打开。</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>该链接图片的替代文本为占位符：“<strong>%(alt)</strong>”。</p><p>${why.fix}请将替代文本改为链接目标的名称。</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>该链接包含无助于描述目标的词语：<br><strong>%(text)</strong></p><p>${why.fix}请改写为能简洁描述其目标或用途的文本。</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>已通过 ARIA 提供可访问名称，但可见/可搜索的链接文本很泛：“<strong {C}>%(ERROR)</strong>”。</p><p>${why.fix}请为所有用户提供有意义的链接文本，并确保元素的可见<label>与其可访问名称一致。</p>${why.links}`,

	LINK_SUS_ALT: `<p>此替代文本包含“%(alt)”一词，通常表示它未描述链接目标。</p><strong class="badge">替代文本</strong> “%(ALT_TEXT)”<p>修复：请确保该 alt 描述链接的目标或用途。<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}除非对辅助技术隐藏，否则避免将符号用作链接中的“号召性”文本。读屏软件可能会读出这些符号，造成困惑。考虑移除：<strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}将该链接改为其目标的标题或用途。</p><div class="why"><p>用户会按名称扫描链接，读屏用户尤甚。</p><p>URL 作为链接文本既难以扫描，也不利于站内搜索。</p></div>`,

	META_LANG: `<p>${why.fix}请在页面 HTML 标签上添加<a href="https://www.w3.org/International/questions/qa-html-language-declarations">语言属性</a>。</p><div class="why"><p>提示：读屏软件根据语言标签来发音。错误的语言会导致发音混乱。</p></div>`,

	META_MAX: `<p>此 meta 标签限制了用户放大文本的能力。</p><p>${why.fix}请移除或调整该限制，以允许完全缩放。</p>`,

	META_REFRESH: `<p>不应通过 meta 标签自动刷新页面，这会在无提示的情况下打断用户，令其丢失阅读位置，并可能重置表单。</p><p>${why.fix}若需刷新内容，请使用 AJAX 在原位更新，或用 JavaScript 触发刷新并先提示用户，允许延迟。</p>`,

	META_SCALABLE: `<p>此 meta 标签阻止用户放大页面。</p><p>${why.fix}移除或调整以允许完全缩放。</p>`,

	META_TITLE: `<p>${why.fix}请在页面的 <code><head></code> 中添加 <code><title></code> 标签。</p><div class="why"><p>许多体验依赖<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title">简短且唯一的标题</a>：</p><ul><li>搜索引擎用它作为结果标题。</li><li>浏览器用它作为标签页标题。</li><li>读屏软件在切换标签页时朗读它。</li></ul><p>没有页面标题时，人们只能看到/听到原始 URL。</p></div>`,

	MISSING_ALT: `<p>当读屏软件遇到没有 alt 属性的图片时，会朗读图片文件的 URL，通常逐字逐字符。</p><p>${why.fix}若应忽略，请添加空 alt（alt=""）；否则请添加描述性的替代文本。</p>${why.images}`,

	MISSING_ALT_LINK: `<p>当链接图片没有 alt 属性时，读屏软件会朗读图片 URL，这对链接图片尤为糟糕。</p><p>${why.fix}请添加与链接目标一致的替代文本。</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>该图片位于带文本的链接中。若可见文本足以描述链接目标，请为图片添加 alt="" 以使之被忽略；否则，为链接目标添加相应的替代文本。</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>链接似乎指向开发环境：<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}请改为相对路径（/folder）或公开 URL。</p>`,

	QA_BLOCKQUOTE: `<p><code>blockquote</code> 告诉读屏软件“这是引用”。短引用通常其实是标题。</p><p>${why.fix}若这是标题而非引用，请使用标题样式，以便出现在页面大纲中。</p>${why.headings}`,

	QA_DOCUMENT: `<p>被链接的文档也属于网页内容，必须可访问。请检查是否已标注标题、表头与图片替代文本，然后忽略此提示。</p><ul class="why"><li>让你的<a href="https://support.google.com/docs/answer/6199477?hl=zh-CN">Google 文档/演示文稿更可访问</a>。</li><li>让你的<a href="https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office 文档更可访问</a>。</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}若此全加粗的行用于引入主题，请用标题样式替代纯视觉加粗。</p><div class="why"><p>提示：标题为辅助技术创建可导航的目录。级别数字表示在大纲中的深度。</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}若“%(text)”属于列表项，请使用列表格式。</p><div class="why"><p>列表既有可视结构也有语义结构：</p><ol><li>列表能对齐缩进，便于阅读。</li><li>读屏软件会宣布位置（“第 3 项，共 7 项”）。</li></ol><p>仅在句首加数字并不会形成真正的列表结构。</p></div>`,

	QA_IN_PAGE_LINK: `<p>该链接的目标与本页任何元素均不匹配。</p><div class="why"><p>给开发者的提示：若这是用于触发 JavaScript 的伪链接，请先测试其是否可通过键盘触发，再将其加入忽略名单。</p></div>`,

	QA_JUSTIFY: `<p>两端对齐会插入不规则的空隙，许多人因此更难阅读。</p><p>${why.fix}请使用左对齐文本。</p>`,

	QA_NESTED_COMPONENTS: '避免嵌套交互式布局组件，例如：在手风琴内再放手风琴，或将标签页嵌在手风琴中（反之亦然）。这会加重认知负担并导致内容被遗漏。',

	QA_PDF: `<p>${why.fix}请执行以下之一，然后忽略此提示：</p><ul><li>改为链接到网页；</li><li><em>另外</em>提供网页或可编辑文档，使该 PDF 仅作为“可打印版本”；</li><li>至少请<a href='https://webaim.org/techniques/acrobat/' target='_blank'>手动检查是否已为 PDF 添加标注</a>（标题、列读序、表头与图片 alt）。</li></ul><div class="why"><p>移动端和辅助技术用户普遍更偏好网页而非 PDF：PDF 不会为小屏重排，且常缺少可导航的标注。</p></div>`,

	QA_SMALL_TEXT: '小字号更难阅读，尤其对低视力用户。请避免使用小于默认值的字体。',

	QA_STRONG_ITALICS: `<p>${why.fix}将加粗/斜体用于少量关键词或短语。</p><div class="why"><p>提示：若为引用，可使用 <code>blockquote</code>。</p></div>`,

	QA_SUBSCRIPT: `上标和下标会使文本变得过小而难读。仅在确有需要时使用，如序数（4<sup>th</sup>）、化学式（H<sub>2</sub>O）与脚注标注。`,

	QA_UNDERLINE: `<p>网页上的下划线通常表示链接。用户会认为它可点击。</p><p>${why.fix}请使用<strong>加粗</strong>或<em>斜体</em>来强调，并用标题标记主题变化。</p><div class="why"><p>提示：读屏软件不会宣布纯视觉格式（如下划线）。只有标题会为页面大纲添加结构。</p></div>`,

	QA_UPPERCASE: `<p>大段全大写文本更难阅读，且常被理解为“在喊叫”。</p><p>${why.fix}一次仅强调少量文字，优先使用加粗而非全大写。</p><div class="why"><p>提示：读屏软件不会宣布“加粗”。若该强调用于引入新主题，请使用标题样式。</p></div>`,

	SUS_ALT: `<p>此替代文本包含“%(alt)”一词，通常是冗余的：</p><p><strong class="badge">替代文本</strong> “%(ALT_TEXT)”</p><p>修复：将 alt 改写为简要传达图片的含义。</p><div class="why"><p>提示：读屏软件在读 alt 时会先宣布“图片”，因此“图片/照片/图像：……”之类措辞通常是冗余的。</p></div>`,

	TABINDEX_ATTR: `<p>${why.fix}不要使用大于 “0” 的 tabindex 值。请调整 HTML 中元素的顺序，使 Tab 顺序、可视顺序与阅读顺序保持一致。</p><div class="why"><p>默认情况下，可视顺序、Tab 顺序与读屏顺序是对齐的。</p><p>正 tabindex 会把元素提前到 Tab 顺序的开头，<strong>但不会改变可视或阅读顺序</strong>，使用户在不相邻位置寻找控件与说明。</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}请确保每个表头单元格都有文本。</p><div class="why"><p>提示：读屏软件使用表头来帮助用户在表格中定位与理解数据。</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}在表格属性中指定表头位于首行、首列或两者兼有。</p><div class="why"> <p>提示：读屏软件在进入每一列或每一行时会重复相应表头。</p><p>如果该表格仅用于视觉排版，请移除表格格式，改用纯视觉布局。</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}请移除（h2、h3 等）标题样式，改用表格表头行/列。若需要多层表头，请拆分为多个表格。</p><div class="why"> <p>提示：表格表头具方向性（行或列）。内容标题会影响其后所有文本，即使在不相关列中也是如此：</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">单元格 2 的<strong>表格表头</strong>标注的是 B 单元。<br><br>单元格 2 的<strong>内容标题</strong>则影响 3、A、B、C 单元及此文本与提示尾注。</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,
};

export const interfaceStrings = {
	ALERT_CLOSE: '关闭',
	ALT: '替代文本：',
	DECORATIVE: '标记为装饰性',
	DISMISS: '忽略',
	DISMISS_ALL: '在此页面：忽略',
	edit_page: '编辑页面',
	edit_layout: '编辑布局',
	edit_term: '编辑术语',
	edit_tags: '编辑用户',
	IMAGES: '替代文本',
	MAIN_TOGGLE_LABEL: '启用可访问性工具',
	MISSING: '(缺失！)',
	NOT_VISIBLE: '注意：此内容可能不可见。请在高亮边框的容器内查找。',
	NO_IMAGES: '未找到任何图片。',
	OUTLINE: '标题结构',
	PANEL_DISMISS_BUTTON: `显示 %(dismissCount) 条已隐藏提示`,
	PANEL_HEADING: '显示可视化工具',
	SKIP_TO_ISSUE: '跳转到问题',
	WARNING: '需要手动检查',
	WARNINGS: '需要手动检查',
	buttonFirstContent: '跳到第一条提示',
	buttonHideHiddenAlert: '隐藏已隐藏提示',
	buttonHideHiddenAlerts: `隐藏 %(count) 条已隐藏提示`,
	buttonShowHiddenAlert: '显示已隐藏提示',
	buttonToolsActive: '隐藏可视化工具',
	dismissActions: `类似提示`,
	dismissHideTitle: '仅为你隐藏此提示',
	dismissOkAllButton: '在此页面：标记为 OK',
	dismissOkButtonContent: '标记为 OK',
	dismissOkTitle: '为所有编辑者隐藏此提示',
	dismissOnSite: '在全站：标记为 OK',
	dismissalsHeader: '不打算修复这个问题吗？',
	errorOutlinePrefixHeadingEmpty: '(空标题)',
	errorOutlinePrefixHeadingIsLong: '(标记为过长)',
	errorOutlinePrefixSkippedLevel: '(标记为跳级)',
	issueContent: '内容问题',
	issueDeveloper: '开发问题',
	issueTemplate: '模板问题',
	main_toggle_hide: '隐藏可访问性工具',
	main_toggle_hide_alerts: '隐藏可访问性提示',
	main_toggle_show: '显示可访问性工具',
	main_toggle_show_alerts: '显示可访问性提示',
	panelCheckAltText: `<p class="ed11y-small">检查每张图片是否在语境中表达其含义，并确保页面没有“图片中的文字”。</p>`,
	panelCheckOutline: `<p class="ed11y-small">该面板显示标题层级结构。请检查是否与内容的视觉组织一致。</p>`,
	PANEL_HEADING_MISSING_ONE: '缺少一级标题（H1）。',
	PANEL_NO_HEADINGS: '未找到标题。',
	reportsLink: '打开站点报告',
	toggleDisabled: '暂无可供 Editoria11y 检查的内容。',
	transferFocus: '编辑此内容',
	unDismissHideButton: '恢复这条被忽略的提示',
	unDismissNotePermissions: '此检查已被管理员隐藏',
	unDismissOKButton: '恢复这条被标记为 OK 的提示',
};

const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips),
  testNames: testNames,
};

export default newStrings;
