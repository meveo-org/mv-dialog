import { LitElement, html, css } from "lit";
import "@meveo-org/mv-button";
import "@meveo-org/mv-font-awesome";

export class MvDialog extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      closeable: { type: Boolean, reflect: true },
      leftLabel: { type: String, attribute: "left-label", reflect: true },
      rightLabel: { type: String, attribute: "right-label", reflect: true },
      headerLabel: { type: String, attribute: "header-label", reflect: true },
      noFooter: { type: Boolean, attribute: "no-footer", reflect: true },
      noLeftButton: {
        type: Boolean,
        attribute: "no-left-button",
        reflect: true,
      },
      noRightButton: {
        type: Boolean,
        attribute: "no-right-button",
        reflect: true,
      },

      //  valid theme values are: "light", "dark"
      //    default: "light"
      theme: { type: String, attribute: true },
    };
  }

  static get styles() {
    return css`
      :host {
        --mv-dialog-font-family: var(--font-family, MuseoSans);
        --mv-dialog-title-font-size: var(--font-size-xl, 12pt);
        --mv-dialog-close-icon-font-size: var(--font-size-xl, 12pt);
        --mv-dialog-content-font-size: var(--font-size-m, 10pt);
        --max-height: var(--mv-dialog-max-height, 528px);
        --header-height: var(--mv-dialog-header-height, 70px);
        --dialog-box-shadow: var(--mv-dialog-box-shadow, 0 0 30px 0 rgba(0, 0, 0, 0.5));
        --footer-box-shadow: var(--mv-dialog-footer-box-shadow, 0 5px 10px 0 rgba(7, 17, 26, 0.2));
        --header-box-shadow: var(--mv-dialog-header-box-shadow, 0 5px 10px 0 rgba(7, 17, 26, 0.2));
        --fa-right-position: var(--mv-dialog-fa-right-position, 30px);
        --width: var(--mv-dialog-width, 756px);
        --dialog-height: var(--mv-dialog-height, auto);
        --dialog-body-height: var(
          --mv-dialog-content-height,
          calc(var(--max-height) - 150px)
        );
        --footer-height: var(--mv-dialog-footer-height, 66px);
        --dialog-body-width: var(--mv-dialog-content-width, 100%);
        --border-radius: var(--mv-dialog-border-radius, 5px);
        --color-close-icon: var(--mv-dialog-color-close-icon, #48c5b9);
        --dialog-z-index: var(--mv-dialog-z-index, 99);
        --light-background: var(--mv-dialog-background-color, #ffffff);
        --dark-background: var(--mv-dialog-dark-background, #373e48);
        --light-color: var(--mv-dialog-color, #80828c);
        --dark-color: var(--mv-dialog-dark-color, #ffffff);
        --title-font-weight: var(--mv-dialog-title-font-weight, 500);
        --title-left-position: var(--mv-dialog-title-left-position, 30px);
        --footer-border-top: var(--mv-dialog-footer-border-top, 1px solid rgba(0, 0, 0, 0.12));
        --footer-padding: var(--mv-dialog-footer-padding, 0 30px 0 30px);
        --dialog-body-padding: var(--mv-dialog-body-padding, 0 30px 0 30px);
      }

      .mv-container-dialog {
        opacity: 0;
        transition: visibility 0s, opacity 0.25s ease-in;
        z-index: var(--dialog-z-index);
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
        background: var(--background-color);
        width: var(--width);
        height: var(--dialog-height);
        max-height: var(--max-height);
        position: fixed;
        box-shadow: var(--dialog-box-shadow);
        border-radius: var(--border-radius);
        font-family: var(--mv-dialog-font-family);
        font-size: var(--mv-dialog-content-font-size);
        color: var(--text-color);
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
        font-size: var(--mv-dialog-close-icon-font-size);
        color: var(--color-close-icon);
        position: absolute;
        right: var(--fa-right-position);
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }

      .header {
        width: 100%;
        height: var(--header-height);
        box-shadow: var(--header-box-shadow);
        border-radius: var(--border-radius) var(--border-radius) 0 0;
        position: relative;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
      }

      .title {
        font-size: var(--mv-dialog-title-font-size);
        color: var(--text-color);
        font-weight: var(--title-font-weight);
        position: absolute;
        left: var(--title-left-position);
        top: 50%;
        transform: translateY(-50%);
        cursor: default;
      }

      .footer {
        width: 100%;
        height: var(--footer-height);
        box-shadow: var(--footer-box-shadow);
        border-radius: 0 0 var(--border-radius) var(--border-radius);
        border-top: var(--footer-border-top);
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--footer-padding);
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
      }

      .body {
        overflow-y: inherit;
        width: var(--dialog-body-width);
        height: var(--dialog-body-height, auto);
        position: relative;
        padding: var(--dialog-body-padding);
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
      }

      .footer mv-button:first-child:last-child {
        margin: 0 auto;
      }

      .light {
        --background-color: var(--light-background);
        --text-color: var(--light-color);
      }

      .dark {
        --background-color: var(--dark-background);
        --text-color: var(--dark-color);
      }
    `;
  }

  constructor() {
    super();
    this.open = false;
    this.leftLabel = "Cancel";
    this.rightLabel = "OK";
    this.headerLabel = "Dialog";
    this.closeable = false;
    this.noLeftButton = false;
    this.noRightButton = false;
    this.theme = "light";
  }

  render() {
    const dialogClass = this.open ? "opened" : "closed";
    return html`
      <div class="mv-container-dialog ${dialogClass} ${this.theme}">
        <div class="overlay-dialog" @click="${this.handleClose}"></div>
        <div class="dialog" role="dialog">
          <div class="header">
            <slot name="header">
              ${this.closeable
                ? html`
                    <mv-fa icon="times" @click="${this.handleClose}"></mv-fa>
                  `
                : html``}
              <span class="title">${this.headerLabel}</span>
            </slot>
          </div>

          <div class="body">
            <slot></slot>
          </div>
          ${!this.noFooter
            ? html`
                <div class="footer">
                  <slot name="footer">
                    ${!this.noLeftButton
                      ? html`
                          <mv-button
                            class="left-button"
                            type="outline"
                            button-style="cancel"
                            @button-clicked="${this.handleClose}"
                          >
                            ${this.leftLabel}
                          </mv-button>
                        `
                      : html``}
                    ${!this.noRightButton
                      ? html`
                          <mv-button
                            class="right-button"
                            @button-clicked="${this.handleOK}"
                          >
                            ${this.rightLabel}
                          </mv-button>
                        `
                      : html``}
                  </slot>
                </div>
              `
            : html``}
        </div>
      </div>
    `;
  }

  handleClose(event) {
    event && event.stopImmediatePropagation();
    this.dispatchEvent(new CustomEvent("close-dialog"));
  }

  handleOK(event) {
    event && event.stopImmediatePropagation();
    this.dispatchEvent(new CustomEvent("ok-dialog"));
  }
}

customElements.define("mv-dialog", MvDialog);
