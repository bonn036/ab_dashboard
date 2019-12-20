import Mock from 'mockjs'

const products = Mock.mock({
  'items': [
    {
      uscc: '91340500MA2RJ62J30',
      title: '税票贷',
      group: 2,
      content: ' \
      产品名称：税票贷 \
      利率：银行成本7% -14 % +咨询服务费3 % \
      额度上限：1000万 \
      授信期限：授信一年，随借随还 \
      还款方式：先息后本，等额本息 \
      收款账户：公司账户 \ 法人账户 \
      资质要求：企业注册2年以上 \
      申请条件：\
      1. 近12个月纳税2万以上 \
      2. 税务登记ABMC级 \
      3. 企业年开票50万以上 \
      资料要求： \
      1. 法人身份证 \
      2. 法人四大行任一银行贷记卡一张 \
      3. 法人商业银行贷记卡一张 \
      4. 企业营业执照 \
      5. 企业财务税控盘，国家税务局登录账号和密码 \
      6. 法人征信报告及企业征信报告一份 \
      其他要求： \
      操作期间法人全程配合，提供验证码及人脸识别操作等 \
      '
    },
    {
      uscc: '91110114MA01K53XXJ',
      title: '发票贷',
      group: 1,
      content: 'descriptions'
    },
  ]
})

export default [
  {
    url: '/product/list',
    type: 'get',
    response: config => {
      return {
        status: 200,
        data: products.items
      }
    }
  }
]
