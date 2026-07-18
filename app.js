// ==========================================================================
// 厦门70岁生日家庭行程 WebApp 核心逻辑
// ==========================================================================

// --- 全局状态 ---
let currentVersion = 6; // 默认6天5晚版
let seniorsModeActive = false; // 老人阅读模式
let currentLightboxIndex = 0; // 灯箱索引

// --- 行程数据定义 ---
const itineraryData = {
  5: [
    {
      dayNum: 1,
      dateText: "7月29日 周三",
      dayName: "周三",
      title: "山里放松 · 温泉洗尘",
      theme: "安溪",
      route: ["广州东", "厦门北", "安溪悦泉行馆"],
      hotel: "安溪悦泉行馆 (Elite Spring Villas)",
      transit: "广州东高铁 -> 厦门北（12:00抵） | 租车自驾进山",
      intensity: "low",
      goals: "安全抵达、办理入住、山林泡汤温泉、早睡歇息",
      contingency: "⛈️【高铁延误预案】：若高铁延误超2小时，直接取消下午茶山漫步，入店后先安排包房晚餐再泡汤，绝不赶夜路泡温泉。",
      notice: "悦泉行馆玩法：建议现场确认儿童安全座椅；长辈温泉单次控制在20-30分钟，中途必须多次补充温开水。",
      image: "anxi_resort.webp",
      imageCaption: "安溪悦泉 · 茶山温泉私享",
      routeMap: "route_day1.webp",
      steps: [
        { icon: "🚄", label: "上午", title: "高铁出发" },
        { icon: "🚙", label: "12:00", title: "北站取车" },
        { icon: "♨️", label: "下午", title: "茶山温泉" },
        { icon: "🍲", label: "晚上", title: "行馆晚餐" }
      ],
      timeline: [
        { time: "08:00", label: "高铁出发", text: "广州东站乘高铁前往厦门北，随身包备好常用药与水杯。", period: "morn" },
        { time: "12:00", label: "取车自驾", text: "抵达厦门北站，在门店取 7 座商务车，现场调试儿童增高垫。", period: "noon" },
        { time: "14:00", label: "行馆入住", text: "办理安溪悦泉行馆入住，午休整理，享用清茶点心。", period: "aft" },
        { time: "17:00", label: "温泉泡汤", text: "在别墅私享温泉泡汤，控制时间与水温，舒缓乘车疲劳。", period: "eve" },
        { time: "19:00", label: "行馆晚餐", text: "中餐厅享用养生茶乡家常菜，口味少油少盐少辣。", period: "night" }
      ]
    },
    {
      dayNum: 2,
      dateText: "7月30日 周四",
      dayName: "周四",
      title: "鼓浪屿人文风情",
      theme: "鼓浪屿",
      route: ["安溪", "华尔道夫寄存", "东渡码头", "三丘田", "晃岩36"],
      hotel: "鼓浪屿晃岩 36 号别墅 (近日光岩)",
      transit: "自驾回厦 -> 华府寄行李还车 -> 的士至码头 -> 14:30 轮渡上岛",
      intensity: "mid",
      goals: "寄存大件行李、上岛入住晃岩、私导避人讲解老洋房",
      contingency: "⛵【轮渡延误/停航预案】：若因暑期大风轮渡临时停航，行李直接在华尔道夫开房入住，改在厦门岛内筼筜湖散步，绝不上岛涉险。",
      notice: "岛上无机动车，石子路颠簸。请长辈穿防滑健步鞋；下午17:00私导讲解免爬高，随走随歇。",
      image: "gulangyu_island.webp",
      imageCaption: "琴岛绿荫 · 闽南红砖别墅",
      routeMap: "route_day2.webp",
      steps: [
        { icon: "🎒", label: "上午", title: "大件寄华府" },
        { icon: "🚢", label: "14:30", title: "轮渡登岛" },
        { icon: "🏡", label: "下午", title: "入住晃岩" },
        { icon: "🗣️", label: "17:00", title: "私人导览" }
      ],
      timeline: [
        { time: "09:30", label: "自驾回厦", text: "悦泉行馆退房，自驾返回厦门市区，预计车程1.5小时。", period: "morn" },
        { time: "11:00", label: "华府寄存", text: "抵达华尔道夫寄存大行李；上岛仅携带随身轻便过夜包。", period: "morn" },
        { time: "13:30", label: "码头候船", text: "抵达东渡邮轮码头，走绿色安检通道，至少提前45分钟到场。", period: "noon" },
        { time: "14:30", label: "轮渡登岛", text: "乘轮渡前往鼓浪屿三丘田码头，长辈坐在一楼船舱休息防颠簸。", period: "aft" },
        { time: "15:30", label: "入住晃岩", text: "抵达晃岩36号别墅，安排长辈午休，客栈管家协助运送小行李。", period: "aft" },
        { time: "17:00", label: "老洋房导览", text: "私人导游带路，讲解日光岩外围、老别墅人文，累了随时结束。", period: "eve" },
        { time: "19:00", label: "海岛晚餐", text: "在岛上享用特色闽南清淡小吃，餐后散步早回客栈歇息。", period: "night" }
      ]
    },
    {
      dayNum: 3,
      dateText: "7月31日 周五",
      dayName: "周五",
      title: "华府奢华 · 精致饕餮",
      theme: "华府",
      route: ["鼓浪屿清晨", "下岛", "华府鲜承午宴", "中山路夜游"],
      hotel: "厦门华尔道夫酒店 (Waldorf Astoria Xiamen)",
      transit: "上午乘轮渡返回市区 -> 的士前往华尔道夫酒店",
      intensity: "mid",
      goals: "海岛清晨避人散步、下岛入住华府、鲜承精美午宴、夜游中山路",
      contingency: "🌧️【大雨/疲劳预案】：若晚间中山路大雨，取消鹭江道散步，改为在华尔道夫行政酒廊或房间内喝甜品放空，长辈早睡。",
      notice: "华府鲜承中餐定于 13:30 开始。两间客房账单分拆平摊，单价超 ¥350 菜品需注意避开 FHR 额度限额限制。",
      image: "waldorf_dining.webp",
      imageCaption: "华尔道夫 · 鲜承精致午宴",
      routeMap: "route_day3.webp",
      steps: [
        { icon: "🌊", label: "清晨", title: "避人散步" },
        { icon: "⛴️", label: "11:00", title: "下岛回城" },
        { icon: "🍽️", label: "13:30", title: "鲜承大餐" },
        { icon: "🏮", label: "晚上", title: "中山路游" }
      ],
      timeline: [
        { time: "07:30", label: "清晨琴岛", text: "避开上岛高峰，在晃岩周边清幽小径散步，拍照光线极佳。", period: "morn" },
        { time: "11:00", label: "退房乘船", text: "从三丘田码头乘船返回市区，打车前往华尔道夫酒店。", period: "morn" },
        { time: "13:30", label: "鲜承午宴", text: "在华尔道夫【鲜承 HOKKLO】享用大餐，庆祝旅行过半。", period: "noon" },
        { time: "15:30", label: "华府午休", text: "前两日换店较累，下午在华尔道夫宽敞客房进行大午休。", period: "aft" },
        { time: "19:00", label: "中山路游", text: "打车前往中山路，在骑楼下品尝花生汤小吃，赏鹭江道夜景。", period: "eve" }
      ]
    },
    {
      dayNum: 4,
      dateText: "8月1日 周六",
      dayName: "周六",
      title: "海湾家宴 · 寿辰正日",
      theme: "庆生",
      route: ["华府退房", "换店七尚", "五缘湾游艇", "厦餐厅生日宴"],
      hotel: "七尚酒店 (Lohkah Hotel & Spa)",
      transit: "华府退房 -> 的士前往七尚酒店（车程 20 分钟）",
      intensity: "low",
      goals: "入住七尚海湾、游艇出海吹海风、生日寿宴布置及全家合影",
      contingency: "💨【游艇取消预案】：若8/1下午风浪过大或雷雨导致游艇取消，改为在七尚海湾园林中堂喝下午茶，拍照机位同样绝佳，寿宴照常进行。",
      notice: "生日宴提醒：18:50 必须进包房进行寿卡与鲜花布置，拍摄全家福合影；19:00 开餐，上菜要求极其清淡少油刺。",
      image: "lohkah_resort.webp",
      imageCaption: "七尚酒店 · 宁静五缘海湾",
      routeMap: "route_day4.webp",
      steps: [
        { icon: "🏊", label: "上午", title: "酒店泳池" },
        { icon: "🚗", label: "13:30", title: "换店七尚" },
        { icon: "⛵", label: "17:00", title: "游艇出海" },
        { icon: "🎂", label: "19:00", title: "生日家宴" }
      ],
      timeline: [
        { time: "09:30", label: "华府清晨", text: "在华尔道夫享用早餐，可以在恒温泳池或花园活动。", period: "morn" },
        { time: "13:30", label: "换店七尚", text: "退房打车前往五缘湾七尚酒店，前台申请排相邻房间方便照顾。", period: "noon" },
        { time: "14:30", label: "湾畔小憩", text: "七尚入住，在房间内充分午休，避开午后最热骄阳。", period: "aft" },
        { time: "17:00", label: "游艇出海", text: "包动力游艇出海1小时，配遮阳棚，老人孩子吹海风看海鸥。", period: "aft" },
        { time: "18:50", label: "包房庆生", text: "提前进入包房布置‘好事发生’摆件，拍摄70岁寿辰全家福。", period: "eve" },
        { time: "19:00", label: "庆生晚宴", text: "厦餐厅生日家宴，品尝黑金片皮鸭，席间敬茶、分吃长寿面。", period: "night" }
      ]
    },
    {
      dayNum: 5,
      dateText: "8月2日 周日",
      dateText: "8月2日 周日",
      title: "轻松返程",
      theme: "返程",
      route: ["七尚酒店", "厦门北站", "广州东站"],
      hotel: "温馨的家",
      transit: "七尚酒店 -> 的士前往厦门北站 -> 乘高铁返回广州东",
      intensity: "low",
      goals: "半日闲度假、收纳行李、顺利安全返回广州",
      contingency: "🚄【高铁时间变化预案】：如返程高铁车次微调提前，则直接取消上午湾畔散步，酒店早餐后即退房出发，确保提早1小时到候车室。",
      notice: "返程日严禁增加任何市区景点，减少搬运疲劳，让老人孩子舒舒服服地乘车回家。",
      image: "xiamen_travel_banner.webp",
      imageCaption: "山海回忆 · 温馨返程归途",
      routeMap: "route_day6.webp",
      steps: [
        { icon: "🍳", label: "上午", title: "海湾早餐" },
        { icon: "🎒", label: "上午", title: "清点行囊" },
        { icon: "🚗", label: "中午", title: "去往北站" },
        { icon: "🚄", label: "下午", title: "高铁回穗" }
      ],
      timeline: [
        { time: "08:30", label: "水畔早餐", text: "在七尚临水阳台享用精致早餐，核对退房账单与 FHR 抵扣。", period: "morn" },
        { time: "10:30", label: "行李清点", text: "仔细清点全家证件、长辈常备药、充电器，将大行李打包装车。", period: "morn" },
        { time: "12:00", label: "退房返程", text: "办理退房，乘的士前往厦门北站，预留75分钟车程与安检富余。", period: "noon" },
        { time: "13:30", label: "车站候车", text: "北站大厅安检进站，两大成人分工看行李与取餐，老人小孩在座椅休息。", period: "noon" },
        { time: "下午", label: "高铁抵穗", text: "乘坐高铁安全返回广州东站，结束温馨舒适的七十寿辰感恩之旅！", period: "aft" }
      ]
    }
  ],
  6: [
    {
      dayNum: 1,
      dateText: "7月29日 周三",
      dayName: "周三",
      title: "山里放松 · 温泉洗尘",
      theme: "安溪",
      route: ["广州东", "厦门北", "安溪悦泉行馆"],
      hotel: "安溪悦泉行馆 (Elite Spring Villas)",
      transit: "广州东高铁 -> 厦门北（12:00抵） | 租车自驾进山",
      intensity: "low",
      goals: "安全抵达、办理入住、山林温泉私享、早睡歇息",
      contingency: "⛈️【高铁延误预案】：若高铁延误超2小时，直接取消下午茶山漫步，入店后先安排包房晚餐再泡汤，绝不赶夜路泡温泉。",
      notice: "悦泉行馆玩法：建议现场确认儿童安全座椅；长辈温泉单次控制在20-30分钟，中途必须多次补充温开水。",
      image: "anxi_resort.webp",
      imageCaption: "安溪悦泉 · 茶山温泉私享",
      routeMap: "route_day1.webp",
      steps: [
        { icon: "🚄", label: "上午", title: "高铁出发" },
        { icon: "🚙", label: "12:00", title: "北站取车" },
        { icon: "♨️", label: "下午", title: "茶山温泉" },
        { icon: "🍲", label: "晚上", title: "行馆晚餐" }
      ],
      timeline: [
        { time: "08:00", label: "高铁出发", text: "广州东站乘高铁前往厦门北，随身包备好常用药与水杯。", period: "morn" },
        { time: "12:00", label: "取车自驾", text: "抵达厦门北站，在门店取 7 座商务车，现场调试儿童增高垫。", period: "noon" },
        { time: "14:00", label: "行馆入住", text: "办理安溪悦泉行馆入住，午休整理，享用清茶点心。", period: "aft" },
        { time: "17:00", label: "温泉泡汤", text: "在别墅私享温泉泡汤，控制时间与水温，舒缓乘车疲劳。", period: "eve" },
        { time: "19:00", label: "行馆晚餐", text: "中餐厅享用养生茶乡家常菜，口味少油少盐少辣。", period: "night" }
      ]
    },
    {
      dayNum: 2,
      dateText: "7月30日 周四",
      dayName: "周四",
      title: "鼓浪屿人文风情",
      theme: "鼓浪屿",
      route: ["安溪", "华尔道夫寄存", "东渡码头", "三丘田", "晃岩36"],
      hotel: "鼓浪屿晃岩 36 号别墅 (近日光岩)",
      transit: "自驾回厦 -> 华府寄行李还车 -> 的士至码头 -> 14:30 轮渡上岛",
      intensity: "mid",
      goals: "寄存大件行李、上岛入住晃岩、私导避人讲解老洋房",
      contingency: "⛵【轮渡延误/停航预案】：若因暑期大风轮渡临时停航，行李直接在华尔道夫开房入住，改在厦门岛内筼筜湖散步，绝不上岛涉险。",
      notice: "岛上无机动车，石子路颠簸。请长辈穿防滑健步鞋；下午17:00私导讲解免爬高，随走随歇。",
      image: "gulangyu_island.webp",
      imageCaption: "琴岛绿荫 · 闽南红砖别墅",
      routeMap: "route_day2.webp",
      steps: [
        { icon: "🎒", label: "上午", title: "大件寄华府" },
        { icon: "🚢", label: "14:30", title: "轮渡登岛" },
        { icon: "🏡", label: "下午", title: "入住晃岩" },
        { icon: "🗣️", label: "17:00", title: "私人导览" }
      ],
      timeline: [
        { time: "09:30", label: "自驾回厦", text: "悦泉行馆退房，自驾返回厦门市区，预计车程1.5小时。", period: "morn" },
        { time: "11:00", label: "华府寄存", text: "抵达华尔道夫寄存大行李；上岛仅携带随身轻便过夜包。", period: "morn" },
        { time: "13:30", label: "码头候船", text: "抵达东渡邮轮码头，走绿色安检通道，至少提前45分钟到场。", period: "noon" },
        { time: "14:30", label: "轮渡登岛", text: "乘轮渡前往鼓浪屿三丘田码头，长辈坐在一楼船舱休息防颠簸。", period: "aft" },
        { time: "15:30", label: "入住晃岩", text: "抵达晃岩36号别墅，安排长辈午休，客栈管家协助运送小行李。", period: "aft" },
        { time: "17:00", label: "老洋房导览", text: "私人导游带路，讲解日光岩外围、老别墅人文，累了随时结束。", period: "eve" },
        { time: "19:00", label: "海岛晚餐", text: "在岛上享用特色闽南清淡小吃，餐后散步早回客栈客栈休息。", period: "night" }
      ]
    },
    {
      dayNum: 3,
      dateText: "7月31日 周五",
      dayName: "周五",
      title: "华府奢华 · 精致饕餮",
      theme: "华府",
      route: ["鼓浪屿清晨", "下岛", "华府鲜承午宴", "中山路夜游"],
      hotel: "厦门华尔道夫酒店 (Waldorf Astoria Xiamen)",
      transit: "上午乘轮渡返回市区 -> 的士前往华尔道夫酒店",
      intensity: "mid",
      goals: "海岛清晨避人散步、下岛入住华府、鲜承精美午宴、夜游中山路",
      contingency: "🌧️【大雨/疲劳预案】：若晚间中山路大雨，取消鹭江道散步，改为在华尔道夫行政酒廊或房间内喝甜品放空，长辈早睡。",
      notice: "华府鲜承中餐定于 13:30 开始。两间客房账单分拆平摊，单价超 ¥350 菜品需注意避开 FHR 额度限额限制。",
      image: "waldorf_dining.webp",
      imageCaption: "华尔道夫 · 鲜承精致午宴",
      routeMap: "route_day3.webp",
      steps: [
        { icon: "🌊", label: "清晨", title: "避人散步" },
        { icon: " Ferry", label: "11:00", title: "下岛回城" },
        { icon: "🍽️", label: "13:30", title: "鲜承大餐" },
        { icon: "🏮", label: "晚上", title: "中山路游" }
      ],
      timeline: [
        { time: "07:30", label: "清晨琴岛", text: "避开上岛高峰，在晃岩周边清幽小径散步，拍照光线极佳。", period: "morn" },
        { time: "11:00", label: "退房乘船", text: "从三丘田码头乘船返回市区，打车前往华尔道夫酒店。", period: "morn" },
        { time: "13:30", label: "鲜承午宴", text: "在华尔道夫【鲜承 HOKKLO】享用大餐，庆祝旅行过半。", period: "noon" },
        { time: "15:30", label: "华府午休", text: "前两日换店较累，下午在华尔道夫宽敞客房进行大午休。", period: "aft" },
        { time: "19:00", label: "中山路游", text: "打车前往中山路，在骑楼下品尝花生汤小吃，赏鹭江道夜景。", period: "eve" }
      ]
    },
    {
      dayNum: 4,
      dateText: "8月1日 周六",
      dayName: "周六",
      title: "海湾家宴 · 寿辰正日",
      theme: "庆生",
      route: ["华府退房", "换店七尚", "五缘湾游艇", "厦餐厅生日宴"],
      hotel: "七尚酒店 (Lohkah Hotel & Spa)",
      transit: "华府退房 -> 的士前往七尚酒店（车程 20 分钟）",
      intensity: "low",
      goals: "入住七尚海湾、游艇出海吹海风、生日寿宴布置及全家合影",
      contingency: "💨【游艇取消预案】：若8/1下午风浪过大或雷雨导致游艇取消，改为在七尚海湾园林中堂喝下午茶，拍照机位同样绝佳，寿宴照常进行。",
      notice: "生日宴提醒：18:50 必须进包房进行寿卡与鲜花布置，拍摄全家福合影；19:00 开餐，上菜要求极其清淡少油刺。",
      image: "lohkah_resort.webp",
      imageCaption: "七尚酒店 · 宁静五缘海湾",
      routeMap: "route_day4.webp",
      steps: [
        { icon: "🏊", label: "上午", title: "酒店泳池" },
        { icon: "🚗", label: "13:30", title: "换店七尚" },
        { icon: "⛵", label: "17:00", title: "游艇出海" },
        { icon: "🎂", label: "19:00", title: "生日家宴" }
      ],
      timeline: [
        { time: "09:30", label: "华府清晨", text: "在华尔道夫享用早餐，可以在恒温泳池或花园活动。", period: "morn" },
        { time: "13:30", label: "换店七尚", text: "退房打车前往五缘湾七尚酒店，前台申请排相邻房间方便照顾。", period: "noon" },
        { time: "14:30", label: "湾畔小憩", text: "七尚入住，在房间内充分午休，避开午后最热骄阳。", period: "aft" },
        { time: "17:00", label: "游艇出海", text: "包动力游艇出海1小时，配遮阳棚，老人孩子吹海风看海鸥。", period: "aft" },
        { time: "18:50", label: "包房庆生", text: "提前进入包房布置‘好事发生’摆件，拍摄70岁寿辰全家福。", period: "eve" },
        { time: "19:00", label: "庆生晚宴", text: "厦餐厅生日家宴，品尝黑金片皮鸭，席间敬茶、分吃长寿面。", period: "night" }
      ]
    },
    {
      dayNum: 5,
      dateText: "8月2日 周日",
      dayName: "周日",
      title: "海湾完整度假日",
      theme: "度假",
      route: ["睡到自然醒", "五缘湾慢步", "酒店下午茶", "静享悠闲"],
      hotel: "七尚酒店 (Lohkah Hotel & Spa)",
      transit: "全天留在酒店范围内活动，无大交通折腾",
      intensity: "low",
      goals: "无换店劳累、彻底休整、老人舒适度假、小孩恒温泳池畅玩",
      contingency: "☀️【高温暴雨及决策预案】：若本日天气极端炎热，主要留在空调房及室内大堂活动。若本日最后决定更换酒店，则上午需进行行李清点，中午12点呼叫礼宾部协助转场搬运行李。",
      notice: "极慢的一天，旨在让奶奶和爷爷彻底从前几天的奔波中恢复体能，享受面海的舒适假期。",
      image: "lohkah_resort.webp",
      imageCaption: "七尚清晨 · 湾区私密园林",
      routeMap: "route_day5.webp",
      steps: [
        { icon: "💤", label: "清晨", title: "睡到自然醒" },
        { icon: "🏊", label: "上午", title: "泳池亲子" },
        { icon: "☕", label: "下午", title: "海湾下午茶" },
        { icon: "🌌", label: "晚上", title: "夜色散步" }
      ],
      timeline: [
        { time: "09:00", label: "自然醒起", text: "睡到自然醒，慢悠悠享用单点式全日早餐，老人最舒服的时段。", period: "morn" },
        { time: "10:30", label: "恒温泳池", text: "带小孩去室外海湾恒温泳池；老人可在水畔树荫躺椅喝果汁休息。", period: "morn" },
        { time: "13:00", label: "水畔轻食", text: "享用酒店轻便午餐，随后回到房间进行2-3小时大午休避暑。", period: "noon" },
        { time: "16:30", label: "海湾慢行", text: "避开最热太阳，沿着五缘湾木栈道轻松漫游30分钟，观游艇出港。", period: "aft" },
        { time: "19:00", label: "海鲜便餐", text: "在七尚周边中餐简餐或房内点餐，以热汤面、温补蒸菜为主。", period: "eve" }
      ]
    },
    {
      dayNum: 6,
      dateText: "8月3日 周一",
      dayName: "周一",
      title: "轻松返程",
      theme: "返程",
      route: ["七尚酒店", "厦门北站", "广州东站"],
      hotel: "温馨的家",
      transit: "七尚酒店 -> 的士前往厦门北站 -> 乘高铁返回广州东",
      intensity: "low",
      goals: "半日闲度假、收纳行李、顺利安全返回广州",
      contingency: "🚄【高铁时间变化预案】：如返程高铁车次微调提前，则直接取消上午湾畔散步，酒店早餐后即退房出发，确保提早1小时到候车室。",
      notice: "返程日严禁增加任何市区景点，减少搬运疲劳，让老人孩子舒舒服服地乘车回家。",
      image: "xiamen_travel_banner.webp",
      imageCaption: "山海回忆 · 温馨返程归途",
      routeMap: "route_day6.webp",
      steps: [
        { icon: "🍳", label: "上午", title: "海湾早餐" },
        { icon: "🎒", label: "上午", title: "清点行囊" },
        { icon: "🚗", label: "中午", title: "去往北站" },
        { icon: "🚄", label: "下午", title: "高铁回穗" }
      ],
      timeline: [
        { time: "08:30", label: "水畔早餐", text: "在七尚临水阳台享用精致早餐，核对退房账单与 FHR 抵扣。", period: "morn" },
        { time: "10:30", label: "行李清点", text: "仔细清点全家证件、长辈常备药、充电器，将大行李打包装车。", period: "morn" },
        { time: "12:00", label: "退房返程", text: "办理退房，乘的士前往厦门北站，预留75分钟车程与安检富余。", period: "noon" },
        { time: "13:30", label: "车站候车", text: "北站大厅安检进站，两大成人分工看行李与取餐，老人小孩在座椅休息。", period: "noon" },
        { time: "下午", label: "高铁抵穗", text: "乘坐高铁安全返回广州东站，结束温馨舒适的七十寿辰感恩之旅！", period: "aft" }
      ]
    }
  ]
};

