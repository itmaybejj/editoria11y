import strings from '../sa11y-lang/es.js';

// todo check each file for link integrity, and escaping of tags in code blocks.
export const testNames = {
	ALT_FILE_EXT: '此替代文本是文件名而不是描述',
	ALT_MAYBE_BAD: '此替代文本可能无法被屏幕阅读器正确朗读',
	ALT_PLACEHOLDER: '此替代文本是无意义的占位文本',
	ALT_UNPRONOUNCEABLE: '此替代文本无法发音',
	BTN_EMPTY: '按钮缺少可访问名称',
	BTN_EMPTY_LABELLEDBY: '按钮具有无效的 ARIA 标签',
	BTN_ROLE_IN_NAME: '按钮名称中重复了“button”一词',
	CONTRAST_ERROR: '文本对比度不足，可能难以阅读',
	CONTRAST_ERROR_GRAPHIC: '图形或图标的对比度不足',
	CONTRAST_INPUT: '输入字段的对比度不足，可能难以阅读',
	CONTRAST_PLACEHOLDER: '占位符文本的对比度不足，可能难以阅读',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: '此占位符文本是否具有足够的对比度？',
	CONTRAST_WARNING: '此文本是否具有足够的对比度？',
	CONTRAST_WARNING_GRAPHIC: '此图形或图标是否具有足够的对比度？',
	DUPLICATE_ID: '重复的 ID 属性',
	DUPLICATE_TITLE: '此链接的工具提示内容与链接文本相同',
	EMBED_AUDIO: '此音频是否提供文字稿？',
	EMBED_DATA_VIZ: '此数据可视化是否具有可访问性？',
	EMBED_GENERAL: '嵌入的 iframe 需要手动检查',
	EMBED_MISSING_TITLE: '此框架缺少 "title" 属性',
	EMBED_UNFOCUSABLE: '带有 tabindex="-1" 的框架无法通过键盘聚焦。',
	EMBED_VIDEO: '此视频是否具有准确的字幕？',
	HEADING_EMPTY: '此标题没有文本',
	HEADING_EMPTY_WITH_IMAGE: '此图片被用作标题，因此需要替代文本',
	HEADING_FIRST: '此页面的第一个标题是下级标题',
	HEADING_LONG: '此标题是否可以更短？',
	HEADING_MISSING_ONE: '此页面缺少一级标题',
	HEADING_SKIPPED_LEVEL: '此标题使用了错误的级别',
	HIDDEN_FOCUSABLE: '此元素无法被屏幕阅读器描述',
	IMAGE_ALT_TOO_LONG: '此替代文本是否可以更短？',
	IMAGE_DECORATIVE: '此图片是否真的仅为装饰？',
	IMAGE_DECORATIVE_CAROUSEL: '轮播图/图库中的图片被标记为装饰性',
	IMAGE_FIGURE_DECORATIVE: '手动检查：含图标题的图片缺少替代文本',
	IMAGE_FIGURE_DUPLICATE_ALT: '替代文本不应与图片标题相同',
	LABELS_ARIA_LABEL_INPUT: '此字段是否具有可见标签？',
	LABELS_PLACEHOLDER: '手动检查：占位符文本',
	LABELS_INPUT_RESET: '此重置按钮是否必要？',
	LABEL_IN_NAME: '可见标签与隐藏标签不一致',
	LINK_ALT_FILE_EXT: '链接的替代文本不应为 URL',
	LINK_ALT_MAYBE_BAD: '此链接的替代文本可能无法被屏幕阅读器朗读',
	LINK_ALT_UNPRONOUNCEABLE: '作为链接的图片必须具有可发音的替代文本',
	LINK_CLICK_HERE: '手动检查：链接包含“点击这里”',
	LINK_DOI: '应链接文章标题，而不是 DOI 编号',
	LINK_EMPTY: '此链接没有文本',
	LINK_EMPTY_LABELLEDBY: '此链接具有无效的 aria-labelledby 属性',
	LINK_EMPTY_NO_LABEL: '此链接需要标签',
	LINK_FILE_EXT: '链接指向文件但未提前告知',
	LINK_IDENTICAL_NAME: '此链接是否唯一描述其目标？',
	LINK_IMAGE_ALT: '手动检查：作为链接使用的图片的替代文本',
	LINK_IMAGE_ALT_AND_TEXT: '此替代文本在当前上下文中是否合理？',
	LINK_IMAGE_LONG_ALT: '图片链接的替代文本是否可以更短？',
	LINK_IMAGE_NO_ALT_TEXT: '此图片链接需要替代文本',
	LINK_IMAGE_TEXT: '手动检查：链接中的图片被标记为装饰性。',
	LINK_NEW_TAB: '此链接是否在未提示用户的情况下在新标签页中打开？',
	LINK_PLACEHOLDER_ALT: '此图片链接需要有意义的替代文本',
	LINK_STOPWORD: '此链接是否描述其目的？',
	LINK_STOPWORD_ARIA: '仅屏幕阅读器用户可以获得链接的描述性文本',
	LINK_SUS_ALT: '此替代文本描述的是图片还是链接？',
	LINK_SYMBOLS: '手动检查：链接中的符号或表情符号是否具有意义？',
	LINK_URL: '链接文本不应为 URL',
	META_LANG: '缺少页面语言的 meta 标签',
	META_MAX: 'meta 标签限制用户放大文本',
	META_REFRESH: 'meta 标签会自动刷新页面',
	META_SCALABLE: 'meta 标签阻止用户放大页面',
	META_TITLE: '缺少页面标题的 meta 标签',
	MISSING_ALT: '无效的 HTML：图像缺少 alt 属性',
	MISSING_ALT_LINK: '无效的 HTML：作为链接使用的图像缺少 alt 属性',
	MISSING_ALT_LINK_HAS_TEXT: '无效的 HTML：链接中的图像缺少 alt 属性',
	QA_BAD_LINK: '手动检查：链接目标可能无效',
	QA_BLOCKQUOTE: '此引用是否应该是标题？',
	QA_DOCUMENT: '此文档是否已为屏幕阅读器正确标记？',
	QA_FAKE_HEADING: '此粗体文本是否应该是标题？',
	QA_FAKE_LIST: '此内容是否应该格式化为列表？',
	QA_IN_PAGE_LINK: '页面内链接无效',
	QA_JUSTIFY: '不要使用两端对齐文本',
	QA_NESTED_COMPONENTS: '嵌套的交互式组件',
	QA_PDF: '是否有此 PDF 的替代格式？',
	QA_SMALL_TEXT: '文本太小',
	QA_STRONG_ITALICS: '大量强调文字更难阅读',
	QA_SUBSCRIPT: '不要将上标/下标用作视觉格式装饰',
	QA_UNDERLINE: '只有链接应使用下划线',
	QA_UPPERCASE: '是否需要全部大写的文本？',
	SUS_ALT: '此替代文本中是否有不必要的词？',
	TABINDEX_ATTR: 'tabindex 属性会破坏阅读顺序',
	TABLES_EMPTY_HEADING: '此表头单元格需要文本',
	TABLES_MISSING_HEADINGS: '此表格缺少行或列的标题',
	TABLES_SEMANTIC_HEADING: '内容标题不应在表格中使用',
	UNCONTAINED_LI: '无效的 HTML 列表',
};

