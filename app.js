// ==========================================================================
// 厦门70岁生日家庭行程 WebApp - 核心交互逻辑 (Centralized Data Version)
// ==========================================================================

// --- 1. 全局应用状态 ---
let currentVersion = 6;       // 默认 6 天 5 晚版 (5或6)
let seniorsModeActive = false; // 老人大字模式
let todayModeActive = false;   // 只看今天模式
let currentLightboxIdx = 0;   // 灯箱相册当前索引
let currentDayTab = 1;         // 当前激活的日程卡 Tab
let unfinishedOnlyCheck = false; // 清单只看未完成

// --- 2. 核心数据源 (Trip Centralized Data) ---
const tripData = {
  // 6天和5天的每日详情定义
  5: [
    {
      dayNum: 1, date: "7月29日", weekday: "周三", theme: "安溪温泉",
      hotel: "安溪悦泉行馆", intensity: "低（轻度舒缓）", transit: "高铁抵厦 ➔ MPV自驾进山",
      goals: "安全抵达安溪、办理入住、山林温泉洗尘、早睡歇息",
      todayNextEvent: "12:00 厦门北站取7座MPV自驾进山",
      todayDeparture: "08:00 广州东站高铁出发",
      todayTransit: "高品MPV (租车已备安全座椅)",
      todayDest: "安溪悦泉行馆",
      todayCarry: ["身份证件原件", "长辈降压药/常用药", "防晒帽/晴雨两用伞"],
      todayFallback: "⛈️ 若高铁延误超2小时，直接取消茶园散步，入店先晚餐再泡汤，避免空腹泡汤。",
      todayMapUrl: "https://uri.amap.com/marker?position=117.98638,25.07474&name=安溪悦泉行馆",
      image: "anxi_resort.webp", imageCaption: "安溪悦泉行馆 · 绿林温泉私享", imageCredit: "安溪悦泉行馆官方",
      steps: [
        { icon: "🚄", time: "上午", label: "高铁抵厦" },
        { icon: "🚙", time: "12:00", label: "北站取车" },
        { icon: "♨️", time: "下午", label: "茶山泡汤" },
        { icon: "🍲", time: "晚上", label: "农家晚宴" }
      ],
      timeline: [
        { time: "08:00", type: "morn", label: "广州出发", text: "广州东站搭乘高铁前往厦门北站，长辈备足饮用水与随身药。" },
        { time: "12:00", type: "noon", label: "北站取车", text: "抵达厦门北，由爸爸取7座商务MPV，现场调试儿童座椅与大件行李空间。" },
        { time: "12:15", type: "noon", label: "简单午餐", text: "车站附近解决简单快餐，避免长辈饥饿，随后自驾1.5小时前往安溪。" },
        { time: "14:00", type: "aft", label: "行馆入住", text: "办理安溪悦泉行馆入住，在清茶与古琴声中办理登记，午休1.5小时。" },
        { time: "17:00", type: "eve", label: "私泉泡汤", text: "在别院私享天然铁观音温泉，长辈单次控制在20-30分钟，多次补水。" },
        { time: "19:00", type: "night", label: "行馆晚宴", text: "中餐厅享用养生茶乡家常菜，提前交代后厨少辣少盐，清淡爽口。" }
      ]
    },
    {
      dayNum: 2, date: "7月30日", weekday: "周四", theme: "琴岛漫步",
      hotel: "鼓浪屿晃岩36号", intensity: "中（坡路较多）", transit: "自驾回厦 ➔ 华府寄箱 ➔ 的士 ➔ 14:30轮渡上岛",
      goals: "寄存大行李于岛内、轻装上岛、体验老别墅、私导人文导览",
      todayNextEvent: "14:30 东渡邮轮中心登船上岛",
      todayDeparture: "09:30 安溪悦泉行馆退房出发",
      todayTransit: "轮渡 (已关联老别墅管家行李协助)",
      todayDest: "鼓浪屿晃岩36号",
      todayCarry: ["身份证件原件 (检票必带)", "鼓浪屿过夜包 (严禁背大箱)", "防蚊贴/喷雾"],
      todayFallback: "⛵ 若因台风/大风轮渡临时停航，直接留在岛内入住华尔道夫，绝不上岛涉险。",
      todayMapUrl: "https://uri.amap.com/marker?position=118.0628,24.44498&name=鼓浪屿晃岩36号",
      image: "gulangyu_island.webp", imageCaption: "鼓浪屿 · 闽南红砖别墅与海滩", imageCredit: "鼓浪屿官网",
      steps: [
        { icon: "🎒", time: "上午", label: "华府寄箱" },
        { icon: "🚢", time: "14:30", label: "乘轮渡登岛" },
        { icon: "🏡", time: "下午", time: "下午", label: "入住晃岩" },
        { icon: "🗣️", time: "17:00", label: "老别墅导览" }
      ],
      timeline: [
        { time: "09:30", type: "morn", label: "自驾返厦", text: "悦泉退房，驾车返回厦门岛内，车程约1.5小时。" },
        { time: "11:00", type: "morn", label: "华府寄存", text: "抵达华尔道夫寄存所有大行李箱；全家仅带双肩过夜包轻装上岛。" },
        { time: "11:30", type: "noon", label: "还车打车", text: "厦门北站/市区网点还车，打车前往东渡客运中心。" },
        { time: "13:30", type: "noon", label: "码头候船", text: "抵达东渡邮轮中心，走绿色安检通道，至少提前45分钟到场。" },
        { time: "14:30", type: "aft", label: "轮渡登岛", text: "乘轮渡前往鼓浪屿三丘田码头，长辈坐在一楼船舱休息防晃。" },
        { time: "15:15", type: "aft", label: "入住晃岩", text: "步行至晃岩36号别墅，安排长辈和小孩午休避暑，管家托运行李。" },
        { time: "17:00", type: "eve", label: "避人讲解", text: "私人导游带路，沿平路讲解日光岩外围别墅历史，不爬高不爬山。" },
        { time: "19:00", type: "night", label: "闽南小吃", text: "在岛上享用特色闽南清淡小吃（扁食、鱼丸），避开喧嚣早回客栈休息。" }
      ]
    },
    {
      dayNum: 3, date: "7月31日", weekday: "周五", theme: "舌尖华府",
      hotel: "厦门华尔道夫酒店", intensity: "中（夜游中山路）", transit: "轮渡下岛 ➔ 的士前往华尔道夫",
      goals: "海岛清晨避人散步、下岛入住华府、享用鲜承午宴、夜游中山路骑楼",
      todayNextEvent: "13:30 华府鲜承精致中餐 (已定)",
      todayDeparture: "11:00 三丘田码头乘船离岛",
      todayTransit: "的士与轮渡",
      todayDest: "厦门华尔道夫酒店",
      todayCarry: ["身份证件", "空腹 (留足肚子享用大餐)", "遮阳伞/防晒霜"],
      todayFallback: "🌧️ 若晚间大雨，取消中山路夜游，改为在华尔道夫行政酒廊或客房内喝甜点放空。",
      todayMapUrl: "https://uri.amap.com/marker?position=118.1187,24.4795&name=厦门华尔道夫酒店",
      image: "waldorf_dining.webp", imageCaption: "华尔道夫 · 鲜承精致中餐体验", imageCredit: "华尔道夫官网",
      steps: [
        { icon: "🌊", time: "清晨", label: "琴岛散步" },
        { icon: "⛴️", time: "11:00", label: "离岛下岛" },
        { icon: "🍽️", time: "13:30", label: "鲜承午宴" },
        { icon: "🏮", time: "晚上", label: "中山路游" }
      ],
      timeline: [
        { time: "07:30", type: "morn", label: "避人散步", text: "在游人未上岛前，在晃岩周边清幽小径散步，拍照极佳。" },
        { time: "09:00", type: "morn", label: "别墅早餐", text: "在晃岩享用精致家庭式早餐，收拾行装。" },
        { time: "11:00", type: "morn", label: "乘船离岛", text: "从三丘田码头乘船返回市区，打车前往华尔道夫酒店。" },
        { time: "12:00", type: "noon", label: "登记入住", text: "到华尔道夫取行李并办理入住，如房间未好则先去餐厅。" },
        { time: "13:30", type: "noon", label: "鲜承大餐", text: "中餐厅【鲜承 HOKKLO】享用高品质闽粤菜，庆祝旅行过半。" },
        { time: "15:30", type: "aft", label: "华府午休", text: "前两日走动多，下午在奢华客房进行3小时充足大午休恢复体能。" },
        { time: "19:00", type: "night", label: "骑楼夜游", text: "打车前往中山路，在骑楼下品尝花生汤，在鹭江道看鼓浪屿夜景。" }
      ]
    },
    {
      dayNum: 4, date: "8月1日", weekday: "周六", theme: "海湾庆生",
      hotel: "厦门七尚酒店", intensity: "低（慢享海湾）", transit: "退房 ➔ 的士前往七尚（车程20分钟）",
      goals: "七尚海湾慢憩、五缘湾游艇吹海风、奶奶70岁生日晚宴全家合影",
      todayNextEvent: "19:00 厦餐厅七十岁生日家宴",
      todayDeparture: "13:30 华府退房前往七尚",
      todayTransit: "的士",
      todayDest: "厦门七尚酒店",
      todayCarry: ["好事发生桌面立牌", "庆生卡片", "单反相机"],
      todayFallback: "💨 若下午风浪大游艇取消，改为在七尚中堂喝海湾下午茶，生日宴照常进行。",
      todayMapUrl: "https://uri.amap.com/marker?position=118.1754,24.5165&name=厦门七尚酒店",
      image: "lohkah_resort.webp", imageCaption: "七尚酒店 · 宁静五缘海湾景致", imageCredit: "七尚酒店官网",
      steps: [
        { icon: "🏊", time: "上午", label: "华府泳池" },
        { icon: "🚗", time: "13:30", label: "换店七尚" },
        { icon: "⛵", time: "17:00", label: "游艇出海" },
        { icon: "🎂", time: "19:00", label: "生日家宴" }
      ],
      timeline: [
        { time: "09:30", type: "morn", label: "华府早餐", text: "在华尔道夫享用丰盛早餐，小孩可在恒温泳池玩耍。" },
        { time: "13:30", type: "noon", label: "前往七尚", text: "退房打车前往五缘湾七尚酒店，前台申请排相邻房间。" },
        { time: "14:30", type: "aft", label: "海湾小憩", text: "七尚入住，在海湾套房内充分午休，避开正午烈日。" },
        { time: "17:00", type: "aft", label: "游艇出海", text: "包豪华游艇出海1小时，配遮阳棚，吹海风看鹭鸥，老人孩子皆宜。" },
        { time: "18:50", type: "eve", label: "包房布置", text: "提前10分钟进入包房，摆设庆生牌、红包，拍摄70大寿全家福。" },
        { time: "19:00", type: "night", label: "生日家宴", text: "厦餐厅享用生日宴，品尝黑金片皮鸭、敬茶、分吃长寿面。" }
      ]
    },
    {
      dayNum: 5, date: "8月2日", weekday: "周日", theme: "轻松返程",
      hotel: "温馨的家", intensity: "低（乘车回家）", transit: "退房 ➔ 的士 ➔ 厦门北站 ➔ 高铁广州东",
      goals: "湾畔早餐、收拾行李、安全舒适返回广州",
      todayNextEvent: "13:30 厦门北站大厅候车进站",
      todayDeparture: "10:30 仔细理清行囊，12:00出发",
      todayTransit: "高铁回穗",
      todayDest: "温馨的家 (广州东站)",
      todayCarry: ["全部随身衣服/充电器", "返程车票信息", "身份证原件"],
      todayFallback: "🚄 若高铁时间微调提前，直接取消上午散步，早餐后即退房出发，确保提早1小时到站。",
      todayMapUrl: "https://uri.amap.com/marker?position=118.073426,24.638421&name=厦门北站",
      image: "xiamen_travel_banner.webp", imageCaption: "山海团圆 · 顺利安全返程", imageCredit: "中国铁路官网",
      steps: [
        { icon: "🍳", time: "上午", label: "海湾早餐" },
        { icon: "🎒", time: "上午", label: "清点行李" },
        { icon: "🚙", time: "12:00", label: "去往北站" },
        { icon: "🚄", time: "下午", label: "安全抵穗" }
      ],
      timeline: [
        { time: "08:30", type: "morn", label: "临水早餐", text: "在七尚水畔阳台享用早餐，逐笔核对两房退房账单与FHR额度抵扣。" },
        { time: "10:30", type: "morn", label: "收拾行囊", text: "清点全家证件、常用药品、手机充电线等，将大行李打包装车。" },
        { time: "12:00", type: "noon", label: "退房出发", text: "办理退房，乘车前往厦门北站，留足75分钟车程与安检富余。" },
        { time: "13:30", type: "noon", label: "车站候车", text: "北站大厅进站，两大成人分工看行李与拿水，长辈和小孩在座椅休息。" },
        { time: "下午", type: "aft", label: "返抵广州", text: "乘坐高铁安全返回广州东站，结束温馨舒适的七十寿辰团圆感恩之旅！" }
      ]
    }
  ],
  6: [
    {
      dayNum: 1, date: "7月29日", weekday: "周三", theme: "安溪温泉",
      hotel: "安溪悦泉行馆", intensity: "低（轻度舒缓）", transit: "高铁抵厦 ➔ MPV自驾进山",
      goals: "安全抵达安溪、办理入住、山林温泉洗尘、早睡歇息",
      todayNextEvent: "12:00 厦门北站取7座MPV自驾进山",
      todayDeparture: "08:00 广州东站高铁出发",
      todayTransit: "高品MPV (租车已备安全座椅)",
      todayDest: "安溪悦泉行馆",
      todayCarry: ["身份证件原件", "长辈降压药/常用药", "防晒帽/晴雨两用伞"],
      todayFallback: "⛈️ 若高铁延误超2小时，直接取消下午茶园散步，入店先晚餐再泡汤，避免空腹泡汤。",
      todayMapUrl: "https://uri.amap.com/marker?position=117.98638,25.07474&name=安溪悦泉行馆",
      image: "anxi_resort.webp", imageCaption: "安溪悦泉行馆 · 绿林温泉私享", imageCredit: "安溪悦泉行馆官方",
      steps: [
        { icon: "🚄", time: "上午", label: "高铁抵厦" },
        { icon: "🚙", time: "12:00", label: "北站取车" },
        { icon: "♨️", time: "下午", label: "茶山泡汤" },
        { icon: "🍲", time: "晚上", label: "农家晚宴" }
      ],
      timeline: [
        { time: "08:00", type: "morn", label: "广州出发", text: "广州东站搭乘高铁前往厦门北站，长辈备足饮用水与随身药。" },
        { time: "12:00", type: "noon", label: "北站取车", text: "抵达厦门北，由爸爸取7座商务MPV，现场调试儿童座椅与大件行李空间。" },
        { time: "12:15", type: "noon", label: "简单午餐", text: "车站附近解决简单快餐，避免长辈饥饿，随后自驾1.5小时前往安溪。" },
        { time: "14:00", type: "aft", label: "行馆入住", text: "办理安溪悦泉行馆入住，在清茶与古琴声中办理登记，午休1.5小时。" },
        { time: "17:00", type: "eve", label: "私泉泡汤", text: "在别院私享天然铁观音温泉，长辈单次控制在20-30分钟，多次补水。" },
        { time: "19:00", type: "night", label: "行馆晚宴", text: "中餐厅享用养生茶乡家常菜，提前交代后厨少辣少盐，清淡爽口。" }
      ]
    },
    {
      dayNum: 2, date: "7月30日", weekday: "周四", theme: "琴岛漫步",
      hotel: "鼓浪屿晃岩36号", intensity: "中（坡路较多）", transit: "自驾回厦 ➔ 华府寄箱 ➔ 的士 ➔ 14:30轮渡上岛",
      goals: "寄存大行李于岛内、轻装上岛、体验老别墅、私导人文导览",
      todayNextEvent: "14:30 东渡邮轮中心登船上岛",
      todayDeparture: "09:30 安溪悦泉行馆退房出发",
      todayTransit: "轮渡 (已关联老别墅管家行李协助)",
      todayDest: "鼓浪屿晃岩36号",
      todayCarry: ["身份证件原件 (检票必带)", "鼓浪屿过夜包 (严禁背大箱)", "防蚊贴/喷雾"],
      todayFallback: "⛵ 若因台风/大风轮渡临时停航，直接留在岛内入住华尔道夫，绝不上岛涉险。",
      todayMapUrl: "https://uri.amap.com/marker?position=118.0628,24.44498&name=鼓浪屿晃岩36号",
      image: "gulangyu_island.webp", imageCaption: "鼓浪屿 · 闽南红砖别墅与海滩", imageCredit: "鼓浪屿官网",
      steps: [
        { icon: "🎒", time: "上午", label: "华府寄箱" },
        { icon: "🚢", time: "14:30", label: "乘轮渡登岛" },
        { icon: "🏡", time: "下午", label: "入住晃岩" },
        { icon: "🗣️", time: "17:00", label: "老别墅导览" }
      ],
      timeline: [
        { time: "09:30", type: "morn", label: "自驾返厦", text: "悦泉退房，驾车返回厦门岛内，车程约1.5小时。" },
        { time: "11:00", type: "morn", label: "华府寄存", text: "抵达华尔道夫寄存所有大行李箱；全家仅带双肩过夜包轻装上岛。" },
        { time: "11:30", type: "noon", label: "还车打车", text: "厦门北站/市区网点还车，打车前往东渡客运中心。" },
        { time: "13:30", type: "noon", label: "码头候船", text: "抵达东渡邮轮中心，走绿色安检通道，至少提前45分钟到场。" },
        { time: "14:30", type: "aft", label: "轮渡登岛", text: "乘轮渡前往鼓浪屿三丘田码头，长辈坐在一楼船舱休息防晃。" },
        { time: "15:15", type: "aft", label: "入住晃岩", text: "步行至晃岩36号别墅，安排长辈和小孩午休避暑，管家托运行微型行李。" },
        { time: "17:00", type: "eve", label: "避人讲解", text: "私人导游带路，沿平路讲解日光岩外围老房，不爬高。" },
        { time: "19:00", type: "night", label: "闽南小吃", text: "在岛上享用特色闽南清淡小吃，避开人潮早回客栈休息。" }
      ]
    },
    {
      dayNum: 3, date: "7月31日", weekday: "周五", theme: "舌尖华府",
      hotel: "厦门华尔道夫酒店", intensity: "中（夜游中山路）", transit: "轮渡下岛 ➔ 的士前往华尔道夫",
      goals: "海岛清晨避人散步、下岛入住华府、享用鲜承午宴、夜游中山路骑楼",
      todayNextEvent: "13:30 华府鲜承精致中餐 (已定)",
      todayDeparture: "11:00 三丘田码头乘船离岛",
      todayTransit: "的士与轮渡",
      todayDest: "厦门华尔道夫酒店",
      todayCarry: ["身份证件", "空腹 (留足肚子享用大餐)", "遮阳伞/防晒霜"],
      todayFallback: "🌧️ 若晚间大雨，取消中山路夜游，改为在华尔道夫行政酒廊或客房内喝甜品放空。",
      todayMapUrl: "https://uri.amap.com/marker?position=118.1187,24.4795&name=厦门华尔道夫酒店",
      image: "waldorf_dining.webp", imageCaption: "华尔道夫 · 鲜承精致中餐体验", imageCredit: "华尔道夫官网",
      steps: [
        { icon: "🌊", time: "清晨", label: "琴岛散步" },
        { icon: "⛴️", time: "11:00", label: "离岛下岛" },
        { icon: "🍽️", time: "13:30", label: "鲜承午宴" },
        { icon: "🏮", time: "晚上", label: "中山路游" }
      ],
      timeline: [
        { time: "07:30", type: "morn", label: "避人散步", text: "在游人未上岛前，在晃岩周边清幽小径散步，拍照极佳。" },
        { time: "09:00", type: "morn", label: "别墅早餐", text: "在晃岩享用配置丰富家庭式早餐，收拾随身行李。" },
        { time: "11:00", type: "morn", label: "乘船离岛", text: "从三丘田码头乘船返回市区，打车前往华尔道夫酒店。" },
        { time: "12:00", type: "noon", label: "登记入住", text: "到华尔道夫取大行李箱，前台预办理房间入住。" },
        { time: "13:30", type: "noon", label: "鲜承午宴", text: "中餐厅【鲜承 HOKKLO】享用高档特色闽菜，庆祝旅行过半。" },
        { time: "15:30", type: "aft", label: "华府午休", text: "前两日走动较多，下午在房间内进行大午睡休整。" },
        { time: "19:00", type: "night", label: "骑楼夜游", text: "打车至中山路步行街，在骑楼廊柱下喝花生汤，赏鹭江两岸夜色。" }
      ]
    },
    {
      dayNum: 4, date: "8月1日", weekday: "周六", theme: "海湾庆生",
      hotel: "厦门七尚酒店", intensity: "低（慢享海湾）", transit: "退房 ➔ 的士前往七尚（车程20分钟）",
      goals: "七尚海湾慢憩、五缘湾游艇吹海风、预备寿宴布置及全家合影",
      todayNextEvent: "19:00 厦餐厅七十岁生日家宴",
      todayDeparture: "13:30 华府退房前往七尚",
      todayTransit: "的士",
      todayDest: "厦门七尚酒店",
      todayCarry: ["好事发生桌面立牌", "庆生卡片", "单反相机"],
      todayFallback: "💨 若下午风浪大游艇取消，改为在七尚中堂喝海湾下午茶，生日宴照常进行。",
      todayMapUrl: "https://uri.amap.com/marker?position=118.1754,24.5165&name=厦门七尚酒店",
      image: "lohkah_resort.webp", imageCaption: "七尚酒店 · 宁静五缘海湾景致", imageCredit: "七尚酒店官网",
      steps: [
        { icon: "🏊", time: "上午", label: "华府泳池" },
        { icon: "🚗", time: "13:30", label: "换店七尚" },
        { icon: "⛵", time: "17:00", label: "游艇出海" },
        { icon: "🎂", time: "19:00", label: "生日家宴" }
      ],
      timeline: [
        { time: "09:30", type: "morn", label: "华府早餐", text: "在华尔道夫享用丰盛早餐，小孩可在恒温泳池玩耍。" },
        { time: "13:30", type: "noon", label: "前往七尚", text: "退房打车前往五缘湾七尚酒店，前台申请排相邻房间。" },
        { time: "14:30", type: "aft", label: "海湾小憩", text: "七尚入住，在海湾套房内充分午休，避开正午烈日。" },
        { time: "17:00", type: "aft", label: "游艇出海", text: "包豪华游艇出海1小时，配遮阳棚，吹海风看鹭鸥，老人孩子皆宜。" },
        { time: "18:50", type: "eve", label: "包房布置", text: "提前10分钟进入包房，摆设庆生牌、红包，拍摄70大寿全家福。" },
        { time: "19:00", type: "night", label: "生日家宴", text: "厦餐厅享用生日宴，品尝黑金片皮鸭、敬茶、分吃长寿面。" }
      ]
    },
    {
      dayNum: 5, date: "8月2日", weekday: "周日", theme: "慢活度假",
      hotel: "厦门七尚酒店", intensity: "低（完全松弛）", transit: "留在七尚酒店范围内活动，零大交通奔波",
      goals: "睡到自然醒、湾区悠游、带小孩玩水游泳、享受私密下午茶",
      todayNextEvent: "16:30 五缘湾木栈道避暑散步",
      todayDeparture: "全天无固定出行时间，睡到自然醒",
      todayTransit: "酒店内步行（无车马之劳）",
      todayDest: "厦门七尚酒店",
      todayCarry: ["泳衣泳帽", "儿童水上玩具", "户外防蚊贴"],
      todayFallback: "☀️ 本日最后一天住宿已倾向续住七尚（保留备用A，未采用方案B积分房以防折腾搬行李）。",
      todayMapUrl: "https://uri.amap.com/marker?position=118.1754,24.5165&name=厦门七尚酒店",
      image: "lohkah_resort.webp", imageCaption: "七尚酒店 · 港湾水院静谧微风", imageCredit: "七尚酒店官网",
      steps: [
        { icon: "💤", time: "清晨", label: "睡到自然醒" },
        { icon: "🏊", time: "上午", label: "泳池亲子" },
        { icon: "☕", time: "下午", label: "湾畔茶聚" },
        { icon: "🌌", time: "晚上", label: "夜凉散步" }
      ],
      timeline: [
        { time: "09:00", type: "morn", label: "全日早餐", text: "睡到自然醒，慢享单点式早餐（供应至11:00），适合长辈起床节奏。" },
        { time: "10:30", type: "morn", label: "亲子水畔", text: "带小孩在恒温泳池嬉水；长辈可在茂密红树林畔的躺椅喝冷饮休息。" },
        { time: "13:00", type: "noon", label: "水畔轻食", text: "在酒店内享用清爽简午餐，随后回房进行大午休以防午后暑气。" },
        { time: "16:30", type: "aft", label: "木栈慢行", text: "夕阳西下时，沿五缘湾木栈道轻松漫步30分钟，观赏游艇出港。" },
        { time: "19:00", type: "night", label: "海湾便餐", text: "在七尚周边中餐厅或客房点餐，以闽南热面、清蒸鱼鲜为主，舒缓暖胃。" }
      ]
    },
    {
      dayNum: 6, date: "8月3日", weekday: "周一", theme: "轻松返程",
      hotel: "温馨的家", intensity: "低（乘车回家）", transit: "退房 ➔ 的士 ➔ 厦门北站 ➔ 高铁广州东",
      goals: "湾畔早餐、收拾行李、安全舒适返回广州",
      todayNextEvent: "13:30 厦门北站大厅候车进站",
      todayDeparture: "10:30 仔细理清行囊，12:00出发",
      todayTransit: "高铁回穗",
      todayDest: "温馨的家 (广州东站)",
      todayCarry: ["全部随身衣服/充电器", "返程车票信息", "身份证原件"],
      todayFallback: "🚄 若高铁时间微调提前，直接取消上午散步，早餐后即退房出发，确保提早1小时到站。",
      todayMapUrl: "https://uri.amap.com/marker?position=118.073426,24.638421&name=厦门北站",
      image: "xiamen_travel_banner.webp", imageCaption: "山海团圆 · 顺利安全返程", imageCredit: "中国铁路官网",
      steps: [
        { icon: "🍳", time: "上午", label: "海湾早餐" },
        { icon: "🎒", time: "上午", label: "清点行李" },
        { icon: "🚙", time: "12:00", label: "去往北站" },
        { icon: "🚄", time: "下午", label: "安全抵穗" }
      ],
      timeline: [
        { time: "08:30", type: "morn", label: "临水早餐", text: "在七尚水畔阳台享用早餐，逐笔核对两房退房账单与FHR额度抵扣。" },
        { time: "10:30", type: "morn", label: "收拾行囊", text: "清点全家证件、常用药品、手机充电线等，将大行李打包装车。" },
        { time: "12:00", type: "noon", label: "退房出发", text: "办理退房，乘车前往厦门北站，留足75分钟车程与安检富余。" },
        { time: "13:30", type: "noon", label: "车站候车", text: "北站大厅进站，两大成人分工看行李与拿水，长辈和小孩在座椅休息。" },
        { time: "下午", type: "aft", label: "返抵广州", text: "乘坐高铁安全返回广州东站，结束温馨舒适的七十寿辰团圆感恩之旅！" }
      ]
    }
  ]
};

