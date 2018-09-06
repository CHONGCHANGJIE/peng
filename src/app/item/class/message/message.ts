
export class Message {
    content: string;
    style: string;
    dismissed = false;
    error: string;

    constructor(content, style?, error?) {
      this.content = content;
      this.style = style || 'info';
      this.error = error;
    }
}
