/**
 * @license MIT
 *
 * @fileoverview スナックバーのトグル・イベントを監視、制御するクラス。
 */

export class SnackbarAttacher {
  #selector;
  #durationSeconds;
  #target;
  #options;
  #EVENT_BEFORETOGGLE = 'beforetoggle';
  #EVENT_TOGGLE = 'toggle';
  #STATE_OPEN = 'open';

  /** @type {?number} */
  #autoDismissTimeoutId = null;

  /**
   * インスタンスを生成します。
   * @param {!Document|!DocumentFragment|!Element}
   *     target イベントをハンドリングする対象のオブジェクト。
   * @param {{capture: ?boolean, once: ?boolean, passive: ?boolean}|boolean}
   *     options リスナーのオプション設定。
   */
  constructor(
    selector = 'output[popover]',
    durationSeconds = 10,
    target = document,
    options = true,
  ) {
    this.#selector = selector;
    this.#durationSeconds = durationSeconds;
    this.#target = target;
    this.#options = options;
  }

  /** ターゲットにイベント・リスナーを登録します。 */
  attach() {
    this
      .#target
      .addEventListener(this.#EVENT_BEFORETOGGLE, this, this.#options);
    this.#target.addEventListener(this.#EVENT_TOGGLE, this, this.#options);
  }

  /** ターゲットからイベント・リスナーを削除します。 */
  detach() {
    this.#target
      .removeEventListener(this.#EVENT_BEFORETOGGLE, this, this.#options);
    this.#target.removeEventListener(this.#EVENT_TOGGLE, this, this.#options);
  }

  /**
   * イベントを受信した際に駆動します。
   * @param {!Event} event 受信したイベント・オブジェクト。
   */
  handleEvent(event) {
    if (
      !(event instanceof ToggleEvent)
      || !(event.target instanceof HTMLElement)
      || !event.target.matches(this.#selector)
    ) {
      return;
    }
    switch (event.type) {
      case this.#EVENT_BEFORETOGGLE:
        this.#handleBeforetoggle(event.target, event);
        break;
      case this.#EVENT_TOGGLE:
        this.#handleToggle(event.target, event);
        break;
    }
  }

  /**
   * `beforetoggle`イベントを処理します。
   * @param {!HTMLElement} snackbar 対象のスナックバー。
   * @param {!ToggleEvent} event トグル・イベント・オブジェクト。
   */
  #handleBeforetoggle(snackbar, event) {
    if (event.newState !== this.#STATE_OPEN) {
      return;
    }

    for (const otherSnackbar of this.#target.querySelectorAll(this.#selector)) {
      if (otherSnackbar instanceof HTMLElement && otherSnackbar !== snackbar) {
        otherSnackbar.hidePopover();
      }
    }
  }

  /**
   * `toggle`イベントを処理します。
   * @param {!HTMLElement} snackbar 対象のスナックバー。
   * @param {!ToggleEvent} event トグル・イベント・オブジェクト。
   */
  #handleToggle(snackbar, event) {
    if (event.newState === this.#STATE_OPEN) {
      if (this.#autoDismissTimeoutId) {
        clearTimeout(this.#autoDismissTimeoutId);
      }
      this.#autoDismissTimeoutId = setTimeout(
        () => snackbar.hidePopover(),
        Math.min(Math.max(4, this.#durationSeconds), 10) * 1000,
      );
      return;
    }

    if (this.#autoDismissTimeoutId) {
      clearTimeout(this.#autoDismissTimeoutId);
    }
    this.#autoDismissTimeoutId = null;
  }
}
