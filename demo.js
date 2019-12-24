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
      hasLeftButton: { type: String },
      hasRightButton: { type: String },
      hasCloseIcon: { type: Boolean }
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
        --mv-dialog-max-width: 500px;
        --mv-dialog-body-width: 250px; // dialog height = 400px (250px + 150px height of header and footer)
      }
   `;
  }

  constructor() {
    super();
    this.leftButton = "Cancel";
    this.rightButton = "Save";
    this.openA = false;
    this.openB = false;
    this.openC = false;
    this.hasCloseIcon = false;
  }

  render() {
    return html`
      <div class="container">
        <mv-button @button-clicked="${this.openDialogA}" button-style="info">Dialog</mv-button>
        <mv-button @button-clicked="${this.openDialogB}">Custom button</mv-button>
        <mv-button @button-clicked="${this.openDialogC}" button-style="error">Custom size</mv-button>
        <mv-dialog
           ?open="${this.openA}"
           @close-dialog="${this.closeDialogA}"
           .leftButton="${this.leftButton}"
           .rightButton="${this.rightButton}"
           heading="Dialog"
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
           heading="Dialog custom button"
        >
           <p>
             A Dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision.
             Dialogs disable all app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.
             Dialogs are purposefully interruptive, so they should be used sparingly.
           </p>
           <mv-button class="left-button" slot="left-button" @button-clicked="${this.closeDialogB}">Cancel</mv-button>
           <mv-button class="right-button" slot="right-button" @button-clicked="${this.closeDialogB}" button-style="info">Save</mv-button>
        </mv-dialog>
        
        <mv-dialog
           ?open="${this.openC}"
           @close-dialog="${this.closeDialogC}"
           heading="Dialog custom size"
           class="custom-size"
           .hasCloseIcon="${this.hasCloseIcon}"
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
           <mv-button 
             class="left-button"
             slot="left-button"
             @button-clicked="${this.closeDialogC}"
             button-style="error"
           >
             Cancel
           </mv-button>
           <mv-button class="right-button" slot="right-button" @button-clicked="${this.closeDialogC}">Save</mv-button>
        </mv-dialog>
      </div>`;
  }

  openDialogA() {
    this.openA = true;
  }

  closeDialogA() {
    this.openA = false;
  }

  openDialogB() {
    this.openB = true;
  }

  closeDialogB() {
    this.openB = false;
  }

  openDialogC() {
    this.openC = true;
  }

  closeDialogC() {
    this.openC = false;
  }
}

customElements.define('mv-dialog-demo', MvDialogDemo);
