import Lang from '../../sa11y-js/utils/lang.js';
import { sanitizeURL } from '../../sa11y-js/utils/utils';
import version from '../version.js';
import { spriteClose } from './sprite.js';

// Replaces Sa11y error with one that does not attach CSS.
export default class ConsoleErrors extends HTMLElement {
  constructor(error) {
    super();
    this.error = error;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    // Container
    const wrapper = document.createElement('div');
    wrapper.ariaLabel = Lang._('ERROR');
    wrapper.id = 'dialog';
    wrapper.classList.add('ed11y-wrapper', 'ed11y-tip-wrapper', 'ed11y-console-error');
    wrapper.setAttribute('tabindex', '-1');
    const content = document.createElement('div');
    content.classList.add('content');

    // Google Form & GitHub error link.
    const url = sanitizeURL(window.location.href);

    // GitHub template
    const template = `## Error Description
\`\`\`javascript
${this.error.stack}
\`\`\`

## Details
- **URL:** ${url}
- **Version:** ${version}

## Comments
`;
    const encodedTemplate = encodeURIComponent(template);
    const github = `https://github.com/itmaybejj/editoria11y/issues/new?title=Bug%20report&body=${encodedTemplate}`;

    // 1. Create the Close Button.
    const closeWrapper = document.createElement('div');
    closeWrapper.innerHTML = `<button class="close ed11y-tip-close" title="Close">${spriteClose}</button>`;
    const closeBtn = closeWrapper.querySelector('.close');
    closeBtn.setAttribute('aria-label', Lang._('ALERT_CLOSE'));

    // 2. Create the Heading.
    const h2 = document.createElement('h2');
    h2.classList.add('title');
    h2.textContent = Lang._('ERROR');

    // 3. Create the main message.
    const p1 = document.createElement('p');
    p1.className = 'p1';
    p1.append(Lang.sprintf('CONSOLE_ERROR'));
    if (p1.querySelector('.g-link')) {
      p1.querySelector('.g-link').href = github;
    }

    // 4. Create the Error Details (Stack trace and version).
    const p2 = document.createElement('p');
    p2.className = 'error';

    // Use line breaks and text nodes to avoid parsing strings as HTML.
    p2.append(
      this.error.stack,
      document.createElement('br'),
      document.createElement('br'),
      `Version: ${version}`,
      document.createElement('br'),
      `URL: ${url}`,
    );

    // 5. Assemble and append.
    content.append(h2, p1, p2);
    wrapper.append(closeWrapper, content);
    shadow.appendChild(wrapper);

    // 6. Set focus and hide Sa11y's toggle.
    setTimeout(
      () => {
        wrapper.focus();

        const close = content.querySelector('.close');
        close.addEventListener('click', () => {
          wrapper.remove();
        });
      },
      0,
      wrapper,
    );
  }
}