// --- 3. 美食与预算菜单定义 ---
const menuData = {
  anxi: {
    recommended: [
      { name: "茶香温泉土鸡蛋", price: 38, desc: "行馆温泉水慢煮，口感极其软嫩，孩子老人必点。", checked: true, must: true, warning: "" },
      { name: "古法手剥傍林笋", price: 38, desc: "当地特色脆爽笋，膳食纤维丰富，清爽解腻。", checked: true, must: true, warning: "" },
      { name: "铁观音茶香虾", price: 128, desc: "将安溪铁观音茶香焗入鲜虾，虾壳酥脆，必点特色菜。", checked: true, must: true, warning: "" },
      { name: "山茶油小黄姜煎土鸡", price: 158, desc: "土黄姜片煎本鸡，茶油温补不上火，驱风散寒。", checked: true, must: true, warning: "" },
      { name: "原香小笋芥菜煲", price: 88, desc: "清热去火的热汤菜，滑嫩养胃。", checked: true, must: false, warning: "" },
      { name: "幸福炒饭", price: 58, desc: "配有蛋碎、胡萝卜和葱花，米粒分明，分量足。", checked: true, must: false, warning: "" },
      { name: "湖头咸笋包 (6个)", price: 48, desc: "安溪申遗特色点心，外糯里咸，一人一个尝鲜。", checked: true, must: true, warning: "" }
    ],
    optional: [
      { name: "土猪肉焖安溪麻笋煲", price: 88, desc: "浓汤小火焖制，笋吸满肉汁，十分下饭。", checked: false, must: false, warning: "" },
      { name: "本地光鱼两吃 (酱油水/清汤)", price: 228, desc: "溪水光鱼，肉质极细。注意：刺较多。", checked: false, must: false, warning: "⚠️ 刺多防卡（不适宜老人/儿童）" }
    ]
  },
  waldorf: {
    recommended: [
      { name: "客家盐酒河田鸡", price: 188, desc: "精选长汀河田鸡，淡淡黄酒香，皮黄肉嫩，长辈极爱。", checked: true, must: true, warning: "" },
      { name: "白切深海手钓大红管", price: 298, desc: "白灼深海大红管，滑爽弹牙，不加辛辣佐料。", checked: true, must: true, warning: "" },
      { name: "鲜承姜母鸭", price: 158, desc: "传统沙鸭，生姜片慢煨香气四溢，火候极足易咬。", checked: true, must: true, warning: "" },
      { name: "鲜承海鲜泡饭", price: 138, desc: "浓稠海鲜高汤泡饭，口感香滑软糯，小孩最爱。", checked: true, must: true, warning: "" },
      { name: "时令田园绿蔬菜", price: 58, desc: "当季清汤鲜蔬，富含维生素，均衡膳食。", checked: true, must: false, warning: "" },
      { name: "冻花生奶 (4杯)", price: 152, desc: "华府甜品师特制冰爽花生乳，解暑佳品。", checked: true, must: false, warning: "" }
    ],
    optional: [
      { name: "荠菜煎炒客家牛三宝", price: 298, desc: "牛肚牛筋软烂入味，荠菜提鲜去油，爽脆适中。", checked: false, must: false, warning: "⚠️ 微辣（不适宜部分儿童）" },
      { name: "泉州卤面", price: 98, desc: "配料丰富，汤头浓厚黏稠，面条吸汁软烂易消化。", checked: false, must: false, warning: "" }
    ]
  },
  lohkah: {
    recommended: [
      { name: "红葱酥南日鲜鲍 (4只)", price: 228, desc: "鲍鱼片开，葱油慢焗，肉质非常脆嫩易咬。", checked: true, must: true, warning: "" },
      { name: "白切海钓东山大管", price: 247, desc: "东山海域大鱿鱼，口感鲜脆香甜，蘸点轻酱油。", checked: true, must: true, warning: "" },
      { name: "陈年萝卜焗竹午鱼", price: 257, desc: "竹午鱼油脂丰厚，萝卜干提鲜，几乎无小刺，极推荐。", checked: true, must: true, warning: "" },
      { name: "韭香浸长汀河田鸡", price: 127, desc: "高汤浸鸡，鸡皮滑爽鸡肉极嫩，富含蛋白质。", checked: true, must: true, warning: "" },
      { name: "黑金果木片皮鸭 (1只)", price: 397, desc: "庆生大主菜。鸭皮酥脆，分饼卷肉，拍照极其气派。", checked: true, must: true, warning: "" },
      { name: "红菇柴火豆腐", price: 117, desc: "野生红菇汤汁，豆腐极滑，拌饭一流。", checked: true, must: false, warning: "" },
      { name: "猫爪菇烧芋仔佐火腿", price: 157, desc: "芋头慢火温焗，入口即化，口感极其软糯。", checked: true, must: true, warning: "" },
      { name: "梅干菜猪油焖饭", price: 197, desc: "大铁锅焖饭，猪油和梅干菜香气扑鼻，可多人分食。", checked: true, must: false, warning: "" },
      { name: "寿辰长寿面 (包房赠送)", price: 0, desc: "厦餐厅为70大寿包房特别赠送，配以红蛋和长面。", checked: true, must: true, warning: "" }
    ],
    optional: [
      { name: "贵妃蚌土笋冻 (1位)", price: 87, desc: "厦门特色小吃，口感像清凉海鲜果冻。", checked: false, must: false, warning: "" },
      { name: "沙虫双脆鳝鱼羹", price: 87, desc: "滋补热羹，沙虫极其鲜美，适合调理脾胃。", checked: false, must: false, warning: "" },
      { name: "黄椒青蟹仔蒸年糕", price: 427, desc: "招牌主蟹，黄椒微辣贴糕。", checked: false, must: false, warning: "⚠️ 蟹壳微碎（防壳碎卡咽）" },
      { name: "嫩姜芽炒蛏子皇", price: 257, desc: "去壳蛏子皇，鲜嫩爆汁，微辛姜片驱寒去腥。", checked: false, must: false, warning: "" },
      { name: "芋泥香酥鸭", price: 77, desc: "外酥内糯，香甜适口。", checked: false, must: false, warning: "" },
      { name: "自制腊肉蒸时令鲜笋", price: 127, desc: "竹笋配微咸腊肉，清香可口。", checked: false, must: false, warning: "" },
      { name: "椒榄菜焗扁豆", price: 57, desc: "清爽解腻蔬菜，不可缺少。", checked: false, must: false, warning: "" },
      { name: "冻花生汤 (2份)", price: 94, desc: "厦门百年传统甜汤，花生软烂化沙，香甜解暑。", checked: false, must: false, warning: "" }
    ]
  }
};