// --- 美食菜单数据 (包含 tags 与 rec 默认推荐) ---
const menuData = {
  "anxi": [
    {
      "name": "新西兰羊排 (例)",
      "price": 188,
      "desc": "幸福味道特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "铁板牛仔骨 (例)",
      "price": 128,
      "desc": "雪花牛仔骨、黑椒汁",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "金蒜爆雪花牛肉 (例)",
      "price": 168,
      "desc": "牛肉、金蒜",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "壹玖回味鸭皇煲 (例)",
      "price": 158,
      "desc": "幸福味道特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "水煮雪花牛肉 (例)",
      "price": 158,
      "desc": "雪花牛肉、泡菜、云耳 / 🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣"
      ]
    },
    {
      "name": "波特酒爆法国鹅肝 (例)",
      "price": 138,
      "desc": "鹅肝、蒜段、白兰地",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "鲜果酱佐法式鹅肝 (位)",
      "price": 128,
      "desc": "鲜果酱、鹅肝",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "黑椒汁雪花牛仔骨 (位)",
      "price": 78,
      "desc": "雪花牛仔骨、黑椒汁",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "花胶浓汤九年百合 (例)",
      "price": 98,
      "desc": "花胶、干贝、百合",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "沙茶一品锅 (例)",
      "price": 98,
      "desc": "虾滑、豆腐、嫩鸭血、鱿鱼",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "广式辣味芋头煲 (例)",
      "price": 98,
      "desc": "广西贡芋、腊肠、腊肉",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "原香小笋芥菜煲 (例)",
      "price": 88,
      "desc": "幸福味道特色菜品，分量：1例。",
      "checked": true,
      "rec": true,
      "tags": []
    },
    {
      "name": "石锅自制豆腐烩双宝 (例)",
      "price": 88,
      "desc": "自制玉米豆腐、蹄筋、海参",
      "checked": false,
      "rec": false,
      "tags": [
        "孩子友好",
        "老人友好"
      ]
    },
    {
      "name": "韭香芋丝樱花虾 (例)",
      "price": 78,
      "desc": "樱花虾、韭菜花",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "铁板扒黄花鱼 (半条)",
      "price": 68,
      "desc": "幸福味道特色菜品，分量：1半条。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "野山椒酸菜黄骨鱼 (条)",
      "price": 28,
      "desc": "黄骨鱼、酸菜 / 🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣"
      ]
    },
    {
      "name": "金汤野米煮辽参 (位)",
      "price": 88,
      "desc": "辽参、野米、金汤",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "金汤五谷烩花胶 (位)",
      "price": 68,
      "desc": "花胶筒、野米、红腰豆",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "海胆酱海虾球 (例)",
      "price": 128,
      "desc": "新菜推荐特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "墨鱼紫菜拼虾仁排 (例)",
      "price": 108,
      "desc": "新菜推荐特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "脆皮豆腐 (例)",
      "price": 38,
      "desc": "新菜推荐特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "孩子友好",
        "老人友好"
      ]
    },
    {
      "name": "味蕾肚中菌 (例)",
      "price": 98,
      "desc": "新菜推荐特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "本帮茶香五花肉 (例)",
      "price": 68,
      "desc": "新菜推荐特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "石锅焗墨鱼仔 (例)",
      "price": 128,
      "desc": "新菜推荐特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "鲜黄椒酸汤鱼 (例)",
      "price": 268,
      "desc": "🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣"
      ]
    },
    {
      "name": "绣球菌干贝腱子汤 (位)",
      "price": 38,
      "desc": "新菜推荐特色菜品，分量：1位。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "烤鳗菠菜饭 (例)",
      "price": 108,
      "desc": "新菜推荐特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "脆皮妙龄乳鸽 (只)",
      "price": 58,
      "desc": "精致头盘特色菜品，分量：1只。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "幸福特色冻猪手 (例)",
      "price": 58,
      "desc": "精致头盘特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "麻辣开胃黑凤爪 (例)",
      "price": 58,
      "desc": "黑凤爪 / 🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣"
      ]
    },
    {
      "name": "茶香温泉土鸡蛋 (例)",
      "price": 38,
      "desc": "精致头盘特色菜品，分量：1例。",
      "checked": true,
      "rec": true,
      "tags": [
        "孩子友好",
        "老人友好",
        "当地特色"
      ]
    },
    {
      "name": "精美小鱼干 (例)",
      "price": 38,
      "desc": "鸡腿小鱼干",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "脆爽海蜇头 (例)",
      "price": 38,
      "desc": "精致头盘特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "古法手剥傍林笋 (例)",
      "price": 38,
      "desc": "小竹笋、泡椒",
      "checked": true,
      "rec": true,
      "tags": []
    },
    {
      "name": "本地萝卜酸 (例)",
      "price": 28,
      "desc": "精致头盘特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "桂花糯米藕 (例)",
      "price": 28,
      "desc": "糯米藕、桂花",
      "checked": false,
      "rec": false,
      "tags": [
        "孩子友好",
        "老人友好"
      ]
    },
    {
      "name": "安溪小吃拼 (例)",
      "price": 58,
      "desc": "埔头鸡卷、五香条、豆腐",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "碧绿官桥炒豆干 (例)",
      "price": 38,
      "desc": "官桥豆干、韭菜",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "铁观音茶香虾 (例)",
      "price": 128,
      "desc": "明虾、铁观音",
      "checked": true,
      "rec": true,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "山茶油砂锅焗鳗鱼 (例)",
      "price": 198,
      "desc": "山茶油、鳗鱼",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "山茶油焖德化乌鸡 (例)",
      "price": 188,
      "desc": "德化乌鸡、山茶油",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "山茶油猪肚煲豆干 (例)",
      "price": 98,
      "desc": "猪肚、竹笋、豆干",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "幸福茶香排骨 (例)",
      "price": 88,
      "desc": "猪寸排、茶叶",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "山茶油东坑淮山煲 (例)",
      "price": 88,
      "desc": "山茶油、淮山",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "土猪肉焖安溪麻笋煲 (例)",
      "price": 88,
      "desc": "土猪肉、麻笋",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "三味盐露豆干 (例)",
      "price": 58,
      "desc": "茶乡特色特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "铁观音荔浦芋头 (例)",
      "price": 68,
      "desc": "茶乡特色特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "香酥小溪鱼 (例)",
      "price": 68,
      "desc": "茶乡特色特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "湖头咸笋包 (个)",
      "price": 8,
      "desc": "麻笋、瘦肉、艾草",
      "checked": true,
      "rec": true,
      "tags": [
        "孩子友好",
        "老人友好"
      ]
    },
    {
      "name": "土罐焖雁鹅三吃 (例)",
      "price": 1088,
      "desc": "需提前预定（鹅、米血、冬瓜）",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "本地光鱼两吃 (条)",
      "price": 228,
      "desc": "水库光鱼、嫩豆腐",
      "checked": true,
      "rec": true,
      "tags": [
        "有鱼刺"
      ]
    },
    {
      "name": "山茶油小黄姜煎土鸡 (只)",
      "price": 158,
      "desc": "三黄鸡、小黄姜",
      "checked": true,
      "rec": true,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "干贝滋补鸭 (例)",
      "price": 188,
      "desc": "干贝、药膳、小菜鸭",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "红菇炖土鸡汤 (例)",
      "price": 188,
      "desc": "本地土鸡、红菇",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "四物炖红脸番鸭汤 (例)",
      "price": 188,
      "desc": "印月泉水特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "老火慢炖菌菇汤 (例)",
      "price": 108,
      "desc": "印月泉水特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "七彩鲨鱼羹 (例)",
      "price": 98,
      "desc": "巴沙鱼柳、五丝",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "原只椰皇炖辽参 (位)",
      "price": 108,
      "desc": "印月泉水特色菜品，分量：1位。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "黑蒜名仕养生汤 (位)",
      "price": 38,
      "desc": "新鲜寸排、玛卡、黑蒜",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "松茸炖土猪肉汤 (位)",
      "price": 38,
      "desc": "印月泉水特色菜品，分量：1位。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "红菇鸡汤煮湖头米粉 (例)",
      "price": 268,
      "desc": "五谷丰登特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "古法焖湖头米粉 (例)",
      "price": 58,
      "desc": "五谷丰登特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "炒地瓜粉粿 (例)",
      "price": 58,
      "desc": "五谷丰登特色菜品，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "古法煮山珍豆签 (例)",
      "price": 48,
      "desc": "山珍豆签、鱿鱼、虾仁",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "幸福炒饭 (例)",
      "price": 58,
      "desc": "虾仁、叉烧粒、菜心粒",
      "checked": true,
      "rec": true,
      "tags": []
    },
    {
      "name": "石锅紫菜焖饭 (例)",
      "price": 48,
      "desc": "紫菜、虾干、香菇",
      "checked": false,
      "rec": false,
      "tags": []
    }
  ],
  "waldorf": [
    {
      "name": "佛跳墙 (位)",
      "price": 438,
      "desc": "米其林招牌特色",
      "checked": true,
      "rec": true,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "姜母麻油焗闽东黄鱼 (条)",
      "price": 568,
      "desc": "米其林招牌特色",
      "checked": true,
      "rec": true,
      "tags": [
        "FHR额度限制",
        "当地特色"
      ]
    },
    {
      "name": "琥珀糖醋酥炸花胶公 (例)",
      "price": 1688,
      "desc": "招牌特色（另有 328/位）",
      "checked": true,
      "rec": true,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "葱油卤水漳浦填鸭肝 (例)",
      "price": 198,
      "desc": "主厨特别推荐精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "金线莲炖德化石洞汤 (例)",
      "price": 568,
      "desc": "另有 198/位",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "桂圆老酒烧红鲟 (只)",
      "price": 298,
      "desc": "主厨特别推荐精致粤闽风味，分量：1只。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "水煮东山手钓大管 (例)",
      "price": 298,
      "desc": "🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣",
        "当地特色"
      ]
    },
    {
      "name": "永安黄椒干煸去骨甲鱼 (例)",
      "price": 398,
      "desc": "🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣",
        "FHR额度限制"
      ]
    },
    {
      "name": "荞葱煎炒客家牛三宝 (例)",
      "price": 298,
      "desc": "🌶️ 辣",
      "checked": true,
      "rec": true,
      "tags": [
        "🌶️ 辣"
      ]
    },
    {
      "name": "客家干蒸黑猪四点筋 (例)",
      "price": 298,
      "desc": "主厨特别推荐精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "厦门沙茶一锅鲜 (例)",
      "price": 298,
      "desc": "主厨特别推荐精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "泸溪酸菜鲍鱼猪脚饭 (例)",
      "price": 268,
      "desc": "另有 98/位",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "蜜薯焦糖冰淇淋 (位)",
      "price": 38,
      "desc": "主厨特别推荐精致粤闽风味，分量：1位。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "安海土笋冻 (位)",
      "price": 48,
      "desc": "精致头盘精致粤闽风味，分量：1位。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "白切东山深海手钓大红管 (例)",
      "price": 298,
      "desc": "附芥末籽酱、蒜醋汁",
      "checked": true,
      "rec": true,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "福建老酒熟醉波士顿龙虾 (半只)",
      "price": 298,
      "desc": "精致头盘精致粤闽风味，分量：1半只。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "冷渍5头东山鲍鱼 (只)",
      "price": 58,
      "desc": "精致头盘精致粤闽风味，分量：1只。",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "海蜇脆口萝卜皮 (例)",
      "price": 98,
      "desc": "精致头盘精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "鹭岛熟醉虾姑 (例)",
      "price": 168,
      "desc": "精致头盘精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "芫荽沙耳拌香螺 (例)",
      "price": 198,
      "desc": "精致头盘精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "茉莉花蜜桃冬瓜 (例)",
      "price": 58,
      "desc": "精致头盘精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "咸水牛肉 (例)",
      "price": 98,
      "desc": "精致头盘精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "永安黄椒熏猪肚 (例)",
      "price": 118,
      "desc": "🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣"
      ]
    },
    {
      "name": "风干腊乳鸽 (只)",
      "price": 98,
      "desc": "精致头盘精致粤闽风味，分量：1只。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "开胃茴香球 (例)",
      "price": 58,
      "desc": "🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣"
      ]
    },
    {
      "name": "醋汁酥芋 (例)",
      "price": 58,
      "desc": "精致头盘精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "虾皮酱炝百合 (例)",
      "price": 98,
      "desc": "精致头盘精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "风干东山巴浪鱼 (例)",
      "price": 168,
      "desc": "精致头盘精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "南胜咸水老鹅头 (半个)",
      "price": 1088,
      "desc": "提前24小时预订",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "荔枝木蜜制叉烧 (例)",
      "price": 168,
      "desc": "烧腊精致粤闽风味，分量：1例。",
      "checked": true,
      "rec": true,
      "tags": []
    },
    {
      "name": "脆皮烧腩仔 (例)",
      "price": 168,
      "desc": "烧腊精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "生炸脆皮乳鸽 (只)",
      "price": 98,
      "desc": "烧腊精致粤闽风味，分量：1只。",
      "checked": true,
      "rec": true,
      "tags": []
    },
    {
      "name": "本港鱿鱼母老鸽炖土龙 (例)",
      "price": 1288,
      "desc": "提前6小时预订",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "熟地炖连城白鸭 (例)",
      "price": 268,
      "desc": "汤类精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "文蛤香螺汤 (例)",
      "price": 298,
      "desc": "汤类精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "头水紫菜关东辽参 (位)",
      "price": 188,
      "desc": "汤类精致粤闽风味，分量：1位。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "红菇鱼饺炖鲜竹荪 (位)",
      "price": 108,
      "desc": "汤类精致粤闽风味，分量：1位。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "原椰清炖花胶汤 (位)",
      "price": 188,
      "desc": "汤类精致粤闽风味，分量：1位。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "泉州牛肉羹 (例)",
      "price": 168,
      "desc": "汤类精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "崇武蛭干蟹肉蛋白坑 (例)",
      "price": 158,
      "desc": "汤类精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "诗山小镇焖猪婆参 (例)",
      "price": 498,
      "desc": "鲍参肚&燕窝精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "沙茶干烧12头干鲍 (位)",
      "price": 468,
      "desc": "鲍参肚&燕窝精致粤闽风味，分量：1位。",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制",
        "当地特色"
      ]
    },
    {
      "name": "原椰椰汁炖燕窝 (位)",
      "price": 328,
      "desc": "鲍参肚&燕窝精致粤闽风味，分量：1位。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "黑松露年糕烧花胶公 (例)",
      "price": 1688,
      "desc": "鲍参肚&燕窝精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "永春老醋溪鳗烧花胶公 (例)",
      "price": 1888,
      "desc": "鲍参肚&燕窝精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "风味萝卜酱焗炒波士顿龙虾 (只)",
      "price": 568,
      "desc": "海鲜精致粤闽风味，分量：1只。",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "黑椒海蛎小青龙 (只)",
      "price": 398,
      "desc": "海鲜精致粤闽风味，分量：1只。",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "沙茶琉璃虾 (例)",
      "price": 268,
      "desc": "海鲜精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "滋滋老姜生焗黑油鳗 (例)",
      "price": 198,
      "desc": "海鲜精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "青青嫩韭炒小象拔蚌 (例)",
      "price": 228,
      "desc": "海鲜精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "酱油水东山圈养巴浪鱼 (例)",
      "price": 218,
      "desc": "海鲜精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "水煮东山手钓大管 (例)",
      "price": 298,
      "desc": "🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣",
        "当地特色"
      ]
    },
    {
      "name": "风味海蛎煎 (例)",
      "price": 98,
      "desc": "海鲜精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "花菇年糕烧膏蟹 (只)",
      "price": 298,
      "desc": "海鲜精致粤闽风味，分量：1只。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "生炝正红东星斑 (条)",
      "price": 908,
      "desc": "海鲜精致粤闽风味，分量：1条。",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "藤椒橄榄油浸老虎斑 (条)",
      "price": 388,
      "desc": "🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣",
        "FHR额度限制"
      ]
    },
    {
      "name": "红鲟糯米饭 (350克) (只)",
      "price": 298,
      "desc": "海鲜精致粤闽风味，分量：1只。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "闽东黄鱼 (条)",
      "price": 568,
      "desc": "生猛海鲜精致粤闽风味，分量：1条。",
      "checked": true,
      "rec": true,
      "tags": [
        "FHR额度限制",
        "当地特色"
      ]
    },
    {
      "name": "老虎斑 (条)",
      "price": 388,
      "desc": "生猛海鲜精致粤闽风味，分量：1条。",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "东星斑 (50g)",
      "price": 50,
      "desc": "做法可选：藤椒橄榄油浸/青青椒麻蒸/生炝",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "象拔蚌 (50g)",
      "price": 120,
      "desc": "生猛海鲜精致粤闽风味，分量：150g。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "大响螺 (50g)",
      "price": 150,
      "desc": "做法可选：鸡油淋/椒麻炒/黄椒蒸",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "富贵虾 (50g)",
      "price": 120,
      "desc": "做法可选：清蒸/糯米蒸/风味萝卜酱炒/砂锅焗",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "帝王蟹 (50g)",
      "price": 60,
      "desc": "提前12小时预订",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "松叶蟹 (50g)",
      "price": 50,
      "desc": "提前12小时预订",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "小青龙 (条)",
      "price": 388,
      "desc": "生猛海鲜精致粤闽风味，分量：1条。",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "红龙虾 (50g)",
      "price": 100,
      "desc": "生猛海鲜精致粤闽风味，分量：150g。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "狮城牛排焖牛筋 (例)",
      "price": 368,
      "desc": "肉禽类精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "永安黄椒蒸羔羊排 (例)",
      "price": 268,
      "desc": "🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣"
      ]
    },
    {
      "name": "发酵鱼露炝塘排 (例)",
      "price": 298,
      "desc": "肉禽类精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "三椒炒肥肠 (例)",
      "price": 128,
      "desc": "🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣"
      ]
    },
    {
      "name": "榕城荔枝肉 (例)",
      "price": 128,
      "desc": "肉禽类精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "同安封肉配红糖馒头 (例)",
      "price": 108,
      "desc": "肉禽类精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "酥炸醋肉 (例)",
      "price": 78,
      "desc": "肉禽类精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "酥炸五香卷配泉州甜辣酱 (例)",
      "price": 78,
      "desc": "肉禽类精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "砂锅松露花胶福建乌鸡 (例)",
      "price": 268,
      "desc": "肉禽类精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "客家盐酒煮河田鸡 (例)",
      "price": 188,
      "desc": "含有当参",
      "checked": true,
      "rec": true,
      "tags": []
    },
    {
      "name": "鲜承姜母鸭 (例)",
      "price": 158,
      "desc": "肉禽类精致粤闽风味，分量：1例。",
      "checked": true,
      "rec": true,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "头水紫菜炒山苏 (例)",
      "price": 88,
      "desc": "蔬食精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "拍蒜炒小板青 (例)",
      "price": 88,
      "desc": "蔬食精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "家乡闽北笋干 (例)",
      "price": 98,
      "desc": "蔬食精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "酱皇翡翠丝瓜 (例)",
      "price": 88,
      "desc": "🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣"
      ]
    },
    {
      "name": "海味石锅芥兰 (例)",
      "price": 88,
      "desc": "蔬食精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "芋艿煲手撕豆腐 (例)",
      "price": 118,
      "desc": "蔬食精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "孩子友好",
        "老人友好"
      ]
    },
    {
      "name": "时令田园蔬菜 (例)",
      "price": 58,
      "desc": "做法：豉油皇/清炒/蒜茸/上汤",
      "checked": true,
      "rec": true,
      "tags": []
    },
    {
      "name": "鲜承海鲜泡饭 (例)",
      "price": 138,
      "desc": "主食精致粤闽风味，分量：1例。",
      "checked": true,
      "rec": true,
      "tags": [
        "孩子友好",
        "老人友好"
      ]
    },
    {
      "name": "红菇芋圆炒米粉 (例)",
      "price": 158,
      "desc": "主食精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "泉州卤面 (例)",
      "price": 98,
      "desc": "另有 58/位",
      "checked": true,
      "rec": true,
      "tags": []
    },
    {
      "name": "黄鱼煮面线 (位)",
      "price": 78,
      "desc": "主食精致粤闽风味，分量：1位。",
      "checked": true,
      "rec": true,
      "tags": []
    },
    {
      "name": "厦门沙茶面 (位)",
      "price": 68,
      "desc": "主食精致粤闽风味，分量：1位。",
      "checked": true,
      "rec": true,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "同安封肉蒸牛角包 (例)",
      "price": 98,
      "desc": "主食精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "鹭岛香芋花生汤 (位)",
      "price": 38,
      "desc": "甜品精致粤闽风味，分量：1位。",
      "checked": true,
      "rec": true,
      "tags": [
        "孩子友好",
        "老人友好"
      ]
    },
    {
      "name": "冷萃茶石花冻 (位)",
      "price": 38,
      "desc": "甜品精致粤闽风味，分量：1位。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "鲜莲子奶冻 (位)",
      "price": 48,
      "desc": "甜品精致粤闽风味，分量：1位。",
      "checked": false,
      "rec": false,
      "tags": [
        "孩子友好",
        "老人友好"
      ]
    },
    {
      "name": "闽北燕窝板栗饼 (例)",
      "price": 58,
      "desc": "甜品精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "鼓浪屿馅饼 (例)",
      "price": 38,
      "desc": "甜品精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "凤梨酥 (例)",
      "price": 38,
      "desc": "甜品精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "鲜承绿豆糕 (例)",
      "price": 38,
      "desc": "甜品精致粤闽风味，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "孩子友好",
        "老人友好"
      ]
    },
    {
      "name": "厦门麻糍 (位)",
      "price": 38,
      "desc": "甜品精致粤闽风味，分量：1位。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "文火腰果露汤圆 (位)",
      "price": 38,
      "desc": "甜品精致粤闽风味，分量：1位。",
      "checked": false,
      "rec": false,
      "tags": []
    }
  ],
  "lohkah": [
    {
      "name": "闽东壹鱼 (黄鱼) (例)",
      "price": 1277,
      "desc": "可选：清蒸、家常、沸腾、老菜脯焗",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制",
        "当地特色"
      ]
    },
    {
      "name": "鸡油甘树子浸白鱼 (例)",
      "price": 1277,
      "desc": "高端定制/招牌高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "一头黑金鲍 (例)",
      "price": 1377,
      "desc": "需提前6小时预订",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "农家土鸡砂锅焖鲟龙鱼筋 (例)",
      "price": 1977,
      "desc": "需提前6小时预订",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "嫩姜芽炒蛏子皇 (例)",
      "price": 257,
      "desc": "特色小炒/海鲜高端定制海湾晚宴，分量：1例。",
      "checked": true,
      "rec": true,
      "tags": []
    },
    {
      "name": "酱油水小黄鱼 (例)",
      "price": 177,
      "desc": "特色小炒/海鲜高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "诏安青梅番茄玉带子 (例)",
      "price": 257,
      "desc": "特色小炒/海鲜高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "九层塔脆瓜炒花螺 (例)",
      "price": 257,
      "desc": "特色小炒/海鲜高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "陈年老萝卜焗竹午鱼 (例)",
      "price": 257,
      "desc": "特色小炒/海鲜高端定制海湾晚宴，分量：1例。",
      "checked": true,
      "rec": true,
      "tags": []
    },
    {
      "name": "导美青梅番茄玉带子 (例)",
      "price": 257,
      "desc": "特色小炒/海鲜高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "奶白菜炒南日鲍 (例)",
      "price": 237,
      "desc": "特色小炒/海鲜高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "芦溪咸菜浸脆管 (例)",
      "price": 237,
      "desc": "🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣"
      ]
    },
    {
      "name": "永安黄椒烧角蟹佐年糕 (例)",
      "price": 427,
      "desc": "🌶️ 辣",
      "checked": true,
      "rec": true,
      "tags": [
        "🌶️ 辣",
        "FHR额度限制"
      ]
    },
    {
      "name": "虾籽茭白炒小斑节虾 (例)",
      "price": 237,
      "desc": "🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣"
      ]
    },
    {
      "name": "同安煎蟹 (例)",
      "price": 397,
      "desc": "特色小炒/海鲜高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制",
        "当地特色"
      ]
    },
    {
      "name": "三葱烧闽江河鳗 (例)",
      "price": 237,
      "desc": "🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣",
        "当地特色"
      ]
    },
    {
      "name": "香茅鲜笋炒牛舌 (例)",
      "price": 297,
      "desc": "精选肉类/热荤高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "自制腊肉蒸时令鲜笋 (例)",
      "price": 127,
      "desc": "精选肉类/热荤高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "凤梨脆皮糖醋肉 (例)",
      "price": 87,
      "desc": "精选肉类/热荤高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "茶油猪肚烧丝瓜 (例)",
      "price": 147,
      "desc": "精选肉类/热荤高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "酸汤汆雪花牛肉 (位)",
      "price": 127,
      "desc": "2位起点 / 🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣"
      ]
    },
    {
      "name": "椒香脆皮牛腩佐土咖喱 (例)",
      "price": 397,
      "desc": "精选肉类/热荤高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "木姜子白切肥肠 (例)",
      "price": 167,
      "desc": "精选肉类/热荤高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "猎爪菇炒德化黑鸡 (例)",
      "price": 187,
      "desc": "精选肉类/热荤高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "闽南沙茶炖牛尾 (例)",
      "price": 297,
      "desc": "🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣",
        "当地特色"
      ]
    },
    {
      "name": "老姜砂锅排骨 (例)",
      "price": 177,
      "desc": "精选肉类/热荤高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "老姜砂锅焗羊腩 (例)",
      "price": 327,
      "desc": "精选肉类/热荤高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "猎爪菇烧芋仔佐火腿 (例)",
      "price": 157,
      "desc": "🌶️ 辣",
      "checked": true,
      "rec": true,
      "tags": [
        "🌶️ 辣"
      ]
    },
    {
      "name": "丘北椒煎焗脆皮小奶猪 (半只)",
      "price": 497,
      "desc": "需提前2小时预订 / 🌶️ 辣 (整只 977)",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣",
        "FHR额度限制"
      ]
    },
    {
      "name": "冰烧三层肉 (例)",
      "price": 127,
      "desc": "招牌烧腊/烤肉高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "沙姜啫石岐乳鸽 (只)",
      "price": 87,
      "desc": "招牌烧腊/烤肉高端定制海湾晚宴，分量：1只。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "黑金果木片皮鸭 (例)",
      "price": 397,
      "desc": "配鱼子酱",
      "checked": true,
      "rec": true,
      "tags": [
        "FHR额度限制"
      ]
    },
    {
      "name": "饷厦脆皮鸡 (例)",
      "price": 187,
      "desc": "招牌烧腊/烤肉高端定制海湾晚宴，分量：1例。",
      "checked": true,
      "rec": true,
      "tags": []
    },
    {
      "name": "红葱酥南日鲜鲍 (只)",
      "price": 57,
      "desc": "2只起点",
      "checked": true,
      "rec": true,
      "tags": [
        "孩子友好",
        "老人友好"
      ]
    },
    {
      "name": "芋泥香酥鸭 (例)",
      "price": 77,
      "desc": "精致冷盘高端定制海湾晚宴，分量：1例。",
      "checked": true,
      "rec": true,
      "tags": [
        "孩子友好",
        "老人友好"
      ]
    },
    {
      "name": "白切海钓东山大管 (例)",
      "price": 247,
      "desc": "🌶️ 辣",
      "checked": true,
      "rec": true,
      "tags": [
        "🌶️ 辣",
        "当地特色"
      ]
    },
    {
      "name": "青葱油海蜇花 (例)",
      "price": 97,
      "desc": "精致冷盘高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "贵妃蚌土笋冻 (位)",
      "price": 87,
      "desc": "精致冷盘高端定制海湾晚宴，分量：1位。",
      "checked": true,
      "rec": true,
      "tags": []
    },
    {
      "name": "永春醋汁捞螺片 (例)",
      "price": 157,
      "desc": "精致冷盘高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "泉州捆蹄拌凉粉 (例)",
      "price": 97,
      "desc": "🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣"
      ]
    },
    {
      "name": "文火陈皮牛展 (例)",
      "price": 97,
      "desc": "精致冷盘高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "韭香浸长汀河田鸡 (例)",
      "price": 127,
      "desc": "精致冷盘高端定制海湾晚宴，分量：1例。",
      "checked": true,
      "rec": true,
      "tags": []
    },
    {
      "name": "沉缸老酒浸罗氏虾 (例)",
      "price": 177,
      "desc": "精致冷盘高端定制海湾晚宴，分量：1例。",
      "checked": true,
      "rec": true,
      "tags": []
    },
    {
      "name": "盐水漳浦填鸭肝 (例)",
      "price": 177,
      "desc": "精致冷盘高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": [
        "当地特色"
      ]
    },
    {
      "name": "樱桃萝卜一夜渍 (例)",
      "price": 77,
      "desc": "精致冷盘高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "松露脆香素鹅 (例)",
      "price": 87,
      "desc": "精致冷盘高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "橄榄菜焗扁豆 (例)",
      "price": 57,
      "desc": "精致冷盘高端定制海湾晚宴，分量：1例。",
      "checked": true,
      "rec": true,
      "tags": []
    },
    {
      "name": "脆椒清流腐竹 (例)",
      "price": 77,
      "desc": "🌶️ 辣",
      "checked": false,
      "rec": false,
      "tags": [
        "🌶️ 辣"
      ]
    },
    {
      "name": "自制腊肉蒸建瓯冬笋 (例)",
      "price": 127,
      "desc": "主食/汤品/甜点高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "沙虫双脆鳕鱼盏 (例)",
      "price": 87,
      "desc": "🌶️ 辣",
      "checked": true,
      "rec": true,
      "tags": [
        "🌶️ 辣"
      ]
    },
    {
      "name": "梅干菜猪油粕捞饭 (例)",
      "price": 197,
      "desc": "主食/汤品/甜点高端定制海湾晚宴，分量：1例。",
      "checked": true,
      "rec": true,
      "tags": []
    },
    {
      "name": "头水紫菜煲沙地萝卜 (例)",
      "price": 117,
      "desc": "主食/汤品/甜点高端定制海湾晚宴，分量：1例。",
      "checked": false,
      "rec": false,
      "tags": []
    },
    {
      "name": "陈皮莲子红豆沙 (位)",
      "price": 47,
      "desc": "主食/汤品/甜点高端定制海湾晚宴，分量：1位。",
      "checked": true,
      "rec": true,
      "tags": [
        "孩子友好",
        "老人友好"
      ]
    }
  ]
};

