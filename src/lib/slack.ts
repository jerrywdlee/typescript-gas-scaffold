export class Slack {
  public url: string
  public config: SlackConfig

  constructor(url: string, conf?: SlackConfig) {
    this.url = url
    this.config = { ...conf }
  }

  public sendMsg(payload: SlackPayload) {
    const params = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ ...this.config, ...payload }),
    }
    UrlFetchApp.fetch(this.url, params)
  }
}

interface SlackConfig {
  username?: string,
  icon_url?: string,
  icon_emoji?: string,
  channel?: string,
}

interface SlackPayload {
  text: string,
  username?: string,
  icon_url?: string,
  icon_emoji?: string,
  channel?: string,
  attachments?: SlackAttachment[]
}

interface SlackAttachment {
  // see https://api.slack.com/docs/message-attachments
  fallback: string,
  text?: string,
  pretext?: string,
  author_name?: string,
  author_link?: string,
  author_icon?: string,
  title?: string,
  title_link?: string,
  color?: string,
  image_url?: string,
  thumb_url?: string,
  footer?: string,
  footer_icon?: string,
  ts?: number,
  fields?: SlackAttachField[]
}

interface SlackAttachField {
  title?: string,
  value?: string,
  short?: boolean
}