// --- 4. 旅途画卷照片墙数据 ---
const galleryData = [
  { src: "anxi_resort.webp", date: "7月29日", location: "安溪悦泉行馆", desc: "山林郁郁，私密别院温泉，长辈洗去一路风尘的世外桃源。", credit: "悦泉行馆官网" },
  { src: "gulangyu_island.webp", date: "7月30日", location: "鼓浪屿琴岛", desc: "绿茵掩映，百年红砖洋房与海风细浪，长辈散步拍照的经典去处。", credit: "鼓浪屿旅游网" },
  { src: "huangyan_36.webp", date: "7月30日", location: "晃岩36号别墅", desc: "SLH奢华精品酒店，日光岩下清幽百年别墅，客房极具复古文艺气息。", credit: "SLH官网" },
  { src: "lujiang_night.webp", date: "7月31日", location: "鹭江道海滨", desc: "夜色渐浓，鹭江道对岸鼓浪屿点点灯火交织，海风习习十分惬意。", credit: "行馆温泉实拍" },
  { src: "zhongshan_road.webp", date: "7月31日", location: "中山路步行街", desc: "连绵的闽南骑楼长廊投下灯火光晕，两侧小吃飘香，体验骑楼韵味。", credit: "厦门旅游局" },
  { src: "lohkah_resort.webp", date: "8月1日", location: "厦门七尚酒店", desc: "五缘湾畔私密水院，高雅奢华，为奶奶大寿家宴提供宁静度假空间。", credit: "七尚酒店官网" },
  { src: "waldorf_dining.webp", date: "8月1日", location: "七尚·生日晚宴", desc: "好事发生寿宴花瓣布置餐桌，全家围坐，品尝黑金片皮鸭温馨团圆。", credit: "厦餐厅实拍" },
  { src: "xiamen_travel_banner.webp", date: "8月3日", location: "厦门北站返程", desc: "宽敞的高铁大厅，清点完行李清爽返程，圆满落幕的温馨合照地。", credit: "中国铁路12306" }
];

