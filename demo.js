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
      
      fieldset > label, label > input {
        cursor: pointer;
      }
      
      fieldset {
        width: 120px;
        margin-left: 10px;
        border:2px solid red;
        -moz-border-radius:8px;
        -webkit-border-radius:8px;	
        border-radius:8px;
        color: #818181;
      }
      
      legend {
        font-weight: 500;
        color: red;
      }
   `;
  }

  constructor() {
    super();
    this.openA = false;
    this.openB = false;
    this.openC = false;
    this.theme = "light";
  }

  render() {
    const { theme } = this;
    return html`
      <fieldset>
        <legend>Theme</legend>
        <label><input type="radio" name="theme" value="light" checked @change="${this.changeTheme}" />Light</label>
        <label><input type="radio" name="theme" value="dark" @change="${this.changeTheme}" />Dark</label>
      </fieldset>
      <div class="container">
        <mv-button @button-clicked="${this.openDialogA}" button-style="info" .theme="${theme}">Dialog</mv-button>
        <mv-button @button-clicked="${this.openDialogB}" .theme="${theme}">Custom button</mv-button>
        <mv-button @button-clicked="${this.openDialogC}" button-style="error" .theme="${theme}">Custom size</mv-button>
        <mv-dialog
           ?open="${this.openA}"
           @close-dialog="${this.closeDialogA}"
           @ok-dialog="${this.okDialogA}"
           closeable
           .theme="${theme}"
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
           .theme="${theme}"
        >
          <p>
            A Dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision.
            Dialogs disable all app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.
            Dialogs are purposefully interruptive, so they should be used sparingly.
          </p>
          <span slot="header">
            <mv-fa icon="times-circle" @click="${this.closeDialogB}"></mv-fa>
            <span class="title">Dialog custom button</span>
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
          .theme="${theme}"
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

  changeTheme = originalEvent => {
    const { target: { value } } = originalEvent;
    this.theme = value;
  };
}

customElements.define('mv-dialog-demo', MvDialogDemo);
