import Lang from '../../sa11y-js/utils/lang.js';
import { sanitizeURL } from '../../sa11y-js/utils/utils';
import version from '../version.js';
import sprite from './sprite.js';
import { State } from '../../sa11y-js/core/state.js';

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
    closeWrapper.innerHTML = `<button class="close ed11y-tip-close" title="Close">${sprite.close}</button>`;
    const closeBtn = closeWrapper.querySelector('.close');
    closeBtn.setAttribute('aria-label', Lang._('ALERT_CLOSE'));

    // 2. Create the Heading.
    const h2 = document.createElement('h2');
    h2.classList.add('title');
    h2.textContent = Lang._('ERROR');

    // 3. Create the main message.
    const p1 = document.createElement('p');
    p1.className = 'p1';
    let heading = Lang.sprintf('CONSOLE_ERROR');
    if (heading?.textContent === 'CONSOLE_ERROR') {
      // Fallback if translation is missing.
      heading = Lang.sprintf(
        'There is an issue with the accessibility checker on this page. Please <a class="g-link">report it on GitHub</a>. Debug information:',
      );
      heading.querySelector('a span')?.style?.setProperty('position', 'absolute');
      heading.querySelector('a span')?.style?.setProperty('opacity', '0');
    }
    p1.append(heading);
    if (p1.querySelector('.g-link')) {
      p1.querySelector('.g-link').href = github;
    }

    // 4. Create the Error Details (Stack trace and version).
    const p2 = document.createElement('p');
    p2.className = 'error';

    // Use line breaks and text nodes to avoid parsing strings as HTML.
    p2.append(
      `Version: ${version}`,
      document.createElement('br'),
      document.createElement('br'),
      `URL: ${url}`,
      document.createElement('br'),
      document.createElement('br'),
      this.error.stack,
      document.createElement('br'),
      document.createElement('br'),
    );
    p2.style.setProperty('max-height', 'min(66vh, 300px)');
    p2.style.setProperty('overflow', 'auto');

    const optionsInfo = document.createElement('span');

    // Defensive stringifier. Every operation that can throw in Firefox
    // (Object.keys / property access on cross-origin Window or Document
    // objects, getters on React fibers attached to DOM nodes, JSON.stringify
    // probing .toJSON on a foreign object) is wrapped in try/catch.
    function safeStringify(root) {
      const MAX_DEPTH = 8;
      const seen = new WeakSet();

      function quoteKey(k) {
        try {
          return JSON.stringify(String(k));
        } catch (_e) {
          return '"[unkey]"';
        }
      }

      function isHostObject(val) {
        // Detect DOM nodes, Window, and Document without triggering hostile
        // getters. Each probe is independently guarded.
        try {
          if (typeof val.nodeType === 'number') return true;
        } catch (_e) {
          return true;
        }
        try {
          if (val === val.window) return true;
        } catch (_e) {
          return true;
        }
        try {
          if (typeof val.documentElement === 'object' && val.documentElement !== null) return true;
        } catch (_e) {
          return true;
        }
        return false;
      }

      function walk(val, depth) {
        if (val === null) return 'null';
        if (val === undefined) return undefined;

        let type;
        try {
          type = typeof val;
        } catch (_e) {
          return '"[unreadable]"';
        }

        if (type === 'string') {
          try {
            return JSON.stringify(val);
          } catch (_e) {
            return '"[unstringifiable-string]"';
          }
        }
        if (type === 'number') return Number.isFinite(val) ? String(val) : 'null';
        if (type === 'boolean') return val ? 'true' : 'false';
        if (type === 'bigint') return `"${String(val)}n"`;
        if (type === 'function') return '"[Function]"';
        if (type === 'symbol') return '"[Symbol]"';
        if (type !== 'object') return '"[unknown]"';

        if (depth >= MAX_DEPTH) return '"[MaxDepth]"';
        if (isHostObject(val)) return '"[HostObject]"';

        try {
          if (seen.has(val)) return '"[Circular]"';
          seen.add(val);
        } catch (_e) {
          return '"[unreadable-object]"';
        }

        let isArr = false;
        try {
          isArr = Array.isArray(val);
        } catch (_e) {
          /* fall through as object */
        }

        if (isArr) {
          let len = 0;
          try {
            len = val.length >>> 0;
          } catch (_e) {
            return '"[unreadable-array]"';
          }
          const out = [];
          for (let i = 0; i < len; i++) {
            let child;
            try {
              child = val[i];
            } catch (_e) {
              out.push('"[unreadable-item]"');
              continue;
            }
            const s = walk(child, depth + 1);
            out.push(s === undefined ? 'null' : s);
          }
          return `[${out.join(',')}]`;
        }

        let keys = [];
        try {
          keys = Object.keys(val);
        } catch (_e) {
          return '"[unreadable-object]"';
        }

        const out = [];
        for (const k of keys) {
          // Skip framework-injected fiber/internal props proactively.
          if (
            typeof k === 'string' &&
            (k.startsWith('__reactFiber') ||
              k.startsWith('__reactProps') ||
              k.startsWith('__reactEvents'))
          ) {
            out.push(`${quoteKey(k)}:"[ReactInternal]"`);
            continue;
          }
          let child;
          try {
            child = val[k];
          } catch (_e) {
            out.push(`${quoteKey(k)}:"[unreadable-prop]"`);
            continue;
          }
          const s = walk(child, depth + 1);
          if (s !== undefined) out.push(`${quoteKey(k)}:${s}`);
        }
        return `{${out.join(',')}}`;
      }

      try {
        const result = walk(root, 0);
        return result === undefined ? 'null' : result;
      } catch (e) {
        try {
          return `"[StringifyFailed: ${String(e?.message).replace(/"/g, "'")}]"`;
        } catch (_e) {
          return '"[StringifyFailed]"';
        }
      }
    }

    try {
      if (State.option) {
        try {
          State.option.pepper = 'hidden';
        } catch (_e) {
          /* read-only option object */
        }
        optionsInfo.textContent += `Options: ${safeStringify(State.option)}`;
      } else {
        optionsInfo.textContent += 'Options object is not available.';
      }
    } catch (e) {
      try {
        optionsInfo.textContent += 'Options object could not be serialized.';
      } catch (_e) {
        /* nothing more we can do */
      }
      try {
        console.warn('Editoria11y: options serialization failed.', e?.message);
      } catch (_e) {}
    }
    p2.append(optionsInfo);

    // 5. Assemble and append.
    content.append(h2, p1, p2);
    wrapper.append(closeWrapper, content);
    shadow.appendChild(wrapper);

    // 6. Set focus and hide Sa11y's toggle.
    setTimeout(
      () => {
        wrapper.focus();

        const close = content.querySelector('.close');
        close?.addEventListener('click', () => {
          wrapper.remove();
        });
      },
      0,
      wrapper,
    );
  }
}