// --- 5. 行前准备清单数据 ---
const checklistData = {
  traffic: [
    { text: "全家6人往返高铁车票及座位核对", checked: false, owner: "爸爸" },
    { text: "厦门北站 MPV 7座车自驾预订与儿童增高垫备注", checked: false, owner: "爸爸" },
    { text: "7/30 14:30 往返鼓浪屿轮渡东渡邮轮中心6人船票购妥", checked: false, owner: "妈妈" },
    { text: "高德地图中收藏保存8个旅途目的地链接", checked: false, owner: "爸爸" }
  ],
  elderly: [
    { text: "长辈降压药/常用药/急救药盒随行必备量(放随身腰包)", checked: false, owner: "爸爸" },
    { text: "长辈健步防滑老布鞋/软底鞋清点装箱", checked: false, owner: "妈妈" },
    { text: "随身保温杯 (符合长辈喝温水习惯，高铁上接水)", checked: false, owner: "妈妈" }
  ],
  children: [
    { text: "防蚊贴、防蚊防暑手环 (儿童户外防叮咬必备)", checked: false, owner: "妈妈" },
    { text: "退烧贴/日常小药箱", checked: false, owner: "妈妈" },
    { text: "儿童水上充气玩具、浮圈及玩沙工具", checked: false, owner: "妈妈" }
  ],
  overnight: [
    { text: "随身双肩过夜包 (鼓浪屿1晚用衣物牙刷，大行李存华府)", checked: false, owner: "妈妈" },
    { text: "长辈和儿童身份证件原件 (东渡登船检票口岸必须人证核对)", checked: false, owner: "妈妈" }
  ],
  weather: [
    { text: "高倍数物理防晒霜、防紫外线伞、防晒遮阳帽", checked: false, owner: "爸爸" },
    { text: "随身解暑药 (霍香正气水/十滴水/降温贴)", checked: false, owner: "妈妈" }
  ],
  pool: [
    { text: "泳衣、泳帽、泳镜 (安溪温泉私汤及七尚泳池亲子用)", checked: false, owner: "妈妈" }
  ],
  tech: [
    { text: "手机充电线、充电宝、相机及备用电池", checked: false, owner: "爸爸" },
    { text: "单反相机内存卡空间清空 (备妥拍寿辰全家福大合影)", checked: false, owner: "爸爸" }
  ]
};