// --- 画卷相册照片墙数据 (8 张 WebP 景图) ---
const galleryData = [
  { src: "anxi_resort.webp", date: "7月29日", location: "安溪悦泉行馆", desc: "山林郁郁，温泉白雾升腾，奶奶出行第一天清幽避暑之景。" },
  { src: "gulangyu_island.webp", date: "7月30日", location: "鼓浪屿琴岛", desc: "日光岩下，红瓦老洋房与海滨绿树，午后安宁的海岛时光。" },
  { src: "huangyan_36.webp", date: "7月30日", location: "晃岩36号客栈", desc: "具有百年历史的西式石雕老别墅，私享繁花掩映的静谧庭院。" },
  { src: "lujiang_night.webp", date: "7月31日", location: "鹭江道海滨", desc: "华灯初上，对岸鼓浪屿的万家灯火与金黄渡轮在海面交织出梦幻之景。" },
  { src: "zhongshan_road.webp", date: "7月31日", location: "中山路步行街", desc: "连绵的闽南骑楼廊柱投下历史光影，长辈品尝花生汤的温馨角落。" },
  { src: "lohkah_resort.webp", date: "8月1日", location: "五缘湾畔七尚", desc: "私密且高雅的水畔建筑，海天一色，为奶奶庆生提供的绝佳大堂机位。" },
  { src: "waldorf_dining.webp", date: "8月1日", location: "七尚·生日晚宴", desc: "铺满好事发生花瓣的精致餐桌，黑金片皮鸭与全家福合影的欢乐寿宴。" },
  { src: "xiamen_travel_banner.webp", date: "8月3日", location: "厦门北站高铁", desc: "干净明亮的候车大厅，全家收拾行李乘车返穗，旅程圆满落幕。" }
];

