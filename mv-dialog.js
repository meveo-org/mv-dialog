import { LitElement, html, css } from 'lit-element';

export class MvDialog extends LitElement {
  constructor() {
    super();
     this.opened = false;
  }

  static get properties() {
    return {
      opened: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      .wrapper {
        opacity: 0;
        transition: visibility 0s, opacity 0.25s ease-in;
      }
      
      .overlay {
        background: rgba(0, 0, 0, 0.8);
        height: 100%;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
      }
      
      .dialog {
        background: #ffffff;
        max-width: 600px;
        padding: 1rem;
        position: fixed;
      }
      
      .opened {
        align-items: center;
        display: flex;
        justify-content: center;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 1;
        visibility: visible;
      }
      
      .closed {
        visibility: hidden;
      }
   `;
  }

  render() {
    const dialogClass = this.opened ? 'opened' : 'closed';
    return html`
      <div class="wrapper ${dialogClass}">
        <div class="overlay" @click="${this.close}"></div>
          <div class="dialog" role="dialog" aria-labelledby="title" aria-describedby="content">
            <slot></slot>
          </div>
        </div>
      </div>
   `;
  }

  close() {
    this.dispatchEvent(new CustomEvent('dialog-cancel'))
  }
}

customElements.define('mv-dialog', MvDialog);
