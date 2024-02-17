/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

/*
Called when the item has been removed.
We'll just log success here.
*/
function onRemoved() {
  console.log("Item removed successfully");
}

/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
  console.log(`Error: ${error}`);
}


browser.menus.create(
  {
    id: "translate-selection",
    title: browser.i18n.getMessage("menuItemSelectionTranslator"),
    contexts: ["selection"],
  },
  onCreated
);

browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "translate-selection":
      console.log(`Translating '${info.selectionText}'`);
      break;
    // …
  }
});