// --- 清单数据 (带默认 owner) ---
const checklistData = {
  traffic: [
    { text: "全家6人往返高铁车票及座位确认", checked: false, owner: "爸爸" },
    { text: "厦门北站租车行 7 座商务 MPV 预订确认", checked: false, owner: "爸爸" },
    { text: "7/30 14:30 往返鼓浪屿东渡六人船票核对", checked: false, owner: "妈妈" },
    { text: "高德地图 8 个旅途导航链接收藏并发送家人群", checked: false, owner: "爸爸" }
  ],
  hotel: [
    { text: "安溪悦泉两房连通/相邻备注及儿童增高垫备注", checked: false, owner: "酒店确认" },
    { text: "鼓浪屿晃岩 36 管家行李接送及次日离店船票对接", checked: false, owner: "酒店确认" },
    { text: "华尔道夫鲜承午餐关联两间房 FHR 抵扣平拆平摊确认", checked: false, owner: "酒店确认" },
    { text: "七尚酒店8月1日-3日大床/双床相邻预订及 Chase 酒店券挂接", checked: false, owner: "酒店确认" }
  ],
  birthday: [
    { text: "七尚包房免费生日长寿面及简单花瓣布置对接", checked: false, owner: "酒店确认" },
    { text: "“好事发生”生日桌面立牌与庆生大红包准备", checked: false, owner: "妈妈" },
    { text: "奶奶70岁生日寿卡手写与吹蜡烛小物件清点", checked: false, owner: "妈妈" },
    { text: "单反相机/备用电池及拍照手机内存提前清理", checked: false, owner: "爸爸" }
  ],
  overnight: [
    { text: "长辈及儿童实名身份证件原件 (上船必带，放随身包)", checked: false, owner: "出发当天检查" },
    { text: "过夜包精简衣物 (1晚量，不背行李箱，极轻装上岛)", checked: false, owner: "妈妈" },
    { text: "海岛户外防蚊贴、防蚊手环 (儿童专用)", checked: false, owner: "妈妈" },
    { text: "充电线、充电宝、相机备用电池放入随身包", checked: false, owner: "出发当天检查" }
  ],
  health: [
    { text: "长辈降压药/血糖常备药及急救速效救心丸 (必备7天量随身带)", checked: false, owner: "出发当天检查" },
    { text: "长辈健步防滑老布鞋/软底鞋清点", checked: false, owner: "妈妈" },
    { text: "高倍数物理防晒霜、轻便防晒帽、防紫外线晴雨伞", checked: false, owner: "出发当天检查" },
    { text: "随身保温杯 (高铁/乘凉时接温水饮用符合长辈习惯)", checked: false, owner: "出发当天检查" }
  ]
};

