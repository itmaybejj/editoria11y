import strings from '../sa11y-lang/ja.js';

// todo check each file for link integrity, and escaping of tags in code blocks.
export const testNames = {
	ALT_FILE_EXT: 'この代替テキストは説明ではなくファイル名です',
	ALT_MAYBE_BAD: 'この代替テキストはスクリーンリーダーで正しく読み上げられない可能性があります',
	ALT_PLACEHOLDER: 'この代替テキストは意味のないプレースホルダーです',
	ALT_UNPRONOUNCEABLE: 'この代替テキストは発音できません',
	BTN_EMPTY: 'このボタンにはアクセシブルな名称がありません',
	BTN_EMPTY_LABELLEDBY: 'このボタンの ARIA ラベルが無効です',
	BTN_ROLE_IN_NAME: 'ボタン名に「button」という語が重複しています',
	CONTRAST_ERROR: 'テキストのコントラストが不十分で読みづらい状態です',
	CONTRAST_ERROR_GRAPHIC: 'グラフィックまたはアイコンのコントラストが不十分です',
	CONTRAST_INPUT: '入力フィールドのコントラストが不十分で読みづらい状態です',
	CONTRAST_PLACEHOLDER: 'プレースホルダーのテキストコントラストが不十分です',
	CONTRAST_PLACEHOLDER_UNSUPPORTED: 'このプレースホルダーは十分なコントラストがありますか？',
	CONTRAST_WARNING: 'このテキストは十分なコントラストがありますか？',
	CONTRAST_WARNING_GRAPHIC: 'このグラフィック/アイコンは十分なコントラストがありますか？',
	DUPLICATE_ID: '重複した ID 属性があります',
	DUPLICATE_TITLE: 'このリンクのツールチップがリンク本文と同じ内容です',
	EMBED_AUDIO: 'この音声コンテンツには文字起こしがありますか？',
	EMBED_DATA_VIZ: 'このデータ可視化はアクセシブルですか？',
	EMBED_GENERAL: '埋め込み iframe は手動チェックが必要です',
	EMBED_MISSING_TITLE: 'iframe に "title" 属性がありません',
	EMBED_UNFOCUSABLE: 'tabindex="-1" のフレームはキーボードから操作できません。',
	EMBED_VIDEO: 'この動画には正確な字幕がありますか？',
	HEADING_EMPTY: 'この見出しにはテキストがありません',
	HEADING_EMPTY_WITH_IMAGE: 'この画像は見出しとして使用されているため、代替テキストが必要です',
	HEADING_FIRST: 'ページ内の最初の見出しが下位レベルの見出しになっています',
	HEADING_LONG: 'この見出しは短くできますか？',
	HEADING_MISSING_ONE: 'このページにはレベル1の見出しがありません',
	HEADING_SKIPPED_LEVEL: 'この見出しは不適切なレベルでマークされています',
	HIDDEN_FOCUSABLE: 'この要素はスクリーンリーダーで適切に説明できません',
	IMAGE_ALT_TOO_LONG: 'この代替テキストは短くできますか？',
	IMAGE_DECORATIVE: 'この画像は本当に装飾目的のみですか？',
	IMAGE_DECORATIVE_CAROUSEL: 'カルーセル／ギャラリー内の画像が装飾扱いになっています',
	IMAGE_FIGURE_DECORATIVE: '手動チェック: キャプション付きの画像に alt テキストがありません',
	IMAGE_FIGURE_DUPLICATE_ALT: 'alt テキストはキャプションと同じ内容にすべきではありません',
	LABELS_ARIA_LABEL_INPUT: 'このフィールドには可視ラベルがありますか？',
	LABELS_PLACEHOLDER: '手動チェック: プレースホルダーのテキスト',
	LABELS_INPUT_RESET: 'このリセットボタンは必要ですか？',
	LABEL_IN_NAME: '可視ラベルが非表示ラベルと一致していません',
	LINK_ALT_FILE_EXT: 'リンクの alt テキストが URL になっています',
	LINK_ALT_MAYBE_BAD: 'リンク画像の alt テキストがスクリーンリーダーで読み上げられません',
	LINK_ALT_UNPRONOUNCEABLE: 'リンク画像には発音可能な代替テキストが必要です',
	LINK_CLICK_HERE: '手動チェック: リンクに「クリックしてください」が含まれています',
	LINK_DOI: 'DOI 番号ではなく記事タイトルをリンクしてください',
	LINK_EMPTY: 'このリンクにはテキストがありません',
	LINK_EMPTY_LABELLEDBY: 'このリンクの aria-labelledby が無効です',
	LINK_EMPTY_NO_LABEL: 'このリンクにはラベルが必要です',
	LINK_FILE_EXT: '警告なしにファイルへリンクしています',
	LINK_IDENTICAL_NAME: 'このリンクは行き先を一意に説明していますか？',
	LINK_IMAGE_ALT: '手動チェック: alt テキスト付きリンク画像',
	LINK_IMAGE_ALT_AND_TEXT: 'この alt テキストはリンク文脈において意味がありますか？',
	LINK_IMAGE_LONG_ALT: 'このリンク画像の alt テキストを短縮できますか？',
	LINK_IMAGE_NO_ALT_TEXT: 'このリンク画像には代替テキストが必要です',
	LINK_IMAGE_TEXT: '手動チェック: リンク内の画像が装飾扱いになっています。',
	LINK_NEW_TAB: 'このリンクは警告なしに新しいタブを開きますか？',
	LINK_PLACEHOLDER_ALT: 'このリンク画像には意味のある代替テキストが必要です',
	LINK_STOPWORD: 'このリンクは目的地を説明していますか？',
	LINK_STOPWORD_ARIA: 'リンクの意味がスクリーンリーダー利用者にしか伝わりません',
	LINK_SUS_ALT: 'この alt テキストは画像を説明していますか？リンクを説明していますか？',
	LINK_SYMBOLS: '手動チェック: このリンク内の記号/絵文字に意味はありますか？',
	LINK_URL: 'リンクテキストが URL になっています',
	META_LANG: 'ページ言語の meta タグがありません',
	META_MAX: 'meta タグが拡大率を制限しています',
	META_REFRESH: 'meta タグがページを自動更新します',
	META_SCALABLE: 'meta タグが拡大を無効にしています',
	META_TITLE: 'ページタイトルの meta タグがありません',
	MISSING_ALT: '無効な HTML: 画像に alt 属性がありません',
	MISSING_ALT_LINK: '無効な HTML: リンク画像に alt 属性がありません',
	MISSING_ALT_LINK_HAS_TEXT: '無効な HTML: リンク内の画像に alt 属性がありません',
	QA_BAD_LINK: '手動チェック: リンク先が無効な可能性があります',
	QA_BLOCKQUOTE: 'この引用は見出しであるべきですか？',
	QA_DOCUMENT: 'この文書はスクリーンリーダー用に適切にタグ付けされていますか？',
	QA_FAKE_HEADING: 'この太字テキストは見出しであるべきですか？',
	QA_FAKE_LIST: 'これはリストとして書式設定すべきですか？',
	QA_IN_PAGE_LINK: 'ページ内リンクが壊れています',
	QA_JUSTIFY: '両端揃えのテキストは使用しないでください',
	QA_NESTED_COMPONENTS: '入れ子になったインタラクティブコンポーネント',
	QA_PDF: 'この PDF に代替形式はありますか？',
	QA_SMALL_TEXT: 'テキストが小さすぎます',
	QA_STRONG_ITALICS: '大量の強調テキストは読みづらくなります',
	QA_SUBSCRIPT: '上付き/下付きは装飾として使用しないでください',
	QA_UNDERLINE: '下線はリンクにのみ使用してください',
	QA_UPPERCASE: 'この全文大文字表記は必要ですか？',
	SUS_ALT: 'この alt テキストに不要な語句が含まれていますか？',
	TABINDEX_ATTR: 'tabindex 属性が読み順に影響しています',
	TABLES_EMPTY_HEADING: 'この表見出しセルにはテキストが必要です',
	TABLES_MISSING_HEADINGS: 'この表には行見出し/列見出しが不足しています',
	TABLES_SEMANTIC_HEADING: '内容見出しを表内で使用すべきではありません',
	UNCONTAINED_LI: '無効な HTML リストです',
};

