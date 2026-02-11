import Lang from '../../sa11y-js/utils/lang.js';
import { escapeHTML } from '../../sa11y-js/utils/utils';
import { UI } from '../core/ui.js';

// Replaces Sa11y error with one that does not attach CSS.

export default class ConsoleErrors extends HTMLElement {
  constructor(error) {
    super();
    this.error = error;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    // Styles
    //		const style = document.createElement('style');
    //		style.innerHTML = styles + sharedStyles;
    //		shadow.appendChild(style);

    // Container
    const content = document.createElement('dialog');
    content.ariaLabel = Lang._('ERROR');

    // Google Form & GitHub error link.
    const url = window.location;
    const google = '';

    // GitHub template
    const template = `## Error Description
\`\`\`javascript
${this.error.stack}
\`\`\`

## Details
- **URL:** ${url}
- **Version:** ${UI.version}

## Comments
`;
    const encodedTemplate = encodeURIComponent(template);
    const github = `https://github.com/itmaybejj/editoria11y/issues/new?title=Bug%20report&body=${encodedTemplate}`;

    // Message
    content.innerHTML = `
      <button class="close-btn" aria-describedby="ed11y-console-error"><span aria-hidden="true">&times</span> ${Lang._('ALERT_CLOSE')}</button>
      <h2 id="ed11y-console-error">${Lang._('ERROR')}</h2>
      <p>${Lang.sprintf('CONSOLE_ERROR', google, github)}</p>
      <p><strong>${Lang._('DEVELOPER_CHECKS')}:</strong></p>
      <pre>
Version: ${UI.version}
URL: ${url}</pre>
  		<p><strong>${Lang._('ERRORS')}:</strong></p>
<pre>${escapeHTML(this.error.stack)}</pre>
    `;
    shadow.appendChild(content);

    // Set focus and hide Sa11y's toggle.
    setTimeout(() => {
      content.show();
      // Constants.Panel.toggle.style.display = 'none';
      const button = content.querySelector('button');
      button.style.setProperty('padding', '1em;');
      button.style.setProperty('filter', 'invert(1)');
      const hiddenItems = content.querySelectorAll('.visually-hidden');
      hiddenItems?.forEach((hidden) => {
        hidden.style.setProperty('position', 'absolute');
        hidden.style.setProperty('width', '1px');
        hidden.style.setProperty('height', '1px');
        hidden.style.setProperty('overflow', 'hidden');
      });
      const preS = content.querySelectorAll('pre');
      preS.forEach((pre) => {
        pre.style.setProperty('margin-left', '18px');
      });
      //const dialog = container.shadowRoot.getElementById('dialog');
      //dialog.focus();

      const close = content.querySelector('.close-btn');
      close.addEventListener('click', () => {
        content.close();
      });
    }, 0);
  }
}