// --- 初始化入口 ---
document.addEventListener("DOMContentLoaded", () => {
  // 1. 读取 LocalStorage 状态
  loadLocalState();
  
  // 2. 更新寿宴倒计时
  updateCountdown();
  
  // 3. 渲染全部模块
  renderAll();
});

// --- 渲染总指挥 ---
function renderAll() {
  renderDayNav();
  renderItinerary();
  renderVisualGallery();
  renderMenus();
  renderChecklists();
}

// --- 1. 老人大字模式切换逻辑 ---
function toggleSeniorsMode() {
  seniorsModeActive = !seniorsModeActive;
  const body = document.body;
  const btn = document.getElementById("btn-seniors-mode");
  
  if (seniorsModeActive) {
    body.classList.add("seniors-mode");
    if (btn) btn.innerHTML = "👴 恢复默认字体模式";
  } else {
    body.classList.remove("seniors-mode");
    if (btn) btn.innerHTML = "👵 开启老人大字模式";
  }
  
  saveLocalState();
  showToast(seniorsModeActive ? "老人大字阅读模式已开启" : "已恢复默认阅读模式");
}

// --- 2. 寿辰出发倒计时计算 ---
function updateCountdown() {
  const targetDate = new Date("2026-07-29T00:00:00+08:00");
  const currentDate = new Date();
  
  const targetMidnight = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const currentMidnight = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  
  const timeDiff = targetMidnight.getTime() - currentMidnight.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  const countdownEl = document.getElementById("countdown-days-val");
  if (countdownEl) {
    if (daysDiff > 0) {
      countdownEl.innerHTML = `${daysDiff} <small style="font-size: 14px; font-weight: 600;">天</small>`;
    } else if (daysDiff === 0) {
      countdownEl.innerHTML = `<span style="font-size: 16px; font-weight: 700; color: #e74c3c;">🎉 今天启程！</span>`;
    } else if (daysDiff >= -5) {
      countdownEl.innerHTML = `<span style="font-size: 16px; font-weight: 700; color: #e74c3c;">🎂 旅程进行中！</span>`;
    } else {
      countdownEl.innerHTML = `<span style="font-size: 16px; font-weight: 700; color: #7f8c8d;">✨ 旅程已圆满</span>`;
    }
  }
}

