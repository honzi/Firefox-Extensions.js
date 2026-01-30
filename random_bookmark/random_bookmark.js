'use strict';

browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
      contexts: ["bookmark"],
      id: "random_bookmark",
      title: "Open Random Bookmark",
    });
});

browser.contextMenus.onClicked.addListener(async (item) => {
    if(item.menuItemId !== 'random_bookmark'){
        return;
    }

    const selected = await browser.bookmarks.get(item.bookmarkId);
    const folder = selected[0];
    if(folder.type !== 'folder'){
        return;
    }

    const children = await browser.bookmarks.getChildren(folder.id);
    const bookmarks = children.filter(child => !child.url.includes('place:'));
    if(!bookmarks.length){
        return;
    }

    browser.tabs.create({
      'url': bookmarks[Math.floor(Math.random() * bookmarks.length)].url,
    });
});