// --- 6. 初始化入口 ---
document.addEventListener("DOMContentLoaded", () => {
  // 1. 同步加载本地 localStorage 数据
  loadAllLocalStates();

  // 2. 初始化天气与倒计时看板
  initCountdown();

  // 3. 执行全面视图渲染
  refreshViews();
});

// --- 7. 数据刷新总指挥 ---
function refreshViews() {
  renderTodayWidget();
  renderReservations();
  renderItineraryTabs();
  renderItineraryCards();
  renderMenus();
  renderChecklists();
  renderNavShortcuts();
  renderVisualGallery();
  updateItineraryProgress();
}

// --- 8. 寿辰倒计时与旅途状态计算 ---
function initCountdown() {
  const targetDate = new Date("2026-07-29T00:00:00+08:00");
  const endDate = new Date("2026-08-03T23:59:59+08:00");
  const currentDate = new Date();
  
  const targetMidnight = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const currentMidnight = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  
  const timeDiff = targetMidnight.getTime() - currentMidnight.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  const progressFill = document.getElementById("progress-fill");
  
  // 计算进度条进度
  if (currentDate < targetDate) {
    if (progressFill) progressFill.style.width = "0%";
  } else if (currentDate > endDate) {
    if (progressFill) progressFill.style.width = "100%";
  } else {
    // 旅途中
    const totalDays = currentVersion;
    let currentDay = 1;
    const dateNum = currentDate.getDate();
    if (currentDate.getMonth() === 6) { // 7月
      currentDay = dateNum - 29 + 1;
    } else if (currentDate.getMonth() === 7) { // 8月
      currentDay = dateNum + 3;
    }
    const percent = Math.min(100, Math.round((currentDay / totalDays) * 100));
    if (progressFill) progressFill.style.width = `${percent}%`;
  }
}

// --- 9. 渲染今日看板 (Today Mode Widget) ---
function renderTodayWidget() {
  const targetDate = new Date("2026-07-29T00:00:00+08:00");
  const endDate = new Date("2026-08-03T23:59:59+08:00");
  const currentDate = new Date();

  let activeDayNum = 1;
  let isTripPeriod = false;

  // 根据当前系统时间确定是第几天
  if (currentDate.getFullYear() === 2026) {
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();
    if (month === 7) {
      if (date === 29) { activeDayNum = 1; isTripPeriod = true; }
      else if (date === 30) { activeDayNum = 2; isTripPeriod = true; }
      else if (date === 31) { activeDayNum = 3; isTripPeriod = true; }
    } else if (month === 8) {
      if (date === 1) { activeDayNum = 4; isTripPeriod = true; }
      else if (date === 2) { activeDayNum = 5; isTripPeriod = true; }
      else if (date === 3 && currentVersion === 6) { activeDayNum = 6; isTripPeriod = true; }
    }
  }

  // 限制 activeDayNum 在有效行程天数内
  if (activeDayNum > currentVersion) {
    activeDayNum = currentVersion;
  }

  // 获取对应的天数数据
  const days = tripData[currentVersion];
  const dayInfo = days.find(d => d.dayNum === activeDayNum) || days[0];

  // 绑定DOM元素
  const todayTitle = document.getElementById("today-title");
  const todayDateVal = document.getElementById("today-date-val");
  const todayPreviewAlert = document.getElementById("today-preview-alert");
  const todayHotelVal = document.getElementById("today-hotel-val");
  const todayNextEventVal = document.getElementById("today-next-event-val");
  const todayDepartureVal = document.getElementById("today-departure-val");
  const todayTransitVal = document.getElementById("today-transit-val");
  const todayNavLinkBox = document.getElementById("today-nav-link-box");
  const todayPackVal = document.getElementById("today-pack-val");
  const todayFallbackVal = document.getElementById("today-fallback-val");

  if (todayTitle) todayTitle.textContent = `D${dayInfo.dayNum} · ${dayInfo.theme}`;
  if (todayDateVal) todayDateVal.textContent = `${dayInfo.date} ${dayInfo.weekday}`;
  
  if (todayPreviewAlert) {
    todayPreviewAlert.style.display = isTripPeriod ? "none" : "block";
  }

  if (todayHotelVal) todayHotelVal.textContent = dayInfo.hotel;
  if (todayNextEventVal) todayNextEventVal.textContent = dayInfo.todayNextEvent;
  if (todayDepartureVal) todayDepartureVal.textContent = dayInfo.todayDeparture;
  if (todayTransitVal) todayTransitVal.textContent = dayInfo.todayTransit;

  if (todayNavLinkBox) {
    if (dayInfo.todayMapUrl) {
      todayNavLinkBox.innerHTML = `<a href="${dayInfo.todayMapUrl}" class="today-nav-link" target="_blank" rel="noreferrer">高德地图定位 ↗</a>`;
    } else {
      todayNavLinkBox.textContent = "暂无地图链接";
    }
  }

  if (todayPackVal) {
    todayPackVal.innerHTML = dayInfo.todayCarry.map(item => `<li>${item}</li>`).join('');
  }

  if (todayFallbackVal) {
    todayFallbackVal.textContent = dayInfo.todayFallback;
  }
}