// --- 3. 渲染天数快捷导航 ---
function renderDayNav() {
  const navContainer = document.getElementById("day-nav-list");
  const days = itineraryData[currentVersion];
  if (!navContainer) return;
  
  navContainer.innerHTML = days.map((day, idx) => `
    <button class="day-nav-btn ${idx === 0 ? 'active' : ''}" id="nav-btn-day-${day.dayNum}" onclick="scrollToDay(${day.dayNum})">
      <span class="d-num">D${day.dayNum} · ${day.theme || ''}</span>
      <span class="d-name">${day.dayName}</span>
    </button>
  `).join('');
}

// --- 4. 渲染日程明细卡片 ---
function renderItinerary() {
  const container = document.getElementById("itinerary-list");
  const days = itineraryData[currentVersion];
  if (!container) return;
  
  container.innerHTML = days.map(day => {
    // 渲染动线
    const routeHtml = day.route.map((r, rIdx) => 
      `<span>${r}</span>` + (rIdx < day.route.length - 1 ? `<span class="route-arrow">➔</span>` : '')
    ).join('');

    // 体力等级文字
    let intensityLabel = "低（松弛）";
    if (day.intensity === "mid") intensityLabel = "中（适度）";
    if (day.intensity === "high") intensityLabel = "高（微累）";

    // 四步流程
    const stepsHtml = day.steps.map((st, sIdx) => `
      <div class="visual-step-node">
        <span class="vs-icon">${st.icon}</span>
        <span class="vs-copy">
          <small>${st.label}</small>
          <b>${st.title}</b>
        </span>
      </div>
      ${sIdx < day.steps.length - 1 ? `<span class="vs-arrow">→</span>` : ''}
    `).join('');

    // 双相册
    const galleryHtml = `
      <div class="day-gallery">
        ${day.image ? `
          <figure>
            <img src="${day.image}" alt="风景" loading="lazy">
            <figcaption><span>景</span>${day.imageCaption}</figcaption>
          </figure>
        ` : ''}
        ${day.routeMap ? `
          <figure>
            <img src="${day.routeMap}" alt="路线" loading="lazy">
            <figcaption><span>路</span>今日手绘路线</figcaption>
          </figure>
        ` : ''}
      </div>
    `;

    return `
      <div class="day-card" id="day-card-${day.dayNum}">
        <!-- 卡片头部 -->
        <div class="day-card-header">
          <div class="header-top">
            <span class="day-badge">Day ${day.dayNum}</span>
            <span class="day-date">${day.dateText}</span>
          </div>
          <div class="header-title-row">
            <h3>${day.title}</h3>
            <div class="route-flow">${routeHtml}</div>
          </div>
        </div>

        <!-- 4大顶部核心信息 -->
        <div class="meta-grid">
          <div class="meta-item">
            <span class="meta-icon">🏡</span>
            <div class="meta-text">
              <strong>今晚住宿</strong>
              <span>${day.hotel}</span>
            </div>
          </div>
          <div class="meta-item">
            <span class="meta-icon">🔋</span>
            <div class="meta-text">
              <strong>体力强度</strong>
              <span>${intensityLabel}</span>
              <div class="intensity-bar-bg">
                <div class="intensity-bar-fill ${day.intensity}"></div>
              </div>
            </div>
          </div>
          <div class="meta-item">
            <span class="meta-icon">🚗</span>
            <div class="meta-text">
              <strong>核心交通</strong>
              <span>${day.transit}</span>
            </div>
          </div>
          <div class="meta-item">
            <span class="meta-icon">🎯</span>
            <div class="meta-text">
              <strong>今日必达</strong>
              <span>${day.goals}</span>
            </div>
          </div>
        </div>

        <!-- 双图 -->
        ${galleryHtml}

        <!-- 四步流程 -->
        <div class="easy-route-container">
          <div class="easy-route-title">
            <span>🎨 看图版 · 今日四步</span>
            <small>长辈沿着箭头一眼看懂</small>
          </div>
          <div class="easy-route-steps">
            ${stepsHtml}
          </div>
        </div>

        <!-- 天气/体力备选方案 -->
        <div class="contingency-container" id="contingency-container-${day.dayNum}">
          <button class="contingency-toggle" onclick="toggleContingency(${day.dayNum})">
            <span>🌦️ 天气 / 体力备选预案</span>
            <span class="toggle-arrow">▼</span>
          </button>
          <div class="contingency-panel">
            <p>${day.contingency}</p>
          </div>
        </div>

        <!-- 折叠详细行程控制 -->
        <button class="timeline-toggle-btn" id="timeline-toggle-${day.dayNum}" onclick="toggleTimeline(${day.dayNum})">
          📖 展开详细日程安排 ➔
        </button>

        <!-- 隐藏的24h详细时间轴 -->
        <div class="timeline-panel" id="timeline-panel-${day.dayNum}">
          <div class="timeline-container">
            <div class="timeline">
              ${day.timeline.map(t => `
                <div class="timeline-item">
                  <div class="timeline-node"></div>
                  <div class="timeline-time-block">
                    <span class="timeline-time">${t.time}</span>
                    <span class="timeline-tag tag-${t.period}">${t.label}</span>
                  </div>
                  <div class="timeline-content">${t.text}</div>
                </div>
              `).join('')}
            </div>
            ${day.notice ? `
              <div class="card-notice">
                <span>💡</span>
                <div>${day.notice}</div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');

  bindScrollSpy();
}

// 展开/收起备选预案
function toggleContingency(dayNum) {
  const container = document.getElementById(`contingency-container-${dayNum}`);
  if (container) {
    container.classList.toggle("expanded");
  }
}

// 展开/收起24h日程折叠栏
function toggleTimeline(dayNum) {
  const panel = document.getElementById(`timeline-panel-${dayNum}`);
  const btn = document.getElementById(`timeline-toggle-${dayNum}`);
  if (!panel || !btn) return;
  
  panel.classList.toggle("expanded");
  if (panel.classList.contains("expanded")) {
    btn.innerHTML = "📖 收起详细日程安排 ↩";
  } else {
    btn.innerHTML = "📖 展开详细日程安排 ➔";
  }
}

// --- 5. 渲染旅途画卷 (Mosaic Staggered Photo Gallery) ---
function renderVisualGallery() {
  const container = document.getElementById("mosaic-gallery-container");
  if (!container) return;
  
  container.innerHTML = galleryData.map((img, idx) => `
    <div class="mosaic-item" onclick="openLightbox(${idx})">
      <img src="${img.src}" alt="${img.location}" loading="lazy" onerror="this.src='xiamen_travel_banner.webp';">
      <div class="item-meta">
        <span class="item-title">${img.location}</span>
        <span class="item-loc">${img.date}</span>
      </div>
    </div>
  `).join('');
}

// 全屏相册灯箱 Lightbox 逻辑
function openLightbox(index) {
  currentLightboxIndex = index;
  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-img");
  const dateEl = document.getElementById("lightbox-date");
  const locEl = document.getElementById("lightbox-location");
  const descEl = document.getElementById("lightbox-desc");
  
  if (!modal || !modalImg) return;
  
  const imgData = galleryData[currentLightboxIndex];
  modalImg.src = imgData.src;
  if (dateEl) dateEl.textContent = `📅 ${imgData.date}`;
  if (locEl) locEl.textContent = `📍 ${imgData.location}`;
  if (descEl) descEl.textContent = imgData.desc;
  
  modal.style.display = "flex";
  
  // 绑定键盘左右翻页
  document.addEventListener("keydown", handleLightboxKeyDown);
}

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  if (modal) modal.style.display = "none";
  document.removeEventListener("keydown", handleLightboxKeyDown);
}

function prevLightbox(event) {
  if (event) event.stopPropagation();
  currentLightboxIndex = (currentLightboxIndex - 1 + galleryData.length) % galleryData.length;
  openLightbox(currentLightboxIndex);
}

function nextLightbox(event) {
  if (event) event.stopPropagation();
  currentLightboxIndex = (currentLightboxIndex + 1) % galleryData.length;
  openLightbox(currentLightboxIndex);
}

function handleLightboxKeyDown(event) {
  if (event.key === "ArrowLeft") prevLightbox();
  if (event.key === "ArrowRight") nextLightbox();
  if (event.key === "Escape") closeLightbox();
}

// --- 6. 互动美食菜单切换与计算 ---
let activeMenuTab = 'anxi'; // 当前美食选项卡

function switchMenuTab(tabId) {
  activeMenuTab = tabId;
  document.querySelectorAll(".menu-tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".menu-panel").forEach(p => p.classList.remove("active"));
  
  const targetBtn = document.getElementById(`tab-btn-${tabId}`);
  const targetPanel = document.getElementById(`menu-${tabId}`);
  
  if (targetBtn) targetBtn.classList.add("active");
  if (targetPanel) targetPanel.classList.add("active");
  
  // 重新计算并刷新视图
  calculateMenuCosts();
}

function renderMenus() {
  const tabs = ['anxi', 'waldorf', 'lohkah'];
  tabs.forEach(tab => {
    const listEl = document.getElementById(`list-menu-${tab}`);
    if (listEl) {
      listEl.innerHTML = menuData[tab].map((item, idx) => {
        const tagHtml = item.tags.map(t => {
          let typeClass = 'local';
          if (t === '老人友好') typeClass = 'senior';
          if (t === '孩子友好') typeClass = 'child';
          if (t === '少辣') typeClass = 'spicy';
          if (t === '有鱼刺') typeClass = 'bone';
          if (t === 'FHR额度限制') typeClass = 'fhr';
          return `<span class="dish-tag ${typeClass}">${t}</span>`;
        }).join('');
        
        return `
          <div class="menu-item-row ${item.checked ? 'selected' : ''}" onclick="toggleMenuItem('${tab}', ${idx})">
            <input type="checkbox" class="menu-checkbox" ${item.checked ? 'checked' : ''} onclick="event.stopPropagation(); toggleMenuItem('${tab}', ${idx})">
            <div class="dish-info">
              <div class="dish-name-row">
                <span class="dish-name">${item.name}</span>
                <span class="dish-price">${item.price > 0 ? '¥' + item.price : '赠送'}</span>
              </div>
              <div class="dish-recommend">${item.desc}</div>
              <div class="dish-tags">${tagHtml}</div>
            </div>
          </div>
        `;
      }).join('');
    }
  });
  
  calculateMenuCosts();
}

function toggleMenuItem(restaurant, idx) {
  menuData[restaurant][idx].checked = !menuData[restaurant][idx].checked;
  renderMenus();
  saveLocalState();
}

// 批量勾选/清空
function batchSelectMenu(checkState) {
  menuData[activeMenuTab].forEach(item => item.checked = checkState);
  renderMenus();
  saveLocalState();
  showToast(checkState ? "已全部勾选菜品" : "已全部清空菜品");
}

// 恢复推荐
function restoreMenuRecommend() {
  menuData[activeMenuTab].forEach(item => item.checked = item.rec);
  renderMenus();
  saveLocalState();
  showToast("已恢复默认推荐菜品");
}

// 计算菜品费用
function calculateMenuCosts() {
  let selectedCount = 0;
  let subtotal = 0;
  let serviceFee = 0;
  let total = 0;
  let perPerson = 0;
  
  menuData[activeMenuTab].forEach(item => {
    if (item.checked) {
      selectedCount++;
      subtotal += item.price;
    }
  });
  
  // 华尔道夫和安溪加 15% 服务费
  if (activeMenuTab === 'waldorf' || activeMenuTab === 'anxi') {
    serviceFee = Math.round(subtotal * 0.15);
  }
  
  total = subtotal + serviceFee;
  perPerson = Math.round(total / 6);
  
  // 更新看板
  const countEl = document.getElementById("calc-dish-count");
  const subEl = document.getElementById("calc-dish-subtotal");
  const serviceEl = document.getElementById("calc-service-fee");
  const totalEl = document.getElementById("calc-total-cost");
  const ppEl = document.getElementById("calc-per-person");
  
  if (countEl) countEl.textContent = `${selectedCount} 项`;
  if (subEl) subEl.textContent = `¥${subtotal}`;
  if (serviceEl) serviceEl.textContent = `¥${serviceFee}`;
  if (totalEl) totalEl.textContent = `¥${total}`;
  if (ppEl) ppEl.textContent = `¥${perPerson} / 人`;
  
  // FHR 指示器提醒 (华尔道夫 and 七尚餐饮额度都为两房 $200 = 约 ¥1400)
  const fhrThreshold = 1400;
  const fhrEl = document.getElementById("fhr-threshold-indicator");
  
  if (fhrEl) {
    if (activeMenuTab === 'anxi') {
      fhrEl.style.display = "none";
    } else {
      fhrEl.style.display = "block";
      if (total === 0) {
        fhrEl.className = "fhr-indicator under";
        fhrEl.innerHTML = `⚖️ FHR 餐饮额度可用：¥${fhrThreshold}`;
      } else if (total <= fhrThreshold) {
        fhrEl.className = "fhr-indicator perfect";
        fhrEl.innerHTML = `✅ 额度覆盖良好！还余 ¥${fhrThreshold - total} 可用`;
      } else {
        fhrEl.className = "fhr-indicator over";
        fhrEl.innerHTML = `⚠️ 超出 FHR 额度 ¥${total - fhrThreshold}，需自费补差价`;
      }
    }
  }
}

// --- 7. 出发前清单打卡 (带分类进度与责任人) ---
let activeChecklistTab = 'traffic';

function switchChecklistTab(tabId) {
  activeChecklistTab = tabId;
  document.querySelectorAll(".check-tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".checklist-panel").forEach(p => p.classList.remove("active"));
  
  const targetBtn = document.getElementById(`tab-btn-${tabId}`);
  const targetPanel = document.getElementById(`check-${tabId}`);
  
  if (targetBtn) targetBtn.classList.add("active");
  if (targetPanel) targetPanel.classList.add("active");
}

function renderChecklists() {
  const categories = ['traffic', 'hotel', 'birthday', 'overnight', 'health'];
  
  categories.forEach(cat => {
    const listEl = document.getElementById(`todo-${cat}`);
    if (listEl) {
      listEl.innerHTML = checklistData[cat].map((item, idx) => {
        // 分配不同的颜色徽章给负责人
        let ownerClass = '';
        if (item.owner === '爸爸') ownerClass = 'active-baba';
        if (item.owner === '妈妈') ownerClass = 'active-mama';
        if (item.owner === '酒店确认') ownerClass = 'active-hotel';
        if (item.owner === '出发当天检查') ownerClass = 'active-check';
        
        return `
          <li class="todo-item ${item.checked ? 'completed' : ''}" onclick="toggleChecklist('${cat}', ${idx})">
            <input type="checkbox" class="todo-checkbox" ${item.checked ? 'checked' : ''} onclick="event.stopPropagation(); toggleChecklist('${cat}', ${idx})">
            <span class="todo-text">${item.text}</span>
            <span class="owner-badge ${ownerClass}" onclick="event.stopPropagation(); cycleChecklistOwner('${cat}', ${idx})">
              👤 ${item.owner}
            </span>
          </li>
        `;
      }).join('');
    }
  });
  
  calculateChecklistProgress();
}

function toggleChecklist(cat, idx) {
  checklistData[cat][idx].checked = !checklistData[cat][idx].checked;
  renderChecklists();
  saveLocalState();
}

// 循环切换负责人
function cycleChecklistOwner(cat, idx) {
  const owners = ['无', '爸爸', '妈妈', '酒店确认', '出发当天检查'];
  const currentOwner = checklistData[cat][idx].owner || '无';
  let nextIdx = (owners.indexOf(currentOwner) + 1) % owners.length;
  checklistData[cat][idx].owner = owners[nextIdx];
  
  renderChecklists();
  saveLocalState();
}

// 计算总进度与分类进度
function calculateChecklistProgress() {
  let totalAll = 0;
  let checkedAll = 0;
  const categories = ['traffic', 'hotel', 'birthday', 'overnight', 'health'];
  
  categories.forEach(cat => {
    let catTotal = 0;
    let catChecked = 0;
    
    checklistData[cat].forEach(item => {
      catTotal++;
      totalAll++;
      if (item.checked) {
        catChecked++;
        checkedAll++;
      }
    });
    
    // 更新分类进度角标
    const catBadge = document.getElementById(`cat-progress-${cat}`);
    if (catBadge) {
      catBadge.textContent = `${catChecked}/${catTotal} 已做`;
    }
  });
  
  // 更新总进度条与文字
  const totalPercentage = totalAll > 0 ? Math.round((checkedAll / totalAll) * 100) : 0;
  const progressText = document.getElementById("checklist-progress");
  const progressBar = document.getElementById("checklist-progress-bar");
  
  if (progressText) progressText.textContent = `${totalPercentage}% 已准备`;
  if (progressBar) progressBar.style.width = `${totalPercentage}%`;
}

// --- 8. 切版函数 (5天 vs 6天) ---
function switchVersion(days) {
  currentVersion = days;
  
  const btn5 = document.getElementById("btn-5days");
  const btn6 = document.getElementById("btn-6days");
  const headerDates = document.getElementById("header-dates");
  
  if (days === 5) {
    if (btn5) btn5.classList.add("active");
    if (btn6) btn6.classList.remove("active");
    if (headerDates) headerDates.textContent = "📅 7月29日 - 8月2日";
  } else {
    if (btn5) btn5.classList.remove("active");
    if (btn6) btn6.classList.add("active");
    if (headerDates) headerDates.textContent = "📅 7月29日 - 8月3日";
  }
  
  renderDayNav();
  renderItinerary();
  scrollToSection("itinerary-anchor");
  showToast(`已成功切换至 ${days}天4晚 方案`);
  saveLocalState();
}

// --- 9. 滚动与位置跳转控制 ---
function scrollToDay(dayNum) {
  const target = document.getElementById(`day-card-${dayNum}`);
  if (target) {
    const offset = 75;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = target.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    document.querySelectorAll(".day-nav-btn").forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.getElementById(`nav-btn-day-${dayNum}`);
    if (activeBtn) activeBtn.classList.add("active");
  }
}

function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (target) {
    const offset = sectionId === 'itinerary-anchor' ? 70 : 60;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = target.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// 滚动高亮监听器
function bindScrollSpy() {
  window.onscroll = () => {
    const days = itineraryData[currentVersion];
    const scrollPos = window.scrollY || document.documentElement.scrollTop;
    const offset = 120;
    
    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      const el = document.getElementById(`day-card-${day.dayNum}`);
      if (el) {
        const top = el.offsetTop - offset;
        const height = el.offsetHeight;
        
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll(".day-nav-btn").forEach(btn => btn.classList.remove("active"));
          const activeNavBtn = document.getElementById(`nav-btn-day-${day.dayNum}`);
          if (activeNavBtn) {
            activeNavBtn.classList.add("active");
            const navWrapper = document.querySelector(".day-nav");
            if (navWrapper) {
              navWrapper.scrollLeft = activeNavBtn.offsetLeft - navWrapper.offsetWidth / 2 + activeNavBtn.offsetWidth / 2;
            }
          }
          break;
        }
      }
    }
  };
}

// --- 10. 一键复制文本支持 ---
function copyText(elementId, btnElement) {
  const text = document.getElementById(elementId).innerText;
  
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      handleCopySuccess(btnElement);
    }).catch(() => {
      fallbackCopyText(text, btnElement);
    });
  } else {
    fallbackCopyText(text, btnElement);
  }
}

