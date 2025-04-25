// 获取元素(第一个和第二个li)
const li1 = document.querySelector('.xtx_navs li:nth-child(1)')
const li2 = li1.nextElementSibling
//声明渲染函数
function render() {
  // 读取本地用户名
  const uname = localStorage.getItem('xtx-uname')
  // 设置条件
  if (uname) {
    // 如果有值则获取本地存储中的用户名name
    li1.innerHTML = `<a href="javascript:;"><i class="iconfont icon-user">${uname}</i></a>`
    // 将登录改为退出登录
    li2.innerHTML = `<a href="javascript:;">退出登录</a>`
  } else {
    // 如果没有值就请先登录并点击后跳转到登录页面
    li1.innerHTML = '<a href="./login.html">请先登录</a>'
    // 同上
    li2.innerHTML = '<a href="./register.html">免费注册</a>'
  }
}
render()//调用函数重新渲染页面
// 点击退出登录模块
// 退出登录后要删除本地存储；li2添加点击事件
li2.addEventListener('click', function () {
  localStorage.removeItem('xtx-uname')
  render()//在事件里面渲染是因为需要在点击退出时就刷新页面
})

// 电梯
// 第一部分；页面滑动可显示和隐藏；点击顶部返回顶部
function xtx_top() {
  // 要求被卷去的头部大于300时，显示侧边电梯栏；点击顶部时返回顶部
  // 获取元素
  const elevator = document.querySelector('.xtx-elevator')
  // 获取顶部元素
  const backTop = document.querySelector('#backTop')
  // 添加事件
  window.addEventListener('scroll', function () {
    const n = document.documentElement.scrollTop
    // console.log(n)
    // 条件
    // if (n >= 300) {
    //   elevator.style.opacity = 1
    // } else {
    //   elevator.style.opacity = 0
    // }
    elevator.style.opacity = n >= 300 ? 1 : 0
  })
  // 给顶部添加点击事件,使点击后返回顶部
  backTop.addEventListener('click', function () {
    scrollTo(0, 0)
  })
}
xtx_top()
// 第二部分第三部分
function xtx_a() {
  // 获取电梯导航栏元素
  const list = document.querySelector('.xtx-elevator-list')
  list.addEventListener('click', function (e) {
    // 设置条件；当点击的是a时，给a的内容颜色active
    if (e.target.tagName === 'A' && e.target.dataset.name) {//e.target.dataset.name要求能获取得到自定义属性的name，否则不执行赋值active
      // 先移除原来就有的active类名；这里不能使用之前的方法，因为起始时是获取不到active的（都没有active属性）
      // document.querySelector('.xtx-elevator-list .active').classList.remove('active')//这样的方法会报错
      // 先获取这个类名(active);old:原来;;old里面只有两个值要么是active或null
      const old = document.querySelector('.xtx-elevator-list .active')//如果获取到有active就会返回old(真)，则返回null(假。不执行)
      if (old) old.classList.remove('active')//设置条件，如果是old就删除；如果是null就不执行；这里可以不用{}
      // if(old){old.classList.remove('active')}
      // 如果old没有获得到active则就添加active
      e.target.classList.add('active')//给所点击的对象active；e.target点击的对象
    }
    // 获取自定义属性 new  popular  brand  ;在DOM对象上一律以dataset对象方式获取
    // console.log(e.target.dataset.name)//
    //根据盒子的自定义属性值去选择对应的大盒子;
    // console.log(document.querySelector(`.xtx_goods_${e.target.dataset.name}`).offsetTop)
    //并且获得元素自己距离父级元素(document)的top距离;

    // 页面滚动到相对应的位置
    const top = document.querySelector(`.xtx_goods_${e.target.dataset.name}`).offsetTop
    document.documentElement.scrollTop = top
  })


  //3.页面滚动自动选择小盒子添加active类
  //添加滚动事件
  window.addEventListener('scroll', function () {//页面一滚动就删除active类
    // 获取元素
    const old = document.querySelector('.xtx-elevator-list .active')
    // 条件；删除或增加active类
    if (old) old.classList.remove('active')
    // 获取四个大盒子元素
    const news = document.querySelector('.xtx_goods_new')
    const popular = document.querySelector('.xtx_goods_popular')
    const brand = document.querySelector('.xtx_goods_brand')
    const topic = document.querySelector('.xtx_goods_topic')
    //获取被卷去的头部
    const n = document.documentElement.scrollTop
    // 设置条件
    if (n >= news.offsetTop && n < popular.offsetTop) {
      //当被卷去的头部距离大于大盒子new距离顶部的距离时，给小盒子new添加active
      document.querySelector('[data-name=new]').classList.add('active')
    } else if (n >= popular.offsetTop && n < brand.offsetTop) {
      document.querySelector('[data-name=popular]').classList.add('active')
    } else if (n >= brand.offsetTop && n < topic.offsetTop) {
      document.querySelector('[data-name=brand]').classList.add('active')
    } else if (n >= topic.offsetTop) {
      document.querySelector('[data-name=topic]').classList.add('active')
    }
  })
}
xtx_a()