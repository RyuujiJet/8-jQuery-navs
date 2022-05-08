const $siteList = $('.list')
const $lastLi = $('.lastLi')
const xObject = JSON.parse(localStorage.getItem('x'))
const hashMap = xObject || [
    {logo: 'B', url: 'https://www.baidu.com'},
    {logo: 'T', url: 'https://www.taobao.com'}
]

const render = () => {
    $siteList.find('li:not(.lastLi)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <a href='${node.url}'>
                <div class="item">
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-closefill"></use>
                        </svg>
                    </div>
                    <div class="logo">${node.logo}</div>
                    <div class="site">${simplyfyUrl(node.url)}</div>
                </div>
            </a>
        </li>`).insertBefore($lastLi)
        $li.on('click', '.close', (e) => {
            hashMap.splice(index, 1)
            render()
            return false
        })
    })
}

const simplyfyUrl = (url) => {
    if (url) {
        return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '')
    }
}
const simplyfyUrl2 = (url) => {
    if (url) {
        return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '').replace('.com', '')
    }       
}

render()

$('.add').on('click', () => {
    let url = window.prompt('要添加的网址：')
    if (url) {
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        
        let logoArr = []
        hashMap.forEach(item => {
            logoArr.push(item.logo.toLowerCase())
        })
        let urlArr = simplyfyUrl2(url).split("")
        const arr = [...logoArr, ...urlArr]
        const newArr = arr.filter(item => {
            return !logoArr.includes(item) && urlArr.includes(item)
        })
        let logo = null
        if (newArr && newArr.length > 0) {
            logo = newArr[0].toUpperCase()
        } else {
            logo = simplyfyUrl2(url)[0].toUpperCase()
        }
        
        hashMap.push({logo: logo, url: url})
        render()
    }
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

// 键盘事件
$(document).on('keypress', (e) => {
    const {key} = e
    for (let i = 0; i< hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})