function fallbackCopyText(text, btnElement) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      handleCopySuccess(btnElement);
    } else {
      showToast("复制失败，请长按文本手动复制");
    }
  } catch (err) {
    showToast("浏览器不支持自动复制，请手动复制");
  }
  
  document.body.removeChild(textArea);
}

function handleCopySuccess(btnElement) {
  const oldText = btnElement.textContent;
  btnElement.textContent = "✓ 已复制";
  btnElement.classList.add("copied");
  showToast("文案已存入剪贴板，可直接发送微信！");
  
  setTimeout(() => {
    btnElement.textContent = oldText;
    btnElement.classList.remove("copied");
  }, 2000);
}

// 弹出 Toast 提示
function showToast(message) {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.textContent = message;
    toast.classList.add("show");
    
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }
}

// --- 11. 本地存储 LocalStorage 持久化同步 (带防御性验证) ---
function saveLocalState() {
  try {
    localStorage.setItem("xiamen_version_state", currentVersion.toString());
    localStorage.setItem("xiamen_seniors_mode", seniorsModeActive.toString());
    localStorage.setItem("xiamen_menu_state", JSON.stringify(menuData));
    localStorage.setItem("xiamen_checklist_state", JSON.stringify(checklistData));
  } catch (e) {
    console.error("写入 localStorage 失败:", e);
  }
}

