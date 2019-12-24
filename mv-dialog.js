import { LitElement, html, css } from 'lit-element';
import "mv-button";
import "mv-font-awesome";

export class MvDialog extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean },
      leftButton: { type: String },
      rightButton: { type: String },
      heading: { type: String },
      hasCloseIcon: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      :host {
				font-family: var(--font-family, Arial);
				font-size: var(--font-size-m, 10pt);				
      }
      
      .mv-container-dialog {
        opacity: 0;
        transition: visibility 0s, opacity 0.25s ease-in;
      }
      
      .overlay-dialog {
        height: 100%;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        opacity: 0.5;
        background-color: #000000;
      }
      
      .dialog {
        background: #FFFFFF;
        max-width: var(--mv-dialog-max-width, 756px);
        max-height: var(--mv-dialog-max-height, 528px);
        position: fixed;
        box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.5);
        border-radius: 5px;
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
      
      mv-fa {
        font-size: 20px;
        color: #48C5B9;
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
      
      .header {
         max-width: var(--mv-dialog-max-width, 756px);
         height: 70px;
         box-shadow: 0 5px 10px 0 rgba(7, 17, 26, 0.2); 
         background: #FFFFFF;
         border-radius: 5px 5px 0 0;
         position: relative;
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
      
      .footer {
        max-width: var(--mv-dialog-max-width, 756px);
        height: 80px;
        box-shadow: 0 5px 10px 0 rgba(7, 17, 26, 0.2);
        border-radius: 0 0 5px 5px;
        border-top: 1px solid rgba(0, 0, 0, 0.12);
        position: relative;
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
      
      .body {
        overflow-y: auto;
        max-width: var(--mv-dialog-max-width, 756px);
        height: var(--mv-dialog-body-width, 378px);
        position: relative;
        padding: 0 30px 0 30px;
      } 
   `;
  }

  constructor() {
    super();
    this.open = false;
    this.leftButton = null;
    this.rightButton = null;
    this.heading = "Dialog";
    this.hasCloseIcon = true;
  }

  render() {
    const dialogClass = this.open ? 'opened' : 'closed';
    return html`
      <div class="mv-container-dialog ${dialogClass}">
        <div class="overlay-dialog" @click="${this.handleClose}"></div>
        <div class="dialog" role="dialog" aria-labelledby="title" aria-describedby="content">
          <div class="header">
              ${this.hasCloseIcon
                ? html`<mv-fa icon="window-close" @click="${this.handleClose}"></mv-fa>`
                : html``}  
              <span class="title">${this.heading}</span>
          </div>
          
          <div class="body">
              <slot></slot>
          </div>
          
          <div class="footer">
             ${this.leftButton
              ? html`<mv-button class="left-button" button-style="info" @button-clicked="${this.handleClose}">
                        ${this.leftButton}
                     </mv-button>`
              : html``}  
             
             ${this.rightButton
              ? html`<mv-button class="right-button" @button-clicked="${this.handleClose}">${this.rightButton}</mv-button>`
              : html``}
             <slot name="left-button"></slot>
             <slot name="right-button"></slot>
          </div>
        </div>
      </div>
   `;
  }

  handleClose() {
    this.dispatchEvent(new CustomEvent('close-dialog'))
  }
}

customElements.define('mv-dialog', MvDialog);