// --- 10. 渲染不可错过 (Reservation Dashboard) ---
function renderReservations() {
  const listContainer = document.getElementById("reservation-list-box");
  if (!listContainer) return;

  const reservations = [
    { time: "7/29 08:00", title: "🚄 广州东站高铁出发", who: "全家同行", carry: "身份证件原件、清凉防晒帽", status: "confirmed", note: "车票已购，请于07:25前在候车室会合。" },
    { time: "7/29 12:00", title: "🚙 厦门北站自驾取车", who: "爸爸负责", carry: "主驾驶身份证、纸质驾驶执照", status: "confirmed", note: "租车行取7座商务MPV，确认儿童座椅配齐。" },
    { time: "7/30 14:30", title: "🚢 东渡邮轮中心往返轮渡", who: "妈妈负责", carry: "防蚊贴、双肩过夜包 (大箱寄存)", status: "confirmed", note: "三丘田岛屿乘船，走绿色安检通道上岛。" },
    { time: "7/31 13:30", title: "🍽️ 华尔道夫·鲜承中餐午宴", who: "爸爸负责", carry: "关联两客房挂账", status: "confirmed", note: "经典闽粤家宴。结账单分拆平摊，多房FHR额度挂钩。" },
    { time: "8/1 19:00", title: "🎂 七尚·厦餐厅生日大寿宴", who: "妈妈负责", carry: "好事发生庆生立牌、祝寿红包", status: "confirmed", note: "奶奶70大寿生日家宴正餐。18:50包房就位合影。" }
  ];

  // 根据5/6天版追加返程节点
  if (currentVersion === 5) {
    reservations.push({ time: "8/2 13:30", title: "🚄 厦门北站返程高铁", who: "全员配合", carry: "身份证、行李及充电宝清点", status: "confirmed", note: "回穗高铁已买。12:00准时由七尚退房坐的士去北站。" });
  } else {
    reservations.push({ time: "8/3 13:30", title: "🚄 厦门北站返程高铁", who: "全员配合", carry: "身份证、行李及充电宝清点", status: "confirmed", note: "回穗高铁已买。12:00准时由七尚退房坐的士去北站。" });
  }

  listContainer.innerHTML = reservations.map(r => `
    <div class="res-card">
      <div class="res-header">
        <span class="res-time-title">📅 ${r.time} · ${r.title}</span>
        <span class="status-badge status-${r.status}">已确认</span>
      </div>
      <div class="res-body">
        <div class="res-detail">
          <span>负责专员:</span>
          <strong>${r.who}</strong>
        </div>
        <div class="res-detail">
          <span>携带物品:</span>
          <strong>${r.carry.join ? r.carry.join('、') : r.carry}</strong>
        </div>
        <div class="res-detail" style="margin-top: 4px; color: var(--text-muted); font-size:11px;">
          <span>小贴士:</span>
          <span>${r.note}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// --- 11. 渲染日程选项卡 (Itinerary Tabs) ---
function renderItineraryTabs() {
  const container = document.getElementById("day-nav-box");
  if (!container) return;

  const days = tripData[currentVersion];
  container.innerHTML = days.map((day, idx) => `
    <button class="day-tab-btn ${day.dayNum === currentDayTab ? 'active' : ''}" 
            id="tab-btn-day-${day.dayNum}" 
            onclick="switchDayTab(${day.dayNum})">
      <span class="tab-d">Day ${day.dayNum}</span>
      <span class="tab-t">${day.theme}</span>
    </button>
  `).join('');
}

// --- 12. 渲染每日行程卡 (Itinerary Cards) ---
function renderItineraryCards() {
  const container = document.getElementById("day-card-container-box");
  if (!container) return;

  const days = tripData[currentVersion];
  
  container.innerHTML = days.map(day => {
    // 渲染今日简短动线步序
    const stepsHtml = day.steps.map(s => `
      <div style="text-align: center; font-size: 12px;">
        <span style="font-size: 18px;">${s.icon}</span>
        <div style="font-weight: 800; margin-top:2px;">${s.label}</div>
        <div style="color: var(--text-muted); font-size: 10px;">${s.time}</div>
      </div>
    `).join('<span style="color: var(--sand-dark); font-weight: bold; margin-top: 8px;">➔</span>');

    // 渲染详细 timeline 列表
    const timelineHtml = day.timeline.map(t => `
      <div class="timeline-item">
        <div class="timeline-dot ${t.time === '19:00' || t.time === '13:30' ? 'highlight' : ''}"></div>
        <div class="timeline-time-row">
          <span class="timeline-time">${t.time}</span>
          <span class="timeline-label">${t.label}</span>
        </div>
        <p class="timeline-text">${t.text}</p>
      </div>
    `).join('');

    return `
      <div class="day-card ${day.dayNum === currentDayTab ? 'active-card' : ''}" id="day-card-${day.dayNum}">
        <!-- 每日卡片概览 -->
        <div class="day-summary-card">
          <div class="day-theme-row">
            <span class="day-theme-title">🎯 今日主题: ${day.title}</span>
            <span class="status-badge status-confirmed">第 ${day.dayNum} 天</span>
          </div>
          
          <div class="day-info-grid">
            <div class="day-info-item">
              <span>🏨 今晚住宿:</span>
              <strong>${day.hotel}</strong>
            </div>
            <div class="day-info-item">
              <span>⚡ 运动负荷:</span>
              <strong style="color: ${day.intensity.includes('中') ? 'var(--minnan-red)' : 'var(--success-color)'};">${day.intensity}</strong>
            </div>
            <div class="day-info-item" style="grid-column: span 2;">
              <span>🚗 核心交通:</span>
              <strong>${day.transit}</strong>
            </div>
            <div class="day-info-item" style="grid-column: span 2;">
              <span>🎯 今日目标:</span>
              <strong>${day.goals}</strong>
            </div>
          </div>
        </div>

        <!-- 景图展示 -->
        <div class="day-img-box" onclick="openLightboxBySrc('${day.image}')">
          <img src="${day.image}" alt="${day.title}" style="width:100%; height:130px; object-fit:cover;">
          <div class="day-img-caption">${day.imageCaption} (景图)</div>
        </div>

        <!-- 看图版动线 -->
        <div style="background:#fdfcf9; border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding:10px;">
          <div style="font-size:11px; font-weight:bold; color:var(--sea-dark); margin-bottom:8px; display:flex; justify-content:space-between;">
            <span>🎨 看图动线栏 (长辈专属)</span>
            <small style="color: var(--text-muted);">从左到右一眼看完</small>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; padding: 0 4px;">
            ${stepsHtml}
          </div>
        </div>

        <!-- 详细时间表 -->
        <div class="timeline-outer">
          <div class="timeline-title">
            <span>🗓️ 今日详细时刻表</span>
          </div>
          
          <div class="timeline-list">
            ${timelineHtml}
          </div>
          
          <!-- 备用防雷防雨方案折叠 -->
          <div style="margin-top: 12px; border-top: 1px dashed var(--border-color); padding-top: 10px;">
            <button class="expand-timeline-btn" onclick="toggleContingency(${day.dayNum})">
              <span>🌦️ 查看今日极端天气与体力备选预案</span>
              <span id="contingency-arrow-${day.dayNum}">▼</span>
            </button>
            <div class="detailed-timeline-panel" id="contingency-panel-${day.dayNum}">
              <p style="font-size:11px; line-height:1.5; color:var(--minnan-red); background:#fff5f5; padding:8px; border-radius:4px; margin-top:6px;">
                ${day.todayFallback}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 切换日程天数 Tab
function switchDayTab(dayNum) {
  currentDayTab = dayNum;
  
  // 更新选项卡状态
  document.querySelectorAll(".day-tab-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  const activeBtn = document.getElementById(`tab-btn-day-${dayNum}`);
  if (activeBtn) activeBtn.classList.add("active");

  // 更新卡片状态
  document.querySelectorAll(".day-card").forEach(card => {
    card.classList.remove("active-card");
  });
  const activeCard = document.getElementById(`day-card-${dayNum}`);
  if (activeCard) activeCard.classList.add("active-card");
}

// 展开/收起天气备用方案
function toggleContingency(dayNum) {
  const panel = document.getElementById(`contingency-panel-${dayNum}`);
  const arrow = document.getElementById(`contingency-arrow-${dayNum}`);
  if (panel && arrow) {
    panel.classList.toggle("expanded");
    arrow.textContent = panel.classList.contains("expanded") ? "▲" : "▼";
  }
}

// --- 13. 渲染地图一键导航 ---
function renderNavShortcuts() {
  const container = document.getElementById("nav-shortcut-grid-box");
  if (!container) return;

  const destinations = [
    { name: "🚄 厦门北站", desc: "自驾取车/返程候车", url: "https://uri.amap.com/marker?position=118.073426,24.638421&name=厦门北站" },
    { name: "温泉 安溪悦泉", desc: "D1私汤温泉别院", url: "https://uri.amap.com/marker?position=117.98638,25.07474&name=安溪悦泉行馆" },
    { name: "码头 东渡邮轮中心", desc: "D2登船检票码头", url: "https://uri.amap.com/marker?position=118.06945,24.47883&name=厦门邮轮中心" },
    { name: "🏡 鼓浪屿晃岩36", desc: "D2岛上住宿老洋房", url: "https://uri.amap.com/marker?position=118.0628,24.44498&name=鼓浪屿晃岩36号" },
    { name: "🏨 厦门华尔道夫", desc: "D3精致中餐与奢宿", url: "https://uri.amap.com/marker?position=118.1187,24.4795&name=厦门华尔道夫酒店" },
    { name: "🌊 厦门七尚酒店", desc: "D4生日晚宴与度假", url: "https://uri.amap.com/marker?position=118.1754,24.5165&name=厦门七尚酒店" }
  ];

  container.innerHTML = destinations.map(d => `
    <a href="${d.url}" class="map-btn" target="_blank" rel="noreferrer">
      <strong>${d.name}</strong>
      <small>${d.desc}</small>
    </a>
  `).join('');
}

// --- 14. 渲染美食正餐列表 ---
let activeMenuRestaurant = 'anxi'; // 当前点餐中餐馆 (anxi, waldorf, lohkah)
let expandedWaldorfMenu = false;
let expandedLohkahMenu = false;

function switchMenuTab(restaurant) {
  activeMenuRestaurant = restaurant;
  
  // 选项卡高亮
  document.querySelectorAll(".menu-tab-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  const activeBtn = document.getElementById(`menu-btn-${restaurant}`);
  if (activeBtn) activeBtn.classList.add("active");

  renderMenus();
}

function renderMenus() {
  const container = document.getElementById("menu-items-box");
  if (!container) return;

  const data = menuData[activeMenuRestaurant];
  
  // 渲染推荐的6人菜品
  const recHtml = data.recommended.map((item, idx) => renderDishRow(item, 'recommended', idx)).join('');

  // 渲染可选的菜品 (可选部分支持折叠)
  let optHtml = "";
  let expandBtnHtml = "";
  
  if (data.optional.length > 0) {
    const isExpanded = activeMenuRestaurant === 'waldorf' ? expandedWaldorfMenu : expandedLohkahMenu;
    
    expandBtnHtml = `
      <button class="expand-menu-btn" onclick="toggleOptionalDishes()">
        ${isExpanded ? '关闭更多菜品列表 ▲' : `展开另外 ${data.optional.length} 道自选特色菜 ▼`}
      </button>
    `;
    
    optHtml = `
      <div class="optional-dishes-panel ${isExpanded ? 'expanded' : ''}" id="opt-dishes-panel">
        <div class="menu-section-header">💡 加点或调整的自选美味</div>
        ${data.optional.map((item, idx) => renderDishRow(item, 'optional', idx)).join('')}
      </div>
    `;
  }

  container.innerHTML = `
    <div>
      <div class="menu-section-header">⭐ 推荐 6 人家庭餐单 (推荐预选)</div>
      ${recHtml}
    </div>
    ${expandBtnHtml}
    ${optHtml}
  `;

  calculateMenuCosts();
}

function renderDishRow(item, type, idx) {
  const tagHtml = [];
  if (item.must) tagHtml.push(`<span class="dish-tag tag-elder">推荐必点</span>`);
  if (item.warning) tagHtml.push(`<span class="dish-tag tag-warn">${item.warning}</span>`);
  if (item.price === 0) tagHtml.push(`<span class="dish-tag tag-kid">尊享赠送</span>`);
  
  return `
    <div class="menu-item ${item.checked ? 'selected' : ''}" onclick="toggleDishCheck('${type}', ${idx})">
      <input type="checkbox" class="menu-checkbox" ${item.checked ? 'checked' : ''} onclick="event.stopPropagation(); toggleDishCheck('${type}', ${idx})">
      <div class="dish-details">
        <div class="dish-header">
          <span class="dish-name">${item.name} ${item.must ? '👑' : ''}</span>
          <span class="dish-price">${item.price > 0 ? '¥' + item.price : '赠送'}</span>
        </div>
        <p class="dish-desc">${item.desc}</p>
        <div class="dish-tags-row">${tagHtml.join('')}</div>
      </div>
    </div>
  `;
}

// 切换特定菜品勾选
function toggleDishCheck(type, idx) {
  const data = menuData[activeMenuRestaurant];
  if (type === 'recommended') {
    data.recommended[idx].checked = !data.recommended[idx].checked;
  } else {
    data.optional[idx].checked = !data.optional[idx].checked;
  }
  
  renderMenus();
  saveAllLocalStates();
}

// 展开收起可选加点菜
function toggleOptionalDishes() {
  if (activeMenuRestaurant === 'waldorf') {
    expandedWaldorfMenu = !expandedWaldorfMenu;
  } else {
    expandedLohkahMenu = !expandedLohkahMenu;
  }
  renderMenus();
}

// 批量勾选/清空
function batchSelectMenu(checkState) {
  const data = menuData[activeMenuRestaurant];
  data.recommended.forEach(item => item.checked = checkState);
  data.optional.forEach(item => item.checked = checkState);
  renderMenus();
  saveAllLocalStates();
  showToast(checkState ? "已勾选全部菜品" : "已清空本单选项");
}

// 恢复出厂推荐
function restoreMenuRecommend() {
  const data = menuData[activeMenuRestaurant];
  data.recommended.forEach(item => item.checked = true);
  data.optional.forEach(item => item.checked = false);
  renderMenus();
  saveAllLocalStates();
  showToast("已重置为最契合的推荐菜谱");
}

// 实时算账与预算核对
function calculateMenuCosts() {
  const data = menuData[activeMenuRestaurant];
  let selectedCount = 0;
  let subtotal = 0;
  let serviceFee = 0;
  let grandTotal = 0;
  let perPerson = 0;

  // 累加
  const addCosts = item => {
    if (item.checked) {
      selectedCount++;
      subtotal += item.price;
    }
  };
  data.recommended.forEach(addCosts);
  data.optional.forEach(addCosts);

  // 服务费计算 (华府与七尚中餐厅需加收15%服务费)
  if (activeMenuRestaurant === 'waldorf' || activeMenuRestaurant === 'lohkah') {
    serviceFee = Math.round(subtotal * 0.15);
  }

  grandTotal = subtotal + serviceFee;
  perPerson = Math.round(grandTotal / 6);

  // 刷新面板文本
  const countEl = document.getElementById("menu-dish-count");
  const subtotalEl = document.getElementById("menu-subtotal");
  const feeEl = document.getElementById("menu-service-fee");
  const grandEl = document.getElementById("menu-grand-total");
  const ppEl = document.getElementById("menu-per-person");
  const fhrEl = document.getElementById("menu-fhr-alert");

  if (countEl) countEl.textContent = `${selectedCount} 道已选`;
  if (subtotalEl) subtotalEl.textContent = `¥${subtotal}`;
  if (feeEl) feeEl.textContent = `¥${serviceFee}`;
  if (grandEl) grandEl.textContent = `¥${grandTotal}`;
  if (ppEl) ppEl.textContent = `¥${perPerson} / 人`;

  // FHR额度分析 (FHR餐饮额度通常为$100 = 约¥700/房，两间房合共 ¥1400 额度)
  if (fhrEl) {
    if (activeMenuRestaurant === 'anxi') {
      fhrEl.style.display = "none";
    } else {
      fhrEl.style.display = "block";
      const threshold = 1400; // 额度基准
      if (grandTotal === 0) {
        fhrEl.className = "fhr-alert perfect";
        fhrEl.innerHTML = `💰 FHR 两房餐饮额度共计: ¥${threshold}，当前已选0道`;
      } else if (grandTotal <= threshold) {
        fhrEl.className = "fhr-alert perfect";
        fhrEl.innerHTML = `✅ FHR额度覆盖完美！还剩约 ¥${threshold - grandTotal} 额度可用`;
      } else {
        fhrEl.className = "fhr-alert over";
        fhrEl.innerHTML = `⚠️ 已超预算！超出 FHR 两房额度约 ¥${grandTotal - threshold} (需结账自费差价)`;
      }
    }
  }
}

// --- 15. 渲染行前清单打卡 (Packing Checklist) ---
function renderChecklists() {
  const container = document.getElementById("checklist-group-box");
  if (!container) return;

  const categories = {
    traffic: "🚄 交通、门票与证件",
    elderly: "👵 爸爸妈妈行李备品",
    children: "👶 宝贝物品防护",
    overnight: "🎒 鼓浪屿过夜包装配",
    weather: "🌦️ 防暑降温防晒",
    pool: "🏊 亲水泳具备办",
    tech: "🔌 数码充电及相机"
  };

  let html = "";
  
  Object.keys(categories).forEach(catKey => {
    let items = checklistData[catKey];
    
    // 只看未完成过滤器
    if (unfinishedOnlyCheck) {
      items = items.filter(item => !item.checked);
    }

    if (items.length > 0) {
      const itemsHtml = items.map((item, idx) => `
        <li class="todo-item ${item.checked ? 'completed' : ''}" onclick="toggleChecklistItem('${catKey}', ${idx})">
          <div class="todo-left">
            <input type="checkbox" class="todo-checkbox" ${item.checked ? 'checked' : ''} onclick="event.stopPropagation(); toggleChecklistItem('${catKey}', ${idx})">
            <span class="todo-label-text">${item.text}</span>
          </div>
          <span class="todo-owner" onclick="event.stopPropagation(); cycleTodoOwner('${catKey}', ${idx})">
            👤 ${item.owner}
          </span>
        </li>
      `).join('');

      html += `
        <div style="margin-top: 8px;">
          <div class="checklist-cat-title">${categories[catKey]}</div>
          <ul style="list-style:none; padding-left:0;">
            ${itemsHtml}
          </ul>
        </div>
      `;
    }
  });

  if (!html) {
    html = `<div style="text-align:center; padding:20px; font-size:12px; color:var(--text-muted);">🎉 太棒了，当前没有未打卡项目！</div>`;
  }

  container.innerHTML = html;
  calculateChecklistStats();
}

function toggleChecklistItem(cat, idx) {
  // 注意：如果是处于只看未完成过滤中，操作后状态会变化，需要查找到实际原始索引
  let items = checklistData[cat];
  if (unfinishedOnlyCheck) {
    // 过滤出未完成的项目
    const unfinished = items.filter(item => !item.checked);
    const targetItem = unfinished[idx];
    if (targetItem) {
      targetItem.checked = !targetItem.checked;
    }
  } else {
    items[idx].checked = !items[idx].checked;
  }
  
  renderChecklists();
  saveAllLocalStates();
}

function cycleTodoOwner(cat, idx) {
  const owners = ["无", "爸爸", "妈妈", "酒店确认", "出发当天检查"];
  let items = checklistData[cat];
  let targetItem = items[idx];

  if (unfinishedOnlyCheck) {
    const unfinished = items.filter(item => !item.checked);
    targetItem = unfinished[idx];
  }

  if (targetItem) {
    const currentIdx = owners.indexOf(targetItem.owner);
    const nextIdx = (currentIdx + 1) % owners.length;
    targetItem.owner = owners[nextIdx];
  }

  renderChecklists();
  saveAllLocalStates();
}

// 切换只看未完成
function toggleUnfinishedOnly(checked) {
  unfinishedOnlyCheck = checked;
  renderChecklists();
}

// 计算清单完成百分比
function calculateChecklistStats() {
  let total = 0;
  let done = 0;

  Object.keys(checklistData).forEach(cat => {
    checklistData[cat].forEach(item => {
      total++;
      if (item.checked) done++;
    });
  });

  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  
  const textEl = document.getElementById("checklist-progress-text");
  const barEl = document.getElementById("checklist-progress-bar");
  const badgeEl = document.getElementById("checklist-total-badge");

  if (textEl) textEl.textContent = `已准备妥帖: ${percent}%`;
  if (barEl) barEl.style.width = `${percent}%`;
  if (badgeEl) badgeEl.textContent = `已完成 ${done} / ${total}`;
}

// 重置清单 (两步弹出确认)
function showConfirmReset() {
  const modal = document.getElementById("confirm-modal");
  if (modal) modal.style.display = "flex";
}

function hideConfirmReset() {
  const modal = document.getElementById("confirm-modal");
  if (modal) modal.style.display = "none";
}

function confirmResetChecklist() {
  // 全部改回未完成
  Object.keys(checklistData).forEach(cat => {
    checklistData[cat].forEach(item => {
      item.checked = false;
    });
  });
  
  hideConfirmReset();
  renderChecklists();
  saveAllLocalStates();
  showToast("行李打卡清单已全面重置成功");
}

// --- 16. 切换行程天数方案 (5天 vs 6天) ---
function switchTripVersion(ver) {
  currentVersion = ver;
  
  // 更新按钮高亮
  const btn5 = document.getElementById("ver-btn-5");
  const btn6 = document.getElementById("ver-btn-6");
  const headerDates = document.getElementById("header-dates-label");

  if (ver === 5) {
    if (btn5) btn5.classList.add("active");
    if (btn6) btn6.classList.remove("active");
    if (headerDates) headerDates.textContent = "7月29日 - 8月2日";
  } else {
    if (btn5) btn5.classList.remove("active");
    if (btn6) btn6.classList.add("active");
    if (headerDates) headerDates.textContent = "7月29日 - 8月3日";
  }

  // 重设当前的活动天数
  if (currentDayTab > ver) {
    currentDayTab = ver;
  }

  // 刷新所有渲染
  refreshViews();
  saveAllLocalStates();
  showToast(`已为您切换至 ${ver}天4晚 行程视图`);
}

// --- 17. 渲染旅途画卷照片墙 ---
function renderVisualGallery() {
  const container = document.getElementById("gallery-mosaic-box");
  if (!container) return;

  container.innerHTML = galleryData.map((img, idx) => `
    <div class="gallery-item" onclick="openLightbox(${idx})">
      <img src="${img.src}" alt="${img.location}" onerror="this.src='xiamen_travel_banner.webp';">
      <div class="gallery-label">${img.location}</div>
    </div>
  `).join('');
}

// 灯箱放大照片逻辑
function openLightbox(idx) {
  currentLightboxIdx = idx;
  const modal = document.getElementById("lightbox-modal");
  const imgEl = document.getElementById("lightbox-img");
  const locEl = document.getElementById("lightbox-location");
  const dateEl = document.getElementById("lightbox-date");
  const descEl = document.getElementById("lightbox-desc");
  const creditEl = document.getElementById("lightbox-credit");

  if (!modal) return;

  const data = galleryData[currentLightboxIdx];
  if (imgEl) imgEl.src = data.src;
  if (locEl) locEl.textContent = `📍 ${data.location}`;
  if (dateEl) dateEl.textContent = `📅 ${data.date}`;
  if (descEl) descEl.textContent = data.desc;
  if (creditEl) creditEl.textContent = `图片出处：${data.credit}`;

  modal.style.display = "flex";
  
  // 绑定方向键翻页
  document.addEventListener("keydown", handleLightboxKey);
}

function openLightboxBySrc(src) {
  // 通过文件名在相册里匹配
  const idx = galleryData.findIndex(g => g.src === src);
  if (idx !== -1) {
    openLightbox(idx);
  }
}

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  if (modal) modal.style.display = "none";
  document.removeEventListener("keydown", handleLightboxKey);
}

function prevLightbox(e) {
  if (e) e.stopPropagation();
  currentLightboxIdx = (currentLightboxIdx - 1 + galleryData.length) % galleryData.length;
  openLightbox(currentLightboxIdx);
}

function nextLightbox(e) {
  if (e) e.stopPropagation();
  currentLightboxIdx = (currentLightboxIdx + 1) % galleryData.length;
  openLightbox(currentLightboxIdx);
}

function handleLightboxKey(e) {
  if (e.key === "ArrowLeft") prevLightbox();
  if (e.key === "ArrowRight") nextLightbox();
  if (e.key === "Escape") closeLightbox();
}

// --- 18. 只看今天 (Today Mode) 切换 ---
function toggleTodayMode(forceState) {
  if (forceState !== undefined) {
    todayModeActive = forceState;
  } else {
    todayModeActive = !todayModeActive;
  }

  const body = document.body;
  const btn = document.getElementById("btn-today-mode");
  const btnBack = document.getElementById("btn-back-full");

  if (todayModeActive) {
    body.classList.add("today-mode-active");
    if (btn) {
      btn.textContent = "完整行程";
      btn.style.background = "var(--minnan-red)";
    }
    if (btnBack) btnBack.style.display = "block";
    showToast("只看今天模式已开启，其余内容已为您精简隐藏");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    body.classList.remove("today-mode-active");
    if (btn) {
      btn.textContent = "只看今天";
      btn.style.background = "rgba(255,255,255,0.15)";
    }
    if (btnBack) btnBack.style.display = "none";
    showToast("已切回完整多段行程总览");
  }

  saveAllLocalStates();
}

// --- 19. 老人模式 (Seniors Mode) 切换 ---
function toggleSeniorsMode() {
  seniorsModeActive = !seniorsModeActive;
  const body = document.body;
  const btn = document.getElementById("btn-seniors-mode");

  if (seniorsModeActive) {
    body.classList.add("seniors-mode");
    if (btn) {
      btn.textContent = "👵 默认大字";
      btn.style.background = "var(--gold-dark)";
    }
    showToast("大字无障碍老人阅读模式已启用");
  } else {
    body.classList.remove("seniors-mode");
    if (btn) {
      btn.textContent = "👵 老人大字";
      btn.style.background = "rgba(255,255,255,0.15)";
    }
    showToast("已还原为精细排版模式");
  }

  saveAllLocalStates();
}

// --- 20. 网页内部平滑跳转 ---
function scrollToElement(id) {
  // 如果当前是只看今天模式，先强制切出
  if (todayModeActive) {
    toggleTodayMode(false);
  }
  
  const target = document.getElementById(id);
  if (target) {
    const offset = 70;
    const bodyRect = document.body.getBoundingClientRect().top;
    const targetRect = target.getBoundingClientRect().top;
    const targetPos = targetRect - bodyRect - offset;
    
    window.scrollTo({
      top: targetPos,
      behavior: "smooth"
    });
  }
}

// --- 21. 微信模板一键复制 ---
function copyTemplateText(id, btn) {
  const el = document.getElementById(id);
  if (!el) return;
  const text = el.textContent;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      flashCopyButton(btn);
    }).catch(() => {
      fallbackCopy(text, btn);
    });
  } else {
    fallbackCopy(text, btn);
  }
}

