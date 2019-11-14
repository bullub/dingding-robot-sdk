const Robot = require('../lib/Robot');

describe('Robot.js测试', () => {
  let robot;
  beforeEach(() => {
    robot = new Robot('你的机器人WEBHOOK', '你的签名串');
  });

  it('发送文本消息', async () => {
    const ret = await robot.sendText({
      content: '【监控告警】: 这是一条文本消息'
    });
    console.dir('文本消息ret: ', ret);
    expect(ret).toMatchObject({ errcode: 0, errmsg: 'ok' });
  }, 5000);

  it('发送链接消息', async () => {
    const ret = await robot.sendLink({
      title: '监控警告',
      text: '这是一个链接消息',
      messageUrl: 'https://www.baidu.com'
    });
    console.dir('链接消息ret: ', ret);
    expect(ret).toMatchObject({ errcode: 0, errmsg: 'ok' });
  }, 5000);

  it('发送markdown消息', async () => {
    const ret = await robot.sendMarkdown({
      title: '监控警告',
      text: '这是一个markdown消息\n# 大标题  \n## 稍小标题'
    });
    console.dir('链接消息ret: ', ret);
    expect(ret).toMatchObject({ errcode: 0, errmsg: 'ok' });
  }, 5000);

  it('发送行为卡片消息', async () => {
    const ret = await robot.sendActionCard({
      title: '乔布斯 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身',
      text: `![screenshot](@lADOpwk3K80C0M0FoA)
        ### 乔布斯 20 年前想打造的苹果咖啡厅 Apple Store 的设计正从原来满满的科技感走向生活化，
        而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划`,
      hideAvatar: '0',
      btnOrientation: '0',
      singleTitle: '阅读全文',
      singleURL: 'https://www.dingtalk.com/'
    });
    console.dir('链接消息ret: ', ret);
    expect(ret).toMatchObject({ errcode: 0, errmsg: 'ok' });
  }, 5000);

  it('发送FeedCard消息', async () => {
    const ret = await robot.sendFeedCard([
      {
        title: '时代的火车向前开',
        messageURL:
          'https://www.dingtalk.com/s?__biz=MzANjMwMTANg==&mid=&idx=&sn=daeabfdccaceaca&scene=&srcid=AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=&key=&ascene=&uin=&devicetype=android-&version=&nettype=WIFI',
        picURL: 'https://www.dingtalk.com/'
      },
      {
        title: '时代的火车向前开',
        messageURL:
          'https://www.dingtalk.com/s?__biz=MzANjMwMTANg==&mid=&idx=&sn=daeabfdccaceaca&scene=&srcid=AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=&key=&ascene=&uin=&devicetype=android-&version=&nettype=WIFI',
        picURL: 'https://www.dingtalk.com/'
      }
    ]);
    console.dir('链接消息ret: ', ret);
    expect(ret).toMatchObject({ errcode: 0, errmsg: 'ok' });
  }, 5000);
});
