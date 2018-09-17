// 读写localstorage

let groupDataKey = 'group';
// let historyDataKey = 'history';

// 返回全部分组信息
function getAllGroupInfo() {
    let groups = localStorage.getItem(groupDataKey);
    let groupsData;
    if (!groups) {
        groupsData = [{
                group: '全部',
                code: ['sh000001']
            },
            {
                group: '沪市',
                code: ['sh000001']
            },
            {
                group: '深市',
                code: ['sz000001']
            },
        ];
    } else {
        groupsData = JSON.parse(groups);
    }
    return groupsData;
}


// 返回一个指定分组的股票
function getStocksByGroup(name) {
    let groupsData = getAllGroupInfo();
    return groupsData.filter(groupInfo => {
        return groupInfo.group === name;
    })[0];
}

function setStockLs() {
    localStorage.setItem(groupDataKey, JSON.stringify(getAllGroupInfo()))
}

// 添加一个分组
function addGroup(name) {
    let goupsData = getAllGroupInfo();
    let groups = [];
    for (let i = 0; i < goupsData.length; i++) {
        const e = goupsData[i];
        groups.push(e.group)
    }
    if (groups.indexOf(name) == -1) {
        groups.push(name)
        let setNew = getAllGroupInfo();
        setNew.push({ 'group': name, "code": [] });
        localStorage.setItem(groupDataKey, JSON.stringify(setNew))
    } else {
        alert('命名重复，请重新输入')
    }
    return groups
        // 检查name在不在groups
        // 加进去
        // 马上写到localstorage
}

//获取全部分组
function getLsGroup() {
    let g = getAllGroupInfo();
    let groups = [];
    for (let i = 0; i < g.length; i++) {
        const e = g[i];
        groups.push(e.group)
    }
    return groups;
    // console.log(groups)
}

//根据code获取所在分组
function getGroupsByCode(code) {
    let g = getAllGroupInfo();
    let group = [];
    for (let i = 0; i < g.length; i++) {
        const e = g[i].code;
        const element = g[i].group;
        if (e.indexOf(code) != -1) {
            group.push(element);
        }
    }
    return group;
}

//添加单个股票到某个组
function searchAddtoLS(group, s) {
    let l = getAllGroupInfo();
    let code = l[0].code;
    if (code.indexOf(s.code) == -1) {
        code.push(s.code)
    }
    for (let i = 0; i < l.length; i++) {
        const e = l[i];
        if (group != []) {
            for (let j = 0; j < group.length; j++) {
                const element = group[j];
                if (e.group == element.group && l[i].code.indexOf(s.code) == -1) {
                    l[i].code.push(s.code)
                }
            }
        }
    }
    localStorage.setItem(groupDataKey, JSON.stringify(l))
}

// 从一个分组里面删除一批股票
function deleteStocksFromGroup(group, codeList) {
    // let g = getAllGroupInfo();
    for (let i = 0; i < codeList.length; i++) {
        const element = codeList[i];
        deleteStockFromList(element, group.code)
    }

}

// 把当前遍历到的股票从所有分组里删除
function deleteStockFromList(code, list) {
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (code == element) {
            list.splice(i, 1)
        }
    }
}
// 删除名字为name的分组
function deleteGroupByName(name) {
    let g = getAllGroupInfo();
    for (let i = 0; i < g.length; i++) {
        const a = g[i].group;
        if (a == name) {
            g.splice(i, 1)
        }
    }
    localStorage.setItem('group', JSON.stringify(g))
}

export {
    deleteStocksFromGroup,
    deleteStockFromList,
    deleteGroupByName,
    searchAddtoLS,
    getAllGroupInfo,
    getStocksByGroup,
    setStockLs,
    addGroup,
    getLsGroup,
    getGroupsByCode
}