function fallbackCopy(text, btn) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const ok = document.execCommand('copy');
    if (ok) {
      flashCopyButton(btn);
    } else {
      showToast("您的设备不支持自动复制，请长按段落文本手动复制");
    }
  } catch (err) {
    showToast("复制出错，请手动复制");
  }
  
  document.body.removeChild(textArea);
}

function flashCopyButton(btn) {
  const oldText = btn.textContent;
  btn.textContent = "✓ 已复制";
  btn.style.background = "var(--success-color)";
  btn.style.color = "#fff";
  showToast("文案已存入剪贴板，可直接前往微信粘贴！");
  
  setTimeout(() => {
    btn.textContent = oldText;
    btn.style.background = "";
    btn.style.color = "";
  }, 2000);
}

// 弹出消息框
function showToast(msg) {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  }
}

// 行程当前天数导航联动样式激活 (滚动spy)
function updateItineraryProgress() {
  // 可以用于在滚动时监听，由于本版本是用Tab页切换为主体，这里暂不作过度性能消耗的滚动绑定，直接通过点击联动。
}

// --- 22. 本地持久化储存 ---
function saveAllLocalStates() {
  try {
    localStorage.setItem("xiamen_trip_version", currentVersion.toString());
    localStorage.setItem("xiamen_seniors_mode", seniorsModeActive.toString());
    localStorage.setItem("xiamen_today_mode", todayModeActive.toString());
    localStorage.setItem("xiamen_menu_data", JSON.stringify(menuData));
    localStorage.setItem("xiamen_checklist_data", JSON.stringify(checklistData));
  } catch (e) {
    console.warn("LocalStorage 存储写入失败:", e);
  }
}