const why = {
	fix: `<strong class="badge">如何修复</strong> `,
	check: `<strong class="badge">手动检查</strong> `,

	buttons: `<div class="why"><p>注意：按钮的可访问名称应清楚说明它的作用。点击后会改变状态的按钮，其名称也必须随之改变：</p><ul>
<li>更改标签：<br>“播放/暂停”、“显示详情/隐藏详情”</li>
<li>更改 <a ref="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">ARIA 状态属性</a>：<br>“播放/播放（已按下）”、“详情（已折叠）/详情（已展开）”。</li>
</ul>
<p>但不要同时更改两者。如果将“播放”改为“暂停（已按下）”，这表示播放器处于暂停状态——而不是正在播放！</p></div>`,

	headings: `<div class="why"><p>提示：标题和副标题将内容组织成分级结构。依赖屏幕阅读器的用户通过标题结构理解和导航页面内容：</p><ul>
<li>一级标题：页面标题
<ul><li>二级标题：主要内容
<ul><li>三级标题：子内容</li></ul>
</li></ul>
</li>
</ul></div>`,

	images: `<div class="why"><p>提示：编写替代文本时，应描述图像在当前语境中的“含义”，而不仅仅是它“呈现了什么”。例如，一张孩子踢球的照片，在不同语境中可能意味着：</p><ul>
<li>他们即使在大雨中也坚持比赛。</li>
<li>新的队服上有很酷的龙形标志。</li>
<li>她在左侧边线射入了制胜球！</li>
</ul></div>`,

	links: `<div class="why"><p>用户通常通过扫描页面中的链接来了解页面结构，也会通过搜索关键词来定位链接。因此，一个好的链接必须具有明确性、唯一性和简洁性：</p><ul>
<li>理想情况：“了解更多关于 <a href="https://webaim.org/techniques/hypertext/link_text">有意义的链接</a>”</li>
<li>不唯一：“点击 <a href="https://webaim.org/techniques/hypertext/link_text">这里</a>了解更多”</li>
<li>不简洁：“<a href="https://webaim.org/techniques/hypertext/link_text">点击此处了解更多关于有意义的链接</a>”</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>替代文本的目标是提供图像的“意义”，而不仅仅是“内容”。对图片链接来说，意义即是链接的目的：</p><ul>
<li>“<em>放大镜</em>”描述的是图像，而不是链接目的。</li>
<li>“<em>搜索图标</em>”含义模糊——像是在描述图像，也像是在描述动作。</li>
<li>“<em>搜索</em>”准确描述了链接的目的。</li>
</ul></p></div>`,
};

