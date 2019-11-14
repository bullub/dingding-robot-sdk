const crypto = require('crypto');
const assert = require('assert');
const https = require('https');
const iconv = require('iconv-lite');
const querystring = require('querystring');

const signature = Symbol('signature');
const send = Symbol('send');
const _webhookURL = Symbol('webhookURL');
const _secret = Symbol('secret');

/**
 * 机器人类
 */
class Robot {
  // [_webhookURL];
  // [_secret];
  /**
   *
   * @param {String} webhookURL 创建机器人时的钩子链接
   * @param {*} secret 如果设置了签名的方式，则需要传入
   */
  constructor(webhookURL, secret) {
    assert(typeof webhookURL === 'string' && webhookURL !== '');

    this[_webhookURL] = webhookURL;
    this[_secret] = secret;
  }

  [signature]() {
    const timestamp = Date.now();
    const stringToSign = `${timestamp}\n${this[_secret]}`;

    const hash = crypto
      .createHmac('sha256', this[_secret])
      .update(stringToSign, 'utf-8')
      .digest('base64');

    const sign = encodeURI(hash);
    return {
      timestamp,
      sign
    };
  }

  [send](messageBody) {
    let url = this[_webhookURL];
    if (this[_secret]) {
      url += '&' + querystring.stringify(this[signature]());
    }
    return new Promise((resolve, reject) => {
      const _url = new URL(url);
      const options = {
        host: _url.host,
        path: _url.pathname + _url.search,
        headers: {
          'Content-Type': 'application/json; charset=utf8'
        },
        method: 'POST'
      };
      console.dir(options);
      const req = https.request(options, res => {
        const data = [];
        let size = 0;
        res.on('data', chunk => {
          data.push(chunk);
          size += chunk.length;
        });
        res.on('end', () => {
          const buffer = Buffer.concat(data, size);
          const result = iconv.decode(buffer, 'utf-8');

          let _result;
          try {
            _result = JSON.parse(result);
          } catch (e) {
            _result = result;
          }

          resolve(_result);
        });
      });

      req.on('error', error => {
        reject(error);
      });

      console.dir(messageBody);

      req.write(JSON.stringify(messageBody) + '\n');
      req.end();
    });
  }

  /**
   * 发送文本消息
   * @param {content: String, atMobiles: List<String>, isAtAll: Boolean} message 发送的消息体
   */
  sendText({ content = '', atMobiles = null, isAtAll = false }) {
    const message = {
      msgtype: 'text',
      text: {
        content
      },
      at: {
        atMobiles,
        isAtAll
      }
    };

    return this[send](message);
  }

  /**
   * 发送链接消息
   * @param {title: String, text: String, messageUrl: String, picUrl: String} link 发送的消息体
   */
  sendLink({ title = '', text = '', messageUrl = '', picUrl = null }) {
    const message = {
      msgtype: 'link',
      link: {
        title,
        text,
        messageUrl,
        picUrl
      }
    };
    return this[send](message);
  }

  /**
   * 发送markdown消息
   * @param {title: String, text: String, atMobiles: List<String>, isAtAll: Boolean} markdownMessage markdown消息体
   */
  sendMarkdown({ title, text, atMobiles, isAtAll }) {
    const message = {
      msgtype: 'markdown',
      markdown: {
        title,
        text
      },
      at: {
        atMobiles,
        isAtAll
      }
    };
    return this[send](message);
  }

  /**
   * 发送行为卡片
   * @param {title: String, text: String, singleTitle: String, singleURL: String, btnOrientation: String, hideAvatar: String} markdownMessage 行为卡片消息体
   */
  sendActionCard({
    title,
    text,
    singleTitle,
    singleURL,
    btnOrientation,
    hideAvatar
  }) {
    const message = {
      actionCard: {
        title,
        text,
        hideAvatar,
        btnOrientation,
        singleTitle,
        singleURL
      },
      msgtype: 'actionCard'
    };
    return this[send](message);
  }

  /**
   * 发送FeedCard
   * @param {List<{title: String, messageURL: String, picURL: String}>} links 发送的FeedCard链接
   */
  sendFeedCard(links) {
    const message = {
      feedCard: {
        links
      },
      msgtype: 'feedCard'
    };
    return this[send](message);
  }
}

module.exports = Robot;
