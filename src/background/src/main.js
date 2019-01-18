import { StorageService } from "./StorageService";
import jwt from "./jwt";

async function dynamicIcon(activeTab, caller) {
  try {
    const profiles = (await StorageService.get("LMI.profiles")).filter(
      v => v.isActive
    );

    const tab = await new Promise(resolve => {
      chrome.tabs.get(activeTab.tabId, tab => {
        resolve(tab);
      });
    });

    let doesMatch = false;
    for (let i = 0; i < profiles.length; i++) {
      profiles[i].websitesList.split("\n").forEach(websiteItem => {
        if (tab.url.match(new RegExp(websiteItem, "g")) !== null) {
          doesMatch = true;
        }
      });
    }

    if (doesMatch) {
      chrome.browserAction.setIcon({
        path: { "16": "icon-unlocked.png" }
      });
    } else {
      chrome.browserAction.setIcon({
        path: { "16": "icon-locked.png" }
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}

chrome.tabs.onActivated.addListener(activeTab =>
  dynamicIcon(activeTab, "onActivated")
);
chrome.tabs.onUpdated.addListener(tabId => dynamicIcon({ tabId }, "onUpdated"));

chrome.webNavigation.onCommitted.addListener(async function(activeInfo) {
  try {
    const profiles = (await StorageService.get("LMI.profiles")).filter(
      v => v.isActive
    );

    const tab = await new Promise(resolve => {
      chrome.tabs.get(activeInfo.tabId, tab => {
        resolve(tab);
      });
    });

    // go through the profiles and find matching
    for (let i = 0; i < profiles.length; i++) {
      profiles[i].websitesList.split("\n").forEach(websiteItem => {
        const profile = profiles[i];
        // does match - execude javascript
        if (tab.url.match(new RegExp(websiteItem, "g")) !== null) {
          const payload = profile.JWTTemplate;
          const { JWT, payload: JWTPayload } = jwt.sign(
            JSON.parse(payload),
            profile.secret,
            {
              algorithm: profile.algorithm
            }
          );
          const code = profile.JSCode.replace("%JWT%", JWT).replace(
            "%JWT_PAYLOAD%",
            JSON.stringify(JWTPayload)
          );

          chrome.tabs.executeScript(tab.ib, {
            runAt: profile.runAt,
            code: code
          });
        }
      });
    }
  } catch (error) {
    console.log("error", error);
  }
});
