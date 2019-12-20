import Mock from 'mockjs'

const enterprises = Mock.mock({
  'items': [
    {
      uscc: '91340500MA2RJ62J30',
      name: '安徽子诚商务信息咨询有限公司',
      area: '安徽',
      art_cid: '110101199810011011',
      found_date: 'Fri, 09 Mar 2018 00:00:00 GMT'
    },
    {
      uscc: '91110114MA01K53XXJ',
      name: '北京时代引领网络科技有限公司',
      area: '北京',
      art_cid: '110102200108012008',
      found_date: 'Wed, 15 May 2019 00:00:00 GMT'
    },
  ]
})

export default [
  {
    url: '/enterprise/list',
    type: 'get',
    response: req => {
      return {
        status: 200,
        data: enterprises.items
      }
    }
  },
  {
    url: '/enterprise/info',
    type: 'post',
    response: req => {
      const { uscc } = req.body
      var item = null
      for (var i = 0; i < enterprises.items.length; i++) {
        if (enterprises.items[i].uscc == uscc)
          item = enterprises.items[i]

      }
      return {
        status: 200,
        data: item
      }
    }
  }
]
