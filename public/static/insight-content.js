// 인사이트 본문의 명령문·목록 상자(pre)에 '복사' 버튼을 붙인다
document.querySelectorAll('.ins-detail-content pre').forEach(function (pre) {
  var btn = document.createElement('button')
  btn.type = 'button'
  btn.className = 'ins-copy-btn'
  btn.textContent = '복사'
  btn.addEventListener('click', function () {
    var text = pre.querySelector('code') ? pre.querySelector('code').innerText : pre.innerText
    navigator.clipboard.writeText(text).then(function () {
      btn.textContent = '복사됨'
      btn.classList.add('done')
      setTimeout(function () { btn.textContent = '복사'; btn.classList.remove('done') }, 1600)
    })
  })
  pre.appendChild(btn)
})
