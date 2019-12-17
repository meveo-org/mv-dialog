import { LitElement, html, css } from 'lit-element';
import './mv-dialog.js';

export class MvDialogDemo extends LitElement {

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
   `;
  }

  static get properties() {
    return {
      dialogVisible: { type: Boolean },
    };
  }

  constructor() {
    super();
     this.dialogVisible = false;
  }

  render() {
    return html`
      <div class="container">
        <button @click="${this.toggleDialog}"> Dialog</button>
        <mv-dialog ?opened="${this.dialogVisible}" @dialog-cancel="${this.closeDialog}">
          <h1 class="title ">Dialog</h1>
          <p class="content">Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.</p>
          <div class="buttons">
            <button class="accept" @click="${this.toggleDialog}">Save</button>
            <button class="cancel" @click="${this.closeDialog}">Cancel</button>    
          </div>
        </mv-dialog>
      </div>`;
  }

  toggleDialog(e) {
    this.dialogVisible = !this.dialogVisible;
  }

  closeDialog(e) {
    this.dialogVisible = false;
  }
}

customElements.define('mv-dialog-demo', MvDialogDemo);
