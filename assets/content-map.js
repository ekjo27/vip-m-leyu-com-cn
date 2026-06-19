// 内容地图 - 站点分区、关键词标签与搜索过滤
const contentMap = {
  siteUrl: "https://vip-m-leyu.com.cn",
  brandKeyword: "乐鱼体育",
  sections: [
    {
      id: "news",
      label: "新闻资讯",
      tags: ["乐鱼体育", "赛事报道", "体育动态"],
      items: [
        { title: "乐鱼体育新赛季开幕", summary: "乐鱼体育全新赛季正式开启，精彩赛事不断。", url: "/news/season-opening" },
        { title: "篮球联赛战报", summary: "乐鱼体育篮球联赛最新战况。", url: "/news/basketball-report" }
      ]
    },
    {
      id: "live",
      label: "直播专区",
      tags: ["乐鱼体育", "直播", "实时比分"],
      items: [
        { title: "足球直播：乐鱼体育 vs 联合队", summary: "乐鱼体育主场迎战强敌，实时比分更新。", url: "/live/football" },
        { title: "篮球直播：乐鱼体育季后赛", summary: "乐鱼体育季后赛激烈进行中。", url: "/live/basketball" }
      ]
    },
    {
      id: "video",
      label: "精彩视频",
      tags: ["乐鱼体育", "集锦", "回放"],
      items: [
        { title: "乐鱼体育最佳进球集锦", summary: "回顾乐鱼体育本赛季最精彩进球。", url: "/video/highlights" },
        { title: "乐鱼体育赛后采访", summary: "乐鱼体育队员赛后访谈。", url: "/video/interview" }
      ]
    },
    {
      id: "community",
      label: "社区互动",
      tags: ["乐鱼体育", "论坛", "讨论"],
      items: [
        { title: "乐鱼体育球迷论坛", summary: "与乐鱼体育粉丝一起讨论赛事。", url: "/community/forum" },
        { title: "乐鱼体育有奖竞猜", summary: "参与乐鱼体育竞猜赢取好礼。", url: "/community/quiz" }
      ]
    }
  ]
};

// 搜索过滤函数：根据关键词搜索内容分区和项目
function searchContent(keyword) {
  const results = [];
  const lowerKeyword = keyword.toLowerCase();

  contentMap.sections.forEach(section => {
    // 检查分区标签是否匹配
    const tagMatch = section.tags.some(tag => tag.toLowerCase().includes(lowerKeyword));
    // 检查分区名称是否匹配
    const labelMatch = section.label.toLowerCase().includes(lowerKeyword);
    // 检查分区内项目
    const matchedItems = section.items.filter(item =>
      item.title.toLowerCase().includes(lowerKeyword) ||
      item.summary.toLowerCase().includes(lowerKeyword)
    );

    if (tagMatch || labelMatch || matchedItems.length > 0) {
      results.push({
        sectionId: section.id,
        sectionLabel: section.label,
        matchedTags: section.tags.filter(tag => tag.toLowerCase().includes(lowerKeyword)),
        matchedItems: matchedItems
      });
    }
  });

  return results;
}

// 示例用法
function demoSearch() {
  const query = "乐鱼体育";
  const found = searchContent(query);
  console.log(`搜索关键词: "${query}"`);
  console.log(`找到 ${found.length} 个相关分区`);
  found.forEach(sec => {
    console.log(`分区: ${sec.sectionLabel} (${sec.sectionId})`);
    if (sec.matchedTags.length > 0) {
      console.log(`  匹配标签: ${sec.matchedTags.join(", ")}`);
    }
    if (sec.matchedItems.length > 0) {
      sec.matchedItems.forEach(item => {
        console.log(`  项目: ${item.title} -> ${contentMap.siteUrl}${item.url}`);
      });
    }
  });
}

demoSearch();