export const tips = {

	ALT_FILE_EXT: `<p>屏幕阅读器会朗读此 URL，通常是一字一字地读。这很可能无法传达图像的原本意义。</p><p>${why.fix}如果这是无意义的装饰元素，应添加空 alt（alt=""）以便屏幕阅读器忽略，或添加有意义的替代文本。</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>此图像提供的描述为：<strong>"%(alt)"</strong></p><p>${why.fix}请将替代文本修改为简短且符合当前语境的描述。</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>此图像提供的描述为：<strong>"%(alt)"</strong></p><p>${why.fix}请将替代文本修改为简短且符合当前语境的描述。</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>此替代文本 "%(alt)" 仅包含符号或空白，无法发音。屏幕阅读器会宣布“图像”，然后出现尴尬的停顿：“图像：____。”</p><p>${why.fix}请添加可读的替代文本，或在其应被忽略时使用空 alt（alt=""）。</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}请通过可见文本、图标 alt 文本或 title 属性提供按钮的可访问名称。</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>此按钮的 <code>aria-labelledby</code> 属性为空或引用了不存在的 <code>ID</code>。</p><p>${why.fix}请修复对应关系，或移除此属性并使用其他方式描述按钮。</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: '由于存在背景图像或渐变，本工具无法确定文字后方的确切颜色。请使用下方取色器手动检查对比度。',

	DUPLICATE_ID: `<p>此页面上的 ID 用于标签或链接目标，因此必须唯一。</p><p>${why.fix}请修改此 ID：<strong>#%(id)</strong></p><div class="why"><p>在大多数 CMS 中，ID 来自“name”或“id”字段。在 HTML 中，它是属性：<code><a id="MY-ID"></code></p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}请删除此链接的 <code>title</code> 属性。</p><div class="why"><p>注意：<code>title</code> 提示仅在鼠标悬停时出现。许多用户（尤其是移动端或键盘用户）无法看到它，因此它不应包含重要信息。</p></div>`,

	EMBED_AUDIO: `<p>若音频包含语音，则必须在页面中提供或链接至 https://www.w3.org/WAI/media/av/transcribing/文本版本</a>。</p><p>自动转录必须由人工校对，以确保说话者及关键声音标注正确。</p>`,

	EMBED_DATA_VIZ: `<p>嵌入式数据可视化对辅助技术常常不友好，对低视力或色盲用户也可能难以理解，且可能在手机端需要横向滚动。</p><p>${why.fix}除非它具有高对比度、完全支持键盘操作，<strong><em>并且</em></strong>能被屏幕阅读器描述，否则需提供等效替代，如文字描述、数据表或可下载的数据文件。</p>`,

	EMBED_GENERAL: '自动检测无法检查嵌入内容。请确保图像具有替代文本、视频有字幕、文本具备足够对比度，并确保链接和按钮 https://webaim.org/techniques/keyboard/支持键盘操作</a>。然后可忽略此警告。',

	EMBED_MISSING_TITLE: `<p>嵌入元素需要用于屏幕阅读器的可访问名称。</p><p>${why.fix}请添加唯一的 <code>title</code> 或 <code>aria-label</code>。</p>`,

	EMBED_UNFOCUSABLE: `此属性使键盘与辅助技术跳过此 iframe。若其内容包含链接、按钮、表单或可滚动区域，应移除此属性。`,

	EMBED_VIDEO: `<p>视频必须包含字幕。</p><p>自动生成的字幕必须人工校对。</p><p>${why.fix}请添加或修正字幕，然后关闭此警告。</p>`,

	HEADING_EMPTY: `<p>空标题会造成结构缺口。</p><p>${why.fix}请添加文字或删除此空行。</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>空标题会造成结构缺口。</p><p>${why.fix}若非标题，请将其从 <strong {C}>标题 %(level)</strong> 改为 <strong>段落</strong>。若是标题，请将图像意义放入 alt 文本。</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}请确保页面标题设置为一级或二级标题。 ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}除非这是正式标题（如发表文章标题），否则请缩短以提高可扫描性。</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}请将页面标题设为一级标题，以标示文档结构的开始。</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>此标题从 <strong>%(prevLevel)</strong> 跳到了 <strong>%(level)</strong>。对屏幕阅读器而言，这听起来像内容缺失。</p><p>${why.fix}请调整标题级别以保持结构连续。</p>${why.headings}`,

	HIDDEN_FOCUSABLE: '此互动元素设置了 <code>aria-hidden="true"</code>，但仍可获得键盘焦点。若要隐藏，应同时使用 <code>tabindex="-1"</code>；若不是为了隐藏，请移除 aria-hidden。',

	IMAGE_ALT_TOO_LONG: `<p>屏幕阅读器会将 alt 文本作为一段连续的话语朗读；若内容太长，用户难以回听特定信息。</p><p>此 alt 文本长度为 %(altLength) 字符：<em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>提示：复杂图像通常需要 <strong>可见</strong>说明文字或额外文字描述。</p></div>`,

	IMAGE_DECORATIVE: `<p>此图像因空 alt 而被屏幕阅读器忽略。只有真正无含义的装饰图像应如此处理。</p><p>${why.fix}若图像具有意义，请添加替代文本。</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: '此图像标记为 <strong>装饰</strong>，但轮播/图库中的所有图像都应具有替代文本。',

	IMAGE_FIGURE_DECORATIVE: `<p>此图像将被辅助技术忽略。仅凭图像说明文字是否仍能表达意义？</p><p>${why.fix}如果说明文字未完全表达图像的视觉含义，请添加补充的替代文本。</p><div class="why"><p>提示：图像、替代文本和说明文字共同配合：</p><ul><li>可见的说明文字提供上下文和解释。</li><li>替代文本为无法看到图像的用户描述内容，使说明文字更易理解。</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}调整替代文本，使其描述图像的视觉意义，而不是简单重复说明文字。</p><div class="why"><p>提示：图像、替代文本和说明文字共同协作：</p><ul><li>说明文字提供更深的上下文。</li><li>替代文本描述视觉信息，使说明文字完整可理解。</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: '<p><strong {B}>隐藏字段标签：</strong> <strong {C}>%(TEXT)</strong></p><p>请确认是否存在可见字段标签，且其内容在字段包含文字时仍保持可见，并与隐藏的可访问名称一致。</p><div class="why"><p>仅依赖 placeholder 或 title 的标签会在用户输入时消失，导致数据检查困难。</p></div>',

	LABELS_INPUT_RESET: `<p>重置按钮容易被误触，可能导致数据丢失且没有撤销方式。</p><p>${why.fix}除非此按钮仅重置一个字段，否则建议删除或添加确认提示。</p>`,

	LABELS_MISSING_IMAGE_INPUT: '图像按钮缺少替代文本。请添加替代文本，例如 <em>搜索</em> 或 <em>提交</em>。',

	LABELS_MISSING_LABEL: '此输入字段没有关联标签。请添加 <code>id</code> 并在对应标签中添加匹配的 <code>for</code> 属性。',

	LABELS_NO_FOR_ATTRIBUTE: '此输入字段缺少关联标签。请在标签中添加与该字段 <code>id</code> 匹配的 <code>for</code> 属性。<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>占位符文本在输入时会消失，并且可能缺乏足够的对比度或易被误认为正式内容。</p><p>${why.fix}确保重要信息（如字段标签、格式说明、帮助文本）始终可见。</p>`,

	LABEL_IN_NAME: `<p>此元素的可见标签似乎与其可访问名称不一致。这可能导致屏幕阅读器用户困惑并影响语音控制。</p><p>${why.check}请确保可见标签以可访问标签开头并与其匹配。</p><p><strong>隐藏标签：</strong> "%(TEXT)"</p>`,

	LINK_ALT_FILE_EXT: `<p>此图像的替代文本包含 "%(alt)"，看起来像是文件名，而不是有意义的链接描述。</p><p>${why.fix}请将替代文本设置为链接的目标或名称。</p><div class="why"><p>替代文本应表达图像的意义。当图像是链接时，其意义来自链接的目标：</p><ul><li>“文字页面”描述图像，而非链接。</li><li>“IMG_1234.jpg”只是一个文件名。</li><li>“<strong><em>报名表（doc）</em></strong>”才是真正的链接意义。</li></ul></p></div>`,

	LINK_ALT_MAYBE_BAD: `<p>此图像的替代文本是占位符：“<strong>%(alt)</strong>”。</p><p>${why.fix}请将替代文本设置为链接的目的。</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>此链接图像的替代文本仅包含无法发音的字符：“%(ALT_TEXT)”。屏幕阅读器无法朗读其意义。</p><p>${why.fix}设置为描述链接目标或用途的替代文本。</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `“点击这里”等词语是不必要的，且不能表达链接目的。`,

	LINK_DOI: `<p>${why.fix}将文章标题作为链接文字，而 DOl 编号应以文本形式呈现，而不是作为链接。</p><div class="why"><p>https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20linksAPA 建议</a>使用描述性链接，因为用户更容易通过名称来扫描链接。</p><p>这也让屏幕阅读器能够正确朗读链接含义，而非一串无意义的编号。</p></div>`,

	LINK_EMPTY: `<p>${why.fix}添加描述性文字，或若这是误操作（如意外链接空格），请删除此链接。</p><div class="why"><p>屏幕阅读器难以处理空链接，它们可能保持沉默或逐字符朗读 URL。</p><p>有些编辑器中空链接难以删除，需要重新输入周围文本。</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p><code>aria-labelledby</code> 属性引用了不存在的 ID。</p><p>${why.fix}请提供有效的 ID 或删除该属性。</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}请添加描述性文本或删除此空链接。</p><div class="why"><p>屏幕阅读器无法朗读空链接。</p></div>`,

	LINK_FILE_EXT: `<p>此链接指向文件（如 PDF、MP3 或 zip），但未提前告知用户。</p><p>${why.fix}请使用文字或图标来 https://itmaybejj.github.io/linkpurpose/说明文件类型</a>。</p><p class="why">对于大型文件，请考虑添加大小说明，如“报告（PDF，3 MB）”。</p>`,

	LINK_IDENTICAL_NAME: `<p>多个链接目标不同却使用相同名称：“<strong>%(TEXT)</strong>”。</p><p>${why.fix}请使每个链接名称独特并准确描述其目标。</p>${why.links}`,

	LINK_IMAGE_ALT: `请确保此替代文本描述的是链接目的：</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>请检查它是否帮助描述链接目标，而不是加入无关内容：</p><p><strong class="badge">Alt</strong> "<em><strong>%(alt)</strong></em>"</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p>https://webaim.org/techniques/hypertext/link_text#alt_link图像链接的替代文本应描述链接目标</a>。长替代文本通常无法快速浏览，不利于屏幕阅读器用户。</p>此替代文本共 %(altLength) 字符：<em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>当链接包含图像时，其替代文本 https://webaim.org/techniques/hypertext/link_text#alt_link将作为链接名称朗读</a>。</p><p>${why.fix}请提供描述链接目标的 alt 文本。</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: '此图像被标记为装饰性，但链接使用周围文本作为名称。',

	LINK_NEW_TAB: `<p>${why.fix}请设为在同一标签页打开，或 https://itmaybejj.github.io/linkpurpose/提前告知用户</a>。</p><div class="why"><p>强制在新标签页打开可能让用户迷惑，尤其在“返回”按钮无效时。</p><p>注意：在表单中，链接常在新标签页打开，以避免数据丢失。</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>此图像链接的替代文本是占位符：“<strong>%(alt)</strong>”。</p><p>${why.fix}请设置为描述链接目标的替代文本。</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>此链接包含没有意义的词语：<br><strong>%(text)</strong></p><p>${why.fix}请改为清晰描述链接目的的文案。</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>ARIA 提供了可访问名称，但可见文本却是通用的：“<strong {C}>%(ERROR)</strong>”。</p><p>${why.fix}请确保所有用户都能看到有意义的链接名称，并与 ARIA 名称一致。</p>${why.links}`,

	LINK_SUS_ALT: `<p>此图像的替代文本包含 "%(alt)"，通常表示它描述的是图像本身，而非链接目标。</p><strong class="badge">替代文本</strong> "%(ALT_TEXT)"    <p>修复方式：确保替代文本描述链接目标。<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}不要在链接文本中使用符号作为操作提示，除非它们对屏幕阅读器隐藏。否则可能造成困惑。请考虑移除：<strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}使用描述链接目的的文字，而不是 URL。</p><div class="why"><p>用户通常通过名称扫描链接，尤其是使用屏幕阅读器的用户。</p><p>URL 文本不利于浏览和快速理解。</p></div>`,

	META_LANG: `<p>${why.fix}请在 HTML 标签中添加 https://www.w3.org/International/questions/qa-html-language-declarations语言属性</a>。</p><div class="why"><p>屏幕阅读器依赖语言信息正确朗读文本。若未指定语言，可能导致发音错误。</p></div>`,

	META_MAX: `<p>此 meta 标签限制用户放大页面的能力。</p><p>${why.fix}请移除或调整此限制以允许完全缩放。</p>`,

	META_REFRESH: `<p>不要使用 meta 标签自动刷新页面。这样会中断用户操作并可能导致数据丢失。</p><p>${why.fix}如需自动更新内容，请使用 AJAX 或让用户确认刷新。</p>`,

	META_SCALABLE: `<p>此 meta 标签阻止用户放大页面。</p><p>${why.fix}请允许缩放以提高可访问性。</p>`,

	META_TITLE: `<p>${why.fix}请在 <code><head></code> 中添加 <code><title></code> 标签。</p><div class="why"><p>简短且唯一的 https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title页面标题</a>对多项功能至关重要：</p><ul><li>搜索引擎使用它作为结果标题。</li><li>浏览器在标签页上显示它。</li><li>屏幕阅读器在切换标签页时朗读它。</li></ul><p>没有标题时，用户只能看到 URL。</p></div>`,

	MISSING_ALT: `<p>当屏幕阅读器遇到没有 alt 的图片时，会逐字朗读图像 URL。</p><p>${why.fix}请为装饰性图片添加 alt=""，为信息性图片添加描述性替代文本。</p>${why.images}`,

	MISSING_ALT_LINK: `<p>当链接中的图片没有 alt 时，屏幕阅读器会朗读图像 URL，这对链接尤其糟糕。</p><p>${why.fix}请添加描述链接目标的替代文本。</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>此图像属于一个带文字的链接。若文字已清楚描述链接目标，使用 alt=""。否则添加描述性 alt。</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>此链接似乎指向开发环境：<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}请改为相对路径（/folder）或公开 URL。</p>`,

	QA_BLOCKQUOTE: `<p>blockquote 告诉屏幕阅读器这是引用。短引用通常是被误用为标题的内容。</p><p>${why.fix}若它是标题，请改用标题样式。</p>${why.headings}`,

	QA_DOCUMENT: `<p>作为网页内容的文档必须具备可访问性。请检查标题、表头以及图像替代文本。</p><ul class="why"><li>如何提高 https://support.google.com/docs/answer/6199477?hl=zh-CNGoogle 文档</a>可访问性。</li><li>如何提高 https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155Microsoft Office 文档</a>可访问性。</li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}若此加粗文本作为主题标题，请改用标题样式。</p><div class="why"><p>提示：标题为辅助技术提供可导航的大纲结构。</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}如果 "%(text)" 是列表项，请使用列表格式。</p><div class="why"><p>列表具有视觉与语义结构：</p><ol><li>统一缩进提升可读性。</li><li>屏幕阅读器会宣布位置（如“第 3 项，共 7 项”）。</li></ol><p>仅在前方加数字并不能构成真正的列表结构。</p></div>`,

	QA_IN_PAGE_LINK: `<p>此锚点链接的目标在页面中不存在。</p><div class="why"><p>开发者注意：若此链接触发 JavaScript，请确保键盘操作同样有效。</p></div>`,

	QA_JUSTIFY: `<p>两端对齐会产生不均匀空格，使文本更难阅读。</p><p>${why.fix}请使用左对齐。</p>`,

	QA_NESTED_COMPONENTS: '请避免嵌套互动组件（如嵌套的手风琴或选项卡）。这会增加导航难度。',

	QA_PDF: `<p>${why.fix}请执行以下任一操作后再忽略此警告：</p><ul><li>改为链接网页内容；</li><li>或同时提供网页版本或可编辑文档；</li><li>或至少确保 PDF 提供标题结构、正确阅读顺序、表格标记和替代文本。</li></ul><div class="why"><p>尤其是移动端用户和使用辅助技术的用户更偏好网页版本而非 PDF。</p></div>`,

	QA_SMALL_TEXT: '文字过小，难以阅读，尤其对视力受限者。请避免使用过小字体。',

	QA_STRONG_ITALICS: `<p>${why.fix}谨慎使用粗体和斜体，仅用于强调少量内容。</p><div class="why"><p>提示：如需引用，请使用 blockquote。</p></div>`,

	QA_SUBSCRIPT: `上标与下标使文字变小，应仅用于序号（如 4<sup>th</sup>）、化学式（H<sub>2</sub>O）或脚注引用。`,

	QA_UNDERLINE: `<p>网页上带下划线的文字通常表示链接。用户会认为它可点击。</p><p>${why.fix}若仅用于强调，请使用 <strong>粗体</strong> 或 <em>斜体</em>；若为新主题，请使用标题。</p><div class="why"><p>提示：屏幕阅读器不会宣布视觉样式变化；只有标题能提供结构。</p></div>`,

	QA_UPPERCASE: `<p>大量使用全大写会降低可读性，并可能让人感觉“在喊”。</p><p>${why.fix}请减少全大写使用，改为粗体等更友好的强调方式。</p><div class="why"><p>提示：屏幕阅读器不会宣布粗体或样式变化。若文本引入新主题，请使用标题。</p></div>`,

	SUS_ALT: `<p>替代文本包含 "%(alt)"，这通常是冗余内容：</p><p><strong class="badge">替代文本</strong> "%(ALT_TEXT)"</p><p>解决方案：使用更简短、传达含义的替代文本。</p><div class="why"><p>提示：屏幕阅读器已自动宣布“图像”，因此“图像/图片/照片：…”等表达通常是不必要的。</p></div>`,

	TABINDEX_ATTR: `<p>${why.fix}请勿使用大于 0 的 tabindex。应调整 HTML 结构，使视觉顺序、键盘顺序与阅读顺序一致。</p><div class="why"><p>默认情况下，这三种顺序是一致的。</p><p>正值 tabindex 会改变键盘顺序，但不会改变视觉顺序，导致用户困惑。</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}确保每个表头单元格包含文本。</p><div class="why"><p>提示：屏幕阅读器依靠表头帮助用户理解数据。</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}在表格设置中指定表头位于首行、首列或两者。</p><div class="why"> <p>提示：屏幕阅读器会在进入单元格时重复对应的行或列标题。</p><p>若此表格不是用于数据呈现，请不要使用表格格式。</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}请将 h2、h3 等标题格式移出表格，改用表格的行/列标题。如果需要多级标题，请使用多张表。</p><div class="why"> <p>提示：表格标题是方向性的（行或列），而内容标题会影响整个结构：</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2"><strong>表头</strong> 在单元格 2 中标记 B 列。<br><br> <strong>内容标题</strong> 在单元格 2 中会标记 3、A、B、C，以及此说明文本和下方的脚注。</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,

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
	NOT_VISIBLE: '注意：此内容可能不可见。请在高亮区域内查找。',
	NO_IMAGES: '未找到任何图像。',
	OUTLINE: '标题结构',
	PANEL_DISMISS_BUTTON: `显示 %(dismissCount) 条已隐藏消息`,
	PANEL_HEADING: '显示可视化工具',
	SKIP_TO_ISSUE: '跳转到问题',
	WARNING: '需要手动检查',
	WARNINGS: '需要手动检查',
	buttonFirstContent: '跳到第一条消息',
	buttonHideHiddenAlert: '隐藏已隐藏消息',
	buttonHideHiddenAlerts: `隐藏 %(count) 条已隐藏消息`,
	buttonShowHiddenAlert: '显示已隐藏消息',
	buttonToolsActive: '隐藏可视化工具',
	dismissActions: `类似问题`,
	dismissHideTitle: '仅为你隐藏此消息',
	dismissOkAllButton: '在此页面：标记为“正常”',
	dismissOkButtonContent: '标记为“正常”',
	dismissOkTitle: '为所有编辑者隐藏此消息',
	dismissOnSite: '在整个站点：标记为“正常”',
	dismissalsHeader: '你不打算修复这个问题吗？',
	errorOutlinePrefixHeadingEmpty: '(空标题)',
	errorOutlinePrefixHeadingIsLong: '(标记为过长)',
	errorOutlinePrefixSkippedLevel: '(标记为跳级)',
	issueContent: '内容问题',
	issueDeveloper: '开发问题',
	issueTemplate: '模板问题',
	main_toggle_hide: '隐藏可访问性工具',
	main_toggle_hide_alerts: '隐藏可访问性警告',
	main_toggle_show: '显示可访问性工具',
	main_toggle_show_alerts: '显示可访问性警告',
	panelCheckAltText: '<p class="ed11y-small">检查每张图片是否在语境中表达其含义，并确保没有包含文字内容的图片。</p>',
	panelCheckOutline: '<p class="ed11y-small">此工具显示标题层级结构。请检查是否与页面视觉结构一致。</p>',
	PANEL_HEADING_MISSING_ONE: '缺少一级标题。',
	PANEL_NO_HEADINGS: '未找到标题。',
	reportsLink: '打开全站报告',
	toggleDisabled: '没有可供 Editoria11y 检查的内容。',
	transferFocus: '编辑此内容',
	unDismissHideButton: '恢复此已隐藏消息',
	unDismissNotePermissions: '此检查由管理员隐藏',
	unDismissOKButton: '恢复此标为“正常”的消息',
};

const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips),
  testNames: testNames,
};

export default newStrings;
