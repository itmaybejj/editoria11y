import strings from '../sa11y-lang/ja.js';

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
	CONTRAST_WARNING_GRAPHIC: 'このグラフィック／アイコンは十分なコントラストがありますか？',
	DUPLICATE_ID: '重複した ID 属性があります',
	DUPLICATE_TITLE: 'このリンクのツールチップがリンク本文と同じ内容です',
	EMBED_AUDIO: 'この音声コンテンツには文字起こしがありますか？',
	EMBED_DATA_VIZ: 'このデータ可視化はアクセシブルですか？',
	EMBED_GENERAL: '埋め込み iframe は手動チェックが必要です',
	EMBED_MISSING_TITLE: 'iframe に "title" 属性がありません',
	EMBED_UNFOCUSABLE: 'tabindex="‑1" のフレームはキーボードから操作できません。',
	EMBED_VIDEO: 'この動画には正確な字幕がありますか？',
	HEADING_EMPTY: 'この見出しにはテキストがありません',
	HEADING_EMPTY_WITH_IMAGE: 'この画像は見出しとして使用されているため、代替テキストが必要です',
	HEADING_FIRST: 'ページ内の最初の見出しが下位レベルの見出しになっています',
	HEADING_LONG: 'この見出しは短くできますか？',
	HEADING_MISSING_ONE: 'このページにはレベル 1 の見出しがありません',
	HEADING_SKIPPED_LEVEL: 'この見出しは不適切なレベルでマークされています',
	HIDDEN_FOCUSABLE: 'この要素はスクリーンリーダーで適切に説明できません',
	IMAGE_ALT_TOO_LONG: 'この代替テキストは短くできますか？',
	IMAGE_DECORATIVE: 'この画像は本当に装飾目的のみですか？',
	IMAGE_DECORATIVE_CAROUSEL: 'カルーセル／ギャラリー内の画像が装飾扱いになっています',
	IMAGE_FIGURE_DECORATIVE: '手動チェック：キャプション付きの画像に alt テキストがありません',
	IMAGE_FIGURE_DUPLICATE_ALT: 'alt テキストはキャプションと同じ内容にすべきではありません',
	LABELS_ARIA_LABEL_INPUT: 'このフィールドには可視ラベルがありますか？',
	LABELS_PLACEHOLDER: '手動チェック：プレースホルダーのテキスト',
	LABELS_INPUT_RESET: 'このリセットボタンは必要ですか？',
	LABEL_IN_NAME: '可視ラベルが非表示ラベルと一致していません',
	LINK_ALT_FILE_EXT: 'リンクの alt テキストが URL になっています',
	LINK_ALT_MAYBE_BAD: 'リンク画像の alt テキストがスクリーンリーダーで読み上げられません',
	LINK_ALT_UNPRONOUNCEABLE: 'リンク画像には発音可能な代替テキストが必要です',
	LINK_CLICK_HERE: '手動チェック：リンクに「クリックしてください」が含まれています',
	LINK_DOI: 'DOI 番号ではなく記事タイトルをリンクしてください',
	LINK_EMPTY: 'このリンクにはテキストがありません',
	LINK_EMPTY_LABELLEDBY: 'このリンクの aria‑labelledby が無効です',
	LINK_EMPTY_NO_LABEL: 'このリンクにはラベルが必要です',
	LINK_FILE_EXT: '警告なしにファイルへリンクしています',
	LINK_IDENTICAL_NAME: 'このリンクは行き先を一意に説明していますか？',
	LINK_IMAGE_ALT: '手動チェック：alt テキスト付きリンク画像',
	LINK_IMAGE_ALT_AND_TEXT: 'この alt テキストはリンク文脈において意味がありますか？',
	LINK_IMAGE_LONG_ALT: 'このリンク画像の alt テキストを短縮できますか？',
	LINK_IMAGE_NO_ALT_TEXT: 'このリンク画像には代替テキストが必要です',
	LINK_IMAGE_TEXT: '手動チェック：リンク内の画像が装飾扱いになっています。',
	LINK_NEW_TAB: 'このリンクは警告なしに新しいタブを開きますか？',
	LINK_PLACEHOLDER_ALT: 'このリンク画像には意味のある代替テキストが必要です',
	LINK_STOPWORD: 'このリンクは目的地を説明していますか？',
	LINK_STOPWORD_ARIA: 'リンクの意味がスクリーンリーダー利用者にしか伝わりません',
	LINK_SUS_ALT: 'この alt テキストは画像を説明していますか？リンクを説明していますか？',
	LINK_SYMBOLS: '手動チェック：このリンク内の記号／絵文字に意味はありますか？',
	LINK_URL: 'リンクテキストが URL になっています',
	META_LANG: 'ページ言語の meta タグがありません',
	META_MAX: 'meta タグが拡大率を制限しています',
	META_REFRESH: 'meta タグがページを自動更新します',
	META_SCALABLE: 'meta タグが拡大を無効にしています',
	META_TITLE: 'ページタイトルの meta タグがありません',
	MISSING_ALT: '無効な HTML：画像に alt 属性がありません',
	MISSING_ALT_LINK: '無効な HTML：リンク画像に alt 属性がありません',
	MISSING_ALT_LINK_HAS_TEXT: '無効な HTML：リンク内の画像に alt 属性がありません',
	QA_BAD_LINK: '手動チェック：リンク先が無効な可能性があります',
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
	QA_SUBSCRIPT: '上付き／下付きは装飾として使用しないでください',
	QA_UNDERLINE: '下線はリンクにのみ使用してください',
	QA_UPPERCASE: 'この全文大文字表記は必要ですか？',
	SUS_ALT: 'この alt テキストに不要な語句が含まれていますか？',
	TABINDEX_ATTR: 'tabindex 属性が読み順に影響しています',
	TABLES_EMPTY_HEADING: 'この表見出しセルにはテキストが必要です',
	TABLES_MISSING_HEADINGS: 'この表には行見出し／列見出しが不足しています',
	TABLES_SEMANTIC_HEADING: '内容見出しを表内で使用すべきではありません',
	UNCONTAINED_LI: '無効な HTML リストです',
};

