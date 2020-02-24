import { LitElement, html, css } from 'lit-element';
import './mv-dialog.js';
import "mv-button";
import "mv-font-awesome";

export class MvDialogDemo extends LitElement {
  static get properties() {
    return {
      openA: { type: Boolean },
      openB: { type: Boolean },
      openC: { type: Boolean },
      open: { type: Boolean, attribute: true },
      theme: { type: String, attribute: true }
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
      }
      
      .container {
        text-align: center;
        width: 100%;
        margin-top: 200px;
      }
      
      p {
        text-indent: 30px;
        text-align: initial;
      }
      
      mv-fa[icon="times-circle"] {
        font-size: 20px;
        color: #48C5B9;
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
      
      .title {
        font-size: 20px;
        color: #80828C;
        font-weight: 500;
        position: absolute;
        left: 30px;
        top: 50%;
        transform: translateY(-50%);
        cursor: default;
      }
 
      .left-button {
        position: absolute;
        left: 30px;
        top: 50%;
        transform: translateY(-50%);
      }
      
      .right-button {
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
      }
      
      .custom-size {
        --mv-dialog-width: 500px;
        --mv-dialog-max-height: 300px;
      }
      
      mv-fa[icon="lightbulb"] {
        font-size: 50px;
        cursor: pointer;
        margin: 20px;
        z-index: 100;
      }
      
      .theme {
        display: flex;
        justify-content: flex-start;
      }
   `;
  }

  constructor() {
    super();
    this.openA = false;
    this.openB = false;
    this.openC = false;
    this.theme = "light";
    this.open = true;
  }

  render() {
    const iconColor = `color: ${this.open ? "yellow" : ""}`;
    const textColor = `color: ${this.open ? "" : "#ffffff"}`;
    return html`
      <div class="theme">
        <mv-fa icon="lightbulb" style="${iconColor}" @click=${this.toggleLightBulb}></mv-fa>
      </div>
      <div class="container">
        <mv-button @button-clicked="${this.openDialogA}" button-style="info" .theme="${this.theme}">Dialog</mv-button>
        <mv-button @button-clicked="${this.openDialogB}" .theme="${this.theme}">Custom button</mv-button>
        <mv-button @button-clicked="${this.openDialogC}" button-style="error" .theme="${this.theme}">Custom size</mv-button>
        <mv-dialog
           ?open="${this.openA}"
           @close-dialog="${this.closeDialogA}"
           @ok-dialog="${this.okDialogA}"
           closeable
           .theme="${this.theme}"
        >
           <p>
             A Dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision.
             Dialogs disable all app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.
             Dialogs are purposefully interruptive, so they should be used sparingly.
           </p>
        </mv-dialog>
        
        <mv-dialog
           ?open="${this.openB}"
           @close-dialog="${this.closeDialogB}"
           @ok-dialog="${this.okDialogB}"
           header-label="Dialog custom button"
           .theme="${this.theme}"
        >
          <p>
            A Dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision.
            Dialogs disable all app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.
            Dialogs are purposefully interruptive, so they should be used sparingly.
          </p>
          <span slot="header">
            <mv-fa icon="times-circle" @click="${this.closeDialogB}"></mv-fa>
            <span class="title" style="${textColor}">Dialog custom button</span>
          </span>
          <span slot="footer">
            <mv-button class="left-button" @button-clicked="${this.closeDialogB}" button-style="error">Cancel</mv-button>
            <mv-button class="right-button" @button-clicked="${this.okDialogB}" button-style="info">Save</mv-button>
          </span>
        </mv-dialog>
        
        <mv-dialog
          ?open="${this.openC}"
          @close-dialog="${this.closeDialogC}"
          @ok-dialog="${this.okDialogC}"
          header-label="Dialog custom size"
          class="custom-size"
          no-left-button
          .theme="${this.theme}"
        >
          <p>
           A Dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision.
           Dialogs disable all app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.
           Dialogs are purposefully interruptive, so they should be used sparingly.
           A Dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision.
           Dialogs disable all app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.
           Dialogs are purposefully interruptive, so they should be used sparingly.
           A Dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision.
           Dialogs disable all app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.
           Dialogs are purposefully interruptive, so they should be used sparingly.
          </p>
        </mv-dialog>
      </div>`;
  }

  openDialogA() {
    this.openA = true;
  }

  closeDialogA() {
    this.openA = false;
  }

  okDialogA() {
    this.openA = false;
  }

  openDialogB() {
    this.openB = true;
  }

  closeDialogB() {
    this.openB = false;
  }

  okDialogB() {
    this.openB = false;
  }

  openDialogC() {
    this.openC = true;
  }

  closeDialogC() {
    this.openC = false;
  }

  okDialogC() {
    this.openC = false;
  }

  toggleLightBulb = () => {
    this.open = !this.open;
    if (this.open) {
      this.theme = "light";
    } else {
      this.theme = "dark";
    }
  };
}

customElements.define('mv-dialog-demo', MvDialogDemo);
