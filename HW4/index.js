import { data } from "./data.js";
import { isDataEmpty } from "./helpers.js";

const mainContainerHeader = document
  .querySelector(".main")
  .querySelector(".container")
  .querySelector("header");

const renderPageTitle = () => {
  const pageTitle = document.createElement("h1");
  pageTitle.classList.add("page_title");
  pageTitle.innerHTML = data.page_title;
  mainContainerHeader.prepend(pageTitle);
};

const renderPlans = () => {
  const statusCollection = document.querySelector(".statusCollection");

  data.plans.forEach((plan) => {
    const planDivContainer = document.createElement("div");
    if (plan.active) {
      planDivContainer.classList.add("statusContainer", "active");
    } else {
      planDivContainer.classList.add("statusContainer");
    }
    const clientStatusDiv = document.createElement("div");
    clientStatusDiv.setAttribute("id", plan.name.toLowerCase());
    clientStatusDiv.classList.add("clientStatus");
    const planTextDiv = document.createElement("div");
    planTextDiv.classList.add("planText");
    planTextDiv.innerHTML = plan.name.toUpperCase();
    planDivContainer.append(clientStatusDiv);
    planDivContainer.append(planTextDiv);
    statusCollection.append(planDivContainer);
  });

  const upgradeBtn = document.createElement("button");
  upgradeBtn.classList.add("upgradeBtn");
  upgradeBtn.innerHTML = "Upgrade Now";

  statusCollection.append(upgradeBtn);
  mainContainerHeader.append(statusCollection);
};

const renderNavBar = () => {
  const navigationBar = document.querySelector("nav");
  const navList = document.createElement("div");
  navList.classList.add("navList");
  data.tabs.forEach((tab) => {
    const navListItemDiv = document.createElement("div");
    if (isDataEmpty(tab.data)) {
      navListItemDiv.classList.add("navListItem");
    } else {
      navListItemDiv.classList.add("navListItem", "active");
    }
    navListItemDiv.innerHTML = tab.title;
    navList.append(navListItemDiv);
  });

  navigationBar.append(navList);
};

const renderHeader = () => {
  renderPageTitle();
  renderNavBar();
  renderPlans();
};

renderHeader();

const systemsSection = document.createElement("section");

const systemsFirstSubSection = document.createElement("section");
systemsFirstSubSection.classList.add("section1");
// systemsSection.append(systemsFirstSubSection);
const titleDiv = document.createElement("div");
titleDiv.innerHTML = "Systems";

const systemsTitleBar = document.createElement("div");
systemsTitleBar.classList.add("sellTitleContainer");

["System Name", "ID", "Created date", "Active Licenses"].forEach(
  (subtitle, index) => {
    const subtitleDiv = document.createElement("div");
    subtitleDiv.classList.add("sellTitleItem" + (index + 1));
    subtitleDiv.innerHTML = subtitle;
    systemsTitleBar.append(subtitleDiv);
  }
);

// systemsFirstSubSection.append(titleDiv, systemsTitleBar);
// systemsSection.append(systemsFirstSubSection);

// const divForUserInfo = document.createElement("div");
// const userDeviceInfoContainer = document.createElement("div");
// userDeviceInfoContainer.classList.add("userDeviceInfoContainer")
// const userDeviceInfo = document.createElement("div");
// userDeviceInfo.classList.add("userDeviceInfo");

// data.tabs[2].data.systems[1]



// document
//   .querySelector(".main")
//   .querySelector(".container")
//   .append(systemsSection);