const why = {
	fix: `<strong class="badge">修正方法</strong>`,
	check: `<strong class="badge">手動チェック</strong>`,

	buttons: `<div class="why"><p>注意：ボタンのアクセシブルネームは、そのボタンが何をするのかを明確に示す必要があります。クリック後に状態が変わるボタンは、名前も変わるべきです：</p><ul>
<li>ラベルが変化する例：<br>「再生／一時停止」、「詳細を表示／非表示」</li>
<li>ARIA 状態属性が変化する例：<br>「再生／再生（押下）」、「詳細（折りたたみ）／詳細（展開）」</li>
</ul>
<p>ただし、ラベルと状態の両方を同時に変えてはいけません。「再生」を「一時停止（押下）」にすると、プレーヤーが再生中ではなく一時停止中であると解釈されます！</p></div>`,

	headings: `<div class="why"><p>ヒント：見出しは内容を階層構造に整理します。スクリーンリーダー利用者は、この構造を頼りにページを理解し、移動します：</p>
<ul><li>見出しレベル 1：ページタイトル
<ul><li>見出しレベル 2：主要なセクション
<ul><li>見出しレベル 3：サブセクション</li></ul></li></ul></li></ul></div>`,

	images: `<div class="why"><p>ヒント：代替テキストは「何が写っているか」ではなく、その画像が文脈で<em>何を意味するか</em>を書きます。たとえば、子どもがボールを蹴る写真は文脈により次のように解釈できます：</p>
<ul><li>激しい雨の中でもプレーを続けている。</li>
<li>新しいユニフォームにかっこいいドラゴンのロゴが付いている。</li>
<li>左サイドから決勝ゴールを決めた！</li></ul></div>`,

	links: `<div class="why"><p>多くのユーザーはページをスクロールしながらリンク名で探します。したがって、良いリンクテキストは「意味がある・固有・簡潔」である必要があります：</p>
<ul>
<li>理想的な例：「有意義なリンクについて読む： https://webaim.org/techniques/hypertext/link_text」</li>
<li>固有でない例：「詳しくは https://webaim.org/techniques/hypertext/link_textここ</a> をクリック」</li>
<li>簡潔でない例：「https://webaim.org/techniques/hypertext/link_textここをクリックして有意義なリンクについてさらに学ぶ</a>」</li>
</ul></div>`,

	imageLinks: `<div class="why"><p>代替テキストの目的は、画像の<em>意味</em>を伝えることです。画像がリンクとして使われている場合、その意味は「リンク先」です：</p>
<ul>
<li>「<em>虫眼鏡</em>」→ 画像の説明であり、リンクの説明ではありません。</li>
<li>「<em>検索アイコン</em>」→ 画像か動作かが曖昧です。</li>
<li>「<em>検索</em>」→ リンクの目的（行き先）を正しく説明します。</li>
</ul></div>`,
};

