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
      showCloseIcon: { type: Boolean },
      showLeftButton: { type: Boolean },
      showRightButton: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
        --dialog-body-height: calc(var(--mv-dialog-max-height, 528px) - 150px);
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
        width: var(--mv-dialog-width, 756px);
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
         width: var(--mv-dialog-width, 756px);
         height: 70px;
         box-shadow: 0 5px 10px 0 rgba(7, 17, 26, 0.2); 
         background: #FFFFFF;
         border-radius: 5px 5px 0 0;
         position: relative;
         box-sizing: border-box;
         -moz-box-sizing: border-box;
         -webkit-box-sizing: border-box;
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
        width: var(--mv-dialog-width, 756px);
        height: 80px;
        box-shadow: 0 5px 10px 0 rgba(7, 17, 26, 0.2);
        border-radius: 0 0 5px 5px;
        border-top: 1px solid rgba(0, 0, 0, 0.12);
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px 0 30px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
      }
      
      .body {
        overflow-y: auto;
        width: var(--mv-dialog-width, 756px);
        height: var(--dialog-body-height);
        position: relative;
        padding: 0 30px 0 30px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
      }
      
      .footer mv-button:first-child:last-child {
        margin: 0 auto;
      }
   `;
  }

  constructor() {
    super();
    this.open = false;
    this.leftButton = "Cancel";
    this.rightButton = "OK";
    this.heading = "Dialog";
    this.showCloseIcon = true;
    this.showLeftButton = true;
    this.showRightButton = true;
  }

  render() {
    const dialogClass = this.open ? 'opened' : 'closed';
    return html`
      <div class="mv-container-dialog ${dialogClass}">
        <div class="overlay-dialog" @click="${this.handleClose}"></div>
        <div class="dialog" role="dialog" aria-labelledby="title" aria-describedby="content">
          <div class="header">
              <slot name="header">
                ${this.showCloseIcon
                  ? html`<mv-fa icon="times" @click="${this.handleClose}"></mv-fa>`
                  : html``}  
                <span class="title">${this.heading}</span>
              </slot>
          </div>
          
          <div class="body">
              <slot></slot>
          </div>
          
          <div class="footer">
             <slot name="footer">
               ${this.showLeftButton
                ? html`<mv-button class="left-button" @button-clicked="${this.handleClose}">${this.leftButton}</mv-button>`
                : html``}  
               ${this.showRightButton
                ? html`<mv-button class="right-button" @button-clicked="${this.handleOK}" button-style="info">${this.rightButton}</mv-button>`
                : html``}
             </slot>
          </div>
        </div>
      </div>
   `;
  }

  handleClose(event) {
    event && event.stopImmediatePropagation();
    this.dispatchEvent(new CustomEvent('close-dialog'));
  }

  handleOK(event) {
    event && event.stopImmediatePropagation();
    this.dispatchEvent(new CustomEvent('ok-dialog'));
  }
}

customElements.define('mv-dialog', MvDialog);
