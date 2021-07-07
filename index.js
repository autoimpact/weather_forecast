////////////////////////全域變數庫////////////////////////////

const baseUrl =
  'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-7EDB96C0-6E90-4D03-B07B-C30AFAE4C8B1'

const cityList = [
  '臺北市',
  '新北市',
  '桃園市',
  '新竹市',
  '苗栗縣',
  '臺中市',
  '彰化縣',
  '雲林縣',
  '嘉義市',
  '嘉義縣',
  '臺南市',
  '高雄市',
  '屏東縣',
  '臺東縣',
  '花蓮縣',
  '宜蘭縣',
  '基隆市'
];

const body = document.querySelector('body')
const dropdown = document.querySelector('.dropdown-menu')
const output = document.querySelector('.output')

////////////////////////函式庫////////////////////////////

// 將陣列裡的城市名稱放入 dropdown-menu //
function dropdownItemGenerator() {
  for (let i = 0; i < cityList.length; i++) {
    const div = document.createElement("div")
    div.classList.add('dropdown-item-wrap')
    div.innerHTML = `<a class="dropdown-item" href="#">${cityList[i]}</a>`
    dropdown.appendChild(div)
  }
}

// API 串接，生成每個城市的天氣資訊卡（CSS 初始設定為 hidden） //
function displayGenerator(city) {
  axios.get(baseUrl + `&format=JSON&locationName=${city}`)
    .then(function (response) {
      console.log(response)

      //*變數設定＊//      
      const statusValue = response.data.records.location[0].weatherElement[0].time[0].parameter.parameterName
      const minValue = response.data.records.location[0].weatherElement[2].time[2].parameter.parameterName
      const maxValue = response.data.records.location[0].weatherElement[4].time[2].parameter.parameterName
      const feeling = response.data.records.location[0].weatherElement[3].time[2].parameter.parameterName

      //*印出天氣資訊，但屬性為 hidden，所以看不到＊//
      let display = document.createElement('div')
      display.classList.add('display')
      display.innerHTML = `
      <div class="display-left">
        <h4>${city}</h4>
        <i class="bi bi-x-square-fill"></i>
      </div>
      <div class="display-right">
        <p class="status">${statusValue}</p>
        <p class="temperature">${minValue}～${maxValue}°C</p>
        <p class="feeling">${feeling}</p>
      </div>
      `
      output.appendChild(display)
    })
}

//////////////////////執行/////////////////////////////

dropdownItemGenerator()

// 設定事件監聽 ＠dropdown-list //
const btn = document.querySelector('.dropdown-menu')
btn.addEventListener('click', function (event) {
  const target = event.target
  console.log(target)
  const cityName = target.innerText

  // 限定點擊位置，綁定呈現結果 //
  if (target.matches('.dropdown-item')) {
    // 1) 顯示該城市天氣資訊卡 //
    displayGenerator(cityName)
    // 2) 在 dropdown-lsit 隱藏已呈現的資訊卡 //
    const toBeDelete = target.parentElement
    dropdown.removeChild(toBeDelete)
    console.log(dropdown)
  }
})


// 設定事件監聽 @城市天氣資訊卡 //
output.addEventListener('click', function (event) {
  const offPoint = event.target
  console.log(offPoint)
  if (offPoint.matches('.bi')) {
    // 1) 關閉該城市天氣資訊卡 //
    const onNode = offPoint.parentElement.parentElement
    onNode.hidden = true
    // 2) 將關閉的城市按鈕重新開啟於 dropdown-lsit  //
    const cityText = offPoint.previousElementSibling.textContent
    const div = document.createElement("div")
    div.classList.add('dropdown-item-wrap')
    div.innerHTML = `<a class="dropdown-item" href="#">${cityText}</a>`
    dropdown.appendChild(div)
    console.log(dropdown)
  }
})


// 消除 dropdown list 無按鈕時多餘的白邊 //
if (dropdown.hasChildNodes() === false) {
  document.querySelector('.btn').toggle()
  // } else {
  //   dropdown.remove('disabled')
}