export const tips = {
	ALT_FILE_EXT: `<p>スクリーンリーダーはこの URL を読み上げますが、多くの場合 1 文字ずつ読み上げます。これは実際の画像を見る場合の意味を十分に伝えません。</p><p>${why.fix}意味のない装飾でスクリーンリーダーに無視させたい場合は空の alt（alt=""）を設定し、意味がある場合は説明的な代替テキストを追加してください。</p>${why.images}`,

	ALT_MAYBE_BAD: `<p>この画像に提供された説明：<strong>"%(alt)"</strong></p><p>${why.fix}この画像がこの文脈で何を意味するか、簡潔に説明する代替テキストを設定してください。</p>${why.images}`,

	ALT_PLACEHOLDER: `<p>この画像に提供された説明：<strong>"%(alt)"</strong></p><p>${why.fix}この画像がこの文脈で何を意味するか、簡潔に説明する代替テキストを設定してください。</p>${why.images}`,

	ALT_UNPRONOUNCEABLE: `<p>この alt テキスト「%(alt)」は記号や空白のみで構成され、発音できません。スクリーンリーダーは「画像：____」という不自然な読み上げになります。</p><p>${why.fix}意味のある alt を追加するか、装飾目的で無視させたい場合は完全に空の alt（alt=""）を設定してください。</p>${why.images}`,

	BTN_EMPTY: `<p>${why.fix}可視ラベル、アイコンの alt、または <code>title</code> 属性など、適切な方法でボタンの名称を提供してください。</p>`,

	BTN_EMPTY_LABELLEDBY: `<p>このボタンの <code>aria-labelledby</code> 属性は空、または存在しない <code>ID</code> を参照しています。</p><p>${why.fix}有効な ID を参照するよう修正するか、この属性を削除して別の方法で名称を提供してください。</p>`,

	BTN_TIP: `${why.buttons}`,

	CONTRAST_WARNING: '背景画像またはグラデーションのため、この検査ではテキスト背後の色を確実に判定できません。下のカラーピッカーで手動確認してください。',

	DUPLICATE_ID: `<p>ID はラベル付けやリンク先のターゲットとして使用されるため、ページ内で一意でなければなりません。</p><p>${why.fix}この ID を変更してください：<strong>#%(id)</strong></p><div class="why"><p>多くの CMS では「name」または「id」フィールドに由来します。HTML では <code><a id="MY-ID"></a></code> のように記述します。</p></div>`,

	DUPLICATE_TITLE: `<p>${why.fix}このリンクの <code>title</code> 属性を削除してください。</p><div class="why"><p>注意：<code>title</code> のツールチップはマウス操作でしか表示されず、モバイルやキーボードでは見えません。重要情報は入れないでください。</p></div>`,

	EMBED_AUDIO: `<p>音声に話者の発話が含まれる場合、このページ内またはリンク先に https://www.w3.org/WAI/media/av/transcribing/文字起こし</a>を提供してください。</p><p>自動生成の字幕や原稿は、人の確認（話者・重要な音の明示）が必要です。</p>`,

	EMBED_DATA_VIZ: `<p>埋め込みのデータ可視化は、支援技術での操作が困難であったり、弱視や色覚障害の方には理解しづらかったり、モバイルで横スクロールが必要になりがちです。</p><p>${why.fix}高コントラストで、完全にキーボード操作が可能で、<strong><em>なおかつ</em></strong>スクリーンリーダーで説明できる構造でない限り、同等の情報を提供するテキスト説明やデータ表（またはダウンロードシート）を用意してから、この警告を無視してください。</p>`,

	EMBED_GENERAL: '自動チェックでは埋め込み要素内部を検査できません。画像の alt、動画の字幕、十分なテキストコントラスト、そしてリンクやボタンが https://webaim.org/techniques/keyboard/キーボード操作</a>で利用できるかを確認してから、この警告を無視してください。',

	EMBED_MISSING_TITLE: `<p>埋め込みフレームには内容を説明するアクセシブルな名称が必要です。</p><p>${why.fix}固有の <code>title</code> または <code>aria-label</code> を追加してください。</p>`,

	EMBED_UNFOCUSABLE: `この属性は、キーボードおよび支援技術にこの要素をスキップさせます。iframe 内にリンク・ボタン・フォーム、またはスクロール領域がある場合は、この属性を削除してください。`,

	EMBED_VIDEO: `<p>動画には字幕が必要です。</p><p>自動字幕は正確さのために人の修正が必要です。</p><p>${why.fix}字幕を追加または修正したうえで、この警告を無視してください。</p>`,

	HEADING_EMPTY: `<p>空の見出しはページ構造の理解を妨げます。</p><p>${why.fix}見出しにテキストを追加するか、空行を削除してください。</p>${why.headings}`,

	HEADING_EMPTY_WITH_IMAGE: `<p>空の見出しはページ構造を混乱させます。</p><p>${why.fix}見出しでない場合は書式を <strong {C}>見出し %(level)</strong> から <strong>段落</strong> に変更してください。見出しである場合は画像の意味を alt に記述してください。</p>${why.headings}`,

	HEADING_FIRST: `${why.fix}ページタイトルが見出しレベル 1 または 2 としてマークされていることを確認してください。 ${why.headings}`,

	HEADING_LONG: `<p>${why.fix}正式なタイトル（論文名など）でない限り、見出しは短くして読みやすくしてください。</p>${why.headings}`,

	HEADING_MISSING_ONE: `<p>${why.fix}ページタイトルをレベル 1 の見出しとしてマークしてください。</p>${why.headings}`,

	HEADING_SKIPPED_LEVEL: `<p>この見出しは <strong>%(prevLevel)</strong> から <strong>%(level)</strong> へレベルが飛んでいます。スクリーンリーダーには抜け落ちがあるように伝わります。</p><p>${why.fix}適切な階層になるようにレベルを調整してください。</p>${why.headings}`,

	HIDDEN_FOCUSABLE: `このインタラクティブ要素は <code>aria-hidden="true"</code> が設定されていますが、キーボードでフォーカスできます。スクリーンリーダーから隠したい場合は <code>tabindex="-1"</code> を追加してください。隠さない場合は <code>aria-hidden</code> を削除してください。`,

	IMAGE_ALT_TOO_LONG: `<p>スクリーンリーダーは alt を一続きの文として読み上げます。長すぎると聞き返しが困難です。</p><p>この alt テキストの長さは %(altLength) 文字です： <em class="ed11y-small">%(ALT_TEXT)</em></p><div class="why"><p>ヒント：複雑な画像は、<strong>可視のキャプション</strong>や詳しい説明が必要になることがあります。alt からそれへ誘導して構いません：</p><ul><li>「金曜ダンスのポスター。詳細はキャプション参照。」</li><li>「今年 10% 減を示すグラフ。詳細は表参照。」</li></ul></div>`,

	IMAGE_DECORATIVE: `<p>この画像は alt="" によりスクリーンリーダーから隠されています。本当に意味を持たない装飾画像のみ、この方法を使ってください。</p><p>${why.fix}意味を持つ場合は alt を追加してください。</p>${why.images}`,

	IMAGE_DECORATIVE_CAROUSEL: 'この画像は<strong>装飾</strong>としてマークされていますが、カルーセル／ギャラリー内の画像はすべて説明的な alt が必要です。',

	IMAGE_FIGURE_DECORATIVE: `<p>この画像は支援技術から無視されます。キャプションだけで画像の意味が伝わりますか？</p><p>${why.fix}十分でない場合は、キャプションで触れていない視覚的意味を alt で補ってください。</p><div class="why"><p>ヒント：画像・代替テキスト・キャプションは相互補完します：</p><ul><li>キャプションは文脈や解釈を提供します。</li><li>代替テキストは、画像を見られない方に視覚情報を伝えます。</li></ul></div>`,

	IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}この画像の視覚的な意味を説明するように alt を編集してください（キャプションの単純な繰り返しは避けます）。</p><div class="why"><p>ヒント：画像・代替テキスト・キャプションは相互補完します：</p><ul><li>キャプションは文脈や解釈を提供します。</li><li>代替テキストは、画像を見られない方に視覚情報を伝えます。</li></ul></div>`,

	LABELS_ARIA_LABEL_INPUT: `<p><strong {B}>非表示のフィールドラベル：</strong> <strong {C}>%(TEXT)</strong></p><p>可視ラベルが存在するか、入力後も見えるままか、非可視ラベルと一致しているかを確認してください。</p><div class="why"><p><em>title</em> や <em>placeholder</em> に依存するラベルは入力中に消え、確認が難しくなりがちです。</p></div>`,

	LABELS_INPUT_RESET: `<p>リセットボタンは誤操作されやすく、取り消しできないデータ消失につながります。</p><p>${why.fix}1 フィールドのみをクリアする用途でない限り、削除するか実行前の確認を求めるようにしてください。</p>`,

	LABELS_MISSING_IMAGE_INPUT: '画像ボタンに alt がありません。<em>検索</em> や <em>送信</em> など、機能を説明する alt を追加してください。',

	LABELS_MISSING_LABEL: 'この入力フィールドには関連付けられたラベルがありません。<code>id</code> を追加し、<code>for</code> を持つラベルと結び付けてください。',

	LABELS_NO_FOR_ATTRIBUTE: 'この入力フィールドにはラベルがありません。ラベルにこのフィールドの <code>id</code> と一致する <code>for</code> を追加してください。<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',

	LABELS_PLACEHOLDER: `<p>プレースホルダーは入力を始めると消え、コントラスト不足や本文との見分けにくさを招く場合があります。</p><p>${why.fix}重要な情報（ラベル、ヘルプ、書式指示）は、フィールドに入力があっても見えるようにしてください。</p>`,

	LABEL_IN_NAME: `<p>この要素の可視ラベルがアクセシブルネームと一致していません。これはスクリーンリーダーや音声操作のユーザーに混乱を招きます。</p><p>${why.check}可視ラベルが非可視ラベルの内容で始まり、意味の追加がないことを確認してください。</p><p><strong>非表示ラベル：</strong>「%(TEXT)」</p>`,

	LINK_ALT_FILE_EXT: `<p>この画像の alt に「%(alt)」が含まれていますが、これは多くの場合ファイル名で、リンク先の意味を説明していません。</p><p>${why.fix}alt にはリンク先の名称（目的）を設定してください。</p><div class="why"><p>代替テキストは画像の意味を伝えます。画像がリンクで使われている場合、意味とはリンク先です：</p><ul><li>「テキストのあるページ」→ 画像の説明です。</li><li>「IMG_1234.jpg」→ ファイル名に過ぎません。</li><li>「<strong><em>申込フォーム（doc）</em></strong>」→ 適切なリンク先の説明です。</li></ul></div>`,

	LINK_ALT_MAYBE_BAD: `<p>この画像の alt はプレースホルダーです：「<strong>%(alt)</strong>」</p><p>${why.fix}リンクの目的に応じた alt にしてください。</p>${why.imageLinks}`,

	LINK_ALT_UNPRONOUNCEABLE: `<p>このリンク画像の alt「%(ALT_TEXT)」は発音できない文字や空白のみです。リンクの説明として機能しません。</p><p>${why.fix}リンクの目的（行き先・機能）を説明する alt にしてください。</p>${why.imageLinks}`,

	LINK_CLICK_HERE: `「クリックしてください」などの表現は冗長で、リンクの意味を示しません。`,

	LINK_DOI: `<p>${why.fix}DOI をリンクにせず、記事タイトルをリンクにしてください（DOI はプレーンテキストで示します）。</p><div class="why"><p>記述的なリンクは、リンク名だけで一覧を走査する利用者に分かりやすく、目的の情報に到達しやすくします。</p><p>スクリーンリーダーも、数字列ではなく意味のあるリンク名を案内できます。</p></div>`,

	LINK_EMPTY: `<p>${why.fix}リンクの目的を説明するテキストを追加するか、誤って作成された場合（たとえば空白にリンク）は削除してください。</p><div class="why"><p>空のリンクはスクリーンリーダーで沈黙になったり、URL を文字ごとに読み上げたりします。</p><p>空白に付いたリンクは削除しにくい場合があり、前後の語を打ち直す必要があることがあります。</p></div>`,

	LINK_EMPTY_LABELLEDBY: `<p>この <code>aria-labelledby</code> は、ページ内の有効な <code>ID</code> を参照していません。</p><p>${why.fix}有効な ID を指定するか、この属性を削除してください。</p>`,

	LINK_EMPTY_NO_LABEL: `<p>${why.fix}目的を説明するテキストを追加するか、誤って作成されたリンクは削除してください。</p><div class="why"><p>空のリンクは適切に読み上げできません。</p><p>削除のために周囲のテキストを書き直す必要がある場合があります。</p></div>`,

	LINK_FILE_EXT: `<p>このリンクは PDF／MP3／ZIP／Word などのファイルに遷移しますが、その旨の表示がありません。</p><p>${why.fix}リンクテキスト内で https://itmaybejj.github.io/linkpurpose/ファイル形式を明示</a>してください（テキストやアイコンなど）。</p><p class="why">大きいファイルはサイズも明示すると親切です（例：「年次報告書（PDF、3 MB）」）。</p>`,

	LINK_IDENTICAL_NAME: `<p>異なるリンク先を持つ複数のリンクが同じテキスト「<strong>%(TEXT)</strong>」を使用しています。</p><p>${why.fix}各リンク先に対応した、固有で説明的なテキストに書き換えてください。</p>${why.links}`,

	LINK_IMAGE_ALT: `この alt がリンクの目的を説明しているか確認してください：</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>この alt テキストが、冗長にならずリンクの目的の説明に寄与しているか確認してください：</p><p><strong class="badge">Alt</strong> 「<em><strong>%(alt)</strong></em>」</p>${why.imageLinks}`,

	LINK_IMAGE_LONG_ALT: `<p>https://webaim.org/techniques/hypertext/link_text#alt_linkリンク画像の alt はリンク先を説明するためのものです</a>。リンクは短く明確であるべきです。長い alt は画像自体を説明している可能性があります。</p>この alt の長さは %(altLength) 文字です： <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>リンクに使用する画像の alt は、スクリーンリーダーにとって https://webaim.org/techniques/hypertext/link_text#alt_linkリンク名</a>になります。</p><p>${why.fix}リンクの目的を説明する alt にしてください。</p>${why.imageLinks}`,

	LINK_IMAGE_TEXT: 'この画像は装飾扱いですが、リンクのラベルは周囲のテキストによって提供されています。',

	LINK_NEW_TAB: `<p>${why.fix}同じタブで開くようにするか、新しいタブで開くことを https://itmaybejj.github.io/linkpurpose/事前に知らせてください</a>。</p><div class="why"><p>ユーザーは自分で「新しいタブで開く」ことを選べます。強制すると混乱のもとになります（「戻る」が期待通りに動作しない等）。</p><p>注：フォーム内のリンクは、入力内容の消失を避けるために新しいタブで開くことがあります。</p></div>`,

	LINK_PLACEHOLDER_ALT: `<p>このリンク画像の alt はプレースホルダーです：「<strong>%(alt)</strong>」</p><p>${why.fix}リンク先を説明する alt を設定してください。</p>${why.imageLinks}`,

	LINK_STOPWORD: `<p>このリンクには、目的を示さない語句が含まれています：<br><strong>%(text)</strong></p><p>${why.fix}目的を簡潔に説明するテキストに書き換えてください。</p>${why.links}`,

	LINK_STOPWORD_ARIA: `<p>ARIA では有意義な名前が提供されていますが、可視テキストは一般的で分かりにくい状態です：「<strong {C}>%(ERROR)</strong>」</p><p>${why.fix}可視テキストも意味のある内容にし、アクセシブルネームと一致させてください。</p>${why.links}`,

	LINK_SUS_ALT: `<p>この alt には「%(alt)」が含まれており、リンク先ではなく画像自体を説明している可能性があります。</p><strong class="badge">Alt テキスト</strong> 「%(ALT_TEXT)」<p>修正：リンクの目的（行き先・機能）を説明してください。<br></p>${why.imageLinks}`,

	LINK_SYMBOLS: `${why.fix}スクリーンリーダーが読み上げて混乱を招く可能性があるため、特別な意味のない記号をリンクの呼びかけ文として使用しないでください。削除を検討してください： <strong {C}>%(ERROR)</strong>`,

	LINK_URL: `<p>${why.fix}URL ではなく、リンク先の内容や目的を示すテキストを使用してください。</p><div class="why"><p>多くのユーザー（特にスクリーンリーダー利用者）は、リンク名だけでページを走査します。</p><p>URL をリンクテキストにすると、走査や検索が難しくなります。</p></div>`,

	META_LANG: `<p>${why.fix}HTML 要素に https://www.w3.org/International/questions/qa-html-language-declarationslang 属性</a>を追加してください。</p><div class="why"><p>スクリーンリーダーは言語指定に基づいて正しい発音規則を適用します。誤った言語指定は不明瞭な読み上げにつながります。</p></div>`,

	META_MAX: `<p>この meta タグはユーザーの拡大操作を制限しています。</p><p>${why.fix}制限を削除するか、完全なズームを許可する設定に変更してください。</p>`,

	META_REFRESH: `<p>meta による自動更新は、予告なく操作を中断し、フォームの入力内容を失わせることがあります。</p><p>${why.fix}AJAX 等で内容を更新し、事前通知と延期の選択肢を提供してください。</p>`,

	META_SCALABLE: `<p>この meta タグはページの拡大を禁止しています。</p><p>${why.fix}スケーリングを許可するよう設定を変更または削除してください。</p>`,

	META_TITLE: `<p>${why.fix}<code><head></code> 内に <code><title></code> を追加してください。</p><div class="why"><p>短く一意な https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/titleページタイトル</a>は重要です：</p><ul><li>検索結果の見出しとして使用されます。</li><li>ブラウザのタブ名として表示されます。</li><li>タブ切り替え時にスクリーンリーダーが読み上げます。</li></ul><p>タイトルがないと、ユーザーは生の URL しか得られません。</p></div>`,

	MISSING_ALT: `<p>画像に alt がない場合、スクリーンリーダーは画像ファイルの URL を 1 文字ずつ読み上げます。</p><p>${why.fix}装飾画像には alt="" を、意味のある画像には説明的な alt を設定してください。</p>${why.images}`,

	MISSING_ALT_LINK: `<p>リンク画像に alt がないと、スクリーンリーダーは画像の URL を読み上げてしまいます。特に不便です。</p><p>${why.fix}リンク先に対応した alt を設定してください。</p>${why.imageLinks}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>この画像はテキスト付きリンクの一部です。可視テキストが目的を十分説明していれば、画像は alt="" にしてください。そうでない場合は、目的を説明する alt を設定してください。</p>${why.imageLinks}`,

	QA_BAD_LINK: `<p>このリンクは開発環境（内部 URL）を指している可能性があります：<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}相対パス（/folder）か、公開 URL に変更してください。</p>`,

	QA_BLOCKQUOTE: `<p><code>blockquote</code> は「引用」であることを示します。短い引用は、多くの場合「見出し」であるべき内容です。</p><p>${why.fix}見出しである場合は見出しスタイルを使用し、構造に反映させてください。</p>${why.headings}`,

	QA_DOCUMENT: `<p>リンクされている文書も Web コンテンツであり、アクセシブルである必要があります。見出し、表見出し、画像の代替テキストを確認してから、この警告を無視してください。</p><ul class="why"><li>Google ドキュメントをアクセシブルに： https://support.google.com/docs/answer/6199477?hl=ja</a></li><li>Microsoft Office 文書をアクセシブルに： https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155</a></li></ul>`,

	QA_FAKE_HEADING: `<p>${why.fix}この太字テキストが新しいトピックの導入であれば、視覚的強調ではなく見出しスタイルを使用してください。</p><div class="why"><p>見出しは支援技術のためのナビゲーション構造を作ります。</p></div>`,

	QA_FAKE_LIST: `<p>${why.fix}「%(text)」がリスト項目であるべきなら、リスト形式にしてください。</p><div class="why"><p>リストは視覚・技術の両面で構造を提供します：</p><ol><li>整ったインデントで読みやすくなります。</li><li>スクリーンリーダーは「7 件中 3 件目」のように位置を読み上げます。</li></ol><p>先頭に数字を付けるだけではリストになりません。</p></div>`,

	QA_IN_PAGE_LINK: `<p>このページ内リンクのターゲットが存在しません。</p><div class="why"><p>開発者向け：JavaScript で処理している場合は、キーボード操作でも動作することを確認してください。</p></div>`,

	QA_JUSTIFY: `<p>両端揃えは不規則な空白を生み、多くの方にとって読みづらくなります。</p><p>${why.fix}左揃えを使用してください。</p>`,

	QA_NESTED_COMPONENTS: 'アコーディオン内にアコーディオン、タブ内にタブなど、入れ子のインタラクティブ UI は避けてください。これはナビゲーションを複雑にし、内容を見落とす原因になります。',

	QA_PDF: `<p>${why.fix}次のいずれかを行い、この警告を無視してください：</p><ul><li>PDF ではなく Web ページへリンクする</li><li>または、HTML 版／編集可能版の提供を追加する</li><li>または、少なくとも PDF にタグ・正しい読み順・表見出し・代替テキストがあることを確認する</li></ul><div class="why"><p>多くのモバイル／支援技術ユーザーは PDF より HTML ページを好みます。PDF は小さい画面で再流しが効かず、アクセシビリティのタグが不足しがちです。</p></div>`,

	QA_SMALL_TEXT: '小さすぎる文字は読みづらくなります。特に弱視の方のため、標準より小さいフォントは避けてください。',

	QA_STRONG_ITALICS: `<p>${why.fix}太字や斜体の多用は避け、要点のみに使用してください。</p><div class="why"><p>注：引用は <code>blockquote</code> を使用してください。</p></div>`,

	QA_SUBSCRIPT: `上付き・下付きは文字を小さくし、読みにくくします。序数（4<sup>th</sup>）、化学式（H<sub>2</sub>O）、脚注記号などに限って使用してください。`,

	QA_UNDERLINE: `<p>Web では下線は通常リンクを示します。本文の強調に下線を使うと、クリックできると誤解されます。</p><p>${why.fix}<strong>太字</strong>や<em>斜体</em>を使用し、節の切り替えは見出しで示してください。</p><div class="why"><p>スクリーンリーダーは下線などの視覚スタイルを読み上げません。構造として反映されるのは見出しだけです。</p></div>`,

	QA_UPPERCASE: `<p>全文大文字は読みにくく、「怒鳴っている」ように感じられることがあります。</p><p>${why.fix}強調には太字を使用し、大文字表記の多用は避けてください。</p><div class="why"><p>スクリーンリーダーは太字などの視覚強調を読み上げないため、新しい主題の提示には見出しを使ってください。</p></div>`,

	SUS_ALT: `<p>この alt には「%(alt)」が含まれており、冗長な可能性があります：</p><p><strong class="badge">Alt テキスト</strong> 「%(ALT_TEXT)」</p><p>修正：画像の意味を短く、的確に表現してください。</p><div class="why"><p>ヒント：「〜の画像」などはスクリーンリーダーがすでに画像であることを伝えるため、通常不要です。</p></div>`,

	TABINDEX_ATTR: `<p>${why.fix}0 より大きい <code>tabindex</code> は使用しないでください。HTML の要素順序（視覚順・タブ順・読み順）を一致させてください。</p><div class="why"><p>本来、視覚順・タブ順・読み順は一致します。</p><p>正の <em>tabindex</em> はタブ順だけを先頭へ移し、視覚順を変えないため混乱を招きます。</p></div>`,

	TABLES_EMPTY_HEADING: ` <p>${why.fix}すべての表ヘッダーセルにテキストを含めてください。</p><div class="why"><p>ヒント：スクリーンリーダーは、セルに入る際に対応する見出しを手がかりに内容を理解します。</p></div>`,

	TABLES_MISSING_HEADINGS: ` <p>${why.fix}表の設定で、ヘッダーが最初の行・最初の列、またはその両方にあることを指定してください。</p><div class="why"> <p>ヒント：スクリーンリーダーは各セルで該当する行見出し／列見出しを読み上げます。</p><p>レイアウト目的のみの表は、表以外の方法に置き換えてください。</p></div>`,

	TABLES_SEMANTIC_HEADING: ` <p>${why.fix}表の内部から（h2／h3 などの）内容見出しを削除し、行・列の表ヘッダーを使用してください。複数レベルが必要な場合は、表を分割してください。</p><div class="why"> <p>ヒント：表ヘッダーは行または列方向に作用します。一方、内容見出しはそれ以降の広い範囲に作用します。</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">セル 2 の<strong>表ヘッダー</strong>は B セルをラベル付けします。<br><br><strong>内容見出し</strong>をセル 2 に置くと、3・A・B・C と本文、注釈まで広く及びます。</td></tr> <tr><td>A</td><td>B</td><td>C</td></tr></table> </div>`,
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
	NOT_VISIBLE: '注意：このコンテンツは表示されていない可能性があります。ハイライトされた枠内を確認してください。',
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
	panelCheckAltText: `<p class="ed11y-small">すべての画像が文脈上の意味を伝えているか、テキストを含む画像がないかを確認してください。</p>`,
	panelCheckOutline: `<p class="ed11y-small">見出しの階層を表示します。ページの視覚的構造と一致しているか確認してください。</p>`,
	PANEL_HEADING_MISSING_ONE: 'レベル 1 の見出しがありません。',
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