function loadLocalState() {
  try {
    // 1. 同步行程版本
    const storedVer = localStorage.getItem("xiamen_version_state");
    if (storedVer === '5' || storedVer === '6') {
      currentVersion = parseInt(storedVer, 10);
    }
    
    // 2. 同步大字模式
    const storedSeniors = localStorage.getItem("xiamen_seniors_mode");
    if (storedSeniors === 'true') {
      seniorsModeActive = true;
      document.body.classList.add("seniors-mode");
      const btn = document.getElementById("btn-seniors-mode");
      if (btn) btn.innerHTML = "👴 恢复默认字体模式";
    }
    
    // 3. 同步菜单勾选
    const storedMenu = localStorage.getItem("xiamen_menu_state");
    if (storedMenu) {
      const parsedMenu = JSON.parse(storedMenu);
      if (parsedMenu && typeof parsedMenu === 'object') {
        Object.keys(parsedMenu).forEach(restaurant => {
          if (menuData[restaurant] && Array.isArray(parsedMenu[restaurant])) {
            parsedMenu[restaurant].forEach((item, idx) => {
              if (menuData[restaurant][idx] && item && typeof item === 'object') {
                menuData[restaurant][idx].checked = !!item.checked;
              }
            });
          }
        });
      }
    }
    
    // 4. 同步清单打卡与负责人
    const storedChecklist = localStorage.getItem("xiamen_checklist_state");
    if (storedChecklist) {
      const parsedCheck = JSON.parse(storedChecklist);
      if (parsedCheck && typeof parsedCheck === 'object') {
        Object.keys(parsedCheck).forEach(cat => {
          if (checklistData[cat] && Array.isArray(parsedCheck[cat])) {
            parsedCheck[cat].forEach((item, idx) => {
              if (checklistData[cat][idx] && item && typeof item === 'object') {
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
    console.warn("读取 localStorage 错误，使用初始配置:", e);
  }
}
