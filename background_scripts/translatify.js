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

function fetchTranslation(selection) {

  const Http = new XMLHttpRequest();
  const path='https://dictionaryapi.com/api/v3/references/spanish/json/';
  const query = '?key=';
  const apikey = '';
  const url = path + selection + query + apikey;
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
  }
}

async function fetchLibreTranslate(selection) {
  const res = await fetch("https://libretranslate.com/translate", {
    method: "POST",
    body: JSON.stringify({
      q: selection,
      source: "es",
      target: "en",
      format: "text",
      api_key: ""
    }),
    headers: { "Content-Type": "application/json" }
  });

  console.log(await res.json());
}

async function fetchAzureTranslate(selection) {
  const res = await fetch("https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=es&to=en", {
    method: "POST",
    body: JSON.stringify([{
      text: selection
    }]),
    headers: {
      "Content-Type": "application/json",
      'Ocp-Apim-Subscription-Key': '',
      // location required if you're using a multi-service or regional (not global) resource.
      'Ocp-Apim-Subscription-Region': 'westus2',
      'X-ClientTraceId': 'placeholder' //uuidv4().toString()
    }
  });

  console.log(await res.json());
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
      // fetchTranslation(info.selectionText);
      fetchAzureTranslate(info.selectionText)
          .catch((reason) => console.log(`Caught an error from azure translate: ${reason}`));
      break;
  }
});

