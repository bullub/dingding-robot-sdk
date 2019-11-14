# 钉钉机器人SDK

#### Description
基于钉钉机器人API开发的一个简单易用的nodejs sdk

#### Software Architecture


#### Installation

```bash
npm install dingding-robot-sdk --save
```

#### Usage

```javascript
const Robot = require('dingding-robot-sdk');


// webhookURL请通过钉钉机器人添加页面查看相关资料获取， yourToken是可选的，如果你开启了使用token的话，则必传
const robot = new Robot(webhookURL, yourToken);

/**
 * 发送文本消息
 * @param {content: String, atMobiles: List<String>, isAtAll: Boolean} message 发送的消息体
 */
robot.sendText({
  content,
  atMobiles,
  isAtAll
});

/**
 * 发送链接消息
 * @param {title: String, text: String, messageUrl: String, picUrl: String} link 发送的消息体
 */
robot.sendLink({
  title,
  text,
  messageUrl,
  picUrl
});

/**
 * 发送markdown消息
 * @param {title: String, text: String, atMobiles: List<String>, isAtAll: Boolean} markdownMessage markdown消息体
 */
robot.sendMarkdown({
  title, 
  text, 
  atMobiles, 
  isAtAll
});

/**
 * 发送行为卡片
 * @param {title: String, text: String, singleTitle: String, singleURL: String, btnOrientation: String, hideAvatar: String} markdownMessage 行为卡片消息体
 */
robot.sendActionCard({
  title,
  text,
  singleTitle,
  singleURL,
  btnOrientation,
  hideAvatar
});

/**
 * 发送FeedCard
 * @param {List<{title: String, messageURL: String, picURL: String}>} links 发送的FeedCard链接
 */
robot.sendFeedCard(links);

```


#### Contribution

1.  Fork the repository
2.  Create Feat_xxx branch
3.  Commit your code
4.  Create Pull Request