function loadAllLocalStates() {
  try {
    // 1. 版本加载
    const storedVer = localStorage.getItem("xiamen_trip_version");
    if (storedVer === "5" || storedVer === "6") {
      currentVersion = parseInt(storedVer, 10);
      const btn5 = document.getElementById("ver-btn-5");
      const btn6 = document.getElementById("ver-btn-6");
      const headerDates = document.getElementById("header-dates-label");
      if (currentVersion === 5) {
        if (btn5) btn5.classList.add("active");
        if (btn6) btn6.classList.remove("active");
        if (headerDates) headerDates.textContent = "7月29日 - 8月2日";
      } else {
        if (btn5) btn5.classList.remove("active");
        if (btn6) btn6.classList.add("active");
        if (headerDates) headerDates.textContent = "7月29日 - 8月3日";
      }
    }

    // 2. 老人模式加载
    const storedSeniors = localStorage.getItem("xiamen_seniors_mode");
    if (storedSeniors === "true") {
      seniorsModeActive = true;
      document.body.classList.add("seniors-mode");
      const btn = document.getElementById("btn-seniors-mode");
      if (btn) {
        btn.textContent = "👵 默认大字";
        btn.style.background = "var(--gold-dark)";
      }
    }

    // 3. 今日看板只看今天模式加载
    const storedToday = localStorage.getItem("xiamen_today_mode");
    if (storedToday === "true") {
      todayModeActive = true;
      document.body.classList.add("today-mode-active");
      const btn = document.getElementById("btn-today-mode");
      const btnBack = document.getElementById("btn-back-full");
      if (btn) {
        btn.textContent = "完整行程";
        btn.style.background = "var(--minnan-red)";
      }
      if (btnBack) btnBack.style.display = "block";
    }

    // 4. 点餐列表本地状态加载
    const storedMenu = localStorage.getItem("xiamen_menu_data");
    if (storedMenu) {
      const parsed = JSON.parse(storedMenu);
      if (parsed) {
        Object.keys(parsed).forEach(restaurant => {
          if (menuData[restaurant]) {
            parsed[restaurant].recommended.forEach((item, idx) => {
              if (menuData[restaurant].recommended[idx]) {
                menuData[restaurant].recommended[idx].checked = !!item.checked;
              }
            });
            parsed[restaurant].optional.forEach((item, idx) => {
              if (menuData[restaurant].optional[idx]) {
                menuData[restaurant].optional[idx].checked = !!item.checked;
              }
            });
          }
        });
      }
    }

    // 5. 打卡清单本地状态加载
    const storedCheck = localStorage.getItem("xiamen_checklist_data");
    if (storedCheck) {
      const parsed = JSON.parse(storedCheck);
      if (parsed) {
        Object.keys(parsed).forEach(cat => {
          if (checklistData[cat]) {
            parsed[cat].forEach((item, idx) => {
              if (checklistData[cat][idx]) {
                checklistData[cat][idx].checked = !!item.checked;
                if (item.owner) {
                  checklistData[cat][idx].owner = item.owner;
                }
              }
            });
          }
        });
      }
    }
  } catch (e) {
    console.warn("LocalStorage 存储读取失败，采用静态默认数据。");
  }
}