const why = {
	fix: `<strong class="badge">修正方法</strong> `,
	check: `<strong class="badge">手動チェック</strong> `,

	buttons: `<div class="why"><p>注意：ボタンのアクセシブルネームは、そのボタンが「何をするのか」を明確に示す必要があります。クリック後に状態が変わるボタンは、名前も変わるべきです：</p><ul>
<li>ラベルが変化する例：<br>「再生／一時停止」、「詳細を表示／非表示」</li>
<li>ARIA 状態属性が変化する例：<br>「再生／再生（押下状態）」、「詳細（折りたたみ）／詳細（展開）」</li>
</ul>
<p>ただし、ラベルと状態の両方を同時に変えてはいけません。「再生」を「一時停止（押下）」にすると、プレーヤーが“再生中”ではなく“停止中”だと誤解されます！</p></div>`,

	headings: `<div class="why"><p>ヒント：見出し（Heading）は、内容を階層構造に整理します。スクリーンリーダー利用者は、この構造を頼りにページを理解し、移動します：</p><ul>
<li>見出しレベル1：ページタイトル
<ul><li>見出しレベル2：主要なセクション
<ul><li>見出しレベル3：サブセクション</li></ul>
</li></ul>
</li>
</ul></div>`,

	images: `<div class="why"><p>ヒント：代替テキストを書くときは、「何が写っているか」ではなく「何を意味するか」を書きます。同じ画像でも文脈によって意味が異なります：</p><ul>
<li>激しい雨の中でもプレーを続けている。</li>
<li>新しいチームユニフォームにはかっこいいドラゴンのロゴが付いている。</li>
<li>左サイドから決勝ゴールを決めた！</li>
</ul></div>`,
// todo this didn't work.
	links: `<div class="why"><p>ユーザーはページを素早くスクロールし、リンクを名前で探します。そのため、良いリンクテキストは次のような特徴を持ちます：意味がある・固有・簡潔。</p><ul>
<li>理想的な例：「有意義なリンクについて読む：https://webaim.org/techniques/hypertext/link_text」</li>
<li>固有でない例：「詳しくは https://webaim.org/techniques/hypertext/link_texthere</a> をクリック」</li>
<li>簡潔でない例：「https://webaim.org/techniques/hypertext/link_textここをクリックして…」</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>代替テキストは「画像が何を意味するか」を伝えるためのものです。画像がリンクとして使われている場合、その意味とは「リンク先」です：</p><ul>
<li>「<em>虫眼鏡</em>」→ 画像の説明（✘）</li>
<li>「<em>検索アイコン</em>」→ あいまい（✘）</li>
<li>「<em>検索</em>」→ リンクの目的を説明（◎）</li>
</ul></p></div>`,
};

export const tips = {

	ALT_FILE_EXT: `<p>スクリーンリーダーはこの URL を読み上げますが、多くの場合 1 文字ずつ読み上げます。これは画像を実際に見る時の意味を適切に伝えません。</p><p>${why.fix}意味のない装飾でありスクリーンリーダーに無視させたい場合は空の alt (alt="") を設定するか、意味のある説明を追加してください。</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>この画像に提供された説明：<strong>"%(alt)"</strong></p><p>${why.fix}この画像がこの文脈で何を意味するのか、簡潔に説明する代替テキストを設定してください。</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>この画像に提供された説明：<strong>"%(alt)"</strong></p><p>${why.fix}この画像がこの文脈で何を意味するのか、簡潔に説明する代替テキストを設定してください。</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>この alt テキスト "%(alt)" は、記号やスペースのみで構成され、発音できません。スクリーンリーダーは「画像：____」という不自然な読み上げになります。</p><p>${why.fix}意味のある alt を追加するか、無視すべき装飾要素の場合は alt="" を指定してください。</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}スクリーンリーダーにボタンの機能を伝えるため、可視ラベル、アイコンの alt、または title 属性など、適切な方法で名称を提供してください。</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>このボタンの <code>aria-labelledby</code> 属性は空、または存在しない <code>ID</code> を参照しています。</p><p>${why.fix}有効な ID に修正するか、属性を削除して別の方法で名称を提供してください。</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: '背景画像またはグラデーションにより、この検査ではテキスト背後の色を確実に判定できません。手動でコントラストを確認してください。',

	DUPLICATE_ID: `<p>ID はリンクターゲットやラベル付けに使われるため、ページ内で一意でなければなりません。</p><p>${why.fix}この ID を変更してください：<strong>#%(id)</strong></p><div class="why"><p>多くの CMS では、これは「name」または「id」フィールドから設定されます。HTML では <code><a id="MY-ID"></code> のように記述されます。</p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}このリンクの <code>title</code> 属性を削除してください。</p><div class="why"><p>注意：<code>title</code> ツールチップはマウス操作でしか見えず、キーボードユーザーやモバイルでは表示されません。重要な情報を入れるべきではありません。</p></div>`,

	EMBED_AUDIO: `<p>音声に話者の発話が含まれる場合、 https://www.w3.org/WAI/media/av/transcribing/文字起こし</a> がこのページ内、またはリンクとして提供されている必要があります。</p><p>自動生成された字幕は、話者・音の識別が正確であるように人による確認が必要です。</p>`,

	EMBED_DATA_VIZ: `<p>埋め込みのデータ可視化ウィジェットは、支援技術での操作が困難なことが多く、弱視・色覚障害ユーザーに理解しづらく、モバイルでは横スクロールが必要になる場合があります。</p><p>${why.fix}高コントラスト・完全なキーボード対応 <strong><em>かつ</em></strong>スクリーンリーダーで説明可能でない限り、同等の情報を提供するテキスト説明、表形式データ、ダウンロード可能なシートなどを提供してください。</p>`,

	EMBED_GENERAL: '自動チェックでは埋め込みコンテンツの内部を検査できません。画像 alt、動画字幕、十分なテキストコントラスト、キーボード操作対応 https://webaim.org/techniques/keyboard/ を確認した上でこの警告を無視できます。</a>',

	EMBED_MISSING_TITLE: `<p>埋め込みフレームには、内容を説明するアクセシブルなタイトルが必要です。</p><p>${why.fix}固有の <code>title</code> または <code>aria-label</code> を追加してください。</p>`,

	EMBED_UNFOCUSABLE: `この属性はキーボードや支援技術にこの iframe を無視させます。リンク、ボタン、フォーム、スクロール領域がある場合はこの属性を削除してください。`,

	EMBED_VIDEO: `<p>動画には字幕が必要です。</p><p>自動字幕は正確さのために人の修正が必要です。</p><p>${why.fix}字幕を追加または修正し、この警告を無視してください。</p>`,

	HEADING_EMPTY: `<p>空の見出しはページ構造の理解を妨げます。</p><p>${why.fix}見出しにテキストを追加するか、空行を削除してください。</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>空の見出しはページ構造を混乱させます。</p><p>${why.fix}見出しでない場合は <strong {C}>見出し %(level)</strong> から <strong>段落</strong> に変更してください。見出しである場合は画像の意味を alt テキストに記述してください。</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}ページタイトルが見出しレベル1または2としてマークされていることを確認してください。 ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}正式なタイトル（論文名など）でない限り、見出しは短いほうが読みやすいです。</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}ページタイトルをレベル1の見出しとしてマークしてください。</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>この見出しは <strong>%(prevLevel)</strong> から <strong>%(level)</strong> へレベルが飛んでいます。スクリーンリーダーには「抜け落ち」があるように聞こえます。</p><p>${why.fix}階層を適切に修正してください。</p>${why.headings}`,

	HIDDEN_FOCUSABLE: 'このインタラクティブ要素は <code>aria-hidden="true"</code> ですが、キーボードフォーカスが当たります。スクリーンリーダーから隠したい場合は <code>tabindex="-1"</code> を追加してください。隠したくない場合は aria-hidden を削除してください。',

	IMAGE_ALT_TOO_LONG: `<p>スクリーンリーダーは alt を一続きの文として読み上げます。長すぎると聞き返しが困難になります。</p><p>この alt テキストの長さ： %(altLength) 文字<br><em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>ヒント：複雑な画像には <strong>可視のキャプション</strong> または詳しい説明が必要です。</p></div>`,

	IMAGE_DECORATIVE: `<p>この画像は alt="" によりスクリーンリーダーから隠されています。本当に意味を持たない装飾画像のみこうすべきです。</p><p>${why.fix}意味を持つ場合は alt を追加してください。</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'この画像は<strong>装飾</strong>としてマークされていますが、カルーセル／ギャラリー内のすべての画像は説明的な alt が必要です。',

	IMAGE_FIGURE_DECORATIVE: `<p>この画像は支援技術から無視されます。キャプションだけで画像の意味が伝わりますか？</p><p>${why.fix}キャプションだけで意味が十分に伝わらない場合は、画像の視覚的な意味を補足する代替テキストを追加してください。</p><div class="why"><p>ヒント：画像・代替テキスト・キャプションはセットで機能します：</p><ul><li>可視キャプションは文脈と解釈を提供します。</li><li>代替テキストは、画像を見られないユーザーに視覚情報を伝えます。</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}この画像の視覚的な意味を説明するように alt テキストを編集してください。</p><div class="why"><p>ヒント：画像・代替テキスト・キャプションは相互補完します：</p><ul><li>キャプションは文脈を説明します。</li><li>代替テキストは、キャプションが言及する内容を視覚情報として補います。</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: '<p><strong {B}>非表示のフィールドラベル：</strong> <strong {C}>%(TEXT)</strong></p><p>可視ラベルが存在するか、入力後も見えるままか、非可視ラベルと一致しているかを確認してください。</p><div class="why"><p>title と placeholder に依存するラベルは入力中に消えてしまうため、内容を確認しにくくなります。</p></div>',

	LABELS_INPUT_RESET: `<p>リセットボタンは誤って押されやすく、取り消し不可能なデータ消失を招く可能性があります。</p><p>${why.fix}1フィールドのみをクリアする単純な用途でない限り、削除または確認ダイアログの追加を検討してください。</p>`,

	LABELS_MISSING_IMAGE_INPUT: '画像ボタンに alt がありません。<em>検索</em> や <em>送信</em> など、機能を説明する alt を追加してください。',

	LABELS_MISSING_LABEL: 'この入力フィールドには関連付けられたラベルがありません。<code>id</code> を追加し、<code>for</code> 属性を持つラベルを結びつけてください。',

	LABELS_NO_FOR_ATTRIBUTE: 'この入力フィールドにはラベルがありません。ラベルにこのフィールドの <code>id</code> と一致する <code>for</code> 属性を追加してください。<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>プレースホルダーは入力を始めると消えてしまい、コントラスト不足や本文との見分けにくさを招きがちです。</p><p>${why.fix}重要な情報（ラベル、説明、書式指示）は常に可視状態になるようにしてください。</p>`,

	LABEL_IN_NAME: `<p>この要素の可視ラベルがアクセシブルネームと一致していません。これはスクリーンリーダーや音声操作ユーザーに混乱を招きます。</p><p>${why.check}可視ラベルが非可視ラベルの内容で始まり、余計な追加情報を含まないようにしてください。</p><p><strong>非表示ラベル：</strong> "%(TEXT)"</p>`,

	LINK_ALT_FILE_EXT: `<p>この画像の alt に "%(alt)" が含まれていますが、これはファイル名であり、リンク先の意味を説明していません。</p><p>${why.fix}alt にはリンク先を説明するテキストを設定してください。</p><div class="why"><p>代替テキストは画像の意味を伝えるものです。画像がリンクの場合、その意味とはリンクの目的地です：</p><ul><li>「テキストページ」→ 画像を説明しているだけ</li><li>「IMG_1234.jpg」→ 単なるファイル名</li><li>「<strong><em>申込フォーム（.doc）</em></strong>」→ リンク先を説明している</li></ul></p></div>`,

	LINK_ALT_MAYBE_BAD: `<p>この画像の alt はプレースホルダーです：「<strong>%(alt)</strong>」</p><p>${why.fix}リンクの目的に応じた alt を設定してください。</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>このリンク画像の alt テキスト "%(ALT_TEXT)" は発音できない文字のみで構成されています。</p><p>${why.fix}リンクの目的を説明する alt を設定してください。</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `「こちらをクリック」は冗長で、リンクの意味を表しません。`,

	LINK_DOI: `<p>${why.fix}DOI をリンクにするのではなく、記事タイトルをリンクにしてください。</p><div class="why"><p>https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20linksAPA ガイドライン</a>は「記述的なリンクテキスト」を推奨しています。</p></div>`,

	LINK_EMPTY: `<p>${why.fix}リンクの目的を説明するテキストを追加するか、誤って作成された場合は削除してください。</p><div class="why"><p>空のリンクはスクリーンリーダーが扱いにくく、URL を文字単位で読み上げてしまう場合があります。</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p><code>aria-labelledby</code> の参照先に一致する ID がありません。</p><p>${why.fix}正しい ID を指定するか、この属性を削除してください。</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}目的を説明するテキストを追加するか、誤って作成されたリンクを削除してください。</p><div class="why"><p>空リンクはスクリーンリーダーが適切に読み上げられません。</p></div>`,

	LINK_FILE_EXT: `<p>このリンクは PDF やファイル（MP3、ZIP、Word など）に遷移しますが、その旨が明示されていません。</p><p>${why.fix}テキストまたはアイコンで https://itmaybejj.github.io/linkpurpose/ファイル形式を明示してください。</a></p><p class="why">大きいファイルの場合はサイズ（例：「PDF 3MB」）も明記すると親切です。</p>`,

	LINK_IDENTICAL_NAME: `<p>異なるリンク先を持つ複数のリンクが同じ名前「<strong>%(TEXT)</strong>」を使用しています。</p><p>${why.fix}各リンク先に応じてユニークな説明的テキストに書き換えてください。</p>${why.links}`,

	LINK_IMAGE_ALT: `この alt がリンクの目的を説明しているか確認してください：</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>この alt テキストがリンク目的の説明として役立っており、冗長でないことを確認してください：</p><p><strong class="badge">Alt</strong> "<em><strong>%(alt)</strong></em>"</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p>https://webaim.org/techniques/hypertext/link_text#alt_linkリンク画像の alt はリンク目的を説明するべきです</a>。長すぎる alt は画像説明になりがちです。</p>この alt の長さは %(altLength) 文字です： <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>リンク内の画像の alt は https://webaim.org/techniques/hypertext/link_text#alt_linkリンク名として読み上げられます</a>.</p><p>${why.fix}リンクの目的を説明する alt を設定してください。</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'この画像は装飾扱いですが、リンクのラベルは周囲のテキストで提供されています。',

	LINK_NEW_TAB: `<p>${why.fix}同じタブで開くようにするか、新しいタブで開くことを https://itmaybejj.github.io/linkpurpose/事前に知らせてください。</a></p><div class="why"><p>「戻る」操作が期待通りに働かないため、新規タブの強制は混乱を招くことがあります。</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>このリンク画像の alt はプレースホルダーです：「<strong>%(alt)</strong>」</p><p>${why.fix}リンク先を説明する alt を設定してください。</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>このリンクには目的を示さない語句が含まれています：<br><strong>%(text)</strong></p><p>${why.fix}目的を簡潔に説明するリンクテキストに書き換えてください。</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>ARIA では有意義な名前が提供されていますが、可視テキストは一般的すぎます：「<strong {C}>%(ERROR)</strong>」</p><p>${why.fix}可視テキストも意味のある内容にし、ARIA 名称と一致させてください。</p>${why.links}`,

	LINK_SUS_ALT: `<p>代替テキスト "%(alt)" は、画像そのものを説明している可能性があります。</p><strong class="badge">Alt テキスト</strong> "%(ALT_TEXT)"    <p>修正：リンク先またはリンクの目的を説明してください。<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}スクリーンリーダーが誤読する可能性があるため、特別な意味がない記号をリンクテキストの一部として使用しないでください。削除を推奨： <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}URL ではなく、リンク先の内容を示すテキストを使用してください。</p><div class="why"><p>ユーザーはリンクを名前で探す傾向が強く、URL は見つけづらく読みづらいものです。</p></div>`,

	META_LANG: `<p>${why.fix}HTML 要素に https://www.w3.org/International/questions/qa-html-language-declarationslang 属性</a>を追加してください。</p><div class="why"><p>スクリーンリーダーは言語指定によって正しい発音ルールを使用します。</p></div>`,

	META_MAX: `<p>この meta タグはユーザーの拡大操作を制限しています。</p><p>${why.fix}制限を解除または緩和し、フルズームを許可してください。</p>`,

	META_REFRESH: `<p>meta による自動リフレッシュは、ユーザーの操作を中断したり、入力中のデータを失わせたりします。</p><p>${why.fix}AJAX を使って部分更新するか、リフレッシュ前にユーザーに確認してください。</p>`,

	META_SCALABLE: `<p>この meta タグはページの拡大を禁止しています。</p><p>${why.fix}スケーリングを許可するよう設定を変更または削除してください。</p>`,

	META_TITLE: `<p>${why.fix}HTML の <code><head></code> 内に <code><title></code> を追加してください。</p><div class="why"><p>短く一意な https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/titleページタイトル</a> は非常に重要です：</p><ul><li>検索結果</li><li>ブラウザタブ</li><li>スクリーンリーダーによるページ切替時の読み上げ</li></ul><p>タイトルがない場合、URL しか表示されません。</p></div>`,

	MISSING_ALT: `<p>スクリーンリーダーは alt のない画像の URL を 1 文字ずつ読み上げます。</p><p>${why.fix}装飾画像には alt=""、意味を持つ画像には説明的な alt を設定してください。</p>${why.images}`,

	MISSING_ALT_LINK: `<p>リンク画像に alt がない場合、スクリーンリーダーは画像の URL を読み上げ、特に混乱を招きます。</p><p>${why.fix}リンク目的を説明する alt を設定してください。</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>この画像はテキスト付きリンクの一部です。テキストがリンク目的を十分説明している場合は alt="" を使い、それ以外の場合は目的を説明する alt を設定してください。</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>このリンクは開発環境を指している可能性があります：<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}相対パス（/folder）または公開 URL に変更してください。</p>`,

	QA_BLOCKQUOTE: `<p>blockquote はスクリーンリーダーに「引用」として読み上げられます。短い引用は多くの場合、見出しであるべき内容です。</p><p>${why.fix}見出しである場合は見出しスタイルを使用してください。</p>${why.headings}`,

	QA_DOCUMENT: `<p>リンクされている文書も Web コンテンツであり、アクセシブルである必要があります。見出し、表見出し、画像の alt を確認してください。</p><ul class="why"><li>Google ドキュメントのアクセシビリティ向上： https://support.google.com/docs/answer/6199477?hl=ja</a></li><li>Microsoft Office 文書のアクセシビリティ向上： https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155</a></li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}この太字テキストが新しいトピックの導入なら、視覚的強調ではなく見出しスタイルを使用してください。</p><div class="why"><p>見出しはスクリーンリーダーのナビゲーション構造となります。</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}「%(text)」がリスト項目であるべきなら、リスト形式にしてください。</p><div class="why"><p>リストは視覚面でも支援技術面でも構造を付与します：</p><ol><li>インデントにより読みやすくなります。</li><li>スクリーンリーダーは「○番目の項目」と読み上げます。</li></ol><p>ただ数字で始まるだけではリストになりません。</p></div>`,

	QA_IN_PAGE_LINK: `<p>このページ内リンクのターゲットが存在しません。</p><div class="why"><p>開発者向け：もし JavaScript で処理されているなら、キーボードでも動作することを確認してください。</p></div>`,

	QA_JUSTIFY: `<p>両端揃えは不規則な空白を生み、多くのユーザーにとって読みづらいものになります。</p><p>${why.fix}左揃えを使用してください。</p>`,

	QA_NESTED_COMPONENTS: 'アコーディオン内にさらにアコーディオン、タブ内にさらにタブなど、入れ子のインタラクティブ UI は避けてください。',

	QA_PDF: `<p>${why.fix}以下のいずれかを行い、この警告を無視できます：</p><ul><li>PDF の代わりに Web ページへリンクする</li><li>PDF とは別に HTML または編集可能な文書を提供する</li><li>最低限、PDF が適切にタグ付けされ、読み上げ順が正しく、見出しや alt が設定されていることを確認する</li></ul><div class="why"><p>支援技術ユーザーやモバイルユーザーは、PDF よりも通常 Web ページを好みます。</p></div>`,

	QA_SMALL_TEXT: '文字が小さすぎると読みづらくなります。標準より小さな文字サイズは避けてください。',

	QA_STRONG_ITALICS: `<p>${why.fix}太字や斜体は、短い強調用途に限って使用してください。</p><div class="why"><p>注：引用の場合は blockquote を使用してください。</p></div>`,

	QA_SUBSCRIPT: `上付き文字・下付き文字は文字サイズを小さくし、読みにくくなります。序数（4<sup>th</sup>）、化学式（H<sub>2</sub>O）、脚注記号でのみ使用してください。`,

	QA_UNDERLINE: `<p>Web では、下線は通常「リンク」を意味します。ユーザーはクリックできると思ってしまいます。</p><p>${why.fix}<strong>太字</strong>または<em>斜体</em>で強調し、セクションの開始には見出しを使用してください。</p><div class="why"><p>スクリーンリーダーは下線のような視覚スタイルを読み上げません。見出しのみが構造を示します。</p></div>`,

	QA_UPPERCASE: `<p>全文大文字のテキストは読みづらく、「怒鳴っている」ように感じることがあります。</p><p>${why.fix}強調には太字を使い、大文字の多用を避けてください。</p><div class="why"><p>スクリーンリーダーは太字を知らせないため、新しい主題には見出しを使うべきです。</p></div>`,

	SUS_ALT: `<p>この alt テキストには不必要な語句 "%(alt)" が含まれている可能性があります：</p><p><strong class="badge">Alt テキスト</strong> "%(ALT_TEXT)"</p><p>修正：画像の意味を簡潔に表現してください。</p><div class="why"><p>ヒント：スクリーンリーダーはすでに「画像」であることを知らせるため、「〜の画像」は通常不要です。</p></div>`,

	TABINDEX_ATTR: `<p>${why.fix}正の tabindex 値は使用しないでください。HTML の要素順序を見た目・読み順と一致させるべきです。</p><div class="why"><p>標準では視覚順・タブ順・読み順は一致します。</p><p>正の tabindex はタブ順だけを変え、視覚順を変えないため混乱を招きます。</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}すべての表ヘッダーセルにテキストを含めてください。</p><div class="why"><p>ヘッダーはスクリーンリーダーがセル内容を理解するための手がかりになります。</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}表設定で、ヘッダーが最初の行・最初の列、またはその両方にあることを指定してください。</p><div class="why"> <p>スクリーンリーダーはセルに移動するたびに対応する行または列のヘッダーを読み上げます。</p><p>レイアウト目的のみの表は使用すべきではありません。</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}この h2/h3 見出しを削除し、表のヘッダーを使用してください。複数レベルが必要な場合は表を分割してください。</p><div class="why"> <p>表ヘッダーは「行」または「列」に対して作用しますが、内容見出しはその後に続く全セルに適用されます。</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2"><strong>表ヘッダー</strong> はセル2で B セルだけを指します。<br><br><strong>内容見出し</strong> はセル2で 3・A・B・C および説明文すべてに作用します。</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,

};

export const interfaceStrings = {
	ALERT_CLOSE: '閉じる',
	ALT: '代替テキスト: ',
	DECORATIVE: '装飾としてマークされています',
	DISMISS: '非表示にする',
	DISMISS_ALL: 'このページで非表示',
	edit_page: 'ページを編集',
	edit_layout: 'レイアウトを編集',
	edit_term: '用語を編集',
	edit_tags: 'ユーザーを編集',
	IMAGES: '代替テキスト',
	MAIN_TOGGLE_LABEL: 'アクセシビリティツールの切り替え',
	MISSING: '(不足しています!)',
	NOT_VISIBLE: '注意: このコンテンツは表示されていない可能性があります。ハイライトされた枠内を確認してください。',
	NO_IMAGES: '画像が見つかりません。',
	OUTLINE: '見出し構造',
	PANEL_DISMISS_BUTTON: `%(dismissCount) 件の非表示メッセージを表示`,
	PANEL_HEADING: 'ビューアーを表示',
	SKIP_TO_ISSUE: '問題へ移動',
	WARNING: '手動チェックが必要',
	WARNINGS: '手動チェックが必要',
	buttonFirstContent: '最初のメッセージへ移動',
	buttonHideHiddenAlert: '非表示メッセージを隠す',
	buttonHideHiddenAlerts: `%(count) 件の非表示メッセージを隠す`,
	buttonShowHiddenAlert: '非表示メッセージを表示',
	buttonToolsActive: 'ビューアーを隠す',
	dismissActions: `類似のメッセージ`,
	dismissHideTitle: 'このユーザーだけに対してメッセージを非表示にします',
	dismissOkAllButton: 'このページで「OK」にする',
	dismissOkButtonContent: 'OK にする',
	dismissOkTitle: 'すべての編集者に対してこのメッセージを隠します',
	dismissOnSite: 'サイト全体で「OK」にする',
	dismissalsHeader: 'この問題を修正しない予定ですか？',
	errorOutlinePrefixHeadingEmpty: '(空の見出し)',
	errorOutlinePrefixHeadingIsLong: '(長すぎるためフラグ)',
	errorOutlinePrefixSkippedLevel: '(レベル抜けのためフラグ)',
	issueContent: 'コンテンツの問題',
	issueDeveloper: '開発上の問題',
	issueTemplate: 'テンプレートの問題',
	main_toggle_hide: 'アクセシビリティツールを隠す',
	main_toggle_hide_alerts: 'アクセシビリティ警告を隠す',
	main_toggle_show: 'アクセシビリティツールを表示',
	main_toggle_show_alerts: 'アクセシビリティ警告を表示',
	panelCheckAltText: '<p class="ed11y-small">すべての画像が文脈上の意味を伝えているか、テキストを含む画像がないかを確認してください。</p>',
	panelCheckOutline: '<p class="ed11y-small">これは見出しの階層を表示します。ページの視覚的構造と一致しているか確認してください。</p>',
	PANEL_HEADING_MISSING_ONE: 'レベル1の見出しがありません。',
	PANEL_NO_HEADINGS: '見出しが見つかりません。',
	reportsLink: 'サイトレポートを開く',
	toggleDisabled: 'Editoria11y がチェック可能なコンテンツがありません。',
	transferFocus: 'このコンテンツを編集',
	unDismissHideButton: 'この非表示メッセージを元に戻す',
	unDismissNotePermissions: 'このチェックは管理者によって非表示にされています',
	unDismissOKButton: '「OK」とマークされたメッセージを元に戻す',
};

const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips),
  testNames: testNames,
};

export default newStrings;
